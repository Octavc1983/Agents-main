# generate-layout-aware-skeleton

## Purpose

Inspect a page or template and generate Skeleton loading states that match the actual layout anatomy. Do not generate random placeholder blocks. Use real page regions.

## Trigger Conditions

- A new page is created
- A loading state is required
- Skeleton loading states are missing from a page
- skeleton-loading-intelligence-agent runs

## Required Inputs

| Input | Type | Description |
|---|---|---|
| page_path | string | Path to target page or template |

## Optional Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| loading_scope | string | page | page / section / table / details / dialog / widget / form / wizard / canvas |
| apply | boolean | false | Write skeleton component to file |

## Allowed File Scope

Read: target page/template files
Write (apply): skeleton component file alongside the target page

## Protected File Scope

`packages/design-system/src/`, `src/styles/`, router, navigation, other pages

## Validation Rules

- Use real page anatomy — do not generate random blocks
- Do not show Skeleton when the correct state is a zero/empty state
- Use DS Skeleton component and tokens only
- Skeleton must match actual page column count, section heights, and widget sizes
- Do not show Skeleton for states that resolve instantly

## Skeleton Type Detection

```text
page loading → full page Skeleton matching page layout
section loading → section-level Skeleton
table loading → table rows Skeleton matching column count
details loading → details panel Skeleton
dialog loading → dialog content Skeleton
widget loading → widget Skeleton matching widget layout
form loading → form field Skeleton
wizard loading → wizard step Skeleton
configuration loading → configuration panel Skeleton
canvas loading → canvas viewport Skeleton
```

## Output Contract

```markdown
### Skeleton Loading Analysis

### Page Anatomy Detected

| Region | Type | Skeleton Coverage |
|---|---|---|

### DS Skeleton Component Used: [yes / no]

### Zero-State Conflict Check: [none / flagged]

### Skeleton File: [path or "not applied"]
```

## Related Agents

- `.claude/agents/_core/skeleton-loading-intelligence-agent.md`

## Related Skills

- `.claude/skills/_core/skeleton-loading-intelligence/SKILL.md`

## Related Commands

- `/add-states`

## Failure Handling

If DS Skeleton component is not available → DS gap report. Do not create a custom animation locally.

## Manual Approval Required When

- Skeleton differs significantly from page anatomy
- DS Skeleton token is missing

## Examples

**Table skeleton:**
Page has 6-column table, 20 rows, header toolbar, filter chips.
Output: Skeleton with header bar, 3 filter chip skeletons, 20 row skeletons at correct column widths.
