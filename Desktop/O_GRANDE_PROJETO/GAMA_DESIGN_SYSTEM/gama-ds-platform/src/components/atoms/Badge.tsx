import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md'
  withDot?: boolean
  className?: string
}

export function Badge({ children, variant = 'default', size = 'md', withDot = false, className = '' }: BadgeProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-bold rounded-full shadow-sm'

  const variantStyles = {
    default: 'bg-gama-surface-accent text-gama-text border-2 border-gama-border-default dark:border-gama-surface',
    success: 'bg-green-100 text-green-900 border-2 border-green-400 dark:bg-green-900/40 dark:text-green-300 dark:border-green-600',
    warning: 'bg-amber-100 text-amber-900 border-2 border-amber-400 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-600',
    error: 'bg-red-100 text-red-900 border-2 border-red-400 dark:bg-red-900/40 dark:text-red-300 dark:border-red-600',
    info: 'bg-blue-100 text-blue-900 border-2 border-blue-400 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-600',
  }

  const sizeStyles = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
  }

  const dotColor = {
    default: 'bg-gama-text',
    success: 'bg-gama-success',
    warning: 'bg-gama-warning',
    error: 'bg-gama-error',
    info: 'bg-gama-info',
  }

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {withDot && <div className={`w-2 h-2 rounded-full ${dotColor[variant]}`} />}
      {children}
    </div>
  )
}
