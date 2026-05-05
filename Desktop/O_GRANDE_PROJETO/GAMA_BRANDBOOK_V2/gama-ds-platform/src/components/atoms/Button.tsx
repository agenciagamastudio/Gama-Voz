import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'glass' | 'glass-illuminated'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  className?: string
  ariaLabel?: string
  ariaDescribedBy?: string
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  ariaLabel,
  ariaDescribedBy,
}: ButtonProps) {
  const baseStyles = 'font-bold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center whitespace-nowrap shadow-sm hover:shadow-md active:shadow-sm'

  const variantStyles = {
    primary: 'bg-gama-primary text-black border border-gama-primary glow-green [&:hover]:brightness-[var(--brightness-hover)] [&:active]:brightness-[var(--brightness-active)] transition-all duration-200',
    secondary: 'bg-gama-surface text-gama-text border-2 border-gama-border-default hover:border-gama-primary active:border-gama-primary hover:bg-gama-surface-accent transition-all duration-200',
    ghost: 'text-gama-primary border-2 border-gama-primary hover:bg-gama-primary hover:text-gama-dark active:bg-gama-primary active:opacity-[var(--opacity-active)] transition-all duration-200',
    danger: 'bg-gama-error text-white border border-gama-error [&:hover]:brightness-[var(--brightness-hover)] [&:active]:brightness-[var(--brightness-active)] transition-all duration-200',
    glass: 'glass text-gama-text hover:shadow-lg active:shadow-sm',
    'glass-illuminated': 'glass-illuminated text-gama-text font-semibold hover:shadow-lg active:shadow-sm',
  }

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm h-8',
    md: 'px-6 py-3 text-base h-10',
    lg: 'px-8 py-4 text-lg h-12',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-disabled={disabled || loading}
    >
      {loading ? '⟳' : children}
    </button>
  )
}
