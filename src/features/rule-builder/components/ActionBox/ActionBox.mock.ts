import type { ActionOption } from './ActionBox.types';

export const MOCK_ACTION_OPTIONS: ActionOption[] = [
  {
    id:          'require-password-change',
    label:       'Require password change',
    description: 'Force the account to change its password on next login.',
  },
  {
    id:          'add-approval-workflow',
    label:       'Add approval workflow',
    description: 'Route the account through an approval step before access is granted.',
  },
  {
    id:          'assign-remediation-task',
    label:       'Assign remediation task',
    description: 'Create a remediation task and assign it to the account owner.',
  },
];
