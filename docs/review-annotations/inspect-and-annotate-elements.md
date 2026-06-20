# Inspecting and Adding Annotations

This guide covers how to add a new annotation to a screen, how to choose the right severity level, and what each part of an annotation contains.

---

## How to Add a New Annotation

1. Open the annotation panel by clicking **Review** in the header
2. Click the **Add annotation** button at the top of the panel
3. An annotation form appears in the panel
4. Fill in the fields (described below)
5. Click **Save** to add the annotation to the current screen

The annotation is immediately visible in the panel and is attached to the page you are currently viewing.

---

## Annotation Fields

### Text (required)
Write the observation, concern, or suggestion. Be specific — describe what is wrong or what should be improved, and ideally what the correct behavior should be.

Good annotation text:
- Describes the specific element or interaction
- Says what the issue is
- Suggests the correct behavior where possible
- Is written in plain language that any reviewer can understand

### Severity (required)
Choose the severity level that best matches the impact of the finding. See the severity guide below.

### Author (recommended)
Enter your name or initials. This helps the team know who left each note during review sessions.

---

## Severity Levels Explained

Choosing the right severity level ensures the review team can prioritize effectively.

---

### Note (Info)

A general observation, design preference, quality improvement, or open question. Not a blocker. The screen is usable as-is, but this is worth discussing or considering.

**When to use:**
- Copy could be friendlier or more consistent
- A design detail could be more polished
- A behavior might be worth reviewing in a future sprint
- A question for the team about intent

**Examples:**
> "The empty state copy says 'No records available' — consider 'No scans found yet' for a more conversational tone that matches the design system style guide."

> "The details panel header shows the internal scan ID. Consider displaying the scan name as the primary identifier since reviewers don't know the IDs."

> "Should the 'Export' action be here, or does it belong on the table toolbar? Worth aligning with the rest of the product."

---

### Warning

A concern that should be addressed before the screen is considered ready for review sign-off or handoff. The user can still use the screen, but there is friction, confusion, a missing state, or an inconsistency that will be noticed.

**When to use:**
- A required state (loading, empty, error) appears to be missing
- A behavior is inconsistent with similar screens in the product
- A label or action is ambiguous
- An accessibility concern that is not blocking but is present

**Examples:**
> "This filter panel has no loading state. If filters take time to apply, users will see a blank table with no indication that a query is running."

> "The 'Archive' button has no tooltip or explanation. Users may not know if archiving is reversible — consider adding a confirmation dialog or a brief label clarification."

> "The details panel does not close when the user navigates to a different row using the keyboard. The panel should update or close on row change."

---

### Critical

A must-fix issue. A real user would be blocked, confused, or could accidentally lose data. Critical findings block review sign-off until they are resolved.

**When to use:**
- A destructive action (delete, revoke, archive) has no confirmation
- A required state is missing and would show a blank or broken screen
- A backend failure has no error feedback (silent failure)
- A timeout is treated as a success
- A user could lose work or data due to missing protection

**Examples:**
> "Clicking 'Delete Scan' immediately deletes the scan with no confirmation dialog. Users can accidentally delete production scan records with a single click."

> "When the scans list fails to load, the page shows a blank table with no error message or retry option. Users have no way to know if the content is loading, empty, or broken."

> "The wizard's 'Finish' step shows 'Setup Complete' even when the backend connection times out. This violates the rule that timeout must never be shown as success."

---

## How Annotations Appear in the Panel

After saving, your annotation appears in the panel as a card showing:
- Severity badge (Critical / Warning / Note)
- Author name and initials
- Timestamp (when it was added)
- A preview of the annotation text
- A "Resolved" toggle (to mark it as addressed without deleting it)

Annotations are sorted by severity — Critical annotations appear first, then Warning, then Note.

