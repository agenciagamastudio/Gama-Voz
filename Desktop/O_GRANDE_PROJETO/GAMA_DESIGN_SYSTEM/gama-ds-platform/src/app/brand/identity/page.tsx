'use client'

import { useEffect, useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { useBrandContext } from '@/hooks/useBrandContext'

interface BrandIdentityData {
  manifesto?: string
  values?: Record<string, string>
  archetypes?: Record<string, any>
  structure?: Record<string, string>
  [key: string]: any
}

export default function IdentityPage() {
  const { activeBrandId, currentBrand, isLoading } = useBrandContext()
  const [brandData, setBrandData] = useState<BrandIdentityData | null>(null)
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    if (!activeBrandId) return

    async function loadBrandIdentity() {
      try {
        setDataLoading(true)
        const response = await fetch(`/api/brands/${activeBrandId}`)
        const data = await response.json()
        setBrandData(data)
      } catch (error) {
        console.error('Erro carregando identidade da marca:', error)
      } finally {
        setDataLoading(false)
      }
    }

    loadBrandIdentity()
  }, [activeBrandId])

  const isLoadingPage = isLoading || dataLoading

  return (
    <div className="min-h-screen bg-gama-dark p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-display text-gama-primary font-black mb-2">
            🎭 Brand Identity
            {currentBrand && <span className="text-lg text-gama-text-secondary ml-3">({currentBrand.name})</span>}
          </h1>
          <p className="text-lg text-gama-text-secondary mb-4">
            {currentBrand?.description || 'Essência visual, valores e diferencial'}
          </p>
          {isLoadingPage && (
            <div className="bg-gama-surface rounded-lg p-4 border border-gama-surface-accent mb-4">
              <p className="text-gama-text-secondary text-sm">⏳ Carregando dados da marca...</p>
            </div>
          )}
        </div>

        {/* Manifesto */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Manifesto</h2>
          <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-gama-primary mb-4">
                  Construímos marcas de alto impacto que dominam seus mercados
                </h3>
              </div>
              <div className="space-y-4 text-gama-text-secondary">
                <p>
                  O Grupo Gama não constrói marcas genéricas. Construímos marcas que conquistam mercado através de metodologias proprietárias, execução rigorosa e estratégia clara.
                </p>
                <p>
                  Cada marca que criamos é um sistema vivo: com DNA próprio, lógica de expansão, diretrizes visuais rigorosas e um roadmap de domínio de mercado.
                </p>
                <p>
                  Nós acreditamos que velocidade e qualidade não são inimigos quando você tem processos claros, equipes bem estruturadas e frameworks reutilizáveis.
                </p>
                <p>
                  Shipped is better than perfect. Mas "shipped" na Gama significa entrega de valor, não degradação de qualidade.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Missão, Visão, Valores */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Missão, Visão e Valores</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent">
              <h3 className="text-lg font-black text-gama-primary mb-4">Missão</h3>
              <p className="text-gama-text-secondary">
                Transformar empresas estabelecidas e indivíduos em marcas reconhecidas, através de inovação em metodologia e execução sem concessões.
              </p>
            </div>

            <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent">
              <h3 className="text-lg font-black text-gama-primary mb-4">Visão</h3>
              <p className="text-gama-text-secondary">
                Ser a referência global em branding, conhecida por metodologias proprietárias, velocidade de execução e resultados mensuráveis.
              </p>
            </div>

            <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent">
              <h3 className="text-lg font-black text-gama-primary mb-4">Público</h3>
              <p className="text-gama-text-secondary">
                Empresas estabelecidas buscando reinvenção + indivíduos aprendendo a construir marca pessoal de alto impacto.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Valores Fundamentais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent">
              <h3 className="text-xl font-black text-gama-primary mb-4">🚀 Ambição + Velocidade</h3>
              <p className="text-gama-text-secondary mb-3">
                Shipped better than perfect. Acreditamos que velocidade sem sacrificar qualidade essencial é o valor diferencial.
              </p>
              <p className="text-gama-text-secondary text-sm italic">
                "Uma marca boa em produção vale mais que uma marca perfeita em conceito."
              </p>
            </div>

            <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent">
              <h3 className="text-xl font-black text-gama-primary mb-4">🔧 Inovação em Metodologia</h3>
              <p className="text-gama-text-secondary mb-3">
                Não reinventamos a roda em cada projeto. Criamos processos únicos, sistemas reutilizáveis e frameworks proprietários que escalam.
              </p>
              <p className="text-gama-text-secondary text-sm italic">
                "Nossos processos são nosso diferencial competitivo."
              </p>
            </div>

            <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent">
              <h3 className="text-xl font-black text-gama-primary mb-4">💎 Clareza Extrema</h3>
              <p className="text-gama-text-secondary mb-3">
                Simplicidade sofisticada, decisões explícitas e documentação padrão. Não há espaço para ambiguidade.
              </p>
              <p className="text-gama-text-secondary text-sm italic">
                "Clareza é o oposto de simplicidade. Clareza requer rigor."
              </p>
            </div>

            <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent">
              <h3 className="text-xl font-black text-gama-primary mb-4">🤝 Parceria Real</h3>
              <p className="text-gama-text-secondary mb-3">
                Transparência total, educação interna e sucessos compartilhados. Nossos clientes crescem com a gente.
              </p>
              <p className="text-gama-text-secondary text-sm italic">
                "Parcerias reais geram resultados reais."
              </p>
            </div>
          </div>
        </section>

        {/* Arquétipo de Marca */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Arquétipo de Marca</h2>
          <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gama-text mb-3">The Explorer (Explorador) + The Sage (Sábio)</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gama-primary mb-3">Explorer (40%)</h4>
                  <ul className="space-y-2 text-gama-text-secondary">
                    <li className="flex gap-2">
                      <CheckCircle size={18} className="text-gama-primary flex-shrink-0 mt-0.5" />
                      <span>Busca o novo, não se satisfaz com status quo</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle size={18} className="text-gama-primary flex-shrink-0 mt-0.5" />
                      <span>Ambição de dominar mercados</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle size={18} className="text-gama-primary flex-shrink-0 mt-0.5" />
                      <span>Velocidade, risco calculado, execução</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gama-primary mb-3">Sage (60%)</h4>
                  <ul className="space-y-2 text-gama-text-secondary">
                    <li className="flex gap-2">
                      <CheckCircle size={18} className="text-gama-primary flex-shrink-0 mt-0.5" />
                      <span>Análise rigorosa, decisões baseadas em dados</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle size={18} className="text-gama-primary flex-shrink-0 mt-0.5" />
                      <span>Educação e clareza em tudo que faz</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle size={18} className="text-gama-primary flex-shrink-0 mt-0.5" />
                      <span>Processos claros, frameworks reutilizáveis</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Estrutura do Grupo */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Estrutura do Grupo Gama</h2>
          <div className="space-y-4">
            <div className="bg-gama-surface rounded-xl p-6 border border-gama-surface-accent">
              <h3 className="font-bold text-gama-text mb-2">🎬 Gama Studio</h3>
              <p className="text-gama-text-secondary text-sm">
                Agência de branding e marketing visual especializada em Instagram. Foco em marcas pessoais, pequenas empresas e rebranding.
              </p>
            </div>

            <div className="bg-gama-surface rounded-xl p-6 border border-gama-surface-accent">
              <h3 className="font-bold text-gama-text mb-2">📻 Gama Rádio</h3>
              <p className="text-gama-text-secondary text-sm">
                Publicidade corporativa via rádio. Foco em comunicação verbal, podcast e publicidade de longa duração.
              </p>
            </div>

            <div className="bg-gama-surface rounded-xl p-6 border border-gama-surface-accent">
              <h3 className="font-bold text-gama-text mb-2">📺 Gama TV</h3>
              <p className="text-gama-text-secondary text-sm">
                Publicidade corporativa via TV e displays. Foco em comunicação visual de impacto para grandes audiências.
              </p>
            </div>

            <div className="bg-gama-surface rounded-xl p-6 border border-gama-surface-accent">
              <h3 className="font-bold text-gama-text mb-2">🤖 Gama Engine</h3>
              <p className="text-gama-text-secondary text-sm">
                Soluções de IA para empresas. Automação, análise de dados, sistemas inteligentes de branding.
              </p>
            </div>
          </div>
        </section>

        {/* Logo & Colors */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Visual Identity</h2>
          <div className="space-y-8">
            <div className="bg-gama-surface rounded-xl p-12 border border-gama-surface-accent text-center">
              <h3 className="text-lg font-bold text-gama-text mb-6">Logo Principal</h3>
              <div className="text-7xl font-black text-gama-primary mb-4">GAMA</div>
              <p className="text-gama-text-secondary">Tipografia: Poppins Black (900) | Cor: #88CE11 (Verde Neon)</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gama-text mb-4">Cores da Marca</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gama-surface rounded-xl p-6 border border-gama-surface-accent">
                  <div className="h-24 rounded-lg bg-gama-primary mb-4" />
                  <p className="font-bold text-gama-text">Primary: Verde Neon</p>
                  <p className="text-gama-text-secondary text-sm">#88CE11 | RGB(136, 206, 17)</p>
                </div>

                <div className="bg-gama-surface rounded-xl p-6 border border-gama-surface-accent">
                  <div className="h-24 rounded-lg bg-gama-dark mb-4 border border-gama-surface-accent" />
                  <p className="font-bold text-gama-text">Background: Dark</p>
                  <p className="text-gama-text-secondary text-sm">#161616 | RGB(22, 22, 22)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Diferencial Competitivo */}
        <section className="mb-16">
          <div className="bg-gama-surface-accent border border-gama-primary/30 rounded-xl p-8">
            <h3 className="text-lg font-bold text-gama-text mb-4">Por que escolher Gama?</h3>
            <ul className="space-y-3 text-gama-text-secondary">
              <li className="flex gap-3">
                <CheckCircle size={20} className="text-gama-primary flex-shrink-0 mt-0.5" />
                <span>Metodologias proprietárias que escalem com seu crescimento</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle size={20} className="text-gama-primary flex-shrink-0 mt-0.5" />
                <span>Execução rigorosa com documentação padrão</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle size={20} className="text-gama-primary flex-shrink-0 mt-0.5" />
                <span>Velocidade sem sacrificar qualidade essencial</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle size={20} className="text-gama-primary flex-shrink-0 mt-0.5" />
                <span>Parcerias reais que geram crescimento mútuo</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
