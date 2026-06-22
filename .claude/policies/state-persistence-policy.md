# State Persistence Policy

## Context Preservation — Master Details

When Master Details opens:

```text
Preserve:
- search query
- applied filters
- sort order
- pagination or cursor position
- scroll position (where feasible)
- bulk selection state
- active navigation selection
- selected Space
```

When Master Details closes:

```text
- Return focus to the originating row or primary identifier.
- Restore scroll position.
- Do not reset filters, search, sort, or selection.
```

---

## Context Preservation — Navigation

When navigating Back from any full-screen template:

```text
- Restore originating filters and search.
- Restore scroll position where feasible.
- Restore active selection.
- Restore pagination state.
```

---

## Unsaved Changes Guard

When a user attempts to navigate away from a dirty form or wizard step:

```text
- Show ConfirmationDialogTemplate before discarding.
- Variant: 'discard'
- Cancel → return to form/step with changes intact.
- Confirm → discard and navigate.
```

The guard applies to:

```text
- FullScreenFormTemplate with unsaved changes
- VerticalTabsConfigurationTemplate with dirty tabs
- FullScreenWizardTemplate with dirty step content
- DialogFlowTemplate with dirty content
```

---

## Wizard Back Behavior

Back navigation in wizards follows `WizardBackBehavior`:

| Behavior | What happens |
|---|---|
| `allowed-no-reset` | Back always available, no downstream impact |
| `allowed-with-downstream-reset` | Back shows ConfirmationDialogTemplate before resetting downstream |
| `allowed-before-lock` | Back available only before the step becomes irreversible |
| `blocked-after-irreversible-action` | Back visible but disabled once irreversible action has run |
| `hidden` | Back not rendered |

---

## Filter Draft vs Applied Model

Filter state must separate draft from applied:

```text
User changes filter → update draft only
User selects Apply → draft becomes applied → results update
User cancels / closes without Apply → discard draft → preserve applied
```

Do not apply filter changes immediately unless an explicit product decision requires live filtering.

---

## Prototype State Persistence

For session resume in prototype:

```text
- Persist mock state to localStorage where appropriate.
- On wizard mount: load saved state if available; otherwise start from initial state.
- All state transitions must be deterministic mock logic.
```
