# GAMA Financeiro — Architect Handoff

**De:** @architect (Ana)
**Para:** @data-engineer (Dara), @dev (Dex), @ux-design-expert (Zara)
**Data:** 2026-03-09
**Status:** 🎯 Ready for Implementation

---

## 📋 Resumo Executivo

Arquitetura completa do GAMA Financeiro foi definida em 4 documentos:

1. **system-design.md** — Visão geral (3 camadas, diagramas, componentes)
2. **api-spec.yaml** — Especificação RESTful completa (OpenAPI 3.0)
3. **data-flow.md** — Fluxos detalhados (6 cenários: auth, CRUD, cálculo, export, auditoria, erro)
4. **security-strategy.md** — Segurança (6 pilares, checklist, Phase 2 roadmap)

**Próximas ações:**
- @data-engineer: Implementar schema.sql + migrations
- @dev: Implementar backend + frontend
- @ux-design-expert: Validar design system com fluxos UI

---

## 🎯 Arquitetura em 30 Segundos

```
React 18 + Zustand
       ↓
axios + JWT auth
       ↓
Express.js + JWT verify
       ↓
Controllers → Services → Models
       ↓
better-sqlite3 (SQLite)
       ↓
4 tabelas: users, periods, entries, audit_logs
```

**Stack:** React, Express, SQLite, Zustand, Recharts, JWT, bcryptjs
**Padrão:** MVC + Service layer
**Auth:** JWT (7 days)
**Segurança:** Input validation, prepared statements, rate limiting, audit trail

---

## 📦 Deliverables por Agente

### Para @data-engineer (Dara)

**Referência:** system-design.md → Database section

**Sua implementação:**
- [ ] `src/backend/db/schema.sql` — DDL (4 tabelas + índices + constraints)
- [ ] `src/backend/db/migrations/001_create_tables.sql`
- [ ] `src/backend/db/migrations/002_add_audit_logs.sql`
- [ ] `src/backend/scripts/init-db.js` — Script para criar DB
- [ ] `src/backend/scripts/seed-db.js` — Script para popular dados do CSV
- [ ] `docs/database/schema-design.md` — Documentação detalhada

**Inputs que você precisa:**
- CSV: `data/csv/Planejamento_Financeiro-GRUPO-GAMA-2026_1Fevereiro.csv`
- Estrutura DRE (já documentada em system-design.md)

**Outputs que você vai criar:**
- Tabelas: users, periods, entries, audit_logs
- Índices: (period_id, category), (created_at), (user_id)
- Constraints: NOT NULL, UNIQUE, FOREIGN KEY, CHECK
- Triggers: Para audit logging automático (opcional)

**Não é sua responsabilidade:**
- Código backend (controladores, services)
- Frontend (UI, componentes)
- API endpoints (já especificados em api-spec.yaml)

---

### Para @dev (Dex)

**Referência:** system-design.md → Frontend/Backend sections + api-spec.yaml

**Sua implementação (Fase A - Backend):**
- [ ] `src/backend/server.js` — Express setup com middlewares
- [ ] `src/backend/config/*.js` — Config files (database, auth, env)
- [ ] `src/backend/models/*.js` — Model classes (User, Period, Entry)
- [ ] `src/backend/services/*.js` — Service layer (AuthService, FinancialService, etc)
- [ ] `src/backend/controllers/*.js` — Controllers (AuthController, EntryController, etc)
- [ ] `src/backend/routes/*.js` — Route definitions
- [ ] `src/backend/middleware/*.js` — Middlewares (auth, validation, errorHandler, rateLimiter)
- [ ] `src/backend/utils/*.js` — Utilities (validators, formatters, calculations, errors)

**Sua implementação (Fase B - Frontend):**
- [ ] `src/frontend/App.jsx` — Root component + routing
- [ ] `src/frontend/pages/*.jsx` — 5 páginas (Login, Dashboard, FormularioDRE, Relatorios, Historico)
- [ ] `src/frontend/components/*.jsx` — 8 componentes reutilizáveis
- [ ] `src/frontend/store/useAppStore.js` — Zustand store
- [ ] `src/frontend/api/client.js` — Axios instance com interceptors
- [ ] `src/frontend/styles/*.css` — Tailwind + custom CSS

**Endpoints a implementar (14 total):**
```
POST   /api/v1/auth/login                  ← Login (JWT)
POST   /api/v1/auth/logout                 ← Logout
GET    /api/v1/auth/me                     ← Verify token

GET    /api/v1/periods                     ← List periods
POST   /api/v1/periods                     ← Create period
GET    /api/v1/periods/:id                 ← Get period
PUT    /api/v1/periods/:id                 ← Update period

GET    /api/v1/entries                     ← List entries (com filtros)
POST   /api/v1/entries                     ← Create entry
GET    /api/v1/entries/:id                 ← Get entry
PUT    /api/v1/entries/:id                 ← Update entry
DELETE /api/v1/entries/:id                 ← Delete entry

GET    /api/v1/calculations/:periodId      ← Get calculations

POST   /api/v1/exports/pdf                 ← Export PDF
POST   /api/v1/exports/excel               ← Export Excel

GET    /api/v1/audit                       ← Get audit logs
```

**Inputs que você precisa:**
- api-spec.yaml (schema de requests/responses)
- system-design.md (arquitetura)
- data-flow.md (fluxos de dados)
- security-strategy.md (validações, autenticação, autorização)
- Schema do @data-engineer

**Outputs que você vai criar:**
- API funcionando (localhost:3000/api/v1)
- Frontend funcionando (localhost:5173)
- Testes unitários + integração
- README.md com instruções de uso

**Não é sua responsabilidade:**
- Design System (zara cuida)
- Schema do banco (dara cuida)
- Deploy/CI-CD (@devops cuida)

---

### Para @ux-design-expert (Zara)

**Referência:** Gama Studio v1.0.4 (em ~/.claude/MEMORY.md)

**Sua implementação:**
- [ ] Validar design system com @architect
- [ ] Criar mockups das 5 páginas
- [ ] Definir componentes (Button, Input, Card, Modal, Chart, Table, Loading, Toast)
- [ ] Paleta de cores: #88CE11 (primary), #161616 (bg), #272727 (surface)
- [ ] Tipografia: Poppins + JetBrains Mono
- [ ] Espaçamento: Múltiplos de 4px
- [ ] Responsividade: Mobile-first

**Deliverables:**
- [ ] `docs/design-system/design-system.md`
- [ ] `docs/design-system/mockups/` (imagens/Figma)
- [ ] `docs/design-system/components-library.md`
- [ ] `src/frontend/styles/tailwind.config.js`
- [ ] `src/frontend/styles/global.css`
- [ ] Componentes React em `src/frontend/components/`

**Inputs que você precisa:**
- system-design.md (páginas, fluxos)
- data-flow.md (entender flows para mockups)
- Gama Studio v1.0.4 (cores, tipografia, padrões)

**Outputs que você vai criar:**
- Mockups das 5 páginas (Login, Dashboard, Formulário, Relatórios, Histórico)
- Componentes reutilizáveis (Button, Input, Card, etc)
- Design System documentation
- Validação com usuário

**Não é sua responsabilidade:**
- Implementação das lógicas (dev cuida)
- Banco de dados (dara cuida)
- Segurança (arch define, dev implementa)

---

## 🔗 Dependências Entre Agentes

```
@architect (Done ✓)
  ├─→ @data-engineer (Schema)
  │   └─→ @dev (Backend/Frontend implementam)
  │       └─→ @qa (Testes)
  │
  ├─→ @ux-design-expert (Design System)
  │   └─→ Validação com usuário
  │       └─→ @dev (Frontend implementa com feedback)
  │
  └─→ @aios-master (Orquestra tudo)
      └─→ Compilar feedback do usuário
          └─→ Repassar aos agentes
```

**Ordem de execução (paralelo onde possível):**

```
Fase 1 (Paralelo - 2 dias):
├─ @data-engineer: Schema + migrations + seed
├─ @dev: Setup Express + primeiros controllers
├─ @ux-design-expert: Design System + mockups + validação
└─ @aios-master: Apresentar design system ao usuário

Fase 2 (Sequencial - 4 dias):
├─ @dev: Backend API completa
├─ @dev: Frontend + integração
├─ @data-engineer: Queries otimizadas
└─ @ux-design-expert: Ajustes finais baseado em feedback

Fase 3 (Paralelo - 2 dias):
├─ @qa: Testes (unit, integração, E2E)
└─ @dev: Bugfixes + refinements

Fase 4 (Deploy - 1 dia):
└─ @aios-master: Deploy local
```

---

## 📚 Documentação de Referência

### Para Implementação

| Arquivo | Agente | Descrição |
|---------|--------|-----------|
| system-design.md | Todos | Visão geral, diagramas, padrões |
| api-spec.yaml | @dev, @qa | Endpoints, schemas, responses |
| data-flow.md | @dev, @qa | Fluxos de dados detalhados |
| security-strategy.md | @dev, @qa | Validações, auth, segurança |
| schema-design.md (TBD) | @dev, @qa | DDL, índices, constraints |

### Para Decisões Arquiteturais

**Decisão:** React 18 + Zustand (não Redux)
**Por quê:** Simplicidade, performance, less boilerplate
**Alternativas rejeitadas:** Redux (complexo), MobX (menos adotado)

**Decisão:** JWT (7 dias) em localStorage
**Por quê:** Stateless, multi-device, não precisa server-side session
**Segurança:** HTTPS em produção, token não em cookie (CSRF risk)

**Decisão:** SQLite (não PostgreSQL)
**Por quê:** Local, sem dependência de servidor, backup fácil, sincronização com nuvem
**Escalabilidade:** Para 10+ usuários simultâneos é suficiente (Phase 2: considerar PostgreSQL)

**Decisão:** Recharts (não D3.js ou Plotly)
**Por quê:** React-native, dark mode support, simples, performance boa
**Customização:** Pode estender com custom components

---

## ⚠️ Cuidados Importantes

### Para @data-engineer
- ✓ Use prepared statements (better-sqlite3 faz isso automático)
- ✓ Crie índices em colunas que serão filtradas frequentemente
- ✓ Adicione constraints para integridade de dados
- ✗ Não use triggers para lógica de negócio (faça no backend)
- ✓ Teste migrations em ordem (001, 002, etc)

### Para @dev
- ✓ Valide SEMPRE no backend (nunca confie em frontend)
- ✓ Use o schema de api-spec.yaml para responses
- ✓ Implementar rate limiting (100 req/min per IP)
- ✓ Log todos os erros (Winston logger)
- ✗ Não exponha detalhes de erro ao cliente
- ✓ Use async/await (não callbacks)
- ✓ Teste edge cases (valores extremos, inputs inválidos)

### Para @ux-design-expert
- ✓ Validar design com usuário ANTES de implementação completa
- ✓ Usar Gama Studio colors exatamente
- ✓ Dark mode only (é padrão)
- ✓ Responsive (mobile, tablet, desktop)
- ✗ Não adicione animações que prejudiquem performance
- ✓ Teste acessibilidade (contrast, font size)

---

## 🚀 Como Começar

### Para @data-engineer
1. Leia `system-design.md` (section "Database")
2. Leia `data-flow.md` (entenda estrutura de dados)
3. Abra CSV em `data/csv/` e analise estrutura
4. Crie `src/backend/db/schema.sql` com 4 tabelas
5. Crie migrations em `src/backend/db/migrations/`
6. Crie `src/backend/scripts/init-db.js`
7. Crie `src/backend/scripts/seed-db.js`

### Para @dev
1. Leia `api-spec.yaml` completamente
2. Leia `data-flow.md` (entenda fluxos)
3. Setup Express com middlewares
4. Implemente controllers → services → models
5. Teste cada endpoint com Postman/curl
6. Implemente frontend pages + store
7. Integre com API
8. Teste tudo junto

### Para @ux-design-expert
1. Leia Gama Studio v1.0.4 (cores, tipografia)
2. Leia `system-design.md` (5 páginas)
3. Crie mockups de cada página
4. Valide com usuário
5. Crie componentes React
6. Passe para @dev implementar

---

## ✅ Validação antes de Próxima Fase

### @data-engineer
- [ ] Schema.sql compila sem erros
- [ ] Migrations rodam em ordem
- [ ] init-db.js cria DB com sucesso
- [ ] seed-db.js popula dados do CSV
- [ ] Queries testadas (SELECT, INSERT, UPDATE, DELETE)
- [ ] Índices criam com sucesso
- [ ] Constraints funcionam (tried to insert invalid data)

### @dev
- [ ] npm run dev funciona (backend + frontend)
- [ ] All 14 endpoints respondendo
- [ ] JWT auth funcionando (login/logout/verify)
- [ ] CRUD operations completo (create, read, update, delete)
- [ ] Cálculos automáticos funcionando
- [ ] Export PDF/Excel funcionando
- [ ] Auditoria registrando mudanças
- [ ] Rate limiting ativado
- [ ] Testes cobrindo happy path + errors

### @ux-design-expert
- [ ] Mockups prontos (5 páginas)
- [ ] Validação com usuário realizada
- [ ] Feedback incorporado
- [ ] Design System document completo
- [ ] Componentes prontos para @dev

---

## 📞 Comunicação Entre Agentes

### Daily Standups
- **Quando:** Fim de cada dia de trabalho
- **O quê:** Progresso, blockers, dúvidas
- **Onde:** ORCHESTRATION-PLAN.md (status log)

### Bloqueadores
- **Se @data-engineer está bloqueado:** Escalada para @architect ou @aios-master
- **Se @dev está bloqueado:** Pedir esclarecimento (@architect) ou aguardar schema (@data-engineer)
- **Se @ux-design-expert está bloqueado:** Pedir validação de usuário (@aios-master)

### Feedback Loop
- @aios-master coleta feedback do usuário
- Repassa para agentes relevantes
- Agentes implementam ajustes
- Próxima iteração começa

---

## 🎁 Bonus: Checklist de Implementação

```markdown
## Backend Setup
- [ ] Express server running
- [ ] CORS configured
- [ ] JWT middleware
- [ ] Rate limiter
- [ ] Error handler
- [ ] Logger (Winston)
- [ ] Database connection

## API Endpoints
- [ ] POST /auth/login
- [ ] POST /auth/logout
- [ ] GET /auth/me
- [ ] GET/POST /periods
- [ ] GET/PUT /periods/:id
- [ ] GET/POST /entries
- [ ] GET/PUT/DELETE /entries/:id
- [ ] GET /calculations/:periodId
- [ ] POST /exports/pdf
- [ ] POST /exports/excel
- [ ] GET /audit

## Frontend Setup
- [ ] Vite + React configured
- [ ] React Router
- [ ] Zustand store
- [ ] Axios client
- [ ] Tailwind CSS
- [ ] Recharts

## Frontend Pages
- [ ] Login
- [ ] Dashboard
- [ ] FormularioDRE
- [ ] Relatorios
- [ ] Historico

## Components
- [ ] Input
- [ ] Button
- [ ] Card
- [ ] Modal
- [ ] Chart
- [ ] Table
- [ ] Loading
- [ ] Toast

## Testing
- [ ] Unit tests (backend services)
- [ ] Integration tests (API endpoints)
- [ ] E2E tests (user flows)
- [ ] All tests passing
- [ ] Coverage > 80%
```

---

**Status:** 🟢 Arquitetura COMPLETE — Pronto para implementação

**Próximo passo:** @data-engineer inicia schema.sql
