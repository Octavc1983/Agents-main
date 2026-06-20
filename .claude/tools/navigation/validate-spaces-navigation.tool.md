# validate-spaces-navigation

## Purpose

Validate the spacesRegistry, routes, item hierarchy, item types, active state logic, collapsed behavior, expanded behavior, overlay behavior, and breadcrumbs. Run before every navigation change and after every page addition.

## Trigger Conditions

- A new route or nav item is added
- Navigation bug is reported
- Sidebar behavior changes
- Space switcher is modified
- Collapsed/expanded mode is tested

## Required Inputs

| Input | Type | Description |
|---|---|---|
| navconfig_path | string | Path to navConfig.ts |

## Optional Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| router_path | string | auto-detect | Path to router.tsx |
| check_active_logic | boolean | true | Validate resolveActiveNavigationState |

## Allowed File Scope

Read: `src/navigation/navConfig.ts`, `src/app/router.tsx`, `src/components/layout/Sidebar/`
Write: none

## Protected File Scope

All files — this tool is read-only.

## Validation Rules

```text
button: requires path, no children
split: requires path AND children
dropdown: requires children, no path
every path is unique
all routes referenced in navConfig resolve in router
active nested route maps to level-1 ancestor
all ancestors open in expanded mode
collapsed mode renders only active Space's L1 icons
Space switcher available in both modes
no nested button markup
lastKnownNavRef fallback handles unregistered routes
```

## Output Contract

```markdown
### Navigation Validation Report

### Items Validated: [count]

### Rule Failures

| Rule | Item | Severity |
|---|---|---|

### Route Coverage

| navConfig Path | Router Match | Status |
|---|---|---|

### Active State Logic

### Collapsed Mode Check

### Overall Status: [PASS / FAIL]
```

## Screenshot Navigation Sync Rule

When a navigation screenshot or Figma reference contains an item missing from `spacesRegistry`, add it in the exact detected Space, hierarchy level, item type, and sibling position.

Do not append blindly, flatten hierarchy, or place items in another Space.

Infer routes only from proven sibling route patterns. Otherwise create the item as route-pending (`routeStatus: 'needs-route'`) and report the missing route decision.

See: `reconcile-navigation-screenshot.tool.md`

## Related Agents

- `.claude/agents/_core/application-shell-navigation-agent.md`

## Related Skills

- `.claude/skills/_core/application-shell-navigation/SKILL.md`

## Related Commands

- `/connect-navigation`

## Failure Handling

Any rule failure is a blocking issue. Report all failures before any navigation change is applied.

## Manual Approval Required When

- A new Space is added to spacesRegistry
- SpaceSwitcher overlay behavior changes

## Examples

**Pass:** All 6 spaces valid, all paths unique, all routes resolve, collapsed mode correct.
**Fail:** `dropdown` item has a `path` property → rule violation, item must use `split` type.
