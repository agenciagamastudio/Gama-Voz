import { ReactNode } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

interface ModalHeaderProps {
  children: ReactNode
  onClose?: () => void
}

interface ModalBodyProps {
  children: ReactNode
}

interface ModalFooterProps {
  children: ReactNode
}

function ModalHeader({ children, onClose }: ModalHeaderProps) {
  return (
    <div className="flex items-center justify-between pb-4 border-b border-gama-surface-accent">
      {children}
      {onClose && (
        <button
          onClick={onClose}
          className="text-gama-text-secondary hover:text-gama-text motion-transition-default"
          aria-label="Fechar diálogo"
        >
          <X size={20} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

function ModalBody({ children }: ModalBodyProps) {
  return <div className="py-4">{children}</div>
}

function ModalFooter({ children }: ModalFooterProps) {
  return <div className="pt-4 border-t border-gama-surface-accent flex gap-3 justify-end">{children}</div>
}

export function Modal({ isOpen, onClose, title, size = 'md', children }: ModalProps) {
  if (!isOpen) return null

  const sizeStyles = {
    sm: 'w-96',
    md: 'w-[500px]',
    lg: 'w-[700px]',
  }

  // Handle Escape key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className={`${sizeStyles[size]} glass-card liquid-edge rounded-2xl shadow-xl motion-enter-scale`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="p-6">
          {title && (
            <ModalHeader onClose={onClose}>
              <h2 id="modal-title" className="text-xl font-bold text-gama-text">{title}</h2>
            </ModalHeader>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}

Modal.Header = ModalHeader
Modal.Body = ModalBody
Modal.Footer = ModalFooter
