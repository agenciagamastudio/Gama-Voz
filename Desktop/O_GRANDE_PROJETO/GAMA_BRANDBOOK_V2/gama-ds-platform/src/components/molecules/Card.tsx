import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  variant?: 'default' | 'elevated' | 'outlined' | 'illuminated'
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
    default: 'glass glass-card liquid-edge rounded-2xl p-6 motion-transition-default hover:shadow-2xl hover:scale-105 border-2 border-gama-surface-accent shadow-lg',
    elevated: 'glass-intense glass-card liquid-edge rounded-2xl p-6 motion-transition-default hover:shadow-2xl hover:scale-105 border-2 border-gama-surface-accent shadow-xl',
    outlined: 'glass rounded-2xl p-6 motion-transition-default hover:shadow-2xl hover:scale-105 border-2 border-gama-primary shadow-lg',
    illuminated: 'glass-illuminated rounded-2xl p-6 motion-transition-default hover:shadow-2xl hover:scale-105 shadow-xl',
  }

  return (
    <div className={variantStyles[variant]}>
      {children}
    </div>
  )
}

Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter
