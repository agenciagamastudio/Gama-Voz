'use client'

import { Avatar } from '@/components/atoms/Avatar'

export default function AvatarsPage() {
  return (
    <div className="min-h-screen bg-gama-dark p-4 sm:p-8 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gama-text mb-4">
            Avatars — <span className="text-gama-primary">Identificação de Usuário</span>
          </h1>
          <p className="text-gama-text-secondary text-lg max-w-2xl">
            Componentes para exibir identificadores de usuários com iniciais ou imagens.
          </p>
        </div>

        {/* Sizes */}
        <section className="mb-16 p-8 bg-gama-surface rounded-2xl border border-gama-surface-accent">
          <h2 className="text-2xl font-black text-gama-text mb-8">Tamanhos</h2>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8">
            <div className="flex flex-col items-center gap-4">
              <div className="p-6 bg-gama-dark rounded-lg flex items-center justify-center">
                <Avatar initials="AB" size="xs" />
              </div>
              <p className="text-gama-text-secondary text-xs">Extra Small</p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="p-6 bg-gama-dark rounded-lg flex items-center justify-center">
                <Avatar initials="AB" size="sm" />
              </div>
              <p className="text-gama-text-secondary text-xs">Small</p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="p-6 bg-gama-dark rounded-lg flex items-center justify-center">
                <Avatar initials="AB" size="md" />
              </div>
              <p className="text-gama-text-secondary text-xs">Medium</p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="p-6 bg-gama-dark rounded-lg flex items-center justify-center">
                <Avatar initials="AB" size="lg" />
              </div>
              <p className="text-gama-text-secondary text-xs">Large</p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="p-6 bg-gama-dark rounded-lg flex items-center justify-center">
                <Avatar initials="AB" size="xl" />
              </div>
              <p className="text-gama-text-secondary text-xs">Extra Large</p>
            </div>
          </div>
        </section>

        {/* Colors */}
        <section className="mb-16 p-8 bg-gama-surface rounded-2xl border border-gama-surface-accent">
          <h2 className="text-2xl font-black text-gama-text mb-8">Cores</h2>
          <div className="flex flex-wrap items-center gap-12">
            <div className="flex flex-col items-center gap-4">
              <div className="p-6 bg-gama-dark rounded-lg">
                <Avatar initials="MC" color="#88CE11" />
              </div>
              <p className="text-gama-text font-medium">Verde Neon</p>
              <p className="text-gama-text-secondary text-xs">#88CE11</p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="p-6 bg-gama-dark rounded-lg">
                <Avatar initials="AB" color="#10B981" />
              </div>
              <p className="text-gama-text font-medium">Verde Sucess</p>
              <p className="text-gama-text-secondary text-xs">#10B981</p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="p-6 bg-gama-dark rounded-lg">
                <Avatar initials="XY" color="#3B82F6" />
              </div>
              <p className="text-gama-text font-medium">Azul</p>
              <p className="text-gama-text-secondary text-xs">#3B82F6</p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="p-6 bg-gama-dark rounded-lg">
                <Avatar initials="JD" color="#F59E0B" />
              </div>
              <p className="text-gama-text font-medium">Amarelo</p>
              <p className="text-gama-text-secondary text-xs">#F59E0B</p>
            </div>
          </div>
        </section>

        {/* Usage */}
        <section className="p-8 bg-gama-surface rounded-2xl border border-gama-surface-accent">
          <h2 className="text-2xl font-black text-gama-text mb-6">Como Usar</h2>
          <div className="bg-gama-dark p-4 rounded-lg overflow-x-auto">
            <pre className="text-gama-text-secondary text-sm">{`// Tamanhos
<Avatar initials="AB" size="xs" />
<Avatar initials="AB" size="sm" />
<Avatar initials="AB" size="md" />
<Avatar initials="AB" size="lg" />
<Avatar initials="AB" size="xl" />

// Com cores customizadas
<Avatar initials="MC" color="#88CE11" />
<Avatar initials="AB" color="#10B981" />
<Avatar initials="XY" color="#3B82F6" />`}</pre>
          </div>
        </section>
      </div>
    </div>
  )
}
