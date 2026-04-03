import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDerivedCalculations, useFinancialCalculations } from './useDerivedCalculations';

describe('useDerivedCalculations hook', () => {
  it('should memoize calculation results', () => {
    let callCount = 0;
    const calculateFn = () => {
      callCount++;
      return { result: 42 };
    };

    const { result, rerender } = renderHook(() =>
      useDerivedCalculations(calculateFn, [])
    );

    expect(callCount).toBe(1);
    expect(result.current.result).toBe(42);

    // Sem mudança de dependências, função não deve ser chamada novamente
    rerender();
    expect(callCount).toBe(1);
  });

  it('should recalculate when dependencies change', () => {
    let depValue = 1;
    let callCount = 0;

    const { result, rerender } = renderHook(
      ({ value }) => {
        callCount++;
        return useDerivedCalculations(() => ({ result: value * 2 }), [value]);
      },
      { initialProps: { value: depValue } }
    );

    expect(callCount).toBe(1);
    expect(result.current.result).toBe(2);

    rerender({ value: 2 });
    expect(callCount).toBe(2);
    expect(result.current.result).toBe(4);
  });

  it('should handle errors gracefully', () => {
    const calculateFn = () => {
      throw new Error('Calculation error');
    };

    const { result } = renderHook(() => useDerivedCalculations(calculateFn, []));
    expect(result.current).toEqual({});
  });
});

describe('useFinancialCalculations hook', () => {
  it('should calculate subtotal correctly', () => {
    const items = [{ hours: 10 }, { hours: 20 }];
    const { result } = renderHook(() =>
      useFinancialCalculations(items, 100, 0, 0)
    );

    expect(result.current.subtotal).toBe(3000); // (10 + 20) * 100
    expect(result.current.totalHours).toBe(30);
  });

  it('should apply taxes correctly', () => {
    const items = [{ hours: 10 }];
    const { result } = renderHook(() =>
      useFinancialCalculations(items, 100, 10, 0)
    );

    expect(result.current.subtotal).toBe(1000);
    expect(result.current.taxAmount).toBe(100); // 1000 * 0.1
    expect(result.current.totalWithTaxes).toBe(1100);
  });

  it('should apply discount correctly', () => {
    const items = [{ hours: 10 }];
    const { result } = renderHook(() =>
      useFinancialCalculations(items, 100, 0, 10)
    );

    expect(result.current.totalWithTaxes).toBe(1000);
    expect(result.current.discountAmount).toBe(100); // 1000 * 0.1
    expect(result.current.totalInvestment).toBe(900);
  });

  it('should handle complex scenarios with taxes and discounts', () => {
    const items = [{ hours: 10 }, { hours: 15 }];
    const { result } = renderHook(() =>
      useFinancialCalculations(items, 100, 15, 10)
    );

    const subtotal = 2500; // (10 + 15) * 100
    const tax = subtotal * 0.15; // 375
    const totalWithTaxes = subtotal + tax; // 2875
    const discount = totalWithTaxes * 0.1; // 287.5
    const totalInvestment = totalWithTaxes - discount; // 2587.5

    expect(result.current.subtotal).toBe(subtotal);
    expect(result.current.taxAmount).toBe(tax);
    expect(result.current.totalWithTaxes).toBe(totalWithTaxes);
    expect(result.current.discountAmount).toBe(discount);
    expect(result.current.totalInvestment).toBe(totalInvestment);
  });

  it('should handle empty items array', () => {
    const { result } = renderHook(() =>
      useFinancialCalculations([], 100, 10, 5)
    );

    expect(result.current.subtotal).toBe(0);
    expect(result.current.totalHours).toBe(0);
    expect(result.current.totalInvestment).toBe(0);
  });
});
