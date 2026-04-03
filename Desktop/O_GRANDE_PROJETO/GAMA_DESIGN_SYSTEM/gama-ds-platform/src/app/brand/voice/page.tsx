'use client'

import { useEffect, useState } from 'react'
import { useBrandContext } from '@/hooks/useBrandContext'

export default function VoicePage() {
  const { activeBrandId, currentBrand, isLoading } = useBrandContext()
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    if (activeBrandId) {
      setDataLoading(false)
    }
  }, [activeBrandId])

  const isLoadingPage = isLoading || dataLoading

  return (
    <div className="min-h-screen bg-gama-dark p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-display text-gama-primary font-black mb-2">
            🎤 Voice & Tone
            {currentBrand && <span className="text-lg text-gama-text-secondary ml-3">({currentBrand.name})</span>}
          </h1>
          <p className="text-lg text-gama-text-secondary mb-4">
            Como {currentBrand?.name || 'a marca'} fala com seu público
          </p>
          {isLoadingPage && (
            <div className="bg-gama-surface rounded-lg p-4 border border-gama-surface-accent mb-4">
              <p className="text-gama-text-secondary text-sm">⏳ Carregando dados da marca...</p>
            </div>
          )}
        </div>

        {/* 4 Pillars */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">4 Pilares da Voz Gama</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent">
              <h3 className="text-xl font-black text-gama-primary mb-4">Direto</h3>
              <p className="text-gama-text-secondary mb-4">
                Sem rodeios, sem jargão corporativo vazio. Diga o que precisa ser dito. O leitor respeita clareza.
              </p>
              <p className="text-gama-text-secondary text-sm italic border-l-2 border-gama-primary pl-4">
                "Simplicidade é o oposto de raso. Simplicidade requer pensamento profundo."
              </p>
            </div>

            <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent">
              <h3 className="text-xl font-black text-gama-primary mb-4">Confiante</h3>
              <p className="text-gama-text-secondary mb-4">
                Não fale em dúvidas ou possibilidades. Fale em certezas que você conhece. Confiança é magnetismo.
              </p>
              <p className="text-gama-text-secondary text-sm italic border-l-2 border-gama-primary pl-4">
                "Pessoas seguem quem sabe aonde vai. Não quem espera pra ver."
              </p>
            </div>

            <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent">
              <h3 className="text-xl font-black text-gama-primary mb-4">Ambicioso</h3>
              <p className="text-gama-text-secondary mb-4">
                Fale sobre dominar mercados, crescimento explosivo, impacto. A ambição motiva. Medo paralisa.
              </p>
              <p className="text-gama-text-secondary text-sm italic border-l-2 border-gama-primary pl-4">
                "Grandes coisas atraem pessoas grandes. Pequenas ideias atraem críticos."
              </p>
            </div>

            <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent">
              <h3 className="text-xl font-black text-gama-primary mb-4">Técnico</h3>
              <p className="text-gama-text-secondary mb-4">
                Fale sobre sistemas, processos, frameworks. Nosso público valoriza execução real, não sonhos.
              </p>
              <p className="text-gama-text-secondary text-sm italic border-l-2 border-gama-primary pl-4">
                "A diferença entre sonho e realidade é um plano executável."
              </p>
            </div>
          </div>
        </section>

        {/* Exemplos Lado a Lado */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Exemplos: Gama vs. Genérico</h2>
          <div className="space-y-6">
            {/* Example 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gama-error/10 border border-gama-error/30 rounded-xl p-6">
                <h4 className="font-bold text-gama-error mb-3">❌ Evitar</h4>
                <p className="text-gama-text-secondary text-sm">
                  "Nós fornecemos soluções inovadoras e orientadas ao cliente para transformação digital integrada."
                </p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                <h4 className="font-bold text-green-500 mb-3">✓ Gama</h4>
                <p className="text-gama-text-secondary text-sm">
                  "Construímos marcas que dominam seu mercado."
                </p>
              </div>
            </div>

            {/* Example 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gama-error/10 border border-gama-error/30 rounded-xl p-6">
                <h4 className="font-bold text-gama-error mb-3">❌ Evitar</h4>
                <p className="text-gama-text-secondary text-sm">
                  "Talvez você esteja interessado em explorar possibilidades de crescimento futuro..."
                </p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                <h4 className="font-bold text-green-500 mb-3">✓ Gama</h4>
                <p className="text-gama-text-secondary text-sm">
                  "Pronto para passar do conceito à produção? Vamos conversar sobre execução."
                </p>
              </div>
            </div>

            {/* Example 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gama-error/10 border border-gama-error/30 rounded-xl p-6">
                <h4 className="font-bold text-gama-error mb-3">❌ Evitar</h4>
                <p className="text-gama-text-secondary text-sm">
                  "Humildemente sugerimos que considerem nossa abordagem holística..."
                </p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                <h4 className="font-bold text-green-500 mb-3">✓ Gama</h4>
                <p className="text-gama-text-secondary text-sm">
                  "Aqui, velocidade e qualidade não são inimigos. Temos o processo para provar."
                </p>
              </div>
            </div>

            {/* Example 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gama-error/10 border border-gama-error/30 rounded-xl p-6">
                <h4 className="font-bold text-gama-error mb-3">❌ Evitar</h4>
                <p className="text-gama-text-secondary text-sm">
                  "Esperamos poder ser úteis em sua jornada de transformação..."
                </p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                <h4 className="font-bold text-green-500 mb-3">✓ Gama</h4>
                <p className="text-gama-text-secondary text-sm">
                  "Você cresceu. Agora sua marca precisa crescer com você. Vamos acelerar."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vocabulário */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Vocabulário: Use & Avoid</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent">
              <h3 className="font-bold text-gama-primary mb-4">✓ Palavras Gama</h3>
              <div className="space-y-2 text-gama-text-secondary text-sm">
                <div>Construir, dominar, conquistar</div>
                <div>Velocidade, execução, entrega</div>
                <div>Rigor, clareza, documentação</div>
                <div>Framework, sistema, processo</div>
                <div>Replicável, escalável, reutilizável</div>
                <div>Ambição, crescimento, impacto</div>
                <div>Shipped, pronto, feito</div>
                <div>Parceria real, transparência, educação</div>
              </div>
            </div>

            <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent">
              <h3 className="font-bold text-gama-error mb-4">❌ Evitar</h3>
              <div className="space-y-2 text-gama-text-secondary text-sm">
                <div>Inovar, transformação, revolução</div>
                <div>Talvez, possível, considerar</div>
                <div>Paradigma, sinergia, ecosistema</div>
                <div>Solução, plataforma, software</div>
                <div>Disruption, AI-powered, blockchain</div>
                <div>Esperamos, humildemente, honestamente</div>
                <div>Próximos passos, jornada, explorar</div>
                <div>Win-win, ótimo, fantástico</div>
              </div>
            </div>
          </div>
        </section>

        {/* Tom por Canal */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Tom por Canal</h2>
          <div className="space-y-4">
            <div className="bg-gama-surface rounded-xl p-6 border border-gama-surface-accent">
              <h3 className="font-bold text-gama-primary mb-2">Instagram (Gama Studio)</h3>
              <p className="text-gama-text-secondary text-sm">Mais visual, emojis estratégicos, calls-to-action claros. "Mostre, não conte"</p>
            </div>
            <div className="bg-gama-surface rounded-xl p-6 border border-gama-surface-accent">
              <h3 className="font-bold text-gama-primary mb-2">Email (Campanha)</h3>
              <p className="text-gama-text-secondary text-sm">Direto ao ponto, subject line que vende, CTA em cima (não em baixo)</p>
            </div>
            <div className="bg-gama-surface rounded-xl p-6 border border-gama-surface-accent">
              <h3 className="font-bold text-gama-primary mb-2">Documentação Técnica</h3>
              <p className="text-gama-text-secondary text-sm">Estruturada, com exemplos, sem jargão desnecessário</p>
            </div>
            <div className="bg-gama-surface rounded-xl p-6 border border-gama-surface-accent">
              <h3 className="font-bold text-gama-primary mb-2">Sales Pitch</h3>
              <p className="text-gama-text-secondary text-sm">Números, resultados, prova social ("clientes nossos cresceram X%")</p>
            </div>
          </div>
        </section>

        {/* Emoji Guide */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Estratégia de Emojis</h2>
          <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent">
            <p className="text-gama-text-secondary mb-6">
              Emojis são ferramentas de clareza visual, não decoração. Use quando adicionarem significado. Não use quando puder perder seriedade.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl mb-2">✓</div>
                <p className="text-gama-text-secondary text-sm">Confirmado, sucesso</p>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl mb-2">✕</div>
                <p className="text-gama-text-secondary text-sm">Erro, não fazer</p>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl mb-2">🚀</div>
                <p className="text-gama-text-secondary text-sm">Velocidade, lançamento</p>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl mb-2">🎯</div>
                <p className="text-gama-text-secondary text-sm">Objetivo, foco</p>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl mb-2">⚡</div>
                <p className="text-gama-text-secondary text-sm">Energia, velocidade</p>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl mb-2">💎</div>
                <p className="text-gama-text-secondary text-sm">Premium, valor</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
