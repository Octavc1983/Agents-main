# DetailsPageTemplate — Template Contract

## DS Primitives Required

| Component | Package | Verified | Notes |
|---|---|---|---|
| `Button` | `@idira/design-system` | ✓ | Contextual actions in header |
| `ActionMenu` | `@idira/design-system` | ✓ | Overflow actions menu |
| `Tabs` | `@idira/design-system` | ✓ | Content section navigation |
| `Card` | `@idira/design-system` | ✓ | Summary strip sections |
| `SeverityBadge` | `@idira/design-system` | ✓ | Risk severity only — Critical/High/Medium/Low/Informational |
| `EmptyState` | `@idira/design-system` | ✓ | not-found state |
| `Skeleton` | `@idira/design-system` | ✓ | Loading state |

## Shared Application Primitives

| Component | Path | Verified | Notes |
|---|---|---|---|
| `StatusIcon` | `src/components/shared/StatusIcon/` | ✓ | Operational entity status — 24px + accessible label |

## StatusIcon vs SeverityBadge — Mandatory Mapping

```text
Entity operational status (active, inactive, pending, failed, locked, etc.)
→ StatusIcon (shared) at 24px + localized label

Risk severity (Critical, High, Medium, Low, Informational)
→ SeverityBadge (DS)

NEVER swap these.
```

## Props API

```ts
export type DetailsPageState =
  | 'loading' | 'ready' | 'not-found' | 'permission-denied'
  | 'read-only' | 'stale' | 'error' | 'entity-deleted';

export interface DetailsTab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface DetailsPageTemplateProps {
  pageState: DetailsPageState;
  entityTitle: string;
  entityIdentifier?: string;
  entityStatus?: StatusValue;      // from src/components/shared/StatusIcon/
  statusLabel?: string;
  contextualActions?: React.ReactNode;
  summaryStrip?: React.ReactNode;
  tabs?: ReadonlyArray<DetailsTab>;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  onBack: () => void;
  backLabel?: string;              // e.g. "Back to Accounts"
  footer?: React.ReactNode;        // fixed footer for tab-level edit actions
}
```

## Layout Contract

```text
Main Content (fills full area — AppShell intact)
└── DetailsPageTemplate
    ├── Page Header (sticky)
    │   ├── Back navigation (button/link)
    │   ├── Entity title (truncated, title tooltip)
    │   ├── Entity identifier
    │   ├── 24px StatusIcon + localized status label
    │   └── Contextual actions (Button + ActionMenu)
    ├── Summary Strip (optional — Card DS)
    │   └── Key metadata fields
    ├── Scrollable Content Area (owns vertical scroll)
    │   ├── DS Tabs (Overview | Configuration | Activity | Logs | Related)
    │   └── Active tab content
    └── [Optional] Fixed Footer (when tab has save/edit actions)
```

## Scroll Ownership
- Header: sticky (scrolls away at threshold) or fixed (per design)
- Summary strip: part of header area or first scrollable section
- Content area: `overflow-y: auto; @include ds-scrollbar`
- Footer: fixed when present

## Mock Data Contract
Entity data from `src/mock/[domain]MockData.ts` — typed, centralized. Mock entities include all required fields. No mock data in JSX. Deep link mock resolution via entity ID lookup in mock data array.

## Localization Contract
`entityTitle`, `entityIdentifier`, `statusLabel`, `backLabel`, tab labels, field labels — all localized. No hardcoded strings in JSX.
