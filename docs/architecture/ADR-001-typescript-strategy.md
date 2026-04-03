# ADR-001: Estratégia de Adoção de TypeScript

**Status:** Accepted
**Data:** 2026-02-22
**Agente:** @architect (Aria)

## Contexto

O projeto foi iniciado em JSX/JavaScript puro. Com 23 componentes, 5 contextos e lógica de negócio financeira complexa, a ausência de tipagem aumenta o risco de bugs silenciosos (ex: `calculateScenarioLoss` recebe `0` em vez de número positivo e retorna objeto zerado sem erro).

## Decisão

**Adoção gradual de TypeScript — estratégia "New Files in TS":**

1. **Fase 1 (imediata):** Toda nova lógica de negócio criada em `.ts`
2. **Fase 2 (por sprint):** Converter `src/logic/*.js` e `src/utils/*.js` (alto impacto, baixo risco)
3. **Fase 3 (contínuo):** Converter contextos e componentes conforme forem tocados
4. **NÃO fazer:** Rewrite completo em um único sprint

## Alternativas Consideradas

| Opção | Razão da Rejeição |
|-------|------------------|
| Migração completa agora | Interrompe desenvolvimento por 2-3 semanas |
| Manter só JSX | Risco crescente com lógica financeira sem tipos |
| JSDoc types | Boa documentação, mas sem type-checking real |

## Configuração

Adicionar `tsconfig.json` com `allowJs: true` e `checkJs: true` para habilitar verificação gradual.

## Consequências

- ✅ Sem breaking changes no código existente
- ✅ Lógica financeira (calculosDeValor.js) ganha tipos antes das features
- ⚠️ Período transitório com `.js` e `.ts` coexistindo
- ⚠️ Requer configuração do Vite para suportar ambos (já suportado nativamente)
