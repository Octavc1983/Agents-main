---
name: pixel-perfect-component
description: Build a production-ready React component from a visual reference image with pixel-perfect layout fidelity, Design System compliance, responsive behavior, and visual validation.
---

# Pixel-Perfect Component Skill

## Mission

Transform a visual reference image into a production-ready React component that is visually faithful, structurally clean, accessible, responsive, and aligned with the existing Design System.

The visual reference image is the primary source of truth for:

- Layout
- Spacing
- Alignment
- Component hierarchy
- Visual density
- Typography hierarchy
- States visible in the reference
- Borders
- Shadows
- Radius
- Icon placement
- Content grouping
- Responsive intent when visible

The existing Design System is the source of truth for:

- Component selection
- Typography styles
- Color tokens
- Spacing tokens
- Radius tokens
- Elevation tokens
- Interaction states
- Accessibility behavior
- Existing UI patterns

Never use raw visual values when an existing token or DS component is available.

---

# Inputs

The skill expects the following input:

```text
Reference Image:
[image path, screenshot, Figma export, or attached image]

Component Name:
[example: SpacesNavigationItem]

Target Path:
[example: src/components/navigation/SpacesNavigationItem]

Optional Context:
- Parent page or container
- Existing component to extend
- Required states
- Data shape
- Responsive requirements
- Figma node URL
- Existing DS component names
```

---

# Required Workflow

## Phase 1 — Visual Forensics

Before writing code, inspect the reference image carefully.

Extract and document:

1. Component boundaries.
2. Parent and child regions.
3. Horizontal and vertical alignment.
4. Padding and internal gaps.
5. Grid or flex behavior.
6. Typography hierarchy.
7. Icon sizes and alignment.
8. Divider placement.
9. Border thickness.
10. Border radius.
11. Background layers.
12. Elevation or shadows.
13. Hover, selected, disabled, active, expanded, or error states visible in the image.
14. Repeated patterns that should become reusable subcomponents.
15. Areas that may be cropped, hidden, truncated, scrollable, or dynamically sized.

Do not begin implementation until the visual structure is understood.

---

## Phase 2 — Design System Mapping

Map every visible visual decision to an existing Design System primitive.

Example:

```text
Reference Image Element
→ DS Mapping

Main container
→ Card / Surface / Panel component

Title
→ Typography.heading-sm

Secondary description
→ Typography.body-sm / color.content.secondary

Active navigation state
→ color.navigation.item.background.selected

Vertical divider
→ color.border.subtle

Chevron
→ DS icon / size.icon.sm

Horizontal spacing
→ space.8 / space.12 / space.16
```

Rules:

* Prefer existing DS components over custom implementations.
* Prefer semantic tokens over core color tokens.
* Prefer aliases over raw values.
* Do not modify DS source files.
* Do not create a new DS component unless the requested UI cannot be composed from existing primitives.
* If a visual value cannot be mapped exactly, choose the closest approved token and document the deviation.

---

## Phase 3 — Component Architecture

Build the component using a clear hierarchy.

Example:

```text
Component
  Header
    Title
    Actions
  Content
    Item List
      Item
        Icon
        Label
        Metadata
        Action
  Footer
```

Rules:

* Use semantic HTML.
* Keep components small and composable.
* Do not create deeply nested markup without purpose.
* Avoid anonymous inline styles.
* Avoid one-off CSS values.
* Separate structural layout from visual states.
* Use predictable BEM-style SCSS naming.
* Support configurable labels, icons, data, states, and callbacks through props.
* Do not hard-code mock content into the production component.

---

## Phase 4 — Implementation

Implement the component with:

```text
React
TypeScript
SCSS
Existing Design System components
Existing Design System tokens
Existing icon library
```

Required files:

```text
ComponentName.tsx
ComponentName.scss
ComponentName.types.ts
ComponentName.demo.tsx
```

---

## Phase 5 — Required States

Every component must support applicable states.

Evaluate whether the component requires:

```text
Default
Hover
Focus
Pressed
Selected
Active
Active Path
Expanded
Collapsed
Disabled
Loading
Empty
Error
Success
Read-only
Permission Restricted
```

Do not invent states that are irrelevant.

If a state is visible in the reference image, it is mandatory.

---

## Phase 6 — Responsive Behavior

Infer responsive behavior from the layout.

Define:

```text
Desktop
Tablet
Mobile
```

For each breakpoint, evaluate:

* Width behavior
* Height behavior
* Wrapping versus truncation
* Visibility changes
* Stack direction
* Scroll behavior
* Action overflow behavior
* Icon-only fallback behavior
* Drawer, popover, or compact mode behavior where applicable

Never solve responsiveness by simply shrinking all elements.

---

## Phase 7 — Pixel-Perfect Validation

After implementation, validate the rendered result against the source image.

Compare:

```text
Overall dimensions
Container boundaries
Horizontal alignment
Vertical alignment
Spacing rhythm
Typography hierarchy
Text density
Icon placement
Border and divider placement
Radius
Visual weight
Background contrast
Selected state emphasis
Shadow intensity
Content truncation
Scroll behavior
```

Perform at least three validation passes:

### Pass 1 — Structural Match

Validate:

* Main layout
* Correct regions
* Alignment
* Widths
* Heights
* Content hierarchy

### Pass 2 — Visual Match

Validate:

* Spacing
* Typography
* Colors
* Borders
* Radius
* Icons
* Shadows
* Density

### Pass 3 — Interaction and Edge Cases

Validate:

* Hover
* Focus
* Disabled
* Loading
* Empty
* Long labels
* Missing optional data
* Narrow width
* Keyboard navigation
* Screen-reader labels

Do not declare the work complete until all major mismatches are resolved.

---

# Pixel-Perfect Rules

## Layout Rules

* Use Auto Layout principles in code through Flexbox or CSS Grid.
* Do not position elements absolutely unless the reference requires overlay behavior.
* Use minimum and maximum width constraints intentionally.
* Use `min-width: 0` on flex children that require ellipsis behavior.
* Use `overflow: hidden`, `text-overflow: ellipsis`, and `white-space: nowrap` only when the reference clearly implies truncation.
* Preserve visual rhythm using spacing tokens.

## Typography Rules

* Use existing typography tokens and styles.
* Do not use raw font sizes unless no token exists.
* Match text hierarchy before matching pixel-level font sizes.
* Use line-height deliberately.
* Verify text baseline alignment with icons and controls.
* Ensure long labels do not break layout.

## Icon Rules

* Use existing system icons.
* Do not replace an icon with a Unicode symbol.
* Match icon size, optical weight, and alignment.
* Ensure icon hit areas meet accessibility requirements.
* Keep icon-only buttons accessible with `aria-label`.

## Color Rules

* Use semantic token aliases.
* Do not use raw hex values.
* Do not assume Light and Dark mode values are equivalent.
* Maintain accessible contrast.
* Use a stronger state distinction than color alone when possible.

## CSS Rules

* Use SCSS.
* Use variables and tokens already available in the project.
* Do not add a new styling framework.
* Do not create global styles unless required.
* Scope all component styles.
* Use BEM naming:

```text
.componentName
.componentName__header
.componentName__content
.componentName__item
.componentName__item--selected
.componentName__item--disabled
```

---

# Quality Gate

The component is complete only when all requirements are met.

## Visual Fidelity

* [ ] Overall structure matches the reference.
* [ ] Layout alignment matches the reference.
* [ ] Component dimensions are visually equivalent.
* [ ] Spacing is consistent and token-based.
* [ ] Typography hierarchy matches the reference.
* [ ] Icons are correctly sized and positioned.
* [ ] Borders, dividers, shadows, and radii match the visual intent.
* [ ] Selected, active, and hover states are visually clear.

## Design System Compliance

* [ ] Existing DS components were reused where applicable.
* [ ] Existing DS tokens were used.
* [ ] No raw colors were introduced.
* [ ] No raw spacing values were introduced unless unavoidable.
* [ ] No DS files were modified.
* [ ] No new dependency was added.

## Functional Quality

* [ ] Component accepts real data through typed props.
* [ ] Component supports required interaction callbacks.
* [ ] Component supports loading, empty, error, and disabled states where applicable.
* [ ] Component works with long labels and variable content.
* [ ] Component works at desktop, tablet, and mobile widths.
* [ ] Keyboard navigation is supported.
* [ ] Focus state is visible.
* [ ] Accessible labels are present.

## Code Quality

* [ ] TypeScript types are complete.
* [ ] No `any` types unless unavoidable and justified.
* [ ] No duplicated logic.
* [ ] No hard-coded production content.
* [ ] SCSS naming is consistent.
* [ ] Files follow repository conventions.
* [ ] The implementation does not break existing components.

---

# Required Final Output

After implementation, provide a concise delivery summary:

```text
Component:
[Component Name]

Created Files:
- [file path]
- [file path]
- [file path]

DS Components Used:
- [component names]

Tokens Used:
- [token groups]

States Implemented:
- [states]

Responsive Behavior:
- Desktop:
- Tablet:
- Mobile:

Visual Validation:
- Match level:
- Remaining intentional deviations:
- Reason for each deviation:

Manual QA Checklist:
- [items]
```

---

# Do Not

* Do not start coding before analyzing the image.
* Do not approximate randomly.
* Do not use raw hex colors.
* Do not use raw spacing values when tokens exist.
* Do not add new libraries.
* Do not modify the Design System.
* Do not hard-code fixed text as component logic.
* Do not ignore long-label behavior.
* Do not skip loading, empty, error, and disabled states when applicable.
* Do not claim pixel-perfect fidelity without comparing the output to the image.
