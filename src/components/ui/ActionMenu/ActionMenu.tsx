import React, { useRef, useEffect } from 'react';
import './ActionMenu.scss';

export interface ActionMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

export interface ActionMenuProps {
  items: ActionMenuItem[];
  onClose?: () => void;
  className?: string;
  'aria-label'?: string;
}

export const ActionMenu: React.FC<ActionMenuProps> = ({
  items,
  onClose,
  className,
  'aria-label': ariaLabel = 'Action menu',
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (onClose && ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', keyHandler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', keyHandler);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      className={['action-menu', className || ''].filter(Boolean).join(' ')}
      role="menu"
      aria-label={ariaLabel}
    >
      {items.map(item => (
        <button
          key={item.id}
          type="button"
          role="menuitem"
          className={[
            'action-menu__item',
            item.selected ? 'action-menu__item--selected' : '',
            item.disabled ? 'action-menu__item--disabled' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={item.disabled ? undefined : item.onClick}
          disabled={item.disabled}
          aria-disabled={item.disabled}
          aria-pressed={item.selected}
        >
          {item.icon && (
            <span className="action-menu__item-icon" aria-hidden="true">
              {item.icon}
            </span>
          )}
          <span className="action-menu__item-label">{item.label}</span>
        </button>
      ))}
    </div>
  );
};
