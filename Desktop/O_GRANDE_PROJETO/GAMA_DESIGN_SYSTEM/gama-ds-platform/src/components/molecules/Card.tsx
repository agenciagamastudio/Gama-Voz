import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  variant?: 'default' | 'elevated' | 'outlined'
}

interface CardHeaderProps {
  children: ReactNode
}

interface CardBodyProps {
  children: ReactNode
}

interface CardFooterProps {
  children: ReactNode
}

function CardHeader({ children }: CardHeaderProps) {
  return <div className="pb-4 border-b border-gama-surface-accent">{children}</div>
}

function CardBody({ children }: CardBodyProps) {
  return <div className="py-4">{children}</div>
}

function CardFooter({ children }: CardFooterProps) {
  return <div className="pt-4 border-t border-gama-surface-accent flex items-center justify-end gap-3">{children}</div>
}

export function Card({ children, variant = 'default' }: CardProps) {
  const variantStyles = {
    default: 'bg-gama-surface border-2 border-gama-surface-accent shadow-md',
    elevated: 'bg-gama-surface border-2 border-gama-surface-accent shadow-lg',
    outlined: 'bg-gama-dark border-2 border-gama-primary shadow-md',
  }

  return (
    <div className={`${variantStyles[variant]} rounded-2xl p-6 motion-transition-default hover:shadow-lg`}>
      {children}
    </div>
  )
}

Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter
