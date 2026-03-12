'use client'

import { useEffect, useState } from 'react'

interface Task {
  id: number
  name: string
  agent: string
  status: 'waiting' | 'running' | 'completed' | 'failed'
  progress: number
  estimatedTime: number
  elapsedTime: number
  output: string
  logs: string[]
}

interface MonitorData {
  sprint: string
  status: string
  startTime: string
  totalEstimatedTime: number
  totalElapsedTime: number
  overallProgress: number
  tasks: Task[]
}

export default function Monitor() {
  const [data, setData] = useState<MonitorData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMonitor = async () => {
      try {
        const res = await fetch('/api/monitor')
        const json = await res.json()
        setData(json)
        setLoading(false)
      } catch (error) {
        console.error('Erro ao carregar monitor:', error)
      }
    }

    fetchMonitor()
    const interval = setInterval(fetchMonitor, 10000) // Atualiza a cada 10s

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#88CE11] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#A1A1AA] font-bold">Carregando Monitor...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <p className="text-[#E11D48]">Erro ao carregar dados</p>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return '#88CE11'
      case 'completed': return '#10B981'
      case 'failed': return '#E11D48'
      default: return '#71717A'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'running': return '⚙️ Executando'
      case 'completed': return '✅ Concluído'
      case 'failed': return '❌ Falhou'
      default: return '⏳ Aguardando'
    }
  }

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs}h ${mins}m ${secs}s`
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-[#FFFFFF] mb-2 tracking-tight">
            👑 SPRINT MONITOR
          </h1>
          <p className="text-[#A1A1AA] font-bold tracking-widest text-sm uppercase">
            {data.sprint}
          </p>
        </div>

        {/* Progress Geral */}
        <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-8 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-black text-white">PROGRESSO GERAL</h2>
            <span className="text-[#88CE11] font-black text-2xl">
              {Math.round(data.overallProgress)}%
            </span>
          </div>
          <div className="h-3 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#88CE11] transition-all duration-500 rounded-full"
              style={{ width: `${data.overallProgress}%` }}
            />
          </div>
          <div className="flex justify-between mt-4 text-xs font-bold text-[#71717A] uppercase tracking-widest">
            <span>Tempo: {formatTime(data.totalElapsedTime)} / {formatTime(data.totalEstimatedTime)}</span>
            <span>{data.tasks.length} Tasks</span>
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.tasks.map((task) => (
            <div
              key={task.id}
              className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all"
            >
              {/* Task Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-black text-white mb-1">{task.name}</h3>
                  <p className="text-xs font-bold text-[#88CE11] uppercase tracking-widest">
                    {task.agent}
                  </p>
                </div>
                <span
                  className="text-sm font-black px-3 py-1 rounded-lg"
                  style={{ color: getStatusColor(task.status), backgroundColor: `${getStatusColor(task.status)}15` }}
                >
                  {getStatusLabel(task.status)}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-[#A1A1AA] font-bold">Progresso</span>
                  <span className="text-xs text-[#88CE11] font-bold">{task.progress}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#88CE11] transition-all duration-500"
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
              </div>

              {/* Task Meta */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                <div>
                  <p className="text-[#71717A] font-bold uppercase tracking-widest">Tempo</p>
                  <p className="text-white font-black">
                    {formatTime(task.elapsedTime)} / {formatTime(task.estimatedTime)}
                  </p>
                </div>
                <div>
                  <p className="text-[#71717A] font-bold uppercase tracking-widest">Status</p>
                  <p className="text-white font-black">Ativo</p>
                </div>
              </div>

              {/* Output */}
              <div className="mb-4">
                <p className="text-xs text-[#71717A] font-bold uppercase tracking-widest mb-1">Output</p>
                <p className="text-xs font-mono text-[#88CE11]">{task.output}</p>
              </div>

              {/* Logs */}
              {task.logs.length > 0 && (
                <div className="bg-black/50 rounded-lg p-3">
                  <p className="text-xs text-[#71717A] font-bold uppercase tracking-widest mb-2">Logs</p>
                  <div className="space-y-1 max-h-24 overflow-y-auto">
                    {task.logs.slice(-5).map((log, idx) => (
                      <p key={idx} className="text-xs text-[#A1A1AA] font-mono">
                        {log}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-xs text-[#71717A] font-bold uppercase tracking-widest">
            Dashboard atualiza a cada 10 segundos • Última atualização: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  )
}
