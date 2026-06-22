# FullScreenWizardTemplate — Page Composition Template Specification

## Status
Implemented

## Template ID
`full-screen-wizard`

## Path
`src/prototype-templates/FullScreenWizardTemplate/`

## Primary User Goal
Guide users through a structured multi-step process with dependencies, validation, state persistence, and controlled forward / backward navigation — without leaving the current AppShell context.

## Presentation Type
Full-screen Main Content replacement. AppShell, Sidebar, Header, and active navigation item remain intact.

## When to Use

```text
- Process contains dependent steps
- User must complete steps in a defined order
- Each step has explicit completion criteria
- Previous answers influence later steps
- State must persist across navigation or session refresh
- Validation, warnings, logs, reports, or backend operations are required
- The process is too complex for one form or dialog
```

Examples: Migration setup, tenant onboarding, infrastructure configuration, connector setup, provisioning workflow, data import, security compliance setup.

## When Not to Use

```text
- User edits independent settings → use VerticalTabsConfigurationTemplate
- All content fits in one short form → use FullScreenFormTemplate
- Process is optional and non-sequential
- Main interaction is list management
- A simple confirmation dialog suffices
```

## Layout

```
AppShell
├── Sidebar (unchanged)
├── Application Header (unchanged)
└── Main Content
    └── FullScreenWizardTemplate
        ├── Left nav panel (280px, fixed)
        │   ├── Wizard title
        │   ├── Optional subtitle
        │   └── Vertical stepper (scrollable when step count requires)
        ├── Right body (flex: 1)
        │   ├── Scrollable step content (owns vertical scroll)
        │   └── Fixed footer
        │       ├── Left: Cancel / Close
        │       └── Right: Back | Primary action
```

## File Structure

```
src/prototype-templates/FullScreenWizardTemplate/
  FullScreenWizardTemplate.tsx        — shell + stepper component
  FullScreenWizardTemplate.scss       — layout, stepper, footer — tokens only
  FullScreenWizardTemplate.types.ts   — WizardStepStatus, WizardBackBehavior, props
  index.ts                            — exports
```

## Types

```ts
export type WizardStepStatus =
  | 'not-started'
  | 'locked'
  | 'ready'
  | 'in-progress'
  | 'completed'
  | 'warning'
  | 'failed'
  | 'blocked'
  | 'unknown-outcome'
  | 'skipped'
  | 'reset';

export type WizardBackBehavior =
  | 'allowed-no-reset'
  | 'allowed-with-downstream-reset'
  | 'allowed-before-lock'
  | 'blocked-after-irreversible-action'
  | 'hidden';

export interface FullScreenWizardStep {
  id: string;
  label: string;
  subLabel?: string;       // secondary line after completion (e.g. selected connector name)
  status: WizardStepStatus;
  isAccessible: boolean;   // true → user may click in stepper
  dependsOn?: string[];
}

export interface FullScreenWizardTemplateProps {
  title: string;
  subtitle?: string;
  steps: readonly FullScreenWizardStep[];
  currentStep: string;
  onStepClick?: (stepId: string) => void;
  onClose: () => void;
  onBack: () => void;
  onNext: () => void;
  canNext?: boolean;               // default: true
  nextLabel?: string;              // default last step: 'Finish'
  backBehavior?: WizardBackBehavior; // default: 'allowed-no-reset'
  isSubmitting?: boolean;
  cancelLabel?: string;            // default: 'Close'
  children: React.ReactNode;
}
```

## Stepper States

| State | Bubble |
|---|---|
| `current` | Filled primary circle, white number, bold label |
| `completed` | Outlined visited color, checkmark icon, full label + optional subLabel |
| `in-progress` | Outlined primary, spinning icon, active label |
| `warning` | Outlined warning color, warning triangle icon |
| `failed` | Outlined error color, X icon |
| `locked` / `blocked` / `upcoming` | Outlined muted, muted number, muted label |

Connector line: idle = `$color-wizard-line-idle`, completed = `$color-wizard-line-visited`.

## Stepper Click Rules

| Step status | Clickable? |
|---|---|
| `completed` | Yes when `isAccessible=true` and `onStepClick` provided |
| `current` | No (already active) |
| `warning` | Yes |
| `failed` | Yes when recovery is allowed |
| `in-progress` | No |
| `unknown-outcome` | No |
| `locked` / `blocked` | No |
| `not-started` / `ready` / `upcoming` | No |

## Forward Navigation

Next/Finish is enabled only when `canNext=true`.

Use outcome-specific labels: `Next`, `Confirm`, `Save and continue`, `Run validation`, `Start migration`, `Resume`, `Finish`.

## Back Navigation

| `backBehavior` | Footer Back |
|---|---|
| `allowed-no-reset` | Visible and enabled |
| `allowed-with-downstream-reset` | Visible and enabled; consumer must show reset confirmation before calling `onBack` |
| `allowed-before-lock` | Visible and enabled when step is not yet irreversible |
| `blocked-after-irreversible-action` | Visible but disabled |
| `hidden` | Back not rendered |

## Scroll Ownership

```text
Left nav panel → fixed (independent scrollbar only when step list overflows)
Step content → owns vertical scroll
Footer → fixed
```

## Tokens Used

```
$color-dialog-bg, $color-dialog-separator, $color-dialog-text
$color-background-darkest
$color-wizard-* (line-idle, line-visited, bg-number-current, text-number-current,
                 text-title-current, stroke-number-visited, text-number-visited,
                 text-title-visited, stroke-not-visited, text-number-not-visited,
                 text-title-not-visited)
$color-primary, $color-status-warning, $color-status-error, $color-nav-text-idle
$spacing-*, $font-size-*, $font-weight-*, $border-radius-*, $transition-fast
@include ds-scrollbar
```

## Usage Pattern

```tsx
import { FullScreenWizardTemplate } from '../../prototype-templates/FullScreenWizardTemplate';
import type { FullScreenWizardStep } from '../../prototype-templates/FullScreenWizardTemplate';

const STEPS: FullScreenWizardStep[] = [
  { id: 'env',  label: 'Prepare your environment setup', status: 'completed', isAccessible: true },
  { id: 'prep', label: 'Prepare for migration',          status: 'in-progress', isAccessible: true },
  { id: 'check',label: 'Check system readiness',         status: 'not-started', isAccessible: false },
  { id: 'migrate',label: 'Migrate your data',            status: 'locked',    isAccessible: false },
];

<FullScreenWizardTemplate
  title="Migrate PAM Self-Hosted to ISP"
  steps={STEPS}
  currentStep="prep"
  onClose={handleClose}
  onBack={handleBack}
  onNext={handleNext}
  canNext={canNext}
  backBehavior="allowed-with-downstream-reset"
  nextLabel="Save and continue"
  isSubmitting={saving}
>
  {currentStep === 'env'  && <PrepareEnvironmentStep />}
  {currentStep === 'prep' && <PrepareForMigrationStep />}
  ...
</FullScreenWizardTemplate>
```

## First Instance
H2P Migration flow (`src/pages/MigrationDetailPage/` and future H2P page).

## Rules

- Template owns layout, stepper, and footer only. Step content is always `children`.
- Do not add step-specific logic inside `FullScreenWizardTemplate`.
- Do not add inline styles.
- Do not create new tokens.
- SVG icons only.
- AppShell, Sidebar, Header are never replaced by this template.
- Selected sidebar navigation item is the consumer's responsibility — the template does not touch it.
- Reset impact confirmation is the consumer's responsibility — the template calls `onBack` after consumer confirms.
- Duplicate-submission prevention is the consumer's responsibility via `isSubmitting`.
