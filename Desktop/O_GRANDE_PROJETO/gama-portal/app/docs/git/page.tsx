import DocLayout from '@/app/components/docs/DocLayout'
import FeatureCard from '@/app/components/docs/FeatureCard'
import TechBadge from '@/app/components/docs/TechBadge'
import DocNavSidebar from '@/app/components/docs/DocNavSidebar'

export const metadata = {
  title: 'GAMA Git - Gerenciador Git com IA',
  description: 'Interface visual para Git com assistencia de IA para commits e PRs',
}

export default function GitDoc() {
  return (
    <div className="flex min-h-screen bg-[#161616]">
      <DocNavSidebar />
      <div className="w-full flex-1">
        <DocLayout title="GAMA Git" description="Gerenciador Git com IA">
          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-black">O que eh Git?</h2>
            <p className="mb-4 text-lg text-gray-300">
              GAMA Git eh uma interface visual para Git com integracao de IA (Gemini)
              para gerar commits inteligentes e auxiliar na criacao de PRs.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-black">Features</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <FeatureCard icon="🔀" title="Visual Git" description="Interface intuitiva" />
              <FeatureCard icon="🤖" title="IA Commits" description="Mensagens automaticas" />
              <FeatureCard icon="📝" title="PR Assistant" description="Descricoes geradas" />
              <FeatureCard icon="⚡" title="Gemini API" description="Inteligencia artificial" />
            </div>
          </section>

          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-black">Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
              <TechBadge name="React" color="bg-cyan-600" />
              <TechBadge name="Vite" color="bg-purple-600" />
              <TechBadge name="Gemini API" color="bg-orange-500" />
              <TechBadge name="Git CLI" color="bg-orange-600" />
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-3xl font-black">Links</h2>
            <a href="https://github.com/agenciagamastudio/gama-git" target="_blank" className="rounded-lg border border-white/10 bg-white/5 p-6">
              <h3 className="mb-2 font-bold text-[#88CE11]">GitHub</h3>
            </a>
          </section>
        </DocLayout>
      </div>
    </div>
  )
}
