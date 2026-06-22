/**
 * FullScreenFormTemplate — Page Composition Template
 *
 * Fills the entire Main Content area. AppShell, Sidebar, and Header remain intact.
 * Fixed header + scrollable form body + fixed footer (Cancel | Submit).
 * Supports unsaved-changes guard, read-only state, and loading/submitting state.
 *
 * This is NOT a DS component. It is a prototype-layer template.
 * No inline styles. No new tokens. SVG icons only.
 */

import React from 'react';
import { Button } from '@idira/design-system';
import type { FullScreenFormTemplateProps } from './FullScreenFormTemplate.types';
import './FullScreenFormTemplate.scss';

const LockIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <rect x="2" y="6" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M4.5 6V4.5a2.5 2.5 0 0 1 5 0V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

export const FullScreenFormTemplate: React.FC<FullScreenFormTemplateProps> = ({
  title,
  subtitle,
  onCancel,
  onSubmit,
  submitLabel = 'Save changes',
  cancelLabel = 'Cancel',
  formState = 'ready',
  canSubmit = true,
  isDirty = false,
  isSubmitting = false,
  isReadOnly = false,
  secondaryAction,
  children,
}) => {
  const isSubmitDisabled = !canSubmit || isSubmitting || isReadOnly || formState === 'blocked';
  const resolvedSubmitLabel = isSubmitting ? 'Saving…' : submitLabel;

  return (
    <div className="fsf-tpl">

      {/* ── Fixed header ─────────────────────────────────────────────── */}
      <header className="fsf-tpl__header">
        <div className="fsf-tpl__header-text">
          <h1 className="fsf-tpl__title">{title}</h1>
          {subtitle && <p className="fsf-tpl__subtitle">{subtitle}</p>}
        </div>

        {isReadOnly && (
          <span className="fsf-tpl__readonly-badge">
            <LockIcon />
            Read-only
          </span>
        )}

        {isDirty && !isSubmitting && (
          <span className="fsf-tpl__dirty-indicator" aria-label="Unsaved changes">
            Unsaved changes
          </span>
        )}
      </header>

      {/* ── Scrollable form content ───────────────────────────────────── */}
      <div className="fsf-tpl__content">
        {children}
      </div>

      {/* ── Fixed footer ─────────────────────────────────────────────── */}
      <footer className="fsf-tpl__footer">
        <Button
          variant="text"
          size="sm"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          {cancelLabel}
        </Button>

        <div className="fsf-tpl__footer-actions">
          {secondaryAction}
          <Button
            variant="main"
            size="sm"
            onClick={onSubmit}
            disabled={isSubmitDisabled}
          >
            {resolvedSubmitLabel}
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default FullScreenFormTemplate;
