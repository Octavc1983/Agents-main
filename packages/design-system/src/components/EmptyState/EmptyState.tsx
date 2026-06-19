import React from 'react';
import './EmptyState.scss';

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description, icon, action, className }) => (
  <div className={['empty-state', className || ''].filter(Boolean).join(' ')}>
    {icon && <div className="empty-state__icon" aria-hidden="true">{icon}</div>}
    <h3 className="empty-state__title">{title}</h3>
    {description && <p className="empty-state__description">{description}</p>}
    {action && <div className="empty-state__action">{action}</div>}
  </div>
);
