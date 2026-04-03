# Task: Update Design System Review Squad

**ID:** update-design-system-review
**Version:** 1.0.0
**Created:** 2026-03-12
**Type:** Operational (Maintenance)

---

## Purpose

Update the Design System Review Squad with new capabilities, improvements, or bug fixes.

---

## Inputs (Required)

```yaml
what_to_update:
  - agents (add/modify agents)
  - workflows (add/modify workflows)
  - tasks (add/modify tasks)
  - documentation (update README/ARCHITECTURE)
  - configuration (config.yaml changes)

change_description: |
  Clear description of what is being updated and why

change_type:
  - feature (new capability)
  - fix (bug fix)
  - improvement (enhancement to existing)
  - refactor (restructure without changing behavior)

affected_files:
  - list of files to be modified
```

---

## Steps

### Step 1: Backup Current State
```
Action: Create backup of squad before changes
- Zip current squad folder
- Save with timestamp: squad-backup-{date-time}.zip
```

### Step 2: Apply Updates
```
Action: Modify squad files based on what_to_update

If updating agents:
  - Modify agents/{agent-name}.md
  - Validate against agent-tmpl.md structure
  - Run smoke tests (at least 1 per agent)

If updating workflows:
  - Modify workflows/{workflow-name}.yaml
  - Validate YAML syntax
  - Check phase dependencies

If updating tasks:
  - Modify tasks/{task-name}.md
  - Validate all 8 required fields

If updating documentation:
  - Modify README.md / ARCHITECTURE.md
  - Keep version history updated
  - Update dates

If updating config:
  - Modify config.yaml
  - Validate YAML
  - Update version field
```

### Step 3: Validation
```
Action: Validate all updates

- YAML syntax check
- Agent structure validation
- Workflow phase dependencies
- File paths in config match actual files
- Documentation links are valid
```

### Step 4: Test Updates
```
Action: Run smoke tests

- For agents: At least 1 smoke test per agent
- For workflows: Can phases execute in sequence?
- For tasks: Are all required fields present?

All tests must PASS
```

### Step 5: Document Changes
```
Action: Update CHANGELOG and create ADR

CHANGELOG entry:
  ## [version] - date
  ### Changed
  - {Description of update}
    - Reason: {Why this change}
    - Impact: {What changed for users}

ADR entry:
  ADR-{number}: Update Design System Review Squad

  Problem: {What needed to be improved}
  Decision: {What was changed}
  Consequences: {Impact}
```

### Step 6: Commit Changes
```
Action: Git commit with conventional message

Format: chore(design-system-review): {description}

Example:
  chore(design-system-review): add new performance metrics to audit

Include:
  - What changed
  - Why it changed
  - ADR reference
```

### Step 7: Verify
```
Action: Final verification

Checklist:
  ✓ All files updated correctly
  ✓ YAML is valid
  ✓ Tests pass
  ✓ CHANGELOG updated
  ✓ ADR created
  ✓ Changes committed

Status: ✅ Update complete
```

---

## Output

```yaml
update_complete:
  timestamp: {datetime}
  changes_made: {list of modified files}
  version_before: {old version}
  version_after: {new version}
  tests_passed: {number}/N
  adr_created: "ADR-{number}"
  changelog_entry: "## [{version}] - {date}"
  commit_hash: {git commit hash}
```

---

## Veto Conditions (Automatic BLOCK)

- ❌ YAML syntax invalid → Update rejected
- ❌ Tests fail → Update rejected
- ❌ No ADR created → Update rejected
- ❌ CHANGELOG not updated → Update rejected
- ❌ Git commit fails → Update rejected

---

## Rollback Procedure

If update causes issues:

```
1. Stop using updated squad
2. Delete updated files
3. Restore backup: unzip squad-backup-{date-time}.zip
4. Verify restoration: run *validate-squad design-system-review
5. Investigate issue
6. Create fix in new update task
```

---

## Completion Criteria

✅ All updates applied successfully
✅ YAML validates without errors
✅ All smoke tests pass (>=1 per agent)
✅ CHANGELOG updated with version and date
✅ ADR created documenting the update
✅ Git commit created with conventional message
✅ Backup created before changes
✅ No veto conditions triggered

---

## Related

- `delete-design-system-review.md` — Remove squad if no longer needed
- Workflow: `governance-loop.yaml` — Documents decision in ADR format
