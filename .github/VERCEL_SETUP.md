# Configuração de Deploy Automático no Vercel

## 📋 O que foi criado

Um GitHub Actions workflow (`.github/workflows/vercel-deploy.yml`) que:
- ✅ Faz deploy automático quando você faz push em `develop` ou `main`
- ✅ Deploy em staging quando push em `develop`
- ✅ Deploy em produção quando push em `main`
- ✅ Pode ser acionado manualmente via GitHub Actions

## 🔐 Secrets Necessários

Para que o workflow funcione, você precisa adicionar 3 secrets ao repositório GitHub:

### 1. `VERCEL_TOKEN`
Um token pessoal do Vercel para autenticação.

**Como obter:**
```bash
# Via CLI do Vercel (já instalado)
vercel login

# Ou acesse:
https://vercel.com/account/tokens

# Crie um novo token e copie
```

### 2. `VERCEL_ORG_ID`
O ID da organização no Vercel.

**Como obter:**
```bash
# Via Vercel CLI
vercel project list

# Ou acesse:
https://vercel.com/dashboard/settings/profile
# Procure por "Team ID" ou "Org ID"
```

**Para este projeto:**
```
Procure no dashboard: https://vercel.com/agenciagamastudio/gama-calculadora-app
Team/Org ID geralmente está em: Settings → Team ID
```

### 3. `VERCEL_PROJECT_ID`
O ID do projeto no Vercel.

**Como obter:**
```bash
# Arquivo local (já deve existir)
cat .vercel/project.json | grep projectId

# Ou acesse:
https://vercel.com/agenciagamastudio/gama-calculadora-app/settings
# Procure por "Project ID"
```

---

## ⚙️ Como Adicionar os Secrets ao GitHub

### Opção 1: Via UI do GitHub (Recomendado)

1. Abra seu repositório no GitHub
2. Vá para **Settings** → **Secrets and variables** → **Actions**
3. Clique em **New repository secret**
4. Adicione os 3 secrets:
   - Nome: `VERCEL_TOKEN` → Valor: (token do passo acima)
   - Nome: `VERCEL_ORG_ID` → Valor: (org id do passo acima)
   - Nome: `VERCEL_PROJECT_ID` → Valor: (project id do passo acima)

### Opção 2: Via GitHub CLI

```bash
# Login no GitHub (se necessário)
gh auth login

# Adicionar secrets
gh secret set VERCEL_TOKEN --body "seu_token_aqui"
gh secret set VERCEL_ORG_ID --body "seu_org_id_aqui"
gh secret set VERCEL_PROJECT_ID --body "seu_project_id_aqui"

# Verificar
gh secret list
```

---

## 🧪 Como Testar

Depois de adicionar os secrets:

1. Faça um commit em `develop`:
   ```bash
   git add .
   git commit -m "test: trigger Vercel deploy workflow"
   git push origin develop
   ```

2. Vá para **Actions** no GitHub e veja o workflow rodando

3. Se tudo funcionar:
   - ✅ Build completa em ~30-40s
   - ✅ Deploy acontece em ~1-2 min
   - ✅ Sua app fica disponível em: https://gama-calculadora-app.vercel.app (develop)

---

## 📊 Workflow Behavior

### Quando faz push em `develop`:
```
git push origin develop
        ↓
GitHub Actions acionado
        ↓
npm install + npm run build
        ↓
vercel --yes (staging deploy)
        ↓
App disponível em: https://gama-calculadora-app.vercel.app
```

### Quando faz push em `main`:
```
git push origin main
        ↓
GitHub Actions acionado
        ↓
npm install + npm run build
        ↓
vercel --prod --yes (production deploy)
        ↓
App disponível em: https://gama-calculadora-app.vercel.app (produção)
```

### Acionamento Manual:
- Vá para **Actions** → **Deploy to Vercel** → **Run workflow**
- Escolha a branch e execute

---

## 🔍 Troubleshooting

### Erro: "No VERCEL_TOKEN provided"
- ✅ Solução: Adicionar `VERCEL_TOKEN` aos secrets do GitHub

### Erro: "Project not found"
- ✅ Solução: Verificar se `VERCEL_PROJECT_ID` está correto

### Deploy completa mas site ainda mostra versão antiga
- ✅ Solução: Esperar 1-2 min, limpar cache do navegador (Ctrl+Shift+Del)

### Actions não aparece executando
- ✅ Solução: Verificar se `.github/workflows/vercel-deploy.yml` foi adicionado ao repositório (fazer commit e push)

---

## 📚 Próximos Passos

1. ✅ Adicionar os 3 secrets do Vercel ao GitHub
2. ✅ Fazer um commit para testar o workflow
3. ✅ Acompanhar o build nas Actions
4. ✅ Testar a URL em staging/produção

Depois disso, toda vez que você fizer push, o Vercel faz deploy automaticamente! 🚀

---

**Precisa de ajuda? Abra uma issue ou mande uma mensagem.**
