import { useState } from 'react'

interface ToggleProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  label?: string
}

export function Toggle({ checked = false, onChange, disabled = false, label }: ToggleProps) {
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
        className={`relative w-14 h-7 rounded-full motion-transition-default border-2 ${
          isChecked
            ? 'bg-gama-primary border-gama-primary shadow-md'
            : 'bg-gray-300 border-gray-400 dark:bg-gama-surface dark:border-gama-surface-accent shadow-sm'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-lg'}`}
        style={{ paddingLeft: '2px', paddingRight: '2px' }}
      >
        <div
          className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md motion-transition-fast ${
            isChecked ? 'translate-x-7' : 'translate-x-1'
          }`}
        />
      </button>
      {label && <span className="text-sm font-medium text-gama-text">{label}</span>}
    </div>
  )
}
