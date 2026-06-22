---
name: DS-GAP-001
type: design-system-gap
status: blocked
created: 2026-06-22
---

# DS Gap 001 — Risk Status Icon Mapping

## Required Capability

A semantic mapping from risk severity level to an approved DS status icon + accessible label.

```ts
type RiskLevel = 'critical' | 'high' | 'medium' | 'low' | 'unknown';
```

Required output per risk level:

```text
24px approved DS status icon
+
localized readable label
```

## Why It Is Missing

The current `StatusIcon` shared component maps `AccountStatusValue`, `StepStatusValue`, and `SecretStatusValue`.
It does not include a `RiskStatusValue` mapping.

`RiskManagementPage.tsx` currently uses hardcoded inline SVGs with hex colors (`#F54E85`, `#FFA033`, `#888DFF`) for severity icons in the header KPI section.

## Blocked Behavior

- `RiskManagementPage` header KPI icons use hardcoded hex colors
- No approved DS icon exists for "Critical risk", "High risk", "Medium risk" as distinct identifiers

## Required DS Decision

DS owner must confirm one of:

1. Extend the existing `StatusIcon` component with a `RiskStatusValue` type using existing DS icon assets
2. Provide new DS icons for risk severity levels with semantic token color mapping
3. Confirm that `SeverityBadge` is the only approved component for risk and no standalone icon is needed

## Blocked Files

- `src/pages/RiskManagementPage/RiskManagementPage.tsx` — hardcoded SVG hex colors in header KPI icons

## Status

Blocked — awaiting DS owner decision.
Do not create a local workaround.
