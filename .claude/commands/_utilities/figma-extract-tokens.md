# Figma Extract Tokens

## Purpose

Extract Figma variables and styles and map them to existing project SCSS tokens. Report any token gaps.

This command maps design values to existing tokens. It does not create a new token system. It does not duplicate existing tokens.

---

## Agent to Use

Figma to Infra Mapping Agent (token mapping focus)

Expected file: `.claude/agents/_figma/figma-to-infra-mapping-agent.md`

---

## Skill to Use

Design System Token Mapping Skill

Expected file: `.claude/skills/_infra/design-system-token-mapping/SKILL.md`

---

## When to Use

Use when:
- Checking if Figma variables align with project SCSS tokens
- Identifying missing tokens before building a page
- Auditing token coverage before DS review
- Extracting tokens before /figma-build-page

---

## Required User Intake

### Required intake fields

```text
Figma source:         Figma link or frame name
Extraction scope:     Colors / Typography / Spacing / Radius / Shadows / All
Target page:          Optional — leave blank for whole-file extraction
Known constraints:    e.g. do not create new tokens, report gaps only
```

### Minimum required fields

```text
Figma source
Extraction scope
Known constraints
```

### Missing Information Response

If Figma source is missing:

```markdown
### Missing Required Information

Before I can run `/figma-extract-tokens`, please provide:

\`\`\`text
Figma source:       [Figma link or frame name]
Extraction scope:   [Colors / Typography / Spacing / All]
Known constraints:  [e.g. report gaps only, do not create new tokens]
\`\`\`
```

Do not read Figma.
Do not generate a token mapping.
Do not continue until Figma source is provided.

---

## Intake Gate

Do not read Figma.
Do not inspect project token files.
Do not generate a token mapping.
Do not continue until Figma source and Extraction scope are provided.

---

## Required Workflow

1. Read Figma source through MCP.
2. Extract all variables and styles in scope.
3. Inspect project SCSS token files.
4. Map each Figma variable/style to an existing SCSS token.
5. Mark confidence for every mapping.
6. List all token gaps.
7. Do not create new tokens.
8. Report findings.

---

## Restrictions

- Do not create new tokens
- Do not create new SCSS files
- Do not modify existing token files without explicit instruction
- Do not hardcode values
- Do not add CSS custom properties not already in the project

---

## Expected Output

```markdown
### Figma Token Extraction Report — [PAGE/SCOPE]

### Figma Source

### Extraction Scope

### Token Mapping

| Figma Variable/Style | Type | Value | Existing Token | Token File | Confidence | Notes |
|---|---|---|---|---|---|---|

### Token Gaps

| Figma Variable | Type | Value | Gap Reason |
|---|---|---|---|

### Summary

- Total Figma variables extracted:
- Mapped to existing tokens:
- Token gaps found:
- Tokens to create (if approved):

### Recommendation

Choose one:
- Full token coverage — ready for implementation
- Minor gaps — proceed with documented gaps
- Major gaps — needs DS token additions before implementation
```

---

## Final Rule

Stop after the token mapping report.

Do not create new tokens unless the user explicitly approves each one.
