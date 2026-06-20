# States and Recovery Patterns

Every screen must handle the full range of situations a user can encounter. This page describes the four required data states and the recovery behaviors that apply to common failure scenarios.

---

## The Four Data States

Every screen that loads or displays data must define all four states. Missing states are flagged as flow gaps during review.

---

### 1. Loading State

**What it is:** What the user sees while data is being fetched from the backend.

**What it must include:**
- A skeleton layout that matches the real page structure — not a full-page spinner or a blank white page
- The skeleton should mirror the actual layout: if the page has a table with five columns and a header, the skeleton has the same shape
- The skeleton uses Design System tokens, not custom colors

**Why skeletons instead of spinners?**
A skeleton layout gives users a preview of what is coming. They can see the page structure and understand where content will appear. A full-page spinner gives no information and can make users uncertain whether the page is loading or broken.

**Registered decision:** DEC-005 — Loading skeleton for all data-fetching screens.

---

### 2. Empty State

**What it is:** What the user sees when there is no data to display — the list is empty, the search returned no results, or the feature has not been set up yet.

**What it must include:**
- A clear explanation of why there is nothing to show
- A call to action where relevant (e.g., a "Create your first policy" button)
- Different messaging for different empty reasons:
  - Genuinely empty (no data exists yet): encouraging, action-oriented
  - Filtered empty (no results match active filters): informative with a "Clear filters" action
  - Permission empty (user cannot access content): informative without a misleading CTA

**What a good empty state avoids:**
- Generic messages like "No records available" (too technical, no direction)
- Empty states with no CTA when a CTA would unblock the user
- Empty states that look like broken screens (no visual differentiation from a loading failure)

---

### 3. Error State

**What it is:** What the user sees when a request fails — a data fetch returns an error, a page fails to load, or a backend operation cannot be completed.

**What it must include:**
- A clear, plain-language explanation of what went wrong (at an appropriate level of detail)
- A retry option where retrying is likely to help
- A path forward where retry is not enough (refresh the page, check your connection, contact support)

**What a good error state avoids:**
- Blank or broken-looking screens with no explanation
- Technical error codes shown without explanation
- "Something went wrong" with no actionable next step
- Hiding the error and silently showing stale data

---

### 4. Success State

**What it is:** Confirmation that an action the user took was completed successfully.

**What it must include:**
- Feedback appropriate to the scope of the action:
  - For inline actions (save a form field, delete a single item): a brief toast notification or inline confirmation that disappears after a few seconds
  - For significant actions (complete a wizard, publish a policy, complete a bulk operation): a more prominent confirmation, potentially a full success view
  - For page-level completions (finish setup, complete onboarding): a dedicated success screen

**What a good success state avoids:**
- Showing success when the outcome is unknown (DEC-004 — timeout = unknown, never auto-confirm)
- Ambiguous success messages ("Done." without saying what was done)
- Success messages that persist too long and block the screen

---

## Recovery Patterns

These patterns define how specific failure or error scenarios are handled across all screens.

---

### Form Validation Failure

When a user submits a form with invalid values:

1. The form does not clear or reset — all entered values are preserved (DEC-002)
2. Inline error messages appear next to each field with the problem
3. Keyboard focus moves to the first field with an error
4. The error messages are specific and actionable ("Password must be at least 8 characters" not just "Invalid")
5. The submit button returns to its active state after the validation response arrives, so the user can correct and resubmit

---

### Duplicate Submission Prevention

When a user clicks a submit, save, or confirm button:

1. The button is immediately disabled after the first click (DEC-001)
2. The button remains disabled until the backend response arrives (success or error)
3. A loading indicator is shown on or near the button to communicate that the request is in progress
4. After the response arrives, the button is re-enabled if the action failed, or the form closes/navigates if the action succeeded

This prevents the common case where users click the button twice because nothing visibly changed after the first click.

---

### Timeout Handling

When a backend request times out:

1. A neutral message is shown: "We couldn't confirm whether this action completed. Please check the status before trying again." (DEC-004)
2. A success message is never shown when the outcome is unknown
3. A failure message is also not shown if the action may have succeeded but the confirmation was lost
4. The user is given a path to verify the current state (check a status page, reload the list, contact support)

---

### Soft Delete

When a user deletes an item:

1. The item is hidden from the active view immediately (fast, optimistic UI)
2. The backend records the deletion with a timestamp (DEC-003)
3. The item remains in the audit log and can be viewed by authorized users
4. If the deletion fails on the backend, the item reappears in the active view with an error message

---

### Focus After Panel or Drawer Close

When a panel, drawer, or dialog closes:

1. Keyboard focus returns to the element that triggered the panel (the button, row, or link that opened it) (DEC-007)
2. If the trigger element no longer exists (it was deleted as part of the panel action), focus moves to the most logical nearby element (typically the next item in the list)
3. Screen readers announce the closure and the new focus location

---

### No Data After Filter

When a user applies filters that result in zero results:

1. The filter-specific empty state is shown (not the default "no data" empty state)
2. The message explains that no results match the current filters
3. A "Clear filters" action is always present to help the user recover
4. The applied filters remain visible so the user knows what is active

