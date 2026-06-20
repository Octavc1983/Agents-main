# What Claude Can Do

This page covers the full range of Claude's capabilities in this project. Each section explains what Claude does, how it works, and what you can expect.

---

## 1. Build New Screens

Claude can build a complete prototype screen from a plain-English description. You tell Claude the screen name, what it shows, and what users can do. Claude handles everything else.

What gets created automatically:
- The page layout using the best-fit template (table, card list, dashboard, form, wizard, etc.)
- All four data states: loading, empty, error, and success
- A sidebar navigation entry
- Typed mock data stored in the centralized mock data folder
- Design System-compliant components and SCSS tokens throughout
- Skeleton loading states that match the page layout
- Copy and terminology check before the screen is finished

Claude detects which layout template best matches your description using the template registry. If no existing template matches, Claude creates a draft candidate and asks for your approval before building.

---

## 2. Edit Existing Screens

Claude can update any existing screen based on your feedback. Before making any change, Claude reads the current page and produces a delta report: what it found, what it proposes to change, and what it will not touch. Nothing is changed until you approve the delta.

What is always preserved:
- All logic and behavior not mentioned in your request
- Navigation wiring, routes, and sidebar entries
- Mock data structure (unless you ask to change it)
- Design System components already in use
- Accessibility behavior and focus management
- Loading, empty, error, and success states already present

---

## 3. Add Flows and Interactions

Claude can add interaction flows to existing screens without rebuilding them. This includes:

- Filter panels with search and filter chips
- Details panels that open on row or card click
- Confirmation dialogs for destructive actions
- Multi-step dialogs or wizards
- Tab navigation within a page
- Bulk selection and bulk action flows
- Side panels, drawers, and overlays

You describe the interaction in plain English. Claude maps it to the correct template and wires it to the existing page structure.

---

## 4. Review Screens for UX Quality

Claude can perform a read-only UX audit of any screen. This covers:

- All four data states (loading, empty, error, success) — are they all defined?
- Edge cases — what happens when data is partial, slow, or missing?
- Interaction completeness — does every action have a clear outcome?
- Validation behavior — are errors shown clearly? Are values preserved?
- Focus management — does keyboard focus behave correctly after panels open or close?
- Dark mode — does the screen work correctly in dark theme?
- Copy and terminology — does the visible text follow approved terminology?

Reviews produce findings categorized as Critical, Warning, or Note. A review never changes any code unless you explicitly ask for fixes.

---

## 5. Work from Figma or Screenshots

You can attach a Figma link or screenshot to any request.

**From Figma:**
- Claude extracts the layout structure, component names, and design token usage
- Maps Figma components to the corresponding Design System components
- Extracts navigation structure from the Figma sidebar if present
- Identifies gaps between Figma and the Design System

**From screenshots:**
- Claude identifies the screen type (table, dashboard, form, etc.)
- Detects which layout template it matches
- Maps visible components to Design System equivalents
- Identifies potential mismatches or gaps

Important: screenshots and Figma links are treated as visual references only unless you explicitly say "build this" or "implement this". Claude will not generate code from a Figma or screenshot without your instruction to do so.

---

## 6. Review and Align to the Design System

Claude checks every screen for Design System compliance before marking it complete. This includes:

- Are all components from the approved Design System?
- Are SCSS tokens used everywhere (no hardcoded colors, spacing, or shadows)?
- Are icons SVG-only (no icon libraries, no PNG or emoji)?
- Are components used through their public API only (no visual overrides)?
- Are there any gaps — places where the Design System doesn't have what's needed?

When a gap is found, Claude stops and reports it. It never invents a workaround. You decide how to proceed.

---

## 7. Manage Navigation and Routing

Claude can update the sidebar navigation safely:

- Add a new navigation item in the correct space and hierarchy position
- Wire a new page to the router (with your approval on the route)
- Validate that active states, breadcrumbs, and back-navigation work correctly
- Sync a navigation screenshot or Figma frame to the live navigation structure

Claude will never flatten the navigation hierarchy, blindly append items, or create a new route without your approval.

---

## 8. Add Loading, Empty, Error, and Success States

Claude adds all four data states automatically when building a new screen. For existing screens, you can ask Claude to review or add missing states.

- **Loading** — A skeleton layout that matches the real page structure (not a spinner alone)
- **Empty** — A message explaining why there is nothing to show, plus a call to action where relevant
- **Error** — A clear explanation of what went wrong, a retry option, and a path forward
- **Success** — Confirmation that an action completed, appropriate to the context

---

## 9. Review Copy and Terminology

Claude checks all visible text against the approved terminology registry and style guide. This includes:

- Page titles, column headers, button labels, and navigation items
- Error messages, empty state copy, and confirmation dialog text
- Tooltip and accessibility label text

If a deprecated term is found, the review is blocked until it is resolved. If a new product-specific term is introduced, Claude flags it for registry addition before the screen is finalized.

---

## 10. Generate Review Packages for PM, UX, and R&D

Claude can produce structured review packages for sharing with stakeholders who are not in the chat. A review package includes a summary of what was built, key design decisions, open questions, and known gaps. These are formatted for non-technical audiences.

---

## 11. What Claude Will NOT Do Without Your Explicit Approval

- Overwrite or regenerate a screen that already exists (it reads first, shows a delta, and waits)
- Create a new URL route without your sign-off
- Make a destructive change (delete, archive, reset) without a confirmation step
- Invent a Design System component or token that doesn't exist
- Add a new navigation item to an unknown hierarchy position without asking
- Change any file outside the confirmed scope of your request
- Apply a Design System workaround instead of reporting a gap
- Promote a lesson or permanent workflow rule without evidence and approval
- Modify core agents, skills, or workflow rules from a single correction

