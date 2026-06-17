# Component Mapping Analysis: Application Shell & Navigation

**Date**: 2026-06-14  
**Scope**: Base UX/UI Prototype Structure - App Shell & Navigation Assembly  
**Status**: Ready for Implementation

---

## Executive Summary

The project has a **solid foundation** for building the application shell and navigation. All essential layout components exist, routing is configured, and design tokens are in place. The application is **ready to start building prototype pages** using the existing structure.

---

## 1. EXISTING COMPONENTS - READY FOR REUSE

### A. Layout Components (✅ Production Ready)

#### 1.1 **AppShell** (`src/components/layout/AppShell/AppShell.tsx`)
- **Purpose**: Main application layout container
- **Current Structure**:
  - Combines Sidebar + Header + Main Content Area
  - Uses React Router `<Outlet>` for page rendering
  - Fully responsive layout with flexbox
  - Sticky sidebar with 280px default width
  - Collapsible to 64px on medium screens
- **Current Implementation**:
  ```
  ├─ <Sidebar links={sidebarLinks} />
  ├─ <div className="app-shell__main">
  │  ├─ <Header title="..." subtitle="..." />
  │  └─ <main className="app-shell__content">
  │     └─ <Outlet /> (route pages render here)
  │  </div>
  └─ </div>
  ```
- **Ready to Use**: ✅ YES - No changes needed
- **File Reference**: [AppShell.tsx](src/components/layout/AppShell/AppShell.tsx)

#### 1.2 **Sidebar** (`src/components/layout/Sidebar/Sidebar.tsx`)
- **Purpose**: Left navigation menu
- **Features**:
  - Accepts array of `SidebarLink` objects
  - Supports icons (emoji/unicode strings currently)
  - Active link styling (blue background, white text)
  - Hover states (background change, primary text color)
  - Responsive collapse (280px → 64px on medium screens)
  - Sticky positioning (top: 0)
  - Scrollable with overflow-y: auto
- **Current Props**:
  ```typescript
  interface SidebarProps {
    links: SidebarLink[];        // Navigation links array
    isOpen?: boolean;            // Expand/collapse state (default: true)
  }
  
  interface SidebarLink {
    label: string;               // Link text
    href: string;                // React Router path
    icon?: string;               // Icon (emoji/unicode)
    isActive?: boolean;          // Current page indicator
  }
  ```
- **SCSS Classes Available**:
  - `.sidebar` - Main container
  - `.sidebar--open` / `.sidebar--closed` - State variants
  - `.sidebar__nav` - Navigation container
  - `.sidebar__link` - Individual link
  - `.sidebar__link--active` - Active link state
  - `.sidebar__icon` - Icon element (20px)
  - `.sidebar__label` - Link text
- **Ready to Use**: ✅ YES - Fully functional
- **File Reference**: [Sidebar.tsx](src/components/layout/Sidebar/Sidebar.tsx)

#### 1.3 **Header** (`src/components/layout/Header/Header.tsx`)
- **Purpose**: Top navigation bar with page title
- **Features**:
  - Title and optional subtitle support
  - Uses heading-2 typography for title
  - Uses body-normal typography for subtitle
  - Responsive padding (32px → 24px → 16px)
  - Background color: secondary (light gray)
- **Current Props**:
  ```typescript
  interface HeaderProps {
    title: string;               // Page title (required)
    subtitle?: string;           // Optional subtitle
  }
  ```
- **SCSS Classes**:
  - `.header` - Container
  - `.header__container` - Inner wrapper
  - `.header__content` - Content wrapper
  - `.header__title` - Title (heading-2 style)
  - `.header__subtitle` - Subtitle (body-normal style)
- **Ready to Use**: ✅ YES - Static title/subtitle only (no breadcrumbs yet)
- **File Reference**: [Header.tsx](src/components/layout/Header/Header.tsx)

---

### B. UI Components (✅ Ready as Placeholders)

#### 1.4 **Button** (`src/components/ui/Button/Button.tsx`)
- **Variants**: primary | secondary | tertiary | danger
- **Sizes**: sm | md | lg
- **States**: default, hover, active, disabled, loading
- **Ready to Use**: ✅ YES - Placeholder component (marked for Infra DS replacement)
- **File Reference**: [Button.tsx](src/components/ui/Button/Button.tsx)

#### 1.5 **Card** (`src/components/ui/Card/Card.tsx`)
- **Variants**: default | elevated | outlined
- **Features**: Optional title, subtitle, content area
- **Ready to Use**: ✅ YES - Placeholder component (marked for Infra DS replacement)
- **File Reference**: [Card.tsx](src/components/ui/Card/Card.tsx)

#### 1.6 **State Display Components**
- **LoadingState**: Spinner + message ([LoadingState.tsx](src/components/ui/LoadingState/LoadingState.tsx))
- **EmptyState**: Icon + title + description + optional action ([EmptyState.tsx](src/components/ui/EmptyState/EmptyState.tsx))
- **ErrorState**: Warning icon + title + message + optional action ([ErrorState.tsx](src/components/ui/ErrorState/ErrorState.tsx))
- **Ready to Use**: ✅ YES - For page states

---

## 2. ROUTING & STRUCTURE

### 2.1 Current Routes

**File**: [src/app/router.tsx](src/app/router.tsx)

```
Root Route: /
├─ Layout: <AppShell />
└─ Child Routes:
   ├─ / (index) → <HomePage />
   ├─ /prototype → <PrototypePage />
   └─ (ready for more routes)
```

**Ready to Use**: ✅ YES - Router structure supports adding new routes

---

### 2.2 Navigation Data

**File**: [src/mock/prototypeMockData.ts](src/mock/prototypeMockData.ts)

**Current Sidebar Links**:
```typescript
sidebarLinks: SidebarLink[] = [
  { label: 'Home', href: '/', icon: 'home', isActive: true },
  { label: 'Prototype', href: '/prototype', icon: 'frame', isActive: false },
  { label: 'Components', href: '/components', icon: 'layers', isActive: false },
  { label: 'Figma Docs', href: '/figma-docs', icon: 'file-text', isActive: false },
]
```

**Issues**: 
- ⚠️ `isActive` is hardcoded in mock data (doesn't track actual route)
- ⚠️ Icons are emoji/unicode strings, not semantic icon components

---

## 3. FILES TO INSPECT BEFORE IMPLEMENTATION

### Essential Files
1. **[src/app/router.tsx](src/app/router.tsx)** - Router structure
2. **[src/components/layout/AppShell/AppShell.tsx](src/components/layout/AppShell/AppShell.tsx)** - Main layout
3. **[src/components/layout/Sidebar/Sidebar.tsx](src/components/layout/Sidebar/Sidebar.tsx)** - Navigation
4. **[src/components/layout/Header/Header.tsx](src/components/layout/Header/Header.tsx)** - Page header
5. **[src/types/prototype.types.ts](src/types/prototype.types.ts)** - Type definitions
6. **[src/mock/prototypeMockData.ts](src/mock/prototypeMockData.ts)** - Navigation mock data

### Design System Files
7. **[src/styles/_variables.scss](src/styles/_variables.scss)** - Design tokens & colors
8. **[src/styles/_mixins.scss](src/styles/_mixins.scss)** - SCSS utilities
9. **[src/styles/globals.scss](src/styles/globals.scss)** - Global styles
10. **[src/styles/_typography.scss](src/styles/_typography.scss)** - Typography mixins

### Documentation Files
11. **[src/figma/component-mapping.md](src/figma/component-mapping.md)** - Component patterns
12. **[src/figma/figma-mcp-guidelines.md](src/figma/figma-mcp-guidelines.md)** - Design workflow

---

## 4. MISSING COMPONENTS & GAPS

### 4.1 Missing Navigation Features

| Feature | Current Status | Impact | Solution |
|---------|---|---|---|
| **Active Route Tracking** | ❌ Not Implemented | `isActive` hardcoded in mock | Use React Router's `useLocation()` hook in Sidebar |
| **Icon System** | ⚠️ Partial | Unicode/emoji strings only | Create icon component or use icon library later |
| **Expandable Groups** | ❌ Not Implemented | Single-level nav only | Can add later with recursive group structure |
| **Breadcrumb Trail** | ❌ Not Implemented | No breadcrumb navigation | Can be added to Header component |
| **Mobile Hamburger Menu** | ⚠️ Partial | Sidebar collapses on medium screens | No hamburger toggle button yet |
| **Navigation Tooltips** | ❌ Not Implemented | Collapsed sidebar has no labels | Can add tooltips to collapsed nav items |

### 4.2 Potential Prototype Placeholders Needed

1. **Icon Component** - For semantic icons (currently using emoji strings)
2. **Breadcrumb Component** - For page hierarchy navigation
3. **Mobile Navigation Drawer** - For small screens (alternative to collapsed sidebar)
4. **Navigation Group Component** - For expandable nav sections

---

## 5. RECOMMENDED ROUTE STRUCTURE

### Suggested Structure for Full Application
```
/                                    → HomePage
├─ /prototype                        → PrototypePage
├─ /components                       → Component Gallery
├─ /figma-docs                       → Figma Documentation
└─ /[feature-name]                   → New feature pages
```

### Implementation Strategy
1. **No changes needed** to current router structure - already supports nested routes
2. Simply add new routes as needed:
   ```typescript
   {
     path: 'new-feature',
     element: <NewFeaturePage />,
   }
   ```
3. Update sidebar links in `prototypeMockData.ts` to include new routes

---

## 6. RECOMMENDED NAVIGATION STRUCTURE

### Current Navigation (Static)
- Sidebar with 4 main links
- Top Header with title only
- No breadcrumbs
- No nested navigation

### Recommended Enhancements (Phase 2+)

**Phase 1 (Current)**: Keep simple flat navigation
- Sidebar: 4-6 main feature links
- Header: Title + subtitle for page context

**Phase 2 (Optional)**: Add breadcrumbs
```
Home > Feature > Sub-page
```

**Phase 3 (Optional)**: Add nested navigation groups
```
Sidebar
├─ Home
├─ Prototypes
│  ├─ Prototype 1
│  ├─ Prototype 2
│  └─ Prototype 3
└─ Documentation
```

---

## 7. DESIGN SYSTEM & TOKENS

### Available Design Tokens

**Colors** - [_variables.scss](src/styles/_variables.scss)
- Primary: `#0066cc` (blue)
- Secondary: `#6c757d` (gray)
- Success: `#28a745` (green)
- Warning: `#ffc107` (yellow)
- Danger: `#dc3545` (red)
- Neutral scale: 0-900 (white to black)

**Typography**
- Font: System stack (Segoe UI, Roboto, etc.)
- Sizes: xs (12px) → 4xl (36px)
- Weights: light (300) → bold (700)
- Mixins: `@include heading-1` through `@include body-small`

**Spacing** - 8px base unit
- `$spacing-2`: 8px
- `$spacing-4`: 16px
- `$spacing-6`: 24px
- `$spacing-8`: 32px

**Border Radius**
- `$border-radius-base`: 8px (default for cards, buttons)
- `$border-radius-lg`: 16px (larger components)

---

## 8. RISKS & OPEN QUESTIONS

### 🔴 Critical Issues

1. **Active Navigation State Not Tracking Route**
   - **Problem**: `isActive` prop is hardcoded in mock data
   - **Impact**: Current active link doesn't update when navigating
   - **Solution**: Implement `useLocation()` hook in Sidebar to dynamically compute `isActive`
   - **Priority**: HIGH - Fix before using in production

2. **Icon System Undefined**
   - **Problem**: Currently using emoji/unicode strings for icons
   - **Impact**: No consistent icon system; hard to scale
   - **Solution**: Either integrate an icon library (lucide-react, feather, etc.) or wait for Infra DS icons
   - **Priority**: MEDIUM - Can work with emoji for now, but not scalable

### 🟡 Design Questions

3. **Mobile Navigation Strategy**
   - **Question**: Should collapsed sidebar show hamburger menu on mobile?
   - **Current**: Sidebar just narrows to 64px on medium screens
   - **Impact**: Labels hidden but not accessible on smaller screens
   - **Recommendation**: Consider hamburger menu for xs screens

4. **Breadcrumb vs Title-Only Navigation**
   - **Question**: Should Header show breadcrumb trail or just page title?
   - **Current**: Title + subtitle only
   - **Impact**: Users may not know page hierarchy
   - **Recommendation**: Add breadcrumbs for complex multi-level pages

5. **Navigation Group Expansion**
   - **Question**: Should sidebar support expandable groups (e.g., "Prototypes" → multiple sub-pages)?
   - **Current**: Flat list only
   - **Impact**: Sidebar can become crowded with many pages
   - **Recommendation**: Plan for this if prototype grows beyond ~10 pages

### 🟢 Ready to Proceed

6. **All existing components work correctly**
   - Layout structure is solid
   - Routing is properly configured
   - Design tokens are comprehensive
   - SCSS utilities are well-organized

---

## 9. COMPONENT MAPPING SUMMARY TABLE

| Feature | Component | Location | Status | Notes |
|---------|-----------|----------|--------|-------|
| App Layout | `<AppShell />` | `layout/AppShell/` | ✅ Ready | No changes needed |
| Sidebar Nav | `<Sidebar />` | `layout/Sidebar/` | ⚠️ Active state issue | Needs `useLocation()` hook |
| Page Header | `<Header />` | `layout/Header/` | ✅ Ready | Static title/subtitle only |
| Buttons | `<Button />` | `ui/Button/` | ✅ Ready | Placeholder for Infra DS |
| Cards | `<Card />` | `ui/Card/` | ✅ Ready | Placeholder for Infra DS |
| Loading | `<LoadingState />` | `ui/LoadingState/` | ✅ Ready | Page state display |
| Empty | `<EmptyState />` | `ui/EmptyState/` | ✅ Ready | Page state display |
| Error | `<ErrorState />` | `ui/ErrorState/` | ✅ Ready | Page state display |
| Router | React Router | `app/router.tsx` | ✅ Ready | Nested routes working |
| Types | TypeScript | `types/prototype.types.ts` | ✅ Ready | Comprehensive type definitions |
| Design Tokens | SCSS Variables | `styles/_variables.scss` | ✅ Ready | Full token system |

---

## 10. ACTION ITEMS FOR NEXT PHASE

### Before Building First Page:
- [ ] **Fix Active Navigation State** - Implement `useLocation()` hook in Sidebar component
- [ ] **Decide on Icon Strategy** - Choose icon library or use emoji as-is for MVP
- [ ] **Review Design Tokens** - Verify color palette matches Figma designs

### When Building Pages:
- [ ] **Use AppShell as layout wrapper** - All pages render inside `<Outlet />`
- [ ] **Add route to router.tsx** - Register new page route
- [ ] **Update sidebar links** - Add navigation link to new page
- [ ] **Follow component mapping** - Use existing components (Button, Card, states)
- [ ] **Use design tokens** - Apply spacing, colors, typography from `_variables.scss`

### Optional Enhancements (Phase 2+):
- [ ] Add breadcrumb component to Header
- [ ] Implement expandable navigation groups
- [ ] Add mobile hamburger menu toggle
- [ ] Create icon component for consistent icon handling

---

## 11. FILES CREATED BY THIS ANALYSIS

**This Document**: `COMPONENT_MAPPING_ANALYSIS.md` - Complete mapping and recommendations

---

## 12. READY TO BUILD

✅ **The project is ready to start building prototype pages!**

### Quick Start for New Page:
1. Create page file: `src/pages/[PageName]/[PageName].tsx`
2. Create page styles: `src/pages/[PageName]/[PageName].scss`
3. Add route to `src/app/router.tsx`
4. Update sidebar links in `src/mock/prototypeMockData.ts`
5. Use existing components: `<Button>`, `<Card>`, state components
6. Apply design tokens from `_variables.scss`

---

**Next Step**: Use the Prototype Page Builder Agent workflow to create actual prototype pages!
