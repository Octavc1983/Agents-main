# Working with Figma or Screenshots

You can give Claude a visual reference — a Figma frame or a screenshot — to improve the accuracy of what it builds or reviews. This guide explains how to attach these references, what Claude extracts from them, and what the rules are around building from visual references.

---

## 1. How to Attach a Screenshot

You can attach a screenshot to any message:
- Drag and drop a screenshot file into the chat
- Paste the file path into your message (Claude can read files from your filesystem)
- Take a screenshot and paste it directly if your interface supports clipboard paste

Screenshots work for: design mockups, existing product UI, Figma exports, or any visual reference.

---

## 2. How to Share a Figma Link

Paste a Figma frame URL directly into your message. Claude uses the Figma integration to read the frame structure directly — not just the image.

A Figma link looks like:
> https://www.figma.com/file/[file-id]/[file-name]?node-id=[frame-id]

When you share a Figma link, Claude connects to Figma and reads the frame data, including layer names, component names, spacing values, and color variables. This gives much more detail than a screenshot alone.

---

## 3. What Claude Extracts from Figma

When reading a Figma frame, Claude can extract:

- **Component names** — which Design System components are used in the Figma design
- **Layout structure** — how sections, rows, and columns are arranged
- **Design token usage** — which color, spacing, and typography variables are applied
- **Navigation structure** — if the frame includes a sidebar or navigation menu, Claude extracts each item, its hierarchy level, and its label
- **DS component mapping** — which Figma components correspond to which Design System components in the codebase
- **Gaps** — Figma components or styles that do not have a matching Design System equivalent

---

## 4. What Claude Extracts from Screenshots

When reading a screenshot, Claude can identify:

- **Screen type** — table, dashboard, form, card list, wizard, dialog, etc.
- **Template match** — which layout template from the template registry best fits the screenshot
- **Component types** — buttons, dropdowns, search bars, filter chips, data tables, panels
- **Layout pattern** — single column, sidebar + main, two-panel split, etc.
- **Approximate copy** — visible labels, headings, and text

Screenshots give Claude less precision than Figma links because they do not include the underlying component names or token values — only what is visually visible.

---

## 5. The Key Rule: Reference vs. Implementation

**Screenshots and Figma links are treated as visual references only**, unless you explicitly instruct Claude to build from them.

If you share a screenshot without a build instruction, Claude uses it to understand context, improve accuracy, or produce an alignment review — it does not automatically generate code from it.

To instruct Claude to build from a visual reference, say one of:
- "Build this screen based on the screenshot"
- "Implement this Figma frame"
- "Recreate this design in the prototype"
- "Match this layout"

If you share a reference and say "how does this compare to what we have?", Claude runs an alignment review rather than a build.

---

## 6. What "Pixel Perfect" Means and What It Requires

"Pixel perfect" means the built screen visually matches the Figma reference as closely as possible, including layout, spacing, typography, colors, and component choices.

To make a pixel-perfect claim, Claude requires:
1. A valid Figma link (not just a screenshot)
2. Mapping all Figma components to their Design System equivalents
3. Confirming that Design System tokens match the Figma design token values
4. Running a visual alignment review after building, producing a gap report

**A pixel-perfect build without a gap report is not a valid claim.** If Claude builds a screen from a Figma reference and there are differences between the built result and the Figma design, Claude must produce a gap report listing each discrepancy before the screen can be called pixel perfect.

---

## 7. How Visual Alignment Review Works

A visual alignment review compares the built React screen against a Figma reference and produces a gap report.

The gap report lists:
- Components present in Figma but missing from the built screen
- Components built in React that are not in the Figma design
- Spacing, sizing, or layout differences
- Color or token mismatches
- Copy differences (Figma text vs. built text)

Each gap is categorized:
- **Critical** — visible structural difference that changes the user's understanding of the screen
- **Warning** — noticeable visual difference that affects polish but not function
- **Minor** — subtle difference (1–2px spacing, slightly different shade) that may be acceptable

The gap report does not automatically trigger fixes. You decide which gaps to address.

