# Page Composition Templates

Page Composition Templates are reusable layout patterns. They are not Design System components — they are project-specific structures that assemble DS components into the standard layouts for common screen types.

When you ask Claude to build a screen, it automatically matches your description to the best template from this registry. You do not need to name the template — Claude detects it.

---

## What Templates Include

Each template defines:
- The overall page layout (how sections are arranged)
- Which DS components fill each region
- The standard states (loading, empty, error, success)
- The standard interaction patterns (row click, filter apply, form submit, etc.)
- Navigation and routing expectations

---

## Registered Templates

### 1. Table Page
**Best for:** Displaying a list of items with no persistent details panel.

A full-width table with a header, sortable columns, pagination, and row actions. The simplest table layout. Used when clicking a row navigates to a separate details page (rather than opening a panel inline).

Standard regions: page header with title and actions, table with column headers, pagination footer.

---

### 2. Table with Filters (TableFiltersTemplate)
**Best for:** Large datasets where users need to narrow results before they can find what they're looking for.

A table combined with a search bar and a collapsible filter panel. Active filters appear as chips below the search bar, making it easy to see what is currently applied and remove individual filters. The filter state persists as the user browses results.

Standard regions: search bar, filter panel (collapsible), active filter chips, full-width results table.

---

### 3. Table with Details Panel (TableMasterDetailsTemplate)
**Best for:** When users need to review item details without losing context of the full list.

A table on the left where clicking a row opens a details panel on the right. The table and panel are visible simultaneously — the table does not navigate away. This allows users to quickly compare multiple items by clicking through rows.

Standard regions: table (narrower when panel is open), details panel (slides in from right on row click).

---

### 4. Card List with Details (CardListMasterDetailsTemplate)
**Best for:** Items where the card itself shows meaningful summary information, and users need to select and inspect items one at a time.

A 30% card list on the left and a 70% details panel on the right. The cards show a summary of each item (name, status, key metadata). Clicking a card populates the details panel. One card is always selected by default.

Standard regions: scrollable card list (left), details panel with full item information (right).

---

### 5. Dashboard (TilesDashboardTemplate)
**Best for:** At-a-glance status and health overviews where users need summary metrics before drilling into details.

A grid of KPI metric tiles, charts, and summary widgets. Tiles typically link to the detailed list page for each metric. The dashboard is read-only — it shows aggregated status, not individual records.

Standard regions: metric tile row, chart section, summary widget sections.

---

### 6. Canvas (CanvasTemplate)
**Best for:** Visual topology views, policy graphs, flow diagrams, or any screen where users need to see how entities are connected.

An infinite scrollable canvas with nodes, connections, pan, and zoom. Users can navigate the graph spatially. Node interactions (click, hover) show contextual information without leaving the canvas.

Standard regions: full-screen canvas, zoom controls, optional toolbar, optional mini-map.

---

### 7. Zero State Configuration (ZeroStateConfigurationTemplate)
**Best for:** Features that require initial configuration before they can show any data — onboarding a first integration, creating the first policy, setting up a connection.

An empty state with a clear explanation of what the feature does, why it is empty, and a prominent call to action to start the setup. Includes guidance copy and optionally vertical tabs for different configuration categories.

Standard regions: illustration or icon, explanation copy, primary CTA button, optional secondary links.

---

### 8. Form Page (FormPageTemplate)
**Best for:** Creating or editing a single entity (a credential, a policy, an account, an integration).

A structured form with labeled fields, inline validation, and Save/Cancel actions. Fields are organized into logical sections. Validation errors appear inline next to the field. The form preserves values after validation failure. The submit button is disabled during the save request.

Standard regions: form header with breadcrumb, field groups with section labels, sticky footer with Save and Cancel.

---

### 9. Configuration Form (ConfigurationFormTemplate)
**Best for:** System-level settings, connection setup, or integration configuration where fields depend on each other and sections are meaningful.

Similar to the Form Page but designed for longer, more complex configurations. Sections may be collapsed/expanded. Dependent field visibility changes based on other field values. Designed for settings that are configured once or infrequently.

Standard regions: section navigation (left or top), form fields with conditional visibility, save/cancel actions.

---

### 10. Wizard (WizardTemplate)
**Best for:** Multi-step setup flows where users need to make several decisions in a logical sequence before completing a task.

A guided flow with a progress indicator showing the current step and the remaining steps. Each step validates before advancing. The final step shows a completion confirmation. Where practical, progress can be saved to allow users to exit and return.

Standard regions: step progress indicator (top), step content area, step navigation (Back / Next / Finish).

---

### 11. Dialog Flow (DialogFlowTemplate)
**Best for:** Scoped actions that should not navigate the user away from the current screen — entering a short form, confirming a setting change, reviewing a summary before submitting.

A modal overlay with form fields, actions, or summary content. The current screen remains visible behind the dialog. The dialog has a clear title, close button, and primary/secondary actions.

Standard regions: dialog header with title, content area, action footer with primary and secondary buttons.

---

### 12. Confirmation Dialog (ConfirmationDialogTemplate)
**Best for:** Any destructive or irreversible action — delete, archive, revoke, reset. Requires explicit user confirmation before proceeding.

A focused dialog with a warning message that describes the action and its consequences. The dialog names the specific item being affected. The primary action button uses a destructive color style. The Cancel button is always present and always the default focus.

Standard regions: warning icon, title (describes the action), body (names the item, explains consequences), Cancel and Confirm buttons.

---

### 13. Bulk Status Dialog (BulkStatusDialogTemplate)
**Best for:** Bulk operations where individual items may succeed or fail independently — bulk delete, bulk enable/disable, batch credential rotation.

A dialog that shows the operation result for each item in a scrollable list. Each row shows the item name and its individual status (success, failed, skipped). A summary at the top shows total counts. Users can dismiss when ready.

Standard regions: summary counts (e.g., "17 succeeded, 3 failed"), per-item result list with status icons, Close button.

---

### 14. Settings Page (SettingsPageTemplate)
**Best for:** Feature-level or account-level settings with multiple categories — notification preferences, access control settings, integration settings.

A settings area with a left navigation listing each settings category. Clicking a category shows its settings on the right. Each category is independently editable with its own Save action.

Standard regions: category navigation (left), settings form area (right), per-section save actions.

---

### 15. Details Page (DetailsPageTemplate)
**Best for:** Full-page views for a single entity that has rich metadata, multiple sections, and potentially multiple tabs.

A comprehensive view of one entity — an account, a credential, a policy, a scan result. The header shows the entity's name, status, and primary actions. The body is organized into tabs or sections. Breadcrumbs show where the entity lives in the hierarchy.

Standard regions: entity header (name, status, primary actions), breadcrumb, tab navigation, tab content areas.

