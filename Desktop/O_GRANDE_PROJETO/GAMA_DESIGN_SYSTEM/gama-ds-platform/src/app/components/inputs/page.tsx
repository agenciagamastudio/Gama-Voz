'use client'

import { Input } from '@/components/atoms/Input'

export default function InputsPage() {
  return (
    <div className="min-h-screen bg-gama-dark p-4 sm:p-8 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gama-text mb-4">
            Inputs — <span className="text-gama-primary">Entrada de Dados</span>
          </h1>
          <p className="text-gama-text-secondary text-lg max-w-2xl">
            Campos de entrada para texto, email, senha e outros tipos de dados com suporte a validação e estados.
          </p>
        </div>

        {/* Basic Inputs */}
        <section className="mb-16 p-8 bg-gama-surface rounded-2xl border border-gama-surface-accent">
          <h2 className="text-2xl font-black text-gama-text mb-8">Tipos de Input</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <div className="flex flex-col gap-4">
              <p className="text-gama-text-secondary text-sm uppercase font-black">Texto</p>
              <Input label="Nome completo" placeholder="Digite seu nome" />
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-gama-text-secondary text-sm uppercase font-black">Email</p>
              <Input label="Email" type="email" placeholder="seu@email.com" />
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-gama-text-secondary text-sm uppercase font-black">Senha</p>
              <Input label="Senha" type="password" placeholder="••••••" showPasswordToggle />
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-gama-text-secondary text-sm uppercase font-black">Numérico</p>
              <Input label="Quantidade" type="number" placeholder="0" />
            </div>
          </div>
        </section>

        {/* States */}
        <section className="mb-16 p-8 bg-gama-surface rounded-2xl border border-gama-surface-accent">
          <h2 className="text-2xl font-black text-gama-text mb-8">Estados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <div className="flex flex-col gap-4">
              <p className="text-gama-text-secondary text-sm uppercase font-black">Normal</p>
              <Input label="Campo normal" placeholder="Padrão" />
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-gama-text-secondary text-sm uppercase font-black">Com Erro</p>
              <Input
                label="Campo com erro"
                error="Campo obrigatório"
                value="valor inválido"
                onChange={() => {}}
              />
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-gama-text-secondary text-sm uppercase font-black">Com Helper Text</p>
              <Input
                label="Campo com ajuda"
                placeholder="Digite aqui"
                helperText="Máximo 20 caracteres"
              />
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-gama-text-secondary text-sm uppercase font-black">Desabilitado</p>
              <Input label="Campo desabilitado" placeholder="Desabilitado" disabled />
            </div>
          </div>
        </section>

        {/* Usage */}
        <section className="p-8 bg-gama-surface rounded-2xl border border-gama-surface-accent">
          <h2 className="text-2xl font-black text-gama-text mb-6">Como Usar</h2>
          <div className="bg-gama-dark p-4 rounded-lg overflow-x-auto">
            <pre className="text-gama-text-secondary text-sm">{`// Tipos básicos
<Input label="Nome" placeholder="Seu nome" />
<Input label="Email" type="email" placeholder="seu@email.com" />
<Input label="Senha" type="password" showPasswordToggle />

// Com helper text
<Input
  label="Descrição"
  helperText="Máximo 200 caracteres"
/>

// Com erro
<Input
  label="Campo"
  error="Campo obrigatório"
  value="valor inválido"
/>

// Desabilitado
<Input label="Campo" disabled />`}</pre>
          </div>
        </section>
      </div>
    </div>
  )
}
