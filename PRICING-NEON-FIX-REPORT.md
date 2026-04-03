# Relatório de Correção: Neon Dinâmico - Página /pricing

**Data:** 2026-02-28
**Status:** ✅ RESOLVIDO
**Prioridade:** 🔴 ALTA
**Task ID:** #1

---

## Problema Identificado

A página `/pricing` (https://gama-calculadora-app.vercel.app/pricing) apresentava efeito neon com **cor fixa em verde**, não acompanhando a cor dinâmica selecionada pelo usuário.

### Sintoma
- Neon sempre verde (RGB: 196, 255, 13) independente da cor selecionada
- Comportamento diferente de outras páginas que funcionam corretamente (ex: `/diagnostico-de-valor`)

### Impacto
- Visual inconsistente na página de pricing
- Reduz conversão ao não refletir preferência de branding do usuário
- Inconsistência com o resto da aplicação

---

## Causa Raiz

**Arquivo:** `src/components/PricingPlans.jsx` (linha 57)

**Código problemático:**
```html
<span className="text-primary drop-shadow-[0_0_15px_rgba(196,255,13,0.4)]">
  Consultoria
</span>
```

**Problema:** O valor RGB `(196,255,13)` estava **hardcoded** em vez de usar a variável CSS dinâmica.

---

## Solução Implementada

### Padrão Correto (Aplicado a Outras Páginas)

O sistema usa `AccentColorContext` para gerenciar cores dinâmicas:

1. **AccentColorContext.jsx** define:
   - `--primary-color` (valor HEX, ex: #C4FF0D)
   - `--primary-color-rgb` (valor RGB calculado, ex: 196, 255, 13)

2. **Uso Correto em CSS:**
   ```html
   shadow-[0_0_30px_rgba(var(--primary-color-rgb),0.15)]
   ```

### Correção Aplicada

**Arquivo:** `src/components/PricingPlans.jsx` (linha 57)

**Antes:**
```html
<span className="text-primary drop-shadow-[0_0_15px_rgba(196,255,13,0.4)]">
```

**Depois:**
```html
<span className="text-primary drop-shadow-[0_0_15px_rgba(var(--primary-color-rgb),0.4)]">
```

---

## Validação

### ✅ Testes Automatizados (2/2 Passando)
```
Test Files: 1 passed
Tests: 2 passed
├─ neon effect should use var(--primary-color-rgb) not hardcoded rgba ✓
└─ pricing component renders without errors ✓
```

### ✅ Build
```
✓ built in 28.96s
```

### ✅ Padrão de Código
- Alinhado com `UserProfile.jsx` (linha 112)
- Alinhado com `Layout.jsx` (linha 182)
- Segue convenção do projeto

---

## Arquivos Modificados

1. **src/components/PricingPlans.jsx**
   - 1 linha alterada (linha 57)
   - Mudança: Variável CSS dinâmica em vez de valor hardcoded

2. **src/__tests__/components/PricingPlans.test.jsx** (novo)
   - Testes para validar neon dinâmico
   - Garante que não volte ao estado anterior

---

## Resultado Final

✅ **Neon agora acompanha a cor dinâmica do usuário em tempo real**
- Mudanças de cor refletem instantaneamente no efeito neon
- Comportamento consistente com outras páginas
- Melhora na experiência visual e conversão

---

## Referências

- **AccentColorContext:** `src/context/AccentColorContext.jsx`
- **UserProfile (Padrão):** `src/components/UserProfile.jsx:112`
- **Layout (Padrão):** `src/Layout.jsx:182`
- **Commit:** f7b5985 (fix: corrigir neon dinâmico na página /pricing)

---

## Próximos Passos

1. ✅ Código corrigido e testado
2. ✅ Build sem erros
3. ⏳ Deploy em produção (via @devops)
4. ⏳ Validação em https://gama-calculadora-app.vercel.app/pricing

---

**Investigação realizada por:** Orion (aios-master)
**Status:** Pronto para merge
