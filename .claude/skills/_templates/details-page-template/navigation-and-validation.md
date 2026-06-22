# DetailsPageTemplate — Navigation and Validation

## Back Navigation

Back returns to the originating context — never to a generic landing page.

| Entry point | Back returns to |
|---|---|
| Table row click | Table with restored filter/sort/scroll/selection |
| FATLINES list row click | FATLINES list with restored state |
| Master details "Open full page" | Master details panel (entity still selected) |
| Search result | Search results page |
| Notification | Notification list or originating view |
| Direct URL / deep link | Entity's parent list |

**Back must use `onBack` prop — not `window.history.back()`.** Consumer provides the correct back target.

**Back label** should name the destination: "Back to Accounts", "Back to Connectors". Not just "Back".

## Sidebar Rules

- Active sidebar item does NOT change when entering the details page
- The details page is a sub-view of the same section
- Do not modify `spacesRegistry` navigation from within DetailsPageTemplate
- Do not programmatically change the active route segment shown in the sidebar

## Deep Link Resolution

On direct URL access or deep link:
1. Read entity ID from URL params
2. Look up entity in mock data (prototype) or API (production)
3. Check entity exists → if not: render `not-found`
4. Check permission → if denied: render `permission-denied`
5. Check entity is not deleted → if deleted: render `entity-deleted`
6. Render `ready` with entity data

In prototype: use mock entity lookup. Simulate each error state with specific mock entity IDs (e.g. `"entity-deleted-123"`, `"entity-not-found-456"`).

## Tab Navigation

- Tabs use DS `Tabs` component
- Active tab is controlled by `activeTab` prop + `onTabChange` callback
- Tab changes do NOT trigger page navigation or route changes
- Tab state is page-local (not in URL unless the consumer adds tab routing)
- Tab keyboard navigation handled by DS Tabs (Left/Right arrows, Home/End)

## Edit Actions and Dialogs

When a tab contains editable fields:
- "Edit" button opens DialogFlowTemplate (single-step edit) or navigates to FullScreenFormTemplate (complex edit)
- Unsaved edit dialog triggers ConfirmationDialogTemplate before close
- Save success refreshes the details page data (mock: update mock state)

## Context Restoration

When Back is called from a details page, the consumer must restore:
- Active filter state (where supported)
- Active search query (where supported)
- Sort order
- Scroll position (where supported)
- Selected entity in list (where supported)

**Prototype:** Use React state in the parent list component. Persist in context or URL params as appropriate.

## Validation

DetailsPageTemplate itself is primarily read-only. Validation is owned by dialogs or forms opened from within the page. The template enforces:
- `read-only` state disables all action buttons
- No form submission from the template shell itself
- Tab navigation is always allowed regardless of state
