# 🦾 ORGANISMS — Seções Complexas Compostas

**Nível:** Layer 3 (Seções completas)
**Status:** Pronto para build
**Isolamento:** 100% — cada organism combina molecules mantendo isolamento total

---

## O Que É Um Organism?

**Organism** = Seção complexa que combina múltiplas molecules para criar funcionalidade completa

Exemplos:
- ✅ Header = Logo + Navigation + UserMenu + Search (múltiplas molecules)
- ✅ Form = FormField + FormField + FormField + ButtonGroup (seção inteira)
- ✅ Modal = Header + Content + ButtonGroup (diálogo completo)
- ✅ DataTable = Header + TableBody + Pagination (tabela completa)
- ✅ AuthLayout = LoginForm + Links + Footer (layout inteiro)

---

## Estrutura Garantida de Isolamento

```
organisms/
├── Header/
│   ├── Header.tsx              ← Combina Logo + Nav + UserMenu
│   ├── Header.stories.tsx
│   ├── Header.test.tsx
│   └── index.ts
│
├── LoginForm/
│   ├── LoginForm.tsx           ← Combina FormField x2 + Button
│   ├── LoginForm.stories.tsx
│   ├── LoginForm.test.tsx
│   └── index.ts
│
├── Modal/
│   ├── Modal.tsx               ← Combina Card + ButtonGroup
│   ├── Modal.stories.tsx
│   ├── Modal.test.tsx
│   └── index.ts
│
├── DataTable/
│   ├── DataTable.tsx           ← Combina múltiplas molecules
│   ├── DataTable.stories.tsx
│   ├── DataTable.test.tsx
│   └── index.ts
│
└── Footer/
    ├── Footer.tsx              ← Combina Links + Copyright
    ├── Footer.stories.tsx
    ├── Footer.test.tsx
    └── index.ts
```

---

## ⚠️ Regra de Ouro — COMPOSE MOLECULES, NÃO ATOMS

### ✅ CORRETO — Organism combina molecules:

```typescript
// LoginForm.tsx
import { FormField } from '../molecules/FormField'
import { Button } from '../atoms/Button'  // Apenas para botão simples
import tokens from '../../../design-tokens/tokens.exported.json'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Lógica de login
  }

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: tokens.spacing.lg,
      padding: tokens.spacing.2xl,
    }}>
      <h2 style={{ fontSize: tokens.typography.sizes['2xl'] }}>Login</h2>

      <FormField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error ? 'Email inválido' : ''}
      />

      <FormField
        label="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button variant="primary">Entrar</Button>
    </form>
  )
}
```

**Garantia:**
- LoginForm usa FormField molecules
- Se Button (atom) muda → FormField (molecule) reflete → LoginForm reflete ✅
- Se FormField (molecule) muda → LoginForm reflete ✅
- Header (outro organism) não é afetado ✅

---

### ❌ ERRADO — Organism cria sua própria estrutura:

```typescript
// LoginForm.tsx
export function LoginForm() {
  return (
    <form>
      <div>
        <label>Email</label>          // ❌ Criou label!
        <input type="email" />        // ❌ Criou input!
      </div>
      <button>Entrar</button>         // ❌ Criou button!
    </form>
  )
}
```

**Por quê?** Se depois você quer mudar FormField em 50 lugares, não consegue!

---

## 🎨 Usando Design Tokens

Organisms também usam **APENAS tokens semânticos**:

```typescript
import tokens from '../../../design-tokens/tokens.exported.json'

export function Header() {
  return (
    <header style={{
      backgroundColor: tokens.colors.semantic.background-primary,
      padding: tokens.spacing.lg,
      display: 'flex',
      gap: tokens.spacing.2xl,
      borderBottom: `1px solid ${tokens.colors.semantic.border-default}`,
    }}>
      {/* Molecules/Atoms */}
    </header>
  )
}
```

---

## 📝 Checklist para Novo Organism

Antes de criar um organism novo, confirme:

- [ ] Combina múltiplas molecules (não cria atoms)?
- [ ] Cada molecule é independente?
- [ ] Pode ter lógica (state, handlers)?
- [ ] Usa apenas tokens semânticos para styling?
- [ ] Tem stories para Storybook?
- [ ] Tem testes de integração?
- [ ] Está bem documentada?
- [ ] Pode ser usado em múltiplas páginas?

---

## 🔄 Fluxo Completo de Isolamento

```
USER MUDA UM ÚNICO TOKEN NO DESIGN SYSTEM

    core.colors.primary = "#FF00FF"
         ↓
    semantic.primary referencia → ATUALIZADO
         ↓
    atoms que usam semantic.primary → ATUALIZADOS
    (Button, Label, etc)
         ↓
    molecules que usam atoms → ATUALIZADAS
    (FormField, Card, ButtonGroup, etc)
         ↓
    organisms que usam molecules → ATUALIZADAS
    (Header, LoginForm, Modal, etc)
         ↓
    TODO O SITE MUDA COR AUTOMATICAMENTE!

GARANTIA: Uma mudança, infinitos refletimentos!
NÃO HÁ QUEBRAS: Arquitetura é a lei!
```

---

## 🚀 Próximo Passo

Quando organisms estão prontos, você cria **PÁGINAS** combinando organisms:
- LoginPage = LoginForm + Footer
- DashboardPage = Header + Sidebar + DataTable + Footer
- etc

Mas **cada página referencia apenas organisms**, mantendo isolamento TOTAL!

---

## 📁 Organisms Previstos (próximos builds)

1. **Header** — Navigation + UserMenu + Logo
2. **Footer** — Links + Copyright
3. **LoginForm** — FormField x2 + Button
4. **Modal** — Header + Content + Actions
5. **DataTable** — Headers + Rows + Pagination
6. **Sidebar** — Navigation + Profile + Settings

Cada uma **100% isolada**, cada uma **reutilizável em múltiplas páginas**!

---

## 🎓 Hierarquia Completa

```
┌──────────────────┐
│  PAGES (você)    │  ← Sua aplicação (fora daqui)
├──────────────────┤
│  ORGANISMS       │  ← Seções (Header, Footer, Modal...)
│  (molecules)     │
├──────────────────┤
│  MOLECULES       │  ← Combinações (FormField, Card...)
│  (atoms)         │
├──────────────────┤
│  ATOMS           │  ← Base (Button, Input, Label...)
│  (tokens)        │
├──────────────────┤
│  DESIGN TOKENS   │  ← SSOT (única fonte da verdade)
│  (core/semantic) │
└──────────────────┘
```

**Cada nível:**
- ✅ Referencia apenas nível abaixo
- ✅ Completamente isolado do resto
- ✅ 100% reutilizável
- ✅ Zero efeitos colaterais

---

## ⚡ Benefício Final

Quando tudo está organizado assim:
1. **Designer quer mudar cores?** → Muda 1 token → TUDO muda
2. **Marketing quer novo button style?** → Cria novo button → pronto
3. **Novo projeto quer usar Design System?** → Copia tokens + atoms + molecules → pronto
4. **Você quer refatorar?** → Muda atoms → molecules refletem → organisms refletem

**ZERO QUEBRAS. ZERO EFEITOS COLATERAIS. 100% ISOLAMENTO.**

---

— Uma, desenhando com empatia 💝
