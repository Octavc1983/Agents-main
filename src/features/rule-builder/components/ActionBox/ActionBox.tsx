import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ErrorCircleIcon, DotsMenuIcon } from '@idira/design-system/icons';
import type {
  ActionBoxProps,
  ActionBoxStateSummary,
} from './ActionBox.types';
import './ActionBox.scss';

// ── Content strings ───────────────────────────────────────────────────────────

const CONTENT = {
  typeLabel:          'Action',
  actionFieldLabel:   'Action',
  actionPlaceholder:  'Not selected',
  menuLabel:          'Action node actions',
  portInput:          'Action input',
  validationFallback: 'Select an action to complete this rule.',
  selectPrompt:       'Select an action',
} as const;

// ── Icons ─────────────────────────────────────────────────────────────────────

const ChevronDownSmIcon: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2.5 4.5L6 7.5L9.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── ActionBox ─────────────────────────────────────────────────────────────────

export const ActionBox: React.FC<ActionBoxProps> = ({
  data,
  actionOptions,
  onSelect,
  onActionChange,
  onMenuOpen,
  onStateSummary,
}) => {
  const {
    id,
    status,
    actionId,
    actionLabel,
    hasInputConnection,
    isMenuAvailable = true,
    isReadOnly = false,
  } = data;

  const menuTriggerRef  = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef     = useRef<HTMLDivElement>(null);

  const isInvalid  = status === 'invalid';
  const isSelected = status === 'selected';
  const isDisabled = status === 'disabled';
  const readOnly   = isReadOnly || status === 'read-only';

  // ── Emit state summary ─────────────────────────────────────────────────────

  useEffect(() => {
    const summary: ActionBoxStateSummary = {
      nodeId:             id,
      isConfigured:       !!actionId,
      hasInputConnection,
    };
    onStateSummary?.(summary);
  }, [id, actionId, hasInputConnection, onStateSummary]);

  // ── Close dropdown on outside click ───────────────────────────────────────

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  // ── Interaction handlers ───────────────────────────────────────────────────

  const handleBodyClick = useCallback(() => {
    if (readOnly || isDisabled) return;
    onSelect?.(id);
  }, [id, readOnly, isDisabled, onSelect]);

  const handleMenuClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const rect = menuTriggerRef.current?.getBoundingClientRect();
    if (rect) onMenuOpen?.(id, rect);
  }, [id, onMenuOpen]);

  const handleActionSelect = useCallback((selectedActionId: string) => {
    setIsOpen(false);
    onActionChange?.(id, selectedActionId);
  }, [id, onActionChange]);

  const handleSelectorClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (readOnly || isDisabled) return;
    setIsOpen((v) => !v);
  }, [readOnly, isDisabled]);

  // ── Accessible name ────────────────────────────────────────────────────────

  const accessibleName = [
    CONTENT.typeLabel,
    actionLabel ? `${CONTENT.actionFieldLabel}: ${actionLabel}` : '',
  ].filter(Boolean).join(', ');

  // ── Root class ─────────────────────────────────────────────────────────────

  const rootClass = [
    'action-box',
    isSelected ? 'action-box--selected'  : '',
    isInvalid  ? 'action-box--invalid'   : '',
    readOnly   ? 'action-box--read-only' : '',
    isDisabled ? 'action-box--disabled'  : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={rootClass}
      aria-label={accessibleName}
      aria-readonly={readOnly || undefined}
      aria-disabled={isDisabled || undefined}
    >
      {/* Selection surface */}
      <div
        className="action-box__selection-surface"
        role="button"
        tabIndex={readOnly || isDisabled ? -1 : 0}
        onClick={handleBodyClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleBodyClick();
        }}
        aria-label={accessibleName}
      />

      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="action-box__header">
        <span className="action-box__type-label">{CONTENT.typeLabel}</span>
        {isMenuAvailable && !readOnly && (
          <button
            ref={menuTriggerRef}
            type="button"
            className="action-box__menu-trigger"
            aria-label={CONTENT.menuLabel}
            aria-haspopup="menu"
            onClick={handleMenuClick}
          >
            <DotsMenuIcon size={14} />
          </button>
        )}
      </div>

      {/* ── Body ────────────────────────────────────────────────────── */}
      <div className="action-box__body">
        <div className="action-box__field" ref={dropdownRef}>
          <span className="action-box__field-label">{CONTENT.actionFieldLabel}</span>
          <button
            type="button"
            className={[
              'action-box__selector',
              !actionId ? 'action-box__selector--placeholder' : '',
              isOpen    ? 'action-box__selector--open' : '',
            ].filter(Boolean).join(' ')}
            onClick={handleSelectorClick}
            disabled={readOnly || isDisabled}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            <span className="action-box__selector-label">
              {actionLabel || CONTENT.actionPlaceholder}
            </span>
            <ChevronDownSmIcon />
          </button>

          {isOpen && (
            <ul
              className="action-box__dropdown"
              role="listbox"
              aria-label={CONTENT.selectPrompt}
            >
              {actionOptions.map((opt) => (
                <li
                  key={opt.id}
                  role="option"
                  aria-selected={opt.id === actionId}
                  className={[
                    'action-box__dropdown-item',
                    opt.id === actionId ? 'action-box__dropdown-item--selected' : '',
                  ].filter(Boolean).join(' ')}
                >
                  <button
                    type="button"
                    className="action-box__dropdown-btn"
                    onClick={() => handleActionSelect(opt.id)}
                  >
                    <span className="action-box__dropdown-label">{opt.label}</span>
                    <span className="action-box__dropdown-desc">{opt.description}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {isInvalid && (
          <div className="action-box__validation" role="alert">
            <span className="action-box__validation-icon" aria-hidden="true">
              <ErrorCircleIcon size={12} />
            </span>
            <span className="action-box__validation-text">{CONTENT.validationFallback}</span>
          </div>
        )}
      </div>

      {/* ── Input port (left center) ─────────────────────────────────── */}
      <div
        className={`action-box__port action-box__input-port${hasInputConnection ? ' action-box__port--connected' : ''}`}
        aria-label={CONTENT.portInput}
        aria-hidden="true"
      />
    </div>
  );
};

export default ActionBox;
