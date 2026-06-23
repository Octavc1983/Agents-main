import type { RuleEntityType } from '../RuleCenterPage/RuleCenterPage.types';

// ── Canvas state ──────────────────────────────────────────────────────────────

export type RuleBuilderCanvasState =
  | 'empty'
  | 'draft'
  | 'dirty'
  | 'valid'
  | 'invalid'
  | 'warning'
  | 'saving'
  | 'saved'
  | 'save-failed'
  | 'activating'
  | 'active'
  | 'activation-failed'
  | 'read-only';

// ── Node position ─────────────────────────────────────────────────────────────

export type CanvasNodePosition = { x: number; y: number };

// ── Start Point ───────────────────────────────────────────────────────────────

export type StartNodeData = {
  id: 'start-node';
  type: 'start';
  entityType: RuleEntityType;
  entityLabel: string;
  position: CanvasNodePosition;
};

// ── Condition node ────────────────────────────────────────────────────────────

export type ConditionNodeData = {
  id: string;
  type: 'condition';
  propertyLabel: string;
  operatorLabel: string;
  valueLabel?: string;
  position: CanvasNodePosition;
};

// ── Action node ───────────────────────────────────────────────────────────────

export type ActionNodeData = {
  id: string;
  type: 'action';
  actionId: string | null;
  actionLabel: string;
  position: CanvasNodePosition;
};

export type CanvasNode = StartNodeData | ConditionNodeData | ActionNodeData;

// ── Connections ───────────────────────────────────────────────────────────────

export type CanvasConnectionKind = 'start-to-condition' | 'condition-to-action';

export type CanvasConnection = {
  id: string;
  sourceNodeId: string;
  sourcePort: 'output' | 'true-output' | 'condition-out';
  targetNodeId: string;
  targetPort: 'input';
  ruleId: string;
  kind: CanvasConnectionKind;
};

// ── Rule Branch ───────────────────────────────────────────────────────────────

export type RuleBranchStatus = 'draft' | 'complete' | 'invalid' | 'warning';

export type RuleBranch = {
  id: string;
  conditionNodeId: string;
  actionNodeId: string;
  startToConditionConnId: string;
  conditionToActionConnId: string;
  status: RuleBranchStatus;
};

// ── Graph snapshot (for undo/redo) ────────────────────────────────────────────

export type RuleGraphSnapshot = {
  branches: RuleBranch[];
  conditionNodes: ConditionNodeData[];
  actionNodes: ActionNodeData[];
  connections: CanvasConnection[];
};

// ── Validation ────────────────────────────────────────────────────────────────

export type RuleBranchIssueKind =
  | 'no-property'
  | 'no-operator'
  | 'no-value'
  | 'no-action'
  | 'missing-start-to-condition'
  | 'missing-condition-to-action';

export type RuleBranchIssue = {
  branchId: string;
  conditionNodeId: string;
  kind: RuleBranchIssueKind;
  isWarning: boolean;
};

export type RuleSetValidationResult = {
  isValid: boolean;
  invalidBranchIds: string[];
  warningBranchIds: string[];
  branchIssues: RuleBranchIssue[];
  graphErrorMessage?: string;
  broadScopeWarning?: string;
};

// ── Viewport ──────────────────────────────────────────────────────────────────

export type CanvasViewport = {
  x: number;
  y: number;
  zoom: number;
};
