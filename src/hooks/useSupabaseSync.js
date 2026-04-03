import { useEffect, useRef, useState } from 'react';

/**
 * Hook para auto-save debounced em Supabase
 * @param {object} data - Dados a serem salvos
 * @param {Function} saveFn - Função async de save (deve aceitar data como param)
 * @param {number} debounceMs - Delay em milisegundos (padrão: 1500)
 * @param {boolean} isEnabled - Se o auto-save deve estar ativo
 */
export function useSupabaseSync(data, saveFn, debounceMs = 1500, isEnabled = true) {
  const timerRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    // Limpa timer anterior
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Agenda novo save
    timerRef.current = setTimeout(async () => {
      setIsSaving(true);
      try {
        await saveFn(data);
      } catch (error) {
        console.error('Erro ao salvar no Supabase:', error);
      } finally {
        setIsSaving(false);
      }
    }, debounceMs);

    // Cleanup
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [data, saveFn, debounceMs, isEnabled]);

  return { isSaving };
}
