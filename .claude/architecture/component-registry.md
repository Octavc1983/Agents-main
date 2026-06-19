# Component Registry

Tracks known shared components, feature components, and page composition templates. Updated by the Shared Architecture Agent.

---

## Design System Components

All DS components are consumed from the `@idira/design-system` external package. Source lives in `packages/design-system/`. Do NOT import from `src/components/ui/` or `packages/design-system/src/` directly.

| Component | Import | Status | Notes |
|---|---|---|---|
| Button | `@idira/design-system` | Active | main / secondary / text variants |
| FilterButton | `@idira/design-system` | Active | |
| IconButton | `@idira/design-system` | Active | |
| SplitButton | `@idira/design-system` | Active | |
| Accordion | `@idira/design-system` | Active | |
| ActionMenu | `@idira/design-system` | Active | |
| Card | `@idira/design-system` | Active | icard BEM, dark/light/gradient |
| Input | `@idira/design-system` | Active | |
| Select | `@idira/design-system` | Active | |
| Checkbox | `@idira/design-system` | Active | |
| Chip | `@idira/design-system` | Active | |
| Badge | `@idira/design-system` | Active | |
| Skeleton | `@idira/design-system` | Active | |
| Tabs | `@idira/design-system` | Active | |
| CopyButton | `@idira/design-system` | Active | |
| DateRangePicker | `@idira/design-system` | Active | |
| SelectionBar | `@idira/design-system` | Active | bulk action toolbar |
| EmptyState | `@idira/design-system` | Active | |
| ErrorState | `@idira/design-system` | Active | |
| LoadingState | `@idira/design-system` | Active | |
| ThemeProvider | `@idira/design-system/theme` | Active | Wrap app root once |
| useThemeMode | `@idira/design-system/theme` | Active | Hook for theme mode access |
| NavIcons | `@idira/design-system/icons` | Active | SVG icon components |
| SpaceIcons | `@idira/design-system/icons` | Active | SVG icon components |

### DS Package Import Map

| What | Import Path |
|---|---|
| Components | `import { Button, Card, ... } from '@idira/design-system'` |
| ThemeProvider / useThemeMode | `import { ThemeProvider, useThemeMode } from '@idira/design-system/theme'` |
| Icons (SVG) | `import { SomeIcon } from '@idira/design-system/icons'` |
| Global CSS custom properties | `import '@idira/design-system/styles'` (once, in app root only) |
| Shared types | `import type { ... } from '@idira/design-system/types'` |

### Forbidden Imports in `src/`

The following import patterns are forbidden in all files under `src/`:

- `import { Button } from '../../components/ui/Button/Button'` — use `@idira/design-system`
- `import '../../styles/_variables.scss'` — use `@idira/design-system/styles` (imported once at app root) or token variables via the DS package
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
