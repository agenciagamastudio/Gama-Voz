import { InputHTMLAttributes } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  showPasswordToggle?: boolean
  inputId?: string
}

export function Input({
  label,
  error,
  helperText,
  showPasswordToggle = false,
  type = 'text',
  inputId,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const id = inputId || `input-${Math.random().toString(36).substr(2, 9)}`
  const errorId = `${id}-error`
  const helperTextId = `${id}-helper`

  const inputType = showPasswordToggle && type === 'password' && showPassword ? 'text' : type

  // Build aria-describedby with all relevant descriptions
  const ariaDescribedBy = [
    error ? errorId : null,
    !error && helperText ? helperTextId : null,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-bold text-gama-text mb-2">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={id}
          type={inputType}
          className={`w-full px-4 py-3 rounded-lg bg-gama-surface border-2 motion-transition-default shadow-sm focus:shadow-md ${
            error ? 'border-gama-error focus:border-gama-error' : 'border-gama-surface-accent focus:border-gama-primary focus:border-opacity-100'
          } text-gama-text placeholder:text-gama-text-muted focus:outline-none dark:bg-gama-surface`}
          aria-describedby={ariaDescribedBy || undefined}
          aria-invalid={!!error}
          {...props}
        />

        {showPasswordToggle && type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gama-text-secondary hover:text-gama-text motion-transition-default"
            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && (
        <p id={errorId} className="text-xs text-gama-error mt-2" role="alert">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={helperTextId} className="text-xs text-gama-text-secondary mt-2">
          {helperText}
        </p>
      )}
    </div>
  )
}
