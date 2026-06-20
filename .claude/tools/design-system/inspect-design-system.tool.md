# inspect-design-system

## Purpose

Inspect public exports from `@idira/design-system`. Detect available components, icons, token groups, themes, styles, generic states, Skeleton, Modal, Table, Form primitives, and Card variants. Used before every component mapping and implementation decision.

## Trigger Conditions

- Component mapping begins
- A new page or component is requested
- A tile, block, KPI panel, dashboard widget, or content surface is detected
- DS gap check is triggered
- Dark mode readiness check runs

## Required Inputs

| Input | Type | Description |
|---|---|---|
| capability | string | What DS capability to look for |

## Optional Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| category | string | all | components / icons / tokens / themes |
| card_check | boolean | false | Run tile-to-Card enforcement check |

## Allowed File Scope

Read: `packages/design-system/src/index.ts`, `packages/design-system/src/` (read-only)
Write: none

## Protected File Scope

All files — this tool is read-only.

## Dry Run Behavior

Always dry-run. Report available components, icons, token groups, closest existing equivalent, import recommendation, and DS gap if needed.

## Apply Mode Behavior

Not applicable — this tool never modifies files.

## Validation Rules

- Use public package exports only
- Never recommend direct imports from `packages/design-system/src`
- Report missing capability as a DS gap
- Do not create new DS components automatically
- If tiles/blocks detected and Card exists → fail local tile, recommend Card composition

## Card-First Enforcement

When a tile, block, KPI box, summary panel, metric widget, dashboard module, selectable block, or repeated rectangular surface is detected:

1. Check for Card, MetricCard, StatusCard, DashboardCard, or equivalent in DS
2. If found → recommend Card composition
3. If not found → DS Gap report, do not create local container

Exceptions (do NOT force Card): table row, modal surface, drawer, popover, tooltip, input field, navigation item, accordion row, canvas node, full-page section container.

## Output Contract

```markdown
### Design System Inspection

Capability Requested: [input]

Available DS Components: [list]
Available Icons: [list]
Available Token Groups: [list]

Existing Equivalent Component: [component or "none"]
Import Recommendation: [import path]

Card Reuse Decision:
- Detected visual block: [description]
- Existing DS Card found: [yes / no]
- Recommended implementation: [Card / other / local composition]
- Reason: [short explanation]

DS Gap Report: [description or "none"]
```

## Related Agents

- `.claude/agents/_core/component-mapping-agent.md`
- `.claude/agents/_core/design-system-review-agent.md`

## Related Skills

- `.claude/skills/_core/component-mapping/SKILL.md`
- `.claude/skills/_core/design-system-review/SKILL.md`

## Related Commands

- `/map-components`
- `/review-design-system`

## Failure Handling

If DS export file is unreadable → report error and halt component mapping. Do not guess at component names.

## Manual Approval Required When

- DS gap is found and implementation must continue
- A new DS primitive is proposed

## Examples

**Tile check:**
Input: KPI tile with count and label
Output: DS Card found → use `<Card>` with content composition. Do not create local tile div.

**Gap example:**
Input: selectable Card with approved selected state
Output: DS Gap — Card exists but has no selectable variant. Do not override locally. Request DS variant.
