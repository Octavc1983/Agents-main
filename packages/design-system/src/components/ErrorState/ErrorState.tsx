import React from 'react';
import './ErrorState.scss';

export interface ErrorStateProps {
  title: string;
  message?: string;
  action?: React.ReactNode;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ title, message, action, className }) => (
  <div className={['error-state', className || ''].filter(Boolean).join(' ')} role="alert">
    <div className="error-state__icon" aria-hidden="true">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="22" stroke="#F22267" strokeWidth="2" />
        <path d="M24 14v14M24 34h.01" stroke="#F22267" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
    <h3 className="error-state__title">{title}</h3>
    {message && <p className="error-state__message">{message}</p>}
    {action && <div className="error-state__action">{action}</div>}
  </div>
);
