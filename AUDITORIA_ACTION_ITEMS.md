# ACTION ITEMS — GAMA Calculadora Audit
**Gerado:** 24 de Fevereiro de 2026
**Formato:** Tarefas concretas com passos, não abstrações

---

## AÇÃO #1: DESATIVAR EMAIL WHITELIST (10 min)

**Agente:** @devops
**Urgência:** 🔴 CRÍTICO
**Bloqueador:** Usuários não conseguem se registrar

### Por que?
Apenas `prontoatendimentogama@gmail.com` pode fazer signup. Outros emails recebem erro: "Email address is invalid"

### Passos:
1. Abra: https://app.supabase.com
2. Select project: qnphnhlrvujhqeamszha
3. Left sidebar → "Authentication"
4. Select "Settings" (engrenagem de settings)
5. Procure por seção "Disallow sign ups by default"
   - Se estiver CHECKED ✓ → Desabilitar
6. Procure por "Email" seção (ou "Email Filter")
   - Se houver whitelist → Remover domínios OU desabilitar
7. Scroll para baixo, clique "Save" ou "Update"
8. Aguarde confirmação (30 segundos)

### Verificação:
```bash
# Depois de salvar, testar:
npm run dev
# Ir para http://localhost:5173/signup
# Email: teste123@gmail.com (novo)
# Senha: SenhaForte123!
# Clicar: Cadastrar
# Esperado: OU sucesso OU "Confirme seu email" (não "Email invalid")
```

### Se não funcionar:
- Limpar cache do navegador (Ctrl+Shift+Del)
- Tentar incognito
- Contatar Supabase support se persistir

---

## AÇÃO #2: ADICIONAR CORS PARA VERCEL (10 min)

**Agente:** @devops
**Urgência:** 🔴 CRÍTICO
**Bloqueador:** Requests de produção falham com CORS error

### Por que?
Quando app em https://gama-calculadora-app.vercel.app tenta contactar Supabase, browser bloqueia (CORS).

### Passos:
1. Abra: https://app.supabase.com
2. Select project: qnphnhlrvujhqeamszha
3. Left sidebar → "Project Settings"
4. Tab: "API"
5. Procure por seção "CORS Allowed Origins"
6. Clique: "+ Add allowed origin"
7. Adicione primeira URL:
   ```
   https://gama-calculadora-app.vercel.app
   ```
8. Clique: "+ Add allowed origin" novamente
9. Adicione segunda URL (desenvolvimento):
   ```
   http://localhost:5173
   ```
10. Scroll down, clique "Save"
11. Aguarde confirmação

### Verificação:
```bash
# Testar em produção depois (após deploy)
curl -i https://gama-calculadora-app.vercel.app/
# Procurar em response headers:
# Access-Control-Allow-Origin: https://...
```

---

## AÇÃO #3: APLICAR RLS POLICIES (30 min)

**Agente:** @data-engineer
**Urgência:** 🔴 CRÍTICO
**Bloqueador:** Dados expostos — qualquer usuário vê dados de outros

### Por que?
Tabelas `reports` e `proposals` não têm RLS. Resultado: um usuário consegue fazer:
```sql
SELECT * FROM reports;  -- Vê TODOS os relatórios de TODOS
UPDATE proposals SET ... WHERE id = 999;  -- Modifica proposta alheia
```

### Verificação Inicial:
1. Abra Supabase: https://app.supabase.com
2. Select project: qnphnhlrvujhqeamszha
3. Left sidebar → "SQL Editor"
4. Click "New Query"
5. Paste:
   ```sql
   SELECT tablename, rowsecurity
   FROM pg_tables
   WHERE schemaname = 'public' AND tablename IN ('profiles', 'reports', 'proposals');
   ```
6. Click "Run"
7. Resultado esperado:
   ```
   profiles    | true   ✅
   reports     | false  ❌ PROBLEMA
   proposals   | false  ❌ PROBLEMA
   ```

### Solução — Executar SQL:
```sql
-- PARTE 1: Habilitar RLS
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;

-- PARTE 2: Policies para reports
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

-- PARTE 3: Policies para proposals
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

### Passos de Execução:
1. Abra Supabase SQL Editor (como acima)
2. Selecione e copie TODO o SQL acima
3. Click "New Query"
4. Paste no editor
5. Click "Run"
6. Aguarde "Query successful"
7. Volte para passo de verificação acima
8. Agora deverá mostrar: true para todas 3 tabelas

### Verificação Pós-Implementação:
```sql
-- Testar se RLS está funcionando
SELECT * FROM public.pg_policies WHERE tablename IN ('reports', 'proposals');
-- Deve listar 8 policies (4 por tabela)
```

---

## AÇÃO #4: ALTERAR PASSWORD REQUIREMENTS (10 min)

**Agente:** @devops
**Urgência:** 🔴 CRÍTICO
**Bloqueador:** Senhas fracas (apenas 6 caracteres)

### Por que?
Mínimo de 6 caracteres é suscetível a dicionário attack. Recomendação: 8+ com uppercase/lowercase/números.

### Passos:
1. Abra: https://app.supabase.com
2. Select project: qnphnhlrvujhqeamszha
3. Left sidebar → "Authentication"
4. Tab: "Providers"
5. Click: "Email"
6. Procure por "Minimum password length" ou "Password requirements"
7. Altere para: **8** (ou mais)
8. Procure por "Password character requirements" ou similar
9. Enable/Check:
   - [ ] Uppercase (A-Z)
   - [ ] Lowercase (a-z)
   - [ ] Number (0-9)
   - [ ] Special character (!@#$%^&*)
10. Click "Save" ou "Update"

### Verificação:
```bash
# No /signup, tentar:
# Email: teste@gmail.com
# Senha: 123456  (6 chars)
# Resultado esperado: ❌ "Password too weak" (BOM!)
#
# Senha: TestPass123! (12 chars com tudo)
# Resultado esperado: ✅ Aceita (BOM!)
```

---

## AÇÃO #5: FIX LINTING ERRORS (45 min)

**Agente:** @dev
**Urgência:** 🟡 ALTO
**Bloqueador:** Code não é production-ready

### Status Atual:
```
npm run lint
✖ 36 problems (32 errors, 4 warnings)
```

### ERRO #1: ToastContext (React Refresh)

**Arquivo:** `src/context/ToastContext.jsx`
**Linha:** 39
**Problema:** Exporta constante + hook no mesmo arquivo

**Solução:**
1. Abra `src/context/ToastContext.jsx`
2. Procure por: `export const TOAST_TYPES = {...}`
3. Copie essa constante
4. Crie novo arquivo: `src/utils/toastTypes.js`
5. Cole:
   ```javascript
   // src/utils/toastTypes.js
   export const TOAST_TYPES = {
     success: 'success',
     error: 'error',
     info: 'info',
     warning: 'warning'
   };
   ```
6. No ToastContext.jsx, importe no topo:
   ```javascript
   import { TOAST_TYPES } from '../utils/toastTypes';
   ```
7. Remova a export original de ToastContext.jsx

### ERRO #2: ValueReportContext (React Refresh)

**Arquivo:** `src/context/ValueReportContext.jsx`
**Linha:** 30
**Problema:** Mesma coisa do ToastContext

**Solução:** Mesmo processo acima, crie `src/utils/valueReportTypes.js`

### ERRO #3: useDerivedCalculations (Deps)

**Arquivo:** `src/hooks/useDerivedCalculations.js`
**Linha:** 18

**Problema:**
```javascript
}, dependencies);  // ❌ dependencies é variável, não literal
```

**Solução:**
```javascript
}, [calculateFn, dependencies]);  // ✅ Array literal
```

Ou se `calculateFn` e `dependencies` vêm dos props:
```javascript
// Adicione ao memo hook
useMemo(() => {
  // ...
}, [calculateFn, ...(Array.isArray(dependencies) ? dependencies : [])]);
```

### ERRO #4: Unused Variables

**Arquivo:** `src/utils/marketData.js`
**Linha:** 42
**Variável:** `clientName`
**Solução:** Ou remova ou use:
```javascript
// ❌ Remover se não usar
// const clientName = ...;

// ✅ OU usar em algum lugar no código
```

**Arquivo:** `src/utils/pdfExport.js`
**Linha:** 45
**Variável:** `pdfHeight`
**Solução:** Mesma coisa acima

### Auto-fix:
```bash
npm run lint -- --fix
```

Isso corrige alguns automaticamente. Depois:
```bash
npm run lint
```

Se ainda houver erros, aplicar soluções acima manualmente.

---

## AÇÃO #6: CONFIRMAR ADMIN EMAIL (5 min)

**Agente:** Manual (User)
**Urgência:** 🟡 ALTO
**Bloqueador:** Admin não consegue logar

### Por que?
Conta `prontoatendimentogama@gmail.com` foi criada, mas email NÃO foi confirmado. Supabase requer confirmação antes de login.

### Passos:
1. Abra inbox: prontoatendimentogama@gmail.com
2. Procure por email de "Supabase" com assunto tipo:
   - "Confirm your signup"
   - "Verify your email"
   - "Email confirmation"
3. Clique no link no email
4. Browser vai redirecionar para app (pode mostrar loading)
5. Email agora está confirmado ✅

### Verificação:
```bash
# Depois de confirmar, abra https://gama-calculadora-app.vercel.app/login
# Email: prontoatendimentogama@gmail.com
# Senha: (a senha que foi criada)
# Clicar: Entrar no Sistema
# Resultado esperado: ✅ Loga e vai para dashboard
```

### Se não receber email:
1. Procurar em Spam
2. Aguardar 5 minutos (pode demorar)
3. Se nada, ir a Supabase Dashboard:
   - Authentication → Users
   - Procurar `prontoatendimentogama@gmail.com`
   - Click e verificar status "Email confirmed"

---

## AÇÃO #7: TESTAR DEPLOYMENT EM PRODUÇÃO (20 min)

**Agente:** @qa
**Urgência:** 🟡 ALTO
**Bloqueador:** Não sabemos se está funcionando

### Verificação 1: App Online?
```bash
# Abrir em navegador:
https://gama-calculadora-app.vercel.app/

# Esperado:
# - Página carrega (não 404, não branco)
# - Vê "Gama Calc" logo
# - Página não tem console errors

# Se 404 ou branco:
# - Deployment falhou
# - Contactar @devops
```

### Verificação 2: Signup Funciona?
```bash
# URL: https://gama-calculadora-app.vercel.app/signup

# Teste A: Com email whitelist ativo (esperado falhar)
Email: teste@gmail.com
Senha: SenhaForte123!
Resultado esperado: ❌ "Email address is invalid" (ESPERADO)

# Teste B: Com email whitelisted (depois de desativar email whitelist)
Email: novouser@gmail.com
Senha: SenhaForte123!
Resultado esperado: ✅ "Verifique seu email para confirmar"
```

### Verificação 3: Login Funciona?
```bash
# URL: https://gama-calculadora-app.vercel.app/login

Email: prontoatendimentogama@gmail.com
Senha: (use a confirmada)
Resultado esperado: ✅ Redireciona para dashboard
```

### Verificação 4: Admin Dashboard?
```bash
# Depois de logar, URL deve ser:
https://gama-calculadora-app.vercel.app/

# Ou ir direto:
https://gama-calculadora-app.vercel.app/admin

# Esperado: Vê "Admin Dashboard" com promo codes, etc.
```

### Documento QA:
Criar arquivo: `docs/QA_PRODUCTION_VERIFICATION.md`
```markdown
# QA Production Verification — 2026-02-24

## Test Results
- [ ] App loads (https://gama-calculadora-app.vercel.app/)
- [ ] Signup page accessible
- [ ] Login page accessible
- [ ] Email whitelist: Disabled ✅
- [ ] CORS: Added for Vercel URL ✅
- [ ] Admin email: Confirmed ✅
- [ ] Admin login: Works ✅
- [ ] Admin dashboard: Loads ✅
- [ ] RLS: Policies applied ✅

## Verdict: PASS / FAIL / CONCERNS

Date: 2026-02-24
Tester: @qa
```

---

## AÇÃO #8: CODE-SPLIT PDFEXPORT (2 hours)

**Agente:** @dev
**Urgência:** 🟡 ALTO (pós-FASE 1)
**Bloqueador:** Performance ruins (587 KB chunk)

### Por que?
PDF export usa html2canvas (100 KB) + jspdf (73 KB). Isso é carregado mesmo se usuário nunca usar PDF.

### Solução: Dynamic Import

**Arquivo:** `src/components/ReportGenerator.jsx` (ou qualquer que use PDF)

**Before:**
```javascript
import { exportToPDF } from '../utils/pdfExport';

function ReportGenerator() {
  const handleExport = () => {
    exportToPDF(data);
  };
  // ...
}
```

**After:**
```javascript
function ReportGenerator() {
  const handleExport = async () => {
    // Carrega PDF export APENAS quando clicado
    const { exportToPDF } = await import('../utils/pdfExport');
    exportToPDF(data);
  };
  // ...
}
```

### Alternativa: Lazy Component

```javascript
import { lazy, Suspense } from 'react';

const PDFExportModal = lazy(() => import('./PDFExportModal'));

function ReportGenerator() {
  const [showPDFExport, setShowPDFExport] = useState(false);

  return (
    <>
      <button onClick={() => setShowPDFExport(true)}>Exportar PDF</button>

      {showPDFExport && (
        <Suspense fallback={<div>Carregando...</div>}>
          <PDFExportModal onClose={() => setShowPDFExport(false)} />
        </Suspense>
      )}
    </>
  );
}
```

### Verificação Pós-Implementação:
```bash
npm run build
# Procurar output por "pdfExport"
# Resultado esperado:
# Antes: pdfExport-DvTFl5WF.js 587.39 kB
# Depois: pdfExport-*.js + outros chunks < 300 kB each
```

---

## AÇÃO #9: REMOVER SECRETS DE CÓDIGO (30 min)

**Agente:** @dev
**Urgência:** 🟠 MÉDIO (boa prática)
**Bloqueador:** Não é bloqueador (são public keys)

### Problema:
```json
// vercel.json
{
  "env": {
    "VITE_SUPABASE_ANON_KEY": "sb_publishable_..."
  }
}
```

Apesar de ser "anon key" (pública), boa prática é não manter em código.

### Solução:

#### Step 1: Mover para Vercel Dashboard
1. Abra: https://vercel.com
2. Select project: gama-calculadora-app
3. Tab: "Settings" → "Environment Variables"
4. Add:
   ```
   Name: VITE_SUPABASE_URL
   Value: https://qnphnhlrvujhqeamszha.supabase.co
   ```
5. Add:
   ```
   Name: VITE_SUPABASE_ANON_KEY
   Value: sb_publishable_DU5-HUSwTzZa4fH8zOaYMw_ZH0GakUJ
   ```
6. Save

#### Step 2: Atualizar vercel.json
**Arquivo:** `vercel.json`

**Before:**
```json
{
  "env": {
    "VITE_SUPABASE_URL": "https://qnphnhlrvujhqeamszha.supabase.co",
    "VITE_SUPABASE_ANON_KEY": "sb_publishable_DU5-HUSwTzZa4fH8zOaYMw_ZH0GakUJ"
  }
}
```

**After:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [...],
  "headers": [...]
}
```

#### Step 3: .gitignore
Já deve ter, mas confirmar `.gitignore` tem:
```
.env
.env.local
.env.*.local
```

#### Step 4: Local Development
Arquivo: `.env.local` (já existe, não fazer commit)
```
VITE_SUPABASE_URL=https://qnphnhlrvujhqeamszha.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_DU5-HUSwTzZa4fH8zOaYMw_ZH0GakUJ
```

### Verificação:
```bash
# Test local
npm run dev
# Deve funcionar (pega .env.local)

# Test build
npm run build
# Deve funcionar (Vercel pega vars do dashboard)
```

---

## AÇÃO #10: ATUALIZAR README (30 min)

**Agente:** @dev
**Urgência:** 🟠 MÉDIO
**Bloqueador:** Não é bloqueador

### Atual:
README.md é genérico (template Vite).

### Novo README deve ter:

**Arquivo:** `README.md`

```markdown
# GAMA Calculadora App

Enterprise calculator for project pricing and diagnostics.

## Stack

- React 19.2
- Vite 7.3
- Supabase Auth + PostgreSQL
- Tailwind CSS
- Recharts for data visualization

## Quick Start

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

```bash
git clone https://github.com/agenciagamastudio/gama-calculadora-app.git
cd gama-calculadora-app
npm install
```

### Development

```bash
npm run dev
# Abra http://localhost:5173
```

### Build

```bash
npm run build
npm run preview
```

### Tests

```bash
npm run test       # Watch mode
npm run test -- --run  # Single run
npm run lint       # ESLint
```

## Environment Variables

Create `.env.local`:

```
VITE_SUPABASE_URL=https://qnphnhlrvujhqeamszha.supabase.co
VITE_SUPABASE_ANON_KEY=your-key-here
```

## Project Structure

```
src/
├── components/      # React components
├── context/         # Context providers (Auth, Toast, etc)
├── hooks/          # Custom React hooks
├── utils/          # Utilities (Supabase, calculations)
├── styles/         # CSS/Tailwind configs
└── App.jsx        # Main app component
```

## Features

- [x] User authentication (Email/Password)
- [x] Pricing calculator
- [x] Value diagnostics
- [x] PDF export
- [x] Promo codes management (Admin)
- [x] User profiles

## Deployment

Deployed on Vercel: https://gama-calculadora-app.vercel.app

### Production Deployment

```bash
# Automated via GitHub Actions on push to main
git push origin main
# Check: https://vercel.com/agenciagamastudio/gama-calculadora-app
```

## Documentation

- [Deployment Checklist](./DEPLOYMENT_CHECKLIST.md)
- [Supabase Configuration](./SUPABASE_CHECKLIST.md)
- [Architecture Review](./ARCHITECTURE-REVIEW-COMPLETE.md)
- [Audit Report](./AUDITORIA_COMPLETA_2026-02-24.md)

## Security

- Row-Level Security (RLS) enabled on all tables
- Email confirmation required for signup
- Admin credentials: prontoatendimentogama@gmail.com
- CORS configured for https://gama-calculadora-app.vercel.app

## Support

For issues, see troubleshooting in docs/ or contact the team.

---

**Last Updated:** 2026-02-24
**Status:** Production Ready (After Phase 1 audit fixes)
```

---

## RESUMO EXECUTIVO

```
Total de Ações: 10
Tempo Total: ~5-6 horas
Agentes Envolvidos: @devops (3), @data-engineer (1), @dev (3), @qa (1), Manual (2)

HOJE (Priority 1 = CRÍTICO):
├─ AÇÃO 1: Email Whitelist — 10 min (@devops)
├─ AÇÃO 2: CORS — 10 min (@devops)
├─ AÇÃO 3: RLS Policies — 30 min (@data-engineer)
├─ AÇÃO 4: Password Policy — 10 min (@devops)
├─ AÇÃO 5: Linting — 45 min (@dev)
├─ AÇÃO 6: Admin Email — 5 min (Manual)
├─ AÇÃO 7: Production Test — 20 min (@qa)
└─ **Subtotal: 2.5 horas**

PRÓXIMA SEMANA (Priority 2 = ALTO):
├─ AÇÃO 8: Code-split PDF — 2h (@dev)
├─ AÇÃO 9: Remove Secrets — 30 min (@dev)
├─ AÇÃO 10: Update README — 30 min (@dev)
└─ **Subtotal: 3 horas**

**Score Progression:**
Before: 80/100
After Ações 1-7: 92/100
After Ações 8-10: 95/100
```

---

## PRÓXIMO PASSO

Distribua este documento com os action items para cada agente:
1. Envie para @devops com AÇÕES 1, 2, 4
2. Envie para @data-engineer com AÇÃO 3
3. Envie para @dev com AÇÕES 5, 8, 9, 10
4. Envie para @qa com AÇÃO 7
5. Execute AÇÃO 6 manualmente

**Timeline:** Todas as AÇÕES 1-7 devem estar DONE em 24 horas.

---

**FIM DO ACTION ITEMS**
