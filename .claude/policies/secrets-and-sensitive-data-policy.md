# Secrets and Sensitive Data Policy

## Absolute Prohibitions

The following must NEVER appear in the UI, logs, mock data, accessible labels, or aria attributes:

```text
- Passwords or credentials
- SSH private keys
- Session tokens or API keys
- Secret values or encryption keys
- AWS ARNs or SSM Parameter Store paths
- SQS/SNS message bodies
- Internal DynamoDB record IDs
- CM internal task IDs
- Stack traces or raw backend error messages
- PII beyond what the user themselves entered
```

---

## SSH Key Rule

SSH **public** keys may be displayed in appropriate UX contexts (e.g. "Copy public key to DR server").

SSH **private** keys must NEVER appear in any UI surface, including:

```text
- Form fields (even masked)
- Log entries
- Accessible labels
- Mock data
- Error messages
```

---

## Mock Data Sanitization

All mock log data, audit trail data, report data, and activity data must be sanitized:

```text
- No real secrets or passwords.
- No real private keys.
- No stack traces.
- No raw backend error messages.
- No internal system IDs.
- Use safe localized result messages only (e.g. "Connection test passed").
```

---

## Log and Report Display Rules

```text
Safe to show:
- Task name and status
- Task start/end timestamps
- Localized result message
- Warning messages (non-sensitive)
- Step duration
- Count of items processed
- Infrastructure identifiers (e.g. machine name, not internal IDs)

Never show:
- Passwords, credentials, tokens, session keys
- SSH private keys
- Raw backend error messages or stack traces
- Internal DynamoDB record IDs
- AWS ARNs or SSM Parameter Store paths
- CM internal task IDs
- SQS/SNS message bodies
```

---

## Accessible Label Rule

Never expose sensitive data in `aria-label`, `title`, or `alt` attributes.

---

## Auto-Save Prohibition for Secrets

Never use `auto-save` save model for any form that contains passwords, SSH keys, or credentials.
