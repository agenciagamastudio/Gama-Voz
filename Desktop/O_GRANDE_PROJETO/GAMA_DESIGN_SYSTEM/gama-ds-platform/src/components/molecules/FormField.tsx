import { ReactNode } from 'react'

interface FormFieldProps {
  label?: string
  name?: string
  error?: string
  helperText?: string
  children: ReactNode
  required?: boolean
}

export function FormField({
  label,
  name,
  error,
  helperText,
  children,
  required = false,
}: FormFieldProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="block text-sm font-bold text-gama-text mb-2">
          {label}
          {required && <span className="text-gama-error ml-1">*</span>}
        </label>
      )}
      {children}
      {error && <p className="text-gama-error text-sm mt-2">{error}</p>}
      {helperText && !error && <p className="text-gama-text-secondary text-sm mt-2">{helperText}</p>}
    </div>
  )
}
