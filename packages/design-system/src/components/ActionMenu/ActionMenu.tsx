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
  items, onClose, className, 'aria-label': ariaLabel = 'Action menu',
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (onClose && ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && onClose) onClose(); };
    document.addEventListener('mousedown', handleMouse);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleMouse);
      document.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <div ref={ref} className={['action-menu', className || ''].filter(Boolean).join(' ')} role="menu" aria-label={ariaLabel}>
      {items.map(item => (
        <button
          key={item.id}
          type="button"
          role="menuitem"
          className={['action-menu__item', item.selected ? 'action-menu__item--selected' : '', item.disabled ? 'action-menu__item--disabled' : ''].filter(Boolean).join(' ')}
          onClick={item.disabled ? undefined : item.onClick}
          disabled={item.disabled}
        >
          {item.icon && <span className="action-menu__item-icon" aria-hidden="true">{item.icon}</span>}
          <span className="action-menu__item-label">{item.label}</span>
        </button>
      ))}
    </div>
  );
};
