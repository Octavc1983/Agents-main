# Tables and Split Views Standard

## Standard ID

`GUS-008`

## Category

`table`

## Status

`active`

---

## Rule

Use the approved Table Filters Template and Table Master Details Template. Do not create custom table implementations when the approved templates already cover the pattern.

---

## Required Column Patterns

**Column order is mandatory** — see [table-column-order.md](table-column-order.md) — GUS-016:
```text
[Checkbox] | [Status 24px] | Primary identifier | Metadata | Risk | Actions
```

### Status Column

→ See [status-indicators.md](status-indicators.md) — GUS-001. Always uses `StatusIcon` at 24px.

### Risk Column

→ IRON RULE: Use `SeverityBadge` with `variant="fill"` only. Wire logic to Risk Management page aggregation. See `feedback-risk-column-wiring` memory.

### Platform / Type Column

→ Use platform icon (24px SVG) + text label.

### Name / Identifier Column

→ Primary text bold, secondary metadata in muted color below.

### Actions Column (three dots)

→ Use DS `MoreActions` or inline row action menu. Do not use custom dropdown components.

---

## Row Interaction

- Row click → open details (Master Details / FATLINES pattern) — see GUS-003
- Checkbox click → add to selection (bulk actions)
- Three-dots click → open row action menu

These three interactions must be distinct and not overlap.

---

## Column Width

- Columns must use proportional widths, not hardcoded px widths
- Do not let any column overflow the table container
- Long text values must truncate with `text-overflow: ellipsis` and a tooltip

---

## Required Table States

- Default (data loaded)
- Loading (skeleton rows — see GUS-004)
- Empty (no entities — see GUS-005)
- No results (filtered — see GUS-005)
- Error (failed to load — see GUS-006)
- Row selected (highlighted)
- Details open (table remains visible at reduced width or in split layout)

---

## Split View Rules

- Table column must not disappear when details are open
- Details panel must have a close button
- Closing details returns full-width table layout
- Filter and search state must not change when details open/close

---

## QA Checks

1. Are approved templates used instead of one-off implementations?
2. Does the status column use GUS-001?
3. Does the risk column use SeverityBadge only?
4. Are all required table states implemented?
5. Does row click vs checkbox vs three-dots behave independently?
6. Does split view preserve filter/search state?

---

## Standard Metadata

```ts
{ id: 'GUS-008', title: 'Tables and Split Views Standard', category: 'table', status: 'active', approvedAt: '2026-06-21' }
```
