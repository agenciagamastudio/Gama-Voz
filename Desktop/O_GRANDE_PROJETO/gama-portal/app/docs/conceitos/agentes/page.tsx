'use client';

import DocLayout from '@/app/components/docs/DocLayout';
import FeatureCard from '@/app/components/docs/FeatureCard';
import CodeBlock from '@/app/components/docs/CodeBlock';
import Link from 'next/link';

export default function Page() {
  return (
    <DocLayout
      title="Agentes de IA"
      description="Entidades autônomas que percebem seu ambiente, tomam decisões e executam ações"
    >
      {/* O que são Agentes */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-4">O que são Agentes?</h2>
        <p className="text-gray-300 text-lg leading-relaxed mb-4">
          Agentes de IA são entidades autônomas que percebem seu ambiente, tomam decisões e executam ações
          para alcançar objetivos específicos. No contexto do Grupo Gama, agentes são componentes inteligentes
          que orquestram tarefas complexas, coordenam workflows e automatizam processos end-to-end.
        </p>
        <p className="text-gray-300 text-lg leading-relaxed">
          Um agente pode ser comparado a um especialista que entende um domínio específico,
          sabe quais ferramentas usar, quando usá-las, e como interpretar resultados para
          tomar a próxima decisão inteligente.
        </p>
      </section>

      {/* Ciclo de Vida */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Ciclo de Vida de um Agente</h2>
        <div className="glass rounded-lg p-8 space-y-6">
          <div>
            <h4 className="text-xl font-bold text-[var(--gama-primary)] mb-2">1. Percepção</h4>
            <p className="text-gray-300">O agente recebe informações do ambiente (input, contexto, estado).</p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-[var(--gama-primary)] mb-2">2. Raciocínio</h4>
            <p className="text-gray-300">Analisa a situação, consulta conhecimento, e decide qual ação tomar.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-[var(--gama-primary)] mb-2">3. Ação</h4>
            <p className="text-gray-300">Executa tarefas, chama ferramentas, e produz outputs específicos.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-[var(--gama-primary)] mb-2">4. Aprendizado</h4>
            <p className="text-gray-300">Registra resultado, aprende com feedback, e adapta comportamento futuro.</p>
          </div>
        </div>
      </section>

      {/* Características-chave */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Características-Chave</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FeatureCard
            icon="🧠"
            title="Autônomo"
            description="Opera independentemente sem intervenção humana constante"
          />
          <FeatureCard
            icon="🎯"
            title="Orientado a Objetivo"
            description="Trabalha para alcançar metas específicas e mensuráveis"
          />
          <FeatureCard
            icon="🔧"
            title="Adaptável"
            description="Ajusta estratégia baseado em feedback e mudanças no ambiente"
          />
          <FeatureCard
            icon="🤝"
            title="Colaborativo"
            description="Trabalha com outros agentes e ferramentas para resolver problemas"
          />
          <FeatureCard
            icon="📊"
            title="Observador"
            description="Monitora estado, coleta dados, e toma decisões informadas"
          />
          <FeatureCard
            icon="⚡"
            title="Responsivo"
            description="Reage rapidamente a eventos e mudanças no contexto"
          />
        </div>
      </section>

      {/* Exemplos de Agentes no Grupo Gama */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Agentes no Grupo Gama</h2>
        <div className="space-y-4">
          <div className="glass rounded-lg p-6">
            <h4 className="text-xl font-bold text-white mb-2">📊 Agente de Pesquisa</h4>
            <p className="text-gray-300 mb-4">Executa pesquisas avançadas, coleta dados, valida informações e estrutura conhecimento.</p>
            <p className="text-sm text-gray-400">Usado em: GAMA Cronogramas, GAMA Education, GAMA Analysis</p>
          </div>
          <div className="glass rounded-lg p-6">
            <h4 className="text-xl font-bold text-white mb-2">💻 Agente de Desenvolvimento</h4>
            <p className="text-gray-300 mb-4">Escreve código, testa, corrige bugs, e otimiza performance.</p>
            <p className="text-sm text-gray-400">Usado em: GAMA Git, GAMA Node, GAMA AIOS</p>
          </div>
          <div className="glass rounded-lg p-6">
            <h4 className="text-xl font-bold text-white mb-2">📋 Agente de Validação</h4>
            <p className="text-gray-300 mb-4">Verifica qualidade, testa casos extremos, e aprova outputs antes de entrega.</p>
            <p className="text-sm text-gray-400">Usado em: GAMA Education, GAMA Cronogramas, GAMA Monitor</p>
          </div>
          <div className="glass rounded-lg p-6">
            <h4 className="text-xl font-bold text-white mb-2">🎨 Agente de Design</h4>
            <p className="text-gray-300 mb-4">Cria briefs visuais, propõe componentes, e orienta designers humanos.</p>
            <p className="text-sm text-gray-400">Usado em: GAMA Studio, GAMA Radio, GAMA Financial</p>
          </div>
        </div>
      </section>

      {/* Padrão de Implementação */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Padrão de Implementação</h2>
        <p className="text-gray-300 text-lg leading-relaxed mb-6">
          Um agente no AIOS segue este padrão estruturado:
        </p>
        <CodeBlock
          code={`# Agente: Pesquisador
role: "Especialista em pesquisa e análise"
capabilities:
  - Web search
  - Data extraction
  - Analysis
  - Synthesis

responsibilities:
  - Pesquisar tópicos específicos
  - Validar fontes
  - Estruturar conhecimento
  - Documentar achados

constraints:
  - Máx 5 horas por tarefa
  - Sem acesso a dados privados
  - Sempre citar fontes

tools:
  - Search (Groq, EXA)
  - Analysis (Python)
  - Writing (Markdown)

inputs:
  - Pergunta/Objetivo
  - Contexto
  - Constraints

outputs:
  - Research document
  - Sources list
  - Recommendations`}
          language="yaml"
        />
      </section>

      {/* Como Agentes Trabalham com Workflows */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Agentes + Workflows</h2>
        <p className="text-gray-300 text-lg leading-relaxed mb-6">
          Agentes são executores de workflows. Um workflow orquestra múltiplos agentes em sequência:
        </p>
        <div className="bg-[var(--gama-surface)]/50 rounded-lg p-6 border border-[var(--gama-primary)]/20">
          <p className="text-gray-300 font-mono text-sm mb-4">Workflow: Content Marketing</p>
          <p className="text-gray-400 text-sm">
            Pesquisador → Estrategista → Content Manager → Copy Writer → Designer → QA Validator
          </p>
        </div>
      </section>

      {/* Conceitos Relacionados */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Aprenda Mais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/docs/conceitos/workflows"
            className="glass rounded-lg p-6 hover:bg-[var(--gama-primary)]/10 transition-colors"
          >
            <h4 className="text-lg font-bold text-[var(--gama-primary)] mb-2">→ Workflows</h4>
            <p className="text-gray-300">Como agentes coordenam tarefas em sequência e paralelo</p>
          </Link>
          <Link
            href="/docs/conceitos/integracao"
            className="glass rounded-lg p-6 hover:bg-[var(--gama-primary)]/10 transition-colors"
          >
            <h4 className="text-lg font-bold text-[var(--gama-primary)] mb-2">→ Integração</h4>
            <p className="text-gray-300">Como agentes se integram com sistemas externos</p>
          </Link>
          <Link
            href="/docs/aios"
            className="glass rounded-lg p-6 hover:bg-[var(--gama-primary)]/10 transition-colors"
          >
            <h4 className="text-lg font-bold text-[var(--gama-primary)] mb-2">→ GAMA AIOS</h4>
            <p className="text-gray-300">Framework de orquestração de agentes</p>
          </Link>
          <Link
            href="/docs/education"
            className="glass rounded-lg p-6 hover:bg-[var(--gama-primary)]/10 transition-colors"
          >
            <h4 className="text-lg font-bold text-[var(--gama-primary)] mb-2">→ GAMA Education</h4>
            <p className="text-gray-300">Plataforma de educação com agentes especializados</p>
          </Link>
        </div>
      </section>

      {/* Recursos */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6">Recursos</h2>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://github.com/agenciagamastudio/GAMA_AIOS"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[var(--gama-primary)] text-black font-semibold rounded-lg hover:brightness-110"
          >
            AIOS Framework
          </a>
          <a
            href="https://github.com/agenciagamastudio"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-[var(--gama-primary)] text-[var(--gama-primary)] rounded-lg hover:bg-[var(--gama-primary)]/10"
          >
            Repositórios
          </a>
        </div>
      </section>
    </DocLayout>
  );
}
