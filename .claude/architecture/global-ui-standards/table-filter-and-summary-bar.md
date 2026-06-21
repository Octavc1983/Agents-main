# Table Filter and Summary Bar Flow Standard

## Standard ID

`GUS-002`

## Category

`table`

## Status

`active`

---

## Classification

Applies to:
- Table pages
- Table + Master Details pages
- Split views
- Search results
- Inventory pages
- Landing pages with filtered entity lists
- Bulk-action pages

Enforced by: Workflow Orchestrator, Table Filters Template, UX Flow Review Agent, DS Review Agent, Code Quality QA Agent

---

## 1. Core Principle

The page-level filter state belongs to the **page context**, not to the table implementation.

The **Summary Bar** is the single persistent location for:
- Search
- Filter trigger
- Applied filter chips
- Result count
- Selection summary
- Bulk actions
- View mode controls (when applicable)

Changing between Table and Split / Master Details view must **not** reset:
- Search query
- Applied filters
- Sort
- Pagination
- Selected entities
- Result count
- Summary Bar state

---

## 2. Required Page Structure

```text
Page
├── Optional page header
├── Persistent Summary Bar
│   ├── Search
│   ├── Filter trigger
│   ├── Applied filter chips
│   ├── Result count
│   ├── Selection summary
│   ├── Bulk actions
│   └── Optional view switcher
└── Content area
    ├── Table view
    └── Split / Master Details view
```

The Summary Bar must remain in the same visual position across all page views.

Do not move filters into the table body, details panel, or per-row actions.

---

## 3. Filter Data Model

```ts
export type FilterOperator = 'equals' | 'contains' | 'in' | 'notEquals' | 'isEmpty' | 'isNotEmpty';

export type AppliedFilter = {
  id: string;
  field: string;
  labelKey: string;
  operator: FilterOperator;
  values?: string[];
  displayValues?: string[];
  source?: 'user' | 'system' | 'kpi';
};
```

Do not create separate filter objects for each selected value of the same key unless the backend contract requires it.

---

## 4. Filter Combination Logic

### Different Keys → AND

```text
Environment: Production
AND
Owner: Security Team
AND
Platform: Windows
```

### Same Key, Multiple Values → OR

```text
Environment: Production OR Staging
```

This must NOT be interpreted as AND unless the product explicitly requires multi-value entity matching.

### Any Key / Free-Text Tag Value Search

```ts
{ keyMode: 'any', operator: 'contains', value: 'prod' }
```

Do not convert this into an exact-value filter.

---

## 5. Filter Panel Behavior

Use **draft filters** inside the Filter Panel.

```text
Open → user changes → draft state only → Apply → table refreshes → Summary Bar updates
Cancel / Close → discard draft → preserve previously applied filters
```

Do not update the table after every checkbox change unless the page explicitly uses live filtering.

---

## 6. Summary Bar Filter Presentation

- Single value: `Environment: Production`
- Multiple values: `Environment: Production, Staging`
- Overflow: `Environment: Production +2`

Do not render independent chips for each value of the same key (e.g. `Environment: Production ×` and `Environment: Staging ×`) unless the design explicitly requires per-value independent removal.

### Chip Removal

- Remove one value: filter group stays, that value is removed
- Remove last value: entire filter group removed
- Remove grouped chip (×): all values for that key removed

---

## 7. Summary Bar Layout Priority (when space is limited)

```text
1. Search
2. Filter trigger
3. Applied filter summary
4. Result count
5. Selection summary
6. Bulk actions
7. Secondary controls
```

Overflow: `+3 filters` chip opens popover or Filter Panel.

---

## 8. Result Count Behavior

```text
428 accounts
428 accounts matching filters
No accounts match the current filters.  [Clear filters]
No accounts have been added yet.  [Create account]
```

Initial empty ≠ filtered no-results. These must be distinct states with distinct messages and CTAs.

---

## 9. Filter State Changes and Table Behavior

When filters are applied or removed:
1. Reset pagination to page 1
2. Preserve search query (unless explicitly changed)
3. Clear selected entity only if it is no longer visible
4. Preserve selection for still-visible entities
5. Update result count, Summary Bar chips, and table content

For Master Details / Split view: if the selected entity is no longer in the filtered results, close the details panel.

---

## 10. Required States

```text
Default | Loading | Applying filters | Initial empty | Filtered no-results
Backend error | Permission denied | Invalid filter | Partial data | Filter value loading | Filter value loading error
```

---

## 11. Required QA Coverage

- Same key + multiple values → OR logic
- Different keys → AND logic
- Removing one value ≠ removing the group
- Removing last value = removes group
- Grouped chip × = clears all values for that key
- Summary Bar unchanged when switching table ↔ split views
- Applied filters persist when opening/closing details
- Pagination resets on filter change
- Search persists on unrelated filter change
- Initial empty ≠ filtered no-results
- Any key uses contains; specific key uses value dropdown
- Filtered selected row safely closes details when no longer matching
- Backend receives grouped values with correct operators
- Status, count, chips, and bulk actions synchronized after filtering

---

## Standard Metadata

```ts
{
  id: 'GUS-002',
  title: 'Table Filter and Summary Bar Flow Standard',
  category: 'table',
  appliesTo: ['table page', 'master details', 'split view', 'inventory', 'filtered list'],
  status: 'active',
  approvedAt: '2026-06-21',
}
```
