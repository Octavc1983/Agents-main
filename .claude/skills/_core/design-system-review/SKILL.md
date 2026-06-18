# Design System Review

## Purpose

Review a generated page, component, or prototype for Infra / Design System compliance.

This skill checks whether the implementation correctly uses existing DS components, existing tokens, existing SCSS patterns, and the existing icon system — and produces a scored compliance report with actionable fixes.

---

## When to Use

Use this skill when:

- A prototype page has been created or modified and needs DS compliance validation
- A generated component needs to be checked before stakeholder review
- A code review reveals possible inline styles or hardcoded values
- A prior DS review found issues and a re-review is needed
- Any page is about to be shared with R&D for implementation guidance

Run this skill after the Prototype State Patterns skill and before sharing with R&D.

---

## Inputs Required

- Target page file path (`.tsx` and `.scss`)
- Known context about what was implemented (optional)
- Reference to any existing similar page for comparison (optional)

---

## Required Project Inspection

Before reviewing the target page:

1. Read the target `.tsx` file in full
2. Read the target `.scss` file in full
3. Identify all imports — confirm DS components are from correct paths
4. Read the most similar existing page for comparison
5. Read `src/design-system/tokens/_colors.scss` — confirm token names
6. Read `src/styles/_variables.scss` — confirm token names
7. Confirm the icon system source (`NavIcons.tsx` or equivalent)
8. Check for any SCSS `@use` ambiguity issues (same variable name in multiple imported files)

---

## Review Checklist

Work through every item:

**Component usage**
- [ ] All UI components come from existing Infra / DS or established project patterns
- [ ] No local component duplicates an existing DS component
- [ ] No local component was created when a DS component already covers the need
- [ ] DS components are imported from the correct path

**Tokens**
- [ ] No inline `style={{}}` objects used
- [ ] No hardcoded hex colors
- [ ] No hardcoded pixel spacing values
- [ ] No hardcoded font sizes or font weights
- [ ] No hardcoded border radius values
- [ ] No hardcoded shadow values
- [ ] All visual values reference existing SCSS variables or CSS custom properties

**SCSS**
- [ ] Token files imported via `@use` with correct namespace
- [ ] No SCSS variable ambiguity (`as *` from two files defining the same name)
- [ ] BEM or project class naming convention followed
- [ ] No duplicate class definitions that override existing DS styles globally

**Icon system**
- [ ] All icons are inline SVG React components from the existing icon file
- [ ] No PNG, JPG, emoji, or icon font usage
- [ ] No external icon library imports

**Layout and shell**
- [ ] Page renders inside existing AppShell — not inside a custom shell
- [ ] Existing Sidebar is not replaced
- [ ] Existing Header is not replaced
- [ ] No custom white prototype header added unless Figma explicitly shows one

**State patterns**
- [ ] Loading state uses existing `LoadingState` component
- [ ] Empty state uses existing `EmptyState` component
- [ ] Error state uses existing `ErrorState` component
- [ ] No visible debug state switcher buttons in the rendered UI

**Master details (if applicable)**
- [ ] Details panel is closed by default
- [ ] Row click opens panel (`setIsDetailsOpen(true)`)
- [ ] X button closes panel (`setIsDetailsOpen(false)`, `setSelectedItem(null)`)
- [ ] No `useEffect` used to sync state that can be derived directly

**Official Infra**
- [ ] No files in the official Infra library folder were modified
- [ ] No external UI libraries added

---

## Must Do

- Read the full target file before reviewing — do not review from memory
- Compare against existing similar pages
- Score objectively based on the checklist
- Prioritize issues: critical, high, medium, low
- Provide specific, actionable fix recommendations
- Confirm which restrictions were followed

---

## Must Not Do

- Modify the Infra library
- Create new DS components during the review
- Perform broad refactors
- Rewrite the full page unless explicitly requested
- Approve without completing the full checklist
- Treat visual similarity as DS alignment

---

## Output Format

```markdown
### DS Review Summary

Short description of the page reviewed and main findings.

### DS Alignment Score

1 = Not aligned — critical violations
2 = Major DS gaps
3 = Partially aligned — needs fixes
4 = Mostly aligned — minor fixes
5 = Fully aligned with DS expectations

### Critical Issues

Issues that must be fixed before any review or sharing.

### High Priority Issues

Issues that should be fixed before R&D handoff.

### Medium / Low Priority Issues

Nice-to-fix or future improvements.

### Design System Usage

| Component | Used Correctly | Notes |
|---|---|---|

### Token Coverage

| Style Type | Token Used | Issue |
|---|---|---|

### Icon System

Compliant / Issues found.

### SCSS Review

Compliant / Issues found (imports, naming, ambiguity).

### State Pattern Review

| State | Compliant | Notes |
|---|---|---|

### Restrictions Followed

- No new DS components created: ✓ / ✗
- No new tokens created: ✓ / ✗
- No inline styles used: ✓ / ✗
- No hardcoded visual values: ✓ / ✗
- No Infra library modifications: ✓ / ✗
- No external UI libraries added: ✓ / ✗
- No raster icons used: ✓ / ✗
- No debug UI exposed: ✓ / ✗

### Recommended Fixes

Prioritized list of specific changes needed.

### Final Recommendation

Choose one:
- Ready for UX review
- Needs DS fixes before review — list them
- Needs token review
- Should be regenerated
```

---

## Example Prompt

```
Use the Design System Review skill.

Goal:
Review [PAGE_NAME] for Infra / DS compliance.

Target files:
- [src/pages/PageName/PageName.tsx]
- [src/pages/PageName/PageName.scss]

Reference page:
[Closest existing page for comparison]

Expected output:
DS alignment score, critical issues, high priority issues, component usage table, token coverage, icon system review, restrictions confirmed, recommended fixes, final recommendation.
```
