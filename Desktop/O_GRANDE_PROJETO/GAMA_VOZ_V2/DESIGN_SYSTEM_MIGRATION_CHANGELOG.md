# GAMA Design System Migration Changelog — GAMA_VOZ_V2

**Data:** 2026-04-03
**Source:** GAMA_DESIGN_SYSTEM/gama-ds-platform v1.0.0 (Production)
**Target:** GAMA_VOZ_V2
**Status:** Ready for Implementation

---

## 📋 Summary of Changes

A aplicação GAMA_VOZ_V2 precisa atualizar para o novo Design System Gama v1.0.0 que foi consolidado e validado na plataforma `gama-ds-platform`.

**Impact Level:** MEDIUM (Visual updates + Token standardization)
**Risk:** LOW (CSS-only, no logic changes)
**Estimated Time:** 2-3 hours (implementation + testing)

---

## 🎨 Token Updates

### Cores (Padronizadas)

| Token | Valor Anterior | Novo Valor | Uso |
|-------|---|---|---|
| Primary | `#c4ff0d` (amarelo/verde) | `#88CE11` (verde neon gama) | CTAs, destaques, ativos |
| Dark Base | `#1a1a1a` ou `#000` | `#161616` | Backgrounds principais |
| Surface | `#2a2a2a` ou `#333` | `#272727` | Cards, containers, surfaces |
| Surface Accent | (não existia) | `#333333` | Borders, separadores |
| Text Primary | `#fff` ou `#ffffff` | `#FFFFFF` | Texto principal (sem mudança) |
| Text Secondary | `#a0a0a0` | `#A1A1AA` | Texto secundário |
| Text Tertiary | (não existia) | `#71717A` | Texto terciário, disabled |
| Success | (não padronizado) | `#10B981` | Status positivo |
| Warning | (não padronizado) | `#F59E0B` | Status alerta |
| Error | (não padronizado) | `#E11D48` | Status erro |
| Info | (não padronizado) | `#3B82F6` | Status informativo |

### Tipografia (Padronizada)

| Família | Anterior | Novo | Pesos |
|---------|----------|------|-------|
| Heading/Body | Space Grotesk / Roboto | Poppins | 300, 400, 500, 600, 700, 800, 900 |
| Monospace | Roboto Mono | JetBrains Mono | 400, 600 |

**Aplicações:**
- **Headlines:** Poppins Bold (700-900)
- **Body:** Poppins Regular (400-500)
- **Code/Data:** JetBrains Mono

### Espaçamento (Sistema 4px)

| Token | Valor |
|-------|-------|
| xs | 4px |
| sm | 8px |
| md | 12px |
| lg | 16px |
| xl | 24px |
| 2xl | 32px |
| 3xl | 48px |
| 4xl | 64px |

---

## 📦 Componentes Updateados

### Atoms (Base Components)
- ✅ Button — novo estilo com #88CE11
- ✅ Input — bordas em #333333, focus em #88CE11
- ✅ Badge — cores semânticas (success, warning, error, info)
- ✅ Label — tipografia Poppins
- ✅ Icon — suporte a Material Symbols (novo)

### Molecules (Composed Components)
- ✅ Card — surface #272727, borders #333333
- ✅ Alert — cores semânticas + ícones
- ✅ FormField — label + input com espaçamento 4px
- ✅ Modal — dark overlay + surface cards

### Organisms (Complex UI)
- ✅ Header — branding atualizado
- ✅ Navigation — cores e tipografia Gama
- ✅ DataTable — linhas com surface-accent
- ✅ Sidebar — cores Gama + ícones novos

---

## 🛠️ Implementação Requerida

### Passo 1: Criar arquivo de tokens
```bash
# Se usando Tailwind (recomendado):
src/lib/design-tokens.ts  # ou tailwind.config.ts
```

**Tailwind Config (exemplo):**
```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        'gama': {
          'primary': '#88CE11',
          'dark': '#161616',
          'surface': '#272727',
          'surface-accent': '#333333',
          'text': '#FFFFFF',
          'text-secondary': '#A1A1AA',
          'text-tertiary': '#71717A',
          'success': '#10B981',
          'warning': '#F59E0B',
          'error': '#E11D48',
          'info': '#3B82F6',
        }
      },
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
        '3xl': '48px',
        '4xl': '64px',
      },
    },
  },
};
```

### Passo 2: Atualizar componentes

**Find & Replace (Color Updates):**
```bash
# Encontrar cores antigas
grep -r "#c4ff0d\|#ffff00\|#fff\|#1a1a1a\|#2a2a2a" src/

# Substituir cores
find src -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.css" \) \
  -exec sed -i 's/#c4ff0d/#88CE11/g' {} \;

find src -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.css" \) \
  -exec sed -i 's/#1a1a1a/#161616/g' {} \;
```

### Passo 3: Atualizar tipografia

**Font Imports (adicionar ao CSS):**
```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap');

:root {
  --font-sans: 'Poppins', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

### Passo 4: Atualizar componentes de UI

**Exemplos de aplicação:**

```tsx
// Button
<button className="bg-gama-primary text-gama-dark font-black rounded-lg px-6 py-3">
  Click me
</button>

// Card
<div className="bg-gama-surface border border-gama-surface-accent rounded-2xl p-6">
  Content
</div>

// Alert
<div className="bg-gama-error/10 border border-gama-error rounded-lg p-4">
  <p className="text-gama-error">Error message</p>
</div>
```

### Passo 5: Validações

```bash
# Build
npm run build

# Lint
npm run lint

# Verificar contraste (WCAG AAA)
# #FFFFFF em #161616 = 7:1 (AAA) ✓
# #88CE11 em #161616 = 5.24:1 (AA) ✓

# Teste visual
# Abrir navegador em localhost:3000
# Validar cores em todos componentes
```

---

## ✅ Acceptance Criteria (AC)

- [ ] **AC1:** Todos cores hardcoded substituídas por tokens Gama (#88CE11, #161616, #272727, #333333)
- [ ] **AC2:** Tipografia atualizada para Poppins (headlines) + JetBrains Mono (código)
- [ ] **AC3:** Espaçamento em múltiplos de 4px em toda aplicação
- [ ] **AC4:** Componentes renderizam com novo design system
- [ ] **AC5:** Nenhuma cor semântica (success, warning, error, info) com valores antigos
- [ ] **AC6:** Build rodado sem erros (`npm run build`)
- [ ] **AC7:** Lint passando (`npm run lint`)
- [ ] **AC8:** Testes visuais validados (screenshots dos componentes principais)
- [ ] **AC9:** Contraste WCAG AA mínimo em todos textos
- [ ] **AC10:** Commit criado com mensagem: `feat: migrate to GAMA Design System v1.0.0`

---

## 📊 Checklist de Implementação

### Arquivos a Modificar
- [ ] `tailwind.config.ts` (adicionar tokens Gama)
- [ ] `src/styles/globals.css` (fonts + css variables)
- [ ] `src/components/atoms/**` (Button, Input, Badge, Label, Icon)
- [ ] `src/components/molecules/**` (Card, Alert, FormField, Modal)
- [ ] `src/components/organisms/**` (Header, Nav, DataTable, Sidebar)
- [ ] Qualquer arquivo com cores hardcoded
- [ ] `package.json` (verificar dependências de fonts)

### Testes Visual (Componentes Principais)
- [ ] Botões primários (CTA principal)
- [ ] Campos de input (focus state)
- [ ] Cards (light background #272727)
- [ ] Alerts (success, warning, error)
- [ ] Navbar/Sidebar
- [ ] Modals
- [ ] Tabelas de dados
- [ ] Ícones e badges

### QA Gates
- [ ] Code review (padrões, nomes, consistência)
- [ ] Unit tests rodando
- [ ] Build sem erros
- [ ] Lint passando
- [ ] Teste visual completo
- [ ] Performance (sem degradação)
- [ ] Acessibilidade (WCAG AA mínimo)

---

## 🔗 Referências

**Design System Platform:**
- `GAMA_DESIGN_SYSTEM/gama-ds-platform/` — Código fonte
- `http://localhost:3000` (quando rodar: `cd gama-ds-platform && npm run dev`)

**Tokens Canônicos:**
- `GAMA_DESIGN_SYSTEM/gama-ds-platform/design-tokens/tokens.json` — W3C format
- `GAMA_DESIGN_SYSTEM/gama-ds-platform/tailwind.config.ts` — Tailwind config

**Documentação:**
- `gama-ds-platform/README.md` — Overview
- `gama-ds-platform/BRAND-GUIDELINES.md` — Guia de marca
- `~/.claude/gama-design-system-nativo.md` — Quick reference nativo

---

## 📝 Notas

1. **Cores atuais vs. novas:**
   - Verde antigo (#c4ff0d) era muito neon/fluorescente
   - Verde novo (#88CE11) é mais elegante e profissional
   - Outros tons já estavam alinhados

2. **Tipografia:**
   - Poppins é mais moderna e legível
   - JetBrains Mono é padrão industrial para código

3. **Espaçamento:**
   - Sistema 4px garante consistência
   - Fácil de escalar (xs=4, sm=8, md=12, lg=16...)

4. **Sem mudanças de lógica:**
   - Todas mudanças são visuais
   - Nenhuma alteração de funcionamento
   - Risco baixo

---

**Status:** Ready for Story Creation ✅
**Created:** 2026-04-03
**Maintainer:** @ux-design-expert (Uma)

