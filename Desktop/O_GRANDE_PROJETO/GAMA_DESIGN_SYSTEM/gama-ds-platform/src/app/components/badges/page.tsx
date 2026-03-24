'use client'

import { Badge } from '@/components/atoms/Badge'

export default function BadgesPage() {
  return (
    <div className="min-h-screen bg-gama-dark p-4 sm:p-8 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gama-text mb-4">
            Badges — <span className="text-gama-primary">Labels e Status</span>
          </h1>
          <p className="text-gama-text-secondary text-lg max-w-2xl">
            Componentes pequenos para exibir status, tags e indicadores de estado.
          </p>
        </div>

        {/* Variants */}
        <section className="mb-16 p-8 bg-gama-surface rounded-2xl border border-gama-surface-accent">
          <h2 className="text-2xl font-black text-gama-text mb-8">Variantes</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="flex flex-col items-center gap-4 p-6 bg-gama-dark rounded-lg">
              <Badge>Default</Badge>
              <p className="text-gama-text-secondary text-xs text-center">Padrão</p>
            </div>

            <div className="flex flex-col items-center gap-4 p-6 bg-gama-dark rounded-lg">
              <Badge variant="success">Success</Badge>
              <p className="text-gama-text-secondary text-xs text-center">Sucesso</p>
            </div>

            <div className="flex flex-col items-center gap-4 p-6 bg-gama-dark rounded-lg">
              <Badge variant="warning">Warning</Badge>
              <p className="text-gama-text-secondary text-xs text-center">Aviso</p>
            </div>

            <div className="flex flex-col items-center gap-4 p-6 bg-gama-dark rounded-lg">
              <Badge variant="error">Error</Badge>
              <p className="text-gama-text-secondary text-xs text-center">Erro</p>
            </div>

            <div className="flex flex-col items-center gap-4 p-6 bg-gama-dark rounded-lg">
              <Badge variant="info">Info</Badge>
              <p className="text-gama-text-secondary text-xs text-center">Info</p>
            </div>
          </div>
        </section>

        {/* With Dot */}
        <section className="mb-16 p-8 bg-gama-surface rounded-2xl border border-gama-surface-accent">
          <h2 className="text-2xl font-black text-gama-text mb-8">Com Indicador (Dot)</h2>
          <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 items-center">
            <div className="flex flex-col items-center gap-4">
              <Badge variant="success" withDot>
                Online
              </Badge>
              <p className="text-gama-text-secondary text-xs">Status ativo</p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <Badge variant="error" withDot>
                Offline
              </Badge>
              <p className="text-gama-text-secondary text-xs">Status inativo</p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <Badge variant="warning" withDot>
                Away
              </Badge>
              <p className="text-gama-text-secondary text-xs">Status ausente</p>
            </div>
          </div>
        </section>

        {/* Usage */}
        <section className="p-8 bg-gama-surface rounded-2xl border border-gama-surface-accent">
          <h2 className="text-2xl font-black text-gama-text mb-6">Como Usar</h2>
          <div className="bg-gama-dark p-4 rounded-lg overflow-x-auto">
            <pre className="text-gama-text-secondary text-sm">{`// Variantes
<Badge>Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>

// Com indicador visual
<Badge variant="success" withDot>Online</Badge>
<Badge variant="error" withDot>Offline</Badge>`}</pre>
          </div>
        </section>
      </div>
    </div>
  )
}
