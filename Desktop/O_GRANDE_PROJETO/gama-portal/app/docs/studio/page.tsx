import DocLayout from '@/app/components/docs/DocLayout'
import FeatureCard from '@/app/components/docs/FeatureCard'
import TechBadge from '@/app/components/docs/TechBadge'
import DocNavSidebar from '@/app/components/docs/DocNavSidebar'

export const metadata = { title: 'GAMA Studio - Estudio de Criacao' }

export default function StudioDoc() {
  return <div className="flex min-h-screen bg-[#161616]"><DocNavSidebar /><div className="w-full flex-1"><DocLayout title="GAMA Studio" description="Estudio de Criacao Integrado"><section className="mb-16"><h2 className="mb-6 text-3xl font-black">O que eh Studio?</h2><p className="text-gray-300">Plataforma completa para criacao de conteudo: design, video, audio.</p></section><section className="mb-16"><h2 className="mb-6 text-3xl font-black">Features</h2><div className="grid gap-4 md:grid-cols-2"><FeatureCard icon="🎨" title="Design" description="Criar designs" /><FeatureCard icon="🎬" title="Video" description="Editar videos" /><FeatureCard icon="🎵" title="Audio" description="Editar audio" /><FeatureCard icon="📱" title="Social" description="Exportar para redes" /></div></section><section className="mb-16"><h2 className="mb-6 text-3xl font-black">Tech Stack</h2><div className="flex flex-wrap gap-3"><TechBadge name="React" /><TechBadge name="Canvas API" /><TechBadge name="FFmpeg" /><TechBadge name="WebGL" /></div></section></DocLayout></div></div>
}
