# GAMA Brandbook V2

Brandbook oficial do Grupo GAMA. Design tokens, componentes, identidade visual e guidelines de marca interativas.

**Status:** V2 Active ✅

## O que é?

Plataforma Next.js 14 que serve como única fonte de verdade para o brandbook GAMA:

- **Foundations** — Cores, tipografia, espaçamento, ícones
- **Components** — Atoms, Molecules, Organisms (React + Tailwind)
- **Brand** — Identidade visual, tom de voz, aplicações
- **Tokens** — JSON, CSS, Tailwind prontos para integração

## Quick Start

```bash
npm install
npm run dev
# Abrir http://localhost:3000
```

## Estrutura

```
src/
├── app/
│   ├── foundations/      # Cores, typography, spacing, icons
│   ├── components/       # Atoms, molecules, organisms
│   ├── brand/           # Identity, voice, applications
│   ├── tokens/          # Design tokens em JSON/CSS/Tailwind
│   ├── layout.tsx       # Layout com SideNav
│   └── page.tsx         # Homepage
│
├── components/
│   └── platform/        # Componentes da plataforma (SideNav, etc)
│
└── styles/
    └── globals.css      # Tailwind + custom CSS

design-tokens/
├── tokens.json          # Fonte da verdade (W3C format)
├── tokens.css           # CSS variables
└── tokens.tailwind.js   # Tailwind config
```

## Tokens Canônicos

### Cores
- **Primary:** `#88CE11` (Verde Oliva Gama)
- **Dark Base:** `#161616`
- **Surface:** `#272727`
- **Text Primary:** `#FFFFFF`
- **Text Secondary:** `#A1A1AA`

### Tipografia
- **Primary:** Poppins (300-900 weights)
- **Code:** JetBrains Mono (400, 600)

### Espaçamento
- `xs: 4px`, `sm: 8px`, `md: 12px`, `lg: 16px`, `xl: 24px`, `2xl: 32px`, `3xl: 48px`

## Próximos Passos

### Fase 2: Foundations (Dias 2-3)
- [x] Colors página
- [x] Typography página
- [x] Spacing página
- [x] Icons página
- [ ] Expandir com mais exemplos visuais

### Fase 3: Component Library (Dias 4-8)
- [x] Atoms base (Button, Input, Badge)
- [x] Molecules (Card, Alert, FormField)
- [x] Organisms (Modal, Modal, PageHeader)
- [ ] Portar componentes de GAMA_CALCULADORA

### Fase 4: BrandBook (Dias 9-11)
- [x] Identity página
- [x] Voice página
- [x] Applications página
- [ ] Expandir com mockups

### Fase 5: Deploy + Migração (Dias 12-14)
- [ ] Deploy Vercel
- [ ] Migrar GAMA_CALCULADORA (cores, fonts)
- [ ] Migrar GAMA_FINANCEIRO
- [ ] Migrar outros projetos

## Design System Integration

Esta plataforma é gerenciada pelo @architect (Aria) com suporte de @ux-design-expert.

### Agentes AIOS (A Criar)
- `@design-system-chief` — Orquestradora geral
- `@design-tokens-engineer` — Tokens JSON/CSS/Tailwind
- `@component-dev-lead` — Componentes React
- `@brandbook-strategist` — Conteúdo de brand

## Development

### Scripts
```bash
npm run dev       # Start dev server (localhost:3000)
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run ESLint
npm run typecheck # TypeScript check
```

### Adding a New Page

1. Criar arquivo em `src/app/{section}/{name}/page.tsx`
2. Usar layout SideNav existente (automático)
3. Usar classes Tailwind com tokens Gama:
   ```tsx
   <button className="bg-gama-primary text-gama-dark font-black rounded-lg">
     Click me
   </button>
   ```

### Updating Design Tokens

1. Editar `design-tokens/tokens.json`
2. Executar script de geração (próxima fase)
3. Tokens.css e tailwind.config.ts atualizam automaticamente

## Color Reference

```
Primary:        #88CE11 (Gama Green)
Dark:           #161616 (Almost Black)
Surface:        #272727 (Charcoal)
Text:           #FFFFFF (White)
Text Secondary: #A1A1AA (Gray 400)
Success:        #10B981
Warning:        #F59E0B
Error:          #E11D48
Info:           #3B82F6
```

## References

- Design Tokens: `design-tokens/tokens.json`
- Tailwind Config: `tailwind.config.ts`
- Brand Book: `GAMA_BRANDBOOK/GAMA-BRANDBOOK-TECNICO.md`
- AIOS Rules: `~/.claude/CLAUDE.md`

---

**Mantido por:** @architect (Aria)
**Última atualização:** 2026-03-11
**Status:** Phase 1 Complete ✅
// updated at 16:06:35
