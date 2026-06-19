import React from 'react';
import './IconButton.scss';

export interface IconButtonProps {
  icon: React.ReactNode;
  iconSize?: 16 | 24 | 32;
  state?: 'idle' | 'hover' | 'pressed' | 'selected' | 'disabled';
  onClick?: () => void;
  'aria-label': string;
  className?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  iconSize = 24,
  state = 'idle',
  onClick,
  'aria-label': ariaLabel,
  className,
}) => {
  const isDisabled = state === 'disabled';
  return (
    <button
      className={['icon-btn', `icon-btn--${iconSize}`, `icon-btn--${state}`, className || ''].filter(Boolean).join(' ')}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-pressed={state === 'selected' ? true : undefined}
      type="button"
    >
      <span className="icon-btn__icon" aria-hidden="true">{icon}</span>
    </button>
  );
};
