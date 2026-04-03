'use client'

import { useState } from 'react'
import { Checkbox } from '@/components/atoms/Checkbox'

export default function CheckboxesPage() {
  const [check1, setCheck1] = useState(false)
  const [check2, setCheck2] = useState(true)

  return (
    <div className="min-h-screen bg-gama-dark p-4 sm:p-8 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gama-text mb-4">
            Checkboxes — <span className="text-gama-primary">Seleção Múltipla</span>
          </h1>
          <p className="text-gama-text-secondary text-lg max-w-2xl">
            Componentes para seleção de uma ou múltiplas opções em listas ou formulários.
          </p>
        </div>

        {/* States */}
        <section className="mb-16 p-8 bg-gama-surface rounded-2xl border border-gama-surface-accent">
          <h2 className="text-2xl font-black text-gama-text mb-8">Estados</h2>
          <div className="space-y-6">
            <div className="p-6 bg-gama-dark rounded-lg">
              <Checkbox
                label="Checkbox não marcado"
                checked={check1}
                onChange={setCheck1}
              />
              <p className="text-gama-text-secondary text-xs mt-2">
                Status: {check1 ? 'Marcado' : 'Não marcado'}
              </p>
            </div>

            <div className="p-6 bg-gama-dark rounded-lg">
              <Checkbox
                label="Checkbox marcado"
                checked={check2}
                onChange={setCheck2}
              />
              <p className="text-gama-text-secondary text-xs mt-2">
                Status: {check2 ? 'Marcado' : 'Não marcado'}
              </p>
            </div>

            <div className="p-6 bg-gama-dark rounded-lg">
              <Checkbox label="Checkbox desabilitado" disabled />
              <p className="text-gama-text-secondary text-xs mt-2">Status: Desabilitado</p>
            </div>

            <div className="p-6 bg-gama-dark rounded-lg">
              <Checkbox label="Estado indeterminado" indeterminate />
              <p className="text-gama-text-secondary text-xs mt-2">
                Status: Parcialmente marcado (grupo)
              </p>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-16 p-8 bg-gama-surface rounded-2xl border border-gama-surface-accent">
          <h2 className="text-2xl font-black text-gama-text mb-8">Casos de Uso</h2>
          <div className="space-y-8">
            <div className="p-6 bg-gama-dark rounded-lg">
              <p className="text-gama-text-secondary text-xs uppercase font-black mb-4">
                Termos e Condições
              </p>
              <div className="space-y-3">
                <Checkbox label="Concordo com os Termos de Serviço" />
                <Checkbox label="Concordo com a Política de Privacidade" />
                <Checkbox label="Desejo receber newsletter" />
              </div>
            </div>

            <div className="p-6 bg-gama-dark rounded-lg">
              <p className="text-gama-text-secondary text-xs uppercase font-black mb-4">
                Permissões
              </p>
              <div className="space-y-3">
                <Checkbox label="Leitura" checked />
                <Checkbox label="Escrita" checked />
                <Checkbox label="Exclusão" />
              </div>
            </div>

            <div className="p-6 bg-gama-dark rounded-lg">
              <p className="text-gama-text-secondary text-xs uppercase font-black mb-4">
                Seleção em Massa
              </p>
              <div className="space-y-3">
                <Checkbox label="Selecionar todos" indeterminate />
                <div className="ml-6 space-y-2 border-l border-gama-surface-accent pl-4">
                  <Checkbox label="Item 1" checked />
                  <Checkbox label="Item 2" checked />
                  <Checkbox label="Item 3" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Usage */}
        <section className="p-8 bg-gama-surface rounded-2xl border border-gama-surface-accent">
          <h2 className="text-2xl font-black text-gama-text mb-6">Como Usar</h2>
          <div className="bg-gama-dark p-4 rounded-lg overflow-x-auto">
            <pre className="text-gama-text-secondary text-sm">{`import { useState } from 'react'
import { Checkbox } from '@/components/atoms/Checkbox'

export default function Component() {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <>
      {/* Checkbox básico */}
      <Checkbox
        label="Concordo com os termos"
        checked={isChecked}
        onChange={setIsChecked}
      />

      {/* Checkbox desabilitado */}
      <Checkbox label="Opção indisponível" disabled />

      {/* Estado indeterminado (grupo) */}
      <Checkbox label="Selecionar todos" indeterminate />
    </>
  )
}`}</pre>
          </div>
        </section>
      </div>
    </div>
  )
}
