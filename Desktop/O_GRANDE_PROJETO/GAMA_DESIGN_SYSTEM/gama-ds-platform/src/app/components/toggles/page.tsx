'use client'

import { useState } from 'react'
import { Toggle } from '@/components/atoms/Toggle'

export default function TogglesPage() {
  const [toggle1, setToggle1] = useState(false)
  const [toggle2, setToggle2] = useState(true)

  return (
    <div className="min-h-screen bg-gama-dark p-4 sm:p-8 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gama-text mb-4">
            Toggles — <span className="text-gama-primary">Mudança de Estado</span>
          </h1>
          <p className="text-gama-text-secondary text-lg max-w-2xl">
            Componentes para alternar entre dois estados de forma simples e intuitiva.
          </p>
        </div>

        {/* States */}
        <section className="mb-16 p-8 bg-gama-surface rounded-2xl border border-gama-surface-accent">
          <h2 className="text-2xl font-black text-gama-text mb-8">Estados</h2>
          <div className="space-y-6">
            <div className="p-6 bg-gama-dark rounded-lg">
              <Toggle label="Notificações ativadas" checked={toggle1} onChange={setToggle1} />
              <p className="text-gama-text-secondary text-xs mt-2">
                Status: {toggle1 ? 'Ativado' : 'Desativado'}
              </p>
            </div>

            <div className="p-6 bg-gama-dark rounded-lg">
              <Toggle label="Modo escuro" checked={toggle2} onChange={setToggle2} />
              <p className="text-gama-text-secondary text-xs mt-2">
                Status: {toggle2 ? 'Ativado' : 'Desativado'}
              </p>
            </div>

            <div className="p-6 bg-gama-dark rounded-lg">
              <Toggle label="Toggle desabilitado" disabled />
              <p className="text-gama-text-secondary text-xs mt-2">Status: Desabilitado</p>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-16 p-8 bg-gama-surface rounded-2xl border border-gama-surface-accent">
          <h2 className="text-2xl font-black text-gama-text mb-8">Casos de Uso</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <div className="p-6 bg-gama-dark rounded-lg">
              <p className="text-gama-text-secondary text-xs uppercase font-black mb-4">Configurações</p>
              <div className="space-y-4">
                <Toggle label="Receber notificações por email" checked />
                <Toggle label="Receber notificações via SMS" />
              </div>
            </div>

            <div className="p-6 bg-gama-dark rounded-lg">
              <p className="text-gama-text-secondary text-xs uppercase font-black mb-4">Preferências</p>
              <div className="space-y-4">
                <Toggle label="Modo desenvolvimento" />
                <Toggle label="Habilitar análises" checked />
              </div>
            </div>
          </div>
        </section>

        {/* Usage */}
        <section className="p-8 bg-gama-surface rounded-2xl border border-gama-surface-accent">
          <h2 className="text-2xl font-black text-gama-text mb-6">Como Usar</h2>
          <div className="bg-gama-dark p-4 rounded-lg overflow-x-auto">
            <pre className="text-gama-text-secondary text-sm">{`import { useState } from 'react'
import { Toggle } from '@/components/atoms/Toggle'

export default function Component() {
  const [isEnabled, setIsEnabled] = useState(false)

  return (
    <>
      {/* Toggle básico */}
      <Toggle
        label="Ativar notificações"
        checked={isEnabled}
        onChange={setIsEnabled}
      />

      {/* Toggle desabilitado */}
      <Toggle label="Desabilitado" disabled />
    </>
  )
}`}</pre>
          </div>
        </section>
      </div>
    </div>
  )
}
