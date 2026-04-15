import DocLayout from '@/app/components/docs/DocLayout'
import FeatureCard from '@/app/components/docs/FeatureCard'
import TechBadge from '@/app/components/docs/TechBadge'
import DocNavSidebar from '@/app/components/docs/DocNavSidebar'

export const metadata = {
  title: 'GAMA Radio - Radio Social com Curacao de IA',
  description: 'Plataforma de radio social onde IA recomenda conteudo personalizado',
}

export default function RadioDoc() {
  return (
    <div className="flex min-h-screen bg-[#161616]">
      <DocNavSidebar />
      <div className="w-full flex-1">
        <DocLayout title="GAMA Radio" description="Radio Social com Curacao de IA">
          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-black">O que eh Radio?</h2>
            <p className="mb-4 text-lg text-gray-300">
              GAMA Radio eh uma plataforma de radio social onde IA recomenda conteudo
              personalizado em tempo real com base no gosto do usuario.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-black">Features</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <FeatureCard icon="📻" title="Streaming" description="Audio em tempo real" />
              <FeatureCard icon="🎵" title="Curacao" description="Recomendacoes de IA" />
              <FeatureCard icon="👥" title="Social" description="Compartilhar e comentar" />
              <FeatureCard icon="📊" title="Personalizacao" description="Aprende com uso" />
            </div>
          </section>

          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-black">Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
              <TechBadge name="Next.js 15" color="bg-black" />
              <TechBadge name="Supabase" color="bg-emerald-600" />
              <TechBadge name="Claude API" color="bg-purple-600" />
              <TechBadge name="WebAudio API" color="bg-gray-600" />
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-3xl font-black">Links</h2>
            <a href="https://github.com/agenciagamastudio/gama-radio" target="_blank" className="rounded-lg border border-white/10 bg-white/5 p-6">
              <h3 className="mb-2 font-bold text-[#88CE11]">GitHub</h3>
            </a>
          </section>
        </DocLayout>
      </div>
    </div>
  )
}
