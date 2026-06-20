import React, { type ReactNode } from 'react';
import './Callout.scss';

export type CalloutPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface CalloutProps {
  isOpen?: boolean;
  onClose?: () => void;
  placement?: CalloutPlacement;
  title?: string;
  children?: ReactNode;
  className?: string;
  width?: number | string;
}

export const Callout: React.FC<CalloutProps> = ({
  isOpen = true,
  onClose,
  placement = 'bottom',
  title,
  children,
  className,
  width,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={['callout', `callout--${placement}`, className].filter(Boolean).join(' ')}
      role="dialog"
      aria-modal="false"
      style={width !== undefined ? { width } : undefined}
    >
      {onClose && (
        <button type="button" className="callout__close" onClick={onClose} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M12.667 3.333L3.334 12.667M3.334 3.333L12.667 12.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
      {title && <p className="callout__title">{title}</p>}
      {children && <div className="callout__body">{children}</div>}
      <span className="callout__arrow" aria-hidden="true" />
    </div>
  );
};
