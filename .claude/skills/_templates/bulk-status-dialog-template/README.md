# BulkStatusDialogTemplate — Skill

## Template ID
`bulk-status-dialog`

## Status
Approved with limitation

## Limitation
Scrollable result list only. Not virtualized. Safe for ~200 items. Large collections (200+) require future virtualization capability — currently an open architecture gap. Do not claim virtualization exists.

## Purpose
Implement persistent, per-item visibility for asynchronous multi-entity operations. Covers: bulk tag updates, bulk onboarding, bulk rotation, bulk export, bulk remediation, migration sub-operation results.

## DS Primitives
- `Modal` (large, non-dismissible during active operation) — verified ✓
- `Button` — verified ✓
- `ProgressBar` (status: active/paused/failed/done) — verified ✓
- `StatusIcon` (shared, `src/components/shared/StatusIcon/`) — for operational result states ✓

## When This Skill Runs
- User requests: "Bulk status dialog", "Operation results dialog", "Progress dialog for bulk action"
- Template detection matches: per-item statuses + progress + summary + async operation

## DEC-016 Check
Not applicable — bulk status is not account creation.

## Files
- [README.md](README.md) — this file
- [template-contract.md](template-contract.md) — props API, DS dependencies, layout
- [state-model.md](state-model.md) — operation and item states
- [navigation-and-validation.md](navigation-and-validation.md) — close rules, retry rules, minimize
- [edge-cases.md](edge-cases.md) — partial success, timeout, retry safety, stacked dialogs
- [qa-checklist.md](qa-checklist.md) — required checks

## Architecture Spec
`.claude/architecture/templates/BulkStatusDialogTemplate.md`
