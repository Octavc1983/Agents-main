# Figma-to-React Component Mapping

This document provides detailed mappings between Figma component patterns and React components available in this prototype environment.

## Available React Components

### Layout Components

#### `<AppShell />`
**Purpose**: Main application layout wrapper  
**Location**: `src/components/layout/AppShell/AppShell.tsx`

**When to Use:**
- As the root layout for new prototype pages
- When you need Header + Sidebar + Main Content structure

**Figma Pattern:**
```
Frame: "App Layout"
├─ Left Sidebar
├─ Top Header
└─ Main Content Area
```

**React Usage:**
```typescript
<AppShell>
  {/* Content renders inside */}
</AppShell>
```

**SCSS Classes:**
- `.app-shell` - Main container
- `.app-shell__main` - Main content wrapper
- `.app-shell__content` - Content area

---

#### `<Header title="..." subtitle="..." />`
**Purpose**: Top navigation and page title  
**Location**: `src/components/layout/Header/Header.tsx`

**Props:**
- `title` (string, required) - Main title
- `subtitle` (string, optional) - Subtitle text

**Figma Pattern:**
```
Component: "Header"
├─ Title (Text, Bold, 24px+)
└─ Subtitle (Text, Regular, 16px)
```

**React Usage:**
```typescript
<Header 
  title="Page Title"
  subtitle="Optional description"
/>
```

**SCSS Classes:**
- `.header` - Container
- `.header__title` - Uses heading-2 mixin
- `.header__subtitle` - Uses body-normal mixin

---

#### `<Sidebar links={[...]} />`
**Purpose**: Left navigation menu  
**Location**: `src/components/layout/Sidebar/Sidebar.tsx`

**Props:**
- `links` (SidebarLink[], required) - Navigation links
- `isOpen` (boolean, optional) - Expand/collapse state

**Link Structure:**
```typescript
interface SidebarLink {
  label: string;      // Link text
  href: string;       // Route path
  icon?: string;      // Icon name
  isActive?: boolean; // Current page indicator
}
```

**Figma Pattern:**
```
Component: "Sidebar"
├─ Navigation Container
├─ Link Item (Hover state)
├─ Link Item (Active state)
└─ Link Item (Default state)
```

**React Usage:**
```typescript
<Sidebar links={[
  { label: 'Home', href: '/', icon: 'home' },
  { label: 'About', href: '/about', icon: 'info' },
]} />
```

---

### UI Components

#### `<Button variant="..." size="..." />`
**Purpose**: Interactive button element  
**Location**: `src/components/ui/Button/Button.tsx`

**Props:**
- `variant` - 'primary' | 'secondary' | 'tertiary' | 'danger' (default: 'primary')
- `size` - 'sm' | 'md' | 'lg' (default: 'md')
- `disabled` (boolean) - Disabled state
- `isLoading` (boolean) - Loading state
- `onClick` (function) - Click handler
- `children` (ReactNode) - Button text/content

**Figma Variants:**

| Figma | React | Usage |
|-------|-------|-------|
| Button/Primary | `<Button variant="primary">` | Primary actions |
| Button/Secondary | `<Button variant="secondary">` | Secondary actions |
| Button/Tertiary | `<Button variant="tertiary">` | Less important actions |
| Button/Danger | `<Button variant="danger">` | Destructive actions |

**Size Mapping:**

| Figma | React | Padding | Font Size |
|-------|-------|---------|-----------|
| Button/Small | `<Button size="sm">` | 8px 16px | 14px |
| Button/Medium | `<Button size="md">` | 12px 24px | 16px |
| Button/Large | `<Button size="lg">` | 16px 32px | 18px |

**Figma Pattern:**
```
Component: "Button/Primary"
├─ Default state
├─ Hover state (darker background)
├─ Active state (scale down)
├─ Disabled state (opacity)
└─ Loading state (spinner)
```

**React Usage:**
```typescript
// Primary button
<Button variant="primary" onClick={handleClick}>Save</Button>

// Secondary button
<Button variant="secondary">Cancel</Button>

// Loading state
<Button isLoading>Processing...</Button>

// Small danger button
<Button variant="danger" size="sm">Delete</Button>
```

**SCSS Classes:**
- `.button` - Base styles
- `.button--primary` - Primary variant
- `.button--secondary` - Secondary variant
- `.button--tertiary` - Tertiary variant
- `.button--danger` - Danger variant
- `.button--sm` - Small size
- `.button--md` - Medium size
- `.button--lg` - Large size

---

#### `<Card variant="..." title="..." />`
**Purpose**: Content container with optional header  
**Location**: `src/components/ui/Card/Card.tsx`

**Props:**
- `variant` - 'default' | 'elevated' | 'outlined' (default: 'default')
- `title` (string, optional) - Card header title
- `subtitle` (string, optional) - Card header subtitle
- `children` (ReactNode) - Card content

**Figma Variants:**

| Variant | Shadow | Border | Use Case |
|---------|--------|--------|----------|
| Default | None | Light | Content sections |
| Elevated | Small shadow | Light | Hoverable containers |
| Outlined | None | Medium | Emphasized sections |

**Figma Pattern:**
```
Component: "Card/Default"
├─ Header (optional)
│  ├─ Title (Heading 4)
│  └─ Subtitle (Body Small)
└─ Content (flexible)
```

**React Usage:**
```typescript
// Simple card
<Card>
  <p>Content here</p>
</Card>

// Card with title
<Card title="Card Title" subtitle="Optional subtitle">
  <p>Content here</p>
</Card>

// Elevated card
<Card variant="elevated" title="Elevated Card">
  <p>Lifted off the page</p>
</Card>

// Outlined card
<Card variant="outlined" title="Outlined Card">
  <p>With border emphasis</p>
</Card>
```

**SCSS Classes:**
- `.card` - Base styles
- `.card--default` - Default variant
- `.card--elevated` - Elevated variant with shadow
- `.card--outlined` - Outlined variant with border
- `.card__header` - Header section
- `.card__title` - Title styling
- `.card__content` - Content section

---

#### `<LoadingState message="..." />`
**Purpose**: Loading indicator with message  
**Location**: `src/components/ui/LoadingState/LoadingState.tsx`

**Props:**
- `message` (string, optional) - Loading text (default: "Loading...")
- `className` (string, optional) - Additional CSS classes

**Figma Pattern:**
```
Component: "Loading State"
├─ Animated spinner
├─ Loading message
└─ Optional subtext
```

**React Usage:**
```typescript
{isLoading && <LoadingState message="Fetching data..." />}
```

**States:**
- Shows centered spinner
- Displays provided message
- Occupies full card space

---

#### `<EmptyState title="..." description="..." />`
**Purpose**: Empty state placeholder  
**Location**: `src/components/ui/EmptyState/EmptyState.tsx`

**Props:**
- `title` (string, required) - Empty state title
- `description` (string, optional) - Detailed description
- `icon` (ReactNode, optional) - Icon or emoji
- `action` (ReactNode, optional) - CTA button or link
- `className` (string, optional) - Additional CSS classes

**Figma Pattern:**
```
Component: "Empty State"
├─ Icon/illustration
├─ Title
├─ Description (optional)
└─ Action button (optional)
```

**React Usage:**
```typescript
{items.length === 0 && (
  <EmptyState
    title="No Items Found"
    description="Create your first item to get started"
    icon="📭"
    action={<Button onClick={handleCreate}>Create Item</Button>}
  />
)}
```

**Styling:**
- Dashed border background
- Centered all content
- 300px minimum height

---

#### `<ErrorState title="..." message="..." />`
**Purpose**: Error state display  
**Location**: `src/components/ui/ErrorState/ErrorState.tsx`

**Props:**
- `title` (string, required) - Error title
- `message` (string, required) - Error description
- `action` (ReactNode, optional) - Recovery action (e.g., Retry button)
- `className` (string, optional) - Additional CSS classes

**Figma Pattern:**
```
Component: "Error State"
├─ Warning icon
├─ Error title
├─ Error message
└─ Recovery action (optional)
```

**React Usage:**
```typescript
{error && (
  <ErrorState
    title="Failed to Load"
    message="Something went wrong. Please try again."
    action={<Button onClick={handleRetry}>Retry</Button>}
  />
)}
```

**Styling:**
- Light red background
- Red border
- Warning icon
- Centered layout

---

## Layout Utility Classes

### Container
```typescript
<div className="container">
  {/* Max-width: 1200px, centered, responsive padding */}
</div>
```

### Grid Layouts
```typescript
// 3-column responsive grid
<div className="grid-3">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</div>

// 2-column responsive grid
<div className="grid-2">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
</div>
```

### Flexbox
```typescript
// Space between (e.g., for headers)
<div className="flex-between">
  <h3>Title</h3>
  <Button>Action</Button>
</div>

// Center content
<div className="flex-center">
  <LoadingState />
</div>

// Column layout
<div className="flex-col gap-4">
  <p>First</p>
  <p>Second</p>
</div>
```

## Design Token Mapping Quick Reference

### Colors
```scss
Primary:    var(--color-primary)        // #0066cc
Success:    var(--color-success)        // #28a745
Warning:    var(--color-warning)        // #ffc107
Danger:     var(--color-danger)         // #dc3545
Text:       var(--color-text-primary)   // #212529
Background: var(--color-bg-primary)     // #ffffff
```

### Typography
```scss
.heading-1, .heading-2, .heading-3, .heading-4
.body-large, .body-normal, .body-small
.caption
```

### Spacing
```scss
$spacing-2   // 8px
$spacing-4   // 16px
$spacing-6   // 24px
$spacing-8   // 32px
```

### Border Radius
```scss
$border-radius-base   // 8px
$border-radius-lg     // 16px
$border-radius-full   // 9999px
```

## Decision Flow: Which Component to Use?

```
Is it a layout wrapper?
├─ YES → Use AppShell or div.container
└─ NO → Is it an action button?
    ├─ YES → Use <Button>
    └─ NO → Is it a content container?
        ├─ YES → Use <Card>
        └─ NO → Is it a loading indicator?
            ├─ YES → Use <LoadingState>
            └─ NO → Is it an empty state?
                ├─ YES → Use <EmptyState>
                └─ NO → Is it an error state?
                    ├─ YES → Use <ErrorState>
                    └─ NO → Create custom component
```

## When to Create New Components

❌ **Do NOT create new components if:**
- An existing component can be reused with different content
- The component is just a text wrapper
- It's a simple layout pattern covered by utility classes

✅ **Consider creating new components if:**
- Multiple instances are needed with identical structure but different variations
- The component has complex internal logic
- It's a complex combination that appears in multiple places
- It should be added to the Design System later

## Design System Migration Checklist

When migrating to Infra Design System:

- [ ] Replace `<Button>` imports with Infra version
- [ ] Replace `<Card>` imports with Infra version
- [ ] Update color tokens to match Infra palette
- [ ] Update typography classes to match Infra scale
- [ ] Remove placeholder component SCSS files
- [ ] Update all component imports in pages
- [ ] Test all pages for visual consistency
- [ ] Update this document with new mappings
