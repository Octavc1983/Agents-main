# SVG Icon System Skill

## Purpose

Define the rules for using, adding, and referencing SVG icons in the prototype project.

All icons must be inline SVG React components. No icon libraries. No PNG/JPG/emoji icons.

---

## When to Use

Use this skill when:
- Adding a new icon to a page or component
- Checking which icons are available
- Adding a missing icon to the icon file
- Reviewing icon usage for DS compliance
- Mapping Figma icons to project SVG icons

---

## Inputs Required

```text
Icon name:      Name of the icon needed
Usage context:  Where the icon will be used (sidebar / button / table / details panel)
Size:           Desired render size in px (default: 16 or 20)
Color:          Token to use for color (default: currentColor)
```

---

## Required User Intake

Minimum required:
```text
Icon name
Usage context
```

---

## Required Project Inspection

Before using or creating icons:

1. Read `src/assets/icons/NavIcons.tsx` (or equivalent icon file)
2. Identify all currently exported SVG icon components
3. Match the requested icon to an existing export
4. If no match: confirm the correct SVG path data before adding

---

## Icon Rules

### Rule 1: SVG only
All icons must be inline SVG React components.
Do not use icon libraries (Heroicons, FontAwesome, MUI icons, Lucide, etc.).
Do not use PNG or JPG icons.
Do not use emoji as icons.

### Rule 2: Inline SVG component pattern
Every icon must follow this exact structure:

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
    <path d="..." stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
```

### Rule 3: currentColor
Always use `stroke="currentColor"` or `fill="currentColor"`.
Never hardcode icon colors.
Color is controlled by CSS on the parent element.

### Rule 4: SvgIconProps interface
All icons must use the shared `SvgIconProps` interface:

```tsx
interface SvgIconProps {
  size?: number;
  className?: string;
  'aria-label'?: string;
}
```

### Rule 5: Accessibility
Always include `aria-label` and `role="img"` props.
Set `aria-hidden={!ariaLabel}` so decorative icons are hidden from screen readers.

### Rule 6: File location
All icons live in `src/assets/icons/NavIcons.tsx` (or the project's designated icon file).
Do not scatter icons across multiple files.

### Rule 7: Gap documentation
If a required icon does not exist in the project:
- Document it as an icon gap
- Do not add an icon library
- Create a simple SVG placeholder if the path data is available
- Use a generic placeholder icon only as a last resort

---

## Required Workflow

1. Receive icon name and usage context.
2. Read the project icon file.
3. Search for a matching exported SVG component.
4. If found: provide the import and usage.
5. If not found: document the gap and either add the icon (with correct SVG path data) or provide a placeholder.
6. Confirm the icon follows the SvgIconProps interface and currentColor rule.

---

## Must Do

- Check project icon file before recommending any icon
- Use existing SVG icon components by name
- Import from the project icon file
- Use SvgIconProps interface
- Use currentColor for stroke/fill
- Document missing icons as gaps

---

## Must Not Do

- Do not add icon libraries
- Do not use PNG/JPG/emoji icons
- Do not hardcode icon colors
- Do not hardcode icon sizes as fixed values (pass size as prop)
- Do not scatter icons across multiple component files
- Do not invent icon names not in the project file

---

## Output Format

```markdown
### Icon Usage — [ICON NAME]

### Icon Found
- Component: [IconName]
- Export path: [import path]
- Usage:

```tsx
import { IconName } from 'src/assets/icons/NavIcons';
<IconName size={16} aria-label="Description" />
```

### OR: Icon Gap

Icon not found in project icon file.

Gap: [Icon name] is missing from src/assets/icons/NavIcons.tsx.

Recommendation:
- Add SVG icon component if path data is available
- Use placeholder icon as fallback
- Do not add icon library
```

---

## Example Prompt

```
Use the SVG Icon System Skill.

Goal:
Find or add the ScansIcon for use in the sidebar navigation.

Icon name: ScansIcon
Usage context: Sidebar navigation item
Size: 20
Color: currentColor (controlled by sidebar CSS)

Expected output:
Import path and usage example, or icon gap documentation.
```
