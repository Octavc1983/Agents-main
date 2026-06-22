# Scrolling and Layout Policy

## Main Content Padding Ownership

`Main Content` owns the only outer page padding:

```scss
padding: 48px 24px;
// 48px → top and bottom outer spacing
// 24px → left and right page gutters
```

Templates render inside this padded area and must NOT add another outer padding layer.

```text
AppShell
└── Main Content
    ├── padding: 48px 24px   ← owned here only
    └── Template
        ├── Wizard
        ├── Vertical Tabs Configuration
        ├── FATLINES List + Master Details
        ├── FullScreen Form
        └── Details Page
```

Templates may define only internal spacing between their own regions:

```text
- left rail to content canvas gap
- filter panel to list gap
- list to details split gap
- section spacing
- footer action alignment
- internal panel padding
```

Templates must NOT add:

```text
- padding: 48px 24px  (outer page padding)
- duplicated page gutters
- outer max-width wrappers
- compensating negative margins
- extra top spacing that recreates Main Content padding
- nested wrappers only to recreate Main Content spacing
```

QA Failing: template adds outer padding that duplicates `Main Content padding: 48px 24px`.

---

## Scrollbar Rule

All `overflow-y: auto` containers must use `@include ds-scrollbar`.

No exceptions.

---

## Scroll Ownership — General Rule

Each scrollable region owns its own vertical scroll. Regions must not share a scroll container.

Common pattern:

```text
Page Header       → fixed
Summary / Filter Bar → fixed
Content region    → owns vertical scroll
Footer / Actions  → fixed
```

---

## Fixed vs Scrollable Regions

The following must always be fixed (must not scroll away):

```text
- AppShell Header
- Global Sidebar
- Wizard / Template Header
- Wizard Stepper / Tab Rail
- Summary Bar / Bulk Action Bar
- Dialog Header
- Dialog Footer
- Filter Panel Header
- Filter Panel Footer
- Details Panel Header
- Page Footer / action bar
```

The following own vertical scrolling:

```text
- Main Content Canvas (Wizard / Vertical Tabs)
- Table / FATLINES list body
- Dialog / Modal content body
- Filter Panel content
- Master Details content
- Card list content
- Drawer content
```

---

## Filter Panel Layout

Filter panels must be:

```text
- Position: fixed within the template workspace
- Height: fills available workspace height
- Header: fixed
- Content: independently scrollable
- Footer: fixed
- Body overflow: locked when filter panel is open
```

Do not render filter panels inside page scroll containers.

---

## Split Pane Rule

FATLINES List + Master Details layout:

```text
- List Pane owns its own vertical scroll.
- Details Pane owns its own vertical scroll.
- Both are sibling regions — never one shared scroll container.
- The split workspace does not own vertical scroll.
- The Summary Bar above both panes is fixed.
```

---

## CSS `overflow-y: auto` Is Not Virtualization

`overflow-y: auto` provides a scrollable container. It is not virtualization.

Virtualization = only rendering visible rows (e.g. react-window, react-virtual).

When a list may exceed 200 items: report a capability gap for virtualization rather than claiming it is handled.
