# Supabase Configuration Checklist

## Credenciais Ambientes ✅
- [ ] `VITE_SUPABASE_URL` - Definida em `.env.local` ou `vercel.json`
- [ ] `VITE_SUPABASE_ANON_KEY` - Definida em `.env.local` ou `vercel.json`

**Status Atual:**
```
✅ vercel.json contém as credenciais públicas:
   - VITE_SUPABASE_URL: https://qnphnhlrvujhqeamszha.supabase.co
   - VITE_SUPABASE_ANON_KEY: sb_publishable_DU5-HUSwTzZa4fH8zOaYMw_ZH0GakUJ
```

---

## Autenticação ✅

### Email/Password Sign In
- [ ] Email/Password habilitado em Authentication → Providers
- [ ] Confirmação de email ativada (Confirm email before signing in)
- [ ] Validação de força de senha (mín. 6 caracteres)

**Recomendações:**
```sql
-- Verificar em Supabase Dashboard → Authentication → Providers → Email
1. Habilitar "Confirm email before signing in"
2. Definir email sender como "prontoatendimentogama@gmail.com"
3. Verificar email templates em Email Templates
```

---

## Banco de Dados 📊

### Tabelas Necessárias

#### 1. `profiles` (Auto-criada pelo Supabase)
```sql
-- Deve existir e ser criada automaticamente ao registrar
CREATE TABLE public.profiles (
  id uuid NOT NULL PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  username text,
  full_name text,
  avatar_url text,
  website text,
  accent_color text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Trigger para criar perfil automaticamente ao registrar
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Função helper
CREATE FUNCTION public.handle_new_user()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path = public
  AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name)
  VALUES (new.id, new.email, NULL);
  RETURN new;
END;
$$;
```

- [ ] Tabela `profiles` existe
- [ ] Trigger `on_auth_user_created` está configurado
- [ ] RLS (Row Level Security) ativado para `profiles`

### RLS Policies para `profiles`
```sql
-- Cada usuário pode ver seu próprio perfil
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Cada usuário pode atualizar seu próprio perfil
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
```

---

## Configurações de Segurança 🔐

### CORS (Cross-Origin Resource Sharing)
- [ ] URL da aplicação está na lista de CORS permitidos
  - Dashboard → Project Settings → API → CORS Allowed Origins
  - Adicionar: `https://gama-calculadora-app.vercel.app`

### JWT Secret
- [ ] JWT secret está seguro (Project Settings → API → JWT Secret)

### Rate Limiting
- [ ] Verificar limites de autenticação em Project Settings

---

## Email Verification 📧

### Email Configuration
- [ ] SMTP configurado ou usando Supabase Email
- [ ] Email template customizado (opcional)
- [ ] Email "From" correto: `prontoatendimentogama@gmail.com`

**Verificar em:**
Dashboard → Authentication → Email Templates

Templates esperados:
- Confirm signup
- Reset password
- Change email address
- Magic link

---

## Testes de Integração 🧪

### 1. Signup Flow
```javascript
// Deve criar usuário em auth.users + profiles
const { data, error } = await supabase.auth.signUp({
  email: 'test@example.com',
  password: 'Test123!@#'
});
// ✅ Usuário criado
// ✅ Email de confirmação enviado
// ✅ Perfil criado em profiles
```

### 2. Login Flow
```javascript
// Deve autenticar e restaurar sessão
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'prontoatendimentogama@gmail.com',
  password: 'sua_senha'
});
// ✅ Session obtida
// ✅ User data carregado
// ✅ Role 'master' setado no AuthContext
```

### 3. Profile Fetch
```javascript
// Deve buscar perfil do usuário
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .single();
// ✅ Perfil retornado
```

---

## Admin Account Setup 👑

### Conta: prontoatendimentogama@gmail.com
- [ ] Conta criada no Supabase Authentication
- [ ] Email confirmado
- [ ] Perfil criado em `profiles`
- [ ] Role 'master' configurado no AuthContext (automático via código)

**Verificar em:**
1. Dashboard → Authentication → Users
2. Procurar `prontoatendimentogama@gmail.com`
3. Clicar e verificar:
   - Email confirmado ✓
   - Último login registrado

---

## Environment Variables 🔧

### .env.local (Local Development)
```bash
VITE_SUPABASE_URL=https://qnphnhlrvujhqeamszha.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_DU5-HUSwTzZa4fH8zOaYMw_ZH0GakUJ
```

### vercel.json (Production)
```json
{
  "env": {
    "VITE_SUPABASE_URL": "https://qnphnhlrvujhqeamszha.supabase.co",
    "VITE_SUPABASE_ANON_KEY": "sb_publishable_DU5-HUSwTzZa4fH8zOaYMw_ZH0GakUJ"
  }
}
```

---

## Troubleshooting 🔧

### "User already registered"
- Supabase envia error se email já existe
- Solução: Usar outro email ou resetar conta em Dashboard

### "Email not confirmed"
- Se `Confirm email before signing in` está ativo
- Solução: Confirmar email pelo link enviado

### CORS Error
- `Origin http://localhost:5173 is not allowed`
- Solução: Adicionar URL à CORS Allowed Origins no Supabase

### Session não persiste
- Problema: localStorage não funciona ou sessão expirou
- Solução: Verificar Supabase session timeout (padrão: 1 hora)

---

## Links Úteis 🔗

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Supabase Dashboard](https://app.supabase.com)
- [PostgreSQL RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)

---

**Última Atualização:** 2026-02-24
**Status:** ✅ AGUARDANDO VERIFICAÇÃO NO DASHBOARD
