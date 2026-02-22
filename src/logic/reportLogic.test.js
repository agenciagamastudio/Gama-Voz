// src/logic/reportLogic.test.js
import { describe, it, expect } from 'vitest';
import { generateFinancialReport, formatCurrency } from './reportLogic';

describe('formatCurrency', () => {
  it('should format a positive number as Brazilian currency', () => {
    expect(formatCurrency(1234.56)).toBe('R$ 1.234,56');
  });

  it('should format zero as Brazilian currency', () => {
    expect(formatCurrency(0)).toBe('R$ 0,00');
  });

  it('should format a negative number as Brazilian currency', () => {
    expect(formatCurrency(-987.65)).toBe('-R$ 987,65');
  });

  it('should return "R$ 0,00" for NaN input', () => {
    expect(formatCurrency(NaN)).toBe('R$ 0,00');
    expect(formatCurrency(undefined)).toBe('R$ 0,00');
    expect(formatCurrency(null)).toBe('R$ 0,00');
  });
});

describe('generateFinancialReport', () => {
  const daysInYear = 252; // Matching the logic file
  const weeksInYear = 52;
  const monthsInYear = 12;

  describe('pricing report', () => {
    it('should generate a pricing report with valid data', () => {
      const pricingResults = { basePrice: 1000, finalPrice: 1200 };
      const report = generateFinancialReport('pricing', pricingResults);

      expect(report.type).toBe('pricing');
      expect(report.summary.basePrice).toBe(1000);
      expect(report.summary.finalPrice).toBe(1200);
      expect(report.message).toContain('R$ 1.200,00');
    });

    it('should handle NaN inputs for pricing report', () => {
      const pricingResults = { basePrice: NaN, finalPrice: NaN };
      const report = generateFinancialReport('pricing', pricingResults);

      expect(report.type).toBe('pricing');
      expect(report.summary.basePrice).toBeUndefined(); // Or it could be 0 depending on desired behavior
      expect(report.summary.finalPrice).toBeUndefined(); // Or it could be 0
    });

    it('should include custom message in pricing report', () => {
      const pricingResults = { basePrice: 1000, finalPrice: 1200 };
      const customMessage = 'This is a test pricing report.';
      const report = generateFinancialReport('pricing', pricingResults, customMessage);

      expect(report.message).toBe(customMessage);
    });
  });

  describe('gap report', () => {
    it('should generate a gap report with valid data and correct dailySavings calculation', () => {
      const gapResults = { annualLoss: 52000, annualSavings: 26000 };
      const report = generateFinancialReport('gap', gapResults);

      expect(report.type).toBe('gap');
      expect(report.summary.annualLoss).toBe(52000);
      expect(report.summary.annualSavings).toBe(26000);
      expect(report.summary.netImpact).toBe(gapResults.annualSavings - gapResults.annualLoss); // 26000 - 52000 = -26000

      // Verify dailySavings bug fix
      expect(report.projections.dailySavings).toBeCloseTo(gapResults.annualSavings / daysInYear); // 26000 / 252
      expect(report.projections.dailyLoss).toBeCloseTo(gapResults.annualLoss / daysInYear); // 52000 / 252

      expect(report.projections.weeklySavings).toBeCloseTo(gapResults.annualSavings / weeksInYear); // 26000 / 52 = 500
      expect(report.projections.weeklyLoss).toBeCloseTo(gapResults.annualLoss / weeksInYear); // 52000 / 52 = 1000

      expect(report.projections.monthlySavings).toBeCloseTo(gapResults.annualSavings / monthsInYear); // 26000 / 12
      expect(report.projections.monthlyLoss).toBeCloseTo(gapResults.annualLoss / monthsInYear); // 52000 / 12

      expect(report.message).toContain('R$ 26.000,00');
      expect(report.message).toContain('R$ 52.000,00');
    });

    it('should handle NaN inputs for gap report', () => {
      const gapResults = { annualLoss: NaN, annualSavings: NaN };
      const report = generateFinancialReport('gap', gapResults);

      expect(report.type).toBe('gap');
      expect(report.summary.annualLoss).toBeNaN();
      expect(report.summary.annualSavings).toBeNaN();
      expect(report.summary.netImpact).toBeNaN(); // NaN - NaN = NaN
      expect(report.projections.dailySavings).toBeNaN();
    });

    it('should include custom message in gap report', () => {
      const gapResults = { annualLoss: 52000, annualSavings: 26000 };
      const customMessage = 'This is a test gap report.';
      const report = generateFinancialReport('gap', gapResults, customMessage);

      expect(report.message).toBe(customMessage);
    });
  });
});
