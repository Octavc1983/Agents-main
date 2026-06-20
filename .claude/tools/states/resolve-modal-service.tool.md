# resolve-modal-service

## Purpose

Classify every requested modal or dialog before implementation and route it to the correct service: FormDialogService (user input) or SystemNoticeService (information, warning, confirmation, destructive action).

## Trigger Conditions

- A dialog, modal, confirmation, or overlay is requested
- Page builder encounters a dialog requirement
- A destructive action needs confirmation

## Required Inputs

| Input | Type | Description |
|---|---|---|
| modal_description | string | Description of the dialog's purpose |

## Optional Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| action_type | string | unknown | create / edit / configure / confirm / warn / destruct / info / success |

## Validation Rules

```text
User input / create / edit / configure → FormDialogService
Information / warning / success / confirmation / destructive / permission → SystemNoticeService
```

If unclear → ask only: "Is this modal for user input and editing, or for a system message, warning, confirmation, or status update?"

## Output Contract

```markdown
### Modal Service Resolution

Description: [input]

Classification: [FormDialog / SystemNotice]

Service: [FormDialogService / SystemNoticeService]

Reason: [short explanation]

DS Components to Use: [list]
```

## Related Agents

- `.claude/agents/_core/prototype-page-builder-agent.md`

## Related Skills

- `.claude/skills/_templates/dialog-flow-template/SKILL.md`

## Failure Handling

If classification is ambiguous → ask one clarifying question. Never silently guess.

## Manual Approval Required When

- Dialog has both input fields and a destructive confirmation in the same surface

## Examples

**FormDialog:**
Input: "Dialog to create a new managed account with platform, address, and credential fields"
Output: FormDialogService — user input with form fields

**SystemNotice:**
Input: "Dialog asking user to confirm deletion of 5 accounts"
Output: SystemNoticeService — destructive confirmation
