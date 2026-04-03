# ADR-002: Estratégia de Deploy

**Status:** Accepted
**Data:** 2026-02-22
**Agente:** @architect (Aria)

## Contexto

Aplicação React/Vite com backend Supabase (SaaS). Sem CI/CD configurado anteriormente. Agora com GitHub Actions (`ci.yml`) operacional.

## Decisão

**Deploy via Vercel (frontend) + Supabase Cloud (backend)**

### Fluxo de Branches

```
feature/* → develop → PR → main → produção (auto-deploy Vercel)
              ↓
         staging (Vercel preview)
```

### Ambientes

| Ambiente | Branch | URL | Supabase |
|---------|--------|-----|---------|
| Produção | `main` | gama-calculadora.vercel.app | Projeto prod |
| Staging | `develop` | develop--gama-calculadora.vercel.app | Projeto staging |
| Preview | `feature/*` | PR preview automático | Projeto staging |

## Razões para Vercel

- Zero-config para Vite/React
- Deploy automático por branch
- Preview URLs por PR (excelente para review)
- Integração nativa com GitHub Actions existente
- Free tier suficiente para MVP

## Alternativas Consideradas

| Opção | Razão da Rejeição |
|-------|------------------|
| Netlify | Igualmente válido, mas Vercel tem melhor DX com Vite |
| AWS Amplify | Complexidade desnecessária para MVP |
| Self-hosted (VPS) | Custo operacional e manutenção para MVP |

## Próximos Passos

1. Conectar repositório GitHub no Vercel
2. Configurar variáveis de ambiente no Vercel (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
3. Criar projeto Supabase de staging separado do de produção

## Consequências

- ✅ Deploy automático a cada push em `main`
- ✅ Preview por PR sem configuração extra
- ✅ Sem custo inicial
- ⚠️ Vercel tem limite de bandwidth no free tier
- ⚠️ Requer dois projetos Supabase (prod + staging)
