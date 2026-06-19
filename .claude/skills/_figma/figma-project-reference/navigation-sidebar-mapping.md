# Navigation Sidebar Mapping

## Figma Source
- **File**: Scans-UX-Production
- **URL**: https://www.figma.com/design/txftdwRFKBCB4levBy67zM/Scans-UX-Production?node-id=592-25414
- **Extraction method**: IDIRA DS tokens already in project (same org); Figma login wall prevented direct MCP read

---

## Changes Made

### Sidebar width
| Before | After |
|---|---|
| 280px | 240px |

### Background colour
| Before | After |
|---|---|
| `var(--color-bg-secondary)` (#f9f9f9 light) | `$color-background-dark` (#17243b IDIRA dark navy) |

### Border
- **Before**: `1px solid var(--color-border-light)` (light grey)
- **After**: `1px solid $color-border-dark` (#283f67 IDIRA dark blue border)

### Brand / logo area (new)
- Added `sidebar__brand` block at top with IDIRALogoIcon SVG + "IDIRA / Identity Security" text
- Border-bottom: `$color-border-dark`

### Nav item idle state
- **Before**: `color: var(--color-text-secondary)` on light bg
- **After**: `color: rgba(#fff, 0.72)` on dark bg

### Nav item hover state
- **Before**: light grey `var(--color-bg-tertiary)` fill
- **After**: `rgba(#fff, 0.07)` fill + white text

### Nav item active / selected state
- **Before**: solid `var(--color-primary)` fill (bright purple pill)
- **After**: `linear-gradient(135deg, #223658 → #1d2d49)` fill + white left accent bar (3px, `$color-primary` #7a80ff) + icon colour `$color-primary`

### Nav item radius
- **Before**: `$border-radius-base` (0.5rem = 8px)
- **After**: `$border-radius-base` (8px) — unchanged

### Icon
- **Before**: emoji/unicode via `NavigationIcon` DS component
- **After**: inline SVG React components from `src/assets/icons/NavIcons.tsx`; 20×20px

### Label
- **Before**: `@include body-small` (14px)
- **After**: `font-size: $font-size-sm` (14px), `font-weight: $font-weight-medium` — same effective size

### Footer area (new)
- Added `sidebar__footer` with settings link at bottom, separated by `$color-border-dark` border-top

### Collapsed state
- Width: 56px (was 64px)
- Label, logo-text, section-titles hidden

---

## SVG Icons Used in Sidebar

All icons are inline SVG components — no raster, no fonts, no external libs.

| Label | Icon component | Source |
|---|---|---|
| Home | `HomeIcon` | Recreated SVG |
| Scans | `ScansIcon` | Recreated SVG |
| Infrastructure | `InfrastructureIcon` | Recreated SVG |
| Policies | `PoliciesIcon` | Recreated SVG |
| Access Requests | `AccessRequestsIcon` | Recreated SVG |
| Reports | `ReportsIcon` | Recreated SVG |
| Audit | `AuditIcon` | Recreated SVG |
| Settings | `SettingsIcon` | Recreated SVG |
| Security | `SecurityIcon` | Recreated SVG |
| Design System | `TelescopeIcon` | Recreated SVG |
| Assets Table | `InventoryIcon` | Recreated SVG |
| Agent Prompts | `PlayCircleIcon` | Recreated SVG |

Icon file location: `src/assets/icons/NavIcons.tsx`

---

## Tokens Mapped

| Property | Token |
|---|---|
| Sidebar bg | `$color-background-dark` (#17243b) |
| Sidebar border | `$color-border-dark` (#283f67) |
| Active gradient start | `$color-tab-vertical-bg-selected-1` (#223658) |
| Active gradient end | `$color-tab-vertical-bg-selected-2` (#1d2d49) |
| Active accent / icon | `$color-primary` (#7a80ff) |
| Active shadow | `$color-primary-dark` (#8756d8) |
| Text idle | `rgba($color-text-light, 0.72)` |
| Text active | `$color-text-light` (#ffffff) |
| Text muted | `$color-text-muted` (#d6e3fb) |

---

## Pixel Perfect Gaps

- Exact Figma sidebar width cannot be confirmed without authenticated MCP read (assumed 240px from IDIRA DS patterns)
- Exact sidebar item height not confirmed (used 36px min-height from DS convention)
- Logo area is a prototype approximation — exact Figma logo SVG not available
- Active item left accent bar is a prototype inference; exact Figma treatment not confirmed
- Collapsed state is prototype-only (Figma frame node-id 592-25414 may show only expanded)

---

## Files Changed

| File | Change |
|---|---|
| `src/components/layout/Sidebar/Sidebar.tsx` | Replaced `NavigationIcon` DS component with SVG icons; added brand area + footer |
| `src/components/layout/Sidebar/Sidebar.scss` | Full dark-theme restyle to IDIRA |
| `src/assets/icons/NavIcons.tsx` | New file — all sidebar + page SVG icons |
| `src/mock/prototypeMockData.ts` | Added Scans nav entry |

---

## Manual Review Required

- [ ] Confirm sidebar width matches Figma (240px assumed)
- [ ] Confirm active item treatment (gradient + left bar vs solid fill)
- [ ] Confirm logo / brand area design
- [ ] Confirm item height (36px min-height)
- [ ] Confirm icon sizes (20px assumed)
- [ ] Confirm collapsed state behaviour
