# Figma Sync Navigation

## Purpose

Read the navigation sidebar from a Figma source and sync the project's navigation configuration and styling — without replacing the existing navigation architecture.

---

## Agents to Use

1. Figma MCP Scanner Agent — extract navigation structure from Figma
2. Application Shell Navigation Agent — apply changes to project navigation

Expected files:
```text
.claude/agents/_figma/figma-mcp-scanner-agent.md
.claude/agents/_core/application-shell-navigation-agent.md
```

---

## Skills to Use

```text
.claude/skills/_figma/figma-mcp-scan/SKILL.md
.claude/skills/_figma/figma-navigation-sync/SKILL.md
.claude/skills/_core/application-shell-navigation/SKILL.md
```

---

## When to Use

Use when:
- Figma shows updated navigation items
- A new sidebar section is added in Figma
- Navigation ordering or grouping changed in Figma
- Icon assignments changed in Figma

Do NOT use to replace the entire navigation architecture.

---

## Required User Intake

### Required intake fields

```text
Figma source:          Figma link or frame name for the navigation frame
Goal:                  What to sync (items / order / icons / grouping / all)
Known constraints:     e.g. SVG icons only, preserve existing routes, no architecture changes
```

### Minimum required fields

```text
Figma source
Goal
Known constraints
```

### Missing Information Response

If Figma source is missing:

```markdown
### Missing Required Information

Before I can run `/figma-sync-navigation`, please provide:

\`\`\`text
Figma source:      [Figma link or navigation frame name]
Goal:              [What to sync]
Known constraints: [e.g. SVG icons only, preserve existing routes]
\`\`\`
```

Do not read Figma.
Do not modify navigation files.
Do not continue until Figma source and Goal are provided.

---

## Intake Gate

Do not read Figma.
Do not modify navigation config.
Do not modify router files.
Do not continue until Figma source and Goal are provided.

---

## Required Workflow

1. Read Figma navigation frame through MCP.
2. Extract navigation items (labels, icons, ordering, grouping).
3. Inspect existing project navigation data file.
4. Inspect existing router file.
5. Inspect existing SVG icon exports.
6. Compare Figma navigation against existing project navigation.
7. Identify: new items / removed items / reordered items / icon changes.
8. Apply changes following existing navigation data pattern.
9. Use existing SVG icon components (document missing icons as gaps).
10. Do NOT replace navigation architecture.
11. Report changes made.

---

## Restrictions

- Do not replace AppShell
- Do not replace Sidebar architecture
- Do not replace router pattern
- Do not add icon libraries
- Do not hardcode navigation colors or sizing
- Do not create new navigation components
- Do not perform broad refactors
- Do not change unrelated files

---

## Expected Output

```markdown
### Figma Navigation Sync Summary

### Figma Source Scanned

### Figma Navigation Items Detected

### Existing Project Navigation

### Changes Applied

| Change Type | Item | Before | After |
|---|---|---|---|

### Icon Gaps

Icons required but not found in SVG icon file:

| Figma Icon | Status |
|---|---|

### Restrictions Followed

- Existing navigation architecture preserved
- No icon libraries added
- No AppShell/Sidebar replaced

### Open Questions
```

---

## Final Rule

Stop after syncing navigation data and reporting changes.

Do not build new pages.
Do not replace navigation architecture.
