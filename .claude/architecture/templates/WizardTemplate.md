# WizardTemplate — Page Composition Template Specification

## Status
Implemented

## Path
`src/prototype-templates/WizardTemplate/`

## Primary User Goal
Guide users through a sequential, multi-step creation or configuration flow with persistent step context visible throughout.

## Presentation Type
Modal overlay. Full-screen backdrop. Fixed-size dialog panel.

## Layout

```
┌──────────────────────────────────────────────────┐
│  [Title]                              [×]         │
│                                                   │
│  ┌─────────────┬─────────────────────────────────┐│
│  │  ① Step 1   │                                 ││
│  │  │          │  [Content area for current      ││
│  │  ② Step 2   │   step — scrollable]            ││
│  │  │          │                                 ││
│  │  ③ Step 3   │─────────────────────────────────││
│  │  │          │  Cancel          Back  Next >   ││
│  │  ④ Step 4   │                                 ││
│  └─────────────┴─────────────────────────────────┘│
└──────────────────────────────────────────────────┘
```

- Left panel (~260px): wizard title + vertical numbered stepper
- Right area: scrollable step content + sticky footer with navigation actions
- Close button: top-right corner (absolute positioned)
- Max-width: 900px. Max-height: calc(100vh - 2rem)

## File Structure

```
src/prototype-templates/WizardTemplate/
  WizardTemplate.tsx        — shell component
  WizardTemplate.scss       — layout, stepper, footer tokens
  WizardTemplate.types.ts   — WizardTemplateProps, WizardStep
  index.ts                  — exports
```

## Props API

```ts
interface WizardStep {
  id: number;
  label: string;
}

interface WizardTemplateProps {
  title: string;                // Wizard dialog title, shown in left panel
  steps: readonly WizardStep[]; // Ordered step definitions
  currentStep: number;          // Active step id
  onClose: () => void;          // Called by Cancel and × button
  onBack: () => void;           // Called by Back button
  onNext: () => void;           // Called by Next / finish button
  canNext: boolean;             // Disables Next when false
  nextLabel?: string;           // Override label on the last step's action
  isSubmitting?: boolean;       // Disables all actions, shows submitting state
  children: React.ReactNode;    // Current step's content
}
```

## Stepper States

| State | Appearance |
|---|---|
| `visited` (step.id < currentStep) | Purple border, purple number, checkmark icon |
| `current` (step.id === currentStep) | Purple filled circle, white number, bold label |
| `upcoming` (step.id > currentStep) | Grey border, grey number, muted label |

Connector lines between steps:
- Idle: `$color-wizard-line-idle`
- Visited: `$color-wizard-line-visited`

## Required States

| State | How |
|---|---|
| Step validation | `canNext=false` disables Next button |
| Submitting | `isSubmitting=true` disables all actions, changes label |
| Success | Caller replaces wizard with success screen |
| Cancel confirmation | Caller wraps wizard in a confirm dialog overlay |

## Navigation Rules

- Back button: hidden on step 1
- Next button: disabled when `canNext=false`
- Last step: Next label becomes `nextLabel` (default: `'Finish'`)
- Cancel: always visible, calls `onClose`

## Tokens Used

All from `_tokens.scss` — no new tokens:

```
$color-dialog-bg, $color-dialog-separator, $color-dialog-close-icon, $color-dialog-text
$color-wizard-*  (11 tokens: line, number, text for visited/current/upcoming states)
$color-overlay-backdrop
$color-background-darkest, $color-background-darker, $color-background-dark
$shadow-lg, $border-radius-md, $border-radius-base, $border-radius-full
$spacing-*, $font-size-*, $font-weight-*, $transition-fast
```

## Usage Pattern

```tsx
import { WizardTemplate } from '../../prototype-templates/WizardTemplate';

const STEPS = [
  { id: 1, label: 'Step one' },
  { id: 2, label: 'Step two' },
  { id: 3, label: 'Review' },
] as const;

<WizardTemplate
  title="Create something"
  steps={STEPS}
  currentStep={step}
  onClose={handleClose}
  onBack={handleBack}
  onNext={handleNext}
  canNext={canNext}
  nextLabel="Create"
  isSubmitting={saving}
>
  {step === 1 && <StepOneContent />}
  {step === 2 && <StepTwoContent />}
  {step === 3 && <ReviewContent />}
</WizardTemplate>
```

## First Instance
`src/pages/ManagedAccountsPage/CreateManagedAccountWizard.tsx`

## Rules

- Step content is always passed as `children` — the template owns layout only
- Do not add step-specific logic inside `WizardTemplate`
- Dirty-state guard and cancel-confirm dialog are the consumer's responsibility
- Success screen is rendered by the consumer, not inside the template
- Do not add inline styles
- Do not create new tokens
- Icons are inline SVG only
