import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react'
import { useState } from 'react'

interface AlertProps {
  variant?: 'success' | 'warning' | 'error' | 'info'
  title?: string
  children: React.ReactNode
  dismissible?: boolean
  onDismiss?: () => void
}

export function Alert({
  variant = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
}: AlertProps) {
  const [isOpen, setIsOpen] = useState(true)

  const handleDismiss = () => {
    setIsOpen(false)
    onDismiss?.()
  }

  if (!isOpen) return null

  const colors = {
    success: {
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      icon: 'text-green-500',
      title: 'text-green-500',
    },
    warning: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      icon: 'text-amber-500',
      title: 'text-amber-500',
    },
    error: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      icon: 'text-red-500',
      title: 'text-red-500',
    },
    info: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      icon: 'text-blue-500',
      title: 'text-blue-500',
    },
  }

  const icons = {
    success: <CheckCircle size={20} className={colors.success.icon} />,
    warning: <AlertTriangle size={20} className={colors.warning.icon} />,
    error: <AlertCircle size={20} className={colors.error.icon} />,
    info: <Info size={20} className={colors.info.icon} />,
  }

  const color = colors[variant]

  return (
    <div
      className={`${color.bg} border ${color.border} rounded-xl p-4 flex gap-3 motion-enter-slide`}
      role="alert"
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
    >
      {icons[variant]}
      <div className="flex-1">
        {title && <p className={`font-bold ${color.title} mb-1`}>{title}</p>}
        <p className="text-gama-text-secondary text-sm">{children}</p>
      </div>
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="text-gama-text-secondary hover:text-gama-text motion-transition-default"
          aria-label="Fechar alerta"
        >
          <X size={18} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
