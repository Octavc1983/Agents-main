import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button } from '@idira/design-system';
import { modalService } from './ModalService';
import type { ActiveModal, FormDialogContentProps } from './modal.types';
import '../../../prototype-templates/ConfirmationDialogTemplate/ConfirmationDialogTemplate.scss';
import './ModalProvider.scss';

// ── Form Dialog Renderer ──────────────────────────────────────────────────────

const FormDialogRenderer: React.FC<{
  modal: Extract<ActiveModal, { kind: 'form' }>;
  onClose: () => void;
}> = ({ modal, onClose }) => {
  const { config } = modal;
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (data: unknown) => {
    if (!config.onSubmit) { onClose(); return; }
    setIsSaving(true);
    setError(null);
    try {
      await config.onSubmit(data);
      config.onSuccess?.(data);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }, [config, onClose]);

  const handleCancel = useCallback(() => {
    config.onCancel?.();
    onClose();
  }, [config, onClose]);

  const ContentComponent = config.content as React.ComponentType<FormDialogContentProps<unknown>>;

  return (
    <Modal
      isOpen
      onClose={handleCancel}
      title={config.title}
      description={config.description}
      size={config.size}
      showCloseButton={config.showCloseButton ?? true}
      closeOnBackdropClick={!config.preventCloseWhenDirty}
      closeOnEscape={!config.preventCloseWhenDirty}
    >
      <ContentComponent
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSaving={isSaving}
        error={error}
      />
    </Modal>
  );
};

// ── System Notice Renderer ────────────────────────────────────────────────────

// DS GAP-004: No semantic token exists for the "neutral notice" accent shade (#7a80ff).
// neutral is mapped to "info" treatment (closest approved DS semantic treatment) until
// $color-notice-accent-neutral is approved. See .claude/architecture/decisions/DS-GAP-004.md.

const SystemNoticeRenderer: React.FC<{
  modal: Extract<ActiveModal, { kind: 'notice' }>;
  onClose: () => void;
}> = ({ modal, onClose }) => {
  const { config } = modal;
  const [isConfirming, setIsConfirming] = useState(false);

  const tone = config.tone ?? 'neutral';
  // neutral maps to info (closest existing DS semantic treatment — see DS GAP-004)
  const accentTone = tone === 'neutral' ? 'info' : tone;

  const handleConfirm = useCallback(async () => {
    if (!config.onConfirm) { onClose(); return; }
    setIsConfirming(true);
    try {
      await config.onConfirm();
      onClose();
    } finally {
      setIsConfirming(false);
    }
  }, [config, onClose]);

  const handleCancel = useCallback(() => {
    config.onCancel?.();
    onClose();
  }, [config, onClose]);

  const footer = (
    <>
      {config.secondaryActionLabel && (
        <Button variant="ghost" size="sm" onClick={handleCancel} disabled={isConfirming}>
          {config.secondaryActionLabel}
        </Button>
      )}
      {config.primaryActionLabel && (
        <Button
          variant={config.tone === 'destructive' ? 'danger' : 'primary'}
          size="sm"
          onClick={handleConfirm}
          disabled={isConfirming}
        >
          {isConfirming ? 'Processing…' : config.primaryActionLabel}
        </Button>
      )}
    </>
  );

  return (
    <Modal
      isOpen
      onClose={handleCancel}
      title={config.title}
      description={typeof config.description === 'string' ? config.description : undefined}
      size={config.size}
      showCloseButton={config.isDismissible ?? true}
      closeOnBackdropClick={config.isDismissible ?? true}
      closeOnEscape={config.isDismissible ?? true}
      footer={footer}
    >
      {typeof config.description !== 'string' && config.description ? (
        config.description
      ) : (
        <span className={`modal-notice-icon modal-notice-icon--${accentTone}`}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
      )}
    </Modal>
  );
};

// ── Confirmation Dialog Renderer ──────────────────────────────────────────────

const ConfirmationDialogRenderer: React.FC<{
  modal: Extract<ActiveModal, { kind: 'confirmation' }>;
  onClose: () => void;
}> = ({ modal, onClose }) => {
  const { config } = modal;
  const [isConfirming, setIsConfirming] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const [isAcknowledged, setIsAcknowledged] = useState(false);

  const handleConfirm = useCallback(async () => {
    if (isConfirming) return;
    setIsConfirming(true);
    setHasFailed(false);
    try {
      await config.confirmAction();
      onClose();
    } catch {
      setHasFailed(true);
    } finally {
      setIsConfirming(false);
    }
  }, [config, isConfirming, onClose]);

  const handleCancel = useCallback(() => {
    if (isConfirming) return;
    config.onCancel?.();
    onClose();
  }, [config, isConfirming, onClose]);

  const isConfirmDisabled =
    isConfirming ||
    (config.requiresAcknowledgment === true && !isAcknowledged);

  const isDestructive = config.variant === 'destructive';

  const footer = (
    <>
      <Button
        variant="secondary"
        size="sm"
        onClick={handleCancel}
        disabled={isConfirming}
      >
        {config.cancelLabel ?? 'Cancel'}
      </Button>
      <Button
        variant={isDestructive ? 'danger' : 'primary'}
        size="sm"
        onClick={handleConfirm}
        disabled={isConfirmDisabled}
      >
        {isConfirming ? 'Processing…' : config.confirmLabel}
      </Button>
    </>
  );

  return (
    <Modal
      isOpen
      onClose={handleCancel}
      title={config.title}
      size="small"
      showCloseButton={!(config.isBlocking ?? false)}
      closeOnBackdropClick={!(config.isBlocking ?? false)}
      closeOnEscape={!(config.isBlocking ?? false)}
      footer={footer}
    >
      <div className="conf-dlg__body">
        <p className="conf-dlg__description">{config.description}</p>

        {config.affectedItems && config.affectedItems.length > 0 && (
          <ul className="conf-dlg__affected-list" aria-label="Affected items">
            {config.affectedItems.map(item => (
              <li key={item.id} className="conf-dlg__affected-item">{item.label}</li>
            ))}
          </ul>
        )}

        {config.requiresAcknowledgment && config.acknowledgmentLabel && (
          <label className="conf-dlg__acknowledgment">
            <input
              type="checkbox"
              checked={isAcknowledged}
              onChange={e => setIsAcknowledged(e.target.checked)}
              disabled={isConfirming}
              className="conf-dlg__acknowledgment-checkbox"
            />
            <span>{config.acknowledgmentLabel}</span>
          </label>
        )}

        {hasFailed && (
          <p className="conf-dlg__error" role="alert">
            The action could not be completed. Please try again.
          </p>
        )}
      </div>
    </Modal>
  );
};

// ── ModalProvider ─────────────────────────────────────────────────────────────

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [active, setActive] = useState<ActiveModal | null>(null);

  useEffect(() => {
    return modalService.subscribe(setActive);
  }, []);

  const handleClose = useCallback(() => {
    modalService.close();
  }, []);

  return (
    <>
      {children}
      {active?.kind === 'form' && (
        <FormDialogRenderer modal={active} onClose={handleClose} />
      )}
      {active?.kind === 'notice' && (
        <SystemNoticeRenderer modal={active} onClose={handleClose} />
      )}
      {active?.kind === 'confirmation' && (
        <ConfirmationDialogRenderer modal={active} onClose={handleClose} />
      )}
    </>
  );
};
