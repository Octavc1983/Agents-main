# Project Tools

Reusable callable tools that Agents, Skills, and Commands invoke consistently.

## Categories

| Category | Tool | Purpose |
|---|---|---|
| screen | detect-screen-template | Classify screen type before implementation |
| screen | convert-screen-to-dark | Convert any screen to dark theme using DS tokens |
| design-system | inspect-design-system | Discover available DS components, icons, tokens |
| design-system | classify-component-ownership | Determine where a component belongs |
| design-system | align-design-system-package | Audit and migrate package/legacy alignment |
| navigation | validate-spaces-navigation | Validate navConfig, routes, active state logic |
| states | generate-layout-aware-skeleton | Generate layout-matching skeleton loading states |
| states | resolve-modal-service | Classify modals before implementation |
| quality | review-screen-ux-content | Review all user-facing copy and terminology |
| quality | run-ui-quality-validation | Run typecheck, lint, import validation, QA checks |
| screen | protect-existing-page | Detect existing pages and enforce delta-only updates |
| navigation | reconcile-navigation-screenshot | Reconcile screenshot nav items against spacesRegistry |

## Invocation Order

```text
Natural-language request / screenshot / Figma
→ detect-screen-template
→ inspect-design-system
→ classify-component-ownership
→ navigation validation when relevant
→ resolve-modal-service when a dialog is needed
→ generate-layout-aware-skeleton when loading states are needed
→ convert-screen-to-dark when dark mode is required
→ review-screen-ux-content
→ run-ui-quality-validation
```

Use only the smallest relevant tool chain for each task.
