import React from 'react';
import './LoadingState.scss';

export interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading...', className }) => (
  <div className={['loading-state', className || ''].filter(Boolean).join(' ')} role="status" aria-live="polite" aria-label={message}>
    <div className="loading-state__spinner" aria-hidden="true" />
    <p className="loading-state__message">{message}</p>
  </div>
);
