import type { RuleEntityType } from '../pages/RuleCenterPage/RuleCenterPage.types';
import type {
  CanvasNode,
  CanvasConnection,
  StartNodeData,
  ConditionNodeData,
} from '../pages/RuleBuilderPage/RuleBuilderPage.types';

// ── Supported entities ────────────────────────────────────────────────────────

export const RULE_BUILDER_ENTITY_OPTIONS: { value: RuleEntityType; label: string }[] = [
  { value: 'accounts',         label: 'Accounts' },
  { value: 'federated-users',  label: 'Federated users' },
  { value: 'federated-groups', label: 'Federated groups' },
  { value: 'web-application',  label: 'Web application' },
  { value: 'users',            label: 'Users' },
  { value: 'virtual-machines', label: 'Virtual machines' },
];

export function getRuleBuilderEntityLabel(entityType: string): string {
  return RULE_BUILDER_ENTITY_OPTIONS.find((o) => o.value === entityType)?.label ?? entityType;
}

// ── Initial Start Node ────────────────────────────────────────────────────────

export function makeStartNode(entityType: RuleEntityType, entityLabel: string): StartNodeData {
  return {
    id: 'start-node',
    type: 'start',
    entityType,
    entityLabel,
    position: { x: 80, y: 120 },
  };
}

// ── Condition node fixtures ───────────────────────────────────────────────────

export const CONDITION_FIXTURE_RISK_LEVEL: Omit<ConditionNodeData, 'id' | 'position'> = {
  type: 'condition',
  propertyLabel: 'Risk level',
  operatorLabel: 'Equals',
  valueLabel: 'High',
};

export const CONDITION_FIXTURE_ACCOUNT_TYPE: Omit<ConditionNodeData, 'id' | 'position'> = {
  type: 'condition',
  propertyLabel: 'Account type',
  operatorLabel: 'Equals',
  valueLabel: 'Privileged',
};

export const CONDITION_FIXTURE_LAST_PASSWORD: Omit<ConditionNodeData, 'id' | 'position'> = {
  type: 'condition',
  propertyLabel: 'Last password change',
  operatorLabel: 'Greater than',
  valueLabel: '90 days',
};

export const CONDITION_FIXTURE_PLATFORM: Omit<ConditionNodeData, 'id' | 'position'> = {
  type: 'condition',
  propertyLabel: 'Platform',
  operatorLabel: 'Contains',
  valueLabel: 'Windows',
};

// ── Canvas graph fixtures ─────────────────────────────────────────────────────

export type CanvasGraphFixture = {
  nodes: CanvasNode[];
  connections: CanvasConnection[];
};

export const CANVAS_GRAPH_EMPTY: CanvasGraphFixture = {
  nodes: [],
  connections: [],
};

export const CANVAS_GRAPH_SINGLE_CONDITION: CanvasGraphFixture = {
  nodes: [
    {
      id: 'cond-fixture-001',
      type: 'condition',
      propertyLabel: 'Risk level',
      operatorLabel: 'Equals',
      valueLabel: 'High',
      position: { x: 480, y: 120 },
    },
  ],
  connections: [
    { id: 'conn-001', fromNodeId: 'start-node', fromPort: 'output', toNodeId: 'cond-fixture-001', toPort: 'input' },
  ],
};

export const CANVAS_GRAPH_TWO_CONDITIONS: CanvasGraphFixture = {
  nodes: [
    {
      id: 'cond-fixture-002',
      type: 'condition',
      propertyLabel: 'Account type',
      operatorLabel: 'Equals',
      valueLabel: 'Privileged',
      position: { x: 480, y: 80 },
    },
    {
      id: 'cond-fixture-003',
      type: 'condition',
      propertyLabel: 'Platform',
      operatorLabel: 'Contains',
      valueLabel: 'Windows',
      position: { x: 480, y: 240 },
    },
  ],
  connections: [
    { id: 'conn-002', fromNodeId: 'start-node', fromPort: 'output', toNodeId: 'cond-fixture-002', toPort: 'input' },
    { id: 'conn-003', fromNodeId: 'cond-fixture-002', fromPort: 'true', toNodeId: 'cond-fixture-003', toPort: 'input' },
  ],
};

// ── Simulated save outcomes ───────────────────────────────────────────────────

export type MockSaveOutcome = 'success' | 'failure';

export const MOCK_SAVE_DELAY_MS = 800;
export const MOCK_ACTIVATE_DELAY_MS = 1000;

export const MOCK_SAVE_OUTCOME: MockSaveOutcome = 'success';
export const MOCK_ACTIVATE_OUTCOME: MockSaveOutcome = 'success';

// ── Validation scenarios ──────────────────────────────────────────────────────

export type ValidationScenario =
  | 'valid-single-condition'
  | 'invalid-no-conditions'
  | 'invalid-incomplete-condition'
  | 'warning-unconnected-branch';

export const VALIDATION_SCENARIO_MESSAGES: Record<ValidationScenario, string> = {
  'valid-single-condition':       'Rule is valid and ready to activate.',
  'invalid-no-conditions':        'Add at least one condition to activate this rule.',
  'invalid-incomplete-condition': 'One or more conditions are missing required values.',
  'warning-unconnected-branch':   'One or more branches are not connected.',
};
