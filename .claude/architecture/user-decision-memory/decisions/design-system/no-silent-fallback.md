---
id: DEC-008
title: No Silent Fallback — Report DS Gap Instead
category: design-system
scope: global
status: active
confidence: high
approvedAt: 2026-06-20
---

## Decision

When an approved Design System component, token, icon, mock-data contract, localization key, or state pattern is missing, do not invent a local replacement.

Stop and report a structured gap.

## Implementation Behavior

```text
Need capability
→ inspect approved source of truth
→ capability exists → consume through public API only
→ capability missing → stop local implementation
→ create structured gap report
→ request approval or use closest approved fallback only if explicitly allowed
```

## Forbidden Silent Fallbacks

```text
- local div imitating a DS Card
- local button because DS Button lacks a variant
- inventing colors, spacing, shadows, or typography
- local icon substitute
- hardcoded user-facing copy
- embedded random mock values
- inventing API-shaped data without declaring a mock contract
- replacing missing states with generic placeholders
```

## Trigger Conditions

- Any DS component or capability is absent
- Any required mock contract is missing
- Any localization key is missing

## Source

CLAUDE.md — No Silent Fallback Rule
