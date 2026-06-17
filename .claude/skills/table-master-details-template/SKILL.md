# Table Master Details Template

## Purpose

Build or refactor a React prototype page that starts as a full-width table view and opens a right-side details panel only after the user clicks a row.

This skill enforces the Table Master Details Infra Pattern: existing Infra / DS components only, existing tokens only, no debug UI visible, no custom shell, and correct open/close behavior at all times.

---

## When to Use

Use this skill when the screen includes any of the following:

- A page with a data table or list
- Row selection that opens a details view
- A split-view or master-details layout
- A table-to-details interaction
- A close action that returns the user to the full table view

Typical pages: Scans, Assets, Accounts, Users, Policies, Rules, Jobs, Inventory, Resources.

---

## Inputs Required

- Page name and target route
- Screenshot or Figma frame reference (optional but recommended)
- Description of the table columns and row data
- Description of what the details panel should show
- Confirmation of which tabs (if any) appear in the details panel

---

## Required Project Inspection

Before writing any code, inspect and confirm:

1. Existing `AppShell` — location and import path
2. Existing `Sidebar` / navigation config — do not replace
3. Existing `Header` — do not replace
4. Existing `Table` / `DataGrid` / list pattern — use as reference
5. Existing `Button` / `IconButton` pattern
6. Existing `Tabs` component (e.g. `HorizontalTabs`)
7. Existing `LoadingState`, `EmptyState`, `ErrorState` components
8. Existing SCSS token files — `_colors.scss`, `_variables.scss`
9. Existing icon system — `NavIcons.tsx` or equivalent
10. Existing mock data pattern — `src/mock/`
11. Existing router file — confirm how routes are registered
12. Existing similar page (e.g. `ScansPage`) — use as implementation reference

---

## Required Workflow

1. Analyze the screenshot or Figma frame if provided.
2. Identify whether the screenshot shows default table view or details-open state. **Do not assume the screenshot state is the default state.**
3. Inspect all existing project patterns listed above.
4. Map every visible section to an existing component.
5. Map every visual style to an existing token.
6. Report all gaps before writing code.
7. Implement only if safe with existing Infra.
8. Default state must be full-width table — details panel closed.
9. Row click opens details panel.
10. X button closes details panel and returns to full-width table.
11. Remove any visible debug state switcher from the UI.
12. Add subtle open/close animation via SCSS classes.
13. Implement loading, empty, and error states using existing state components.
14. Provide DS compliance report and Pixel Perfect gap report.

---

## Required Internal Logic

```tsx
const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
const [isDetailsOpen, setIsDetailsOpen] = useState(false);

const handleRowClick = (item: ItemType) => {
  setSelectedItem(item);
  setIsDetailsOpen(true);
};

const handleCloseDetails = () => {
  setIsDetailsOpen(false);
  setSelectedItem(null);
};
```

Optional state (do not expose as visible debug buttons):
```tsx
// Change initial value to test different states: 'loading' | 'empty' | 'error'
const [viewState] = useState<'default' | 'loading' | 'empty' | 'error'>('default');
const [searchQuery, setSearchQuery] = useState('');
const [activeTab, setActiveTab] = useState('overview');
```

---

## Required Render Pattern

```tsx
<div className={isDetailsOpen ? 'page__content page__content--detailsOpen' : 'page__content'}>
  <section className="page__tableArea">
    {/* table */}
  </section>

  {isDetailsOpen && selectedItem && (
    <aside className="page__detailsPanel">
      {/* details */}
    </aside>
  )}
</div>
```

The details panel must never be rendered or visible by default.

---

## Required Layout States

**Default table view:**
```
Page content
└── Full-width table
```

**Master details view:**
```
Page content (details open)
├── Table area / master list
├── Vertical divider
└── Details panel
```

Use state-based CSS classes. Do not use inline styles.

---

## Animation Requirements

Open:
- Table area resizes smoothly via CSS transition
- Details panel slides in softly (`translateX` + `opacity`)
- Duration: use `$transition-base` or `$transition-fast` from existing tokens

Close:
- Details panel fades out or slides right
- Table expands back to full width
- No route change, no reload

Always include `prefers-reduced-motion` support:
```scss
@media (prefers-reduced-motion: reduce) {
  .page__detailsPanel { animation: none; }
}
```

---

## Hard Stop Conditions

Stop and report a gap — do not implement — if any of the following cannot be found:

- Existing AppShell
- Existing Sidebar / Navigation
- Existing Header pattern
- Existing Table / list pattern
- Existing Button / IconButton pattern
- Existing token files
- Existing icon system
- Matching tokens for key visual values

---

## Must Do

- Inspect project before any implementation
- Use existing Infra / DS components only
- Use existing tokens only
- Use existing SCSS variables / CSS custom properties
- Use existing icon system (SVG only)
- Keep details panel closed by default
- Open details only on row click
- Close details only on X click (or approved close interaction)
- Return table to full width after close
- Add subtle animation via SCSS classes
- Preserve search, filters, and sort context when opening/closing details
- Document all gaps
- Provide DS compliance report
- Provide Pixel Perfect gap report

---

## Must Not Do

- Render details panel by default
- Create a custom AppShell
- Create a custom Sidebar
- Create a custom white prototype header
- Expose visible debug state buttons (`default`, `loading`, `empty`, `error`)
- Create new DS components
- Create new tokens
- Use inline styles
- Hardcode hex colors, spacing, typography, radius, or shadows
- Use `useEffect` to sync derived state that can be computed directly
- Add Tailwind unless already present
- Add external UI libraries
- Add icon libraries (PNG, JPG, emoji, icon fonts)
- Modify the official Infra library
- Replace existing router architecture
- Change unrelated files
- Claim Pixel Perfect accuracy without a gap report

---

## Output Format

### Before implementation

```markdown
### Template Analysis Summary
### Screenshot State (Default table view / Details-open state / Unknown)
### Detected Template Type
### Existing Project Patterns Found
### Infra Component Mapping
| Visual Element | Existing Component | Import Path | Confidence | Notes |
### Token Mapping
| Style Type | Visual Usage | Existing Token | Notes |
### Icon Mapping
| Visual Icon | Existing SVG | Import Path | Confidence | Notes |
### Required Internal Logic
### Gaps
#### Missing Components
#### Missing Tokens
#### Missing Icons
#### Ambiguous Behavior
### Implementation Safety
```

### After implementation

```markdown
### Implementation Summary
### Files Created or Updated
### Components Used
### Tokens Used
### Icons Used
### Internal Logic Added
### Master Details Behavior
- Details panel closed by default: ✓ / ✗
- Row click opens details: ✓ / ✗
- Selected row visually marked: ✓ / ✗
- X closes details: ✓ / ✗
- Table returns to full width: ✓ / ✗
- Search/filter context preserved: ✓ / ✗
- Subtle animation added via SCSS: ✓ / ✗
### UI Cleanup
- No custom AppShell: ✓ / ✗
- No custom Sidebar: ✓ / ✗
- No visible debug state switcher: ✓ / ✗
### States Implemented
### Restrictions Followed
### Pixel Perfect Gap Report
### DS Compliance Report
### Manual Review Needed
### Final Recommendation
```

---

## Example Prompt

```
Use the Table Master Details Template skill.

Goal:
Create the [PAGE_NAME] page at route /[route].

Template:
Table to Master Details

Behavior:
Default state is full-width table view.
Clicking a row opens the details panel on the right.
The details panel shows [DESCRIBE_CONTENT].
Clicking X closes the panel and returns to full-width table with a subtle animation.

Input:
[Attach screenshot or provide Figma link — optional]

Table columns:
[List columns]

Details panel tabs:
[List tabs, e.g. Overview, Details, Activity]

Important:
Use existing Infra / DS components only.
Use existing tokens only.
Do not create new components or tokens.
Do not use inline styles.
Do not hardcode visual values.
Do not expose debug state buttons.
Use existing SVG icon system.
Do not modify the official Infra library.

Expected output:
Analysis and mapping first. Implement only if safe.
```
