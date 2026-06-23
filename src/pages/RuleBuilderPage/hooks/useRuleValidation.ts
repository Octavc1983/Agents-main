import { useMemo } from 'react';
import type {
  RuleBranch,
  ConditionNodeData,
  ActionNodeData,
  CanvasConnection,
  RuleSetValidationResult,
} from '../RuleBuilderPage.types';
import { validateRuleSet } from '../RuleBuilderPage.validation';

export function useRuleValidation(
  entityType:     string,
  branches:       RuleBranch[],
  conditionNodes: ConditionNodeData[],
  actionNodes:    ActionNodeData[],
  connections:    CanvasConnection[],
): RuleSetValidationResult {
  return useMemo(
    () => validateRuleSet(entityType, branches, conditionNodes, actionNodes, connections),
    [entityType, branches, conditionNodes, actionNodes, connections],
  );
}
