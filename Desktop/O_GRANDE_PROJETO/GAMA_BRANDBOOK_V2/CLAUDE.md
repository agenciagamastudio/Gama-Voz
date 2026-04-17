# 🎨 GAMA BRANDBOOK V2 — Claude Context

## Projeto

**Nome:** GAMA_BRANDBOOK_V2  
**Descrição:** Brandbook oficial do Grupo GAMA — Brand DNA, Visual System, Voice e Componentes  
**Categoria:** Brand Guidelines  
**Status:** ✅ V2 Active  

## Estrutura

```
GAMA_BRANDBOOK_V2/
├── gama-ds-platform/        # Next.js 14 plataforma interativa
│   ├── src/
│   │   ├── app/             # Páginas (foundations, components, brand, tokens)
│   │   ├── components/      # Componentes da plataforma
│   │   └── styles/          # Tailwind + global CSS
│   ├── public/              # Assets
│   ├── design-tokens/       # Tokens canônicos (JSON, CSS, Tailwind)
│   └── package.json         # Dependências
├── docs/                    # Documentação de projeto
└── README.md               # Overview
```

## Tecnologia

- **Runtime:** Node.js v18+
- **Framework:** Next.js 14 (React 18)
- **Styling:** Tailwind CSS 3
- **Language:** TypeScript
- **Package Manager:** npm

## O Que É

Plataforma interativa que funciona como **única fonte de verdade** para a marca GAMA:

- **Foundations** — Cores semânticas, tipografia, espaçamento, ícones
- **Components** — Biblioteca de componentes (Atoms → Organisms)
- **Brand** — Identidade, voice, aplicações em contextos reais
- **Tokens** — Design tokens em W3C JSON, CSS variables, Tailwind config

## Decisões Importantes

### Brandbook V2 é Oficial
- ✅ DS V1 (gama-brandbook/) mantida apenas para referência histórica
- ✅ Todos os novos projetos usam V2 como base
- ✅ V2 tem superior UX, conteúdo mais completo, tokens nativos

### Padrões de Naming
- "Brandbook" em vez de "Design System" (reflete uso real)
- Components = Atoms + Molecules + Organisms (Atomic Design)
- Routes não mudaram (`/foundations/`, `/components/`, `/brand/`, `/tokens/`)

### Execução
- Port padrão: 3010 (resolve conflitos de porta)
- `npm run dev` inicia dev server
- `npm run build` + `npm run start` para produção

## Comandos

```bash
cd gama-ds-platform
npm install              # Instalar dependências
npm run dev             # Dev server (port 3010)
npm run build           # Build otimizado
npm run lint            # Verificar código
npm run typecheck       # Type checking
```

## Links Internos

- **Migrations Docs:** `docs/` (MIGRATION-AUDIT.md, etc)
- **TypeScript Paths:** Configuradas em `tsconfig.json`
- **Tailwind Config:** `tailwind.config.js` com design tokens

## Dependências Críticas

| Lib | Uso |
|-----|-----|
| Next.js 16 | Framework React/SSR |
| Tailwind 3.4 | Styling + design tokens |
| TypeScript 5.3 | Type safety |
| Lucide React | Ícones |

## Próximos Passos

1. ✅ Renomeação de pasta (GAMA_DESIGN_SYSTEM_V2 → GAMA_BRANDBOOK_V2)
2. ✅ Update package.json e README
3. 🔄 Atualizar docs internas
4. 🔄 Git commit das mudanças
5. ⏭️ Deploy em produção quando pronto

## Notas

- Folder antigo (`GAMA_DESIGN_SYSTEM_V2`) será deletado após confirmação
- Pasta `gama-brandbook/` (V1) mantida para referência e comparação
- Todos os links internos foram atualizados
- Semântica "Brandbook" é a nova padrão

---

**Versão:** 2.0.0  
**Último Update:** 17 de Abril, 2026  
**Status:** 🚀 Pronto para Uso
