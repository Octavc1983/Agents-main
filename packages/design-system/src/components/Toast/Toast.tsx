import React, { useEffect, type ReactNode } from 'react';
import './Toast.scss';

export type ToastVariant = 'success' | 'info' | 'warning' | 'error' | 'service-move';

export interface ToastProps {
  variant: ToastVariant;
  title: string;
  subtitle?: string;
  onClose?: () => void;
  linkText?: string;
  onLinkClick?: () => void;
  autoCloseMs?: number;
  className?: string;
  children?: ReactNode;
}

const SuccessIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 12.5L10.5 15L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const InfoIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12.2422 17V12C12.2422 11.5286 12.2422 11.2929 12.0957 11.1464C11.9493 11 11.7136 11 11.2422 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11.992 8H12.001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const WarningIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5.82171 9.18293C8.23539 4.91199 9.44222 2.77651 11.0983 2.22681C12.0093 1.9244 12.9907 1.9244 13.9017 2.22681C15.5578 2.77651 16.7646 4.91199 19.1783 9.18293C21.592 13.4539 22.7988 15.5893 22.4368 17.3293C22.2376 18.2866 21.7469 19.1549 21.035 19.8097C19.741 21 17.3274 21 12.5 21C7.67265 21 5.25897 21 3.96496 19.8097C3.25308 19.1549 2.76239 18.2866 2.56322 17.3293C2.20119 15.5893 3.40803 13.4539 5.82171 9.18293Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 13L12 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11.992 16H12.001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ErrorIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M14.9994 15L9 9M9.00064 15L15 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const ServiceMoveIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M13 19.2559C12.4477 19.2559 12 18.8081 12 18.2559C12 17.7036 12.4477 17.2559 13 17.2559L17.5 17.2559L17.5 16.6616C17.4999 16.486 17.4997 16.2703 17.5218 16.0939C17.538 15.9641 17.6098 15.388 18.1754 15.1137C18.7422 14.8387 19.2424 15.1407 19.3506 15.206L19.819 15.5451C20.1949 15.8397 20.7093 16.2454 21.1003 16.6259C21.2954 16.8157 21.4967 17.033 21.6555 17.2639C21.7967 17.4691 22 17.8193 22 18.25C22 18.6807 21.7967 19.0309 21.6555 19.2361C21.4967 19.467 21.2954 19.6843 21.1003 19.8741C20.7093 20.2546 20.1949 20.6602 19.8191 20.9549L19.3506 21.294C19.2424 21.3593 18.7422 21.6613 18.1754 21.3863C17.6098 21.112 17.538 20.5359 17.5222 20.4095L17.5218 20.4061C17.4997 20.2297 17.4999 20.014 17.5 19.8384L17.5 19.2559H13Z" fill="currentColor" />
    <path d="M13.0288 2H10.9712C9.02294 2 7.45141 2 6.21533 2.17961C4.92535 2.3671 3.8568 2.76781 3.01802 3.6746C2.18949 4.57031 1.83279 5.69272 1.66416 7.04866C1.49997 8.36894 1.49998 10.0541 1.5 12.1739V12.8261C1.49998 14.9459 1.49997 16.6311 1.66416 17.9513C1.83279 19.3073 2.18949 20.4297 3.01802 21.3254C3.8568 22.2322 4.92535 22.6329 6.21533 22.8204C7.45142 23.0001 9.02293 23 10.9712 23H11.05C11.6023 23 12.05 22.5523 12.05 22C12.05 21.4477 11.6023 21 11.05 21C9.00425 21 7.57858 20.9975 6.503 20.8412C5.4647 20.6903 4.89956 20.4142 4.48622 19.9673C4.06263 19.5094 3.79327 18.8656 3.64887 17.7045C3.50182 16.5221 3.5 14.9616 3.5 12.7568V12.2432C3.5 10.1384 3.50182 8.57785 3.64887 7.39549C3.79327 6.23444 4.06263 5.59063 4.48622 5.1327C4.89956 4.68585 5.4647 4.4097 6.503 4.25879C7.57858 4.10254 9.00425 4.1 11.05 4.1H12.95C14.9957 4.1 16.4214 4.10254 17.497 4.25879C18.5353 4.4097 19.1004 4.68585 19.5138 5.1327C19.9374 5.59063 20.2067 6.23444 20.3511 7.39549C20.4983 8.57785 20.5 10.1384 20.5 12.2432V13C20.5 13.5523 20.9477 14 21.5 14C22.0523 14 22.5 13.5523 22.5 13V12.1739C22.5002 10.0541 22.5002 8.36894 22.3358 7.04866C22.1672 5.69272 21.8105 4.57031 20.982 3.6746C20.1432 2.76781 19.0747 2.3671 17.7847 2.17961C16.5486 2 14.9771 2 13.0288 2Z" fill="currentColor" />
  </svg>
);

const VARIANT_ICONS: Record<ToastVariant, React.FC> = {
  success: SuccessIcon,
  info: InfoIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  'service-move': ServiceMoveIcon,
};

export const Toast: React.FC<ToastProps> = ({
  variant,
  title,
  subtitle,
  onClose,
  linkText,
  onLinkClick,
  autoCloseMs,
  className,
  children,
}) => {
  useEffect(() => {
    if (!autoCloseMs || !onClose) return;
    const id = setTimeout(onClose, autoCloseMs);
    return () => clearTimeout(id);
  }, [autoCloseMs, onClose]);

  const Icon = VARIANT_ICONS[variant];
  const isServiceMove = variant === 'service-move';

  return (
    <div
      className={['toast', `toast--${variant}`, className].filter(Boolean).join(' ')}
      role="alert"
      aria-live="polite"
    >
      <span className="toast__icon"><Icon /></span>
      <div className="toast__content">
        {isServiceMove ? (
          <p className="toast__text">
            <strong className="toast__title">{title}</strong>
            {subtitle && <span className="toast__subtitle"> {subtitle}</span>}
            {linkText && (
              <>
                {' '}
                <button type="button" className="toast__link" onClick={onLinkClick}>
                  {linkText}
                </button>
              </>
            )}
          </p>
        ) : (
          <>
            <p className="toast__title">{title}</p>
            {subtitle && <p className="toast__subtitle">{subtitle}</p>}
            {children}
          </>
        )}
      </div>
      {onClose && (
        <button type="button" className="toast__close" onClick={onClose} aria-label="Dismiss">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M12.667 3.333L3.334 12.667M3.334 3.333L12.667 12.667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
};

// ── ToastContainer ─────────────────────────────────────────────────────────────

export interface ToastItem extends ToastProps {
  id: string;
}

export interface ToastContainerProps {
  toasts: ToastItem[];
  onClose: (id: string) => void;
  position?: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';
  className?: string;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onClose,
  position = 'top-right',
  className,
}) => {
  if (toasts.length === 0) return null;

  return (
    <div className={['toast-container', `toast-container--${position}`, className].filter(Boolean).join(' ')} aria-live="polite" aria-atomic="false">
      {toasts.map(({ id, ...props }) => (
        <Toast key={id} {...props} onClose={() => onClose(id)} />
      ))}
    </div>
  );
};
