/**
 * EmptyState Component
 * Displays when there is no content to show
 */

import type React from 'react';
import type { EmptyStateProps } from '../../../types/prototype.types';
import './EmptyState.scss';

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  className,
}) => {
  return (
    <div className={`empty-state ${className || ''}`}>
      {icon && <div className="empty-state__icon">{icon}</div>}
      <h3 className="empty-state__title">{title}</h3>
      {description && <p className="empty-state__description">{description}</p>}
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  );
};
