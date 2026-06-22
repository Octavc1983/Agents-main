# ConfirmationDialogTemplate — Template Contract

## DS Primitives Required

| Component | Package | Verified | Notes |
|---|---|---|---|
| `Modal` | `@idira/design-system` | ✓ | size: small; focus trap, Escape, backdrop click |
| `Button` | `@idira/design-system` | ✓ | `danger` variant for destructive; `text` variant for cancel |

## No Additional Primitives Required
This template uses only Modal + Button. No StatusIcon, no Stepper, no ProgressBar needed.

## Props API

```ts
export type ConfirmationVariant =
  | 'destructive'   // delete, remove, revoke → Button danger
  | 'warning'       // proceed despite risk → Button main
  | 'reset'         // reset with downstream impact → Button main
  | 'discard';      // discard unsaved changes → Button main or secondary

export interface ConfirmationDialogTemplateProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  consequence: string;
  impactedItems?: string[];
  warningNote?: string;
  variant?: ConfirmationVariant;  // default: 'destructive'
  confirmLabel: string;           // REQUIRED — must name the action
  cancelLabel?: string;           // default: 'Cancel'
  isConfirming?: boolean;         // true while confirmation is processing
}
```

## Layout Contract

```text
Modal (DS, size: small)
  ├── Header (fixed)
  │   ├── title (names the action)
  │   └── Close X (= Cancel)
  ├── Body
  │   ├── consequence (string — what will happen)
  │   ├── [impactedItems list — when provided]
  │   └── [warningNote — when irreversible]
  └── Footer (fixed)
      ├── Cancel (Button text variant)
      └── Confirm (Button danger/main variant per ConfirmationVariant)
```

## Scroll Ownership
- Header: fixed
- Body: scrollable only when `impactedItems` list overflows — `overflow-y: auto; @include ds-scrollbar`
- Footer: fixed

## Localization Contract
`title`, `consequence`, `confirmLabel`, `cancelLabel`, `warningNote`, `impactedItems` labels — all must use localization keys.

## Mock Data Contract
No mock data fixture needed for the template itself. Consumer provides the consequence, impacted items, and labels. Prototype confirmation responses are simulated in the consumer page.
