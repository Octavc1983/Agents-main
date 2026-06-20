# Create a New Screen

This guide walks you through the process of asking Claude to build a brand-new prototype screen. You do not need to specify templates, components, or technical details — Claude handles those based on your description.

---

## Step 1 — Describe the Screen

Tell Claude what the screen is for and what it shows. The more context you give, the fewer follow-up questions Claude will ask.

**A good description includes:**
- The screen name or page title (e.g., "Credential Rotations")
- Who uses this screen and what decision it supports
- What data or information is displayed (columns, key fields, summary info)
- What actions users can take (view details, filter, delete, export, configure)
- Any specific behavior (e.g., "clicking a row opens a details panel on the right, not a new page")

**Example:**
> "Build the Credential Rotations screen. It should show a table of rotation jobs with status, target account, last run time, and next scheduled run. Clicking a row opens a details panel on the right. Users can filter by status and search by account name."

---

## Step 2 — Attach a Screenshot or Figma Link (Optional)

If you have a visual reference, attach it to your message. Claude will use it to improve layout accuracy and component selection.

- Drag a screenshot into the chat or paste the file path
- Paste a Figma frame link directly into your message

If you do not have a visual reference, Claude works from your description alone.

---

## Step 3 — Claude Picks a Template Automatically

Claude matches your description to the best-fit layout template from the template registry. You do not need to know or specify the template name.

For the Credential Rotations example, Claude would detect:
- Table with row-click details panel → TableMasterDetailsTemplate

Claude describes the matched template in its response. If no template matches, Claude creates a Draft Template Candidate and asks for your approval before building anything.

---

## Step 4 — The Safety Gate

Before writing any code, Claude checks:

- Does a page with this name or route already exist? (If yes, it reads it and shows a delta instead of building from scratch)
- What files will be created or modified?
- Does the required template exist?
- Are the Design System components needed for this screen available?
- Is there a navigation gap (space or hierarchy level that doesn't exist yet)?

Claude describes its findings and what it plans to create. You confirm before anything is built.

---

## Step 5 — What Gets Created

When you confirm, Claude builds:

| What | Details |
|---|---|
| The page file | The React screen for the route |
| Navigation entry | A new sidebar item in the correct space and position |
| Route | A URL path (requires your approval if it's a new route) |
| Loading state | Skeleton layout that matches the page structure |
| Empty state | A message shown when there is no data, plus a call to action |
| Error state | A message shown when the data fails to load, with retry option |
| Success state | Feedback for user actions (save, delete, export) |
| Mock data | Typed, centralized, domain-specific fixtures in `src/mock/` |

All states are built automatically. You do not need to ask for them separately.

---

## Step 6 — How to Review What Was Built

After Claude finishes building, it provides a summary of what was created. At this point you can:

- Open the app and navigate to the new page to see it visually
- Ask Claude to run a UX review: "Review the Credential Rotations page for edge cases and missing states"
- Ask for a review package: "Generate a review package for the Credential Rotations page for the design team"

---

## Step 7 — How to Ask for Changes

Describe what you want changed in plain English. Claude will read the current state of the page and provide a delta report before making any change.

Examples:
- "The details panel needs a 'Rotate Now' button at the top"
- "Add a 'Last Modified By' column to the table"
- "The empty state copy should say 'No rotation jobs configured yet' instead of 'No records available'"

---

## Full Example: Creating the Credential Rotations Screen

**Your request:**
> Build the Credential Rotations page. It should show a table of rotation jobs with columns for Status, Target Account, Last Run, and Next Run. Clicking a row opens a details panel on the right. Users can filter by status (Active, Paused, Failed) and search by account name.

**Claude's plan:**
> Template: TableMasterDetailsTemplate
>
> I'll create:
> - Credential Rotations page at /rotations
> - Table with columns: Status, Target Account, Last Run, Next Run
> - Row click opens a details panel (table stays visible)
> - Filter panel with Status filter (Active, Paused, Failed) and search by account name
> - Loading skeleton, empty state, error state
> - Sidebar nav entry under "Credentials" space
> - Typed mock data with 8–10 sample rotation jobs
>
> New route required: /rotations — confirm?

**You:** Yes, proceed.

**Result:** Claude builds the complete screen with all states, navigation, and mock data. The route is registered. The sidebar shows the new item.

