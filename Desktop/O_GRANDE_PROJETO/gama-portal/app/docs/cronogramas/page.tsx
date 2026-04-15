'use client';

import DocLayout from '@/app/components/docs/DocLayout';
import FeatureCard from '@/app/components/docs/FeatureCard';
import TechBadge from '@/app/components/docs/TechBadge';
import CodeBlock from '@/app/components/docs/CodeBlock';

export default function Page() {
  return (
    <DocLayout
      title="GAMA CRONOGRAMAS"
      description="Sistema multi-agente para planejamento e publicação automática de cronogramas de mídia social"
    >
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-4">O que é GAMA CRONOGRAMAS?</h2>
        <p className="text-gray-300 text-lg leading-relaxed mb-4">
          GAMA CRONOGRAMAS é um sistema de orquestração de IA que transforma briefs de marketing em cronogramas completos de mídia social. Utiliza 8 agentes especializados trabalhando em sequência para criar conteúdo pronto para publicação.
        </p>
        <p className="text-gray-300 text-lg leading-relaxed">
          Reduz o tempo de criação de 10 dias para 8 horas, mantendo qualidade e consistência de marca.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Características Principais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FeatureCard icon="🤖" title="8 Agentes Especializados" description="Pesquisador, Estrategista, Copy Writer, Designer..." />
          <FeatureCard icon="⚡" title="Execução Rápida" description="8 horas vs 10 dias tradicionais" />
          <FeatureCard icon="📅" title="Cronogramas Completos" description="28+ copys, designs, reels, calendário" />
          <FeatureCard icon="🎯" title="Quality Gates" description="Validação em cada fase" />
          <FeatureCard icon="🔄" title="Reutilizável" description="Mesmo workflow para múltiplos clientes" />
          <FeatureCard icon="📊" title="Rastreável" description="Todas decisões são registradas" />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Tech Stack</h2>
        <div className="flex flex-wrap gap-3">
          <TechBadge name="AIOS" />
          <TechBadge name="Claude API" />
          <TechBadge name="Node.js" />
          <TechBadge name="TypeScript" />
          <TechBadge name="YAML" />
          <TechBadge name="Git" />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Workflow</h2>
        <div className="bg-[var(--gama-surface)]/50 rounded-lg p-6">
          <p className="text-gray-300 mb-4">O sistema executa 8 fases em sequência:</p>
          <CodeBlock code={`Phase 1: Pesquisador (3-5h)
  ↓ Pesquisa trends, público, competitors
  
Phase 2: Estrategista (2-3h)
  ↓ Define 4 pilares, tone, content mix
  
Phase 3: Content Manager (2-3h)
  ↓ Cria topline (títulos principais)
  
Phase 4: Copy Writer (5-7h)
  ↓ Escreve 28+ copys variadas
  
Phase 5-7: Handoff (paralelo)
  ├─ Designer: Briefs visuais
  ├─ Reels: Scripts para vídeos
  └─ Social: Legendas finais
  
Phase 8: QA Validator (2-3h)
  ↓ Validação final e aprovação`} language="text" />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Quick Start</h2>
        <div className="bg-[var(--gama-surface)]/50 rounded-lg p-6">
          <p className="text-gray-300 mb-3 font-semibold">Usar com AIOS</p>
          <CodeBlock code={`/ralph-loop "Processar cronograma para cliente IMDI" \
  --max-iterations 100 \
  --completion-promise "CRONOGRAMA_PRONTO_PARA_PUBLICACAO"`} language="bash" />
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-6">Recursos</h2>
        <a href="https://github.com/agenciagamastudio/GAMA_CRONOGRAMAS" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[var(--gama-primary)] text-black font-semibold rounded-lg">
          GitHub Repository
        </a>
      </section>
    </DocLayout>
  );
}
