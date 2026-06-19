# Design System Package Registry

Documents the `@cyberark/design-system` external package structure, ownership boundaries, import rules, and what stays in `src/`.

---

## Package Overview

All generic UI components, tokens, icons, and theme infrastructure have been extracted from `src/` into the `@cyberark/design-system` package. The source lives at `packages/design-system/` in the monorepo. Consumers always import from the published package name — never from the source path.

---

## Package Entry Points

| Entry Point | Contents | Usage |
|---|---|---|
| `@cyberark/design-system` | All UI components | `import { Button, Card, Chip, ... } from '@cyberark/design-system'` |
| `@cyberark/design-system/theme` | ThemeProvider, useThemeMode | `import { ThemeProvider, useThemeMode } from '@cyberark/design-system/theme'` |
| `@cyberark/design-system/icons` | All SVG icon components (NavIcons, SpaceIcons) | `import { SomeIcon } from '@cyberark/design-system/icons'` |
| `@cyberark/design-system/styles` | Global CSS custom properties (design tokens) | `import '@cyberark/design-system/styles'` — **once only, in app root** |
| `@cyberark/design-system/types` | Shared component and theme TypeScript types | `import type { ButtonProps, ... } from '@cyberark/design-system/types'` |

---

## Components in the Package

| Component | Entry Point | Notes |
|---|---|---|
| Button | `@cyberark/design-system` | main / secondary / text variants |
| FilterButton | `@cyberark/design-system` | |
| IconButton | `@cyberark/design-system` | |
| SplitButton | `@cyberark/design-system` | |
| Card | `@cyberark/design-system` | icard BEM, dark/light/gradient |
| Input | `@cyberark/design-system` | |
| Select | `@cyberark/design-system` | |
| Checkbox | `@cyberark/design-system` | |
| Chip | `@cyberark/design-system` | |
| Badge | `@cyberark/design-system` | |
| Skeleton | `@cyberark/design-system` | use for loading states |
| Tabs | `@cyberark/design-system` | |
| Accordion | `@cyberark/design-system` | |
| ActionMenu | `@cyberark/design-system` | |
| CopyButton | `@cyberark/design-system` | |
| SelectionBar | `@cyberark/design-system` | bulk action toolbar |
| DateRangePicker | `@cyberark/design-system` | |
| EmptyState | `@cyberark/design-system` | |
| ErrorState | `@cyberark/design-system` | |
| LoadingState | `@cyberark/design-system` | |
| ThemeProvider | `@cyberark/design-system/theme` | Wrap app root once |
| useThemeMode | `@cyberark/design-system/theme` | Hook for reading/setting theme mode |
| NavIcons | `@cyberark/design-system/icons` | Inline SVG React components |
| SpaceIcons | `@cyberark/design-system/icons` | Inline SVG React components |

---

## What Stays in `src/`

The following are application-layer concerns and must NOT be moved to the DS package:

| Category | Location | Notes |
|---|---|---|
| AppShell | `src/components/layout/AppShell/` | Global layout wrapper — never replace |
| Sidebar | `src/components/layout/Sidebar/` | Navigation shell — never replace |
| Header | `src/components/layout/Header/` (if present) | App header — never replace |
| Router | `src/app/router.tsx` | React Router config — never replace |
| spacesRegistry | `src/` (spaces config) | Application-level space/nav registry |
| Pages | `src/pages/` | All product pages |
| Prototype templates | `src/prototype-templates/` | Page composition templates |
| Feature hooks | `src/` hooks | Feature-specific React hooks |
| Domain types | `src/types/prototype.types.ts` | Scan, ABTest, AccountUser, etc. |
| Mock data | `src/mock/` | prototypeMockData.ts, etc. |
| API contracts | `src/` (feature layer) | ScanListQuery, etc. |

---

## Import Rules

### Allowed

```ts
// DS components
import { Button, Card, Chip, Skeleton } from '@cyberark/design-system';

// DS theme
import { ThemeProvider, useThemeMode } from '@cyberark/design-system/theme';

// DS icons (SVG only)
import { SomeNavIcon } from '@cyberark/design-system/icons';

// DS shared types
import type { ButtonProps } from '@cyberark/design-system/types';

// Domain types (project-level, stays in src/)
import type { Scan, ScanStatus } from '../../types/prototype.types';
```

### Forbidden in `src/`

```ts
// FORBIDDEN — old local component import
import { Button } from '../../components/ui/Button/Button';

// FORBIDDEN — old local SCSS token import (except in remaining unmigrated src/ UI layer files)
import '../../styles/_variables.scss';

// FORBIDDEN — importing directly from the package source
import { Button } from '../../../packages/design-system/src/components/Button';
```

---

## Token / Styling Rules

- Global CSS custom properties (design tokens) are injected once via `import '@cyberark/design-system/styles'` in the app root (`src/app/App.tsx` or equivalent).
- All SCSS in `src/` must reference CSS custom property variables (e.g. `var(--color-primary)`) or DS-defined SCSS token variables.
- Do not hardcode hex colors, spacing, radius, shadows, or typography values.
- Do not create new SCSS tokens in `src/` unless explicitly approved and there is no DS equivalent.

---

## Icon Rules

- SVG icons only. No icon libraries (Heroicons, FontAwesome, etc.), no PNG/JPG, no emoji, no icon fonts.
- All icons must be imported from `@cyberark/design-system/icons`.
- Do not add new icons directly to `src/assets/icons/` — they belong in `packages/design-system/`.

---

## Governance

- The DS package source (`packages/design-system/`) is owned separately from the app (`src/`).
- Do not modify `packages/design-system/src/` from within a page or feature implementation workflow.
- If a required component does not exist in the DS package, report it as a gap — do not create a one-off local copy.
- Component additions to the DS package require explicit approval and must follow the DS contribution process.
