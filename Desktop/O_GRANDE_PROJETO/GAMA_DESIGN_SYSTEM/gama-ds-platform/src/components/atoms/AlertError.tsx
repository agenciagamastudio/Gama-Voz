import { ReactNode } from 'react'
import { X } from 'lucide-react'

export interface AlertErrorProps {
  children: ReactNode
  title?: string
  onDismiss?: () => void
  dismissible?: boolean
  className?: string
}

export function AlertError({
  children,
  title,
  onDismiss,
  dismissible = true,
  className = '',
}: AlertErrorProps) {
  return (
    <div
      role="alert"
      className={`flex gap-3 p-4 bg-gama-error/10 border-l-4 border-gama-error rounded-md ${className}`}
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="flex-shrink-0 text-gama-error pt-0.5">
        <span className="text-lg">❌</span>
      </div>

      <div className="flex-1">
        {title && (
          <h3 className="font-semibold text-gama-error mb-1">
            {title}
          </h3>
        )}
        <div className="text-sm text-gama-text">
          {children}
        </div>
      </div>

      {dismissible && onDismiss && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 text-gama-text-secondary hover:text-gama-text motion-transition-default"
          aria-label="Fechar alerta de erro"
          type="button"
        >
          <X size={20} />
        </button>
      )}
    </div>
  )
}
