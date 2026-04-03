import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PricingPlans from '../../components/PricingPlans';

describe('PricingPlans - Neon Dynamic Color', () => {
  test('neon effect should use var(--primary-color-rgb) not hardcoded rgba', () => {
    const { container } = render(
      <BrowserRouter>
        <PricingPlans />
      </BrowserRouter>
    );

    // Get the heading element
    const heading = container.querySelector('h1');
    const classNames = heading.innerHTML;

    // Should contain the dynamic variable reference
    expect(classNames).toContain('rgba(var(--primary-color-rgb)');

    // Should NOT contain hardcoded green color (196,255,13)
    expect(classNames).not.toContain('rgba(196,255,13');
  });

  test('pricing component renders without errors', () => {
    const { container } = render(
      <BrowserRouter>
        <PricingPlans />
      </BrowserRouter>
    );

    // Component should render
    expect(container.querySelector('h1')).toBeTruthy();

    // Should have pricing tiers
    expect(container.querySelector('.grid')).toBeTruthy();
  });
});
