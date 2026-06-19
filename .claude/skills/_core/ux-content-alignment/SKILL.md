---
name: ux-content-alignment
description: Align all user-facing text in a prototype page or component with the approved terminology registry, UX writing style guide, and microcopy pattern library. Use before any page is marked ready for UX or PM review.
when_to_use: Use after a page or component is built, before UX review or stakeholder review. Also use when adding navigation items, empty states, error messages, dialogs, or CTAs to ensure alignment with registered terms and style rules.
user-invocable: false
allowed-tools: Read, Glob, Grep, Write, Edit
---

# UX Content Alignment

## Purpose

Ensure all user-facing text is consistent, on-brand, and aligned with project terminology and writing conventions before a page ships to review.

This skill is part of the post-implementation quality chain. It runs after the page is built and before UX audit.

---

## When to Run

Run this skill when:
- A new page is created
- Navigation items are added or changed
- Empty states, error messages, or loading states are added
- A dialog, confirmation, or CTA is introduced
- A feature is renamed or a status label changes
- Any copy is edited in response to feedback

---

## Step 1 — Load Content References

Read:
```text
.claude/content/terminology-registry.md
.claude/content/ux-writing-style-guide.md
.claude/content/approved-microcopy-patterns.md
.claude/content/deprecated-terms.md
```

Do not proceed if these files are missing. Flag as a blocker and ask for content layer setup.

---

## Step 2 — Extract All User-Facing Text

Scan target files for:
- Navigation labels (sidebar, breadcrumbs, tabs)
- Page titles and section headings
- Button labels and CTAs
- Empty state headings and descriptions
- Error message text
- Loading state text
- Dialog titles, body text, and action labels
- Status chip labels
- Tooltip text
- Placeholder text in inputs
- Table column headers
- Badge and tag labels

---

## Step 3 — Terminology Check

For each term found:

1. **Check against terminology-registry.md**
   - Is the exact preferred form used?
   - Is capitalization correct?
   - Is it singular/plural correctly?

2. **Check against deprecated-terms.md**
   - Does the term appear in the deprecated list?
   - If yes: flag as Critical and provide the replacement.

3. **Check consistency across pages**
   - Does the same concept get the same label everywhere?
   - Flag any cross-page inconsistency.

4. **Check for unregistered terms**
   - If a product-specific term is not in the registry, flag it as `Unregistered` and suggest an entry.

---

## Step 4 — Style Guide Check

For each text element found, apply style guide rules:

### Navigation items
- Must be Title Case
- Must match registered term exactly

### Button labels / CTAs
- Must be verb-first
- Must not use: OK, Submit, Done, Yes, No, Close (as action labels)
- Cancel must always be `Cancel`
- Destructive actions must name the object

### Empty states
- Must have a heading (what's missing)
- Must have a description (what to do)
- Must have a CTA if action is available
- Must not use: "No data", "Nothing here", "No results" with no guidance

### Error messages
- Must not blame the user
- Must provide recovery path
- Must not expose technical internals

### Confirmation dialogs
- Title must name the action + object
- Body must state consequences
- Irreversible: must include "can't be undone"
- Primary CTA must be specific
- Secondary must be "Cancel"

### Loading states
- Prefer skeleton over text
- If text: minimal, e.g. `Loading...`, `Running scan...`

---

## Step 5 — Approve or Flag Patterns

For each microcopy block:
1. Check if an approved pattern exists in `approved-microcopy-patterns.md`
2. If yes: confirm the page uses it correctly
3. If no: check if the copy follows style guide rules independently
4. If copy could become a reusable pattern: suggest adding it to the pattern library

---

## Step 6 — Produce Review Report

Use the Technical Writing Agent output format:

```markdown
### UX Content Alignment Review

### Scope Reviewed

### Terminology Issues
[table]

### Deprecated Terms Found
[table]

### Microcopy Issues
[table]

### Unregistered Terms
[table]

### Proposed Registry Updates
[requires approval]

### Proposed Copy Changes
[exact before/after, requires approval]

### Final Assessment
```

---

## Step 7 — After Approval

Apply only approved copy changes.

After applying:
- Update the terminology registry if new terms were approved
- Update the deprecated-terms log if terms were retired
- Add to approved-microcopy-patterns.md if a new reusable pattern was created

---

## Severity Thresholds

| Severity | Action |
|---|---|
| Critical | Block page from review — fix required |
| High | Flag for resolution before stakeholder review |
| Medium | Recommend fix; does not block review |
| Low | Log for future cleanup; does not block |

---

## Must Not Do

- Do not silently edit copy without approval
- Do not block implementation for Low issues
- Do not invent terminology
- Do not use personal style as a criterion
- Do not skip the deprecated-terms check
- Do not update registries without approval
