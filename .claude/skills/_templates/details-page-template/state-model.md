# DetailsPageTemplate — State Model

## Page-Level States

| State | What to render | Back available? |
|---|---|---|
| `loading` | Skeleton matching real page structure | Yes |
| `ready` | Full entity content | Yes |
| `not-found` | DS EmptyState — "Entity not found" | Yes |
| `permission-denied` | Permission error — accessible, no raw error | Yes |
| `read-only` | Full content, all actions disabled, read-only badge | Yes |
| `stale` | Content with stale indicator + refresh action | Yes |
| `error` | DS ErrorState — retry option | Yes |
| `entity-deleted` | "This entity has been deleted." — return to list | Yes |

## State Transitions

```
[route enter / deep link resolve]
  → loading
  → ready (on success)
  → not-found (entity does not exist)
  → permission-denied (no access)
  → entity-deleted (entity was deleted)
  → error (fetch failed)

ready
  → stale (when data becomes outdated — polling or manual check)
  → read-only (when entity enters read-only mode)

stale
  → loading → ready (on refresh)

error
  → loading → ready (on retry)
```

## Read-Only State

When `pageState='read-only'`:
- All edit action buttons are disabled
- "Read only" badge shown in header
- Contextual actions dropdown shows non-destructive read actions only
- Tabs are still navigable
- Back is still available

## Skeleton Loading (DEC-005)

`loading` state must render a layout-aware skeleton matching the real page structure:
- Header skeleton (title, identifier, status, actions)
- Summary strip skeleton (field count matching real data)
- Tab header skeleton
- Content area skeleton (matching active tab structure)

Use DS `Skeleton` component. Do not show generic spinner for page-level loading.

## Tab-Level States

Each tab may have its own loading/error/empty state:

| Tab state | When | Render |
|---|---|---|
| Loading | Tab data is async | Tab content skeleton |
| Ready | Data loaded | Tab content |
| Empty | No data for this section | DS EmptyState in tab |
| Error | Tab data fetch failed | DS ErrorState in tab + retry |

## Prototype State Simulation

```ts
// Mock deep link resolution
const resolveEntity = (id: string): Entity | null => {
  return mockEntities.find(e => e.id === id) ?? null;
};

// Page state from resolution
const pageState: DetailsPageState =
  entity === null ? 'not-found' :
  entity.isDeleted ? 'entity-deleted' :
  entity.isReadOnly ? 'read-only' :
  'ready';
```
