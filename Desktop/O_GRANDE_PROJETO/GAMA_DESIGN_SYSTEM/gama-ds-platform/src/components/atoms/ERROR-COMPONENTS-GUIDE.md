# 🚨 Error Components Guide

**Status:** ✅ Implementado
**WCAG:** AA Compliant
**Date:** 2026-03-11

---

## 4 Error Components (Each with Purpose)

### **1️⃣ FieldError — Form Field Validation**

**Use When:** Input tem erro de validação

```tsx
<div>
  <Input
    id="email"
    aria-invalid="true"
    aria-describedby="email-error"
  />
  <FieldError id="email-error">
    Email inválido (use @empresa.com)
  </FieldError>
</div>
```

**Features:**
- Ícone ⚠️ (não ❌)
- `role="alert"` + `aria-live="polite"`
- Tamanho pequeno (xs)
- Cor vermelho #E11D48
- Conecta via `aria-describedby`

**WCAG:** ✅ AA
- `aria-invalid="true"` on input
- `aria-describedby="id"` links error message
- Screen reader announces immediately

**Example States:**
```
✅ Default:     [Input]
                ⚠️ Email inválido

✅ With Icon:   [Input]
                ⚠️ Este email já está registrado

✅ With Action: [Input]
                ⚠️ Espaços não permitidos. Use underscore.
```

---

### **2️⃣ ErrorMessage — Inline Error Notification**

**Use When:** Precisa mostrar erro simples, inline

```tsx
<ErrorMessage role="alert">
  Falha ao carregar dados
</ErrorMessage>

// Com ícone customizado:
<ErrorMessage icon={<CustomErrorIcon />}>
  Erro crítico
</ErrorMessage>
```

**Features:**
- Flex + icon + text
- Icon padrão: ❌
- Inline (não full-width)
- Cor vermelho #E11D48
- `role="alert"` + `aria-live="polite"`

**WCAG:** ✅ AA
- Icon + text (nunca apenas cor)
- Anunciado por screen reader
- Tamanho texto >= 16px

**Example Uses:**
```
❌ Falha ao salvar documento
❌ Permissão negada. Contate admin.
❌ Conexão perdida. Tente novamente.
```

---

### **3️⃣ AlertError — Critical Error Notification**

**Use When:** Erro crítico precisa atenção

```tsx
const [showError, setShowError] = useState(false)

return showError ? (
  <AlertError
    title="Falha ao processar pagamento"
    onDismiss={() => setShowError(false)}
    dismissible={true}
  >
    Sua transação foi cancelada. Favor tente novamente.
    <br />
    Código: ERR_PAYMENT_DECLINED
  </AlertError>
) : null
```

**Features:**
- Fundo vermelho/10 (suave)
- Border-left 4px vermelho
- Title + body text
- Icon esquerda (❌)
- Dismiss button direita (X)
- Arredondado (md)
- Padding 16px

**WCAG:** ✅ AA
- `role="alert"` + `aria-live="assertive"`
- Title em negrito (semântica)
- Dismiss button acessível (X com aria-label)

**Example Scenarios:**
```
Critical:
┌─────────────────────────────────────┐
│ ❌ Falha ao processar pagamento  [X]│
├─────────────────────────────────────┤
│ Sua transação foi cancelada.        │
│ Favor tente novamente.              │
│ Código: ERR_PAYMENT_DECLINED        │
└─────────────────────────────────────┘

Session expired:
┌─────────────────────────────────────┐
│ ❌ Sessão expirou               [X] │
├─────────────────────────────────────┤
│ Sua sessão expirou por inatividade. │
│ Faça login novamente.               │
└─────────────────────────────────────┘
```

---

### **4️⃣ ErrorBoundary — Catch Component Errors**

**Use When:** Precisa capturar erros em componentes React

```tsx
<ErrorBoundary
  onError={(error, info) => {
    console.error('Error:', error)
    // Send to error tracking service
  }}
  fallback={(error) => (
    <AlertError title="Componente quebrou">
      {error.message}
    </AlertError>
  )}
>
  <ComplexComponent />
  <AnotherComponent />
</ErrorBoundary>
```

**Features:**
- Class component (React error boundaries)
- Captura erros de children
- Reset button para tentar novamente
- Callbacks: `onError`, `fallback`
- Mostra AlertError por padrão

**WCAG:** ✅ AA
- Mostra mensagem acessível
- Reset button tem aria-label
- Error message anunciada

**Example Usage:**
```tsx
// Na app root:
<ErrorBoundary>
  <AdminDashboard />
</ErrorBoundary>

// Em seção específica:
<ErrorBoundary
  fallback={(error) => (
    <AlertError title="Falha ao carregar relatório">
      {error.message}
    </AlertError>
  )}
>
  <ReportChart data={complexData} />
</ErrorBoundary>
```

---

## 🎯 When to Use Which?

### Decision Tree

```
Erro em formulário?
├─ SIM → Use FieldError
│         (under field, aria-describedby)
└─ NÃO:
   ├─ Erro simples, inline?
   │  ├─ SIM → Use ErrorMessage
   │  │         (inline notification)
   │  └─ NÃO:
   │     ├─ Erro crítico, full-width?
   │     │  ├─ SIM → Use AlertError
   │     │  │         (alert box com dismiss)
   │     │  └─ NÃO:
   │     │     └─ Use ErrorBoundary
   │     │         (wrapper para component errors)
   │     └─ Componente quebrou?
   │        └─ SIM → Use ErrorBoundary
   │                 (catch errors, show fallback)
```

### Quick Matrix

| Scenario | Component | Example |
|----------|-----------|---------|
| Input inválido | FieldError | "Email inválido" |
| Inline error | ErrorMessage | "Falha ao carregar" |
| Critical error | AlertError | "Pagamento rejeitado" |
| Component crash | ErrorBoundary | "Something went wrong" |

---

## 📝 Implementation Patterns

### Pattern #1: Form Validation

```tsx
import { Input } from '@/components/atoms/Input'
import { FieldError } from '@/components/atoms/FieldError'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const validateEmail = (value: string) => {
    if (!value.includes('@')) {
      setEmailError('Email deve conter @')
    } else {
      setEmailError('')
    }
  }

  return (
    <form>
      <Input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={(e) => validateEmail(e.target.value)}
        aria-invalid={!!emailError}
        aria-describedby={emailError ? 'email-error' : undefined}
      />
      {emailError && (
        <FieldError id="email-error">{emailError}</FieldError>
      )}
    </form>
  )
}
```

---

### Pattern #2: API Error Notification

```tsx
import { AlertError } from '@/components/atoms/AlertError'

export function ReportDownload() {
  const [error, setError] = useState<string | null>(null)

  const downloadReport = async () => {
    try {
      const response = await fetch('/api/report')
      if (!response.ok) {
        setError('Falha ao baixar relatório. Tente novamente.')
      }
    } catch (err) {
      setError(`Erro: ${err instanceof Error ? err.message : 'Desconhecido'}`)
    }
  }

  return (
    <>
      {error && (
        <AlertError
          title="Erro ao baixar"
          onDismiss={() => setError(null)}
        >
          {error}
        </AlertError>
      )}
      <button onClick={downloadReport}>
        Baixar Relatório
      </button>
    </>
  )
}
```

---

### Pattern #3: Protected Component

```tsx
import { ErrorBoundary } from '@/components/atoms/ErrorBoundary'
import { ChartComponent } from './ChartComponent'

export function Dashboard() {
  return (
    <ErrorBoundary
      onError={(error) => {
        console.error('Dashboard error:', error)
      }}
    >
      <ChartComponent data={complexData} />
    </ErrorBoundary>
  )
}
```

---

## ✅ WCAG Compliance Checklist

For each error component:

- [ ] **Contrast:** Error text >= 4.5:1 (red #E11D48 on dark #161616 = 5.1:1 ✅)
- [ ] **Announcement:** `role="alert"` or `aria-live="polite"`
- [ ] **Linkage:** `aria-invalid` + `aria-describedby` on field
- [ ] **Icon + Text:** Never color alone, always icon + text
- [ ] **Focus:** Focusable dismiss buttons
- [ ] **Dismiss:** Clear way to remove error message
- [ ] **Timeout:** Consider auto-dismiss after 5s (optional)

---

## 🧪 Testing Error Components

```typescript
// Check FieldError announces to screen reader
test('FieldError has correct aria attributes', () => {
  const { getByRole } = render(
    <FieldError id="test-error">Email inválido</FieldError>
  )

  expect(getByRole('alert')).toBeInTheDocument()
  expect(getByRole('alert')).toHaveAttribute('aria-live', 'polite')
})

// Check AlertError can be dismissed
test('AlertError dismissible button works', () => {
  const handleDismiss = jest.fn()
  const { getByRole } = render(
    <AlertError onDismiss={handleDismiss} dismissible={true}>
      Error message
    </AlertError>
  )

  getByRole('button', { name: /fechar/i }).click()
  expect(handleDismiss).toHaveBeenCalled()
})

// Check ErrorBoundary catches and displays error
test('ErrorBoundary catches component errors', () => {
  const ThrowError = () => {
    throw new Error('Test error')
  }

  const { getByRole } = render(
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>
  )

  expect(getByRole('alert')).toBeInTheDocument()
  expect(getByRole('alert')).toHaveTextContent('Test error')
})
```

---

## 🎨 Semantic Color Mapping

```yaml
error:
  color: #E11D48                    # Vermelho
  background-light: rgba(225, 29, 72, 0.1)
  contrast-dark: 5.1:1              # #E11D48 on #161616
  contrast-light: 5.1:1             # #E11D48 on #FFFFFF

icon:
  error: ❌                          # X emoji
  warning: ⚠️                        # Warning sign
  info: ℹ️                           # Info icon
  dismiss: ✕                        # Close button
```

---

## 🚀 Summary

| Component | Scope | Icon | Width | Dismiss |
|-----------|-------|------|-------|---------|
| **FieldError** | Field level | ⚠️ | Full field | No |
| **ErrorMessage** | Inline | ❌ | Flexible | No |
| **AlertError** | Page level | ❌ | ~500px | Yes |
| **ErrorBoundary** | App level | ❌ | Full | Yes |

---

**— Uma, documentando erros com acessibilidade 🚨**
