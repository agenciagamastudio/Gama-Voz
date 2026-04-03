'use client'

import { Spinner } from '@/components/atoms/Spinner'

export default function SpinnersPage() {
  return (
    <div className="min-h-screen bg-gama-dark p-4 sm:p-8 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gama-text mb-4">
            Spinners — <span className="text-gama-primary">Carregamento Dinâmico</span>
          </h1>
          <p className="text-gama-text-secondary text-lg max-w-2xl">
            Componentes de loading que comunicam ação e movimento, alinhados com a identidade Gama Studio.
          </p>
        </div>

        {/* Default Spinner */}
        <section className="mb-16 p-8 bg-gama-surface rounded-2xl border border-gama-surface-accent">
          <h2 className="text-2xl font-black text-gama-text mb-8">Spinner Padrão (Clássico)</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="flex flex-col items-center gap-4">
              <div className="p-6 bg-gama-dark rounded-xl flex items-center justify-center h-20">
                <Spinner size="sm" variant="default" />
              </div>
              <p className="text-gama-text-secondary text-sm font-medium">Small</p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="p-6 bg-gama-dark rounded-xl flex items-center justify-center h-20">
                <Spinner size="md" variant="default" />
              </div>
              <p className="text-gama-text-secondary text-sm font-medium">Medium</p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="p-6 bg-gama-dark rounded-xl flex items-center justify-center h-20">
                <Spinner size="lg" variant="default" />
              </div>
              <p className="text-gama-text-secondary text-sm font-medium">Large</p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="p-6 bg-gama-dark rounded-xl flex items-center justify-center h-20">
                <Spinner size="xl" variant="default" />
              </div>
              <p className="text-gama-text-secondary text-sm font-medium">Extra Large</p>
            </div>
          </div>
        </section>

        {/* Gama Studio Spinner */}
        <section className="mb-16 p-8 bg-gradient-to-br from-gama-surface to-gama-dark border border-gama-primary border-opacity-30 rounded-2xl">
          <h2 className="text-2xl font-black text-gama-text mb-2">
            <span className="text-gama-primary">★ Spinner Gama Studio</span>
          </h2>
          <p className="text-gama-text-secondary mb-8">
            Versão premium com seta ascendente, símbolo de crescimento e movimento dinâmico.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="flex flex-col items-center gap-4">
              <div className="p-6 bg-gama-dark rounded-xl flex items-center justify-center h-28">
                <Spinner
                  size="sm"
                  variant="gama-studio"
                  color="#88CE11"
                />
              </div>
              <p className="text-gama-text-secondary text-sm font-medium">Small</p>
              <p className="text-gama-text-muted text-xs">16px</p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="p-6 bg-gama-dark rounded-xl flex items-center justify-center h-28">
                <Spinner
                  size="md"
                  variant="gama-studio"
                  color="#88CE11"
                />
              </div>
              <p className="text-gama-text-secondary text-sm font-medium">Medium</p>
              <p className="text-gama-text-muted text-xs">32px</p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="p-6 bg-gama-dark rounded-xl flex items-center justify-center h-28">
                <Spinner
                  size="lg"
                  variant="gama-studio"
                  color="#88CE11"
                />
              </div>
              <p className="text-gama-text-secondary text-sm font-medium">Large</p>
              <p className="text-gama-text-muted text-xs">48px</p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="p-6 bg-gama-dark rounded-xl flex items-center justify-center h-28">
                <Spinner
                  size="xl"
                  variant="gama-studio"
                  color="#88CE11"
                />
              </div>
              <p className="text-gama-text-secondary text-sm font-medium">Extra Large</p>
              <p className="text-gama-text-muted text-xs">64px</p>
            </div>
          </div>
        </section>

        {/* Colors Showcase */}
        <section className="mb-16 p-8 bg-gama-surface rounded-2xl border border-gama-surface-accent">
          <h2 className="text-2xl font-black text-gama-text mb-8">Variações de Cor</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="p-6 bg-gama-dark rounded-xl">
              <div className="flex items-center justify-center h-24 mb-4">
                <Spinner
                  size="lg"
                  variant="gama-studio"
                  color="#88CE11"
                />
              </div>
              <p className="text-gama-text font-black">Verde Neon (Primária)</p>
              <p className="text-gama-text-secondary text-sm">#88CE11</p>
            </div>

            <div className="p-6 bg-gama-dark rounded-xl">
              <div className="flex items-center justify-center h-24 mb-4">
                <Spinner
                  size="lg"
                  variant="gama-studio"
                  color="#66AF00"
                />
              </div>
              <p className="text-gama-text font-black">Verde Escuro (Secundária)</p>
              <p className="text-gama-text-secondary text-sm">#66AF00</p>
            </div>

            <div className="p-6 bg-gama-dark rounded-xl">
              <div className="flex items-center justify-center h-24 mb-4">
                <Spinner
                  size="lg"
                  variant="gama-studio"
                  color="#FFFFFF"
                />
              </div>
              <p className="text-gama-text font-black">Branco (Contraste)</p>
              <p className="text-gama-text-secondary text-sm">#FFFFFF</p>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="p-8 bg-gama-surface rounded-2xl border border-gama-surface-accent">
          <h2 className="text-2xl font-black text-gama-text mb-8">Casos de Uso</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <div className="p-6 bg-gama-dark rounded-lg">
              <p className="text-gama-text-secondary text-sm uppercase font-black mb-3">Carregamento de Página</p>
              <div className="flex items-center gap-4">
                <Spinner size="md" variant="gama-studio" color="#88CE11" />
                <div>
                  <p className="text-gama-text font-medium">Carregando dados...</p>
                  <p className="text-gama-text-secondary text-sm">Aguarde enquanto buscamos informações</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gama-dark rounded-lg">
              <p className="text-gama-text-secondary text-sm uppercase font-black mb-3">Upload em Progresso</p>
              <div className="flex items-center gap-4">
                <Spinner size="md" variant="gama-studio" color="#88CE11" />
                <div>
                  <p className="text-gama-text font-medium">Enviando arquivo...</p>
                  <p className="text-gama-text-secondary text-sm">Não feche a página</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gama-dark rounded-lg">
              <p className="text-gama-text-secondary text-sm uppercase font-black mb-3">Processamento de Dados</p>
              <div className="flex items-center gap-4">
                <Spinner size="md" variant="gama-studio" color="#88CE11" />
                <div>
                  <p className="text-gama-text font-medium">Processando cronograma...</p>
                  <p className="text-gama-text-secondary text-sm">Pode levar alguns minutos</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gama-dark rounded-lg">
              <p className="text-gama-text-secondary text-sm uppercase font-black mb-3">Sincronização</p>
              <div className="flex items-center gap-4">
                <Spinner size="md" variant="gama-studio" color="#88CE11" />
                <div>
                  <p className="text-gama-text font-medium">Sincronizando dados...</p>
                  <p className="text-gama-text-secondary text-sm">Mantendo tudo atualizado</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Code Example */}
        <section className="mt-16 p-8 bg-gama-surface rounded-2xl border border-gama-surface-accent">
          <h2 className="text-2xl font-black text-gama-text mb-6">Como Usar</h2>
          <div className="bg-gama-dark p-4 rounded-lg overflow-x-auto">
            <pre className="text-gama-text-secondary text-sm">
{`// Spinner Padrão
<Spinner size="md" variant="default" />

// Spinner Gama Studio (Recomendado!)
<Spinner size="lg" variant="gama-studio" color="#88CE11" />

// Sizes: sm | md | lg | xl
// Variants: default | gama-studio`}
            </pre>
          </div>
        </section>
      </div>
    </div>
  )
}
