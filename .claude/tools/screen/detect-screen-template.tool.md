# detect-screen-template

## Purpose

Analyze a text description, screenshot, Figma reference, route, or existing page and classify it into a known template type. Loads the matching template logic automatically. Creates a Draft Template Candidate when no match exists. Runs before every implementation task.

## Trigger Conditions

- User provides a screenshot, Figma link, or page name
- User requests to build, create, generate, or implement a page
- User requests to edit or refine an existing page
- Component mapping begins
- Page builder agent starts
- Before running, check protect-existing-page — if a matching page exists, switch to edit workflow

## Required Inputs

| Input | Type | Description |
|---|---|---|
| source | text / image / figma-url / route | What to analyze |

## Optional Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| existing_page_path | string | — | Path to existing page file |
| navigation_context | boolean | false | Whether to analyze navigation impact |

## Allowed File Scope

Read: `.claude/architecture/template-registry.md`, `.claude/architecture/templates/`, `src/prototype-templates/`
Write (apply): `.claude/architecture/template-candidates/`

## Protected File Scope

`src/`, `packages/`, `CLAUDE.md`, `AGENTS.md`, any existing template spec

## Dry Run Behavior

Report detected template type, confidence score, navigation impact, required modal type, and whether a new candidate is needed. Do not create files.

## Apply Mode Behavior

Write a Draft Template Candidate to `.claude/architecture/template-candidates/` when no match exists and user approves.

## Validation Rules

- If no template matches with ≥70% confidence → create Draft Template Candidate
- If navigation is affected → flag for Navigation Workflow
- If modal is required → pass to resolve-modal-service
- If screen contains tiles/blocks/KPI panels → pass to inspect-design-system Card check

## Output Contract

```markdown
### Screen Template Detection

Source: [input]

Detected Template: [name or "No Match"]
Confidence: [0-100%]

Navigation Impact: [yes / no / unknown]
Required Page Type: [full page / nested / modal / dialog / wizard / side panel / embedded]
Required Modal Type: [none / FormDialog / SystemNotice]

Loaded Template Logic: [template skill path or "none"]

Missing Critical Information: [list or "none"]

Existing Page Match: [yes / no / unknown]
Existing Page Path: [path or "—"]

New Template Candidate: [yes / no]
Candidate Path: [path or "—"]
```

## Related Agents

- `.claude/agents/_core/template-recognition-and-lifecycle-agent.md`
- `.claude/agents/_core/workflow-orchestrator-agent.md`

## Related Skills

- `.claude/skills/_core/template-recognition-and-lifecycle/SKILL.md`
- `.claude/skills/_core/auto-workflow-routing/SKILL.md`

## Related Commands

- `/ux-add-page`
- `/ux-edit-page`

## Failure Handling

If source cannot be analyzed → ask user for description or additional context. Never guess template type silently.

## Manual Approval Required When

- New template candidate must be registered
- Detected type is canvas or unknown

## Examples

**Dry run:**
Input: screenshot of table with search bar and filter chips
Output: Detected Template: Table Filters Page, Confidence: 92%, Navigation Impact: yes

**Apply mode:**
Input: screenshot of dashboard with configuration side panel (no match)
Output: Draft candidate written to `.claude/architecture/template-candidates/zero-state-config-dashboard.md`
