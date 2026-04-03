/**
 * FeatureFlags.TEMP.js — Switcher Temporário
 *
 * Alterna entre versão original e v2.0 TEMP
 * Permite teste seguro sem perder original
 */

export const FEATURE_FLAGS = {
  // ✅ Sistema de Pontos
  POINTS_VALIDATION_ENABLED: process.env.REACT_APP_POINTS_V2_ENABLED === 'true',
  POINTS_FEEDBACK_VISIBLE: process.env.REACT_APP_POINTS_FEEDBACK === 'true',
  POINTS_QUALITY_SCORE: process.env.REACT_APP_POINTS_QUALITY === 'true',

  // ✅ Sistema de Pesquisa
  RESEARCH_V2_ENABLED: process.env.REACT_APP_RESEARCH_V2_ENABLED === 'true',
  RESEARCH_FRAMEWORKS_ENABLED: process.env.REACT_APP_RESEARCH_FRAMEWORKS === 'true',
  RESEARCH_VALIDATION_ENABLED: process.env.REACT_APP_RESEARCH_VALIDATION === 'true',
  RESEARCH_REPETITION_ENABLED: process.env.REACT_APP_RESEARCH_REPETITION === 'true',
};

// Valores padrão para teste local
export const DEFAULT_FLAGS = {
  POINTS_VALIDATION_ENABLED: true, // ✅ Ativar para teste
  POINTS_FEEDBACK_VISIBLE: true,
  POINTS_QUALITY_SCORE: true,
  RESEARCH_V2_ENABLED: true,
  RESEARCH_FRAMEWORKS_ENABLED: true,
  RESEARCH_VALIDATION_ENABLED: true,
  RESEARCH_REPETITION_ENABLED: true,
};

/**
 * Use this hook to toggle features
 */
export const useFeatureFlag = (flagName) => {
  const flagValue = FEATURE_FLAGS[flagName] ?? DEFAULT_FLAGS[flagName] ?? false;
  return flagValue;
};

/**
 * Enable all TEMP features for testing
 */
export const enableAllTempFeatures = () => {
  Object.keys(DEFAULT_FLAGS).forEach(flag => {
    FEATURE_FLAGS[flag] = true;
  });
  console.log('✅ Todas features TEMP ativadas para teste');
};

/**
 * Disable all TEMP features (volta original)
 */
export const disableAllTempFeatures = () => {
  Object.keys(DEFAULT_FLAGS).forEach(flag => {
    FEATURE_FLAGS[flag] = false;
  });
  console.log('⛔ Todas features TEMP desativadas');
};

export default FEATURE_FLAGS;
