---
id: DEC-011
title: No Inline Styles — SCSS Tokens Only
category: frontend
scope: global
status: active
confidence: high
approvedAt: 2026-06-20
---

## Decision

All styles must use existing SCSS tokens. No inline `style={{}}` props. No hardcoded hex colors, spacing, radius, or shadow values.

## Implementation Behavior

```text
Use $color-*, $spacing-*, $border-radius-*, $shadow-* tokens from _variables.scss.
Never pass style prop to any element.
Never hardcode color values in SCSS.
```

## Exceptions

```text
Decorative illustration SVGs with fixed palette — these are exempt.
```

## Trigger Conditions

- Any visual styling decision is made for a new or existing component

## Source

CLAUDE.md — Non-Negotiable Rules
