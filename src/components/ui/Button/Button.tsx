/**
 * Button Component - Placeholder for Infra Design System
 * 
 * Note: This is a local placeholder component.
 * When Infra Design System is integrated, replace with:
 * import { Button } from '@infra/design-system';
 * 
 * Supports multiple variants, sizes, and states
 */

import type React from 'react';
import type { ButtonProps } from '../../../types/prototype.types';
import './Button.scss';

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  isLoading = false,
  onClick,
  children,
  className,
}) => {
  return (
    <button
      className={`button button--${variant} button--${size} ${
        disabled ? 'button--disabled' : ''
      } ${isLoading ? 'button--loading' : ''} ${className || ''}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      type="button"
    >
      {isLoading ? <span className="button__loader">Loading...</span> : children}
    </button>
  );
};
