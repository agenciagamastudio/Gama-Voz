'use client'

interface StatusBadgeProps {
  status: 'online' | 'offline' | 'running' | 'idle' | 'error'
  label?: string
}

const statusConfig = {
  online: { color: '#10B981', icon: '🟢', text: 'Online' },
  offline: { color: '#6B7280', icon: '⚪', text: 'Offline' },
  running: { color: '#10B981', icon: '🟢', text: 'Running' },
  idle: { color: '#F59E0B', icon: '🟡', text: 'Idle' },
  error: { color: '#E11D48', icon: '🔴', text: 'Error' },
}

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <div className="inline-flex items-center gap-2">
      <span>{config.icon}</span>
      <span className="text-sm font-geist text-text-primary">
        {label || config.text}
      </span>
    </div>
  )
}
