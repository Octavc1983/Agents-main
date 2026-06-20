# Review Backend Edge Cases

Backend edge cases are situations where something goes wrong between the user's action and the server's response. In UX terms, they are the moments where the UI most commonly fails users — silent failures, confusing states, or misleading feedback. This guide explains what Claude checks and how to ask for a backend edge case review.

---

## 1. What Backend Edge Cases Mean in UX Terms

When a user clicks "Save", "Delete", "Connect", or "Run", the app sends a request to a backend service. Most of the time this works instantly. But what happens when it doesn't?

Backend edge cases include:
- **Timeout** — the request takes too long and no response arrives
- **Network error** — the connection is interrupted mid-request
- **Server error** — the backend returned an error (500, 503, etc.)
- **Partial success** — some items in a bulk operation succeeded and others failed
- **Unknown outcome** — the request was sent but it's unclear whether it completed
- **Stale data** — the UI shows data that has since changed on the server
- **Race condition** — two actions conflict because both are in-flight at the same time

---

## 2. The Key Rule: Timeout = Unknown Outcome

The most important rule in this project is: **a timeout never means success**. If a request times out, the outcome is unknown. The UI must never show a success message when the outcome is unknown (DEC-004).

This matters most for:
- Form submissions ("Your changes were saved" — but were they?)
- Wizard completion ("Setup complete" — but did it actually complete?)
- Delete confirmations ("Scan deleted" — but the server never confirmed it)
- Connection tests ("Connection successful" — but the test timed out)

The correct behavior when a timeout occurs: show a neutral message that tells the user the outcome could not be confirmed, and give them a path forward (retry, check status, contact support).

---

## 3. What Claude Checks For

When you request a backend edge case review, Claude checks:

| Scenario | What Claude Looks For |
|---|---|
| Save / submit actions | Is there a loading state during the request? Is the submit button disabled? Is there an error state if the save fails? Is the success state only shown on confirmed success? |
| Delete / destructive actions | Is there a confirmation dialog? Is there an error state if the delete fails? Does the UI reflect the deletion only after server confirmation? |
| Load / fetch on page entry | Is there a loading skeleton? Is there an error state? Is there a retry option? |
| Wizard steps | Is each step's completion confirmed before moving to the next? What happens if a step fails? Is there a save-and-resume path? |
| Bulk operations | Are per-item results shown? Are partial failures surfaced? Is the success count vs. failure count clear? |
| Connection / integration tests | Is the test result only shown after a confirmed response? Is timeout handled as unknown, not failure or success? |
| Optimistic updates | Is the UI updated before server confirmation? If so, what happens when the confirmation fails? |
| Form submission feedback | Is silent failure possible? (No error shown, no success shown, user doesn't know what happened) |

---

## 4. How to Ask for a Backend Edge Case Review

Use plain English. Examples:
- "Review the Save button on the Configuration page for backend edge cases"
- "Check the Credential Rotation wizard for timeout and failure handling"
- "Are there any backend edge cases on the Scans page I should know about?"
- "Review the bulk delete flow in the Accounts table — I want to make sure failures are handled"

You can also include it as part of a broader UX review:
- "Review the Policies page for UX quality and backend edge cases"

---

## 5. What a Finding Looks Like

Backend edge case findings are reported as Critical or Warning:

**Critical:**
> "The Save button on the Configuration form does not disable during the save request. A user could click it multiple times, sending duplicate requests. This can cause duplicate records or conflicting updates."

**Critical:**
> "If the rotation job request times out, the wizard moves to the 'Setup Complete' screen. The user is shown a success state for an outcome that could not be confirmed (violates DEC-004)."

**Warning:**
> "The details panel loads account data without a loading state. If the account data takes more than 300ms to load, users see a blank panel with no indication that content is coming."

**Warning:**
> "The bulk enable operation shows a single success message regardless of how many items failed. If 3 out of 10 items fail silently, users assume all 10 were enabled."

---

## 6. Example Scenarios

### Scenario 1: Save fails silently
A user fills out the Create Credential form and clicks Save. The backend returns a 500 error. The form does not show any error message. The user is not sure if the credential was created or not.

**What Claude flags:** Critical — no error state on form submission failure.

---

### Scenario 2: Connection timeout during wizard step
A user is running the New Integration wizard. On Step 3, the connection test times out after 30 seconds. The wizard shows a "Connection Successful" message because the timeout path was not handled separately.

**What Claude flags:** Critical — timeout treated as success. Violates DEC-004.

---

### Scenario 3: Partial bulk operation
A user selects 20 accounts and clicks "Rotate Credentials". 17 succeed, 3 fail. The UI shows "Credentials rotated successfully." The user has no way to know that 3 accounts were not rotated.

**What Claude flags:** Critical — partial bulk failure not surfaced. Consider a BulkStatusDialog showing per-item results.

