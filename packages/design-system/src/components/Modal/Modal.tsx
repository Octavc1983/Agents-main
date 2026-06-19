import React, { useEffect, useRef, useId, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { ModalProps } from './Modal.types';
import './Modal.scss';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function getFocusable(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE));
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  size = 'medium',
  closeOnBackdropClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  isLoading = false,
  children,
  footer,
  ariaLabel,
  id: idProp,
}) => {
  const autoId = useId();
  const id = idProp ?? autoId.replace(/:/g, '');
  const titleId = `${id}-title`;
  const descId = `${id}-desc`;

  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);

  // Remember what had focus before opening
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement;
    }
  }, [isOpen]);

  // Focus first focusable element inside modal when it opens
  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;
    const focusable = getFocusable(dialogRef.current);
    if (focusable.length) {
      focusable[0].focus();
    } else {
      dialogRef.current.focus();
    }
  }, [isOpen]);

  // Restore focus on close
  useEffect(() => {
    if (!isOpen && triggerRef.current instanceof HTMLElement) {
      triggerRef.current.focus();
    }
  }, [isOpen]);

  // Prevent background scroll
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [isOpen]);

  // Escape key
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && closeOnEscape) {
      e.stopPropagation();
      onClose();
      return;
    }
    // Focus trap
    if (e.key === 'Tab' && dialogRef.current) {
      const focusable = getFocusable(dialogRef.current);
      if (!focusable.length) { e.preventDefault(); return; }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
  }, [closeOnEscape, onClose]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) onClose();
  }, [closeOnBackdropClick, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
      aria-hidden="false"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descId : undefined}
        aria-label={!title ? ariaLabel : undefined}
        className={`modal modal--${size}`}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        {/* ── Header ── */}
        {(title || showCloseButton) && (
          <div className="modal__header">
            <div className="modal__title-group">
              {title && <h2 id={titleId} className="modal__title">{title}</h2>}
              {description && <p id={descId} className="modal__description">{description}</p>}
            </div>
            {showCloseButton && (
              <button
                type="button"
                className="modal__close"
                onClick={onClose}
                aria-label="Close dialog"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M12.667 3.33325L3.33362 12.6666M3.33362 3.33325L12.667 12.6666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* ── Body ── */}
        <div className="modal__body">
          {isLoading ? (
            <div className="modal__loading">
              <span className="modal__spinner" aria-hidden="true" />
              <span>Loading…</span>
            </div>
          ) : children}
        </div>

        {/* ── Footer ── */}
        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
};
