'use client'

import { useState, useEffect, useCallback } from 'react'
import TerminalStatus from './TerminalStatus'
import ActivityStream from './ActivityStream'
import { useTerminalMonitor } from '@/hooks/useTerminalMonitor'

type TerminalType = 'claude-code' | 'aios' | 'aiox'

interface TerminalData {
  name: string
  status: 'online' | 'offline' | 'running' | 'idle'
  activeProcesses: number
  completedTasks: number
  errors: number
  lastActivity: string
  uptime?: string
  health?: number
  logs: Array<{
    id: string
    timestamp: string
    agent?: string
    message: string
    status: 'info' | 'success' | 'warning' | 'error'
  }>
}

const TERMINAL_CONFIGS: Record<TerminalType, { label: string; color: string }> =
  {
    'claude-code': { label: 'Claude Code', color: 'from-purple-500/20 to-purple-900/20' },
    aios: { label: 'AIOS', color: 'from-blue-500/20 to-blue-900/20' },
    aiox: { label: 'AIOX', color: 'from-green-500/20 to-green-900/20' },
  }

export default function TerminalActivityMonitor() {
  const [selectedFilters, setSelectedFilters] = useState<TerminalType[]>(['claude-code', 'aios', 'aiox'])
  const [terminals, setTerminals] = useState<Record<TerminalType, TerminalData>>(
    {
      'claude-code': {
        name: 'Claude Code Terminal',
        status: 'offline',
        activeProcesses: 0,
        completedTasks: 0,
        errors: 0,
        lastActivity: new Date().toISOString(),
        logs: [],
      },
      aios: {
        name: 'AIOS System',
        status: 'offline',
        activeProcesses: 0,
        completedTasks: 0,
        errors: 0,
        lastActivity: new Date().toISOString(),
        logs: [],
      },
      aiox: {
        name: 'AIOX Squads',
        status: 'offline',
        activeProcesses: 0,
        completedTasks: 0,
        errors: 0,
        lastActivity: new Date().toISOString(),
        logs: [],
      },
    }
  )
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsConnected(true), 500)

    const demoTerminals: Record<TerminalType, TerminalData> = {
      'claude-code': {
        name: 'Claude Code Terminal',
        status: 'online',
        activeProcesses: 3,
        completedTasks: 47,
        errors: 0,
        lastActivity: new Date().toISOString(),
        health: 98,
        logs: [
          {
            id: '1',
            timestamp: new Date(Date.now() - 5000).toISOString(),
            agent: '@dev',
            message: 'Starting dashboard creation...',
            status: 'info',
          },
          {
            id: '2',
            timestamp: new Date(Date.now() - 3000).toISOString(),
            agent: '@dashboard-maestro',
            message: 'Phase 1: Requirements analysis complete',
            status: 'success',
          },
          {
            id: '3',
            timestamp: new Date().toISOString(),
            agent: '@frontend-widget-expert',
            message: 'React components rendered successfully',
            status: 'success',
          },
        ],
      },
      aios: {
        name: 'AIOS System',
        status: 'running',
        activeProcesses: 5,
        completedTasks: 89,
        errors: 0,
        lastActivity: new Date().toISOString(),
        health: 99,
        logs: [
          {
            id: '1',
            timestamp: new Date(Date.now() - 10000).toISOString(),
            agent: '@architect',
            message: 'System architecture review passed',
            status: 'success',
          },
          {
            id: '2',
            timestamp: new Date(Date.now() - 5000).toISOString(),
            agent: '@qa',
            message: 'Quality gate validation in progress',
            status: 'info',
          },
          {
            id: '3',
            timestamp: new Date().toISOString(),
            agent: '@devops',
            message: 'Deploying to production environment',
            status: 'warning',
          },
        ],
      },
      aiox: {
        name: 'AIOX Squads',
        status: 'running',
        activeProcesses: 2,
        completedTasks: 23,
        errors: 0,
        lastActivity: new Date().toISOString(),
        health: 95,
        logs: [
          {
            id: '1',
            timestamp: new Date(Date.now() - 8000).toISOString(),
            agent: '@squad-chief',
            message: 'Squad creation workflow initialized',
            status: 'info',
          },
          {
            id: '2',
            timestamp: new Date(Date.now() - 4000).toISOString(),
            agent: '@apex-lead',
            message: 'Frontend squad agents activated',
            status: 'success',
          },
          {
            id: '3',
            timestamp: new Date().toISOString(),
            message: 'Waiting for next command...',
            status: 'info',
          },
        ],
      },
    }

    setTerminals(demoTerminals)
    return () => clearTimeout(timer)
  }, [])

  const toggleFilter = (terminalId: TerminalType) => {
    setSelectedFilters(prev =>
      prev.includes(terminalId)
        ? prev.filter(t => t !== terminalId)
        : [...prev, terminalId]
    )
  }

  const visibleTerminals = (Object.keys(TERMINAL_CONFIGS) as TerminalType[]).filter(
    id => selectedFilters.includes(id)
  )

  return (
    <div className="min-h-screen bg-void-dark">
      {/* Header with Filters */}
      <header className="bg-gradient-to-r from-void-darker to-void-dark border-b border-white/10 sticky top-0 z-40">
        <div className="p-4 max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-kinetic-limon">Terminal Monitor</h1>
              <p className="text-sm text-text-secondary mt-1">Real-time activity across all systems</p>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              {(Object.keys(TERMINAL_CONFIGS) as TerminalType[]).map((terminalId) => (
                <button
                  key={terminalId}
                  onClick={() => toggleFilter(terminalId)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedFilters.includes(terminalId)
                      ? 'bg-kinetic-limon text-black shadow-lg'
                      : 'bg-white/5 text-text-secondary hover:bg-white/10'
                  }`}
                >
                  {TERMINAL_CONFIGS[terminalId].label}
                </button>
              ))}
            </div>

            {/* Connection Status */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-yellow-500'}`} />
              <span className="text-xs text-text-secondary">
                {isConnected ? 'Connected' : 'Connecting...'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Grid View */}
      <main className="p-6 max-w-7xl mx-auto">
        {visibleTerminals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-secondary">Select at least one terminal to view</p>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            visibleTerminals.length === 1 ? 'grid-cols-1' :
            visibleTerminals.length === 2 ? 'grid-cols-2' :
            'grid-cols-3'
          }`}>
            {visibleTerminals.map((terminalId) => {
              const terminal = terminals[terminalId]
              const config = TERMINAL_CONFIGS[terminalId]

              return (
                <div
                  key={terminalId}
                  className={`bg-gradient-to-br ${config.color} border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm`}
                >
                  {/* Terminal Header */}
                  <div className="bg-void-darker/50 border-b border-white/10 p-4">
                    <h2 className="font-bold text-white">{config.label}</h2>
                    <p className="text-xs text-text-secondary mt-1">{terminal.name}</p>
                  </div>

                  {/* Terminal Body */}
                  <div className="p-4 space-y-4">
                    {/* Status Metrics */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-xs text-text-secondary">Status</p>
                        <p className="text-sm font-semibold text-white capitalize mt-1">
                          {terminal.status === 'online' ? '🟢' : terminal.status === 'offline' ? '🔴' : '🟡'} {terminal.status}
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-xs text-text-secondary">Health</p>
                        <p className="text-sm font-semibold text-kinetic-limon mt-1">
                          {terminal.health}%
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-xs text-text-secondary">Active</p>
                        <p className="text-sm font-semibold text-white mt-1">
                          {terminal.activeProcesses} process{terminal.activeProcesses !== 1 ? 'es' : ''}
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-xs text-text-secondary">Completed</p>
                        <p className="text-sm font-semibold text-white mt-1">
                          {terminal.completedTasks} tasks
                        </p>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div>
                      <p className="text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wider">
                        Recent Activity
                      </p>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {terminal.logs.slice(-3).map((log) => (
                          <div
                            key={log.id}
                            className="bg-white/5 rounded p-2 text-xs border-l-2 border-kinetic-limon"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-text-secondary">{log.agent || 'system'}</span>
                              <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                                log.status === 'success' ? 'bg-green-500/20 text-green-400' :
                                log.status === 'error' ? 'bg-red-500/20 text-red-400' :
                                log.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-blue-500/20 text-blue-400'
                              }`}>
                                {log.status}
                              </span>
                            </div>
                            <p className="text-text-secondary mt-1 truncate">{log.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
