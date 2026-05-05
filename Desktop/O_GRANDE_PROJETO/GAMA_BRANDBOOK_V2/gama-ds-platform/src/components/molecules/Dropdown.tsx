import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface DropdownOption {
  value: string
  label: string
  disabled?: boolean
}

interface DropdownProps {
  options: DropdownOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
}

export function Dropdown({
  options,
  value,
  onChange,
  placeholder = 'Select an option...',
  disabled = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<string | undefined>(value)

  const selectedOption = options.find((opt) => opt.value === selected)

  const handleSelect = (optionValue: string) => {
    setSelected(optionValue)
    onChange?.(optionValue)
    setIsOpen(false)
  }

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full flex items-center justify-between px-4 py-2 bg-gama-surface border border-gama-surface-accent rounded-lg text-gama-text motion-transition-default ${
          isOpen ? 'border-gama-primary' : ''
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gama-primary'}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedOption?.label || placeholder}</span>
        <ChevronDown
          size={18}
          className={`motion-transition-fast ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 right-0 mt-2 glass-card liquid-edge rounded-lg shadow-lg z-10"
          role="listbox"
        >
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              disabled={option.disabled}
              className={`w-full text-left px-4 py-2 hover:bg-gama-surface-accent motion-transition-default first:rounded-t-lg last:rounded-b-lg ${
                option.disabled ? 'opacity-50 cursor-not-allowed' : ''
              } ${selected === option.value ? 'bg-gama-primary/20' : ''}`}
              role="option"
              aria-selected={selected === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
