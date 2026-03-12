# 👑 Plano de Orquestração — GAMA Financeiro

**Orquestrador:** @aios-master
**Início:** 2026-03-09
**Status:** 🔴 Em Execução

---

## 🎯 Objetivo
Construir sistema web de controle financeiro (DRE) com:
- React frontend + Node.js backend + SQLite
- Design System validado com usuário
- Desenvolvimento autônomo entre agentes
- Ponto único de validação: **Design System (UI/UX)**

---

## 🤝 Divisão de Responsabilidades

### 1️⃣ @architect (Ana) — Design Técnico
**Responsabilidade:** Definir arquitetura completa do sistema

**Tarefas:**
- [x] Diagramar arquitetura (frontend, backend, DB)
- [x] Especificar API RESTful (endpoints, schemas)
- [x] Padrões de design (MVC, autenticação, estado)
- [x] Fluxo de dados (frontend → backend → DB)
- [x] Tratamento de erros e validações
- [x] Performance e segurança

**Outputs:**
- [x] `docs/architecture/system-design.md` ✅
- [x] `docs/architecture/api-spec.yaml` ✅
- [x] `docs/architecture/data-flow.md` ✅
- [x] `docs/architecture/security-strategy.md` ✅

**Dependências:** Nenhuma (inicia paralelamente)
**Bloqueadores:** Nenhum
**Timeline:** Dia 1-2 ✅ COMPLETE
**Status:** 🟢 DONE (2026-03-09 15:45 UTC)

---

### 2️⃣ @data-engineer (Dara) — Database & Schema
**Responsabilidade:** Persistência e integridade de dados

**Tarefas:**
- [x] Analisar CSV original (estrutura DRE)
- [x] Desenhar schema relacional (tabelas, índices)
- [x] Migrations e versionamento DB
- [x] Seed data (importar dados do CSV)
- [x] Queries otimizadas (cálculos, relatórios)
- [x] RLS e constraints

**Outputs Entregues:**
- ✅ `src/backend/db/schema.sql` (7 tabelas + views + triggers + 14 índices)
- ✅ `src/backend/db/migrations/001_initial_schema.sql` (versionamento)
- ✅ `src/backend/scripts/init-db.js` (inicializar banco)
- ✅ `src/backend/scripts/seed-db.js` (importar CSV)
- ✅ `src/backend/models/constants.js` (enums reutilizáveis)
- ✅ `docs/database/schema-design.md` (documentação completa)
- ✅ `docs/database/queries.sql` (20+ queries prontas)
- ✅ `src/backend/db/README.md` (guia de uso)
- ✅ `DB-SCHEMA-STATUS.md` (status de conclusão)

**Status:** ✅ **100% COMPLETO** (2026-03-09 14:35 UTC)
**Dependências:** Nenhuma (completado autonomamente)
**Bloqueadores:** Nenhum
**Timeline:** Dia 1-2 ✓

---

### 3️⃣ @ux-design-expert (Zara) — Design System & UI ✅ COMPLETO
**Responsabilidade:** UI/UX usando Gama Studio v1.0.4

**Tarefas:**
- [x] Criar Design System completo (Gama Studio v1.0.4)
- [x] Mockups de páginas (Dashboard, Formulário, Relatórios)
- [x] Componentes reutilizáveis (botão, card, input, etc)
- [x] Paleta de cores + tipografia
- [x] Responsive design (mobile/desktop)
- [x] Padrões de interação (animações, feedback)

**Outputs:**
- [x] `docs/design-system/design-system.md` ✅
- [x] `docs/design-system/mockups.md` ✅
- [x] `docs/design-system/components-library.md` ✅
- [x] `src/frontend/styles/globals.css` ✅
- [x] `tailwind.config.js` ✅
- [x] `docs/design-system/QUICK-REFERENCE.md` ✅
- [x] `DESIGN-SYSTEM-PRESENTATION.md` ✅ (pronto para validação)

**Dependências:** Nenhuma
**Bloqueadores:** Nenhum
**Timeline:** Dia 1-2
**VALIDAÇÃO COM USUÁRIO:** Apresentar mockups + Design System

---

### 4️⃣ @dev (Dex) — Backend + Frontend
**Responsabilidade:** Implementação de toda lógica aplicacional

**Tarefas Fase A (Backend):**
- [ ] Setup Express + middlewares (CORS, auth, errors)
- [ ] Implementar roteamento (GET, POST, PUT, DELETE)
- [ ] Controllers (lógica dos endpoints)
- [ ] Services (regra de negócio: cálculos DRE)
- [ ] Autenticação (login simples + JWT)
- [ ] Validações de entrada

**Tarefas Fase B (Frontend):**
- [ ] Setup Vite + React
- [ ] Configurar roteamento (React Router)
- [ ] Implementar páginas (Login, Dashboard, Formulário, Relatórios)
- [ ] Integração com API (axios + Zustand)
- [ ] Gráficos (Recharts)
- [ ] Filtros e busca

**Outputs:**
- `src/backend/` (completo)
- `src/frontend/` (completo)
- `src/backend/README.md` (guia de uso)
- `src/frontend/README.md` (guia de uso)

**Dependências:**
- @architect (para API spec)
- @data-engineer (para schema/queries)
- @ux-design-expert (para componentes/design)

**Bloqueadores:** Aguardar specs de @architect
**Timeline:** Dia 3-6

---

### 5️⃣ @qa (Quinn) — Testes & Validação
**Responsabilidade:** Qualidade, testes e validação de requisitos

**Tarefas:**
- [ ] Testes unitários (backend services, utils)
- [ ] Testes de integração (API endpoints)
- [ ] Testes funcionais (frontend flows)
- [ ] Validação de requisitos (AC checklist)
- [ ] Teste de performance (queries, renders)
- [ ] Teste de segurança (SQL injection, XSS, auth)
- [ ] Regressão testing

**Outputs:**
- `tests/unit/` (vitest)
- `tests/integration/` (supertest)
- `tests/e2e/` (playwright, se aplicável)
- `docs/qa/test-report.md`
- `docs/qa/issues.md` (bugs/findings)

**Dependências:** @dev (código para testar)
**Bloqueadores:** Await código implementado
**Timeline:** Dia 5-7

---

### 🎯 @aios-master (Orion) — Orquestrador
**Responsabilidade:** Coordenação geral e ponto de decisão

**Tarefas:**
- [x] Setup estrutura de pastas
- [x] Criar CLAUDE.md do projeto
- [x] Migrar CSV
- [ ] Iniciar agentes em paralelo
- [ ] Monitorar progresso
- [ ] Resolver blockers entre agentes
- [ ] Apresentar Design System para validação do usuário
- [ ] Compilar feedback e repassar aos agentes
- [ ] Integração final e deploy

---

## 📅 Timeline Esperada

```
Dia 1-2: Arquitetura, DB Schema, Design System (paralelo)
         ├─ @architect → API spec ✓
         ├─ @data-engineer → Schema ✓
         └─ @ux-design-expert → Mockups + Design System ✓

Dia 1-2: ⏸️ PAUSA — Validação Design System com Usuário

Dia 3-6: Backend API + Frontend React (paralelo)
         ├─ @dev → Implementação ✓
         └─ @data-engineer → Queries otimizadas ✓

Dia 5-7: Testes & QA
         └─ @qa → Testes + Validação ✓

Dia 7: Integração + Deploy Local
       └─ @aios-master → Final setup ✓
```

---

## 🔄 Fluxo de Comunicação

### Quando @architect precisa de input:
- Chamar @aios-master para esclarecer requisitos
- Chamar @ux-design-expert para validar fluxos UI

### Quando @dev tem blocker:
- Chamar @architect para esclarecer spec
- Chamar @data-engineer para validar queries
- Chamar @aios-master se blocker for cross-agent

### Quando @qa encontra issue:
- Comunicar com @dev para fix
- Validar com @architect se for escopo

### Validação Final:
- Usuário valida **APENAS Design System** (@ux-design-expert)
- @aios-master repassa feedback aos agentes

---

## 📋 Checklist Master

### Fase Setup ✓
- [x] Estrutura de pastas
- [x] Package.json
- [x] CLAUDE.md
- [x] README.md
- [x] CSV migrado

### Fase Especificação (Dia 1-2)
- [ ] Arquitetura definida (@architect)
- [ ] DB schema completo (@data-engineer)
- [x] Design System + Mockups (@ux-design-expert) ✅
- ⏸️ Validação Design com Usuário (AGUARDANDO FEEDBACK)

### Fase Implementação (Dia 3-6)
- [ ] Backend API operacional (@dev)
- [ ] Frontend estrutura + pages (@dev)
- [ ] Integração API-Frontend (@dev)
- [ ] Gráficos e Filtros (@dev)

### Fase QA (Dia 5-7)
- [ ] Testes unitários (80%+ coverage)
- [ ] Testes integração (happy path + errors)
- [ ] Teste E2E (fluxos principais)
- [ ] Performance OK
- [ ] Security OK

### Fase Deploy (Dia 7)
- [ ] Package.json scripts validados
- [ ] DB inicializa e seedeia sem erros
- [ ] Aplicação roda em localhost
- [ ] Ambos usuários acessam e conseguem preencher

---

## 🚨 Escalação

Se houver blocker **entre agentes**:
1. Agente A comunica com @aios-master
2. @aios-master coordena solução
3. Seguir para execução

Nunca deixar agente bloqueado > 2 horas sem escalação.

---

## 📝 Status Log

**[2026-03-09 12:15]** @aios-master: Setup estrutura + CLAUDE.md + CSV ✓
**[2026-03-09 12:30]** @aios-master: Iniciando agentes...
**[2026-03-09 15:45]** @architect: Arquitetura completa ✅
  - system-design.md (3 camadas, MVC, componentes)
  - api-spec.yaml (OpenAPI 3.0, 14 endpoints)
  - data-flow.md (6 fluxos detalhados: auth, CRUD, cálculo, export, auditoria, erro)
  - security-strategy.md (6 pilares, checklist, Phase 2 roadmap)
