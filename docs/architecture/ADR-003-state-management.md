# ADR-003: Estratégia de State Management

**Status:** Accepted
**Data:** 2026-02-22
**Agente:** @architect (Aria)

## Contexto

O projeto usa 5 React Contexts aninhados (Auth, Points, Proposal, Toast, ValueReport). Em React 19, o Context API foi otimizado mas ainda pode gerar re-renders desnecessários em contextos grandes com muitos consumidores.

## Decisão

**Manter React Context para MVP. Migrar para Zustand quando necessário.**

### Critério de Migração

Migrar para Zustand quando qualquer contexto atingir:
- Mais de 8 propriedades no value
- Mais de 10 componentes consumidores
- Profiling mostrar re-renders excessivos

### Estrutura Atual (OK para MVP)

```
ToastContext      → Global, leve ✅
AuthContext       → Global, médio (profile + user) ✅
PointsContext     → Feature-scoped ✅
ProposalContext   → Feature-scoped ✅
ValueReportContext → Feature-scoped ✅
```

### Problema Identificado

`AuthContext` acumula responsabilidades (auth + profile + permissions stub). Refatorar para separar:
- `AuthContext` → apenas sessão/token
- `ProfileContext` → dados de perfil do usuário

## Alternativas Consideradas

| Opção | Razão |
|-------|-------|
| Redux Toolkit | Over-engineering para o tamanho atual |
| Jotai/Recoil | Boa opção, mas Zustand tem maior adoção e mais simples |
| Zustand agora | Prematuro — MVP deve validar produto, não infra |

## Consequências

- ✅ Sem complexidade adicional no MVP
- ✅ Critério claro para migração futura
- ⚠️ AuthContext precisa de refatoração (separar profile)
- ⚠️ Monitorar performance com React DevTools Profiler
