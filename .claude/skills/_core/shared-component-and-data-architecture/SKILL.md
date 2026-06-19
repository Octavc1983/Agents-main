---
name: shared-component-and-data-architecture
description: Detects repeated UI patterns, shared domain data shapes, duplicate mapping logic, shared API contract opportunities, and reusable page structures across React pages, templates, mock data, types, services, and features.
when_to_use: Use when creating or editing multiple related pages, when repeated UI or data logic appears, when building a new feature with future reuse potential, or when QA identifies duplicated components, duplicated mock data, duplicated filter logic, or repeated API shapes.
user-invocable: false
allowed-tools: Read, Glob, Grep, Write
---

# Shared Component and Data Architecture

## Purpose

Identify and propose safe shared abstractions before duplication grows.

The goal is not to create abstraction everywhere. The goal is to recognize when repeated UI, behavior, data shape, or API contract should become reusable.

---

## Classification Rules

### Use a DS Component When
- visual pattern is generic and spans multiple domains
- API is stable, DS ownership is correct

### Use a Shared Feature Component When
- behavior is shared within related product areas
- component contains feature-specific logic that does not belong in DS

### Use a Page Composition Template When
- reused value is in page structure or interaction flow
- examples: filters+table, table+details, card list+details

### Use a Shared Domain Type When
- multiple pages represent the same entity

### Use a Shared View Model When
- multiple UI surfaces need the same normalized display shape

### Use a Shared Data Adapter When
- multiple places transform raw API or mock data the same way

### Use a Shared API Contract When
- multiple features use the same domain endpoint
- filtering, pagination, sorting, and error shape repeat
- multiple pages need consistent request/response types

---

## Mandatory Checks Before Page Generation

Inspect whether:
- a matching shared component exists
- a matching template exists
- the domain already has types
- mock data duplicates existing entity shapes
- a data adapter already exists
- a service or repository already exists
- filter/search/pagination patterns already exist
- the page introduces a new API shape that overlaps an existing one

Record findings in `.claude/architecture/component-registry.md` and `.claude/architecture/data-contract-registry.md`.

---

## Shared API Proposal Rules

Do not create a shared API automatically.

Create a proposal when:
- at least two pages need the same entity
- repeated request/response data exists
- multiple pages repeat filter, sort, or pagination patterns
- repeated mapper functions exist
- the user explicitly asks for API architecture

Every proposal must include:
```text
domain
consumers
request shape
response shape
filter shape
pagination shape
error shape
ownership
migration path
approval needed
```

---

## Step 1 — Scan for Duplication

Search:
```text
src/pages/ — repeated component imports, repeated data shapes
src/mock/   — repeated entity shapes
src/types/  — missing or overlapping types
src/hooks/  — repeated state logic
src/components/ — similar feature components
```

---

## Step 2 — Classify Opportunities

For each repeated pattern, assign a level (1–8) from the classification rules.

---

## Step 3 — Propose or Register

If extraction is safe → write to `.claude/architecture/component-registry.md` or `data-contract-registry.md`.

If extraction needs approval → write a proposal using the required format from the Shared Architecture Agent.

If extraction is premature → write to `shared-patterns.md` with `Do not extract yet` status.

---

## Step 4 — Scans Example Mapping

For the Scans domain, expected discoveries:

```text
Repeated UI:
  ScanListItem — appears in list and search results → Shared Feature Component candidate
  ScanStatusBadge — status chip with color/icon → Shared Feature Component candidate
  FilterToolbar — search + filter chips + count → Shared Feature Component candidate

Repeated Data:
  Scan entity shape — in ScansPage, ScanDetailsPanel, mock data → Shared Domain Type
  Filter state shape — filterStatuses, filterProviders → Shared Filter View Model

Repeated API shape:
  Scan list query params — search, statuses, providers, page, pageSize → ScansApi contract candidate
  Scan details response — id, name, provider, findings → ScanDetailsApi contract candidate
```

---

## Required Output

```markdown
### Shared Architecture Discovery

### Scope Inspected

### Existing Reuse Found

| Pattern | Location | Level | Status |
|---|---|---|---|

### Reuse Candidates

| Candidate | Level | Evidence | Proposed Path | Approval |
|---|---|---|---|---|

### Shared Data Candidates

| Shape | Pages | Risk | Proposal |
|---|---|---|---|

### Shared API Candidates

| Contract | Consumers | Evidence | Draft Contract | Approval |
|---|---|---|---|---|

### Do Not Extract Yet

| Pattern | Reason |
|---|---|

### Proposed Ownership

### Registry Updates

| File | Entry Added |
|---|---|

### Recommended Next Step
```

---

## Files This Skill Maintains

```text
.claude/architecture/component-registry.md    — known shared components and candidates
.claude/architecture/data-contract-registry.md — known shared types and API contracts
.claude/architecture/feature-api-registry.md  — known feature-level API shapes
.claude/architecture/shared-patterns.md       — patterns identified, not yet extracted
```

---

## Must Not Do

- Do not extract just because two files look similar
- Do not move domain logic into the Design System
- Do not create backend API calls
- Do not create global state without evidence
- Do not extract a god component
- Do not treat prototype mock data as production API
