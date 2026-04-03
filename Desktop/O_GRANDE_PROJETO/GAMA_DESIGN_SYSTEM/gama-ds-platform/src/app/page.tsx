'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gama-dark via-gama-dark to-gama-darker">
      {/* Header with pattern */}
      <div className="relative px-4 py-8 sm:px-8 sm:py-16 md:px-12 md:py-24 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gama-primary opacity-5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gama-primary opacity-5 rounded-full blur-3xl -z-10" />

        {/* Content */}
        <div className="max-w-4xl">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-gama-surface rounded-full text-gama-primary text-sm font-semibold">
              Design System v1.0.0
            </span>
          </div>

          <h1 className="text-display font-black text-gama-text mb-6">
            Construindo Marcas de
            <span className="text-gama-primary"> Impacto</span>
          </h1>

          <p className="text-2xl text-gama-text-secondary font-light leading-relaxed mb-8 max-w-2xl">
            Sistema de design unificado para Grupo Gama. Tokens, componentes, identidade visual e direcionamento estratégico em um único lugar.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Link
              href="/foundations/colors"
              className="px-8 py-4 bg-gama-primary text-gama-dark font-black rounded-lg hover:brightness-110 transition-all flex items-center gap-2"
            >
              Explorar Foundations <ArrowRight size={20} />
            </Link>
            <Link
              href="/components/atoms"
              className="px-8 py-4 bg-gama-surface text-gama-primary font-bold rounded-lg hover:bg-gama-surface-accent transition-all flex items-center gap-2"
            >
              Ver Componentes <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Sections preview */}
      <div className="px-4 py-8 sm:px-8 sm:py-12 md:px-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-5xl">
          {/* Foundations Card */}
          <div className="group p-8 bg-gama-surface border border-gama-surface-accent rounded-xl hover:border-gama-primary transition-all">
            <div className="text-2xl sm:text-3xl md:text-4xl mb-4">🎨</div>
            <h2 className="text-2xl font-black text-gama-text mb-2">Foundations</h2>
            <p className="text-gama-text-secondary mb-6">
              Cores, tipografia, espaçamento e tokens visuais que definem a identidade Gama.
            </p>
            <Link
              href="/foundations/colors"
              className="text-gama-primary font-bold hover:underline flex items-center gap-2"
            >
              Explorar <ArrowRight size={16} />
            </Link>
          </div>

          {/* Components Card */}
          <div className="group p-8 bg-gama-surface border border-gama-surface-accent rounded-xl hover:border-gama-primary transition-all">
            <div className="text-2xl sm:text-3xl md:text-4xl mb-4">🧩</div>
            <h2 className="text-2xl font-black text-gama-text mb-2">Components</h2>
            <p className="text-gama-text-secondary mb-6">
              Biblioteca completa de Atoms, Molecules e Organisms prontos para uso.
            </p>
            <Link
              href="/components/atoms"
              className="text-gama-primary font-bold hover:underline flex items-center gap-2"
            >
              Explorar <ArrowRight size={16} />
            </Link>
          </div>

          {/* Brand Card */}
          <div className="group p-8 bg-gama-surface border border-gama-surface-accent rounded-xl hover:border-gama-primary transition-all">
            <div className="text-2xl sm:text-3xl md:text-4xl mb-4">🎭</div>
            <h2 className="text-2xl font-black text-gama-text mb-2">Brand</h2>
            <p className="text-gama-text-secondary mb-6">
              Identidade visual, tom de voz e aplicações do brand Gama em prática.
            </p>
            <Link
              href="/brand/identity"
              className="text-gama-primary font-bold hover:underline flex items-center gap-2"
            >
              Explorar <ArrowRight size={16} />
            </Link>
          </div>

          {/* Tokens Card */}
          <div className="group p-8 bg-gama-surface border border-gama-surface-accent rounded-xl hover:border-gama-primary transition-all">
            <div className="text-2xl sm:text-3xl md:text-4xl mb-4">⚙️</div>
            <h2 className="text-2xl font-black text-gama-text mb-2">Tokens</h2>
            <p className="text-gama-text-secondary mb-6">
              Dados estruturados: JSON, CSS, Tailwind. Pronto para integração em qualquer projeto.
            </p>
            <Link
              href="/tokens"
              className="text-gama-primary font-bold hover:underline flex items-center gap-2"
            >
              Explorar <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 py-8 sm:px-8 sm:py-12 md:px-12 md:py-16 border-t border-gama-surface">
        <div className="max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
          <div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-gama-primary mb-2">8</div>
            <p className="text-gama-text-secondary">Cores Semânticas</p>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-gama-primary mb-2">6</div>
            <p className="text-gama-text-secondary">Escalas Tipográficas</p>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-gama-primary mb-2">7</div>
            <p className="text-gama-text-secondary">Espaçamentos</p>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-gama-primary mb-2">20+</div>
            <p className="text-gama-text-secondary">Componentes</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-8 sm:px-8 sm:py-12 md:px-12 border-t border-gama-surface text-center">
        <p className="text-gama-text-secondary text-sm">
          GAMA Design System • Mantido por @architect (Aria)
        </p>
        <p className="text-gama-text-muted text-xs mt-2">
          © 2026 Grupo Gama. Todos os direitos reservados.
        </p>
      </div>
    </div>
  )
}
