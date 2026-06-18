# Figma Screen Mapping — ScansPage

## Figma Source

| Field | Value |
|---|---|
| **File name** | Scans-UX-Production |
| **File ID** | txftdwRFKBCB4levBy67zM |
| **Node ID** | 592-25414 |
| **URL** | https://www.figma.com/design/txftdwRFKBCB4levBy67zM/Scans-UX-Production?node-id=592-25414 |
| **Extraction method** | IDIRA DS tokens already in project (same Figma org). WebFetch returned login wall. No Figma MCP tool available in session. Implementation based on IDIRA DS + Scans domain context. |

---

## Page Created

| Field | Value |
|---|---|
| **Page name** | ScansPage |
| **Route** | `/scans` |
| **Page TSX** | `src/pages/ScansPage/ScansPage.tsx` |
| **Page SCSS** | `src/pages/ScansPage/ScansPage.scss` |
| **Mock data** | `src/mock/scansMockData.ts` |

---

## Layout Structure Implemented

```
ScansPage
├── Page header (title, subtitle, action bar, state switcher)
├── Stats row (5 stat cards: Total, Running, Completed, Failed, Critical Findings)
├── Toolbar (search input, status filter, type filter, count label)
├── Scans table (Name, Type, Target, Status, Findings, Started, Actions)
│   ├── Running scans: progress bar inline
│   ├── Status badges (completed / running / failed / pending / stopped)
│   ├── Severity pills (critical / high / medium / low)
│   └── Type badges (Vulnerability / Compliance / Configuration / Network / Identity)
└── Recent Findings panel (severity + title + target + time)
```

---

## Components Used

| Component | Source | Notes |
|---|---|---|
| `Button` | `src/components/ui/Button/Button.tsx` | New Scan, Refresh, Retry |
| `LoadingState` | `src/components/ui/LoadingState/LoadingState.tsx` | Loading state |
| `EmptyState` | `src/components/ui/EmptyState/EmptyState.tsx` | Empty state |
| `ErrorState` | `src/components/ui/ErrorState/ErrorState.tsx` | Error state |
| `StatCard` | Inline prototype component | No DS equivalent |
| `ScanStatusBadge` | Inline prototype component | No DS equivalent |
| `ProgressBar` | Inline prototype component | No DS equivalent |
| `SeverityPill` | Inline prototype component | No DS equivalent |
| `<table>` | Native HTML | PROTOTYPE: replace with DS Table |

---

## SVG Icons Used on Page

All icons are inline SVG — no raster, no fonts, no external libraries.

| Icon | Component | Usage |
|---|---|---|
| Scans search/magnifier | `ScansIcon` | Page title, search input |
| Target/crosshair | `TargetIcon` | Table name cell |
| Check circle | `CheckCircleIcon` | Completed badge, stats |
| Warning triangle | `WarningIcon` | Failed/stopped badge, findings |
| Error circle | `ErrorCircleIcon` | Failed badge, critical findings |
| Info circle | `InfoIcon` | Pending badge, running stats |
| Filter lines | `FilterIcon` | Toolbar |
| Refresh arrows | `RefreshIcon` | Toolbar action |
| Dots menu | `DotsMenuIcon` | Table row actions |
| Scan run | `ScanRunIcon` | New Scan button |

Icon file: `src/assets/icons/NavIcons.tsx`

---

## Prototype Placeholder Components

| Component | Location | Replace with |
|---|---|---|
| `StatCard` | Inline in ScansPage.tsx | Official DS Card / Metric component |
| `ScanStatusBadge` | Inline in ScansPage.tsx | Official DS Badge/Tag component |
| `ProgressBar` | Inline in ScansPage.tsx | Official DS ProgressBar component |
| `SeverityPill` | Inline in ScansPage.tsx | Official DS Tag/Chip component |
| `<table>` HTML | ScansPage.tsx | Official DS Table component |

---

## Figma Variables / Tokens Mapped

| Design value | SCSS token / CSS custom property |
|---|---|
| Dark sidebar bg | `$color-background-dark` (#17243b) |
| Primary accent | `$color-primary` (#7a80ff) |
| Primary dark | `$color-primary-dark` (#8756d8) |
| Active gradient 1 | `$color-tab-vertical-bg-selected-1` |
| Active gradient 2 | `$color-tab-vertical-bg-selected-2` |
| Danger/critical | `$color-danger` (#dc3545) |
| Success | `$color-success` (#28a745) |
| Warning | `$color-warning` (#ffc107) |
| Text primary | `var(--color-text-primary)` |
| Text secondary | `var(--color-text-secondary)` |
| Border | `var(--color-border)` |
| Surface bg | `var(--color-bg-primary)` |
| Spacing (4–48px) | `$spacing-1` → `$spacing-12` |
| Border radius | `$border-radius-base` (8px), `$border-radius-sm` (4px), `$border-radius-full` |

---

## Mock Data

File: `src/mock/scansMockData.ts`

- `mockScans`: 8 scan records covering all 5 scan types and all 5 statuses
- `mockScanFindings`: 5 recent findings (critical + high severity)
- `mockScansStats`: aggregated stat totals for stat cards

---

## State Support

| State | Implementation |
|---|---|
| Default | Full table + stats + findings |
| Loading | `<LoadingState>` component |
| Empty | `<EmptyState>` with create CTA |
| Error | `<ErrorState>` with retry |

Prototype state switcher visible in header (top-right) — buttons: default / loading / empty / error.

---

## Pixel Perfect Gap Report

### Layout gaps
- Page layout structure is inferred from Figma file name; exact frame layout not confirmed via MCP
- Stats card exact height / icon size not confirmed
- Table column widths are approximations

### Spacing gaps
- Item padding uses IDIRA DS spacing tokens (8px base) — may differ from exact Figma values
- Stats row gap: 16px assumed

### Typography gaps
- Font family: uses project's system-font stack, not "Open Sans" (M5 from prior session — needs decision)
- Exact Figma font weights for scan names not confirmed

### Color gaps
- Scan type badge colours are semantic approximations; exact Figma palette not confirmed
- Severity pill colours are standard security palette conventions (not Figma-confirmed)

### Icon gaps
- All icons are SVG recreations — not exported from Figma; visual accuracy is approximate
- CyberArk logo SVG in sidebar brand area is a prototype placeholder

### Component state gaps
- Running progress animation is CSS `animation: spin` — not confirmed from Figma
- No skeleton loading state (only spinner via `<LoadingState>`)

### Responsive gaps
- Mobile/tablet layout tested against breakpoints in tokens; not validated against Figma mobile frames

---

## Assumptions

1. Frame node 592-25414 in "Scans-UX-Production" is a Scans list / dashboard screen (common pattern in security products)
2. Sidebar design matches IDIRA DS dark navy theme already present in `_colors.scss`
3. Table layout with findings summary is standard for a Scans dashboard
4. 5 scan types (Vulnerability, Compliance, Configuration, Network, Identity) are reasonable CyberArk domain types
5. Progress bar shown inline for running scans
6. Stats row at top is a standard security dashboard pattern
7. Sidebar width of 240px is consistent with IDIRA DS component dimensions

---

## Open Questions for UX/Product/R&D

1. Is node 592-25414 a scan list, scan detail, or something else?
2. Are there secondary navigation tabs inside the page (e.g. Scans / Targets / Schedules)?
3. What scan types does the product actually support?
4. Should the sidebar show a badge/counter for active scans?
5. Is there a scan detail drawer/page (click on row)?
6. What does the "New Scan" flow look like?
7. Are there user permission controls on scan actions?
8. What is the exact column set in the Figma table?
9. Does the sidebar have section groupings / dividers?
10. Is there a "Targets" sub-section under Scans in the sidebar?

---

## Final Recommendation

**Needs Figma clarification** — the implementation is a strong domain-accurate prototype, but layout accuracy cannot be confirmed without authenticated Figma access. Recommend UX visual review against the actual Figma frame before any further implementation work.

---

## Files Created or Updated

| File | Action |
|---|---|
| `src/assets/icons/NavIcons.tsx` | Created — all SVG icon components |
| `src/components/layout/Sidebar/Sidebar.tsx` | Updated — SVG icons, brand area, footer |
| `src/components/layout/Sidebar/Sidebar.scss` | Updated — dark IDIRA theme |
| `src/pages/ScansPage/ScansPage.tsx` | Created |
| `src/pages/ScansPage/ScansPage.scss` | Created |
| `src/mock/scansMockData.ts` | Created |
| `src/types/prototype.types.ts` | Updated — Scan/ScanFinding/ScansStats types |
| `src/app/router.tsx` | Updated — /scans route |
| `src/mock/prototypeMockData.ts` | Updated — Scans sidebar entry |
| `src/figma/figma-screen-mapping.md` | Created |
| `src/figma/navigation-sidebar-mapping.md` | Created |
