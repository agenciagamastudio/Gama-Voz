import React from 'react'

interface HistoryItem {
  role: 'user' | 'assistant'
  content: string
}

interface HistoryProps {
  history: HistoryItem[]
}

export default function History({ history }: HistoryProps) {
  if (history.length === 0) {
    return null
  }

  // Show only last 5 pairs (10 items)
  const recentHistory = history.slice(-10)

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 border-t border-white/10 pt-8">
      <h3 className="text-text-secondary text-xs font-medium uppercase tracking-widest mb-6">
        Histórico Recente
      </h3>

      <div className="space-y-4 max-h-64 overflow-y-auto">
        {recentHistory.map((item, index) => (
          <div key={index} className="space-y-1">
            {/* User message */}
            {item.role === 'user' && (
              <div className="text-text-secondary text-xs font-medium mb-1">
                👤 Você
              </div>
            )}

            {/* Assistant message */}
            {item.role === 'assistant' && (
              <div className="text-primary text-xs font-medium mb-1">
                🤖 Jarvis
              </div>
            )}

            {/* Content */}
            <p className="text-text-primary text-sm pl-4 border-l-2 border-white/10">
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
