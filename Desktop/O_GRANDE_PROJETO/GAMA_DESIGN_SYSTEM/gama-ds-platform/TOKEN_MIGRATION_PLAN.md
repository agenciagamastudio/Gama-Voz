# Plano de Migração de Tokens - Gama Design System v1.0

**Data**: Março 2026
**Status**: Pronto para Execução
**Escopo**: 9 projetos existentes → Design System unificado

---

## Resumo Executivo

O Gama Design System v1.0 está pronto para deployment. Os tokens foram padronizados e agora precisam ser migrados nos 9 projetos existentes do Grupo Gama.

**Migração automática**: 95% dos tokens são cor/espaçamento/tipografia (simples)
**Tempo estimado**: 1-2 dias por projeto
**Risco**: Baixo (mudanças visual-only, sem lógica)

---

## Tokens Padronizados

### Cores (Imutáveis em todos projetos)

```css
/* Primary */
--gama-primary: #88CE11  /* Verde Neon - CTAs, destaques */

/* Backgrounds */
--gama-dark: #161616         /* Base escura */
--gama-darker: #0A0A0A       /* Mais escuro (raramente usado) */
--gama-surface: #272727      /* Cards, surfaces */
--gama-surface-accent: #333333 /* Borders, separadores */

/* Text */
--gama-text: #FFFFFF           /* Texto principal */
--gama-text-secondary: #A1A1AA /* Texto secundário */
--gama-text-tertiary: #71717A  /* Texto terciário */

/* Semânticas (Não mudam) */
--gama-success: #10B981  /* Verde sucesso */
--gama-warning: #F59E0B  /* Âmbar aviso */
--gama-error: #E11D48    /* Vermelho erro */
--gama-info: #3B82F6     /* Azul info */
```

### Tipografia (Não mudam)

```
Primary Font: Poppins
- Weights: 300, 400, 500, 600, 700, 800, 900
- Use: Headlines (700+), Body (400-500)

Code Font: JetBrains Mono
- Weights: 400, 600
- Use: Código, snippets, dados estruturados
```

### Espaçamento (Sistema 4px base)

```
xs:   4px
sm:   8px
md:   12px
lg:   16px
xl:   24px
2xl:  32px
3xl:  48px
4xl:  64px
```

---

## Projetos para Migração

| # | Projeto | Status | Prioridade | Notas |
|---|---------|--------|-----------|-------|
| 1 | GAMA_CALCULADORA | Ativo | Alta | Verde #c4ff0d → #88CE11 |
| 2 | GAMA_FINANCEIRO | Ativo | Alta | UI completa, token compliant |
| 3 | GAMA_MONITOR | Ativo | Média | Sistema novo, tokens aplicáveis |
| 4 | GAMA_TUNEL_V2 | Ativo | Alta | Cores inconsistentes |
| 5 | GAMA_NORT | Rascunho | Média | Padrão aplicável |
| 6 | GAMA_ONBOARDING | Ativo | Média | UI simples |
| 7 | GAMA_CRONOGRAMAS | Ativo | Alta | Cronogramas visuais |
| 8 | GAMA_CLONES | Ativo | Baixa | Secundário |
| 9 | GAMA_JARVIS | Planejamento | Baixa | Futuro |

---

## Plano de Migração (Por Projeto)

### Padrão de Execução (Cada Projeto)

#### Fase 1: Auditoria (30 min)
```bash
# 1. Checar cores atuais
grep -r "#c4ff0d\|#88ce11\|#primary" src/

# 2. Identificar tokens hardcoded
grep -r "color:\|background:\|bg-" src/ | grep -v "node_modules"

# 3. Verificar framework (Tailwind? CSS? styled-components?)
cat package.json | grep "tailwind\|styled"
```

#### Fase 2: Criar Arquivo de Tokens (15 min)
```
src/styles/tokens.css  (ou tailwind.config.ts se usar TW)
```

Exemplo para **Tailwind**:
```typescript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        'gama-primary': '#88CE11',
        'gama-dark': '#161616',
        'gama-surface': '#272727',
        'gama-text': '#FFFFFF',
        'gama-text-secondary': '#A1A1AA',
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
      },
    },
  },
}
```

Exemplo para **CSS puro**:
```css
/* src/styles/tokens.css */
:root {
  --gama-primary: #88CE11;
  --gama-dark: #161616;
  --gama-surface: #272727;
  --gama-text: #FFFFFF;
  --gama-text-secondary: #A1A1AA;

  --spacing-xs: 4px;
  --spacing-sm: 8px;
  /* ... */
}
```

#### Fase 3: Substituição (1-2h por projeto)

**Opção A: Find & Replace (Rápido)**
```bash
# 1. Cores antigas → novas
find src -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" -o -name "*.css" \) \
  -exec sed -i 's/#c4ff0d/#88CE11/g' {} \;

find src -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \) \
  -exec sed -i 's/color:.*primary/color: var(--gama-primary)/g' {} \;

# 2. Tipografia: Space Grotesk → Poppins
find src -type f -name "*.css" \
  -exec sed -i "s/'Space Grotesk'/'Poppins'/g" {} \;
```

**Opção B: Manual (Seguro)**
- Abrir arquivo por arquivo
- Buscar cores hardcoded (ex: #fff, #000, #primary)
- Substituir por variáveis de token
- Testar visualmente

#### Fase 4: Validação (30 min)
```bash
# 1. Build
npm run build

# 2. Lint
npm run lint

# 3. Verificar contraste WCAG
# #FFFFFF em #161616 = 7:1 (AAA) ✓

# 4. Teste visual
# Abrir navegador e validar cores em todos os componentes
```

#### Fase 5: Commit
```bash
git add .
git commit -m "feat: migrate to Gama Design System tokens [DS-TOKEN-MIGRATION]"
git push origin main
```

---

## Projetos: Detalhes Específicos

### 1. GAMA_CALCULADORA
**Framework**: React/Next.js
**Status**: Verde #c4ff0d → #88CE11 (mudança simples)
**Tokens**: Já usa Tailwind parcialmente
**Ação**:
- Replace #c4ff0d → #88CE11
- Adicionar tailwind.config.ts com tokens Gama
- Testar calculadora completa

**Tempo**: 1h

---

### 2. GAMA_FINANCEIRO (Prioridade máxima)
**Framework**: Next.js 14 + Tailwind
**Status**: Já está bem alinhado com tokens Gama
**Tokens**: Dashboard financeiro completo
**Ação**:
- Auditar cores existentes (provavelmente já #88CE11)
- Padronizar spacing
- Validar tabelas de dados (DataTable, gráficos)

**Tempo**: 2h

---

### 3. GAMA_MONITOR
**Framework**: React
**Status**: Novo, tokens aplicáveis
**Tokens**: Monitoramento visual
**Ação**:
- Aplicar tokens desde o início
- Usar paleta Gama completa
- Gráficos com cores semânticas

**Tempo**: 1.5h

---

### 4. GAMA_TUNEL_V2
**Framework**: Unknown (verificar package.json)
**Status**: Cores inconsistentes
**Tokens**: Requer padronização
**Ação**:
- Auditar cores atuais
- Substituir por tokens Gama
- Testar tunnel completo

**Tempo**: 1.5h

---

### 5. GAMA_NORT
**Framework**: TBD
**Status**: Rascunho
**Ação**: Aplicar tokens na v1

**Tempo**: 1h

---

### 6. GAMA_ONBOARDING
**Framework**: React
**Status**: UI simples
**Ação**:
- Aplicar tema dark Gama
- Tipografia Poppins
- Cores semânticas para feedback

**Tempo**: 1h

---

### 7. GAMA_CRONOGRAMAS
**Framework**: React
**Status**: Cronogramas visuais
**Ação**:
- Cores para cronogramas (timeline)
- Eventos em cores semânticas
- Tipografia para datas/labels

**Tempo**: 1.5h

---

### 8. GAMA_CLONES
**Framework**: TBD
**Status**: Secundário
**Ação**: Auditar e aplicar tokens básicos

**Tempo**: 1h

---

### 9. GAMA_JARVIS
**Framework**: TBD
**Status**: Planejamento
**Ação**: Aplicar tokens desde o início (futuro)

**Tempo**: 1h (quando iniciar)

---

## Cronograma de Execução

### Semana 1 (Prioridade Alta)
- Seg-Ter: GAMA_CALCULADORA + GAMA_FINANCEIRO
- Qua-Qui: GAMA_TUNEL_V2 + GAMA_MONITOR
- Sex: Validação + documentação

### Semana 2 (Prioridade Média)
- Seg-Ter: GAMA_NORT + GAMA_ONBOARDING
- Qua-Qui: GAMA_CRONOGRAMAS + GAMA_CLONES
- Sex: Testes finais + relatório

### Semana 3 (Prioridade Baixa)
- GAMA_JARVIS (quando projeto iniciar)

---

## Checklist de Validação (Por Projeto)

- [ ] Cores primárias corretas (#88CE11, #161616, #272727)
- [ ] Textos legíveis em todos backgrounds (WCAG AAA)
- [ ] Tipografia: Headlines em Poppins Bold, Body em Poppins Regular
- [ ] Espaçamento consistente (múltiplos de 4px)
- [ ] Build sem erros
- [ ] Lint passando
- [ ] Teste visual completo (todos os componentes)
- [ ] Commit + Push

---

## Referências

**Design System**: `gama-ds-platform/` (Vercel)
**Cores**: https://gama-design-system.vercel.app/foundations/colors
**Tipografia**: https://gama-design-system.vercel.app/foundations/typography
**Tokens**: https://gama-design-system.vercel.app/tokens

---

## Contato & Suporte

**Design System**: Consulte `gama-ds-platform/` para documentação completa
**Questions**: Abrir issue em `GAMA_DESIGN_SYSTEM/gama-ds-platform`

---

**Status**: Pronto para Migração ✅
**Data de Criação**: 11/03/2026
**Versão**: 1.0
