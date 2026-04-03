import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-gama-text font-semibold mb-2 text-sm">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-3 bg-gama-surface border border-gama-border text-gama-text rounded-lg placeholder-gama-text-secondary focus:outline-none focus:border-gama-primary focus:ring-2 focus:ring-gama-primary/20 transition-all duration-200 ${
            error ? 'border-gama-error focus:border-gama-error focus:ring-gama-error/20' : ''
          } ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-2 text-gama-error text-sm font-medium">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-2 text-gama-text-secondary text-sm">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
