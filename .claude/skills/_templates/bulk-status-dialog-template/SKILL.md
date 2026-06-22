# Bulk Status Dialog Template Skill

## Purpose

Define the standard pattern for implementing async bulk operation progress and results using `BulkStatusDialogTemplate`.

---

## When to Use

Use this skill when:
- Running a bulk tag update
- Running bulk account onboarding
- Running bulk rotation or remediation
- Running any operation where one user action affects multiple entities and progress must remain visible

---

## Inputs Required

```text
Operation name:       What the bulk operation does (e.g. "Update tags", "Rotate credentials")
Item type:            What entity type is being processed (e.g. Managed Account)
Item count:           Approximate number of items (safe limit ~200)
States required:      pending / in-progress / succeeded / failed / skipped / cancelled / unknown
Retry safe?:          Whether backend confirms idempotent retry
Trigger:              What starts the operation (bulk action button)
Known constraints:    e.g. no virtualization — CSS scroll only
```

Minimum required:
```text
Operation name
Item type
States required
```

---

## Required Project Inspection

```text
.claude/architecture/templates/BulkStatusDialogTemplate.md
.claude/skills/_templates/bulk-status-dialog-template/template-contract.md
.claude/skills/_templates/bulk-status-dialog-template/state-model.md
src/components/shared/StatusIcon/
```

---

## Critical Rules

- StatusIcon (shared — `src/components/shared/StatusIcon/`) for per-item status — NEVER SeverityBadge
- NEVER auto-map timeout to failure — use `unknown` (DEC-004)
- Partial success ≠ success — show separate counts
- Close disabled when `isOperationActive && !canClose`
- Minimize always available
- Scrollable list only — NOT virtualized — safe for ~200 items
- Retry only when backend confirms idempotent safety

---

## StatusIcon Semantic Mapping

| BulkItemStatus | StatusIcon semantic |
|---|---|
| `pending` | pending |
| `in-progress` | in-progress |
| `succeeded` | success |
| `failed` | failed |
| `skipped` | skipped |
| `cancelled` | cancelled |
| `unknown` | unknown-outcome |

---

## Required Workflow

1. Receive bulk operation requirements.
2. Inspect BulkStatusDialogTemplate spec and contract.
3. Create bulk status dialog component using DS Modal large.
4. Wire per-item StatusIcon to BulkItemStatus.
5. Wire ProgressBar to overall operation progress.
6. Handle all required states.
7. Implement close/minimize rules.
8. Wire retry only when confirmed safe.

---

## Must Do

- Use DS Modal large
- Use DS ProgressBar with status: active/paused/failed/done
- Use StatusIcon (shared) for every item row
- Show separate counts for succeeded / failed / skipped
- Show minimize control throughout operation

---

## Must Not Do

- Do not use SeverityBadge for item status
- Do not auto-close during active operation
- Do not map timeout to failure
- Do not claim virtualization (CSS scroll only)
- Do not show secrets, passwords, stack traces in logs

---

## Output Format

```markdown
### Bulk Status Dialog Summary

### Operation Name

### Item Count and Limit Note

### States Implemented

### StatusIcon Mapping

### Close / Minimize Behavior

### Retry Behavior

### DS Components Used

### Capability Gaps

### Gaps or Manual Review Needed
```
