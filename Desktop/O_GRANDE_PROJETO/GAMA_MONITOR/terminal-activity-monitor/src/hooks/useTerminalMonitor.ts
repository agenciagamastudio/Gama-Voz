import { useEffect, useState, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'
import { useAuth } from '@/contexts/AuthContext'

interface TerminalMetrics {
  status: 'online' | 'offline' | 'running' | 'idle'
  activeProcesses: number
  completedTasks: number
  errors: number
  health: number
}

interface LogEntry {
  id: string
  timestamp: string
  agent?: string
  message: string
  status: 'info' | 'success' | 'warning' | 'error'
}

export function useTerminalMonitor(terminalId: string) {
  const [metrics, setMetrics] = useState<TerminalMetrics | null>(null)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [socket, setSocket] = useState<Socket | null>(null)
  const { token } = useAuth()

  useEffect(() => {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3101'

    const newSocket = io(wsUrl, {
      reconnectionDelay: 1000,
      reconnection: true,
      reconnectionAttempts: 10,
      transports: ['websocket'],
      auth: token ? { token } : {},
    })

    newSocket.on('connect', () => {
      setIsConnected(true)
      newSocket.emit('subscribe', { terminal: terminalId })
    })

    newSocket.on('disconnect', () => {
      setIsConnected(false)
    })

    newSocket.on('terminal:status', (data: TerminalMetrics) => {
      setMetrics(data)
    })

    newSocket.on('terminal:log', (log: LogEntry) => {
      setLogs((prev) => [...prev.slice(-99), log]) // Keep last 100 logs
    })

    newSocket.on('terminal:logs', (newLogs: LogEntry[]) => {
      setLogs(newLogs)
    })

    setSocket(newSocket)

    return () => {
      if (newSocket) {
        newSocket.disconnect()
      }
    }
  }, [terminalId, token])

  const sendLog = useCallback(
    (log: Omit<LogEntry, 'id' | 'timestamp'>) => {
      if (socket && isConnected) {
        socket.emit('terminal:log', log)
      }
    },
    [socket, isConnected]
  )

  return {
    metrics,
    logs,
    isConnected,
    sendLog,
  }
}
