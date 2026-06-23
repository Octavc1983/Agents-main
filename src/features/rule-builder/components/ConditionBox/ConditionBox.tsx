import React, { useCallback, useEffect, useRef } from 'react';
import { WarningIcon, ErrorCircleIcon } from '@idira/design-system/icons';
import type {
  ConditionBoxProps,
  ConditionBoxStateSummary,
} from './ConditionBox.types';
import './ConditionBox.scss';

// ── Content strings ───────────────────────────────────────────────────────────
// All user-facing text lives here — not in JSX.

const CONTENT = {
  typeLabel:         'Condition',
  fieldProperty:     'Property',
  fieldOperator:     'Operator',
  fieldValue:        'Value',
  valuePlaceholder:  'Not set',
  operatorPlaceholder: 'Not set',
  menuLabel:         'Condition node actions',
  portInput:         'Condition input',
  portTrue:          'True branch output',
  portFalse:         'False branch output',
  validationFallback: 'This condition has an error. Please review.',
  warningFallback:    'This condition has a warning. Please review.',
} as const;

// ── Localized validation messages ─────────────────────────────────────────────

const VALIDATION_MESSAGES: Record<string, string> = {
  'condition.validation.value_required':    'Enter a value to complete this condition.',
  'condition.validation.operator_required': 'Select an operator to continue.',
  'condition.validation.property_required': 'Select a property to define what this condition checks.',
  'condition.warning.false_branch_missing': 'The False branch has no connection. The rule will stop here when the condition is not met.',
};

function resolveMessage(key: string | undefined, fallback: string): string {
  if (!key) return fallback;
  return VALIDATION_MESSAGES[key] ?? fallback;
}

// ── Icons ─────────────────────────────────────────────────────────────────────
// WarningIcon and ErrorCircleIcon come from the DS icon system.
// MenuDotsIcon is a canvas interaction icon not available in the DS icon set.

const MenuDotsIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="7" cy="2.5" r="1.25" fill="currentColor" />
    <circle cx="7" cy="7"   r="1.25" fill="currentColor" />
    <circle cx="7" cy="11.5" r="1.25" fill="currentColor" />
  </svg>
);

// ── ConditionBox ──────────────────────────────────────────────────────────────

export const ConditionBox: React.FC<ConditionBoxProps> = ({
  data,
  onSelect,
  onMenuOpen,
  onPortClick,
  onStateSummary,
}) => {
  const {
    id,
    status,
    propertyLabel,
    operatorLabel,
    valueLabel,
    hasInputConnection,
    hasTrueConnection,
    hasFalseConnection,
    validationMessageKey,
    warningMessageKey,
    isReadOnly = false,
    isMenuAvailable = true,
  } = data;

  const menuTriggerRef = useRef<HTMLButtonElement>(null);

  const isInvalid  = status === 'invalid';
  const isWarning  = status === 'warning';
  const isSelected = status === 'selected';
  const isDisabled = status === 'disabled';
  const readOnly   = isReadOnly || status === 'read-only';

  // ── Emit state summary upward ──────────────────────────────────────────────

  useEffect(() => {
    const summary: ConditionBoxStateSummary = {
      nodeId: id,
      isValid: status === 'valid' || status === 'selected',
      hasWarning: isWarning,
      hasInputConnection,
      hasTrueConnection,
      hasFalseConnection,
    };
    onStateSummary?.(summary);
  }, [id, status, isWarning, hasInputConnection, hasTrueConnection, hasFalseConnection, onStateSummary]);

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

  const handlePortClick = useCallback(
    (e: React.MouseEvent, port: 'input' | 'true' | 'false') => {
      e.stopPropagation();
      if (readOnly) return;
      onPortClick?.(id, port);
    },
    [id, readOnly, onPortClick],
  );

  // ── Accessible name ────────────────────────────────────────────────────────

  const accessibleName = [
    CONTENT.typeLabel,
    propertyLabel ? `${CONTENT.fieldProperty}: ${propertyLabel}` : '',
    operatorLabel ? `${CONTENT.fieldOperator}: ${operatorLabel}` : '',
    valueLabel    ? `${CONTENT.fieldValue}: ${valueLabel}` : '',
  ].filter(Boolean).join(', ');

  // ── Root class ─────────────────────────────────────────────────────────────

  const rootClass = [
    'condition-box',
    isSelected ? 'condition-box--selected'  : '',
    isInvalid  ? 'condition-box--invalid'   : '',
    isWarning  ? 'condition-box--warning'   : '',
    readOnly   ? 'condition-box--read-only' : '',
    isDisabled ? 'condition-box--disabled'  : '',
  ].filter(Boolean).join(' ');

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div
      className={rootClass}
      aria-label={accessibleName}
      aria-readonly={readOnly || undefined}
      aria-disabled={isDisabled || undefined}
    >
      {/* Selection surface — covers node body, not ports or menu */}
      <div
        className="condition-box__selection-surface"
        role="button"
        tabIndex={readOnly || isDisabled ? -1 : 0}
        onClick={handleBodyClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleBodyClick();
        }}
        aria-label={accessibleName}
      />

      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="condition-box__header">
        <span className="condition-box__type-label">{CONTENT.typeLabel}</span>

        {isMenuAvailable && !readOnly && (
          <button
            ref={menuTriggerRef}
            type="button"
            className="condition-box__menu-trigger"
            aria-label={CONTENT.menuLabel}
            aria-haspopup="menu"
            onClick={handleMenuClick}
          >
            <MenuDotsIcon />
          </button>
        )}
      </div>

      {/* ── Body ────────────────────────────────────────────────────── */}
      <div className="condition-box__body">

        {/* Property */}
        <div className="condition-box__field">
          <span className="condition-box__field-label">{CONTENT.fieldProperty}</span>
          <span className={`condition-box__field-value${!propertyLabel ? ' condition-box__field-value--placeholder' : ''}`}>
            {propertyLabel || CONTENT.valuePlaceholder}
          </span>
        </div>

        {/* Operator */}
        <div className="condition-box__field">
          <span className="condition-box__field-label">{CONTENT.fieldOperator}</span>
          <span className={`condition-box__field-value${!operatorLabel ? ' condition-box__field-value--placeholder' : ''}`}>
            {operatorLabel || CONTENT.operatorPlaceholder}
          </span>
        </div>

        {/* Value — hide when operator does not require a value */}
        {(valueLabel !== undefined || isInvalid) && (
          <div className="condition-box__field">
            <span className="condition-box__field-label">{CONTENT.fieldValue}</span>
            <span className={`condition-box__field-value${!valueLabel ? ' condition-box__field-value--placeholder' : ''}`}>
              {valueLabel || CONTENT.valuePlaceholder}
            </span>
          </div>
        )}

        {/* Validation message */}
        {isInvalid && (
          <div className="condition-box__validation" role="alert">
            <span className="condition-box__validation-icon" aria-hidden="true">
              <ErrorCircleIcon size={12} />
            </span>
            <span className="condition-box__validation-text">
              {resolveMessage(validationMessageKey, CONTENT.validationFallback)}
            </span>
          </div>
        )}

        {/* Warning message */}
        {isWarning && warningMessageKey && (
          <div className="condition-box__validation" role="status">
            <span className="condition-box__validation-icon" aria-hidden="true">
              <WarningIcon size={12} />
            </span>
            <span className="condition-box__validation-text">
              {resolveMessage(warningMessageKey, CONTENT.warningFallback)}
            </span>
          </div>
        )}
      </div>

      {/* ── Input port (left center) ─────────────────────────────────── */}
      <button
        type="button"
        className={`condition-box__port condition-box__input-port${hasInputConnection ? ' condition-box__port--connected' : ''}`}
        aria-label={CONTENT.portInput}
        onClick={(e) => handlePortClick(e, 'input')}
        tabIndex={readOnly ? -1 : 0}
      />

      {/* ── True output port (right upper) ──────────────────────────── */}
      <button
        type="button"
        className={`condition-box__port condition-box__true-output-port${hasTrueConnection ? ' condition-box__port--connected' : ''}`}
        aria-label={CONTENT.portTrue}
        onClick={(e) => handlePortClick(e, 'true')}
        tabIndex={readOnly ? -1 : 0}
      />

      {/* ── False output port (right lower) ─────────────────────────── */}
      <button
        type="button"
        className={`condition-box__port condition-box__false-output-port${hasFalseConnection ? ' condition-box__port--connected' : ''}`}
        aria-label={CONTENT.portFalse}
        onClick={(e) => handlePortClick(e, 'false')}
        tabIndex={readOnly ? -1 : 0}
      />
    </div>
  );
};

export default ConditionBox;
