'use client'

import { useEffect, useRef } from 'react'
import LogEntry from '../molecules/LogEntry'

interface Log {
  id: string
  timestamp: string
  agent?: string
  message: string
  status: 'info' | 'success' | 'warning' | 'error'
}

interface ActivityStreamProps {
  logs: Log[]
  isLoading?: boolean
}

export default function ActivityStream({ logs, isLoading }: ActivityStreamProps) {
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Auto-scroll to latest entry
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  return (
    <div className="flex-1 bg-surface rounded-lg border border-void-dark/20 overflow-hidden flex flex-col">
      <div className="p-4 border-b border-void-dark/20">
        <h3 className="text-sm font-geist font-semibold text-kinetic-limon">
          Activity Stream (Live)
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-0">
        {logs.length === 0 ? (
          <div className="flex items-center justify-center h-full text-text-tertiary">
            {isLoading ? 'Conectando...' : 'Aguardando atividades...'}
          </div>
        ) : (
          logs.map((log) => <LogEntry key={log.id} {...log} />)
        )}
        <div ref={endRef} />
      </div>
    </div>
  )
}
