import React from 'react';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'success' | 'warning' | 'error' | 'info';
  title?: string;
  description?: string;
  onClose?: () => void;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({
    variant = 'info',
    title,
    description,
    onClose,
    children,
    className = '',
    ...props
  }, ref) => {
    const variants = {
      success: {
        bg: 'bg-gama-success/10',
        border: 'border-gama-success',
        text: 'text-gama-success',
        icon: '✓',
      },
      warning: {
        bg: 'bg-gama-warning/10',
        border: 'border-gama-warning',
        text: 'text-gama-warning',
        icon: '⚠',
      },
      error: {
        bg: 'bg-gama-error/10',
        border: 'border-gama-error',
        text: 'text-gama-error',
        icon: '✕',
      },
      info: {
        bg: 'bg-gama-info/10',
        border: 'border-gama-info',
        text: 'text-gama-info',
        icon: 'ℹ',
      },
    };

    const style = variants[variant];

    return (
      <div
        ref={ref}
        className={`${style.bg} border ${style.border} rounded-lg p-4 ${className}`}
        {...props}
      >
        <div className="flex items-start gap-3">
          <span className={`${style.text} font-bold text-lg flex-shrink-0`}>
            {style.icon}
          </span>
          <div className="flex-1">
            {title && (
              <h4 className={`${style.text} font-semibold mb-1`}>{title}</h4>
            )}
            {description && (
              <p className={`${style.text} text-sm opacity-90`}>
                {description}
              </p>
            )}
            {children && <div className={`${style.text} text-sm`}>{children}</div>}
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className={`${style.text} hover:opacity-70 transition-opacity flex-shrink-0 text-lg`}
              aria-label="Close alert"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';
