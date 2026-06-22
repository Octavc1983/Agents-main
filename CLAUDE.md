@AGENTS.md

# Claude Code Project Rules

## Project Identity

This project is a React + TypeScript UX prototype using `@idira/design-system`, SCSS tokens, mock data, and the existing AppShell / Sidebar / Header / Router infrastructure.

There is no live backend. All state transitions use deterministic mock logic.

---

## Required Startup Scan

Before any implementation, inspect in this order:

```text
1. .claude/architecture/template-registry.md         — match screen to existing template
2. .claude/architecture/user-decision-memory/         — apply approved decisions
3. .claude/architecture/component-registry.md         — reuse existing components
4. .claude/architecture/data-contract-registry.md     — reuse existing types
5. .claude/content/terminology-registry.md            — check approved terms
6. .claude/content/deprecated-terms.md                — check retired terms
```

---

## Automatic Workflow Routing

Natural-language requests trigger workflows automatically. Slash commands are optional helpers.

Routing owner: `.claude/agents/_core/workflow-orchestrator-agent.md`
Routing skill: `.claude/skills/_core/auto-workflow-routing/SKILL.md`

Do not ask the user which command to run.

---

## Template Recognition

Template recognition runs before every implementation.

Registry: `.claude/architecture/template-registry.md`
Agent: `.claude/agents/_core/template-recognition-and-lifecycle-agent.md`
Skill: `.claude/skills/_core/template-recognition-and-lifecycle/SKILL.md`

If no template matches → create a Draft Template Candidate. Do not generate a one-off page.

---

## Protected Areas — Never Replace or Override

```text
- AppShell
- Sidebar
- Application Header
- Router (src/app/router.tsx)
- Design System package (@idira/design-system)
- SCSS token system
- SVG icon system
```

---

## Non-Negotiable Implementation Rules

```text
- SVG icons only — no icon libraries, PNG, emoji, or icon fonts
- No inline styles
- No hardcoded hex colors, spacing, radius, shadows, or typography when tokens exist
- No new SCSS tokens without explicit approval
- No debug controls visible in product UI
- No modification of files outside confirmed scope
- No Pixel Perfect claim without a gap report
- No silent fallback — stop and report a DS Gap instead
```

See full policy details:

```text
.claude/policies/design-system-policy.md
.claude/policies/component-ownership-policy.md
.claude/policies/no-silent-fallback-policy.md
.claude/policies/design-system-gap-policy.md
.claude/policies/minimal-layering-policy.md
.claude/policies/screenshot-layout-policy.md
.claude/policies/scrolling-and-layout-policy.md
.claude/policies/status-indicator-policy.md
.claude/policies/dark-mode-policy.md
.claude/policies/navigation-and-routing-policy.md
.claude/policies/state-persistence-policy.md
.claude/policies/validation-and-error-policy.md
.claude/policies/secrets-and-sensitive-data-policy.md
.claude/policies/localization-policy.md
.claude/policies/mock-data-policy.md
.claude/policies/accessibility-policy.md
.claude/policies/quality-gates-policy.md
.claude/policies/page-creation-policy.md
.claude/policies/ux-component-standards.md
```

---

## Reuse Priority Order

```text
1. Existing DS component (public API only)
2. Existing shared feature component (src/components/shared/)
3. Existing page composition template (src/prototype-templates/)
4. Existing shared type or view model
5. Existing adapter, service, or API contract
6. New local implementation — only when none of the above apply
```

Do not extract shared abstractions prematurely. Requires: repeated use + stable behavior + clear ownership + safe API.

---

## Mandatory Quality Gates

Every significant implementation must pass before marking complete:

```text
1. UX Content Alignment    — terminology, deprecated terms, accessible copy
2. QA / Code Review        — imports, dead code, SCSS, runtime safety
3. UX Audit                — flow, states, edge cases, component misuse
4. Build / Runtime Validation — typecheck, lint, build where available
```

See: `.claude/policies/quality-gates-policy.md`

---

## User Decision Memory

Before asking the user to define a behavior, check:

```text
.claude/architecture/user-decision-memory/decision-registry.md
```

- Level 1 (high confidence, no conflict): Apply automatically. Report in implementation plan with Decision ID.
- Level 2 (medium confidence): Prefill and ask one confirmation.
- Level 3 (destructive / new route / DS gap): Always ask.

Screen-specific decisions override route → feature → template → global.
Never apply deprecated or conflicted decisions.

**DEC-016 (active, protected):** Add Account / Create Account / Onboard Account → `FullScreenWizardTemplate` only. Never a dialog.

---

## Architecture Registries

```text
.claude/architecture/component-registry.md
.claude/architecture/data-contract-registry.md
.claude/architecture/feature-api-registry.md
.claude/architecture/shared-patterns.md
.claude/architecture/decisions/
.claude/architecture/migration/
.claude/architecture/global-ui-standards/
```

Update registries after creating any new shared component or contract.

---

## Content and Terminology

```text
.claude/content/terminology-registry.md
.claude/content/ux-writing-style-guide.md
.claude/content/approved-microcopy-patterns.md
.claude/content/deprecated-terms.md
```

Deprecated terms found in any page = Critical issue that blocks review.

---

## Continuous Improvement

After significant implementation, UX audit, QA review, or repeated user correction:

```text
1. Run controlled learning review (continuous-quality-learning skill).
2. Create lesson candidates only when evidence exists.
3. Add regression checks for approved lessons.
4. Do not silently rewrite CLAUDE.md, AGENTS.md, core Skills, or core Agents.
5. Propose updates — apply only after confirmation.
```

Quality records: `.claude/quality/`

---

## Safety Gate

Before changing any code, confirm:

```text
- Target page or files
- Files allowed to modify
- Files not allowed to modify
- Required behavior
- Whether reference image/Figma is visual reference only or implementation-approved
- Whether the request is analysis-only or implementation-approved
```

Do not modify `src/` during workflow or infrastructure setup.
