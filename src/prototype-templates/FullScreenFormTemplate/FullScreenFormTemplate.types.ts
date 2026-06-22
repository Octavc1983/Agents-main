import type React from 'react';

export type FormState =
  | 'initial'
  | 'loading'
  | 'ready'
  | 'dirty'
  | 'valid'
  | 'invalid'
  | 'submitting'
  | 'saved'
  | 'save-failed'
  | 'warning'
  | 'blocked'
  | 'unknown-outcome'
  | 'read-only';

export type FormBackBehavior =
  | 'allowed-no-changes'
  | 'confirm-unsaved-changes'
  | 'blocked-during-submit'
  | 'blocked-during-irreversible-operation'
  | 'return-to-origin';

export interface FullScreenFormTemplateProps {
  title: string;
  subtitle?: string;

  // Footer actions
  onCancel: () => void;            // Cancel / Back to origin
  onSubmit: () => void;            // Primary action
  submitLabel?: string;            // default: 'Save changes'
  cancelLabel?: string;            // default: 'Cancel'

  // State controls
  formState?: FormState;           // default: 'ready'
  canSubmit?: boolean;             // default: true; set false to disable primary action
  isDirty?: boolean;               // triggers unsaved-changes guard on cancel/nav-away
  isSubmitting?: boolean;          // disables all footer actions + shows loading label
  isReadOnly?: boolean;            // shows read-only banner; disables submit

  // Optional secondary action (e.g. "Save draft", "Reset")
  secondaryAction?: React.ReactNode;

  children: React.ReactNode;       // form body — rendered in scrollable content region
}
