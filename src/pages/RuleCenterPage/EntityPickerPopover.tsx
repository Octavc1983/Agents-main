import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import type { RuleEntityType } from './RuleCenterPage.types';
import { RULE_ENTITY_OPTIONS } from '../../mock/ruleCenterMockData';

interface EntityPickerPopoverProps {
  anchorRect: DOMRect;
  onSelect: (entity: RuleEntityType) => void;
  onClose: () => void;
}

const POPOVER_WIDTH = 260;

export const EntityPickerPopover: React.FC<EntityPickerPopoverProps> = ({
  anchorRect,
  onSelect,
  onClose,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Position: below the anchor button, right-aligned
  const top  = anchorRect.bottom + 6;
  let   left = anchorRect.right - POPOVER_WIDTH;
  if (left < 8) left = 8;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', keyHandler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', keyHandler);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div
      ref={ref}
      className="rc-entity-picker"
      style={{ top, left, width: POPOVER_WIDTH }}
      role="menu"
      aria-label="Select entity type"
    >
      {RULE_ENTITY_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className="rc-entity-picker__item"
          role="menuitem"
          onClick={() => { onSelect(opt.value); onClose(); }}
        >
          {opt.label}
        </button>
      ))}
    </div>,
    document.body,
  );
};
