import DocLayout from '@/app/components/docs/DocLayout'
import FeatureCard from '@/app/components/docs/FeatureCard'
import TechBadge from '@/app/components/docs/TechBadge'
import DocNavSidebar from '@/app/components/docs/DocNavSidebar'

export const metadata = { title: 'GAMA Node - App de TTS' }

export default function NodeDoc() {
  return <div className="flex min-h-screen bg-[#161616]"><DocNavSidebar /><div className="w-full flex-1"><DocLayout title="GAMA Node" description="Texto para Fala"><section className="mb-16"><h2 className="mb-6 text-3xl font-black">O que eh Node?</h2><p className="text-gray-300">Aplicacao de conversao de texto em fala com multiplas vozes.</p></section><section className="mb-16"><h2 className="mb-6 text-3xl font-black">Features</h2><div className="grid gap-4 md:grid-cols-2"><FeatureCard icon="🔊" title="TTS" description="Texto para voz" /><FeatureCard icon="🎙️" title="Vozes" description="Multiplas opcoes" /><FeatureCard icon="🌍" title="Idiomas" description="Suporta varios" /><FeatureCard icon="⚡" title="Tempo Real" description="Resposta instantanea" /></div></section><section className="mb-16"><h2 className="mb-6 text-3xl font-black">Tech Stack</h2><div className="flex flex-wrap gap-3"><TechBadge name="React" /><TechBadge name="Vite" /><TechBadge name="Gemini API" /><TechBadge name="Web Audio" /></div></section></DocLayout></div></div>
}
