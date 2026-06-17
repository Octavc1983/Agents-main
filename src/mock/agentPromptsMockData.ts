/**
 * Mock Data for Agent Prompts Library
 * Standalone file — do not merge into prototypeMockData.ts
 *
 * Each use case provides a ready-to-use prompt for running UX/UI prototyping agents.
 */

export type AgentPromptUseCase = {
  id: string;
  title: string;
  description: string;
  agents: string[];
  whenToUse: string;
  keywords: string[];
  prompt: string;
};

export const agentPromptUseCases: AgentPromptUseCase[] = [
  {
    id: 'uc-01',
    title: 'Start a new UX/UI prototype flow',
    description:
      'Kick off an end-to-end prototype workflow from a raw idea — capture the brief, identify relevant patterns, and produce a refined implementation prompt.',
    agents: ['Product Brief Agent', 'Research Assistant Agent', 'Prompt Optimizer Agent'],
    whenToUse: 'Starting from scratch with a new feature or product idea',
    keywords: ['start', 'new', 'prototype', 'brief', 'research', 'discovery'],
    prompt: `I need to start a new UX/UI prototype for [feature/product]. Use the Product Brief Agent to capture the goal, users, and constraints. Then use the Research Assistant Agent to identify relevant patterns and precedents. Finally, use the Prompt Optimizer Agent to refine the brief into an actionable implementation prompt.`,
  },
  {
    id: 'uc-02',
    title: 'Create a new React prototype page',
    description:
      'Add a fully structured new page to the prototype that follows existing component and routing patterns.',
    agents: ['Component Mapping Agent', 'Page Structure Agent', 'Prototype Page Builder Agent'],
    whenToUse: 'Adding a new page to the prototype that follows existing patterns',
    keywords: ['new page', 'react', 'component', 'structure', 'page builder'],
    prompt: `Create a new React prototype page called [PageName] at route /[route]. Use the Component Mapping Agent to identify reusable components. Then use the Page Structure Agent to plan the layout. Finally use the Prototype Page Builder Agent to generate the page file at src/pages/[PageName]/[PageName].tsx with an SCSS file.`,
  },
  {
    id: 'uc-03',
    title: 'Create a page with a table and connect it to navigation',
    description:
      'Build a complete data table page wired into the sidebar and router, with full UX states and design system validation.',
    agents: [
      'Component Mapping Agent',
      'Prototype Page Builder Agent',
      'State Builder Agent',
      'Navigation Integration Agent',
      'Design System Review Agent',
    ],
    whenToUse: 'Building a data table page that needs to be navigable from the sidebar',
    keywords: ['table', 'data', 'navigation', 'sidebar', 'route', 'assets', 'list'],
    prompt: `Create a prototype page with a data table named [PageName] at route /[route] with sidebar label [Label]. Use Component Mapping Agent to check for existing Table, Button, and state components. Use Prototype Page Builder Agent to create the page. Use State Builder Agent to add loading/empty/error states. Use Navigation Integration Agent to add the route and sidebar entry. Finally use Design System Review Agent to validate token usage.`,
  },
  {
    id: 'uc-04',
    title: 'Add UX states to an existing page',
    description:
      'Retrofit loading, empty, and error state handling onto a page that currently only shows its default content.',
    agents: ['State Builder Agent', 'UX Flow Review Agent'],
    whenToUse: 'An existing page needs loading, empty, or error state handling added',
    keywords: ['states', 'loading', 'empty', 'error', 'ux states', 'state machine'],
    prompt: `Add UX states to the existing page at src/pages/[PageName]/[PageName].tsx. Use the State Builder Agent to implement: (1) Loading state using the existing LoadingState component, (2) Empty state using the existing EmptyState component, (3) Error state with retry using the existing ErrorState component. Add a state switcher for prototype testing. Then use the UX Flow Review Agent to validate transitions.`,
  },
  {
    id: 'uc-05',
    title: 'Connect a new page to sidebar navigation',
    description:
      'Wire an already-created page into the router and sidebar so it becomes reachable from the main navigation.',
    agents: ['Navigation Integration Agent'],
    whenToUse: 'A page was created but not yet wired into the router or sidebar',
    keywords: ['navigation', 'sidebar', 'route', 'router', 'link', 'connect'],
    prompt: `Connect the existing page [PageName] to the navigation. Use the Navigation Integration Agent to: (1) Add route /[route] to src/app/router.tsx, (2) Add a sidebar entry with label '[Label]' and icon '[IconName]' to the sidebarLinks array in src/mock/prototypeMockData.ts. Verify the active state works using React Router's useLocation hook.`,
  },
  {
    id: 'uc-06',
    title: 'Extract navigation sidebar from Figma MCP',
    description:
      'Sync the prototype sidebar with the latest Figma design by extracting navigation items via MCP and validating them against the SidebarLink type.',
    agents: ['Figma Navigation Sidebar Extractor Agent', 'Design System Review Agent'],
    whenToUse: 'The sidebar structure needs to be updated from the latest Figma design',
    keywords: ['figma', 'sidebar', 'navigation', 'extract', 'mcp', 'design', 'sync'],
    prompt: `Extract the sidebar navigation structure from Figma using the Figma Navigation Sidebar Extractor Agent. Map each Figma navigation item to the SidebarLink interface in src/types/prototype.types.ts. Update src/mock/prototypeMockData.ts sidebarLinks with the extracted items. Then run the Design System Review Agent to validate icon types and label alignment.`,
  },
  {
    id: 'uc-07',
    title: 'Validate UX flow before moving to React prototype',
    description:
      'Review a Figma flow or written spec for missing states, edge cases, and consistency issues before committing to implementation.',
    agents: ['UX Flow Review Agent'],
    whenToUse: 'You have a Figma flow or written spec and want to validate it before building',
    keywords: ['validate', 'ux flow', 'review', 'before build', 'spec', 'flow'],
    prompt: `Validate the UX flow for [feature/page] before implementation. Use the UX Flow Review Agent to: (1) Review the described user journey, (2) Identify missing states or edge cases, (3) Check for consistency with existing prototype patterns, (4) Provide a go/no-go recommendation with a list of items to address before building.`,
  },
  {
    id: 'uc-08',
    title: 'Review Design System alignment',
    description:
      'Audit a page against the Design System to ensure all colors, spacing, typography, and components follow the token system.',
    agents: ['Design System Review Agent'],
    whenToUse: 'After creating or modifying a page, validate it against the Design System',
    keywords: ['design system', 'review', 'tokens', 'components', 'ds', 'alignment', 'validation'],
    prompt: `Run a Design System review on src/pages/[PageName]/[PageName].tsx and its SCSS file. Use the Design System Review Agent to check: (1) All colors use design tokens from src/styles/_variables.scss, (2) Spacing uses $spacing-* variables, (3) Typography uses @include mixins, (4) Existing UI components are used (Button, Card, EmptyState, ErrorState, LoadingState), (5) No hardcoded values outside the badge pattern. Return a compliance report with blocking issues and recommendations.`,
  },
  {
    id: 'uc-09',
    title: 'Compare React prototype to Figma',
    description:
      'Verify that a built prototype page visually and structurally matches its Figma design, and receive a prioritised diff report.',
    agents: ['Figma Alignment Agent'],
    whenToUse: 'After building a prototype page, verify it matches the Figma design',
    keywords: ['figma', 'compare', 'alignment', 'match', 'visual', 'check'],
    prompt: `Compare the React prototype page at src/pages/[PageName]/[PageName].tsx against the Figma design for [FrameName]. Use the Figma Alignment Agent to: (1) Match component hierarchy, (2) Check spacing and sizing against design tokens, (3) Verify color usage, (4) Flag any visual gaps between the prototype and Figma. Output a diff report with priority order for fixes.`,
  },
  {
    id: 'uc-10',
    title: 'Create prototype documentation for PM / R&D review',
    description:
      'Generate handoff documentation for a finished prototype page covering purpose, states, component inventory, open questions, and engineering notes.',
    agents: ['Prototype Documentation Agent'],
    whenToUse:
      'The prototype is ready and needs to be shared with product or engineering for review',
    keywords: ['documentation', 'pm', 'rnd', 'review', 'handoff', 'docs', 'export'],
    prompt: `Create documentation for the prototype page at src/pages/[PageName]/[PageName].tsx for PM and R&D review. Use the Prototype Documentation Agent to generate: (1) Page purpose and user goal, (2) State inventory (default, loading, empty, error), (3) Component list with DS status (placeholder vs official), (4) Open questions for product, (5) Technical notes for engineering handoff.`,
  },
  {
    id: 'uc-11',
    title: 'Extract selected Design System components from Figma MCP',
    description:
      'Pull a specific UI component from the Figma Design System frame, map its properties to a React interface, and create a placeholder implementation.',
    agents: ['Figma Design System Extractor Agent', 'Design System Review Agent'],
    whenToUse:
      'You need to extract specific UI components from the Figma DS frame for use in the prototype',
    keywords: ['figma', 'extract', 'component', 'design system', 'ds', 'mcp', 'figma frame'],
    prompt: `Extract the [ComponentName] component from the Figma Design System frame using the Figma Design System Extractor Agent. Map the Figma properties to a React component interface. Create a placeholder component at src/components/ui/[ComponentName]/[ComponentName].tsx that matches the Figma spec. Then use the Design System Review Agent to validate the extraction against existing token usage.`,
  },
  {
    id: 'uc-12',
    title: 'Optimize a broad prompt before implementation',
    description:
      'Turn a rough or vague instruction into a precise, actionable agent prompt with clear inputs, constraints, file paths, and expected output format.',
    agents: ['Prompt Optimizer Agent'],
    whenToUse:
      'You have a rough idea or broad instruction and want to turn it into a precise, actionable agent prompt',
    keywords: ['optimize', 'prompt', 'refine', 'improve', 'instruction', 'broad', 'vague'],
    prompt: `Optimize the following broad instruction into a precise, actionable agent prompt: '[Your rough instruction here]'. Use the Prompt Optimizer Agent to: (1) Clarify the goal, (2) Add specific file paths and component names where relevant, (3) Define inputs and constraints, (4) Specify the expected output format, (5) Remove ambiguity. Return the optimized prompt ready to copy-paste.`,
  },
];
