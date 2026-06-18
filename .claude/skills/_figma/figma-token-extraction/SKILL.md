# Figma Token Extraction Skill

## Purpose

Extract Figma variables and styles from a Figma source through MCP and map them to existing SCSS tokens in the project.

Report token gaps without creating new tokens.

---

## When to Use

Use this skill before:
- Building a page from Figma
- Running /figma-build-page
- Running /map-tokens against a Figma source
- Auditing token coverage before DS review

---

## Inputs Required

```text
Figma source:     Figma link, frame name, or node ID
Extraction scope: Colors / Typography / Spacing / Radius / Shadows / All
Target context:   Optional page or component for scoping
```

---

## Required User Intake

Minimum required:
```text
Figma source
Extraction scope
```

If Figma source is missing, state: "This skill requires a Figma source." Do not proceed.

---

## Required Project Inspection

Before mapping, inspect:

```text
src/styles/_variables.scss
src/styles/_typography.scss
src/design-system/tokens/
src/styles/globals.scss
```

---

## Required Workflow

1. Read Figma source through MCP.
2. Extract all variables and styles in scope (colors, typography, spacing, radius, shadows).
3. Inspect project SCSS token files.
4. For each Figma variable/style: find matching SCSS token.
5. Mark confidence for every mapping.
6. List all token gaps (values in Figma with no project token equivalent).
7. Do not create new tokens.
8. Report findings.

---

## Mapping Rules

### Color mapping
Map Figma color variables to SCSS `$color-*` tokens.
Check both `_variables.scss` and `tokens/_colors.scss`.
If a color has no token, document as a color gap.

### Typography mapping
Map Figma text styles to existing SCSS typography tokens or `_typography.scss` rules.
Check font size, font weight, line height, and font family.

### Spacing mapping
Map Figma spacing values to existing SCSS spacing scale tokens.
If spacing values use a consistent scale (4px, 8px, 12px, 16px, 24px, 32px...) confirm that scale matches the project.

### Radius mapping
Map Figma corner radius values to existing SCSS `$radius-*` tokens.

### Shadow mapping
Map Figma drop shadows to existing SCSS `$shadow-*` tokens.

### Token confidence levels
- **High** — exact token found and confirmed in project SCSS files
- **Medium** — similar token found, value is close but not exact
- **Low** — likely token but needs verification
- **Gap** — no matching token found

---

## Must Do

- Inspect project SCSS files before mapping
- Confirm every token exists before listing it
- Mark confidence for every mapping
- List all gaps clearly
- Do not create tokens without explicit approval

---

## Must Not Do

- Do not create new tokens
- Do not create new SCSS files
- Do not modify existing token files
- Do not use inline styles
- Do not hardcode values

---

## Output Format

```markdown
### Figma Token Extraction — [SCOPE]

### Figma Source

### Extraction Scope

### Token Mapping

| Figma Variable/Style | Type | Figma Value | Existing Token | Token File | Confidence | Notes |
|---|---|---|---|---|---|---|

### Token Gaps

| Figma Variable | Type | Figma Value | Gap Reason |
|---|---|---|---|

### Summary

- Total Figma variables extracted:
- Mapped to existing tokens:
- Token gaps:

### Recommendation

Choose one:
- Full coverage — no token gaps
- Minor gaps — proceed with documentation
- Major gaps — DS token additions needed before implementation
```

---

## Example Prompt

```
Use the Figma Token Extraction Skill.

Goal:
Extract color and spacing tokens from the Figma source and map to existing project SCSS tokens.

Figma source:
[FIGMA LINK OR FRAME NAME]

Extraction scope:
Colors, Spacing

Known constraints:
Do not create new tokens. Report gaps only.

Expected output:
Token mapping report with confidence levels and gap list.
```
