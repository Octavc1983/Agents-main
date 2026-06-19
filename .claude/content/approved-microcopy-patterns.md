# Approved Microcopy Patterns

## Purpose
Stores approved, ready-to-use microcopy for common UI patterns across the product. Acts as a reuse library — before writing new microcopy, check here first.

Prevents inconsistency where the same UI pattern gets different text on different pages.

## Ownership
UX Writing / Product Design

## Status
Active — populated as patterns are approved

## Update Rules
- Add a pattern when it has been reviewed and approved for reuse
- Update only after UX Writing review — do not edit live copy without approval
- Mark patterns `Deprecated` when replaced — do not delete until all usages are updated
- Each pattern must reference which pages use it

## Entry Template
```markdown
### [Pattern Name]

**Category:** [empty-state / error / loading / confirmation / CTA / label / status / tooltip]
**Context:** [when to use this]
**Approved text:**
> [exact text here]

**Variables:** [e.g. {item_name}, {count}]
**Pages using this:** [list]
**Status:** Active / Deprecated
**Approved:** [YYYY-MM-DD]
**Last reviewed:** [YYYY-MM-DD]
```

## Review Requirements
- All patterns require UX Writing approval before being added
- Patterns with variables must define all variable formats
- Deprecated patterns must list which pattern replaces them

## Last Reviewed
Not yet reviewed

---

## Empty States

### Empty Table — No Items Yet
**Category:** empty-state
**Context:** First-time experience on a list page before any items are created
**Approved text:**
> No [items] yet
> [Action verb] your first [item] to get started.
> [[CTA label]]

**Variables:** {items} = plural noun, {Action verb} = sentence-case verb, {item} = singular noun, {CTA label}
**Pages using this:** _(none yet)_
**Status:** Active
**Approved:** —
**Last reviewed:** —

---

### Empty Table — No Results After Filter or Search
**Category:** empty-state
**Context:** Search or filter returned zero results
**Approved text:**
> No results found
> Try adjusting your filters or search term.
> [Clear filters]

**Variables:** none
**Pages using this:** _(none yet)_
**Status:** Active
**Approved:** —
**Last reviewed:** —

---

## Loading States

### Generic Page Loading
**Category:** loading
**Context:** Page-level data fetch in progress
**Approved text:** _(no text — use skeleton loader only)_
**Pages using this:** _(none yet)_
**Status:** Active
**Approved:** —

### Operation in Progress
**Category:** loading
**Context:** User-triggered operation (scan, save, import) in progress
**Approved text:**
> [Operation name]...

**Variables:** {Operation name} = sentence-case verb phrase, e.g. `Running scan...`, `Saving changes...`
**Pages using this:** _(none yet)_
**Status:** Active
**Approved:** —

---

## Error States

### Generic Page Error
**Category:** error
**Context:** Page failed to load data
**Approved text:**
> Something went wrong
> Refresh the page or try again later.
> [Refresh page]

**Variables:** none
**Pages using this:** _(none yet)_
**Status:** Active
**Approved:** —

### Failed Save
**Category:** error
**Context:** Save operation failed
**Approved text:**
> Couldn't save changes. Try again.

**Variables:** none
**Pages using this:** _(none yet)_
**Status:** Active
**Approved:** —

---

## Confirmation Dialogs

### Destructive Action — Permanent Delete
**Category:** confirmation
**Context:** Irreversible deletion of a named item
**Approved text:**
> **Delete [item name]?**
> This will permanently delete "[{item_name}]". This action can't be undone.
> [Delete {item type}] [Cancel]

**Variables:** {item name} = display name of item, {item_name} = escaped value, {item type} = singular noun
**Pages using this:** _(none yet)_
**Status:** Active
**Approved:** —

---

_Additional patterns are added here after UX Writing review._
