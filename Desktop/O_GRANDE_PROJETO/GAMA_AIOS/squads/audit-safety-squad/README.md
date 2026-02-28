# 🏗️ Audit & Safety Squad

**Versão:** 1.0.0
**Status:** Active
**Criado:** 2026-02-28

---

## O Que É?

Squad que **previne erros em Supabase** antes de executar mudanças, fornecendo **contexto de IA** para não fazer besteira.

Fluxo automático:
```
Você pede mudança
    ↓
Validar estado (schema, RLS, deps)
    ↓
Executar migration
    ↓
Auto-commit no GitHub
    ↓
@devops push
```

---

## Problema que Resolve

❌ **Antes:** Você pede mudança → IA propõe algo → quebra RLS ou cria conflito
✅ **Depois:** Você pede mudança → IA vê contexto completo → executa com segurança

---

## Componentes

### Agents (3)
- 🔍 **supabase-validator** — Audita estado antes
- ⚡ **supabase-executor** — Executa com contexto
- 📝 **github-committer** — Auto-commit automático

### Tasks (3)
- `pre-flight-supabase-audit.md` — Validação prévia
- `execute-supabase-migration.md` — Executa migration
- `auto-commit-github.md` — Faz commit

### Workflow (1)
- `change-request-workflow.yaml` — Orquestra os 3 tasks

### Integração
- Reutiliza: `db-schema-audit.md` (auditoria de schema)
- Reutiliza: `db-rls-audit.md` (auditoria de RLS)
- Usa: `.github/workflows/supabase-migrations.yml` (workflow existente)

---

## Como Usar

### Passo 1: Pedir Mudança
```bash
# Você descreve o que quer:
# "Quero adicionar coluna 'archived' na tabela users com RLS apropriada"
```

### Passo 2: Validação Automática
```bash
*activate audit-safety-squad
*run pre-flight-supabase-audit
# supabase-validator checa:
# ✅ Schema atual
# ✅ RLS policies
# ✅ Dependências
# ✅ Gera AI context
```

### Passo 3: Execução
```bash
*run execute-supabase-migration
# supabase-executor:
# ✅ Lê contexto
# ✅ Cria migration SQL
# ✅ Executa via workflow
# ✅ Coleta logs
```

### Passo 4: Auto-Commit
```bash
*run auto-commit-github
# github-committer:
# ✅ Faz git add
# ✅ Cria commit com contexto
# ✅ Notifica @devops para push
```

### Passo 5: @devops Push
```bash
@devops *push
# Gage faz: git push origin main
```

---

## Arquivos Criados

```
squads/audit-safety-squad/
├── squad.yaml                    # Manifest (config central)
├── README.md                     # Este arquivo
├── agents/
│   ├── supabase-validator.md    # Agent 1: valida
│   ├── supabase-executor.md     # Agent 2: executa
│   └── github-committer.md      # Agent 3: commita
├── tasks/
│   ├── pre-flight-supabase-audit.md        # Task 1
│   ├── execute-supabase-migration.md       # Task 2
│   └── auto-commit-github.md               # Task 3
├── workflows/
│   └── change-request-workflow.yaml        # Orquestra tudo
└── checklists/
    └── pre-change-validation.md            # (criar próximo)
```

---

## Logs & Auditoria

Cada mudança gera logs em:
```
audit-safety-squad/logs/{migration_id}/
├── schema-snapshot.json          # Estado antes
├── rls-snapshot.json            # RLS antes
├── execution-log.json           # Resultado
└── after-snapshot.json          # Estado depois
```

---

## Next Steps

- [ ] Adicionar checklist de validação (`checklists/pre-change-validation.md`)
- [ ] Criar scripts de teste local (`scripts/test-workflow.sh`)
- [ ] Validar squad contra JSON Schema
- [ ] Commit squad para repositório

---

## Dependências Externas

| Recurso | Requerido? | Referência |
|---------|-----------|-----------|
| Supabase Account | ✅ Sim | supabase.com |
| GitHub Secrets | ✅ Sim | SUPABASE_ACCESS_TOKEN, SUPABASE_PROJECT_ID |
| GitHub Actions | ✅ Sim | `.github/workflows/supabase-migrations.yml` |
| Node.js | ✅ Sim | Para scripts de execução |

---

## Contato

- **Criador:** squad-creator (Craft)
- **Data:** 2026-02-28
- **Tags:** #audit #safety #supabase #github #automation
