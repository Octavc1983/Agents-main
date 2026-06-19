# TableFiltersTemplate — Template Specification

## Template Name
TableFiltersTemplate

## Template Category
Table / Search / Filters / Active Filter Chips / Row Actions / Bulk Actions / Bulk Status Dialog

## Status
Implemented

## Primary User Goal
Allow users to quickly find, filter, review, sort, and act on a large set of entities without losing context.

## Best Use Cases
Scans, Accounts, Findings, Rules, Tags, Risks, Inventory, Users, Policies, Platforms

## Do Not Use For
- Pages where the primary interaction is editing a single item (use FormPageTemplate)
- Pages where browsing with persistent side-by-side details is the primary interaction (use CardListMasterDetailsTemplate)
- Single-entity detail views

## Intended Reuse Scope
Any management page with a searchable, filterable list of entities.

---

## Screenshot Interpretation

**Source:** Scans page — 5 reference screenshots

**Visual hierarchy identified:**
- Full-width dark page on IDIRA navy background (`#17243b`)
- Fixed page header: "Scans" title top-left, primary CTA "Define scan type" top-right
- Toolbar row: Filter button + search input (left) · updated-at + refresh (right)
- Selection summary row: "18 selected" label
- Optional filter panel: slides in from left (260px), narrows the table
- Active filter chips row: shown when filters are active, with "Clear all filters" action
- Data table: full-width, 6 columns (NAME, SCANTYPE, SCHEDULE, TIME, LAST RUN, STATUS)
- Row structure: icon + name + metadata / scan type / schedule / time / last run / status chip + contextual action + three-dots menu
- Details panel (Card List Master Details mode): right 70% panel, tabs (Overview / Latest instances), status banner, scan info grid, scope grid, targets grid
- Status banner at top of details: error state shown prominently in red
- Three status types visible in screenshots: Failed (red X), Completed with errors (amber warning), Completed (green check), Running (green play), Pending (clock), Success (green check)

**Reference-only content (not template structure):**
- Scan names (GCP123_go home, BOM domain, Azure - Entra ID, etc.)
- Domain names, IP addresses, credentials
- Specific date/time values
- The "WIP - Waiting for PM Review" / "WIP - Waiting for TW" banner (prototype status indicator)

---

## Page Anatomy

| Area | Purpose | Required? | Reusable? | Notes |
|---|---|---|---|---|
| AppShell | Page container, sidebar, header | Yes | Existing | Never replaced by template |
| Page title | "Scans" — identifies the entity type | Yes | Slot | Consuming page provides |
| Primary action | "Define scan type" — creates new entity | Optional | Slot | Consuming page provides |
| Secondary actions | Refresh, export, more | Optional | Slot | Consuming page provides |
| Updated-at timestamp | "Updated at 08:58 AM" | Optional | Slot | |
| Refresh button | Reload data | Optional | Slot | |
| Filter trigger | Opens filter panel | Optional | Built-in | Shown when filterGroups provided |
| Search input | Text search across entities | Optional | Built-in | Shows placeholder "Search / Filter" |
| Selection summary | "18 selected" / "8 of 24 items" | Yes | Built-in | Auto-computed |
| Active filter chips | Shows applied filters as removable chips | Optional | Built-in | Shown when filters active |
| Filter panel | Collapsible left panel, ~260px wide | Optional | Built-in | Slides in, narrows table |
| Data table | Core content area | Yes | Built-in | Full-width by default |
| Table column headers | NAME, SCANTYPE, SCHEDULE, TIME, LAST RUN, STATUS | Yes | Slot | Consuming page configures |
| Row icon / avatar | Provider icon (AWS, GCP, Azure, Entra) | Optional | Slot | |
| Row status chip | Status badge per row | Optional | Slot | |
| Row contextual action | "Run" / "Stop" / "Auto fix" — context-aware | Optional | Slot | Changes per row state |
| Row three-dots menu | Overflow menu with row-level actions | Optional | Built-in | Configurable per consuming page |
| Details panel | Right panel, opens on row click | Optional | Slot | CardListMasterDetails variant |
| Bulk action toolbar | Appears when rows are selected | Optional | Built-in | Configurable per consuming page |
| Bulk status dialog | Per-item result after bulk operation | Optional | Built-in | Required for async bulk ops |
| Empty state | No data / no results guidance | Yes | Built-in | Consuming page provides text |
| Error state | Load failure + retry | Yes | Built-in | Consuming page provides text |
| Loading state | Data fetch in progress | Yes | Built-in | Skeleton preferred |

---

## Layout Contract

### AppShell Ownership

The template renders inside the existing AppShell. It does not create:
- Custom Sidebar
- Custom Header
- Custom Router
- Custom global navigation

### Header and Title

`showHeader` prop controls whether the template renders a page title.

When `showHeader={false}`:
- Template does not render a duplicate title
- Consuming page or AppShell Header owns the title

When `showHeader={true}` (default):
- Template renders `title` and optional `description` in its own header region

### Toolbar Layout

```text
Left:  Filter trigger | Search input | Item / selection counter
Right: Updated-at | Refresh | Secondary actions | Primary action
```

### Filter Panel Layout

When `isFiltersOpen`:
```text
Content area = [260px filter panel] + [remaining width table]
```

When `isFiltersOpen` is false:
```text
Content area = [full-width table]
```

The filter panel slides in from the left. The table narrows; it does not scroll off-screen.

### Table Layout

- Full-width by default
- Horizontal scroll when columns exceed container width
- Sticky header optional (not yet implemented — use existing pattern if available)
- Configurable columns
- Optional sort per column
- Optional checkbox selection
- Optional row click action
- Optional contextual action cell (context-aware per row)
- Optional three-dots overflow menu per row

### Details Panel Layout (Master Details variant)

When a row is clicked and `onRowClick` delegates to a details panel:
```text
Left:  ~30% card list / table
Right: ~70% details panel
```

The filter toolbar and chips remain in the same position. The table narrows; the details panel slides in from the right. Closing the panel restores full-width table.

### Scrolling Ownership

- Page content owns vertical scrolling
- Table may own horizontal scrolling
- No nested scrolling unless required by an existing established table pattern

### Persistent Context Toolbar Rule

When the page supports both table view and master-details view:

**The filter toolbar, chips, search, item counter, and bulk toolbar belong to the page — not to the template.**

The template receives derived `visibleItems` and `selectedRowIds` as props. The page owns:
```tsx
searchQuery
draftFilters
appliedFilters
sortState
selectedRowIds
visibleItems
viewMode
selectedItemId
```

Switching view modes replaces only the content area. Nothing in the toolbar jumps, resets, or disappears.

---

## Reusable Slots

| Slot | Required | Content Type | Example |
|---|---|---|---|
| title | Yes | string | Scans |
| description | Optional | string | Review and manage configured scans |
| primaryAction | Optional | React.ReactNode | `<Button>Define scan type</Button>` |
| secondaryActions | Optional | React.ReactNode | Import, Export buttons |
| search | Optional (built-in) | search input | Search / Filter |
| searchPlaceholder | Optional | string | Search / Filter |
| filters | Optional (built-in) | filterGroups config | Scan type, Location type, Status, Schedule |
| activeFilterChips | Optional (built-in) | chips row | Scan type: Windows & *nix from file × |
| itemCounter | Built-in | computed text | 18 selected / 8 of 24 items |
| columns | Yes | TableColumn<T>[] | NAME, SCANTYPE, SCHEDULE, TIME, LAST RUN, STATUS |
| rowActions | Optional | (row: T) => React.ReactNode | Three-dots overflow menu |
| bulkActions | Optional | BulkActionDefinition<T>[] | Add tags, Enable, Disable, Delete |
| bulkStatusDialog | Optional (built-in) | per-item result | Adding tags to 12 scans |
| emptyState | Built-in + configurable | title + description | No scans yet |
| noResultsState | Built-in | auto | No results found. Try adjusting your filters. |
| loadingState | Built-in | skeleton / text | — |
| errorState | Built-in + configurable | title + message | Something went wrong |
| updatedAt | Optional | string | 08:58 AM |
| onRefresh | Optional | () => void | — |

---

## Interaction Contract

| Interaction | Trigger | Expected Behavior | State Impact |
|---|---|---|---|
| Open filter panel | Click Filter button | Panel slides in from left, table narrows | `isFiltersOpen = true`, draft = copy of applied |
| Change draft filter | Select option in panel | Updates draft filters only | `draftFilters` updated |
| Apply filters | Click "Apply filters" | Copies draft to applied, panel closes | `appliedFilters` updated, chips shown |
| Cancel filters | Click Cancel or close X | Discards draft, panel closes | `draftFilters` reset to applied |
| Clear draft filters | Click Clear inside panel | Clears draft only | `draftFilters = {}` |
| Remove filter chip | Click chip close | Removes one applied filter | `appliedFilters` updated |
| Clear all filters | Click "Clear all filters" | Clears all filters and search | All filter/search state cleared |
| Search | Type in search input | Filters rows locally | `searchQuery` updated, `filteredRows` recomputed |
| Clear search | Click X in search | Clears search query | `searchQuery = ''` |
| Sort column | Click column header (if sortable) | Reorders visible rows | `sortState` updated |
| Select row | Click row checkbox | Adds row to selection | `selectedRowIds` updated, bulk toolbar shown |
| Select all | Click header checkbox | Selects all visible filtered rows | Full selection update |
| Deselect all | Click Clear selection | Clears selection | `selectedRowIds = []` |
| Row click | Click anywhere in row (not checkbox/action) | Opens details or navigates | Consuming page handles |
| Open row menu | Click three-dots icon | Shows contextual menu for that row | `activeMenuRowId` updated |
| Select row action | Click item in row menu | Executes or opens confirmation | Depends on action config |
| Close row menu | Click outside / Escape | Closes menu | `activeMenuRowId = null` |
| Start bulk action | Click bulk action button | Opens confirmation or bulk dialog | `bulkOperationState` updated |
| Bulk action complete | Operation finishes | Opens Bulk Status Dialog | Per-item statuses shown |
| Close bulk dialog | Click Close | Closes dialog | Selection cleared if configured |
| Retry failed | Click "Retry failed" | Re-runs operation for failed items only | `bulkOperationState` updated |
| Refresh | Click refresh icon | Reloads data | `isLoading = true`, then data updated |

---

## State Coverage

| State | Required Behavior | Template Responsibility | Consuming Page Responsibility |
|---|---|---|---|
| Default | Full table visible | Render structure | Provide rows and columns |
| Loading | Show loading state, disable actions | Render LoadingState | Provide `isLoading` flag |
| Empty | Show no-data guidance and next action | Render EmptyState | Provide entity text and CTA |
| No results | Explain filter/search result is empty, offer clear | Render "No results found" state | Provide relevant terminology |
| Error | Show load failure and recovery | Render ErrorState | Provide error message and retry |
| Filter panel open | Narrow table, show panel | Manage layout transition | — |
| Filters active | Show chips row | Render chips | — |
| Row selected | Show selection highlight, count in toolbar | Manage selection visuals | — |
| Multiple selected | Show bulk toolbar | Render bulk actions | Provide bulk action config |
| Bulk preparing | Dialog open, items pending | Render Bulk Status Dialog | Provide operation state |
| Bulk in progress | Dialog shows progress per item | Render per-item status | Provide async updates |
| Bulk success | Dialog shows all-success summary | Render success state | — |
| Bulk partial failure | Dialog shows counts, identifies failures | Render failure rows | Provide failure details |
| Bulk all failed | Dialog shows full failure with retry | Render retry action | Provide retryable flag |
| Bulk cancelled | Dialog confirms cancellation | Render cancelled state | — |
| Row action menu open | Menu visible for one row | Render menu | Provide action config |
| Row action destructive | Confirmation dialog before execution | Block execution pending confirmation | Provide confirmation text |
| Details panel open | Table narrows, panel slides in | Support narrowed layout | Provide renderDetails |
| Saving | Lock applicable actions, show progress | Support disabled/saving state | Provide saving flag |

---

## Data Contract Candidates

| Data Need | Suggested Type | Shared Potential | Notes |
|---|---|---|---|
| Table row | `T` (generic) | N/A — consuming page defines | Template is fully generic |
| Column definition | `TableColumn<T>` | High — already in types.ts | Reuse existing type |
| Filter group | `TableFilterGroup` | High | Already defined in template types |
| Filter option | `TableFilterOption` | High | Already defined |
| Applied filter state | `Record<string, string[]>` | High | Used for chips and queries |
| Sort state | `{ column: string; direction: 'asc' \| 'desc' }` | High | Not yet typed in template |
| Bulk action definition | `BulkActionDefinition<T>` | High — needs extraction | New type candidate |
| Row action definition | `RowActionDefinition<T>` | High — needs extraction | New type candidate |
| Bulk operation item result | `BulkOperationItemResult` | High | New type candidate |
| Bulk operation summary | `BulkOperationSummary` | High | New type candidate |
| Empty state config | `{ title: string; description?: string; action?: ReactNode }` | Medium | Already passed as props |
| Scan (domain entity) | `Scan` | Active — src/types/prototype.types.ts | Consuming page maps to columns |

---

## Shared Component Candidates

| Candidate | Category | Evidence | Recommended Ownership | Approval Needed |
|---|---|---|---|---|
| SelectionBar | Existing DS component | Bulk action toolbar pattern | Design System — already exists | None |
| ActionMenu | Existing DS component | Three-dots row action menu | Design System — already exists | None |
| FilterPanel | Page Composition Template built-in | Repeated filter panel structure | Template layer | No DS change |
| ActiveFilterChips | Page Composition Template built-in | Repeated chip behavior | Template layer | No DS change |
| BulkStatusDialog | Shared feature component candidate | Needed for all bulk operations | Shared feature layer | UX + DS review |
| StatusBadge / ScanStatusChip | Shared feature component candidate | Status chip visible in every row | Shared feature layer | UX review |
| ProviderIcon | Shared feature component candidate | AWS/GCP/Azure/Entra icons in every row | Shared feature layer | DS + icon review |

---

## Existing Component Mapping

| UI Need | Existing Component | Import Path | Confidence | Notes |
|---|---|---|---|---|
| Primary action button | Button (primary) | src/components/ui/Button/Button | High | |
| Secondary action button | Button (secondary) | src/components/ui/Button/Button | High | |
| Filter trigger button | FilterButton or Button with icon | src/components/ui/Button/ | High | |
| Bulk action toolbar | SelectionBar | src/components/ui/SelectionBar/ | High | Already in component registry |
| Row three-dots menu | ActionMenu | src/components/ui/ActionMenu/ | High | Already in component registry |
| Icon-only buttons | IconButton | src/components/ui/Button/IconButton | High | |
| Filter icon | FilterIcon | src/assets/icons/NavIcons | High | SVG only |
| Search icon | SearchIcon | src/assets/icons/NavIcons | High | SVG only |
| Close icon | CloseIcon | src/assets/icons/NavIcons | High | SVG only |
| Refresh icon | RefreshIcon | src/assets/icons/NavIcons | High | SVG only |
| Empty state | EmptyState | src/components/ui/EmptyState/ | High | |
| Error state | ErrorState | src/components/ui/ErrorState/ | High | |
| Loading state | LoadingState | src/components/ui/LoadingState/ | High | |
| Status confirmation dialog | No existing dialog component found | — | Low | Needs DS decision |
| Bulk status dialog | No existing bulk result component found | — | Low | Needs UX + DS decision |

---

## Token and Styling Mapping

| Visual Need | Existing Token / Pattern | Gap | Notes |
|---|---|---|---|
| Page background | `$color-page-background` | None | |
| Surface / panel background | `$color-surface-idle` | None | |
| Table row divider | `$color-table-line-idle` | None | |
| Table row hover | `$color-table-bg-hover` | None | |
| Primary action color | `$color-primary` | None | |
| Text primary | `$color-text-light` | None | |
| Text secondary / muted | `$color-nav-text-idle` | None | |
| Border / divider | `$color-divider-1` | None | |
| Status: Failed | Red — needs token confirmation | Possible gap | Check if `$color-status-error` or `$color-danger` exists |
| Status: Completed | Green — needs token confirmation | Possible gap | Check if `$color-status-success` or `$color-success` exists |
| Status: Completed with errors | Amber — needs token confirmation | Possible gap | Check if `$color-status-warning` or `$color-warning` exists |
| Status: Running | Green (play) — same as Completed | Possible gap | |
| Status: Pending | Muted / clock — needs token | Possible gap | |
| Border radius | `$border-radius-sm`, `$border-radius-base` | None | |
| Spacing | Full token set in `$spacing-*` | None | |
| Typography | `$font-size-*`, `$font-weight-*` | None | |
| Transition | `$transition-fast`, `$transition-base` | None | |
| Error banner background | No dedicated token found | Gap | Red background banner in details panel — confirm token |

---

## Technical Writing Alignment

| UI Text Area | Required Terminology Rule | Existing Source | Notes |
|---|---|---|---|
| Page title | Use approved entity plural | Terminology registry | "Scans" — check registry |
| Primary action | Verb-first specific label | UX writing guide | "Define scan type" — check registry for "scan type" vs "Scan type" |
| Search placeholder | Mention searchable entity | Approved microcopy | "Search / Filter" — verify preferred form |
| Filter button | Consistent term across pages | Terminology registry | "Filter" vs "Filters" — register preferred form |
| Apply filters | Standard label | UX writing guide | "Apply filters" — verify |
| Cancel | Must be "Cancel" | UX writing guide | Confirmed in template |
| Clear filters | Clarify scope | UX writing guide | "Clear filters" — correct form |
| Clear all filters | Clarify scope | UX writing guide | "Clear all filters" vs "Clear all" — register preferred form |
| Empty state: no items | Approved pattern | approved-microcopy-patterns.md | "No [items] yet" pattern exists |
| Empty state: no results | Approved pattern | approved-microcopy-patterns.md | "No results found / Try adjusting your filters" pattern exists |
| Error state | Approved pattern | approved-microcopy-patterns.md | "Something went wrong / Refresh the page" pattern exists |
| Loading state | Approved pattern | approved-microcopy-patterns.md | Skeleton preferred |
| Bulk action labels | Describe consequence | Technical writing review | "Add tags", "Delete 3 scans" |
| Status labels | Approved status names | Terminology registry | Failed, Completed, Completed with errors, Running, Pending — register all |
| "Auto fix" | Check if term is registered | Terminology registry | Unregistered — needs TW decision |
| "Fix issue" | Check if term is registered | Terminology registry | Unregistered — needs TW decision |
| "Run" / "Stop" | Check if terms are registered | Terminology registry | Contextual action labels — needs TW decision |
| Details panel: "Overview" / "Latest instances" | Check if terms are registered | Terminology registry | Tab labels — unregistered |

---

## Telemetry Candidates

| Event | Trigger | Safe Metadata | Reason |
|---|---|---|---|
| table_page_viewed | Page loads | page_name, route | Adoption |
| table_search_used | Search query active | page_name, result_count | Search effectiveness |
| table_search_no_results | Zero rows returned | page_name | Search friction |
| table_filters_opened | User opens filter panel | page_name | Discoverability |
| table_filters_applied | User applies filters | filter_group_count, result_count | Filter usability |
| table_filters_cleared | User clears all filters | filter_count | Filter friction |
| table_filter_chip_removed | User removes individual chip | filter_group | Filter behavior |
| table_sort_changed | User clicks sortable column | column_id, sort_direction | Table usability |
| table_row_selected | User selects row checkbox | selection_count | Bulk behavior |
| table_select_all | User clicks header checkbox | visible_count | Bulk behavior |
| table_row_action_opened | User opens row three-dots menu | page_name | Feature discovery |
| table_row_action_selected | User selects action from menu | action_name (not entity data) | Task completion |
| table_bulk_action_started | User confirms bulk action | action_name, selection_count | Bulk workflow |
| table_bulk_action_completed | Operation finishes | action_name, total, succeeded, failed | Outcome quality |
| table_bulk_partial_failure | Some items fail | action_name, failure_count, error_category | Reliability |
| table_bulk_retry_clicked | User retries failed items | action_name, retry_count | Recovery quality |
| table_load_failed | Data load fails | error_category, retryable | Reliability |
| table_retry_clicked | User retries failed load | error_category | Recovery quality |

Do not send:
- Scan names, domain names, IP addresses, usernames, credentials
- Raw search queries
- Filter values that could contain sensitive identifiers
- API payloads, error stack traces
- Session tokens

---

## Accessibility Requirements

- Keyboard navigation: search, filter trigger, filter options, table headers, rows, row actions, bulk toolbar, dialog
- Visible focus states on all interactive elements
- `aria-label` on search input
- `aria-expanded` on filter trigger
- `aria-controls` on filter trigger pointing to panel
- `aria-sort` on sortable column headers
- `aria-selected` on selectable rows
- Checkbox labels including row identity (e.g. "Select GCP123_go home")
- Three-dots button: `aria-label="More actions for [entity name]"`
- Escape closes filter panel or open menu
- Focus returns to trigger after panel / menu close
- Status chips must not rely on color alone — include text label
- Sufficient contrast using existing tokens
- Bulk status dialog: focus trap, accessible close

---

## Risks and Ambiguities

Decisions requiring clarification before implementation of new features:

```text
Row actions:
- Should row actions hide or disable for items where an action is not permitted?
- Should destructive row actions always require confirmation, or only for irreversible operations?
- Should "Run" and "Stop" be treated as contextual actions or row action menu items?

Bulk actions:
- Should selected rows persist when filters change?
- Should Select all include hidden/paginated rows or visible rows only?
- Should selection be cleared automatically after a successful bulk operation?

Bulk Status Dialog:
- Should the dialog close automatically on full success?
- Should partial failure preserve selection for retry?

Sorting:
- Should sort state persist across sessions?
- Should sorting reset when filters are applied?

Details panel:
- Should row click open details in a slide-in panel or navigate to a details page?
- Should the table remain interactive while details panel is open?

Status terminology:
- "Completed with errors" — is this the approved term or should it be "Partial success" or "Errors"?
- "Auto fix" — what does this action do? Is it a registered term?
- "Fix issue" — same question.
```

---

## Row Actions Contract (Specification)

Each table row may include a three-dots overflow menu.

Required row action type:
```tsx
export type RowActionDefinition<T> = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  tone?: 'default' | 'danger';
  isVisible?: (item: T) => boolean;
  isDisabled?: (item: T) => boolean;
  disabledReason?: (item: T) => string | undefined;
  requiresConfirmation?: boolean;
  confirmationTitle?: (item: T) => string;
  confirmationDescription?: (item: T) => string;
  onAction: (item: T) => void;
};
```

Rules:
- Use ActionMenu DS component (already in component registry)
- Three-dots trigger must stop row click propagation
- Accessible label: `More actions for [entity name]`
- Destructive actions must use danger tone and require confirmation
- Hide actions that are invalid for the item state
- Disable only when the user needs to know the action exists but is unavailable

---

## Bulk Actions Contract (Specification)

Bulk actions apply to multiple selected rows.

Required bulk action type:
```tsx
export type BulkActionDefinition<T> = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  tone?: 'default' | 'danger';
  isVisible?: (items: T[]) => boolean;
  isDisabled?: (items: T[]) => boolean;
  disabledReason?: (items: T[]) => string | undefined;
  requiresConfirmation?: boolean;
  opensBulkDialog?: boolean;
  onAction: (items: T[]) => void;
};
```

Use SelectionBar DS component for the bulk toolbar (already in component registry).

Bulk toolbar displays:
```text
[count] selected  |  Clear selection  |  [action buttons]
```

---

## Bulk Status Dialog Contract (Specification)

Required for all async bulk operations or operations that may partially fail.

Required types:
```tsx
export type BulkOperationStatus =
  | 'pending' | 'in-progress' | 'succeeded'
  | 'failed' | 'skipped' | 'not-permitted' | 'cancelled';

export type BulkOperationItemResult = {
  itemId: string;
  itemLabel: string;
  status: BulkOperationStatus;
  message?: string;
  retryable?: boolean;
};

export type BulkOperationSummary = {
  actionId: string;
  actionLabel: string;
  total: number;
  succeeded: number;
  failed: number;
  skipped: number;
  notPermitted: number;
  cancelled: number;
};
```

Dialog must not close automatically when partial failures occur. Must preserve table context on close.

---

## Persistent Toolbar Across View Modes

When the page supports switching between table view and master-details view:

The page-level component owns all filter/search/selection/bulk state. The template receives derived props only.

```tsx
{viewMode === 'table' ? (
  <TableFiltersTemplate
    rows={visibleItems}
    selectedRowIds={selectedRowIds}
    onRowSelectionChange={setSelectedRowIds}
    onRowOpenDetails={handleOpenDetails}
    {...otherProps}
  />
) : (
  <CardListMasterDetailsTemplate
    items={visibleItems}
    selectedItemId={selectedItemId}
    onSelectedItemChange={setSelectedItemId}
    renderDetails={renderDetails}
    {...otherProps}
  />
)}
```

The toolbar, chips, search, item counter, and bulk toolbar remain unchanged when switching view modes.

---

## Related Templates

- CardListMasterDetailsTemplate — card list + details panel variant
- DashboardTemplate — metric cards and summaries (candidate)

---

## Known Limitations

Current implementation (as of 2026-06-19):
- Row actions: `rowActions` prop is untyped `(row: T) => React.ReactNode` — consuming page provides the menu
- Bulk actions: not yet built into template — consuming page must use SelectionBar separately
- Bulk Status Dialog: not yet built — must be implemented as a separate feature
- Sort state: not yet typed or built into template
- Row selection: not yet built into template — consuming page must manage
- Details panel: not yet built into TableFiltersTemplate — handled separately via CardListMasterDetailsTemplate or page-level state
- Status tokens: need verification against current variables.scss

---

## Owner
Prototype UX / Product Design

## Last Reviewed
2026-06-19

## Approved On
2026-06-19 (implementation pre-exists; specification backfilled from screenshots)
