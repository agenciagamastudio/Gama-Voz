# QA Fase 4 — Visual & Accessibility Testing

**Data:** 2026-03-14
**Status:** Em Progresso
**Dev Server:** http://localhost:3000

---

## 🎯 Componentes a Testar (28 total)

### Atoms (10)
- [ ] Button — hover (brightness), active (scale), focus ring
- [ ] Input — focus border, error state, password toggle, aria-describedby
- [ ] Badge — visual consistency
- [ ] Checkbox — checked state, transition suave, focus
- [ ] Toggle — switch animation, thumb translate smooth
- [ ] Avatar — display correto
- [ ] Spinner — animation consistente
- [ ] AlertError — dismiss animation
- [ ] FieldError — error styling
- [ ] ErrorBoundary — error display + button

### Molecules (5)
- [ ] Card — hover shadow lift, transition smooth
- [ ] Alert — entry animation (motion-enter-slide), dismiss, role="alert"
- [ ] Dropdown — chevron rotation, listbox role, keyboard nav
- [ ] Tooltip — appear/disappear smooth
- [ ] FormField — label connection, error display

### Organisms (3)
- [ ] Modal — dialog role, escape key, modal backdrop click, focus trap
- [ ] PageHeader — styling, responsive
- [ ] DataTable — hover rows, click handling

### Platform (10)
- [ ] SideNav — navigation smooth
- [ ] Logo — render correto
- [ ] ColorSwatch — hover scale, copy functionality
- [ ] ThemeToggle — theme switch animation
- [ ] BrandSwitcher — dropdown motion
- [ ] DrawerNav — drawer open/close
- [ ] MainWrapper — layout stability
- [ ] GamaLogo — branding correct
- [ ] BrandLogo — animation
- [ ] SidenavContext — state management

---

## 🎬 Motion Testing

### Prefers-Reduced-Motion
```css
/* Enable reduced-motion in DevTools > Rendering > Emulate CSS media feature prefers-reduced-motion */
```

Validar:
- [ ] Motion classes desabilitam com prefers-reduced-motion
- [ ] Transições ficam 10ms (quase instant)
- [ ] Funcionalidade intacta, apenas sem animation

### Spring Physics
Validar em navegador:
- [ ] Card hover: smooth lift (não brusco)
- [ ] Dropdown icon: smooth 180° rotation
- [ ] Toggle thumb: smooth translate
- [ ] Modal entry: smooth scale in
- [ ] Alert entry: smooth slide in

---

## ♿ Accessibility Testing

### Keyboard Navigation
- [ ] Tab order correto (button → input → checkbox → dropdown)
- [ ] Focus rings visíveis em todos inputs
- [ ] Dropdown: Arrow Up/Down para navegar opções
- [ ] Modal: Escape fecha modal
- [ ] Password toggle: aria-label anunciado

### Screen Reader (use NVDA ou JAWS)
- [ ] Button: aria-label lido corretamente
- [ ] Input: label conectado (for="id"), error anunciado
- [ ] Dropdown: "listbox" role anunciado, options roles
- [ ] Modal: "dialog" role, aria-labelledby lido
- [ ] Alert: "alert" role, aria-live (polite/assertive)

### Color Contrast
- [ ] Primary text on dark: 14.4:1 (WCAG AAA) ✅
- [ ] Secondary text: 8.2:1 (WCAG AA) ✅
- [ ] Error red: sufficient contrast ✅
- [ ] Light mode: contrast invertido OK

---

## 🖼️ Visual Regression

### Desktop (1920x1080)
- [ ] Componentes renderizam correto
- [ ] Spacing mantém 4px grid
- [ ] Shadows corretos (dark mode = soft, light = hard)
- [ ] Typography weights consistentes

### Mobile (375x667)
- [ ] Responsive layout OK
- [ ] Touch targets >= 44x44px
- [ ] Dropdown/Modal mobile friendly

### Dark Mode (Default)
- [ ] All components visible
- [ ] Text contrast OK
- [ ] Backgrounds corretos

### Light Mode (Toggle)
- [ ] Colors inverted correto
- [ ] Shadows ajustados (hard shadows)
- [ ] Text readability OK

---

## 🧪 Interactive Testing

### Button Component
```
[ ] Primary button: hover brightens, active dims, focus ring green
[ ] Danger button: same states com red
[ ] Ghost button: border highlights on hover
[ ] Disabled: opacity 50%, no hover effects
```

### Input Component
```
[ ] Focus: border green, shadow appears
[ ] Error: border red, error message appears
[ ] Helper text: gray text appears
[ ] Password toggle: icon changes, type toggles
[ ] aria-describedby: error + helper linked
```

### Dropdown
```
[ ] Click to open: smooth animation
[ ] Arrow key: navigate options
[ ] Enter: select option
[ ] Escape: close dropdown
[ ] aria-expanded: toggle on open/close
```

### Modal
```
[ ] Opens with scale-in animation
[ ] Backdrop click: close
[ ] Escape key: close
[ ] Focus trapped inside modal
[ ] Title announced as aria-labelledby
```

### Alert
```
[ ] Appears with slide-in animation
[ ] Dismissible: close button works
[ ] role="alert" + aria-live anunciado
[ ] Error alerts: assertive live region
[ ] Success/warning: polite live region
```

---

## 📋 Reduçed Motion Test Detailed

**Como testar:**

1. Chrome DevTools → Rendering → Emulate CSS media feature → select "prefers-reduced-motion: reduce"
2. Recarregar página
3. Validar que todas animações são instantâneas (<20ms)

**Componentes a validar:**
- [ ] Button: sem animation, just background change
- [ ] Card: sem animation, just shadow change
- [ ] Dropdown icon: rotate instant
- [ ] Modal: appear instant
- [ ] Alert: appear instant

---

## ✅ Sign-Off

- [ ] Todos os 28 componentes testados
- [ ] Keyboard navigation completa
- [ ] Screen reader suportado
- [ ] Prefers-reduced-motion válido
- [ ] Dark mode OK
- [ ] Light mode OK
- [ ] Mobile responsive OK

**QA Passed By:** _______
**Date:** ___________

---

**Próximo Passo:** Fase 5 — Handoff para @devops (git push)
