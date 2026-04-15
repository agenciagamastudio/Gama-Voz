import DocLayout from '@/app/components/docs/DocLayout'
import FeatureCard from '@/app/components/docs/FeatureCard'
import TechBadge from '@/app/components/docs/TechBadge'
import DocNavSidebar from '@/app/components/docs/DocNavSidebar'

export const metadata = {
  title: 'GAMA Monitor - Monitoramento de Terminal em Tempo Real',
  description: 'Dashboard para monitorar terminal e processos',
}

export default function MonitorDoc() {
  return (
    <div className="flex min-h-screen bg-[#161616]">
      <DocNavSidebar />
      <div className="w-full flex-1">
        <DocLayout title="GAMA Monitor" description="Monitoramento de Terminal">
          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-black">O que eh Monitor?</h2>
            <p className="mb-4 text-lg text-gray-300">
              Dashboard profissional para monitorar atividades do terminal em tempo real
              com metricas, logs e alertas.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-black">Features</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <FeatureCard icon="📊" title="Dashboard" description="Metricas em tempo real" />
              <FeatureCard icon="🔔" title="Alertas" description="Notificacoes automaticas" />
              <FeatureCard icon="📈" title="Historico" description="Logs completos" />
              <FeatureCard icon="⚡" title="WebSocket" description="Atualizacoes instantaneas" />
            </div>
          </section>

          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-black">Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
              <TechBadge name="Next.js" color="bg-black" />
              <TechBadge name="Express.js" color="bg-green-600" />
              <TechBadge name="Socket.IO" color="bg-gray-700" />
              <TechBadge name="TypeScript" color="bg-blue-600" />
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-3xl font-black">Links</h2>
            <a href="https://github.com/agenciagamastudio/gama-monitor" target="_blank" className="rounded-lg border border-white/10 bg-white/5 p-6">
              <h3 className="mb-2 font-bold text-[#88CE11]">GitHub</h3>
            </a>
          </section>
        </DocLayout>
      </div>
    </div>
  )
}
