# GAMA Financeiro — Architecture Diagrams

**Por:** @architect (Ana)
**Data:** 2026-03-09

Referência visual de toda arquitetura do sistema.

---

## 1. System Overview (3 Camadas)

```
┌─────────────────────────────────────────────────────────────────┐
│                         INTERNET / NETWORK                      │
└─────────────────────────────────────────────────────────────────┘
                              ↑↓
                        HTTP/HTTPS JSON
                              ↑↓
╔═════════════════════════════════════════════════════════════════╗
║                      FRONTEND LAYER                             ║
║  React 18 + Vite + Tailwind + Zustand + Recharts              ║
║  ┌───────────────────────────────────────────────────────────┐ ║
║  │ Browser (localhost:5173)                                  │ ║
║  │  ┌─────────────────────────────────────────────────────┐  │ ║
║  │  │ Pages                                               │  │ ║
║  │  │ - Login (form → JWT token)                         │  │ ║
║  │  │ - Dashboard (KPIs + charts)                        │  │ ║
║  │  │ - FormularioDRE (CRUD entries)                     │  │ ║
║  │  │ - Relatorios (PDF/Excel export)                   │  │ ║
║  │  │ - Historico (audit log view)                       │  │ ║
║  │  └─────────────────────────────────────────────────────┘  │ ║
║  │  ┌─────────────────────────────────────────────────────┐  │ ║
║  │  │ Zustand Store (Global State)                        │  │ ║
║  │  │ - auth {user, token, isAuthenticated}              │  │ ║
║  │  │ - financials {periods, entries, currentPeriod}    │  │ ║
║  │  │ - filters {selectedPeriod, category, dateRange}   │  │ ║
║  │  │ - ui {loading, error, theme, modals}               │  │ ║
║  │  └─────────────────────────────────────────────────────┘  │ ║
║  │  ┌─────────────────────────────────────────────────────┐  │ ║
║  │  │ Axios API Client                                    │  │ ║
║  │  │ - baseURL: http://localhost:3000/api/v1            │  │ ║
║  │  │ - Auth header: Bearer {JWT token}                  │  │ ║
║  │  │ - Request/response interceptors                    │  │ ║
║  │  │ - Error handling + retry logic                     │  │ ║
║  │  └─────────────────────────────────────────────────────┘  │ ║
║  └───────────────────────────────────────────────────────────┘ ║
╚═════════════════════════════════════════════════════════════════╝
                              ↑↓
                        HTTP REST API
                          14 Endpoints
                              ↑↓
╔═════════════════════════════════════════════════════════════════╗
║                      BACKEND LAYER                              ║
║  Node.js + Express + better-sqlite3                            ║
║  ┌───────────────────────────────────────────────────────────┐ ║
║  │ Server (localhost:3000)                                   │ ║
║  │  ┌─────────────────────────────────────────────────────┐  │ ║
║  │  │ Middleware Stack                                    │  │ ║
║  │  │ 1. CORS (whitelist localhost:5173)                 │  │ ║
║  │  │ 2. Body parser (JSON, 10mb limit)                  │  │ ║
║  │  │ 3. Auth (JWT verify)                               │  │ ║
║  │  │ 4. Rate limiter (100 req/min per IP)              │  │ ║
║  │  │ 5. Logger (Winston)                                │  │ ║
║  │  │ 6. Error handler (catch-all)                       │  │ ║
║  │  └─────────────────────────────────────────────────────┘  │ ║
║  │  ┌─────────────────────────────────────────────────────┐  │ ║
║  │  │ Routes (v1)                                         │  │ ║
║  │  │ /auth     /periods    /entries    /calculations    │  │ ║
║  │  │ /exports  /audit                                   │  │ ║
║  │  └─────────────────────────────────────────────────────┘  │ ║
║  │  ┌─────────────────────────────────────────────────────┐  │ ║
║  │  │ MVC Pattern                                         │  │ ║
║  │  │ ┌───────────┐  ┌──────────┐  ┌──────────────────┐  │  │ ║
║  │  │ │Controller │→ │ Service  │→ │ Model / DB Query │  │  │ ║
║  │  │ │- Request  │  │- Logic   │  │- Data Access     │  │  │ ║
║  │  │ │- Response │  │- Calc    │  │- Validation      │  │  │ ║
║  │  │ │- Status   │  │- Rules   │  │- Transactions    │  │  │ ║
║  │  │ └───────────┘  └──────────┘  └──────────────────┘  │  │ ║
║  │  └─────────────────────────────────────────────────────┘  │ ║
║  └───────────────────────────────────────────────────────────┘ ║
╚═════════════════════════════════════════════════════════════════╝
                              ↑↓
                        SQL Queries
                              ↑↓
╔═════════════════════════════════════════════════════════════════╗
║                      DATABASE LAYER                             ║
║  SQLite (better-sqlite3) - Local File                          ║
║  ┌───────────────────────────────────────────────────────────┐ ║
║  │ Database (data/db/gama-financeiro.db)                     │ ║
║  │  ┌──────────────────────────────────────────────────────┐ ║
║  │  │ Tables                                               │ ║
║  │  │ ┌─────────────┐ ┌──────────────┐                     │ ║
║  │  │ │users        │ │periods       │                     │ ║
║  │  │ │- id         │ │- id          │                     │ ║
║  │  │ │- username   │ │- month/year  │                     │ ║
║  │  │ │- password   │ │- created_by  │                     │ ║
║  │  │ │- is_active  │ │- timestamps  │                     │ ║
║  │  │ └─────────────┘ └──────────────┘                     │ ║
║  │  │ ┌──────────────┐ ┌──────────────────┐                │ ║
║  │  │ │entries       │ │audit_logs        │                │ ║
║  │  │ │- id          │ │- id              │                │ ║
║  │  │ │- period_id   │ │- user_id         │                │ ║
║  │  │ │- category    │ │- table_name      │                │ ║
║  │  │ │- line_item   │ │- record_id       │                │ ║
║  │  │ │- type        │ │- action          │                │ ║
║  │  │ │- value       │ │- before/after    │                │ ║
║  │  │ │- created_by  │ │- timestamp       │                │ ║
║  │  │ │- timestamps  │ │- ip_address      │                │ ║
║  │  │ └──────────────┘ └──────────────────┘                │ ║
║  │  └──────────────────────────────────────────────────────┘ ║
║  │  Indexes: (period_id, category), (created_at), (user_id)  │ ║
║  │  Constraints: FK, NOT NULL, UNIQUE, CHECK                 │ ║
║  │  Transactions: ACID-compliant (WAL mode)                  │ ║
║  │  Backup: Daily (data/backups/)                            │ ║
║  └───────────────────────────────────────────────────────────┘ ║
╚═════════════════════════════════════════════════════════════════╝
```

---

## 2. Frontend Architecture

```
App.jsx (Root)
│
├─ Layout
│  ├─ Header
│  │  ├─ Logo
│  │  └─ User Menu (logout)
│  │
│  └─ Sidebar
│     ├─ Nav Link: Dashboard
│     ├─ Nav Link: FormularioDRE
│     ├─ Nav Link: Relatorios
│     ├─ Nav Link: Historico
│     └─ Footer
│
├─ Router (React Router v6)
│  ├─ Route /login → Login.jsx (public)
│  ├─ Route /dashboard → Dashboard.jsx (protected)
│  ├─ Route /formulario → FormularioDRE.jsx (protected)
│  ├─ Route /relatorios → Relatorios.jsx (protected)
│  ├─ Route /historico → Historico.jsx (protected)
│  └─ Route * → NotFound.jsx (fallback)
│
├─ Store (Zustand)
│  ├─ auth {user, token, isAuthenticated, setAuth, logout}
│  ├─ financials {periods, entries, currentPeriod, setData}
│  ├─ filters {selectedPeriod, category, setFilters}
│  └─ ui {loading, error, theme, showModal, closeModal}
│
├─ API Client (Axios)
│  ├─ POST /auth/login
│  ├─ POST /auth/logout
│  ├─ GET /periods, POST /periods
│  ├─ GET/POST/PUT/DELETE /entries
│  ├─ GET /calculations
│  ├─ POST /exports
│  └─ GET /audit
│
└─ Components (Reusable)
   ├─ Input.jsx
   ├─ Button.jsx
   ├─ Card.jsx
   ├─ Modal.jsx
   ├─ Chart.jsx (Recharts wrapper)
   ├─ Table.jsx
   ├─ Loading.jsx
   └─ Toast.jsx

Pages:
├─ Login.jsx
│  ├─ Form (username, password)
│  ├─ Validation
│  └─ POST /auth/login
│
├─ Dashboard.jsx
│  ├─ KPI Cards (Vendas, Margens, Lucro)
│  ├─ Charts (Recharts)
│  ├─ Period selector
│  └─ GET /calculations
│
├─ FormularioDRE.jsx
│  ├─ Hierarchical form
│  ├─ CRUD operations
│  ├─ Validation
│  └─ POST/PUT/DELETE /entries
│
├─ Relatorios.jsx
│  ├─ Period selector
│  ├─ Export PDF button
│  ├─ Export Excel button
│  └─ POST /exports/{pdf,excel}
│
└─ Historico.jsx
   ├─ Audit log table
   ├─ Filters (user, action, date)
   └─ GET /audit

Styles:
├─ tailwind.config.js (colors, spacing, fonts)
├─ global.css (dark mode, animations)
└─ Components have scoped classes
```

---

## 3. Backend Architecture

```
src/backend/
│
├─ server.js (Entry point)
│  └─ Express app initialization
│     ├─ Middleware setup
│     ├─ Routes registration
│     ├─ Error handler
│     └─ Listen on port 3000
│
├─ config/
│  ├─ database.js (SQLite connection)
│  ├─ auth.js (JWT configuration)
│  └─ env.js (environment variables)
│
├─ middleware/
│  ├─ auth.js (JWT verify)
│  ├─ errorHandler.js (catch-all errors)
│  ├─ validation.js (Joi schema validation)
│  ├─ rateLimiter.js (100 req/min)
│  └─ logging.js (Winston logger)
│
├─ routes/
│  ├─ auth.js (login, logout, verify)
│  ├─ periods.js (CRUD periods)
│  ├─ entries.js (CRUD entries)
│  ├─ calculations.js (GET calculations)
│  ├─ reports.js (export PDF/Excel)
│  └─ audit.js (GET audit logs)
│
├─ controllers/
│  ├─ AuthController.js
│  ├─ PeriodController.js
│  ├─ EntryController.js
│  ├─ CalculationController.js
│  ├─ ReportController.js
│  └─ AuditController.js
│
├─ services/
│  ├─ AuthService.js (login, JWT)
│  ├─ PeriodService.js (period logic)
│  ├─ EntryService.js (entry CRUD)
│  ├─ FinancialService.js (calculations)
│  ├─ ReportService.js (PDF/Excel generation)
│  └─ AuditService.js (audit logging)
│
├─ models/
│  ├─ User.js (user queries)
│  ├─ Period.js (period queries)
│  ├─ Entry.js (entry queries)
│  └─ AuditLog.js (audit queries)
│
├─ utils/
│  ├─ validators.js (Joi schemas)
│  ├─ formatters.js (response formatting)
│  ├─ calculations.js (DRE logic)
│  ├─ errors.js (custom error classes)
│  └─ logger.js (Winston setup)
│
├─ db/
│  ├─ schema.sql (DDL)
│  ├─ migrations/
│  │  ├─ 001_create_tables.sql
│  │  └─ 002_add_audit_logs.sql
│  └─ seed-data.json
│
└─ scripts/
   ├─ init-db.js (create database)
   ├─ seed-db.js (populate data)
   └─ backup-db.js (daily backup)
```

---

## 4. Data Model (ER Diagram)

```
┌──────────────────┐         ┌──────────────────┐
│     users        │         │    periods       │
├──────────────────┤         ├──────────────────┤
│ id (PK)          │←───┐    │ id (PK)          │
│ username (UNIQUE)│    │    │ month (1-12)     │
│ password_hash    │    │    │ year             │
│ created_at       │    ├─→  │ created_by_id(FK)│
│ updated_at       │    │    │ created_at       │
│ is_active        │    │    │ updated_at       │
└──────────────────┘    │    │ status           │
                        │    └──────────────────┘
                        │           ↑
                        │           │ 1:N
                        │           │
                        │    ┌──────────────────────┐
                        │    │     entries          │
                        │    ├──────────────────────┤
                        │    │ id (PK)              │
                        │    │ period_id (FK)       │→─────────┐
                        │    │ category             │          │
                        │    │ line_item            │          │
                        │    │ type (planned/actual)│          │
                        │    │ value                │          │
                        │    │ parent_id (FK)       │──────────┘
                        │    │ created_by_id (FK)───┤
                        │    │ created_at           │
                        │    │ updated_at           │
                        │    └──────────────────────┘
                        │           ↑
                        │           │ 1:N
                        │           │
                        └───────────┬──────────────────────┐
                                    │                      │
                                    │             ┌────────────────────┐
                                    │             │   audit_logs       │
                                    │             ├────────────────────┤
                                    │             │ id (PK)            │
                                    │             │ user_id (FK)       │
                                    │             │ table_name         │
                                    │             │ record_id          │
                                    │             │ action             │
                                    │             │ before (JSON)      │
                                    │             │ after (JSON)       │
                                    │             │ timestamp          │
                                    │             │ ip_address         │
                                    │             └────────────────────┘
                                    │
                                    └─ created_by_id (FK)

Relationships:
- users 1:N periods (created_by_id)
- users 1:N entries (created_by_id)
- periods 1:N entries (period_id)
- entries 1:N audit_logs (implicit)
- entries 1:N entries (parent_id - self-join for hierarchy)
```

---

## 5. Request/Response Flow

```
┌─ CLIENT SIDE ─────────────────────────────────────────────┐
│                                                            │
│  User fills form (value: 5000)                           │
│         ↓                                                 │
│  Frontend validation (number, >= 0, <= 999999999)        │
│         ↓                                                 │
│  Optimistic update (Zustand)                             │
│         ↓                                                 │
│  POST /api/v1/entries                                    │
│  {                                                        │
│    "periodId": "1",                                       │
│    "category": "VENDAS",                                 │
│    "lineItem": "Sales",                                  │
│    "type": "planned",                                    │
│    "value": 5000                                         │
│  }                                                        │
│  Header: Authorization: Bearer {jwt}                     │
│                                                            │
└───────────────────────────┬────────────────────────────────┘
                            ↓
┌─ SERVER SIDE ────────────────────────────────────────────────┐
│                                                              │
│  Middleware Chain                                           │
│  1. CORS check ✓                                            │
│  2. Body parser ✓                                           │
│  3. Auth: JWT verify ✓ → req.user = {id, username}         │
│  4. Rate limiter: < 100 req/min? ✓                         │
│  5. Logger: Log incoming request                           │
│         ↓                                                   │
│  EntryController.create()                                  │
│  ├─ Extract body → periodId, category, ...                │
│  ├─ Extract user from req.user.id                         │
│  └─ Call EntryService.createEntry()                       │
│         ↓                                                   │
│  EntryService.createEntry()                               │
│  ├─ Validate with Joi schema                              │
│  ├─ Check authorization (user owns period)                │
│  ├─ Database BEGIN TRANSACTION                            │
│  ├─ INSERT INTO entries (...)                             │
│  │  VALUES (1, 'VENDAS', 'Sales', 'planned', 5000, ...)  │
│  ├─ GET generated ID (42)                                 │
│  ├─ Recalculate margins (margens, lucro, ...)            │
│  ├─ INSERT INTO audit_logs (action: create, ...)         │
│  ├─ Database COMMIT                                       │
│  └─ Return {entry, calculations}                         │
│         ↓                                                   │
│  Response (201 Created)                                   │
│  {                                                         │
│    "success": true,                                        │
│    "data": {                                              │
│      "id": 42,                                            │
│      "periodId": 1,                                       │
│      "value": 5000,                                       │
│      ...                                                   │
│    },                                                      │
│    "calculations": {                                      │
│      "vendas": 13000,                                     │
│      "margens": ...,                                      │
│      ...                                                   │
│    }                                                       │
│  }                                                         │
│                                                              │
└───────────────────────────┬────────────────────────────────┘
                            ↓
┌─ CLIENT SIDE ─────────────────────────────────────────────┐
│                                                            │
│  Axios success interceptor                               │
│  ├─ Check HTTP 201 ✓                                      │
│  ├─ Parse JSON ✓                                          │
│  └─ Call response handler                                 │
│         ↓                                                 │
│  Replace optimistic data with server data                │
│  ├─ Remove local entry (no ID yet)                       │
│  ├─ Add real entry with ID 42                            │
│  ├─ Update Zustand store                                 │
│  ├─ Update calculations (graphs change)                  │
│  └─ Store to localStorage                                │
│         ↓                                                 │
│  Show success toast                                       │
│  "Lançamento criado com sucesso!"                        │
│         ↓                                                 │
│  React re-renders                                         │
│  ├─ Entry appears in table                               │
│  ├─ Graphs update (margens, lucro)                       │
│  ├─ Totals refresh                                        │
│  └─ UI reflects new data                                 │
│         ↓                                                 │
│  User sees updated dashboard                             │
│                                                            │
└───────────────────────────────────────────────────────────┘
```

---

## 6. Authentication Flow

```
┌─────────────────────────────────┐
│ User visits localhost:5173      │
└────────────┬────────────────────┘
             ↓
    ┌─────────────────┐
    │ Is token valid? │
    └────────┬────────┘
             │
    ┌────────┴────────┐
    ↓                 ↓
   YES               NO
    │                 │
    ↓                 ↓
GOTO DASHBOARD   GOTO LOGIN
    ↓                 ↓
    │         ┌───────────────────────┐
    │         │ User fills form       │
    │         │ username: usuário1    │
    │         │ password: senha123    │
    │         └───────┬───────────────┘
    │                 ↓
    │         ┌───────────────────────┐
    │         │ POST /auth/login      │
    │         │ {username, password}  │
    │         └───────┬───────────────┘
    │                 ↓
    │         ┌───────────────────────────────┐
    │         │ Backend                       │
    │         │ AuthService.authenticate()    │
    │         │ ├─ Query users by username   │
    │         │ ├─ bcryptjs.compare()        │
    │         │ └─ Generate JWT              │
    │         │    {id, username,            │
    │         │     exp: now+7d}              │
    │         └───────┬───────────────────────┘
    │                 ↓
    │         ┌───────────────────────────────┐
    │         │ Response (200 OK)             │
    │         │ {                             │
    │         │   user: {...},                │
    │         │   token: "eyJh...",           │
    │         │   expiresIn: 604800           │
    │         │ }                             │
    │         └───────┬───────────────────────┘
    │                 ↓
    │         ┌────────────────────────────┐
    │         │ Frontend                   │
    │         │ ├─ Save token localStorage │
    │         │ ├─ Set Zustand auth store  │
    │         │ └─ Set axios default header│
    │         │   Authorization: Bearer... │
    │         └───────┬────────────────────┘
    │                 ↓
    │         ┌─────────────┐
    │         │ GOTO        │
    │         │ /dashboard  │
    │         └─────────────┘
    │                 ↓
    └─────────────────┴─────────────────────────→ DASHBOARD

On every API request:
    Request header: Authorization: Bearer {token}
             ↓
    Backend verifies JWT
    ├─ Check signature (HMAC HS256)
    ├─ Check expiration
    └─ Extract user info (req.user.id)
             ↓
    Proceed or 401 Unauthorized
```

---

## 7. DRE Hierarchy Structure

```
1. VENDAS TOTAIS [sum of all vendas entries]
   ├─ Vendas Produto A      [value]
   ├─ Vendas Produto B      [value]
   └─ Vendas Serviços       [value]
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ = SUBTOTAL

2. CUSTOS VARIÁVEIS [sum of all custos variáveis]
   ├─ 2.1 Custo Mercadoria
   │      ├─ CMV Produto A  [value]
   │      └─ CMV Produto B  [value]
   │      ∑ = SUBTOTAL
   ├─ 2.2 Frete            [value]
   ├─ 2.3 Impostos
   │      ├─ ICMS           [value]
   │      ├─ PIS            [value]
   │      └─ Simples        [value]
   │      ∑ = SUBTOTAL
   ├─ 2.4 Designs          [value]
   └─ 2.5 Social Media     [value]
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ = SUBTOTAL

3. MARGEM CONTRIBUIÇÃO [VENDAS - CUSTOS_VARIAVEIS]
   ┌─────────────────────────────────────────────┐
   │ Calculated automatically                    │
   │ = 1 - 2                                     │
   │ Percentage = MARGEM / VENDAS * 100          │
   └─────────────────────────────────────────────┘

4. CUSTOS FIXOS [sum of all custos fixos]
   ├─ 4.1 Pró-labore        [value]
   ├─ 4.2 Encargos
   ├─ 4.3 Salários          [value]
   ├─ 4.4 Energia           [value]
   ├─ 4.5 Água              [value]
   ├─ 4.6 Telefone/Internet [value]
   ├─ 4.7 Despesas Veículos
   │      ├─ Combustível    [value]
   │      ├─ Seguro IPVA    [value]
   │      └─ Manutenção     [value]
   │      ∑ = SUBTOTAL
   └─ 4.8 Aluguel/Escritório [value]
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ = SUBTOTAL

5. LUCRO OPERACIONAL [MARGEM - CUSTOS_FIXOS]
   ┌─────────────────────────────────────────────┐
   │ Calculated automatically                    │
   │ = 3 - 4                                     │
   │ Percentage = LUCRO / VENDAS * 100           │
   └─────────────────────────────────────────────┘

6. INVESTIMENTOS [sum]
   ├─ Equipamentos         [value]
   ├─ Reforma              [value]
   └─ Softwares            [value]
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ = SUBTOTAL

7. LUCRO LÍQUIDO [LUCRO_OPERACIONAL - INVESTIMENTOS]
   ┌─────────────────────────────────────────────┐
   │ Calculated automatically                    │
   │ = 5 - 6                                     │
   │ Percentage = LUCRO_LIQUIDO / VENDAS * 100   │
   └─────────────────────────────────────────────┘

8. PONTO DE EQUILÍBRIO [CUSTOS_FIXOS / MARGEM%]
   ┌─────────────────────────────────────────────┐
   │ Calculated automatically                    │
   │ Breakeven sales volume                      │
   └─────────────────────────────────────────────┘

VARIAÇÃO [Realizado vs Planejado]
├─ Vendas Var: (Realizado - Planejado) / Planejado * 100
├─ Custos Var: ...
└─ Lucro Var: ...
```

---

## 8. Security Architecture

```
┌──────────────────────────────────┐
│      INPUT VALIDATION            │
│  (Frontend + Backend)             │
├──────────────────────────────────┤
│  Type Check → number             │
│  Range: 0 to 999999999           │
│  String: max 100 chars           │
│  Enum: whitelist values          │
│                 ↓                 │
│          ACCEPTED ✓              │
└──────────────────────────────────┘
                 ↓
┌──────────────────────────────────┐
│      AUTHENTICATION              │
│  (JWT Token)                     │
├──────────────────────────────────┤
│  Algorithm: HS256                │
│  Secret: 32+ chars               │
│  Lifetime: 7 days                │
│  Storage: localStorage            │
│  On requests: Bearer {token}     │
│                 ↓                 │
│   JWT.verify() ✓                 │
└──────────────────────────────────┘
                 ↓
┌──────────────────────────────────┐
│      AUTHORIZATION               │
│  (Role-based)                    │
├──────────────────────────────────┤
│  Admin → Create, Read, Update,   │
│          Delete, Export, Audit   │
│  User → Read, Create, Update,    │
│         Delete, Export           │
│  Viewer → Read, Export (Phase 2) │
│                 ↓                 │
│     Permission check ✓           │
└──────────────────────────────────┘
                 ↓
┌──────────────────────────────────┐
│      DATA ACCESS                 │
│  (SQL Injection Prevention)       │
├──────────────────────────────────┤
│  Prepared statements:            │
│  db.prepare(                     │
│    'SELECT * FROM entries        │
│     WHERE id = ?'                │
│  ).get(id)                       │
│                 ↓                 │
│   Parameterized ✓                │
│   No string concat ✓             │
└──────────────────────────────────┘
                 ↓
┌──────────────────────────────────┐
│      OUTPUT ENCODING             │
│  (XSS Prevention)                │
├──────────────────────────────────┤
│  React escapes all dynamic       │
│  content automatically           │
│  {userInput} → safe              │
│                 ↓                 │
│  HTML entities ✓                 │
│  No script tags ✓                │
└──────────────────────────────────┘
                 ↓
┌──────────────────────────────────┐
│      AUDIT LOGGING               │
│  (Complete Trail)                │
├──────────────────────────────────┤
│  Every action logged:            │
│  - who (user_id)                 │
│  - what (action, table)          │
│  - when (timestamp)              │
│  - where (ip_address)            │
│  - before/after state            │
│                 ↓                 │
│  Accountability ✓                │
│  Forensics ✓                     │
└──────────────────────────────────┘
```

---

## 9. Error Handling Flow

```
User submits invalid data
        ↓
Frontend validation FAILS
    ├─ Show error toast (red)
    ├─ Highlight field (red border)
    └─ STOP (don't send request)
        ↓

[User fixes and resubmits]
        ↓
Frontend validation PASSES
        ↓
POST /api/v1/entries
        ↓
Backend middleware validates AGAIN
    ├─ Joi schema check
    ├─ Authorization check
    └─ Business rules check
        ↓
    ├─ PASS → Continue
    └─ FAIL → Catch error
            ├─ Validation error (400)
            │  {error: {code: 'VALIDATION_ERROR', details: [...]}}
            ├─ Auth error (401)
            │  {error: {code: 'UNAUTHORIZED'}}
            ├─ Permission error (403)
            │  {error: {code: 'FORBIDDEN'}}
            ├─ Not found (404)
            │  {error: {code: 'NOT_FOUND'}}
            └─ Server error (500)
               {error: {code: 'DATABASE_ERROR'}}
        ↓
Frontend error interceptor catches
    ├─ Parse error code
    ├─ Show error toast (red, auto-dismiss)
    ├─ Revert optimistic update in Zustand
    └─ Show retry button (optional)
        ↓
Logger records full context
    ├─ User: usuário1
    ├─ Action: create_entry
    ├─ Error: Validation failed
    └─ Timestamp: 2026-03-09 14:35:00
        ↓
User sees message
"Erro: Validação falhou. Tente novamente."
```

---

**Diagrams Reference:** Use these visual guides alongside the detailed documentation in system-design.md, api-spec.yaml, data-flow.md, and security-strategy.md.
