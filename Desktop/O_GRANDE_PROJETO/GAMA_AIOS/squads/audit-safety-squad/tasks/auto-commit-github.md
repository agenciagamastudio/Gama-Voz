# Task: Auto-Commit to GitHub

**Status:** Active
**Agent:** github-committer
**Trigger:** After execute-supabase-migration (if status = success)
**Dependencies:** execute-supabase-migration

---

## Objetivo
Fazer commit automático com contexto de auditoria. Preparar para @devops push.

---

## Inputs
- Execution status (success/failed)
- Migration logs & snapshots
- Affected files list

---

## Execution Steps

### 1. Verify Execution Status
- [ ] Check if migration succeeded
- [ ] If failed: skip commit, log reason
- [ ] If success: proceed

### 2. Prepare Commit Files
- [ ] Migration SQL file: `supabase/migrations/{migration_id}.sql`
- [ ] Audit logs: `audit-safety-squad/logs/{migration_id}/`
- [ ] Stage all: `git add supabase/migrations/` + `git add audit-safety-squad/`

### 3. Generate Commit Message
```
chore: supabase migration {migration_id}

Audit Context:
✅ Schema validation: PASS
✅ RLS policies: PASS
✅ Dependencies: PASS

Execution:
- Status: SUCCESS
- Timestamp: {ISO8601}
- Duration: {seconds}

Logs: audit-safety-squad/logs/{migration_id}/

Co-Authored-By: supabase-executor <audit@aios>
```

### 4. Create Commit (LOCAL)
```bash
git add supabase/migrations/{migration_id}.sql
git add audit-safety-squad/logs/{migration_id}/
git commit -m "chore: supabase migration {migration_id}

Audit Context:
✅ Schema validation: PASS
✅ RLS policies: PASS
✅ Dependencies: PASS

Execution:
- Status: SUCCESS
- Timestamp: {timestamp}

Logs: audit-safety-squad/logs/{migration_id}/"
```

### 5. Notify @devops
```
Status: READY_FOR_PUSH
Commit Hash: {commit_hash}
Branch: main
Files Changed: 2
Message: "chore: supabase migration {migration_id}"

→ @devops: please run: git push origin main
```

---

## Success Criteria
- [ ] `git status` shows clean
- [ ] Commit created locally
- [ ] Commit message has context
- [ ] @devops notified

---

## Outputs
```json
{
  "commit_hash": "abc123...",
  "commit_message": "chore: supabase migration...",
  "files_changed": ["supabase/migrations/...", "audit-safety-squad/..."],
  "status": "created_awaiting_push",
  "next_step": "@devops *push"
}
```

---

## Error Handling
- ❌ Execution failed → Skip commit, log reason
- ❌ Git error → Stop, show error
- ✅ Success → Commit created, ready for @devops push

---

## Next Step
→ **@devops** `*push` (Gage makes the push)
