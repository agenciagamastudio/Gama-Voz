# 🧬 ATOMS — Componentes Base Isolados

**Nível:** Layer 1 (Base)
**Status:** Pronto para build
**Isolamento:** 100% — cada atom é completamente independente

---

## O Que É Um Atom?

**Atom** = Componente base reutilizável que **NUNCA depende de outro atom**

Exemplos:
- ✅ Button (não precisa de Label)
- ✅ Input (não precisa de Button)
- ✅ Label (não precisa de Input)
- ✅ Icon (completamente standalone)
- ✅ Badge (sem dependências)

Exemplos do que **NÃO** é atom:
- ❌ FormField (precisa de Label + Input)
- ❌ Card (precisa de estrutura mais complexa)
- ❌ Header (precisa de vários atoms)

---

## Estrutura Garantida de Isolamento

```
atoms/
├── Button/
│   ├── Button.tsx              ← Componente (usa só tokens semânticos)
│   ├── Button.stories.tsx      ← Exemplos para Storybook
│   ├── Button.test.tsx         ← Testes
│   └── index.ts                ← Export
│
├── Input/
│   ├── Input.tsx
│   ├── Input.stories.tsx
│   ├── Input.test.tsx
│   └── index.ts
│
├── Label/
│   ├── Label.tsx
│   ├── Label.stories.tsx
│   ├── Label.test.tsx
│   └── index.ts
│
└── Icon/
    ├── Icon.tsx
    ├── Icon.stories.tsx
    ├── Icon.test.tsx
    └── index.ts
```

---

## ⚠️ Regra de Ouro — ISOLAMENTO TOTAL

### ✅ CORRETO — Atom usa apenas tokens:

```typescript
// Button.tsx
import tokens from '../../../design-tokens/tokens.exported.json'

export function Button({ variant = 'primary' }) {
  const style = tokens.components.button[variant]

  return (
    <button style={{
      backgroundColor: style.background,
      color: style.text,
      padding: style.padding,
      borderRadius: tokens.borders.radius.md,
      fontWeight: tokens.typography.weights.bold,
      transition: tokens.transitions.standard
    }}>
      {/* children */}
    </button>
  )
}
```

**Garantia:** Se Button muda, nada mais é afetado. Se Input muda, Button continua igual.

---

### ❌ ERRADO — Atom importa outro atom:

```typescript
// Label.tsx
import { Button } from './Button'  // ❌ NÃO FAÇ ISTO!

export function Label() {
  return (
    <div>
      <span>Label</span>
      <Button>OK</Button>  // ❌ Label não deveria ter Button!
    </div>
  )
}
```

**Por quê?** Se Button quebra → Label quebra → tudo quebra = ❌ isolamento perdido!

---

## 🎨 Usando Design Tokens

Cada atom deve usar **APENAS tokens semânticos** (nunca hardcode):

```typescript
import tokens from '../../../design-tokens/tokens.exported.json'

// ✅ CORRETO
const primaryColor = tokens.colors.semantic.primary
const padding = tokens.spacing.lg
const fontSize = tokens.typography.sizes.base

// ❌ ERRADO
const primaryColor = '#88CE11'        // Hardcoded!
const padding = '16px'                // Hardcoded!
const fontSize = '16px'               // Hardcoded!
```

**Benefit:** Uma mudança no Design System → todos os atoms refletem automaticamente!

---

## 📝 Checklist para Novo Atom

Antes de criar um atom novo, confirme:

- [ ] O atom é completamente independente?
- [ ] Não importa nenhum outro atom?
- [ ] Usa apenas tokens semânticos?
- [ ] Tem stories para Storybook?
- [ ] Tem testes unitários?
- [ ] Está bem documentado?

---

## 🚀 Próximo Passo

Quando os atoms estão prontos, você vai combinar eles em **Molecules**:
- FormField = Label + Input (combinação de atoms)
- Card = Container + Content (combinação de atoms)
- etc

Mas **cada molecule referencia apenas atoms**, mantendo isolamento!

---

## 📁 Atoms Implementados

✅ **Componentes Base:**
1. **Button** — Variantes: primary, secondary, tertiary
2. **Input** — Text input com validação
3. **Label** — Rótulo para inputs
4. **Badge** — Pequeno rótulo
5. **Avatar** — Imagem de usuário
6. **Checkbox** — Checkbox input
7. **Toggle** — Switch input
8. **Spinner** — Loading indicator

✅ **Componentes de Error (novo):**
9. **ErrorMessage** — Mensagem de erro simples com ícone
10. **FieldError** — Erro específico de campo de formulário (aria-describedby)
11. **AlertError** — Alerta crítico com dismiss
12. **ErrorBoundary** — Captura erros em React (error fallback)

Cada um **100% isolado** dos outros!

---

— Uma, desenhando com empatia 💝
