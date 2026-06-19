import React from 'react';
import './Button.scss';

// Supports both IDIRA variants (main/secondary/text) and legacy names (primary/tertiary/danger)
type ButtonVariantAll = 'main' | 'secondary' | 'text' | 'primary' | 'tertiary' | 'danger';
type ButtonSizeAll = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariantAll;
  size?: ButtonSizeAll;
  disabled?: boolean;
  isLoading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'main',
  size = 'md',
  disabled = false,
  isLoading = false,
  iconLeft,
  iconRight,
  onClick,
  children,
  className,
  type = 'button',
  'aria-label': ariaLabel,
}) => {
  const isDisabled = disabled || isLoading;

  // Map legacy variant names to IDIRA names
  const resolvedVariant =
    variant === 'primary' ? 'main' :
    variant === 'tertiary' || variant === 'danger' ? 'secondary' :
    variant || 'main';

  return (
    <button
      className={[
        'btn',
        `btn--${resolvedVariant}`,
        `btn--${size}`,
        isDisabled ? 'btn--disabled' : '',
        isLoading ? 'btn--loading' : '',
        className || '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      type={type}
      aria-label={ariaLabel}
      aria-busy={isLoading || undefined}
    >
      {iconLeft && <span className="btn__icon btn__icon--left" aria-hidden="true">{iconLeft}</span>}
      <span className="btn__label">{isLoading ? 'Loading…' : children}</span>
      {iconRight && !isLoading && (
        <span className="btn__icon btn__icon--right" aria-hidden="true">{iconRight}</span>
      )}
    </button>
  );
};
