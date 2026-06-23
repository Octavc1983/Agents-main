/**
 * RuleBuilderPage.validation.ts
 *
 * Validation logic for the Rule Builder parallel-branch model.
 * No React. No side effects. Pure functions only.
 */

import type {
  RuleBranch,
  ConditionNodeData,
  ActionNodeData,
  CanvasConnection,
  RuleSetValidationResult,
  RuleBranchIssue,
} from './RuleBuilderPage.types';
import { RULE_BUILDER_STRINGS as S } from './RuleBuilderPage.strings';
import { RULE_BUILDER_ENTITY_OPTIONS } from '../../mock/ruleBuilderMockData';

// ── Structural-only validation (for Save Draft) ───────────────────────────────
// Blocks: duplicate node IDs, broken connector references, cycles.
// Allows: missing property/operator/value/action — these are field-level errors
//         that are only visible after the first Activate attempt.

export function validateForSaveDraft(
  branches:       RuleBranch[],
  conditionNodes: ConditionNodeData[],
  actionNodes:    ActionNodeData[],
  connections:    CanvasConnection[],
): { blocked: false } | { blocked: true; errorMessage: string } {
  // 1. Duplicate node IDs
  const allIds = [
    'start-node',
    ...conditionNodes.map((n) => n.id),
    ...actionNodes.map((n) => n.id),
  ];
  if (new Set(allIds).size !== allIds.length) {
    return { blocked: true, errorMessage: S.validationDuplicateIds };
  }

  // 2. Broken connector references
  const allIdSet = new Set(allIds);
  for (const conn of connections) {
    if (!allIdSet.has(conn.sourceNodeId) || !allIdSet.has(conn.targetNodeId)) {
      return { blocked: true, errorMessage: S.validationBrokenConnector };
    }
  }

  // 3. Cycle detection (DFS) — connections go start→condition→action only,
  //    but verify no back-edges exist.
  const adjacency = new Map<string, string[]>();
  for (const conn of connections) {
    if (!adjacency.has(conn.sourceNodeId)) adjacency.set(conn.sourceNodeId, []);
    adjacency.get(conn.sourceNodeId)!.push(conn.targetNodeId);
  }
  const visited = new Set<string>();
  const inStack = new Set<string>();
  function dfs(nodeId: string): boolean {
    if (inStack.has(nodeId)) return true;
    if (visited.has(nodeId)) return false;
    visited.add(nodeId);
    inStack.add(nodeId);
    for (const next of (adjacency.get(nodeId) ?? [])) {
      if (dfs(next)) return true;
    }
    inStack.delete(nodeId);
    return false;
  }
  for (const id of allIds) {
    if (dfs(id)) return { blocked: true, errorMessage: S.validationCycle };
  }

  return { blocked: false };
}

// ── Full validation (for Activate) ────────────────────────────────────────────
// Validates entity type, branch count, and all field-level requirements.
// Returns per-branch issues for the validation popover.

export function validateRuleSet(
  entityType:     string,
  branches:       RuleBranch[],
  conditionNodes: ConditionNodeData[],
  actionNodes:    ActionNodeData[],
  connections:    CanvasConnection[],
): RuleSetValidationResult {
  // 1. Start Point entity type
  if (!entityType || !RULE_BUILDER_ENTITY_OPTIONS.some((o) => o.value === entityType)) {
    return {
      isValid: false,
      invalidBranchIds: [],
      warningBranchIds: [],
      branchIssues: [],
      graphErrorMessage: S.validationNoStartEntity,
    };
  }

  // 2. At least one branch
  if (branches.length === 0) {
    return {
      isValid: false,
      invalidBranchIds: [],
      warningBranchIds: [],
      branchIssues: [],
      graphErrorMessage: S.validationNoRules,
    };
  }

  const invalidBranchIds: string[] = [];
  const warningBranchIds: string[] = [];
  const branchIssues: RuleBranchIssue[]  = [];

  const condMap = new Map(conditionNodes.map((n) => [n.id, n]));
  const actMap  = new Map(actionNodes.map((n) => [n.id, n]));

  for (const branch of branches) {
    const condNode   = condMap.get(branch.conditionNodeId);
    const actionNode = actMap.get(branch.actionNodeId);

    let hasBranchError = false;

    // Missing start-to-condition connector
    const hasStartConn = connections.some((c) => c.id === branch.startToConditionConnId);
    if (!hasStartConn) {
      invalidBranchIds.push(branch.id);
      branchIssues.push({
        branchId: branch.id,
        conditionNodeId: branch.conditionNodeId,
        kind: 'missing-start-to-condition',
        isWarning: false,
      });
      hasBranchError = true;
    }

    // Missing condition-to-action connector
    const hasActionConn = connections.some((c) => c.id === branch.conditionToActionConnId);
    if (!hasActionConn) {
      if (!hasBranchError) invalidBranchIds.push(branch.id);
      branchIssues.push({
        branchId: branch.id,
        conditionNodeId: branch.conditionNodeId,
        kind: 'missing-condition-to-action',
        isWarning: false,
      });
      hasBranchError = true;
    }

    if (condNode) {
      if (!condNode.propertyLabel) {
        if (!hasBranchError) invalidBranchIds.push(branch.id);
        branchIssues.push({ branchId: branch.id, conditionNodeId: condNode.id, kind: 'no-property', isWarning: false });
        hasBranchError = true;
      } else if (!condNode.operatorLabel) {
        if (!hasBranchError) invalidBranchIds.push(branch.id);
        branchIssues.push({ branchId: branch.id, conditionNodeId: condNode.id, kind: 'no-operator', isWarning: false });
        hasBranchError = true;
      } else if (
        !['exists', 'does-not-exist', 'Exists', 'Does not exist'].includes(condNode.operatorLabel) &&
        !condNode.valueLabel
      ) {
        if (!hasBranchError) invalidBranchIds.push(branch.id);
        branchIssues.push({ branchId: branch.id, conditionNodeId: condNode.id, kind: 'no-value', isWarning: false });
        hasBranchError = true;
      }
    }

    if (actionNode && !actionNode.actionId) {
      if (!hasBranchError) invalidBranchIds.push(branch.id);
      branchIssues.push({ branchId: branch.id, conditionNodeId: branch.conditionNodeId, kind: 'no-action', isWarning: false });
    }
  }

  // ── Broad scope warning ───────────────────────────────────────────────────
  // The one approved warning for this prototype release:
  // No Start Point filters configured → every entity in scope will be affected.
  // (Determined by absence of any condition node having a filter — currently
  //  the prototype doesn't support Start Point filters, so this is always true
  //  when there are branches. This will be refined when filters are added.)
  const broadScopeWarning = branches.length > 0 ? S.popoverProblemBroadScope : undefined;
  if (broadScopeWarning && invalidBranchIds.length === 0) {
    // Only emit warning when there are no blocking errors
    for (const branch of branches) {
      if (!warningBranchIds.includes(branch.id)) {
        warningBranchIds.push(branch.id);
      }
    }
  }

  return {
    isValid: invalidBranchIds.length === 0,
    invalidBranchIds,
    warningBranchIds,
    branchIssues,
    broadScopeWarning: invalidBranchIds.length === 0 ? broadScopeWarning : undefined,
  };
}

// ── Issue copy helpers ────────────────────────────────────────────────────────

import type { RuleBranchIssueKind } from './RuleBuilderPage.types';

export function getIssueProblem(
  kind:      RuleBranchIssueKind,
  condNode?: ConditionNodeData,
): string {
  switch (kind) {
    case 'no-property':               return S.popoverProblemNoProperty;
    case 'no-operator':               return S.popoverProblemNoOperator;
    case 'no-value':                  return S.popoverProblemNoValue(condNode?.operatorLabel ?? '');
    case 'no-action':                 return S.popoverProblemNoAction;
    case 'missing-start-to-condition': return S.popoverProblemMissingStartConn;
    case 'missing-condition-to-action': return S.popoverProblemMissingActionConn;
  }
}

export function getIssueNextAction(kind: RuleBranchIssueKind): string {
  switch (kind) {
    case 'no-property':               return S.popoverNextNoProperty;
    case 'no-operator':               return S.popoverNextNoOperator;
    case 'no-value':                  return S.popoverNextNoValue;
    case 'no-action':                 return S.popoverNextNoAction;
    case 'missing-start-to-condition': return S.popoverNextMissingStartConn;
    case 'missing-condition-to-action': return S.popoverNextMissingActionConn;
  }
}
