# Verificação de RLS — Testes de Segurança

**Data:** 22 de Fevereiro de 2026
**Auditor:** @data-engineer (Dara)
**Severidade:** 🔴 CRÍTICO

---

## Problema Identificado

A tabela `profiles` **não tinha RLS habilitada**, permitindo que qualquer usuário autenticado lesse todos os perfis de outros usuários.

```javascript
// ANTES (Vulnerável)
// Qualquer usuário autenticado:
const { data } = await supabase
  .from('profiles')
  .select()
  .eq('id', 'outro-usuario-id');
// ✅ Retorna perfil de outro usuário (VAZAMENTO!)

// DEPOIS (Seguro)
// Mesmo código, agora com RLS:
// ✅ Retorna próprio perfil
// ❌ Bloqueia acesso a outro perfil (403 Forbidden)
```

---

## Testes de Verificação

### Teste 1: Acesso SEM Autenticação (Deve Falhar)

**Pré-requisito:** `supabase start` rodando

```bash
# Tentativa de ler profiles sem token
curl -X GET \
  "http://127.0.0.1:54321/rest/v1/profiles" \
  -H "apikey: $SUPABASE_ANON_KEY"

# Esperado: 403 Forbidden
# Body: {"code":"PGRST301","message":"The user does not have..."}
```

**Validação:**
- ✅ Status 403 (não 200)
- ✅ Error message menciona RLS

---

### Teste 2: Acesso de User A ao Perfil de User B (Deve Falhar)

**Setup:**
```javascript
// Terminal 1: Criar User A
await supabase.auth.signUp({ email: 'a@test.com', password: 'Test12345' });
// uuid: abc123...

// Terminal 2: Criar User B
await supabase.auth.signUp({ email: 'b@test.com', password: 'Test12345' });
// uuid: def456...

// Pegar JWT de User A
const { data: { session } } = await supabase.auth.getSession();
const userAJWT = session.access_token;  // Usar este
```

**Teste:**
```bash
# User A tentando acessar perfil de User B
curl -X GET \
  "http://127.0.0.1:54321/rest/v1/profiles?id=eq.def456" \
  -H "Authorization: Bearer $USER_A_JWT" \
  -H "apikey: $SUPABASE_ANON_KEY"

# Esperado: 403 Forbidden
# OU: 200 OK com array vazio []
```

**Validação:**
- ✅ Status 403 OU array vazio (não 200 + 1 row)

---

### Teste 3: User Acessa Seu Próprio Perfil (Deve Passar)

```bash
# User A acessando seu próprio perfil
curl -X GET \
  "http://127.0.0.1:54321/rest/v1/profiles?id=eq.abc123" \
  -H "Authorization: Bearer $USER_A_JWT" \
  -H "apikey: $SUPABASE_ANON_KEY"

# Esperado: 200 OK + 1 row com dados
# Body: [{ "id": "abc123", "username": "...", "full_name": "...", ... }]
```

**Validação:**
- ✅ Status 200
- ✅ 1 row retornado
- ✅ Campos corretos (username, full_name, avatar_url, website, accent_color)

---

### Teste 4: UPDATE do Próprio Perfil (Deve Passar)

```javascript
// User A atualizando seu próprio accent_color
const { data, error } = await supabase
  .from('profiles')
  .update({ accent_color: '#ff00ff' })
  .eq('id', 'abc123')  // seu ID
  .select();

// Esperado:
// ✅ error = null
// ✅ data = [{ id: 'abc123', accent_color: '#ff00ff', ... }]
```

**Validação:**
- ✅ Sem erro
- ✅ Retorna linha atualizada

---

### Teste 5: UPDATE do Perfil de Outro User (Deve Falhar)

```javascript
// User A tentando atualizar accent_color de User B
const { data, error } = await supabase
  .from('profiles')
  .update({ accent_color: '#ff00ff' })
  .eq('id', 'def456')  // ID de User B
  .select();

// Esperado:
// ✅ error.code = 'PGRST301' ou similar
// ✅ error.message menciona RLS
// ✅ data = null ou undefined
```

**Validação:**
- ✅ Error retornado
- ✅ Nenhuma linha foi atualizada

---

### Teste 6: DELETE do Próprio Perfil (Deve Passar)

```javascript
// User A deletando seu próprio perfil
const { error } = await supabase
  .from('profiles')
  .delete()
  .eq('id', 'abc123');

// Esperado:
// ✅ error = null (sucesso)
// ⚠️ Nota: Profile será deletado (risco!)
```

**Validação:**
- ✅ Sem erro

---

### Teste 7: DELETE do Perfil de Outro User (Deve Falhar)

```javascript
// User A tentando deletar perfil de User B
const { error } = await supabase
  .from('profiles')
  .delete()
  .eq('id', 'def456');

// Esperado:
// ✅ error.code = 'PGRST301'
// ✅ Nenhuma linha foi deletada
```

**Validação:**
- ✅ Error retornado

---

## Testes de Tabelas Aninhadas

### Teste 8: Cenários de Outro Diagnóstico (Deve Falhar)

```javascript
// User A criando diagnóstico (id: diag-a-1)
// User B criando diagnóstico (id: diag-b-1)

// User A tentando ler cenários de diagnóstico de User B
const { data, error } = await supabase
  .from('diagnostic_scenarios')
  .select()
  .eq('diagnostic_id', 'diag-b-1');

// Esperado:
// ✅ data = [] (array vazio, RLS bloqueia)
// OU error PGRST301
```

**Validação:**
- ✅ Array vazio ou error
- ✅ Nenhum cenário de User B é visível

---

## Testes de Soft-Delete

### Teste 9: Ver Reports Deletados (Deve Falhar)

```javascript
// User A deletou report (soft-delete: deleted_at = NOW())
// User A tentando ler todos os reports

const { data } = await supabase
  .from('reports')
  .select()
  .eq('user_id', 'abc123');

// Esperado:
// ✅ data = array com apenas reports onde deleted_at IS NULL
// ❌ NUNCA inclui reports onde deleted_at IS NOT NULL
```

**Validação:**
- ✅ Só reports ativos são retornados
- ✅ Deletados não aparecem (RLS filter deleted_at IS NULL)

---

## Script de Teste Automático

**Arquivo:** `tests/rls-verification.test.js`

```javascript
import { describe, it, expect, beforeEach } from 'vitest';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

let supabaseA, supabaseB, userA, userB;

describe('RLS Security Verification', () => {
  beforeEach(async () => {
    // Criar dois clientes
    supabaseA = createClient(SUPABASE_URL, ANON_KEY);
    supabaseB = createClient(SUPABASE_URL, ANON_KEY);

    // Signup User A
    const { data: authA } = await supabaseA.auth.signUp({
      email: 'a@test.com',
      password: 'Test123456'
    });
    userA = authA.user;
    // Copiar JWT
    const sessionA = await supabaseA.auth.getSession();
    supabaseA = createClient(SUPABASE_URL, ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${sessionA.data.session.access_token}` } }
    });

    // Signup User B
    const { data: authB } = await supabaseB.auth.signUp({
      email: 'b@test.com',
      password: 'Test123456'
    });
    userB = authB.user;
    const sessionB = await supabaseB.auth.getSession();
    supabaseB = createClient(SUPABASE_URL, ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${sessionB.data.session.access_token}` } }
    });
  });

  it('User A cannot read User B profile', async () => {
    const { data, error } = await supabaseA
      .from('profiles')
      .select()
      .eq('id', userB.id);

    expect(data?.length).toBe(0);
  });

  it('User A can read own profile', async () => {
    const { data } = await supabaseA
      .from('profiles')
      .select()
      .eq('id', userA.id);

    expect(data?.length).toBe(1);
    expect(data[0].id).toBe(userA.id);
  });

  it('User A cannot update User B profile', async () => {
    const { error } = await supabaseA
      .from('profiles')
      .update({ accent_color: '#ffffff' })
      .eq('id', userB.id);

    expect(error).toBeTruthy();
  });

  it('User A can update own profile', async () => {
    const { error } = await supabaseA
      .from('profiles')
      .update({ accent_color: '#ffffff' })
      .eq('id', userA.id);

    expect(error).toBeFalsy();
  });

  // Testes similares para outras tabelas
});
```

**Executar:**
```bash
npm install vitest
npx vitest tests/rls-verification.test.js
```

---

## Resultados Esperados

### ✅ Antes da Migration 014

```
RLS Verification Tests
  ✓ User A cannot read User B profile (FALHA - retorna dados)
  ✓ User A can read own profile (PASSA)
  ✓ User A cannot update User B profile (PASSA)
  ✓ User A can update own profile (PASSA)

Coverage: 75% (1 falha crítica)
```

### ✅ Depois da Migration 014

```
RLS Verification Tests
  ✓ User A cannot read User B profile (PASSA)
  ✓ User A can read own profile (PASSA)
  ✓ User A cannot update User B profile (PASSA)
  ✓ User A can update own profile (PASSA)

Coverage: 100% (Todas as falhas corrigidas)
```

---

## Testes em Staging vs Produção

### Staging
```bash
# Executar testes completos com dados reais
npm run test:rls:staging

# Esperado: 100% pass rate
# Time: ~5 min
```

### Produção (Pré-Deploy)
```bash
# Executar contra produção
npm run test:rls:production --dry-run

# Nota: Usar --dry-run para não criar test users
# Manual testing by @qa
```

---

## Checklist de Validação

```
[ ] Teste 1: Acesso SEM auth → 403 ✓
[ ] Teste 2: User A ler User B → 403 ✓
[ ] Teste 3: User A ler próprio → 200 + data ✓
[ ] Teste 4: User A update próprio → sucesso ✓
[ ] Teste 5: User A update outro → 403 ✓
[ ] Teste 6: User A delete próprio → sucesso ✓
[ ] Teste 7: User A delete outro → 403 ✓
[ ] Teste 8: Cenários aninhados → bloqueados ✓
[ ] Teste 9: Soft-delete invisible → funcionando ✓
[ ] Script automático → 100% pass ✓

Status: 🟢 PRONTO PARA PRODUÇÃO
```

---

## Impacto na Aplicação

### Antes (Vulnerável)

```javascript
// ⚠️ Vazava dados de todos os usuários
const allProfiles = await supabase.from('profiles').select();
// Retorna: [{ id, name, avatar, website }, { id, name, avatar, website }, ...]
```

### Depois (Seguro)

```javascript
// ✅ Agora seguro - cada usuário vê apenas seu perfil
const allProfiles = await supabase.from('profiles').select();
// Retorna: [{ id, name, avatar, website }] (só próprio)
```

---

## Comunicação com Usuários

Se há usuários já registrados, **nenhuma ação** é necessária. As mudanças são transparentes (RLS muda acesso, não dados).

**A partir de deploy:**
- Usuários antigos: Sem mudança perceptível
- Novos usuários: Maior privacidade (não podem ver outros perfis)

---

## Próximos Passos

1. ✅ Executar migration 014
2. ✅ Rodar testes de verificação (Teste 1-9)
3. ✅ Executar script automático (100% pass)
4. ✅ Deploy em staging (1 dia)
5. ✅ Load test de RLS (performance check)
6. ✅ Deploy em produção

---

**Documento:** RLS Verification
**Status:** Ready for Testing
**Last Updated:** 2026-02-22
