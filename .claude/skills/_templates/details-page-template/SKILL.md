# Details Page Template Skill

## Purpose

Define the standard pattern for implementing single-entity full-page detail views using `DetailsPageTemplate`.

---

## When to Use

Use this skill when:
- Showing all details of a Managed Account
- Showing connector details
- Showing migration run details
- Showing risk finding details
- Showing any single-entity full-page view with tabs, actions, and metadata

---

## Inputs Required

```text
Entity type:          What entity is being shown (e.g. Managed Account)
Entry point:          How user arrives (row click from table / direct link / search)
Required tabs:        Tab labels (e.g. Overview, Details, Activity, Risk findings)
Actions:              Available actions (e.g. Edit, Delete, Disable, Rotate)
States required:      loading / ready / not-found / permission-denied / read-only / stale / error / entity-deleted
Has risk column?:     Whether risk severity is shown (uses SeverityBadge)
Has status?:          Whether operational status is shown (uses StatusIcon shared)
Deep link support?:   Whether entity can be accessed directly by URL
Known constraints:    e.g. no secrets in logs/activity
```

Minimum required:
```text
Entity type
Entry point
Required tabs
States required
```

---

## Required Project Inspection

```text
.claude/architecture/templates/DetailsPageTemplate.md
.claude/skills/_templates/details-page-template/template-contract.md
.claude/skills/_templates/details-page-template/state-model.md
src/components/shared/StatusIcon/
```

---

## Critical Rules

- StatusIcon (shared — `src/components/shared/StatusIcon/`) for entity operational status — NEVER SeverityBadge
- SeverityBadge for risk severity ONLY (Critical/High/Medium/Low/Informational)
- Active sidebar item does NOT change when entering details page
- Back must restore originating context (filters/scroll/selection)
- Deep links must resolve safe entity access — handle not-found / permission-denied / entity-deleted
- Logs/activity must NEVER expose secrets, passwords, SSH keys, or raw backend traces
- Skeleton loading must match real page structure (DEC-005)

---

## DetailsPageState

```ts
type DetailsPageState =
  | 'loading'
  | 'ready'
  | 'not-found'
  | 'permission-denied'
  | 'read-only'
  | 'stale'
  | 'error'
  | 'entity-deleted';
```

---

## Required Workflow

1. Receive entity details requirements.
2. Inspect DetailsPageTemplate spec.
3. Map tabs to content sections.
4. Implement all required states.
5. Wire StatusIcon for operational status.
6. Wire SeverityBadge for risk severity (if applicable).
7. Implement back navigation with context restoration.
8. Implement deep link access (not-found / permission-denied / entity-deleted).
9. Verify logs/activity tab contains no sensitive data.

---

## Must Do

- Use DS Tabs, Card, Button, ActionMenu, EmptyState, Skeleton
- Use StatusIcon (shared) at 24px for entity status in header
- Use SeverityBadge for risk severity only
- Show loading skeleton matching real page structure
- Restore list context on Back
- Handle all DetailsPageState values

---

## Must Not Do

- Do not change active sidebar item
- Do not use SeverityBadge for operational status
- Do not show raw backend errors in logs
- Do not expose secrets or SSH keys in any tab content
- Do not add inline styles

---

## Output Format

```markdown
### Details Page Summary

### Entity Type

### Tabs Implemented

### States Implemented

### StatusIcon Usage

### SeverityBadge Usage

### Back Navigation Behavior

### Deep Link Behavior

### DS Components Used

### Security Check (logs/activity clean?)

### Gaps or Manual Review Needed
```
