# 📋 SOP — 6 Fases do Brandbook Completo

**Status:** Ready to Execute  
**Tempo Total:** 10-12 dias (full-time) ou 3-4 semanas (part-time)  
**Complexidade:** Média (copia/adapta existente, não inventa)  

---

## 🚀 FASE 1: Logo System & Favicon (0.5 dia)

### Objetivo
Adicionar logo em múltiplas variações e favicon na aba do navegador.

### 📋 Checklist

- [ ] Criar 4 variações de logo
- [ ] Gerar favicon em 5 tamanhos
- [ ] Criar página `/brand/logo-system`
- [ ] Adicionar favicon ao `layout.tsx`
- [ ] Documentar clear space rules

### 🔧 Step-by-Step

#### Step 1.1: Preparar Arquivos de Logo

**Local:** `gama-ds-platform/public/logos/`

```bash
mkdir -p public/logos
# Arquivos a criar (ou exportar do Figma):
# - logo-primary.svg         (cor primária #88CE11)
# - logo-negative.svg        (branco puro #FFFFFF)
# - logo-monochrome.svg      (preto puro #000000)
# - logo-icon-only.svg       (só símbolo, sem texto)
# - logo-horizontal.svg      (logo deitada, com wordmark)
# - logo-vertical.svg        (logo em pé, wordmark abaixo)
```

**Dimensões recomendadas:**
```
- Horizontal: 300x80px
- Vertical: 100x120px
- Icon: 64x64px
```

#### Step 1.2: Gerar Favicon

**Ferramentas:** RealFaviconGenerator.net OU ffmpeg

**Tamanhos obrigatórios:**
```
favicon.ico         (16x16, 32x32)
apple-touch-icon.png (180x180)
icon-192.png        (192x192 — Android)
icon-512.png        (512x512 — Android splash)
```

**Local:** `gama-ds-platform/public/`

```bash
# Se usar ffmpeg (convert de 256x256 original):
ffmpeg -i logo-icon-only.svg -s 16x16 favicon-16.png
ffmpeg -i logo-icon-only.svg -s 32x32 favicon-32.png
ffmpeg -i logo-icon-only.svg -s 180x180 apple-touch-icon.png
ffmpeg -i logo-icon-only.svg -s 192x192 icon-192.png
ffmpeg -i logo-icon-only.svg -s 512x512 icon-512.png

# Combinar em .ico (16 + 32)
convert favicon-16.png favicon-32.png favicon.ico
```

#### Step 1.3: Atualizar `layout.tsx`

**Arquivo:** `gama-ds-platform/src/app/layout.tsx`

**Adicionar no `<head>`:**

```typescript
export const metadata: Metadata = {
  title: 'GAMA Brandbook',
  description: 'Brandbook oficial do Grupo Gama — Brand DNA, Voice, Visual System e Componentes',
  icons: {
    icon: [
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: '/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'GAMA Brandbook',
  },
  manifest: '/manifest.json',
}
```

#### Step 1.4: Criar `manifest.json`

**Local:** `gama-ds-platform/public/manifest.json`

```json
{
  "name": "GAMA Brandbook",
  "short_name": "Brandbook",
  "description": "Brandbook oficial do Grupo GAMA",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#161616",
  "theme_color": "#88CE11",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    }
  ]
}
```

#### Step 1.5: Criar Página de Logo System

**Arquivo novo:** `gama-ds-platform/src/app/brand/logo-system/page.tsx`

```typescript
'use client'

export default function LogoSystemPage() {
  return (
    <div className="min-h-screen bg-gama-dark p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-display text-gama-primary font-black mb-8">Logo System</h1>

        {/* Variação 1: Primary */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gama-text mb-6">1. Logo Primária</h2>
          <div className="bg-gama-surface p-8 rounded-lg">
            <p className="text-gama-text-secondary mb-4">Cor de fundo: Qualquer cor (preferível fundo claro)</p>
            <img src="/logos/logo-primary.svg" alt="Logo Primária" className="h-24 mb-4" />
            <div className="text-sm text-gama-text-secondary space-y-2">
              <p><strong>Uso:</strong> Aplicações, websites, marketing</p>
              <p><strong>Dimensão mínima:</strong> 120px de altura</p>
              <p><strong>Clear space:</strong> 30px em volta da logo</p>
            </div>
          </div>
        </section>

        {/* Variação 2: Negativa */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gama-text mb-6">2. Logo Negativa (Branca)</h2>
          <div className="bg-gama-darker p-8 rounded-lg">
            <p className="text-gama-text-secondary mb-4">Fundo escuro (#161616 ou mais escuro)</p>
            <img src="/logos/logo-negative.svg" alt="Logo Negativa" className="h-24 mb-4" />
            <div className="text-sm text-gama-text-secondary space-y-2">
              <p><strong>Uso:</strong> Hero sections, dark backgrounds, footer</p>
              <p><strong>Cor:</strong> Branco puro #FFFFFF</p>
              <p><strong>Contraste:</strong> WCAG AAA (7:1)</p>
            </div>
          </div>
        </section>

        {/* Variação 3: Monocromática */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gama-text mb-6">3. Logo Monocromática</h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-gama-surface p-8 rounded-lg">
              <p className="text-gama-text-secondary mb-4 text-sm">Preto em branco</p>
              <img src="/logos/logo-monochrome.svg" alt="Monocromática Preta" className="h-24 mb-4 bg-white p-4 rounded" />
            </div>
            <div className="bg-gama-darker p-8 rounded-lg">
              <p className="text-gama-text-secondary mb-4 text-sm">Branco em preto</p>
              <img src="/logos/logo-monochrome-white.svg" alt="Monocromática Branca" className="h-24 mb-4" />
            </div>
          </div>
          <div className="text-sm text-gama-text-secondary space-y-2 mt-4">
            <p><strong>Uso:</strong> Impressão em B&W, fax, documentos legais</p>
          </div>
        </section>

        {/* Variação 4: Icon Only */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gama-text mb-6">4. Ícone (Símbolo Apenas)</h2>
          <div className="bg-gama-surface p-8 rounded-lg">
            <img src="/logos/logo-icon-only.svg" alt="Logo Icon" className="h-32 w-32 mb-4" />
            <div className="text-sm text-gama-text-secondary space-y-2">
              <p><strong>Uso:</strong> Favicon, app icon, perfil social media</p>
              <p><strong>Dimensão:</strong> 64x64px (mínimo), 512x512px (máximo)</p>
              <p><strong>Formato:</strong> SVG, PNG (transparent background)</p>
            </div>
          </div>
        </section>

        {/* Clear Space */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gama-text mb-6">Clear Space Rules</h2>
          <div className="bg-gama-surface p-8 rounded-lg">
            <p className="text-gama-text-secondary mb-4">Mantenha espaço mínimo ao redor da logo:</p>
            <div className="bg-gama-darker p-8 rounded text-center mb-4">
              <p className="text-gama-text-secondary text-sm mb-4">[ 30px ] Logo [ 30px ]</p>
              <p className="text-gama-text-secondary text-xs">Nunca coloque logo muito perto de outras informações</p>
            </div>
            <ul className="text-gama-text-secondary text-sm space-y-2">
              <li>✓ Mínimo 30px de espaço em branco ao redor</li>
              <li>✓ Nunca comprima ou distorça a logo</li>
              <li>✓ Nunca mude as cores (use primária, negativa ou monocromática)</li>
              <li>✓ Nunca rotacione ou incline a logo</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
```

#### Step 1.6: Atualizar Navigation

**Arquivo:** `gama-ds-platform/src/components/platform/SideNav.tsx` (se houver)

Adicionar link novo:
```typescript
{
  label: 'Logo System',
  href: '/brand/logo-system',
  icon: 'image',
},
```

#### Step 1.7: Teste

```bash
npm run dev
# Acesse http://localhost:3008
# Verificar:
# - [ ] Aba do navegador tem favicon
# - [ ] Página /brand/logo-system carrega
# - [ ] Logo variações mostram corretamente
```

---

## 🎨 FASE 2: Manifesto & Posicionamento (2 dias)

### Objetivo
Documentar Missão, Visão, Valores, Posicionamento e Diferencial.

### 📋 Checklist

- [ ] Escrever Manifesto (missão, visão, valores, promessa)
- [ ] Descrever Posicionamento
- [ ] Documentar Diferencial Competitivo
- [ ] Criar página `/brand/manifest`
- [ ] Criar página `/brand/positioning`

### 🔧 Step-by-Step

#### Step 2.1: Pesquisar & Definir Manifesto

**Perguntas a responder:**

```
MISSÃO (1 frase):
"O que GAMA faz? Para quem? Como?"
→ "Transformar [X] para [público] através de [como]"

VISÃO (1 frase, 2027-2028):
"Onde GAMA quer estar?"
→ "Ser a [posição] em [mercado] porque [diferencial]"

VALORES (3-5):
"No que GAMA acredita?"
1. [Valor 1] — [Explicação]
2. [Valor 2] — [Explicação]
3. [Valor 3] — [Explicação]

PROMESSA AO CLIENTE:
"O que GAMA garante?"
→ "Entregamos [O QUÊ], no prazo, com [QUALIDADE]"
```

**Exemplo (GAMA Voz):**
```
MISSÃO: "Democratizar audio profissional através de IA"
VISÃO: "Ser a plataforma #1 de audio IA em português até 2027"
VALORES:
1. Acessibilidade — Tecnologia pro povo, não pra elite
2. Qualidade — Audio impecável sempre
3. Velocidade — De ideia pra audio em minutos
PROMESSA: "Áudio profissional em segundos, com IA que entende português"
```

#### Step 2.2: Criar Arquivo Manifesto

**Arquivo novo:** `gama-ds-platform/src/app/brand/manifest/page.tsx`

```typescript
'use client'

export default function ManifestoPage() {
  return (
    <div className="min-h-screen bg-gama-dark p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-display text-gama-primary font-black mb-2">Manifesto GAMA</h1>
        <p className="text-lg text-gama-text-secondary mb-12">Nossa razão de existir</p>

        {/* Missão */}
        <section className="mb-16">
          <h2 className="text-3xl font-black text-gama-text mb-4">Missão</h2>
          <div className="bg-gama-surface border-l-4 border-gama-primary p-8 rounded-lg">
            <p className="text-2xl text-gama-primary font-bold">
              [COLOQUE AQUI SUA MISSÃO]
            </p>
            <p className="text-gama-text-secondary mt-4">
              [Explicação do porquê e impacto]
            </p>
          </div>
        </section>

        {/* Visão */}
        <section className="mb-16">
          <h2 className="text-3xl font-black text-gama-text mb-4">Visão (2027-2028)</h2>
          <div className="bg-gama-surface border-l-4 border-gama-primary p-8 rounded-lg">
            <p className="text-2xl text-gama-primary font-bold">
              [COLOQUE AQUI SUA VISÃO]
            </p>
            <p className="text-gama-text-secondary mt-4">
              [Onde quer chegar e por quê]
            </p>
          </div>
        </section>

        {/* Valores */}
        <section className="mb-16">
          <h2 className="text-3xl font-black text-gama-text mb-8">Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Valor 1 */}
            <div className="bg-gama-surface p-6 rounded-lg">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-xl font-bold text-gama-text mb-2">[Valor 1]</h3>
              <p className="text-gama-text-secondary text-sm">[Descrição breve]</p>
            </div>

            {/* Valor 2 */}
            <div className="bg-gama-surface p-6 rounded-lg">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-xl font-bold text-gama-text mb-2">[Valor 2]</h3>
              <p className="text-gama-text-secondary text-sm">[Descrição breve]</p>
            </div>

            {/* Valor 3 */}
            <div className="bg-gama-surface p-6 rounded-lg">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="text-xl font-bold text-gama-text mb-2">[Valor 3]</h3>
              <p className="text-gama-text-secondary text-sm">[Descrição breve]</p>
            </div>
          </div>
        </section>

        {/* Promessa */}
        <section className="mb-16">
          <h2 className="text-3xl font-black text-gama-text mb-4">Promessa ao Cliente</h2>
          <div className="bg-gradient-to-r from-gama-primary/10 to-gama-primary/5 border border-gama-primary/30 p-8 rounded-lg">
            <p className="text-xl text-gama-text font-bold">
              "[COLOQUE AQUI SUA PROMESSA]"
            </p>
            <p className="text-gama-text-secondary mt-4 text-sm">
              O que você garante ao usar nossa marca/produto
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
```

#### Step 2.3: Criar Arquivo Posicionamento

**Arquivo novo:** `gama-ds-platform/src/app/brand/positioning/page.tsx`

```typescript
'use client'

export default function PositioningPage() {
  return (
    <div className="min-h-screen bg-gama-dark p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-display text-gama-primary font-black mb-2">Posicionamento</h1>
        <p className="text-lg text-gama-text-secondary mb-12">Como nos diferenciamos no mercado</p>

        {/* Posicionamento em 1 frase */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gama-text mb-4">Posicionamento (1 Frase)</h2>
          <div className="bg-gama-primary text-gama-dark p-8 rounded-lg">
            <p className="text-xl font-bold">
              Somos a [categoria] que [diferencial] para [público].
            </p>
            <p className="mt-4 text-sm opacity-80">
              Preencha os 3 gaps acima com sua marca
            </p>
          </div>
        </section>

        {/* Diferencial Competitivo */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gama-text mb-8">Diferencial Competitivo (3-5 pontos)</h2>
          <div className="space-y-4">
            <div className="bg-gama-surface p-6 rounded-lg border-l-4 border-gama-primary">
              <h3 className="font-bold text-gama-text mb-2">1. [Diferencial 1]</h3>
              <p className="text-gama-text-secondary text-sm">[Por que você é melhor nisto?]</p>
            </div>
            <div className="bg-gama-surface p-6 rounded-lg border-l-4 border-gama-primary">
              <h3 className="font-bold text-gama-text mb-2">2. [Diferencial 2]</h3>
              <p className="text-gama-text-secondary text-sm">[Por que você é melhor nisto?]</p>
            </div>
            <div className="bg-gama-surface p-6 rounded-lg border-l-4 border-gama-primary">
              <h3 className="font-bold text-gama-text mb-2">3. [Diferencial 3]</h3>
              <p className="text-gama-text-secondary text-sm">[Por que você é melhor nisto?]</p>
            </div>
          </div>
        </section>

        {/* Público-Alvo */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gama-text mb-4">Público-Alvo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gama-surface p-6 rounded-lg">
              <h3 className="font-bold text-gama-text mb-3">Primário</h3>
              <p className="text-gama-text-secondary text-sm">
                [Descrição: idade, profissão, problema que têm, por que compram]
              </p>
            </div>
            <div className="bg-gama-surface p-6 rounded-lg">
              <h3 className="font-bold text-gama-text mb-3">Secundário</h3>
              <p className="text-gama-text-secondary text-sm">
                [Segundo público mais importante]
              </p>
            </div>
          </div>
        </section>

        {/* Proposta de Valor */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gama-text mb-4">Proposta de Valor Única</h2>
          <div className="bg-gama-surface p-8 rounded-lg">
            <p className="text-gama-text-secondary mb-6">
              Fórmula: [BENEFÍCIO] + [DIFERENCIAL] = [RESULTADO]
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 bg-gama-darker p-4 rounded">
                  <p className="text-xs text-gama-text-secondary mb-2">BENEFÍCIO</p>
                  <p className="text-gama-text font-bold">[O que user consegue?]</p>
                </div>
                <div className="flex-1 bg-gama-darker p-4 rounded">
                  <p className="text-xs text-gama-text-secondary mb-2">DIFERENCIAL</p>
                  <p className="text-gama-text font-bold">[Como você é diferente?]</p>
                </div>
                <div className="flex-1 bg-gama-darker p-4 rounded">
                  <p className="text-xs text-gama-text-secondary mb-2">RESULTADO</p>
                  <p className="text-gama-primary font-bold">[Que eles ganham?]</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
```

#### Step 2.4: Atualizar Sidebar Navigation

Adicionar links novos:
```typescript
{
  label: 'Manifesto',
  href: '/brand/manifest',
  icon: 'target',
},
{
  label: 'Posicionamento',
  href: '/brand/positioning',
  icon: 'compass',
},
```

---

## 💬 FASE 3: Tone of Voice Expandido (1.5 dias)

### Objetivo
Documentar como GAMA fala (headlines, CTAs, microcopy, error messages).

### 📋 Checklist

- [ ] Documentar Headlines (H1, H2, H3)
- [ ] Documentar CTAs efetivas
- [ ] Documentar Microcopy (labels, placeholders, help)
- [ ] Documentar Error Messages
- [ ] Expandir `/brand/voice`

### 🔧 Quick Start

**Arquivo:** `gama-ds-platform/src/app/brand/voice/page.tsx` (expandir existente)

**Adicionar seções:**

```typescript
/* Headlines */
<section>
  <h2>Headlines</h2>
  <div>
    <h3>H1 (Hero) — Grande, impactante, ação</h3>
    <p>✅ "Construindo Marcas de Impacto"</p>
    <p>❌ "Bem-vindo ao nosso site"</p>
  </div>
</section>

/* CTAs */
<section>
  <h2>Call-to-Actions</h2>
  <p>Fórmula: [VERBO] + [BENEFÍCIO]</p>
  <p>✅ "Comece sua prova grátis"</p>
  <p>✅ "Veja resultado em 5 minutos"</p>
  <p>❌ "Clique aqui"</p>
  <p>❌ "Saiba mais"</p>
</section>

/* Microcopy */
<section>
  <h2>Microcopy (Pequenas Palavras)</h2>
  <table>
    <tr>
      <td>Input label</td>
      <td>"Seu email (usaremos apenas pra updates)"</td>
    </tr>
    <tr>
      <td>Placeholder</td>
      <td>"seu@email.com"</td>
    </tr>
    <tr>
      <td>Help text</td>
      <td>"Mínimo 8 caracteres, com números"</td>
    </tr>
  </table>
</section>

/* Error Messages */
<section>
  <h2>Error Messages</h2>
  <p>❌ "Erro 400"</p>
  <p>✅ "Email inválido. Tenta novamente?"</p>
</section>
```

---

## 🎯 FASE 4: Acessibilidade WCAG (1.5 dias)

### Objetivo
Documentar e validar contraste, alt-text, navegação por teclado.

### 📋 Checklist

- [ ] Documentar contraste mínimo (WCAG AA)
- [ ] Documentar alt-text padrão
- [ ] Documentar focus states
- [ ] Criar página `/foundations/accessibility`
- [ ] Criar checklist interativo

### 🔧 Quick Start

**Arquivo novo:** `gama-ds-platform/src/app/foundations/accessibility/page.tsx`

**Conteúdo:**
```typescript
<section>
  <h2>Contraste (WCAG AA)</h2>
  <p>Texto em botão primário: #FFFFFF em #88CE11 = 4.5:1 ✅</p>
</section>

<section>
  <h2>Alt-Text Padrão</h2>
  <p>✅ "Pessoa digitando em laptop"</p>
  <p>❌ "Imagem bonita"</p>
</section>

<section>
  <h2>Navegação por Teclado</h2>
  <p>- Tab: navega entre elementos</p>
  <p>- Enter: ativa botão/link</p>
  <p>- Escape: fecha modal</p>
</section>

<section>
  <h2>Checklist A11Y</h2>
  <input type="checkbox" /> Testado com NVDA
  <input type="checkbox" /> Navegação por teclado OK
  <input type="checkbox" /> Contraste validado
</section>
```

---

## 🧩 FASE 5: Componentes & Layouts (1.5 dias)

### Objetivo
Documentar estados de botão e layout patterns.

### 📋 Checklist

- [ ] Documentar estados de botão (normal, hover, active, disabled)
- [ ] Criar página `/components/button-states`
- [ ] Documentar Layout Patterns
- [ ] Criar página `/components/layouts`

### 🔧 Quick Start

**Arquivo novo:** `gama-ds-platform/src/app/components/button-states/page.tsx`

```typescript
<section>
  <h2>Botão Primário</h2>
  
  <div>
    <p>Normal</p>
    <button className="bg-gama-primary text-gama-dark">Clique aqui</button>
  </div>
  
  <div>
    <p>Hover</p>
    <button className="bg-gama-primary hover:brightness-110">Clique aqui</button>
  </div>
  
  <div>
    <p>Active</p>
    <button className="bg-gama-primary scale-95">Clique aqui</button>
  </div>
  
  <div>
    <p>Disabled</p>
    <button disabled className="bg-gama-primary opacity-50">Clique aqui</button>
  </div>
</section>
```

---

## 🎨 FASE 6: Visual Language (1.5 dias)

### Objetivo
Documentar estilos de ilustração, fotografia e padrões.

### 📋 Checklist

- [ ] Descrever estilo de ilustração
- [ ] Descrever estilo de fotografia
- [ ] Documentar padrões gráficos
- [ ] Criar página `/brand/visual-language`
- [ ] Criar página `/brand/downloads`

### 🔧 Quick Start

**Arquivo novo:** `gama-ds-platform/src/app/brand/visual-language/page.tsx`

```typescript
<section>
  <h2>Ilustrações</h2>
  <p>Estilo: Flat, com cores primárias GAMA</p>
  <p>Paleta: #88CE11, #FFFFFF, #161616</p>
  <p>Fonte: Custom/Figma</p>
</section>

<section>
  <h2>Fotografia</h2>
  <p>Estilo: Lifestyle, pessoas em contexto real</p>
  <p>Pessoas: Diversas, inclusivas</p>
  <p>Objetos: Tecnologia, inovação</p>
</section>

<section>
  <h2>Padrões Gráficos</h2>
  <p>Triângulos apontando pra cima = crescimento</p>
  <p>Círculos = comunidade</p>
  <p>Linhas diagonais = energia</p>
</section>
```

**Arquivo novo:** `gama-ds-platform/src/app/brand/downloads/page.tsx`

```typescript
<section>
  <h2>Downloads</h2>
  
  <div>
    <h3>Logo Files</h3>
    <a href="/logos/logo-primary.svg">Logo SVG Primária</a>
    <a href="/logos/logo-negative.svg">Logo SVG Negativa</a>
    <a href="/logos/logo-monochrome.svg">Logo SVG Monocromática</a>
  </div>
  
  <div>
    <h3>Favicon Pack</h3>
    <a href="/favicon.ico">favicon.ico</a>
    <a href="/apple-touch-icon.png">Apple Touch Icon</a>
    <a href="/icon-192.png">Android Icon 192x192</a>
    <a href="/icon-512.png">Android Icon 512x512</a>
  </div>
  
  <div>
    <h3>Documentação</h3>
    <a href="/brand-guidelines.pdf">Brand Guidelines PDF</a>
  </div>
</section>
```

---

## 🎬 EXECUÇÃO: Como Rodar Tudo

### Opção A: Sequencial (Semana a Semana)

```
Semana 1: Fase 1 + Fase 2 (Logo + Manifesto)
Semana 2: Fase 3 + Fase 4 (Voice + A11Y)
Semana 3: Fase 5 + Fase 6 (Componentes + Visual Language)
```

### Opção B: Paralelo (Equipe)

```
Dev 1: Fases 1, 3, 5 (Logo, Voice, Componentes)
Dev 2: Fases 2, 4, 6 (Manifesto, A11Y, Visual)
Tempo: 3-4 dias
```

### Opção C: YOLO (Tudo de Uma Vez)

```
Fazer tudo seguindo esse SOP
Tempo: 5-7 dias (intense)
```

---

## ✅ Testing Cada Fase

### Após Fase 1:
```bash
npm run dev
# Verificar: http://localhost:3008/brand/logo-system
# - [ ] Favicon na aba
# - [ ] Imagens de logo carregam
```

### Após Fase 2:
```bash
# Verificar: http://localhost:3008/brand/manifest
#           http://localhost:3008/brand/positioning
# - [ ] Conteúdo preenchido
# - [ ] Design bonito
```

### Após Fase 3:
```bash
# Verificar: http://localhost:3008/brand/voice (expandido)
# - [ ] Exemplos de headlines, CTAs, microcopy
```

### Após Fase 4:
```bash
# Verificar: http://localhost:3008/foundations/accessibility
# - [ ] Checklist interativo
# - [ ] Contraste documentado
```

### Após Fase 5:
```bash
# Verificar: http://localhost:3008/components/button-states
#           http://localhost:3008/components/layouts
# - [ ] Estados de botão visíveis
# - [ ] Layout patterns documentados
```

### Após Fase 6:
```bash
# Verificar: http://localhost:3008/brand/visual-language
#           http://localhost:3008/brand/downloads
# - [ ] Download links funcionam
# - [ ] Visual language clara
```

---

## 🚀 Depois de Tudo

Após as 6 fases:

1. **Validação Visual:** Testar em navegador, mobile, dark mode
2. **Git Commit:** `feat: complete 6-phase brandbook implementation`
3. **Deploy:** Colocar em produção
4. **Documentação:** Gerar PDF com `brand-guidelines.pdf`
5. **Compartilhar:** Enviar link para time usar como referência

---

## 🔗 Referências Rápidas

**Cada fase tem:**
- ✅ Pré-requisitos (o que fazer antes)
- ✅ Arquivos a criar/modificar
- ✅ Código template (copia/adapta)
- ✅ Como testar

**Não pule nada.** Cada fase prepara a próxima.

---

**Status:** 📋 SOP PRONTO  
**Próximo:** Escolher opção A, B ou C e começar  
**Tempo:** 0.5 + 2 + 1.5 + 1.5 + 1.5 + 1.5 = **10 dias** (full-time)
