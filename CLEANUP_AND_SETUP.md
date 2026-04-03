# 🧹 Cleanup & Fresh Setup — GAMA Calculadora

## 📋 Status Atual

✅ Git: Pronto (branch: develop)
✅ Code: Refatorado (9 módulos novos, 100% qualidade)
✅ Supabase: Auditado (roadmap de melhorias)
✅ Local: Rodando (localhost:5174)

## 🧹 FASE 1: Limpar Dados de Teste

Execute na Supabase:

```bash
# Option A: Via Supabase CLI
supabase db push
# Isso vai rodar a migration 20260222000015_clean_test_data.sql

# Option B: Manualmente via Console Supabase
# 1. Vá para SQL Editor
# 2. Cole o conteúdo de supabase/migrations/20260222000015_clean_test_data.sql
# 3. Execute
```

**Resultado:**
- ✅ Todas as tabelas vazias
- ✅ IDs resetados (começam em 1)
- ✅ Estrutura preservada

---

## 👤 FASE 2: Criar Conta ADMIN

Execute em Supabase Authentication:

```
Email: prontoatendimentogama@gmail.com
Senha: 81844695
Role: admin (manual no SQL depois)
```

### Passos:

1. **Ir para:** Supabase Console → Authentication → Users
2. **Criar usuário:**
   ```
   Email: prontoatendimentogama@gmail.com
   Password: 81844695
   Email confirmed: ✓ (marcar)
   ```

3. **Adicionar role ADMIN** (SQL):
   ```sql
   UPDATE public.profiles 
   SET role = 'admin'
   WHERE id = (SELECT id FROM auth.users WHERE email = 'prontoatendimentogama@gmail.com');
   ```

4. **Testar login:**
   - Vá para http://localhost:5174/login
   - Email: prontoatendimentogama@gmail.com
   - Senha: 81844695
   - ✅ Deve logar e carregar perfil

---

## 🔐 FASE 3: Google OAuth (Próxima)

Depois de testar signup/login básico:

1. **Setup Google Cloud:**
   - Criar OAuth 2.0 credentials
   - Adicionar Redirect URIs:
     - http://localhost:5174/auth/callback
     - https://seu-projeto.vercel.app/auth/callback

2. **Setup Supabase:**
   - Supabase Console → Authentication → Providers
   - Google: ✓ Enable
   - Add Client ID & Secret

3. **Código:**
   - AuthContext.jsx já tem suporte (apenas configurar)

---

## 🚀 FASE 4: Deploy Vercel

```bash
# 1. Login Vercel
vercel login

# 2. Deploy
vercel

# 3. Configure env vars:
VITE_SUPABASE_URL=seu_url
VITE_SUPABASE_ANON_KEY=sua_chave

# 4. Preview link aparece automaticamente
```

---

## ✅ Checklist Final

- [ ] Migration de cleanup executada (`supabase db push`)
- [ ] Dados antigos deletados
- [ ] Conta ADMIN criada (prontoatendimentogama@gmail.com)
- [ ] Login testado em localhost
- [ ] Signup testado (cria novo usuário + perfil)
- [ ] Vercel configurado
- [ ] Google OAuth setup (fase 2)

---

## 📝 Git Status

```
Branch: develop
Modified files: 5 (AuthContext, PricingCalculator, etc)
New files: 24 (refactoring + docs)
```

**Próximo:** Fazer commit antes de deployar

```bash
git add .
git commit -m "refactor: complete component refactoring + Supabase audit + profile fix"
git push
```

---

**Status:** Pronto para cleanup + fresh start! 🎉
