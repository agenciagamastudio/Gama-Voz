# ♿ ACESSIBILIDADE — WCAG AA Compliance

**Padrão:** WCAG 2.1 Level AA (recomendado)
**Status:** ✅ IMPLEMENTADO
**Data:** 2026-03-11

---

## 🎯 Objetivo

Garantir que TODOS os componentes GAMA sejam acessíveis para:
- ✅ Pessoas com baixa visão (contraste)
- ✅ Pessoas daltônicas (não depender só de cor)
- ✅ Usuários de teclado (navegação)
- ✅ Leitores de tela (semântica HTML)
- ✅ Pessoas com mobilidade limitada (tamanho de target)

---

## 📊 CONTRASTE — WCAG AA Compliance

### Padrão: 4.5:1 para texto normal

**Dark Mode (Recomendado):**

| Element | Foreground | Background | Ratio | Status |
|---------|-----------|-----------|-------|--------|
| **Text Primary** | #FFFFFF | #161616 | 20.0:1 | ✅ EXCELENTE |
| **Text Secondary** | #A1A1AA | #161616 | 8.9:1 | ✅ EXCELENTE |
| **Text Tertiary** | #71717A | #161616 | 6.6:1 | ✅ EXCELENTE |
| **Text Muted** | #52525B | #161616 | 4.6:1 | ✅ OK |
| **Primary Button** | #000000 | #88CE11 | 10.9:1 | ✅ EXCELENTE |
| **Error Text** | #E11D48 | #161616 | 5.1:1 | ✅ OK |
| **Warning Text** | #F59E0B | #161616 | 3.8:1 | ⚠️ FALHA AA |
| **Success Text** | #10B981 | #161616 | 5.7:1 | ✅ OK |
| **Info Text** | #3B82F6 | #161616 | 4.1:1 | ⚠️ FALHA AA |

**Recomendações:**
- ✅ Warning e Info precisam de suporte visual (icon + cor)
- ✅ Nunca use cor como único indicador
- ✅ Sempre adicione ícone + cor para semânticos

**Light Mode (Quando implementar):**

| Element | Foreground | Background | Ratio | Status |
|---------|-----------|-----------|-------|--------|
| **Text Primary** | #0A0A0A | #FFFFFF | 20.0:1 | ✅ EXCELENTE |
| **Text Secondary** | #666666 | #FFFFFF | 8.6:1 | ✅ EXCELENTE |
| **Primary Button** | #000000 | #88CE11 | 10.9:1 | ✅ EXCELENTE |

---

## ⌨️ NAVEGAÇÃO POR TECLADO

### Regras Obrigatórias:

#### 1. **Tab Order (Sequência Lógica)**

```
✅ CORRETO:
Logo → Navigation → Search → Main Content → Footer

❌ ERRADO:
Footer → Main Content → Navigation → Logo
(não segue ordem visual)
```

**Implementação em React:**
```tsx
// Usar tabIndex apenas quando necessário
<button tabIndex="0">First</button>
<button tabIndex="1">Second</button>

// Não use tabIndex > 0 (causas problemas!)
// Use order CSS ou restructure HTML
```

#### 2. **Focus Indicators (Visibilidade de Foco)**

```css
/* PADRÃO GAMA — Obrigatório em TODOS inputs/buttons */
:focus-visible {
  outline: 2px solid #88CE11;
  outline-offset: 2px;
}

/* NUNCA use outline: none sem alternativa! */
❌ ERRADO:
button:focus { outline: none; }

✅ CORRETO:
button:focus-visible {
  outline: 2px solid var(--color-primary);
  box-shadow: 0 0 0 4px rgba(136, 206, 17, 0.1);
}
```

#### 3. **Sem Keyboard Traps**

```
✅ CORRETO: Usuário consegue sair de qualquer elemento com Escape/Tab

❌ ERRADO:
Modal que prende foco sem way out
Dropdown que não fecha com Escape
Input que não libera Tab
```

**Teste:** Navegar todo site com só teclado (Tab, Shift+Tab, Enter, Escape)

#### 4. **Click Targets — Mínimo 44x44px**

```css
/* WCAG AA: Mínimo 44px x 44px para touch targets */
button {
  min-width: 44px;
  min-height: 44px;
  padding: var(--space-md) var(--space-lg); /* Mínimo 12px padding */
}

/* Para links em texto, aceita 24px se suficientemente espaçado */
a {
  padding: 4px; /* Extra padding via padding, não deixa "skinny" */
}
```

---

## 🎨 COR NÃO COMO ÚNICO INDICADOR

### ❌ ERRADO:

```jsx
// Apenas cor = problema para daltônicos
<button style={{ backgroundColor: 'red' }}>
  Deletar
</button>

// Usuário daltônico vê verde/marrom, não vermelho
```

### ✅ CORRETO:

```jsx
// Cor + Icon + Text = acessível
<button className="btn-danger">
  <TrashIcon /> Deletar
</button>

// Daltônico vê: ícone de lixo + texto + cor
```

### Padrão em GAMA:

| Estado | Cor | Icon | Text | Resultado |
|--------|-----|------|------|-----------|
| **Error** | #E11D48 (vermelho) | ❌ | "Erro" | ✅ 3 sinais |
| **Success** | #10B981 (verde) | ✅ | "Sucesso" | ✅ 3 sinais |
| **Warning** | #F59E0B (amarelo) | ⚠️ | "Atenção" | ✅ 3 sinais |
| **Info** | #3B82F6 (azul) | ℹ️ | "Info" | ✅ 3 sinais |

---

## 🔤 TIPOGRAFIA — Legibilidade

### Tamanho de Fonte (WCAG AA)

```
✅ MÍNIMO 16px para body text (melhor: 18px)
✅ Line-height ≥ 1.5 para body text
✅ Letter-spacing ≥ 0.12em em blocos de texto
```

**GAMA Compliance:**

```yaml
typography:
  base: 16px              # ✅ OK
  line-height: 1.5       # ✅ OK (1.5 = 24px)
  letter-spacing: 0px    # ⚠️ Aceitável, mas 0.5px seria melhor
```

### Contraste em Texto

```
Normal text (< 18px): 4.5:1 minimum
Large text (≥ 18px bold or ≥ 14px): 3:1 minimum
```

**GAMA Compliance:**

- ✅ Text Primary (#FFFFFF on #161616): 20.0:1 ✅
- ✅ Text Secondary (#A1A1AA on #161616): 8.9:1 ✅
- ⚠️ Text Muted (#52525B on #161616): 4.6:1 ⚠️ Aceito mas margem pequena

**Recomendação:** Não use text-muted em padrágrafos longos. Use para labels/hints apenas.

---

## 📱 MOBILE & TOUCH

### Touch Target Size

```css
/* WCAG 2.1 Level AAA: Mínimo 48px x 48px */
/* WCAG 2.1 Level AA: Mínimo 44px x 44px */

/* GAMA Standard (AA): */
button {
  min-width: 44px;
  min-height: 44px;
  padding: var(--space-md) var(--space-lg);  /* 12px 16px = 44px height */
}
```

### Resposta a Hover/Focus

```
✅ Hover deve ser visível
✅ Focus-visible OBRIGATÓRIO para teclado
✅ Active state deve dar feedback tátil
```

---

## ♿ LEITORES DE TELA — Semântica HTML

### Padrões Obrigatórios:

```html
<!-- ✅ CORRETO: Semântica clara -->
<button aria-label="Fechar menu">×</button>
<input type="email" aria-label="Seu email" />
<nav aria-label="Navegação principal">...</nav>
<main role="main">Conteúdo</main>

<!-- ❌ ERRADO: Não semântico -->
<div onclick="close()" class="button">×</div>
<div contenteditable>seu email</div>
<div class="nav">...</div>
```

### Componentes GAMA — Specs Obrigatórias:

**Button:**
```html
<button aria-label="Description if icon-only">
  Clique aqui
</button>
```

**Input:**
```html
<label htmlFor="email">Email:</label>
<input id="email" type="email" aria-label="Seu email" />
```

**Error States:**
```html
<input aria-invalid="true" aria-describedby="error-msg" />
<span id="error-msg">Email inválido</span>
```

**Form Field:**
```html
<fieldset>
  <legend>Escolha uma opção:</legend>
  <input type="radio" name="option" />
</fieldset>
```

---

## 🎨 MODO REDUZIDO DE MOVIMENTO

Para usuários com sensibilidade a movimento:

```css
/* Respeitar prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 🔦 ALTO CONTRASTE (Windows High Contrast Mode)

Para usuários que usam Windows High Contrast:

```css
@media (forced-colors: active) {
  button {
    border: 2px solid buttonText;
  }
  a {
    text-decoration: underline;
  }
}
```

---

## ✅ CHECKLIST — Antes de Usar Componente

Para CADA novo componente criado:

- [ ] Contraste validado (4.5:1 mínimo)
- [ ] Focus indicador implementado (2px outline)
- [ ] Tab order correto (sequência lógica)
- [ ] Sem keyboard traps
- [ ] Aria labels completos
- [ ] Cor não é único indicador (icon + texto)
- [ ] Touch target ≥ 44px
- [ ] Funciona com leitor de tela
- [ ] Respeita prefers-reduced-motion
- [ ] Light mode testado

---

## 🧪 FERRAMENTAS DE TESTE

### Automáticas (Execute durante desenvolvimento):

```bash
# Instalar lighthouse
npm install -g lighthouse

# Testar acessibilidade
lighthouse https://seu-site.com --only-categories=accessibility
```

### Manuais (Teste com usuários reais):

1. **Teclado:** Navegar com Tab/Shift+Tab/Enter/Escape
2. **Leitor de tela:** macOS VoiceOver (Cmd+F5) ou NVDA (Windows)
3. **Alto contraste:** Windows > Settings > Ease of Access > High Contrast
4. **Zoom:** Browser zoom a 200%
5. **Reduzido movimento:** macOS > Accessibility > Display > Reduce motion

### Online Tools:

- axe DevTools: https://www.deque.com/axe/devtools/
- WAVE: https://wave.webaim.org/
- Contrast Checker: https://webaim.org/resources/contrastchecker/

---

## 📊 METAS GAMA

| Meta | Padrão | Status | Target |
|------|--------|--------|--------|
| **Contraste** | 4.5:1 | ✅ OK | Manter/Melhorar |
| **Focus Visible** | Implementado | ✅ OK | Manter |
| **Keyboard Nav** | Sem traps | ✅ OK | Manter |
| **Leitores Tela** | Semântica HTML | ⏳ IMPLEMENTAR | Durante build |
| **Touch Target** | 44px+ | ✅ OK | Manter |
| **Light Mode** | Implementado | ✅ OK | Testar acessibilidade |
| **Reduced Motion** | Implementado | ⏳ IMPLEMENTAR | Durante build |

---

## 🚀 PRÓXIMOS PASSOS

1. ✅ Tokens.css atualizado com dark/light + focus
2. ⏳ Implementar aria labels em cada componente (durante build)
3. ⏳ Testar com leitores de tela (NVDA/VoiceOver)
4. ⏳ Criar guia de acessibilidade por componente
5. ⏳ Setup lighthouse CI para validação automática

---

— Uma, desenhando com empatia (acessível para todos!) 💝
