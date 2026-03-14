'use client'

import StatusBadge from '../atoms/StatusBadge'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

interface TerminalStatusProps {
  terminalName: string
  status: 'online' | 'offline' | 'running' | 'idle'
  activeProcesses: number
  completedTasks: number
  errors: number
  lastActivity: string
  uptime?: string
  health?: number
}

export default function TerminalStatus({
  terminalName,
  status,
  activeProcesses,
  completedTasks,
  errors,
  lastActivity,
  uptime,
  health,
}: TerminalStatusProps) {
  const timeAgo = dayjs(lastActivity).fromNow()

  return (
    <div className="bg-surface rounded-lg border border-void-dark/20 p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-geist font-semibold text-text-primary">
            {terminalName}
          </h2>
          <div className="mt-2">
            <StatusBadge status={status} />
          </div>
        </div>
        {health !== undefined && (
          <div className="text-right">
            <div className="text-sm text-text-secondary">Health</div>
            <div
              className="text-xl font-geist font-bold"
              style={{
                color:
                  health > 80
                    ? '#10B981'
                    : health > 50
                      ? '#F59E0B'
                      : '#E11D48',
              }}
            >
              {health}%
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1">
          <div className="text-xs text-text-secondary uppercase tracking-wider">
            Running
          </div>
          <div className="text-2xl font-geist font-bold text-kinetic-limon">
            {activeProcesses}
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-xs text-text-secondary uppercase tracking-wider">
            Completed
          </div>
          <div className="text-2xl font-geist font-bold text-status-success">
            {completedTasks}
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-xs text-text-secondary uppercase tracking-wider">
            Errors
          </div>
          <div
            className="text-2xl font-geist font-bold"
            style={{ color: errors > 0 ? '#E11D48' : '#10B981' }}
          >
            {errors}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-void-dark/20 text-sm text-text-tertiary">
        <div>Last Activity: {timeAgo}</div>
        {uptime && <div>Uptime: {uptime}</div>}
      </div>
    </div>
  )
}
