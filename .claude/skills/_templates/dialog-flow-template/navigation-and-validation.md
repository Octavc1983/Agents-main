# DialogFlowTemplate — Navigation and Validation

## Step Navigation Rules

### Single-step dialog
- No step indicator
- No Back button
- Footer: Cancel | Submit

### Multi-step dialog (steps > 1)
- Step indicator in header (DS Stepper — verify compatibility before use)
- Back hidden on step 1
- Back visible and enabled on step > 1
- Footer step 1: Cancel | Next
- Footer intermediate: Back | Cancel | Next
- Footer final step: Back | Cancel | Submit/Confirm

### Back behavior
- Back does not submit or validate
- Back preserves dirty state of the current step
- Consumer decides whether to reset the current step on back
- Back while `isSubmitting=true` → disabled

## Forward Navigation

Next/Submit enabled when:
- `canNext=true`
- `dialogState` is not `submitting`, `loading`, `read-only`, `invalid`

Next/Submit label overrides (use outcome-specific labels):
- "Next" (default for intermediate steps)
- "Save" (single-step form)
- "Confirm" (confirmation action)
- "Upload" (file upload)
- "Connect" (connection setup)
- "Apply" (configuration apply)
- Never: generic "OK"

## Validation Behavior

### Field-level validation
- Validate on blur (not on each keystroke)
- Show error below the field
- Error disappears when field becomes valid
- Do not show all errors before user has touched fields

### Step-level validation
- Validate all fields on Next click
- If invalid: prevent navigation, show all errors, scroll to first error
- State becomes `invalid`
- State returns to `dirty` when user edits any field

### Backend validation
- Backend error → dialog-level error (not inline field error unless field-specific)
- Show error message at top of body or in a Callout component
- State = `failed`

### Timeout
- Timeout → `unknown-outcome` (DEC-004)
- Do not auto-map to `failed`

## Sidebar Navigation
Dialog does NOT change sidebar navigation.
Dialog does NOT navigate to a new page.
Dialog does NOT change the active route.

## Close Navigation
- X button → triggers dirty check → closes dialog
- Cancel → triggers dirty check → closes dialog
- Escape (DS Modal) → triggers dirty check → closes dialog
- Backdrop click (DS Modal) → triggers dirty check → closes dialog (if `closeOnBackdropClick=true`)
- Close returns focus to the element that triggered the dialog (DEC-007)

## Completion Navigation
On `completed` state:
- Dialog auto-closes OR shows success content with a Close button
- Closing navigates back to the originating view
- Page may refresh/refetch the entity list (consumer responsibility)
