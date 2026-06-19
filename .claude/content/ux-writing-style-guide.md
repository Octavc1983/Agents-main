# UX Writing Style Guide

## Purpose
Defines the writing principles, voice, tone, grammar rules, and formatting conventions for all UI text in this product — labels, CTAs, empty states, errors, confirmations, tooltips, and navigation items.

## Ownership
UX Writing / Product Design

## Status
Active

## Update Rules
- Rules are added when a recurring writing pattern needs a decision
- Rules are updated when product tone or brand guidelines evolve
- Do not add rules for one-off cases — only for patterns that will repeat
- Changes require UX Writing approval

## Last Reviewed
Not yet reviewed

---

## Voice and Tone

### Voice
**Clear over clever.** Security and identity management is serious work. Write for clarity and confidence, not for personality.

### Tone by context

| Context | Tone |
|---|---|
| Default UI labels | Neutral, concise |
| Empty states | Helpful, action-oriented |
| Error messages | Direct, non-blaming, recovery-focused |
| Success confirmations | Brief, affirming |
| Destructive actions | Clear about consequences, never alarming |
| Loading states | Neutral, minimal (avoid "Please wait...") |

---

## Grammar and Mechanics

### Capitalization
- Navigation items: Title Case (`Account Settings`, `Scans`)
- Button labels: Title Case (`Save Changes`, `Add Account`)
- Body text and descriptions: Sentence case
- Status labels: Title Case (`In Progress`, `Completed`)
- Error messages: Sentence case

### Punctuation
- Button labels: no period
- Tooltips: no period if a single sentence; use period for multi-sentence
- Error messages: period at end
- Empty state descriptions: period at end
- Dialog titles: no period

### Contractions
Allowed in conversational contexts (tooltips, empty states). Avoid in formal labels and error codes.

---

## Action Labels (CTAs)

### Rules
- Use verb-first: `Save`, `Delete`, `Add scan`, `View details`
- Be specific: `Save changes` not `OK`; `Delete scan` not `Delete`
- Primary action: most specific label possible
- Cancel: always `Cancel` — not `No`, `Close`, `Dismiss`, `Back`
- Destructive confirm: always names the action — `Delete scan`, not `Yes`

### Common patterns

| Pattern | Preferred | Avoid |
|---|---|---|
| Saving | `Save changes` | `Submit`, `OK`, `Done` |
| Creating | `Add [item]`, `Create [item]` | `New`, `Plus` |
| Deleting | `Delete [item]` | `Remove`, `Yes`, `Confirm` |
| Canceling | `Cancel` | `No`, `Back`, `Close`, `Dismiss` |
| Viewing | `View details`, `See all` | `More`, `Click here` |
| Running | `Run scan` | `Execute`, `Start`, `Launch` |

---

## Empty States

### Structure
1. Heading: what's missing (1 line)
2. Description: why it's empty and what to do (1–2 lines)
3. CTA: primary action (optional)

### Example
```
No scans yet
Run your first scan to start discovering identities and risks.
[Run scan]
```

### Rules
- Never: "Nothing here", "No data", "No results found" with no guidance
- Always explain what the user can do next
- Avoid generic fallbacks — be specific to the feature

---

## Error Messages

### Structure
1. What happened (specific, not technical)
2. Why it happened (if useful)
3. What to do (recovery action)

### Rules
- Never blame the user: not "You entered an invalid value" → "This field requires a valid email address"
- Never expose technical internals: not "500 Internal Server Error" → "Something went wrong. Try again or contact support."
- Always provide a path to recovery

### Common patterns

| Situation | Preferred |
|---|---|
| Required field empty | `[Field name] is required` |
| Invalid format | `Enter a valid [format]` |
| Failed save | `Couldn't save changes. Try again.` |
| Network error | `Connection failed. Check your network and try again.` |
| Access denied | `You don't have permission to do this.` |

---

## Loading States

- Default: no text, use spinner or skeleton
- If text is needed: `Loading...` (not "Please wait", not "Fetching data")
- Long operations: `Running scan...`, `Saving changes...`

---

## Confirmation Dialogs

### Structure
- Title: specific action — `Delete scan?`
- Body: consequence — `This will permanently delete "[Scan name]" and all its findings. This action can't be undone.`
- Primary CTA: specific and destructive — `Delete scan`
- Secondary CTA: `Cancel`

### Rules
- Never: "Are you sure?" as the title
- Always name the object being acted on
- For irreversible actions: explicitly state "can't be undone"

---

## Entry Template (for adding a new pattern)

```markdown
### Pattern: [Name]

**Context:** [where this pattern appears]
**Rule:** [the writing rule]
**Example:** [correct usage]
**Avoid:** [what not to write]
**Rationale:** [why this rule exists]
**Added:** [YYYY-MM-DD]
```
