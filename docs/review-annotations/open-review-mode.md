# Opening Review Mode

Review Mode is how reviewers access the annotation panel in the prototype. Follow these steps to open it, use it, and close it.

---

## Step-by-Step: Opening Review Mode

### Step 1 — Navigate to any screen

Open the prototype app and navigate to the screen you want to review. Review Mode works on any page in the app.

### Step 2 — Click the "Review" button

Find the **Review** button in the top header of the app (the header bar that runs across the top of every screen). Click it.

### Step 3 — The annotation panel opens

The annotation panel slides in from the right side of the screen. The panel shows all annotations that have been added for the page you are currently viewing.

If no annotations exist for this page yet, the panel shows an empty state with an option to add the first note.

### Step 4 — Navigate between screens

While the annotation panel is open, you can navigate to any other screen in the app. The panel updates automatically to show the annotations for the new screen. You do not need to close and reopen the panel.

### Step 5 — Close the panel

Click the **Review** button in the header again to close the annotation panel. The panel slides closed and the screen returns to its full layout.

---

## What You Can Do in the Panel

When the annotation panel is open, you can:

- View all annotations for the current screen, sorted by severity (Critical first, then Warning, then Note)
- Add a new annotation using the "Add annotation" control at the top of the panel
- Click any annotation to expand it and see the full text, author, and timestamp
- Edit or delete an existing annotation
- Resolve or unresolve an annotation
- View the edit history of any annotation

---

## Important Note: Review Mode Is a Reviewer Utility

Review Mode is not part of the product flow that users see. It is a tool for the review team — UX designers, PMs, and design leads — to leave notes during review sessions.

The Review button and the annotation panel are only visible in the prototype environment. They do not appear in any production or end-user view of the product.

This separation is intentional (DEC-014: Review Mode is an external utility, not a product flow). It means the review layer does not affect the product design and can be used freely during review sessions without risk of adding reviewer-only controls to the product UI.

---

## Inspect Mode

Review Mode has an optional Inspect Mode that allows reviewers to click on individual UI elements to annotate them specifically. Inspect Mode is **off by default** (DEC-015) and must be activated explicitly.

To activate Inspect Mode, look for the Inspect toggle within the annotation panel. When Inspect Mode is active, you can click any element on the screen to create an annotation pinned to that element.

Turn off Inspect Mode when you are done to return to the normal panel view.

