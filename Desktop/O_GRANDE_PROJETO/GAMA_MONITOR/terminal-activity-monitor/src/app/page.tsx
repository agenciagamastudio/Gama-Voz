import { Suspense } from 'react'
import TerminalActivityMonitor from '@/components/organisms/TerminalActivityMonitor'
import TerminalInterface from '@/components/organisms/TerminalInterface'

export default function Home() {
  return (
    <main className="min-h-screen bg-void-dark p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Activity Monitor */}
        <section>
          <h1 className="text-3xl font-black text-white mb-4">Gama Monitor</h1>
          <TerminalActivityMonitor />
        </section>

        {/* Interactive Terminal */}
        <section className="mt-8">
          <h2 className="text-2xl font-black text-white mb-4">Command Terminal</h2>
          <p className="text-text-secondary mb-4">Run bash, npm, and git commands directly from the web</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Suspense fallback={<div className="bg-void-darker rounded p-4 text-text-secondary">Loading...</div>}>
              <TerminalInterface terminalId="claude-code" />
            </Suspense>
            <Suspense fallback={<div className="bg-void-darker rounded p-4 text-text-secondary">Loading...</div>}>
              <TerminalInterface terminalId="aios" />
            </Suspense>
          </div>
        </section>
      </div>
    </main>
  )
}
