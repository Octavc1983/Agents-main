# Component Registry

Tracks known shared components, feature components, and page composition templates. Updated by the Shared Architecture Agent.

---

## Design System Components

All DS components are consumed from the `@cyberark/design-system` external package. Source lives in `packages/design-system/`. Do NOT import from `src/components/ui/` or `packages/design-system/src/` directly.

| Component | Import | Status | Notes |
|---|---|---|---|
| Button | `@cyberark/design-system` | Active | main / secondary / text variants |
| FilterButton | `@cyberark/design-system` | Active | |
| IconButton | `@cyberark/design-system` | Active | |
| SplitButton | `@cyberark/design-system` | Active | |
| Accordion | `@cyberark/design-system` | Active | |
| ActionMenu | `@cyberark/design-system` | Active | |
| Card | `@cyberark/design-system` | Active | icard BEM, dark/light/gradient |
| Input | `@cyberark/design-system` | Active | |
| Select | `@cyberark/design-system` | Active | |
| Checkbox | `@cyberark/design-system` | Active | |
| Chip | `@cyberark/design-system` | Active | |
| Badge | `@cyberark/design-system` | Active | |
| Skeleton | `@cyberark/design-system` | Active | |
| Tabs | `@cyberark/design-system` | Active | |
| CopyButton | `@cyberark/design-system` | Active | |
| DateRangePicker | `@cyberark/design-system` | Active | |
| SelectionBar | `@cyberark/design-system` | Active | bulk action toolbar |
| EmptyState | `@cyberark/design-system` | Active | |
| ErrorState | `@cyberark/design-system` | Active | |
| LoadingState | `@cyberark/design-system` | Active | |
| ThemeProvider | `@cyberark/design-system/theme` | Active | Wrap app root once |
| useThemeMode | `@cyberark/design-system/theme` | Active | Hook for theme mode access |
| NavIcons | `@cyberark/design-system/icons` | Active | SVG icon components |
| SpaceIcons | `@cyberark/design-system/icons` | Active | SVG icon components |

### DS Package Import Map

| What | Import Path |
|---|---|
| Components | `import { Button, Card, ... } from '@cyberark/design-system'` |
| ThemeProvider / useThemeMode | `import { ThemeProvider, useThemeMode } from '@cyberark/design-system/theme'` |
| Icons (SVG) | `import { SomeIcon } from '@cyberark/design-system/icons'` |
| Global CSS custom properties | `import '@cyberark/design-system/styles'` (once, in app root only) |
| Shared types | `import type { ... } from '@cyberark/design-system/types'` |

### Forbidden Imports in `src/`

The following import patterns are forbidden in all files under `src/`:

- `import { Button } from '../../components/ui/Button/Button'` — use `@cyberark/design-system`
- `import '../../styles/_variables.scss'` — use `@cyberark/design-system/styles` (imported once at app root) or token variables via the DS package
- Any import from `packages/design-system/src/` — always go through the published package path

---

## Shared Feature Components

_None yet. Candidates are identified by the Shared Architecture Agent._

---

## Page Composition Templates

| Template | Path | Status |
|---|---|---|
| CardListMasterDetailsTemplate | src/prototype-templates/CardListMasterDetailsTemplate/ | Active |
| TableFiltersTemplate | src/prototype-templates/TableFiltersTemplate/ | Active |

---

## Candidates

_Populated by the Shared Architecture Agent._
