import React, { useState } from 'react';
import { Modal, Button } from '@idira/design-system';

interface ResolveScanIssuesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResolve: () => void;
}

export const ResolveScanIssuesModal: React.FC<ResolveScanIssuesModalProps> = ({
  isOpen,
  onClose,
  onResolve,
}) => {
  const [isAgreed, setIsAgreed] = useState(false);

  const handleClose = () => {
    setIsAgreed(false);
    onClose();
  };

  const handleResolve = () => {
    if (!isAgreed) return;
    setIsAgreed(false);
    onResolve();
  };

  const footer = (
    <>
      <Button variant="secondary" size="sm" onClick={handleClose}>
        Cancel
      </Button>
      <Button
        variant="primary"
        size="sm"
        onClick={handleResolve}
        disabled={!isAgreed}
      >
        Resolve
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Resolve scan issues"
      size="small"
      showCloseButton
      closeOnBackdropClick
      closeOnEscape
      footer={footer}
    >
      <div className="resolve-modal__body">
        <p className="resolve-modal__text">
          The system can resolve issues automatically.
        </p>
        <p className="resolve-modal__text">
          By agreeing, you authorize the system to install required third-party
          items and configure settings when the next scan runs.
        </p>
        <label className="resolve-modal__consent">
          <input
            type="checkbox"
            className="resolve-modal__checkbox"
            checked={isAgreed}
            onChange={e => setIsAgreed(e.target.checked)}
          />
          <span>agree to allow the system to resolve issues automatically.</span>
        </label>
        <p className="resolve-modal__text">
          The changes will apply when the next scan runs.
        </p>
        <p className="resolve-modal__text resolve-modal__text--link-row">
          For more information, see{' '}
          <button type="button" className="resolve-modal__link">
            What can be fix
          </button>
          .
        </p>
      </div>
    </Modal>
  );
};
