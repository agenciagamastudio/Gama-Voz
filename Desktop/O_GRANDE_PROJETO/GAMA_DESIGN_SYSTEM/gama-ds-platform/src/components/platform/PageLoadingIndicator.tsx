'use client'

import { usePageLoading } from '@/hooks/usePageLoading'
import { Spinner } from '@/components/atoms/Spinner'

export function PageLoadingIndicator() {
  const { isLoading } = usePageLoading()

  if (!isLoading) return null

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm pointer-events-none transition-opacity duration-200 z-[1000]"
      style={{
        opacity: isLoading ? 1 : 0,
        pointerEvents: isLoading ? 'auto' : 'none',
      }}
    >
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" color="#88CE11" variant="gama-studio" />
        <p className="text-gama-text-secondary text-sm font-medium animate-pulse">
          Carregando...
        </p>
      </div>
    </div>
  )
}
