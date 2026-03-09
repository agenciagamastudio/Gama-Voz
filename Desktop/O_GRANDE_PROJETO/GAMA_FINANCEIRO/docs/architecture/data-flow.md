# GAMA Financeiro — Data Flow (Fluxo de Dados)

**Arquiteto:** @architect (Ana)
**Data:** 2026-03-09
**Status:** ✅ COMPLETE

---

## 📐 Diagrama de Fluxo Geral

```
┌─────────────────────────────────────────────────────────────────┐
│  FRONTEND (React + Zustand)                                    │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ User Interaction                                          │ │
│  │ (Form, Click, Filter)                                    │ │
│  └──────────────────────────┬────────────────────────────────┘ │
│                             ↓                                   │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Validation Layer (Frontend)                               │ │
│  │ - Type checking (string, number, date)                   │ │
│  │ - Range validation (min/max values)                      │ │
│  │ - Required fields check                                  │ │
│  │ - Format validation (email, phone, etc)                  │ │
│  └──────────────────────────┬────────────────────────────────┘ │
│                             ↓                                   │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Zustand Store Update                                      │ │
│  │ - Optimistic update (immediate UI feedback)              │ │
│  │ - Store pending action state                             │ │
│  │ - Loading flag set to true                               │ │
│  └──────────────────────────┬────────────────────────────────┘ │
└─────────────────────────────┼────────────────────────────────────┘
                              ↓
                    HTTP POST/PUT/DELETE
                    {Authorization: Bearer token}
                    Content-Type: application/json
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  BACKEND (Node.js + Express)                                   │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Middleware Stack                                          │ │
│  │ 1. CORS check (localhost:5173)                           │ │
│  │ 2. Body parser (JSON, limit: 10mb)                       │ │
│  │ 3. Auth middleware (JWT verify)                          │ │
│  │ 4. Rate limiter (100 req/min per IP)                     │ │
│  │ 5. Request logger (Winston)                              │ │
│  └──────────────────────────┬────────────────────────────────┘ │
│                             ↓                                   │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Route Handler → Controller                                │ │
│  │ - Extract params, query, body                            │ │
│  │ - Normalize data format                                  │ │
│  │ - Pass to service layer                                  │ │
│  └──────────────────────────┬────────────────────────────────┘ │
│                             ↓                                   │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Service Layer                                             │ │
│  │ - Input validation (Joi/Zod schemas)                     │ │
│  │ - Business logic (calculations)                          │ │
│  │ - Authorization checks (user rights)                     │ │
│  │ - Database interaction (queries)                         │ │
│  │ - Error handling & formatting                            │ │
│  └──────────────────────────┬────────────────────────────────┘ │
│                             ↓                                   │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Database Transaction                                      │ │
│  │ - Prepared statements (SQL injection safe)               │ │
│  │ - ACID transaction (all or nothing)                      │ │
│  │ - Index usage (fast queries)                             │ │
│  └──────────────────────────┬────────────────────────────────┘ │
│                             ↓                                   │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Audit Log Entry                                           │ │
│  │ - Before state (se update/delete)                        │ │
│  │ - After state (novo registro)                            │ │
│  │ - User ID, timestamp, IP address                         │ │
│  │ - Action (create, update, delete)                        │ │
│  └──────────────────────────┬────────────────────────────────┘ │
│                             ↓                                   │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Response Formatting                                       │ │
│  │ - Success response (HTTP 200/201)                        │ │
│  │ - Include updated record(s)                              │ │
│  │ - Include calculations (margens, lucro)                  │ │
│  │ - Pagination info (se lista)                             │ │
│  └──────────────────────────┬────────────────────────────────┘ │
└─────────────────────────────┼────────────────────────────────────┘
                              ↓
                    HTTP 200/201/400/401/404
                    Content-Type: application/json
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  FRONTEND (React + Zustand)                                    │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Response Handler (Axios)                                  │ │
│  │ - Check HTTP status                                      │ │
│  │ - Parse JSON response                                    │ │
│  │ - Interceptor (auto-refresh token se expirado)          │ │
│  │ - Error handling                                         │ │
│  └──────────────────────────┬────────────────────────────────┘ │
│                             ↓                                   │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Zustand Store Update (Final)                              │ │
│  │ - Replace optimistic data com real data                  │ │
│  │ - Update dependencies (gráficos, totalizadores)          │ │
│  │ - Clear pending/loading state                            │ │
│  │ - Store to localStorage (persistence)                    │ │
│  └──────────────────────────┬────────────────────────────────┘ │
│                             ↓                                   │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ UI Re-render                                              │ │
│  │ - Components subscribe to Zustand changes                │ │
│  │ - React diff algorithm (virtual DOM)                     │ │
│  │ - Minimal DOM updates                                    │ │
│  │ - Animations (if applicable)                             │ │
│  └───────────────────────────────────────────────────────────┘ │
│                             ↓                                   │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ User Sees Update                                          │ │
│  │ - New values displayed                                   │ │
│  │ - Gráficos atualizados                                   │ │
│  │ - Toast notification (sucesso/erro)                      │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔐 Fluxo de Autenticação (Detalhado)

```
┌──────────────────────────────────────────────────────────────────┐
│ LOGIN FLOW                                                       │
└──────────────────────────────────────────────────────────────────┘

User: Acessa página /login
       ↓
       Vê formulário (username, password)
       ↓
       Preenche dados
       ↓
       Clica "Login"
       ↓
Frontend: Validação
   - Username: minLength 3, maxLength 50
   - Password: minLength 6
   - Ambos não vazios
       ↓
Frontend: POST /api/v1/auth/login
   {
     "username": "usuário1",
     "password": "senha123"
   }
       ↓
Backend: AuthController.login()
   - Extract username, password from request body
   - Call AuthService.authenticate()
       ↓
Backend: AuthService.authenticate()
   - Query database: SELECT * FROM users WHERE username = ?
   - If not found: throw 401 Unauthorized
   - If found: call bcryptjs.compare(password, user.password_hash)
   - If mismatch: throw 401 Unauthorized
   - If match: proceed
       ↓
Backend: JWT Token Generation
   - Create payload: {id, username, iat: now, exp: now + 7d}
   - Sign with HS256 algorithm + secret
   - Return token string
       ↓
Backend: Response (200 OK)
   {
     "success": true,
     "user": {
       "id": "1",
       "username": "usuário1",
       "createdAt": "2026-02-01T10:00:00Z",
       "isActive": true
     },
     "token": "eyJhbGc...",
     "expiresIn": 604800
   }
       ↓
Frontend: Axios interceptor captures response
   - Save token to localStorage: 'gama_auth_token'
   - Save user to localStorage: 'gama_user'
   - Update Zustand auth store
   - Set axios default header: "Authorization: Bearer {token}"
       ↓
Frontend: useEffect watches auth.token
   - If token exists: redirect to /dashboard
   - If not: stay on /login
       ↓
User: Vê dashboard (fica autenticado)
       ↓

┌──────────────────────────────────────────────────────────────────┐
│ TOKEN VERIFICATION (every request)                               │
└──────────────────────────────────────────────────────────────────┘

Frontend: Every API request includes header:
   Authorization: Bearer eyJhbGc...
       ↓
Backend: Auth middleware
   - Extract Authorization header
   - Parse "Bearer {token}"
   - Verify with JWT secret
   - If valid: extract payload (id, username, iat, exp)
   - If invalid: throw 401
   - If expired: throw 401
   - Attach user info to request object
       ↓
Backend: Controller uses req.user
   - req.user.id
   - req.user.username
   - For audit logging, authorization checks
       ↓

┌──────────────────────────────────────────────────────────────────┐
│ TOKEN REFRESH (Axios interceptor)                                │
└──────────────────────────────────────────────────────────────────┘

Frontend: Any request returns 401
       ↓
Axios: Interceptor.response catches 401
   - Check if it's token expiration
   - Try to refresh token (opcional, Phase 2)
   - Or redirect to /login
       ↓
Frontend: User re-authenticates
```

---

## 📝 Fluxo de Lançamento (CREATE)

```
User: Clica "Adicionar Lançamento"
       ↓
Frontend: Modal/Form abre
   - Campo: Categoria (dropdown)
   - Campo: Linha Item (texto)
   - Campo: Tipo (Planejado/Realizado)
   - Campo: Valor (número)
       ↓
Frontend: User preenche e clica "Salvar"
       ↓
Frontend: Validação
   - Categoria: required, enum check
   - Linha Item: required, string, max 100 chars
   - Tipo: required, enum (planned/actual)
   - Valor: required, number, >= 0
   - Show error toast se validação falha
       ↓
Frontend: Optimistic Update
   - Create local entry object (sem ID ainda)
   - Add to Zustand store immediately
   - UI atualiza (novo item aparece, gráficos mudam)
   - Set loading state
       ↓
Frontend: POST /api/v1/entries
   {
     "periodId": "1",
     "category": "VENDAS",
     "lineItem": "Vendas Produto A",
     "type": "planned",
     "value": 5000.00,
     "parentId": null
   }
   With header: Authorization: Bearer {token}
       ↓
Backend: Middleware chain
   1. CORS: Check origin (localhost:5173) ✓
   2. Body parser: Parse JSON ✓
   3. Auth: Verify JWT, set req.user ✓
   4. Rate limiter: Check IP quota ✓
   5. Logger: Log request ✓
       ↓
Backend: EntryController.create()
   - Extract body: periodId, category, lineItem, type, value
   - Extract user from req.user.id
   - Call EntryService.createEntry()
       ↓
Backend: EntryService.createEntry()
   Validation (Joi schema):
   - periodId: string, required
   - category: enum [VENDAS, CUSTOS_VARIAVEIS, CUSTOS_FIXOS, INVESTIMENTOS]
   - lineItem: string, min 3, max 100
   - type: enum [planned, actual]
   - value: number, >= 0, <= 999999999

   If validation fails:
   - Throw ValidationError with details
   - Response 400 Bad Request
       ↓
Backend: Authorization Check
   - Check if user has access to this period
   - Check if period is open (not closed)
   - If not: throw 403 Forbidden
       ↓
Backend: Database Transaction START
       ↓
Backend: INSERT INTO entries (period_id, category, line_item, type, value, created_by_id, created_at, updated_at)
   VALUES (1, 'VENDAS', 'Vendas Produto A', 'planned', 5000.00, 1, now(), now())
   RETURNING *
       ↓
Backend: Get generated ID from INSERT
   - entryId = 42
       ↓
Backend: Trigger Calculation Recalculation
   - Call FinancialService.recalculateMargins(periodId)
   - Recalculate:
     * MARGEM_CONTRIBUICAO = VENDAS - CUSTOS_VARIAVEIS
     * LUCRO_OPERACIONAL = MARGEM - CUSTOS_FIXOS
     * LUCRO_LIQUIDO = LUCRO_OPERACIONAL - INVESTIMENTOS
     * Percentuais (% de vendas)
     * Variações (Realizado vs Planejado)
   - Return updated calculations
       ↓
Backend: INSERT INTO audit_logs
   {
     "user_id": 1,
     "table_name": "entries",
     "record_id": 42,
     "action": "create",
     "before": null,
     "after": {
       "id": 42,
       "period_id": 1,
       "category": "VENDAS",
       "line_item": "Vendas Produto A",
       "type": "planned",
       "value": 5000.00,
       "created_by_id": 1,
       "created_at": "2026-03-09T14:30:00Z"
     },
     "timestamp": "2026-03-09T14:30:00Z",
     "ip_address": "192.168.1.100"
   }
       ↓
Backend: Database Transaction COMMIT
   - All or nothing
   - Both entry and audit log inserted or both fail
       ↓
Backend: Response (201 Created)
   {
     "success": true,
     "data": {
       "id": "42",
       "periodId": "1",
       "category": "VENDAS",
       "lineItem": "Vendas Produto A",
       "type": "planned",
       "value": 5000.00,
       "percentage": 100.00,
       "parentId": null,
       "children": [],
       "createdBy": {
         "id": "1",
         "username": "usuário1"
       },
       "createdAt": "2026-03-09T14:30:00Z",
       "updatedAt": "2026-03-09T14:30:00Z"
     },
     "calculations": {
       "vendas": 13000.00,
       "custosVariaveis": 1140.00,
       "margemContribuicao": 11860.00,
       "margemContribuicaoPercentual": 91.23,
       ...
     }
   }
       ↓
Frontend: Response received
   - Axios success interceptor
   - Check HTTP 201
   - Parse JSON
       ↓
Frontend: Replace optimistic data
   - Remove local entry (without ID)
   - Add real entry with server ID (42)
   - Update Zustand store
   - Clear loading state
   - Store to localStorage
       ↓
Frontend: Show success toast
   - "Lançamento criado com sucesso!"
   - Auto-dismiss after 3s
       ↓
Frontend: UI Re-render
   - Entry table shows new row with ID 42
   - Gráficos atualizam (margens, lucro)
   - Totalizadores refrescam
       ↓
User: Vê novo lançamento na tela
```

---

## 🔄 Fluxo de Lançamento (UPDATE)

```
User: Clica "Editar" em lançamento existente (ID 42)
       ↓
Frontend: Modal abre com valores pré-preenchidos
   - Valor anterior: 5000.00
   - User muda para: 5500.00
   - User clica "Atualizar"
       ↓
Frontend: Validação (igual ao create)
       ↓
Frontend: Optimistic Update
   - Update local entry in Zustand
   - value: 5500.00
   - UI atualiza imediatamente
       ↓
Frontend: PUT /api/v1/entries/42
   {
     "lineItem": "Vendas Produto A",
     "value": 5500.00
   }
   With Authorization header
       ↓
Backend: EntryController.update()
   - Extract entryId from URL param (42)
   - Extract body (lineItem, value)
   - Call EntryService.updateEntry(42, {lineItem, value})
       ↓
Backend: EntryService.updateEntry()
   - Validate input schema
   - Check authorization (user owns this entry's period)
   - SELECT * FROM entries WHERE id = 42 (get current state)
   - Store as "before" state
       ↓
Backend: Database Transaction START
       ↓
Backend: UPDATE entries SET value = 5500.00, updated_at = now() WHERE id = 42
   RETURNING *
       ↓
Backend: Get updated entry
   - Store as "after" state
   - Recalculate calculations
       ↓
Backend: INSERT INTO audit_logs
   {
     "action": "update",
     "before": {value: 5000.00, ...},
     "after": {value: 5500.00, ...},
     ...
   }
       ↓
Backend: Transaction COMMIT
       ↓
Backend: Response (200 OK)
   {
     "success": true,
     "data": {id: 42, value: 5500.00, ...},
     "calculations": {...}
   }
       ↓
Frontend: Replace optimistic with server data
   - Same flow as create
       ↓
Frontend: Show success toast + UI update
```

---

## 🗑️ Fluxo de Lançamento (DELETE)

```
User: Clica "Deletar" em lançamento (ID 42)
       ↓
Frontend: Confirmation modal
   - "Tem certeza que deseja deletar?"
   - User clica "Sim"
       ↓
Frontend: Optimistic Update
   - Remove entry from Zustand immediately
   - UI atualiza (entrada sumiu, gráficos mudaram)
       ↓
Frontend: DELETE /api/v1/entries/42
   With Authorization header
       ↓
Backend: EntryController.delete()
   - Extract entryId (42)
   - Get current entry state (for audit)
   - Call EntryService.deleteEntry(42)
       ↓
Backend: Database Transaction START
       ↓
Backend: SELECT * FROM entries WHERE id = 42
   - Store as "before" state
       ↓
Backend: DELETE FROM entries WHERE id = 42
       ↓
Backend: INSERT INTO audit_logs
   {
     "action": "delete",
     "before": {id: 42, value: 5500.00, ...},
     "after": null,
     ...
   }
       ↓
Backend: Transaction COMMIT
       ↓
Backend: Response (200 OK)
   {
     "success": true,
     "message": "Entry deleted",
     "calculations": {...}
   }
       ↓
Frontend: Confirm deletion (show toast)
   - "Lançamento deletado com sucesso!"
```

---

## 📊 Fluxo de Cálculo (Automático)

Sempre que um lançamento é criado/atualizado/deletado:

```
Trigger: Entry INSERT/UPDATE/DELETE
   ↓
Backend: FinancialService.recalculateMargins(periodId)
   ↓
Step 1: Get ALL entries for period
   SELECT * FROM entries WHERE period_id = 1
   ↓
Step 2: Group by category
   VENDAS: [sum of all vendas entries]
   CUSTOS_VARIAVEIS: [sum of all custos variáveis]
   CUSTOS_FIXOS: [sum of all custos fixos]
   INVESTIMENTOS: [sum of all investimentos]
   ↓
Step 3: Calculate derived values
   MARGEM_CONTRIBUICAO = VENDAS - CUSTOS_VARIAVEIS
   LUCRO_OPERACIONAL = MARGEM_CONTRIBUICAO - CUSTOS_FIXOS
   LUCRO_LIQUIDO = LUCRO_OPERACIONAL - INVESTIMENTOS
   ↓
Step 4: Calculate percentuais (% de vendas)
   % = (value / VENDAS) * 100
   ↓
Step 5: Calculate variações (Realizado vs Planejado)
   For each category:
     planned_sum = sum(where type = 'planned')
     actual_sum = sum(where type = 'actual')
     variance = ((actual_sum - planned_sum) / planned_sum) * 100
   ↓
Step 6: Calculate ponto de equilíbrio
   PDE = CUSTOS_FIXOS / (MARGEM_CONTRIBUICAO / VENDAS)
   ↓
Step 7: Return calculations object
   {
     vendas: 13000.00,
     custosVariaveis: 1140.00,
     margemContribuicao: 11860.00,
     margemContribuicaoPercentual: 91.23,
     custosFixos: 6043.18,
     lucroOperacional: 5816.82,
     lucroOperacionalPercentual: 44.74,
     investimentos: 0,
     lucroLiquido: 5816.82,
     pontoEquilibrio: 6634.58,
     variacao: {
       vendas: -12.11,
       custos: 106.89,
       margem: -23.55,
       lucro: -9.43
     }
   }
```

---

## 📤 Fluxo de Exportação (PDF)

```
User: Clica "Exportar PDF"
       ↓
Frontend: POST /api/v1/exports/pdf
   {
     "periodId": "1",
     "includeCharts": true,
     "includeAnalysis": true
   }
       ↓
Backend: ReportController.exportPDF()
   - Extract periodId, options
   - Call ReportService.generatePDF()
       ↓
Backend: ReportService.generatePDF()
   - Get all entries for period (hierarchical)
   - Get calculations
   - Create new PDFKit document
   ↓
   Step 1: Header
   - Logo GAMA
   - Título: "Demonstração de Resultado do Exercício"
   - Período: "Fevereiro de 2026"
   ↓
   Step 2: DRE Table (hierarchical)
   - Seção 1: VENDAS TOTAIS
     └─ Linha itens com valores (planejado, %, realizado, %, variação)
   - Seção 2: CUSTOS VARIÁVEIS
     └─ Subitens indentados
   - Seção 3: MARGEM DE CONTRIBUIÇÃO (totalizado)
   - ... (etc para outras seções)
   ↓
   Step 3: Gráficos (se includeCharts)
   - Recharts export to SVG/PNG
   - Insert into PDF:
     * Chart 1: Receita (Planejado vs Realizado)
     * Chart 2: Custos por Categoria
     * Chart 3: Margem de Contribuição
     * Chart 4: Lucro Operacional
   ↓
   Step 4: Analysis (se includeAnalysis)
   - Sumário executivo em texto
   - KPIs principais
   - Desvios relevantes
   - Recomendações
   ↓
   Step 5: Footer
   - Data de geração
   - Usuário que gerou
   - Número de páginas
   ↓
Backend: Pipe PDF stream
   - Set headers:
     Content-Type: application/pdf
     Content-Disposition: attachment; filename="DRE-2026-02.pdf"
   - Stream PDF bytes to client
       ↓
Frontend: Browser receives PDF
   - Detects Content-Disposition: attachment
   - Starts download
   - File saved as DRE-2026-02.pdf
       ↓
User: Vê PDF no seu computador
```

---

## 🔍 Fluxo de Auditoria (Histórico)

```
User: Clica "Histórico"
       ↓
Frontend: GET /api/v1/audit?periodId=1&limit=50&page=1
       ↓
Backend: AuditController.getAuditLogs()
   - Parse query params
   - Call AuditService.getAuditLogs(filters)
       ↓
Backend: Query with filters
   SELECT * FROM audit_logs
   WHERE period_id = 1
   ORDER BY timestamp DESC
   LIMIT 50
       ↓
Backend: Format response
   - Include user names (join with users table)
   - Format dates
   - Include before/after states
   - Pagination info
       ↓
Backend: Response (200 OK)
   {
     "success": true,
     "data": [
       {
         "id": "1",
         "user": "usuário1",
         "tableName": "entries",
         "recordId": "42",
         "action": "update",
         "before": {value: 5000.00},
         "after": {value: 5500.00},
         "timestamp": "2026-03-09T14:35:00Z",
         "ipAddress": "192.168.1.100"
       },
       ...
     ],
     "pagination": {...}
   }
       ↓
Frontend: Display in table/timeline
   - User: usuário1
   - Ação: Alterou
   - Registro: entries ID 42
   - De: 5000.00
   - Para: 5500.00
   - Quando: 09/03/2026 às 14:35
   - De onde: 192.168.1.100
```

---

## ⚠️ Fluxo de Erro (Example)

```
User: Preenche formulário com valor negativo (-100)
       ↓
Frontend: Validation catches
   - value >= 0 validation fails
   - Show error message: "Valor deve ser positivo"
   - Block submission
       ↓
[User fixes and resubmits]
       ↓
User: Submits valid form
       ↓
Frontend: POST /api/v1/entries
   {value: 5000.00, ...}
       ↓
Backend: Service validation passes
       ↓
Backend: Database error (connection lost)
   - try/catch in transaction
   - Rollback transaction
       ↓
Backend: Error handler middleware
   - Catch database error
   - Log error with context (user, action, time)
   - Format error response
       ↓
Backend: Response (500 Internal Server Error)
   {
     "success": false,
     "error": {
       "code": "DATABASE_ERROR",
       "message": "Falha ao salvar dados. Tente novamente.",
       "details": "Connection timeout"
     }
   }
       ↓
Frontend: Axios error interceptor
   - Detect 500 error
   - Show error toast: "Falha ao conectar. Tente novamente."
   - Revert optimistic update in Zustand
   - Show retry button
       ↓
User: Vê mensagem de erro e tenta novamente
```

---

## 📋 Data Consistency Guarantees

1. **Atomic Transactions** — Entry + Audit log são inseridos juntos
2. **Foreign Keys** — Entradas sempre referem a períodos válidos
3. **Constraints** — Valores não podem ser null, tipos validados
4. **Audit Trail** — Toda mudança é registrada com before/after
5. **Backup** — Auto-backup antes de mudanças críticas
6. **Recovery** — Audit logs permitem reconstruir estado anterior

---

## 🔄 Data Persistence

### localStorage (Frontend)
- Token JWT
- User info (id, username)
- Current filters (período selecionado, categoria)
- UI state (theme, modal open/closed)

### SQLite (Backend)
- Users (credentials, metadata)
- Periods (financial periods)
- Entries (line items com dados)
- Audit Logs (completo histórico)

### Backup (Daily)
- `data/backups/gama-financeiro-YYYY-MM-DD.db`
- Incremental backup (apenas mudanças)

### Sync (Phase 2)
- Replica to Google Drive
- Merge conflicts via timestamp + CRDTs

---

**Próximo Passo:** @data-engineer implementa schema.sql e migrations com base neste fluxo
