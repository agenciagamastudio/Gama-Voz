# Task: Pre-Flight Supabase Audit

**Status:** Active
**Agent:** supabase-validator
**Trigger:** On-demand (user requests change)
**Dependencies:** None (first task)

---

## Objetivo
Auditar estado atual do Supabase ANTES de permitir execução de mudança. Prevenir erros.

---

## Inputs
- `SUPABASE_PROJECT_ID` (from GitHub secrets)
- `SUPABASE_ACCESS_TOKEN` (from GitHub secrets)
- Migration request (SQL ou description)

---

## Execution Steps

### 1. Connect to Supabase
```bash
supabase projects list --token $SUPABASE_ACCESS_TOKEN
supabase db pull --project-id $SUPABASE_PROJECT_ID
```

### 2. Audit Schema (using db-schema-audit.md)
- [ ] List all tables
- [ ] Validate column types
- [ ] Check constraints
- [ ] Verify indexes
- Output: `schema-snapshot.json`

### 3. Audit RLS Policies (using db-rls-audit.md)
- [ ] List all RLS policies
- [ ] Validate policy conditions
- [ ] Check role permissions
- [ ] Identify gaps
- Output: `rls-snapshot.json`

### 4. Check Dependencies
- [ ] Foreign keys
- [ ] Triggers
- [ ] Functions
- [ ] Views
- Output: `dependencies-snapshot.json`

### 5. Generate AI Context
```json
{
  "timestamp": "ISO8601",
  "schema_summary": {
    "tables": 15,
    "views": 3,
    "functions": 8
  },
  "rls_status": "enabled" | "partial" | "disabled",
  "recent_changes": [...]
}
```

---

## Success Criteria
- [ ] All snapshots generated
- [ ] No CRITICAL warnings
- [ ] AI context ready for next task
- [ ] Status: `ready_for_execution` | `blocked_with_warnings`

---

## Outputs
```
audit-safety-squad/logs/{migration_id}/
├── schema-snapshot.json
├── rls-snapshot.json
├── dependencies-snapshot.json
└── ai-context.json
```

---

## Error Handling
- ❌ Connection fails → Stop, show error
- ❌ Schema audit fails → Log warning, continue
- ❌ RLS validation fails → Flag as warning, provide details
- ✅ All pass → Proceed to execute-supabase-migration

---

## Next Task
→ `execute-supabase-migration.md` (if status is ready)
