# Figma to React Mapping Documentation

## Overview

This document maps the extracted Figma Design System components to their React implementations in the prototype library.

**Source**: IDIRA Design System  
**Figma File**: [IDIRA Design System](https://www.figma.com/design/enmdGI2KicrhIld9WvDERl)  
**Extraction Date**: 2026-06-15  
**Scope**: Initial extraction - Tabs + NavigationIcon components

---

## Components Extracted

### 1. Horizontal Tabs

**Figma Source**: 
- Component: `Horizontal Tabs` (ID: 108:1184)
- Canvas: `✅ Tabs.` → `Horizontal tabs` frame

**React Component**: `HorizontalTabs`  
**Location**: `src/design-system/components/HorizontalTabs/`

**Supported Variants**:
| Figma Variant | React Prop | Description |
|---|---|---|
| State=Idle | (default) | Unselected tab, clickable |
| State=Hover | (implicit) | Hover effect applied via CSS |
| State=Selected | `aria-selected="true"` | Active tab with underline |
| State=Disabled | `disabled={true}` | Non-interactive tab |

**Props API**:
```typescript
interface HorizontalTabsProps {
  items: TabItem[];              // Array of tab items
  defaultActiveId?: string;      // Initially active tab (uncontrolled)
  activeId?: string;             // Currently active tab (controlled)
  onChange?: (id: string) => void; // Callback on tab change
  className?: string;            // Additional CSS classes
}

interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
}
```

**Tokens Used**:
- `$color-tab-line`: #283f67 (bottom border color)
- `$color-tab-text-idle`: #ffffff (idle text color)
- `$color-tab-text-selected`: #7a80ff (selected text color)
- `$tab-horizontal-padding-x`: 16px
- `$tab-horizontal-padding-y`: 8px
- `$font-family-base`: Open Sans

**States Supported**:
- ✅ Idle
- ✅ Hover (opacity transition)
- ✅ Selected (underline + color change)
- ✅ Disabled (opacity reduction)
- ✅ Focus (outline)

**Known Implementation Differences**:
- Underline is positioned absolutely via CSS (Figma shows as separate border element)
- Hover effect uses opacity transition for simplicity
- Focus state added for accessibility (not explicitly in Figma mockup)

---

### 2. Vertical Tabs

**Figma Source**:
- Component: `Vertical tabs` (ID: 11137:306)
- Canvas: `✅ Tabs.` → `Vertical tabs` frame

**React Component**: `VerticalTabs`  
**Location**: `src/design-system/components/VerticalTabs/`

**Supported Variants**:
| Figma Variant | React Prop | Description |
|---|---|---|
| state=Idle | (default) | Unselected tab |
| state=Hover | (implicit) | Subtle background change |
| state=Selected (Focused) | `aria-selected="true"` | Selected tab with gradient background |
| state=Disabled | `disabled={true}` | Non-interactive tab |

**Props API**:
```typescript
interface VerticalTabsProps {
  items: VerticalTabItem[];        // Array of vertical tab items
  defaultActiveId?: string;        // Initially active tab (uncontrolled)
  activeId?: string;               // Currently active tab (controlled)
  onChange?: (id: string) => void; // Callback on tab change
  className?: string;              // Additional CSS classes
  variant?: 'default' | 'compact'; // Variant sizing
}

interface VerticalTabItem {
  id: string;
  label: string;
  subtitle?: string;   // Optional subtitle text
  disabled?: boolean;
}
```

**Tokens Used**:
- `$color-tab-vertical-text-idle`: #ffffff (main text)
- `$color-tab-vertical-text-sub-idle`: #d6e3fb (subtitle text)
- `$color-tab-vertical-bg-idle`: #17243b00 (transparent idle background)
- `$color-tab-vertical-bg-selected-1`: #223658 (gradient start)
- `$color-tab-vertical-bg-selected-2`: #1d2d49 (gradient end)
- `$tab-vertical-padding-x`: 16px
- `$tab-vertical-padding-y`: 12px
- `$font-family-base`: Open Sans

**States Supported**:
- ✅ Idle (transparent background)
- ✅ Hover (subtle highlight)
- ✅ Selected (gradient background from #8756d8 → #662afc in original)
- ✅ Disabled (opacity reduction)
- ✅ Focus (outline)
- ✅ Subtitle support (optional secondary text)

**Known Implementation Differences**:
- Radial + linear gradient **now activated** (was previously simplified to linear-only). Implementation uses `radial-gradient(ellipse at 80% 50%, ...)` layered over `linear-gradient(135deg, ...)` to match the Figma spec.
- Subtitle implemented as optional prop for additional context
- Hover on selected tab now excluded: `&:hover:not(&--selected)` prevents the hover state from overriding the selected gradient
- Compact variant is a prototype-only extension (no direct Figma counterpart)

---

### 3. NavigationIcon

**Figma Source**:
- Component: `Navigation_icons` frame
- Canvas: IDIRA Design System — sidebar / navigation panel

**React Component**: `NavigationIcon`
**Location**: `src/design-system/icons/navigation/`

**Supported Variants**:
| Figma Variant | React Prop | Description |
|---|---|---|
| State=Idle | `state="idle"` | Default colour (`$color-text-light`) |
| State=Hover | `state="hover"` | Primary colour + slight scale |
| State=Selected | `state="selected"` | Primary colour, full opacity |
| State=SelectedHover | `state="selectedHover"` | Dark accent colour + slight scale |

**Props API**:
```typescript
interface NavigationIconProps {
  type: NavigationIconType;          // e.g. 'Home', 'Settings', 'Security'
  state?: IconState;                 // 'idle' | 'hover' | 'selected' | 'selectedHover'
  size?: 'sm' | 'md' | 'lg';        // Font size: 1rem / 1.5rem / 2rem
  className?: string;
  ariaLabel?: string;
}
```

**Tokens Used**:
- `$color-text-light`: idle colour
- `$color-primary` (`#7a80ff`): hover + selected colour
- `$color-primary-dark` (`#8756d8`): selectedHover colour

**State colours are driven entirely by SCSS classes** (`.navigation-icon--idle`, `--hover`, `--selected`, `--selectedHover`). Inline style is used only for `opacity` and `transform` from `iconStateConfig`.

**Icon catalogue**: 39 icon types mapped to Unicode/emoji placeholders. For production, replace `navigationIconMap` values with SVG imports or icon font classes.

**Known Implementation Differences**:
- Icons use emoji/Unicode placeholders, not the actual IDIRA SVG assets
- All 4 states are rendered; true animated transitions require production SVGs

---

## Design Tokens

All design tokens are centralized in `src/design-system/tokens/`:

### Colors (`_colors.scss`)
```scss
// Tabs Colors
$color-tab-line: #283f67;
$color-tab-text-idle: #ffffff;
$color-tab-text-selected: #7a80ff;
$color-tab-vertical-text-idle: #ffffff;
$color-tab-vertical-text-sub-idle: #d6e3fb;
$color-tab-vertical-bg-idle: #17243b00;
$color-tab-vertical-bg-selected-1: #223658;
$color-tab-vertical-bg-selected-2: #1d2d49;
```

### Typography (`_typography.scss`)
```scss
$font-family-base: "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
$font-size-tab-main: 16px;
$font-weight-tab-main: 600; // SemiBold
$line-height-tab-main: 100%;
$font-size-tab-sub: 12px;
$font-weight-tab-sub: 400; // Regular
```

### Spacing (`_spacing.scss`)
```scss
$spacing-unit: 4px;
$spacing-xs: 8px;
$spacing-md: 16px;
$tab-horizontal-padding-x: 16px;
$tab-vertical-padding-y: 12px;
```

---

## Known Gaps & Limitations

1. **Gradient Rendering**
   - ✅ Resolved: VerticalTabs now use layered radial + linear gradient matching the Figma spec
   - Minor radial intensity may differ from exact Figma values (visual approximation)

2. **Animation/Transitions**
   - Basic transitions (0.2s ease) added for interactivity
   - Figma doesn't specify exact animation timing
   - Animation behavior is prototype-appropriate but not fully validated

3. **Accessibility**
   - Added ARIA attributes (`role="tab"`, `aria-selected`, `aria-disabled`)
   - Figma design system doesn't explicitly show accessibility requirements
   - Implementation follows WAI-ARIA Tab Pattern best practices

4. **Responsive Behavior**
   - Components inherit parent width
   - No mobile-specific breakpoints defined in Figma
   - May need additional responsive variants for production use

5. **Icon Support**
   - Figma shows icons in some tab variants
   - Current implementation uses text-only labels
   - Icon slots could be added in future iterations

6. **Keyboard Navigation**
   - Basic keyboard support via native `<button>` element
   - Arrow key navigation not yet implemented
   - Future enhancement for production DS

---

## Manual Review Required

### Visual Accuracy
- [ ] Horizontal tab underline positioning and animation
- [ ] Vertical tab gradient colors match design exactly
- [ ] Padding and spacing match Figma specs
- [ ] Font rendering (Open Sans) correct on all browsers

### Interactive Behavior
- [ ] Hover state visual feedback appropriate
- [ ] Disabled state clearly communicates non-interactivity
- [ ] Selected state is distinguishable from other states
- [ ] Focus indicators visible and accessible

### Component Integration
- [ ] Components work in light and dark themes
- [ ] Controlled and uncontrolled modes work correctly
- [ ] TypeScript types are accurate
- [ ] Exports work correctly in preview page

---

## Assumptions Made During Extraction

1. **Tab Items Structure**: Assumed tabs are simple items with id, label, and optional disabled state. More complex data structures can be supported by extending the interface.

2. **Controlled vs Uncontrolled**: Implemented both patterns to support different use cases (similar to React form patterns).

3. **Styling Language**: Used SCSS with CSS custom properties for runtime flexibility, matching project setup.

4. **State Handling**: Implemented full state management with React hooks rather than CSS-only states for better control and testability.

5. **Accessibility**: Added WAI-ARIA attributes and semantic HTML even though not explicitly shown in Figma (best practice assumption).

6. **Theming**: Components use token values that can be overridden via CSS custom properties for future theming support.

---

## Next Steps

### For Prototype Use
1. Review components in preview page at `/design-system-preview`
2. Test all state combinations (idle, hover, selected, disabled)
3. Verify visual match with Figma design
4. Test keyboard navigation (Tab, Arrow keys)

### For Production Use
1. Add keyboard arrow navigation for accessibility
2. Expand component set (complete Tab collection from Figma)
3. Add animation specification and tweening
4. Implement theme/dark mode variants
5. Add icon support and content slots
6. Create Storybook documentation
7. Add comprehensive unit and integration tests
8. Performance testing for large tab lists

### Design System Expansion
- Extract remaining components from IDIRA Design System
- Build complete token library (colors, spacing, typography)
- Create component composition patterns
- Document design system usage guidelines

---

## References

- **Figma File**: https://www.figma.com/design/enmdGI2KicrhIld9WvDERl/IDIRA-Design-System
- **Component Node**: node-id=98-527
- **Project**: Vite React TypeScript Prototype
- **Component Library**: src/design-system/
