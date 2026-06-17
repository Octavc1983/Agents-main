# Agent Prompts Library

## Purpose

Create or update a page in the prototype application that centralizes ready-to-use prompts for running Agents, Commands, and Skills by use case.

This skill scans the project's `.claude/` folder, extracts agent and skill information, and builds a browsable prompt library page using existing DS components and tokens.

---

## When to Use

Use this skill when:

- The AgentPromptsPage needs to be created or updated with current agents and skills
- New agents or skills have been added and the library page is out of date
- A browsable, searchable prompt reference is needed inside the prototype app
- A stakeholder or team member needs to discover available AI-assisted workflows

---

## Inputs Required

- Confirmation that `.claude/agents/` has been scanned
- Confirmation that `.claude/commands/` has been scanned
- Confirmation that `.claude/skills/` has been scanned
- Target page file path (default: `src/pages/AgentPromptsPage/`)

---

## Required Project Inspection

Before building or updating the page:

1. Scan `.claude/agents/` — list every agent file and extract: name, purpose, when to use
2. Scan `.claude/commands/` — list every command file and extract: name, purpose, trigger
3. Scan `.claude/skills/` — list every skill folder and `SKILL.md` and extract: name, purpose, when to use, example prompt
4. Inspect existing `AgentPromptsPage` — if it exists, read it before modifying
5. Confirm existing DS components available for the page (search input, cards, tabs, badges)
6. Confirm existing token coverage for the page
7. Confirm existing mock data pattern for prompt entries

---

## Required Workflow

1. Scan all `.claude/agents/*.md` files and extract metadata.
2. Scan all `.claude/commands/*.md` files and extract metadata.
3. Scan all `.claude/skills/*/SKILL.md` files and extract metadata.
4. Organize entries by category:
   - Core prototype agents
   - Integration agents
   - Support agents
   - Commands
   - Skills
5. Build or update the AgentPromptsPage using existing DS components.
6. Add search/filter by name or category using local state only.
7. Each prompt card must show: name, category, purpose, when to use, copy-ready example prompt.
8. Use existing `HorizontalTabs` or category filter pattern for browsing.
9. Add a local search input connected to `searchQuery` state.
10. Ensure the page renders inside the existing AppShell with no custom shell.

---

## Must Do

- Scan `.claude/agents/`, `.claude/commands/`, and `.claude/skills/` before building
- Use existing DS components (cards, tabs, search input patterns)
- Use existing tokens
- Use existing SCSS variables
- Use existing SVG icon system
- Keep prompt data as local mock data (`src/mock/agentPromptsMockData.ts`)
- Add search/filter with local state only
- Keep the page inside the existing AppShell

---

## Must Not Do

- Create new DS components
- Create new tokens
- Use inline styles
- Hardcode visual values
- Add external UI libraries
- Connect to the filesystem or MCP at runtime (scan happens at build time, data is in mock file)
- Replace existing AppShell, Sidebar, or Header
- Modify the official Infra library
- Change unrelated files

---

## Output Format

```markdown
### Agent Prompts Library Summary

### Sources Scanned

- Agents found: [count] — list names
- Commands found: [count] — list names
- Skills found: [count] — list names

### Categories Built

List categories and number of entries per category.

### Page Structure

Describe the search, filter, and card layout used.

### DS Components Used

### Tokens Used

### Files Created or Updated

### Mock Data Shape

Describe the prompt entry data model.

### Known Gaps

List any agents/commands/skills that could not be extracted cleanly.

### Final Recommendation

Choose one:
- Ready for UX review
- Needs additional agent metadata
- Needs DS component for [feature]
```

---

## Example Prompt

```
Use the Agent Prompts Library skill.

Goal:
Create or update the AgentPromptsPage to include all current agents, commands, and skills.

Scan:
- .claude/agents/
- .claude/commands/
- .claude/skills/

Requirements:
- Search/filter by name or category
- Card per entry showing: name, category, purpose, when to use, example prompt
- Use existing DS components and tokens
- No new DS components
- No inline styles

Expected output:
Scan summary, categories built, files created or updated, DS components used, final recommendation.
```
