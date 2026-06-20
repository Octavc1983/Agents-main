# align-design-system-package

## Purpose

Scan packages and legacy folders for duplicate generic components, theme files, token files, icon files, direct package-internal imports, and invalid ownership. Produce a safe migration plan. Apply only after explicit approval.

## Trigger Conditions

- Package alignment audit is requested
- A component is found imported from `packages/design-system/src` directly
- A duplicate DS-like component is found in `src/`
- Legacy cleanup is requested

## Required Inputs

| Input | Type | Description |
|---|---|---|
| scope | string[] | Directories to scan |

## Optional Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| apply | boolean | false | Apply approved migration steps |
| legacy_delete | boolean | false | Allow deletion of confirmed legacy files |

## Allowed File Scope

Read: `src/`, `packages/`
Write (apply, after approval): migration of specific files per plan

## Protected File Scope

`packages/design-system/src/` core component source, `CLAUDE.md`, `AGENTS.md`, router, navigation

## Legacy Deletion Gate

Deletion of any file is allowed only when ALL conditions are met:
- No TypeScript imports
- No SCSS imports
- No test references
- No barrel exports
- No aliases
- No package exports
- Equivalent package export exists
- Build passes

## Output Contract

```markdown
### Package Alignment Audit

### Duplicate Components Found

| File | DS Equivalent | Safe to Remove |
|---|---|---|

### Direct Internal Imports Found

| File | Import | Correct Import |
|---|---|---|

### Invalid Ownership Found

| File | Current Location | Correct Location |
|---|---|---|

### Migration Plan

### Apply Mode Safety Gate

### Post-Migration Validation Steps
```

## Related Agents

- `.claude/agents/_core/code-quality-qa-agent.md`
- `.claude/agents/_core/shared-architecture-agent.md`

## Related Skills

- `.claude/skills/_core/shared-component-and-data-architecture/SKILL.md`
- `.claude/skills/_core/code-quality-qa/SKILL.md`

## Failure Handling

If deletion conditions are not all met → block deletion. Do not remove files silently.

## Manual Approval Required When

- Any file deletion is planned
- Any package source is modified
- Build validation cannot be run

## Examples

**Dry run:**
Scan finds `src/components/ui/Button/Button.tsx` duplicating DS `Button`. Reports: equivalent exists in DS, 3 imports found → cannot safely remove yet.
