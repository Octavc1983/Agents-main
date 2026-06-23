import React, { useEffect, useRef, useCallback } from 'react';
import { ErrorCircleIcon, WarningIcon, CheckCircleIcon, CloseSmIcon } from '@idira/design-system/icons';
import { RULE_BUILDER_STRINGS as S } from '../../RuleBuilderPage.strings';
import type { RuleValidationPopoverProps } from './RuleValidationPopover.types';
import './RuleValidationPopover.scss';

// ── Helpers ───────────────────────────────────────────────────────────────────

function getPopoverTitle(issueCount: number, warningCount: number): string {
  if (issueCount > 0 && warningCount > 0) return S.popoverTitleMixed(issueCount, warningCount);
  if (issueCount > 0) return S.popoverTitleIssues(issueCount);
  if (warningCount > 0) return S.popoverTitleWarnings(warningCount);
  return S.popoverTitleValid;
}

// ── RuleValidationPopover ─────────────────────────────────────────────────────

export const RuleValidationPopover: React.FC<RuleValidationPopoverProps> = ({
  isOpen,
  triggerRef,
  issueCount,
  warningCount,
  issues,
  broadScopeWarning,
  onClose,
  onSelectNode,
}) => {
  const panelRef    = useRef<HTMLDivElement>(null);
  const closeRef    = useRef<HTMLButtonElement>(null);
  const hasErrors   = issueCount > 0;
  const hasWarnings = warningCount > 0;
  const isAllValid  = !hasErrors && !hasWarnings;

  // ── Escape key closes popover ──────────────────────────────────────────────

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler, { capture: true });
    return () => document.removeEventListener('keydown', handler, { capture: true });
  }, [isOpen, onClose, triggerRef]);

  // ── Focus close button on open ─────────────────────────────────────────────

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => { closeRef.current?.focus(); }, 0);
    }
  }, [isOpen]);

  // ── Close on outside click ─────────────────────────────────────────────────

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, onClose, triggerRef]);

  const handleIssueClick = useCallback((nodeId: string) => {
    onClose();
    onSelectNode(nodeId);
  }, [onClose, onSelectNode]);

  const handleCloseClick = useCallback(() => {
    onClose();
    triggerRef.current?.focus();
  }, [onClose, triggerRef]);

  if (!isOpen) return null;

  const title = getPopoverTitle(issueCount, warningCount);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="false"
      aria-label={title}
      className="rb-vpopover"
    >
      {/* Header */}
      <div className="rb-vpopover__header">
        <div className="rb-vpopover__header-left">
          {hasErrors   && <span className="rb-vpopover__header-icon rb-vpopover__header-icon--error"   aria-hidden="true"><ErrorCircleIcon size={14} /></span>}
          {!hasErrors && hasWarnings && <span className="rb-vpopover__header-icon rb-vpopover__header-icon--warning" aria-hidden="true"><WarningIcon     size={14} /></span>}
          {isAllValid  && <span className="rb-vpopover__header-icon rb-vpopover__header-icon--valid"   aria-hidden="true"><CheckCircleIcon  size={14} /></span>}
          <span className="rb-vpopover__title">{title}</span>
        </div>
        <button
          ref={closeRef}
          type="button"
          className="rb-vpopover__close"
          aria-label={S.popoverClose}
          onClick={handleCloseClick}
        >
          <CloseSmIcon size={14} />
        </button>
      </div>

      {/* Body */}
      <div className="rb-vpopover__body">
        {isAllValid && (
          <p className="rb-vpopover__all-valid">{S.popoverBodyValid}</p>
        )}

        {/* Error issues */}
        {issues.filter((i) => !i.isWarning).map((issue, idx) => (
          <button
            key={`${issue.branchId}-${issue.kind}-${idx}`}
            type="button"
            className="rb-vpopover__issue rb-vpopover__issue--error"
            onClick={() => handleIssueClick(issue.conditionId)}
          >
            <span className="rb-vpopover__issue-icon" aria-hidden="true">
              <ErrorCircleIcon size={12} />
            </span>
            <span className="rb-vpopover__issue-content">
              <span className="rb-vpopover__issue-node">
                {issue.nodeType}
                {issue.nodeSummary && (
                  <span className="rb-vpopover__issue-node-summary"> — {issue.nodeSummary}</span>
                )}
              </span>
              <span className="rb-vpopover__issue-problem">{issue.problem}</span>
              <span className="rb-vpopover__issue-next">{issue.nextAction}</span>
            </span>
          </button>
        ))}

        {/* Warning issues */}
        {issues.filter((i) => i.isWarning).map((issue, idx) => (
          <button
            key={`${issue.branchId}-${issue.kind}-warn-${idx}`}
            type="button"
            className="rb-vpopover__issue rb-vpopover__issue--warning"
            onClick={() => handleIssueClick(issue.conditionId)}
          >
            <span className="rb-vpopover__issue-icon" aria-hidden="true">
              <WarningIcon size={12} />
            </span>
            <span className="rb-vpopover__issue-content">
              <span className="rb-vpopover__issue-node">{issue.nodeType}</span>
              <span className="rb-vpopover__issue-problem">{issue.problem}</span>
              <span className="rb-vpopover__issue-next">{issue.nextAction}</span>
            </span>
          </button>
        ))}

        {/* Broad scope warning */}
        {broadScopeWarning && (
          <div className="rb-vpopover__issue rb-vpopover__issue--warning rb-vpopover__issue--static">
            <span className="rb-vpopover__issue-icon" aria-hidden="true">
              <WarningIcon size={12} />
            </span>
            <span className="rb-vpopover__issue-content">
              <span className="rb-vpopover__issue-problem">{broadScopeWarning}</span>
              <span className="rb-vpopover__issue-next">{S.popoverNextBroadScope}</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
