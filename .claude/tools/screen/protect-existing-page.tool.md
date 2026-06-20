# protect-existing-page

## Purpose

Detect whether a requested page already exists in the repository before any implementation begins. If it exists, produce a structured delta report and wait for user approval before making any changes. Prevent duplicate page creation and unintended full-page regeneration.

## Trigger Conditions

- A page creation or edit request is received
- A screenshot or Figma frame is provided for an existing route
- detect-screen-template runs on a page with an existing path
- Page builder agent prepares to create files

## Required Inputs

| Input | Type | Description |
|---|---|---|
| target | route / page-name / screenshot | What was requested |

## Optional Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| request_type | string | auto-detect | create / edit / add-flow / fix |
| apply | boolean | false | Apply approved delta after user confirmation |

## Allowed File Scope

Read: `src/pages/`, `src/features/`, `src/app/router.tsx`, `src/navigation/navConfig.ts`, `src/mock/`, `src/types/`
Write (apply, after approval): only approved files per delta report

## Protected File Scope

All files not in the approved delta. AppShell, Sidebar, Header, Router (read-only unless navigation delta is approved separately).

## Required Detection Flow

```text
User request / screenshot / Figma / route
→ search src/pages/ for matching component
→ search src/app/router.tsx for matching route
→ search src/features/ for matching feature
→ classify:
   existing page
   existing page with missing route
   existing page with missing feature
   new page
   unknown target
```

## Existing Page Rule

When a match is found:
1. Read the existing page implementation.
2. Read connected child components.
3. Read route configuration.
4. Read navigation configuration.
5. Read relevant types, mock data, services, localization.
6. Compare against the requested screenshot or requirement.
7. Identify only required additions, removals, corrections, and risks.
8. Present delta report for approval.
9. Make no changes until approval is received.
10. After approval, update only the accepted delta.

## Screenshot Comparison Classification

```text
Screenshot provided for existing page:
→ required addition
→ visual correction
→ missing state
→ missing component
→ navigation mismatch
→ DS gap
→ content/localization mismatch
→ unknown
```

A screenshot is not permission to replace the entire page.

## Incremental Update Rules

After approval, modify only:
```text
approved files, approved sections, approved components,
approved state logic, approved localization keys,
approved mock-data contracts
```

Preserve always:
```text
existing routes, page identity, AppShell, Sidebar, Header,
navigation hierarchy, API contracts, feature logic,
service integrations, modal orchestration, DS component usage,
accessibility behavior, dark theme compatibility,
loading/empty/error/disabled/permission states
```

## Patch-Only Rule

For existing pages:
```text
Add only missing block.
Update only incorrect block.
Preserve all unaffected structure.
Run targeted regression validation.
```

Forbidden:
```text
Delete and recreate page.
Replace full page file for a small change.
Regenerate whole layout from screenshot.
Remove existing state logic.
Replace domain components with generic ones.
Change route paths without approval.
Change navigation placement without approval.
Rewrite page styles unrelated to requested changes.
Remove tests or mock data without approval.
```

## Validation Rules

The task must fail when:
```text
- existing page was replaced instead of incrementally updated
- duplicate page was created for an existing route
- unrelated page logic was modified
- existing route changed without approval
- existing navigation changed without approval
- existing component was duplicated
- existing behavior was removed without approval
- page was regenerated from screenshot without delta analysis
- changes were applied before user approval
```

## Output Contract — Delta Report

```markdown
### Existing Page Detected

### Target Page

| Area | Current Implementation |
|---|---|

### Requested Change

### Change Detection Summary

| Area | Current State | Requested State | Change Type | Risk |
|---|---|---|---|---|

### Existing Logic That Must Be Preserved

### Proposed Incremental Changes

### Files Proposed for Modification

| File | Reason | Change Scope |
|---|---|---|

### Files Explicitly Protected

| File | Reason |
|---|---|

### Regression Risks

### Approval Required

No files will be changed until approval is received.
```

## Output Contract — Post-Approval Summary

```markdown
### Existing Page Update Summary

### Approved Changes Applied

| Area | Applied Change |
|---|---|

### Preserved Logic

### Files Updated

| File | Exact Change |
|---|---|

### Files Not Changed

### Regression Validation Results

### New Gaps Detected

### Follow-Up Approval Needed
```

## Related Agents

- `.claude/agents/_core/workflow-orchestrator-agent.md`
- `.claude/agents/_core/prototype-page-builder-agent.md`
- `.claude/agents/_core/template-recognition-and-lifecycle-agent.md`

## Related Skills

- `.claude/skills/_core/auto-workflow-routing/SKILL.md`
- `.claude/skills/_core/template-recognition-and-lifecycle/SKILL.md`

## Related Commands

- `/ux-edit-page`
- `/ux-add-page`
- `/ux-fix-generated-page`

## Failure Handling

If the detection is ambiguous (page name matches but route differs) → report both matches and ask the user to confirm the target.

## Manual Approval Required When

- Any change to an existing page
- Navigation changes tied to an existing page
- Route changes tied to an existing page

## Examples

**Existing page detected:**
Request: "Add filter chips to the Scans page"
Match found: `src/pages/ScansPage/ScansPage.tsx`, route `/scans`
Action: Produce delta report. Show current toolbar state vs. requested filter chips. Wait for approval before touching any file.

**New page confirmed:**
Request: "Create a Policies page at /policies"
No match in `src/pages/` or router.
Action: Proceed with new page creation workflow.

**Screenshot for existing page:**
Request: Screenshot of Accounts table with new "Export" button
Match found: `src/pages/AccountsPage/AccountsPage.tsx`
Action: Identify "Export" button as a required addition. Do not regenerate the page. Report addition only.
