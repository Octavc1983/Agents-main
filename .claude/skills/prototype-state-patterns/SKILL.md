# Prototype State Patterns

## Purpose

Add, verify, and document reusable prototype states for React pages and components so that every relevant user scenario can be demonstrated without a backend.

This skill ensures states are implemented correctly using existing Infra / DS state components, are not exposed as visible debug controls, and are properly documented for testing.

---

## When to Use

Use this skill when:

- A prototype page needs loading, empty, or error states added
- A form page needs validation, saving, or success states
- A table or list page needs a selected row or details-open state
- An existing page's state coverage needs to be reviewed and filled in
- State triggers need to be documented for UX or PM review

---

## Inputs Required

- Target page name and file path
- Description of which states are needed or missing
- Any existing state component paths (if not already known)

---

## Supported States

| State | Description |
|---|---|
| Default | Normal data-loaded view |
| Loading | Data is being fetched or an action is in progress |
| Empty | No data, user needs to take an action |
| Error | Backend or system error — data could not be loaded |
| Backend error | Inline error after a user action (save, submit) — preserve user input |
| Validation | Field-level input errors shown close to the relevant field |
| Saving | A submit or save action is in progress — disable conflicting actions |
| Success | Action completed — confirmation visible |
| Disabled | A control or action is unavailable in this context |
| Selected row | A row in a table is clicked and visually marked |
| Details open | The details panel is visible (master-details pattern) |

---

## Required Project Inspection

Before adding any states:

1. Find existing `LoadingState` component — location and props
2. Find existing `EmptyState` component — location, props (`icon`, `title`, `description`, `action`)
3. Find existing `ErrorState` component — location, props (`title`, `message`, `action`)
4. Find any existing validation or inline error pattern in the project
5. Find any existing saving or success feedback pattern (toast, inline message)
6. Confirm SCSS token for state colors: `$color-status-success`, `$color-status-error`, `$color-status-warning`, `$color-status-idle`
7. Review the target page's current state coverage

---

## Required Workflow

1. Inspect the target page and identify which states exist and which are missing.
2. Inspect existing state components.
3. For each missing state, confirm whether an existing component covers it.
4. Add missing states using existing components.
5. For states without an existing component (e.g. inline validation), implement a minimal prototype pattern following project conventions.
6. Remove any visible debug state switcher from the UI.
7. Document how to trigger each state (initial value to change in code).
8. Verify that:
   - Empty states guide the user toward a next action
   - Error messages are non-technical and user-friendly
   - Backend errors preserve user input where relevant
   - Saving state disables conflicting actions
   - Success state is visible and dismissible if needed

---

## State Implementation Pattern

States must be controlled internally without visible debug buttons:

```tsx
// Change the initial value to test different states:
// 'default' | 'loading' | 'empty' | 'error'
const [viewState] = useState<'default' | 'loading' | 'empty' | 'error'>('default');
```

Render pattern:
```tsx
{viewState === 'loading' && <LoadingState message="Loading…" />}
{viewState === 'error' && (
  <ErrorState title="…" message="…" />
)}
{viewState === 'empty' && (
  <EmptyState title="…" description="…" icon={<Icon />} action={<button>…</button>} />
)}
{viewState === 'default' && (
  /* main page content */
)}
```

Do not render state switcher buttons in the visible UI.

---

## Must Do

- Use existing `LoadingState`, `EmptyState`, `ErrorState` components
- Keep state logic simple and prototype-focused
- Preserve user input after validation or backend errors when relevant
- Disable conflicting actions during saving when relevant
- Make empty states actionable — provide a clear next step
- Make error messages clear and non-technical
- Document how to trigger each state by changing a constant in code
- Preserve existing page functionality when adding states

---

## Must Not Do

- Expose visible debug state buttons (`default`, `loading`, `empty`, `error`) in the rendered UI
- Create new DS state components when existing ones are available
- Add backend integration or real API calls
- Add complex business logic
- Replace existing state patterns
- Over-engineer the prototype
- Add new libraries
- Create production-level state management
- Modify unrelated pages

---

## Output Format

```markdown
### State Coverage Summary

### States Added or Verified

| State | Status | Implementation | How to Trigger |
|---|---|---|---|

### How to Trigger Each State

List the exact constant or initial value to change for each state.

### Existing State Components Used

List components used and their import paths.

### Missing State Components

If a needed state has no existing component, document it as a gap.

### Files Updated

### UX Notes

Confirm:
- Empty states guide the user toward an action
- Error messages are non-technical
- Backend errors preserve user input
- Saving state disables conflicting actions

### Final Recommendation

Choose one:
- State coverage complete
- Needs additional states — list them
- Needs DS component for [state type]
- Needs UX clarification on [state]
```

---

## Example Prompt

```
Use the Prototype State Patterns skill.

Goal:
Add and verify all required states for [PAGE_NAME].

Target page:
[File path]

States needed:
[List: loading, empty, error, validation, saving, success, etc.]

Important:
Use existing LoadingState, EmptyState, ErrorState components.
Do not expose visible debug state buttons in the UI.
Document how to trigger each state in code comments.
Preserve user input on backend errors.
Do not add backend logic.

Expected output:
State coverage table, implementation per state, how-to-trigger documentation, files updated, final recommendation.
```
