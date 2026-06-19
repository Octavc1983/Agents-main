import React, { useState } from 'react';
import './SplitButton.scss';

export interface SplitButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onLabelClick?: () => void;
  onArrowClick?: () => void;
  arrowIcon?: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

const DefaultChevron = (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SplitButton: React.FC<SplitButtonProps> = ({
  label,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onLabelClick,
  onArrowClick,
  arrowIcon,
  className,
  'aria-label': ariaLabel,
}) => {
  const [labelHovered, setLabelHovered] = useState(false);
  const [arrowHovered, setArrowHovered] = useState(false);

  return (
    <div
      className={['split-btn', `split-btn--${variant}`, `split-btn--${size}`, disabled ? 'split-btn--disabled' : '', className || ''].filter(Boolean).join(' ')}
      role="group"
      aria-label={ariaLabel || label}
    >
      <button
        className={['split-btn__label', labelHovered ? 'split-btn__label--hover' : ''].filter(Boolean).join(' ')}
        onClick={disabled ? undefined : onLabelClick}
        disabled={disabled}
        type="button"
        onMouseEnter={() => setLabelHovered(true)}
        onMouseLeave={() => setLabelHovered(false)}
      >
        <span>{label}</span>
      </button>
      <span className="split-btn__divider" aria-hidden="true" />
      <button
        className={['split-btn__arrow', arrowHovered ? 'split-btn__arrow--hover' : ''].filter(Boolean).join(' ')}
        onClick={disabled ? undefined : onArrowClick}
        disabled={disabled}
        type="button"
        aria-label="More options"
        aria-haspopup="true"
        onMouseEnter={() => setArrowHovered(true)}
        onMouseLeave={() => setArrowHovered(false)}
      >
        {arrowIcon || DefaultChevron}
      </button>
    </div>
  );
};
