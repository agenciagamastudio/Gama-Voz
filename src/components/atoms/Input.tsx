/**
 * Input Atom Component
 * ═══════════════════════════════════════════════════════════════════
 *
 * Text input with focus state integration using GAMA Design Tokens
 * Based on: GAMA_DESIGN_SYSTEM/tokens/tokens.yaml
 *
 * Migration Date: 2026-03-09
 * Status: Production Ready
 */

import React from 'react';
import './Input.css';

export interface InputProps {
  /** Input type (text, number, email, password, etc) */
  type?: 'text' | 'number' | 'email' | 'password' | 'url' | 'tel' | 'date';
  /** Placeholder text */
  placeholder?: string;
  /** Input value */
  value?: string | number;
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Focus handler */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** Blur handler */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Help text */
  helpText?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Required indicator */
  required?: boolean;
  /** CSS class for additional styling */
  className?: string;
  /** HTML name attribute */
  name?: string;
  /** HTML id attribute */
  id?: string;
  /** ARIA label for accessibility */
  ariaLabel?: string;
  /** ARIA describedby for error/help text */
  ariaDescribedBy?: string;
}

/**
 * Input Component
 *
 * @example
 * // Basic input
 * <Input placeholder="Enter text" />
 *
 * @example
 * // Input with label and error
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="your@email.com"
 *   error="Invalid email format"
 * />
 *
 * @example
 * // Number input with help text
 * <Input
 *   type="number"
 *   label="Salary"
 *   helpText="Enter annual salary"
 *   onChange={(e) => setSalary(e.target.value)}
 * />
 */
export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  label,
  error,
  helpText,
  disabled = false,
  required = false,
  className = '',
  name,
  id,
  ariaLabel,
  ariaDescribedBy,
}) => {
  const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = `${inputId}-error`;
  const helpId = `${inputId}-help`;
  const descriedBy = ariaDescribedBy || [error && errorId, helpText && helpId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="input-wrapper">
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="input-required-indicator">*</span>}
        </label>
      )}

      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        name={name}
        className={`input ${error ? 'input--error' : ''} ${className}`.trim()}
        aria-label={ariaLabel}
        aria-describedby={descriedBy}
        aria-invalid={!!error}
        aria-required={required}
      />

      {error && (
        <div id={errorId} className="input-error">
          {error}
        </div>
      )}

      {helpText && (
        <div id={helpId} className="input-help">
          {helpText}
        </div>
      )}
    </div>
  );
};

export default Input;
