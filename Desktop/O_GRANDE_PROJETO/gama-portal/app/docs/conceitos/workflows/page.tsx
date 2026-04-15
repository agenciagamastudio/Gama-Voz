'use client';

import DocLayout from '@/app/components/docs/DocLayout';
import FeatureCard from '@/app/components/docs/FeatureCard';
import CodeBlock from '@/app/components/docs/CodeBlock';
import Link from 'next/link';

export default function Page() {
  return (
    <DocLayout
      title="Workflows"
      description="Padrão de automação que orquestra múltiplas tarefas e agentes em sequência"
    >
      {/* O que são Workflows */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-4">O que são Workflows?</h2>
        <p className="text-gray-300 text-lg leading-relaxed mb-4">
          Um workflow é um padrão de automação que orquestra múltiplas tarefas e agentes em sequência
          ou paralelo para alcançar um objetivo maior. É a ponte entre agentes individuais e
          processos de negócio completos.
        </p>
        <p className="text-gray-300 text-lg leading-relaxed">
          Workflows definem quem faz o quê, em que ordem, com quais condições, e o que acontece
          se algo der errado. São padrões reutilizáveis que podem ser aplicados a múltiplos contextos.
        </p>
      </section>

      {/* Tipos de Workflows */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Tipos de Workflows</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FeatureCard
            icon="🔄"
            title="Sequencial"
            description="Tarefa A → B → C. Cada uma começa após a anterior terminar"
          />
          <FeatureCard
            icon="⚡"
            title="Paralelo"
            description="Tarefas A, B, C acontecem simultaneamente, depois se juntam"
          />
          <FeatureCard
            icon="🔀"
            title="Condicional"
            description="Se resultado_A == X, vai para B; senão, vai para C"
          />
          <FeatureCard
            icon="🔁"
            title="Iterativo"
            description="Repete até atingir condição (máx 5 iterações, validação passa, etc)"
          />
          <FeatureCard
            icon="🌳"
            title="Ramificado"
            description="Múltiplas rotas baseadas em decisões, converge em ponto final"
          />
          <FeatureCard
            icon="🎯"
            title="Automático"
            description="Ralph Loop: executa continuamente até completion promise"
          />
        </div>
      </section>

      {/* Estrutura */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Estrutura de um Workflow</h2>
        <CodeBlock
          code={`name: "Content Marketing Workflow"
description: "Transforma brief em conteúdo pronto para publicação"
version: "1.0"

phases:
  - phase: 1
    name: "Research"
    agent: "@pesquisador"
    task: "tarefa_pesquisa"
    duration: "3-5 dias"
    inputs:
      - topic
      - audience
      - constraints
    outputs:
      - research_doc
      - sources
      - insights

  - phase: 2
    name: "Strategy"
    agent: "@estrategista"
    task: "tarefa_estrategia"
    depends_on: 1
    inputs:
      - research_doc
      - business_goals
    outputs:
      - strategy_doc
      - 4pillars
      - content_mix

  - phase: 3
    name: "Content Creation"
    agent: "@copy_writer"
    task: "tarefa_copy"
    depends_on: 2
    parallel_with: null
    inputs:
      - strategy_doc
      - tone
      - length
    outputs:
      - content_pieces
      - variations
      - timestamps

gates:
  - phase: 2
    type: "quality"
    checks:
      - strategy_clarity >= 8/10
      - audience_match >= 9/10
    on_fail: "return_to_phase_1"

error_handling:
  - type: "timeout"
    max_duration: "5 hours"
    action: "escalate_to_human"

  - type: "failed_quality_check"
    max_retries: 2
    action: "fix_and_rerun"

completion_promise: "CONTENT_READY_FOR_PUBLICATION"`}
          language="yaml"
        />
      </section>

      {/* Exemplo Real */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Exemplo: GAMA Cronogramas</h2>
        <p className="text-gray-300 text-lg leading-relaxed mb-6">
          O workflow do GAMA Cronogramas processa cronogramas de mídia social em 8 fases:
        </p>
        <div className="space-y-3">
          <div className="glass rounded-lg p-4">
            <p className="text-gray-300"><span className="font-bold text-[var(--gama-primary)]">Phase 1:</span> Pesquisador coleta dados (Março Lilás, trends, público-alvo)</p>
          </div>
          <div className="glass rounded-lg p-4">
            <p className="text-gray-300"><span className="font-bold text-[var(--gama-primary)]">Phase 2:</span> Estrategista define 4 pilares, tone, content mix</p>
          </div>
          <div className="glass rounded-lg p-4">
            <p className="text-gray-300"><span className="font-bold text-[var(--gama-primary)]">Phase 3:</span> Content Manager cria topline (títulos + hooks principais)</p>
          </div>
          <div className="glass rounded-lg p-4">
            <p className="text-gray-300"><span className="font-bold text-[var(--gama-primary)]">Phase 4:</span> Copy Writer escreve 28+ copys variadas</p>
          </div>
          <div className="glass rounded-lg p-4">
            <p className="text-gray-300"><span className="font-bold text-[var(--gama-primary)]">Phase 5-7:</span> Handoff para Designer, Reels, Social (paralelo)</p>
          </div>
          <div className="glass rounded-lg p-4">
            <p className="text-gray-300"><span className="font-bold text-[var(--gama-primary)]">Phase 8:</span> QA Validator verifica tudo e aprova publicação</p>
          </div>
        </div>
      </section>

      {/* Padrões de Workflow */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Padrões Comuns</h2>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-bold text-white mb-3">🔄 Story Development Cycle (SDC)</h4>
            <p className="text-gray-300 mb-3">Padrão padrão para desenvolver features:</p>
            <p className="text-gray-400 font-mono text-sm">
              Create → Validate → Implement → QA → Deploy
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-3">🔁 QA Loop</h4>
            <p className="text-gray-300 mb-3">Padrão iterativo quando QA encontra problemas:</p>
            <p className="text-gray-400 font-mono text-sm">
              Review → Feedback → Fix → Re-review (max 5 iterações)
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-3">📋 Spec Pipeline</h4>
            <p className="text-gray-300 mb-3">Padrão para transformar requisitos em spec executável:</p>
            <p className="text-gray-400 font-mono text-sm">
              Gather → Assess → Research → Write → Critique → Plan
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-3">🎯 Ralph Loop (Autonomy)</h4>
            <p className="text-gray-300 mb-3">Padrão de execução autônoma contínua:</p>
            <p className="text-gray-400 font-mono text-sm">
              Execute → Check completion_promise → Loop ou Exit
            </p>
          </div>
        </div>
      </section>

      {/* Gates e Decisões */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Gates e Decisões</h2>
        <p className="text-gray-300 text-lg leading-relaxed mb-6">
          Gates são checkpoints que validam qualidade antes de prosseguir:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass rounded-lg p-6">
            <h4 className="text-lg font-bold text-white mb-3">✅ Quality Gate</h4>
            <p className="text-gray-300 text-sm">
              Verifica se output atende critérios. Se não, retorna à fase anterior
            </p>
          </div>
          <div className="glass rounded-lg p-6">
            <h4 className="text-lg font-bold text-white mb-3">⏱️ Timeout Gate</h4>
            <p className="text-gray-300 text-sm">
              Se fase excede tempo máximo, escalona para decisão humana
            </p>
          </div>
          <div className="glass rounded-lg p-6">
            <h4 className="text-lg font-bold text-white mb-3">🎯 Completion Gate</h4>
            <p className="text-gray-300 text-sm">
              Verifica se completion_promise foi atingida para sair do loop
            </p>
          </div>
        </div>
      </section>

      {/* Execução com Ralph Loop */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Execução Autônoma</h2>
        <p className="text-gray-300 text-lg leading-relaxed mb-6">
          Ralph Loop executa workflows continuamente até completion:
        </p>
        <CodeBlock
          code={`# Iniciar workflow autônomo
/ralph-loop "Processar cronograma de Março para cliente IMDI" \\
  --max-iterations 100 \\
  --completion-promise "CRONOGRAMA_PRONTO_PARA_PUBLICACAO"

# Ralph Loop:
# - Executa fase 1, verifica saída
# - Se completo, passa para fase 2
# - Se não, repete fase 1 ou falha
# - Continua até completion_promise
# - Auto-parada quando meta atingida

# Saída:
✓ Phase 1 (Research): COMPLETE
✓ Phase 2 (Strategy): COMPLETE
✓ Phase 3 (Content): COMPLETE
✓ Phase 4-8 (Parallel): COMPLETE
✓ CRONOGRAMA_PRONTO_PARA_PUBLICACAO ← Exit

Workflow duration: 8h 23m
Total agentes: 8
Total tarefas: 28`}
          language="bash"
        />
      </section>

      {/* Vantagens */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Vantagens dos Workflows</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FeatureCard
            icon="🎯"
            title="Consistência"
            description="Mesmo padrão aplicado sempre, sem variações"
          />
          <FeatureCard
            icon="⚡"
            title="Velocidade"
            description="Automação reduz tempo de 10 dias para 8 horas"
          />
          <FeatureCard
            icon="📊"
            title="Rastreabilidade"
            description="Cada decisão é registrada e auditável"
          />
          <FeatureCard
            icon="🔄"
            title="Reutilização"
            description="Mesmo workflow serve múltiplos clientes/contextos"
          />
          <FeatureCard
            icon="🛡️"
            title="Qualidade"
            description="Gates obrigam passar por validação"
          />
          <FeatureCard
            icon="📈"
            title="Escalabilidade"
            description="Processa 1 ou 100 clientes sem mudança de código"
          />
        </div>
      </section>

      {/* Conceitos Relacionados */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Aprenda Mais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/docs/conceitos/agentes"
            className="glass rounded-lg p-6 hover:bg-[var(--gama-primary)]/10 transition-colors"
          >
            <h4 className="text-lg font-bold text-[var(--gama-primary)] mb-2">← Agentes</h4>
            <p className="text-gray-300">Os executores que rodam dentro de workflows</p>
          </Link>
          <Link
            href="/docs/conceitos/integracao"
            className="glass rounded-lg p-6 hover:bg-[var(--gama-primary)]/10 transition-colors"
          >
            <h4 className="text-lg font-bold text-[var(--gama-primary)] mb-2">Integração →</h4>
            <p className="text-gray-300">Como workflows se conectam com sistemas externos</p>
          </Link>
          <Link
            href="/docs/aios"
            className="glass rounded-lg p-6 hover:bg-[var(--gama-primary)]/10 transition-colors"
          >
            <h4 className="text-lg font-bold text-[var(--gama-primary)] mb-2">→ GAMA AIOS</h4>
            <p className="text-gray-300">Framework que orquestra estes workflows</p>
          </Link>
          <Link
            href="/docs/cronogramas"
            className="glass rounded-lg p-6 hover:bg-[var(--gama-primary)]/10 transition-colors"
          >
            <h4 className="text-lg font-bold text-[var(--gama-primary)] mb-2">→ GAMA Cronogramas</h4>
            <p className="text-gray-300">Exemplo prático de workflow em ação</p>
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
