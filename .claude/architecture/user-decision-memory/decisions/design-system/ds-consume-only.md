---
id: DEC-009
title: DS Components Consumed Through Public API Only
category: design-system
scope: global
status: active
confidence: high
approvedAt: 2026-06-20
---

## Decision

All `@idira/design-system` components must be consumed through their documented public API only.

Application code must never alter, override, extend, patch, restyle, recolor, or inspect the internal structure of a consumed Design System component.

## Implementation Behavior

```text
- Use documented props, variants, sizes, state props
- Provide content through approved slots
- Provide icons through approved icon props
- Pass data and callbacks
- Compose DS components together
```

## Forbidden

```text
- inline style props on DS components
- className overrides intended to alter DS visuals
- CSS selectors targeting DS component internals
- descendant selectors against DS component classes
- !important overrides
- wrappers created only to restyle a DS component
- cloning DS component source into src
- importing from packages/design-system/src
```

## When Missing Capability

```text
Report DS Gap.
Do not override locally.
Request DS approval for new variant or capability.
```

## Trigger Conditions

- Any component is imported from @idira/design-system
- Any page or feature renders a DS component

## Source

CLAUDE.md — DS Components Are Consume-Only Rule
