# Setup Vercel - Guia Passo a Passo

## 📋 Pré-requisitos
- [ ] Conta GitHub (repositório da app)
- [ ] Conta Vercel (https://vercel.com)
- [ ] Variáveis de ambiente do Supabase prontas

## 🚀 Passos de Setup

### 1. Conectar Repositório no Vercel
```bash
# Instale Vercel CLI
npm i -g vercel

# Faça login
vercel login

# Deploy automático
vercel
```

### 2. Configurar Environment Variables
No painel Vercel (Project Settings → Environment Variables):

```
VITE_SUPABASE_URL=seu_url_aqui
VITE_SUPABASE_ANON_KEY=sua_chave_aqui
```

### 3. Arquivo vercel.json (opcional)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_SUPABASE_URL": "@supabase_url",
    "VITE_SUPABASE_ANON_KEY": "@supabase_key"
  }
}
```

### 4. Verificar Build
```bash
npm run build   # Gera pasta dist/
npm run preview # Simula produção localmente
```

## ✅ Checklist Final

- [ ] Repositório conectado ao Vercel
- [ ] Env vars configuradas
- [ ] Build passou (`npm run build`)
- [ ] Preview rodando (`npm run preview`)
- [ ] Link da preview: https://seu-projeto.vercel.app
- [ ] Teste fluxos principais na preview

## 📧 Compartilhar com Time

**Link para testes:** https://seu-projeto.vercel.app
**Credenciais de teste:** (compartilhe seguramente)
**Instruções de teste:** Veja docs/TESTING_GUIDE.md

---

**Status:** Pronto para enviar ao time!
