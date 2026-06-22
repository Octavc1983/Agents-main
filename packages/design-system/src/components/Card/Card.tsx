import React from 'react';
import './Card.scss';

export type CardVariant = 'default' | 'hover' | 'selected' | 'light';
export type CardBackground = 'solid' | 'gradient-light-to-dark' | 'gradient-dark-to-light';

export interface CardProps {
  state?: CardVariant;
  background?: CardBackground;
  size?: 'fixed' | 'medium' | 'auto';
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  'aria-label'?: string;
  title?: string;
  subtitle?: string;
}

export const Card: React.FC<CardProps> = ({
  state = 'default', background = 'solid', size = 'fixed', onClick,
  children, className, 'aria-label': ariaLabel, title, subtitle,
}) => {
  const sizeClass = size === 'fixed' ? 'icard--fixed' : size === 'medium' ? 'icard--medium' : 'icard--auto';
  const cls = ['icard', `icard--${state}`, `icard--bg-${background}`, sizeClass, onClick ? 'icard--interactive' : '', className].filter(Boolean).join(' ');
  return (
    <div className={cls} onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined} aria-label={ariaLabel}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); } : undefined}>
      {(title || subtitle) && (
        <div className="icard__header">
          {title && <span className="icard__title">{title}</span>}
          {subtitle && <span className="icard__subtitle">{subtitle}</span>}
        </div>
      )}
      {children && <div className="icard__content">{children}</div>}
    </div>
  );
};
