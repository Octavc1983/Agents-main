import type { ConditionBoxData } from './ConditionBox.types';

export const CONDITION_BOX_MOCK_VALID: ConditionBoxData = {
  id: 'node-001',
  status: 'valid',
  propertyLabel: 'Risk level',
  operatorLabel: 'Equals',
  valueLabel: 'High',
  hasInputConnection: true,
  hasTrueConnection: true,
  hasFalseConnection: true,
  isMenuAvailable: true,
};

export const CONDITION_BOX_MOCK_DRAFT: ConditionBoxData = {
  id: 'node-002',
  status: 'draft',
  propertyLabel: 'Risk level',
  operatorLabel: '',
  valueLabel: undefined,
  hasInputConnection: false,
  hasTrueConnection: false,
  hasFalseConnection: false,
  isMenuAvailable: true,
};

export const CONDITION_BOX_MOCK_INVALID: ConditionBoxData = {
  id: 'node-003',
  status: 'invalid',
  propertyLabel: 'Account type',
  operatorLabel: 'Equals',
  valueLabel: undefined,
  hasInputConnection: true,
  hasTrueConnection: false,
  hasFalseConnection: false,
  validationMessageKey: 'condition.validation.value_required',
  isMenuAvailable: true,
};

export const CONDITION_BOX_MOCK_WARNING: ConditionBoxData = {
  id: 'node-004',
  status: 'warning',
  propertyLabel: 'Last password change',
  operatorLabel: 'Greater than',
  valueLabel: '90 days',
  hasInputConnection: true,
  hasTrueConnection: true,
  hasFalseConnection: false,
  warningMessageKey: 'condition.warning.false_branch_missing',
  isMenuAvailable: true,
};

export const CONDITION_BOX_MOCK_SELECTED: ConditionBoxData = {
  id: 'node-005',
  status: 'selected',
  propertyLabel: 'Platform',
  operatorLabel: 'Contains',
  valueLabel: 'Windows',
  hasInputConnection: true,
  hasTrueConnection: true,
  hasFalseConnection: true,
  isMenuAvailable: true,
};

export const CONDITION_BOX_MOCK_READ_ONLY: ConditionBoxData = {
  id: 'node-006',
  status: 'read-only',
  propertyLabel: 'Organization',
  operatorLabel: 'Equals',
  valueLabel: 'CyberArk',
  hasInputConnection: true,
  hasTrueConnection: true,
  hasFalseConnection: true,
  isReadOnly: true,
  isMenuAvailable: false,
};

export const CONDITION_BOX_MOCK_CONNECTED: ConditionBoxData = {
  id: 'node-007',
  status: 'valid',
  propertyLabel: 'Status',
  operatorLabel: 'Not equals',
  valueLabel: 'Active',
  hasInputConnection: true,
  hasTrueConnection: true,
  hasFalseConnection: true,
  isMenuAvailable: true,
};

export const CONDITION_BOX_MOCK_NO_DOWNSTREAM: ConditionBoxData = {
  id: 'node-008',
  status: 'draft',
  propertyLabel: 'Safe',
  operatorLabel: 'Exists',
  valueLabel: undefined,
  hasInputConnection: true,
  hasTrueConnection: false,
  hasFalseConnection: false,
  isMenuAvailable: true,
};

export const CONDITION_BOX_MOCKS: ConditionBoxData[] = [
  CONDITION_BOX_MOCK_VALID,
  CONDITION_BOX_MOCK_DRAFT,
  CONDITION_BOX_MOCK_INVALID,
  CONDITION_BOX_MOCK_WARNING,
  CONDITION_BOX_MOCK_SELECTED,
  CONDITION_BOX_MOCK_READ_ONLY,
  CONDITION_BOX_MOCK_CONNECTED,
  CONDITION_BOX_MOCK_NO_DOWNSTREAM,
];
