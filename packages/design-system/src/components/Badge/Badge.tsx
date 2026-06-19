import React from 'react';
import './Badge.scss';

export type BadgeColor = 'critical' | 'high' | 'medium' | 'low' | 'info' | 'success' | 'warning' | 'neutral';
export type BadgeVariant = 'fill' | 'stroke' | 'subtle';

export interface BadgeProps {
  label: string;
  color?: BadgeColor;
  variant?: BadgeVariant;
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  label, color = 'neutral', variant = 'fill', className, icon,
}) => {
  return (
    <span className={['badge', `badge--${color}`, `badge--${variant}`, className || ''].filter(Boolean).join(' ')}>
      {icon && <span className="badge__icon" aria-hidden="true">{icon}</span>}
      <span className="badge__label">{label}</span>
    </span>
  );
};

export interface SeverityBadgeProps {
  severity: 'critical' | 'high' | 'medium' | 'low';
  variant?: BadgeVariant;
  className?: string;
}

const SEVERITY_LABELS: Record<SeverityBadgeProps['severity'], string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({ severity, variant = 'fill', className }) => (
  <Badge label={SEVERITY_LABELS[severity]} color={severity} variant={variant} className={className} />
);
