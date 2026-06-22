# Deprecated Standards

## Purpose

Records standards that were superseded, removed, or replaced. Retained for historical reference and to prevent re-introduction.

---

## Deprecated Patterns

### Text-Only Status Pill Badge

**Deprecated:** 2026-06-21
**Replaced by:** GUS-001 — Status Indicators (24px SVG StatusIcon + label)
**Reason:** Color-only and text-only badges fail accessibility requirements and are inconsistent across page types. Every status indication must use the approved SVG StatusIcon at 24px.

**Pattern that must not be reintroduced:**

```tsx
// ❌ DEPRECATED — Do not use
<span className={`ma-status-badge ma-status-badge--${status}`}>
  {STATUS_LABELS[status]}
</span>
```

**Approved replacement:**

```tsx
// ✅ Use instead
<StatusIcon status={status} size={24} showLabel />
```

---

### Small Circle-Background Status Icons (14×14)

**Deprecated:** 2026-06-21
**Replaced by:** GUS-001 — full 24×24px stroke-style status icons (no circle background)
**Reason:** The old icons were small circle fills (viewBox 0 0 14 14) with a colored circle background and a white shape inside. These do not match the design system visual language for account status. All account status icons must be bare 24×24px stroke SVGs matching the approved designs.

**Icons that must not be reintroduced:**

```tsx
// ❌ DEPRECATED — Do not use (circle-background 14px icons)
// StatusActiveIcon  — green circle + white dot
// StatusInactiveIcon — gray circle + white dash
// StatusLockedIcon  — red circle + white padlock
// These were in NavIcons.tsx with viewBox="0 0 14 14"
```

**Approved replacement icons (24×24px stroke, no background):**

```tsx
// ✅ Account status — use via shared StatusIcon component
<StatusIcon status="active" size={24} />              // warning triangle amber
<StatusIcon status="inactive" size={24} />            // error circle red
<StatusIcon status="locked" size={24} />              // padlock white stroke
<StatusIcon status="marked_for_deletion" size={24} /> // flag amber
<StatusIcon status="deleted" size={24} />             // trash bin white stroke
```

---

*Add new entries here when standards are deprecated. Include: date, what was replaced, why, and the approved replacement.*
