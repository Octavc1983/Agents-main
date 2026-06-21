# HalfDashboardTemplate — Page Composition Template Specification

## Status
Implemented

## Path
`src/prototype-templates/HalfDashboardTemplate/`

## Primary User Goal
Present a compact, data-dense summary of a domain (risks, findings, coverage) in a single card that combines categorical breakdowns, a time-series chart, and KPI metrics side by side — all visible without scrolling.

## Presentation Type
Full page section. Single outer DS Card containing a 3-column horizontal layout. Not a modal. Not a wizard.

## Layout

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  [Title — e.g. "Total findings 12,456"]               [KPI1] [KPI2] [KPI3]  │
│  ┌─────────────────────┬───────────────────────────┬───────────────────────┐ │
│  │  Left Panel         │  Center Panel             │  Right Panel          │ │
│  │  Category breakdown │  Line chart               │  KPI sidebar          │ │
│  │                     │  + time range selector    │  (dark bg card)       │ │
│  │  ┌──┬──┬──┐         │                           │  98%                  │ │
│  │  │  │  │  │  top    │  [PrimeReact Chart]       │  Label                │ │
│  │  ├──┼──┼──┤  ─────  │                           │  [Badge]              │ │
│  │  │  │  │  │  bottom │  ○ Legend label            │  ─────               │ │
│  │  └──┴──┴──┘         │                           │  86% ...              │ │
│  └─────────────────────┴───────────────────────────┴───────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────┘
```

- **Left panel** (`1fr`): domain header row (title + severity KPI pills), then 2-row bordered tile grid (top row N cols, bottom row M cols). Each tile: `height: 147px, padding: 20px, gap: 12px`, collapsed borders, outer-corner radius `14px`.
- **Center panel** (`minmax(300px, 600px)`): chart title + `SelectButton` time range, `PrimeReact <Chart type="line">` with gradient fill, legend. Separated by `::after` divider lines.
- **Right panel** (`188px`): dark background (`$color-page-background`), `border-radius: 12px`, stacked KPI items (`value + label + Badge`), `gap: 24px`.
- Columns separated by `1px $color-border-dark` vertical dividers (`::after` pseudo-elements). Gaps: 40px left/right of chart, 24px right of chart / left of KPI.

## File Structure

```
src/prototype-templates/HalfDashboardTemplate/
  HalfDashboardTemplate.tsx        — shell component
  HalfDashboardTemplate.scss       — layout tokens
  HalfDashboardTemplate.types.ts   — props and data contracts
  index.ts                         — exports
```

## Props API

```ts
interface HalfDashboardCategoryTile {
  id: string;
  label: string;
  total: number;
  critical: number;
}

interface HalfDashboardKpiItem {
  id: string;
  value: string;
  label: string;
  badge: string;
  badgeColor: 'critical' | 'high' | 'medium' | 'low' | 'success' | 'info' | 'neutral';
}

interface HalfDashboardTimeRange {
  id: string;
  label: string;
}

interface HalfDashboardChartSeries {
  label: string;
  data: number[];
  borderColor: string;
  gradientFrom: string;  // rgba top stop
  gradientTo: string;    // rgba bottom stop (transparent)
}

interface HalfDashboardHeaderKpi {
  icon: React.ReactNode;
  value: number;
  label: string;
}

interface HalfDashboardTemplateProps {
  title: string;                        // e.g. "Total findings 12,456"
  headerKpis: HalfDashboardHeaderKpi[]; // severity icon + count + label pills
  topRowTiles: HalfDashboardCategoryTile[];   // first grid row (N tiles)
  bottomRowTiles: HalfDashboardCategoryTile[]; // second grid row (M tiles)
  chartTitle: string;                   // e.g. "Progress over time"
  chartLabels: string[];                // X-axis labels per active time range
  chartSeries: HalfDashboardChartSeries[];
  timeRanges: HalfDashboardTimeRange[];
  defaultTimeRange: string;
  kpiItems: HalfDashboardKpiItem[];
}
```

## Required States

| State | Behavior |
|---|---|
| Default | All data populated, chart renders, tiles show values |
| Time range change | Chart data updates, labels update, no full remount |
| Loading | Skeleton tiles, skeleton chart area, skeleton KPI values |
| Empty | Empty state message inside the outer card |

## DS Components Used

| Component | Usage |
|---|---|
| `Card` | Outer container (size="auto") |
| `SelectButton` | Time range picker |
| `Badge` | KPI item status badges |
| `PrimeReact Chart` | Line chart with gradient fill |

## No New DS Components

All layout is prototype-layer only. No DS tokens are added.

## Technical Writing Requirements

- Chart legend label must match the DS terminology registry
- KPI badge labels must use approved microcopy patterns
- Category tile labels must use approved domain terms

## Accessibility Requirements

- Category bars: `role="progressbar"` with `aria-valuenow/min/max`
- Chart: `aria-label` on the chart container
- Time range: `SelectButton` uses `role="group"`
- KPI panel: semantic `<dl>` recommended for value/label pairs

## Detection Signals

Use HalfDashboardTemplate when:
- A single outer card contains a breakdown grid + a chart + KPI metrics
- The layout is horizontal, not stacked
- There is no navigation tab, no master-details split, no wizard
- The screen name contains: dashboard, overview, summary, risk management, findings overview

## Future Reuse Cases

- Compliance Overview
- Identity Risk Summary
- Scan Health Dashboard
- Coverage Overview
- Any "X at a glance" summary panel
