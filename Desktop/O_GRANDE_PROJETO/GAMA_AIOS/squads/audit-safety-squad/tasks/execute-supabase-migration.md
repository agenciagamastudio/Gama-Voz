# Task: Execute Supabase Migration

**Status:** Active
**Agent:** supabase-executor
**Trigger:** After pre-flight-supabase-audit (if status = ready)
**Dependencies:** pre-flight-supabase-audit

---

## Objetivo
Executar mudança no Supabase com contexto de validação. Capturar logs para commit.

---

## Inputs
- AI Context (from pre-flight audit)
- Migration SQL file
- Audit snapshots (schema, RLS, dependencies)

---

## Execution Steps

### 1. Receive Audit Context
- [ ] Read `ai-context.json` from pre-flight task
- [ ] Validate all checks passed
- [ ] Get approval to execute

### 2. Create Migration File
```sql
-- migration_id: {uuid}
-- created: {timestamp}
-- validated_by: supabase-validator

-- Your SQL migration here
ALTER TABLE users ADD COLUMN new_field TEXT;
```

### 3. Run Migration via Workflow
```bash
# Triggered by: .github/workflows/supabase-migrations.yml
# On push to supabase/migrations/
git add supabase/migrations/{migration_id}.sql
git commit -m "migration: {migration_id}"
git push origin feature/supabase-change
```

Workflow executes:
```bash
supabase db push --project-id $SUPABASE_PROJECT_ID
```

### 4. Monitor Execution
- [ ] Check migration status
- [ ] Collect logs
- [ ] Validate success
- Output: `execution-log.json`

### 5. Post-Audit (optional)
```bash
supabase db pull --project-id $SUPABASE_PROJECT_ID
# Compare with pre-flight snapshot
```

---

## Success Criteria
- [ ] Migration applied successfully
- [ ] No rollback needed
- [ ] Logs captured
- [ ] Status: `success` | `failed_with_rollback`

---

## Outputs
```
audit-safety-squad/logs/{migration_id}/
├── execution-log.json
├── before-snapshot.json (from pre-flight)
└── after-snapshot.json (post-execution)
```

---

## Error Handling
- ❌ Pre-flight checks not passed → Stop
- ❌ SQL syntax error → Rollback, log error
- ❌ RLS policy conflict → Rollback, flag
- ✅ Success → Ready for auto-commit

---

## Next Task
→ `auto-commit-github.md` (if execution_status = success)
