---
name: DS-GAP-002
type: design-system-gap
status: blocked
created: 2026-06-22
---

# DS Gap 002 — Risk Chart Semantic Token API

## Required Capability

A risk breakdown chart/visualization component that accepts semantic risk level values and derives all visual treatment internally through DS semantic tokens — not through page-supplied hex colors.

```ts
type RiskLevel = 'critical' | 'high' | 'medium' | 'low' | 'unknown';

type RiskBreakdownItem = {
  level: RiskLevel;
  count: number;
  labelKey: string;
};
```

The component must:
- Map `RiskLevel` to DS semantic color tokens internally
- Not accept `borderColor`, `gradientFrom`, `gradientTo`, or any color value from the caller
- Support dark mode through the active DS theme automatically

## Why It Is Missing

`RiskManagementPage.tsx` currently passes hardcoded hex/rgba values directly to `HalfDashboardTemplate` chart series data:

```ts
borderColor: '#C45BE7'
gradientFrom: 'rgba(196,91,231,0.18)'
gradientTo:   'rgba(57,56,56,0)'
```

This creates a violation of the no-hardcoded-hex rule and breaks dark mode compatibility.

## Blocked Behavior

- `HalfDashboardTemplate` chart colors are page-controlled with hardcoded hex values
- No semantic risk chart API exists in the DS or in the `HalfDashboardTemplate`

## Required DS Decision

DS owner must confirm one of:

1. Extend `HalfDashboardTemplate` to accept `level: RiskLevel` instead of color values, mapping internally
2. Provide a new `RiskBreakdownChart` DS component with built-in semantic token mapping
3. Provide approved CSS custom properties that pages may reference for chart series colors

## Blocked Files

- `src/pages/RiskManagementPage/RiskManagementPage.tsx` — hardcoded chart color values in series data

## Status

Blocked — awaiting DS owner decision.
Do not replace hex values with other local values.
Do not create a local semantic-color workaround.
