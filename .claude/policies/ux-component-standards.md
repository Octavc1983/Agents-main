# Global UX Component Standards

Standards for interaction patterns used across the prototype.
Visual styling always comes from the active Design System theme — never from screenshots.

---

# Global UX Component Standard — Accordion

## Scope

This standard applies to any Accordion, collapsible panel, expandable section, grouped settings area, FAQ-style section, or disclosure pattern.

The provided reference may be used only to understand:

* structure
* hierarchy
* interaction behavior
* supported modes
* accessibility expectations
* content boundaries
* expansion and collapse logic

Do not use the reference as a source for colors, theme, typography styling, shadows, borders, spacing values, icon colors, hover colors, background colors, or dark/light mode decisions.

All visual styling must come from the approved Design System and active theme tokens.

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

The provided reference may be used only to understand: hierarchy, grouping, action order, trigger type, interaction behavior, permissions behavior, overflow behavior, scroll behavior, responsive behavior, accessibility expectations.

Do not use the reference as a source for colors, theme, typography, borders, shadows, spacing, icon colors, hover colors, background colors, dark/light mode decisions, or exact visual dimensions.

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

The provided reference may be used only to understand: message hierarchy, severity behavior, stacking behavior, dismissal behavior, placement logic, persistence behavior, accessibility expectations, when the component should or should not be used.

Do not use the reference as a source for colors, theme, typography, borders, shadows, spacing, icon colors, background colors, exact dimensions, dark/light mode decisions, or animation timing.

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

The provided reference may be used only to understand: content hierarchy, linked section order, selected-state behavior, scroll synchronization, placement in the page structure, accessibility behavior, long-content navigation intent.

Do not use the reference as a source for colors, theme, typography, borders, shadows, spacing, selected-state colors, hover colors, exact width/height, dark/light mode decisions, or custom visual indicators.

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

The provided reference may be used only to understand: suggestion behavior, matching behavior, dropdown placement, keyboard interactions, empty result behavior, grouping behavior, loading behavior, selection rules, list overflow behavior.

Do not use the reference as a source for colors, theme, typography, borders, shadows, spacing, hover colors, selected-state colors, exact widths/heights, or dark/light mode decisions.

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
