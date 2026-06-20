# Review a Flow for UX Quality

A UX flow review is a read-only audit of a screen or interaction. Claude examines the screen for missing states, edge cases, interaction gaps, and copy quality. Nothing is changed unless you explicitly ask for fixes afterward.

---

## 1. What a UX Flow Review Checks

A flow review covers seven areas:

### Data states
Does the screen have all four required states?
- **Loading** — what does the user see while data is fetching?
- **Empty** — what does the user see when there is no data?
- **Error** — what does the user see when the request fails?
- **Success** — what feedback does the user get after completing an action?

### Edge cases
What happens in unusual or unexpected situations?
- Partial data (some fields missing or null)
- Slow network (loading takes longer than expected)
- Very long text in labels or data fields
- Unusually large datasets
- Single-item lists vs. multi-item lists

### Interaction completeness
Is every action connected to a clear outcome?
- Does every button do something visible?
- Is every destructive action protected by a confirmation step?
- Do multi-step flows have a clear path to completion and a way to exit?
- Are there any dead ends where a user could get stuck?

### Copy and terminology
- Is visible text consistent with the approved terminology?
- Are error messages clear and actionable?
- Does the empty state explain what to do next?
- Are any deprecated terms present?

### Focus behavior
- When a panel or drawer closes, does keyboard focus return to the element that opened it?
- Does the first error in a form receive focus after validation fails?

### Dark mode
- Does the screen work in dark theme?
- Are semantic design tokens used throughout (no hardcoded light-only colors)?

### Accessibility
- Are interactive elements labeled correctly?
- Are focus states visible?
- Is the tab order logical?

---

## 2. How to Trigger a Review

Describe the screen you want reviewed. You do not need to use a command.

Examples:
- "Review the Scans page for edge cases and missing states"
- "Audit the Create Policy wizard — I want to know if any states are missing"
- "Check the Accounts page for UX quality"
- "Review the details panel on the Rotations table — I'm not sure the error state is handled"

You can also attach a screenshot to your review request for additional context.

---

## 3. How Findings Are Categorized

Every finding falls into one of three categories:

| Category | What It Means | Example |
|---|---|---|
| **Critical** | Must be fixed before this screen can be reviewed or shared. A real user would be blocked, confused, or could lose data. | "Deleting a scan shows no confirmation — users can accidentally delete production scan records" |
| **Warning** | Should be fixed soon. Causes friction, confusion, or inconsistency but does not block the user. | "The filter panel has no loading state — if filters take time to apply, users see a blank table momentarily" |
| **Note** | Observation or suggestion. Quality improvement, not a blocker. | "The empty state copy uses 'No records available' — consider 'No scans found yet' for a friendlier tone" |

---

## 4. How to Act on Findings

After the review, you have several options for each finding:

- **Ask for a fix:** "Fix the Critical finding — add a confirmation dialog for scan deletion"
- **Defer it:** "The Warning about filter loading state is noted — we'll address it in the next sprint"
- **Mark it as known:** "That empty state copy is intentional — we use 'No records available' across all tables for consistency"
- **Discuss it:** "Can you show me what the empty state would look like with a 'Create Scan' button?"

You can also add a finding as an annotation in Review Mode — see [Review Annotations](../review-annotations/README.md).

---

## 5. What the Review Does NOT Change

A UX flow review is always read-only. Claude does not modify any code during the review. If you want to fix findings, you start a separate update workflow after the review is complete.

This separation ensures that review findings are always visible and documented before any changes are made, and that you remain in control of which findings to address and when.

---

## Example Review Output

> **UX Review: Scans Page**
>
> **Critical (1)**
> - No error state defined for when the scans list fails to load. Users would see a blank or broken table with no explanation or retry option.
>
> **Warning (2)**
> - The bulk delete action has no confirmation dialog. Users selecting multiple scans could delete them in one click with no warning.
> - No validation state on the search field — if a user enters a query that returns zero results, the empty state copy is generic ("No scans available") rather than search-specific ("No scans match your search").
>
> **Note (1)**
> - The details panel header shows the scan ID. Consider showing the scan name as the primary identifier since IDs are less human-readable in a review context.
>
> **Passed:** Loading state, empty state (data), success feedback on delete, focus restoration after panel close, dark mode compatibility, terminology.

