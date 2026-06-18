# Figma-to-React Checklist

Use this checklist when converting a Figma design to a React prototype page.

## Phase 1: Analysis & Planning

### Figma Frame Analysis
- [ ] Open the Figma frame in the design file
- [ ] Document the frame name and purpose
- [ ] Take a screenshot of the final design
- [ ] Note the dimensions and breakpoints

### Visual Hierarchy Review
- [ ] Identify the main container/background
- [ ] Map all section breaks and groupings
- [ ] Document the layout type (grid, flex, stacked)
- [ ] List all text elements and their hierarchy (heading, body, caption)
- [ ] Identify all interactive elements (buttons, links, inputs)
- [ ] Note all visual states (hover, active, disabled, loading)

### Component Inventory
- [ ] List all distinct components used
- [ ] Mark components that exist in React library
- [ ] Note components that need to be created
- [ ] Identify reusable patterns

## Phase 2: Mapping & Design Tokens

### Color Extraction
- [ ] List all colors used in the frame
- [ ] Map each color to CSS variables (see `src/styles/_variables.scss`)
- [ ] Document any custom colors not in the palette
- [ ] Note color usage (background, text, border, accent)

### Typography Mapping
- [ ] Document all font sizes used
- [ ] Map each size to typography class (.heading-1, .body-normal, etc.)
- [ ] Check font weights (bold, medium, normal)
- [ ] Note line heights and letter spacing if different

### Spacing Measurement
- [ ] Measure all padding/margins in the design
- [ ] Map to 8px-based spacing scale:
  - 4px → $spacing-1
  - 8px → $spacing-2
  - 16px → $spacing-4
  - 24px → $spacing-6
  - 32px → $spacing-8
  - 40px → $spacing-10
  - 48px → $spacing-12
- [ ] Verify consistency with design system spacing

### Component Mapping
- [ ] For each Figma component, find corresponding React component
- [ ] Document layer → component → CSS mapping
- [ ] Note which variants/sizes to use
- [ ] List any customizations needed

## Phase 3: File Structure Setup

### Create Page Files
- [ ] Create `src/pages/[PageName]/[PageName].tsx`
- [ ] Create `src/pages/[PageName]/[PageName].scss`
- [ ] Create proper TypeScript interfaces if needed

### Update Routing
- [ ] Add route in `src/app/router.tsx`
- [ ] Use path like `/[feature-name]` or `/prototype-[name]`
- [ ] Test route accessibility

### Update Navigation
- [ ] Add link to `src/mock/prototypeMockData.ts` sidebarLinks
- [ ] Set correct href and icon
- [ ] Verify link appears in sidebar

## Phase 4: HTML Structure & Components

### Create React Component Structure
- [ ] Set up main component container with class name
- [ ] Identify layout pattern (container, grid, flex)
- [ ] Apply correct container class (`.container`, `.grid-3`, etc.)
- [ ] Create semantic section/div structure

### Component Replacement
- [ ] [ ] Replace button elements with `<Button>` component
  - [ ] Correct variant (primary, secondary, tertiary, danger)
  - [ ] Correct size (sm, md, lg)
  - [ ] Correct onClick handler if needed
- [ ] [ ] Replace card containers with `<Card>` component
  - [ ] Correct variant (default, elevated, outlined)
  - [ ] Pass title and subtitle if applicable
  - [ ] Move content into children
- [ ] [ ] Add state components as needed
  - [ ] `<LoadingState>` for loading
  - [ ] `<EmptyState>` for empty
  - [ ] `<ErrorState>` for error
- [ ] [ ] Replace text blocks with correct classes
  - [ ] Headings: `.heading-1`, `.heading-2`, `.heading-3`, `.heading-4`
  - [ ] Body: `.body-large`, `.body-normal`, `.body-small`
  - [ ] Captions: `.caption`

### Layout Implementation
- [ ] [ ] Implement main layout structure
  - [ ] Container max-width and centering
  - [ ] Responsive breakpoints
  - [ ] Flexbox or grid layout
- [ ] [ ] Verify layout matches Figma design
  - [ ] On desktop (1200px+)
  - [ ] On tablet (768px-1199px)
  - [ ] On mobile (< 768px)

## Phase 5: Styling & SCSS

### Create SCSS Structure
- [ ] Import variables: `@import '../../styles/variables';`
- [ ] Import mixins: `@import '../../styles/mixins';`
- [ ] Create root element class name
- [ ] Follow BEM naming: `.component`, `.component__section`, `.component--state`

### Apply Design Tokens
- [ ] [ ] Use CSS variables for all colors
  - [ ] Text colors: `var(--color-text-primary)`
  - [ ] Backgrounds: `var(--color-bg-primary)`
  - [ ] Borders: `var(--color-border)`
- [ ] [ ] Use SCSS variables for sizing
  - [ ] Padding: `padding: $spacing-4;`
  - [ ] Margins: `margin: $spacing-6;`
  - [ ] Border radius: `border-radius: $border-radius-base;`
- [ ] [ ] Use mixins for common patterns
  - [ ] Typography: `@include heading-2;`
  - [ ] Flex layouts: `@include flex-center;`
  - [ ] Responsive: `@include respond-to('md')`

### Responsive Design
- [ ] Add mobile first styles (< 768px)
- [ ] Add tablet styles (768px - 1023px)
- [ ] Add desktop styles (1024px+)
- [ ] Test on actual devices/browser devtools

### Interactive States
- [ ] [ ] Hover states
  - [ ] Buttons: darker background
  - [ ] Links: underline or color change
  - [ ] Cards: shadow or background change
- [ ] [ ] Active/focus states
  - [ ] Outline for keyboard navigation
  - [ ] Use `@include focus-outline;` mixin
- [ ] [ ] Disabled states
  - [ ] Reduced opacity
  - [ ] Cursor: not-allowed

## Phase 6: State & Interactivity

### State Management
- [ ] Identify which states the page needs (loading, empty, error, default)
- [ ] Use local React state with `useState`
- [ ] Create state selector buttons if needed (for demonstration)
- [ ] Implement conditional rendering for each state

### Mock Data
- [ ] Add any needed data to `src/mock/prototypeMockData.ts`
- [ ] Use TypeScript types from `src/types/prototype.types.ts`
- [ ] Import and use mock data in component

### Event Handlers
- [ ] [ ] Implement button click handlers
  - [ ] State changes
  - [ ] Data updates
  - [ ] Navigation if needed
- [ ] [ ] Add form interactions if applicable
  - [ ] Input onChange
  - [ ] Form submission
  - [ ] Validation (optional)

## Phase 7: Quality Assurance

### Code Quality
- [ ] [ ] Check TypeScript compilation
  - [ ] No `any` types
  - [ ] Proper prop interfaces
  - [ ] All imports resolved
- [ ] [ ] Follow component patterns
  - [ ] Consistent naming
  - [ ] Proper folder structure
  - [ ] Good comments/documentation

### Visual Testing
- [ ] [ ] Compare with original Figma design
  - [ ] Colors match
  - [ ] Spacing is correct
  - [ ] Typography is correct
  - [ ] Layout is correct
- [ ] [ ] Test all states
  - [ ] Default state
  - [ ] Loading state
  - [ ] Empty state
  - [ ] Error state
- [ ] [ ] Test interactions
  - [ ] Buttons work
  - [ ] Links navigate
  - [ ] State changes work

### Responsiveness
- [ ] [ ] Desktop view (1200px+)
  - [ ] Full layout visible
  - [ ] No overflow
  - [ ] Proper spacing
- [ ] [ ] Tablet view (768px - 1199px)
  - [ ] Layout adapts
  - [ ] Grid collapses correctly
  - [ ] Touch targets adequate
- [ ] [ ] Mobile view (< 768px)
  - [ ] Single column
  - [ ] Content readable
  - [ ] Buttons tappable

### Accessibility
- [ ] [ ] Keyboard navigation works
  - [ ] Tab through elements
  - [ ] Focus visible on all interactive elements
  - [ ] Focus outline applied
- [ ] [ ] Text alternatives
  - [ ] Images have alt text
  - [ ] Icons have labels or aria-label
  - [ ] Buttons have clear text
- [ ] [ ] Color contrast
  - [ ] Text readable on background
  - [ ] No color-only meaning

## Phase 8: Documentation

### Code Comments
- [ ] Add comments explaining complex logic
- [ ] Document any assumptions or limitations
- [ ] Note any deviations from Figma design

### Documentation Updates
- [ ] [ ] Update component-mapping.md if creating new component
- [ ] [ ] Add notes about reusable patterns discovered
- [ ] [ ] Document any design system mappings
- [ ] [ ] Update AGENTS.md if AI-assisted creation was used

### Design System Notes
- [ ] [ ] Note which components could be from Design System
- [ ] [ ] Document any custom styling needed
- [ ] [ ] List any tokens missing from design system
- [ ] [ ] Flag components for future DS integration

## Phase 9: Integration & Testing

### In-App Testing
- [ ] Navigate to the new page via sidebar link
- [ ] Verify page loads without errors
- [ ] Check console for warnings or errors
- [ ] Test all interactive elements
- [ ] Verify layout on multiple screen sizes

### Browser Testing (if applicable)
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### Performance (if applicable)
- [ ] Check that page loads quickly
- [ ] No memory leaks with state changes
- [ ] Smooth animations/transitions

## Phase 10: Completion & Handoff

### Final Checklist
- [ ] All code committed and pushed
- [ ] No console errors or warnings
- [ ] All tests passing
- [ ] Documentation updated
- [ ] Screenshots of final result taken

### Handoff Artifacts
- [ ] Link to the prototype page
- [ ] Screenshots comparing Figma to React result
- [ ] Notes on any deviations
- [ ] Component mapping documentation
- [ ] Instructions for future modifications

## Common Issues & Solutions

### Layout Shifts on Load
**Problem**: Page content shifts when images load  
**Solution**: Set explicit dimensions or use aspect-ratio CSS

### Color Mismatches
**Problem**: Colors don't match Figma  
**Solution**: Check if using CSS variables correctly, verify color hex values

### Responsive Issues
**Problem**: Layout breaks on mobile  
**Solution**: Add `@include respond-to('sm')` media queries, test on actual devices

### TypeScript Errors
**Problem**: Prop type errors or missing interfaces  
**Solution**: Check interface definitions, verify prop names match expected types

### Components Not Appearing
**Problem**: Components imported but not rendering  
**Solution**: Check imports path, verify component export, check React.FC return type

## Next Steps After Completion

- [ ] Share with design team for feedback
- [ ] Iterate based on feedback
- [ ] Plan next prototype page
- [ ] Consider extracting reusable components
- [ ] Prepare for Design System integration if needed
