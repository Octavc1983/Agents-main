# Map Tokens

## Purpose

Map design requirements or Figma variables to existing SCSS tokens in the project. Identify gaps and document missing tokens without creating new ones.

---

## Skill to Use

Design System Token Mapping Skill

Expected file: `.claude/skills/_infra/design-system-token-mapping/SKILL.md`

---

## When to Use

Use when:
- Checking what tokens to use before building a new page
- Mapping Figma variables to project tokens
- Auditing token gaps before a DS review
- Checking if a required value exists as a token

---

## Required User Intake

### Required intake fields

```text
Mapping source:       Figma source / Design requirements / Code review / Manual list of values
Scope:                Colors / Typography / Spacing / Radius / Shadows / All
Target page or file:  Optional context for the mapping
Known constraints:    e.g. do not create new tokens, report gaps only
```

### Minimum required fields

```text
Mapping source
Scope
Known constraints
```

### Missing Information Response

If Mapping source is missing:

```markdown
### Missing Required Information

Before I can run `/map-tokens`, please provide:

\`\`\`text
Mapping source:   [Figma source / list of design values / file path]
Scope:            [Colors / Typography / Spacing / All]
Known constraints: [e.g. report gaps only, do not create new tokens]
\`\`\`
```

Do not inspect token files.
Do not continue until Mapping source is provided.

---

## Intake Gate

Do not inspect token files.
Do not generate a token mapping.
Do not create tokens.
Do not continue until Mapping source and Scope are provided.

---

## Required Workflow

1. Receive design values or Figma source.
2. Inspect project SCSS token files (`src/styles/_variables.scss`, `src/design-system/tokens/`).
3. Map each design value to an existing token.
4. Mark confidence for every mapping.
5. List all token gaps.
6. Do not create new tokens without explicit approval.
7. Report findings.

---

## Restrictions

- Do not create new tokens
- Do not modify existing token files without explicit instruction
- Do not use inline styles
- Do not hardcode values

---

## Expected Output

```markdown
### Token Mapping Report — [SCOPE]

### Token Mapping

| Design Value | Type | Existing Token | Token File | Confidence | Notes |
|---|---|---|---|---|---|

### Token Gaps

| Design Value | Type | Gap Reason | Recommended Action |
|---|---|---|---|

### Summary

- Total values mapped:
- Mapped to existing tokens:
- Token gaps found:

### Recommendation

Choose one:
- Full token coverage
- Minor gaps — proceed with documented gaps
- Major gaps — needs DS token additions before implementation
```
