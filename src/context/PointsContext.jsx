import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';
import { supabase } from '../utils/supabase';

const PointsContext = createContext();

const DAILY_RECHARGE_AMOUNT = 20;

export const PointsProvider = ({ children }) => {
  const { addToast } = useToast();
  const { currentUser } = useAuth();

  const [balance, setBalance] = useState(DAILY_RECHARGE_AMOUNT);
  const [lastRecharged, setLastRecharged] = useState(new Date().toISOString());
  const [redeemedCodes, setRedeemedCodes] = useState(new Set());
  const [promoCodes, setPromoCodes] = useState({});
  const [initialized, setInitialized] = useState(false);

  // Carrega dados do Supabase quando o usuário faz login
  useEffect(() => {
    if (!currentUser) {
      // Reset ao fazer logout
      return;
    }

    const loadFromSupabase = async () => {
      // Carrega pontos do usuário
      const { data: pointsData } = await supabase
        .from('user_points')
        .select('balance, last_recharged')
        .eq('user_id', currentUser.id)
        .single();

      if (pointsData) {
        setBalance(pointsData.balance);
        setLastRecharged(pointsData.last_recharged);
      }

      // Carrega códigos já resgatados pelo usuário
      const { data: redemptionsData } = await supabase
        .from('promo_redemptions')
        .select('promo_code')
        .eq('user_id', currentUser.id);

      if (redemptionsData) {
        setRedeemedCodes(new Set(redemptionsData.map(r => r.promo_code)));
      }

      // Carrega códigos promocionais ativos
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

  // Sync saldo para o Supabase em background (fire-and-forget)
  const syncBalanceDB = useCallback((newBalance) => {
    if (!currentUser) return;
    supabase
      .from('user_points')
      .update({ balance: newBalance })
      .eq('user_id', currentUser.id);
  }, [currentUser]);

  // Lógica de Recarga Diária Não-Acumulativa
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

      addToast('Energia diária recarregada! +20 pontos.', 'success');
    }
  }, [lastRecharged, currentUser, addToast]);

  useEffect(() => {
    if (!initialized || !currentUser) return;

    // Verificar recarga apenas uma vez ao inicializar
    checkDailyRecharge();

    // Definir intervalo para verificar a cada hora
    const interval = setInterval(() => {
      // Recriamos a lógica aqui para evitar dependência circular
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

        addToast('Energia diária recarregada! +20 pontos.', 'success');
      }
    }, 1000 * 60 * 60);

    return () => clearInterval(interval);
  }, [initialized, currentUser, lastRecharged, addToast, checkDailyRecharge]);

  // API pública — mantida 100% compatível com o código existente
  const spendPoints = (amount, actionName = 'Ação') => {
    if (balance >= amount) {
      const newBalance = balance - amount;
      setBalance(newBalance);          // otimista
      syncBalanceDB(newBalance);       // background
      addToast(`-${amount} pontos: ${actionName}`, 'success');
      return true;
    } else {
      addToast('Pontos insuficientes para esta ação.', 'error');
      return false;
    }
  };

  const addBonusPoints = (amount, reason = 'Bônus') => {
    const newBalance = balance + amount;
    setBalance(newBalance);            // otimista
    syncBalanceDB(newBalance);         // background
    addToast(`+${amount} pontos: ${reason}`, 'success');
  };

  const redeemCode = (code) => {
    const cleanCode = code.trim().toUpperCase();

    if (!currentUser) {
      addToast('Faça login para resgatar códigos.', 'error');
      return false;
    }

    if (redeemedCodes.has(cleanCode)) {
      addToast('Este código já foi resgatado.', 'error');
      return false;
    }

    if (promoCodes[cleanCode]) {
      const bonus = promoCodes[cleanCode];
      const newBalance = balance + bonus;

      // Atualização otimista imediata
      setBalance(newBalance);
      setRedeemedCodes(prev => new Set([...prev, cleanCode]));

      // Persiste no Supabase em background
      (async () => {
        const { error } = await supabase
          .from('promo_redemptions')
          .insert({
            user_id: currentUser.id,
            promo_code: cleanCode,
            points_given: bonus
          });

        if (error) {
          // Rollback se falhar
          setBalance(balance);
          setRedeemedCodes(prev => {
            const next = new Set(prev);
            next.delete(cleanCode);
            return next;
          });
          addToast('Erro ao resgatar código. Tente novamente.', 'error');
          return;
        }

        syncBalanceDB(newBalance);
      })();

      addToast(`Sucesso! +${bonus} pontos creditados.`, 'success');
      return true;
    } else {
      addToast('Código inválido ou expirado.', 'error');
      return false;
    }
  };

  const addPromoCode = async (code, value) => {
    const cleanCode = code.trim().toUpperCase();
    if (!currentUser) return;

    const { error } = await supabase
      .from('promo_codes')
      .insert({ code: cleanCode, point_value: value, created_by: currentUser.id });

    if (!error) {
      setPromoCodes(prev => ({ ...prev, [cleanCode]: value }));
      addToast(`Código ${cleanCode} criado com ${value} pts!`, 'success');
    } else {
      addToast('Erro ao criar código.', 'error');
    }
  };

  const removePromoCode = async (code) => {
    if (!currentUser) return;

    const { error } = await supabase
      .from('promo_codes')
      .update({ is_active: false })
      .eq('code', code);

    if (!error) {
      setPromoCodes(prev => {
        const next = { ...prev };
        delete next[code];
        return next;
      });
      addToast('Código desativado.', 'success');
    } else {
      addToast('Erro ao remover código.', 'error');
    }
  };

  return (
    <PointsContext.Provider value={{
      balance,
      spendPoints,
      addBonusPoints,
      redeemCode,
      promoCodes,
      addPromoCode,
      removePromoCode
    }}>
      {children}
    </PointsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePoints = () => useContext(PointsContext);
