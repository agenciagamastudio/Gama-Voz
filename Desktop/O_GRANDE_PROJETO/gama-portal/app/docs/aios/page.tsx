'use client';

import DocLayout from '@/app/components/docs/DocLayout';
import FeatureCard from '@/app/components/docs/FeatureCard';
import TechBadge from '@/app/components/docs/TechBadge';
import CodeBlock from '@/app/components/docs/CodeBlock';
import Link from 'next/link';

export default function Page() {
  return (
    <DocLayout
      title="GAMA AIOS"
      description="AI-Orchestrated System: Framework para orquestar múltiplos agentes IA em workflows complexos"
    >
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-4">O que é AIOS?</h2>
        <p className="text-gray-300 text-lg leading-relaxed mb-4">
          AIOS (AI-Orchestrated System) é um framework nativo para orquestar múltiplos agentes de IA em workflows complexos. Permite definir tarefas, executar em paralelo/sequência, implementar quality gates, e escalar para múltiplos clientes.
        </p>
        <p className="text-gray-300 text-lg leading-relaxed">
          Usado internamente por todos os 18 projetos do Grupo Gama (GAMA VOZ, GAMA CRONOGRAMAS, GAMA EDUCATION, etc).
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Características Principais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FeatureCard icon="🤖" title="Multi-Agentes" description="Orquestre 10+ agentes IA especializados" />
          <FeatureCard icon="⚡" title="Execução Paralela" description="Execute tarefas em paralelo ou sequência" />
          <FeatureCard icon="🎯" title="Quality Gates" description="Checkpoints de qualidade com auto-healing" />
          <FeatureCard icon="📊" title="Rastreabilidade" description="Todas decisões e outputs são logados" />
          <FeatureCard icon="🔄" title="Reutilizável" description="Mesmo workflow funciona para múltiplos clientes" />
          <FeatureCard icon="📈" title="Escalável" description="Processa clientes em paralelo com isolamento" />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Tech Stack</h2>
        <div className="flex flex-wrap gap-3">
          <TechBadge name="TypeScript" />
          <TechBadge name="Node.js" />
          <TechBadge name="Claude API" />
          <TechBadge name="YAML" />
          <TechBadge name="Git" />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Quick Start</h2>
        <div className="space-y-4">
          <div className="bg-[var(--gama-surface)]/50 rounded-lg p-6">
            <p className="text-gray-300 mb-3 font-semibold">Clonar e instalar</p>
            <CodeBlock code={`git clone https://github.com/agenciagamastudio/GAMA_AIOS.git
cd GAMA_AIOS && npm install`} language="bash" />
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Arquitetura</h2>
        <div className="bg-[var(--gama-surface)]/50 rounded-lg p-6">
          <p className="text-gray-300">AIOS possui 4 camadas: Core (invariante), Templates (padrões), Config (customizável), Runtime (estados).</p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Aprenda Mais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/docs/conceitos/agentes" className="glass rounded-lg p-6 hover:bg-[var(--gama-primary)]/10">
            <h4 className="text-lg font-bold text-[var(--gama-primary)] mb-2">→ Agentes</h4>
            <p className="text-gray-300">Entidades autônomas que executam tarefas</p>
          </Link>
          <Link href="/docs/conceitos/workflows" className="glass rounded-lg p-6 hover:bg-[var(--gama-primary)]/10">
            <h4 className="text-lg font-bold text-[var(--gama-primary)] mb-2">→ Workflows</h4>
            <p className="text-gray-300">Orquestração de múltiplos agentes</p>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-6">Recursos</h2>
        <a href="https://github.com/agenciagamastudio/GAMA_AIOS" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[var(--gama-primary)] text-black font-semibold rounded-lg">
          GitHub Repository
        </a>
      </section>
    </DocLayout>
  );
}
