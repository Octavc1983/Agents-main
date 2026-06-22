import type { ConfirmationDialogConfig } from '../app/services/modal/modal.types';

// ── Discard unsaved configuration ─────────────────────────────────────────────

export const discardUnsavedConfigFixture: ConfirmationDialogConfig = {
  id: 'discard-unsaved-config',
  variant: 'discard',
  title: 'Discard changes?',
  description: 'You have unsaved changes. If you leave now, your changes will be lost.',
  confirmLabel: 'Discard changes',
  cancelLabel: 'Keep editing',
  confirmAction: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
  },
};

// ── Reset migration downstream steps ──────────────────────────────────────────

export const resetMigrationDownstreamFixture: ConfirmationDialogConfig = {
  id: 'reset-migration-downstream',
  variant: 'reset',
  title: 'Reset dependent steps?',
  description:
    'Changing the upload machine will reset the configuration of the steps below. You will need to reconfigure them before continuing.',
  affectedItems: [
    { id: 'configure-dr-server', label: 'Configure DR server' },
    { id: 'configure-upload-server', label: 'Configure upload server' },
    { id: 'test-connectivity', label: 'Test connectivity' },
  ],
  confirmLabel: 'Reset and continue',
  cancelLabel: 'Cancel',
  confirmAction: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
  },
};

// ── Abort migration warning ────────────────────────────────────────────────────

export const abortMigrationFixture: ConfirmationDialogConfig = {
  id: 'abort-migration',
  variant: 'warning',
  title: 'Abort migration?',
  description:
    'The migration is currently in progress. Aborting now may leave the system in a partial state. This action cannot be undone.',
  confirmLabel: 'Abort migration',
  cancelLabel: 'Continue migration',
  isBlocking: true,
  requiresAcknowledgment: true,
  acknowledgmentLabel: 'I understand that aborting may leave the system in an inconsistent state.',
  confirmAction: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
  },
};

// ── Delete single entity ───────────────────────────────────────────────────────

export const deleteSingleEntityFixture: ConfirmationDialogConfig = {
  id: 'delete-single-entity',
  variant: 'destructive',
  title: 'Delete account?',
  description: 'This managed account will be permanently deleted. This action cannot be undone.',
  affectedItems: [{ id: 'acct-001', label: 'prod-db-admin@production' }],
  confirmLabel: 'Delete account',
  cancelLabel: 'Cancel',
  confirmAction: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
  },
};

// ── Delete multiple entities ───────────────────────────────────────────────────

export const deleteMultipleEntitiesFixture: ConfirmationDialogConfig = {
  id: 'delete-multiple-entities',
  variant: 'destructive',
  title: 'Delete 3 accounts?',
  description:
    'These managed accounts will be permanently deleted. This action cannot be undone.',
  affectedItems: [
    { id: 'acct-001', label: 'prod-db-admin@production' },
    { id: 'acct-002', label: 'staging-admin@staging' },
    { id: 'acct-003', label: 'dev-service@development' },
  ],
  confirmLabel: 'Delete 3 accounts',
  cancelLabel: 'Cancel',
  confirmAction: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
  },
};

// ── Continue after readiness warning ──────────────────────────────────────────

export const continueAfterWarningFixture: ConfirmationDialogConfig = {
  id: 'continue-after-readiness-warning',
  variant: 'warning',
  title: 'Continue with warnings?',
  description:
    'Some readiness checks did not pass. Continuing may cause issues during migration. Review the warnings before proceeding.',
  requiresAcknowledgment: true,
  acknowledgmentLabel: 'I have reviewed the warnings and want to continue.',
  confirmLabel: 'Continue anyway',
  cancelLabel: 'Review warnings',
  confirmAction: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
  },
};

// ── Simulated confirmation failure ────────────────────────────────────────────

export const simulatedFailureFixture: ConfirmationDialogConfig = {
  id: 'simulated-failure',
  variant: 'destructive',
  title: 'Delete account (simulated failure)?',
  description: 'This fixture simulates a backend failure on confirmation.',
  affectedItems: [{ id: 'acct-fail', label: 'fail-account@production' }],
  confirmLabel: 'Delete account',
  cancelLabel: 'Cancel',
  confirmAction: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    throw new Error('Simulated backend failure');
  },
};
