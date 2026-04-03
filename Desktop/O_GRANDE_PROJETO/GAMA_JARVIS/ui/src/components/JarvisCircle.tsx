import React from 'react'

interface JarvisCircleProps {
  state: 'idle' | 'listening' | 'activated' | 'processing' | 'responding'
}

export default function JarvisCircle({ state }: JarvisCircleProps) {
  const getAnimationClass = () => {
    switch (state) {
      case 'listening':
        return 'animate-pulse-slow'
      case 'activated':
        return 'animate-pulse-fast'
      case 'processing':
        return 'animate-spin-slow'
      case 'responding':
        return 'animate-wave'
      case 'idle':
      default:
        return ''
    }
  }

  const getOpacityClass = () => {
    switch (state) {
      case 'idle':
        return 'opacity-60'
      case 'listening':
        return 'opacity-70'
      case 'activated':
      case 'processing':
      case 'responding':
        return 'opacity-100'
      default:
        return 'opacity-60'
    }
  }

  const getGlowClass = () => {
    switch (state) {
      case 'activated':
      case 'processing':
      case 'responding':
        return 'shadow-lg'
      default:
        return 'shadow-md'
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      {/* Main Circle */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Outer glow (responding state) */}
        {state === 'responding' && (
          <div className="absolute inset-0 bg-primary rounded-full opacity-20 animate-pulse" />
        )}

        {/* Middle ring (processing state) */}
        {state === 'processing' && (
          <div className="absolute inset-4 border-2 border-primary rounded-full animate-spin-slow opacity-40" />
        )}

        {/* Main circle */}
        <div
          className={`
            relative w-48 h-48 rounded-full
            bg-gradient-to-br from-primary to-primary
            flex items-center justify-center
            ${getAnimationClass()}
            ${getOpacityClass()}
            ${getGlowClass()}
            transition-all duration-300
            cursor-pointer
          `}
          style={{
            boxShadow: `0 0 30px var(--color-primary)`,
          }}
        >
          {/* Inner icon/text */}
          <div className="text-center">
            <div className="text-5xl font-black text-black">
              {state === 'idle' && '🎤'}
              {state === 'listening' && '👂'}
              {state === 'activated' && '✅'}
              {state === 'processing' && '⚙️'}
              {state === 'responding' && '🗣️'}
            </div>
            <div className="text-xs text-black font-medium mt-2 uppercase tracking-widest">
              {state === 'idle' && 'Pronto'}
              {state === 'listening' && 'Escutando'}
              {state === 'activated' && 'Ativado'}
              {state === 'processing' && 'Processando'}
              {state === 'responding' && 'Respondendo'}
            </div>
          </div>
        </div>
      </div>

      {/* Status text below circle */}
      <p className="text-text-secondary text-sm text-center mt-4">
        {state === 'idle' && 'Diga "Jarvis" para começar'}
        {state === 'listening' && 'Aguardando "Jarvis"...'}
        {state === 'activated' && 'Sim, tô aqui!'}
        {state === 'processing' && 'Pensando...'}
        {state === 'responding' && 'Respondendo...'}
      </p>
    </div>
  )
}
