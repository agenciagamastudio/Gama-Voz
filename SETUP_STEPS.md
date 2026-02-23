# 🚀 Setup Steps — Execute Agora

## Projeto Supabase Identificado

```
URL: https://qnphnhlrvujhqeamszha.supabase.co
Projeto ID: qnphnhlrvujhqeamszha
```

---

## ✅ PASSO 1: Limpar Dados de Teste

### Via Supabase Console (Recomendado)

1. **Acesse:** https://app.supabase.com
2. **Escolha projeto:** qnphnhlrvujhqeamszha
3. **Vá para:** SQL Editor
4. **Cole este SQL e execute:**

```sql
-- 🧹 LIMPAR TODOS OS DADOS DE TESTE
ALTER TABLE public.user_points DISABLE TRIGGER ALL;
ALTER TABLE public.saved_filters DISABLE TRIGGER ALL;
ALTER TABLE public.proposals DISABLE TRIGGER ALL;
ALTER TABLE public.reports DISABLE TRIGGER ALL;
ALTER TABLE public.companies DISABLE TRIGGER ALL;
ALTER TABLE public.profiles DISABLE TRIGGER ALL;

DELETE FROM public.user_points WHERE true;
DELETE FROM public.saved_filters WHERE true;
DELETE FROM public.proposals WHERE true;
DELETE FROM public.reports WHERE true;
DELETE FROM public.companies WHERE true;
DELETE FROM public.profiles WHERE true;

ALTER TABLE public.user_points ENABLE TRIGGER ALL;
ALTER TABLE public.saved_filters ENABLE TRIGGER ALL;
ALTER TABLE public.proposals ENABLE TRIGGER ALL;
ALTER TABLE public.reports ENABLE TRIGGER ALL;
ALTER TABLE public.companies ENABLE TRIGGER ALL;
ALTER TABLE public.profiles ENABLE TRIGGER ALL;

ALTER SEQUENCE public.companies_id_seq RESTART WITH 1;
ALTER SEQUENCE public.reports_id_seq RESTART WITH 1;
ALTER SEQUENCE public.proposals_id_seq RESTART WITH 1;
ALTER SEQUENCE public.saved_filters_id_seq RESTART WITH 1;

COMMIT;
```

✅ **Resultado esperado:** "Success" (tabelas vazias)

---

## ✅ PASSO 2: Criar Conta ADMIN

### Via Supabase Console

1. **Vá para:** Authentication → Users
2. **Clique:** "Add user"
3. **Preencha:**
   - Email: `prontoatendimentogama@gmail.com`
   - Password: `81844695`
   - **Marque:** "Auto confirm email" ✓

4. **Clique:** Create user

✅ **Resultado esperado:** Usuário criado, "Email confirmed" = YES

### Adicionar Role ADMIN (SQL)

1. **Vá para:** SQL Editor
2. **Cole e execute:**

```sql
UPDATE public.profiles 
SET role = 'admin'
WHERE id = (
  SELECT id FROM auth.users 
  WHERE email = 'prontoatendimentogama@gmail.com'
);
```

✅ **Resultado esperado:** "1 row updated"

---

## ✅ PASSO 3: Testar Login Localmente

1. **Abra:** http://localhost:5174/login
2. **Preencha:**
   - Email: prontoatendimentogama@gmail.com
   - Senha: 81844695
3. **Clique:** "Entrar"

✅ **Resultado esperado:** Login bem-sucedido, perfil carrega, redireciona para dashboard

---

## ✅ PASSO 4: Testar Signup (Novo Usuário)

1. **Abra:** http://localhost:5174/signup
2. **Preencha:**
   - Email: teste@example.com
   - Senha: qualquer-coisa-123
3. **Clique:** "Cadastrar"

✅ **Resultado esperado:** 
- Usuário criado no Supabase
- Perfil criado automaticamente
- Redireciona para dashboard

---

## 🎯 Checklist de Conclusão

- [ ] ✅ Limpeza executada (tabelas vazias)
- [ ] ✅ Usuário ADMIN criado (prontoatendimentogama@gmail.com)
- [ ] ✅ Role ADMIN adicionado (SQL)
- [ ] ✅ Login testado (ADMIN account)
- [ ] ✅ Signup testado (novo usuário)
- [ ] ✅ Perfil carrega sem erros

---

## 📝 Próximos Passos (Depois)

1. **Google OAuth** (configure depois)
2. **Deploy Vercel** (após testes locais OK)
3. **Compartilhar com time**

---

**⏱️ Tempo estimado:** 5-10 minutos

Execute os passos acima e me avisa quando terminar! ✅
