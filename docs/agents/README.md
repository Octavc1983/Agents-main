# Agents

This section explains what agents are, how they work, and what each one does.

---

## What Is an Agent?

An agent is a specialist role that Claude takes on automatically for a specific type of task. When you ask Claude to build a page, review a flow, or sync navigation, Claude does not handle everything as a single undifferentiated task. Instead, it delegates different parts of the work to different agents — each one focused on a specific area of expertise.

Think of it like a team: when you describe a new screen, the workflow orchestrator receives your request and hands it off to the template matcher, which determines the layout. The layout is passed to the component mapper, which selects the right Design System components. The page builder constructs the screen, then the skeleton loading agent adds loading states, then the copy review agent checks the text, then the QA agent validates quality. Each specialist does its part in sequence.

You do not need to manage or invoke agents directly. They run automatically in the background as part of every workflow. The only thing you interact with is the result.

---

## How Agents Work Together

Agents are organized in a pipeline. Each stage runs in order and passes its output to the next stage. If any stage finds a critical problem (a missing component, a DS gap, a conflicting decision), it stops and reports before the pipeline continues. This ensures that issues are always surfaced explicitly — nothing is silently skipped or approximated.

For a detailed walkthrough of the pipeline, see [How Agents Work Together](./how-agents-work-together.md).

---

## In This Section

- [Agent Directory](./agent-directory.md) — Full directory of all agents, organized by category. For each agent: what its role is, what it does, and when it runs.

- [How Agents Work Together](./how-agents-work-together.md) — Plain-language explanation of the full agent pipeline, from your initial request to the finished screen.

- [Agent Decision Boundaries](./agent-decision-boundaries.md) — What each agent can decide on its own vs. what always requires your input. Answers the question: "When does Claude ask me, and when does it just do it?"

