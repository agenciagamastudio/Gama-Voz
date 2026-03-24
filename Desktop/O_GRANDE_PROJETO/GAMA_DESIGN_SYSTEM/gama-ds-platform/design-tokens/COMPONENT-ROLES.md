# 🎯 Component Roles — Naming by Function, Not Form

**Padrão:** AIOX (Benchmark)
**Status:** ✅ Implementado para GAMA
**Data:** 2026-03-11

---

## Princípio

Componentes devem ser nomeados pelo **papel que desempenham**, não pela forma visual.

**RUIM (Form-Based):**
```
- GreenButton
- NeonBadge
- LargeInput
- PrimaryCard
```

**BOM (Role-Based):**
```
- PrimaryAction (quando usuário precisa fazer algo importante)
- SecondaryAction (quando a ação é complementar)
- SuccessIndicator (quando queremos confirmar resultado)
- FormInput (quando é campo de formulário)
- AdminPanel (quando é layout administrativo)
```

---

## GAMA Component Roles

### **Action Components**

| Role | Purpose | Visual | Example |
|------|---------|--------|---------|
| **PrimaryAction** | Chamado claro para ação principal | Verde neon (#88CE11) | "Enviar Relatório", "Confirmar Transação" |
| **SecondaryAction** | Ação alternativa ou menos importante | Verde neon bordo | "Cancelar", "Editar Rascunho" |
| **GhostAction** | Ação terciária, discreto | Texto verde neon | "Mais Opções", "Saiba Mais" |
| **DestructiveAction** | Risco/Delete | Vermelho (#E11D48) | "Deletar", "Remover" |

**Regra:** Sempre use papel, não cor:
```jsx
// RUIM
<GreenButton>Enviar</GreenButton>

// BOM
<PrimaryAction>Enviar</PrimaryAction>
```

---

### **Status Indicators**

| Role | Meaning | Color | Icon | Context |
|------|---------|-------|------|---------|
| **SuccessIndicator** | Ação completada com sucesso | Verde #10B981 | ✅ | "Enviado com sucesso" |
| **ErrorIndicator** | Problema/falha | Vermelho #E11D48 | ❌ | "Email inválido" |
| **WarningIndicator** | Atenção/cuidado | Amarelo #F59E0B | ⚠️ | "Esta ação não pode ser desfeita" |
| **InfoIndicator** | Informação útil | Azul #3B82F6 | ℹ️ | "Você economizou R$500" |

**Regra:** Nunca use cor como único indicador:
```jsx
// RUIM
<span style={{ color: 'red' }}>Erro</span>

// BOM
<ErrorIndicator>
  <ErrorIcon />
  Erro: Email inválido
</ErrorIndicator>
```

---

### **Container Roles**

| Role | Purpose | Usage |
|------|---------|-------|
| **Card** | Contêiner de informação elevado | Resumo de dados, preview |
| **Panel** | Contêiner de formulário ou controles | Filters, settings, admin |
| **Section** | Agrupamento lógico | Grupos de cards, listas |
| **Modal** | Interrupção contextual | Confirmações, formulários críticos |

**Exemplo:**
```jsx
// Admin Dashboard
<AdminPanel>
  <SectionHeader>Filtros</SectionHeader>
  <FormField label="Data">
    <DateInput />
  </FormField>
</AdminPanel>

<Section>
  <Card>Relatório Q1</Card>
  <Card>Relatório Q2</Card>
</Section>
```

---

### **Form Roles**

| Role | Purpose | Semantic |
|------|---------|----------|
| **FormInput** | Campo de entrada | border-default, focus: border-primary |
| **FormLabel** | Rótulo de campo | text-secondary, font-medium |
| **FormError** | Mensagem de erro | color-error, aria-describedby |
| **FormHint** | Dica para usuário | text-muted, smaller font |

**Regra:** Sempre use padrão WCAG:
```jsx
<FormField>
  <FormLabel htmlFor="email">Email</FormLabel>
  <FormInput
    id="email"
    type="email"
    aria-invalid="false"
  />
  <FormHint>Use seu email corporativo</FormHint>
</FormField>

// Com erro:
<FormField>
  <FormInput
    id="email"
    aria-invalid="true"
    aria-describedby="email-error"
  />
  <FormError id="email-error">
    Email inválido
  </FormError>
</FormField>
```

---

## 🎨 Role-Based Color Mapping

| Role | Semantic Token | Color | Usage |
|------|---|---|---|
| PrimaryAction | `--action-primary-bg` | #88CE11 | CTAs, confirmações |
| SecondaryAction | `--action-secondary-border` | #88CE11 (border) | Alternativas |
| SuccessIndicator | `--indicator-success` | #10B981 | Confirmações |
| ErrorIndicator | `--indicator-error` | #E11D48 | Erros, destructive |
| WarningIndicator | `--indicator-warning` | #F59E0B | Avisos |
| InfoIndicator | `--indicator-info` | #3B82F6 | Info, tips |

**Benefício:** Uma mudança em `--action-primary-bg` = todos PrimaryAction refletem automaticamente.

---

## 📋 Checklist para Novos Componentes

Ao criar novo componente:

- [ ] Nomeado por **papel** (PrimaryAction) não **forma** (GreenButton)
- [ ] Tem **variants** documentadas (size, state, role)
- [ ] Usa **semantic tokens**, não cores direto
- [ ] Tem **state matrix** (default/loading/disabled/error)
- [ ] Segue **WCAG AA** (contrast, focus, aria)
- [ ] Explica **quando usar** (contexto)
- [ ] Mostra **exemplo real** (aplicação)

---

## 🔄 Migration Guide

Se seu projeto ainda usa form-based naming:

```
OLD NAME → NEW NAME → SEMANTIC TOKEN
═════════════════════════════════════

GreenButton → PrimaryAction → --action-primary-bg
WhiteButton → SecondaryAction → --action-secondary-border
RedButton → DestructiveAction → --action-destructive-bg
LargeInput → FormInput (size: lg) → --form-input-padding-lg
SmallBadge → SuccessIndicator (size: sm) → --indicator-success-size-sm
DarkCard → Card (variant: dark) → --card-bg-dark
```

---

## GAMA Application

### Current Components (renamed):

| Old Name | New Role | Semantic Token |
|----------|----------|---|
| Button primary | `PrimaryAction` | `--component-button-primary-bg` |
| Button secondary | `SecondaryAction` | `--component-button-secondary-border` |
| Button ghost | `GhostAction` | `--component-button-ghost-text` |
| Badge green | `SuccessIndicator` | `--indicator-success` |
| Card | `InfoCard` | `--component-card-bg` |
| Input | `FormInput` | `--component-input-bg` |

---

## Benefits

✅ **Developer clarity:** Não precisa pensar em cor, pensa em função
✅ **Consistency:** Padrão de naming reduz variações
✅ **Accessibility:** Nomes semânticos = rótulos WCAG friendly
✅ **Scalability:** Adicionar novo role é adicionar novo semantic token
✅ **Maintenance:** Mudança centralizada em um lugar

---

**Padrão adotado de:** AIOX Brandbook (role-based component naming)
**Aplicado em:** GAMA Design System v1.0.0+
