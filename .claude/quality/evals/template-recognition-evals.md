# Template Recognition Evals

Regression scenarios for the Template Recognition and Lifecycle Agent and Skill.

Each scenario defines: input → expected detected template → expected logic loaded.

---

## Eval 1 — Table with Filters and Bulk Actions

**Input:**
> Build a table with search, filters, bulk actions, and a three-dots row menu.

**Expected detected template:** `TableFiltersTemplate`

**Expected logic loaded:**
- Search
- Filter panel (draft vs applied)
- Active filter chips + clear
- Result summary
- Sorting
- Row selection (checkbox)
- Three-dots row action menu
- Bulk action toolbar (SelectionBar)
- Bulk Status Dialog
- Loading / empty / no-results / error states
- Telemetry candidates
- TW review

**Must not do:**
- Generate a one-off page without template detection
- Skip bulk actions or Bulk Status Dialog
- Ask the user which command to run

---

## Eval 2 — Row Click Opens Details

**Input:**
> Clicking a table row should switch into a left card list and right details view.

**Expected detected template:** `TableMasterDetailsTemplate`

**Expected logic loaded:**
All TableFiltersTemplate logic plus:
- Persistent page-level toolbar
- View mode switching (table ↔ master details)
- Context preservation across mode changes
- Details loading / empty / error states
- Row click behavior separated from checkbox and menu

**Must not do:**
- Treat as a simple TableFiltersTemplate without details mode
- Lose filter/search/summary state when switching modes

---

## Eval 3 — Card List Master Details

**Input:**
> Build a 30/70 layout with cards on the left and details on the right.

**Expected detected template:** `CardListMasterDetailsTemplate`

**Expected logic loaded:**
- 30/70 split
- Vertical selectable card list
- Selected card state
- Details panel states (loading, empty, error)
- Item switching
- Search and filter state from page-level context

**Must not do:**
- Use TableFiltersTemplate without a card list
- Skip selected card state

---

## Eval 4 — Tiles Dashboard

**Input:**
> Create a dashboard with KPI tiles, charts, and drill-down widgets.

**Expected detected template:** `TilesDashboardTemplate`

**Expected logic loaded:**
- Widget grid layout
- Dashboard filters
- Data freshness indicator
- Tile loading / error / empty states per tile
- Drill-down interaction
- Telemetry per widget engagement

**Must not do:**
- Use TableFiltersTemplate
- Generate a hardcoded KPI layout without slot structure

---

## Eval 5 — Canvas

**Input:**
> Create a canvas for nodes and connected workflow steps.

**Expected detected template:** `CanvasTemplate`

**Expected logic loaded:**
- Empty canvas state
- Pan / zoom behavior
- Node selection
- Undo / redo contract
- Save and unsaved-changes state
- Keyboard shortcuts
- Telemetry for node/connection actions

**Must not do:**
- Use a table or dashboard template
- Generate a static canvas without interaction contract

---

## Eval 6 — Zero State Configuration with Vertical Tabs

**Input:**
> Create an empty configuration page with vertical tabs on the left and setup content on the right.

**Expected detected template:** `ZeroStateConfigurationTemplate`

**Expected logic loaded:**
- Vertical tab navigation
- Zero state explanation + CTA
- Tab completion/error indicators
- Configuration section validation
- Save / cancel / unsaved-changes warning
- Permission and feature-availability states

**Must not do:**
- Use FormPageTemplate
- Skip zero state and go directly to a form

---

## Eval 7 — Wizard

**Input:**
> Create a multi-step onboarding setup.

**Expected detected template:** `WizardTemplate`

**Expected logic loaded:**
- Step navigation
- Progress indicator
- Back / next / cancel
- Step validation
- Save and resume contract
- Completion state

**Must not do:**
- Use FormPageTemplate for a multi-step flow
- Skip progress indicator

---

## Eval 8 — Confirmation Dialog

**Input:**
> Create a confirmation popup for deleting several entities.

**Expected detected template:** `ConfirmationDialogTemplate`

**Expected logic loaded:**
- Consequence copy with "can't be undone"
- Destructive CTA naming the object
- Cancel action (secondary)
- Focus management
- Escape behavior

**Must not do:**
- Use DialogFlowTemplate without destructive styling
- Use "OK" or "Yes" as the primary CTA
- Generate a full page

**Navigation check:**
- Must confirm this is a modal, not a route

---

## Eval 9 — Screenshot of Scans Table

**Input:**
> Build this screen from the attached screenshot.
(Screenshot: Scans page showing table with filters, filter panel, active chips, row actions, three-dots menus, status chips)

**Expected detected template:** `TableFiltersTemplate`

**Expected first response:**
```text
Template detected: TableFiltersTemplate

Included logic:
Search, filters, active filter chips, result summary,
row actions (three-dots menu), bulk actions, Bulk Status Dialog,
loading / empty / no-results / error states,
telemetry candidates, TW review, QA checks.

Missing context:
Does this page need a route and sidebar placement?
Should row click open master-details?
```

**Must not do:**
- Start generating Scans page code immediately
- Ask which command to run
- Skip bulk actions or row actions

---

## Eval 10 — Unknown Pattern (New Template Candidate)

**Input:**
> Build a screen with two resizable panels separated by a draggable divider, where each panel independently loads different entity types.

**Expected:** New Template Candidate detected

**Expected response:**
```markdown
### New Template Candidate Detected

I could not confidently match this screen to an existing template.

Template candidate:
DualPanelResizableTemplate

Why it is new:
No existing template covers independently resizable dual-panel layouts with separate data sources.

Potential future reuse:
[list likely pages]

Current status:
Draft specification created. No implementation code was created.

Approval needed:
Should this become a reusable template?
```

**Must not do:**
- Force this into TableMasterDetailsTemplate or CardListMasterDetailsTemplate
- Generate implementation code without approval

---

## Eval 11 — Skeleton Loading: Table Page

**Input:**
> Add skeleton loading to the Scans table page.

**Expected:**
- Skeleton Loading Intelligence Agent activated
- Template type: TableFiltersTemplate
- Skeleton regions mapped: title, toolbar, table header, 8 table rows
- Tokens only: `$color-surface-idle`, `$spacing-*`, `$border-radius-*`
- `aria-busy="true"` on container, `aria-hidden="true"` on shapes
- No new DS components created
- No inline styles

**Must not do:**
- Generate a generic spinner only
- Create a new Skeleton DS component
- Use hardcoded color values

---

## Eval 12 — Medium Confidence Detection

**Input:**
> Build a page where users can see a list and click items to see more info.

**Expected:** Medium confidence → `TableMasterDetailsTemplate` suggested

**Expected response:**
```text
I identified this as likely TableMasterDetailsTemplate.
One clarification: should clicking an item open a details panel inline (master-details), 
or navigate to a separate details page?
```

**Must not do:**
- Choose a template automatically without asking
- Generate code before answer is received
