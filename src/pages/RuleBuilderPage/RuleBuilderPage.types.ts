import type { RuleEntityType } from '../RuleCenterPage/RuleCenterPage.types';

export type RuleBuilderCanvasState =
  | 'empty'
  | 'draft'
  | 'dirty'
  | 'valid'
  | 'invalid'
  | 'saving'
  | 'saved'
  | 'activating'
  | 'active'
  | 'activation-failed'
  | 'read-only';

export type CanvasNodeType = 'start' | 'condition';

export type CanvasNodePosition = { x: number; y: number };

export type StartNodeData = {
  id: string;
  type: 'start';
  entityType: RuleEntityType;
  entityLabel: string;
  position: CanvasNodePosition;
};

export type ConditionNodeData = {
  id: string;
  type: 'condition';
  propertyLabel: string;
  operatorLabel: string;
  valueLabel?: string;
  position: CanvasNodePosition;
};

export type CanvasNode = StartNodeData | ConditionNodeData;

export type RuleBuilderPageProps = {
  entityType: RuleEntityType;
  entityLabel: string;
};
