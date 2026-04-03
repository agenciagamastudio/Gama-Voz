# 🧪 MOLECULES — Combinações Simples de Atoms

**Nível:** Layer 2 (Composição)
**Status:** Pronto para build
**Isolamento:** 100% — cada molecule combina atoms sem efeitos colaterais

---

## O Que É Uma Molecule?

**Molecule** = Combinação simples de 2-3 atoms que criam uma unidade funcional

Exemplos:
- ✅ FormField = Label + Input (juntos fazem sentido)
- ✅ ButtonGroup = Button + Button + Button (grupo de botões)
- ✅ Card = Container + Content (card simples)
- ✅ SearchBox = Input + Icon (search funcional)

Exemplos do que **NÃO** é molecule:
- ❌ Header (muito complexo = é organism)
- ❌ Form (muitos fields = é organism)
- ❌ Button (é atom, não molecule!)

---

## Estrutura Garantida de Isolamento

```
molecules/
├── FormField/
│   ├── FormField.tsx           ← Combina Label + Input
│   ├── FormField.stories.tsx
│   ├── FormField.test.tsx
│   └── index.ts
│
├── Card/
│   ├── Card.tsx                ← Container com styling
│   ├── Card.stories.tsx
│   ├── Card.test.tsx
│   └── index.ts
│
├── ButtonGroup/
│   ├── ButtonGroup.tsx         ← Agrupa múltiplos Buttons
│   ├── ButtonGroup.stories.tsx
│   ├── ButtonGroup.test.tsx
│   └── index.ts
│
└── SearchBox/
    ├── SearchBox.tsx           ← Input + Icon
    ├── SearchBox.stories.tsx
    ├── SearchBox.test.tsx
    └── index.ts
```

---

## ⚠️ Regra de Ouro — COMPOSE, NÃO CRIE

### ✅ CORRETO — Molecule combina atoms:

```typescript
// FormField.tsx
import { Label } from '../atoms/Label'
import { Input } from '../atoms/Input'
import tokens from '../../../design-tokens/tokens.exported.json'

export function FormField({ label, ...inputProps }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.sm }}>
      <Label>{label}</Label>
      <Input {...inputProps} />
    </div>
  )
}
```

**Garantia:**
- FormField referencia atoms (Label + Input)
- Se Button muda → FormField não é afetado ✅
- Se Input muda → FormField reflete mudança ✅
- Se Label muda → FormField reflete mudança ✅

---

### ❌ ERRADO — Molecule cria sua própria estrutura:

```typescript
// FormField.tsx
export function FormField({ label }) {
  return (
    <div>
      <span>{label}</span>  // ❌ Criou span em vez de usar Label atom!
      <input />             // ❌ Criou input em vez de usar Input atom!
    </div>
  )
}
```

**Por quê?** Se depois você quer mudar a cor de todos os Labels, não consegue (está hardcoded no FormField!)

---

## 🎨 Usando Design Tokens

Molecules também usam **APENAS tokens semânticos** para layout/styling:

```typescript
import { Label } from '../atoms/Label'
import { Input } from '../atoms/Input'
import tokens from '../../../design-tokens/tokens.exported.json'

export function FormField({ label, error }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: tokens.spacing.md,            // ✅ Token de spacing
      padding: tokens.spacing.lg,        // ✅ Token de spacing
      backgroundColor: tokens.colors.semantic.surface-default,  // ✅ Token de cor
    }}>
      <Label>{label}</Label>
      <Input />
      {error && <span style={{ color: tokens.colors.semantic.error }}>
        {error}
      </span>}
    </div>
  )
}
```

---

## 📝 Checklist para Nova Molecule

Antes de criar uma molecule nova, confirme:

- [ ] Combina 2-3 atoms apenas (não mais)?
- [ ] Cada atom referenciado é independente?
- [ ] Não adiciona lógica complexa (layout simples)?
- [ ] Usa apenas tokens semânticos?
- [ ] Tem stories para Storybook?
- [ ] Tem testes (vê se atoms renderizam)?
- [ ] Está bem documentada?

---

## 🔄 Fluxo de Isolamento

```
USER MUDA CORES NO DESIGN SYSTEM
         ↓
Design Token (core) muda
         ↓
Semantic token atualiza
         ↓
Atoms referenciam semantic → REFLETEM
         ↓
Molecules usam atoms → REFLETEM
         ↓
Organisms usam molecules → REFLETEM
         ↓
TUDO MUDA AUTOMATICAMENTE!

GARANTIA: Nada quebra!
```

---

## 🚀 Próximo Passo

Quando molecules estão prontas, você vai combinar múltiplas molecules em **Organisms**:
- Form = FormField + FormField + Button (múltiplas molecules)
- Header = Logo + Navigation + UserMenu (múltiplas molecules)
- etc

Mas **cada organism referencia apenas molecules**, mantendo isolamento!

---

## 📁 Molecules Previstas (próximos builds)

1. **FormField** — Label + Input (+ error message)
2. **Card** — Container com padding/border/shadow
3. **ButtonGroup** — Múltiplos botões juntos
4. **SearchBox** — Input + Search Icon
5. **AlertBox** — Icon + Title + Message
6. **TabButton** — Button com indicador de estado

Cada uma **100% isolada**!

---

## ⚡ Performance Tip

Como molecules combinam atoms e usam tokens:
- ✅ Atoms são reutilizados (zero duplicação)
- ✅ Tokens são centralizados (apenas 1 cópia)
- ✅ Mudanças propagam em O(1)
- ✅ Zero re-renders desnecessários (se implementar bem)

---

— Uma, desenhando com empatia 💝
