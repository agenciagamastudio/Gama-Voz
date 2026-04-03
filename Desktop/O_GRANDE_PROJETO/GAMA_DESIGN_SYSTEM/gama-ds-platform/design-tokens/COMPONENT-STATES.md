# 🎬 Component States — Visual & Behavioral Matrix

**Padrão:** AIOX (State documentation)
**Status:** ✅ Definido para GAMA
**Data:** 2026-03-11

---

## Princípio

Cada componente tem um conjunto **predefinido de estados**. Não inventar novos estados = consistência.

**AIOX Pattern:**
```
Component (Button)
├── Default
├── Hover
├── Active/Pressed
├── Focus
├── Disabled
├── Loading
└── Error
```

---

## GAMA State Matrix

### **PrimaryAction Component**

| State | Visual | Interação | Keyboard | A11y |
|-------|--------|-----------|----------|------|
| **Default** | Verde #88CE11, bold text | Cursor pointer | Focusable (Tab) | aria-label obrigatório |
| **Hover** | Brightness +10% | Color shift | N/A | — |
| **Focus** | Outline 2px #88CE11 + offset 2px | Visible frame | Via Tab | focus-visible obrigatório |
| **Active** | Scale 0.98 (pressed) | Feedback imediato | N/A | — |
| **Disabled** | Opacity 50%, cursor not-allowed | Sem interação | Focusable (Tab) | aria-disabled="true" |
| **Loading** | Spinner animado | Sem interação | Tab permite sair | aria-busy="true" |
| **Error** | Vermelho border #E11D48, shake anim | Destaque | Via Tab | aria-invalid="true" |

**Visual Grid:**
```
┌─────────────────────────────────────────────────────────────────┐
│ PrimaryAction Button States                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [DEFAULT]     [HOVER]     [FOCUS]     [ACTIVE]                 │
│  ▀▀▀▀▀▀▀▀▀     ▀▀▀▀▀▀▀▀▀   ▀▀▀▀▀▀▀▀▀   ▀▀▀▀▀▀▀▀▀               │
│   Enviar        Enviar      Enviar      Enviar                  │
│                            (outline)   (scaled)                │
│                                                                 │
│  [DISABLED]    [LOADING]   [ERROR]                             │
│  ▄▄▄▄▄▄▄▄▄▄     ▀▀▀▀▀▀▀▀▀   ▀▀▀▀▀▀▀▀▀                         │
│   Enviar        Enviar ⟳   Enviar                              │
│  (opacity)      (spinner)  (red border)                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### **FormInput Component**

| State | Visual | Input Behavior | Validation | A11y |
|-------|--------|-----------------|------------|------|
| **Default** | Border 1px gray, bg-surface | Text input | No error | — |
| **Focus** | Border 2px #88CE11, shadow | Cursor active | No error | focus-visible, aria-label |
| **Filled** | Border 1px gray, text present | Text present | Check format | — |
| **Error** | Border 2px #E11D48, red label | Text/error msg | Message visible | aria-invalid, aria-describedby |
| **Disabled** | Bg grayed, cursor not-allowed | No input | N/A | disabled attr |
| **Loading** | Spinner à direita | Input locked | N/A | aria-busy |
| **Success** | Border 2px #10B981, ✅ icon | Input locked | Message | aria-label, role="status" |

**HTML Patterns:**

```html
<!-- Default -->
<input
  type="email"
  placeholder="seu@email.com"
  aria-label="Email"
/>

<!-- Focus (CSS :focus-visible) -->
<input
  type="email"
  style={{ outline: '2px solid #88CE11', outlineOffset: '2px' }}
/>

<!-- Error State -->
<input
  type="email"
  aria-invalid="true"
  aria-describedby="email-error"
  value="invalido"
/>
<span id="email-error" role="alert">
  ❌ Email inválido (use @empresa.com)
</span>

<!-- Disabled -->
<input
  type="email"
  disabled
  aria-disabled="true"
/>

<!-- Loading -->
<input
  type="email"
  aria-busy="true"
  disabled
/>
<span role="status">Validando...</span>

<!-- Success -->
<input
  type="email"
  aria-label="Email confirmado"
  disabled
/>
<span role="status" aria-live="polite">
  ✅ Email confirmado
</span>
```

---

### **Card (InfoCard) Component**

| State | Visual | Interaction | Use Case |
|-------|--------|-------------|----------|
| **Default** | Bg #272727, border 1px gray, shadow-md | Read-only | Display information |
| **Hover** | Shadow-lg, border-hover | Cursor pointer (if clickable) | Link/selectable card |
| **Selected** | Border 2px #88CE11, bg-surface-hover | Visual feedback | In lists/galleries |
| **Disabled** | Opacity 50%, cursor not-allowed | No interaction | Unavailable content |
| **Loading** | Skeleton shimmer | N/A | Data loading |
| **Error** | Border 2px #E11D48, error msg | Display error | Failed to load |

**HTML:**

```html
<!-- Default -->
<article class="card">
  <h3>Relatório Q1</h3>
  <p>Dados de vendas...</p>
</article>

<!-- Selected state (via class) -->
<article class="card selected">
  <h3>Relatório Q1</h3>
</article>

<!-- Loading -->
<article class="card loading">
  <div class="skeleton-bar"></div>
  <div class="skeleton-bar"></div>
</article>

<!-- Error -->
<article class="card error">
  <p role="alert">
    ❌ Falha ao carregar relatório
  </p>
  <button>Tentar Novamente</button>
</article>
```

---

### **Badge (Indicator) Component**

| State | Visual | Usage | Color |
|-------|--------|-------|-------|
| **Default** | Filled pill | Status display | Verde/Red/Blue/Yellow |
| **Outlined** | Apenas border | Secondary status | Semântica |
| **Small** | Compressed | Tag/label | Semântica |
| **Large** | Expanded | Prominent status | Semântica |

**Variants:**

```
Success Badge:     ✅ SUCESSO         #10B981
Error Badge:       ❌ ERRO            #E11D48
Warning Badge:     ⚠️ AVISO           #F59E0B
Info Badge:        ℹ️ INFORMAÇÃO      #3B82F6
```

---

## 🔄 State Transition Rules

### All Interactive Components

**Default → Hover** (on mouseover)
```css
transition: background-color 300ms ease-in-out;
/* Brightness +10% or color shift */
```

**Default → Focus** (on Tab or click)
```css
outline: 2px solid #88CE11;
outline-offset: 2px;
/* WCAG AA requirement */
```

**Any → Disabled** (if disabled attr)
```css
opacity: 0.5;
cursor: not-allowed;
pointer-events: none;
/* Completely inaccessible */
```

**Any → Loading** (during async op)
```css
/* Show spinner, lock input */
position: relative;
/* Spinner overlay */
```

**Input → Error** (validation fail)
```css
border: 2px solid #E11D48;
/* Show error message below */
```

**Input → Success** (validation pass)
```css
border: 2px solid #10B981;
/* Show success message below */
```

---

## 📋 Complete State Checklist

Para cada novo componente:

- [ ] **Default state** — Estados de repouso
- [ ] **Hover state** — Mouse over (brightness/color)
- [ ] **Focus state** — Keyboard focus (outline 2px + offset)
- [ ] **Active state** — Mouse/keyboard pressed (scale 0.98)
- [ ] **Disabled state** — Attr disabled (opacity 50%)
- [ ] **Loading state** — During async (spinner + locked)
- [ ] **Error state** — Validation fail (red border + message)
- [ ] **Success state** — Validation pass (green border + message)
- [ ] **Transitions** — Times (150ms fast, 300ms standard)
- [ ] **WCAG A11y** — aria- attrs + focus-visible

---

## 🎯 GAMA Application

### Current Components Mapped

| Component | Default | Hover | Focus | Disabled | Error | Loading |
|-----------|---------|-------|-------|----------|-------|---------|
| PrimaryAction | ✅ | ✅ brightness | ✅ outline | ✅ opacity | — | — |
| SecondaryAction | ✅ | ✅ bg shift | ✅ outline | ✅ opacity | — | — |
| FormInput | ✅ | — | ✅ outline | ✅ attr | ✅ red border | — |
| Card | ✅ | ✅ shadow | — | ✅ opacity | ✅ message | ✅ shimmer |
| Badge | ✅ | — | — | — | — | — |

---

## 🧪 Testing States

For each component, test:

1. **Mouse interaction**
   - [ ] Hover works
   - [ ] Click triggers action
   - [ ] Cursor changes (pointer/not-allowed)

2. **Keyboard interaction**
   - [ ] Tab focuses element
   - [ ] Focus outline visible
   - [ ] Enter/Space triggers action

3. **Screen reader**
   - [ ] aria-label present
   - [ ] aria-invalid/aria-busy correct
   - [ ] Error messages announced

4. **Visual state**
   - [ ] All transitions smooth (300ms)
   - [ ] Colors contrast ≥ 4.5:1
   - [ ] Disabled ≥ 3:1 contrast

---

**Padrão adotado de:** AIOX Brandbook (state documentation + variants)
**Aplicado em:** GAMA Design System v1.0.0+
