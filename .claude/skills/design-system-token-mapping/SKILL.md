# Design System Token Mapping

## Purpose

Map Figma Variables, Figma token files, SCSS variables, and CSS custom properties into a clear, verified token layer for React prototype implementation.

This skill ensures that every visual value used in a prototype comes from an existing token — not from an inline style, not from a hardcoded value, and not from a duplicate local variable.

---

## When to Use

Use this skill when:

- Starting a new prototype page and needing to confirm token coverage before building
- Figma Variables are available and need to be matched to project SCSS tokens
- A prototype review reveals hardcoded values that should use tokens
- A new design uses colors, spacing, or typography values not yet in the project tokens
- Token gaps need to be formally documented before work continues

Run this skill before or alongside the Visual to Infra Mapping skill.

---

## Inputs Required

- Figma frame or Figma Variables panel (via MCP or manual description)
- Target page or component scope
- List of known visual styles that need token coverage (optional)

---

## Required Project Inspection

Before producing any token mapping:

1. Read all SCSS token files:
   - `src/design-system/tokens/_colors.scss`
   - `src/design-system/tokens/_spacing.scss`
   - `src/design-system/tokens/_typography.scss`
   - `src/design-system/tokens/_radius.scss`
   - `src/design-system/tokens/_shadows.scss`
   - `src/design-system/tokens/index.scss`
2. Read `src/styles/_variables.scss` — this is the broader project token file
3. Read `:root` CSS custom property definitions
4. Identify which tokens are available under which import path
5. Note any duplicate token names across files (e.g. `$color-primary` in both `_colors.scss` and `_variables.scss`) — these must be resolved to avoid SCSS ambiguity errors

---

## Required Workflow

1. Inspect all token files listed above.
2. Extract Figma Variables from MCP or description.
3. For each Figma variable / visual value, find the closest existing project token.
4. Confirm the token is importable from the correct SCSS file without ambiguity conflicts.
5. Document every token gap — a visual value that has no matching token.
6. For token gaps: document the gap, propose the token name and value, but do not create the token automatically without approval.
7. Produce a complete token mapping table.
8. Flag any duplicate token names that would cause SCSS `@use as *` ambiguity errors.

---

## Token Categories to Map

For every prototype page, confirm coverage across:

- Page background
- Surface / panel background
- Sidebar / navigation background
- Table header background
- Table row hover background
- Table row selected background
- Vertical divider color
- Text primary
- Text secondary / muted
- Text inverse
- Border / outline color
- Primary action color (button, link)
- Active / selected state color
- Status: success, warning, error, idle / pending
- Icon color idle / selected
- Spacing scale (xs, sm, md, lg, xl)
- Border radius (sm, base, md, full)
- Shadows (sm, base, md)
- Transition timing (fast, base, slow)
- Typography: font family, font sizes, font weights, line heights
- Tab colors if DS Tabs component is used
- Animation duration and easing

---

## Must Do

- Read all token files before producing any mapping
- Map every visual value to an existing token
- Confirm each token is importable without SCSS ambiguity
- Document every token gap explicitly
- Flag duplicate token definitions across files
- Keep token mapping table complete and review-ready
- Propose gap resolution (new token name + value) without creating it automatically

---

## Must Not Do

- Create new tokens without explicit approval
- Duplicate existing tokens under a new name
- Hardcode hex colors, spacing values, font sizes, or radius values
- Create a second theme file
- Override global DS styles unless explicitly approved
- Use `@use` with `as *` if the result will cause duplicate variable ambiguity
- Modify the official Infra library
- Skip reading existing token files

---

## Output Format

```markdown
### Token Mapping Summary

Short description of the scope covered.

### Token Files Inspected

List all files read.

### Token Mapping

| Style Type | Visual Usage | Existing Token | SCSS File | Import Path | Notes |
|---|---|---|---|---|---|

### Duplicate Token Warnings

List any token names that appear in multiple files.
Specify which file to use for each case.

### Token Gaps

| Style Type | Visual Value | Proposed Token Name | Proposed Value | Notes |
|---|---|---|---|---|

### Recommended Action for Gaps

Choose one per gap:
- Use closest existing token (with documented difference)
- Request DS team to add this token
- Document as known prototype-only deviation

### SCSS Import Recommendations

List which token files should be imported per SCSS module and how (namespace vs. wildcard).

### Final Recommendation

Choose one:
- Full token coverage — safe to implement
- Minor gaps — safe with documented deviations
- Significant gaps — needs DS team input before implementation
- Blocking gaps — cannot implement without new tokens
```

---

## Example Prompt

```
Use the Design System Token Mapping skill.

Goal:
Map the visual styles from [FIGMA_SOURCE or PAGE_NAME] to existing project tokens before implementation.

Scope:
[Page name or component list]

Important:
Use existing tokens only.
Do not create new tokens without reporting them as gaps first.
Do not hardcode any visual values.
Do not create a duplicate theme system.
Flag any SCSS token ambiguity issues.

Expected output:
Token mapping table, duplicate warnings, token gaps with proposed names, SCSS import recommendations, final recommendation.
```
