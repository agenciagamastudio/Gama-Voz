# 📋 SOP AIOS Completo — Brief → PRD → Epic → Stories → Tasks

**Framework:** Synkra AIOS + Story Development Cycle  
**Status:** Ready to Execute  
**Tempo Total:** 10-12 dias (full-time)  

---

## 🎯 FLUXO AIOS (5 ETAPAS OBRIGATÓRIAS)

```
ETAPA 1: BRIEF ← Você define (vago é OK)
          ↓
ETAPA 2: PRD ← IA escreve (baseado no brief)
          ↓
ETAPA 3: EPIC ← @pm cria (big picture)
          ↓
ETAPA 4: STORIES ← @sm escreve (requisitos detalhados)
          ↓
ETAPA 5: TASKS ← Team executa (1-2 horas cada)
```

**Nunca pule etapa!** Cada uma prepara a próxima.

---

# FASE 1: LOGO SYSTEM & FAVICON

## ETAPA 1: BRIEF (Você)

```
Título: Adicionar Logo System e Favicon ao Brandbook V2

Contexto:
- GAMA Brandbook V2 está 70% pronto
- Faltam logo em variações e favicon na aba do navegador
- Meus projetos (GAMA Voz, etc) não têm logo fixa

Objetivo:
- Adicionar 4 variações de logo (primária, negativa, monocromática, icon)
- Gerar favicon em 5 tamanhos
- Criar página /brand/logo-system com documentação
- Favicon apareça na aba do navegador (aba fica com cor/logo)

Resultado esperado:
- ✅ Logo System completo
- ✅ Favicon em browser
- ✅ Página /brand/logo-system documentada
- ✅ Clear space rules explicadas

Tempo estimado: 0.5 dia (4 horas)
```

---

## ETAPA 2: PRD (IA escreve)

**Arquivo:** `docs/prd/FASE-1-LOGO-SYSTEM-PRD.md`

```markdown
# PRD: Logo System & Favicon — GAMA Brandbook V2

## Visão Geral
Implementar sistema de logo com múltiplas variações e favicon nativo no navegador.

## Problema
- Usuários não reconhecem marca (sem logo visual consistente)
- Aba do navegador sem identidade (sem favicon)
- Logo não documentada (variações desorganizadas)

## Solução
1. Criar 4 variações de logo (primária, negativa, monocromática, icon)
2. Gerar favicon em 5 tamanhos
3. Atualizar layout.tsx com metadata de favicon
4. Criar página /brand/logo-system com documentação

## Requisitos Funcionais (FR)
- FR1: Logo primária (#88CE11) funciona em qualquer fundo
- FR2: Logo negativa (branca) funciona em fundo escuro
- FR3: Logo monocromática (preta) funciona em impressão
- FR4: Logo icon (64x512px) para favicon e social media
- FR5: Favicon aparece na aba do navegador em 5 tamanhos
- FR6: Página /brand/logo-system mostra todas as variações
- FR7: Clear space rules documentadas visualmente

## Requisitos Não-Funcionais (NFR)
- NFR1: Favicon carrega <100ms
- NFR2: Página /brand/logo-system renderiza <1s
- NFR3: Contraste WCAG AAA (logo negativa = 7:1)

## Critério de Aceitação (AC)
- AC1: Favicon aparece em tabs de navegador (Chrome, Firefox, Safari)
- AC2: 4 variações de logo aparecem em /brand/logo-system
- AC3: Clear space rules explicadas com visual
- AC4: Arquivo manifest.json criado
- AC5: Layout.tsx atualizado com metadata de favicon

## Dependências
- Nenhuma (fase standalone)

## Riscos
- Baixo risco — apenas adiciona conteúdo novo

## Timeline
- 4 horas total

## Owner
- @dev (implementação)
```

---

## ETAPA 3: EPIC (PM)

**Arquivo:** `docs/epics/EPIC-001-LOGO-SYSTEM.md`

```markdown
# EPIC-001: Logo System & Favicon

**Status:** Draft  
**PM:** @pm  
**Timeline:** 0.5 dia  
**Stories:** 4  

## Objetivo
Implementar logo system completo com favicon para navegador.

## Stories no Epic

### Story 1.1: Logo Variações Primárias
**Owner:** @dev  
**Tempo:** 1h  
**Descrição:** Criar 4 variações de logo (primária, negativa, monocromática, icon)

### Story 1.2: Favicon Geração & Setup
**Owner:** @dev  
**Tempo:** 1h  
**Descrição:** Gerar favicon 5 tamanhos, criar manifest.json, atualizar layout.tsx

### Story 1.3: Página Logo System
**Owner:** @dev  
**Tempo:** 1.5h  
**Descrição:** Criar página /brand/logo-system com documentação visual

### Story 1.4: QA & Validação
**Owner:** @qa  
**Tempo:** 0.5h  
**Descrição:** Validar favicon em navegadores, contraste, responsividade

## Critério de Sucesso
- [ ] Favicon aparece em 3+ navegadores
- [ ] Página /brand/logo-system 100% funcional
- [ ] Contraste validado (WCAG AAA)
- [ ] QA Gate PASS
```

---

## ETAPA 4: STORIES (SM)

### Story 1.1: Logo Variações Primárias

**Arquivo:** `docs/stories/1-1-logo-variacoes.md`

```markdown
# Story 1.1: Logo Variações Primárias

**Epic:** EPIC-001  
**SM:** @sm  
**Status:** Draft  
**Estimativa:** 1h  
**Owner:** @dev  

## Descrição
Criar 4 variações de logo (primária, negativa, monocromática, icon) 
prontas para uso em diferentes contextos.

## Acceptance Criteria

```
Given: Tenho logo original em Figma
When: Exporto em SVG
Then: Tenho 4 arquivos de logo prontos para web

AND: Logo primária tem fundo branco/claro ✅
AND: Logo negativa tem fundo preto/escuro ✅
AND: Logo monocromática funciona em B&W ✅
AND: Logo icon é 64x64px mínimo ✅
AND: Todos os SVGs têm <10KB ✅
AND: Nenhuma logo distorcida ou comprimida ✅
```

## Scope

### IN (Incluído)
- Exportar 4 variações de logo
- Colocar em `public/logos/`
- Validar dimensões

### OUT (Excluído)
- Redesenhar logo
- Criar variações em PNG (só SVG por agora)
- Gerar favicon aqui (story 1.2)

## File List
- [ ] public/logos/logo-primary.svg
- [ ] public/logos/logo-negative.svg
- [ ] public/logos/logo-monochrome.svg
- [ ] public/logos/logo-icon-only.svg

## Change Log
- 2026-04-17: Story criada

---

## Tasks
- [ ] Task 1.1.1: Exportar logo primária
- [ ] Task 1.1.2: Exportar logo negativa
- [ ] Task 1.1.3: Exportar logo monocromática
- [ ] Task 1.1.4: Exportar logo icon
- [ ] Task 1.1.5: Validar todos SVGs
```

### Story 1.2: Favicon Geração & Setup

```markdown
# Story 1.2: Favicon Geração & Setup

**Epic:** EPIC-001  
**SM:** @sm  
**Status:** Draft  
**Estimativa:** 1h  
**Owner:** @dev  

## Descrição
Gerar favicon em 5 tamanhos, criar manifest.json, 
atualizar layout.tsx com metadata.

## Acceptance Criteria

```
Given: Tenho logo-icon-only.svg
When: Gero favicon
Then: Tenho favicon aparecendo na aba do navegador ✅

AND: 5 tamanhos criados (16, 32, 180, 192, 512px) ✅
AND: favicon.ico funciona em histórico/bookmarks ✅
AND: apple-touch-icon.png funciona em iOS ✅
AND: icon-192.png + icon-512.png criados ✅
AND: manifest.json configurado ✅
AND: layout.tsx atualizado ✅
```

## Scope

### IN
- Gerar favicon 5 tamanhos
- Criar manifest.json
- Atualizar metadata no layout.tsx

### OUT
- Redesenhar icon
- Criar gradients complexos no favicon

## File List
- [ ] public/favicon.ico
- [ ] public/favicon-16.png
- [ ] public/favicon-32.png
- [ ] public/apple-touch-icon.png
- [ ] public/icon-192.png
- [ ] public/icon-512.png
- [ ] public/manifest.json
- [ ] src/app/layout.tsx (modificado)

## Tasks
- [ ] Task 1.2.1: Gerar favicon 5 tamanhos
- [ ] Task 1.2.2: Criar manifest.json
- [ ] Task 1.2.3: Atualizar layout.tsx
- [ ] Task 1.2.4: Testar em navegadores
```

### Story 1.3: Página Logo System

```markdown
# Story 1.3: Página Logo System

**Epic:** EPIC-001  
**SM:** @sm  
**Status:** Draft  
**Estimativa:** 1.5h  
**Owner:** @dev  

## Descrição
Criar página /brand/logo-system com visualização de todas as 
variações de logo e documentação de regras de uso.

## Acceptance Criteria

```
Given: Tenho 4 logos em public/logos/
When: Acesso /brand/logo-system
Then: Vejo todas as 4 variações ✅

AND: Cada variação tem descrição de uso ✅
AND: Clear space rules explicadas visualmente ✅
AND: Dimensões mínimas documentadas ✅
AND: Contraste validado (WCAG AAA) ✅
AND: Página responsiva (mobile, tablet, desktop) ✅
```

## Scope

### IN
- Criar página /brand/logo-system
- Mostrar 4 variações
- Documentar uso + clear space + dimensões

### OUT
- Gerar PDF de logo guidelines
- Criar Figma artboard
- Traduzir em outras línguas

## File List
- [ ] src/app/brand/logo-system/page.tsx

## Tasks
- [ ] Task 1.3.1: Criar página TypeScript
- [ ] Task 1.3.2: Implementar visualização 4 logos
- [ ] Task 1.3.3: Documentar clear space rules
- [ ] Task 1.3.4: Testar responsividade
```

### Story 1.4: QA & Validação

```markdown
# Story 1.4: QA & Validação

**Epic:** EPIC-001  
**Status:** Draft  
**Estimativa:** 0.5h  
**Owner:** @qa  

## Descrição
Validar favicon em navegadores, contraste WCAG AAA, 
responsividade página logo system.

## Acceptance Criteria

```
Given: Desenvolvimento de stories 1.1-1.3 completo
When: Executo testes
Then: Todos testes passam ✅

AND: Favicon aparece em Chrome ✅
AND: Favicon aparece em Firefox ✅
AND: Favicon aparece em Safari ✅
AND: Logo negativa contraste = 7:1 ✅
AND: Página logo-system carrega <1s ✅
AND: Mobile view funciona (320px) ✅
```

## QA Gate Checklist
- [ ] Code review (padrões, legibilidade)
- [ ] Unit tests (funções renderizam)
- [ ] AC tests (todos ACs atendidos)
- [ ] No regressions (outras páginas OK)
- [ ] Performance (< 1s load)
- [ ] Accessibility (WCAG AA mínimo)
- [ ] Documentation (README atualizado)

## Decision: PASS / FAIL
```

---

## ETAPA 5: TASKS (@dev executa)

### Task 1.1.1: Exportar logo primária

```markdown
# Task 1.1.1: Exportar logo primária

**Story:** 1.1  
**Estimativa:** 15 min  
**Status:** Ready  

## O que fazer
1. Abrir Figma → GAMA Brandbook → Logo artboard
2. Selecionar logo primária (#88CE11 color)
3. Exportar como SVG → public/logos/logo-primary.svg
4. Validar tamanho: 300x80px (horizontal)
5. Remover metadata desnecessária

## Resultado esperado
- Arquivo: public/logos/logo-primary.svg
- Tamanho: <5KB
- Dimensões: 300x80px (mantém proporção)
- Sem distorção ou compressão

## Teste
```bash
npm run dev
# Abrir em navegador: /brand/logo-system
# Verificar: Logo primária carrega corretamente
```

## Próximo: Task 1.1.2
```

*(Repetiria para 1.1.2, 1.1.3, 1.1.4, 1.2.1, etc)*

---

# FASES 2-6 SEGUEM MESMO PADRÃO

## FASE 2: MANIFESTO & POSICIONAMENTO

```
BRIEF (você):
- Objetivo: Documentar missão, visão, valores, posicionamento
- Tempo: 2 dias

PRD (IA escreve):
- Requisitos: 6 seções (missão, visão, 5 valores, posicionamento)
- AC: Todas seções preenchidas, design bonito, responsivo

EPIC (PM):
- 2 stories: (2.1) Manifesto, (2.2) Posicionamento
- Timeline: 2 dias

STORIES (SM):
- Story 2.1: Escrever + documentar Manifesto (1 dia)
- Story 2.2: Escrever + documentar Posicionamento (1 dia)

TASKS (@dev):
- Task 2.1.1: Escrever Missão (1h)
- Task 2.1.2: Escrever Visão (1h)
- Task 2.1.3: Definir 5 Valores (1h)
- Task 2.1.4: Criar página /brand/manifest (2h)
- Task 2.2.1: Escrever Posicionamento (1h)
- Task 2.2.2: Documentar Diferencial (1h)
- Task 2.2.3: Criar página /brand/positioning (2h)
```

---

## FASE 3: TONE OF VOICE EXPANDIDO

```
BRIEF: Expandir voice com headlines, CTAs, microcopy, errors
PRD: 4 seções + exemplos práticos
EPIC-003: 1 story (voice expansion)
STORIES: Story 3.1 (4 horas)
TASKS: 4 tasks (1h cada)
```

---

## FASE 4: ACESSIBILIDADE WCAG

```
BRIEF: Documentar contraste, alt-text, navegação teclado
PRD: 5 seções + checklist interativo
EPIC-004: 2 stories
STORIES: Story 4.1 (doc), Story 4.2 (checklist)
TASKS: 5-6 tasks (1-2h cada)
```

---

## FASE 5: COMPONENTES & LAYOUTS

```
BRIEF: Documentar estados button + layout patterns
PRD: 2 páginas visuais
EPIC-005: 2 stories
STORIES: Story 5.1 (buttons), Story 5.2 (layouts)
TASKS: 6-8 tasks
```

---

## FASE 6: VISUAL LANGUAGE + DOWNLOADS

```
BRIEF: Documentar illustration, fotografia, padrões, downloads
PRD: 3 seções + links de download
EPIC-006: 2 stories
STORIES: Story 6.1 (visual), Story 6.2 (downloads)
TASKS: 5-6 tasks
```

---

# 🎬 COMO EXECUTAR

## Opção 1: Com Agentes AIOS (Recomendado)

```bash
# Session 1: Brief → PRD (Ias escreve)
@pm *create-epic "EPIC-001-LOGO-SYSTEM"

# Session 2: PRD → Epic (PM)
# [PM lê PRD e cria estrutura de epic]

# Session 3: Epic → Stories (SM)
@sm *draft "STORY-1-1-LOGO-VARIACOES"
@sm *draft "STORY-1-2-FAVICON"
# etc...

# Session 4: Stories → QA (PO)
@po *validate-story-draft STORY-1-1
@po *validate-story-draft STORY-1-2
# etc...

# Session 5+: Stories → Dev (Dev)
@dev *develop STORY-1-1
@dev *develop STORY-1-2
# etc...

# Session Final: QA Gate
@qa *qa-gate STORY-1-1
@qa *qa-gate STORY-1-2
```

## Opção 2: Manual (Self-contained)

```bash
# 1. Criar pasta docs/
mkdir -p docs/prd docs/epics docs/stories docs/tasks

# 2. Preencher templates (copia de SOP-6-FASES.md)
# - docs/prd/FASE-1-LOGO-SYSTEM-PRD.md
# - docs/epics/EPIC-001-LOGO-SYSTEM.md
# - docs/stories/1-1-logo-variacoes.md
# - docs/stories/1-2-favicon.md
# - docs/stories/1-3-logo-system-page.md
# - docs/stories/1-4-qa-validation.md

# 3. Executar tasks sequencialmente
# - Ler task
# - Executar
# - Marcar [x] completo

# 4. QA Gate
# - Testar resultado
# - Validar AC
# - Aprovar ou rejeitar
```

---

# 📊 ESTRUTURA DE ARQUIVOS

```
GAMA_BRANDBOOK_V2/
├── docs/
│   ├── prd/
│   │   ├── FASE-1-LOGO-SYSTEM-PRD.md
│   │   ├── FASE-2-MANIFESTO-PRD.md
│   │   ├── FASE-3-VOICE-PRD.md
│   │   ├── FASE-4-A11Y-PRD.md
│   │   ├── FASE-5-COMPONENTS-PRD.md
│   │   └── FASE-6-VISUAL-PRD.md
│   ├── epics/
│   │   ├── EPIC-001-LOGO-SYSTEM.md
│   │   ├── EPIC-002-MANIFESTO.md
│   │   ├── EPIC-003-VOICE.md
│   │   ├── EPIC-004-A11Y.md
│   │   ├── EPIC-005-COMPONENTS.md
│   │   └── EPIC-006-VISUAL.md
│   └── stories/
│       ├── 1-1-logo-variacoes.md
│       ├── 1-2-favicon.md
│       ├── 1-3-logo-system-page.md
│       ├── 1-4-qa-validation.md
│       ├── 2-1-manifesto.md
│       ├── 2-2-positioning.md
│       ├── 3-1-voice-expansion.md
│       ├── 4-1-a11y-docs.md
│       ├── 4-2-a11y-checklist.md
│       ├── 5-1-button-states.md
│       ├── 5-2-layouts.md
│       ├── 6-1-visual-language.md
│       └── 6-2-downloads.md
├── SOP-6-FASES.md
├── SOP-AIOS-COMPLETO.md
└── gama-ds-platform/
    ├── src/app/
    │   ├── brand/
    │   │   ├── logo-system/page.tsx
    │   │   ├── manifest/page.tsx
    │   │   ├── positioning/page.tsx
    │   │   ├── visual-language/page.tsx
    │   │   └── downloads/page.tsx
    │   ├── foundations/
    │   │   └── accessibility/page.tsx
    │   └── components/
    │       ├── button-states/page.tsx
    │       └── layouts/page.tsx
    └── layout.tsx (favicon metadata)
```

---

# 🚀 PRÓXIMO PASSO

**Escolha uma opção:**

### Opção A: AIOS Completo (Equipe)
```
Criar PRDs → EPICs → STORIEs → Tasks
Usar agentes @pm, @sm, @po, @dev, @qa
Timeline: 10-12 dias (collaborative)
```

### Opção B: Self-Contained (1 pessoa)
```
Ler SOP-6-FASES.md
Executar tasks sequencialmente
Timeline: 10-12 dias (full-time) ou 3-4 semanas (part-time)
```

### Opção C: Híbrido (Recomendado)
```
Phase 1: Você escreve 1 BRIEF manual
Phase 2: IA (eu) escrevo PRD
Phase 3-5: Manual execution com SOP-6-FASES.md
Phase 6: QA com @qa
Timeline: 8-10 dias
```

---

**Status:** 📋 SOP AIOS PRONTO  
**Próximo:** Escolher opção A, B ou C  
**Arquivo referência:** SOP-6-FASES.md (implementação)  
**Arquivo estrutura:** Este (SOP-AIOS-COMPLETO.md)
