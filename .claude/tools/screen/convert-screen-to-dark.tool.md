# convert-screen-to-dark

## Purpose

Convert an existing page, screenshot-derived implementation, Figma-derived implementation, or newly generated screen to dark mode using `@idira/design-system` as the sole source of truth. Works for pages, templates, dialogs, dashboards, tables, forms, wizards, navigation, empty states, loading states, and skeletons.

## Trigger Conditions

- User requests dark mode conversion
- A new screen is generated and dark mode readiness is required
- Dark Mode Readiness Rule check is triggered
- QA detects hardcoded light-only colors

## Required Inputs

| Input | Type | Description |
|---|---|---|
| target | page-path / screenshot / figma-url | Screen to convert |

## Optional Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| apply | boolean | false | Apply token replacements to files |
| scope | string[] | all | Files to consider |

## Allowed File Scope

Read: `src/`, `packages/design-system/src/` (read-only)
Write (apply): only SCSS files within the confirmed target page or template directory

## Protected File Scope

`packages/design-system/src/`, `src/styles/_variables.scss`, `CLAUDE.md`, `AGENTS.md`, router, navigation, DS component source, any page outside confirmed scope

## Dry Run Behavior

Produce a full Semantic Token Mapping report. List every hardcoded value found. Identify every semantic role. List missing DS dark-theme capabilities. Do not modify files.

## Apply Mode Behavior

Replace hardcoded color values and non-semantic token references with approved DS semantic tokens in confirmed SCSS files only. Never change layout, content, routing, behavior, or hierarchy.

## Validation Rules

- Do not invert colors mechanically
- Do not use CSS filters
- Do not create dark-theme values inside page files
- Do not use inline styles
- Do not hardcode hex values
- Do not change layout or content during conversion
- Every semantic role must map to an approved DS token before any file is changed

## Semantic Mapping Coverage

```text
page background, surface, elevated surface, border, divider
primary text, secondary text, disabled text
icon idle, icon active
selected row, hover state, focus state
input surface, input border
table header, table row
modal surface, backdrop
empty state, error state, loading state
skeleton base, skeleton highlight
```

## Output Contract

```markdown
### Dark Theme Conversion Analysis

### Screen or Template Inspected

### Existing Theme Mode Support

### Semantic Token Mapping

| UI Region | Current Style Source | Required Dark Token | Status |
|---|---|---|---|

### Hardcoded Visual Values Found

| File | Value | Required Replacement | Severity |
|---|---|---|---|

### Existing DS Components Reused

### Missing DS Dark Theme Capabilities

### Contrast and Accessibility Risks

### Safe Changes Proposed

### Apply Mode Safety Gate
```

## Related Agents

- `.claude/agents/_core/design-system-review-agent.md`
- `.claude/agents/_core/code-quality-qa-agent.md`

## Related Skills

- `.claude/skills/_core/design-system-review/SKILL.md`

## Related Commands

- `/ux-review-page`
- `/ux-edit-page`

## Failure Handling

If a semantic role has no DS dark token → report DS gap. Do not apply a hardcoded value as fallback.

## Manual Approval Required When

- Any DS dark theme capability is missing
- Apply mode would change more than SCSS token references

## Examples

**Dry run:**
Input: `src/pages/ScansPage/ScansPage.scss`
Output: Semantic Token Mapping table, 3 hardcoded hex values found, 1 DS dark gap (skeleton highlight token missing)
