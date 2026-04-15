import DocLayout from '@/app/components/docs/DocLayout'
import FeatureCard from '@/app/components/docs/FeatureCard'
import TechBadge from '@/app/components/docs/TechBadge'
import DocNavSidebar from '@/app/components/docs/DocNavSidebar'

export const metadata = {
  title: 'GAMA NFSe - Gerenciador de Nota Fiscal de Servicos',
  description: 'Emissao e gestao de NFS-e com integracao a orgaos municipais',
}

export default function NFSeDoc() {
  return (
    <div className="flex min-h-screen bg-[#161616]">
      <DocNavSidebar />
      <div className="w-full flex-1">
        <DocLayout title="GAMA NFSe" description="Gerenciador de Nota Fiscal de Servicos">
          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-black">O que eh NFSe?</h2>
            <p className="mb-4 text-lg text-gray-300">
              GAMA NFSe eh um sistema especializado em emissao e gestao de Nota Fiscal
              de Servicos com integracao direta a orgaos municipais brasileiros.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-black">Features</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <FeatureCard icon="📄" title="Emissao" description="Criar NFSe automaticamente" />
              <FeatureCard icon="🏛️" title="Compliance" description="Atender legislacao BR" />
              <FeatureCard icon="🔗" title="Integracao" description="APIs municipais" />
              <FeatureCard icon="📊" title="Relatorios" description="Acompanhar emissoes" />
            </div>
          </section>

          <section className="mb-16">
            <h2 className="mb-6 text-3xl font-black">Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
              <TechBadge name="Next.js" color="bg-black" />
              <TechBadge name="Chrome Extension" color="bg-yellow-500" />
              <TechBadge name="XML" color="bg-orange-600" />
              <TechBadge name="PostgreSQL" color="bg-blue-800" />
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-3xl font-black">Links</h2>
            <a href="https://github.com/agenciagamastudio/gama-nfse" target="_blank" className="rounded-lg border border-white/10 bg-white/5 p-6">
              <h3 className="mb-2 font-bold text-[#88CE11]">GitHub</h3>
            </a>
          </section>
        </DocLayout>
      </div>
    </div>
  )
}
