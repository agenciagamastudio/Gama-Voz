import { ReactNode } from 'react'

export interface FieldErrorProps {
  id?: string
  children: ReactNode
  className?: string
}

export function FieldError({
  id,
  children,
  className = '',
}: FieldErrorProps) {
  return (
    <p
      id={id}
      className={`text-xs font-medium text-gama-error mt-1.5 flex items-center gap-1 ${className}`}
      role="alert"
      aria-live="polite"
    >
      <span className="text-sm">⚠️</span>
      {children}
    </p>
  )
}
