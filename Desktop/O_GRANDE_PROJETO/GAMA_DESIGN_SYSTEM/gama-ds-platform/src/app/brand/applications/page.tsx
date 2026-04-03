'use client'

import { useEffect, useState } from 'react'
import { useBrandContext } from '@/hooks/useBrandContext'

export default function ApplicationsPage() {
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
            🎨 Brand Applications
            {currentBrand && <span className="text-lg text-gama-text-secondary ml-3">({currentBrand.name})</span>}
          </h1>
          <p className="text-lg text-gama-text-secondary mb-4">
            Como a marca {currentBrand?.name || 'da marca'} é aplicada em diferentes contextos e canais
          </p>
          {isLoadingPage && (
            <div className="bg-gama-surface rounded-lg p-4 border border-gama-surface-accent mb-4">
              <p className="text-gama-text-secondary text-sm">⏳ Carregando dados da marca...</p>
            </div>
          )}
        </div>

        {/* Business Card */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Business Card</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <div>
              <p className="text-gama-text-secondary mb-4 text-sm font-bold">FRENTE (85mm x 55mm)</p>
              <div className="bg-gama-dark border-2 border-gama-primary w-full aspect-video flex flex-col justify-between p-4 rounded-lg">
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-gama-primary">GAMA</div>
                <div className="text-xs text-gama-text-secondary">
                  <p className="font-bold text-gama-text">Your Name</p>
                  <p>Título do Cargo</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-gama-text-secondary mb-4 text-sm font-bold">VERSO</p>
              <div className="bg-gama-dark border-2 border-gama-surface-accent w-full aspect-video flex flex-col justify-between p-4 rounded-lg">
                <div className="space-y-1 text-xs text-gama-text-secondary">
                  <p>contato@gama.com</p>
                  <p>+55 (11) 98765-4321</p>
                  <p>gama.com.br</p>
                </div>
                <div className="text-gama-primary text-lg font-black">■</div>
              </div>
            </div>
          </div>
        </section>

        {/* Instagram Post */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Instagram Post (1080x1080)</h2>
          <div className="flex justify-center">
            <div className="bg-gama-dark w-full max-w-md aspect-square rounded-lg border border-gama-surface-accent flex flex-col items-center justify-center p-6 text-center">
              <div className="text-6xl font-black text-gama-primary mb-4">GAMA</div>
              <p className="text-lg font-bold text-gama-text mb-6">Construímos marcas que dominam</p>
              <p className="text-sm text-gama-text-secondary mb-8">
                Design System v1.0 — Pronto para usar
              </p>
              <div className="bg-gama-primary text-gama-dark px-6 py-2 rounded-lg font-bold text-sm">
                Saiba mais
              </div>
            </div>
          </div>
        </section>

        {/* LinkedIn Banner */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">LinkedIn Cover (1584x396)</h2>
          <div className="bg-gama-dark w-full aspect-video rounded-lg border border-gama-surface-accent flex items-center justify-between px-12">
            <div className="text-5xl font-black text-gama-primary">GAMA</div>
            <p className="text-gama-text-secondary text-sm max-w-xs">
              Metodologias proprietárias que escalam. Frameworks reutilizáveis. Execução rigorosa.
            </p>
          </div>
        </section>

        {/* Email Signature */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Email Signature</h2>
          <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent max-w-2xl">
            <div className="bg-gama-darker rounded-lg p-6 text-xs font-mono text-gama-text-secondary space-y-2">
              <p className="font-bold text-gama-primary">Your Name</p>
              <p>Product Manager @ Gama</p>
              <p className="text-gama-text-secondary">contato@gama.com.br</p>
              <p className="text-gama-text-secondary">+55 (11) 98765-4321</p>
              <div className="border-t border-gama-surface-accent pt-3 mt-3">
                <p className="text-gama-primary">gama.com.br</p>
              </div>
            </div>
          </div>
        </section>

        {/* Presentation Slides */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Presentation Slides (16:9)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gama-dark border-2 border-gama-surface-accent w-full aspect-video rounded-lg flex flex-col items-center justify-center p-6">
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-gama-primary mb-4">GAMA</div>
              <p className="text-gama-text-secondary">Title Slide Template</p>
            </div>

            <div className="bg-gama-dark border-2 border-gama-primary w-full aspect-video rounded-lg flex items-start justify-between p-6">
              <div className="flex-1">
                <p className="font-black text-gama-primary mb-4 text-lg">Slide Title</p>
                <p className="text-gama-text-secondary text-sm">Conteúdo aqui</p>
              </div>
              <div className="w-20 h-20 bg-gama-primary rounded-lg" />
            </div>
          </div>
        </section>

        {/* Color Palette Poster */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Color Palette Poster</h2>
          <div className="bg-gama-dark rounded-xl p-8 border border-gama-surface-accent">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <div>
                <div className="h-24 rounded-lg bg-gama-primary mb-3" />
                <p className="font-bold text-gama-text">Primary</p>
                <p className="text-gama-text-secondary text-sm">#88CE11</p>
              </div>
              <div>
                <div className="h-24 rounded-lg bg-gama-dark border border-gama-surface-accent mb-3" />
                <p className="font-bold text-gama-text">Dark</p>
                <p className="text-gama-text-secondary text-sm">#161616</p>
              </div>
              <div>
                <div className="h-24 rounded-lg bg-gama-surface mb-3" />
                <p className="font-bold text-gama-text">Surface</p>
                <p className="text-gama-text-secondary text-sm">#272727</p>
              </div>
              <div>
                <div className="h-24 rounded-lg bg-green-500 mb-3" />
                <p className="font-bold text-gama-text">Success</p>
                <p className="text-gama-text-secondary text-sm">#10B981</p>
              </div>
              <div>
                <div className="h-24 rounded-lg bg-amber-500 mb-3" />
                <p className="font-bold text-gama-text">Warning</p>
                <p className="text-gama-text-secondary text-sm">#F59E0B</p>
              </div>
              <div>
                <div className="h-24 rounded-lg bg-red-500 mb-3" />
                <p className="font-bold text-gama-text">Error</p>
                <p className="text-gama-text-secondary text-sm">#E11D48</p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media Guidelines */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Social Media Guidelines</h2>
          <div className="space-y-4">
            <div className="bg-gama-surface rounded-xl p-6 border border-gama-surface-accent">
              <h3 className="font-bold text-gama-primary mb-2">Instagram (Gama Studio)</h3>
              <ul className="space-y-2 text-gama-text-secondary text-sm">
                <li>• Post size: 1080x1080 (quadrado) ou 1080x1350 (portrait)</li>
                <li>• Background: #161616 com accents #88CE11</li>
                <li>• Caption: 1-3 linhas, direto, commanding</li>
                <li>• CTA: "Vem com a gente", "Bora acelerar?", "Marca que domina"</li>
              </ul>
            </div>

            <div className="bg-gama-surface rounded-xl p-6 border border-gama-surface-accent">
              <h3 className="font-bold text-gama-primary mb-2">LinkedIn (Corpo)</h3>
              <ul className="space-y-2 text-gama-text-secondary text-sm">
                <li>• Cover image: 1584x396 com logo e headline</li>
                <li>• Posts: Números, resultados, cases de sucesso</li>
                <li>• Tone: Profissional mas direto</li>
                <li>• Share: Artigos, pesquisas, insights de mercado</li>
              </ul>
            </div>

            <div className="bg-gama-surface rounded-xl p-6 border border-gama-surface-accent">
              <h3 className="font-bold text-gama-primary mb-2">Email Marketing</h3>
              <ul className="space-y-2 text-gama-text-secondary text-sm">
                <li>• Subject line: Direto, sem spam</li>
                <li>• CTA acima do fold (não em baixo)</li>
                <li>• Cores: Dark tema com accents #88CE11</li>
                <li>• Typography: Poppins para headlines, sans-serif para body</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Accessibility Standards */}
        <section className="mb-16">
          <div className="bg-gama-surface-accent border border-gama-primary/30 rounded-xl p-8">
            <h3 className="text-lg font-bold text-gama-text mb-4">♿ Padrões de Acessibilidade</h3>
            <ul className="space-y-3 text-gama-text-secondary">
              <li className="flex gap-3">
                <span className="text-gama-primary font-bold">✓</span>
                <span>Contraste mínimo: #FFFFFF em #161616 — WCAG AAA (7:1)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gama-primary font-bold">✓</span>
                <span>Sempre forneça alt-text para imagens e logotipos</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gama-primary font-bold">✓</span>
                <span>Links devem ser claramente identificáveis (cor + decoração)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gama-primary font-bold">✓</span>
                <span>Não use cor como único indicador de informação</span>
              </li>
              <li className="flex gap-3">
                <span className="text-gama-primary font-bold">✓</span>
                <span>Fonte mínima de 12px em digital, 10pt em print</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
