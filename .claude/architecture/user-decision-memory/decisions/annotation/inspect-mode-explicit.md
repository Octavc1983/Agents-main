---
id: DEC-015
title: Inspect Mode Off by Default, Explicit Activation Only
category: annotation
scope: global
status: active
confidence: high
approvedAt: 2026-06-20
---

## Decision

Inspect Mode must be inactive by default when the Review panel opens. The user must explicitly activate it through a visible "Inspect elements" toggle inside the panel.

## State Transitions

```text
Panel opens → Inspect Mode: inactive
User clicks "Inspect elements" → Inspect Mode: active
User clicks "Exit inspect mode" or presses Escape → Inspect Mode: inactive
```

## When Inspect Mode Is Inactive

```text
- No outlines
- No markers (beyond already-resolved ones)
- No click interception
- No hover highlights
- No change to navigation
- No modal
- No route change
- No change to page flow
```

## Trigger Conditions

- Inspect Mode behavior is being implemented
- Any review target click handling is proposed

## Source

Review Mode Entry and Non-Product Flow Policy
