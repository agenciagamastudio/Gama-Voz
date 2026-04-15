import DocLayout from '@/app/components/docs/DocLayout'
import FeatureCard from '@/app/components/docs/FeatureCard'
import TechBadge from '@/app/components/docs/TechBadge'
import DocNavSidebar from '@/app/components/docs/DocNavSidebar'

export const metadata = { title: 'GAMA Calculadora - Calculadora Avancada' }

export default function CalculadoraDoc() {
  return <div className="flex min-h-screen bg-[#161616]"><DocNavSidebar /><div className="w-full flex-1"><DocLayout title="GAMA Calculadora" description="Calculadora Avancada"><section className="mb-16"><h2 className="mb-6 text-3xl font-black">O que eh Calculadora?</h2><p className="text-gray-300">Calculadora com suporte a expressoes complexas e historico completo.</p></section><section className="mb-16"><h2 className="mb-6 text-3xl font-black">Features</h2><div className="grid gap-4 md:grid-cols-2"><FeatureCard icon="🧮" title="Expressoes" description="Suporta formulas" /><FeatureCard icon="📝" title="Historico" description="Guarda calculos" /><FeatureCard icon="⚡" title="Rapido" description="Calcula instantaneamente" /><FeatureCard icon="🎨" title="Interface" description="Intuitiva e clara" /></div></section><section className="mb-16"><h2 className="mb-6 text-3xl font-black">Tech Stack</h2><div className="flex flex-wrap gap-3"><TechBadge name="Next.js" /><TechBadge name="Supabase" /><TechBadge name="TypeScript" /><TechBadge name="Tailwind" /></div></section></DocLayout></div></div>
}
