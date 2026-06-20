import type { FC, ReactNode } from 'react';
import './Footer.scss';

export interface FooterAction {
  label: string;
  variant?: 'primary' | 'secondary' | 'text' | 'danger';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export interface FooterProps {
  actions?: FooterAction[];
  leftContent?: ReactNode;
  embedded?: boolean;
  className?: string;
}

export const Footer: FC<FooterProps> = ({
  actions = [],
  leftContent,
  embedded = false,
  className = '',
}) => (
  <footer
    className={[
      'footer',
      embedded ? 'footer--embedded' : 'footer--page',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
  >
    <div className="footer__left">{leftContent}</div>
    {actions.length > 0 && (
      <div className="footer__actions">
        {actions.map((action, i) => (
          <button
            key={i}
            type={action.type ?? 'button'}
            disabled={action.disabled}
            onClick={action.disabled ? undefined : action.onClick}
            className={[
              'footer-btn',
              `footer-btn--${action.variant ?? 'text'}`,
              action.disabled ? 'footer-btn--disabled' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {action.label}
          </button>
        ))}
      </div>
    )}
  </footer>
);
