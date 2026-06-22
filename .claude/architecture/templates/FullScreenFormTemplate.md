# FullScreenFormTemplate — Page Composition Template Specification

## Status
Implemented

## Template ID
`full-screen-form`

## Path
`src/prototype-templates/FullScreenFormTemplate/`

## Primary User Goal
Create, edit, or configure a single entity or related configuration set — with a fixed header, scrollable body, and fixed footer — while AppShell, Sidebar, and Header remain intact.

## Presentation Type
Full-screen Main Content replacement. AppShell, Sidebar, Header, and active navigation item remain intact.

## When to Use

```text
- Create flows (new account, new policy, new integration)
- Edit flows (edit managed account, edit configuration)
- Configuration pages (single entity)
- Entity details editing
- Security-sensitive forms
```

Do NOT use when:
- Steps are sequential and dependent → use FullScreenWizardTemplate
- Multiple independent sections need free navigation → use VerticalTabsConfigurationTemplate

## Layout

```
AppShell
├── Sidebar (unchanged)
├── Application Header (unchanged)
└── Main Content
    └── FullScreenFormTemplate
        ├── Fixed header (title, subtitle, read-only badge, dirty indicator)
        ├── Scrollable form content (owns vertical scroll)
        └── Fixed footer
            ├── Left: Cancel
            └── Right: [secondaryAction?] + Primary action
```

## File Structure

```
src/prototype-templates/FullScreenFormTemplate/
  FullScreenFormTemplate.tsx        — shell component
  FullScreenFormTemplate.scss       — layout, header, footer — tokens only
  FullScreenFormTemplate.types.ts   — FormState, FormBackBehavior, props
  index.ts                          — exports
```

## Types

```ts
type FormState =
  | 'initial' | 'loading' | 'ready' | 'dirty' | 'valid' | 'invalid'
  | 'submitting' | 'saved' | 'save-failed' | 'warning'
  | 'blocked' | 'unknown-outcome' | 'read-only';

type FormBackBehavior =
  | 'allowed-no-changes'
  | 'confirm-unsaved-changes'
  | 'blocked-during-submit'
  | 'blocked-during-irreversible-operation'
  | 'return-to-origin';

interface FullScreenFormTemplateProps {
  title: string;
  subtitle?: string;
  onCancel: () => void;
  onSubmit: () => void;
  submitLabel?: string;        // default: 'Save changes'
  cancelLabel?: string;        // default: 'Cancel'
  formState?: FormState;       // default: 'ready'
  canSubmit?: boolean;         // default: true
  isDirty?: boolean;           // shows "Unsaved changes" indicator
  isSubmitting?: boolean;      // disables actions + shows 'Saving…'
  isReadOnly?: boolean;        // shows lock badge, disables submit
  secondaryAction?: ReactNode;
  children: ReactNode;
}
```

## Props Quick Reference

| Prop | Default | Purpose |
|---|---|---|
| `submitLabel` | `'Save changes'` | Primary CTA label |
| `cancelLabel` | `'Cancel'` | Cancel/back label |
| `canSubmit` | `true` | Set `false` to disable submit without hiding it |
| `isDirty` | `false` | Shows "Unsaved changes" text in header |
| `isSubmitting` | `false` | Blocks all footer + shows `'Saving…'` |
| `isReadOnly` | `false` | Lock badge in header + submit disabled |
| `secondaryAction` | — | Optional node rendered before submit (e.g. Reset) |

## Scroll Ownership

```text
Fixed: header, footer
Scrollable: form content region (.fsf-tpl__content)
Validation scrolls inside content only — header and footer never move
```

## Unsaved-Changes Guard

The consumer drives this pattern:
1. Set `isDirty={true}` when form has changes
2. In `onCancel`: if `isDirty`, show a confirmation dialog before navigating away
3. The template does not render the confirmation dialog itself

## Tokens Used

```
$color-dialog-bg, $color-dialog-separator
$color-background-darkest
$color-text-light, $color-nav-text-idle
$spacing-*, $font-size-*, $font-weight-*, $transition-fast
@include flex-between, @include flex-col, @include ds-scrollbar
```

## Usage Pattern

```tsx
import { FullScreenFormTemplate } from '../../prototype-templates/FullScreenFormTemplate';

<FullScreenFormTemplate
  title="Create Managed Account"
  subtitle="Configure the account credentials and access policy"
  onCancel={handleCancel}
  onSubmit={handleSave}
  submitLabel="Create account"
  isDirty={isDirty}
  canSubmit={isValid}
  isSubmitting={saving}
>
  <AccountFormFields ... />
</FullScreenFormTemplate>
```

## Rules

- Template owns header, scrollable wrapper, and footer only. Form fields are always `children`.
- Do not add form-specific logic inside `FullScreenFormTemplate`.
- Unsaved-changes confirmation dialog is the consumer's responsibility.
- Timeout = unknown-outcome, not auto-failure — the consumer handles `formState`.
- Do not persist passwords, SSH keys, or secrets.
- Do not add inline styles or new tokens.
- SVG icons only.
