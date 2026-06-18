# Figma MCP Integration Guidelines

This document explains how to use Figma MCP (Model Context Protocol) with this UX/UI Prototype environment to automate the process of converting Figma designs into React components.

## Overview

The Figma MCP enables AI agents to:
- Read Figma frames and design specifications
- Understand visual hierarchy, layout, and spacing
- Map Figma layers to existing React components
- Generate React code that aligns with the design
- Create new prototype pages automatically
- Keep the implementation pixel-perfect and design-system compliant

## Key Concepts

### 1. Design-to-Code Workflow

```
Figma Frame → MCP Read → Component Mapping → React Generation → Integration
```

### 2. Component Mapping Strategy

When an agent receives a Figma frame, it should:

1. **Analyze Structure**: Identify the main container, sections, and layout type
2. **Match Existing Components**: Check if the frame uses patterns similar to existing React components
3. **Reuse Components**: Always prefer using existing components in `src/components/`
4. **Create Only When Necessary**: Only create new components if no suitable component exists
5. **Document Mapping**: Record which Figma layer maps to which React component

### 3. Available Component Library

#### Layout Components
- `AppShell`: Main layout wrapper (Header + Sidebar + Content)
- `Header`: Top navigation with title and subtitle
- `Sidebar`: Left navigation with links

#### UI Components
- `Button`: Primary, Secondary, Tertiary, Danger variants (sm, md, lg sizes)
- `Card`: Default, Elevated, Outlined variants
- `EmptyState`: Shows when no content is available
- `LoadingState`: Shows loading indicator
- `ErrorState`: Shows error message with recovery action

#### Future Imports (Design System Ready)
When Infra Design System is available, replace with:
```typescript
import { Button, Card } from '@infra/design-system';
```

## Workflow: Figma Frame to React Page

### Step 1: Read the Figma Frame

Using Figma MCP, analyze the frame:
- Note the frame name and purpose
- Identify all visual layers
- Document colors, typography, spacing

### Step 2: Map Layers to Components

Create a component map:

```
Figma Layer → React Component → SCSS File
─────────────────────────────────────────
Frame Title    → <heading className="heading-2">
List Container → <div className="grid-3">
List Item      → <Card> or <div className="card">
Button         → <Button variant="primary">
Empty State    → <EmptyState>
```

### Step 3: Identify Design Tokens

Extract design properties:

**Colors**
- Use CSS custom properties: `var(--color-primary)`
- Reference `src/styles/_variables.scss` for available tokens

**Typography**
- Map font sizes to classes: `heading-1`, `body-normal`, `caption`
- Use mixins for quick styling: `@include heading-2`

**Spacing**
- Use 8px-based spacing: `$spacing-2` (4px), `$spacing-4` (16px), etc.
- Apply with SCSS classes: `.p-4`, `.gap-6`, `.mt-2`

**Border Radius**
- Use predefined values: `$border-radius-base` (8px), `$border-radius-lg` (16px)

### Step 4: Generate React Component

Create a new page component:

```typescript
// src/pages/MyPrototypePage/MyPrototypePage.tsx
import React from 'react';
import { Card } from '../../components/ui/Card/Card';
import { Button } from '../../components/ui/Button/Button';
import './MyPrototypePage.scss';

export const MyPrototypePage: React.FC = () => {
  return (
    <div className="my-prototype-page">
      {/* Component structure here */}
    </div>
  );
};
```

### Step 5: Style with SCSS

Create corresponding SCSS file:

```scss
// src/pages/MyPrototypePage/MyPrototypePage.scss
@import '../../styles/variables';
@import '../../styles/mixins';

.my-prototype-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: $spacing-8;
}
```

### Step 6: Add Route

Update router configuration:

```typescript
// src/app/router.tsx
{
  path: '/my-prototype',
  element: <MyPrototypePage />,
}
```

### Step 7: Add Navigation Link

Update sidebar links in `src/mock/prototypeMockData.ts`:

```typescript
sidebarLinks.push({
  label: 'My Prototype',
  href: '/my-prototype',
  icon: 'frame',
  isActive: false,
});
```

## Design System Alignment

### Color Mapping

Figma Color → CSS Variable
- Primary Blue → `var(--color-primary)`
- Secondary Gray → `var(--color-secondary)`
- White → `var(--color-neutral-0)`
- Light Gray → `var(--color-bg-secondary)`

### Typography Mapping

Figma Text Style → CSS Class
- Heading XL → `.heading-1`
- Heading L → `.heading-2`
- Heading M → `.heading-3`
- Body Normal → `.body-normal`
- Caption → `.caption`

### Spacing Mapping

Figma Spacing → SCSS Variable
- 8px → `$spacing-2` or `.gap-2`
- 16px → `$spacing-4` or `.gap-4`
- 32px → `$spacing-8` or `.gap-8`

### Component Variants

Use Figma component states to drive React component variants:

```typescript
// Figma: Button/Primary vs Button/Secondary
<Button variant="primary">Action</Button>
<Button variant="secondary">Cancel</Button>

// Figma: Button/Small vs Button/Large
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

## Layout Patterns

### Full-Width Container

```typescript
<div className="container">
  {/* Content here - max-width: 1200px */}
</div>
```

### Grid Layouts

```typescript
<div className="grid-3"> {/* 3 columns, responsive */}
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</div>
```

### Flex Layouts

```typescript
<div className="flex-between"> {/* Space between alignment */}
  <span>Label</span>
  <Button>Action</Button>
</div>
```

## State Management

For prototype purposes, use local React state:

```typescript
const [state, setState] = useState<ComponentState>('default');

{state === 'loading' && <LoadingState />}
{state === 'empty' && <EmptyState />}
{state === 'error' && <ErrorState />}
{state === 'default' && <Card>Content</Card>}
```

## Common Patterns to Avoid

❌ **Do NOT:**
- Create custom styles inline (use SCSS classes)
- Hardcode colors (use CSS variables)
- Create duplicate components (reuse existing)
- Use external UI libraries (Design System only)
- Implement complex state management (keep it simple)
- Add backend integration (prototype only)

✅ **DO:**
- Use existing components from `src/components/`
- Apply SCSS mixins and classes
- Document component mapping decisions
- Keep pages simple and focused
- Use mock data from `src/mock/`
- Align with design tokens and CSS custom properties

## Figma-to-React Checklist

See [figma-to-react-checklist.md](./figma-to-react-checklist.md) for a detailed checklist to use when converting Figma designs to React components.

## Component Mapping Reference

See [component-mapping.md](./component-mapping.md) for detailed mappings between Figma component patterns and React components.

## Next Steps

1. **Connect Figma MCP**: Set up Figma MCP in Claude Code or your AI agent
2. **Create First Prototype**: Use these guidelines to create a prototype from a Figma frame
3. **Iterate**: Refine the workflow based on learnings
4. **Document Patterns**: Add common patterns discovered during prototyping
5. **Integrate Design System**: When ready, swap placeholder components with Infra DS imports

## Support

For questions or issues with the Figma-to-React workflow, refer to:
- `src/components/` - Available components with examples
- `src/pages/PrototypePage/` - Demonstration of all states and components
- `src/styles/` - Design tokens and SCSS utilities
- `src/mock/` - Example data structures
