# Empty State and No-Results Standard

## Standard ID

`GUS-005`

## Category

`empty-state`

## Status

`active`

---

## Rule

Every page, table, and list must distinguish between **initial empty** (no data exists) and **filtered no-results** (filters/search yielded zero matches). These are different states with different messages and CTAs.

---

## Required States

### Initial Empty (no entities exist)

```text
Illustration or icon (optional, DS-approved)
Message: "No [entities] have been added yet."
CTA: Primary action — "Create [entity]" / "Add [entity]" / "Connect [source]"
```

### Filtered No-Results (filters/search active, no matches)

```text
Message: "No [entities] match the current filters."
CTA: "Clear filters" — removes all applied filters and restores the full list
No creation CTA — user is in a filtered context, not an empty product state
```

### Search No-Results (search active, no matches)

```text
Message: "No results for \"[query]\""
CTA: "Clear search" or "Try a different search"
```

---

## Applies To

- All table pages
- Card lists
- Search results
- Filter results
- Details panels with empty associated data
- Landing pages with entity lists

---

## Forbidden

- Using the same empty state for both "no data" and "no filter results"
- Empty state with no message
- Empty state with no CTA when a next action is available
- "Clear filters" CTA on initial empty state (no filters are active)
- Creation CTA on filtered no-results state (user is in filtered context)

---

## QA Checks

1. Is initial empty distinct from filtered no-results?
2. Does initial empty have a creation/onboarding CTA?
3. Does filtered no-results have a "Clear filters" CTA?
4. Does search no-results have a clear search CTA?
5. Is the empty state message specific to the entity type?

---

## Standard Metadata

```ts
{ id: 'GUS-005', title: 'Empty State and No-Results Standard', category: 'empty-state', status: 'active', approvedAt: '2026-06-21' }
```
