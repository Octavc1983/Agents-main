# ConfirmationDialogTemplate — Page Composition Template Specification

## Status
Approved

## Approval Conditions
- `Modal` (DS) is available and verified ✓
- `Button` including `danger` variant is available ✓
- No additional DS primitives required beyond Modal + Button

## Template ID
`confirmation-dialog`

## Path
`src/prototype-templates/ConfirmationDialogTemplate/` *(not yet implemented — Approved)*

## Primary User Goal
Force the user to explicitly acknowledge a consequential action before it executes — and clearly communicate what will happen if they confirm.

## Presentation Type
Modal overlay (small size). AppShell, Sidebar, Header, and Main Content remain intact beneath the backdrop.

## When to Use

```text
- Delete entity (account, tag, policy, integration, connector)
- Disable integration
- Discard unsaved changes from a form or dialog
- Reset configuration with downstream impact
- Abort an active migration
- Proceed after a warning when continuation is allowed
- Apply a destructive bulk action
- Revoke access or permission
- Remove a relationship or binding
```

## When NOT to Use

```text
- Actions that can be safely undone without consequence
- Informational acknowledgment (no destructive consequence)
- Input validation — confirmation is not a substitute for validation
- Error acknowledgment — use inline error state, not confirmation
```

## DEC-016 Check
Not applicable to this template — account creation flows are not confirmation dialogs.

## Layout

```
AppShell (intact beneath backdrop)
└── Modal backdrop (DS Modal portal to document.body)
    └── Modal (DS) — size: small
        ├── Modal Header (fixed)
        │   ├── Confirmation title (names the action)
        │   └── Close button (X) — equals Cancel
        ├── Modal Body
        │   ├── Consequence summary (what will happen)
        │   ├── Impacted entities or affected steps (when relevant)
        │   └── Optional warning callout (for irreversible actions)
        └── Modal Footer (fixed)
            ├── Left: Cancel
            └── Right: Confirm action (danger variant for destructive)
```

## DS Primitives Used

| Primitive | Source | Verified |
|---|---|---|
| `Modal` | `@idira/design-system` | ✓ size: small; focus trap, Escape, backdrop click, focus restoration |
| `Button` | `@idira/design-system` | ✓ `danger` variant for destructive confirm; `text` variant for cancel |

## Known Limitations

None. This template requires only Modal + Button, both verified.

## Open DS Gaps

None.

## Prototype Note

This is a UX prototype. Confirmation dialogs must simulate the expected post-confirmation state transitions (deletion in progress → deleted, abort initiated → aborting → aborted). Use mock data and deterministic state transitions. No real API calls.

## Types

```ts
export type ConfirmationVariant =
  | 'destructive'      // delete, remove, revoke — Button danger variant
  | 'warning'          // proceed despite risk — Button main variant
  | 'reset'            // reset with downstream impact — Button main variant
  | 'discard';         // discard unsaved changes — Button main or secondary variant

export interface ConfirmationDialogTemplateProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  consequence: string;
  impactedItems?: string[];
  warningNote?: string;
  variant?: ConfirmationVariant;
  confirmLabel: string;
  cancelLabel?: string;
  isConfirming?: boolean;
}
```

## Required Labels

Confirm label must name the specific action. Never generic.

| Action | Confirm label |
|---|---|
| Delete entity | "Delete account" / "Delete tag" / etc. |
| Discard changes | "Discard changes" |
| Reset affected steps | "Reset and continue" |
| Abort migration | "Abort migration" |
| Apply destructive bulk action | "Delete selected" / "Disable selected" |
| Proceed despite warning | "Continue" |
| Remove relationship | "Remove access" |

**Forbidden confirm labels:** "OK", "Yes", "Confirm", "Proceed" (without naming the action)

## Forbidden Patterns

```text
- Generic consequence text (e.g. "Are you sure?")
- Hidden consequences — all impact must be stated
- Confirming actions that are safely reversible
- Raw backend error messages in consequence text
- Local destructive button styling — use DS Button danger variant only
- Multiple confirm actions in one dialog
```

## Behavior

- Closing dialog (X button, Escape, backdrop click) = Cancel — no action taken
- Cancel focuses back to trigger element (DEC-007)
- Confirm enters `isConfirming=true` state immediately — button becomes disabled
- Prevent duplicate confirmation: `isConfirming=true` disables Confirm (DEC-001)
- Do not allow backdrop click to accidentally confirm

## Validation

This is not a validation surface. Do not add form fields or inline validation to a ConfirmationDialog.

If additional input is required before a destructive action (e.g. type entity name to confirm), this is a DialogFlowTemplate with a confirmation step — not a ConfirmationDialogTemplate.

## Scroll Ownership

Modal body scrolls only when impacted items list overflows. Header and Footer remain fixed.

## Accessibility

- Focus trap within modal (DS Modal) ✓
- Escape = Cancel (DS Modal) ✓
- Focus restored to trigger element on close (DEC-007) ✓
- Destructive button identified via `aria-label` or visible label that names the action ✓
- `role="alertdialog"` when content is a warning or destructive alert ✓

## Tokens Used

```text
$color-dialog-bg, $color-dialog-separator, $color-dialog-text
$color-status-warning, $color-status-error
$spacing-*, $font-size-*, $font-weight-*, $border-radius-*
```

## Rules

- Use DS `Modal` size="small" — do not use medium/large for simple confirmation
- Confirm label must name the action — never generic
- Destructive confirm uses `Button variant="danger"` — no local color overrides
- Closing = Cancel — never triggers the action
- No form fields in this template — use DialogFlowTemplate if input is needed
- SVG icons only
- No inline styles

## Usage Pattern

```tsx
import { Modal, Button } from '@idira/design-system';

<Modal
  isOpen={isOpen}
  onClose={handleCancel}
  title="Delete account"
  size="small"
  closeOnBackdropClick={true}
  footer={
    <>
      <Button variant="text" onClick={handleCancel} disabled={isConfirming}>
        Cancel
      </Button>
      <Button variant="danger" onClick={handleConfirm} disabled={isConfirming}>
        {isConfirming ? 'Deleting…' : 'Delete account'}
      </Button>
    </>
  }
>
  <p>This will permanently remove the account and all associated data. This action cannot be undone.</p>
</Modal>
```

## Related Decisions
- DEC-001 — Disable duplicate submission
- DEC-007 — Focus restoration after dialog closes
- DEC-008 — No silent fallback
