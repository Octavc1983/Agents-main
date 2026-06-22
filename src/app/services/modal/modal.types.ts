import type React from 'react';
import type { ModalSize } from '@idira/design-system';

export type ModalTone = 'neutral' | 'warning' | 'destructive' | 'success' | 'info';

// ── Confirmation Dialog ───────────────────────────────────────────────────────

export type ConfirmationDialogVariant =
  | 'destructive'
  | 'warning'
  | 'reset'
  | 'discard'
  | 'standard';

export interface ConfirmationAffectedItem {
  id: string;
  label: string;
}

export interface ConfirmationDialogConfig {
  id: string;
  variant: ConfirmationDialogVariant;

  title: string;
  description: string;

  affectedItems?: ConfirmationAffectedItem[];

  confirmLabel: string;
  cancelLabel?: string;

  confirmAction: () => Promise<void> | void;
  onCancel?: () => void;

  isBlocking?: boolean;
  requiresAcknowledgment?: boolean;
  acknowledgmentLabel?: string;
}

// ── Form Dialog ───────────────────────────────────────────────────────────────

export interface FormDialogConfig<TResult = void> {
  id: string;
  title: string;
  description?: string;
  size?: ModalSize;
  content: React.ComponentType<FormDialogContentProps<TResult>>;
  onSubmit?: (data: TResult) => Promise<void> | void;
  onSuccess?: (data: TResult) => void;
  onCancel?: () => void;
  preventCloseWhenDirty?: boolean;
  showCloseButton?: boolean;
}

export interface FormDialogContentProps<TResult = void> {
  onSubmit: (data: TResult) => void;
  onCancel: () => void;
  isSaving: boolean;
  error?: string | null;
}

// ── System Notice ─────────────────────────────────────────────────────────────

export interface SystemNoticeConfig {
  id: string;
  tone?: ModalTone;
  title: string;
  description?: React.ReactNode;
  size?: ModalSize;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  onConfirm?: () => Promise<void> | void;
  onCancel?: () => void;
  isDismissible?: boolean;
}

// ── Internal modal slot ───────────────────────────────────────────────────────

export type ActiveModal =
  | { kind: 'form'; config: FormDialogConfig<unknown> }
  | { kind: 'notice'; config: SystemNoticeConfig }
  | { kind: 'confirmation'; config: ConfirmationDialogConfig };
