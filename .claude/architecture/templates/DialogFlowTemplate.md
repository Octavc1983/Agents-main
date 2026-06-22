# DialogFlowTemplate — Page Composition Template Specification

## Status
Approved with limitation

## Approval Conditions
- `Modal` (DS) is available and verified ✓
- `Button` including `danger` variant is available ✓
- `Stepper` (DS) is exported — verify keyboard behavior and Modal compatibility before using in multi-step flows
- Step indicator for multi-step dialogs: use DS `Stepper` if compatible; if not compatible, report DS Gap — do not create local stepper

## Template ID
`dialog-flow`

## Path
`src/prototype-templates/DialogFlowTemplate/` *(not yet implemented — Approved)*

## Primary User Goal
Allow users to complete a focused, scoped task within a modal overlay — without leaving the current page context or replacing Main Content.

## Presentation Type
Modal overlay. AppShell, Sidebar, Header, and Main Content remain fully intact and visible beneath the backdrop.

## When to Use

```text
- Create a new tag
- Edit a configuration subset
- Upload an SSH key
- Select a connector
- Add a remote access domain
- Configure a small integration
- 2–4 step guided flows that fit in a modal
- Single-step forms for constrained scope
```

## When NOT to Use

```text
- Add Account / Create Account / Onboard Account
  → DEC-016: must use FullScreenWizardTemplate
- Any flow with backend operations, connector binding, credential configuration, or irreversible stages
  → use FullScreenWizardTemplate
- Any process that requires logs, reports, state persistence across sessions, or multiple dependent phases
  → use FullScreenWizardTemplate
- Multiple independent configuration sections
  → use VerticalTabsConfigurationTemplate
- Read/edit of a single entity with full context
  → use DetailsPageTemplate
- Destructive action confirmation
  → use ConfirmationDialogTemplate
```

## DEC-016 Mandatory Routing Check

Before using DialogFlowTemplate, confirm the flow is NOT:
- Add Account, Create Account, Onboard Account — these ALWAYS use FullScreenWizardTemplate (DEC-016)

## Layout

```
AppShell (intact beneath backdrop)
├── Sidebar (visible, not interactive during dialog)
├── Application Header (visible, not interactive during dialog)
└── Main Content (visible, not interactive during dialog)

Modal backdrop (DS Modal portal to document.body)
└── Modal (DS) — size: small | medium | large
    ├── Modal Header (fixed)
    │   ├── Dialog title
    │   ├── Optional step indicator (DS Stepper — verify compatibility)
    │   └── Close button (X)
    ├── Modal Body (scrollable when content overflows)
    │   ├── Active step content
    │   ├── Inline field validation errors
    │   ├── Technical result state (success/warning/error)
    │   └── Optional loading state
    └── Modal Footer (fixed)
        ├── Left: Back (multi-step only, hidden on step 1)
        ├── Center: Cancel
        └── Right: Next / Save / Confirm
```

## DS Primitives Used

| Primitive | Source | Verified |
|---|---|---|
| `Modal` | `@idira/design-system` | ✓ sizes: small/medium/large/full; focus trap, Escape, backdrop click, focus restoration |
| `Button` | `@idira/design-system` | ✓ including `danger` variant for destructive confirm |
| `Stepper` | `@idira/design-system` | Exported — verify keyboard behavior and Modal integration before use |

## Shared Application Primitives Used

| Primitive | Source | Verified |
|---|---|---|
| `StatusIcon` | `src/components/shared/StatusIcon/` | ✓ stable API, 24px, accessible labels — use for operational states |

## Known Limitations

- `Stepper` compatibility with Modal header: verify public API, keyboard behavior, and step-count display before using. If incompatible, report DS Gap — do not create a local inline stepper.
- Large body content: Modal body is scrollable (`overflow-y: auto`). Not virtualized.

## Open DS Gaps

None at this time. If `Stepper` cannot be composed inside Modal header, create DS Gap: "Step indicator in modal header."

## Prototype Note

This is a UX prototype. All dialog operations must simulate production-grade state transitions using mock data. No real API calls. Simulate: loading, success, warning, failure, unknown-outcome, retry-available states using deterministic mock timers and centralized typed mock data.

## Types

```ts
export type DialogFlowState =
  | 'initial'
  | 'loading'
  | 'ready'
  | 'dirty'
  | 'invalid'
  | 'submitting'
  | 'completed'
  | 'warning'
  | 'failed'
  | 'unknown-outcome'
  | 'read-only';

export interface DialogFlowStep {
  id: string;
  label: string;
  isCompleted: boolean;
}

export interface DialogFlowTemplateProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  size?: 'small' | 'medium' | 'large';
  steps?: readonly DialogFlowStep[];
  currentStepIndex?: number;
  onBack?: () => void;
  onNext?: () => void;
  onSubmit?: () => void;
  canNext?: boolean;
  nextLabel?: string;
  submitLabel?: string;
  cancelLabel?: string;
  dialogState?: DialogFlowState;
  isSubmitting?: boolean;
  isDirty?: boolean;
  children: React.ReactNode;
}
```

## Step Navigation

| Condition | Footer Back |
|---|---|
| Single-step dialog | Not rendered |
| Multi-step, step 1 | Not rendered |
| Multi-step, step > 1 | Visible and enabled |
| Submitting | Back disabled |

Next/Submit enabled only when `canNext=true` and state is not `submitting`, `read-only`, or `blocked`.

## Dirty Close Behavior

When `isDirty=true` and user clicks X or Cancel:
→ show ConfirmationDialogTemplate "Discard changes?"
→ on Confirm: close dialog, discard unsaved data
→ on Cancel: return to dialog, unsaved data preserved

Do not silently discard unsaved data.

## Validation

- Field errors: inline beneath each field
- Backend failure: dialog-level error, not inline
- Timeout: maps to `unknown-outcome`, not `failed` (DEC-004)
- Warning with continuation allowed: requires explicit acknowledgment

## Scroll Ownership

```text
Modal header → fixed
Modal body   → owns vertical scroll (overflow-y: auto; @include ds-scrollbar)
Modal footer → fixed
```

## Tokens Used

```text
$color-dialog-bg, $color-dialog-separator, $color-dialog-text
$color-status-error, $color-status-warning, $color-status-success
$spacing-*, $font-size-*, $font-weight-*, $border-radius-*, $transition-fast
@include ds-scrollbar
```

## Accessibility

- Focus trap within modal (handled by DS Modal) ✓
- Escape closes modal (handled by DS Modal) ✓
- Focus restored to trigger element on close (DEC-007) ✓
- `aria-modal="true"`, `role="dialog"` (handled by DS Modal) ✓
- All user-facing copy must be localized ✓

## Duplicate Submission Prevention

`isSubmitting=true` disables Next/Submit button. Consumer owns this state. (DEC-001)

## Rules

- Use DS `Modal` as the base — do not create a custom dialog primitive
- Do not change sidebar navigation from within the dialog
- Do not navigate to a new page from within the dialog
- Closing dirty dialog requires discard confirmation (ConfirmationDialogTemplate)
- Do not use for flows that require FullScreenWizardTemplate (see DEC-016)
- SVG icons only
- No inline styles
- No hardcoded colors

## Usage Pattern

```tsx
import { Modal, Button } from '@idira/design-system';

<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Create tag"
  size="medium"
  footer={
    <>
      <Button variant="text" onClick={handleClose}>Cancel</Button>
      <Button variant="main" onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? 'Saving…' : 'Save'}
      </Button>
    </>
  }
>
  {/* step content */}
</Modal>
```

## Related Decisions
- DEC-001 — Disable duplicate submission during save
- DEC-004 — Timeout = unknown-outcome, not failed
- DEC-007 — Focus restoration after dialog closes
- DEC-016 — Add Account uses FullScreenWizardTemplate, not dialog
