# DetailsPageTemplate — Page Composition Template Specification

## Status
Approved

## Approval Conditions
- No custom DS primitive required — uses Button, ActionMenu, Tabs, Card, existing layout patterns ✓
- All required DS components verified as available ✓
- `StatusIcon` (shared application primitive — `src/components/shared/StatusIcon/` — not a DS package export) for entity status ✓
- `SeverityBadge` (DS) for risk severity metadata only ✓
- `ActionMenu` (DS) for contextual actions ✓
- `Tabs` (DS) for content section navigation ✓

## Template ID
`details-page`

## Path
`src/prototype-templates/DetailsPageTemplate/` *(not yet implemented — Approved)*

## Primary User Goal
Give users a complete, structured view of one entity — its identity, status, health, configuration, activity, relationships, and contextual actions — without requiring them to navigate away from the current AppShell context.

## Presentation Type
Full-screen Main Content replacement. AppShell, Sidebar, Header, and active navigation item remain intact. Active sidebar item does NOT change — the details page is a sub-view of the same section.

## When to Use

```text
- Managed account details
- Connector details
- Migration run details
- Risk finding details
- Secret details
- Integration details
- Any entity that requires breadth: metadata + status + config + activity + relationships
- Entry from: table row click, FATLINES list row click, master details panel, search result, notification, deep link
```

## When NOT to Use

```text
- Comparing an entity against list context is more important than full detail
  → use TableMasterDetailsTemplate or CardListMasterDetailsTemplate (details panel)
- Short contextual inspection only (3–5 fields)
  → use a Drawer or inline details panel
- Entity does not yet exist and user needs to create it
  → use FullScreenFormTemplate
```

## Layout

```
AppShell (intact)
├── Sidebar (unchanged — active item does not change)
├── Application Header (unchanged)
└── Main Content
    └── DetailsPageTemplate
        ├── Page Header (fixed or sticky)
        │   ├── Back navigation → returns to originating list/context
        │   ├── Entity title (primary name)
        │   ├── Entity primary identifier (ID, username, etc.)
        │   ├── 24px StatusIcon + localized status label
        │   └── Contextual actions (Button or ActionMenu)
        ├── Optional Summary Strip
        │   ├── Key metadata (2–5 fields)
        │   ├── Health / status indicators
        │   └── Important relationships
        ├── Scrollable Content Area (owns vertical scroll)
        │   ├── DS Tabs (Overview | Configuration | Activity | Logs | Related)
        │   └── Active tab content
        └── Optional contextual footer (fixed, when tab has save/edit actions)
```

## DS Primitives Used

| Primitive | Source | Verified |
|---|---|---|
| `Button` | `@idira/design-system` | ✓ |
| `ActionMenu` | `@idira/design-system` | ✓ |
| `Tabs` | `@idira/design-system` | ✓ |
| `Card` | `@idira/design-system` | ✓ for summary strip sections |
| `SeverityBadge` | `@idira/design-system` | ✓ for risk severity metadata only |

## Shared Application Primitives Used

| Primitive | Source | Notes |
|---|---|---|
| `StatusIcon` | `src/components/shared/StatusIcon/` | Entity operational status — 24px, accessible label |

## StatusIcon vs SeverityBadge — Required Mapping

```text
Entity operational status (active, inactive, pending, failed, locked, etc.)
→ 24px StatusIcon (shared) + localized label

Risk severity (Critical, High, Medium, Low, Informational)
→ SeverityBadge (DS)
```

Do not use `SeverityBadge` for operational status.

## Known Limitations

None. All required DS primitives are available.

## Open DS Gaps

None at this time.

## Prototype Note

This is a UX prototype. Entity data comes from centralized typed mock fixtures in `src/mock/`. Deep links resolve to mock entities. Permission states are simulated. Activity/logs content is mock data only — no real log artifacts.

## Required States

```ts
export type DetailsPageState =
  | 'loading'
  | 'ready'
  | 'not-found'
  | 'permission-denied'
  | 'read-only'
  | 'stale'
  | 'error'
  | 'entity-deleted';
```

## Types

```ts
export interface DetailsPageTemplateProps {
  pageState: DetailsPageState;
  entityTitle: string;
  entityIdentifier?: string;
  entityStatus?: StatusValue;    // from shared StatusIcon types
  statusLabel?: string;
  contextualActions?: React.ReactNode;
  summaryStrip?: React.ReactNode;
  tabs?: ReadonlyArray<{ id: string; label: string; content: React.ReactNode }>;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  onBack: () => void;
  footer?: React.ReactNode;
}
```

## Navigation Rules

### Back Behavior
- Back must return to the originating list/view
- Restore supported context: filters, search, sort, pagination, scroll position, selected entity (where supported)
- Do not return to a generic landing page

### Entry Points
| Entry | Back target |
|---|---|
| Table row click | Table with restored filter/sort/scroll |
| FATLINES list row click | FATLINES list with restored state |
| Master details panel → "Open full page" | Return to master details panel |
| Search result | Search results page |
| Notification | Return to notification list or originating view |
| Deep link | Return to entity's parent list |

### Sidebar
Active sidebar item does NOT change when navigating into a details page.
Do not modify navigation from within DetailsPageTemplate.

### Deep Links
Deep links must resolve safe entity access:
- Verify entity exists → if not: render `not-found` state
- Verify permission → if denied: render `permission-denied` state
- Verify entity is not deleted → if deleted: render `entity-deleted` state

## State Behaviors

| State | What to show |
|---|---|
| `loading` | Skeleton matching real page structure (SkeletonLoadingIntelligenceAgent) |
| `ready` | Full entity content |
| `not-found` | EmptyState DS component — entity does not exist |
| `permission-denied` | Permission error — accessible copy, no raw error |
| `read-only` | All actions disabled; read-only badge in header |
| `stale` | Stale data indicator + refresh action |
| `error` | Error state with retry option |
| `entity-deleted` | Entity was deleted — return to list option |

## Content Tab Guidance

| Tab | Content | Sensitive data rule |
|---|---|---|
| Overview | Key fields, status, health, primary metadata | — |
| Configuration | Settings and config fields | Never show secrets, passwords, SSH keys in plain text |
| Activity / Audit | Event log, change history | No raw backend traces |
| Logs / Reports | Operation logs, migration reports | Mock only; no real log artifacts; never expose secrets or stack traces |
| Related | Related entities, relationships | — |

## Scroll Ownership

```text
Page header        → sticky (scrolls away after threshold) or fixed (design decision per instance)
Summary strip      → part of header or first content section
Scrollable content → owns vertical scroll (overflow-y: auto; @include ds-scrollbar)
Contextual footer  → fixed when present
```

## Accessibility

- Back navigation is a `<button>` or `<a>` with clear label ("Back to Accounts") ✓
- Entity status has accessible label via `aria-label` or visible text ✓
- All tabs have correct `role="tab"`, `aria-selected`, `role="tabpanel"` (DS Tabs) ✓
- Contextual actions have accessible labels ✓
- Sensitive content never exposed in accessible text (aria-label must not contain secret values) ✓

## Tokens Used

```text
$color-background-darkest (header background)
$color-dialog-separator (dividers)
$color-text-light, $color-nav-text-idle
$spacing-*, $font-size-*, $font-weight-*, $border-radius-*, $transition-fast
@include ds-scrollbar
@include text-truncate (entity title and identifier)
```

## Rules

- Active sidebar item must not change when navigating to a details page
- Back must restore originating context — not generic navigation
- StatusIcon (shared) for operational status — not SeverityBadge
- SeverityBadge (DS) for risk severity — not StatusIcon
- Logs/activity must not expose secrets, passwords, SSH keys, or raw backend traces
- All actions use approved DS Button and ActionMenu patterns
- No inline styles
- SVG icons only
- All user-facing copy localized

## First Instance
Managed Account details page (anticipated).

## Related Decisions
- DEC-004 — Timeout = unknown-outcome
- DEC-007 — Focus restoration
- DEC-016 — Account creation uses FullScreenWizardTemplate (details page is read/edit, not create)
