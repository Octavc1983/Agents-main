import React from 'react';
import './FilterButton.scss';

export interface FilterButtonProps {
  label?: string;
  icon?: React.ReactNode;
  state?: 'default' | 'hover' | 'pressed' | 'selected' | 'disabled';
  onClick?: () => void;
  className?: string;
  'aria-label'?: string;
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  label = 'Filter',
  icon,
  state = 'default',
  onClick,
  className,
  'aria-label': ariaLabel,
}) => {
  const isDisabled = state === 'disabled';
  return (
    <button
      className={['filter-btn', `filter-btn--${state}`, className || ''].filter(Boolean).join(' ')}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      aria-label={ariaLabel || label}
      aria-pressed={state === 'selected' ? true : undefined}
      type="button"
    >
      {icon && <span className="filter-btn__icon" aria-hidden="true">{icon}</span>}
      {label && <span className="filter-btn__label">{label}</span>}
    </button>
  );
};
