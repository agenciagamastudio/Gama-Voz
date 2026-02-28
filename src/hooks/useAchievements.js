import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePoints } from '../context/PointsContext';
import { useToast } from '../context/ToastContext';
import { supabase } from '../utils/supabase';

/**
 * Hook para gerenciar achievements/ações de engajamento
 * Rastreia ações completadas e concede pontos atomicamente
 */
export const useAchievements = () => {
  const { currentUser } = useAuth();
  const { addBonusPoints } = usePoints();
  const { addToast } = useToast();

  const [completedActions, setCompletedActions] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Definição das ações de engajamento
  const ACHIEVEMENTS = {
    COMPLETE_PROFILE: {
      id: 'complete_profile',
      name: 'Completar Perfil',
      points: 5,
      description: 'Preencha seu perfil com nome, avatar e email'
    },
    FIRST_DIAGNOSTIC: {
      id: 'first_diagnostic',
      name: 'Primeiro Diagnóstico',
      points: 5,
      description: 'Complete seu primeiro diagnóstico de valor'
    },
    FIRST_PROPOSAL: {
      id: 'first_proposal',
      name: 'Primeira Proposta',
      points: 5,
      description: 'Crie sua primeira proposta de solução'
    },
    SHARE_PROPOSAL: {
      id: 'share_proposal',
      name: 'Compartilhar Proposta',
      points: 3,
      description: 'Compartilhe uma proposta via WhatsApp ou link'
    },
    FOLLOW_SOCIAL: {
      id: 'follow_social',
      name: 'Seguir Redes Sociais',
      points: 5,
      description: 'Siga as redes sociais da GAMA'
    },
    WHATSAPP_CONTACT: {
      id: 'whatsapp_contact',
      name: 'Enviar WhatsApp',
      points: 5,
      description: 'Envie uma mensagem via WhatsApp'
    }
  };

  // Carregar achievements completados do Supabase
  useEffect(() => {
    if (!currentUser) return;

    const loadAchievements = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('user_achievements')
          .select('action_type')
          .eq('user_id', currentUser.id);

        if (error) {
          console.error('Erro ao carregar achievements:', error);
          return;
        }

        // Deduplicate and convert to Set (prevent duplicates for same action)
        const actions = new Set(data.map(record => record.action_type));
        setCompletedActions(actions);
      } catch (error) {
        console.error('Erro ao carregar achievements:', error);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    loadAchievements();
  }, [currentUser]);

  /**
   * Completa uma ação e concede pontos atomicamente
   * @param {string} actionType - ID da ação (ex: 'complete_profile')
   * @returns {boolean} true se bem-sucedido, false se já foi completado
   */
  const completeAchievement = useCallback(
    async (actionType) => {
      if (!currentUser) {
        addToast('Faça login para ganhar pontos.', 'error');
        return false;
      }

      // Verificar se já foi completado (prevent duplicate)
      if (completedActions.has(actionType)) {
        addToast('Você já completou esta ação.', 'info');
        return false;
      }

      const achievement = Object.values(ACHIEVEMENTS).find(
        a => a.id === actionType
      );

      if (!achievement) {
        addToast('Ação inválida.', 'error');
        return false;
      }

      try {
        // 1. Insert record no Supabase (atomic)
        const { error: insertError } = await supabase
          .from('user_achievements')
          .insert({
            user_id: currentUser.id,
            action_type: actionType,
            points_earned: achievement.points,
            completed_at: new Date().toISOString()
          });

        if (insertError) {
          // Se já existe, retornar false
          if (insertError.code === '23505') {
            addToast('Você já completou esta ação.', 'info');
            setCompletedActions(prev => new Set([...prev, actionType]));
            return false;
          }
          throw insertError;
        }

        // 2. Conceder pontos (otimista + background sync)
        addBonusPoints(achievement.points, `${achievement.name}`);

        // 3. Atualizar estado local
        setCompletedActions(prev => new Set([...prev, actionType]));

        return true;
      } catch (error) {
        console.error('Erro ao completar achievement:', error);
        addToast('Erro ao registrar ação. Tente novamente.', 'error');
        return false;
      }
    },
    [currentUser, completedActions, addBonusPoints, addToast]
  );

  /**
   * Verifica se uma ação foi completada
   * @param {string} actionType - ID da ação
   * @returns {boolean} true se já foi completado
   */
  const checkAchievementStatus = useCallback(
    (actionType) => {
      return completedActions.has(actionType);
    },
    [completedActions]
  );

  /**
   * Retorna lista de todas as ações disponíveis com status
   * @returns {Array} Array de achievements com status
   */
  const getAchievementsList = useCallback(() => {
    return Object.values(ACHIEVEMENTS).map(achievement => ({
      ...achievement,
      completed: completedActions.has(achievement.id)
    }));
  }, [completedActions]);

  /**
   * Calcula total de pontos ganhos
   * @returns {number} Total de pontos extras conquistados
   */
  const getTotalEarnedPoints = useCallback(() => {
    return Object.values(ACHIEVEMENTS)
      .filter(a => completedActions.has(a.id))
      .reduce((sum, a) => sum + a.points, 0);
  }, [completedActions]);

  return {
    // Data
    completedActions,
    initialized,
    loading,
    ACHIEVEMENTS,

    // Methods
    completeAchievement,
    checkAchievementStatus,
    getAchievementsList,
    getTotalEarnedPoints
  };
};
