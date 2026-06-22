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
export type StatusValue = AccountStatusValue | StepStatusValue;

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

function isStepStatus(v: StatusValue): v is StepStatusValue {
  return v === 'not_performed' || v === 'in_progress' || v === 'done' || v === 'failed';
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

  if (isStepStatus(status)) {
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
