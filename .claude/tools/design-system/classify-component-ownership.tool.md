# classify-component-ownership

## Purpose

Classify every requested component into the correct ownership tier: Design System, shared feature, page, template-local, layout, navigation, or domain. Determine the correct file location before any code is written.

## Trigger Conditions

- A new component is requested
- Component mapping proposes a new component
- QA detects a component in the wrong location
- A shared abstraction is proposed

## Required Inputs

| Input | Type | Description |
|---|---|---|
| component_description | string | What the component does |

## Optional Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| usage_count | number | 1 | How many places will use it |
| has_domain_logic | boolean | false | Whether it owns feature/domain behavior |

## Allowed File Scope

Read: `src/`, `packages/design-system/src/`
Write: none (dry-run only unless apply is explicitly approved)

## Protected File Scope

`packages/design-system/src/`, `src/components/layout/`, `CLAUDE.md`, `AGENTS.md`

## Dry Run Behavior

Classify the component and report the required location, ownership rationale, and whether creation is approved.

## Apply Mode Behavior

Not applicable — this tool reports classification only. Implementation is done by page builder or DS agents.

## Validation Rules

- Generic reusable UI → `packages/design-system/src/components/`
- Feature behavior → `src/features/[feature]/components/`
- Page-specific composition → `src/pages/[PageName]/components/`
- Template-local → `src/prototype-templates/[TemplateName]/components/`
- AppShell / Sidebar / Header → `src/components/layout/`
- Do not extract shared components prematurely (requires 2+ proven uses)
- If tiles/blocks detected and DS Card exists → reject local container, classify as DS Card composition

## Minimal Layer Rule

Before classifying a new component, check:
1. Can this live inline in the parent?
2. Does an existing DS or feature component already own this?
3. Does this own meaningful behavior, state, semantics, or reuse?

If none apply → do not create it.

## Output Contract

```markdown
### Component Ownership Classification

Component: [name]

Classification: [DS / Shared Feature / Page / Template-local / Layout / Navigation / Domain]

Required Location: [path]

Ownership Rationale: [short explanation]

Reuse Evidence: [usage count and locations]

Creation Approved: [yes / no / pending approval]

Reason if Rejected: [explanation]
```

## Related Agents

- `.claude/agents/_core/component-mapping-agent.md`
- `.claude/agents/_core/shared-architecture-agent.md`

## Related Skills

- `.claude/skills/_core/component-mapping/SKILL.md`
- `.claude/skills/_core/shared-component-and-data-architecture/SKILL.md`

## Related Commands

- `/map-components`

## Failure Handling

If a component is requested in the wrong location → reject and report. Do not create at wrong path.

## Manual Approval Required When

- A new DS primitive is proposed
- A new shared feature component is proposed with only one usage
- A layout component modification is requested

## Examples

**Approved:**
Input: ManagedAccountStatusCard — maps domain data, owns status logic, used in table and details panel
Output: Classification: Domain, Location: `src/features/managed-accounts/components/`, Creation Approved: yes

**Rejected:**
Input: DarkCard — wraps DS Card with dark background className
Output: Classification: Forbidden Wrapper, Creation Approved: no. Reason: DS components are consume-only.
