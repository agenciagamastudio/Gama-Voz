import DocLayout from '@/app/components/docs/DocLayout'
import FeatureCard from '@/app/components/docs/FeatureCard'
import TechBadge from '@/app/components/docs/TechBadge'
import DocNavSidebar from '@/app/components/docs/DocNavSidebar'

export const metadata = { title: 'GAMA Roadmap - Dashboard de Roadmap' }

export default function RoadmapDoc() {
  return <div className="flex min-h-screen bg-[#161616]"><DocNavSidebar /><div className="w-full flex-1"><DocLayout title="GAMA Roadmap" description="Dashboard de Roadmap"><section className="mb-16"><h2 className="mb-6 text-3xl font-black">O que eh Roadmap?</h2><p className="text-gray-300">Dashboard para planejar, rastrear e colaborar em roadmaps de produtos.</p></section><section className="mb-16"><h2 className="mb-6 text-3xl font-black">Features</h2><div className="grid gap-4 md:grid-cols-2"><FeatureCard icon="🗂️" title="Planejamento" description="Criar roadmaps" /><FeatureCard icon="👥" title="Colaboracao" description="Trabalhar em equipe" /><FeatureCard icon="📊" title="Visualizacao" description="Timeline e graficos" /><FeatureCard icon="🔄" title="Sync" description="Atualizacoes reais" /></div></section><section className="mb-16"><h2 className="mb-6 text-3xl font-black">Tech Stack</h2><div className="flex flex-wrap gap-3"><TechBadge name="Next.js" /><TechBadge name="Express" /><TechBadge name="SQLite" /><TechBadge name="React Query" /></div></section></DocLayout></div></div>
}
