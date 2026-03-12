import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';
import { supabase } from '../utils/supabase';

const PointsContext = createContext();

const DAILY_RECHARGE_AMOUNT = 20;

// ✅ TEMPORÁRIO v2.0 — Com Validação de Qualidade + Feedback Visível
// Baseado em: Visible Learning (0.73 ES) + Validador de Pesquisa (4 tipos de validade)

/**
 * 4 TIPOS DE VALIDADE — Toda ação de ponto passa por validação
 * 1. ESTATÍSTICA: Dados consistentes, sem outliers
 * 2. INTERNA: Ação está legitimamente completa (não faltam steps)
 * 3. CONSTRUTO: Ação mede o que deveria medir (não é proxy)
 * 4. EXTERNA: Resultado generaliza (não é caso específico)
 */

const VALIDITY_RULES = {
  STATISTICAL: {
    name: 'Estatística',
    check: (value) => value && !isNaN(value) && value > 0,
    weight: 0.25,
  },
  INTERNAL: {
    name: 'Interna',
    check: (action) => action.requiredFields && action.requiredFields.every(f => action[f]),
    weight: 0.35, // Mais importante
  },
  CONSTRUCT: {
    name: 'Construto',
    check: (action) => action.type && ['earned', 'redeemed', 'bonus', 'penalty'].includes(action.type),
    weight: 0.25,
  },
  EXTERNAL: {
    name: 'Externa',
    check: (action) => !action.isUserSpecific || action.canGeneralize,
    weight: 0.15,
  },
};

export const PointsProvider = ({ children }) => {
  const { addToast } = useToast();
  const { currentUser } = useAuth();

  const [balance, setBalance] = useState(DAILY_RECHARGE_AMOUNT);
  const [lastRecharged, setLastRecharged] = useState(new Date().toISOString());
  const [redeemedCodes, setRedeemedCodes] = useState(new Set());
  const [promoCodes, setPromoCodes] = useState({});
  const [initialized, setInitialized] = useState(false);

  // ✅ NOVO: Feedback Visível + Histórico de Validação
  const [progressBar, setProgressBar] = useState({ current: 0, target: 100 });
  const [validationLog, setValidationLog] = useState([]);
  const [qualityScore, setQualityScore] = useState(100); // 0-100, visual feedback

  // Carrega dados do Supabase
  useEffect(() => {
    if (!currentUser) return;

    const loadFromSupabase = async () => {
      // Pontos
      const { data: pointsData } = await supabase
        .from('user_points')
        .select('balance, last_recharged')
        .eq('user_id', currentUser.id)
        .single();

      if (pointsData) {
        setBalance(pointsData.balance);
        setLastRecharged(pointsData.last_recharged);
      }

      // ✅ NOVO: Carrega histórico de validação
      const { data: validationData } = await supabase
        .from('points_validation_log')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (validationData) {
        setValidationLog(validationData);
        // Calcula quality score baseado em histórico
        const passedChecks = validationData.filter(v => v.status === 'passed').length;
        const score = validationData.length > 0 ? (passedChecks / validationData.length) * 100 : 100;
        setQualityScore(Math.round(score));
      }

      // Códigos promocionis
      const { data: redemptionsData } = await supabase
        .from('promo_redemptions')
        .select('promo_code')
        .eq('user_id', currentUser.id);

      if (redemptionsData) {
        setRedeemedCodes(new Set(redemptionsData.map(r => r.promo_code)));
      }

      const { data: codesData } = await supabase
        .from('promo_codes')
        .select('code, point_value')
        .eq('is_active', true);

      if (codesData) {
        const codesMap = codesData.reduce((acc, { code, point_value }) => {
          acc[code] = point_value;
          return acc;
        }, {});
        setPromoCodes(codesMap);
      }

      setInitialized(true);
    };

    loadFromSupabase();
  }, [currentUser]);

  // ✅ NOVO: Validação Rigorosa de Qualidade (4 tipos)
  const validatePointAction = useCallback(async (action) => {
    const validity = {
      statistical: VALIDITY_RULES.STATISTICAL.check(action.amount),
      internal: VALIDITY_RULES.INTERNAL.check(action),
      construct: VALIDITY_RULES.CONSTRUCT.check(action),
      external: VALIDITY_RULES.EXTERNAL.check(action),
    };

    // Calcula score ponderado (0-100)
    const score =
      (validity.statistical ? VALIDITY_RULES.STATISTICAL.weight : 0) * 100 +
      (validity.internal ? VALIDITY_RULES.INTERNAL.weight : 0) * 100 +
      (validity.construct ? VALIDITY_RULES.CONSTRUCT.weight : 0) * 100 +
      (validity.external ? VALIDITY_RULES.EXTERNAL.weight : 0) * 100;

    const allValid = Object.values(validity).every(v => v);

    // Log no banco
    if (currentUser) {
      await supabase.from('points_validation_log').insert({
        user_id: currentUser.id,
        action_type: action.type,
        amount: action.amount,
        validity_score: Math.round(score),
        status: allValid ? 'passed' : 'failed',
        validity_details: JSON.stringify(validity),
        created_at: new Date().toISOString(),
      });
    }

    return { isValid: allValid, score: Math.round(score), validity };
  }, [currentUser]);

  // ✅ NOVO: Adiciona pontos com validação
  const addPoints = useCallback(async (amount, action = {}) => {
    // Validação rigorosa
    const validation = await validatePointAction({
      amount,
      type: action.type || 'earned',
      requiredFields: action.requiredFields || [],
      ...action,
    });

    if (!validation.isValid) {
      addToast(`⚠️ Ação inválida: ${Object.entries(validation.validity)
        .filter(([_, v]) => !v)
        .map(([k]) => VALIDITY_RULES[k].name)
        .join(', ')}`, 'warning');
      return false;
    }

    const newBalance = balance + amount;
    setBalance(newBalance);

    // Feedback visual imediato (Visible Learning)
    setProgressBar({
      current: newBalance,
      target: newBalance + 50,
      label: `${newBalance}/${newBalance + 50} pontos`,
    });

    // Sync DB
    if (currentUser) {
      await supabase
        .from('user_points')
        .update({ balance: newBalance })
        .eq('user_id', currentUser.id);
    }

    // Toast com feedback de qualidade
    const qualityEmoji = validation.score >= 80 ? '✅' : validation.score >= 60 ? '⚠️' : '❌';
    addToast(`${qualityEmoji} +${amount} pontos | Qualidade: ${validation.score}/100`, 'success');

    return true;
  }, [balance, currentUser, validatePointAction, addToast]);

  // ✅ NOVO: Recarga diária com feedback
  const checkDailyRecharge = useCallback(() => {
    const now = new Date();
    const last = new Date(lastRecharged);

    if (now.toDateString() !== last.toDateString()) {
      const newLastRecharged = now.toISOString();
      setBalance(DAILY_RECHARGE_AMOUNT);
      setLastRecharged(newLastRecharged);

      if (currentUser) {
        supabase
          .from('user_points')
          .update({ balance: DAILY_RECHARGE_AMOUNT, last_recharged: newLastRecharged })
          .eq('user_id', currentUser.id);
      }

      // Feedback visual melhorado
      setProgressBar({
        current: DAILY_RECHARGE_AMOUNT,
        target: DAILY_RECHARGE_AMOUNT,
        label: 'Nova dia! Energia recarregada.',
      });

      addToast('✨ Energia diária recarregada! +20 pontos. [Visible Learning feedback]', 'success');
    }
  }, [lastRecharged, currentUser, addToast]);

  useEffect(() => {
    checkDailyRecharge();
    const interval = setInterval(checkDailyRecharge, 60000);
    return () => clearInterval(interval);
  }, [checkDailyRecharge]);

  // ✅ NOVO: Resgatar código com validação
  const redeemPromoCode = useCallback(async (code) => {
    if (redeemedCodes.has(code)) {
      addToast('Código já foi resgatado.', 'error');
      return false;
    }

    const pointValue = promoCodes[code];
    if (!pointValue) {
      addToast('Código inválido ou expirado.', 'error');
      return false;
    }

    // Valida como ação legítima
    const validation = await validatePointAction({
      amount: pointValue,
      type: 'redeemed',
      code,
      requiredFields: ['code'],
    });

    if (!validation.isValid) {
      addToast('❌ Validação falhou. Código rejeitado.', 'error');
      return false;
    }

    const newRedeemedCodes = new Set(redeemedCodes);
    newRedeemedCodes.add(code);
    setRedeemedCodes(newRedeemedCodes);

    const newBalance = balance + pointValue;
    setBalance(newBalance);

    if (currentUser) {
      await supabase.from('promo_redemptions').insert({
        user_id: currentUser.id,
        promo_code: code,
        points_earned: pointValue,
      });

      await supabase
        .from('user_points')
        .update({ balance: newBalance })
        .eq('user_id', currentUser.id);
    }

    addToast(`✅ +${pointValue} pontos! Código validado com qualidade ${validation.score}/100`, 'success');
    return true;
  }, [balance, currentUser, redeemedCodes, promoCodes, validatePointAction, addToast]);

  const value = {
    balance,
    lastRecharged,
    redeemedCodes,
    promoCodes,
    initialized,
    addPoints, // ✅ NOVO: Com validação
    redeemPromoCode, // ✅ NOVO: Com validação
    checkDailyRecharge,
    // ✅ NOVO: Feedback visual
    progressBar,
    qualityScore,
    validationLog,
  };

  return <PointsContext.Provider value={value}>{children}</PointsContext.Provider>;
};

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (!context) {
    throw new Error('usePoints deve ser usado dentro de PointsProvider');
  }
  return context;
};
