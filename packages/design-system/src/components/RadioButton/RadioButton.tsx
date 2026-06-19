import { type FC, type ChangeEvent, useId } from 'react';
import './RadioButton.scss';

export interface RadioButtonProps {
  label?: string;
  value: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  name?: string;
  onChange?: (value: string, e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const RadioButton: FC<RadioButtonProps> = ({
  label,
  value,
  checked,
  defaultChecked,
  disabled = false,
  name,
  onChange,
  className = '',
}) => {
  const id = useId();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(value, e);
  };

  return (
    <label
      htmlFor={id}
      className={`radio-button${disabled ? ' radio-button--disabled' : ''} ${className}`.trim()}
    >
      <span className="radio-button__control">
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={handleChange}
          className="radio-button__input"
          aria-disabled={disabled}
        />
        <span className="radio-button__circle" aria-hidden="true" />
      </span>
      {label && <span className="radio-button__label">{label}</span>}
    </label>
  );
};
