# Editing, Deleting, and Restoring Notes

This guide covers how to manage existing annotations — editing them, deleting them, resolving them, and understanding how the history is preserved.

---

## How to Edit an Annotation

1. Open the annotation panel (click **Review** in the header)
2. Find the annotation you want to edit and click it to expand it
3. Click the **Edit** button on the annotation
4. Update the text, severity, or any other field
5. Click **Save** to apply the change

Every edit is saved in the annotation's version history. You can see a full log of all previous versions, including what changed and when. This means you can always refer back to earlier versions of a note even after it has been updated. The history is never lost.

---

## How to Delete an Annotation

1. Open the annotation panel
2. Find the annotation and expand it
3. Click the **Delete** button

Deleting an annotation is non-destructive. The annotation is marked as deleted (hidden from the active list) but stays in the audit log. The deletion timestamp is stored so reviewers can see when it was removed and by whom.

This is a "soft delete" (DEC-013). The note is not permanently erased — it is simply hidden from the default view and retained for audit purposes.

---

## How to Resolve and Unresolve an Annotation

Resolving an annotation marks it as addressed without deleting it. This is the recommended way to close out a finding after the team has acted on it.

1. Find the annotation in the panel
2. Click the **Resolve** toggle or checkbox on the annotation card

The annotation moves to a "Resolved" section at the bottom of the panel (or can be filtered out). It stays visible in the audit log.

To unresolve an annotation (if the fix was incomplete or the issue reappeared), click the **Resolve** toggle again to return it to the active list.

---

## How to View Deleted or Resolved Annotations

By default, the annotation panel shows only active, unresolved annotations.

To see resolved or deleted annotations, look for the **Show all** or **Show resolved** toggle in the panel header. This reveals the full annotation history for the current page, including:
- Annotations that have been resolved
- Annotations that have been soft-deleted (shown with a strikethrough or "Deleted" label)

The audit log view shows every annotation that has ever been added to the page, in chronological order.

---

## Why Deletion Is Non-Destructive

Permanently deleting annotations would mean losing review history. If someone deleted an annotation after it was "fixed", the team would have no record that the issue was ever raised or what the original concern was.

Soft delete ensures that:
- The full review history is always available
- No annotation can be accidentally deleted in a way that hides a real issue
- Audit trails are complete for PM, UX, and QA sign-off processes

This follows DEC-013 (annotation delete = soft delete retained in audit) and DEC-012 (annotation edit preserves full version history).

---

## Summary of Annotation Actions

| Action | What It Does | Reversible? | Visible in Audit Log? |
|---|---|---|---|
| Add | Creates a new annotation | Yes (delete it) | Yes |
| Edit | Updates the annotation text or severity | Yes (previous versions saved) | Yes — full version history |
| Resolve | Marks as addressed, hides from active list | Yes (unresolve it) | Yes |
| Delete (soft) | Hides from active list, retains in audit | No (soft delete only) | Yes — shows deletedAt timestamp |

