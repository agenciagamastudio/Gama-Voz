import { CheckIcon } from 'lucide-react'
import { useState } from 'react'

interface CheckboxProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  label?: string
  indeterminate?: boolean
}

export function Checkbox({
  checked = false,
  onChange,
  disabled = false,
  label,
  indeterminate = false,
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked)

  const handleChange = () => {
    if (!disabled) {
      setIsChecked(!isChecked)
      onChange?.(!isChecked)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleChange}
        disabled={disabled}
        className={`relative w-5 h-5 rounded border-2 motion-transition-default flex items-center justify-center shadow-sm ${
          isChecked || indeterminate
            ? 'bg-gama-primary border-gama-primary shadow-md'
            : 'border-gray-400 dark:border-gama-surface-accent hover:border-gama-primary dark:hover:border-gama-primary'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {isChecked && <CheckIcon size={14} className="text-gama-dark flex-shrink-0" />}
        {indeterminate && <div className="w-2 h-2 bg-gama-dark rounded-sm" />}
      </button>
      {label && <span className="text-sm text-gama-text">{label}</span>}
    </div>
  )
}
