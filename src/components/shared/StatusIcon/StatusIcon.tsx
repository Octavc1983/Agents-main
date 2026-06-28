import React from 'react';
import {
  StatusActiveIcon,
  StatusInactiveIcon,
  StatusPendingIcon,
  StatusLockedIcon,
  StatusMarkedForDeletionIcon,
  StatusDeletedIcon,
  StatusCompletedIcon,
  StatusRunningIcon,
  StatusFailedIcon,
  StatusStoppedIcon,
} from '@idira/design-system/icons';
import './StatusIcon.scss';

export type AccountStatusValue = 'active' | 'inactive' | 'pending' | 'locked' | 'marked_for_deletion' | 'deleted';
export type StepStatusValue = 'not_performed' | 'in_progress' | 'done' | 'failed';
export type SecretStatusValue = 'onboarded' | 'not_rotated' | 'idle' | 'expired' | 'disabled';
export type DiscoveredAccountStatusValue = 'onboarded' | 'not_rotated' | 'idle' | 'rule_set_error' | 'disabled';
export type StatusValue = AccountStatusValue | StepStatusValue | SecretStatusValue | DiscoveredAccountStatusValue;

const ACCOUNT_STATUS_MAP: Record<AccountStatusValue, React.FC<{ size?: number }>> = {
  active:               StatusActiveIcon,
  inactive:             StatusInactiveIcon,
  pending:              StatusPendingIcon,
  locked:               StatusLockedIcon,
  marked_for_deletion:  StatusMarkedForDeletionIcon,
  deleted:              StatusDeletedIcon,
};

const STEP_STATUS_MAP: Record<StepStatusValue, React.FC<{ size?: number }>> = {
  not_performed: StatusPendingIcon,
  in_progress:   StatusRunningIcon,
  done:          StatusCompletedIcon,
  failed:        StatusFailedIcon,
};

const SECRET_STATUS_MAP: Record<SecretStatusValue, React.FC<{ size?: number }>> = {
  onboarded:   StatusActiveIcon,
  not_rotated: StatusStoppedIcon,
  idle:        StatusInactiveIcon,
  expired:     StatusDeletedIcon,
  disabled:    StatusLockedIcon,
};

const DISCOVERED_ACCOUNT_STATUS_MAP: Record<DiscoveredAccountStatusValue, React.FC<{ size?: number }>> = {
  onboarded:       StatusActiveIcon,
  not_rotated:     StatusStoppedIcon,
  idle:            StatusInactiveIcon,
  rule_set_error:  StatusFailedIcon,
  disabled:        StatusLockedIcon,
};

const ACCOUNT_STATUS_LABELS: Record<AccountStatusValue, string> = {
  active:               'Active',
  inactive:             'Inactive',
  pending:              'Pending',
  locked:               'Locked',
  marked_for_deletion:  'Marked for deletion',
  deleted:              'Deleted',
};

const STEP_STATUS_LABELS: Record<StepStatusValue, string> = {
  not_performed: 'Not performed',
  in_progress:   'In progress',
  done:          'Done',
  failed:        'Failed',
};

const SECRET_STATUS_LABELS: Record<SecretStatusValue, string> = {
  onboarded:   'Onboarded',
  not_rotated: 'Not rotated',
  idle:        'Idle',
  expired:     'Expired',
  disabled:    'Disabled',
};

const DISCOVERED_ACCOUNT_STATUS_LABELS: Record<DiscoveredAccountStatusValue, string> = {
  onboarded:       'Onboarded',
  not_rotated:     'Not rotated',
  idle:            'Idle',
  rule_set_error:  'Rule set error',
  disabled:        'Disabled',
};

const SECRET_STATUS_SET = new Set<string>(['onboarded', 'not_rotated', 'idle', 'expired', 'disabled']);
const DISCOVERED_ACCOUNT_STATUS_SET = new Set<string>(['onboarded', 'not_rotated', 'idle', 'rule_set_error', 'disabled']);
const STEP_STATUS_SET = new Set<string>(['not_performed', 'in_progress', 'done', 'failed']);

function isSecretStatus(v: StatusValue): v is SecretStatusValue {
  return SECRET_STATUS_SET.has(v);
}

function isDiscoveredAccountStatus(v: StatusValue): v is DiscoveredAccountStatusValue {
  return DISCOVERED_ACCOUNT_STATUS_SET.has(v);
}

function isStepStatus(v: StatusValue): v is StepStatusValue {
  return STEP_STATUS_SET.has(v);
}

interface StatusIconProps {
  status: StatusValue;
  size?: number;
  showLabel?: boolean;
  className?: string;
}

export const StatusIcon: React.FC<StatusIconProps> = ({ status, size = 24, showLabel = false, className }) => {
  let Icon: React.FC<{ size?: number }>;
  let label: string;

  if (isDiscoveredAccountStatus(status)) {
    Icon = DISCOVERED_ACCOUNT_STATUS_MAP[status];
    label = DISCOVERED_ACCOUNT_STATUS_LABELS[status];
  } else if (isSecretStatus(status)) {
    Icon = SECRET_STATUS_MAP[status];
    label = SECRET_STATUS_LABELS[status];
  } else if (isStepStatus(status)) {
    Icon = STEP_STATUS_MAP[status];
    label = STEP_STATUS_LABELS[status];
  } else {
    Icon = ACCOUNT_STATUS_MAP[status as AccountStatusValue];
    label = ACCOUNT_STATUS_LABELS[status as AccountStatusValue];
  }

  if (!showLabel) {
    return <Icon size={size} />;
  }

  return (
    <span className={['status-icon-cell', className].filter(Boolean).join(' ')}>
      <Icon size={size} />
      <span className="status-icon-cell__label">{label}</span>
    </span>
  );
};
