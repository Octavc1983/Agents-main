import React, { type ReactNode, type FC } from 'react';
import './SystemMessage.scss';

export type SystemMessageVariant = 'confirmation' | 'information' | 'success' | 'warning' | 'fail';

export interface SystemMessageAction {
  label: string;
  variant?: 'primary' | 'secondary' | 'text';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

export interface SystemMessageProps {
  variant: SystemMessageVariant;
  title: string;
  children?: ReactNode;
  onClose?: () => void;
  showCloseButton?: boolean;
  actions?: SystemMessageAction[];
  className?: string;
}

const ConfirmationIcon: FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 8.84615C10 7.82655 10.8954 7 12 7C13.1046 7 14 7.82655 14 8.84615C14 9.21368 13.8837 9.55612 13.6831 9.84381C13.0854 10.7012 12 11.5189 12 12.5385V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11.992 16H12.001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const InformationIcon: FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12.2422 17V12C12.2422 11.5286 12.2422 11.2929 12.0957 11.1464C11.9493 11 11.7136 11 11.2422 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11.992 8H12.001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SuccessIcon: FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 12.5L10.5 15L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WarningIcon: FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5.82171 9.18293C8.23539 4.91199 9.44222 2.77651 11.0983 2.22681C12.0093 1.9244 12.9907 1.9244 13.9017 2.22681C15.5578 2.77651 16.7646 4.91199 19.1783 9.18293C21.592 13.4539 22.7988 15.5893 22.4368 17.3293C22.2376 18.2866 21.7469 19.1549 21.035 19.8097C19.741 21 17.3274 21 12.5 21C7.67265 21 5.25897 21 3.96496 19.8097C3.25308 19.1549 2.76239 18.2866 2.56322 17.3293C2.20119 15.5893 3.40803 13.4539 5.82171 9.18293Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11.992 16H12.001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 13L12 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FailIcon: FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M14.9994 15L9 9M9.00064 15L15 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const ICONS: Record<SystemMessageVariant, FC> = {
  confirmation: ConfirmationIcon,
  information: InformationIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  fail: FailIcon,
};

export const SystemMessage: React.FC<SystemMessageProps> = ({
  variant,
  title,
  children,
  onClose,
  showCloseButton = true,
  actions = [],
  className,
}) => {
  const Icon = ICONS[variant];

  return (
    <div className={['system-message', `system-message--${variant}`, className].filter(Boolean).join(' ')} role="dialog" aria-modal="false">
      <div className="system-message__header">
        <span className="system-message__icon" aria-hidden="true">
          <Icon />
        </span>
        <span className="system-message__title">{title}</span>
        {showCloseButton && onClose && (
          <button type="button" className="system-message__close" onClick={onClose} aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M12.667 3.333L3.334 12.667M3.334 3.333L12.667 12.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      <div className="system-message__accent" aria-hidden="true" />

      {children && (
        <div className="system-message__body">{children}</div>
      )}

      {actions.length > 0 && (
        <div className="system-message__footer">
          {actions.map((action, i) => (
            <button
              key={i}
              type={action.type ?? 'button'}
              className={`system-message__action system-message__action--${action.variant ?? 'primary'}`}
              onClick={action.onClick}
              disabled={action.disabled}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
