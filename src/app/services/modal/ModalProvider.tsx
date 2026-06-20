import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button } from '@idira/design-system';
import { modalService } from './ModalService';
import type { ActiveModal, FormDialogContentProps, SystemNoticeConfig } from './modal.types';

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

const TONE_COLORS: Record<NonNullable<SystemNoticeConfig['tone']>, string> = {
  neutral:     '#7a80ff',
  info:        '#3E68FF',
  success:     '#00C898',
  warning:     '#FFB45D',
  destructive: '#F22267',
};

const SystemNoticeRenderer: React.FC<{
  modal: Extract<ActiveModal, { kind: 'notice' }>;
  onClose: () => void;
}> = ({ modal, onClose }) => {
  const { config } = modal;
  const [isConfirming, setIsConfirming] = useState(false);

  const accentColor = TONE_COLORS[config.tone ?? 'neutral'];

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
        <span style={{ color: accentColor, display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
      )}
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
    </>
  );
};
