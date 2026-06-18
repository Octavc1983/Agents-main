# /ux-add-flow-to-page

## Purpose

Add a new UX interaction flow to an existing prototype page without rewriting the page.

Examples of flows this command handles:
- Open details panel on row click
- Open/close filter panel with draft/apply pattern
- Active filter chips with chip removal
- Search with item counter update
- Bulk action toolbar that appears on selection
- Confirmation dialog before a destructive action
- Multi-step wizard inside a dialog
- Empty / error / loading state transitions
- Save / success / error flow
- Row actions dropdown menu
- Tabs inside the details panel
- Card selection with details update

---

## Required User Intake

```text
Target page name:             React component name (e.g. PoliciesPage)
Target route:                 URL path (e.g. /policies)
Target files:                 e.g. src/pages/PoliciesPage/PoliciesPage.tsx
Flow name:                    Short name for the flow (e.g. Row Details Panel)
Flow trigger:                 What initiates the flow (e.g. row click, button click, checkbox)
Flow behavior:                What happens step by step
Components involved:          Which UI components participate in the flow
State changes:                What state changes are required (e.g. isDetailsOpen, selectedItem)
Success behavior:             What happens when the flow completes successfully
Error behavior:               What happens when the flow fails or data is invalid
Cancel / close behavior:      What happens when the user cancels or closes
Should preserve user input:   yes / no — e.g. preserve draft form input on cancel
Figma source or screenshot:   Figma link, image attachment, or 'none'
Known constraints:            e.g. SVG icons only, no new DS components, no backend calls
Files allowed to modify:      Explicit list
Files not allowed to modify:  Explicit list
```

---

## Minimum Required Fields

```text
Target page name or Target files
Flow name
Flow trigger
Flow behavior
State changes
Known constraints
Files allowed to modify
Files not allowed to modify
```

---

## Missing Information Response

If any minimum required field is missing, stop immediately and respond only with:

```
### Missing Required Information

Before I can continue with `/ux-add-flow-to-page`, please fill the missing fields below.

\`\`\`text
Target page name:
Target route:
Target files:
Flow name:
Flow trigger:
Flow behavior:
Components involved:
State changes:
Success behavior:
Error behavior:
Cancel / close behavior:
Should preserve user input:   yes / no
Figma source or screenshot:
Known constraints:
Files allowed to modify:
Files not allowed to modify:
\`\`\`

### Why This Is Needed

I need this information to add only the requested flow without rewriting the page, breaking existing behavior, or modifying files outside the defined scope.

After you provide the missing fields, I will continue with the workflow.
```

---

## Intake Gate

Do not read any project files.
Do not generate any code.
Do not propose state changes.
Do not continue until Target files, Flow name, Flow trigger, Flow behavior, and State changes are provided.

---

## Required Workflow

### Step 1 — Inspect Existing Page

Read the target files to understand:
- Existing state variables
- Existing handlers
- Existing component structure
- Where the new flow should be inserted

Do not modify anything yet.

### Step 2 — Map Required Components

Run **Component Mapping Skill** (`.claude/skills/_core/component-mapping/SKILL.md`):
- Identify which existing components participate in the flow
- Confirm import paths
- Note any component gaps

If Figma or screenshot exists:
- Run **Visual to Infra Mapping Skill** (`.claude/skills/_infra/visual-to-infra-mapping/SKILL.md`)

### Step 3 — Plan State Changes

Run **Prototype State Patterns Skill** (`.claude/skills/_infra/prototype-state-patterns/SKILL.md`):
- Define new state variables needed
- Define state transitions (trigger → state change → UI update)
- Confirm state is local (no routing change, no backend call)
- Confirm `viewState` pattern applies if needed

### Step 4 — Implement the Flow

Run **State Builder Agent** (`.claude/agents/_infra/state-builder-agent.md`) and **Prototype Page Builder Agent** (`.claude/agents/_core/prototype-page-builder-agent.md`):
- Add only the required state variables
- Add only the required handlers
- Add only the required JSX for the new flow
- Do not touch unrelated parts of the page

### Step 5 — DS Review

Run **Design System Review Agent** (`.claude/agents/_core/design-system-review-agent.md`):
- Confirm new flow elements follow DS rules
- Confirm no new DS components or tokens
- Confirm no inline styles or hardcoded values

### Step 6 — UX Flow Review

Run **UX Flow Review Agent** (`.claude/agents/_core/ux-flow-review-agent.md`):
- Confirm the flow is reachable from the trigger
- Confirm success, error, and cancel paths all work
- Confirm existing page behavior is unaffected

---

## Restrictions

- Do not create a new page
- Do not rewrite the entire existing page
- Do not add flows beyond what was requested
- Do not create new DS components
- Do not create new SCSS tokens
- Do not use inline styles
- Do not hardcode visual values
- Do not add icon libraries or external UI libraries
- Do not add backend logic or real API calls
- Do not expose debug state-switching buttons in the visible UI
- Do not modify files outside the `Files allowed to modify` list
- State changes must be local to the component — no route changes, no context/global state unless existing pattern requires it
- Do not preserve user input across page navigation unless the flow explicitly requires it

---

## Expected Output

```markdown
### UX Add Flow — [FLOW NAME] on [PAGE NAME]

### Flow Summary

| Field | Value |
|---|---|
| Flow name | |
| Trigger | |
| State changes | |
| Files modified | |

### State Changes Added

List new state variables and handlers.

### Components Used

List existing components used in the flow.

### Flow Paths Implemented

| Path | Behavior |
|---|---|
| Trigger | |
| Success | |
| Error | |
| Cancel / close | |

### DS Review

| Check | Status |
|---|---|

### UX Flow Review

Issues found (if any).

### Restrictions Followed

- [ ] Only requested flow added
- [ ] No page rewrite
- [ ] No new DS components
- [ ] No new tokens
- [ ] No inline styles
- [ ] No backend calls
- [ ] No debug buttons

### Final Recommendation

Choose one:
- Flow ready for UX review
- Needs DS review
- Needs UX clarification
- Needs Figma alignment
```

---

## Related Utility Commands

- `/add-states` — add missing loading/empty/error states
- `/review-ux-flow` — validate the complete UX flow
- `/review-design-system` — DS compliance check
- `/ux-edit-page` — broader page edit
