# Shared Layout Standard — FullScreenWizardTemplate and VerticalTabsConfigurationTemplate

This standard applies to two full-screen Main Content templates:

- `FullScreenWizardTemplate`
- `VerticalTabsConfigurationTemplate`

Both templates share the same structural layout shell. Their differences are in the left navigation rail behavior and footer action semantics.

---

## Template Boundary

The following are outside both templates:

```text
- AppShell
- Global Sidebar
- Application Header
- Global Space navigation
- Global utility actions
```

The template starts inside Main Content:

```text
AppShell
├── Sidebar                         ← outside template
├── Application Header              ← outside template
└── Main Content
    └── Wizard / Vertical Tabs Template
```

---

## 1. Shared Main Content Layout Structure

```text
Wizard / Vertical Tabs Template
├── Context Navigation Row
│   ├── Optional Back action
│   ├── Current step / section position
│   └── Optional Previous / Next navigation
│
├── Template Header
│   ├── Optional page icon
│   ├── Title
│   ├── Optional information trigger
│   ├── Subtitle
│   └── Optional text link
│
├── Main Workspace
│   ├── Left Navigation Rail
│   └── Scrollable Main Content Canvas
│
└── Fixed Footer Actions
    ├── Optional secondary text action
    ├── Secondary actions
    └── Primary action
```

---

## 2. Context Navigation Row

Appears above the template title.

May contain:

```text
- Back action
- Previous step control
- Current position indicator (e.g. "‹ 2 of 24 ›")
- Next step control
- Current section count
```

Rules:

```text
- Template-level navigation only — not global product navigation.
- Must not change the selected Sidebar item.
- Must not replace the Wizard Stepper or Vertical Tab Rail.
- Reflects current location only.
- Remains outside the content scroll region.
```

For FullScreenWizardTemplate:

```text
Previous → follows approved Back-navigation and reset rules
Next     → available only when current step may be entered safely
```

For VerticalTabsConfigurationTemplate:

```text
Previous / Next → optional
→ navigates between visible tabs only
→ must preserve tab draft state
→ must not bypass validation required for page-level save
```

---

## 3. Template Header

Positioned above the main two-column layout, centered within the content workspace.

```text
Template Header
├── Optional icon
├── Title
├── Optional information trigger
├── Subtitle
└── Optional contextual link
```

Rules:

```text
- Describes the current Wizard or configuration context.
- Not the global Application Header.
- Must remain visible above the workspace.
- May be fixed when the full template has long content.
- Title and subtitle use active DS typography APIs only.
- Information trigger requires localized accessible name.
- Text link is optional and must have a clear destination or action.
```

Screenshot defines: centered title composition, subtitle directly below title, optional text link adjacent to subtitle. Do not copy screenshot colors, icon styling, typography values, or borders.

---

## 4. Left Navigation Rail

The structural navigation area for the active template. Uses a stable width category and remains visually aligned from the top of the workspace to above the footer.

### FullScreenWizardTemplate Rail

```text
- Wizard step list
- Current step indicator
- Completed step indicator
- Warning / failure indicator
- Locked future step state
- Optional progress summary
```

Rules:

```text
- Represents sequential progress.
- Future required steps remain locked until dependencies are met.
- Completed steps are selectable only when Back behavior allows it.
- In-progress or irreversible steps are not safely navigable.
- Status must not rely on color alone.
- Step labels remain localized and accessible.
```

### VerticalTabsConfigurationTemplate Rail

```text
- Vertical tab labels
- Active tab indication
- Optional dirty-state indicator
- Optional warning / invalid indicator
- Optional locked or read-only indicator
```

Rules:

```text
- Tabs represent configuration domains, not sequence.
- Users may move freely between available tabs.
- Dirty tab state persists when switching tabs.
- Locked is used for dependency restrictions.
- Read-only is used for lifecycle or permission restrictions.
- Tab navigation does not automatically save or discard drafts.
```

---

## 5. Main Content Canvas

Central working area. Receives remaining available width. Owns vertical scrolling.

```text
Main Content Canvas
├── Form content
├── Checklist
├── Configuration sections
├── Technical action results
├── Validation feedback
├── Logs / reports actions
├── Empty / loading / error states
└── Contextual help
```

Rules:

```text
- The main canvas owns vertical scrolling.
- It must fill the remaining workspace width.
- It must not create full-page scrolling by default.
- It must preserve scroll position when moving between tabs where feasible.
- Validation scrolls only within this canvas.
- The Header, Context Navigation Row, Left Rail, and Footer remain outside this scroll region.
```

---

## 6. Fixed Footer Actions

Spans the content workspace width below the main workspace. Does not include the Sidebar.

```text
Fixed Footer
├── Optional low-emphasis action
├── Secondary actions
└── Primary action
```

Recommended action hierarchy:

```text
Left / low-emphasis side:
- Back
- Cancel
- Save draft
- Exit setup

Right / completion side:
- Previous
- Secondary action
- Primary action
```

Examples:

```text
[Back]                         [Save draft] [Cancel] [Next]
[Abort migration]              [Check status] [Resume]
[Cancel]                       [Reset] [Save changes]
```

Rules:

```text
- Footer remains fixed while content scrolls.
- Only one Primary Button appears in the footer.
- Primary action is outcome-specific.
- Footer buttons never scroll away.
- Buttons are disabled during unsafe active operations.
- Destructive actions require approved confirmation behavior.
- Footer is outside the content scroll container.
```

---

## 7. Scroll Ownership

```text
Context Navigation Row     → fixed
Template Header            → fixed
Left Navigation Rail       → fixed (independently scrollable only when steps/tabs overflow)
Main Content Canvas        → owns vertical scrolling
Footer Actions             → fixed
Full page                  → does not own vertical scrolling by default
```

Do not allow:

```text
- Header to scroll away
- Footer to scroll away
- Stepper / Tab Rail to scroll with content
- entire Main Content to become one uncontrolled scroll container
```

---

## 8. Responsive Behavior

```text
Desktop
→ persistent left rail, wide content canvas, fixed footer

Medium width
→ narrower left rail, content remains primary width

Small width
→ rail becomes approved section selector, Drawer, or compact navigation control
→ content remains the active scroll region
→ footer remains fixed
```

Do not squeeze the rail and content canvas into unusable narrow columns. The active step or active tab must remain visible and accessible at every viewport size.

---

## 9. Screenshot Layout Mapping

Use screenshots as the source of truth for:

```text
- left rail placement
- two-column workspace composition
- main content canvas placement
- header alignment
- context navigation placement
- footer location
- action alignment
- fixed versus scrollable regions
- content area proportions
- visual spacing between rail and canvas
```

Do NOT use screenshots as the source of truth for:

```text
- colors
- typography styling
- icon color
- border color
- shadow
- Button styling
- hover state
- focus state
- component internals
```

All dimensions, spacing, and layout proportions must map to approved DS layout tokens or approved application layout primitives.

---

## 10. QA Blocking Rules

Implementation fails QA when:

```text
- Sidebar or Application Header is implemented inside the template.
- Left navigation rail scrolls away with the content canvas.
- Footer actions scroll away.
- Full page becomes the main scroll owner.
- Wizard steps are treated as free navigation tabs.
- Vertical configuration tabs are treated as strict Wizard steps.
- Tab changes silently clear draft data.
- Wizard Back navigation silently resets downstream progress.
- Header, rail, and footer are included inside the same scroll container.
- Screenshot theme or component visuals are copied through local styling.
- Page-local hardcoded dimensions are used where approved layout tokens exist.
```
