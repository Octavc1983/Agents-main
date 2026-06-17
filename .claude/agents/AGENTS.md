# Claude Agents

This repository uses dedicated Claude Code agents to support the UX/UI prototyping workflow.

Agents are located in the `.claude/agents/` folder. Each agent has a focused responsibility and should be used only for its defined scope.

## Available Agents

### Core Prototype Agents

- [**Prototype Page Builder Agent**](.claude/agents/prototype-page-builder-agent.md)  
  Creates React prototype pages quickly while maintaining Design System compliance.

- [**Design System Review Agent**](.claude/agents/design-system-review-agent.md)  
  Validates prototype pages against the Design System for component usage and styling alignment.

- [**UX Flow Review Agent**](.claude/agents/ux-flow-review-agent.md)  
  Reviews prototype flows for clarity, user experience, and state coverage.

### Integration & Optimization Agents

- [**Navigation Integration Agent**](.claude/agents/navigation-integration-agent.md)  
  Connects prototype pages to the existing routing and navigation structure.

- [**Component Mapping Agent**](.claude/agents/component-mapping-agent.md)  
  Maps UX/UI requirements to existing Design System components before implementation.

- [**Page Structure Agent**](.claude/agents/page-structure-agent.md)  
  Prepares correct page structures based on existing product patterns.

### Support Agents

- [**Mock Data Agent**](.claude/agents/mock-data-agent.md)  
  Creates realistic mock data for prototype pages to support all UI states.

- [**State Builder Agent**](.claude/agents/state-builder-agent.md)  
  Adds loading, empty, error, validation, and success states to prototype pages.

- [**Figma Alignment Agent**](.claude/agents/figma-alignment-agent.md)  
  Reviews React prototypes against Figma designs for visual and structural alignment.

- [**Prompt Optimizer Agent**](.claude/agents/prompt-optimizer-agent.md)  
  Improves prompts before sending to AI tools to reduce tokens and prevent miscommunication.

- [**Prototype Documentation Agent**](.claude/agents/prototype-documentation-agent.md)  
  Documents completed prototypes for UX, Product, and R&D review.

## Recommended POC Agent Set

For the initial setup, use these core agents:

1. **Prototype Page Builder Agent** — Create prototype pages
2. **Design System Review Agent** — Validate component usage
3. **UX Flow Review Agent** — Review user experience
4. **Navigation Integration Agent** — Connect to app navigation

Optional fifth agent for best results:
- **Component Mapping Agent** — Prevent creating duplicate components

## Typical Workflow

```
1. Component Mapping Agent (optional)
   ↓ Identify which DS components to use
   ↓
2. Prototype Page Builder Agent
   ↓ Create initial prototype page
   ↓
3. Design System Review Agent + UX Flow Review Agent (parallel)
   ↓ Validate DS alignment and UX clarity
   ↓
4. Refine
   ↓ Apply feedback and fixes
   ↓
5. Navigation Integration Agent (optional)
   ↓ Connect to app navigation
   ↓
6. Prototype Documentation Agent (optional)
   ↓ Document for stakeholder review
```

## Important Guidelines

- **Keep agents focused**: Each agent has a specific responsibility
- **Use the right agent**: Choose the agent that matches your current task
- **Follow constraints**: Pay attention to the "Must Not Do" sections
- **Provide context**: Include relevant project information and examples
- **Expect focused output**: Agents provide targeted feedback and recommendations

## Getting Started

1. Choose an agent based on your current task
2. Read the agent's full documentation
3. Provide a clear request with necessary context
4. Review the agent's output and recommendations
5. Implement suggested changes or fixes
6. Move to the next step in the workflow

For detailed information about each agent, see the individual agent files.
