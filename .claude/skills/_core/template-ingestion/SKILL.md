---
name: template-ingestion
description: Convert a screenshot or Figma reference into a registered, approved Page Composition Template specification. Produces structure, slots, state coverage, data contracts, component mapping, telemetry candidates, and registry metadata — before any code is generated.
when_to_use: Use when a screenshot or Figma frame represents a reusable page pattern. Run before implementation, not as part of it.
user-invocable: false
allowed-tools: Read, Glob, Grep, Write, Edit
---

# Template Ingestion Skill

## Purpose

Convert a visual reference (screenshot or Figma frame) into a structured, registered Page Composition Template specification.

This skill does not generate implementation code. It produces the architectural contract that governs future implementation.

---

## The Core Distinction

```text
Screenshot
→ Template specification     (this skill)
→ Registry entry             (this skill)
→ Approval                   (user)
→ Implementation             (after approval only)
→ Future pages consume it    (ongoing)
```

Not:
```text
Screenshot → one-off generated page
```

---

## Step 1 — Load References

Read:
```text
.claude/architecture/component-registry.md
.claude/architecture/data-contract-registry.md
.claude/architecture/shared-patterns.md
.claude/architecture/template-registry.md (if it exists)
.claude/content/terminology-registry.md
.claude/content/deprecated-terms.md
```

Also inspect:
```text
src/prototype-templates/        — existing template implementations
src/components/ui/              — available DS components
src/styles/_variables.scss      — available tokens
src/assets/icons/NavIcons.tsx   — available icons
```

---

## Step 2 — Analyze the Visual Reference

Systematically identify:

1. Page anatomy (all visual regions)
2. Layout hierarchy and proportions
3. Header and title ownership
4. Toolbar structure and contents
5. Search behavior
6. Filter behavior and panel structure
7. Active filter chips behavior
8. Item counter behavior and label rules
9. List / table / card structure
10. Details panel behavior (if present)
11. Primary and secondary actions
12. Row-level actions
13. Bulk selection and bulk actions
14. Bulk status / result feedback
15. Empty, loading, no-results, error, disabled, success states
16. Responsive behavior
17. Keyboard and accessibility requirements
18. Required data shape per visible entity
19. Reusable structural slots
20. Template variants visible in the reference
21. Candidate shared components
22. Candidate shared data contracts
23. Candidate telemetry events
24. Terminology and Technical Writing requirements

---

## Step 3 — Classify Every Element

For each identified element, assign one classification:

| Classification | Meaning |
|---|---|
| Existing DS component | Already exists in src/components/ui/ |
| Shared feature component candidate | Same pattern needed by 2+ pages |
| Page Composition Template structure | Template-level layout or slot |
| Page-specific content | Domain-specific, not reusable |
| Shared domain data | Same entity type needed in 2+ pages |
| Shared view model | Same normalized data shape in 2+ pages |
| Shared API contract candidate | Common query/response shape across features |
| Local prototype-only behavior | Mock only, no real API |
| Needs UX decision | Ambiguous behavior requiring UX input |
| Needs DS decision | Requires DS team input |
| Needs Technical Writing decision | Copy or terminology needs review |
| Needs R&D / backend decision | Backend contract or logic unknown |

---

## Step 4 — Produce the Specification

Write the specification to:
```text
.claude/architecture/templates/[TemplateName].md
```

Use the structure defined in the Template Specification Format section below.

---

## Step 5 — Add Registry Entry

Add an entry to:
```text
.claude/architecture/template-registry.md
```

Status: `Specified` — not yet approved.

---

## Step 6 — Content Alignment Check

Before finalizing the specification:
- Check all visible copy against `.claude/content/terminology-registry.md`
- Check against `.claude/content/deprecated-terms.md`
- Flag any unregistered product-specific terms
- Do not treat screenshot copy as final terminology

---

## Step 7 — Present for Approval

Output the complete specification.

End with:
```markdown
### Recommendation

[Choose one]
- Ready to register as template specification
- Needs UX clarification — [specific questions]
- Needs DS clarification — [specific questions]
- Needs Technical Writing clarification — [specific questions]
- Needs architecture review — [specific concerns]
- Not suitable as reusable template — [reason]

---

**To proceed to implementation**, approve this specification.
After approval, I will create the template folder, types, implementation, SCSS, usage guide, and evaluation scenarios.
```

---

## Architecture Rules

During analysis and specification:

- Inspect existing AppShell, Sidebar, Header, Router, Infra, DS components, tokens, icons, templates, data types, and shared APIs before proposing anything new
- Reuse existing patterns where possible
- Do not propose creating a custom AppShell, Sidebar, Header, Router, or DS component
- Do not propose creating new tokens unless none exist for the visual need
- Do not allow inline styles
- Do not allow hardcoded colors, spacing, typography, radius, shadows
- SVG icons through existing icon system only
- Do not add libraries
- Do not propose modifying official Infra files
- Do not treat screenshot text as final terminology without registry check
- Do not generate fake backend logic or real API calls
- Use local mock data only unless an existing approved API contract exists

---

## Template Specification Format

```markdown
# [Template Name] — Template Specification

## Template Name
## Template Category
## Status
Specified / Approved / Implemented / Deprecated

## Primary User Goal
## Best Use Cases
## Do Not Use For
## Intended Reuse Scope

---

## Screenshot Interpretation

Describe the visual hierarchy, key regions, and reference-only content vs. structural behavior.

---

## Page Anatomy

| Area | Purpose | Required? | Reusable? | Notes |
|---|---|---|---|---|

---

## Layout Contract

Describe:
- Page shell expectations
- Header ownership
- Toolbar layout
- Content layout
- Split ratios if relevant
- Scrolling ownership
- Responsive breakpoints
- Panel behavior

---

## Reusable Slots

| Slot | Required | Content Type | Example |
|---|---|---|---|

---

## Interaction Contract

| Interaction | Trigger | Expected Behavior | State Impact |
|---|---|---|---|

---

## State Coverage

| State | Required Behavior | Template Responsibility | Consuming Page Responsibility |
|---|---|---|---|

---

## Data Contract Candidates

| Data Need | Suggested Type | Shared Potential | Notes |
|---|---|---|---|

---

## Shared Component Candidates

| Candidate | Category | Evidence | Recommended Ownership | Approval Needed |
|---|---|---|---|---|

---

## Existing Component Mapping

| UI Need | Existing Component | Import Path | Confidence | Notes |
|---|---|---|---|---|

---

## Token and Styling Mapping

| Visual Need | Existing Token / Pattern | Gap | Notes |
|---|---|---|---|

---

## Technical Writing Alignment

| UI Text Area | Required Terminology Rule | Existing Source | Notes |
|---|---|---|---|

---

## Telemetry Candidates

| Event | Trigger | Safe Metadata | Reason |
|---|---|---|---|

---

## Accessibility Requirements

---

## Risks and Ambiguities

---

## Related Templates

---

## Known Limitations

---

## Owner
## Last Reviewed
## Approved On
```

---

## After Approval — Implementation Steps

Only after explicit approval:

1. Create `src/prototype-templates/[TemplateName]/`
2. Create `[TemplateName].types.ts`
3. Create `[TemplateName].tsx`
4. Create `[TemplateName].scss` using existing tokens
5. Create `index.ts`
6. Register in `.claude/architecture/template-registry.md` — status: `Implemented`
7. Add evaluation scenarios to `.claude/quality/evals/`
8. Add a mock-data usage example
9. Confirm: Page Composition Template only — no new DS components, no new tokens, no inline styles

---

## Must Not Do

- Do not generate implementation code before specification is approved
- Do not create DS components
- Do not create tokens without explicit approval
- Do not use inline styles
- Do not modify existing DS or Infra files
- Do not finalize copy without terminology registry check
- Do not skip the deprecated-terms check
- Do not produce vague classifications — every element must be classified
