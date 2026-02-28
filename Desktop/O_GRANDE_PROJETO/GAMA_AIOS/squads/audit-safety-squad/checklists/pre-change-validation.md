# Checklist: Pre-Change Validation

**Objetivo:** Validar que você está pronto para executar mudança no Supabase.

---

## ✅ Pré-Requisitos

- [ ] Supabase account ativo
- [ ] GitHub secrets configurados:
  - [ ] `SUPABASE_ACCESS_TOKEN`
  - [ ] `SUPABASE_PROJECT_ID`
  - [ ] `SUPABASE_DB_PASSWORD` (opcional)
- [ ] Workflow `.github/workflows/supabase-migrations.yml` existe
- [ ] Você tem acesso a `supabase/migrations/` directory

---

## ✅ Preparação da Mudança

- [ ] Mudança bem descrita (o quê e por quê)
- [ ] Entendo o impacto (quais tabelas/usuários afetados?)
- [ ] Tenho rollback plan (como desfazer se quebrar?)
- [ ] Sem dependências externas bloqueadas

---

## ✅ Antes de Executar `pre-flight-audit`

- [ ] Já fiz backup manual? (recomendado para prod)
- [ ] Horário bom para mudança? (sem tráfego crítico)
- [ ] Notifiquei team? (se for produção)

---

## ✅ Audit Pre-Flight

O agent `supabase-validator` vai checar:

- [ ] Schema: Tabelas existem? Colunas estão como esperado?
- [ ] RLS: Policies não vão quebrar com mudança?
- [ ] Dependencies: Foreign keys, triggers, views afetadas?
- [ ] Warnings: Há algo suspeito no estado atual?

**Se algum falhar:** Parar e revisar.

---

## ✅ Durante Execução

- [ ] Monitoring: Checar logs enquanto roda?
- [ ] Timeout: Mudança demorou > esperado?
- [ ] Errors: Há erros na execução?

**Se algo falhar:** Rollback será automático.

---

## ✅ Após Execução

- [ ] Status: SUCCESS ou FAILED?
- [ ] Logs: Revisei execution-log.json?
- [ ] Verificação: Mudança realmente foi aplicada?
- [ ] Ready for commit: Pronto para auto-commit?

---

## 🚨 Se Algo Quebrar

1. **Rollback automático** aplicado
2. **Logs** salvos em `audit-safety-squad/logs/{migration_id}/`
3. **Não faça commit** se execution_status ≠ success
4. **Analise** before/after snapshots
5. **Corrija** SQL migration e tente novamente

---

## ✅ Pós-Commit

- [ ] Commit criado localmente
- [ ] Mensagem tem contexto (audit info)
- [ ] @devops notificado
- [ ] Aguardando push

---

## 📋 Template de Mudança

Quando você pede mudança, forneça:

```markdown
## Mudança Solicitada

**O Quê:**
Adicionar coluna `archived` na tabela `users`

**Por Quê:**
Necessário para soft-delete de usuários

**Impacto:**
- Tabela: users
- Novos indexes: idx_users_archived_at
- RLS: Need to update policy "users_select"

**Rollback:**
```sql
ALTER TABLE users DROP COLUMN archived;
```

**Urgência:** Normal / High / Crítica
**Data/Hora:** Quando executar?
```

---

## 📞 Suporte

Se algo quebrar:
1. Checar logs: `audit-safety-squad/logs/{migration_id}/`
2. Consultar before/after snapshots
3. Contatar @architect para decisão de design
4. Manual fix se necessário (com @devops)

---

**Última atualização:** 2026-02-28
**Versão:** 1.0.0
