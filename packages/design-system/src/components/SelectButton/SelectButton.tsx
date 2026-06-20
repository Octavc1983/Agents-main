import React, { useState } from 'react';
import './SelectButton.scss';

export type SelectButtonSize = 'large' | 'medium' | 'small';
export type SelectButtonMode = 'single' | 'multiple';

export interface SelectButtonOption {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface SelectButtonProps {
  options: SelectButtonOption[];
  value?: string[];
  defaultValue?: string[];
  mode?: SelectButtonMode;
  size?: SelectButtonSize;
  disabled?: boolean;
  onChange?: (value: string[]) => void;
  className?: string;
}

export const SelectButton: React.FC<SelectButtonProps> = ({
  options,
  value,
  defaultValue = [],
  mode = 'single',
  size = 'medium',
  disabled = false,
  onChange,
  className,
}) => {
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
  const current = value !== undefined ? value : internalValue;

  const handleClick = (id: string, optDisabled?: boolean) => {
    if (disabled || optDisabled) return;

    let next: string[];
    if (mode === 'single') {
      next = current.includes(id) ? [] : [id];
    } else {
      next = current.includes(id)
        ? current.filter(v => v !== id)
        : [...current, id];
    }

    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  };

  return (
    <div
      className={['select-button', `select-button--${size}`, disabled ? 'select-button--disabled' : '', className].filter(Boolean).join(' ')}
      role="group"
    >
      {options.map((opt, index) => {
        const isSelected = current.includes(opt.id);
        const isFirst = index === 0;
        const isLast = index === options.length - 1;
        const isDisabled = disabled || opt.disabled;

        return (
          <button
            key={opt.id}
            type="button"
            className={[
              'select-button__item',
              isSelected ? 'select-button__item--selected' : '',
              isDisabled ? 'select-button__item--disabled' : '',
              isFirst ? 'select-button__item--first' : '',
              isLast ? 'select-button__item--last' : '',
            ].filter(Boolean).join(' ')}
            onClick={() => handleClick(opt.id, opt.disabled)}
            disabled={isDisabled}
            aria-pressed={isSelected}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};
