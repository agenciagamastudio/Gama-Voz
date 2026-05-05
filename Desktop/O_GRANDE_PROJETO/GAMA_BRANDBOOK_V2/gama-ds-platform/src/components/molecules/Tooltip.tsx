import { useState } from 'react'

interface TooltipProps {
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  children: React.ReactNode
}

export function Tooltip({
  content,
  position = 'top',
  delay = 200,
  children,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    const id = setTimeout(() => {
      setIsVisible(true)
    }, delay)
    setTimeoutId(id)
  }

  const handleMouseLeave = () => {
    if (timeoutId) clearTimeout(timeoutId)
    setIsVisible(false)
  }

  const positionStyles = {
    top: 'bottom-full mb-2 -translate-x-1/2 left-1/2',
    bottom: 'top-full mt-2 -translate-x-1/2 left-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
  }

  const arrowStyles = {
    top: 'top-full border-t-gama-dark border-l-transparent border-r-transparent',
    bottom: 'bottom-full border-b-gama-dark border-l-transparent border-r-transparent',
    left: 'left-full border-l-gama-dark border-t-transparent border-b-transparent',
    right: 'right-full border-r-gama-dark border-t-transparent border-b-transparent',
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {isVisible && (
        <div className={`absolute ${positionStyles[position]} z-50 pointer-events-none`}>
          <div className="glass-card text-gama-text text-sm px-3 py-2 rounded-lg whitespace-nowrap">
            {content}
          </div>
          <div
            className={`absolute w-2 h-2 ${arrowStyles[position]}`}
            style={{
              borderWidth: '4px',
            }}
          />
        </div>
      )}
    </div>
  )
}
