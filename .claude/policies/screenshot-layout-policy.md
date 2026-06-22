# Screenshot Layout Policy

## Screenshots Define Layout, Not Theme

Screenshots and Figma references are the **layout and behavior specification source** — not the visual theme source.

### Claude MUST use screenshots to infer and implement:

```text
- spacing, padding, margins, gaps
- component density
- widths, heights, alignment, placement
- content hierarchy and column order
- row height, section spacing, container sizing
- overflow behavior, sticky regions, scroll boundaries
- responsive layout behavior
- split-pane proportions
- fixed versus scrollable regions
- Filter Panel placement
- left rail / content canvas proportions
```

### Claude MUST NOT copy from screenshots:

```text
- color palette or theme mode
- background colors, border colors, shadow values
- typography family or weight
- hover or focus colors
- custom icon colors
- component internals
```

All visual styling must come from the active Design System theme and approved SCSS tokens.

---

## DS Token Mapping Rule

When a screenshot shows a spacing or sizing value:

```text
1. Map to the closest approved DS token.
2. If no exact match: use closest token and document the mapping.
3. Do not introduce page-local hardcoded values when a DS token exists.
```

---

## Required Screenshot Layout Analysis Output

For every screenshot-driven implementation:

```markdown
### Screenshot Layout Analysis

| Area | Screenshot Requirement | DS Mapping | Decision |
|---|---|---|---|
```

---

## Component Boundary Rule

Claude may update layout composition **around** a DS component (container padding, page grid, section gap, column width, placement, content density via approved variants).

Claude must NOT change internal styling of DS components through CSS overrides.

If a screenshot requires an internal component capability the DS does not expose → create a DS Gap. Do not force through CSS overrides.

---

## QA Failing Conditions

```text
- Screenshot spacing or alignment ignored without explanation.
- Hardcoded spacing added when DS token exists.
- DS gap exists but CSS override used instead.
- DS component internal styling overridden to match screenshot.
- Screenshot colors or theme copied.
- Full-page scroll introduced where screenshot shows region-level scroll.
- Layout density differs materially from screenshot without documented reason.
```
