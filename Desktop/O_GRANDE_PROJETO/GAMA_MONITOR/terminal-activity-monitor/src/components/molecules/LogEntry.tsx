'use client'

import dayjs from 'dayjs'

interface LogEntryProps {
  timestamp: string
  source?: string
  agent?: string
  message: string
  status: 'info' | 'success' | 'warning' | 'error'
}

const statusColors = {
  info: '#3B82F6',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#E11D48',
}

const statusEmoji = {
  info: '💬',
  success: '✓',
  warning: '⚠️',
  error: '✗',
}

export default function LogEntry({
  timestamp,
  agent,
  message,
  status,
}: LogEntryProps) {
  const time = dayjs(timestamp).format('HH:mm:ss')

  return (
    <div className="font-mono text-sm text-text-secondary hover:text-text-primary transition-colors py-2 border-b border-void-dark/20">
      <span className="text-text-tertiary">[{time}]</span>
      {agent && (
        <span
          className="ml-2 px-2 py-0.5 rounded text-xs font-semibold"
          style={{ color: statusColors[status] }}
        >
          {agent}
        </span>
      )}
      <span className="ml-2">{statusEmoji[status]}</span>
      <span className="ml-2 text-text-primary break-words">{message}</span>
    </div>
  )
}
