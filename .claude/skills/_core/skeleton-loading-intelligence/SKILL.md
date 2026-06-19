---
name: skeleton-loading-intelligence
description: Scan an existing page, template, screenshot, or Figma reference to generate a layout-aware skeleton loading state. Matches the skeleton to the real UI structure using existing tokens and DS patterns. Avoids generic gray boxes.
when_to_use: Use after a page or template is built, during state implementation (Step 4 in the workflow), and whenever loading states are missing, incomplete, or replaced with a generic spinner. Also use when reviewing state coverage in UX audit.
user-invocable: false
allowed-tools: Read, Glob, Grep, Write, Edit
---

# Skeleton Loading Intelligence

## Purpose

Match skeleton loading states to the real page layout before data arrives.

Every loading region must correspond to a real region in the final loaded state.

---

## Step 1 — Identify Template Type

Inspect the target file and determine the template type:
```text
TableFiltersTemplate
CardListMasterDetailsTemplate
TilesDashboardTemplate
ZeroStateConfigurationTemplate
FormPageTemplate
DetailsPageTemplate
Other
```

---

## Step 2 — Check Existing Loading Patterns

Search for:
```text
LoadingState
Skeleton
Shimmer
Spinner
```

In:
```text
src/components/ui/
src/prototype-templates/
target page file
```

Use existing patterns first. Build new skeleton markup only when no existing component covers the layout region.

---

## Step 3 — Map Each Region to a Skeleton Strategy

| Region | Strategy |
|---|---|
| Page title | Single wide skeleton line |
| Toolbar row | Row of pill/rectangle skeleton controls |
| Filter chips | Short inline skeleton chips |
| Table column headers | Skeleton header row |
| Table data rows | Repeated skeleton rows (default: 6–8) |
| Card list item | Skeleton card with icon + text lines |
| Details header | Wide title + subtitle |
| Details grid | Label/value pair skeletons |
| KPI tile | Value + label block |
| Chart widget | Rectangular placeholder |
| Form field | Label + input skeleton |
| Tab bar | Row of skeleton tabs |
| Status chip | Small pill skeleton |

---

## Step 4 — Apply Token and Accessibility Rules

SCSS token rules:
- Background: use `$color-surface-idle` or equivalent muted token
- Animation: use existing keyframe or `$transition-*` tokens
- Spacing: use `$spacing-*` tokens
- Radius: use `$border-radius-*` tokens
- No inline styles
- No hardcoded values
- No new tokens

Accessibility rules:
- Wrap skeleton container: `aria-busy="true"` + `aria-label="Loading [name]"`
- Individual shapes: `aria-hidden="true"`
- Remove `aria-busy` when data loads
- No keyboard focus traps inside skeleton

---

## Step 5 — Produce Skeleton Loading Plan

```markdown
### Skeleton Loading Plan

**Target:** [page or template name]

**Template type:** [detected template]

**Existing loading components found:** [yes / no, which]

### Loading Regions

| Region | Strategy | Shape | Count |
|---|---|---|---|

### SCSS Changes
[New classes needed, tokens used]

### Accessibility
[aria attributes used]

### Component Reuse
[What existing components are used]

### QA Checklist
```

---

## Step 6 — QA Checklist

```text
Skeleton matches real layout positions and proportions
No layout shift on skeleton → real content transition
Tokens only (no inline styles, no hardcoded values)
aria-busy and aria-hidden present
Skeleton does not persist after data loads
Error and timeout states handled
No keyboard focus traps
```

---

## Must Not Do

- Do not create new DS components
- Do not create new tokens
- Do not use inline styles
- Do not use a generic spinner where layout skeleton is appropriate
- Do not generate unrelated gray boxes
