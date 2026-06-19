import React from 'react';
import './Chip.scss';

export interface ChipProps {
  label: string;
  onRemove?: () => void;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
}

export const Chip: React.FC<ChipProps> = ({ label, onRemove, disabled = false, className, 'aria-label': ariaLabel }) => {
  return (
    <span
      className={['chip', disabled ? 'chip--disabled' : '', className || ''].filter(Boolean).join(' ')}
      aria-label={ariaLabel}
    >
      <span className="chip__label">{label}</span>
      {onRemove && (
        <button
          type="button"
          className="chip__remove"
          onClick={disabled ? undefined : onRemove}
          disabled={disabled}
          aria-label={`Remove ${label}`}
          tabIndex={disabled ? -1 : 0}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M2 2L8 8M8 2L2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </span>
  );
};

export interface ChipOverflowProps {
  count: number;
  className?: string;
}

export const ChipOverflow: React.FC<ChipOverflowProps> = ({ count, className }) => (
  <span className={['chip chip--overflow', className || ''].filter(Boolean).join(' ')}>
    <span className="chip__label">+{count}</span>
  </span>
);
