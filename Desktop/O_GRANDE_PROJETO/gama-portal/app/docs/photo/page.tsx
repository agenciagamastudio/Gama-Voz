import DocLayout from '@/app/components/docs/DocLayout'
import FeatureCard from '@/app/components/docs/FeatureCard'
import TechBadge from '@/app/components/docs/TechBadge'
import DocNavSidebar from '@/app/components/docs/DocNavSidebar'

export const metadata = { title: 'GAMA Photo - Editor de Fotos Inteligente' }

export default function PhotoDoc() {
  return <div className="flex min-h-screen bg-[#161616]"><DocNavSidebar /><div className="w-full flex-1"><DocLayout title="GAMA Photo" description="Editor de Fotos Inteligente"><section className="mb-16"><h2 className="mb-6 text-3xl font-black">O que eh Photo?</h2><p className="text-gray-300">Editor de imagens com filtros de IA e edicao automatizada.</p></section><section className="mb-16"><h2 className="mb-6 text-3xl font-black">Features</h2><div className="grid gap-4 md:grid-cols-2"><FeatureCard icon="🖼️" title="Editar" description="Interface intuitiva" /><FeatureCard icon="🤖" title="Filtros IA" description="Efeitos automaticos" /><FeatureCard icon="✨" title="Melhorias" description="Upscale de qualidade" /><FeatureCard icon="⚡" title="Rapido" description="Processamento GPU" /></div></section><section className="mb-16"><h2 className="mb-6 text-3xl font-black">Tech Stack</h2><div className="flex flex-wrap gap-3"><TechBadge name="Python" /><TechBadge name="Flask" /><TechBadge name="TensorFlow" /><TechBadge name="React" /></div></section></DocLayout></div></div>
}
