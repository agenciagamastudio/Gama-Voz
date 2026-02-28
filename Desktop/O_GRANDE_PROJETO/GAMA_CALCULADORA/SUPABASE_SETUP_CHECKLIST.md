# 🚀 GAMA CALCULADORA — Supabase Setup Completo

**Data:** 2026-02-28
**Status:** 🔴 EM EXECUÇÃO
**Responsável:** Manual (Você)
**Tempo Total Estimado:** 1-2 horas
**Prioridade:** 🔴 CRÍTICO — App não funciona sem isso

---

## 📋 VISÃO GERAL DO BANCO DE DADOS

### Projeto Supabase
- **ID do Projeto:** `qnphnhlrvujhqeamszha`
- **URL:** https://qnphnhlrvujhqeamszha.supabase.co
- **Dashboard:** https://app.supabase.com

### Tabelas Existentes (3 total)
```sql
1. profiles (com RLS: ✅ Já ativado)
2. reports (com RLS: ❌ PRECISA FIX)
3. proposals (com RLS: ❌ PRECISA FIX)
```

---

## 🔴 7 AÇÕES CRÍTICAS — ORDEM DE EXECUÇÃO

### ✅ **AÇÃO #1: Desativar Email Whitelist**

**Urgência:** 🔴 CRÍTICO
**Tempo:** 10 min
**Problema:** Usuários não conseguem se registrar com emails externos

**Passos:**

1. Abra: https://app.supabase.com
2. Selecione projeto: `qnphnhlrvujhqeamszha`
3. Menu esquerdo → **"Authentication"**
4. Clique na engrenagem ⚙️ **"Settings"**
5. Procure por:
   - "Disallow sign ups by default" → **Desmarque ✓**
   - "Email Filter" ou "Whitelist de domínios" → **REMOVA ou DESABILITE**
6. Scroll para baixo → Clique **"Save"** ou **"Update"**
7. Aguarde confirmação (30 segundos)

**Teste:**
```bash
# No seu navegador:
http://localhost:5173/signup

Email: teste123@gmail.com
Senha: SenhaForte123!

# Resultado esperado:
✅ "Verifique seu email para confirmar" OU
✅ "Verificação enviada"

# NÃO esperado:
❌ "Email address is invalid"
```

**Status:** [ ] Não iniciado | [ ] ✅ COMPLETO

---

### ✅ **AÇÃO #2: Adicionar CORS para Vercel**

**Urgência:** 🔴 CRÍTICO
**Tempo:** 10 min
**Problema:** Requisições de produção falham com CORS error (a app não consegue chamar Supabase)

**Passos:**

1. Abra: https://app.supabase.com
2. Selecione projeto: `qnphnhlrvujhqeamszha`
3. Menu esquerdo → **"Project Settings"**
4. Aba: **"API"**
5. Procure por: **"CORS Allowed Origins"**
6. Clique: **"+ Add allowed origin"** (primeira vez)
7. Cole:
   ```
   https://gama-calculadora-app.vercel.app
   ```
8. Clique: **"+ Add allowed origin"** (segunda vez)
9. Cole:
   ```
   http://localhost:5173
   ```
10. Scroll down → Clique **"Save"**

**Teste:**
```bash
# Abrir em navegador:
https://gama-calculadora-app.vercel.app/

# Abrir DevTools (F12) → Console
# Se funcionar: sem erros de CORS
# Se não funcionar: erro "Access-Control-Allow-Origin"
```

**Status:** [ ] Não iniciado | [ ] ✅ COMPLETO

---

### 🔴 **AÇÃO #3: Aplicar RLS Policies (CRÍTICA — SEGURANÇA)**

**Urgência:** 🔴 CRÍTICO — DADOS EXPOSTOS ATÉ ISSO ESTAR FEITO
**Tempo:** 30 min
**Problema:** **Qualquer usuário consegue ver dados de QUALQUER OUTRO usuário!**

#### PASSO A — Verificar Status Atual

1. Abra: https://app.supabase.com
2. Selecione projeto: `qnphnhlrvujhqeamszha`
3. Menu esquerdo → **"SQL Editor"**
4. Clique: **"New Query"**
5. Cole este SQL:

```sql
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public' AND tablename IN ('profiles', 'reports', 'proposals');
```

6. Clique: **"Run"**
7. Verifique resultado:

```
profiles    | t  ✅ OK (RLS já ativado)
reports     | f  ❌ PRECISA FIX
proposals   | f  ❌ PRECISA FIX
```

Se `reports` e `proposals` mostram `f` (false), execute PASSO B imediatamente.

#### PASSO B — Aplicar RLS (SQL Completo)

1. Menu esquerdo → **"SQL Editor"**
2. Clique: **"New Query"**
3. **Cole TUDO isto:** (não modifique nada!)

```sql
-- ===== PARTE 1: Habilitar RLS =====
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;

-- ===== PARTE 2: Policies para reports =====
CREATE POLICY "Users view own reports"
  ON public.reports FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own reports"
  ON public.reports FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own reports"
  ON public.reports FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users delete own reports"
  ON public.reports FOR DELETE
  USING (auth.uid() = user_id);

-- ===== PARTE 3: Policies para proposals =====
CREATE POLICY "Users view own proposals"
  ON public.proposals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own proposals"
  ON public.proposals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own proposals"
  ON public.proposals FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users delete own proposals"
  ON public.proposals FOR DELETE
  USING (auth.uid() = user_id);
```

4. Clique: **"Run"**
5. Aguarde: **"Query successful"** (verde)
6. **Volta ao PASSO A para validar** — agora deve mostrar `t` para todas 3 tabelas

**Resultado esperado após RLS:**
```
profiles    | t  ✅
reports     | t  ✅
proposals   | t  ✅
```

**⚠️ IMPORTANTE:**
- Sem RLS: qualquer usuário vê `SELECT * FROM reports` de TODOS
- Com RLS: usuário vê apenas seus próprios registros (`auth.uid() = user_id`)
- Usuário A **nunca consegue ver** dados de Usuário B

**Status:** [ ] Não iniciado | [ ] ✅ COMPLETO

---

### ✅ **AÇÃO #4: Aumentar Password Requirements**

**Urgência:** 🔴 CRÍTICO
**Tempo:** 10 min
**Problema:** Senhas muito fracas (apenas 6 caracteres aceita)

**Passos:**

1. Abra: https://app.supabase.com
2. Selecione projeto: `qnphnhlrvujhqeamszha`
3. Menu esquerdo → **"Authentication"**
4. Aba: **"Providers"**
5. Clique: **"Email"**
6. Procure por: **"Minimum password length"**
   - Altere para: **8** (ou 10+ para maior segurança)
7. Procure por: **"Password character requirements"**
   - Marque as caixas:
     ```
     ☑ Uppercase (A-Z)
     ☑ Lowercase (a-z)
     ☑ Number (0-9)
     ☑ Special character (!@#$%^&*)
     ```
8. Clique: **"Save"**

**Teste:**
```bash
# No /signup
Email: teste@gmail.com
Senha: 123456  (6 chars)
Resultado esperado: ❌ "Password too weak" ✅ BOM!

Email: teste@gmail.com
Senha: TestPass123!  (12 chars com tudo)
Resultado esperado: ✅ Aceita ✅ BOM!
```

**Status:** [ ] Não iniciado | [ ] ✅ COMPLETO

---

### ✅ **AÇÃO #6: Confirmar Admin Email**

**Urgência:** 🟡 ALTO
**Tempo:** 5 min
**Problema:** Admin não consegue fazer login se email não confirmado

**Passos:**

1. Abra sua caixa de entrada: **`prontoatendimentogama@gmail.com`**
2. Procure por email do Supabase com assunto:
   - "Confirm your signup" OU
   - "Verify your email" OU
   - "Email confirmation"
3. **Clique no link de confirmação** no email
4. Browser redireciona para app
5. ✅ Email confirmado!

**Teste:**
- Acesse: https://gama-calculadora-app.vercel.app/login
- Email: `prontoatendimentogama@gmail.com`
- Senha: (a que você criou)
- Resultado esperado: ✅ Acesso ao dashboard

**Status:** [ ] Não iniciado | [ ] ✅ COMPLETO

---

### ✅ **AÇÃO #7: Testar Deployment em Produção**

**Urgência:** 🟡 ALTO
**Tempo:** 20 min
**Problema:** Não sabemos se app está funcionando no ar

#### TESTE 1 — App Online?

```
Acesse: https://gama-calculadora-app.vercel.app/

Esperado:
✅ Página carrega (sem 404, sem branco)
✅ Vê "Gama Calculadora" ou conteúdo
✅ Nenhum erro no console do navegador (F12)
```

#### TESTE 2 — Signup Funciona?

```
URL: https://gama-calculadora-app.vercel.app/signup

Email: novouser@gmail.com
Senha: TestPass123!

Resultado esperado:
✅ "Verifique seu email para confirmar"
```

#### TESTE 3 — Login Funciona?

```
URL: https://gama-calculadora-app.vercel.app/login

Email: prontoatendimentogama@gmail.com
Senha: (confirmada acima)

Resultado esperado:
✅ Redireciona para /admin dashboard
```

#### TESTE 4 — Diagnóstico de Valor Funciona?

```
URL: https://gama-calculadora-app.vercel.app/diagnostico-de-valor

Preencha:
- Nome do Cliente: Shopping das Baterias
- Nicho: Baterias Automotivas
- Faturamento: 50000
- Dias: 22
- Horas: 8

Clique: "Gerar Relatório"

Resultado esperado:
✅ Formulário aceita (sem erro "Por favor, preencha")
✅ Passa para próxima etapa
```

**Status:** [ ] Não iniciado | [ ] ✅ COMPLETO

---

## 📊 CHECKLIST FINAL

### HOJE (24h) — Ordem Recomendada

```
1. ☐ AÇÃO #1: Email Whitelist desativado (10 min)
2. ☐ AÇÃO #2: CORS adicionado (10 min)
3. ☐ AÇÃO #3: RLS Policies aplicado (30 min) ← CRÍTICA
4. ☐ AÇÃO #4: Password requirements (10 min)
5. ☐ AÇÃO #6: Admin email confirmado (5 min)
6. ☐ AÇÃO #7: Production testado (20 min)

TOTAL ESTIMADO: 85 minutos (1h 25min)
```

### VALIDAÇÃO FINAL

```
✅ npm run build — PASSOU
✅ npm run test — 33/33 PASSING
⚠️ npm run lint — 26 problemas (documentados como tech debt)

RLS Status:
☐ profiles     → t (RLS: SIM)
☐ reports      → t (RLS: SIM)
☐ proposals    → t (RLS: SIM)

Auth Status:
☐ Email whitelist → DESATIVADO
☐ Password reqs → 8+ chars + complexidade
☐ Admin email → CONFIRMADO

Network Status:
☐ CORS → VERCEL + LOCALHOST
☐ App online → SIM
☐ Signup funciona → SIM
☐ Login funciona → SIM
```

---

## 🎯 Quando Terminar Tudo

1. **Marque todos [ ] como ✅ COMPLETO**
2. **Responda aqui:** "Supabase pronto"
3. **Próximo passo:** Fase 2 (Vercel Deployment Final)

---

## 📞 Se Algo Ficar Travado

Se alguma ação não funcionar:
1. Tire uma screenshot do erro
2. Me envie
3. Vou debugar ou providenciar alternativa

**Vamos lá! 🚀**
