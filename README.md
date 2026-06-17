# UX/UI Prototype Environment

A rapid prototyping environment for converting Figma designs into React components through Figma MCP integration. Built with Vite, React, TypeScript, and SCSS.

## 🎯 Purpose

This project is a **UX/UI rapid prototyping environment**, not a production application. It's designed to:

- Receive design context from Figma through MCP
- Generate React pages quickly and efficiently
- Keep implementation aligned with design system principles
- Support AI-assisted prototyping workflows
- Enable fast iteration on UX/UI designs

## ⚡ Quick Start

### Installation

```bash
# Navigate to the project directory
cd ux-prototype

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── app/
│   ├── App.tsx              # Main application component
│   └── router.tsx           # Route configuration
├── pages/
│   ├── HomePage/
│   │   ├── HomePage.tsx     # Landing page
│   │   └── HomePage.scss
│   └── PrototypePage/
│       ├── PrototypePage.tsx # Component demonstration page
│       └── PrototypePage.scss
├── components/
│   ├── layout/
│   │   ├── AppShell/        # Main layout wrapper
│   │   ├── Header/          # Top navigation
│   │   └── Sidebar/         # Left navigation
│   └── ui/
│       ├── Button/          # Button component
│       ├── Card/            # Card container
│       ├── LoadingState/    # Loading indicator
│       ├── EmptyState/      # Empty state display
│       └── ErrorState/      # Error state display
├── styles/
│   ├── _variables.scss      # Design tokens & CSS custom properties
│   ├── _mixins.scss         # SCSS utilities
│   ├── _reset.scss          # CSS reset
│   ├── _typography.scss     # Typography styles
│   └── globals.scss         # Global imports
├── types/
│   └── prototype.types.ts   # TypeScript interfaces
├── mock/
│   └── prototypeMockData.ts # Mock data for demos
├── figma/
│   ├── figma-mcp-guidelines.md    # Figma-to-React workflow
│   ├── component-mapping.md       # Component reference
│   └── figma-to-react-checklist.md # Implementation checklist
└── agents/
    └── AGENTS.md            # AI agent workflows
```

## 🎨 Design System

### CSS Variables & SCSS Foundation

All design tokens are defined in `src/styles/_variables.scss`:

```scss
// Colors
--color-primary: #0066cc
--color-success: #28a745
--color-danger: #dc3545
--color-text-primary: #212529
--color-bg-primary: #ffffff

// Typography
--font-size-base: 1rem (16px)
--font-size-lg: 1.125rem (18px)
--font-size-xl: 1.25rem (20px)

// Spacing (8px base)
--spacing-2: 0.5rem (8px)
--spacing-4: 1rem (16px)
--spacing-6: 1.5rem (24px)
--spacing-8: 2rem (32px)

// Border Radius
--border-radius-base: 0.5rem (8px)
--border-radius-lg: 1rem (16px)
```

### Available SCSS Mixins

```scss
// Responsive breakpoints
@include respond-to('md') { ... }

// Flexbox utilities
@include flex-center;
@include flex-between;
@include flex-col;

// Typography
@include heading-1; @include heading-2;
@include body-normal; @include body-small;
@include caption;

// Surfaces
@include surface;
@include surface-elevated;
@include surface-overlay;
```

## 🧩 Components

### UI Components

All UI components are **placeholder components** ready for Design System integration.

#### Button
```typescript
<Button variant="primary" size="md" onClick={handleClick}>
  Click me
</Button>
```
Variants: `primary`, `secondary`, `tertiary`, `danger`  
Sizes: `sm`, `md`, `lg`

#### Card
```typescript
<Card variant="elevated" title="Card Title">
  Content here
</Card>
```
Variants: `default`, `elevated`, `outlined`

#### States
```typescript
<LoadingState message="Loading..." />
<EmptyState title="No data" icon="📭" />
<ErrorState title="Error" message="Something went wrong" />
```

### Layout Components

#### AppShell
Main layout wrapper combining Header, Sidebar, and main content.

#### Header
Top navigation with title and subtitle support.

#### Sidebar
Left navigation with active link highlighting.

## 🔄 Routing

Routes are configured in `src/app/router.tsx`:

- `/` - Home page
- `/prototype` - Component demonstration page

Add new routes:
```typescript
{
  path: '/new-page',
  element: <NewPageComponent />,
}
```

## 🤖 Figma MCP Integration

This project is fully prepared for Figma MCP integration:

### Workflow Guides

1. **[Figma MCP Guidelines](src/figma/figma-mcp-guidelines.md)**
   - How to read Figma frames through MCP
   - Mapping Figma layers to React components
   - Design token identification
   - Best practices

2. **[Component Mapping Reference](src/figma/component-mapping.md)**
   - Detailed component documentation
   - Usage examples
   - Design system alignment
   - Migration checklist

3. **[Figma-to-React Checklist](src/figma/figma-to-react-checklist.md)**
   - Step-by-step implementation guide
   - Quality assurance checklist
   - Common issues and solutions

### AI Agent Support

See [src/agents/AGENTS.md](src/agents/AGENTS.md) for:

- Prototype Page Builder Agent
- Component Mapper Agent
- Design System Review Agent
- UX Flow Review Agent
- State Builder Agent
- Navigation Integration Agent
- Figma Alignment Agent

## 📝 Mock Data

Mock data is available in `src/mock/prototypeMockData.ts`:

```typescript
import { mockItems, sidebarLinks } from '../mock/prototypeMockData';
```

## 🚀 Creating a New Prototype Page

1. **Create the component:**
   ```bash
   mkdir -p src/pages/MyPrototype
   ```

2. **Create TypeScript file:**
   ```typescript
   // src/pages/MyPrototype/MyPrototype.tsx
   export const MyPrototype: React.FC = () => {
     return <div>Content</div>;
   };
   ```

3. **Create SCSS file:**
   ```scss
   // src/pages/MyPrototype/MyPrototype.scss
   @import '../../styles/variables';
   @import '../../styles/mixins';

   .my-prototype { }
   ```

4. **Add to router:**
   ```typescript
   // src/app/router.tsx
   {
     path: '/my-prototype',
     element: <MyPrototype />,
   }
   ```

5. **Add navigation link:**
   ```typescript
   // src/mock/prototypeMockData.ts
   sidebarLinks.push({
     label: 'My Prototype',
     href: '/my-prototype',
     icon: 'frame',
   });
   ```

## 🔧 Tech Stack

- **Vite** - Fast build tool and dev server
- **React** - UI framework
- **TypeScript** - Type safety
- **React Router** - Client-side routing
- **SCSS** - Styling with variables and mixins
- **CSS Custom Properties** - Design tokens

## ⚠️ Important Notes

### No Tailwind
This project uses **custom SCSS** with design tokens instead of Tailwind. Use utility classes from `src/styles/globals.scss`:

```typescript
<div className="flex-center gap-4 p-6">
  <button className="button button--primary">Action</button>
</div>
```

### No External UI Libraries
All components are **placeholders** designed to be replaced by your Infra Design System:

```typescript
// Current (placeholder)
import { Button } from '../../components/ui/Button/Button';

// Future (Infra DS)
import { Button } from '@infra/design-system';
```

### Simple State Management
Use **local React state** only:

```typescript
const [state, setState] = useState<ComponentState>('default');
```

### No Backend Integration
This is a **prototype only** - no API calls, authentication, or backend logic.

## 📚 Documentation

- [Figma MCP Guidelines](src/figma/figma-mcp-guidelines.md)
- [Component Mapping](src/figma/component-mapping.md)
- [Implementation Checklist](src/figma/figma-to-react-checklist.md)
- [Agent Workflows](src/agents/AGENTS.md)

## 🎯 Design System Alignment

When your Infra Design System is ready:

1. Replace component imports
2. Update SCSS imports
3. Map design tokens to DS tokens
4. Run migration checklist

See [Design System Migration](src/figma/component-mapping.md#design-system-migration-checklist) for details.

## 🚦 Next Steps

1. **Connect to GitHub**: Initialize version control
2. **Set up Figma MCP**: Configure with Claude Code or AI agent
3. **Create first prototype**: Use guidelines in `src/figma/`
4. **Iterate**: Refine based on design feedback
5. **Integrate Design System**: Swap components when ready

## 📖 Additional Resources

- **Getting Started with Vite**: [vitejs.dev](https://vitejs.dev)
- **React Documentation**: [react.dev](https://react.dev)
- **React Router**: [reactrouter.com](https://reactrouter.com)
- **SCSS Documentation**: [sass-lang.com](https://sass-lang.com)

## 💡 Best Practices

✅ **DO:**
- Use existing components before creating new ones
- Apply SCSS classes and mixins
- Use CSS variables for colors and tokens
- Keep state logic simple and local
- Follow BEM naming in SCSS
- Document component mappings
- Test responsive layouts

❌ **DON'T:**
- Create duplicate components
- Use inline styles
- Hardcode colors
- Add complex state management
- Create production features
- Modify existing component APIs
- Use external UI libraries

## 🤝 Contributing

This is a personal prototyping environment. To extend:

1. Follow the existing component patterns
2. Use design tokens consistently
3. Document any new components
4. Update agent documentation
5. Keep it focused on UX/UI prototyping

## 📄 License

This is a rapid prototyping environment. Use as you see fit for design exploration and UX workflows.

---

**Ready to prototype?** Start at `http://localhost:5173/` after running `npm run dev`.

For Figma integration guidance, see [src/figma/figma-mcp-guidelines.md](src/figma/figma-mcp-guidelines.md).
