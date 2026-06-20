# Update an Existing Screen

When a screen already exists, Claude will never overwrite it without your approval. This guide explains how the update process works, from your initial request to the final change.

---

## Step 1 — Describe What Needs to Change

Focus on what the change is, not how to implement it. Describe the outcome you want.

Good examples:
- "Add a 'Severity' column to the Scans table and a filter for severity level"
- "The empty state on the Policies page should have a 'Create Policy' button"
- "The confirmation dialog for deleting a scan should show the scan name in the message"
- "Move the 'Export' button to the top of the page, next to the title"

You do not need to describe which files to edit, which component to use, or how to wire the change. Claude reads the existing page first and figures out the impact.

---

## Step 2 — Claude Reads the Existing Page First

Before proposing any change, Claude reads the current state of the page. This is always the first step for any update request. Claude does not start editing until it has read and analyzed what's already there.

What Claude checks:
- What is currently on the page (layout, components, columns, filters, states)
- What mock data exists and what shape it is
- How the page is wired to navigation and routing
- What states are already handled (loading, empty, error, success)
- Whether the requested change conflicts with any existing behavior or registered decision

---

## Step 3 — The Delta Report

After reading the existing page, Claude produces a delta report. This describes:

1. **What was found** — the current state of the page
2. **What will change** — the specific additions or edits being proposed
3. **What will not be touched** — everything outside the scope of your request

You review the delta and confirm before any code changes.

**Example delta report:**

> I read the Scans page. Here's what I found and what I propose:
>
> **Found:**
> - Table with 4 columns: Name, Status, Created, Owner
> - Filter panel with one filter: Status
> - Details panel opens on row click
> - Loading, empty, and error states are present
>
> **Will change:**
> - Add "Severity" as a 5th column in the table (after Status)
> - Add a "Severity" filter to the filter panel (multi-select: Critical, High, Medium, Low)
> - Update mock data to include severity values for each scan
>
> **Will not touch:**
> - Table column order for existing columns
> - Details panel content
> - Loading, empty, error states
> - Navigation entry, route, or sidebar placement
> - Any other page or component

---

## Step 4 — You Approve the Delta

Review the delta and confirm or adjust. You can:

- Approve as written: "Yes, proceed"
- Narrow the scope: "Only add the column — skip the filter for now"
- Adjust the proposal: "Put the Severity column first, before Status"
- Reject a part: "Don't update the mock data — I'll do that manually"

Claude applies only what you approved. Nothing else changes.

---

## Step 5 — Claude Applies Only the Approved Changes

After your approval, Claude makes exactly the changes described in the delta. Unrelated parts of the page are not touched, even if Claude notices something it could improve.

If Claude notices an issue during implementation (e.g., a deprecated term in the updated copy), it will flag it in the post-implementation summary rather than silently fix it or block the change.

---

## What Gets Preserved Automatically

Every time Claude updates an existing screen, these are always preserved:

- All logic and behavior not in scope
- Navigation entries, routes, and sidebar placements
- Existing states (loading, empty, error, success) that were already present
- Design System components already in use
- Mock data not explicitly changed
- Accessibility behavior and focus management
- Any custom component overrides or adjustments already on the page

---

## Example: Adding a Severity Column and Filter to the Scans Page

**Your request:**
> Update the Scans page — add a 'Severity' column to the table and a filter for severity level.

**Claude's delta report:**

> I read the Scans page.
>
> **Found:** Table with Name, Status, Created, Owner columns. Filter panel with Status filter. Loading, empty, error states present.
>
> **Will change:**
> - Add "Severity" column after "Status" (values: Critical, High, Medium, Low, Info)
> - Add "Severity" multi-select filter to the filter panel
> - Update mock data to include severity on each scan item
>
> **Will not touch:** All other columns, details panel, states, navigation, route.
>
> Confirm?

**You:** Yes, but put Severity as the second column (after Name, before Status).

**Claude:** Updated. Severity will be second. Confirm?

**You:** Yes.

**Claude:** Done. Here's the summary of what changed: [list of changes]

