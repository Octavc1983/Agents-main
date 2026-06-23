import type { RuleEntityType } from '../RuleCenterPage/RuleCenterPage.types';

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

export type CanvasConnectionPort = 'output' | 'input' | 'true' | 'false';

export type CanvasConnection = {
  id: string;
  fromNodeId: string;
  fromPort: CanvasConnectionPort;
  toNodeId: string;
  toPort: CanvasConnectionPort;
};

export type RuleGraphSnapshot = {
  nodes: CanvasNode[];
  connections: CanvasConnection[];
};

export type RuleBuilderToolbarState = {
  ruleId?: string;
  ruleName: string;

  canvasZoom: number;
  selectedNodeId: string | null;

  totalNodes: number;
  totalConditions: number;
  invalidNodeCount: number;
  warningNodeCount: number;

  isDirty: boolean;
  isSaving: boolean;
  isActivating: boolean;
  isReadOnly: boolean;

  canUndo: boolean;
  canRedo: boolean;
  canSaveDraft: boolean;
  canActivate: boolean;
};

export type RuleValidationResult = {
  isValid: boolean;
  invalidNodeIds: string[];
  warningNodeIds: string[];
  errorMessage?: string;
};

export type CanvasViewport = {
  x: number;
  y: number;
  zoom: number;
};
