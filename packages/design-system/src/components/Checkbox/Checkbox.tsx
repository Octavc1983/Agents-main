import React, { useId } from 'react';
import './Checkbox.scss';

export interface CheckboxProps {
  label?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  indeterminate?: boolean;
  id?: string;
  name?: string;
  className?: string;
  'aria-label'?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label, checked, defaultChecked, onChange, disabled = false, indeterminate = false,
  id: idProp, name, className, 'aria-label': ariaLabel,
}) => {
  const autoId = useId();
  const id = idProp || autoId;

  const CheckIcon = (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const IndeterminateIcon = (
    <svg width="10" height="2" viewBox="0 0 10 2" fill="none" aria-hidden="true">
      <path d="M1 1H9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );

  return (
    <label className={['checkbox', disabled ? 'checkbox--disabled' : '', className || ''].filter(Boolean).join(' ')} htmlFor={id}>
      <span className="checkbox__box-wrap">
        <input
          id={id}
          name={name}
          type="checkbox"
          className="checkbox__input"
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={e => onChange?.(e.target.checked)}
          disabled={disabled}
          ref={el => { if (el) el.indeterminate = indeterminate; }}
          aria-label={!label ? ariaLabel : undefined}
          aria-checked={indeterminate ? 'mixed' : checked}
        />
        <span className={['checkbox__box', checked || indeterminate ? 'checkbox__box--checked' : ''].filter(Boolean).join(' ')} aria-hidden="true">
          {indeterminate ? IndeterminateIcon : (checked ? CheckIcon : null)}
        </span>
      </span>
      {label && <span className="checkbox__label">{label}</span>}
    </label>
  );
};
