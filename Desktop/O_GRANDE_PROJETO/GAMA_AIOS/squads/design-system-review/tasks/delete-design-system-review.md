# Task: Delete Design System Review Squad

**ID:** delete-design-system-review
**Version:** 1.0.0
**Created:** 2026-03-12
**Type:** Operational (Decommission)

---

## Purpose

Safely remove the Design System Review Squad from active use. This is a destructive operation and should only be executed after careful consideration.

---

## Inputs (Required)

```yaml
reason_for_deletion:
  - "Squad is redundant"
  - "Merged with another squad"
  - "No longer needed"
  - "Functionality moved elsewhere"

confirmation_required: true
  - Must explicitly confirm deletion
  - List impact on projects
  - Plan for continuity
```

---

## Pre-Deletion Checklist

Before executing this task, verify:

- [ ] **Impact Analysis:** Which projects depend on this squad?
  - Projects: Gama Design System v1.0, Gama Calculadora, Gama Financeiro (future)

- [ ] **Alternative Plan:** Where will design system reviews happen after deletion?
  - Alternative: Integrate into @qa squad OR migrate to different squad

- [ ] **Stakeholder Notification:** Have all stakeholders been informed?
  - Must announce in #design-system 2 weeks before deletion

- [ ] **Data Backup:** Is the squad backed up before deletion?
  - Backup location: squads/.archive/design-system-review-{date}.tar.gz

- [ ] **ADR Created:** Decision documented in ADR format?
  - Reference ADR-XXX: "Decommission Design System Review Squad"

- [ ] **Confirmation:** Has leadership approved deletion?
  - Approval required from: @architect OR @aios-master

---

## Steps

### Step 1: Create Final Backup
```
Action: Archive entire squad before deletion

Commands:
- tar -czf squads/.archive/design-system-review-{date}.tar.gz squads/design-system-review/
- Verify archive created: ls -lh squads/.archive/design-system-review-{date}.tar.gz

Output: Backup archive created (for recovery if needed)
```

### Step 2: Create Decommission ADR
```
Action: Document the deletion decision

ADR format:
  # ADR-{NextNumber}: Decommission Design System Review Squad

  Date: {today}
  Status: Superseded (or Accepted as final decision)
  Deciders: {Leadership, whoever approved deletion}

  Problem: {Why was squad removed?}
  Decision: {Squad deleted as of {date}}
  Consequences:
    - Design system reviews will now happen via {alternative}
    - Projects affected: {list}
    - Timeline: Reviews pause for {N} days during transition

  Related Decisions:
    - ADR-{X}: Original creation of design system review squad
    - ADR-{Y}: Alternative approach for design system governance
```

### Step 3: Final Notifications
```
Action: Announce deletion to all stakeholders

Slack Message (to #design-system):
  ⚠️ **Design System Review Squad — Decommissioning**

  **Effective Date:** {Date}
  **Reason:** {Reason}
  **Impact:** {What changes for teams}
  **Alternative:** {Where to get design system reviews}
  **Timeline:** Reviews will resume via {alternative} by {date}

  If you have ongoing reviews, contact {Contact} before {deadline}.

Email: Send to all active squad users (check commit logs)

Timeline: Send notification TODAY
```

### Step 4: Export Final State
```
Action: Document final squad state before deletion

Create file: squads/design-system-review/DECOMMISSION.md

Content:
  # Design System Review Squad — Final State

  **Decommissioned:** {date}
  **Reason:** {reason}
  **Backup:** squads/.archive/design-system-review-{date}.tar.gz

  ## Final Metrics
  - Components audited: {number}
  - Issues identified: {number}
  - Decisions logged: {number} ADRs

  ## Migration Plan
  - Design system reviews will continue via: {alternative}
  - Transition contact: {name}
  - For questions: {slack channel / email}

  ## Recovery Instructions
  If squad is needed again:
  1. Restore: tar -xzf squads/.archive/design-system-review-{date}.tar.gz
  2. Update config.yaml with current version
  3. Run: *validate-squad design-system-review
```

### Step 5: Remove from Registry
```
Action: Update squad registry to mark as archived

Edit: ecosystem-registry.yaml

Changes:
  - Move design-system-review entry to archived section
  - OR delete entry with comment "Archived {date}"
  - Update version history to note decommissioning
```

### Step 6: Delete Squad Files
```
Action: Remove squad directory from active squads/

Commands:
- mkdir -p squads/.archive/
- cp -r squads/design-system-review squads/.archive/design-system-review-{date}
- rm -rf squads/design-system-review/

Verification:
- ls squads/design-system-review/ → should not exist
- ls squads/.archive/design-system-review-{date} → should exist
```

### Step 7: Commit Deletion
```
Action: Create final commit documenting deletion

Git commands:
- git add squads/.archive/
- git commit -m "chore(squads): decommission design-system-review

  ADR-{number}: Decommission Design System Review Squad
  Reason: {reason}
  Effective: {date}
  Backup: squads/.archive/design-system-review-{date}.tar.gz

  Design system reviews will continue via {alternative}."

Verify: git log --oneline (should show decommission commit)
```

### Step 8: Verify Deletion
```
Action: Confirm squad is fully removed

Checks:
  ✓ Squad directory deleted from squads/
  ✓ Backup exists in squads/.archive/
  ✓ ecosystem-registry.yaml updated
  ✓ ADR created (ADR-{number})
  ✓ DECOMMISSION.md created
  ✓ Git commit created
  ✓ Slack notification sent
  ✓ All stakeholders informed

Status: ✅ Deletion complete
```

---

## Output

```yaml
deletion_complete:
  timestamp: {datetime}
  squad_name: design-system-review
  backup_location: squads/.archive/design-system-review-{date}.tar.gz
  adr_created: "ADR-{number}"
  alternative_location: {where reviews happen now}
  stakeholders_notified: true
  commit_hash: {git commit hash}
  recovery_instructions: "See squads/.archive/design-system-review-{date}/DECOMMISSION.md"
```

---

## Veto Conditions (Automatic BLOCK)

- ❌ Backup not created → Deletion blocked
- ❌ ADR not created → Deletion blocked
- ❌ Stakeholders not notified → Deletion blocked
- ❌ No alternative plan documented → Deletion blocked
- ❌ Leadership hasn't approved → Deletion blocked
- ❌ Git commit fails → Deletion blocked

---

## Recovery Procedure

If squad is needed again after deletion:

```
1. Verify backup exists: ls squads/.archive/design-system-review-{date}.tar.gz
2. Restore: tar -xzf squads/.archive/design-system-review-{date}.tar.gz -C squads/
3. Update version in config.yaml to current date
4. Create new ADR: "Restore Design System Review Squad"
5. Update CHANGELOG
6. Validate: *validate-squad design-system-review
7. Announce restoration in #design-system
8. Commit restoration
```

---

## Completion Criteria

✅ Pre-deletion checklist all items checked
✅ Final backup created and verified
✅ ADR created documenting deletion
✅ DECOMMISSION.md created with final metrics
✅ Stakeholders notified in Slack
✅ Squad directory deleted from squads/
✅ Backup archive stored in squads/.archive/
✅ Registry updated to reflect archival
✅ Final commit created with ADR reference
✅ No squad files remain in active squads/

---

## Related

- `update-design-system-review.md` — Update squad if still active
- Workflow: `governance-loop.yaml` — Documents deletion in ADR format

---

## ⚠️ WARNING

This is a destructive operation. Once deleted, the squad is no longer active in the system. Make sure:

1. Backup is created and verified before deletion
2. All stakeholders have been notified
3. An alternative plan for design system reviews is in place
4. Leadership has explicitly approved the deletion

**Do not proceed unless all conditions above are met.**
