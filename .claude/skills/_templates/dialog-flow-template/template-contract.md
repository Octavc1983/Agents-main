# DialogFlowTemplate — Template Contract

## DS Primitives Required

| Component | Package | Verified | Notes |
|---|---|---|---|
| `Modal` | `@idira/design-system` | ✓ | Base container — required |
| `Button` | `@idira/design-system` | ✓ | Footer actions — required; `danger` variant for destructive confirm |
| `Stepper` | `@idira/design-system` | Needs verification | Multi-step indicator only — optional; verify Modal compatibility before use |

## Shared Application Primitives

| Component | Path | Verified | Notes |
|---|---|---|---|
| `StatusIcon` | `src/components/shared/StatusIcon/` | ✓ | For operational result states only — not SeverityBadge |

## Props API

```ts
export type DialogFlowState =
  | 'initial' | 'loading' | 'ready' | 'dirty' | 'invalid'
  | 'submitting' | 'completed' | 'warning' | 'failed'
  | 'unknown-outcome' | 'read-only';

export interface DialogFlowStep {
  id: string;
  label: string;
  isCompleted: boolean;
}

export interface DialogFlowTemplateProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  size?: 'small' | 'medium' | 'large';      // default: medium
  steps?: readonly DialogFlowStep[];         // omit for single-step
  currentStepIndex?: number;
  onBack?: () => void;                       // back on step > 1
  onNext?: () => void;                       // next on intermediate steps
  onSubmit?: () => void;                     // final step action
  canNext?: boolean;                         // default: true
  nextLabel?: string;                        // default: 'Next'
  submitLabel?: string;                      // default: 'Save'
  cancelLabel?: string;                      // default: 'Cancel'
  dialogState?: DialogFlowState;
  isSubmitting?: boolean;
  isDirty?: boolean;
  children: React.ReactNode;
}
```

## Layout Contract

```text
Modal (DS) — portal to document.body
  ├── Header (DS Modal header — fixed)
  │   ├── title
  │   ├── [optional step indicator — Stepper DS if verified]
  │   └── close X
  ├── Body (DS Modal body — scrollable)
  │   └── children (active step content)
  └── Footer (DS Modal footer — fixed)
      ├── [Back — only on step > 1]
      ├── Cancel
      └── Next | Submit
```

## Scroll Ownership
- Header: fixed
- Body: `overflow-y: auto`, `@include ds-scrollbar`
- Footer: fixed

## SCSS File
`DialogFlowTemplate.scss` — tokens only, no hardcoded values, no inline styles

## Localization Contract
All user-facing copy (title, labels, cancelLabel, submitLabel, nextLabel, step labels, error messages) must use localization keys. No hardcoded strings in JSX.

## Mock Data Contract
Prototype mock data stored in `src/mock/dialogFlowMockData.ts` — typed, centralized, domain-specific. Never inside component JSX.
