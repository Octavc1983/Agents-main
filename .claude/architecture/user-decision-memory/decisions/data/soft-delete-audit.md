---
id: DEC-003
title: Soft Delete With Audit History
category: data
scope: global
status: active
confidence: high
approvedAt: 2026-06-20
---

## Decision

Deletion must be implemented as a soft delete. Deleted records are hidden from active views but retained in audit history. Permanent deletion requires an explicit approved data-retention policy.

## Implementation Behavior

```text
User deletes entity
→ set deletion metadata (deletedAt, deletedBy, reason)
→ hide from standard active list
→ retain in audit log
→ support restore when permitted by config
```

## Required Data Fields

```text
deletion?: {
  deletedAt: string;
  deletedBy: { id, displayName, role };
  reason?: string;
}
```

## When Permanent Deletion Is Required

Create an explicit data-retention policy decision. Do not implement permanent deletion without it.

## Trigger Conditions

- Any delete action is implemented
- Review annotations delete behavior
- Any entity with audit requirements

## Source

Review Annotation Deletion and Audit Log Policy
