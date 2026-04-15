'use client';

import DocLayout from '@/app/components/docs/DocLayout';
import FeatureCard from '@/app/components/docs/FeatureCard';
import TechBadge from '@/app/components/docs/TechBadge';
import CodeBlock from '@/app/components/docs/CodeBlock';

export default function Page() {
  return (
    <DocLayout
      title="GAMA EDUCATION"
      description="Plataforma de educação adaptativa com IA e certificações automatizadas"
    >
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-4">O que é GAMA EDUCATION?</h2>
        <p className="text-gray-300 text-lg leading-relaxed mb-4">
          GAMA EDUCATION é uma plataforma de aprendizado adaptativo que usa IA para personalizar trajetórias educacionais. Oferece cursos interativos, avaliações em tempo real, certificações automáticas e suporte comunitário.
        </p>
        <p className="text-gray-300 text-lg leading-relaxed">
          Construída com Express.js, Neo4j para modelagem de conhecimento, e Anthropic Claude para feedback inteligente.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Características Principais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FeatureCard icon="🎓" title="Cursos Adaptativos" description="Conteúdo que se adapta ao ritmo do aluno" />
          <FeatureCard icon="🧠" title="Grafo de Conhecimento" description="Modelagem com Neo4j de pré-requisitos" />
          <FeatureCard icon="✅" title="Certificações" description="Emissão automática de certificates" />
          <FeatureCard icon="💬" title="Feedback IA" description="Assistente Claude para suporte 24/7" />
          <FeatureCard icon="👥" title="Comunidade" description="Fóruns e grupos de estudo colaborativos" />
          <FeatureCard icon="📊" title="Analytics" description="Progresso e performance tracking" />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Tech Stack</h2>
        <div className="flex flex-wrap gap-3">
          <TechBadge name="Express.js" />
          <TechBadge name="Neo4j" />
          <TechBadge name="React" />
          <TechBadge name="Claude API" />
          <TechBadge name="PostgreSQL" />
          <TechBadge name="WebSockets" />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Quick Start</h2>
        <div className="space-y-4">
          <div className="bg-[var(--gama-surface)]/50 rounded-lg p-6">
            <p className="text-gray-300 mb-3 font-semibold">Clonar repositório</p>
            <CodeBlock code={`git clone https://github.com/agenciagamastudio/GAMA_EDUCATION.git
cd GAMA_EDUCATION`} language="bash" />
          </div>
          <div className="bg-[var(--gama-surface)]/50 rounded-lg p-6">
            <p className="text-gray-300 mb-3 font-semibold">Setup com Docker</p>
            <CodeBlock code={`docker-compose up -d
npm install && npm run dev`} language="bash" />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-6">Recursos</h2>
        <a href="https://github.com/agenciagamastudio/GAMA_EDUCATION" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[var(--gama-primary)] text-black font-semibold rounded-lg">
          GitHub Repository
        </a>
      </section>
    </DocLayout>
  );
}
