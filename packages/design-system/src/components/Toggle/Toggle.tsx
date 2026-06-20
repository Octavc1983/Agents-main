import React, { useState, type ChangeEvent } from 'react';
import './Toggle.scss';

export interface ToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  labelLeft?: string;
  labelRight?: string;
  onChange?: (checked: boolean, e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  defaultChecked = false,
  disabled = false,
  labelLeft,
  labelRight,
  onChange,
  className,
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (!isControlled) setInternalChecked(e.target.checked);
    onChange?.(e.target.checked, e);
  };

  const hasLabels = labelLeft || labelRight;

  return (
    <label
      className={['toggle', disabled ? 'toggle--disabled' : '', hasLabels ? 'toggle--labeled' : '', className].filter(Boolean).join(' ')}
    >
      {labelLeft && (
        <span className={['toggle__label', 'toggle__label--left', !isChecked ? 'toggle__label--active' : ''].filter(Boolean).join(' ')}>
          {labelLeft}
        </span>
      )}

      <span className="toggle__track-wrap">
        <input
          id={id}
          type="checkbox"
          role="switch"
          className="toggle__input"
          checked={isChecked}
          disabled={disabled}
          onChange={handleChange}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-checked={isChecked}
        />
        <span className="toggle__track" aria-hidden="true">
          <span className="toggle__thumb" />
        </span>
      </span>

      {labelRight && (
        <span className={['toggle__label', 'toggle__label--right', isChecked ? 'toggle__label--active' : ''].filter(Boolean).join(' ')}>
          {labelRight}
        </span>
      )}
    </label>
  );
};
