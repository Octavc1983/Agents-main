---
id: DEC-004
title: Timeout Means Unknown Outcome — No Auto-Confirm
category: backend
scope: global
status: active
confidence: high
approvedAt: 2026-06-20
---

## Decision

When a mutation request times out or returns no confirmation, treat the result as unknown. Do not confirm success. Do not confirm definitive failure. Offer status-check recovery. Retry only when idempotency is confirmed.

## Implementation Behavior

```text
Timeout or no response
→ preserve user input
→ show: "We could not confirm the result"
→ offer: Check status / Refresh
→ do NOT auto-retry without idempotency confirmation
→ log correlation ID when available
```

## Required Backend Contract

Status check endpoint or safe refetch strategy. If unavailable, report API Contract Gap.

## Trigger Conditions

- Any mutation request to a backend or mock service
- Save, create, delete, bulk operation, import, migration

## Source

UXP-002 Backend Timeout Unknown Outcome
