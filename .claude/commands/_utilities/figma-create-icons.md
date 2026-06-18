# Figma Create Icons

## Purpose

Extract icon definitions from a Figma source and create matching inline SVG React components in the project icon file.

All icons must follow the project SVG icon pattern. No icon libraries are added.

---

## Skill to Use

SVG Icon System Skill

Expected file: `.claude/skills/_infra/svg-icon-system/SKILL.md`

---

## When to Use

Use when:
- Figma has icon designs that need to be added to the project
- A /figma-scan or /figma-build-page identified icon gaps
- New sidebar icons or action icons need to be created

---

## Required User Intake

### Required intake fields

```text
Figma source:         Figma link or icon frame name
Icon names:           List of icons to create (from Figma layer names)
Target file:          Icon file to add to (default: src/assets/icons/NavIcons.tsx)
Default size:         Default size in px (default: 16)
Known constraints:    e.g. currentColor only, no fill icons
```

### Minimum required fields

```text
Figma source or icon names
Target file
```

### Missing Information Response

If both Figma source and icon names are missing:

```markdown
### Missing Required Information

Before I can run `/figma-create-icons`, please provide:

\`\`\`text
Figma source or icon names:  [Figma link / frame name / or list icon names]
Target file:                 [Icon file path, default: src/assets/icons/NavIcons.tsx]
Default size:                [px, default: 16]
Known constraints:           [e.g. currentColor stroke only]
\`\`\`
```

Do not read any icon files.
Do not create icons.
Do not continue until icons are specified.

---

## Intake Gate

Do not read icon files.
Do not create SVG components.
Do not modify any files.
Do not continue until icons are specified.

---

## Required Workflow

1. Read the target icon file to see existing exports.
2. Check if each requested icon already exists — do not duplicate.
3. If Figma source provided: read icon frame through MCP to get SVG path data.
4. Create SVG component for each new icon following the project SVG pattern.
5. Add to the target icon file.
6. Do not add icon libraries.
7. Report icons created and any icon gaps.

---

## SVG Icon Pattern

Every icon must follow:

```tsx
export const IconName: React.FC<SvgIconProps> = ({ size = 16, className, 'aria-label': ariaLabel }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label={ariaLabel}
    role="img"
    aria-hidden={!ariaLabel}
  >
    <path d="[SVG_PATH]" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
```

---

## Restrictions

- Do not add icon libraries
- Do not hardcode icon colors
- Do not create PNG/JPG icon assets
- Do not duplicate existing icons
- Do not modify unrelated files

---

## Expected Output

```markdown
### Icon Creation Summary

### Icons Created

| Icon Name | Component Name | Added to File | Notes |
|---|---|---|---|

### Icons Already Existing (Skipped)

### Icon Gaps (SVG path data not available)

### Restrictions Followed

- No icon libraries added
- All icons use currentColor
- All icons follow SvgIconProps interface
```
