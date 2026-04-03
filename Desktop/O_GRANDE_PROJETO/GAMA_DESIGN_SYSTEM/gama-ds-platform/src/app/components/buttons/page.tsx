'use client'

import { Button } from '@/components/atoms/Button'

export default function ButtonsPage() {
  return (
    <div className="min-h-screen bg-gama-dark p-4 sm:p-8 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl md:text-2xl sm:text-3xl md:text-4xl font-black text-gama-text mb-3 sm:mb-4">
            Buttons — <span className="text-gama-primary">Ações e Interações</span>
          </h1>
          <p className="text-gama-text-secondary text-sm sm:text-base md:text-lg max-w-2xl">
            Componentes de botão que comunicam ações, estados e feedbacks visuais ao usuário.
          </p>
        </div>

        {/* Variants */}
        <section className="mb-12 sm:mb-16 p-4 sm:p-6 md:p-8 bg-gama-surface rounded-2xl border border-gama-surface-accent">
          <h2 className="text-xl sm:text-2xl font-black text-gama-text mb-6 sm:mb-8">Variantes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-4 sm:gap-6 md:gap-8">
            <div className="flex flex-col items-center gap-4 p-6 bg-gama-dark rounded-lg">
              <Button variant="primary">Primary</Button>
              <p className="text-gama-text-secondary text-sm">Ação principal</p>
            </div>

            <div className="flex flex-col items-center gap-4 p-6 bg-gama-dark rounded-lg">
              <Button variant="secondary">Secondary</Button>
              <p className="text-gama-text-secondary text-sm">Ação secundária</p>
            </div>

            <div className="flex flex-col items-center gap-4 p-6 bg-gama-dark rounded-lg">
              <Button variant="ghost">Ghost</Button>
              <p className="text-gama-text-secondary text-sm">Ação discreta</p>
            </div>

            <div className="flex flex-col items-center gap-4 p-6 bg-gama-dark rounded-lg">
              <Button variant="danger">Danger</Button>
              <p className="text-gama-text-secondary text-sm">Ação destrutiva</p>
            </div>
          </div>
        </section>

        {/* Sizes */}
        <section className="mb-12 sm:mb-16 p-4 sm:p-6 md:p-8 bg-gama-surface rounded-2xl border border-gama-surface-accent">
          <h2 className="text-xl sm:text-2xl font-black text-gama-text mb-6 sm:mb-8">Tamanhos</h2>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-4 sm:gap-6 md:gap-8">
            <div className="flex flex-col items-center gap-3">
              <Button size="sm">Small</Button>
              <p className="text-gama-text-secondary text-xs">Compacto</p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <Button size="md">Medium</Button>
              <p className="text-gama-text-secondary text-xs">Padrão</p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <Button size="lg">Large</Button>
              <p className="text-gama-text-secondary text-xs">Grande</p>
            </div>
          </div>
        </section>

        {/* States */}
        <section className="mb-12 sm:mb-16 p-4 sm:p-6 md:p-8 bg-gama-surface rounded-2xl border border-gama-surface-accent">
          <h2 className="text-xl sm:text-2xl font-black text-gama-text mb-6 sm:mb-8">Estados</h2>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-4 sm:gap-6 md:gap-8">
            <div className="flex flex-col items-center gap-3">
              <Button>Normal</Button>
              <p className="text-gama-text-secondary text-xs">Estado padrão</p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <Button disabled>Disabled</Button>
              <p className="text-gama-text-secondary text-xs">Desabilitado</p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <Button loading>Loading</Button>
              <p className="text-gama-text-secondary text-xs">Carregando</p>
            </div>
          </div>
        </section>

        {/* Usage */}
        <section className="p-4 sm:p-6 md:p-8 bg-gama-surface rounded-2xl border border-gama-surface-accent">
          <h2 className="text-xl sm:text-2xl font-black text-gama-text mb-4 sm:mb-6">Como Usar</h2>
          <div className="bg-gama-dark p-3 sm:p-4 rounded-lg overflow-x-auto">
            <pre className="text-gama-text-secondary text-xs sm:text-sm break-words whitespace-pre-wrap">{`// Variantes
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>

// Tamanhos
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Estados
<Button disabled>Disabled</Button>
<Button loading>Loading</Button>`}</pre>
          </div>
        </section>
      </div>
    </div>
  )
}
