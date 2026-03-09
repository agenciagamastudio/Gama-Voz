# GAMA Financeiro — System Design

**Arquiteto:** @architect (Ana)
**Data:** 2026-03-09
**Status:** ✅ COMPLETE

---

## 🎯 Visão Geral Arquitetural

GAMA Financeiro é uma aplicação web de 3 camadas para controle financeiro (DRE) com:
- **Frontend:** React 18 + Vite + Recharts (UI responsiva, dark mode)
- **Backend:** Node.js + Express + SQLite (API REST, JWT auth)
- **Database:** SQLite (local, sincronizável com nuvem)

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENTE (Browser)                            │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ React 18 + Vite + Recharts                                   │  │
│  │ ┌────────────────────────────────────────────────────────┐  │  │
│  │ │ Pages                                                  │  │  │
│  │ │ - Login (JWT token)                                   │  │  │
│  │ │ - Dashboard (gráficos, KPIs)                         │  │  │
│  │ │ - Formulário DRE (CRUD de lançamentos)               │  │  │
│  │ │ - Relatórios (PDF/Excel export)                      │  │  │
│  │ │ - Histórico (auditoria)                              │  │  │
│  │ └────────────────────────────────────────────────────────┘  │  │
│  │ ┌────────────────────────────────────────────────────────┐  │  │
│  │ │ Zustand Store (global state)                          │  │  │
│  │ │ - auth (user, token)                                 │  │  │
│  │ │ - financials (períodos, lançamentos)                 │  │  │
│  │ │ - filters (período, categoria, tipo)                 │  │  │
│  │ │ - ui (temas, modais, loading)                        │  │  │
│  │ └────────────────────────────────────────────────────────┘  │  │
│  │ ┌────────────────────────────────────────────────────────┐  │  │
│  │ │ API Client (axios)                                    │  │  │
│  │ │ - BASE_URL: http://localhost:3000/api                │  │  │
│  │ │ - Auth header: "Authorization: Bearer {token}"       │  │  │
│  │ └────────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                                 ↓
                          HTTP/HTTPS JSON
                                 ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    SERVIDOR (Node.js + Express)                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ Middlewares                                                  │  │
│  │ - CORS (localhost:5173)                                      │  │
│  │ - Body parser (JSON, limit: 10mb)                           │  │
│  │ - Authentication (JWT verify)                               │  │
│  │ - Error handler (catch-all)                                 │  │
│  │ - Rate limiter (100 req/min per IP)                        │  │
│  └──────────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ Routes (v1)                                                  │  │
│  │ ├── POST /auth/login                                        │  │
│  │ ├── POST /auth/logout                                       │  │
│  │ ├── GET /auth/me (verify token)                            │  │
│  │ ├── GET /periods                                            │  │
│  │ ├── GET /periods/:id                                        │  │
│  │ ├── POST /periods                                           │  │
│  │ ├── PUT /periods/:id                                        │  │
│  │ ├── GET /entries (com filtros)                             │  │
│  │ ├── GET /entries/:id                                        │  │
│  │ ├── POST /entries                                           │  │
│  │ ├── PUT /entries/:id                                        │  │
│  │ ├── DELETE /entries/:id                                     │  │
│  │ ├── GET /calculations/:periodId                             │  │
│  │ ├── POST /exports/pdf                                       │  │
│  │ ├── POST /exports/excel                                     │  │
│  │ └── GET /audit (histórico)                                  │  │
│  └──────────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ Controllers → Services → Models                              │  │
│  │ ┌─────────────┐  ┌──────────────┐  ┌──────────────┐         │  │
│  │ │Controllers  │→ │Services      │→ │Models/DB     │         │  │
│  │ │- Request    │  │- Validations │  │- Queries     │         │  │
│  │ │- Response   │  │- Calcs       │  │- Transactions│         │  │
│  │ │- Status     │  │- Rules       │  │- Integrity   │         │  │
│  │ └─────────────┘  └──────────────┘  └──────────────┘         │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                                 ↓
                        SQL (better-sqlite3)
                                 ↓
┌─────────────────────────────────────────────────────────────────────┐
│                       DATABASE (SQLite)                             │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ Tables                                                       │  │
│  │ ┌──────────────────┐  ┌──────────────────┐                  │  │
│  │ │ users            │  │ periods          │                  │  │
│  │ │ - id (PK)        │  │ - id (PK)        │                  │  │
│  │ │ - username       │  │ - month          │                  │  │
│  │ │ - password_hash  │  │ - year           │                  │  │
│  │ │ - created_at     │  │ - created_by_id  │                  │  │
│  │ │ - updated_at     │  │ - created_at     │                  │  │
│  │ │ - is_active      │  │ - updated_at     │                  │  │
│  │ └──────────────────┘  └──────────────────┘                  │  │
│  │ ┌──────────────────┐  ┌──────────────────┐                  │  │
│  │ │ entries          │  │ audit_logs       │                  │  │
│  │ │ - id (PK)        │  │ - id (PK)        │                  │  │
│  │ │ - period_id (FK) │  │ - user_id (FK)   │                  │  │
│  │ │ - category       │  │ - table_name     │                  │  │
│  │ │ - line_item      │  │ - record_id      │                  │  │
│  │ │ - type           │  │ - action         │                  │  │
│  │ │ - planned_value  │  │ - before         │                  │  │
│  │ │ - actual_value   │  │ - after          │                  │  │
│  │ │ - created_by_id  │  │ - timestamp      │                  │  │
│  │ │ - created_at     │  │ - ip_address     │                  │  │
│  │ │ - updated_at     │  │                  │                  │  │
│  │ └──────────────────┘  └──────────────────┘                  │  │
│  ├─ Indexes: (period_id, category), (created_at), (user_id)    │  │
│  ├─ Constraints: NOT NULL, FOREIGN KEY, UNIQUE                 │  │
│  └─ File: data/db/gama-financeiro.db                           │  │
│  └─ Backup: Auto-backup em data/backups/                       │  │
│  └─ Sync: Pronto para Google Drive sync                        │  │
│  └─ Versioning: migrations em src/backend/db/migrations/       │  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🏗️ Componentes Principais

### Frontend (React 18)

#### Layout
```
App.jsx
├── Layout
│   ├── Header (logo, user menu, logout)
│   └── Sidebar (nav: Dashboard, Formulário, Relatórios, Histórico)
├── Router (React Router v6)
│   ├── Login (public)
│   ├── Dashboard (protected)
│   ├── FormularioDRE (protected)
│   ├── Relatorios (protected)
│   ├── Historico (protected)
│   └── 404 (fallback)
└── GlobalStore (Zustand)
```

#### Componentes Reutilizáveis
- **Input.jsx** — campo de texto com validação (Gama Design)
- **Button.jsx** — botão primário/secundário (verde neon)
- **Card.jsx** — container padrão (surface bg)
- **Modal.jsx** — diálogo para confirmações
- **Chart.jsx** — wrapper Recharts com dark mode
- **Table.jsx** — exibição tabular com paginação
- **Loading.jsx** — skeleton screen
- **Toast.jsx** — notificações (sucesso, erro, info)

#### Pages (5 páginas)
1. **Login.jsx** — autenticação (username/password)
2. **Dashboard.jsx** — KPIs + gráficos (receita, custos, lucro)
3. **FormularioDRE.jsx** — CRUD hierárquico de lançamentos
4. **Relatorios.jsx** — exportação PDF/Excel, filtros
5. **Historico.jsx** — auditoria (quem alterou, quando)

#### Store (Zustand)
```javascript
// src/frontend/store/useAppStore.js
{
  auth: { user, token, isAuthenticated },
  financials: { periods, entries, currentPeriod },
  filters: { selectedPeriod, selectedCategory, dateRange },
  ui: { isDarkMode, loading, error, modals },

  // Actions
  setAuth, logout, setPeriod, addEntry, updateEntry, deleteEntry,
  setFilters, setError, clearError, showModal, closeModal
}
```

### Backend (Node.js + Express)

#### Estrutura MVC
```
src/backend/
├── server.js (entry point, middleware setup)
├── config/
│   ├── database.js (SQLite connection)
│   ├── auth.js (JWT config)
│   └── env.js (environment vars)
├── models/
│   ├── User.js (user queries)
│   ├── Period.js (período queries)
│   ├── Entry.js (lançamento queries)
│   └── AuditLog.js (auditoria queries)
├── services/
│   ├── AuthService.js (login, token, verify)
│   ├── FinancialService.js (cálculos DRE)
│   ├── PeriodService.js (período CRUD)
│   ├── EntryService.js (lançamento CRUD)
│   ├── ReportService.js (PDF/Excel export)
│   └── AuditService.js (logging)
├── controllers/
│   ├── AuthController.js
│   ├── PeriodController.js
│   ├── EntryController.js
│   ├── CalculationController.js
│   ├── ReportController.js
│   └── AuditController.js
├── routes/
│   ├── auth.js
│   ├── periods.js
│   ├── entries.js
│   ├── calculations.js
│   ├── reports.js
│   └── audit.js
├── middleware/
│   ├── auth.js (JWT verify)
│   ├── errorHandler.js (catch-all)
│   ├── validation.js (input validation)
│   ├── rateLimiter.js (100 req/min)
│   └── logging.js (request/response logging)
├── utils/
│   ├── validators.js
│   ├── formatters.js
│   ├── calculations.js (lógica DRE)
│   ├── errors.js (custom error classes)
│   └── logger.js (winston logging)
├── db/
│   ├── schema.sql (DDL)
│   ├── migrations/
│   │   ├── 001_create_tables.sql
│   │   └── 002_add_audit_logs.sql
│   └── seed-data.json
└── scripts/
    ├── init-db.js
    ├── seed-db.js
    └── backup-db.js
```

### Database (SQLite)

Estrutura relacional com 4 tabelas principais:

1. **users** — autenticação
2. **periods** — períodos financeiros (mês/ano)
3. **entries** — lançamentos (line items da DRE)
4. **audit_logs** — histórico de mudanças

Veja `schema-design.md` para DDL completo.

---

## 🔄 Fluxos Principais

### 1. Fluxo de Autenticação
```
Login Form
   ↓
POST /api/v1/auth/login {username, password}
   ↓
AuthService.authenticate() → Hash verify
   ↓
Generate JWT token (exp: 7 days)
   ↓
Response {user, token, expiresIn}
   ↓
Store em Zustand + localStorage
   ↓
Redirect to /dashboard
```

### 2. Fluxo de Lançamento (CRUD)
```
Dashboard DRE Form
   ↓
User preenche/edita/deleta lançamento
   ↓
Frontend validation (tipo, valor, período)
   ↓
POST/PUT/DELETE /api/v1/entries {entryData}
   ↓
Backend validation + business rules
   ↓
Database transaction
   ↓
Audit log {action, before, after, user, timestamp}
   ↓
Calcula totalizadores (margens, lucro)
   ↓
Response {entry, calculations}
   ↓
Update Zustand store
   ↓
UI atualiza (rerender gráficos, totalizadores)
```

### 3. Fluxo de Relatório (Export)
```
User clica "Exportar PDF/Excel"
   ↓
Frontend: GET /api/v1/exports/pdf?period=2026-02&format=dre
   ↓
Backend: ReportService.generatePDF()
   ├─ Busca entries do período
   ├─ Calcula todos os totalizadores
   ├─ Formata DRE hierárquica
   ├─ Gera PDF com PDFKit (logo, tabelas, gráficos)
   └─ Retorna file stream
   ↓
Frontend: Download file (navegador)
```

---

## 📊 Padrões de Design

### Frontend
- **Components:** Functional components + Hooks
- **State:** Zustand (global store)
- **API:** Axios com interceptors (auth header auto)
- **Routing:** React Router v6 (lazy loading)
- **Forms:** Controlled inputs com validation
- **Styles:** Tailwind CSS + custom CSS (Gama colors)

### Backend
- **Architecture:** MVC (Controllers → Services → Models)
- **Database:** SQLite com better-sqlite3 (sync API, fast)
- **Auth:** JWT (HS256, exp: 7d)
- **Validation:** Joi/Zod (request schemas)
- **Error Handling:** Custom error classes com HTTP status
- **Logging:** Winston (estruturado, rotativo)

### Database
- **Normalization:** 3NF
- **Indexes:** PK, FK, compound indexes para queries comuns
- **Constraints:** NOT NULL, UNIQUE, FOREIGN KEY, CHECK
- **Transactions:** ACID-compliant (SQLite em WAL mode)
- **Backup:** Incremental backups automáticos
- **Migrations:** Versionadas, reversíveis

---

## 🔐 Segurança

Ver `security-strategy.md` para detalhes. Sumário:

- **Autenticação:** JWT (HS256)
- **Autorização:** Role-based (admin vs user)
- **Input Validation:** Whitelist, type checking
- **SQL Injection:** Prepared statements (better-sqlite3)
- **XSS:** React escaping automático + CSP header
- **CORS:** Whitelist localhost:5173
- **Rate Limiting:** 100 req/min per IP
- **Password:** bcrypt (salt rounds: 10)

---

## 📈 Performance & Escalabilidade

### Frontend
- **Bundle size:** < 200KB (gzip)
- **Time to Interactive:** < 2s
- **Lighthouse score:** > 90
- **Responsivo:** Mobile-first (iPad, smartphone)

### Backend
- **Response time:** < 200ms (p95)
- **Throughput:** 100+ req/s
- **Memory:** < 100MB baseline
- **Database:** Indexes otimizados, conexão pool

### Database
- **Query time:** < 50ms (com índices)
- **Storage:** < 100MB para 5 anos de dados
- **Concurrent:** 10+ usuários simultâneos

---

## 🚀 Deployment

### Desenvolvimento
```bash
npm run dev  # Frontend + Backend em paralelo (Vite + Nodemon)
```

### Produção Local
```bash
npm run build    # Vite bundle
npm start        # Node server
```

### Deploy em Rede
- Server em máquina central (port 3000)
- Clientes acessam via hostname/IP
- CORS habilitado para rede

### Sincronização Nuvem (Fase 2)
- SQLite export automático para Google Drive
- Merge de mudanças (CRDTs ou timestamp-based)

---

## 📋 Checklist de Conformidade

- [x] Diagrama de 3 camadas (frontend, backend, database)
- [x] Estrutura MVC definida
- [x] Endpoints especificados (ver api-spec.yaml)
- [x] Fluxos de dados mapeados
- [x] Padrões de design documentados
- [x] Estratégia de segurança definida
- [x] Performance targets definidos
- [x] Deployment strategy definida

---

## 📚 Documentação Associada

- **api-spec.yaml** — Endpoints RESTful (OpenAPI 3.0)
- **data-flow.md** — Fluxo detalhado de dados
- **security-strategy.md** — Segurança + validações
- **schema-design.md** — DDL + migrations (by @data-engineer)

---

**Próximo Passo:** @data-engineer define schema detalhado em `schema-design.md`
