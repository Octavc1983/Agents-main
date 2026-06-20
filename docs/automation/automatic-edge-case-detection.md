# Automatic Edge Case Detection

Every screen Claude builds or reviews is checked against a set of edge case criteria automatically. You do not need to ask for this — it runs as part of the standard workflow. This page explains what is checked, why each check matters, and what happens when a gap is found.

---

## 1. Data States

Every screen that loads or displays data must handle all four situations:

| State | What It Means | What Must Be Present |
|---|---|---|
| Loading | Data is being fetched | A skeleton layout matching the real page structure — never a blank page |
| Empty | No data exists or no results match | A message explaining why, plus a call to action where relevant |
| Error | The data request failed | A clear message, a retry option, and a path forward |
| Success | An action completed successfully | Appropriate feedback for the action type |

**What gets flagged:** If any of these four states is missing, Claude raises a flow gap. A missing error state is always flagged as Critical. A missing empty state is Warning. A missing loading state is Warning.

---

## 2. Form Edge Cases

Forms are the most common source of UX edge cases. Claude checks for:

### Duplicate submission prevention (DEC-001)
The submit button must be disabled after the first click and remain disabled until the backend responds. This prevents accidental double-submissions that can create duplicate records.

**What gets flagged:** If the submit button is not protected against duplicate clicks, this is a Critical finding.

### Value preservation after validation failure (DEC-002)
When a form fails validation, the user's entered values must be preserved. The form must not clear or reset after a failed submission — the user should be able to correct only the fields with errors.

**What gets flagged:** If the form clears after a validation error, this is a Critical finding.

### Focus on first error
After a form validation failure, keyboard focus should move to the first field with an error. This helps screen reader users and keyboard-only users identify what needs to be corrected.

**What gets flagged:** Missing focus behavior is a Warning finding.

### Error messages
Each validation error must have a specific, actionable message. "Required" and "Invalid" alone are insufficient. The message should tell the user what the correct input looks like.

**What gets flagged:** Generic error messages are a Note finding.

---

## 3. Backend Timeout Handling (DEC-004)

The most critical backend edge case rule: **timeout = unknown outcome**. When a backend request times out, the UI must never show a success message. The correct behavior is to show a neutral message that says the outcome could not be confirmed and gives the user a path forward (retry, check status, contact support).

This applies to:
- Form saves and creates
- Wizard step completions
- Delete and archive actions
- Connection tests and integration setups
- Bulk operations

**What gets flagged:** If a timeout path leads to a success state, this is a Critical finding. This is one of the highest-priority checks in the edge case system.

---

## 4. Soft Delete (DEC-003)

When items are deleted, they must not be permanently removed. A soft delete stores the deletion timestamp and retains the item in the audit history. The item disappears from the active list but remains available for audit purposes and potential recovery.

**What gets flagged:** If a delete operation appears to be permanent (no audit log retention), this is a Warning finding. It is escalated to Critical if the deleted items are security-sensitive.

---

## 5. Focus Management After Panels and Drawers Close (DEC-007)

When a side panel, drawer, or modal dialog closes, keyboard focus must return to the element that triggered it (the button, row, or link that opened it). This is essential for keyboard navigation and screen reader users.

**What gets flagged:** Missing focus restoration is a Warning finding.

---

## 6. Accessibility

Claude checks for:
- All interactive elements have visible labels (buttons, links, form fields, icons)
- Focus states are visible (not hidden by design choices)
- Tab order is logical (follows the reading order of the screen)
- Icon-only buttons have accessible labels

**What gets flagged:** Missing labels or focus states are Warning findings. Missing accessible labels on interactive elements are Critical.

---

## What Triggers a Flow Gap Report

A Flow Gap is created when:

| Situation | Severity |
|---|---|
| A required data state (loading, empty, error) is missing | Warning or Critical |
| A destructive action (delete, archive, revoke) has no confirmation | Critical |
| A backend failure has no error feedback (silent failure) | Critical |
| A timeout could show a success state | Critical |
| A multi-step flow has no save/resume path | Warning |
| A form has no duplicate submission protection | Critical |
| Focus management is missing after panel/drawer close | Warning |
| An interaction has no visible outcome or feedback | Warning |

Flow Gaps are surfaced in the UX audit review output. They are not automatically fixed — you decide which gaps to address and when.

---

## How to Ask for an Edge Case Review

You do not need a special command. Examples:
- "Review the Create Credential form for edge cases"
- "Check the Wizard for timeout and failure handling"
- "Are there any edge cases on the Bulk Delete flow I should know about?"
- "Run a backend edge case review on the Scans page"

Claude will read the relevant screens and produce a structured findings report.

