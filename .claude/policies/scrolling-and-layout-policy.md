# Scrolling and Layout Policy

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
