# ConfirmationDialogTemplate — State Model

## States

| State | When | Confirm Button | Cancel Button |
|---|---|---|---|
| `idle` | Dialog open, awaiting user | Enabled | Enabled |
| `confirming` | Confirm clicked, action executing | Disabled (loading label) | Disabled |
| `completed` | Action succeeded | — (dialog closes) | — |
| `failed` | Action failed | Re-enabled (retry) | Enabled |

## State Transitions

```
idle
  → confirming (on Confirm click)
  → [closed] (on Cancel or X or Escape)

confirming
  → [closed] (on action success — consumer closes dialog)
  → failed (on action error)

failed
  → confirming (on retry)
  → [closed] (on Cancel)
```

## Prototype State Simulation

```ts
const handleConfirm = async () => {
  setIsConfirming(true);
  await mockDelay(1200);
  // deterministic: succeed or fail based on scenario
  onConfirm(); // triggers consumer to update state and close
};
```

## Confirmed State Ownership
The consumer owns post-confirmation state (e.g. the entity list refreshes after deletion). The confirmation template owns only the confirming/failed states within the dialog itself.

## Failed State
When the action fails:
- Show error below consequence text
- Re-enable Confirm and Cancel
- Do not close the dialog automatically
- Do not show raw backend error — use safe user-facing copy

## isConfirming Prevents Duplicates (DEC-001)
When `isConfirming=true`:
- Confirm button: disabled + loading label (e.g. "Deleting…")
- Cancel button: disabled
- X button: disabled
- Backdrop click: blocked (non-dismissible while confirming)
