/**
 * Button Atom Component
 * ═══════════════════════════════════════════════════════════════════
 *
 * Primary, Secondary, Tertiary variants using GAMA Design Tokens
 * Based on: GAMA_DESIGN_SYSTEM/tokens/tokens.yaml
 *
 * Migration Date: 2026-03-09
 * Status: Production Ready
 */

import React from 'react';
import './Button.css';

export interface ButtonProps {
  /** Button content */
  children: React.ReactNode;
  /** Variant: primary (brand green), secondary (outline), tertiary (ghost) */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** Size: small, medium, large */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state */
  disabled?: boolean;
  /** Click handler */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** CSS class for additional styling */
  className?: string;
  /** HTML type attribute */
  type?: 'button' | 'submit' | 'reset';
  /** ARIA label for accessibility */
  ariaLabel?: string;
}

/**
 * Button Component
 *
 * @example
 * // Primary button (brand green #88CE11)
 * <Button variant="primary" size="md">Click me</Button>
 *
 * @example
 * // Secondary outline button
 * <Button variant="secondary" size="lg">Outline Button</Button>
 *
 * @example
 * // Tertiary ghost button
 * <Button variant="tertiary">Ghost Button</Button>
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = '',
  type = 'button',
  ariaLabel,
}) => {
  const baseClass = 'btn';
  const variantClass = `btn--${variant}`;
  const sizeClass = `btn--${size}`;
  const disabledClass = disabled ? 'btn--disabled' : '';

  const classes = [
    baseClass,
    variantClass,
    sizeClass,
    disabledClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={onClick}
      type={type}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;
