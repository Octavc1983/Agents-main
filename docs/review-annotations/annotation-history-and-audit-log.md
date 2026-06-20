# Annotation History and Audit Log

Every annotation in the Review Annotations panel has a complete history. This page explains what is recorded, how to view it, and why it works this way.

---

## What the Audit Log Contains

The audit log is the complete record of all annotation activity for a page. It includes:

- **All active annotations** — annotations currently shown in the panel
- **Resolved annotations** — annotations that have been marked as addressed
- **Soft-deleted annotations** — annotations that have been deleted (hidden from the active list but not removed from the log)
- **Edit history** — every previous version of an annotation's text, with timestamps
- **Resolution history** — when an annotation was resolved and when it was unresolved

The audit log is always complete. Nothing is permanently removed from it.

---

## Edit History

Every time an annotation is edited, the previous version is saved. The full edit history is stored with each annotation, showing:

- The original text when the annotation was first created
- Each subsequent version of the text
- The timestamp of each change

This means you can always trace back to what a reviewer originally wrote, even if the note has been updated several times since.

**Why this matters:** During review cycles, annotations are often updated as feedback evolves — "This is broken" becomes "Fixed in the latest build, but let's monitor". Having the full history shows how the thinking changed and ensures the original concern is not lost.

This follows DEC-012: annotation edits preserve full version history.

---

## Soft Delete Record

When an annotation is deleted, it is not permanently removed. Instead, a `deletedAt` timestamp is stored on the annotation record. The annotation:

- Disappears from the active annotation list
- Remains in the audit log, visible when "Show all" or "Show resolved" is enabled
- Shows a "Deleted" label with the timestamp when viewed in audit mode

This follows DEC-013: annotation delete = soft delete retained in audit.

**Why this matters:** If someone deletes an annotation after an issue is supposedly fixed, the record of the original concern still exists. This is important for:
- Post-review audit trails
- Verifying that Critical findings were addressed before sign-off
- Understanding the review history when revisiting a screen after a long gap

---

## Resolution History

When an annotation is resolved or unresolved, that state change is recorded. The audit log shows:
- When the annotation was resolved (timestamp)
- Whether it was unresolved again (and when)

An annotation can be resolved and unresolved multiple times if the issue resurfaces.

---

## Who Can See the Audit Log

The audit log is visible to anyone who has access to Review Mode. There are no private annotations — all annotations and their history are shared across the review team.

To view the full audit log for the current page:
1. Open Review Mode (click **Review** in the header)
2. Look for the **Show all** or **Show resolved** toggle in the panel
3. The panel expands to show resolved and deleted annotations alongside active ones

---

## Annotation Data Structure (for Reference)

Each annotation stores the following information (displayed in plain language, not code):

| Field | What It Contains |
|---|---|
| ID | A unique identifier for this annotation |
| Page Route | Which page this annotation belongs to |
| Author | The name of the person who added it |
| Author Initials | Short form for the annotation card display |
| Timestamp | When it was first created |
| Text | The current annotation text |
| Severity | Note / Warning / Critical |
| Resolved | Whether it is currently marked as resolved |
| Deleted At | The timestamp when it was soft-deleted (if applicable) |
| History | A list of all previous text versions with timestamps |

This data structure is designed to support complete audit trails without requiring permanent deletion.

