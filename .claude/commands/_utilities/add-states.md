# Add States

## Purpose

Add prototype states (loading, empty, error, success, validation, selected, etc.) to an existing page or component.

---

## Agent to Use

State Builder Agent

Expected file: `.claude/agents/_infra/state-builder-agent.md`

---

## Skill to Use

Prototype State Patterns Skill

Expected file: `.claude/skills/_infra/prototype-state-patterns/SKILL.md`

---

## When to Use

Use when:
- A page was built but states are missing or incomplete
- A new state needs to be added to an existing page
- State components (EmptyState, LoadingState, ErrorState) need to be wired

---

## Required User Intake

### Required intake fields

```text
Target file:        Path to the .tsx file to update (e.g. src/pages/ScansPage/ScansPage.tsx)
States to add:      List of states to add (Loading / Empty / Error / Success / Validation / Saving / Selected / Details open)
State trigger:      How each state is triggered (mock data / constant / user interaction)
Known constraints:  e.g. no debug buttons in visible UI, use existing DS state components
```

### Minimum required fields

```text
Target file
States to add
Known constraints
```

### Missing Information Response

If Target file or States to add is missing:

```markdown
### Missing Required Information

Before I can run `/add-states`, please provide:

\`\`\`text
Target file:      [src/pages/PageName/PageName.tsx]
States to add:    [Loading, Empty, Error, ...]
Known constraints: [e.g. no debug buttons, use existing DS state components]
\`\`\`
```

Do not read files.
Do not modify files.
Do not continue until Target file and States to add are provided.

---

## Intake Gate

Do not read files.
Do not modify files.
Do not continue until Target file and States to add are provided.

---

## State Rules

- States are controlled by a `viewState` constant in code — not by visible debug buttons
- `viewState` must be documented with a comment explaining how to change it for testing
- Do not expose debug state controls in the visible UI
- Use existing DS state components (EmptyState, LoadingState, ErrorState) — do not recreate them
- `isDetailsOpen` must always be explicit `useState(false)` — never derived

### viewState pattern

```tsx
// Change this constant to test different states: 'default' | 'loading' | 'empty' | 'error'
const viewState = 'default';
```

---

## Required Workflow

1. Read the target file.
2. Identify which states are already implemented.
3. Identify the existing state rendering pattern.
4. Add missing states using existing DS state components.
5. Add `viewState` constant if not already present.
6. Wire each state in the render logic.
7. Do not add visible debug buttons.
8. Report what was added.

---

## Restrictions

- Do not expose debug state controls in the visible UI
- Do not recreate EmptyState, LoadingState, or ErrorState
- Do not use inline styles
- Do not hardcode values
- Do not modify the Infra library

---

## Expected Output

```markdown
### Add States Summary — [PAGE NAME]

### Target File

### States Added

| State | DS Component Used | How to Trigger |
|---|---|---|

### viewState Pattern

```tsx
// Change to test: 'default' | 'loading' | 'empty' | 'error'
const viewState = 'default';
```

### States Already Present (Skipped)

### Restrictions Followed

- [ ] No debug buttons in visible UI
- [ ] viewState is a code constant
- [ ] Existing DS state components used
```
