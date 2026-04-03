'use client'

import { ColorSwatch } from '@/components/platform/ColorSwatch'
import { CheckCircle, XCircle } from 'lucide-react'

export default function ColorsPage() {
  const colors = [
    { name: 'Gama Green', hex: '#88CE11', rgb: 'rgb(136, 206, 17)', hsl: 'hsl(90, 84%, 46%)', usage: 'Primary CTA, Focus states, Highlights' },
    { name: 'Almost Black', hex: '#161616', rgb: 'rgb(22, 22, 22)', hsl: 'hsl(0, 0%, 8%)', usage: 'Main background' },
    { name: 'Pure Black', hex: '#0A0A0A', rgb: 'rgb(10, 10, 10)', hsl: 'hsl(0, 0%, 4%)', usage: 'Darker backgrounds' },
    { name: 'Charcoal', hex: '#272727', rgb: 'rgb(39, 39, 39)', hsl: 'hsl(0, 0%, 15%)', usage: 'Cards, elevated surfaces' },
    { name: 'Surface Accent', hex: '#333928', rgb: 'rgb(51, 57, 40)', hsl: 'hsl(75, 18%, 19%)', usage: 'Subtle surface variation' },
    { name: 'White', hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)', hsl: 'hsl(0, 0%, 100%)', usage: 'Primary text' },
    { name: 'Gray 400', hex: '#A1A1AA', rgb: 'rgb(161, 161, 170)', hsl: 'hsl(240, 5%, 65%)', usage: 'Secondary text' },
    { name: 'Gray 500', hex: '#71717A', rgb: 'rgb(113, 113, 122)', hsl: 'hsl(240, 4%, 47%)', usage: 'Tertiary text' },
    { name: 'Gray 600', hex: '#52525B', rgb: 'rgb(82, 82, 91)', hsl: 'hsl(240, 3%, 34%)', usage: 'Muted text' },
    { name: 'Success Green', hex: '#10B981', rgb: 'rgb(16, 185, 129)', hsl: 'hsl(160, 84%, 39%)', usage: 'Confirmations, positive' },
    { name: 'Warning Amber', hex: '#F59E0B', rgb: 'rgb(245, 158, 11)', hsl: 'hsl(38, 92%, 50%)', usage: 'Alerts, attention' },
    { name: 'Error Red', hex: '#E11D48', rgb: 'rgb(225, 29, 72)', hsl: 'hsl(343, 84%, 50%)', usage: 'Errors, destructive' },
    { name: 'Info Blue', hex: '#3B82F6', rgb: 'rgb(59, 130, 246)', hsl: 'hsl(217, 91%, 60%)', usage: 'Information, hints' },
  ]

  return (
    <div className="min-h-screen bg-gama-dark p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-display text-gama-primary font-black mb-2">🎨 Colors</h1>
        <p className="text-lg text-gama-text-secondary mb-12">Paleta completa de cores da Gama Design System com exemplos de uso</p>

        {/* Primary Color */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Cor Primária</h2>
          <div className="bg-gama-surface rounded-2xl p-8 border border-gama-surface-accent">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div
                className="w-full h-64 rounded-xl shadow-lg border-4 border-gama-primary transition-transform hover:scale-105"
                style={{ backgroundColor: '#88CE11' }}
              />
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-gama-primary mb-4">Verde Gama</h3>
                <div className="space-y-3 text-gama-text-secondary">
                  <p className="text-lg"><span className="font-bold text-gama-text">HEX:</span> <code className="bg-gama-darker px-2 py-1 rounded font-mono">#88CE11</code></p>
                  <p className="text-lg"><span className="font-bold text-gama-text">RGB:</span> <code className="bg-gama-darker px-2 py-1 rounded font-mono">136, 206, 17</code></p>
                  <p className="text-lg"><span className="font-bold text-gama-text">HSL:</span> <code className="bg-gama-darker px-2 py-1 rounded font-mono">90°, 84%, 46%</code></p>
                  <p className="mt-6 text-base"><span className="font-bold text-gama-text">Uso:</span> Botões primários (CTAs), links, estados de foco, highlights, elementos de destaque.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Background Colors */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Cores de Fundo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ColorSwatch
              name="Base Dark"
              hex="#161616"
              rgb="rgb(22, 22, 22)"
              hsl="hsl(0, 0%, 8%)"
              usage="Fundo principal de toda interface"
              size="md"
            />
            <ColorSwatch
              name="Darker"
              hex="#0A0A0A"
              rgb="rgb(10, 10, 10)"
              hsl="hsl(0, 0%, 4%)"
              usage="Fundos ainda mais escuros quando necessário"
              size="md"
            />
            <ColorSwatch
              name="Surface"
              hex="#272727"
              rgb="rgb(39, 39, 39)"
              hsl="hsl(0, 0%, 15%)"
              usage="Cards, panels, superfícies elevadas"
              size="md"
            />
            <ColorSwatch
              name="Surface Accent"
              hex="#333928"
              rgb="rgb(51, 57, 40)"
              hsl="hsl(75, 18%, 19%)"
              usage="Variações sutis em superfícies"
              size="md"
            />
          </div>
        </section>

        {/* Text Colors */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Cores de Texto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ColorSwatch
              name="Primary Text"
              hex="#FFFFFF"
              rgb="rgb(255, 255, 255)"
              hsl="hsl(0, 0%, 100%)"
              usage="Texto principal, destaque máximo"
              size="md"
            />
            <ColorSwatch
              name="Secondary Text"
              hex="#A1A1AA"
              rgb="rgb(161, 161, 170)"
              hsl="hsl(240, 5%, 65%)"
              usage="Subtítulos, metadados, conteúdo secundário"
              size="md"
            />
            <ColorSwatch
              name="Tertiary Text"
              hex="#71717A"
              rgb="rgb(113, 113, 122)"
              hsl="hsl(240, 4%, 47%)"
              usage="Texto muito secundário, dicas"
              size="md"
            />
            <ColorSwatch
              name="Muted Text"
              hex="#52525B"
              rgb="rgb(82, 82, 91)"
              hsl="hsl(240, 3%, 34%)"
              usage="Texto desativado, placeholders"
              size="md"
            />
          </div>
        </section>

        {/* Semantic Colors */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Cores Semânticas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ColorSwatch
              name="Success Green"
              hex="#10B981"
              rgb="rgb(16, 185, 129)"
              hsl="hsl(160, 84%, 39%)"
              usage="Confirmações, estados positivos, avisos de sucesso"
              size="md"
            />
            <ColorSwatch
              name="Warning Amber"
              hex="#F59E0B"
              rgb="rgb(245, 158, 11)"
              hsl="hsl(38, 92%, 50%)"
              usage="Alertas, atenção necessária, avisos"
              size="md"
            />
            <ColorSwatch
              name="Error Red"
              hex="#E11D48"
              rgb="rgb(225, 29, 72)"
              hsl="hsl(343, 84%, 50%)"
              usage="Erros, ações destrutivas, estados críticos"
              size="md"
            />
            <ColorSwatch
              name="Info Blue"
              hex="#3B82F6"
              rgb="rgb(59, 130, 246)"
              hsl="hsl(217, 91%, 60%)"
              usage="Informações, dicas, conteúdo informativo"
              size="md"
            />
          </div>
        </section>

        {/* Do & Don't */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">✅ Do & ❌ Don't</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-gama-success/10 border border-gama-success/30 rounded-xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle size={24} className="text-gama-success flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-gama-text mb-4">✅ Faça</h3>
                  <ul className="space-y-2 text-sm text-gama-text-secondary">
                    <li>• Use primary green em botões de CTA principais</li>
                    <li>• Use cores semânticas para estados (sucesso, erro, alerta)</li>
                    <li>• Mantenha bom contraste (WCAG AA mínimo)</li>
                    <li>• Use text primary em fundos dark para máxima legibilidade</li>
                    <li>• Combine colors com icons semânticos</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gama-error/10 border border-gama-error/30 rounded-xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <XCircle size={24} className="text-gama-error flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-gama-text mb-4">❌ Não Faça</h3>
                  <ul className="space-y-2 text-sm text-gama-text-secondary">
                    <li>• Não use primary green como cor de fundo de textos longos</li>
                    <li>• Não misture multiple semantic colors sem razão clara</li>
                    <li>• Não use muted text em fundos muito escuros (contraste baixo)</li>
                    <li>• Não crie novas cores — use a paleta existente</li>
                    <li>• Não ignore acessibilidade para efeitos visuais</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contrast Combinations */}
        <section>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Combinações com Bom Contraste</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { bg: '#161616', text: '#FFFFFF', label: 'Dark BG + White Text (AAA)', wcag: 'AAA' },
              { bg: '#272727', text: '#FFFFFF', label: 'Surface + White Text (AAA)', wcag: 'AAA' },
              { bg: '#88CE11', text: '#161616', label: 'Primary + Dark Text (AA)', wcag: 'AA' },
              { bg: '#10B981', text: '#FFFFFF', label: 'Success + White Text (AA)', wcag: 'AA' },
            ].map((combo) => (
              <div key={combo.label} className="rounded-xl overflow-hidden border border-gama-surface">
                <div
                  className="h-24 flex items-center justify-center text-lg font-bold transition-all hover:scale-105"
                  style={{ backgroundColor: combo.bg, color: combo.text }}
                >
                  Preview Text
                </div>
                <div className="bg-gama-surface p-4">
                  <p className="text-sm font-semibold text-gama-text mb-2">{combo.label}</p>
                  <p className="text-xs text-gama-text-secondary">WCAG {combo.wcag}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
