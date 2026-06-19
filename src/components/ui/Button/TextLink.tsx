import React from 'react';
import './TextLink.scss';

export interface TextLinkProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

export const TextLink: React.FC<TextLinkProps> = ({
  children,
  href,
  onClick,
  disabled = false,
  iconLeft,
  iconRight,
  className,
  'aria-label': ariaLabel,
}) => {
  const cls = [
    'text-link',
    disabled ? 'text-link--disabled' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  if (href && !disabled) {
    return (
      <a className={cls} href={href} aria-label={ariaLabel}>
        {iconLeft && <span className="text-link__icon" aria-hidden="true">{iconLeft}</span>}
        <span className="text-link__label">{children}</span>
        {iconRight && <span className="text-link__icon" aria-hidden="true">{iconRight}</span>}
      </a>
    );
  }

  return (
    <button
      className={cls}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      type="button"
      aria-label={ariaLabel}
    >
      {iconLeft && <span className="text-link__icon" aria-hidden="true">{iconLeft}</span>}
      <span className="text-link__label">{children}</span>
      {iconRight && <span className="text-link__icon" aria-hidden="true">{iconRight}</span>}
    </button>
  );
};
