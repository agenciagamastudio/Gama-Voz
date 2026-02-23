# ADR-004: Consolidação do Design System

**Status:** Accepted
**Data:** 2026-02-22
**Agente:** @architect (Aria)

## Contexto

Foi identificada uma **inconsistência crítica**: o projeto possui dois sistemas de tokens em conflito:

1. `src/styles/designTokens.js` — tokens com cores antigas (primary: #007bff, bootstrap-like)
2. `tailwind.config.js` — tema real da aplicação (ds-brand: #88CE11, dark theme, cyber: #00f2ff)

Os componentes em `src/components/ds/` (Button, Input) provavelmente usam classes Tailwind, não os tokens do arquivo JS. O `designTokens.js` parece ser um artefato não utilizado da versão anterior.

## Decisão

**Tailwind CSS como fonte única de verdade para design tokens.**

### Ações

1. **Deprecar** `src/styles/designTokens.js` — mover para `.deprecated/`
2. **Documentar** as cores do tema no `tailwind.config.js` com comentários claros
3. **Criar** `docs/architecture/design-tokens.md` com o inventário completo de tokens

### Paleta Oficial (tailwind.config.js)

```
Brand (verde neon):  #88CE11 (ds-brand-500)
Dark background:     #050505
Cyber accent:        #00f2ff
Volcano accent:      #ff3e3e
Font:                Space Grotesk (principal), Inter (secundária)
```

## Alternativas Consideradas

| Opção | Razão da Rejeição |
|-------|------------------|
| Manter ambos | Duplicação e inconsistência garantida |
| Migrar para CSS custom properties | Overhead sem benefício claro com Tailwind |
| Storybook completo agora | Válido mas prematuro para MVP |

## Consequências

- ✅ Uma única fonte de verdade para design
- ✅ Componentes ds/ (Button, Input) alinhados com tema real
- ⚠️ Verificar se `designTokens.js` é importado em algum componente antes de remover
- ⚠️ Documentar tokens para facilitar onboarding de designers
