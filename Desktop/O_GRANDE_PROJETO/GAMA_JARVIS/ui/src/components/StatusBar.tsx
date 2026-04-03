'use client'

import React, { useEffect, useState } from 'react'

interface StatusBarProps {
  groqConnected: boolean
  activeProjects: number
}

export default function StatusBar({ groqConnected, activeProjects }: StatusBarProps) {
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    // Update time every second
    const updateTime = () => {
      const now = new Date()
      const formatted = now.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      })
      setCurrentTime(formatted)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 bg-surface/80 backdrop-blur-sm border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Groq Status */}
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              groqConnected ? 'bg-primary animate-pulse' : 'bg-red-500'
            }`}
          />
          <span className="text-text-secondary text-xs font-medium">
            {groqConnected ? '✅ Groq' : '❌ Desconectado'}
          </span>
        </div>

        {/* Monitor Status */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-text-secondary text-xs font-medium">
            {activeProjects} projetos online
          </span>
        </div>

        {/* Current Time */}
        <div className="text-text-secondary text-xs font-medium font-mono">
          {currentTime || '--:--'}
        </div>
      </div>
    </div>
  )
}
