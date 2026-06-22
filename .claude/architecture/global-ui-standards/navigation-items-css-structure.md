# Navigation Items — CSS Structure, Hierarchy, States, and Indicators

This standard defines the DOM structure, state model, geometry, typography, and token mapping for all navigation items in the application Sidebar.

Use semantic DS tokens for all colors. Do not hardcode screenshot palette values.

---

## Component Layer Structure

```tsx
<NavTree>
  <NavItem level={1} state="default | active | expanded | disabled">
    <NavItemButton>
      <NavItemLeading>
        <NavItemIcon />
      </NavItemLeading>

      <NavItemLabel>Main module</NavItemLabel>

      <NavItemTrailing>
        <NavItemChevron />
      </NavItemTrailing>
    </NavItemButton>

    <NavChildren>
      <NavItem level={2}>...</NavItem>
      <NavItem level={3}>...</NavItem>
      <NavItem level={4}>...</NavItem>
    </NavChildren>
  </NavItem>
</NavTree>
```

---

## Required DOM Layers

```text
nav-item                         ← structural wrapper; owns nesting and tree lines
├── nav-item__tree-rail          ← non-interactive visual hierarchy line
├── nav-item__button             ← only clickable interactive surface
│   ├── nav-item__selection-bar  ← active indicator, absolutely positioned
│   ├── nav-item__leading        ← icon or hierarchy spacer
│   ├── nav-item__label          ← text layer
│   └── nav-item__trailing       ← chevron / split action / menu trigger
└── nav-item__children           ← nested items only
```

The **selection indicator belongs inside `nav-item__button`** — not on the wrapper and not on the text label.

```text
Selection bar:
- visual only
- does not affect layout width
- absolute positioning
- appears only for active / selected item
- uses semantic DS selection token
```

---

## Typography

| Element | Font size | Line height | Weight | Notes |
|---|---:|---:|---:|---|
| Level 1 label | 12px | 16px | 400 | Main module |
| Level 1 active label | 12px | 16px | 500 | Active item only |
| Level 2 label | 12px | 16px | 400 | Secondary module |
| Level 2 active label | 12px | 16px | 500 | Selected item |
| Level 3 label | 12px | 16px | 400 | Tertiary module |
| Level 3 active label | 12px | 16px | 500 | Selected item |
| Level 4 label | 12px | 16px | 400 | Quaternary module |
| Level 4 active label | 12px | 16px | 500 | Selected item |
| Disabled label | 12px | 16px | 400 | Uses disabled semantic text token |

Do not use bold `700` for selected navigation items. The selected state is communicated through the selection surface, left indicator, semantic text color, and medium weight `500`.

---

## Sizing and Spacing

| Element | Value |
|---|---:|
| Navigation item height | 32px |
| Gap between sibling items | 4px |
| Gap between separate navigation groups | 16px |
| Horizontal padding inside item | 8px |
| Main icon | 16 × 16px |
| Chevron / expand icon | 16 × 16px |
| Icon-to-label gap | 8px |
| Label-to-chevron gap | 8px |
| Active selection bar width | 2px |
| Hierarchy rail line width | 1px |

```scss
:root {
  --nav-expanded-width: 224px;
  --nav-collapsed-width: 72px;

  --nav-item-height: 32px;
  --nav-item-gap: 4px;
  --nav-group-gap: 16px;

  --nav-item-padding-inline: 8px;
  --nav-icon-size: 16px;
  --nav-chevron-size: 16px;
  --nav-icon-label-gap: 8px;

  --nav-selection-bar-width: 2px;
  --nav-tree-line-width: 1px;

  --nav-level-1-padding-start: 12px;
  --nav-level-2-padding-start: 32px;
  --nav-level-3-padding-start: 52px;
  --nav-level-4-padding-start: 72px;

  --nav-level-2-tree-line-x: 20px;
  --nav-level-3-tree-line-x: 40px;
  --nav-level-4-tree-line-x: 60px;

  --nav-children-gap: 2px;
}
```

Map all values to the closest existing DS spacing, sizing, and typography tokens before implementation.

---

## Base CSS / SCSS

```scss
.nav-tree {
  display: flex;
  flex-direction: column;
  gap: var(--nav-children-gap);
  min-width: 0;
}

.nav-item {
  position: relative;
  min-width: 0;
}

.nav-item__button {
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  width: 100%;
  min-height: var(--nav-item-height);
  border: 0;
  border-radius: var(--ds-radius-navigation-item);
  padding-block: 0;
  padding-inline: var(--nav-item-padding-inline);
  overflow: hidden;
  text-align: start;
  cursor: pointer;

  background: var(--ds-navigation-item-background-default);
  color: var(--ds-navigation-item-text-default);

  font-size: 12px;
  font-weight: 400;
  line-height: 16px;

  transition:
    background-color var(--ds-motion-fast),
    color var(--ds-motion-fast);
}

.nav-item__leading,
.nav-item__trailing {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
}

.nav-item__leading {
  width: var(--nav-icon-size);
  height: var(--nav-icon-size);
  margin-inline-end: var(--nav-icon-label-gap);
}

.nav-item__trailing {
  width: var(--nav-chevron-size);
  height: var(--nav-chevron-size);
  margin-inline-start: var(--nav-icon-label-gap);
}

.nav-item__label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
}

.nav-item__selection-bar {
  position: absolute;
  inset-block: 0;
  inset-inline-start: 0;
  width: var(--nav-selection-bar-width);
  opacity: 0;
  pointer-events: none;
  background: var(--ds-navigation-item-selection-indicator);
}
```

---

## Level Geometry

### Level 1 — Main Module

Has an optional product icon and may include a chevron.

```text
[12px start] [16px icon] [8px gap] [Label] [auto space] [16px chevron] [8px end]
```

```scss
.nav-item--level-1 > .nav-item__button {
  padding-inline-start: 12px;
  padding-inline-end: 8px;
}
```

Use Level 1 for: Home, Inventory, Policies, Rules, Scans, Settings, Risk management, Deployment.

---

### Level 2 — Secondary Module

Uses a hierarchy rail, not a second product icon.

```text
Tree rail: 20px from navigation container start
Label start: 32px
```

```scss
.nav-item--level-2 > .nav-item__button {
  padding-inline-start: 32px;
  padding-inline-end: 8px;
}

.nav-item--level-2 .nav-item__leading {
  width: 0;
  margin-inline-end: 0;
}

.nav-item--level-2::before {
  inset-inline-start: 20px;
}
```

---

### Level 3 — Tertiary Module

```text
Parent rail: 20px
Current-level rail: 40px
Label start: 52px
```

```scss
.nav-item--level-3 > .nav-item__button {
  padding-inline-start: 52px;
  padding-inline-end: 8px;
}

.nav-item--level-3::before {
  inset-inline-start: 40px;
}
```

---

### Level 4 — Quaternary Module

```text
Parent rails: 20px, 40px
Current-level rail: 60px
Label start: 72px
```

```scss
.nav-item--level-4 > .nav-item__button {
  padding-inline-start: 72px;
  padding-inline-end: 8px;
}

.nav-item--level-4::before {
  inset-inline-start: 60px;
}
```

Level 4 should normally be a terminal leaf. Do not add a fourth-level product icon.

---

## Tree Rail SCSS

```scss
.nav-item--level-2::before,
.nav-item--level-3::before,
.nav-item--level-4::before {
  position: absolute;
  inset-block: 0;
  width: var(--nav-tree-line-width);
  content: "";
  pointer-events: none;
  background: var(--ds-navigation-tree-line);
}
```

Tree rails are decorative. They must not receive focus and must not affect interactive width.

---

## Item States

### Default / Hover / Focus

```scss
.nav-item__button:hover {
  background: var(--ds-navigation-item-background-hover);
  color: var(--ds-navigation-item-text-hover);
}

.nav-item__button:focus-visible {
  outline: var(--ds-focus-ring-width) solid var(--ds-focus-ring-color);
  outline-offset: var(--ds-focus-ring-offset);
}
```

### Active / Selected

```scss
.nav-item--active > .nav-item__button {
  background: var(--ds-navigation-item-background-selected);
  color: var(--ds-navigation-item-text-selected);
}

.nav-item--active .nav-item__label {
  font-weight: 500;
}

.nav-item--active .nav-item__selection-bar {
  opacity: 1;
}
```

Rules:
- Selection bar appears on the inside-left edge of the interactive button.
- Label changes from 400 to 500 only — not bold 700.
- The active surface spans the full usable item width.
- Active route uses `aria-current="page"`.

### Expanded (not selected)

```scss
.nav-item--expanded > .nav-item__button .nav-item__chevron {
  transform: rotate(180deg);
}
```

Expanded does not automatically mean selected. No selected background unless the item is the active route.

### Active Ancestor

An ancestor of the selected item is expanded but not selected.

```scss
.nav-item--active-ancestor > .nav-item__button {
  background: transparent;
  color: var(--ds-navigation-item-text-default);
}

.nav-item--active-ancestor .nav-item__label {
  font-weight: 400;
}
```

Do not apply selected background or selection bar to ancestors. Do not visually compete with the actual selected leaf.

### Disabled

```scss
.nav-item--disabled > .nav-item__button {
  cursor: not-allowed;
  pointer-events: none;
  background: var(--ds-navigation-item-background-disabled);
  color: var(--ds-navigation-item-text-disabled);
}

.nav-item--disabled .nav-item__selection-bar {
  opacity: 0;
}
```

Permission-hidden items must not render at all. Disabled items cannot be active.

---

## Button Types

### Button (whole item navigates)

```tsx
<button className="nav-item__button">
  <span className="nav-item__leading">...</span>
  <span className="nav-item__label">Home</span>
</button>
```

No children, no chevron.

### Split (label navigates, chevron expands)

```tsx
<div className="nav-item__split">
  <button className="nav-item__button nav-item__button--navigate">
    ...
  </button>
  <button className="nav-item__expand-button" aria-label="Expand Inventory" aria-expanded="false">
    <ChevronDownIcon />
  </button>
</div>
```

```scss
.nav-item__split {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 32px;
  min-height: 32px;
  align-items: stretch;
}

.nav-item__expand-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  color: inherit;
}
```

The selection indicator belongs to the navigation button only, not the chevron button.

### Dropdown (entire item toggles children)

```tsx
<button className="nav-item__button" aria-expanded="false">
  <span className="nav-item__label">Infrastructure</span>
  <span className="nav-item__trailing"><ChevronDownIcon /></span>
</button>
```

Chevron is visual only. The entire row toggles children. Do not nest an interactive button inside another interactive button.

---

## Child Container

```scss
.nav-item__children {
  display: grid;
  gap: var(--nav-children-gap);
  min-width: 0;
}

.nav-item__children[hidden] {
  display: none;
}
```

Do not animate height with arbitrary timing values. Use the approved DS motion token only when expand/collapse animation is supported.

---

## Collapsed Navigation

```text
Collapsed item:    40 × 40px interactive area
Collapsed icon:    20 × 20px
Gap between items: 8px
```

Rules:
- Show active Space trigger and Level 1 item icons only.
- Do not show nested levels directly in the collapsed rail.
- Level 2–4 open through a flyout from the Level 1 item.
- Same semantic active state, focus state, and accessible label behavior as expanded.

---

## Group and Children Spacing

| Relationship | Spacing |
|---|---:|
| Parent item to first child | 2px |
| Between child items | 2px |
| Between unrelated navigation groups | 16px |
| Between space switcher and first nav group | 16px |
| Navigation container top/bottom padding | 16px |

---

## Required Token Mapping

Before implementation, map these values to the actual token names available in the navigation package:

```text
224px → navigation expanded width token
72px  → navigation collapsed width token
32px  → navigation item height token
16px  → navigation icon and typography line-height token
12px  → navigation label font-size token
8px   → compact spacing token
4px   → tight item spacing token
2px   → micro spacing token
```

Do not create local one-off token values when an existing DS spacing, sizing, typography, or layout token already matches.

---

## Required Accessibility

```text
- Use <nav> and an accessible tree/list pattern per approved navigation architecture.
- Every icon-only expansion button requires an aria-label.
- aria-expanded belongs to the actual expansion trigger.
- Active route uses aria-current="page".
- Disabled state uses the approved semantic disabled behavior.
- Keyboard focus must land only on interactive layers.
- Tree rails and selection bars are decorative — hidden from assistive technology.
```

---

## QA Blocking Rules

```text
- Selection bar placed on wrapper instead of interactive button.
- Active item uses font-weight 700.
- Nested levels duplicate product icons.
- Tree hierarchy lines are clickable or receive focus.
- Split navigation nests one button inside another.
- Chevron action triggers route navigation when it should only expand.
- Active ancestor receives the same selected surface as the active leaf.
- Disabled items remain clickable.
- Raw colors, font values, or local hover states override DS tokens.
- Screenshot values copied without mapping to approved DS tokens.
- Template adds outer page padding that duplicates Main Content padding (48px 24px).
```
