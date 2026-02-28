# ⚡ EXECUTE RLS AGORA — 5 MINUTOS

**Status:** Pronto para executar (SQL validado)

---

## 🚀 Opção 1: Mais Rápido (3 min) — Copy/Cola no Dashboard

### Passo 1: Abra Supabase Dashboard
```
https://app.supabase.com/projects/qnphnhlrvujhqeamszha/sql/new
```

### Passo 2: Cole o SQL Completo (abaixo)

```sql
-- ============================================================================
-- GAMA_CALC_RLS_FIX_20260228 — Enable RLS + Create 8 Policies
-- ============================================================================

-- PARTE 1: Enable RLS
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;

-- PARTE 2: Reports Policies
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

-- PARTE 3: Proposals Policies
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

-- VALIDAÇÃO
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public' AND tablename IN ('profiles', 'reports', 'proposals')
ORDER BY tablename;
```

### Passo 3: Clique "Run" ▶️

### Passo 4: Verifique Resultado
```
profiles    | t  ✅
reports     | t  ✅
proposals   | t  ✅
```

---

## 🤖 Opção 2: Script Automático (Linux/Mac)

Se você tem **Supabase CLI** + **SUPABASE_ACCESS_TOKEN**:

### No Terminal:
```bash
export SUPABASE_ACCESS_TOKEN="seu-token-aqui"
cd ~/Desktop/O_GRANDE_PROJETO/GAMA_CALCULADORA
bash execute-rls-migration.sh
```

---

## 🔑 Como Obter SUPABASE_ACCESS_TOKEN

1. https://app.supabase.com → **Account Settings** (canto inferior esquerdo)
2. Tab: **Access Tokens**
3. Click: **Generate New Token**
4. Name: "GAMA_CALCULADORA_RLS"
5. Copy token

---

## ✅ Checklist

- [ ] SQL copiado
- [ ] Supabase Dashboard aberto
- [ ] SQL Editor selecionado
- [ ] SQL colado
- [ ] "Run" clicado
- [ ] Validação passou (3 `t` no resultado)
- [ ] Pronto para commit!

---

## 📊 O que vai acontecer

**ANTES:**
```
SELECT * FROM reports;
→ Qualquer user vê TODOS os reports
```

**DEPOIS:**
```
SELECT * FROM reports;
→ User A só vê seus reports
→ User B só vê seus reports
```

---

## 🚨 Erro? Rollback Está Pronto

Se algo deu errado, execute este SQL para reverter:

```sql
DROP POLICY "Users view own reports" ON public.reports;
DROP POLICY "Users insert own reports" ON public.reports;
DROP POLICY "Users update own reports" ON public.reports;
DROP POLICY "Users delete own reports" ON public.reports;
ALTER TABLE public.reports DISABLE ROW LEVEL SECURITY;

DROP POLICY "Users view own proposals" ON public.proposals;
DROP POLICY "Users insert own proposals" ON public.proposals;
DROP POLICY "Users update own proposals" ON public.proposals;
DROP POLICY "Users delete own proposals" ON public.proposals;
ALTER TABLE public.proposals DISABLE ROW LEVEL SECURITY;
```

---

## 🎯 Próximo Passo (Depois de Executar)

1. **Commit Local** (já preparado):
   ```bash
   git add audit-safety-squad-logs/ SUPABASE_SETUP_CHECKLIST.md
   git commit -m "chore: enable RLS on reports and proposals tables [GAMA_CALC_RLS_FIX_20260228]"
   ```

2. **Push to Main**:
   ```bash
   git push origin main
   ```

3. **Deploy**: GitHub Actions executa automaticamente

---

**⏱️ Tempo total: ~5 minutos**

**Vamos lá! 🚀**
