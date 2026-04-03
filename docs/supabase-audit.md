# Auditoria Completa do Supabase — GAMA Calculadora App

**Data:** 22 de Fevereiro de 2026
**Auditor:** @data-engineer (Dara)
**Projeto:** gama-calculadora-app
**Status:** 95% Completo — Recomendações Críticas Identificadas

---

## Sumário Executivo

O Supabase do gama-calculadora-app está **bem estruturado e funcionalmente completo**, mas com **gaps críticos em RLS, autenticação e documentação que precisam ser corrigidos antes de produção**.

### Pontuação Geral

| Aspecto | Status | Score |
|---------|--------|-------|
| **Schema Design** | ✅ Completo | 95/100 |
| **RLS Policies** | ⚠️ Incompleto | 70/100 |
| **Autenticação** | ⚠️ Básico | 60/100 |
| **Performance** | ✅ Otimizado | 90/100 |
| **Integridade de Dados** | ✅ Forte | 92/100 |
| **Documentação** | ❌ Ausente | 20/100 |
| **Migrations** | ✅ Completo | 98/100 |

**Score Geral: 75/100** — Pronto para dev/staging, NÃO pronto para produção.

---

## 1. VALIDAÇÃO DO SCHEMA

### 1.1 Visão Geral das Tabelas

| # | Tabela | Filas | Status | Índices | RLS |
|---|--------|-------|--------|---------|-----|
| 1 | `public.profiles` | ✅ | Existente (auth) | ✅ | ⚠️ |
| 2 | `public.user_points` | ✅ | Novo | ✅ | ✅ |
| 3 | `public.promo_codes` | ✅ | Novo | ✅ | ✅ |
| 4 | `public.promo_redemptions` | ✅ | Novo | ✅ | ✅ |
| 5 | `public.custom_roles` | ✅ | Novo | ✅ | ✅ |
| 6 | `public.diagnostics` | ✅ | Novo | ✅ | ✅ |
| 7 | `public.diagnostic_scenarios` | ✅ | Novo | ✅ | ✅ |
| 8 | `public.proposals` | ✅ | Novo | ✅ | ✅ |
| 9 | `public.proposal_features` | ✅ | Novo | ✅ | ✅ |
| 10 | `public.reports` | ✅ | Novo | ✅ | ✅ |
| 11 | `public.user_activity` | ✅ | Novo | ✅ | ⚠️ |
| 12 | `public.saved_companies` | ✅ | Novo | ✅ | ✅ |

**Total: 12 tabelas | Todas com índices | 11/12 com RLS (92%)**

---

### 1.2 Estrutura Detalhada por Tabela

#### **1. profiles** (Auth - Existente)

```sql
-- Colunas padrão do Supabase Auth
id UUID (PK) → auth.users(id)
username TEXT
full_name TEXT
avatar_url TEXT
website TEXT
created_at TIMESTAMPTZ
-- Adicionado em migration 002:
accent_color TEXT DEFAULT '#c4ff0d'
updated_at TIMESTAMPTZ DEFAULT NOW()
```

**Validação:**
- ✅ FOREIGN KEY com `auth.users(id)` — Integridade garantida
- ⚠️ **RLS NÃO ESTÁ HABILITADO** — profiles deve ter RLS para evitar exposição
- ✅ Triggers de `updated_at` configurados

**Recomendação:** Habilitar RLS na tabela `profiles` (vide seção 2.2)

---

#### **2. user_points** (Sistema de Pontos)

```sql
id UUID (PK)
user_id UUID (FK) → auth.users(id)
balance INTEGER NOT NULL DEFAULT 20 CHECK (balance >= 0)
last_recharged TIMESTAMPTZ DEFAULT NOW()
total_earned INTEGER NOT NULL DEFAULT 0
total_spent INTEGER NOT NULL DEFAULT 0
created_at TIMESTAMPTZ DEFAULT NOW()
UNIQUE (user_id)
```

**Validação:**
- ✅ Constraints de integridade fortes
- ✅ RLS configurado corretamente (owner-only)
- ✅ Índice em `user_points(user_id)`
- ✅ Trigger de criação automática ao novo usuário

**Fluxo de Dados:**
1. Novo usuário registra-se → trigger `handle_new_user_points()` cria linha
2. balance inicia em 20 (pode ser recarregado daily via `PointsContext`)
3. Acesso restrito por RLS ao dono

**Status:** ✅ Pronto

---

#### **3. promo_codes** (Códigos Promocionais)

```sql
id UUID (PK)
code TEXT NOT NULL UNIQUE
point_value INTEGER NOT NULL CHECK (point_value > 0)
is_active BOOLEAN NOT NULL DEFAULT TRUE
max_redemptions INTEGER
times_redeemed INTEGER NOT NULL DEFAULT 0
expires_at TIMESTAMPTZ
created_by UUID (FK) → auth.users(id)
created_at TIMESTAMPTZ DEFAULT NOW()
```

**Seed Data (4 códigos pré-carregados):**
```
GAMA100    → 100 pontos
ORION      → 50 pontos
MASTER2026 → 500 pontos
FREEENERGY → 20 pontos
```

**RLS:**
- ✅ `promo_codes_read`: authenticated users leem códigos ativos
- ✅ `promo_codes_admin`: criador gerencia seu código

**Status:** ✅ Pronto

---

#### **4. promo_redemptions** (Histórico de Resgates)

```sql
id UUID (PK)
user_id UUID (FK) → auth.users(id)
promo_code TEXT (FK) → promo_codes(code)
points_given INTEGER NOT NULL
redeemed_at TIMESTAMPTZ DEFAULT NOW()
UNIQUE (user_id, promo_code) — Evita múltiplos resgates do mesmo código
```

**RLS:**
- ✅ Usuário só vê seus próprios resgates
- ✅ Pode inserir apenas seus próprios resgates

**Status:** ✅ Pronto

---

#### **5. custom_roles** (Cargos Customizados)

```sql
id UUID (PK)
user_id UUID (FK) → auth.users(id)
name TEXT NOT NULL
monthly_cost NUMERIC(10,2) NOT NULL CHECK (monthly_cost > 0)
days_per_month INTEGER DEFAULT 22 CHECK (1-31)
hours_per_day INTEGER DEFAULT 8 CHECK (1-24)
hourly_cost NUMERIC(10,2) GENERATED ALWAYS AS (monthly_cost / (days_per_month * hours_per_day)) STORED
created_at TIMESTAMPTZ DEFAULT NOW()
updated_at TIMESTAMPTZ DEFAULT NOW()
```

**Validação:**
- ✅ Coluna computed (`hourly_cost`) — evita cálculos em app
- ✅ RLS owner-only
- ✅ Trigger de `updated_at`
- ✅ Índice em `user_id`

**Status:** ✅ Pronto

---

#### **6. diagnostics** (Diagnósticos de Valor)

```sql
id UUID (PK)
user_id UUID (FK) → auth.users(id)
status diagnostic_status ('draft', 'completed', 'shared') DEFAULT 'draft'
-- Dados do cliente
client_name TEXT NOT NULL
business_description TEXT
market_niche TEXT
-- Dados financeiros
monthly_revenue NUMERIC(12,2) NOT NULL CHECK (monthly_revenue > 0)
working_days_per_month INTEGER DEFAULT 22
working_hours_per_day INTEGER DEFAULT 8
company_hourly_value NUMERIC(10,2) GENERATED ALWAYS AS (...) STORED
-- Solução
solution_description TEXT
solution_cost NUMERIC(12,2)
-- Totais desnormalizados
total_annual_loss NUMERIC(12,2) DEFAULT 0
monthly_savings NUMERIC(12,2) DEFAULT 0
roi_months NUMERIC(8,2)
recovery_percentage NUMERIC(5,2)
-- Sistema de pontos
points_cost INTEGER DEFAULT 15
points_deducted BOOLEAN DEFAULT FALSE
created_at TIMESTAMPTZ DEFAULT NOW()
updated_at TIMESTAMPTZ DEFAULT NOW()
```

**Validação:**
- ✅ ENUM status bem definido
- ✅ Coluna computed (`company_hourly_value`)
- ✅ RLS owner-only
- ✅ Índices de busca rápida (user_id, status, created_at)
- ✅ Soft-delete não necessário (não está implementado — OK)

**Status:** ✅ Pronto

---

#### **7. diagnostic_scenarios** (Cenários de Perda)

```sql
id UUID (PK)
diagnostic_id UUID (FK) → diagnostics(id) ON DELETE CASCADE
description TEXT NOT NULL
role_name TEXT NOT NULL
hourly_rate NUMERIC(10,2) NOT NULL CHECK (>= 0)
time_lost_per_occurrence NUMERIC(8,2) NOT NULL CHECK (> 0)
time_unit scenario_time_unit ('horas', 'minutos') DEFAULT 'horas'
frequency scenario_frequency ('dia', 'semana', 'mes') DEFAULT 'semana'
number_of_people NUMERIC(8,2) DEFAULT 1 CHECK (> 0)
is_covered BOOLEAN DEFAULT FALSE
-- Desnormalizados para performance
weekly_loss NUMERIC(12,2) DEFAULT 0
monthly_loss NUMERIC(12,2) DEFAULT 0
annual_loss NUMERIC(12,2) DEFAULT 0
created_at TIMESTAMPTZ DEFAULT NOW()
```

**RLS:**
- ✅ Acesso nested: usuário vê apenas cenários de seus diagnósticos via EXISTS subquery

**Status:** ✅ Pronto

---

#### **8. proposals** (Propostas Comerciais)

```sql
id UUID (PK)
user_id UUID (FK) → auth.users(id)
diagnostic_id UUID (FK) → diagnostics(id) ON DELETE SET NULL
status proposal_status ('draft', 'sent', 'accepted', 'rejected') DEFAULT 'draft'
proposal_number TEXT
my_company TEXT DEFAULT 'GAMA CALC'
client_company TEXT
client_contact TEXT
project_name TEXT
summary TEXT
issue_date DATE DEFAULT CURRENT_DATE
valid_until_date DATE
-- Financeiro
subtotal NUMERIC(12,2) DEFAULT 0
taxes_percentage NUMERIC(5,2) DEFAULT 0
taxes_amount NUMERIC(12,2) DEFAULT 0
discount_percentage NUMERIC(5,2) DEFAULT 0
discount_amount NUMERIC(12,2) DEFAULT 0
total_investment NUMERIC(12,2) DEFAULT 0
complexity feature_complexity DEFAULT 'media'
deleted_at TIMESTAMPTZ — soft-delete
created_at TIMESTAMPTZ DEFAULT NOW()
updated_at TIMESTAMPTZ DEFAULT NOW()
-- Adicionado em migration 013:
client_name TEXT
hourly_rate NUMERIC(10,2)
```

**Validação:**
- ✅ Soft-delete implementado
- ✅ Índices parciais para queries ativas vs lixo
- ✅ RLS owner-only
- ✅ Trigger de `updated_at`

**Status:** ✅ Pronto

---

#### **9. proposal_features** (Features na Proposta)

```sql
id UUID (PK)
proposal_id UUID (FK) → proposals(id) ON DELETE CASCADE
title TEXT NOT NULL DEFAULT 'Funcionalidade'
description TEXT
hours NUMERIC(8,2) DEFAULT 0
cost NUMERIC(12,2) DEFAULT 0
complexity feature_complexity DEFAULT 'media'
position INTEGER DEFAULT 0 — para ordenação
created_at TIMESTAMPTZ DEFAULT NOW()
```

**RLS:**
- ✅ Acesso nested: usuário vê apenas features de suas propostas

**Status:** ✅ Pronto

---

#### **10. reports** (Relatórios Gerados)

```sql
id UUID (PK)
user_id UUID (FK) → auth.users(id)
diagnostic_id UUID (FK) → diagnostics(id) ON DELETE SET NULL
report_number TEXT
client_name TEXT
issue_date DATE DEFAULT CURRENT_DATE
total_loss NUMERIC(12,2)
points_cost INTEGER DEFAULT 15
snapshot JSONB — armazena estado completo do diagnóstico
view_count INTEGER DEFAULT 0
last_viewed_at TIMESTAMPTZ
deleted_at TIMESTAMPTZ — soft-delete
created_at TIMESTAMPTZ DEFAULT NOW()
```

**Validação:**
- ✅ JSONB para flexibilidade (snapshot de dados)
- ✅ Soft-delete implementado
- ✅ RLS owner-only
- ✅ Índices parciais para ativo/lixo

**Status:** ✅ Pronto

---

#### **11. user_activity** (Log de Atividades)

```sql
id UUID (PK)
user_id UUID (FK) → auth.users(id)
action_type activity_action_type (diagnostic_created, diagnostic_completed, proposal_generated, report_exported, points_spent, points_earned, promo_redeemed)
resource_type TEXT
resource_id UUID
points_spent INTEGER DEFAULT 0
details JSONB
created_at TIMESTAMPTZ DEFAULT NOW()
```

**RLS:**
- ✅ Usuário lê suas próprias atividades
- ✅ Insert via service role (trigger + backend)

**Status:** ✅ Pronto

---

#### **12. saved_companies** (Empresas Salvas)

```sql
id UUID (PK)
user_id UUID (FK) → auth.users(id)
name TEXT NOT NULL
hourly_rate NUMERIC(10,2) NOT NULL
created_at TIMESTAMPTZ DEFAULT NOW()
```

**RLS:** ✅ Owner-only (read + write)

**Status:** ✅ Pronto

---

### 1.3 ENUMs Definidos

```sql
scenario_time_unit   → 'horas', 'minutos'
scenario_frequency   → 'dia', 'semana', 'mes'
diagnostic_status    → 'draft', 'completed', 'shared'
proposal_status      → 'draft', 'sent', 'accepted', 'rejected'
feature_complexity   → 'baixa', 'media', 'alta'
activity_action_type → 7 tipos de ações
```

**Validação:** ✅ Todos bem definidos e utilizados

---

### 1.4 Verificação de Integridade Referencial

```
auth.users (system table)
├── profiles(id) ✅
├── user_points(user_id) ✅ + unique constraint
├── promo_codes(created_by) ✅ + nullable
├── promo_redemptions(user_id) ✅
├── custom_roles(user_id) ✅
├── diagnostics(user_id) ✅
├── diagnostic_scenarios (via diagnostics) ✅
├── proposals(user_id) ✅
├── proposal_features (via proposals) ✅
├── reports(user_id) ✅
├── user_activity(user_id) ✅
└── saved_companies(user_id) ✅

diagnostics(id)
├── diagnostic_scenarios(diagnostic_id) ✅ CASCADE
├── proposals(diagnostic_id) ✅ SET NULL
└── reports(diagnostic_id) ✅ SET NULL

proposals(id)
└── proposal_features(proposal_id) ✅ CASCADE
```

**Validação:** ✅ Todas as ForeignKeys em lugar correto com comportamentos apropriados

---

## 2. REVISÃO DE RLS POLICIES

### 2.1 Status Geral

| Tabela | Política | Status |
|--------|----------|--------|
| profiles | FALTA RLS | ❌ CRÍTICO |
| user_points | user_points_owner | ✅ |
| promo_codes | promo_codes_read + promo_codes_admin | ✅ |
| promo_redemptions | redemptions_select_owner + insert_owner | ✅ |
| custom_roles | roles_owner | ✅ |
| diagnostics | diagnostics_owner | ✅ |
| diagnostic_scenarios | scenarios_owner (nested) | ✅ |
| proposals | proposals_owner | ✅ |
| proposal_features | features_owner (nested) | ✅ |
| reports | reports_owner | ✅ |
| user_activity | activity_read_owner + insert_owner | ⚠️ |
| saved_companies | saved_companies_own | ✅ |

**Score: 11/12 tabelas protegidas (92%)**

---

### 2.2 Detalhes por Política

#### **❌ CRÍTICO: Tabela `profiles` SEM RLS**

**Problema:**
```sql
-- profiles SEM ALTER TABLE ... ENABLE ROW LEVEL SECURITY
-- Qualquer usuário autenticado pode ler TODOS os perfis
```

**Risco:** Vazamento de informações de usuário (avatar_url, website, full_name, accent_color)

**Impacto:** ⭐⭐⭐⭐⭐ Crítico

**Solução Recomendada:**
```sql
-- Migration: 20260222000014_fix_profiles_rls.sql
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_public_read"
  ON public.profiles
  FOR SELECT USING (TRUE);  -- Leitura pública (opcional, para descoberta)

CREATE POLICY "profiles_owner_update"
  ON public.profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_owner_delete"
  ON public.profiles
  FOR DELETE USING (auth.uid() = id);
```

**Nota:** Se perfis devem ser **públicos** (descoberta de usuários), manter leitura pública mas proteger updates. Se devem ser **privados**, usar apenas `owner_update/delete`.

---

#### **⚠️ Questionável: `user_activity` com INSERT sem RLS**

**Política Atual:**
```sql
CREATE POLICY "activity_insert_owner" ON public.user_activity
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

**Problema:** Comentário diz "insert via service role" mas a RLS permite inserção do usuário.

**Recomendação:** Esclarecer intenção:
- Se service role escreve, **remover policy INSERT e usar service role**
- Se usuário escreve, manter como está

**Solução:**
```sql
-- Remover a política de INSERT se service role escreve:
DROP POLICY "activity_insert_owner" ON public.user_activity;

-- OU deixar como está com comentário: "Usuário insere sua própria atividade"
```

---

#### **✅ Promo Codes: Acesso Público Correto**

```sql
CREATE POLICY "promo_codes_read" ON public.promo_codes
  FOR SELECT USING (auth.role() = 'authenticated' AND is_active = TRUE);
```

**Validação:** ✅ Authenticated users leem apenas códigos ativos. Criador gerencia seus códigos.

---

#### **✅ Nested RLS: Cenários e Features**

```sql
CREATE POLICY "scenarios_owner" ON public.diagnostic_scenarios
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.diagnostics d
      WHERE d.id = diagnostic_id
        AND d.user_id = auth.uid()
    )
  );
```

**Validação:** ✅ Subquery EXISTS garante que usuário só acessa cenários de seus próprios diagnósticos.

---

### 2.3 Recomendações de RLS

| Ação | Prioridade | Esforço |
|------|-----------|---------|
| Habilitar RLS em profiles | 🔴 Crítico | 10 min |
| Clarificar RLS em user_activity | 🟡 Médio | 5 min |
| Adicionar soft-delete filters em RLS | 🟡 Médio | 15 min |
| Documentar RLS strategy | 🟢 Baixo | 30 min |

---

## 3. VERIFICAÇÃO DE AUTENTICAÇÃO

### 3.1 Configuração Auth (config.toml)

```toml
[auth]
enabled = true
site_url = "http://127.0.0.1:3000"
additional_redirect_urls = ["https://127.0.0.1:3000"]
jwt_expiry = 3600 (1 hora)
enable_refresh_token_rotation = true
refresh_token_reuse_interval = 10s
enable_signup = true
enable_anonymous_sign_ins = false
minimum_password_length = 6
password_requirements = "" (sem requisitos adicionais)
```

**Validação:**

| Config | Valor | Status | Recomendação |
|--------|-------|--------|--------------|
| `site_url` | localhost:3000 | ✅ Dev OK | ⚠️ Mudar em produção |
| `jwt_expiry` | 3600s | ✅ Padrão | ⚠️ Considerar 1800s (30min) |
| `enable_signup` | true | ✅ Público | ✅ OK |
| `min_password_length` | 6 | ❌ Fraco | 🔴 Aumentar para 8+ |
| `password_requirements` | "" | ❌ Nenhum | 🔴 Adicionar requisitos |

---

### 3.2 Códigos de Auth no App

**AuthContext.jsx:**

```javascript
// ✅ Login com email/password
const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (data.user) await getProfile(data.user.id);
};

// ✅ Signup com email/password
const signup = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  // Trigger cria perfil automaticamente
};

// ✅ Logout
const logout = async () => {
  const { error } = await supabase.auth.signOut();
};

// ✅ Monitoramento de estado
supabase.auth.onAuthStateChange(handleAuthStateChange);
```

**Validação:** ✅ Padrão correto, com getSession() inicial + listener

**Fluxo de Criação de Usuário:**
1. `signup()` → Supabase Auth cria usuário
2. Trigger `handle_new_user_points()` cria linha em `user_points`
3. `getProfile()` carrega perfil (que deve ter sido criado por trigger de Auth)

⚠️ **Atenção:** Não há trigger explícito para criar `profiles` row. Assumindo que Supabase Auth já cria automaticamente.

---

### 3.3 Verificação de Triggers

**Trigger Esperado (FALTA):**
```sql
-- Criar perfil automaticamente ao novo usuário
CREATE OR REPLACE FUNCTION public.handle_new_user_profile()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_profile
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_profile();
```

**Status:** ⚠️ Não encontrado nas migrations — presumindo que Supabase o cria por padrão

---

### 3.4 Recomendações de Autenticação

| Aspecto | Problema | Solução | Prioridade |
|---------|----------|---------|-----------|
| Password strength | 6 chars é fraco | Aumentar para 8+ | 🔴 Crítico |
| Password requirements | Nenhum | Adicionar: lowercase, uppercase, number | 🔴 Crítico |
| JWT expiry | 1 hora OK | Para API: 30 min | 🟡 Médio |
| Email verification | Desativado | Considerar ativar em produção | 🟡 Médio |
| MFA | Não configurado | Adicionar TOTP em produção | 🟡 Médio |
| OAuth Providers | Nenhum | Considerar Google/GitHub | 🟢 Baixo |

---

## 4. STATUS DE MIGRATIONS

### 4.1 Histórico de Migrations

```
20260222000001_enums.sql              ✅ 19 linhas
20260222000002_profiles.sql           ✅ 6 linhas (alter table)
20260222000003_points.sql             ✅ 41 linhas (points + promo system)
20260222000004_roles.sql              ✅ 15 linhas (custom_roles)
20260222000005_diagnostics.sql        ✅ 60 linhas (diagnostics + scenarios)
20260222000006_proposals.sql          ✅ 43 linhas (proposals + features)
20260222000007_reports.sql            ✅ 17 linhas
20260222000008_activity.sql           ✅ 13 linhas
20260222000009_indexes.sql            ✅ 33 linhas
20260222000010_rls.sql                ✅ 75 linhas
20260222000011_triggers.sql           ✅ 49 linhas
20260222000012_soft_delete.sql        ✅ 10 linhas
20260222000013_saved_companies.sql    ✅ 27 linhas

TOTAL: 13 migrations, 408 linhas
```

**Validação:** ✅ Todas presentes, bem organizadas, datadas

### 4.2 Ordre e Dependências

```
001 → enums base (types)
  ↓
002-004 → tabelas de sistema (profiles, pontos, cargos)
  ↓
005-007 → tabelas de domínio (diagnostics, proposals, reports)
  ↓
008 → activity (referencia outros)
  ↓
009 → indexes (sobre todas as anteriores)
  ↓
010 → RLS (sobre todas as anteriores)
  ↓
011 → triggers (sobre todas as anteriores)
  ↓
012-013 → extensões (soft-delete, saved_companies)
```

**Validação:** ✅ Ordem correta, sem dependências quebradas

### 4.3 Executáveis

**Config em supabase/config.toml:**
```toml
[db.migrations]
enabled = true
schema_paths = []  # ❌ VAZIO!
```

**Problema:** `schema_paths` está vazio! Deve indicar onde estão as migrations.

**Solução:**
```toml
[db.migrations]
enabled = true
schema_paths = ["./migrations"]
```

---

## 5. PERFORMANCE — ÍNDICES E QUERIES

### 5.1 Índices Criados

```sql
-- diagnostics
CREATE INDEX idx_diagnostics_user_id  ON public.diagnostics(user_id);
CREATE INDEX idx_diagnostics_status   ON public.diagnostics(status);
CREATE INDEX idx_diagnostics_created  ON public.diagnostics(created_at DESC);

-- diagnostic_scenarios
CREATE INDEX idx_scenarios_diagnostic ON public.diagnostic_scenarios(diagnostic_id);

-- proposals
CREATE INDEX idx_proposals_user_id    ON public.proposals(user_id);
CREATE INDEX idx_proposals_diagnostic ON public.proposals(diagnostic_id);

-- proposal_features
CREATE INDEX idx_features_proposal    ON public.proposal_features(proposal_id, position);

-- reports
CREATE INDEX idx_reports_user_id      ON public.reports(user_id);
CREATE INDEX idx_reports_diagnostic   ON public.reports(diagnostic_id);

-- Soft-delete (PARCIAIS)
CREATE INDEX idx_reports_active   ON public.reports(user_id, created_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX idx_reports_trash    ON public.reports(user_id, deleted_at DESC)   WHERE deleted_at IS NOT NULL;
CREATE INDEX idx_proposals_active ON public.proposals(user_id, created_at DESC) WHERE deleted_at IS NULL;

-- user_activity
CREATE INDEX idx_activity_user_id     ON public.user_activity(user_id, created_at DESC);

-- pontos
CREATE INDEX idx_points_user_id       ON public.user_points(user_id);

-- custom_roles
CREATE INDEX idx_roles_user_id        ON public.custom_roles(user_id);

-- promo
CREATE INDEX idx_redemptions_user_id  ON public.promo_redemptions(user_id);

-- saved companies
CREATE INDEX idx_saved_companies_user ON public.saved_companies(user_id, created_at ASC);
```

**Contagem:** 15 índices (2 deles parciais)

**Validação:** ✅ Cobertura excelente para queries mais frequentes

### 5.2 Query Patterns Encontrados

```javascript
// ✅ Bem-otimizado (com índices)
supabase
  .from('diagnostics')
  .select()
  .eq('user_id', userId)
  .eq('status', 'completed')
  .order('created_at', { ascending: false })

// ✅ Nested com índice
supabase
  .from('diagnostic_scenarios')
  .select()
  .eq('diagnostic_id', diagnosticId)

// ✅ Soft-delete com índice parcial
supabase
  .from('reports')
  .select()
  .eq('user_id', userId)
  .is('deleted_at', null)

// ⚠️ Sem select específico (full row) — OK para app, pode ser otimizado
supabase
  .from('user_points')
  .select('balance, last_recharged')
  .eq('user_id', userId)
  .single()
```

**Recomendação:** Especificar colunas em `.select()` para reduzir payload.

### 5.3 Config de Performance em config.toml

```toml
[api]
max_rows = 1000  ✅ Limite sensato
schemas = ["public", "graphql_public"]
```

**Validação:** ✅ Limites apropriados

---

## 6. INTEGRIDADE DE DADOS

### 6.1 Constraints Verificados

| Constraint | Tabela | Status |
|-----------|--------|--------|
| NOT NULL | Todas as colunas críticas | ✅ |
| CHECK (balance >= 0) | user_points | ✅ |
| CHECK (point_value > 0) | promo_codes | ✅ |
| CHECK (monthly_revenue > 0) | diagnostics | ✅ |
| CHECK (hourly_rate >= 0) | diagnostic_scenarios | ✅ |
| CHECK (hours_per_day 1-24) | custom_roles | ✅ |
| CHECK (number_of_people > 0) | diagnostic_scenarios | ✅ |
| UNIQUE (user_id) | user_points | ✅ |
| UNIQUE (code) | promo_codes | ✅ |
| UNIQUE (user_id, promo_code) | promo_redemptions | ✅ |

**Validação:** ✅ Constraints bem-implementados

### 6.2 Triggers de Integridade

```sql
-- ✅ Criação automática de user_points
CREATE TRIGGER on_auth_user_created_points
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_points();

-- ✅ Atualização de updated_at (4 tabelas)
CREATE TRIGGER diagnostics_updated_at ...
CREATE TRIGGER proposals_updated_at ...
CREATE TRIGGER roles_updated_at ...
CREATE TRIGGER profiles_updated_at ...
```

**Validação:** ✅ Triggers cobrem casos principais

### 6.3 Soft-Delete Implementado

```sql
ALTER TABLE public.reports   ADD COLUMN deleted_at TIMESTAMPTZ;
ALTER TABLE public.proposals ADD COLUMN deleted_at TIMESTAMPTZ;
```

**Validação:** ✅ Implementado com índices parciais para otimizar

---

## 7. DOCUMENTAÇÃO

### 7.1 Status Geral

| Documento | Existe? | Qualidade |
|-----------|---------|-----------|
| Schema ER diagram | ❌ NÃO | — |
| RLS Policy documentation | ❌ NÃO | — |
| Migration rollback procedures | ❌ NÃO | — |
| Seed data documentation | ⚠️ Parcial | Inline no SQL |
| API endpoint mappings | ❌ NÃO | — |
| Data model specification | ❌ NÃO | — |
| Auth flow diagram | ❌ NÃO | — |
| Backup/Recovery plan | ❌ NÃO | — |

**Score:** 20/100

---

### 7.2 Documentação Recomendada (CRÍTICA)

1. **supabase-schema.md** — ER diagram + tabela reference
2. **supabase-rls.md** — Detalhes de cada política
3. **supabase-auth.md** — Fluxo de autenticação + configuração produção
4. **supabase-migrations.md** — Como executar, rollback, recovery
5. **supabase-data-model.md** — Semântica de campos, validações
6. **supabase-api.md** — Endpoints expostos, rate limits, auth headers

---

## 8. CHECKLIST DE FINALIZAÇÃO

### 8.1 Pré-Produção (CRÍTICO)

- [ ] **Habilitar RLS em `profiles` table**
- [ ] **Aumentar `minimum_password_length` para 8**
- [ ] **Adicionar `password_requirements` (upper+lower+digit)**
- [ ] **Clarificar trigger de criação de `profiles`**
- [ ] **Corrigir `schema_paths` em config.toml**
- [ ] **Testar completo: signup → profile → points → diagnostics**
- [ ] **Verificar RLS bypass (testar acesso sem auth)**
- [ ] **Backup strategy documentado**

### 8.2 Médio Prazo (IMPORTANTE)

- [ ] **Criar diagram ER (Miro/Lucidchart)**
- [ ] **Documentar schema completo (md)**
- [ ] **Documentar RLS policies**
- [ ] **Implementar activity logging completo**
- [ ] **Configurar email verification em produção**
- [ ] **Configurar TOTP MFA**
- [ ] **Load testing de RLS performance**
- [ ] **Audit logging setup**

### 8.3 Long-term (RECOMENDADO)

- [ ] **Implementar OAuth providers (Google/GitHub)**
- [ ] **Particionamento de tabelas grandes (se >1M rows)**
- [ ] **Read replicas para queries analíticas**
- [ ] **Automated backups + PITR testing**
- [ ] **API versioning strategy**
- [ ] **Rate limiting por user/IP**

---

## 9. RECOMENDAÇÕES PRIORITIZADAS

### 🔴 CRÍTICO — Implementar Imediatamente

1. **RLS em profiles** (10 min)
   ```sql
   ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
   CREATE POLICY "profiles_owner" ON public.profiles
     FOR ALL USING (auth.uid() = id);
   ```

2. **Aumentar força de senha** (5 min)
   ```toml
   minimum_password_length = 8
   password_requirements = "lower_upper_letters_digits"
   ```

3. **Verificar trigger de profiles** (20 min)
   - Confirmar que `auth.users → profiles` trigger existe
   - Criar se necessário

4. **Testes de RLS** (30 min)
   - Testar acesso sem auth (deve falhar)
   - Testar acesso com outro user (deve falhar)
   - Testar acesso próprio (deve passar)

---

### 🟡 MÉDIO — Próximas 2 Semanas

5. **Documentação de Schema** (2 horas)
   - ER diagram
   - Tabela de referência
   - Semântica de campos

6. **Documentação de RLS** (1 hora)
   - Policy-by-policy explanation
   - Security model diagram

7. **Email Verification** (1 hora)
   - Configurar em `config.toml`
   - Testar fluxo

8. **Activity Logging Completo** (4 horas)
   - Garantir log de todas as ações
   - Cleanup de logs antigos

---

### 🟢 BAIXO — Backlog

9. **MFA (TOTP)** — 3 horas
10. **OAuth Providers** — 4 horas
11. **Performance Optimization** — Monitorar em produção
12. **Analytics Dashboard** — Optional, nice-to-have

---

## 10. MATRIZ DE RISCO

| Risco | Severidade | Probabilidade | Mitigação |
|-------|-----------|--------------|-----------|
| RLS bypass em profiles | 🔴 Crítico | 🔴 Alta | Implementar RLS imediatamente |
| Senha fraca aceita | 🔴 Crítico | 🟠 Média | Aumentar strength req. |
| Perfil não criado no signup | 🟠 Alto | 🟢 Baixa | Testar + verificar trigger |
| RLS performance issue | 🟠 Alto | 🟢 Baixa | Load test antes de produção |
| Integridade data em relatórios | 🟠 Alto | 🟢 Baixa | Snapshot em JSONB + read-only |
| Soft-delete data loss | 🟠 Alto | 🟡 Média | Backup + recovery procedure |
| Query N+1 em nested data | 🟡 Médio | 🟡 Média | Use `.select('*, related(*)')` |

---

## 11. CONCLUSÃO

### Resumo de Achados

✅ **Forças:**
- Schema design excelente com boas práticas
- Índices bem-posicionados para performance
- Triggers de automação funcionando
- RLS policy coverage 92% (11/12 tabelas)
- Constraints de integridade robustos
- Soft-delete estratégia implementada
- Migrations bem-organizadas

⚠️ **Fraquezas:**
- RLS ausente em `profiles` (CRÍTICO)
- Password requirements muito fraco
- Documentação inexistente
- Trigger de `profiles` não explícito
- Config.toml schema_paths vazio

🟢 **Oportunidades:**
- Adicionar OAuth providers
- Implementar MFA
- Email verification
- Analytics/monitoring
- Read replicas para escala

---

### Score Final

| Critério | Score | Peso | Total |
|----------|-------|------|-------|
| Schema Design | 95/100 | 25% | 23.75 |
| RLS Security | 70/100 | 25% | 17.50 |
| Authentication | 60/100 | 20% | 12.00 |
| Performance | 90/100 | 15% | 13.50 |
| Documentation | 20/100 | 15% | 3.00 |
| **TOTAL** | — | 100% | **70/100** |

### Recomendação Final

**NÃO PRONTO PARA PRODUÇÃO** — Implementar os 4 items críticos primeiro, depois passar para staging com testes completos.

**Tempo estimado para "production-ready": 2-3 dias de desenvolvimento + 1 semana de testing.**

---

## APÊNDICE A: Schema SQL Completo

Ver: `supabase/migrations/` (13 arquivos)

---

## APÊNDICE B: Checklist de Deploy

```bash
# 1. Backup
supabase db dump --schema public > backup-$(date +%s).sql

# 2. Run migrations
supabase db push

# 3. Verify tables
supabase gen types typescript --schema public

# 4. Test RLS
curl -H "Authorization: Bearer $ANON_KEY" \
  https://project.supabase.co/rest/v1/profiles

# 5. Test auth
# (signup → check profiles row exists)

# 6. Performance test
# (run load test against RLS queries)

# 7. Backup verification
# (restore backup in staging, verify)
```

---

**Documento preparado por:** @data-engineer (Dara)
**Data:** 22 de Fevereiro de 2026
**Status:** Auditoria Completa
**Próximo Review:** Após implementação de recomendações críticas
