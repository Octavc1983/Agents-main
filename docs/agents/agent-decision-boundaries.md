# Agent Decision Boundaries

This page explains what each agent can decide on its own versus what always requires your input. Use this as a reference when you want to understand why Claude is asking you something — or why it isn't.

---

## Decision Boundary Table

| Agent | Decides Automatically | Always Asks You First |
|---|---|---|
| **workflow-orchestrator-agent** | Which workflow to run based on your request, which downstream agents to involve | When the request is ambiguous between two workflows, or when it conflicts with a page that already exists |
| **template-recognition-and-lifecycle-agent** | Which registered template matches your request, loading its logic | When no template matches (creates a Draft Template Candidate and asks before building) |
| **prototype-page-builder-agent** | Component selection from the DS, layout structure, mock data shape | New routes (always Level 3), destructive changes to existing pages, DS gaps |
| **component-mapping-agent** | Which DS component maps to each requirement | When a required component is missing from the DS (stops and reports a gap, never invents a workaround) |
| **application-shell-navigation-agent** | Where to place a new nav item based on siblings and hierarchy | Any new route, any change to hierarchy levels, renaming existing items |
| **navigation-integration-agent** | Wiring pages to router and sidebar using the approved nav structure | New route approval, hierarchy changes |
| **state-builder-agent** | Adding all four data states to every new screen (DEC-005) | Custom state behavior that differs from the registered pattern |
| **skeleton-loading-intelligence-agent** | Skeleton layout matching the real page structure (DEC-005) | Never asks — generates automatically and reports what it did |
| **design-system-review-agent** | Whether the screen passes DS compliance (tokens, components, icons) | When a DS gap is found — stops and reports, never invents a workaround or override |
| **ux-flow-review-agent** | Identifying flow completeness issues and missing states | Never modifies anything — read-only; you decide what to fix |
| **ux-expert-page-audit-agent** | Identifying all UX issues and their severity | Never modifies anything — audit only; you decide what to address |
| **technical-writing-agent** | Whether copy passes terminology and style checks | When a deprecated term is found (blocks the pipeline until resolved) |
| **code-quality-qa-agent** | Identifying technical quality issues (imports, dead code, SCSS, runtime safety) | When a critical error is found that cannot proceed without resolution |
| **figma-alignment-agent** | Producing the visual gap report comparing React to Figma | Never modifies anything — gap report only; you decide what to close |
| **continuous-improvement-agent** | Creating lesson candidates based on evidence of recurring issues | Promoting a lesson candidate to a permanent rule (always requires evidence and approval) |
| **shared-architecture-agent** | Identifying repeated patterns, data shapes, and extraction opportunities | Proposing a shared abstraction (never extracts without approval; extraction requires evidence of repeated use) |
| **telemetry-driven-ux-recommendation-agent** | Analyzing telemetry patterns and producing recommendations with confidence levels | Applying any recommendation (produces recommendations only, never applies them automatically) |
| **prototype-documentation-agent** | Generating the review package content | Structure changes to the review package format |

---

## Understanding the Table

### "Decides Automatically" means:
Claude applies this and reports it in the implementation summary. You will see it listed but you did not need to explicitly approve it in that session. These are always grounded in a registered decision (DEC-001 through DEC-015) or a stable, well-understood convention.

### "Always Asks You First" means:
Claude stops before this action and waits for your input. No exceptions. These are situations where the outcome could be destructive, could affect files outside the scope of your request, could create a permanent record (like a new route), or where no approved decision covers the scenario.

---

## Why This Matters

The decision boundary system exists for two reasons:

1. **Safety** — files you didn't ask Claude to touch should never be touched. Pages that already exist should never be overwritten. Routes should never be created without your sign-off.

2. **Efficiency** — things you've already approved (like "always add a loading skeleton" or "always disable the submit button during save") should not need to be re-approved every time. Automating approved decisions keeps the workflow fast without removing your control.

If you ever want to override a decision that Claude would normally apply automatically, just describe what you want instead. Claude will surface the conflict and apply your instruction after you confirm.

