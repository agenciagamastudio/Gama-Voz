'use client'

import { useState } from 'react'
import { useBrandSwitcher } from '@/hooks/useBrand'
import { ChevronDown } from 'lucide-react'

export function BrandSwitcher() {
  const { activeBrandId, setActiveBrand, brands } = useBrandSwitcher()
  const [isOpen, setIsOpen] = useState(false)

  const activeBrand = brands.find((b) => b.id === activeBrandId)

  if (!activeBrand || brands.length === 0) {
    return null
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gama-surface hover:bg-gama-surface/80 motion-transition-default duration-200 text-sm font-medium text-gama-text"
        aria-label="Selecionar brand"
      >
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: activeBrand.metadata?.color || '#88CE11' }}
          aria-hidden="true"
        />
        <span>{activeBrand.name}</span>
        <ChevronDown
          size={16}
          className={`motion-transition-fast ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop para fechar ao clicar fora */}
          <div
            className="fixed inset-0 z-30"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-2 w-56 bg-gama-darker border border-gama-surface rounded-lg shadow-xl z-40 overflow-hidden">
            <div className="p-3 border-b border-gama-surface bg-gama-surface/30">
              <p className="text-xs font-semibold text-gama-text-secondary uppercase tracking-wider">
                Selecionar Brand
              </p>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {brands
                .sort((a, b) => a.order - b.order)
                .map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => {
                      setActiveBrand(brand.id)
                      setIsOpen(false)
                    }}
                    className={`w-full px-4 py-3 text-left motion-transition-default duration-200 flex items-center gap-3 ${
                      activeBrandId === brand.id
                        ? 'bg-gama-primary/20 text-gama-primary'
                        : 'hover:bg-gama-surface/60 text-gama-text'
                    }`}
                  >
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: brand.metadata?.color || '#88CE11' }}
                      aria-hidden="true"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{brand.name}</p>
                      <p className="text-xs text-gama-text-secondary truncate">
                        {brand.description}
                      </p>
                    </div>
                    {activeBrandId === brand.id && (
                      <div className="w-2 h-2 rounded-full bg-gama-primary flex-shrink-0" />
                    )}
                  </button>
                ))}
            </div>

            <div className="p-3 border-t border-gama-surface bg-gama-surface/30">
              <p className="text-xs text-gama-text-secondary">
                {brands.length} brand{brands.length !== 1 ? 's' : ''} disponível
                {brands.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
