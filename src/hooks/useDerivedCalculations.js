import { useMemo } from 'react';

/**
 * Hook para memoizar cálculos derivados com dependências explícitas
 * Evita recálculos desnecessários
 * @param {Function} calculateFn - Função que retorna objeto com cálculos
 * @param {Array} dependencies - Array de dependências (como useMemo)
 * @returns {object} Objeto com resultados dos cálculos
 */
export function useDerivedCalculations(calculateFn, dependencies = []) {
  return useMemo(() => {
    try {
      return calculateFn();
    } catch (error) {
      console.error('Erro ao calcular valores derivados:', error);
      return {};
    }
  }, dependencies);
}

/**
 * Hook específico para cálculos financeiros com validação
 * @param {Array} items - Array de items com horas/valores
 * @param {number} hourlyRate - Taxa horária
 * @param {number} taxPercentage - Percentual de imposto
 * @param {number} discountPercentage - Percentual de desconto
 * @returns {object} {subtotal, taxAmount, totalWithTaxes, discountAmount, totalInvestment}
 */
export function useFinancialCalculations(
  items = [],
  hourlyRate = 0,
  taxPercentage = 0,
  discountPercentage = 0
) {
  return useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + (Number(item.hours || 0) * hourlyRate), 0);
    const taxAmount = subtotal * (taxPercentage / 100);
    const totalWithTaxes = subtotal + taxAmount;
    const discountAmount = totalWithTaxes * (discountPercentage / 100);
    const totalInvestment = totalWithTaxes - discountAmount;

    return {
      subtotal,
      taxAmount,
      totalWithTaxes,
      discountAmount,
      totalInvestment,
      totalHours: items.reduce((sum, item) => sum + Number(item.hours || 0), 0),
    };
  }, [items, hourlyRate, taxPercentage, discountPercentage]);
}
