import DocLayout from '@/app/components/docs/DocLayout'
import FeatureCard from '@/app/components/docs/FeatureCard'
import TechBadge from '@/app/components/docs/TechBadge'
import DocNavSidebar from '@/app/components/docs/DocNavSidebar'

export const metadata = {
  title: 'GAMA Jarvis - Assistente de Voz Inteligente',
  description: 'Orquestrador de voz que converte audio em acoes automaticas',
}

export default function JarvisDoc() {
  return (
    <div className="flex min-h-screen bg-[#161616]">
      <DocNavSidebar />
      <div className="w-full flex-1">
        <DocLayout title="GAMA Jarvis" description="Assistente de Voz Inteligente">
          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-black">O que eh Jarvis?</h2>
            <p className="mb-4 text-lg text-gray-300">
              GAMA Jarvis eh um orquestrador de voz que converte audio em acoes automaticas
              no seu sistema usando IA e processamento de linguagem natural.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-black">Features</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <FeatureCard icon="🎤" title="Voice Recognition" description="Entender fala" />
              <FeatureCard icon="⚡" title="Execucao" description="Automatizar acoes" />
              <FeatureCard icon="🧠" title="NLU" description="Compreensao natural" />
              <FeatureCard icon="🔊" title="TTS" description="Responder por voz" />
            </div>
          </section>

          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-black">Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
              <TechBadge name="Python" color="bg-blue-700" />
              <TechBadge name="FastAPI" color="bg-green-600" />
              <TechBadge name="Groq Whisper" color="bg-orange-600" />
              <TechBadge name="Claude API" color="bg-purple-600" />
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-3xl font-black">Links</h2>
            <a href="https://github.com/agenciagamastudio/gama-jarvis" target="_blank" className="rounded-lg border border-white/10 bg-white/5 p-6">
              <h3 className="mb-2 font-bold text-[#88CE11]">GitHub</h3>
            </a>
          </section>
        </DocLayout>
      </div>
    </div>
  )
}
