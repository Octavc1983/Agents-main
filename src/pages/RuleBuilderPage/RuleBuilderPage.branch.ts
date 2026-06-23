/**
 * RuleBuilderPage.branch.ts
 *
 * Pure branch helper functions for the Rule Builder parallel-branch model.
 * No React. No side effects. No imports from the page itself.
 */

import type {
  RuleBranch,
  ConditionNodeData,
  ActionNodeData,
  CanvasConnection,
} from './RuleBuilderPage.types';
import {
  START_NODE_X,
  START_NODE_W,
  CONDITION_NODE_X,
  ACTION_NODE_X,
  conditionNodeY,
  actionNodeY,
  CONDITION_NODE_H,
} from './RuleBuilderPage.constants';

// ── Create a new draft Rule Branch ────────────────────────────────────────────

let _branchCounter = 0;
let _nodeCounter   = 0;
let _connCounter   = 0;

export function resetBranchCounters(): void {
  _branchCounter = 0;
  _nodeCounter   = 0;
  _connCounter   = 0;
}

export function createDraftRuleBranch(branchIndex: number): {
  branch:       RuleBranch;
  conditionNode: ConditionNodeData;
  actionNode:    ActionNodeData;
  connections:  CanvasConnection[];
} {
  _branchCounter += 1;
  _nodeCounter   += 1;
  _connCounter   += 1;

  const branchId   = `branch-${_branchCounter}`;
  const condId     = `condition-${_nodeCounter}`;
  _nodeCounter    += 1;
  const actionId   = `action-${_nodeCounter}`;
  const startConnId = `conn-start-${_connCounter}`;
  _connCounter    += 1;
  const condConnId  = `conn-cond-${_connCounter}`;

  const conditionNode: ConditionNodeData = {
    id:             condId,
    type:           'condition',
    propertyLabel:  '',
    operatorLabel:  '',
    valueLabel:     undefined,
    position:       { x: CONDITION_NODE_X, y: conditionNodeY(branchIndex) },
  };

  const actionNode: ActionNodeData = {
    id:           actionId,
    type:         'action',
    actionId:     null,
    actionLabel:  '',
    position:     { x: ACTION_NODE_X, y: actionNodeY(branchIndex) },
  };

  const connections: CanvasConnection[] = [
    {
      id:           startConnId,
      sourceNodeId: 'start-node',
      sourcePort:   'output',
      targetNodeId: condId,
      targetPort:   'input',
      ruleId:       branchId,
      kind:         'start-to-condition',
    },
    {
      id:           condConnId,
      sourceNodeId: condId,
      sourcePort:   'condition-out',
      targetNodeId: actionId,
      targetPort:   'input',
      ruleId:       branchId,
      kind:         'condition-to-action',
    },
  ];

  const branch: RuleBranch = {
    id:                    branchId,
    conditionNodeId:       condId,
    actionNodeId:          actionId,
    startToConditionConnId: startConnId,
    conditionToActionConnId: condConnId,
    status:                'draft',
  };

  return { branch, conditionNode, actionNode, connections };
}

// ── Branch completion check ───────────────────────────────────────────────────

const OPERATORS_WITHOUT_VALUE = new Set([
  'exists', 'does-not-exist', 'Exists', 'Does not exist',
]);

export function isConditionComplete(node: ConditionNodeData): boolean {
  if (!node.propertyLabel) return false;
  if (!node.operatorLabel) return false;
  if (!OPERATORS_WITHOUT_VALUE.has(node.operatorLabel) && !node.valueLabel) return false;
  return true;
}

export function isActionComplete(node: ActionNodeData): boolean {
  return !!node.actionId;
}

export function isRuleBranchComplete(
  branch:        RuleBranch,
  conditionNodes: ConditionNodeData[],
  actionNodes:    ActionNodeData[],
  connections:    CanvasConnection[],
): boolean {
  const condNode   = conditionNodes.find((n) => n.id === branch.conditionNodeId);
  const actionNode = actionNodes.find((n) => n.id === branch.actionNodeId);
  if (!condNode || !actionNode) return false;
  if (!isConditionComplete(condNode)) return false;
  if (!isActionComplete(actionNode)) return false;
  const hasStartConn = connections.some(
    (c) => c.id === branch.startToConditionConnId,
  );
  const hasActionConn = connections.some(
    (c) => c.id === branch.conditionToActionConnId,
  );
  return hasStartConn && hasActionConn;
}

// ── Get the single incomplete draft branch (if any) ──────────────────────────

export function getIncompleteBranch(
  branches:       RuleBranch[],
  conditionNodes: ConditionNodeData[],
  actionNodes:    ActionNodeData[],
  connections:    CanvasConnection[],
): RuleBranch | null {
  return (
    branches.find(
      (b) => !isRuleBranchComplete(b, conditionNodes, actionNodes, connections),
    ) ?? null
  );
}

// ── Get all nodes belonging to a branch ──────────────────────────────────────

export function getRuleBranchConditionNode(
  branch:        RuleBranch,
  conditionNodes: ConditionNodeData[],
): ConditionNodeData | undefined {
  return conditionNodes.find((n) => n.id === branch.conditionNodeId);
}

export function getRuleBranchActionNode(
  branch:     RuleBranch,
  actionNodes: ActionNodeData[],
): ActionNodeData | undefined {
  return actionNodes.find((n) => n.id === branch.actionNodeId);
}

export function getRuleBranchConnections(
  branch:      RuleBranch,
  connections: CanvasConnection[],
): CanvasConnection[] {
  return connections.filter((c) => c.ruleId === branch.id);
}

// ── Recompute vertical positions after a branch is removed ───────────────────

export function reindexBranchPositions(
  branches:       RuleBranch[],
  conditionNodes: ConditionNodeData[],
  actionNodes:    ActionNodeData[],
): { conditionNodes: ConditionNodeData[]; actionNodes: ActionNodeData[] } {
  const updatedConditions = conditionNodes.map((node) => {
    const idx = branches.findIndex((b) => b.conditionNodeId === node.id);
    if (idx === -1) return node;
    return { ...node, position: { x: CONDITION_NODE_X, y: conditionNodeY(idx) } };
  });

  const updatedActions = actionNodes.map((node) => {
    const idx = branches.findIndex((b) => b.actionNodeId === node.id);
    if (idx === -1) return node;
    return { ...node, position: { x: ACTION_NODE_X, y: actionNodeY(idx) } };
  });

  return { conditionNodes: updatedConditions, actionNodes: updatedActions };
}

// ── Fan-out connector geometry ────────────────────────────────────────────────
// Returns the list of (fromX, fromY) → (toX, toY) coordinates for each branch
// connector, where the start point output is the shared trunk origin.

export type BranchConnectorSegment = {
  branchId:    string;
  trunkX:      number;
  trunkFromY:  number;
  trunkToY:    number;
  branchFromX: number;
  branchY:     number;
  toX:         number;
  toY:         number;
};

export function computeFanOutConnectors(
  branches:       RuleBranch[],
  conditionNodes: ConditionNodeData[],
): BranchConnectorSegment[] {
  if (branches.length === 0) return [];

  const startOutX = START_NODE_X + START_NODE_W;
  const trunkX    = startOutX + 40;     // horizontal offset for the vertical trunk

  const segments: BranchConnectorSegment[] = [];

  for (const branch of branches) {
    const condNode = conditionNodes.find((n) => n.id === branch.conditionNodeId);
    if (!condNode) continue;

    const startOutY = condNode.position.y + CONDITION_NODE_H / 2;
    const toX       = condNode.position.x;
    const toY       = condNode.position.y + CONDITION_NODE_H / 2;

    segments.push({
      branchId:    branch.id,
      trunkX,
      trunkFromY:  startOutY,
      trunkToY:    toY,
      branchFromX: trunkX,
      branchY:     toY,
      toX,
      toY,
    });
  }

  return segments;
}
