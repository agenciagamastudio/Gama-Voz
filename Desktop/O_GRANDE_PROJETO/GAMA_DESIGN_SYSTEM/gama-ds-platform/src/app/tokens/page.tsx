'use client'

import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

export default function TokensPage() {
  const [copiedFile, setCopiedFile] = useState<string | null>(null)

  const copyCode = (code: string, fileType: string) => {
    navigator.clipboard.writeText(code)
    setCopiedFile(fileType)
    setTimeout(() => setCopiedFile(null), 2000)
  }

  const cssTokens = `/* Cores */
--color-primary: #88CE11;
--color-dark: #161616;
--color-surface: #272727;
--color-text: #FFFFFF;
--color-text-secondary: #A1A1AA;
--color-success: #10B981;
--color-warning: #F59E0B;
--color-error: #E11D48;

/* Tipografia */
--font-primary: 'Poppins', sans-serif;
--font-code: 'JetBrains Mono', monospace;
--font-size-base: 16px;
--font-size-lg: 20px;
--font-size-2xl: 24px;

/* Espaçamento */
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 12px;
--spacing-lg: 16px;
--spacing-xl: 24px;

/* Borders */
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--border-default: 1px solid rgba(255,255,255,0.1);`

  const tailwindTokens = `// tailwind.config.ts
colors: {
  'gama-primary': '#88CE11',
  'gama-dark': '#161616',
  'gama-surface': '#272727',
  'gama-text': '#FFFFFF',
  'gama-text-secondary': '#A1A1AA',
  'gama-success': '#10B981',
  'gama-warning': '#F59E0B',
  'gama-error': '#E11D48',
},
fontFamily: {
  poppins: ['Poppins', 'sans-serif'],
  'jetbrains-mono': ['JetBrains Mono', 'monospace'],
}`

  return (
    <div className="min-h-screen bg-gama-dark">
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-gama-text mb-2">⚙️ Design Tokens</h1>
        <p className="text-gama-text-secondary mb-12">Dados estruturados: JSON, CSS, Tailwind. Pronto para integração.</p>

        {/* File Downloads */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          <div className="bg-gama-surface rounded-lg p-6 border border-gama-surface-accent hover:border-gama-primary transition-all">
            <h3 className="font-bold text-gama-text mb-2">tokens.json</h3>
            <p className="text-sm text-gama-text-secondary mb-4">Arquivo de tokens em formato W3C.</p>
            <button className="text-gama-primary text-sm font-bold hover:underline">
              📥 Download
            </button>
          </div>

          <div className="bg-gama-surface rounded-lg p-6 border border-gama-surface-accent hover:border-gama-primary transition-all">
            <h3 className="font-bold text-gama-text mb-2">tokens.css</h3>
            <p className="text-sm text-gama-text-secondary mb-4">CSS variables prontas para usar.</p>
            <button className="text-gama-primary text-sm font-bold hover:underline">
              📥 Download
            </button>
          </div>

          <div className="bg-gama-surface rounded-lg p-6 border border-gama-surface-accent hover:border-gama-primary transition-all">
            <h3 className="font-bold text-gama-text mb-2">tailwind.config.ts</h3>
            <p className="text-sm text-gama-text-secondary mb-4">Config Tailwind gerada.</p>
            <button className="text-gama-primary text-sm font-bold hover:underline">
              📥 Download
            </button>
          </div>
        </div>

        {/* CSS Tokens */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gama-text mb-6">CSS Variables</h2>
          <div className="relative bg-gama-darker rounded-lg p-6 border border-gama-surface-accent overflow-x-auto">
            <pre className="text-gama-text-secondary text-sm font-jetbrains-mono whitespace-pre-wrap">
              {cssTokens}
            </pre>
            <button
              onClick={() => copyCode(cssTokens, 'css')}
              className="absolute top-4 right-4 p-2 bg-gama-primary text-gama-dark rounded hover:brightness-110"
            >
              {copiedFile === 'css' ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        {/* Tailwind Tokens */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gama-text mb-6">Tailwind Configuration</h2>
          <div className="relative bg-gama-darker rounded-lg p-6 border border-gama-surface-accent overflow-x-auto">
            <pre className="text-gama-text-secondary text-sm font-jetbrains-mono whitespace-pre-wrap">
              {tailwindTokens}
            </pre>
            <button
              onClick={() => copyCode(tailwindTokens, 'tailwind')}
              className="absolute top-4 right-4 p-2 bg-gama-primary text-gama-dark rounded hover:brightness-110"
            >
              {copiedFile === 'tailwind' ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        {/* Integration Guide */}
        <div className="bg-gama-surface-accent rounded-lg p-8 border border-gama-primary/30">
          <h3 className="text-lg font-bold text-gama-primary mb-4">🚀 Como Usar</h3>
          <div className="space-y-4 text-gama-text-secondary">
            <p>
              <span className="font-bold text-gama-text">1. JSON:</span> Import e use em qualquer linguagem (JavaScript, Python, Java, etc.)
            </p>
            <p>
              <span className="font-bold text-gama-text">2. CSS:</span> Link global stylesheet e use <code className="bg-gama-darker px-2 py-1 rounded text-xs">var(--color-primary)</code>
            </p>
            <p>
              <span className="font-bold text-gama-text">3. Tailwind:</span> Merge com sua config e use <code className="bg-gama-darker px-2 py-1 rounded text-xs">className="bg-gama-primary"</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
