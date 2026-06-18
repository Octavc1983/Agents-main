# Setup Claude Skills

## Purpose

Audit the current `.claude/` workflow system and report: which agents, skills, and commands exist, which are missing, and what gaps need to be filled.

This is a read-only audit command. It does not create files.

---

## When to Use

Use when:
- Onboarding to this project's Claude workflow system
- Checking if the full system is in place
- After adding new pages or flows, to see which commands cover the new work
- Auditing before a major prototype sprint

---

## Required User Intake

### Required intake fields

```text
Audit scope:      All / Agents only / Skills only / Commands only / Gaps only
Report format:    Summary / Full details / Gaps only
```

### Minimum required fields

```text
Audit scope
```

### Missing Information Response

If Audit scope is missing, ask:

```markdown
### Setup Required

Please specify:

\`\`\`text
Audit scope:    [All / Agents only / Skills only / Commands only / Gaps only]
Report format:  [Summary / Full details / Gaps only]
\`\`\`
```

---

## Intake Gate

Do not list files.
Do not generate an audit report.
Do not continue until Audit scope is provided.

---

## Required Workflow

1. List all files in `.claude/agents/`.
2. List all files in `.claude/skills/` (one per subfolder).
3. List all files in `.claude/commands/`.
4. Cross-reference against the required workflow list.
5. Identify: which workflows have all 3 files (agent + skill + command).
6. Identify: which workflows are missing one or more files.
7. Produce audit report.

---

## Restrictions

- Read only — do not create files
- Do not modify any existing files
- Do not modify `src/`

---

## Expected Output

```markdown
### Claude Skills Audit

### Agents Found

| Agent | File | Status |
|---|---|---|

### Skills Found

| Skill | Folder | Status |
|---|---|---|

### Commands Found

| Command | File | Status |
|---|---|---|

### Workflow Coverage

| Workflow | Agent | Skill | Command | Status |
|---|---|---|---|---|

### Gaps Found

| Workflow | Missing Files |
|---|---|

### Recommendation

Choose one:
- Full coverage — system is complete
- Minor gaps — create missing files
- Major gaps — system needs significant additions
```
