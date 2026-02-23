# Recomendações Consolidadas — Auditoria Supabase

**Auditor:** @data-engineer (Dara)
**Data:** 22 de Fevereiro de 2026
**Status:** 75/100 — Pronto para Dev, Staging com Fixes, NÃO Pronto para Produção

---

## 1️⃣ RECOMENDAÇÕES CRÍTICAS (Implementar HOJE)

### 1.1 Habilitar RLS em `profiles` Table

**Status:** 🔴 CRÍTICO
**Impacto:** Vazamento de PII
**Esforço:** 10 min

**Mudança:**
```sql
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_public_read" ON public.profiles
  FOR SELECT USING (TRUE);

CREATE POLICY "profiles_owner_update" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "profiles_owner_delete" ON public.profiles
  FOR DELETE USING (auth.uid() = id);
```

**Localização:** migration 20260222000014_audit_fixes.sql (JÁ CRIADA)

**Validação:**
- [ ] Migration aplicada
- [ ] Testes de RLS passam (ver SUPABASE_RLS_VERIFICATION.md)
- [ ] Próprio perfil acessível, outro perfil bloqueado

---

### 1.2 Aumentar Requisitos de Senha

**Status:** 🔴 CRÍTICO
**Impacto:** Senhas fracas aceitas
**Esforço:** 5 min

**Mudança em `supabase/config.toml`:**
```toml
[auth]
minimum_password_length = 8          # Era 6
password_requirements = "lower_upper_letters_digits"  # Era ""
```

**Validação:**
- [ ] Config atualizada
- [ ] Teste: senha "test" rejeitada
- [ ] Teste: senha "Test12345" aceita

---

### 1.3 Corrigir `schema_paths` em config.toml

**Status:** 🔴 CRÍTICO (Dev Experience)
**Impacto:** Migrations podem não rodar automaticamente
**Esforço:** 2 min

**Mudança:**
```toml
[db.migrations]
enabled = true
schema_paths = ["./migrations"]  # Era []
```

**Validação:**
- [ ] Config atualizada
- [ ] `supabase db push` reconhece migrations

---

### 1.4 Testar Fluxo de Signup Completo

**Status:** 🔴 CRÍTICO
**Impacto:** Perfil pode não ser criado
**Esforço:** 30 min

**Checklist:**
```javascript
// 1. Signup
const { user, error: authError } = await supabase.auth.signUp({
  email: 'test@example.com',
  password: 'ValidPass123'
});

// 2. Verificar profile criado
const { data: profile, error: profileError } = await supabase
  .from('profiles')
  .select()
  .eq('id', user.id)
  .single();
// ✅ Deve existir (trigger create_profile)

// 3. Verificar user_points criado
const { data: points, error: pointsError } = await supabase
  .from('user_points')
  .select()
  .eq('user_id', user.id)
  .single();
// ✅ Deve ter balance = 20
```

**Validação:**
- [ ] Signup funciona (password >= 8 chars)
- [ ] Profile criado automaticamente
- [ ] User_points criado com balance 20
- [ ] Nenhum erro em logs

---

## 2️⃣ RECOMENDAÇÕES ALTAS (Próximos 3 dias)

### 2.1 Adicionar Soft-Delete em RLS Policies

**Status:** 🟠 ALTO
**Impacto:** Usuários veem items deletados
**Esforço:** 15 min

**Mudança:**
```sql
-- Atualizar reports_owner policy
DROP POLICY "reports_owner" ON public.reports;
CREATE POLICY "reports_owner" ON public.reports
  FOR ALL
  USING (auth.uid() = user_id AND deleted_at IS NULL);

-- Atualizar proposals_owner policy
DROP POLICY "proposals_owner" ON public.proposals;
CREATE POLICY "proposals_owner" ON public.proposals
  FOR ALL
  USING (auth.uid() = user_id AND deleted_at IS NULL);
```

**Validação:**
- [ ] Deletar um report
- [ ] Query não retorna report deletado
- [ ] Report ainda existe no BD (soft-delete)

---

### 2.2 Garantir Trigger de Criação de Profile

**Status:** 🟠 ALTO
**Impacto:** Profile pode não ser criado
**Esforço:** 20 min

**Verificar Existence:**
```bash
psql -U postgres -h 127.0.0.1 -p 54322 postgres
SELECT * FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created_profile';
```

**Se não existir, criar:**
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user_profile()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (NEW.id, COALESCE(NEW.email, ''));
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_profile
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_profile();
```

**Validação:**
- [ ] Trigger existe
- [ ] Novo signup cria profile automaticamente

---

### 2.3 Documentação de Schema

**Status:** 🟠 ALTO
**Impacto:** Falta de referência para team
**Esforço:** 2 horas

**Criar:**
- [ ] `docs/SUPABASE_SCHEMA.md` — Tabela de referência completa
- [ ] ER Diagram (Miro ou Lucidchart)
- [ ] `docs/SUPABASE_RLS.md` — Policies por tabela

**Template SUPABASE_SCHEMA.md:**
```markdown
# Supabase Schema Reference

## Tabela: diagnostics
- `id` UUID (PK)
- `user_id` UUID (FK → auth.users)
- `status` ENUM ('draft', 'completed', 'shared')
- `client_name` TEXT
- `monthly_revenue` NUMERIC(12,2)
- `total_annual_loss` NUMERIC(12,2) — Desnormalizado
- `created_at` TIMESTAMPTZ

### Índices
- idx_diagnostics_user_id
- idx_diagnostics_status
- idx_diagnostics_created

### RLS
- Policy: diagnostics_owner (owner-only)

---
[Continuar para outras tabelas...]
```

---

### 2.4 Validação de AuthContext

**Status:** 🟠 ALTO
**Impacto:** Login/signup pode falhar silenciosamente
**Esforço:** 30 min

**Testar:**
```javascript
// src/context/AuthContext.jsx

// 1. Login bem-sucedido
await login('a@test.com', 'ValidPass123');
// ✅ Usuário carregado, profile carregado

// 2. Password fraco rejeitado
await login('a@test.com', 'weak');
// ❌ Error message, não faz login

// 3. Logout limpa estado
await logout();
// ✅ currentUser = null, profile = null

// 4. Getprofile com timeout
// (simular lentidão)
// ✅ Timeout não trava app
```

---

## 3️⃣ RECOMENDAÇÕES MÉDIAS (Próxima semana)

### 3.1 Email Verification Setup

**Status:** 🟡 MÉDIO
**Impacto:** Emails não verificados
**Esforço:** 1 hora

**Mudança em `config.toml`:**
```toml
[auth.email]
enable_confirmations = true  # Era false
enable_signup = true
```

**Testar:**
```bash
# 1. Signup
# 2. Check email (Inbucket em localhost:54324)
# 3. Clique link de confirmação
# 4. Verificar `email_confirmed_at` em auth.users
```

---

### 3.2 Activity Logging Completo

**Status:** 🟡 MÉDIO
**Impacto:** Sem audit trail
**Esforço:** 2 horas

**Implementar:**
```javascript
// src/utils/logActivity.js
export async function logActivity(userId, actionType, details) {
  const { error } = await supabase
    .from('user_activity')
    .insert({ user_id: userId, action_type: actionType, details });
  if (error) console.error('Activity log:', error);
}
```

**Usar em componentes:**
```javascript
// Quando diagnóstico é criado
await logActivity(currentUser.id, 'diagnostic_created', { diagnostic_id });

// Quando pontos são gastos
await logActivity(currentUser.id, 'points_spent', { amount: 15 });
```

---

### 3.3 Backup & Recovery Plan

**Status:** 🟡 MÉDIO
**Impacto:** Sem estratégia de disaster recovery
**Esforço:** 1 hora

**Criar:**
```markdown
# docs/SUPABASE_BACKUP.md

## Backup Automático
- Supabase Cloud: Daily + PITR

## Backup Manual
\`\`\`bash
supabase db dump --schema public > backup-$(date +%Y%m%d).sql
\`\`\`

## Restore
\`\`\`bash
supabase db push < backup-20260222.sql
\`\`\`

## Test (Monthly)
- Restore em staging
- Verify data integrity
- Verify RLS working
```

---

## 4️⃣ RECOMENDAÇÕES BAIXAS (Backlog)

### 4.1 OAuth Providers

**Status:** 🟢 BAIXO
**Impacto:** Apenas UX (sign-in alternativo)
**Esforço:** 3 horas

**Benefício:** Reduz friction no signup
**Prioritário para depois de v1**

---

### 4.2 MFA (TOTP)

**Status:** 🟢 BAIXO
**Impacto:** Segurança adicional
**Esforço:** 2 horas

**Benefício:** Proteção contra credential stuffing
**Prioritário para depois de v1**

---

### 4.3 Performance Optimization

**Status:** 🟢 BAIXO
**Impacto:** Apenas se houver >1M rows ou <100ms latency requirement
**Esforço:** Monitorar em produção

**Monitorar:**
- [ ] Query latency (target: <100ms)
- [ ] RLS impact (target: <20% overhead)
- [ ] Index utilization

---

### 4.4 GraphQL API

**Status:** 🟢 BAIXO
**Impacto:** Alternativa a REST
**Esforço:** Already built in (but not used)

**Considerar para:**
- [ ] Complex nested queries
- [ ] Frontend data layer (Apollo/Urql)

---

## Matriz de Priorização

| # | Recomendação | Prioridade | Esforço | Impacto | Timeline |
|---|--------------|-----------|---------|---------|----------|
| 1 | RLS profiles | 🔴 CRÍTICO | 10 min | Segurança | Hoje |
| 2 | Password strength | 🔴 CRÍTICO | 5 min | Segurança | Hoje |
| 3 | schema_paths | 🔴 CRÍTICO | 2 min | Dev | Hoje |
| 4 | Test signup flow | 🔴 CRÍTICO | 30 min | Confiabilidade | Hoje |
| 5 | Soft-delete RLS | 🟠 ALTO | 15 min | Segurança | 3 dias |
| 6 | Profile trigger | 🟠 ALTO | 20 min | Confiabilidade | 3 dias |
| 7 | Documentation | 🟠 ALTO | 2h | Dev experience | 3 dias |
| 8 | AuthContext validation | 🟠 ALTO | 30 min | UX/Reliability | 3 dias |
| 9 | Email verification | 🟡 MÉDIO | 1h | UX | 1 semana |
| 10 | Activity logging | 🟡 MÉDIO | 2h | Audit | 1 semana |
| 11 | Backup plan | 🟡 MÉDIO | 1h | Ops | 1 semana |
| 12 | OAuth | 🟢 BAIXO | 3h | UX | Backlog |
| 13 | MFA | 🟢 BAIXO | 2h | Segurança | Backlog |

---

## Plano de Implementação

### Fase 1: HOJE (2 horas)
```bash
# 1. Apply migration 014
supabase db push

# 2. Update config.toml
# (password + schema_paths)

# 3. Test signup
npm run test:auth

# 4. Test RLS
npm run test:rls
```

**Saída esperada:** 🟢 Todos testes passam

---

### Fase 2: Próximos 3 dias (6 horas)
- [ ] Soft-delete RLS
- [ ] Profile trigger verification
- [ ] Documentation (schema + RLS)
- [ ] AuthContext validation + tests
- [ ] Load test (1000 req/s)

**Saída esperada:** 🟢 Staging environment = production ready

---

### Fase 3: Próxima semana (8 horas)
- [ ] Email verification
- [ ] Activity logging
- [ ] Backup + recovery test
- [ ] QA gate (15 point checklist)
- [ ] Production deployment

**Saída esperada:** 🟢 Production ready

---

## Métrica de Sucesso

```
ANTES (Vulnerável)
├── RLS Score: 70/100 (profiles missing)
├── Auth Score: 60/100 (weak passwords)
├── Doc Score: 20/100 (none)
└── TOTAL: 50/100 ❌ NÃO PRONTO

DEPOIS (Seguro)
├── RLS Score: 100/100 (all tables)
├── Auth Score: 95/100 (strong + email verification)
├── Doc Score: 90/100 (comprehensive)
└── TOTAL: 95/100 ✅ PRONTO
```

---

## Sign-off Checklist

**Fase 1 Approval:**
- [ ] @data-engineer: Recomendações validadas
- [ ] @dev: Implementação começada
- [ ] @qa: Testes definidos

**Fase 2 Approval:**
- [ ] @dev: Implementação completa
- [ ] @qa: Staging tests 100% pass
- [ ] @devops: Deployment plan pronto

**Fase 3 Approval:**
- [ ] @qa: Production QA gate PASS
- [ ] @devops: Backup + recovery tested
- [ ] @pm: Go/No-go decision

---

**Documento:** Consolidation of Recommendations
**Status:** Ready for Implementation
**Last Updated:** 2026-02-22
**Next Review:** Após Fase 1 completion
