# Gama Design System v1.0 — Quick Start Guide

## 🚀 Começar Agora

### Rodando Localmente
```bash
cd gama-ds-platform
npm install
npm run dev
```
Abra: http://localhost:3000

### Deploy Vercel (Próximo)
```bash
vercel --prod
```
URL: https://gama-design-system.vercel.app

---

## 📍 Navegação Rápida

### Foundations (Design Basics)
- **Cores**: http://localhost:3000/foundations/colors
- **Tipografia**: http://localhost:3000/foundations/typography
- **Espaçamento**: http://localhost:3000/foundations/spacing
- **Ícones**: http://localhost:3000/foundations/icons

### Components (Reutilizáveis)
- **Atoms** (7): Button, Input, Badge, Avatar, Spinner, Toggle, Checkbox
  - http://localhost:3000/components/atoms
- **Molecules** (5): FormField, Card, Alert, Dropdown, Tooltip
  - http://localhost:3000/components/molecules
- **Organisms** (3): Modal, PageHeader, DataTable
  - http://localhost:3000/components/organisms

### Brand (Identity)
- **Identity**: http://localhost:3000/brand/identity (Manifesto, Valores)
- **Voice & Tone**: http://localhost:3000/brand/voice (Como falar)
- **Applications**: http://localhost:3000/brand/applications (Mockups)

### Reference
- **Tokens**: http://localhost:3000/tokens (Referência rápida)

---

## 🎨 Tokens Principais

### Cores (Não Mudam)
```css
--gama-primary: #88CE11    /* Verde neon - CTAs */
--gama-dark: #161616       /* Background escuro */
--gama-surface: #272727    /* Cards */
--gama-text: #FFFFFF       /* Texto principal */
--gama-text-secondary: #A1A1AA /* Texto secundário */
```

### Tipografia
```
Primary: Poppins (300-900)
Code: JetBrains Mono
```

### Espaçamento
```
xs=4px, sm=8px, md=12px, lg=16px, xl=24px, 2xl=32px, 3xl=48px
```

---

## 📦 O Que Você Tem

✅ 15 páginas funcionais
✅ 15 componentes reutilizáveis
✅ Design completo (cores, tipografia, espaçamento, ícones)
✅ BrandBook (Identity, Voice, Applications)
✅ Dark/Light theme toggle
✅ Sidebar hover-expand
✅ Documentação completa

---

## 🔧 Usando Componentes

### Import Atoms
```tsx
import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'
import { Badge } from '@/components/atoms/Badge'

// Usar
<Button variant="primary" size="md">Click me</Button>
<Input type="email" placeholder="seu@email.com" onChange={handleChange} />
<Badge variant="success">Active</Badge>
```

### Import Molecules
```tsx
import { FormField, Card, Alert } from '@/components/molecules'

// Usar
<FormField label="Email" name="email" required>
  <Input type="email" />
</FormField>

<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>

<Alert variant="success" title="Success">
  Your action completed!
</Alert>
```

### Import Organisms
```tsx
import { Modal, PageHeader, DataTable } from '@/components/organisms'

// Usar
<Modal isOpen={true} onClose={handleClose} title="Delete?">
  <Modal.Body>Are you sure?</Modal.Body>
  <Modal.Footer>
    <Button>Cancel</Button>
    <Button variant="danger">Delete</Button>
  </Modal.Footer>
</Modal>

<PageHeader
  title="Dashboard"
  description="Welcome back"
  breadcrumbs={[...]}
  actions={<Button>Export</Button>}
/>

<DataTable columns={cols} data={data} />
```

---

## 🌍 Próximo: Migração dos 9 Projetos

Consulte: `TOKEN_MIGRATION_PLAN.md`

**Projetos**: GAMA_CALCULADORA, GAMA_FINANCEIRO, GAMA_MONITOR, GAMA_TUNEL_V2, GAMA_NORT, GAMA_ONBOARDING, GAMA_CRONOGRAMAS, GAMA_CLONES, GAMA_JARVIS

**Tempo**: 1-2 semanas total

---

## 📚 Documentação Completa

- `PHASE_COMPLETION_SUMMARY.md` - O que foi entregue
- `TOKEN_MIGRATION_PLAN.md` - Como migrar nos 9 projetos
- `vercel.json` - Deploy config
- Cada página tem "Props table" e "Code block" copiável

---

## ⚠️ Troubleshooting

### Erro: "Cannot find module './682.js'"
**Solução**: Limpar .next e rebuildar
```bash
rm -rf .next
npm run build
```

### Tema não muda
**Solução**: Verificar localStorage (`gama-theme`)
```js
localStorage.setItem('gama-theme', 'light')
```

### Componente não importa
**Solução**: Usar caminho correto
```tsx
import { Button } from '@/components/atoms/Button'  // ✓
import Button from '@/components/atoms'             // ✗
```

---

## 🎯 Checklist de Deploy

- [ ] `vercel login`
- [ ] `vercel --prod`
- [ ] Abrir URL final
- [ ] Testar todas as páginas
- [ ] Verificar tema dark/light
- [ ] Validar componentes

---

**Pronto para usar! 🚀**
