# Detect Infra

## Purpose

Analyze a UI image, screenshot, Figma frame, or visual reference and map it to existing Infra / Design System components and tokens.

This command uses the Infra Component Detection Agent.

## Agent to Use

Infra Component Detection Agent

## When to Use

Use this command when you have:

* A UI screenshot
* A Figma frame
* A product screen image
* A navigation design image
* A mockup image
* A visual reference

The goal is to scan the visual reference, identify the UI structure, and map each element to existing Infra / Design System components and existing Infra tokens.

## Important Rule

Scan and map first.

Do not implement anything until the visual analysis, Infra component mapping, token mapping, and gap report are complete.

## Prompt

Use the Infra Component Detection Agent.

Goal:
Analyze the provided visual reference and identify which existing Infra / Design System components and tokens should be used to recreate it in this React prototype project.

Input:
[ATTACH_IMAGE_OR_PROVIDE_FIGMA_SOURCE]

Target:
[TARGET_PAGE_OR_COMPONENT_IF_RELEVANT]

Important:
The existing Infra / Design System is the source of truth.
The image is only a visual reference.

Do not create new Design System components.
Do not create new tokens.
Do not use inline styles.
Do not hardcode hex colors.
Do not hardcode spacing values.
Do not hardcode typography values.
Do not hardcode radius values.
Do not hardcode shadows.
Do not use arbitrary pixel values when tokens exist.
Do not add external UI libraries.
Do not add icon libraries.
Do not modify the official Infra library.
Do not replace the existing Design System.
Do not create duplicate components.
Do not invent variants or states.
Do not add backend logic.
Do not perform broad refactors.
Do not change unrelated files.

Required workflow:

1. Analyze the visual input.
2. Identify all visible UI sections and components.
3. Inspect the project for existing Infra / DS components.
4. Inspect the project for existing tokens, SCSS variables, CSS custom properties, and theme files.
5. Map each visual element to an existing Infra / DS component.
6. Map each visual style to an existing Infra / DS token.
7. Identify missing components, missing tokens, missing icons, and ambiguous behavior.
8. Stop and report gaps if a matching component or token does not exist.
9. Only generate implementation if the mapping is safe and uses existing Infra assets.

Expected output:

### Visual Analysis Summary

Short summary of the screen or component analyzed.

### Detected UI Sections

List all major UI sections found in the image.

### Infra Component Mapping

| Visual Element | Existing Infra / DS Component | Import Path | Confidence | Notes |
| -------------- | ----------------------------- | ----------- | ---------- | ----- |

### Token Mapping

| Style Type | Visual Usage | Existing Token | Notes |
| ---------- | ------------ | -------------- | ----- |

### Existing Patterns Found

List existing project pages or components that should be used as implementation reference.

### Gaps

#### Missing Components

#### Missing Tokens

#### Missing Icons

#### Ambiguous Behavior

### Recommendation

Choose one:

* Ready for implementation using existing Infra
* Needs UX clarification
* Needs DS clarification
* Needs token clarification
* Not safe to implement without creating new DS assets
