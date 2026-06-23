import type { RuleEntityType } from '../pages/RuleCenterPage/RuleCenterPage.types';
import type {
  StartNodeData,
  ConditionNodeData,
  ActionNodeData,
  CanvasConnection,
  RuleBranch,
  RuleGraphSnapshot,
} from '../pages/RuleBuilderPage/RuleBuilderPage.types';
import type { ActionOption } from '../features/rule-builder/components/ActionBox/ActionBox.types';
import {
  START_NODE_X,
  START_NODE_Y,
  CONDITION_NODE_X,
  ACTION_NODE_X,
  conditionNodeY,
  actionNodeY,
} from '../pages/RuleBuilderPage/RuleBuilderPage.constants';

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

// ── Action options (shared across all ActionBox instances) ────────────────────

export const RULE_BUILDER_ACTION_OPTIONS: ActionOption[] = [
  {
    id:          'require-password-change',
    label:       'Require password change',
    description: 'Forces a mandatory password rotation for the matched accounts.',
  },
  {
    id:          'add-approval-workflow',
    label:       'Add approval workflow',
    description: 'Requires human approval before access is granted.',
  },
  {
    id:          'assign-remediation-task',
    label:       'Assign remediation task',
    description: 'Creates a remediation task assigned to the account owner.',
  },
];

// ── Initial Start Node ────────────────────────────────────────────────────────

export function makeStartNode(entityType: RuleEntityType, entityLabel: string): StartNodeData {
  return {
    id: 'start-node',
    type: 'start',
    entityType,
    entityLabel,
    position: { x: START_NODE_X, y: START_NODE_Y },
  };
}

// ── Empty graph ───────────────────────────────────────────────────────────────

export const EMPTY_GRAPH_SNAPSHOT: RuleGraphSnapshot = {
  branches:       [],
  conditionNodes: [],
  actionNodes:    [],
  connections:    [],
};

// ── Single complete branch fixture ───────────────────────────────────────────

const _cond001: ConditionNodeData = {
  id:             'cond-001',
  type:           'condition',
  propertyLabel:  'Risk level',
  operatorLabel:  'Equals',
  valueLabel:     'High',
  position:       { x: CONDITION_NODE_X, y: conditionNodeY(0) },
};

const _act001: ActionNodeData = {
  id:           'act-001',
  type:         'action',
  actionId:     'require-password-change',
  actionLabel:  'Require password change',
  position:     { x: ACTION_NODE_X, y: actionNodeY(0) },
};

const _branch001: RuleBranch = {
  id:                    'branch-001',
  conditionNodeId:       'cond-001',
  actionNodeId:          'act-001',
  startToConditionConnId: 'conn-s2c-001',
  conditionToActionConnId: 'conn-c2a-001',
  status:                'complete',
};

const _conn001StartToCondition: CanvasConnection = {
  id:           'conn-s2c-001',
  sourceNodeId: 'start-node',
  sourcePort:   'output',
  targetNodeId: 'cond-001',
  targetPort:   'input',
  ruleId:       'branch-001',
  kind:         'start-to-condition',
};

const _conn001ConditionToAction: CanvasConnection = {
  id:           'conn-c2a-001',
  sourceNodeId: 'cond-001',
  sourcePort:   'condition-out',
  targetNodeId: 'act-001',
  targetPort:   'input',
  ruleId:       'branch-001',
  kind:         'condition-to-action',
};

export const FIXTURE_SINGLE_COMPLETE_BRANCH: RuleGraphSnapshot = {
  branches:       [_branch001],
  conditionNodes: [_cond001],
  actionNodes:    [_act001],
  connections:    [_conn001StartToCondition, _conn001ConditionToAction],
};

// ── Two complete branches fixture ─────────────────────────────────────────────

const _cond002: ConditionNodeData = {
  id:             'cond-002',
  type:           'condition',
  propertyLabel:  'Account type',
  operatorLabel:  'Equals',
  valueLabel:     'Privileged',
  position:       { x: CONDITION_NODE_X, y: conditionNodeY(1) },
};

const _act002: ActionNodeData = {
  id:           'act-002',
  type:         'action',
  actionId:     'add-approval-workflow',
  actionLabel:  'Add approval workflow',
  position:     { x: ACTION_NODE_X, y: actionNodeY(1) },
};

const _branch002: RuleBranch = {
  id:                    'branch-002',
  conditionNodeId:       'cond-002',
  actionNodeId:          'act-002',
  startToConditionConnId: 'conn-s2c-002',
  conditionToActionConnId: 'conn-c2a-002',
  status:                'complete',
};

const _conn002StartToCondition: CanvasConnection = {
  id:           'conn-s2c-002',
  sourceNodeId: 'start-node',
  sourcePort:   'output',
  targetNodeId: 'cond-002',
  targetPort:   'input',
  ruleId:       'branch-002',
  kind:         'start-to-condition',
};

const _conn002ConditionToAction: CanvasConnection = {
  id:           'conn-c2a-002',
  sourceNodeId: 'cond-002',
  sourcePort:   'condition-out',
  targetNodeId: 'act-002',
  targetPort:   'input',
  ruleId:       'branch-002',
  kind:         'condition-to-action',
};

export const FIXTURE_TWO_COMPLETE_BRANCHES: RuleGraphSnapshot = {
  branches:       [_branch001, _branch002],
  conditionNodes: [_cond001, _cond002],
  actionNodes:    [_act001, _act002],
  connections:    [
    _conn001StartToCondition,
    _conn001ConditionToAction,
    _conn002StartToCondition,
    _conn002ConditionToAction,
  ],
};

// ── Simulated save outcomes ───────────────────────────────────────────────────

export type MockSaveOutcome = 'success' | 'failure';

export const MOCK_SAVE_DELAY_MS     = 800;
export const MOCK_ACTIVATE_DELAY_MS = 1000;

export const MOCK_SAVE_OUTCOME:     MockSaveOutcome = 'success';
export const MOCK_ACTIVATE_OUTCOME: MockSaveOutcome = 'success';
