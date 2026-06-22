# Global UX Component Standards

Standards for interaction patterns used across the prototype.

Screenshots and Figma references are the **layout and behavior specification source**.
Visual styling (colors, theme, typography, shadows, borders) always comes from the active Design System theme — never from screenshots.

---

# Global UX Component Standard — Accordion

## Scope

This standard applies to any Accordion, collapsible panel, expandable section, grouped settings area, FAQ-style section, or disclosure pattern.

## Screenshot Layout and Behavior Rule

When a screenshot or Figma reference is provided, use it to understand:

- component purpose and interaction behavior
- information hierarchy
- layout composition
- **spacing between accordion items**
- **header height and internal padding**
- **content indentation and section density**
- **expanded-content spacing**
- scroll ownership and overflow behavior

Map all visible measurements to approved Design System spacing, sizing, and layout tokens.

Do not copy or infer:
- color palette, theme mode, typography styling
- shadows, border colors, hover/focus colors
- icon colors or local visual overrides

The active Design System theme remains the visual source of truth.

---

## Component Purpose

Use an Accordion when users need to scan multiple content sections but only need to focus on one or a few sections at a time.

Do not use it when users must review all information at once, compare sections side by side, complete a linear process, or interact with a long task flow.

---

## Required Anatomy

```text
Accordion Item
├── Header container
│   ├── Optional leading icon
│   ├── Title
│   ├── Optional subtitle or supporting text
│   ├── Optional secondary action
│   └── Expand / collapse indicator
└── Content container
    └── Expanded content only
```

---

## Supported Modes

```ts
type AccordionMode = 'single' | 'multiple';
```

**Single:** only one item expanded at a time — use when sections are mutually exclusive or sequential.
**Multiple:** several items can remain open — use when users need to compare or work across sections.

The mode must be explicitly configured. Do not infer from a screenshot.

---

## Default Expanded State

```ts
type AccordionInitialState =
  | 'all-collapsed'
  | 'first-expanded'
  | 'specific-items-expanded'
  | 'restore-user-state';
```

---

## Header Summary Rules

When a collapsed item contains meaningful state, the header should communicate it:

```text
Identity settings — 3 fields completed
Risk configuration — 2 validation errors
Advanced options — Not configured
```

---

## Validation Behavior

When validation fails inside a collapsed item:

```text
→ expand affected item
→ preserve other expansion states
→ move focus to first invalid field on submit
→ expose error summary in the header
```

---

## Scroll Ownership

Accordion itself is not the scroll owner. Scroll belongs to the containing content region (Tab, Form, Master Details, Drawer).

Do not make each Accordion item independently scrollable unless its content is a table or virtualized list.

---

## Design System Rules

- Use the approved DS Accordion component through public APIs only.
- Do not recreate Accordion locally.
- Do not override colors, borders, spacing, typography, or motion.
- If a required capability is missing → create a DS Gap. Do not create a local workaround.

---

## QA Blocking Rules

Fails QA when:
- Screenshot colors/theme are copied into the implementation.
- Local Accordion is created while DS Accordion exists.
- Header contains nested interactive controls without proper separation.
- Accordion is used for a required linear workflow.
- Validation errors remain hidden in collapsed sections without header summary.
- Full page scroll used instead of parent content region scroll.
- Local motion values or visual overrides are introduced.

---

---

# Global UX Component Standard — Action Menu

## Scope

This standard applies to: Action menus, Context menus, Overflow menus, Row action menus, Entity action menus, Grouped actions, menus triggered by Icon Buttons or Split Buttons.

## Screenshot Layout and Behavior Rule

When a screenshot or Figma reference is provided, use it to understand:

- component purpose and interaction behavior
- action hierarchy, grouping, and action order
- trigger type and trigger placement
- permissions behavior and overflow behavior
- **menu placement and alignment relative to trigger**
- **item density and row height**
- **grouping spacing and separator placement**
- **maximum visible items before scroll**
- **menu width and content alignment**
- scroll behavior and responsive behavior

Map all visible measurements to approved Design System spacing, sizing, and layout tokens.

Do not copy or infer:
- color palette, theme mode, typography styling
- shadows, border colors, hover/focus colors
- icon colors or local visual overrides

The active Design System theme remains the visual source of truth.

---

## Component Purpose

Use when users need to view several available actions before choosing one.

Do not use when:
- One action is clearly primary
- The action must remain permanently visible
- Users need a multi-step flow
- Actions require extensive explanation
- Actions form a required sequence

---

## Required Anatomy

```text
Action Menu
├── Optional title
├── Optional action groups
│   ├── Action item (icon + label + optional shortcut)
│   └── ...
├── Optional separator
└── Optional secondary group
```

---

## Action Types

```ts
type ActionMenuItem = {
  id: string;
  labelKey: string;
  icon?: React.ComponentType;
  group?: string;
  priority?: number;
  isDisabled?: boolean;
  disabledReasonKey?: string;
  isDestructive?: boolean;
  isPrimary?: boolean;
  onSelect: () => void;
};
```

---

## Action Ordering

```text
1. Primary / most-used actions
2. Secondary operational actions
3. Navigation or view actions
4. Configuration actions
5. Destructive actions (always last, separated)
```

Destructive actions must appear last, be separated, and require confirmation when irreversible.

---

## Grouping Rules

- Use separators only between meaningful groups.
- Do not create separators between every action.
- Do not create single-item groups unless it is destructive/high-risk.
- Group labels are optional — use only when they improve scanability.

---

## Maximum Items and Scroll

Display max **7 action items** before the menu body becomes scrollable.

- Menu header stays fixed.
- Action list becomes the scroll owner.
- Do not cause page-level scroll.
- Do not allow menu to extend outside the viewport.

---

## Selection Behavior

```text
Action selected → execute action → close menu
```

Exception: multi-select menus require an explicit Apply/Done action.

---

## Disabled and Permission Behavior

- **Disabled** — visible but cannot be used; must have a clear explanation.
- **Hidden** — must not be exposed due to permission or irrelevant context.
- Do not execute an action if permission changes after the menu opens.

---

## Confirmation Rules

Use `SystemNoticeService` when action is: destructive, irreversible, security-sensitive, affects multiple entities, or interrupts service.

---

## Design System Rules

- Use the approved DS Action Menu component through public APIs only.
- Do not create a local Action Menu.
- Do not copy screenshot styling.
- Do not override menu colors, spacing, shadows, typography, or motion.
- If a required capability is missing → create a DS Gap.

---

## QA Blocking Rules

Fails QA when:
- Screenshot colors/theme are copied into implementation.
- Local Action Menu created while DS component exists.
- Visible primary action duplicated in the menu.
- Destructive actions mixed with standard actions without separation.
- Menu scroll causes page-level scroll.
- More than 7 actions without approved scroll behavior.
- Disabled actions have no explanation.
- Permission behavior exposes restricted actions incorrectly.
- Local visual overrides or custom motion values introduced.

---

---

# Global UX Component Standard — Alert Notifications

## Scope

This standard applies to: Alert notifications, Alert banners, System-level warning messages, Background-process notifications, Risk notifications, Persistent operational alerts, High-signal environment updates.

## Screenshot Layout and Behavior Rule

When a screenshot or Figma reference is provided, use it to understand:

- component purpose and severity behavior
- stacking behavior and dismissal behavior
- message hierarchy and content structure
- **alert placement (bottom-right, 20px from edge)**
- **alert width (480px fixed) and height (84px fixed)**
- **stack spacing between alerts (8px)**
- **icon size (16px) and position within alert**
- **internal padding (16px left/right, 24px close button area)**
- **viewport collision and boundary behavior**
- persistence behavior and accessibility expectations

Map all visible measurements to approved Design System spacing, sizing, and layout tokens.

Do not copy or infer:
- color palette, theme mode, severity colors
- shadows, border colors, hover/focus colors
- typography styling or icon colors

The active Design System theme remains the visual source of truth.

---

## Component Purpose

Use an Alert Notification for high-signal, system-level, risk-related, or background-process messages that require awareness or action.

Do NOT use for: form validation, field errors, save confirmation, simple action success feedback, inline empty-state, user mistake feedback, or generic backend errors.

Use Toast, System Notice, inline validation, or contextual page feedback instead when appropriate.

---

## Alert vs Toast Rule

```text
Alert  → persistent, high-signal, system-level; remains visible until dismissed or resolved
Toast  → short feedback for a user-initiated action; typically temporary
Inline → field or form validation errors
System Notice → confirmation for destructive or security-sensitive actions
```

---

## Severity Model

```ts
type AlertSeverity = 'info' | 'success' | 'warning' | 'critical';
```

| Severity   | Use case |
|---|---|
| `info`     | General system update or non-blocking notice |
| `success`  | Persistent confirmation of meaningful background completion |
| `warning`  | User attention required, work may continue |
| `critical` | High-risk or blocking operational issue |

Use only approved DS semantic tokens and status icons — never page-specific severity colors.

---

## Status Icon Rule

Every Alert must include an approved DS status icon at 24px.

Do not use local SVGs, emoji, color-only severity, or decorative icons without semantic meaning.

If the required semantic icon does not exist → create a DS Gap.

---

## Placement Rules

```text
Bottom-right of the application viewport (outside normal page layout)
```

Alerts must not change table, form, split-view, or page height. Must not create page-level scrolling.

Do not place alerts inside table rows, summary bars, form bodies, wizard steps, split-view content, or page headers unless the message is contextual inline feedback and should use a different component.

---

## Stacking Behavior

```text
Newest alert → appears first; older alerts stack below
Vertical stack; stable order; no overlap; no overflow beyond viewport
```

---

## Dismiss Behavior

```ts
type AlertDismissBehavior =
  | 'manual-dismiss'
  | 'auto-dismiss'
  | 'dismiss-on-resolution'
  | 'non-dismissible';
```

- **Manual:** user acknowledges persistent alert.
- **Auto:** only for low-risk informational alerts where losing the message creates no harm.
- **On resolution:** disappears when underlying issue is resolved.
- **Non-dismissible:** only for blocking, legal, security, or critical system conditions.

Do not auto-dismiss critical alerts.

---

## Action Behavior

- Max one primary action.
- Secondary actions optional.
- Action must not silently dismiss the alert unless completing it resolves the issue.
- Destructive actions require confirmation — do not run directly from an Alert.

---

## Design System Rules

- Use the approved DS Alert component through public APIs only.
- Do not create a local Alert component.
- Do not override colors, spacing, shadows, typography, or motion.
- If a required capability is missing → create a DS Gap.

---

## QA Blocking Rules

Fails QA when:
- Screenshot colors/theme copied into implementation.
- Alert used for save confirmation, field validation, or generic backend errors.
- Severity communicated through color only.
- Local Alert component created while DS Alert exists.
- Local SVG used instead of DS status icon.
- Alert changes page layout or creates page-level scroll.
- Critical alert auto-dismisses.
- Alert exposes raw backend errors or inaccessible data.
- Focus forcibly moved to a non-blocking alert.
- Local visual overrides or custom motion values introduced.

---

---

# Global UX Component Standard — Anchor Links

## Scope

This standard applies to: Anchor links, In-page section navigation, Long forms, Configuration pages, Details pages, Setup pages, Long tab content, Documentation-style content areas.

## Screenshot Layout and Behavior Rule

When a screenshot or Figma reference is provided, use it to understand:

- content hierarchy and linked section order
- selected-state behavior and scroll synchronization
- placement in the page structure and accessibility behavior
- **anchor list fixed width (280px)**
- **item height (30px single row, 52px two rows)**
- **label max width (228px) with ellipsis**
- **padding: 8px top/bottom, 16px left/right per item**
- **selected-state left stroke indicator placement**
- **vertical separator line placement and height**
- sticky behavior and scroll ownership

Map all visible measurements to approved Design System spacing, sizing, and layout tokens.

Do not copy or infer:
- color palette, theme mode, typography styling
- selected-state colors, hover colors
- shadows, border colors, or local visual indicators

The active Design System theme remains the visual source of truth.

---

## Component Purpose

Use Anchor Links to help users navigate within a long single content area with multiple meaningful sections.

Do NOT use as product navigation, sidebar navigation, tab navigation, or a Wizard replacement.

---

## When to Use / Not Use

**Use when:** One page has several long sections; users need to jump between them; all content belongs to the same page or form.

**Do not use when:** User must complete a required linear sequence; page is better as a Wizard; sections are independent product destinations; content is short enough to scan; Tabs or Master Details are more appropriate.

---

## Placement

```text
Main Content Region
├── Page Header
├── Anchor Navigation
└── Scrollable Content Area
    ├── Section A  (id="section-a")
    └── Section B  (id="section-b")
```

Anchor Links remain visible within the content context while the form body scrolls.

Do not place Anchor Links inside the global Sidebar.

---

## Scroll Ownership

Anchor Links never own primary page scroll — the linked content region owns scrolling.

---

## Selection Behavior

Only one Anchor Link selected at a time. Selecting scrolls the section into view. During manual scroll, selection updates based on which section heading has entered the primary viewport threshold.

---

## Section Status Summaries (optional)

```text
Connection settings — Configured
Risk configuration — 2 errors
Advanced options — Not configured
```

Use approved DS status icon and text patterns. Do not rely on color alone.

---

## Validation Behavior

On form submit with errors:
```text
→ select related Anchor Link
→ scroll invalid field into view
→ show validation summary in Anchor Link (e.g. "2 errors")
```

---

## Design System Rules

- Use the approved DS Anchor Links / In-Page Navigation component through public APIs only.
- Do not recreate Anchor Links locally.
- Do not copy screenshot colors, selected-state styling, or dimensions.
- If a required capability is missing → create a DS Gap.

---

## QA Blocking Rules

Fails QA when:
- Screenshot colors/theme copied into implementation.
- Anchor Links used as product navigation between pages.
- Anchor Links replace a required Wizard flow.
- Full page scroll used instead of the form/tab/drawer content region.
- Anchor links do not map to stable section IDs.
- Active selection does not update after manual scrolling.
- Multiple anchors selected simultaneously.
- Validation errors hidden with no surface in Anchor list.
- Sticky footer actions scroll away.
- Local visual overrides or custom motion values introduced.

---

---

# Global UX Component Standard — Autocomplete

## Scope

This standard applies to: Autocomplete inputs, Searchable dropdowns, Comboboxes, Tag selectors, Filter value selectors, Entity pickers, Multi-select suggestion inputs, Search inputs with suggested values.

## Screenshot Layout and Behavior Rule

When a screenshot or Figma reference is provided, use it to understand:

- suggestion behavior, matching behavior, and keyboard interactions
- empty result behavior, grouping behavior, and loading behavior
- selection rules and list overflow behavior
- **dropdown width relative to input width**
- **dropdown max height before scroll (260px)**
- **option row height and internal padding**
- **grouping spacing and separator placement**
- **input-to-dropdown vertical alignment**
- **chip/tag size in multi-select mode**
- scroll behavior and viewport boundary behavior

Map all visible measurements to approved Design System spacing, sizing, and layout tokens.

Do not copy or infer:
- color palette, theme mode, typography styling
- shadows, border colors, hover/focus/selected-state colors
- icon colors or local visual overrides

The active Design System theme remains the visual source of truth.

---

## Input Modes

```ts
type AutocompleteMode =
  | 'single-select'
  | 'multi-select'
  | 'search-suggestions'
  | 'free-text-with-suggestions'
  | 'tag-input'
  | 'filter-value-selector';
```

Do not assume every Autocomplete requires a selection from the list.

---

## Suggestion Trigger

| Use case | Trigger |
|---|---|
| Small predefined list | On focus |
| Large server-side list | After typing |
| Tag key selector | On focus |
| Tag value selector | On dropdown open after key selection |
| Search suggestions | After typing |

---

## Matching

```ts
type SuggestionMatchMode = 'starts-with' | 'contains' | 'exact' | 'fuzzy';
```

Matching must be case-insensitive unless product requires case-sensitive identifiers. Must search both normalized backend value and readable display label.

---

## Dropdown Placement

Default: below the input. When insufficient space below: above. Keep within viewport bounds. Do not cause page-level scrolling.

---

## No Results Behavior

```text
Selection-only: "No matching values found."
Creation-enabled: "No matching tags found. Create 'owner:platform-team'"
```

Do not show Create action when: value is invalid, user lacks permission, value duplicates an existing selection, or component is selection-only.

---

## Loading and Error

- **Loading:** preserve typed input, show loading state, do not show stale values.
- **Error:** preserve typed input, show safe error message, offer Retry. Do not expose raw backend errors.

---

## Keyboard Behavior

| Key | Behavior |
|---|---|
| Arrow Down/Up | Move active option |
| Enter | Select active option or submit allowed free text |
| Escape | Close suggestion list |
| Tab / Shift+Tab | Move to next/prev focusable element |
| Backspace | Remove previous chip only in tag mode when input is empty |

Active option must be visually and programmatically exposed. Escape closes dropdown before closing parent dialog.

---

## Scroll Ownership

The suggestion list owns its own overflow scrolling. Do not scroll the page, table, form, or dialog shell because the option list is long.

---

## Filter-Specific Rules

```text
Specific key selected → value becomes searchable dropdown → exact matching
Any key selected → value becomes free text → contains operator → search after typing
```

---

## Design System Rules

- Use approved DS Autocomplete / Combobox / Listbox / Chip / Virtualized List APIs.
- Do not create a local autocomplete implementation.
- Do not copy screenshot theme, colors, or dimensions.
- If a required capability is missing → create a DS Gap.

---

## QA Blocking Rules

Fails QA when:
- Screenshot colors/theme copied into implementation.
- Local Autocomplete created while DS component exists.
- Free-text field forced into selection-only behavior incorrectly.
- Required selection field accepts arbitrary invalid values.
- Large option lists render without virtualization.
- Dropdown overflow causes page-level scroll.
- Async updates cause wrong option selection.
- No-results, loading, or error behavior is missing.
- Backend errors erase user input.
- Keyboard navigation is inaccessible.
- Local visual overrides or custom motion values introduced.

---

---

# Global UX Component Standard — Avatar

## Scope

This standard applies to: User avatars, User identity indicators, Assignee displays, Owner fields, Reviewer indicators, Profile images, Initial-based avatars, Placeholder identity icons, Avatar status indicators.

## Screenshot Layout and Behavior Rule

When a screenshot or Figma reference is provided, use it to understand:

- supported avatar content types and fallback hierarchy
- optional status indicator behavior and placement
- identity display intent
- **size category selection (small / medium / large)**
- **status indicator placement (bottom-right corner)**
- **grouping layout and overlap in avatar groups**
- **overflow count chip placement and sizing**
- **spacing between avatar and adjacent label**
- accessibility behavior

Map visible size categories to approved DS size variants (small / medium / large). Do not hardcode pixel values from screenshots.

Do not copy or infer:
- color palette, theme mode, avatar background colors
- border styling, status indicator colors, shadows
- typography styling or local visual overrides

The active Design System theme remains the visual source of truth.

---

## Component Purpose

Use an Avatar to represent a person, user, owner, reviewer, assignee, or other identity-related entity.

Do NOT use for: generic product status, risk severity, provider logos, system source indicators, navigation icons, or entity type indicators. Use Status Icons, Brand Icons, or Entity Icons instead.

---

## Avatar Content Priority (fallback order)

```text
1. Approved user image
2. Approved identity icon
3. Initials / text fallback
```

Do not show a broken image placeholder. Do not show raw user IDs as fallback.

---

## Supported Types

```ts
type AvatarContentType = 'image' | 'icon' | 'initials';
```

- **Image:** must have alt text; failed load falls back to icon or initials; do not distort aspect ratio.
- **Icon:** use only approved DS icon assets — no local SVGs.
- **Initials:** derived from display name, deterministic fallback. Example: `Olivia Parker → OP`.

---

## Size Rules

```ts
type AvatarSize = 'small' | 'medium' | 'large';
```

| Context | Size |
|---|---|
| Dense Table / FATLINES row | Small |
| Standard list / details summary | Medium |
| Profile / major ownership panel | Large |

Do not hardcode pixel values from a screenshot.

---

## Status Indicator Rules

An Avatar may include a status indicator only for identity-related state (Online / Offline / Unavailable / Disabled / Blocked).

Do NOT use Avatar status indicators for risk severity, entity health, lifecycle status, or operational alerts — use the global Status Icon pattern instead.

Status must not be the only way a state is communicated. Must have accessible text or visible label elsewhere.

---

## Avatar Interaction Rules

By default, an Avatar is informational. Make it interactive only when it opens a meaningful user-related action (profile, owner details, reviewer info).

When interactive: use approved DS behavior, provide localized accessible label, support keyboard. Do not make every Avatar clickable.

---

## Avatar Group Rules

```text
[Avatar] [Avatar] [Avatar] +4
```

Use approved DS grouping and overflow behavior. Do not render unlimited Avatars in a row. Overflow must expose remaining identities accessibly.

---

## Loading and Error

- **Loading:** use DS skeleton — do not show random placeholder initials.
- **Image error:** fall back to icon → initials — no broken-image UI.
- **Missing name:** use approved generic identity fallback — do not derive initials from technical IDs.

---

## Design System Rules

- Use the approved DS Avatar component through public APIs only.
- Do not create a local Avatar component.
- Do not copy screenshot colors, hardcode sizes, or attach custom status badges.
- If a required capability is missing → create a DS Gap.

---

## QA Blocking Rules

Fails QA when:
- Screenshot colors/theme copied into implementation.
- Avatar used as a generic status indicator.
- Local Avatar component created while DS Avatar exists.
- Local SVGs used as avatar fallback.
- Avatar status is the only indicator of a critical state.
- Profile image failure shows broken-image UI.
- Initials are random or derived from hidden technical data.
- Avatar is clickable without meaningful destination or accessible label.
- Avatar sizes are hardcoded from screenshot values.
- Local visual overrides or custom status badge styling introduced.

---

---

# Global UX Component Standard — Bulk Action Bar

## Scope

This standard applies to: Table bulk actions, FATLINES list bulk actions, Card-list bulk actions, Multi-entity selection flows, Bulk tag management, Bulk state changes, Bulk export/assign/delete/update.

## Screenshot Layout and Behavior Rule

When a screenshot or Figma reference is provided, use it to understand:

- selection behavior, action hierarchy, and information hierarchy
- action overflow behavior and selection summary
- filter context and bulk action lifecycle
- **bar height (44px fixed)**
- **bar width (fills sub-toolbar container width)**
- **left section: Clear X + counter + Select All + filters counter spacing**
- **right section: action buttons alignment and gap (33px gap before buttons when filters present)**
- **separator placement between left and right sections**
- **action button order and overflow trigger placement**
- **fixed positioning above the scrollable list**
- keyboard behavior and accessibility behavior

Map all visible measurements to approved Design System spacing, sizing, and layout tokens.

Do not copy or infer:
- color palette, theme mode, button styling
- shadows, border colors, hover/focus colors
- typography styling or animation timing

The active Design System theme remains the visual source of truth.

---

## Component Purpose

Use a Bulk Action Bar when the user selects multiple entities and can apply one shared operation.

Do NOT show when: no entities are selected, action applies to only one entity, selected entity type does not support shared actions, or action requires reviewing each item individually.

---

## Trigger Rule

```text
No selected rows → Standard Summary Bar visible
One or more selected rows → Bulk Action Bar replaces the Summary Bar action area
```

Page header, filter context, navigation, and main content structure must remain unchanged. Do not open as modal, drawer, or separate route.

---

## Required Structure

```text
[Clear selection] [12 of 140 selected] [Select all] [3 filters]
                                       [Primary Action] [Secondary] [More actions ▾]
```

---

## Selection Rules

- Checkbox click selects/deselects only — does not open FATLINES or row details.
- **Select All** selects all visible eligible items in current filtered result set.
- "Select all matching filters" (N,000 items) must be explicitly distinguished from "Select all visible".
- Selection count must update immediately.

---

## Action Priority

```text
1. Most common safe action
2. Secondary operational actions
3. Contextual actions
4. Destructive actions (last, separated)
5. Overflow (approved DS Action Menu)
```

Do not duplicate visible actions in overflow.

---

## Action Availability

- **Enabled:** all selected entities support the action.
- **Disabled:** none support it — show explanation when safe.
- **Partially applicable:** some items will be skipped — user must understand what will happen.
- **Unavailable:** hide when permission/security policy requires.

---

## Bulk Action Execution Pattern

| Bulk action type | Required pattern |
|---|---|
| Add/remove tags | Bulk Tag Dialog |
| Destructive action | System Notice confirmation |
| Multi-step config | Wizard or full form |
| Long-running operation | Bulk Status Dialog |
| Simple safe action | Toast or contextual feedback |

---

## Async Behavior

Must support: Saving / Success / Partial success / Partial failure / All failure / Permission denied / Timeout.

- **Partial success:** show succeeded, failed, skipped counts — do not show generic success.
- **Timeout:** do not claim success or definite failure — offer status check before retry.

---

## Scroll Ownership

```text
Page Header
Summary / Bulk Action Bar  ← stays visible
Scrollable Table / FATLINES ← owns vertical scroll
```

Bulk Action Bar must not scroll with rows and must not create page-level scroll.

---

## Design System Rules

Use approved DS: Checkbox, Button, Split Button, Action Menu, Status icon, Tooltip, Dialog, System Notice, Loading state.

Do not create a local Bulk Action Bar, overflow menu, icon, or button styling. Do not copy screenshot colors. If capability is missing → create a DS Gap.

---

## QA Blocking Rules

Fails QA when:
- Bulk Action Bar appears without selected items.
- Checkbox selection opens row details or FATLINES.
- Selection count is stale or unclear.
- Select All scope is ambiguous.
- Visible actions are duplicated in overflow.
- Destructive actions execute without confirmation.
- Partial-success shows generic success.
- Timeout treated as definite failure/success.
- Bulk Action Bar scrolls with rows or creates page-level scroll.
- Screenshot colors/theme copied.
- Local component styling introduced.

---

---

---

# Global UX Component Standard — Bulk Action Dialog

## Scope

This standard applies to: Bulk asynchronous operations, Multi-entity updates, Bulk tag operations, Bulk import or export, Bulk rotation, Bulk onboarding, Bulk scan operations, Bulk remediation actions, Long-running operations with item-level results.

Use this pattern only when one user action affects multiple entities and processing may continue asynchronously.

## Screenshot Layout and Behavior Rule

When a screenshot or Figma reference is provided, use it to understand:

- maximized and minimized layout composition
- item result list density and row structure
- header and footer placement
- **maximized dialog: width 575px, height 200px fixed**
- **minimized dialog: width 248px, height 48px fixed**
- **header height and internal padding (12px top/bottom, 20px left/right)**
- **item row height and padding (12px top/bottom, 8px gap between label and status)**
- **action text-button placement (right-aligned, up to 2 per row)**
- **separator between item rows**
- **scroll boundary: result list scrolls, header and footer stay fixed**
- **draggable behavior and placement (bottom-right corner of viewport)**

Map all visible measurements to approved Design System spacing, sizing, and layout tokens.

Do not copy or infer:
- color palette, theme mode, status badge colors
- shadows, border colors, hover/focus colors
- typography styling or local visual overrides

The active Design System theme remains the visual source of truth.

---

## Component Purpose

The Bulk Action Dialog provides persistent visibility into an asynchronous bulk operation.

It allows the user to understand:
- how many items are being processed
- which actions succeeded, failed, are still pending, or were skipped
- whether retry is available
- whether the operation can be safely closed or minimized

It is not a confirmation dialog. Use `SystemNoticeService` before the operation when confirmation is required. Use Bulk Action Dialog after the operation starts when progress or item-level results must remain visible.

Do NOT use when the action is synchronous.

---

## Required States

```ts
type BulkActionDialogState =
  | 'maximized'
  | 'minimized'
  | 'processing'
  | 'completed'
  | 'partial-success'
  | 'failed'
  | 'unknown-outcome';
```

---

## Required Anatomy

```text
Bulk Action Dialog
├── Header (fixed)
│   ├── Operation title — "x/y Items" format
│   ├── Minimize / maximize icon button
│   └── Close icon button (disabled while processing)
├── Content (scrollable)
│   └── Item result rows
│       ├── Item identifier (left, ellipsis)
│       ├── Status icon (DS 16px) + Status label (right)
│       ├── Optional summary sub-line (e.g. "200 Completed, 32 Failed...")
│       └── Optional text-button actions (right-aligned, max 2: Info | Hide | Retry | Cancel)
└── Minimized strip (alternative to full dialog)
    ├── Operation title
    ├── Maximize icon button
    └── Close icon button
```

---

## Header Format

Title must use the format: `x/y Items` or `x/y Processes ended`.

Do not use vague titles such as "Processing", "Operation", or "Please wait".

The header must remain fixed while the item result list scrolls.

---

## Maximized State

Default state when an operation begins.

Shows: operation title, all item rows with current status, item-level action buttons.

Up to 4 items visible without scroll. More than 4 items → result list becomes scrollable.

---

## Minimized State

Compact persistent operation indicator. Must not block normal page interaction.

Shows: operation title + compact progress summary + maximize + close controls.

Must not disappear while processing unless operation is cancelled or completed per approved product behavior.

---

## Item Visibility — Hide Pattern

Completed items that are no longer relevant may be hidden by the user via a "Hide" action.

Hidden items collapse into a group: `▶ Hidden (2)` — expandable to `▼ Hidden (2)` with "Restore to list" per item.

A "Restore all" control must be available when hidden items exist.

---

## Item Result Statuses

```ts
type BulkItemResultStatus =
  | 'pending'
  | 'in-progress'
  | 'completed'
  | 'failed'
  | 'paused'
  | 'partially'
  | 'cancelled'
  | 'unknown';
```

Status chips are DS status badges. Status icons are DS status icons at 16px.

Do not use local badges, color-only indicators, or raw backend error text.

---

## Close Rules

| State | Close behavior |
|---|---|
| Processing | Close disabled; minimize available |
| Completed | Close enabled |
| Partial success | Close enabled after results are available |
| Failed | Close enabled |
| Unknown outcome | Close enabled only after recovery guidance shown |

---

## Retry Rules

Retry is allowed only when the backend explicitly marks the operation as retryable and idempotency is supported.

Supported retry actions: `Retry`, `Try again`, `Renew`, `Check status`.

Do not provide Retry for unknown outcome until the user first checks status.

---

## Scroll Ownership

```text
Bulk Action Dialog
├── Fixed Header
├── Scrollable Item Result List  ← owns scroll when > 4 items
└── (no separate footer — actions are inline per row)
```

Do not make the full page, parent table, or parent FATLINES list scroll.

---

## Design System Rules

Use approved DS components for: Modal/Dialog container, Status icons, Buttons, Icon buttons, Progress spinner, Virtualized list, Tooltip, Action menu, Loading state.

Do not create a local bulk action dialog. Do not reuse a standard modal as a workaround. Do not copy screenshot theme or colors.

If the DS does not support minimized/maximized bulk operation behavior → create a DS Gap.

---

## QA Blocking Rules

Fails QA when:
- Standard confirmation dialog used for bulk async progress.
- Close enabled while active operation progress would be lost.
- Minimize unavailable during long-running bulk operation.
- Partial success presented as generic success.
- Unknown outcome presented as definitive failure.
- Retry exposed without idempotency confirmation.
- Result list scroll causes page, table, or full-dialog scrolling.
- Header scrolls away.
- Large result lists render without virtualization.
- Status uses local badges, dots, text-only indicators, or non-16px icons.
- Screenshot colors or theme are copied.
- Local visual overrides or local bulk-dialog implementation introduced.

---

---

# Global UX Component Standard — Buttons

## Scope

This standard applies to: Primary buttons, Secondary buttons, Text buttons, Icon buttons, Split buttons, Button groups, Filter buttons, Timer / countdown buttons, Loading buttons, Contextual actions, Form actions, Wizard actions, Bulk action buttons.

## Screenshot Layout and Behavior Rule

When a screenshot or Figma reference is provided, use it to understand:

- button hierarchy and placement
- action alignment and grouping
- **gap between grouped buttons (16px between button groups)**
- **button height by size category: Large 40px, Medium 32px, Small 24px**
- **icon placement within button (left side, 24px icon in 32px+ buttons)**
- **filter button + label layout and active indicator placement**
- **split-button composition: left action / right chevron divider**
- **footer layout: sticky position, left Cancel / right Primary**
- **overflow threshold (max 4 visible buttons before Action Menu)**
- loading spinner placement and label preservation
- responsive wrapping behavior

Map all measurements to approved DS spacing, sizing, and layout tokens. Do not hardcode pixel values.

Do not copy or infer:
- colors, theme mode, shadows, border colors
- hover/focus colors, typography styling, icon colors
- local visual overrides

The active Design System theme remains the visual source of truth.

---

## Core Rule

A Button triggers a user action. Before rendering a button, Claude must determine:

```text
- Is this the primary user goal?
- Is it a secondary action?
- Is it a low-emphasis helper action?
- Is it destructive?
- Does it need confirmation?
- Does it require loading or disabled behavior?
```

Do not use Buttons for navigation when a link, navigation item, or tab is the correct component.

---

## Button Types

```ts
type ButtonHierarchy = 'primary' | 'secondary' | 'text' | 'icon' | 'split' | 'filter' | 'timer';
```

### Primary Button
Single highest-priority action in context. Only one per action group. Must not be hidden in overflow.

### Secondary Button
Meaningful but lower-priority actions (Cancel, Back, Export). Must not compete visually with Primary.

### Text Button
Low-emphasis actions within content context (View details, Clear, Retry). Not for main page action.

### Icon Button
When icon meaning is recognized or space constrained. Requires localized `aria-label`. DS icons only.

### Split Button
One default primary action + related alternatives in overflow.
```text
[ Create account ] [ ▾ ]   — left executes, right opens Action Menu
```
Do not repeat the primary action in the overflow menu.

### Filter Button
Reflects active filter state. Shows count when filters are applied (`Filters · 3`). Does not replace Summary Bar chips.

### Timer / Countdown Button
Only when action availability is intentionally time-based (`Retry in 20s`). Must be accessible. Do not use for ordinary loading.

---

## Button Group Order

```text
Primary → Secondary → Text → Destructive → More actions
```

When actions exceed available width: keep highest-priority visible, move lower-priority to Action Menu. Do not duplicate visible actions in overflow.

---

## Form and Wizard Footer Rules

Footer is sticky — content scrolls, footer stays fixed.

```text
[Cancel]                     [Primary action]
```

Rules:
- Footer must be outside the scroll region.
- Primary Button on the action side per product directionality.
- Cancel must not be visually stronger than Save.
- Disabled primary must explain why when not obvious.

---

## Button State Rules

Every button must support applicable states: `default`, `hover`, `focus`, `pressed`, `disabled`, `loading`.

**Disabled:** use only when action is visible but currently unavailable. Must not be the only explanation — pair with helper text, tooltip, or inline validation.

**Loading:** enter immediately on click, prevent duplicate requests, preserve button placement, disable repeated interaction.

**After completion:** show Toast, inline update, or contextual result. Do not change button color to communicate outcome alone.

---

## Confirmation Rules

Use `SystemNoticeService` before: destructive, irreversible, security-sensitive, multi-entity, or service-interrupting actions.

Examples: Delete, Disable, Revoke, Rotate secrets, Bulk remove tags.

---

## Accessibility Requirements

```text
- Every Button has localized visible text or accessible name
- Icon-only Buttons require aria-label
- Disabled state exposed accessibly
- Loading state announced meaningfully
- Buttons remain keyboard operable
- Label describes the outcome — not generic wording
```

Use: `Save changes`, `Create account`, `Apply filters`, `Retry failed items`
Avoid: `Click here`, `Submit`, `Continue`, `OK` (unless context is unambiguous)

---

## Design System Rules

Use only approved DS APIs: `Button`, `IconButton`, `SplitButton`, `ButtonGroup`, `ActionMenu`, `Tooltip`, loading state, System Notice.

Do not: create local button components, override DS button colors, override internal padding/border-radius/height, copy screenshot theme, create custom hover/focus behavior, introduce arbitrary motion.

---

## QA Blocking Rules

Fails QA when:
- More than one competing Primary Button in a single action group.
- Primary action hidden in Action Menu overflow.
- Split Button duplicates its primary action in the menu.
- Destructive action executes without confirmation.
- Async action allows duplicate requests.
- Button loading causes layout shift.
- Sticky form footer scrolls away.
- Screenshot colors or theme copied.
- Local CSS overrides DS Button internals.
- Icon-only Button lacks accessible label.
- Generic labels used where outcome-specific labels are required.

---

---

# Screenshot Layout Specification Rule

## Updated Screenshot Usage Policy

Screenshots and Figma references are the layout specification source.

**Claude MUST use screenshots to infer and implement:**
- spacing, padding, margins, gaps
- component density
- widths, heights, alignment, placement
- content hierarchy and column order
- row height, section spacing, container sizing
- overflow behavior, sticky regions, scroll boundaries
- responsive layout behavior

**Claude MUST NOT copy from screenshots:**
- color palette, theme mode, component colors
- background/border/shadow values
- typography family or weight
- hover/focus colors
- custom icon colors

These must continue to come from the active Design System theme and approved APIs.

---

## DS Token Mapping Rule

When a screenshot shows a spacing or sizing value, map it to the closest approved DS token first.

```text
Screenshot: 24px gap
DS token: $spacing-6 = 24px → use $spacing-6

Screenshot: 18px gap
DS tokens: $spacing-4 = 16px, $spacing-5 = 20px
→ use closest approved token, report mapping in implementation plan
```

Do not introduce page-local hardcoded values when a DS token exists.

---

## Required Screenshot Layout Analysis Output

For every screenshot-driven implementation, Claude must include:

```markdown
### Screenshot Layout Analysis

| Area | Screenshot Requirement | DS Mapping | Decision |
|---|---|---|---|
| Page header | 24px bottom spacing | $spacing-6 | Apply |
| Summary Bar | Fixed above scroll | Existing Summary Bar pattern | Apply |
| Table rows | Dense row height | DS dense table variant | Apply |
```

---

## Component Boundary Rule

Claude may update layout composition **around** a DS component (container padding, page grid, section gap, column width, placement, content density via approved variants).

Claude must NOT change internal styling of DS components (internal padding, border-radius, colors, hover/focus state, typography, shadow).

If a screenshot requires an internal component capability the DS does not expose → create a DS Gap. Do not force through CSS overrides.

---

## QA Rules

Fails QA when:
- Screenshot spacing/alignment ignored without explanation.
- Page-local hardcoded spacing added when DS token exists.
- DS gap exists but CSS override used instead.
- DS component internal styling overridden to match screenshot.
- Screenshot colors/theme copied.
- Full-page scroll introduced where screenshot shows region-level scroll.
- Layout density differs materially from screenshot intent without documented reason.
