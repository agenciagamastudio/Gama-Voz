import { ReactNode } from 'react'

export interface ErrorMessageProps {
  children: ReactNode
  role?: 'alert' | 'status'
  icon?: ReactNode
  className?: string
}

export function ErrorMessage({
  children,
  role = 'alert',
  icon,
  className = '',
}: ErrorMessageProps) {
  return (
    <div
      role={role}
      className={`flex items-center gap-2 text-sm text-gama-error mt-2 ${className}`}
      aria-live="polite"
      aria-atomic="true"
    >
      {icon || <span className="text-lg">❌</span>}
      <span>{children}</span>
    </div>
  )
}
