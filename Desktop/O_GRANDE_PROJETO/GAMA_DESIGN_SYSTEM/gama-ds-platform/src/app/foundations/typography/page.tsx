'use client'

export default function TypographyPage() {
  const scales = [
    { name: 'Display', size: '48px', weight: 900, lineHeight: '1.2', letterSpacing: '-0.5px', usage: 'Hero headlines, page titles' },
    { name: '3XL', size: '36px', weight: 800, lineHeight: '1.25', letterSpacing: '-0.25px', usage: 'Section headlines' },
    { name: '2XL', size: '24px', weight: 700, lineHeight: '1.33', letterSpacing: '0px', usage: 'Card titles, subheadings' },
    { name: 'XL', size: '20px', weight: 600, lineHeight: '1.4', letterSpacing: '0px', usage: 'Subheadings, labels' },
    { name: 'LG', size: '18px', weight: 600, lineHeight: '1.5', letterSpacing: '0px', usage: 'Large body text' },
    { name: 'Base', size: '16px', weight: 500, lineHeight: '1.5', letterSpacing: '0px', usage: 'Body text, default' },
    { name: 'SM', size: '14px', weight: 500, lineHeight: '1.43', letterSpacing: '0.25px', usage: 'Small text, secondary' },
    { name: 'XS', size: '12px', weight: 400, lineHeight: '1.33', letterSpacing: '0.5px', usage: 'Captions, labels, micro' },
  ]

  return (
    <div className="min-h-screen bg-gama-dark p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-display text-gama-primary font-black mb-2">✍️ Typography</h1>
        <p className="text-lg text-gama-text-secondary mb-12">Sistema tipográfico Poppins + JetBrains Mono com escalas predefinidas</p>

        {/* Font Families */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Famílias de Fonte</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* Poppins */}
            <div className="bg-gama-surface rounded-2xl p-8 border border-gama-surface-accent">
              <h3 className="text-sm font-bold text-gama-primary mb-4 uppercase tracking-widest">Fonte Primária</h3>
              <div style={{ fontFamily: 'Poppins, sans-serif' }} className="text-5xl font-black text-gama-text mb-6">
                Poppins
              </div>
              <p className="text-gama-text-secondary mb-6">
                Fonte principal para headlines, body text e toda a UI. Limpa, moderna e com excelente legibilidade.
              </p>
              <div className="space-y-3 text-sm bg-gama-darker rounded-lg p-4">
                <p className="text-gama-text-secondary">
                  <span className="font-bold text-gama-text">Pesos:</span> <code className="font-mono text-xs">300, 400, 500, 600, 700, 800, 900</code>
                </p>
                <p className="text-gama-text-secondary">
                  <span className="font-bold text-gama-text">Padrão:</span> Weight 500 (Medium) para body text
                </p>
                <p className="text-gama-text-secondary">
                  <span className="font-bold text-gama-text">Headlines:</span> Weight 700-900 (Bold/Black)
                </p>
              </div>
            </div>

            {/* JetBrains Mono */}
            <div className="bg-gama-surface rounded-2xl p-8 border border-gama-surface-accent">
              <h3 className="text-sm font-bold text-gama-primary mb-4 uppercase tracking-widest">Fonte de Código</h3>
              <div style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-2xl sm:text-3xl md:text-4xl font-black text-gama-text mb-6">
                JetBrains Mono
              </div>
              <p className="text-gama-text-secondary mb-6">
                Monospace para código, dados técnicos e valores. Proporções uniformes e excelente para leitura de dados.
              </p>
              <div className="space-y-3 text-sm bg-gama-darker rounded-lg p-4">
                <p className="text-gama-text-secondary">
                  <span className="font-bold text-gama-text">Pesos:</span> <code className="font-mono text-xs">400, 600</code>
                </p>
                <p className="text-gama-text-secondary">
                  <span className="font-bold text-gama-text">Uso:</span> code tags, tokens de dados, exemplos de código
                </p>
                <p className="text-gama-text-secondary">
                  <span className="font-bold text-gama-text">Tamanho:</span> Mínimo 12px para legibilidade
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Type Scale */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Escala Tipográfica</h2>
          <div className="space-y-6">
            {scales.map((scale) => (
              <div key={scale.name} className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent hover:border-gama-primary/50 transition-all">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-start">
                  {/* Preview */}
                  <div className="md:col-span-2">
                    <div
                      style={{
                        fontSize: scale.size,
                        fontWeight: scale.weight,
                        lineHeight: scale.lineHeight,
                        letterSpacing: scale.letterSpacing,
                      }}
                      className="text-gama-text font-poppins leading-relaxed"
                    >
                      O design faz a diferença
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="space-y-2 bg-gama-darker rounded-lg p-4">
                    <h3 className="text-base font-bold text-gama-primary">{scale.name}</h3>
                    <div className="space-y-1 text-xs text-gama-text-secondary">
                      <p><span className="text-gama-text">Size:</span> {scale.size}</p>
                      <p><span className="text-gama-text">Weight:</span> {scale.weight}</p>
                      <p><span className="text-gama-text">Line Height:</span> {scale.lineHeight}</p>
                      <p><span className="text-gama-text">Letter Spacing:</span> {scale.letterSpacing}</p>
                      <p className="mt-2"><span className="text-gama-primary">Uso:</span> {scale.usage}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Font Weights */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Pesos da Fonte (Poppins)</h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {[
              { weight: 300, name: 'Light' },
              { weight: 400, name: 'Regular' },
              { weight: 500, name: 'Medium' },
              { weight: 600, name: 'SemiBold' },
              { weight: 700, name: 'Bold' },
              { weight: 800, name: 'ExtraBold' },
              { weight: 900, name: 'Black' },
            ].map((w) => (
              <div key={w.weight} className="bg-gama-surface rounded-lg p-4 border border-gama-surface-accent">
                <p style={{ fontWeight: w.weight }} className="text-xl text-gama-text mb-2 font-poppins">
                  Typography
                </p>
                <p className="text-xs text-gama-text-secondary">
                  <code>{w.weight}</code> - {w.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Use Patterns */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Padrões de Uso</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gama-surface rounded-xl p-6 border border-gama-surface-accent">
              <h3 className="text-lg font-bold text-gama-text mb-4">Página (H1)</h3>
              <p style={{ fontSize: '48px', fontWeight: 900, lineHeight: 1.2, marginBottom: '1rem' }} className="text-gama-primary">
                Título da Página
              </p>
              <code className="text-xs bg-gama-darker px-2 py-1 rounded text-gama-text-secondary">
                Display / Weight 900 / -0.5px letter-spacing
              </code>
            </div>

            <div className="bg-gama-surface rounded-xl p-6 border border-gama-surface-accent">
              <h3 className="text-lg font-bold text-gama-text mb-4">Seção (H2)</h3>
              <p style={{ fontSize: '36px', fontWeight: 800, lineHeight: 1.25, marginBottom: '1rem' }} className="text-gama-text">
                Título da Seção
              </p>
              <code className="text-xs bg-gama-darker px-2 py-1 rounded text-gama-text-secondary">
                3XL / Weight 800 / -0.25px letter-spacing
              </code>
            </div>

            <div className="bg-gama-surface rounded-xl p-6 border border-gama-surface-accent">
              <h3 className="text-lg font-bold text-gama-text mb-4">Card (H3)</h3>
              <p style={{ fontSize: '24px', fontWeight: 700, lineHeight: 1.33, marginBottom: '1rem' }} className="text-gama-text">
                Título do Card
              </p>
              <code className="text-xs bg-gama-darker px-2 py-1 rounded text-gama-text-secondary">
                2XL / Weight 700 / padrão letter-spacing
              </code>
            </div>

            <div className="bg-gama-surface rounded-xl p-6 border border-gama-surface-accent">
              <h3 className="text-lg font-bold text-gama-text mb-4">Body Text</h3>
              <p style={{ fontSize: '16px', fontWeight: 500, lineHeight: 1.5, marginBottom: '1rem' }} className="text-gama-text-secondary">
                Este é um parágrafo típico de corpo de texto. Use weight 500 com line-height 1.5 para máxima legibilidade.
              </p>
              <code className="text-xs bg-gama-darker px-2 py-1 rounded text-gama-text-secondary">
                Base / Weight 500 / Line Height 1.5
              </code>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">✅ Best Practices</h2>
          <div className="bg-gama-surface/50 rounded-2xl p-8 border border-gama-primary/20">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <li className="flex gap-3">
                <span className="text-gama-primary text-lg">•</span>
                <div>
                  <p className="font-bold text-gama-text mb-1">Headlines</p>
                  <p className="text-sm text-gama-text-secondary">Use weights 700-900. Mantenha letter-spacing negativo (-0.25px a -0.5px) para melhor visual.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-gama-primary text-lg">•</span>
                <div>
                  <p className="font-bold text-gama-text mb-1">Body Text</p>
                  <p className="text-sm text-gama-text-secondary">Use weight 400-500 com line-height minimo 1.5. Máximo de 75 caracteres por linha.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-gama-primary text-lg">•</span>
                <div>
                  <p className="font-bold text-gama-text mb-1">Código/Dados</p>
                  <p className="text-sm text-gama-text-secondary">Use JetBrains Mono, weight 400 ou 600. Mínimo 12px para legibilidade.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-gama-primary text-lg">•</span>
                <div>
                  <p className="font-bold text-gama-text mb-1">Contraste</p>
                  <p className="text-sm text-gama-text-secondary">Texto branco em fundos escuros. Use gray-400 para secundário, gray-500 para terciário.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-gama-primary text-lg">•</span>
                <div>
                  <p className="font-bold text-gama-text mb-1">Hierarquia</p>
                  <p className="text-sm text-gama-text-secondary">Sempre mantenha clara a hierarquia visual com tamanho, peso e cor.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-gama-primary text-lg">•</span>
                <div>
                  <p className="font-bold text-gama-text mb-1">Acessibilidade</p>
                  <p className="text-sm text-gama-text-secondary">Nunca confie apenas em cor/peso. Combine com tamanho para diferenciar.</p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
