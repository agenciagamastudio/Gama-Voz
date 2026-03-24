# GAMA Design System V2 — Multi-Brand Architecture

**Status:** 🚀 In Development
**Version:** 2.0.0-alpha
**Data:** 2026-03-13

---

## O que é V2?

V2 é a **segunda geração** do design system. Agora suporta **múltiplas marcas** do ecossistema Gama:

- ✅ **Gama Studio** — Agência de marketing (verde neon)
- ✅ **Gama TV** — Publicidade em displays (azul broadcast)
- ✅ **Gama Rádio** — Publicidade sonora (vermelho)
- ✅ **Gama Calendários** — Gestão de agendamentos (roxo)
- 🔄 **[Adicione suas brands aqui]**

---

## Arquitetura

```
gama-ds-platform/
├── brand-configs/                    ← NOVO: Configurações por brand
│   ├── index.json                    ← Registry de todas as brands
│   ├── gama-studio/
│   │   ├── brand.json               ← Metadados (nome, logo, descrição)
│   │   └── tokens.json              ← Design tokens (cores, fonts, etc)
│   ├── gama-tv/
│   │   ├── brand.json
│   │   └── tokens.json
│   ├── gama-radio/
│   │   ├── brand.json
│   │   └── tokens.json
│   └── gama-calendario/
│       ├── brand.json
│       └── tokens.json
│
├── src/
│   ├── components/                   ← UNIVERSAL: Componentes reutilizáveis
│   │   ├── atoms/                   ← Button, Input, Badge (funcionam em todas as brands)
│   │   ├── molecules/               ← Card, Alert, Dropdown
│   │   └── organisms/               ← Modal, DataTable
│   ├── hooks/
│   │   ├── useBrand.ts              ← NEW: Carrega tokens da brand ativa
│   │   └── useBrandList.ts          ← NEW: Lista todas as brands
│   ├── app/
│   │   ├── page.tsx                 ← Home
│   │   ├── layout.tsx               ← Layout com brand switcher
│   │   └── [seções por categoria]
│   └── styles/
│       └── globals.css              ← CSS base + CSS vars para brands
│
├── public/
│   ├── logos/                        ← NEW: Logos de cada brand
│   │   ├── gama-studio.svg
│   │   ├── gama-tv.svg
│   │   ├── gama-radio.svg
│   │   └── gama-calendario.svg
│   └── ...
│
└── docs/
    ├── ARCHITECTURE.md               ← NEW: Documentação da arquitetura V2
    ├── ADDING-BRANDS.md              ← NEW: Como adicionar novas brands
    └── ...
```

---

## Como funciona

### 1. Você escolhe a brand

```
[Selecionar Brand] ▼
├─ Gama Studio ✅ (ativa agora)
├─ Gama TV
├─ Gama Rádio
└─ Gama Calendários
```

### 2. Sistema carrega os tokens

```typescript
// src/hooks/useBrand.ts
const { colors, typography, spacing } = useBrand('gama-studio')
// Retorna tokens do brand-configs/gama-studio/tokens.json
```

### 3. Componentes usam os tokens

```tsx
// src/components/atoms/Button.tsx
function Button({ children, variant = 'primary' }) {
  const { colors } = useBrand()

  return (
    <button style={{
      backgroundColor: colors.primary,  // #88CE11 (Studio) ou #0066FF (TV)
      color: colors.dark,
    }}>
      {children}
    </button>
  )
}
```

### 4. Tudo muda automaticamente

| Studio | TV | Rádio | Calendários |
|--------|----|----|-----|
| Verde | Azul | Vermelho | Roxo |
| #88CE11 | #0066FF | #DC2626 | #8B5CF6 |
| Logo G | Logo 📺 | Logo 🎙️ | Logo 📅 |

---

## Próximos passos

### Fase 2: Implementar hooks (TODO)
- [ ] `useBrand()` — Carrega tokens da brand ativa
- [ ] `useBrandList()` — Lista todas as brands
- [ ] `useBrandContext()` — Context provider

### Fase 3: Criar brand switcher (TODO)
- [ ] Dropdown no header
- [ ] Salvar preferência em localStorage
- [ ] Animar transição entre brands

### Fase 4: Atualizar CSS (TODO)
- [ ] Converter hardcoded colors → CSS vars
- [ ] Fazer override por brand em globals.css
- [ ] Testar dark mode em todas as brands

### Fase 5: Documentar (TODO)
- [ ] ARCHITECTURE.md — Desenho técnico
- [ ] ADDING-BRANDS.md — Guia de novos brands
- [ ] API docs — Como usar `useBrand()` etc

---

## Estrutura de um Brand

Cada brand tem **2 arquivos obrigatórios**:

### `brand.json`
Metadados da brand:
```json
{
  "id": "gama-studio",
  "name": "Gama Studio",
  "description": "Agência de marketing",
  "logo": "/logos/gama-studio.svg",
  "active": true,
  "order": 1
}
```

### `tokens.json`
Design tokens (cores, fonts, spacing):
```json
{
  "id": "gama-studio",
  "colors": {
    "primary": "#88CE11",
    "dark": "#161616",
    "...": "..."
  },
  "typography": { "..." },
  "spacing": { "..." },
  "...": "..."
}
```

---

## Como adicionar uma nova brand

### 1. Criar diretório
```bash
mkdir -p brand-configs/seu-novo-brand
```

### 2. Criar `brand.json`
```json
{
  "id": "seu-novo-brand",
  "name": "Seu Novo Brand",
  "description": "Descrição aqui",
  "logo": "/logos/seu-novo-brand.svg",
  "active": true,
  "order": 5
}
```

### 3. Criar `tokens.json`
Copie de `gama-studio/tokens.json` e customize as cores.

### 4. Adicionar ao `index.json`
```json
{
  "brands": [
    ...existing brands...,
    {
      "id": "seu-novo-brand",
      "name": "Seu Novo Brand",
      "order": 5,
      "active": true
    }
  ]
}
```

### 5. Adicionar logo
Coloque seu logo em `public/logos/seu-novo-brand.svg`

**Pronto!** Seu brand aparece automaticamente no seletor.

---

## Reutilização em outros projetos

### Seu app Gama TV
```typescript
// gama-tv-app/src/components/Hero.tsx
import { Button } from '@gama-ds/components'
import { useBrand } from '@gama-ds/hooks'

export function Hero() {
  const brand = useBrand('gama-tv')

  return (
    <Button>Assista agora</Button> // Usa cores da TV
  )
}
```

### Seu app Gama Rádio
```typescript
// gama-radio-app/src/components/Player.tsx
import { Button } from '@gama-ds/components'
import { useBrand } from '@gama-ds/hooks'

export function Player() {
  const brand = useBrand('gama-radio')

  return (
    <Button>Play</Button> // Usa cores da Rádio
  )
}
```

**Mesmo pacote, cores diferentes, zero duplicação.**

---

## Troubleshooting

### P: E se eu quiser override de componente por brand?
R: Crie `brand-configs/{id}/components/{Component}.tsx` e importe condicionalmente.

### P: Como versionar brands individualmente?
R: Cada `tokens.json` tem `"version"`. Atualize independentemente.

### P: Posso ter múltiplos designs systems?
R: Sim! Crie novos projetos e reutilize `@gama-ds/components`.

---

## Status V2

- ✅ **Estrutura criada** (brand-configs com 4 brands)
- ⏳ **Hooks** (em progresso - próximo passo)
- ⏳ **Brand switcher** (em progresso)
- ⏳ **CSS vars** (em progresso)
- ⏳ **Documentação** (em progresso)

---

**Próximo encontro:** Implementar hooks e brand switcher 🚀
