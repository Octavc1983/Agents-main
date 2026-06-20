---
id: DEC-014
title: Review Mode Is External Utility, Not Product Flow
category: annotation
scope: global
status: active
confidence: high
approvedAt: 2026-06-20
---

## Decision

Review Annotations must be accessible to PM and UX users without appearing to be part of the product workflow.

Entry point: Global Header utility area only.
Panel type: Right-side persistent panel.
Inspect Mode: Off by default — requires explicit activation.

## Implementation Behavior

```text
Click Review in Header utility area
→ open right-side panel
→ do NOT change route
→ do NOT change page state
→ do NOT open modal
→ do NOT activate Inspect Mode automatically
→ keep current page fully interactive
```

## Forbidden Placement

```text
- Page primary CTA area
- Table toolbar (default)
- Form action area
- Inside wizard navigation
- Inside modal
- Route navigation
```

## Trigger Conditions

- Review Annotations feature is being built or integrated
- Any trigger button placement is proposed

## Source

Review Mode Entry and Non-Product Flow Policy
