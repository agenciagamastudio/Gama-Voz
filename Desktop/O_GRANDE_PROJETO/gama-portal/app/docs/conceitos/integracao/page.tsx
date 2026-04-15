'use client';

import DocLayout from '@/app/components/docs/DocLayout';
import FeatureCard from '@/app/components/docs/FeatureCard';
import CodeBlock from '@/app/components/docs/CodeBlock';
import Link from 'next/link';

export default function Page() {
  return (
    <DocLayout
      title="Integração"
      description="Como agentes e sistemas se conectam com ferramentas, APIs e plataformas externas"
    >
      {/* O que é Integração */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-4">O que é Integração?</h2>
        <p className="text-gray-300 text-lg leading-relaxed mb-4">
          Integração é como agentes e sistemas se conectam com ferramentas, APIs e plataformas externas
          para expandir suas capacidades. Um agente isolado é poderoso; um agente integrado com 10
          ferramentas é exponencialmente mais poderoso.
        </p>
        <p className="text-gray-300 text-lg leading-relaxed">
          No Grupo Gama, integrações permitem que agentes acessem dados em tempo real,
          disparem ações em outros sistemas, e orquestrem processos end-to-end sem limites
          de uma aplicação única.
        </p>
      </section>

      {/* Tipos de Integração */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Tipos de Integração</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FeatureCard
            icon="🔗"
            title="API REST"
            description="Requisições HTTP para obter/enviar dados (HTTP verbs, JSON)"
          />
          <FeatureCard
            icon="🌊"
            title="Webhooks"
            description="Sistema externo envia evento para nosso agente reagir"
          />
          <FeatureCard
            icon="💬"
            title="Message Queues"
            description="Fila de mensagens (RabbitMQ, Redis) para assíncrono"
          />
          <FeatureCard
            icon="🔐"
            title="OAuth / Auth"
            description="Autenticação com Google, GitHub, Stripe, Shopify, etc"
          />
          <FeatureCard
            icon="📊"
            title="Database Connection"
            description="Conexão direta com PostgreSQL, MongoDB, Neo4j"
          />
          <FeatureCard
            icon="🤖"
            title="MCP Servers"
            description="Model Context Protocol para integração com LLMs"
          />
        </div>
      </section>

      {/* Arquitetura de Integração */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Arquitetura</h2>
        <p className="text-gray-300 text-lg leading-relaxed mb-6">
          Agentes integram-se por camadas:
        </p>
        <div className="glass rounded-lg p-8 space-y-6">
          <div className="border-l-4 border-[var(--gama-primary)] pl-4">
            <h4 className="text-lg font-bold text-white mb-1">Camada 1: Agente</h4>
            <p className="text-gray-300">Define o que quer fazer (pesquisar, gravar, publicar)</p>
          </div>
          <div className="border-l-4 border-[var(--gama-primary)] pl-4">
            <h4 className="text-lg font-bold text-white mb-1">Camada 2: Abstração de Ferramenta</h4>
            <p className="text-gray-300">Interface genérica que o agente usa (sem saber detalhes)</p>
          </div>
          <div className="border-l-4 border-[var(--gama-primary)] pl-4">
            <h4 className="text-lg font-bold text-white mb-1">Camada 3: Adaptadores</h4>
            <p className="text-gray-300">Conecta abstração a APIs reais (Groq, Stripe, Twitter, etc)</p>
          </div>
          <div className="border-l-4 border-[var(--gama-primary)] pl-4">
            <h4 className="text-lg font-bold text-white mb-1">Camada 4: Sistemas Externos</h4>
            <p className="text-gray-300">APIs reais, bancos de dados, plataformas terceiras</p>
          </div>
        </div>
      </section>

      {/* Exemplo Prático */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Exemplo: GAMA Cronogramas</h2>
        <p className="text-gray-300 text-lg leading-relaxed mb-6">
          O GAMA Cronogramas integra-se com múltiplos sistemas:
        </p>
        <div className="space-y-4">
          <div className="glass rounded-lg p-6">
            <h4 className="text-lg font-bold text-white mb-2">📊 Google Analytics API</h4>
            <p className="text-gray-300">Pesquisador extrai dados de público, comportamento, trends</p>
          </div>
          <div className="glass rounded-lg p-6">
            <h4 className="text-lg font-bold text-white mb-2">💾 Supabase PostgreSQL</h4>
            <p className="text-gray-300">Content Manager salva topline, Copy Writer acessa para criar variações</p>
          </div>
          <div className="glass rounded-lg p-6">
            <h4 className="text-lg font-bold text-white mb-2">🎨 Figma API</h4>
            <p className="text-gray-300">Designer publica mockups e componentes criados</p>
          </div>
          <div className="glass rounded-lg p-6">
            <h4 className="text-lg font-bold text-white mb-2">📱 Instagram Business API</h4>
            <p className="text-gray-300">Social Handler publica conteúdo diretamente, recebe métricas</p>
          </div>
          <div className="glass rounded-lg p-6">
            <h4 className="text-lg font-bold text-white mb-2">📧 Resend Email API</h4>
            <p className="text-gray-300">Notificações enviadas para cliente quando cronograma está pronto</p>
          </div>
        </div>
      </section>

      {/* Padrões de Integração */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Padrões Comuns</h2>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Request-Response (Síncrono)</h4>
            <CodeBlock
              code={`// Agente chama API, aguarda resposta

const response = await fetch('https://api.stripe.com/v1/charges', {
  method: 'POST',
  headers: { 'Authorization': 'Bearer sk_live_...' },
  body: JSON.stringify({ amount: 9999, currency: 'usd' })
});

const charge = await response.json();
// Agente processa resposta imediatamente`}
              language="javascript"
            />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Event-Driven (Assíncrono)</h4>
            <CodeBlock
              code={`// Webhook externo notifica nosso agente quando algo acontece

// Stripe envia webhook:
POST /webhooks/stripe
{
  "event": "charge.succeeded",
  "charge_id": "ch_123",
  "amount": 9999
}

// Nosso agente:
// 1. Recebe evento
// 2. Valida assinatura
// 3. Processa em background
// 4. Envia confirmação`}
              language="json"
            />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Polling (Verificação Periódica)</h4>
            <CodeBlock
              code={`// Agente verifica periodicamente se há novos dados

setInterval(async () => {
  // Verifica cada 5 minutos
  const new_briefs = await supabase
    .from('client_briefs')
    .select('*')
    .eq('processed', false)
    .limit(10);

  // Se houver, processa
  if (new_briefs.length > 0) {
    agente_pesquisador.start(new_briefs);
  }
}, 5 * 60 * 1000);`}
              language="javascript"
            />
          </div>
        </div>
      </section>

      {/* Segurança em Integrações */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Segurança</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass rounded-lg p-6">
            <h4 className="text-lg font-bold text-[var(--gama-primary)] mb-3">🔐 Credenciais</h4>
            <p className="text-gray-300 text-sm">
              Nunca committar tokens. Use .env, secrets, ou vault seguro
            </p>
          </div>
          <div className="glass rounded-lg p-6">
            <h4 className="text-lg font-bold text-[var(--gama-primary)] mb-3">✅ Validação</h4>
            <p className="text-gray-300 text-sm">
              Validar todos inputs antes de usar em queries ou chamadas
            </p>
          </div>
          <div className="glass rounded-lg p-6">
            <h4 className="text-lg font-bold text-[var(--gama-primary)] mb-3">⏱️ Timeouts</h4>
            <p className="text-gray-300 text-sm">
              Definir timeout em todas chamadas externas (máx 30s)
            </p>
          </div>
          <div className="glass rounded-lg p-6">
            <h4 className="text-lg font-bold text-[var(--gama-primary)] mb-3">🔄 Retry Logic</h4>
            <p className="text-gray-300 text-sm">
              Retry com backoff exponencial + jitter (não martele API)
            </p>
          </div>
          <div className="glass rounded-lg p-6">
            <h4 className="text-lg font-bold text-[var(--gama-primary)] mb-3">📝 Logging</h4>
            <p className="text-gray-300 text-sm">
              Logar todas as chamadas (sem valores sensíveis)
            </p>
          </div>
          <div className="glass rounded-lg p-6">
            <h4 className="text-lg font-bold text-[var(--gama-primary)] mb-3">🛡️ Rate Limiting</h4>
            <p className="text-gray-300 text-sm">
              Respeitar limite de requisições de cada API
            </p>
          </div>
        </div>
      </section>

      {/* Exemplo de Implementação */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Implementação Segura</h2>
        <CodeBlock
          code={`// Agente integrado com boas práticas

interface IntegrationConfig {
  apiKey: string;
  baseUrl: string;
  timeout: number;
  maxRetries: number;
}

async function callExternalAPI(
  endpoint: string,
  data: object,
  config: IntegrationConfig
) {
  let lastError;

  // Retry com backoff exponencial
  for (let attempt = 0; attempt < config.maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        config.timeout
      );

      const response = await fetch(
        \`\${config.baseUrl}\${endpoint}\`,
        {
          method: 'POST',
          headers: {
            'Authorization': \`Bearer \${config.apiKey}\`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
          signal: controller.signal
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(\`API error: \${response.status}\`);
      }

      return await response.json();

    } catch (error) {
      lastError = error;

      // Esperar antes de retry
      const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000;
      await new Promise(r => setTimeout(r, delay));
    }
  }

  throw new Error(\`Failed after \${config.maxRetries} retries: \${lastError}\`);
}`}
          language="typescript"
        />
      </section>

      {/* Ferramentas no Grupo Gama */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6">Ferramentas Integradas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass rounded-lg p-6">
            <h4 className="text-lg font-bold text-white mb-2">Groq API</h4>
            <p className="text-gray-300 text-sm mb-3">Transcrição rápida de áudio (GAMA VOZ)</p>
            <p className="text-gray-400 text-xs">Latência: &lt;2s para 10min audio</p>
          </div>
          <div className="glass rounded-lg p-6">
            <h4 className="text-lg font-bold text-white mb-2">Supabase</h4>
            <p className="text-gray-300 text-sm mb-3">Database PostgreSQL + Auth (múltiplos produtos)</p>
            <p className="text-gray-400 text-xs">RLS, backups automáticos, real-time</p>
          </div>
          <div className="glass rounded-lg p-6">
            <h4 className="text-lg font-bold text-white mb-2">Google Gemini API</h4>
            <p className="text-gray-300 text-sm mb-3">IA multimodal para análise (GAMA Education)</p>
            <p className="text-gray-400 text-xs">Visão, texto, código</p>
          </div>
          <div className="glass rounded-lg p-6">
            <h4 className="text-lg font-bold text-white mb-2">Stripe</h4>
            <p className="text-gray-300 text-sm mb-3">Pagamentos (GAMA Financial, GAMA Studio)</p>
            <p className="text-gray-400 text-xs">Webhooks, recurring billing</p>
          </div>
          <div className="glass rounded-lg p-6">
            <h4 className="text-lg font-bold text-white mb-2">Resend</h4>
            <p className="text-gray-300 text-sm mb-3">Envio de emails (notificações)</p>
            <p className="text-gray-400 text-xs">Templates, tracking, React components</p>
          </div>
          <div className="glass rounded-lg p-6">
            <h4 className="text-lg font-bold text-white mb-2">GitHub API</h4>
            <p className="text-gray-300 text-sm mb-3">Integração com repositórios (GAMA Git)</p>
            <p className="text-gray-400 text-xs">Issues, PRs, commits, actions</p>
          </div>
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
            <p className="text-gray-300">Como agentes usam estas integrações</p>
          </Link>
          <Link
            href="/docs/conceitos/workflows"
            className="glass rounded-lg p-6 hover:bg-[var(--gama-primary)]/10 transition-colors"
          >
            <h4 className="text-lg font-bold text-[var(--gama-primary)] mb-2">← Workflows</h4>
            <p className="text-gray-300">Orquestração com integrações múltiplas</p>
          </Link>
          <Link
            href="/docs/aios"
            className="glass rounded-lg p-6 hover:bg-[var(--gama-primary)]/10 transition-colors"
          >
            <h4 className="text-lg font-bold text-[var(--gama-primary)] mb-2">→ GAMA AIOS</h4>
            <p className="text-gray-300">Framework de orquestração com integrações</p>
          </Link>
          <Link
            href="/docs/voz"
            className="glass rounded-lg p-6 hover:bg-[var(--gama-primary)]/10 transition-colors"
          >
            <h4 className="text-lg font-bold text-[var(--gama-primary)] mb-2">→ GAMA VOZ</h4>
            <p className="text-gray-300">Exemplo prático: Integração com Groq API</p>
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
