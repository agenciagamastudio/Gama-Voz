import Link from 'next/link'
import DocNavSidebar from '@/app/components/docs/DocNavSidebar'

export const metadata = {
  title: 'GAMA — Documentação de 18 Projetos',
  description: 'Explore documentação completa de todos os projetos Gama',
}

const projects = [
  { id: 'aios', name: 'GAMA AIOS', category: 'IA', icon: '🤖', color: '#88CE11' },
  { id: 'voz', name: 'GAMA VOZ', category: 'IA', icon: '🎙️', color: '#FF3E3E' },
  { id: 'jarvis', name: 'GAMA Jarvis', category: 'IA', icon: '🎯', color: '#00f2ff' },
  { id: 'engine-ia', name: 'GAMA Engine IA', category: 'IA', icon: '⚙️', color: '#88CE11' },
  { id: 'financeiro', name: 'GAMA Financeiro', category: 'Finanças', icon: '💰', color: '#10B981' },
  { id: 'nfse', name: 'GAMA NFSe', category: 'Finanças', icon: '📄', color: '#F59E0B' },
  { id: 'education', name: 'GAMA Education', category: 'Educação', icon: '🎓', color: '#8B5CF6' },
  { id: 'onboarding', name: 'GAMA Onboarding', category: 'Educação', icon: '🚀', color: '#6366F1' },
  { id: 'git', name: 'GAMA Git', category: 'Dev Tools', icon: '🔀', color: '#EF4444' },
  { id: 'monitor', name: 'GAMA Monitor', category: 'Dev Tools', icon: '📊', color: '#06B6D4' },
  { id: 'cronogramas', name: 'GAMA Cronogramas', category: 'Marketing', icon: '📱', color: '#EC4899' },
  { id: 'radio', name: 'GAMA Rádio', category: 'Entretenimento', icon: '📻', color: '#EC4899' },
  { id: 'photo', name: 'GAMA Photo', category: 'Criativo', icon: '🖼️', color: '#F97316' },
  { id: 'studio', name: 'GAMA Studio', category: 'Criativo', icon: '🎨', color: '#D946EF' },
  { id: 'calculadora', name: 'GAMA Calculadora', category: 'Utilitários', icon: '🧮', color: '#06B6D4' },
  { id: 'extensao', name: 'GAMA Extensão', category: 'Utilitários', icon: '🔌', color: '#FBBF24' },
  { id: 'node', name: 'GAMA Node', category: 'IA', icon: '🔊', color: '#3B82F6' },
]

const categories = ['IA', 'Finanças', 'Educação', 'Dev Tools', 'Marketing', 'Entretenimento', 'Criativo', 'Utilitários']

export default function DocsIndex() {
  return (
    <div className="flex min-h-screen bg-[#161616]">
      <DocNavSidebar />
      <div className="w-full flex-1">
        <div className="border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-6">
            <h1 className="text-5xl font-black text-[#88CE11]">Documentação</h1>
            <p className="mt-4 text-lg text-gray-300">Explore 18 projetos da Gama</p>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          {categories.map((category) => {
            const categoryProjects = projects.filter((p) => p.category === category)
            return (
              <section key={category} className="mb-16">
                <h2 className="mb-6 text-2xl font-black">{category}</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {categoryProjects.map((project) => (
                    <Link
                      key={project.id}
                      href={`/docs/${project.id}`}
                      className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/10"
                    >
                      <div className="mb-4 flex items-center gap-3">
                        <span className="text-4xl">{project.icon}</span>
                        <div>
                          <h3 className="font-black text-white group-hover:text-[#88CE11]">{project.name}</h3>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
