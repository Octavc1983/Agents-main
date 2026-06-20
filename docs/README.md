# Project Documentation Hub

Welcome to the documentation for this UX prototyping project. This hub is written for UX designers, product managers, design leads, and product owners. No coding knowledge is needed to use this documentation.

## Start Here

- [How to Work with Claude](./getting-started/how-to-work-with-claude.md)
- [What Claude Can Do](./getting-started/what-claude-can-do.md)
- [Create a New Screen](./workflows/create-a-new-screen.md)
- [Update an Existing Screen](./workflows/update-an-existing-screen.md)
- [Review Annotations](./review-annotations/README.md)
- [Flow Gaps and UX Notes](./review-annotations/flow-gaps-and-ux-notes.md)
- [Agent Directory](./agents/agent-directory.md)
- [User Decision Memory](./automation/user-decision-memory.md)
- [FAQ](./reference/faq.md)

## How This Project Works

Claude is an AI assistant that builds and reviews UX screens based on plain-English descriptions. It uses a structured system of Agents (specialist roles that handle specific tasks), Skills (step-by-step playbooks for how each task is done), and Commands (named shortcuts for common actions). You describe what you want — for example, "build the Scans page with a table and a details panel" — and Claude figures out the right workflow automatically. No technical knowledge is needed to work with it; you talk to Claude the same way you would talk to a developer or UX engineer.

## Claude Makes These Decisions Automatically

- Which layout template best fits the screen you described
- Whether a component already exists in the Design System before creating a new one
- Which loading, empty, error, and success states to add
- How to wire the new page into the sidebar and navigation
- Whether existing Design System components and tokens are being used correctly
- Whether all visible copy passes the approved terminology guidelines
- Whether the screen is dark-mode compatible
- Where a new navigation item belongs in the sidebar hierarchy
- Which mock data shape to use based on the domain

## You Decide These

- Any new page route (URL path) that has not been used before
- Destructive actions — deleting, archiving, or resetting data or screens
- Pages that already exist (Claude reads them and shows you a delta before touching anything)
- Situations where no Design System component covers the requirement (DS gaps)
- Conflicting decisions — when two previously approved rules contradict each other
- New templates that have never been used before (Claude drafts a candidate and waits for your approval)
- Any change to permanent workflow rules, core agents, or core skills

## Documentation Sections

| Section | What It Covers |
|---|---|
| [Getting Started](./getting-started/README.md) | How to talk to Claude, what it can do, the approval model |
| [Workflows](./workflows/README.md) | Step-by-step guides for common tasks |
| [Review Annotations](./review-annotations/README.md) | How to add, edit, and manage review notes on screens |
| [Agents](./agents/README.md) | The specialist roles that do the work |
| [Automation](./automation/README.md) | How Claude learns, remembers decisions, and detects issues |
| [Reference](./reference/README.md) | Glossary, templates, states, FAQ |
| [Generated Maps](./_generated/readme-index.md) | Auto-generated project and file maps |
