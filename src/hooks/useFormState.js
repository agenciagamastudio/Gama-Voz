import { useState, useCallback } from 'react';

/**
 * Hook customizado para gerenciar estado de formulário com persistência em localStorage
 * @param {string} storageKey - Chave para localStorage
 * @param {object} initialState - Estado inicial
 * @returns {[object, Function]} [state, setState]
 */
export function useFormState(storageKey, initialState) {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : initialState;
  });

  const updateState = useCallback((updates) => {
    setState((prev) => {
      const next = typeof updates === 'function' ? updates(prev) : { ...prev, ...updates };
      localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  }, [storageKey]);

  const clearState = useCallback(() => {
    localStorage.removeItem(storageKey);
    setState(initialState);
  }, [storageKey, initialState]);

  return [state, updateState, clearState];
}
