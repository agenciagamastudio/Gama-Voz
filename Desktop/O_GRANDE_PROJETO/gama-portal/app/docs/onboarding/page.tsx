import DocLayout from '@/app/components/docs/DocLayout'
import FeatureCard from '@/app/components/docs/FeatureCard'
import TechBadge from '@/app/components/docs/TechBadge'
import DocNavSidebar from '@/app/components/docs/DocNavSidebar'

export const metadata = { title: 'GAMA Onboarding - Fluxos de Integracao' }

export default function OnboardingDoc() {
  return <div className="flex min-h-screen bg-[#161616]"><DocNavSidebar /><div className="w-full flex-1"><DocLayout title="GAMA Onboarding" description="Fluxos de Integracao de Usuarios"><section className="mb-16"><h2 className="mb-6 text-3xl font-black">O que eh Onboarding?</h2><p className="text-gray-300">Sistema modular de onboarding para novas plataformas e produtos.</p></section><section className="mb-16"><h2 className="mb-6 text-3xl font-black">Features</h2><div className="grid gap-4 md:grid-cols-2"><FeatureCard icon="🚀" title="Modular" description="Customizavel" /><FeatureCard icon="🎯" title="Guiado" description="Tutorial passo a passo" /><FeatureCard icon="📊" title="Analytics" description="Rastrear progresso" /><FeatureCard icon="🤖" title="AIOS" description="Agentes auxiliam user" /></div></section><section className="mb-16"><h2 className="mb-6 text-3xl font-black">Tech Stack</h2><div className="flex flex-wrap gap-3"><TechBadge name="AIOS" /><TechBadge name="Next.js" /><TechBadge name="Claude API" /><TechBadge name="PostgreSQL" /></div></section></DocLayout></div></div>
}
