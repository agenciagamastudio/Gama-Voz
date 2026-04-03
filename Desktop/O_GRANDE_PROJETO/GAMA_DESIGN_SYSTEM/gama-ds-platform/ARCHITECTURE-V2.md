# GAMA Design System V2 — Architecture Document

**Version:** 2.0.0
**Status:** Production Ready
**Last Updated:** 2026-03-13

---

## Executive Summary

GAMA Design System V2 é um **sistema de design dinâmico multi-brand** que permite:
- ✅ Componentes universais reutilizáveis
- ✅ Múltiplas identidades visuais (Studio, TV, Rádio, Calendários)
- ✅ Mudança de tema em tempo real
- ✅ Zero duplicação de código
- ✅ Fácil adicionar novos brands

---

## 1. System Architecture

### 1.1 Layers

```
┌─────────────────────────────────────────────┐
│         USER INTERFACE LAYER                │
│  (Componentes React: Button, Card, Input)   │
└────────────────┬────────────────────────────┘
                 │ useBrand() hook
                 ↓
┌─────────────────────────────────────────────┐
│      BRAND CONTEXT LAYER                    │
│  (BrandProvider + useContext)               │
└────────────────┬────────────────────────────┘
                 │ CSS Variables
                 ↓
┌─────────────────────────────────────────────┐
│      CSS VARIABLES LAYER                    │
│  (--color-primary, --spacing-lg, etc)       │
└────────────────┬────────────────────────────┘
                 │ Tailwind Classes
                 ↓
┌─────────────────────────────────────────────┐
│       TAILWIND CSS LAYER                    │
│  (bg-gama-primary, text-gama-text, etc)     │
└────────────────┬────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────┐
│         BROWSER RENDERING                   │
└─────────────────────────────────────────────┘
```

### 1.2 Data Flow

```
User selects "Gama TV"
         │
         ↓
BrandSwitcher calls setActiveBrand('gama-tv')
         │
         ↓
BrandContext loads /api/brands/gama-tv/tokens
         │
         ↓
Receives JSON: { colors: { primary: '#0066FF', ... } }
         │
         ↓
applyBrandTokensToCSSVars() converts to CSS vars:
  --color-primary: #0066FF
  --color-dark: #0A1428
  --color-surface: #1a2332
         │
         ↓
Tailwind reads updated CSS vars
         │
         ↓
bg-gama-primary now resolves to var(--color-primary) = #0066FF
         │
         ↓
All components re-render with new colors ✨
```

---

## 2. Directory Structure

```
gama-ds-platform/
├── brand-configs/                    ← MULTI-BRAND CONFIG
│   ├── index.json                   ← Registry de brands
│   ├── gama-studio/
│   │   ├── brand.json               ← Metadados (nome, logo)
│   │   └── tokens.json              ← Design tokens (cores, fonts, spacing)
│   ├── gama-tv/
│   ├── gama-radio/
│   └── gama-calendario/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx               ← BrandProvider wraps app
│   │   ├── globals.css              ← Global styles + imports
│   │   └── api/
│   │       └── brands/              ← API routes
│   │           ├── route.ts         ← GET /api/brands
│   │           └── [id]/
│   │               ├── route.ts     ← GET /api/brands/[id]
│   │               └── tokens/
│   │                   └── route.ts ← GET /api/brands/[id]/tokens
│   │
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── Button.tsx           ← bg-gama-primary
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── ... (12 more)
│   │   ├── molecules/
│   │   │   ├── Card.tsx
│   │   │   ├── Alert.tsx
│   │   │   └── ... (8 more)
│   │   ├── organisms/
│   │   │   ├── Modal.tsx
│   │   │   └── DataTable.tsx
│   │   └── platform/
│   │       ├── SideNav.tsx          ← Desktop sidebar
│   │       ├── BrandSwitcher.tsx    ← Dropdown switcher
│   │       ├── DrawerNav.tsx        ← Mobile drawer
│   │       └── MainWrapper.tsx
│   │
│   ├── context/
│   │   └── BrandContext.tsx         ← Brand provider + hooks
│   │
│   ├── hooks/
│   │   └── useBrand.ts              ← 3 brand hooks
│   │
│   └── utils/
│       └── tokenToCSSVar.ts         ← Token→CSS var converter
│
├── design-tokens/
│   └── tokens.css                   ← CSS var definitions (Gama Studio base)
│
├── public/
│   └── logos/                       ← Brand logos
│       ├── gama-studio.svg
│       ├── gama-tv.svg
│       ├── gama-radio.svg
│       └── gama-calendario.svg
│
├── tailwind.config.ts               ← Maps gama-* to CSS vars
├── package.json
└── next.config.js
```

---

## 3. Key Components

### 3.1 BrandContext (`src/context/BrandContext.tsx`)

**Responsibility:** Gerenciar estado global de brand

**What it does:**
1. Carrega lista de brands em `/api/brands`
2. Monitora mudanças em `activeBrandId`
3. Quando muda: fetch de `/api/brands/{id}/tokens`
4. Aplica tokens como CSS vars no `<html>`
5. Persiste preferência em localStorage

**Exports:**
```typescript
<BrandProvider>          // Wrapper
useBrand()              // Acessa tokens da brand ativa
useBrandId()            // Acessa ID da brand ativa
useBrandSwitcher()      // Acessa ID + setActiveBrand + brands
```

### 3.2 BrandSwitcher (`src/components/platform/BrandSwitcher.tsx`)

**Responsibility:** UI para trocar de brand

**What it does:**
1. Lê `useBrandSwitcher()`
2. Renderiza dropdown com lista de brands
3. Chama `setActiveBrand(id)` ao selecionar
4. Mostra cor primária de cada brand

**Usage:**
```tsx
// Já adicionado no SideNav (footer)
<BrandSwitcher />
```

### 3.3 API Routes

#### `GET /api/brands`
Returns:
```json
{
  "brands": [
    { "id": "gama-studio", "name": "Gama Studio", "order": 1, ... },
    { "id": "gama-tv", "name": "Gama TV", "order": 2, ... },
    ...
  ]
}
```

#### `GET /api/brands/[id]`
Returns brand metadata:
```json
{
  "id": "gama-tv",
  "name": "Gama TV",
  "description": "Publicidade corporativa via TV",
  "logo": "/logos/gama-tv.svg",
  "metadata": { ... }
}
```

#### `GET /api/brands/[id]/tokens`
Returns design tokens:
```json
{
  "id": "gama-tv",
  "colors": {
    "primary": "#0066FF",
    "dark": "#0A1428",
    "surface": "#1a2332",
    ...
  },
  "typography": { ... },
  "spacing": { ... },
  ...
}
```

### 3.4 Utility: tokenToCSSVar (`src/utils/tokenToCSSVar.ts`)

**Responsibility:** Converter tokens JSON → CSS vars

**Key function:**
```typescript
applyBrandTokensToCSSVars(tokens: BrandTokens)
// Itera sobre colors, typography, spacing, etc
// Aplica como --color-primary, --font-primary, --spacing-lg, etc
```

---

## 4. Styling Strategy

### 4.1 CSS Variable Architecture

**Base Layer** (design-tokens/tokens.css):
```css
:root {
  /* Core Primitives */
  --color-core-brand-green: #88CE11;
  --color-core-black: #000000;

  /* Semantic Aliases (V1 base) */
  --color-primary: var(--color-core-brand-green);
  --color-dark: var(--color-core-dark);
  --color-surface: var(--color-core-surface);
}
```

**Dynamic Layer** (BrandContext at runtime):
```javascript
// When user selects "Gama TV", this runs:
root.style.setProperty('--color-primary', '#0066FF')
root.style.setProperty('--color-dark', '#0A1428')
root.style.setProperty('--color-surface', '#1a2332')
```

**Tailwind Layer** (tailwind.config.ts):
```typescript
colors: {
  'gama-primary': 'var(--color-primary)',
  'gama-dark': 'var(--color-dark)',
  'gama-surface': 'var(--color-surface)',
  ...
}
```

### 4.2 Component Styling

Components use Tailwind classes that reference CSS vars:

```tsx
// Button.tsx
const variantStyles = {
  primary: 'bg-gama-primary text-gama-dark',  // References --color-primary
  secondary: 'bg-gama-surface text-gama-text', // References --color-surface
}
```

When user changes brand:
1. `--color-primary` updates (e.g., #88CE11 → #0066FF)
2. Tailwind's `bg-gama-primary` now evaluates to new color
3. Button automatically re-renders with new color
4. **No component code changes needed!**

---

## 5. Data Model

### 5.1 Brand Config (`brand-configs/{id}/brand.json`)

```json
{
  "id": "gama-studio",
  "name": "Gama Studio",
  "description": "Agência de marketing e criação de marcas",
  "logo": "/logos/gama-studio.svg",
  "website": "https://gama-studio.com",
  "active": true,
  "order": 1,
  "metadata": {
    "department": "Marketing & Design",
    "year_founded": 2024,
    "color_scheme": "modern-neon"
  }
}
```

### 5.2 Brand Tokens (`brand-configs/{id}/tokens.json`)

```json
{
  "id": "gama-studio",
  "colors": {
    "primary": "#88CE11",
    "primary_light": "#A8E030",
    "primary_dark": "#6BA60D",
    "dark": "#161616",
    "surface": "#272727",
    "text": "#FFFFFF",
    "text_secondary": "#A1A1AA",
    "success": "#10B981",
    ...
  },
  "typography": {
    "font_primary": "Poppins",
    "font_code": "JetBrains Mono",
    "font_weights": { "light": 300, "regular": 400, ... },
    "sizes": { "xs": "12px", "sm": "14px", "base": "16px", ... }
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "12px",
    ...
  },
  "radius": { ... },
  "shadows": { ... },
  "animation": { ... }
}
```

### 5.3 Brand Registry (`brand-configs/index.json`)

```json
{
  "version": "2.0.0",
  "brands": [
    { "id": "gama-studio", "name": "Gama Studio", "order": 1, "active": true },
    { "id": "gama-tv", "name": "Gama TV", "order": 2, "active": true },
    ...
  ],
  "meta": {
    "default_brand": "gama-studio",
    "total_brands": 4
  }
}
```

---

## 6. Component Compatibility

All existing components work with V2 without modification:

| Component | Status | Notes |
|-----------|--------|-------|
| Button | ✅ Full | Uses `bg-gama-primary`, auto-updates |
| Card | ✅ Full | Uses `bg-gama-surface`, auto-updates |
| Input | ✅ Full | Uses `border-gama-border-default`, auto-updates |
| Badge | ✅ Full | Dynamic color support |
| Avatar | ✅ Full | No color dependency |
| Toggle | ✅ Full | Uses `bg-gama-primary` |
| Checkbox | ✅ Full | Uses `border-gama-primary` |
| Modal | ✅ Full | Uses `bg-gama-darker` |
| DataTable | ✅ Full | Uses `bg-gama-surface` |

---

## 7. Extending V2

### 7.1 Adding a New Brand

1. Create directory: `brand-configs/seu-brand/`
2. Create `brand.json` and `tokens.json`
3. Update `brand-configs/index.json`
4. Deploy

**That's it!** BrandSwitcher automatically shows new brand.

### 7.2 Modifying Tokens

1. Edit `brand-configs/{id}/tokens.json`
2. Restart server (or hot-reload detects changes)
3. Users selecting that brand get new tokens

### 7.3 Adding Dark Mode Support

V2 is dark-first. For light mode:

```css
/* design-tokens/tokens.css */
[data-theme="light"] {
  --color-primary: #88CE11;  /* Same or different */
  --color-dark: #FFFFFF;      /* Inverted */
  --color-surface: #F5F5F5;   /* Light surface */
}
```

Then in BrandContext, check `data-theme` when applying tokens.

---

## 8. Performance Considerations

### 8.1 CSS Variables Performance

✅ **Pros:**
- Instant color changes (no re-render needed)
- Small file size (tokens.json is ~2KB)
- No JavaScript overhead after initial load
- Supported in all modern browsers

### 8.2 Caching Strategy

- `brand-configs/index.json` — Cached at build time
- `/api/brands/[id]/tokens` — Cached by browser (Cache-Control headers)
- BrandContext — Saves to localStorage (zero server calls after first load)

### 8.3 Optimization Opportunities

Future optimizations (not needed yet):
- Compress tokens.json → tokens.webp (if very large)
- Pre-generate CSS for each brand → static files
- CDN caching of brand configs

---

## 9. Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| CSS Variables | ✅ 49+ | ✅ 31+ | ✅ 9.1+ | ✅ 15+ |
| Tailwind CSS | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| Fetch API | ✅ 40+ | ✅ 39+ | ✅ 10.1+ | ✅ 14+ |
| localStorage | ✅ Full | ✅ Full | ✅ 4+ | ✅ Full |

**Minimum requirement:** Modern browser with CSS Custom Properties support (2015+)

---

## 10. Troubleshooting

### Issue: Colors not changing when switching brands

**Diagnosis:**
1. Check BrandContext is imported in layout.tsx
2. Verify `applyBrandTokensToCSSVars()` is being called
3. Open DevTools → Elements → <html> → Computed Styles
4. Should see `--color-primary: #0066FF` (or current brand color)

**Fix:**
```tsx
// Make sure layout.tsx has:
import { BrandProvider } from '@/context/BrandContext'

export default function RootLayout() {
  return (
    <html>
      <body>
        <BrandProvider>
          {/* Your app */}
        </BrandProvider>
      </body>
    </html>
  )
}
```

### Issue: API routes returning 404

**Fix:**
1. Verify `brand-configs/` exists with correct structure
2. Verify `brand-configs/{id}/brand.json` and `tokens.json` exist
3. Check file permissions (readable by Node.js)
4. Restart dev server

---

## 11. Future Roadmap

**V2.1 — Theme Variants**
- [ ] Light mode support
- [ ] High contrast variant
- [ ] Custom color picker

**V2.2 — Component Library**
- [ ] Storybook integration
- [ ] Component prop documentation
- [ ] Interactive component explorer

**V2.3 — Multi-Workspace**
- [ ] Share components between brands
- [ ] Brand-specific component overrides
- [ ] Inheritance hierarchy

---

## Summary

GAMA Design System V2 achieves **multi-brand support** through:

1. **Separation of Concerns:** Components are universal, brands are config
2. **CSS Variables:** Dynamic theming without JavaScript overhead
3. **API-driven:** Brands loaded from `/api/brands`, not hardcoded
4. **Scalable:** Add infinite brands without code changes
5. **Performant:** CSS vars are instant, localStorage reduces API calls

---

**Architecture Status:** ✅ Production Ready
**Last Review:** 2026-03-13
**Approved by:** Emil (Apex Lead)
