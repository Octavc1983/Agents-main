# DetailsPageTemplate — Edge Cases

## EC-01: Entity not found (deep link to deleted or non-existent entity)

**Trigger:** URL contains an entity ID that does not exist in mock data / backend
**Expected behavior:**
- Render `not-found` state: DS EmptyState with "This entity could not be found."
- Back button available: "Back to [list]"
- Do not render an error page that replaces the AppShell
- Sidebar remains unchanged

---

## EC-02: Permission denied

**Trigger:** User navigates to an entity they do not have permission to view
**Expected behavior:**
- Render `permission-denied` state: accessible error copy, no raw error, no entity data exposed
- Back button available
- Do not expose any entity data even in the URL bar if possible

---

## EC-03: Entity deleted while user is viewing it

**Trigger:** Entity is deleted (by another user or operation) while this user is on the details page
**Expected behavior:**
- Render `entity-deleted` state: "This [entity type] has been deleted."
- Back button returns to list
- Do not show stale entity data

**Prototype:** Simulate via mock state mutation after a timed event.

---

## EC-04: Stale data

**Trigger:** Entity data is older than the freshness threshold
**Expected behavior:**
- Show stale indicator in header ("Last updated X minutes ago")
- Show "Refresh" button or auto-refresh
- Data remains readable while stale
- After refresh: `loading` → `ready`

---

## EC-05: Sensitive data in Configuration tab

**Trigger:** Configuration tab would show secrets, passwords, or SSH keys
**Expected behavior:**
- Never render sensitive data in plain text
- Show masked value: "••••••••••"
- Show "Copy" button (CopyButton DS component) — copies real value to clipboard, does not display it
- "Show" toggle is a product decision — must be explicitly approved before implementing

---

## EC-06: Activity log contains raw backend traces

**Trigger:** Log content from backend includes stack traces or internal error messages
**Expected behavior:**
- Never render raw backend errors in the Activity or Logs tab
- Show safe user-facing message only
- **Prototype:** Mock log data must never include stack traces or raw errors

---

## EC-07: Back from details page when list is no longer in memory

**Trigger:** User navigates to details page via deep link — list component was never mounted
**Expected behavior:**
- Back navigates to the entity's parent list at its default state (no filter restoration possible)
- Do not crash or show a blank page
- Consumer is responsible for fallback back target

---

## EC-08: Details page opened from master details panel "Open full page"

**Trigger:** User in master details panel clicks "Open full details"
**Expected behavior:**
- Navigate to details page
- Back label: "Back to [parent section]" (not "Back to master details")
- On back: return to list view, entity still selected if state allows

---

## EC-09: Contextual action opens ConfirmationDialog

**Trigger:** User clicks "Delete" in the contextual actions menu
**Expected behavior:**
- ConfirmationDialogTemplate opens (not inline)
- On confirm: deletion proceeds → redirect to list (entity no longer exists)
- On cancel: return focus to trigger button (DEC-007)
- DetailsPage may briefly show `entity-deleted` state before Back redirect

---

## EC-10: Read-only entity with edit intent

**Trigger:** User tries to edit a `read-only` entity
**Expected behavior:**
- All edit actions are disabled (buttons disabled, ActionMenu items disabled)
- No edit dialog opens
- Show tooltip or banner explaining why entity is read-only (e.g. "Read only — managed externally")
