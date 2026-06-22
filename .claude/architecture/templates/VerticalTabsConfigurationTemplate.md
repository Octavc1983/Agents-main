# VerticalTabsConfigurationTemplate — Page Composition Template Specification

## Status
Implemented

## Template ID
`vertical-tabs-configuration`

## Path
`src/prototype-templates/VerticalTabsConfigurationTemplate/`

## Primary User Goal
Allow users to freely navigate and edit multiple independent configuration sections — each in a dedicated tab — while AppShell, Sidebar, and Header remain intact.

## Presentation Type
Full-screen Main Content replacement. AppShell, Sidebar, Header, and active navigation item remain intact.

## When to Use

```text
- Product configuration (General, Authentication, Network…)
- Integration settings
- Security settings
- Tenant configuration
- Multi-section administration pages
- Long-lived editable configuration
```

Do NOT use when:
- Steps must be completed in strict order → use FullScreenWizardTemplate
- Only one section exists → use FullScreenFormTemplate

## Layout

```
AppShell
├── Sidebar (unchanged)
├── Application Header (unchanged)
└── Main Content
    └── VerticalTabsConfigurationTemplate
        ├── Fixed header (title, subtitle, dirty indicator)
        ├── Body (flex row)
        │   ├── Fixed vertical tab rail (220px, scrollable if tabs overflow)
        │   └── Scrollable active-tab content (owns vertical scroll)
        └── Fixed footer
            ├── Left: Cancel
            └── Right: [secondaryAction?] + Save changes
```

## File Structure

```
src/prototype-templates/VerticalTabsConfigurationTemplate/
  VerticalTabsConfigurationTemplate.tsx        — shell + tab rail component
  VerticalTabsConfigurationTemplate.scss       — layout, rail, footer — tokens only
  VerticalTabsConfigurationTemplate.types.ts   — VerticalTabStatus, VerticalTab, props
  index.ts                                     — exports
```

## Types

```ts
type VerticalTabStatus =
  | 'default' | 'dirty' | 'valid' | 'invalid'
  | 'saving' | 'saved' | 'warning' | 'failed'
  | 'blocked' | 'locked' | 'read-only';

type ConfigurationSaveModel =
  | 'page-level-save' | 'tab-level-save' | 'auto-save' | 'mixed';

interface VerticalTab {
  id: string;
  label: string;
  icon?: ReactNode;
  status?: VerticalTabStatus;
  isLocked?: boolean;
  isReadOnly?: boolean;
  lockedTooltip?: string;
}

interface VerticalTabsConfigurationTemplateProps {
  title: string;
  subtitle?: string;
  tabs: readonly VerticalTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onCancel: () => void;
  onSave: () => void;
  saveLabel?: string;         // default: 'Save changes'
  cancelLabel?: string;       // default: 'Cancel'
  canSave?: boolean;          // default: true
  isSaving?: boolean;
  isDirty?: boolean;          // shows "Unsaved changes" indicator
  saveModel?: ConfigurationSaveModel;
  secondaryAction?: ReactNode;
  children: ReactNode;        // active-tab content rendered in scrollable area
}
```

## Tab Status to Rail Indicator

| Status | Rail indicator |
|---|---|
| `dirty` | Blue dot |
| `invalid` | Error circle icon (red) |
| `warning` | Warning triangle (amber) |
| `saved` | Check icon (green) |
| `locked` | Lock icon |
| `saving` | Tab click blocked |
| All others | No indicator |

## Tab Click Rules

| Status | Openable? |
|---|---|
| `default`, `dirty`, `valid`, `saved`, `warning`, `failed`, `read-only` | Yes |
| `invalid`, `blocked` | Yes (allow user to fix) |
| `saving` | No (in-flight mutation) |
| `locked` or `isLocked=true` | No (cursor not-allowed, tooltip if set) |

## Scroll Ownership

```text
Fixed: header, tab rail, footer
Scrollable: active-tab content region (.vtc-tpl__content)
Tab rail scrolls independently only when tab list overflows
Validation scrolls inside content only
```

## Save Models

| Model | When to use |
|---|---|
| `page-level-save` (default) | All dirty tabs saved together on footer Save |
| `tab-level-save` | Each tab has own inline Save action |
| `auto-save` | Backend supports frequent idempotent updates (never for secrets) |
| `mixed` | Explicitly documented hybrid |

## Tokens Used

```
$color-dialog-bg, $color-dialog-separator
$color-background-darkest, $color-nav-bg-selected
$color-text-light, $color-nav-text-idle
$color-primary, $color-status-error, $color-status-warning, $color-status-success
$color-wizard-text-title-not-visited, $color-wizard-text-title-current
$spacing-*, $font-size-*, $font-weight-*, $border-radius-*, $transition-fast
@include flex-between, @include flex-col, @include text-truncate, @include ds-scrollbar
```

## Usage Pattern

```tsx
import { VerticalTabsConfigurationTemplate } from '../../prototype-templates/VerticalTabsConfigurationTemplate';
import type { VerticalTab } from '../../prototype-templates/VerticalTabsConfigurationTemplate';

const TABS: VerticalTab[] = [
  { id: 'general',    label: 'General',        status: 'saved' },
  { id: 'auth',       label: 'Authentication', status: 'dirty' },
  { id: 'network',    label: 'Network',        status: 'default' },
  { id: 'advanced',   label: 'Advanced',       isLocked: true, lockedTooltip: 'Complete General setup first' },
];

<VerticalTabsConfigurationTemplate
  title="Migration Configuration"
  tabs={TABS}
  activeTab={activeTab}
  onTabChange={setActiveTab}
  onCancel={handleCancel}
  onSave={handleSave}
  isDirty={isDirty}
  canSave={isValid}
  isSaving={saving}
>
  {activeTab === 'general'  && <GeneralSettings />}
  {activeTab === 'auth'     && <AuthSettings />}
  {activeTab === 'network'  && <NetworkSettings />}
  {activeTab === 'advanced' && <AdvancedSettings />}
</VerticalTabsConfigurationTemplate>
```

## Rules

- Template owns layout, tab rail, and footer only. Tab content is always `children`.
- Do not add tab-specific logic inside `VerticalTabsConfigurationTemplate`.
- Cross-tab dependency reset confirmation is the consumer's responsibility.
- Unsaved-changes guard on page exit is the consumer's responsibility.
- Timeout = unknown-outcome — consumer handles `isSaving` + error state.
- Do not persist passwords, SSH keys, or secrets.
- Do not add inline styles or new tokens.
- SVG icons only.
