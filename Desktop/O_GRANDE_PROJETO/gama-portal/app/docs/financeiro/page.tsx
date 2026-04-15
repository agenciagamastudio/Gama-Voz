'use client';

import DocLayout from '@/app/components/docs/DocLayout';
import FeatureCard from '@/app/components/docs/FeatureCard';
import TechBadge from '@/app/components/docs/TechBadge';
import CodeBlock from '@/app/components/docs/CodeBlock';

export default function Page() {
  return (
    <DocLayout
      title="GAMA FINANCEIRO"
      description="Plataforma SaaS completa para gestão financeira com dashboards e relatórios"
    >
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-4">O que é GAMA FINANCEIRO?</h2>
        <p className="text-gray-300 text-lg leading-relaxed mb-4">
          GAMA FINANCEIRO é uma plataforma SaaS moderna para gestão financeira empresarial. Oferece dashboards em tempo real, análise de despesas, relatórios automáticos, e integrações com bancos.
        </p>
        <p className="text-gray-300 text-lg leading-relaxed">
          Construída com Next.js 15 e Supabase para máxima performance e escalabilidade.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Características Principais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FeatureCard icon="📊" title="Dashboards" description="Visualizações em tempo real de KPIs" />
          <FeatureCard icon="💰" title="Gestão de Despesas" description="Categorização automática e controle" />
          <FeatureCard icon="📈" title="Relatórios" description="Relatórios customizáveis e exportáveis" />
          <FeatureCard icon="🏦" title="Integrações" description="Conecte com principais bancos" />
          <FeatureCard icon="👥" title="Multi-usuário" description="Controle de permissões granular" />
          <FeatureCard icon="🔒" title="Segurança" description="Encriptação end-to-end de dados" />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Tech Stack</h2>
        <div className="flex flex-wrap gap-3">
          <TechBadge name="Next.js 15" />
          <TechBadge name="Supabase" />
          <TechBadge name="TypeScript" />
          <TechBadge name="Tailwind" />
          <TechBadge name="PostgreSQL" />
          <TechBadge name="RLS" />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Quick Start</h2>
        <div className="space-y-4">
          <div className="bg-[var(--gama-surface)]/50 rounded-lg p-6">
            <p className="text-gray-300 mb-3 font-semibold">Clonar e instalar</p>
            <CodeBlock code={`git clone https://github.com/agenciagamastudio/GAMA_FINANCEIRO.git
cd GAMA_FINANCEIRO && npm install`} language="bash" />
          </div>
          <div className="bg-[var(--gama-surface)]/50 rounded-lg p-6">
            <p className="text-gray-300 mb-3 font-semibold">Configurar Supabase</p>
            <CodeBlock code={`# Configure .env.local com sua Supabase URL e API key
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key`} language="bash" />
          </div>
          <div className="bg-[var(--gama-surface)]/50 rounded-lg p-6">
            <p className="text-gray-300 mb-3 font-semibold">Rodar desenvolvimento</p>
            <CodeBlock code={`npm run dev
# Acesse http://localhost:3000`} language="bash" />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-white mb-6">Recursos</h2>
        <a href="https://github.com/agenciagamastudio/GAMA_FINANCEIRO" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[var(--gama-primary)] text-black font-semibold rounded-lg">
          GitHub Repository
        </a>
      </section>
    </DocLayout>
  );
}
