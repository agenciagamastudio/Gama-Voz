import DocLayout from '@/app/components/docs/DocLayout'
import FeatureCard from '@/app/components/docs/FeatureCard'
import TechBadge from '@/app/components/docs/TechBadge'
import DocNavSidebar from '@/app/components/docs/DocNavSidebar'

export const metadata = { title: 'GAMA Engine IA - Motor de IA' }

export default function EngineIADoc() {
  return <div className="flex min-h-screen bg-[#161616]"><DocNavSidebar /><div className="w-full flex-1"><DocLayout title="GAMA Engine IA" description="Motor de IA Multi-Agente"><section className="mb-16"><h2 className="mb-6 text-3xl font-black">O que eh Engine IA?</h2><p className="text-gray-300">Motor Python para executar clones de IA com 8+ agentes especializados localmente.</p></section><section className="mb-16"><h2 className="mb-6 text-3xl font-black">Features</h2><div className="grid gap-4 md:grid-cols-2"><FeatureCard icon="🤖" title="Local" description="Roda offline" /><FeatureCard icon="⚡" title="Multiplos Modelos" description="Ollama integrado" /><FeatureCard icon="🔒" title="Privado" description="Dados locais" /><FeatureCard icon="🐳" title="Docker" description="Containerizado" /></div></section><section className="mb-16"><h2 className="mb-6 text-3xl font-black">Tech Stack</h2><div className="flex flex-wrap gap-3"><TechBadge name="Python" /><TechBadge name="Ollama" /><TechBadge name="Docker" /><TechBadge name="LangChain" /></div></section></DocLayout></div></div>
}
