import React from 'react';
import {
  StatusFailedIcon,
  StatusCompletedIcon,
  StatusPendingIcon,
  StatusRunningIcon,
  StatusActiveIcon,
} from '@idira/design-system/icons';
import type { ScanStatus, CloudProvider } from './ScansPage.types';

// ── Status icon + label map ───────────────────────────────────────────────────

export interface ScanStatusMeta {
  Icon: React.FC<{ size?: number }>;
  label: string;
  cssClass: string;
}

export const SCAN_STATUS_META: Record<ScanStatus, ScanStatusMeta> = {
  failed:    { Icon: StatusFailedIcon,    label: 'Failed',    cssClass: 'scan-status--failed' },
  completed: { Icon: StatusCompletedIcon, label: 'Completed', cssClass: 'scan-status--completed' },
  pending:   { Icon: StatusPendingIcon,   label: 'Pending',   cssClass: 'scan-status--pending' },
  running:   { Icon: StatusRunningIcon,   label: 'Running',   cssClass: 'scan-status--running' },
  success:   { Icon: StatusActiveIcon,    label: 'Success',   cssClass: 'scan-status--success' },
};

// ── Provider label map ────────────────────────────────────────────────────────

export const PROVIDER_LABELS: Record<CloudProvider, string> = {
  aws:     'AWS',
  gcp:     'GCP',
  azure:   'Azure',
  entraId: 'Entra ID',
};

// ── Filter groups ─────────────────────────────────────────────────────────────

export const SCAN_FILTER_GROUPS = [
  {
    id: 'provider',
    label: 'Provider',
    type: 'multi-select' as const,
    options: [
      { value: 'aws',     label: 'AWS' },
      { value: 'gcp',     label: 'GCP' },
      { value: 'azure',   label: 'Azure' },
      { value: 'entraId', label: 'Entra ID' },
    ],
  },
  {
    id: 'status',
    label: 'Status',
    type: 'multi-select' as const,
    options: [
      { value: 'failed',    label: 'Failed' },
      { value: 'completed', label: 'Completed' },
      { value: 'pending',   label: 'Pending' },
      { value: 'running',   label: 'Running' },
      { value: 'success',   label: 'Success' },
    ],
  },
];
