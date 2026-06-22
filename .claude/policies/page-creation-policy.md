# Page Creation — Screenshot Context and Open Tasks Policy

## Scope

This policy applies only when Claude is creating a new page or building a page from a product requirement.

It does not apply automatically to:

* UI pixel-matching tasks
* Figma alignment tasks
* Existing-page visual corrections
* Design System changes
* Screenshot-driven UI recreation tasks

---

## Screenshot Usage Rule

Any screenshot provided during page creation is context only.

Screenshots may be used to understand:

```text
- product area
- page purpose
- information hierarchy
- user intent
- business context
- entity relationships
- expected content
- workflow context
- navigation context
```

Screenshots must not be used as direct UI implementation instructions.

Claude must not:

```text
- copy the screenshot layout
- recreate its spacing
- recreate its colors
- recreate local visual styling
- infer custom components from screenshot appearance
- introduce page-specific visual overrides
- modify the existing Design System to match the screenshot
- use screenshots as a pixel-perfect target
```

---

## Design System Rule

For all page creation tasks:

```text
Use approved Design System components, tokens, icons, states, and templates only.
```

Claude must:

```text
- map the product requirement to existing Design System components
- use the approved page template where applicable
- preserve existing Design System visual language
- use public component APIs only
- report missing capabilities as Design System Gaps
```

Claude must not alter Design System styling to resemble a screenshot.

If the screenshot conflicts with the Design System:

```text
1. Preserve the Design System.
2. Explain the mismatch.
3. Create a DS Gap only if the missing behavior is reusable.
4. Do not create a local visual workaround.
```

---

## Required Screenshot Interpretation Output

When screenshots are provided in a page-creation task, Claude must include:

```markdown
### Screenshot Context Extracted

| Area | Context Identified | Used For |
|---|---|---|
| Product area | | Page purpose |
| Entity type | | Data model |
| User goal | | Flow design |
| Navigation context | | Route and Space validation |
| Business state | | Required page states |

### Screenshot UI Treatment

The screenshot is treated as contextual reference only.

No visual layout, styling, spacing, color, or component design has been copied from the screenshot.

### Design System Mapping

| Requirement | Approved DS Component / Template | Decision |
|---|---|---|
```

---

# Open Tasks Management

Claude must maintain an open tasks document for every page-creation initiative.

Create or update:

```text
.claude/project-management/open-page-creation-tasks.md
```

The file must track unresolved work across sessions.

---

## Open Task Structure

```markdown
# Open Page Creation Tasks

## Active Initiative

### [Page or Feature Name]

| ID | Task | Category | Status | Blocker | Owner | Next Step |
|---|---|---|---|---|---|---|
| P-001 | Confirm backend contract for bulk tag update | Backend | Blocked | API contract missing | PM / Backend | Define response and retry behavior |
| P-002 | Approve Drawer DS Gap | Design System | Pending approval | Drawer unavailable | UX / DS owner | Review DS Gap |
| P-003 | Add filtered no-results state | UX Flow | Open | None | Claude | Include in approved implementation delta |
```

Use these statuses only:

```text
Open
In progress
Pending approval
Blocked
Deferred
Completed
Not applicable
```

---

## Task Creation Rules

Claude must add an open task when it finds:

```text
- unresolved business decision
- Flow Gap
- backend contract gap
- Design System Gap
- navigation ambiguity
- missing permission decision
- missing localization requirement
- unresolved annotation
- pending user approval
- validation failure
- deferred implementation item
```

Claude must not create tasks for trivial implementation details it can resolve automatically through approved patterns.

---

## Session-End Report

At the end of every session involving page creation, Claude must show:

```markdown
### Session Summary

### Completed This Session

| Task | Outcome |
|---|---|

### Open Tasks Remaining

| ID | Task | Status | Why It Is Still Open | Required Next Step |
|---|---|---|---|---|

### Decisions Needed From You

| Decision | Impact | Recommended Options |
|---|---|---|

### Blockers

| Blocker | Affected Area | Owner |
|---|---|---|

### Next Recommended Work Item
```

Claude must also update `.claude/project-management/open-page-creation-tasks.md` before presenting the session-end report.

---

## Completion Rule

A page creation task is not considered complete until:

```text
- all required page states are implemented or explicitly deferred
- open Flow Gaps are resolved, blocked, or documented
- required approvals are recorded
- Design System and backend gaps are documented
- validation results are reported
- remaining work is visible in the Open Tasks document
```

---

## Required Claude Behavior

Before building a page:

```text
1. Read Global UI Standards.
2. Read approved user decisions and UX patterns.
3. Read active annotations and Flow Gaps.
4. Read the current Open Page Creation Tasks document.
5. Treat screenshots as product context only.
6. Use approved DS components and templates.
7. Add newly detected unresolved work to Open Tasks.
```

After every page-creation session:

```text
1. Update Open Page Creation Tasks.
2. Show completed work.
3. Show unresolved tasks.
4. Show blockers and approvals needed.
5. Recommend the next highest-priority task.
```
