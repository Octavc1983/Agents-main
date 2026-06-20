# How to Work with Claude

Claude is your AI design and prototyping collaborator. You describe what you want in plain English and Claude figures out what to build, which components to use, and how to connect everything. You do not need to know how the code works or which commands to run.

---

## 1. How to Talk to Claude

Use natural language. Describe the screen, the change, or the problem you are trying to solve — the same way you would describe it to a developer or UX engineer.

You do not need to say "use the table template" or "run /ux-add-page". Claude detects the intent automatically.

Good examples:
- "Build the Scans page — it should show a table of scans with status, severity, and a details panel"
- "Update the Policies page — the filter panel should show policy type and environment"
- "Add a confirmation dialog before deleting a scan"
- "Review the Accounts page for edge cases and missing states"
- "The empty state on the Rotations page doesn't feel right — can you review it?"

---

## 2. What to Include in Your Request

The more context you give, the faster Claude can proceed without asking follow-up questions.

**Helpful to include:**
- The screen name or page title
- What data or information the screen should show
- What actions users can take on that screen
- The purpose of the screen (who uses it, what decision it supports)
- A screenshot or Figma link if you have one
- Any specific behavior you want (e.g., "clicking a row opens a panel, not a new page")

**Optional:**
- A reference design or comparable screen
- Known edge cases or error conditions
- Stakeholder feedback you've already received

**You do not need to specify:**
- Which template to use (Claude picks this automatically)
- Which components to use (Claude maps to the Design System)
- Loading, empty, or error states (Claude adds these automatically)
- Navigation wiring (Claude adds the sidebar entry)

---

## 3. What Claude Will Ask For If Something Is Missing

If your request is missing critical information, Claude will identify the workflow it detected and ask only for what it needs to continue safely.

For example, if you say "build a new screen for rotation history" without specifying what the screen shows, Claude might ask:

> I identified this as: Create New Page
>
> Before I continue, I need:
> - What data does this screen show? (columns, key fields)
> - What actions can users take? (view details, filter, delete, export?)
>
> I already know: the page name, template type (table), and that it needs a details panel based on your description.

Claude will never ask you to specify a template, pick a component, or choose a slash command.

---

## 4. How the Conversation Flows

Every request follows the same pattern:

1. **Intent detection** — Claude reads your message and identifies what kind of task this is (new page, edit, review, navigation update, etc.)
2. **Safety gate** — Before touching any code, Claude checks what files are in scope, what already exists, and what the approved behavior is
3. **Delta or plan** — For new screens, Claude describes what it plans to create. For existing screens, Claude shows you a delta report (what it found, what it will change, what it will not touch)
4. **Your approval** — You confirm or adjust the plan
5. **Implementation** — Claude builds only what was approved
6. **Review** — After building, Claude runs quality checks automatically (DS compliance, copy review, UX flow, loading states)

---

## 5. What "Approval" Means in This Context

Approval does not always mean you need to say "yes, proceed". Claude uses three levels:

- **Automatic** — Claude applies and tells you afterward. Example: adding a skeleton loading state, preserving form values after a validation error, disabling a button during save.
- **Prefilled + one confirmation** — Claude describes what it plans to do and asks one question. Example: "I'll place this new nav item under the Accounts space, between Policies and Rotations. Does that look right?"
- **Explicit sign-off required** — Claude stops and waits. Example: creating a new route, modifying an existing page for the first time, a missing Design System component.

The full list of approval levels is in [The Approval Model](./approval-model.md).

---

## 6. Example Conversations

### Example 1 — Building a new screen

> **You:** Build the Credential Rotations page. It should show a table of rotation jobs with status, target account, last run time, and a details panel when you click a row.
>
> **Claude:** I'll build this as a TableMasterDetailsTemplate — a full table on the left with a details panel that opens on row click.
>
> Here's what I'll create:
> - Credential Rotations page at /rotations
> - Table with columns: Status, Target Account, Last Run, Next Run
> - Row click opens a details panel (stays on the same page)
> - Loading skeleton, empty state, error state
> - Sidebar navigation entry under Credentials
> - Typed mock data in src/mock/
>
> Shall I proceed?

---

### Example 2 — Editing an existing screen

> **You:** Update the Policies page — the filter panel should show policy type and environment.
>
> **Claude:** I read the current Policies page. Here's what I found and what I propose to change:
>
> **Found:** The filter panel currently has two filters: Status and Owner.
>
> **Proposed change:** Add "Policy Type" and "Environment" as additional filters. These will appear below the existing filters.
>
> **Will not touch:** Table structure, column order, details panel, navigation entry, mock data schema, loading/empty/error states.
>
> Confirm to proceed?

---

### Example 3 — Adding an interaction

> **You:** Add a confirmation dialog before deleting a scan.
>
> **Claude:** I'll add a ConfirmationDialogTemplate triggered by the Delete action on the Scans table.
>
> The dialog will:
> - Show the scan name and a warning message
> - Have "Cancel" and "Delete" buttons
> - Disable Delete during the delete request
> - Show an inline error if the delete fails
>
> This follows DEC-001 (disable re-submit during save) and DEC-004 (never show success when outcome is unknown).
>
> Shall I proceed?

---

### Example 4 — Requesting a review

> **You:** Review the Accounts page for edge cases and missing states.
>
> **Claude:** I'll run a UX audit on the Accounts page. This is read-only — I won't change anything.
>
> [After review]
>
> **Critical:** No error state defined for when the accounts list fails to load.
> **Warning:** The bulk delete action has no confirmation dialog.
> **Note:** The empty state copy uses the phrase "No records available" — consider "No accounts found yet" for a friendlier tone.

