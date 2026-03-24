'use client'

import {
  Home,
  ChevronDown,
  X,
  ExternalLink,
  Plus,
  Edit,
  Trash2,
  Download,
  Upload,
  Copy,
  Search,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Loader,
  BarChart3,
  TrendingUp,
  Database,
  Table,
  Bell,
  Settings,
  User,
  Lock,
  Eye,
  EyeOff,
  Heart,
  Star,
  Zap,
  Shield,
  Rocket,
  Lightbulb,
  Award,
} from 'lucide-react'

export default function IconsPage() {
  const iconCategories = [
    {
      name: 'Navegação',
      icons: [
        { Icon: Home, name: 'Home' },
        { Icon: ChevronDown, name: 'ChevronDown' },
        { Icon: X, name: 'X' },
        { Icon: ExternalLink, name: 'ExternalLink' },
      ],
    },
    {
      name: 'Ações',
      icons: [
        { Icon: Plus, name: 'Plus' },
        { Icon: Edit, name: 'Edit' },
        { Icon: Trash2, name: 'Trash2' },
        { Icon: Download, name: 'Download' },
        { Icon: Upload, name: 'Upload' },
        { Icon: Copy, name: 'Copy' },
        { Icon: Search, name: 'Search' },
      ],
    },
    {
      name: 'Status',
      icons: [
        { Icon: CheckCircle, name: 'CheckCircle' },
        { Icon: XCircle, name: 'XCircle' },
        { Icon: AlertTriangle, name: 'AlertTriangle' },
        { Icon: Info, name: 'Info' },
        { Icon: Loader, name: 'Loader' },
      ],
    },
    {
      name: 'Dados',
      icons: [
        { Icon: BarChart3, name: 'BarChart3' },
        { Icon: TrendingUp, name: 'TrendingUp' },
        { Icon: Database, name: 'Database' },
        { Icon: Table, name: 'Table' },
      ],
    },
    {
      name: 'Interface',
      icons: [
        { Icon: Bell, name: 'Bell' },
        { Icon: Settings, name: 'Settings' },
        { Icon: User, name: 'User' },
        { Icon: Lock, name: 'Lock' },
        { Icon: Eye, name: 'Eye' },
        { Icon: EyeOff, name: 'EyeOff' },
      ],
    },
    {
      name: 'Semânticos',
      icons: [
        { Icon: Heart, name: 'Heart' },
        { Icon: Star, name: 'Star' },
        { Icon: Zap, name: 'Zap' },
        { Icon: Shield, name: 'Shield' },
        { Icon: Rocket, name: 'Rocket' },
        { Icon: Lightbulb, name: 'Lightbulb' },
        { Icon: Award, name: 'Award' },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gama-dark p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-display text-gama-primary font-black mb-2">🎯 Icons</h1>
        <p className="text-lg text-gama-text-secondary mb-12">Biblioteca Lucide React — ícones limpos, customizáveis e semanticamente corretos</p>

        {/* Reference */}
        <section className="mb-16 bg-gama-surface/50 rounded-2xl p-8 border border-gama-primary/20">
          <h2 className="text-2xl font-bold text-gama-text mb-4">📚 Biblioteca</h2>
          <p className="text-gama-text-secondary mb-4">
            Usamos <a href="https://lucide.dev" target="_blank" rel="noopener noreferrer" className="text-gama-primary hover:underline font-semibold">
              Lucide React
            </a> como nossa biblioteca oficial de ícones. Ícones bem desenhados, semânticos e totalmente customizáveis.
          </p>
          <ul className="space-y-2 text-sm text-gama-text-secondary">
            <li>✓ 1400+ ícones disponíveis</li>
            <li>✓ Customização de cor, tamanho e stroke width</li>
            <li>✓ TypeScript support</li>
            <li>✓ Zero dependencies</li>
          </ul>
        </section>

        {/* Icons by Category */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Ícones por Categoria</h2>
          <div className="space-y-12">
            {iconCategories.map((category) => (
              <div key={category.name}>
                <h3 className="text-lg font-bold text-gama-text mb-6 pb-3 border-b border-gama-surface-accent">{category.name}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  {category.icons.map(({ Icon, name }) => (
                    <div
                      key={name}
                      className="bg-gama-surface rounded-lg p-4 border border-gama-surface-accent hover:border-gama-primary hover:bg-gama-surface-accent transition-all text-center group cursor-pointer"
                      title={name}
                    >
                      <Icon size={24} className="text-gama-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <p className="text-xs text-gama-text-secondary font-mono truncate">{name}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Usage Guide */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">✅ Como Usar</h2>
          <div className="space-y-6">
            <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent">
              <h3 className="text-lg font-bold text-gama-text mb-4">Importação</h3>
              <div className="bg-gama-darker rounded-lg p-4 font-mono text-sm text-gama-primary overflow-x-auto">
                {`import { Plus, Edit, Trash2 } from "lucide-react"`}
              </div>
            </div>

            <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent">
              <h3 className="text-lg font-bold text-gama-text mb-4">Renderização</h3>
              <div className="bg-gama-darker rounded-lg p-4 font-mono text-sm text-gama-primary overflow-x-auto">
                {`<Plus size={24} className="text-gama-primary" />`}
              </div>
            </div>

            <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent">
              <h3 className="text-lg font-bold text-gama-text mb-4">Tamanhos Padrão</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[16, 20, 24, 32, 48].map((size) => (
                  <div key={size} className="flex flex-col items-center">
                    <Plus size={size} className="text-gama-primary mb-2" />
                    <code className="text-xs text-gama-text-secondary bg-gama-darker px-2 py-1 rounded">{size}px</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Icon Colors */}
        <section>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Padrões de Cor</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent">
              <div className="flex items-center gap-4 mb-4">
                <Plus size={32} className="text-gama-primary" />
                <div>
                  <p className="font-bold text-gama-text">Primário</p>
                  <p className="text-xs text-gama-text-secondary">#88CE11</p>
                </div>
              </div>
              <p className="text-sm text-gama-text-secondary">CTAs, destaques, ações importantes</p>
            </div>

            <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent">
              <div className="flex items-center gap-4 mb-4">
                <Info size={32} className="text-gama-text-secondary" />
                <div>
                  <p className="font-bold text-gama-text">Secundário</p>
                  <p className="text-xs text-gama-text-secondary">#A1A1AA</p>
                </div>
              </div>
              <p className="text-sm text-gama-text-secondary">Conteúdo, ícones passivos, suporte</p>
            </div>

            <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent">
              <div className="flex items-center gap-4 mb-4">
                <CheckCircle size={32} className="text-gama-success" />
                <div>
                  <p className="font-bold text-gama-text">Semântico</p>
                  <p className="text-xs text-gama-text-secondary">status colors</p>
                </div>
              </div>
              <p className="text-sm text-gama-text-secondary">Success, warning, error, info — use com contexto</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
