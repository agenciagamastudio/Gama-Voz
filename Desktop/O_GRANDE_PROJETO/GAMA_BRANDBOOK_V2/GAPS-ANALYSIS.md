# 📊 GAPS ANALYSIS — GAMA Brandbook V2 vs Template Completo

**Data:** 17 de Abril de 2026  
**Objetivo:** Identificar o que falta no Brandbook V2 para ser 100% completo  
**Base:** BRAND-GUIDELINE-TEMPLATE.md (14 seções + 6 fases)  

---

## 🎯 RESUMO EXECUTIVO

O Brandbook V2 tem uma **boa base** (foundations, components, brand, voice), mas faltam:
- ✅ **14%** — Logo System (variações, uso correto)
- ✅ **14%** — Brand Assets (favicon, social media assets)
- ✅ **14%** — Proof/Evidence (números, casos de sucesso)
- ✅ **14%** — Complementary (ilustrações, fotografia, padrões)
- ✅ **14%** — Accessibility Guidelines (WCAG AA, alt-text, focus states)
- ✅ **14%** — Tone of Voice Completo (microcopy, error messages)
- ✅ **6%** — Misc (animações, micro-interações)

---

## 📋 FASE 1: IDENTIDADE VISUAL

### ✅ O que você JÁ tem:

| Item | Onde está | Status |
|------|-----------|--------|
| Cores semânticas | `/foundations/colors` | ✅ Completo |
| Tipografia | `/foundations/typography` | ✅ Completo |
| Spacing/Grid | `/foundations/spacing` | ✅ Completo |
| Ícones (Lucide) | Componentes | ✅ Referenciado |
| Design Tokens | `/design-tokens/tokens.json` | ✅ Estruturado |

### ❌ O que FALTA:

| # | Item | Prioridade | Detalhes |
|---|------|-----------|----------|
| 1 | **Logo System** | 🔴 ALTA | Você tem 1 logo, mas não tem:<br>- Logo negativa (branco em escuro)<br>- Logo monocromática (preto puro)<br>- Variações (horizontal, vertical, ícone only)<br>- Marca + Wordmark separados<br>- Clear space rules (mínimo espaçamento) |
| 2 | **Favicon** | 🔴 ALTA | Browser tab logo faltando<br>- Favicon .ico<br>- Apple touch icon (180x180)<br>- Android chrome icon (192x192, 512x512)<br>- manifest.json com metadata |
| 3 | **Logo na Landing** | 🟠 MÉDIA | Landing page não tem logo visual<br>- Descrever como logo é usado<br>- Exemplo de aplicação |

---

## 📋 FASE 2: DEFINIÇÃO DE MARCA

### ✅ O que você JÁ tem:

| Item | Onde está | Status |
|------|-----------|--------|
| Core Belief/Manifesto | `/brand/identity` | ✅ Começa aqui |
| Tom de Voz | `/brand/voice` | ✅ Tem base |
| Posicionamento | Implícito em conteúdo | ⚠️ Não documentado |
| Arquétipo | `brand/identity` (Criança Interior) | ✅ Tem descrição |

### ❌ O que FALTA:

| # | Item | Prioridade | Detalhes |
|---|------|-----------|----------|
| 1 | **Manifesto Estruturado** | 🟠 MÉDIA | Você tem "Criança Interior" mas faltam:<br>- Missão em 1 frase clara<br>- Visão em 1 frase (2027-2028)<br>- 3-5 Valores principais<br>- Promessa ao cliente (o que garante)<br>→ Colocar em `/brand/manifest` |
| 2 | **Posicionamento Documento** | 🟠 MÉDIA | "Somos a [categoria] que [diferencial]"<br>- Diferencial competitivo (3-5 pontos)<br>- Público-alvo primário/secundário<br>- Proposta de valor única<br>→ Nova página: `/brand/positioning` |
| 3 | **Archetype Expandido** | 🟡 BAIXA | Você tem Criança Interior, mas faltam:<br>- Traços de personalidade (5-7)<br>- Se fosse uma pessoa (idade, profissão, hobby, filosofia)<br>- Superpoder (o que sabe fazer melhor)<br>→ Expandir seção atual |

---

## 📋 FASE 3: COMPONENTES VISUAIS

### ✅ O que você JÁ tem:

| Item | Onde está | Status |
|------|-----------|--------|
| Botões (primário, secundário) | `/components/atoms/buttons` | ✅ Implementado |
| Inputs/Forms | `/components/atoms/inputs` | ✅ Implementado |
| Cards/Containers | `/components` | ✅ Implementado |
| Notificações | Implícito em componentes | ⚠️ Não catalogado |

### ❌ O que FALTA:

| # | Item | Prioridade | Detalhes |
|---|------|-----------|----------|
| 1 | **Estados de Botão** | 🟠 MÉDIA | Documentar visualmente:<br>- Normal / Hover / Active / Disabled<br>- Cada nível (primário, secundário, tertiary)<br>- Diferentes tamanhos (sm, md, lg)<br>→ Página: `/components/buttons-states` |
| 2 | **Modal/Dialog Padrão** | 🟠 MÉDIA | Faltam componentes UI:<br>- Modal de confirmação<br>- Modal com formulário<br>- Close button padrão<br>- Animação entrada/saída<br>→ Página: `/components/modals` |
| 3 | **Notificações Completas** | 🟡 BAIXA | Documentar:<br>- Toast (success, warning, error, info)<br>- Alerts (banner at top)<br>- Posição padrão (canto superior direito)<br>- Duração do desaparecimento<br>→ Página: `/components/notifications` |

---

## 📋 FASE 4: ESTRUTURA & LAYOUT

### ✅ O que você JÁ tem:

| Item | Onde está | Status |
|------|-----------|--------|
| Grid System | `/foundations/spacing` | ✅ Documentado |
| Breakpoints | `tailwind.config.js` | ✅ Configurado |
| Spacing Scale | `/foundations/spacing` | ✅ xs, sm, md, lg, xl |

### ❌ O que FALTA:

| # | Item | Prioridade | Detalhes |
|---|------|-----------|----------|
| 1 | **Layout Patterns Documentados** | 🟠 MÉDIA | Mostrar visualmente:<br>- Hero Section (altura, imagem, CTA)<br>- Featured Section (grid 2/3 cols)<br>- Card Grid (tamanho padrão)<br>- Sidebar Layout (quando usar)<br>→ Página: `/components/layouts` |
| 2 | **Responsividade Guia** | 🟡 BAIXA | Documentar como cada componente muda em mobile<br>- Mobile-first approach<br>- Breakpoints cascade (320px, 768px, 1024px, 1440px)<br>- Safe areas (notches em iOS)<br>→ Página: `/foundations/responsive` |

---

## 📋 FASE 5: COMUNICAÇÃO & ACESSIBILIDADE

### ✅ O que você JÁ tem:

| Item | Onde está | Status |
|------|-----------|--------|
| Tom de Voz | `/brand/voice` | ✅ Básico |
| Contraste de Cores | Design tokens | ✅ Validado WCAG AAA |
| Alt-text padrão | Implícito | ⚠️ Não documentado |

### ❌ O que FALTA:

| # | Item | Prioridade | Detalhes |
|---|------|-----------|----------|
| 1 | **Tone of Voice Expandido** | 🟠 MÉDIA | O que você tem é básico. Faltam exemplos:<br>- Headlines (H1, H2, H3) — como escrever<br>- CTAs efetivas (verbo + benefício)<br>- Microcopy (labels, placeholders, help text)<br>- Error messages (como avisar erros)<br>- Success messages (celebração)<br>→ Expandir `/brand/voice` |
| 2 | **Acessibilidade Completa** | 🟠 MÉDIA | Documentar (novo):<br>- Contraste mínimo (seus ratios)<br>- Tamanho de fonte mínima (12px)<br>- Alt-text padrão para cada tipo de imagem<br>- Navegação por teclado (Tab order)<br>- Focus state (bem visível)<br>- Respeitar `prefers-reduced-motion`<br>- Cores não são único indicador<br>→ Nova página: `/foundations/accessibility` |
| 3 | **Checklist de Acessibilidade** | 🟡 BAIXA | Colocar checklist visual:<br>- [ ] Testado com NVDA<br>- [ ] Navegação por teclado OK<br>- [ ] Contraste validado<br>- [ ] Alt-text em todas imagens<br>→ Página: `/foundations/accessibility-checklist` |

---

## 📋 FASE 6: EVIDÊNCIA & COMPLEMENTARES

### ✅ O que você JÁ tem:

| Item | Onde está | Status |
|---|------|-----------|--------|
| Números (stats) | `/` (homepage) | ✅ 8, 6, 7, 20+ |
| Aplicações reais | `/brand/applications` | ✅ Cartão, Instagram, LinkedIn, Email |

### ❌ O que FALTA:

| # | Item | Prioridade | Detalhes |
|---|------|-----------|----------|
| 1 | **Logo Files & Downloads** | 🔴 ALTA | Falta página de download:<br>- Logo SVG (primária, negativa, monocromática)<br>- Logo PNG (vários tamanhos)<br>- Favicon pack<br>- Brand guidelines PDF<br>→ Nova página: `/brand/downloads` |
| 2 | **Ilustração & Fotografia Padrão** | 🟠 MÉDIA | Documentar estilo visual:<br>- Tipo de ilustração (flat, 3D, lineart?)<br>- Paleta de cores de ilustrações<br>- Estilo de fotografia (corporativo, lifestyle, etc)<br>- Exemplo de cada tipo<br>→ Nova página: `/brand/visual-language` |
| 3 | **Padrões Gráficos** | 🟡 BAIXA | Mostrar padrões visuais:<br>- Formas recorrentes (triângulos, círculos)<br>- Linhas decorativas<br>- Padrões de fundo<br>- Quando usar cada um<br>→ Expandir `/brand/visual-language` |
| 4 | **Casos de Sucesso/Testimoniais** | 🟡 BAIXA | Você não tem (opcional, mas bom ter):<br>- 3-5 casos de sucesso<br>- Depoimentos de clientes<br>- Números (crescimento, satisfação)<br>→ Página: `/brand/evidence` |

---

## 🎯 PRIORIZAÇÃO — FAÇA NESTA ORDEM

### 🔴 **URGENTE** (Impacto alto, fácil fazer)

| # | Item | Esforço | Semanas |
|---|------|---------|---------|
| 1 | Favicon + Logo variações | 2-4h | 0.5 dia |
| 2 | Logo System page | 4-6h | 1 dia |
| 3 | Accessibility page (WCAG) | 6-8h | 1 dia |
| 4 | Tone of Voice Expandido | 4-6h | 1 dia |

**Total urgente:** ~3-4 dias

---

### 🟠 **IMPORTANTE** (Médio impacto, médio esforço)

| # | Item | Esforço | Semanas |
|---|------|---------|---------|
| 5 | Manifesto Estruturado | 4-6h | 1 dia |
| 6 | Posicionamento Document | 4-6h | 1 dia |
| 7 | Visual Language (ilustração, fotografia) | 6-8h | 1 dia |
| 8 | Layout Patterns Visuais | 6-8h | 1 dia |
| 9 | Downloads/Assets Page | 4-6h | 1 dia |

**Total importante:** ~5-6 dias

---

### 🟡 **LEGAL** (Baixo impacto, pode deixar pra depois)

| # | Item | Esforço | Semanas |
|---|------|---------|---------|
| 10 | Archetype Expandido | 2-4h | 0.5 dia |
| 11 | Padrões Gráficos | 3-5h | 0.5 dia |
| 12 | Casos de Sucesso/Testimoniais | 4-6h | 1 dia |
| 13 | Responsiveness Guide | 3-5h | 0.5 dia |

**Total legal:** ~3-4 dias (opcional)

---

## 📝 CHECKLIST ETAPA POR ETAPA

### ETAPA 1: Logo & Brand Assets (0.5 dia)

- [ ] Criar favicon (16x16, 32x32, 180x180, 192x192, 512x512)
- [ ] Criar logo negativa (branco em escuro)
- [ ] Criar logo monocromática (preto puro)
- [ ] Criar página `/brand/logo-system`
- [ ] Adicionar favicon ao `layout.tsx`
- [ ] Documentar clear space rules

### ETAPA 2: Documentação de Marca (2 dias)

- [ ] Escrever Manifesto estruturado (missão, visão, valores, promessa)
- [ ] Descrever Posicionamento em 1 frase + diferenciais
- [ ] Expandir Archetype com traços de personalidade
- [ ] Criar páginas: `/brand/manifest`, `/brand/positioning`

### ETAPA 3: Comunicação Expandida (1.5 dias)

- [ ] Documentar Headlines (H1, H2, H3) com exemplos
- [ ] Documentar CTAs efetivas (verbo + benefício)
- [ ] Documentar Microcopy (labels, placeholders, help text, errors)
- [ ] Expandir `/brand/voice`
- [ ] Criar página `/tone-of-voice` (com exemplos visuais)

### ETAPA 4: Acessibilidade (1.5 dias)

- [ ] Documentar contraste mínimo (WCAG AA)
- [ ] Documentar alt-text padrão por tipo de imagem
- [ ] Documentar focus states (bem visível)
- [ ] Documentar navegação por teclado
- [ ] Criar página `/foundations/accessibility`
- [ ] Criar checklist interativo

### ETAPA 5: Componentes & Layouts (1.5 dias)

- [ ] Documentar estados de botão (normal, hover, active, disabled)
- [ ] Criar página `/components/buttons-states` com visuals
- [ ] Documentar Layout Patterns (hero, featured, grid, sidebar)
- [ ] Criar página `/components/layouts`
- [ ] Criar Modal/Dialog padrão se não existir

### ETAPA 6: Visual Language & Downloads (1.5 dias)

- [ ] Descrever estilo de ilustração (flat? 3D? lineart?)
- [ ] Descrever estilo de fotografia (corporativo? lifestyle?)
- [ ] Descrever padrões gráficos recorrentes
- [ ] Criar página `/brand/visual-language`
- [ ] Criar página `/brand/downloads` (logo SVG, PNG, favicon, PDF)

---

## 📊 ANTES vs DEPOIS

### Antes (Agora):
```
Brandbook V2
├── ✅ Foundations (cores, tipografia, spacing)
├── ✅ Components (atoms, molecules, organisms)
├── ✅ Brand Identity (logo, voice, archetype básico)
├── ✅ Brand Applications (cartão, rede social, email)
├── ✅ Design Tokens (JSON, CSS, Tailwind)
└── ❌ Falta: Logo system, Favicon, Acessibilidade, Tone of Voice expandido
```

### Depois (Objetivo):
```
Brandbook V2 COMPLETO
├── ✅ Foundations (cores, tipografia, spacing, acessibilidade)
├── ✅ Components (atoms com todos os estados, layouts, modals)
├── ✅ Brand Identity (logo system completo, manifesto, posicionamento, archetype)
├── ✅ Brand Voice (tone expandido, microcopy, CTAs, error messages)
├── ✅ Brand Applications (cartão, rede social, email, presentações)
├── ✅ Visual Language (ilustração, fotografia, padrões)
├── ✅ Evidence & Proof (casos, testimoniais, números)
└── ✅ Downloads (logo files, favicon, brand guidelines PDF)
```

---

## 🚀 PRÓXIMO PASSO

**Qual etapa você quer começar?**

1. **Etapa 1: Logo & Favicon** (0.5 dia, impacto visual imediato)
2. **Etapa 2: Manifestoo & Posicionamento** (2 dias, define brand strengths)
3. **Etapa 3: Tone of Voice Expandido** (1.5 dias, ajuda time a comunicar melhor)
4. **Etapa 4: Acessibilidade** (1.5 dias, importante pra inclusão)
5. **Etapa 5: Componentes & Layouts** (1.5 dias, melhora dev experience)
6. **Etapa 6: Visual Language** (1.5 dias, define estilo visual completo)

Ou quer fazer **tudo em paralelo** com equipe?

---

**Status:** 📋 Análise Completa  
**Tempo total:** ~10-12 dias (equipe full-time) ou ~3-4 semanas (1 pessoa part-time)  
**Próximo:** Escolher etapa e começar
