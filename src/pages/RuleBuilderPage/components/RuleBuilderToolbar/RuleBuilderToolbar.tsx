import React, { useCallback, useRef, useState } from 'react';
import {
  ZoomInIcon,
  ZoomOutIcon,
  FitToViewIcon,
  EditIcon,
  WarningIcon,
  ErrorCircleIcon,
  CheckCircleIcon,
  DraftFileIcon,
} from '@idira/design-system/icons';
import { RULE_BUILDER_STRINGS as S } from '../../RuleBuilderPage.strings';
import type { RuleBuilderToolbarProps } from './RuleBuilderToolbar.types';
import type { RuleBuilderCanvasState } from '../../RuleBuilderPage.types';
import './RuleBuilderToolbar.scss';

// ── Undo / Redo SVG icons (micro-size, not domain-specific — would be DS if available) ───

const UndoIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3.5 5H9.5C11.157 5 12.5 6.343 12.5 8C12.5 9.657 11.157 11 9.5 11H5.5"
      stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.5 3L3.5 5L5.5 7"
      stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RedoIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M12.5 5H6.5C4.843 5 3.5 6.343 3.5 8C3.5 9.657 4.843 11 6.5 11H10.5"
      stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.5 3L12.5 5L10.5 7"
      stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Validation trigger badge ───────────────────────────────────────────────────

interface ValidationBadgeProps {
  issueCount:         number;
  warningCount:       number;
  hasTriggered:       boolean;
  canvasState:        RuleBuilderCanvasState;
  isOpen:             boolean;
  triggerRef:         React.RefObject<HTMLButtonElement>;
  onToggle:           () => void;
}

const ValidationBadge: React.FC<ValidationBadgeProps> = ({
  issueCount, warningCount, hasTriggered, canvasState, isOpen, triggerRef, onToggle,
}) => {
  const isSaving      = canvasState === 'saving' || canvasState === 'activating';
  const isActive      = canvasState === 'active';
  const isSaved       = canvasState === 'saved';
  const isFailed      = canvasState === 'save-failed' || canvasState === 'activation-failed';
  const hasErrors     = hasTriggered && issueCount > 0;
  const hasWarnings   = hasTriggered && warningCount > 0 && issueCount === 0;
  const isValid       = hasTriggered && issueCount === 0 && warningCount === 0;

  let label: string;
  let badgeClass: string;
  let Icon: React.FC<{ size?: number }> | null = null;

  if (isSaving) {
    label     = canvasState === 'saving' ? S.statusSaving : S.statusActivating;
    badgeClass = 'rb-toolbar__badge--saving';
  } else if (isActive) {
    label     = S.statusActive;
    badgeClass = 'rb-toolbar__badge--active';
    Icon      = CheckCircleIcon;
  } else if (isSaved) {
    label     = S.statusSaved;
    badgeClass = 'rb-toolbar__badge--saved';
    Icon      = CheckCircleIcon;
  } else if (isFailed) {
    label     = canvasState === 'save-failed' ? S.statusSaveFailed : S.statusActivationFailed;
    badgeClass = 'rb-toolbar__badge--failed';
    Icon      = ErrorCircleIcon;
  } else if (hasErrors) {
    const n = issueCount;
    label     = `${n} ${n === 1 ? S.statusIssue : S.statusIssues}`;
    badgeClass = 'rb-toolbar__badge--error';
    Icon      = ErrorCircleIcon;
  } else if (hasWarnings) {
    const n = warningCount;
    label     = `${n} ${n === 1 ? S.statusWarning : S.statusWarnings}`;
    badgeClass = 'rb-toolbar__badge--warning';
    Icon      = WarningIcon;
  } else if (isValid) {
    label     = S.statusReady;
    badgeClass = 'rb-toolbar__badge--valid';
    Icon      = CheckCircleIcon;
  } else {
    label     = S.statusDraft;
    badgeClass = 'rb-toolbar__badge--draft';
    Icon      = DraftFileIcon;
  }

  const isClickable = hasErrors || hasWarnings || isValid;

  return (
    <button
      ref={triggerRef}
      type="button"
      className={[
        'rb-toolbar__badge',
        badgeClass,
        isOpen ? 'rb-toolbar__badge--open' : '',
        !isClickable ? 'rb-toolbar__badge--static' : '',
      ].filter(Boolean).join(' ')}
      onClick={isClickable ? onToggle : undefined}
      aria-label={S.validationStatusLabel}
      aria-expanded={isClickable ? isOpen : undefined}
      aria-haspopup={isClickable ? 'dialog' : undefined}
      disabled={isSaving}
    >
      {Icon && <Icon size={14} />}
      <span>{label}</span>
    </button>
  );
};

// ── Inline title editor ───────────────────────────────────────────────────────

interface TitleEditorProps {
  title:        string;
  onCommit:     (next: string) => void;
}

const TitleEditor: React.FC<TitleEditorProps> = ({ title, onCommit }) => {
  const [editing, setEditing]   = useState(false);
  const [draft, setDraft]       = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  const startEdit = useCallback(() => {
    setDraft(title);
    setEditing(true);
    setTimeout(() => { inputRef.current?.select(); }, 0);
  }, [title]);

  const commit = useCallback(() => {
    const trimmed = draft.trim() || S.defaultTitle;
    setEditing(false);
    onCommit(trimmed);
  }, [draft, onCommit]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') commit();
    if (e.key === 'Escape') { setEditing(false); setDraft(title); }
  }, [commit, title]);

  if (editing) {
    return (
      <input
        ref={inputRef}
        type="text"
        className="rb-toolbar__title-input"
        value={draft}
        aria-label={S.titleInputLabel}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={handleKeyDown}
        maxLength={120}
      />
    );
  }

  return (
    <button type="button" className="rb-toolbar__title-btn" onClick={startEdit} aria-label={S.editTitleLabel}>
      <span className="rb-toolbar__title-text">{title || S.defaultTitle}</span>
      <span className="rb-toolbar__title-edit-icon" aria-hidden="true">
        <EditIcon size={14} />
      </span>
    </button>
  );
};

// ── Primary action button ─────────────────────────────────────────────────────

interface PrimaryActionProps {
  canvasState: RuleBuilderCanvasState;
  onSaveDraft: () => void;
  onActivate:  () => void;
}

const PrimaryAction: React.FC<PrimaryActionProps> = ({ canvasState, onSaveDraft, onActivate }) => {
  if (canvasState === 'active') {
    return (
      <button type="button" className="rb-toolbar__btn rb-toolbar__btn--primary" disabled>
        {S.activeLabel}
      </button>
    );
  }
  if (canvasState === 'activating') {
    return (
      <button type="button" className="rb-toolbar__btn rb-toolbar__btn--primary" disabled>
        {S.activatingLabel}
      </button>
    );
  }
  if (canvasState === 'saving') {
    return (
      <button type="button" className="rb-toolbar__btn rb-toolbar__btn--secondary" disabled>
        {S.savingLabel}
      </button>
    );
  }
  if (canvasState === 'read-only') {
    return null;
  }

  const saveBtnLabel =
    canvasState === 'saved'        ? S.savedLabel :
    canvasState === 'save-failed'  ? S.saveFailedLabel :
    S.saveDraftLabel;

  const activateLabel =
    canvasState === 'activation-failed' ? S.activationFailedLabel : S.activateLabel;

  return (
    <>
      <button
        type="button"
        className="rb-toolbar__btn rb-toolbar__btn--secondary"
        onClick={onSaveDraft}
        disabled={canvasState === 'saved'}
      >
        {saveBtnLabel}
      </button>
      <button
        type="button"
        className="rb-toolbar__btn rb-toolbar__btn--primary"
        onClick={onActivate}
      >
        {activateLabel}
      </button>
    </>
  );
};

// ── RuleBuilderToolbar ────────────────────────────────────────────────────────

export const RuleBuilderToolbar: React.FC<RuleBuilderToolbarProps> = ({
  title, canvasState, onCommitTitle,
  canUndo, canRedo, onUndo, onRedo,
  issueCount, warningCount, hasValidationBeenTriggered,
  isValidationPopoverOpen, validationTriggerRef, onToggleValidation,
  onCancel, onSaveDraft, onActivate,
  zoomPercent, onZoomIn, onZoomOut, onFitCanvas,
}) => (
  <div className="rb-toolbar" role="toolbar" aria-label="Rule builder toolbar">
    {/* Left — title + history */}
    <div className="rb-toolbar__left">
      <TitleEditor title={title} onCommit={onCommitTitle} />

      <div className="rb-toolbar__divider" aria-hidden="true" />

      <button
        type="button"
        className="rb-toolbar__icon-btn"
        aria-label={S.undoLabel}
        disabled={!canUndo}
        onClick={onUndo}
      >
        <UndoIcon />
      </button>
      <button
        type="button"
        className="rb-toolbar__icon-btn"
        aria-label={S.redoLabel}
        disabled={!canRedo}
        onClick={onRedo}
      >
        <RedoIcon />
      </button>
    </div>

    {/* Center — validation badge */}
    <div className="rb-toolbar__center">
      <ValidationBadge
        issueCount={issueCount}
        warningCount={warningCount}
        hasTriggered={hasValidationBeenTriggered}
        canvasState={canvasState}
        isOpen={isValidationPopoverOpen}
        triggerRef={validationTriggerRef}
        onToggle={onToggleValidation}
      />
    </div>

    {/* Right — zoom + cancel + save/activate */}
    <div className="rb-toolbar__right">
      <div className="rb-toolbar__zoom-group">
        <button type="button" className="rb-toolbar__icon-btn" aria-label={S.zoomOutLabel} onClick={onZoomOut}>
          <ZoomOutIcon size={16} />
        </button>
        <span className="rb-toolbar__zoom-pct">{zoomPercent}%</span>
        <button type="button" className="rb-toolbar__icon-btn" aria-label={S.zoomInLabel} onClick={onZoomIn}>
          <ZoomInIcon size={16} />
        </button>
        <button type="button" className="rb-toolbar__icon-btn" aria-label={S.fitLabel} onClick={onFitCanvas}>
          <FitToViewIcon size={16} />
        </button>
      </div>

      <div className="rb-toolbar__divider" aria-hidden="true" />

      {canvasState !== 'active' && canvasState !== 'read-only' && (
        <button type="button" className="rb-toolbar__btn rb-toolbar__btn--ghost" onClick={onCancel}>
          {S.cancelLabel}
        </button>
      )}
      <PrimaryAction canvasState={canvasState} onSaveDraft={onSaveDraft} onActivate={onActivate} />
    </div>
  </div>
);
