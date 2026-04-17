# 🎯 Como Usar o SOP AIOS Completo

**Você tem DOIS SOPs agora:**

| SOP | Para quê | Quando usar |
|-----|----------|-----------|
| **SOP-6-FASES.md** | Implementação passo-a-passo (Step 1.1, 1.2, etc) | Você desenvolvendo code |
| **SOP-AIOS-COMPLETO.md** | Estrutura Brief→PRD→Epic→Stories→Tasks | Você coordenando equipe OU entendendo processo completo |

---

# 📚 FLUXO RECOMENDADO

## 🚀 Opção A: AIOS Completo (Com Equipe)

```
VOCÊ                     IA / AGENTES                   RESULTADO
└─ Escreve BRIEF    →   @pm escreve PRD        →      docs/prd/FASE-1-*.md
                         ↓
                    @pm cria EPIC            →      docs/epics/EPIC-001.md
                         ↓
                    @sm cria STORIES         →      docs/stories/1-1.md, 1-2.md, ...
                         ↓
                    @po valida STORIES       →      Status: Ready
                         ↓
                    @dev executa STORIES     →      Code em gama-ds-platform/
                         ↓
                    @qa valida (QA Gate)     →      Status: PASS ✅
```

**Timeline:** 10-12 dias (paralelo com agentes)

**Como fazer:**
1. Abra `SOP-AIOS-COMPLETO.md` → Seção "ETAPA 1: BRIEF"
2. Preencha com seu contexto (você escreve, IA adapta)
3. Ative agentes: `@pm *create-epic "EPIC-001-LOGO-SYSTEM"`
4. Cada agente segue PRD/EPIC/STORIES do SOP

---

## 🎯 Opção B: Self-Contained (1 Pessoa)

```
SOP-6-FASES.md
    ↓
Lê Step 1.1
    ↓
Executa (copia código template)
    ↓
Testa
    ↓
Lê Step 1.2
    ↓
(Repetiria...)
```

**Timeline:** 10-12 dias (full-time) ou 3-4 semanas (part-time)

**Como fazer:**
1. Abra `SOP-6-FASES.md` → Seção "FASE 1"
2. Leia Step 1.1, 1.2, 1.3, etc
3. Copia/adapta código template de cada step
4. Testa em `http://localhost:3008`
5. Move para próxima fase

---

## 🔀 Opção C: Híbrido (Recomendado!)

```
FASE 1: Você escreve BRIEF manual
FASE 2: IA escreve PRD (eu leio seu brief e expando)
FASE 3-6: Você executa com SOP-6-FASES.md
FINAL: @qa valida

Timeline: 8-10 dias (você + IA collaborativo)
```

**Como fazer:**
1. Leia `SOP-AIOS-COMPLETO.md` → Entenda o fluxo completo
2. Escreva um BRIEF simples (2-3 parágrafos) por fase
3. Eu (IA) leio e escrevo PRD expandido
4. Você pega SOP-6-FASES.md e executa code
5. Quando terminar fase, eu valido ou passo PRD pra agentes

---

# 📋 PASSO A PASSO: COMO COMEÇAR AGORA

## FASE 1: Logo System (0.5 dia)

### Se você escolher **Opção A (AIOS):**

```bash
# 1. Copiar template BRIEF de SOP-AIOS-COMPLETO.md
#    Seção "ETAPA 1: BRIEF" da FASE 1

# 2. Adaptar com seu contexto (copie/cole):

---BRIEF---
Título: Adicionar Logo System e Favicon ao Brandbook V2

Contexto:
- GAMA Brandbook V2 está 70% pronto
- Faltam logo em variações e favicon na aba do navegador
- Meus projetos (GAMA Voz, etc) não têm logo fixa

Objetivo:
- Adicionar 4 variações de logo
- Gerar favicon em 5 tamanhos
- Criar página /brand/logo-system
- Favicon apareça na aba do navegador

Tempo: 0.5 dia
---

# 3. Entregar pra IA (eu) escrever PRD
# 4. Mandar PRD pra @pm criar EPIC
# 5. Deixar agentes executarem
```

### Se você escolher **Opção B (Self):**

```bash
# 1. Abra SOP-6-FASES.md
# 2. Procure "FASE 1: Logo System"
# 3. Procure "Step 1.1: Preparar Arquivos de Logo"
# 4. Execute:

# a) Criar pasta:
mkdir -p gama-ds-platform/public/logos

# b) Copiar/criar logo files (SVG)
# - logo-primary.svg
# - logo-negative.svg
# - logo-monochrome.svg
# - logo-icon-only.svg

# c) Gerar favicon (usando RealFaviconGenerator.net OU ffmpeg)

# d) Copiar code template de Step 1.3 e atualizar layout.tsx

# e) Copiar code template de Step 1.5 e criar página

# f) Testar: npm run dev → http://localhost:3008/brand/logo-system
```

### Se você escolher **Opção C (Híbrido):**

```bash
# 1. Leia SOP-AIOS-COMPLETO.md inteiro (5 min)
#    Entenda: Brief → PRD → Epic → Stories → Tasks

# 2. Escreva um BRIEF simples (copiar template + adaptar):

---BRIEF SIMPLES---
Objetivo: Adicionar logo system e favicon
Contexto: Brandbook precisa ter logo visual
Tempo: 0.5 dia
Resultado: Logo em 4 variações + favicon na aba
---

# 3. Você manda brief pra IA (eu) escrever PRD

# 4. Depois de receber PRD, você executa com SOP-6-FASES.md

# 5. Quando terminar, IA valida ou passa pra @qa
```

---

# 🗂️ REFERÊNCIA RÁPIDA

## Arquivo 1: SOP-6-FASES.md

```
Use quando: "Como faço o código?"

Estrutura:
├── FASE 1: Logo System
│   ├── Objetivo
│   ├── Checklist
│   └── Step 1.1, 1.2, 1.3, ... (COM CÓDIGO TEMPLATE)
├── FASE 2: Manifesto & Posicionamento
│   └── ...
├── FASE 3: Tone of Voice
│   └── ...
└── (etc)
```

**Exemplo de uso:**
```
Procuro: FASE 1 → Step 1.1 → Encontro:
  
  #### Step 1.1: Preparar Arquivos de Logo
  
  **Local:** `gama-ds-platform/public/logos/`
  
  ```bash
  mkdir -p public/logos
  ```
  
  Copia/adapta esse comando ✅
```

---

## Arquivo 2: SOP-AIOS-COMPLETO.md

```
Use quando: "Qual é a estrutura completa?"
             "Como dou mais contexto pra IA?"
             "Quero entender Brief → PRD → Epic → Stories → Tasks"

Estrutura:
├── Fluxo AIOS (5 etapas)
├── FASE 1 detalhada:
│   ├── ETAPA 1: BRIEF (você escreve)
│   ├── ETAPA 2: PRD (IA escreve)
│   ├── ETAPA 3: EPIC (PM cria)
│   ├── ETAPA 4: STORIES (SM escreve)
│   └── ETAPA 5: TASKS (@dev executa)
├── FASES 2-6 (estrutura)
└── 3 Opções de execução
```

**Exemplo de uso:**
```
Procuro: FASE 1 → ETAPA 1: BRIEF → Encontro:

  ```
  Título: Adicionar Logo System e Favicon ao Brandbook V2
  
  Contexto:
  - GAMA Brandbook V2 está 70% pronto
  - Faltam logo em variações...
  ```
  
  Copia/adapta pra seu projeto ✅
  Manda pra IA escrever PRD ✅
```

---

# 🎯 RECOMENDAÇÃO FINAL

### Para Iniciante (Primeira vez com AIOS)
→ **Opção C (Híbrido)** — Aprende o processo com ajuda

### Para Dev Solo
→ **Opção B (Self)** — SOP-6-FASES.md é seu guia

### Para Equipe
→ **Opção A (AIOS)** — Usa agentes, PRDs, EPICs, Stories

---

# 📞 TL;DR

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Quer implementação code puro?                         │
│  → Abra SOP-6-FASES.md                                 │
│                                                         │
│  Quer entender workflow AIOS completo?                │
│  → Abra SOP-AIOS-COMPLETO.md                           │
│                                                         │
│  Quer começar agora, FASE 1?                           │
│  → Vá em SOP-6-FASES.md → "FASE 1" → "Step 1.1"      │
│                                                         │
│  Quer trabalhar em equipe com agentes?                 │
│  → Leia SOP-AIOS-COMPLETO.md → "ETAPA 1: BRIEF"     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

**Próximo:** Escolha opção A, B ou C e comece! 🚀
