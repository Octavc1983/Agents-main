/**
 * Card Component - Placeholder for Infra Design System
 * 
 * Note: This is a local placeholder component.
 * When Infra Design System is integrated, replace with:
 * import { Card } from '@infra/design-system';
 */

import type React from 'react';
import type { CardProps } from '../../../types/prototype.types';
import './Card.scss';

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  title,
  subtitle,
  children,
  className,
}) => {
  return (
    <div className={`card card--${variant} ${className || ''}`}>
      {(title || subtitle) && (
        <div className="card__header">
          {title && <h3 className="card__title">{title}</h3>}
          {subtitle && <p className="card__subtitle">{subtitle}</p>}
        </div>
      )}
      <div className="card__content">{children}</div>
    </div>
  );
};
