'use client'

import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface ColorSwatchProps {
  name: string
  hex: string
  rgb?: string
  hsl?: string
  usage?: string
  size?: 'sm' | 'md' | 'lg'
}

export function ColorSwatch({
  name,
  hex,
  rgb,
  hsl,
  usage,
  size = 'md',
}: ColorSwatchProps) {
  const [copied, setCopied] = useState(false)

  const sizeClass = {
    sm: 'h-12 w-full',
    md: 'h-20 w-full',
    lg: 'h-32 w-full',
  }[size]

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-xl overflow-hidden border border-gama-surface">
      <div
        className={`${sizeClass} motion-transition-fast hover:scale-105`}
        style={{ backgroundColor: hex }}
      />
      <div className="p-4 bg-gama-surface">
        <h3 className="text-sm font-semibold text-gama-text mb-2">{name}</h3>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-gama-text-secondary">Hex:</span>
            <button
              onClick={() => handleCopy(hex)}
              className="flex items-center gap-1 px-2 py-1 rounded bg-gama-darker hover:bg-gama-surface-accent motion-transition-default"
            >
              <code className="font-mono text-gama-text-secondary">{hex}</code>
              {copied ? (
                <Check size={14} className="text-gama-success" />
              ) : (
                <Copy size={14} className="text-gama-text-muted" />
              )}
            </button>
          </div>

          {rgb && (
            <div className="flex items-center justify-between">
              <span className="text-gama-text-secondary">RGB:</span>
              <button
                onClick={() => handleCopy(rgb)}
                className="flex items-center gap-1 px-2 py-1 rounded bg-gama-darker hover:bg-gama-surface-accent motion-transition-default"
              >
                <code className="font-mono text-gama-text-secondary text-xs">{rgb}</code>
                {copied ? (
                  <Check size={14} className="text-gama-success" />
                ) : (
                  <Copy size={14} className="text-gama-text-muted" />
                )}
              </button>
            </div>
          )}

          {hsl && (
            <div className="flex items-center justify-between">
              <span className="text-gama-text-secondary">HSL:</span>
              <button
                onClick={() => handleCopy(hsl)}
                className="flex items-center gap-1 px-2 py-1 rounded bg-gama-darker hover:bg-gama-surface-accent motion-transition-default"
              >
                <code className="font-mono text-gama-text-secondary text-xs">{hsl}</code>
                {copied ? (
                  <Check size={14} className="text-gama-success" />
                ) : (
                  <Copy size={14} className="text-gama-text-muted" />
                )}
              </button>
            </div>
          )}
        </div>

        {usage && (
          <p className="text-xs text-gama-text-tertiary mt-3 pt-3 border-t border-gama-surface-accent">
            <span className="font-semibold">Uso:</span> {usage}
          </p>
        )}
      </div>
    </div>
  )
}
