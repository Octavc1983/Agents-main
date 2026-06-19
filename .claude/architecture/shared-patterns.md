# Shared Patterns

Patterns identified across pages that are candidates for extraction but not yet promoted. Updated by the Shared Architecture Agent.

---

## Filter Toolbar Pattern

### Pages Using It
- ScansPage (status filter, provider filter, search)

### Pattern
Search input + status filter + cloud provider filter + active filter chips + count display + clear-all action. Uses `Input`, `Select`, `Chip`, `FilterButton` imported from `@cyberark/design-system`.

### Extraction Readiness
Not yet — only one consumer. Revisit when a second filter-based page is created.

### Level
Level 2 — Shared Feature Component candidate

---

## Status Badge Pattern

### Pages Using It
- ScansPage (scan status: completed / running / failed / pending / stopped)

### Pattern
Chip with color-coded background and optional icon based on status enum value. Uses `Chip` imported from `@cyberark/design-system`.

### Extraction Readiness
Candidate. Need to verify other pages use similar status chips before extracting.

### Level
Level 2 — Shared Feature Component candidate

---

## Scan Entity Shape

### Files
- src/mock/prototypeMockData.ts
- src/types/prototype.types.ts (Scan interface)

### Pattern
Consistent scan domain entity with id, name, provider, scanType, status, schedule, time, lastRun, findingsCount.

### Extraction Readiness
Type already defined. Needs a shared view model when a second consumer maps it for display.

### Level
Level 4 — Shared Domain Type (already extracted), Level 5 — View Model candidate

---

_Additional patterns are added here as the Shared Architecture Agent identifies them._
