# GAMA PRICE — Próximos Passos Práticos (MVP Validation)

**Data:** 17 de março de 2026
**Fase:** Week 1-4 (MVP Pre-Launch Validation)
**Responsável:** @pm (Morgan) + @sm + @analyst
**Checkpoint:** EoW4 (Go/No-Go Decision)

---

## SEMANA 1: Validação de Campo + Spec MVP

### Atividade 1.1: Customer Research (20 Entrevistas)

**Objetivo:** Validar que problema é REAL e tem disposição a pagar

**Quem:** Você + 1 assistente de pesquisa
**Quando:** Segunda a sexta (5 entrevistas/dia)
**Formato:** Call 15 min (WhatsApp, Zoom, call)

**Script de Entrevista (Memorizar):**
```
"Ó [nome], tudo bem? Tá desenvolvendo uma ferramenta de pricing pra
lojistas, e gostaria de entender como você precifica hoje.

1. Como você define o preço de cada produto? (Ouve resposta)
2. Você já perdeu venda por preço alto? Quantas por mês? (Número!)
3. Quanto você gasta em tempo/recursos analisando preço? ($/mês)
4. Se tivesse uma calculadora automática, quanto pagaria? ($29? $49? $99?)
5. Qual é a sua maior dor em pricing hoje?

Obrigado! Vou manter você atualizado."
```

**Alvo:** 100-150 lojas moda Brasil
- Contatos: LinkedIn + Instagram DMs + WhatsApp groups
- Critério de seleção: Lojas ativas (3+ posts/mês), 5-100 lojas de marca

**Deliverable:** Documento `research-findings.md` com:
- 20 entrevistas resumidas (síntese de respostas)
- Padrões identificados (80% usa gut feeling? % quer pagar?)
- Validation score (problema é REAL? 1-10)
- Disposição a pagar (média citada)

**Success Metric:** >= 8/10 em "problema é real" + >= 60% disposição pagar $25+

---

### Atividade 1.2: Competitive Deep-Dive

**Objetivo:** Confirmar que gap existe e que posso diferenciar

**Quem:** @analyst + @pm
**Tempo:** 3 dias

**Tarefas:**
- [ ] Testar todos 5 competidores (Omnia, Competera, ClearDemand, Revionics, Priceva)
  - Signup em free tier (se tiver)
  - Teste calculadora básica
  - Preço exato, features, integrações
  - Onboarding experience (é fácil? Confuso?)

- [ ] Criar matriz competitiva (colunas: Preço, Features, UX, Alvo)

- [ ] Identificar 3 diferencias ÚNICAS de GAMA PRICE:
  - Ex: "Mais barato ($29 vs $5k)", "Mais simples (0 onboarding)"
  - Ex: "Integração nativa Shopify + Bling", "IA automática"
  - Ex: "Comunidade Brasil + suporte em PT"

**Deliverable:** `competitive-analysis.md` com:
- Matriz 5 competitors vs GAMA PRICE
- 3 diferencias claras (por quê escolher GAMA PRICE?)
- Oportunidades de posicionamento (ex: "The affordable pricing AI for small retailers")

---

### Atividade 1.3: MVP Scope Definition

**Objetivo:** Definir escopo MINIMALISTA que valida hipóteses rapidamente

**Quem:** @dev (Dex) + @pm + @architect
**Tempo:** 1 dia (spec meeting)

**MVP v1 — Não fazer:**
- ❌ Integração API (Shopify, Bling, Square)
- ❌ Relatórios avançados
- ❌ IA complexa (ainda não)
- ❌ Design polish
- ❌ Múltiplos idiomas
- ❌ Mobile app

**MVP v1 — Fazer:**
- ✅ Calculadora de preço (custo + margem = preço sugerido)
- ✅ Upload CSV (SKUs)
- ✅ Dashboard simples (tabela: SKU, custo, preço atual, preço sugerido, diff)
- ✅ Email semanal com sumário
- ✅ Auth básica (email/password)
- ✅ Free tier (1 SKU calculadora) + Pro tier ($29 CSV + dashboard)
- ✅ Suporte via email

**Tech Stack (Rápido):**
- Frontend: Next.js (Vercel)
- Backend: Next.js API routes + Supabase PostgreSQL
- Auth: Supabase Auth
- Payments: Stripe
- Deploy: Vercel

**Timeline:**
- Week 2-3: Implementation (8 semanas estimado)
- Week 4: Testing + bugfix
- Week 5: Private beta launch (100 testers)

**Deliverable:** `MVP_SPEC.md` com wireframes + user stories + database schema

---

## SEMANA 2-3: MVP Development

### Atividade 2.1: Build & Launch (Private Beta)

**Responsável:** @dev (Dex) + @architect

**Milestones:**
- Day 1-3: Auth + DB schema
- Day 4-7: Calculadora + CSV upload
- Day 8-10: Dashboard + email
- Day 11-14: Testing + bugfix
- Day 15: Deploy Vercel + Stripe test mode

**Testing Checklist:**
- [ ] 1 SKU calculadora funciona (margem % + preço)
- [ ] CSV upload processa corretamente
- [ ] Dashboard exibe dados
- [ ] Email semanal dispara
- [ ] Free tier funciona (1 SKU)
- [ ] Upgrade pra Pro funciona (Stripe test)
- [ ] Sem erros no console

**Deliverable:** URL live (ex: gama-price.vercel.app) pronto pra 100 testers

---

### Atividade 2.2: Onboarding & Success Tracking

**Responsável:** @pm + customer success

**Setup:**
- [ ] Email de boas-vindas (1 email)
- [ ] Email sequence (3 emails em 7 dias)
  - Email 1: Bem-vindo, como funciona (48h post-signup)
  - Email 2: Primeiros steps (3 dias)
  - Email 3: Case study de outro lojista (7 dias)
- [ ] Whatsapp group (100 testers)
- [ ] Feedback form (Google Forms)
- [ ] Datadog/Metabase dashboard (track: signups, conversions, churn)

---

## SEMANA 4: Analyze & Go/No-Go Decision

### Atividade 4.1: Análise de Dados

**Responsible:** @analyst + @pm

**Métricas a Coletar:**
- [ ] # Free signups (Target: 100+)
- [ ] # Conversões pra Pro (Target: 3-5)
- [ ] Conversion rate (Target: >= 3%)
- [ ] Feature usage (% que faz upload CSV, vê dashboard)
- [ ] Time to value (dias até primeiro upload)
- [ ] Churn (% que desistiu em 7 dias)
- [ ] Feedback qualitativo (satisfação, dores, sugestões)

**Deliverable:** `RESULTS_WEEK4.md` com all metrics + análise

---

### Atividade 4.2: Go/No-Go Decision Meeting

**Quando:** Final Semana 4 (Q1 2026 end)

**Critério GO:**
```
✅ >= 50 free signups
✅ >= 3 paid conversions
✅ Conversion rate >= 3%
✅ Feedback > 7/10 (satisfação)
✅ Problema validado (research = "real")
✅ Team aligned em próximos passos
```

**Critério NO-GO:**
```
❌ < 50 free signups (não há demanda)
❌ 0-2 conversões (ninguém paga)
❌ Conversion < 2% (modelo freemium quebra)
❌ Feedback < 5/10 (produto não resolve dor)
❌ Problema não validado
```

**Se GO:** Escalar para Fase 2 (M2-6 growth)
**Se NO-GO:** Pivotar ou discontinuar

---

## Artefatos por Criar

| Artefato | Dono | Due | Prioridade |
|----------|------|-----|-----------|
| `research-findings.md` | @analyst | EoW1 | 🔴 CRÍTICO |
| `competitive-analysis.md` | @analyst | EoW1 | 🔴 CRÍTICO |
| `MVP_SPEC.md` | @dev + @pm | Day 4-5 | 🔴 CRÍTICO |
| `RESULTS_WEEK4.md` | @analyst | EoW4 | 🟡 IMPORTANTE |
| Codebase MVP | @dev | EoW3 | 🔴 CRÍTICO |
| Datadog Dashboard | @devops | Week 2 | 🟡 IMPORTANTE |

---

## Dependências & Riscos

### Dependências
- [ ] GAMA PRICE Vercel project criado (request @devops)
- [ ] Supabase postgres schema access (@devops)
- [ ] Stripe test account configurado (@devops)
- [ ] 100+ email list de lojistas (pesquisa)

### Riscos Mitigation
| Risco | Probabilidade | Mitigation |
|------|---|---|
| Entrevistas não respondem | ALTA | Começar contatos Week 0.5 |
| Dev pega 12 semanas em vez de 8 | MÉDIA | Escopo minimalista, pare em "bom o suficiente" |
| Conversion = 0% | MÉDIA | Aumentar free tier, A/B test messaging |
| Churn > 50% em 7 dias | ALTA | Onboarding video, email sequence, suporte rápido |

---

## Budget Estimado (Week 1-4)

| Item | Custo | Justificação |
|------|-------|----------|
| Vercel hosting | $50 | Premium tier |
| Supabase DB | $25 | Tier básico |
| Stripe fees | $0 (test) | Test mode |
| Assistente pesquisa (freelancer) | $500 | 40h entrevistas |
| **TOTAL** | **~$575** | Investimento baixo |

---

## Success Metrics (Trimestral Check-in)

### Week 4 (EoQ1 2026)
- [ ] 50+ free users
- [ ] 3+ paid users
- [ ] Conversion >= 3%
- [ ] Feedback > 7/10

### Week 13 (Q2 2026)
- [ ] 5k free users
- [ ] 200+ paid users
- [ ] Conversion 4-5%
- [ ] CAC < $150

### Week 26 (H2 2026)
- [ ] 20k free users
- [ ] 1k+ paid users
- [ ] MRR > $30k
- [ ] Churn < 8%

---

## Contatos & Responsabilidades

| Role | Name | Slack | Responsibilidade |
|------|------|-------|-----------------|
| PM | Morgan | @pm | Roadmap, GTM strategy, biz decisions |
| Dev | Dex | @dev | MVP build, technical execution |
| Analyst | Analyst | @analyst | Research, competitive analysis, metrics |
| Customer Success | [TBD] | - | Onboarding, support, feedback collection |
| DevOps | Gage | @devops | Infra (Vercel, Supabase, Stripe setup) |

---

## Dúvidas Frequentes

**P: Por que não começar com integração API?**
A: Porque não sabemos se lojista QUER a ferramenta. Validar problema primeiro, features depois.

**P: E se ninguém converter?**
A: Significa que (a) preço está alto, (b) produto não resolve dor, ou (c) mercado não tem dor. Pivotar.

**P: Quanto tempo até lucro?**
A: Se tudo der certo: Breakeven M8-9 (ARR $700k, custos $300k). Se não: pivota ou fecha.

**P: Por que Freemium se CAC é alto?**
A: Porque discovery é grátis (educação). Free users depois convertem (warm leads).

---

**Status:** ✅ PRONTO PARA KICKOFF (Monday Week 1)
**Next Action:** Enviar este documento pra equipe + schedule kickoff meeting

