---
id: DEC-007
title: Focus Restoration After Panel or Drawer Closes
category: accessibility
scope: global
status: active
confidence: high
approvedAt: 2026-06-20
---

## Decision

When a drawer, panel, modal, or overlay closes, focus must return to the element that triggered it.

## Implementation Behavior

```text
User opens panel/drawer
→ focus moves into panel
User closes panel/drawer
→ focus returns to trigger element
```

## Escape Behavior

```text
First Escape → exit Inspect Mode (if active)
Second Escape → close Review panel
```

## Trigger Conditions

- Any panel, drawer, modal, or overlay open/close behavior is implemented

## Source

Review Annotations accessibility requirements
