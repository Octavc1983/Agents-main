---
description: Build a pixel-perfect component from an image, screenshot, or Figma reference.
argument-hint: "<reference-image-or-figma-url> <component-name> [target-path]"
agent: pixel-perfect-component-builder
---

Use the `pixel-perfect-component` skill and the `pixel-perfect-component-builder` agent.

Build a production-ready component from this reference:

```text
Reference: $ARGUMENTS
```

Follow this exact process:

1. Inspect the image or Figma frame.
2. Identify the component boundaries.
3. Analyze layout, spacing, typography, states, icons, borders, and hierarchy.
4. Search the repository for existing DS components and similar implementations.
5. Map all visible UI elements to approved DS components and tokens.
6. Build the component in React, TypeScript, and SCSS.
7. Use the project naming and folder conventions.
8. Create typed props and reusable variants.
9. Implement relevant states:

   * Default
   * Hover
   * Focus
   * Selected
   * Disabled
   * Loading
   * Empty
   * Error
   * Responsive

10. Build a local demo using realistic mock data.
11. Compare the implementation to the reference and refine visual mismatches.
12. Do not modify DS source components.
13. Do not introduce libraries or raw hard-coded styling values.
14. Return the completion report defined in the skill file.
15. Run a QA pass using the Code Quality QA Agent (`.claude/agents/_core/code-quality-qa-agent.md`):

    ```text
    QA scope:
    Post-build component quality review.

    Target page, route, feature, or folder:
    The component files created in this session.

    Known issues:
    Check for unused imports, broken imports, dead code, hardcoded values,
    inline styles, SCSS nesting violations, and local style duplication against tokens.

    Files allowed to modify:
    The component files created in this session only.

    Files not allowed to modify:
    src/components/layout/
    src/design-system/
    src/styles/
    Any existing DS or Infra files.

    Should fixes be applied automatically:
    yes

    Known constraints:
    Use existing components and tokens only.
    Do not create DS components.
    Do not create new tokens.
    Do not add libraries.
    Do not use inline styles.

    Telemetry requirement:
    none

    Validation commands allowed:
    typecheck

    Can runtime validation commands be run:
    yes
    ```

    Apply only safe, targeted fixes. Do not refactor the component structure or visual logic.

Prioritize visual fidelity, Design System compliance, accessibility, and maintainability equally.

---

## Strict Visual Validation Mode

The component must not be considered complete until it passes the following visual checks:

- Container width and height match the reference within a practical tolerance.
- Major spacing values match the reference rhythm.
- Typography hierarchy matches the reference visually.
- Icon alignment matches the text baseline.
- Borders, radius, shadows, and dividers match the reference.
- Selected, active, and hover states are visually distinguishable.
- Long labels do not break the layout.
- The component remains visually stable at 320px, 768px, 1024px, and 1440px widths.
- Any mismatch caused by Design System constraints must be documented clearly.

---

## Image Analysis Output Template

Before coding, generate this analysis:

```md
## Visual Analysis

### Reference
- Source:
- Component:
- Approximate dimensions:

### Layout
- Main container:
- Internal sections:
- Primary axis:
- Alignment:
- Fixed elements:
- Flexible elements:

### Spacing
- Outer padding:
- Row gap:
- Icon-to-label gap:
- Divider spacing:
- Action spacing:

### Typography
- Main label:
- Secondary text:
- Metadata:
- Truncation behavior:

### States
- Default:
- Hover:
- Selected:
- Disabled:
- Loading:
- Error:

### DS Mapping
| Visual Element | DS Component / Token |
|---|---|
| Container | |
| Title | |
| Label | |
| Icon | |
| Divider | |
| Selected state | |
| Border radius | |
| Shadow | |

### Responsive Assumptions
- Desktop:
- Tablet:
- Mobile:
```
