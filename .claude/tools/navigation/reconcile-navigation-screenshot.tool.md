# reconcile-navigation-screenshot

## Purpose

When Claude analyzes a navigation screenshot, Figma frame, or visual reference and detects a navigation item that does not exist in `spacesRegistry`, add the missing item in the exact detected Space, hierarchy level, item type, and sibling position.

Do not append blindly, flatten hierarchy, or place items in another Space.

## Trigger Conditions

- A navigation screenshot or Figma frame is provided
- A nav item is reported as missing from the sidebar
- validate-spaces-navigation reports a discrepancy vs. a visual reference
- Navigation update request includes a screenshot

## Required Inputs

| Input | Type | Description |
|---|---|---|
| visual_source | image / figma-url | Screenshot or Figma frame to analyze |
| navconfig_path | string | Path to navConfig.ts |

## Optional Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| active_space | string | auto-detect | Space shown active in screenshot |
| apply | boolean | false | Write changes to navConfig |

## Allowed File Scope

Read: `src/navigation/navConfig.ts`, `src/components/layout/Sidebar/`, `src/assets/icons/NavIcons.tsx`
Write (apply): `src/navigation/navConfig.ts` only

## Protected File Scope

`src/app/router.tsx` (read-only during reconciliation — route additions require separate approval), all files outside navigation scope

## Required Detection Workflow

```text
Navigation screenshot / Figma frame
→ identify active Space
→ identify visible hierarchy
→ identify each item label
→ identify nesting level
→ identify item type
→ compare against spacesRegistry
→ detect missing item
→ insert item in exact visual position
→ validate registry
→ report the change
```

## Visual Extraction Per Item

For every detected navigation item, extract:

```text
Space:
Parent item:
Label:
Level:
Previous sibling:
Next sibling:
Item type: (button / split / dropdown)
Icon:
Expanded / collapsed state:
Selected state:
Visible children:
Confidence:
```

## Item Type Detection Rules

```text
button = item has no visible children; clicking navigates directly
split  = item has a page destination AND visible children/chevron
dropdown = item has children but no direct page destination
```

Never create an item without an explicit `type`.

## Placement Rule

Place missing items using visible sibling order. Do not sort alphabetically unless screenshot clearly uses alphabetical order. Do not append to end of Space by default.

## Route Rules

When sibling routes use a predictable pattern, derive the route from that pattern.
When route cannot be safely inferred: add the item as `routeStatus: 'needs-route'` and do not invent an arbitrary route.

## Icon Rules

- Level-1 items: reuse existing icon from NavIcons.tsx. If no match exists, create Icon Gap report. Do not create a substitute.
- Level 2–4 items: do not add icons unless screenshot explicitly shows them.

## Reconciliation Change Rules

| Screenshot Evidence | Required Action |
|---|---|
| Item missing from registry | Add in exact position |
| Item label differs | Update label only after reporting |
| Item type differs | Update explicit type |
| Item in wrong parent | Move to correct parent |
| Item order differs | Reorder affected sibling group only |
| Existing item absent from screenshot | Do NOT delete automatically |
| Unknown icon in screenshot | Icon gap — no substitute |
| Hierarchy unclear | Ask one focused question |

## Validation Rules (post-change)

```text
- every item has explicit type
- button: has path, no children
- split: has path AND children
- dropdown: has children, no path
- unique item IDs
- unique resolved paths
- valid parent hierarchy
- correct sibling order
- route-pending items have routeStatus: 'needs-route'
```

## Output Contract

```markdown
### Navigation Screenshot Reconciliation

### Detected Space

### Visual Hierarchy Found

### Missing Items Detected

| Label | Space | Parent | Level | Type | Position | Route Status |
|---|---|---|---|---|---|---|

### Registry Changes Applied

| Change | Item | Exact Location |
|---|---|---|

### Route Decisions

| Item | Route | Decision |
|---|---|---|

### Icon Decisions

| Item | Existing Icon | Gap Required |
|---|---|---|

### Validation Results

### Items Not Changed

### Approval Needed
```

## Related Agents

- `.claude/agents/_core/application-shell-navigation-agent.md`
- `.claude/agents/_infra/navigation-integration-agent.md`

## Related Skills

- `.claude/skills/_core/application-shell-navigation/SKILL.md`

## Related Commands

- `/connect-navigation`

## Failure Handling

If hierarchy is ambiguous → ask one focused clarifying question. Never guess Space assignment.

## Manual Approval Required When

- A new Space is detected in the screenshot that does not exist in spacesRegistry
- A level-1 item requires a new icon
- A route cannot be safely inferred

## Examples

**Dry run:**
Screenshot shows Manage → Inventory with "SaaS applications" after "Targets".
Registry has Targets but no SaaS applications.
Output: Insert `{ id: 'manage-inv-saas-applications', label: 'SaaS applications', type: 'button', routeStatus: 'needs-route' }` after `manage-inv-targets` under `children` of Inventory.

**Route inferred:**
Siblings: `/manage/inventory/targets/applications`, `/manage/inventory/targets/virtual-machines`
Detected: "Cloud applications"
Generated route: `/manage/inventory/targets/cloud-applications`
