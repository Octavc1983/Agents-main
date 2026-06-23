/**
 * RuleBuilderPage.constants.ts
 *
 * Non-visible configuration constants for the Rule Builder canvas.
 * No visible labels, aria-labels, or copy. See RuleBuilderPage.strings.ts for that.
 */

// ── Zoom ──────────────────────────────────────────────────────────────────────

export const ZOOM_STEP    = 0.1;
export const ZOOM_MIN     = 0.25;
export const ZOOM_MAX     = 2.0;
export const ZOOM_DEFAULT = 1.0;

// ── Canvas layout ─────────────────────────────────────────────────────────────

export const START_NODE_X         = 80;
export const START_NODE_Y         = 120;
export const START_NODE_W         = 280;
export const START_NODE_H         = 100;

export const CONDITION_NODE_W     = 300;
export const CONDITION_NODE_H     = 120;

export const ACTION_NODE_W        = 280;
export const ACTION_NODE_H        = 100;

// Horizontal gap: Start Point right edge → Condition left edge
export const START_TO_CONDITION_GAP = 160;

// Horizontal gap: Condition right edge → Action left edge
export const CONDITION_TO_ACTION_GAP = 80;

// Vertical gap between rule branches
export const BRANCH_ROW_GAP       = 48;

// Canvas safety margin for fit-to-view calculation
export const CANVAS_SAFETY_MARGIN = 48;

// ── History ───────────────────────────────────────────────────────────────────

export const MAX_HISTORY          = 50;

// ── Derived layout helpers ────────────────────────────────────────────────────

export const CONDITION_NODE_X = START_NODE_X + START_NODE_W + START_TO_CONDITION_GAP;
export const ACTION_NODE_X    = CONDITION_NODE_X + CONDITION_NODE_W + CONDITION_TO_ACTION_GAP;

export function conditionNodeY(branchIndex: number): number {
  return START_NODE_Y + branchIndex * (CONDITION_NODE_H + BRANCH_ROW_GAP);
}

export function actionNodeY(branchIndex: number): number {
  return conditionNodeY(branchIndex) + (CONDITION_NODE_H - ACTION_NODE_H) / 2;
}
