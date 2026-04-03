# Session State - Gamificação GAMA Calculadora

**Data:** 2026-02-28
**Status:** Checkpoint salvo para próxima sessão
**Desenvolvedor:** @dev (Dex)
**Story:** Story 1.8 - Sistema de Gamificação - Ações de Engajamento com Pontos Extras

---

## ✅ COMPLETADO NESTA SESSÃO

### Banco de Dados
- ✅ Tabela `user_achievements` criada no Supabase
- ✅ Colunas `professional_role` e `company` adicionadas à tabela `profiles`
- ✅ RLS policies configuradas para achievements

### Features Implementadas
1. ✅ **Modal "Ganhe Pontos"** - Aparece automaticamente após completar perfil
2. ✅ **Tour de Onboarding** - Aparece APÓS login + completar perfil (5 steps)
3. ✅ **WhatsApp na Login Page** - Link +55 (75) 9 8147-2503 com mensagem pré-preenchida
4. ✅ **Profile Completo** - Exige: Nome + Avatar + Cargo + Empresa
5. ✅ **Auto-Points para First Diagnostic** - 5 pts automaticamente ao criar diagnóstico
6. ✅ **Auto-Points para First Proposal** - 5 pts automaticamente ao criar proposta
7. ✅ **Social Actions** - Instagram + WhatsApp manualmente ativados

### Commits Realizados
```
9870725 - fix: correct route navigation from calculator actions
7163b4e - fix: save professional role and company to profile
cf7f614 - fix: move onboarding tour to appear AFTER profile completion
e8cbf7e - feat: add WhatsApp contact to login forgot password link
c4ff0d - feat: create audit-safety-squad with 3 agents, 3 tasks, workflow
```

---

## ❌ PENDENTE PARA PRÓXIMA SESSÃO

### Alto Impacto (Crítico)
1. **Barra preta no loading `/profile`**
   - Arquivo: `src/components/UserProfile.jsx` linha 115
   - Problema: Loading spinner com fundo preto renderiza acima de conteúdo
   - Solução: Adicionar z-index ou ajustar CSS do loader

2. **Performance `/profile` (demora às vezes)**
   - Possível: Query lenta no Supabase ao carregar profile
   - Verificar: Índices em auth.users e profiles tabelas
   - Testar: Medir tempo de carregamento com DevTools Network

### Médio Impacto
3. **Share Proposal não ganha ponto automaticamente**
   - Achievement ID: `share_proposal`
   - Precisa: Hook no componente ShareProposal ou listener de compartilhamento

### Baixo Impacto (Nice-to-Have)
4. **Remover emojis da description de achievements**
   - Arquivo: `src/constants/achievements.js`
   - Exemplo: "Primeiro Diagnóstico 📊" → "Primeiro Diagnóstico"

---

## 🧪 TESTE CHECKLIST (quando voltar)

Execute isto na próxima sessão:

```bash
# 1. Iniciar dev server
npm run dev

# 2. Abrir http://localhost:5174
# 3. Limpar localStorage
localStorage.clear(); sessionStorage.clear(); location.reload();

# 4. Testar fluxo completo:
[ ] Login com email
[ ] Preencher perfil (nome, cargo, empresa, foto)
[ ] Ganhar 5 pontos automaticamente
[ ] Tour aparecer
[ ] Clicar "Ir para Calculadora" → vai pra /
[ ] Criar diagnóstico → ganha 5 pontos
[ ] Criar proposta → ganha 5 pontos
[ ] Clicar Instagram → abre em nova aba
[ ] Clicar WhatsApp → abre WhatsApp Web com mensagem
```

---

## 📁 ARQUIVOS CRÍTICOS

| Arquivo | Função | Status |
|---------|--------|--------|
| `src/hooks/useAchievements.js` | Hook de pontos | ✅ Funcional |
| `src/constants/achievements.js` | Definição de ações | ✅ Funcional |
| `src/components/EarnPointsModal.jsx` | Modal principal | ✅ Funcional |
| `src/components/OnboardingTour.jsx` | Tour 5-steps | ✅ Funcional |
| `src/components/UserProfile.jsx` | Perfil + trigger tour | ✅ Com melhorias pendentes |
| `src/components/DiagnosticoDeValorCalculator.jsx` | Auto-points diagnóstico | ✅ Funcional |
| `src/components/PricingCalculator.jsx` | Auto-points proposta | ✅ Funcional |
| `docs/migrations/create-user-achievements-table.sql` | Tabela achievements | ✅ Executada |
| `supabase/migrations/20260228_add_profile_fields.sql` | Profile fields | ✅ Executada |

---

## 🔑 Variáveis de Ambiente Confirmadas

```
VITE_SUPABASE_URL=https://qnphnhlrvujhqeamszha.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_DU5-HUSwTzZa4fH8zOaYMw_ZH0GakUJ
SERVICE_ROLE_KEY=[salvo em sessão anterior]
```

---

## 📝 Próximos Passos Recomendados

**Sessão Próxima (Priority Order):**

1. ⚠️ Corrigir barra preta no loading `/profile`
2. 🔍 Investigar performance `/profile`
3. ⭐ Share Proposal auto-points
4. 🧹 Limpeza de emojis em achievements

**Depois:**
- [ ] Testar com múltiplos usuários
- [ ] Validar pontos persistem após refresh
- [ ] Testar localStorage limits
- [ ] Performance em dispositivos móveis

---

## 💬 Notas Importantes

- **localStorage.getItem('gama-tour-seen-{user-id}')** marca tour como visto
  - Limpar se tour não aparecer: `localStorage.clear()`

- **Proposta salva em:** localStorage key `'gama-proposals'`

- **Diagnóstico salvo em:** Supabase + localStorage fallback

- **Tour deve aparecer APENAS após:** nome + avatar + cargo + empresa preenchidos

- **Todos os achievement hooks adicionados com `await`**
  - Testar se há delay visível no redirect

---

**Última atualização:** 2026-02-28 17:45 UTC
**Próxima sessão:** Continuará de onde parou - basta ler este arquivo!
