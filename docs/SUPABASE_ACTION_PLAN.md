# Plano de Ação — Auditoria Supabase

**Prioridade:** ALTA
**Timeline:** 2-3 dias
**Owner:** @data-engineer (Dara) + @dev team

---

## 🔴 IMEDIATO (Hoje - 2 horas)

### 1. Executar Migration de Fixes

```bash
cd gama-calculadora-app
supabase db push
# Aplica migration 20260222000014_audit_fixes.sql
```

**O que faz:**
- ✅ Habilita RLS em `profiles`
- ✅ Adiciona políticas de segurança
- ✅ Garante trigger de criação de perfil
- ✅ Respeita soft-delete em RLS

**Tempo:** ~5 min

---

### 2. Atualizar config.toml com Requisitos de Senha

**Arquivo:** `supabase/config.toml`

```diff
  [auth]
  enabled = true
- minimum_password_length = 6
+ minimum_password_length = 8
- password_requirements = ""
+ password_requirements = "lower_upper_letters_digits"
```

**Salvar e fazer push:**
```bash
supabase db push
# Re-aplica auth config
```

**Tempo:** ~3 min

---

### 3. Corrigir schema_paths em config.toml

**Arquivo:** `supabase/config.toml`

```diff
  [db.migrations]
  enabled = true
- schema_paths = []
+ schema_paths = ["./migrations"]
```

**Tempo:** ~1 min

---

### 4. Testar RLS Bypass (Verificação Manual)

```bash
# 1. Terminal 1: Iniciar Supabase local
supabase start

# 2. Terminal 2: Testar acesso SEM autenticação
curl -H "apikey: $SUPABASE_ANON_KEY" \
  http://127.0.0.1:54321/rest/v1/profiles
# Esperado: 403 Forbidden (RLS ativada)

# 3. Testar com JWT válido (user A acessando user B)
curl -H "Authorization: Bearer $USER_B_JWT" \
  http://127.0.0.1:54321/rest/v1/profiles?id=eq.$USER_A_ID
# Esperado: 403 ou lista vazia (RLS funcionando)

# 4. Testar acesso próprio
curl -H "Authorization: Bearer $USER_A_JWT" \
  http://127.0.0.1:54321/rest/v1/profiles?id=eq.$USER_A_ID
# Esperado: 200 OK + 1 row
```

**Tempo:** ~10 min

---

## 🟡 PRÓXIMOS 3 DIAS

### 5. Testar Fluxo Completo de Signup

**Cenário:** Novo usuário completo

```javascript
// 1. Signup
const { data: authUser, error } = await supabase.auth.signUp({
  email: 'test@example.com',
  password: 'ValidPassword123'
});
// Esperado: ✅ Sucesso (password >= 8 chars + mixed case)

// 2. Verificar profiles row criado
const { data: profile } = await supabase
  .from('profiles')
  .select()
  .eq('id', authUser.user.id)
  .single();
// Esperado: ✅ 1 row (trigger criou)

// 3. Verificar user_points row criado
const { data: points } = await supabase
  .from('user_points')
  .select()
  .eq('user_id', authUser.user.id)
  .single();
// Esperado: ✅ 1 row com balance=20
```

**Arquivo:** `src/context/AuthContext.jsx`
- Adicionar logs de debug
- Testar com Supabase Studio

**Tempo:** ~45 min

---

### 6. Atualizar AuthContext com Tratamento de Erro

**Arquivo:** `src/context/AuthContext.jsx`

```javascript
// Adicionar timeout e retry logic
const handleSignup = async (email, password) => {
  // 1. Validar força de senha ANTES de enviar
  if (password.length < 8) {
    addToast('Senha deve ter no mínimo 8 caracteres', 'error');
    return false;
  }

  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
    addToast('Senha deve ter letras maiúsculas E minúsculas', 'error');
    return false;
  }

  if (!/\d/.test(password)) {
    addToast('Senha deve ter pelo menos 1 número', 'error');
    return false;
  }

  // 2. Enviar signup
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error?.code === 'over_email_send_rate_limit') {
    addToast('Muitas tentativas. Aguarde 5 min.', 'error');
    return false;
  }

  // ... resto do código
};
```

**Tempo:** ~30 min

---

### 7. Documentar RLS Policies

**Arquivo NOVO:** `docs/SUPABASE_RLS.md`

```markdown
# RLS Policies — GAMA Calculadora

## Tabela: profiles

| Operação | Policy | Acesso |
|----------|--------|--------|
| SELECT | profiles_public_read | Qualquer um (público) |
| UPDATE | profiles_owner_update | Apenas dono |
| DELETE | profiles_owner_delete | Apenas dono |

**Semântica:** Perfil é públicos (descoberta), mas editable apenas pelo dono.

---

## Tabela: user_points

| Operação | Policy | Acesso |
|----------|--------|--------|
| ALL | user_points_owner | Apenas dono (via RLS) |

**Semântica:** Saldo é privado, não pode ver de outros.

...
```

**Tempo:** ~1 hora

---

### 8. Criar ER Diagram

**Ferramenta:** [Miro](https://miro.com) ou [Lucidchart](https://lucidchart.com)

**Componentes:**
- 12 tabelas
- Foreign keys
- Índices
- RLS indicators

**Tempo:** ~45 min

---

## 🟢 PRÓXIMA SEMANA

### 9. Email Verification Setup

**Arquivo:** `supabase/config.toml`

```diff
  [auth.email]
- enable_confirmations = false
+ enable_confirmations = true
  enable_signup = true
```

**Testar fluxo:** Signup → Email → Clique link → Verified

**Tempo:** ~1 hora

---

### 10. Implementar Activity Logging

**Arquivo:** `src/utils/logActivity.js` (NOVO)

```javascript
import { supabase } from './supabase';

export async function logActivity(userId, actionType, details = {}) {
  // Apenas com service role key (não exponha anon_key!)
  const { error } = await supabase
    .from('user_activity')
    .insert({
      user_id: userId,
      action_type: actionType,
      details,
      created_at: new Date().toISOString()
    });

  if (error) console.error('Activity log error:', error);
}
```

**Usar em componentes:**
```javascript
// Quando diagnóstico é criado
await logActivity(userId, 'diagnostic_created', { diagnostic_id });

// Quando pontos são gastos
await logActivity(userId, 'points_spent', { amount: 15, action: 'diagnostic' });
```

**Tempo:** ~2 horas

---

### 11. Backup & Recovery Plan

**Arquivo NOVO:** `docs/SUPABASE_BACKUP.md`

```markdown
# Backup & Recovery — Supabase

## Estratégia de Backup

1. **Automático (Supabase Cloud):** Daily + PITR (Point-in-Time Recovery)
2. **Manual (Local Dev):**
   ```bash
   supabase db dump --schema public > backup-$(date +%Y%m%d).sql
   ```

## Restore Procedure

```bash
# 1. Create new project
supabase projects create --name gama-backup

# 2. Restore from dump
supabase db push < backup-20260222.sql

# 3. Verify
supabase db query "SELECT count(*) FROM diagnostics;"
```

## RPO/RTO

- **RPO (Recovery Point Objective):** 1 day (automático Supabase)
- **RTO (Recovery Time Objective):** < 1 hour (manual restore)

## Disaster Recovery Drill

- Monthly: Restore from backup em staging
- Verify: Data integrity + RLS policies working
```

**Tempo:** ~30 min (documento) + 1 hora (teste restore)

---

## Checklist de Validação

```
FASE 1: IMEDIATO (Hoje)
- [ ] Migration 014 executada
- [ ] config.toml atualizado (password + schema_paths)
- [ ] RLS Bypass test passed (4/4 cenários)

FASE 2: PRÓXIMOS 3 DIAS
- [ ] Fluxo signup completo testado
- [ ] AuthContext + validação de senha
- [ ] RLS documentação criada
- [ ] ER diagram criado
- [ ] Nenhum error em logs (supabase logs)

FASE 3: PRÓXIMA SEMANA
- [ ] Email verification ativada + testada
- [ ] Activity logging implementado
- [ ] Backup recovery testado
- [ ] Load test de RLS (1000+ reqs/s)
- [ ] Staging environment = production config

APROVAÇÃO: @qa pode fazer QA gate
```

---

## Timeboxing

| Fase | Tempo Estimado | Owner |
|------|----------------|-------|
| Fase 1 (Imediato) | 2h | @data-engineer |
| Fase 2 (3 dias) | 6h | @dev + @data-engineer |
| Fase 3 (1 semana) | 8h | @dev + @qa |
| **TOTAL** | ~16h | Team |

---

## Status de Risco Pós-Implementação

| Risco | Antes | Depois | Mitigação |
|-------|-------|--------|-----------|
| RLS bypass em profiles | 🔴 Alta | 🟢 Baixa | RLS + policy tested |
| Senha fraca | 🔴 Alta | 🟢 Baixa | Min 8 chars + mixed case |
| Trigger falha | 🟠 Média | 🟢 Baixa | Trigger verified |
| Data loss | 🟠 Média | 🟢 Baixa | Backup + recovery tested |
| **READINESS** | 🟠 25% | 🟢 95% | — |

---

## Próximo Review

**Data:** Após Fase 3
**Participantes:** @data-engineer, @dev, @qa, @devops
**Agenda:** Staging approval → Production deploy

---

**Documento:** Action Plan
**Status:** Ready to Execute
**Last Updated:** 2026-02-22
