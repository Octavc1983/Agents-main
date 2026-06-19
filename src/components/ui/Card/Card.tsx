/**
 * Card Component
 * Supports both legacy CardVariant props and new IDIRA ICardVariant / ICardBackground.
 * When Infra Design System is integrated, replace with DS Card.
 */

import React from 'react';
import type { ICardVariant, ICardBackground } from '../../../types/prototype.types';
import './Card.scss';

// ── Legacy props (backward compat) ────────────────────────────────────────────

export interface LegacyCardProps {
  variant?: 'default' | 'elevated' | 'outlined';
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

// ── IDIRA Card props ───────────────────────────────────────────────────────────

export interface CardProps {
  /** Visual state */
  state?: ICardVariant;
  /** Background style */
  background?: ICardBackground;
  /** Fixed 180×150 from spec, or free-form */
  size?: 'fixed' | 'auto';
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  'aria-label'?: string;
  // Legacy compat
  title?: string;
  subtitle?: string;
}

export const Card: React.FC<CardProps> = ({
  state = 'default',
  background = 'solid',
  size = 'fixed',
  onClick,
  children,
  className,
  'aria-label': ariaLabel,
  title,
  subtitle,
}) => {
  const cls = [
    'icard',
    `icard--${state}`,
    `icard--bg-${background}`,
    size === 'fixed' ? 'icard--fixed' : 'icard--auto',
    onClick ? 'icard--interactive' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cls}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={ariaLabel}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); } : undefined}
    >
      {(title || subtitle) && (
        <div className="icard__header">
          {title && <span className="icard__title">{title}</span>}
          {subtitle && <span className="icard__subtitle">{subtitle}</span>}
        </div>
      )}
      {children && <div className="icard__content">{children}</div>}
      {!children && !title && (
        <span className="icard__placeholder" aria-hidden="true">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M4 0L5.5 3H8L5.75 4.75 6.5 7.5 4 6 1.5 7.5 2.25 4.75 0 3H2.5L4 0Z"
              stroke="currentColor" strokeWidth="0.8" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </div>
  );
};
