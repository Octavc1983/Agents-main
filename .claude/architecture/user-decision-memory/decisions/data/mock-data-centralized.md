---
id: DEC-006
title: Typed Mock Fixtures Centralized in src/mock/
category: data
scope: global
status: active
confidence: high
approvedAt: 2026-06-20
---

## Decision

All mock data must be typed, domain-specific, centralized under `src/mock/` (or `src/features/[feature]/mock/`), and imported — never defined inline in page or component JSX.

## Required Fixture Coverage

```text
- default / populated data
- empty collection
- loading state (guard constant)
- error state (guard constant)
- edge cases: long labels, disabled rows, warning states
```

## Naming Convention

```text
[domain]MockData.ts
[domain]EmptyState.ts
[domain]ErrorState.ts
```

Do not use: `data`, `mock`, `temp`, `testItems`, `sampleData`.

## Trigger Conditions

- Any page or feature renders a list, table, or data-fetching screen

## Source

Mock Data Integrity Policy + page policy fixes applied 2026-06-20
