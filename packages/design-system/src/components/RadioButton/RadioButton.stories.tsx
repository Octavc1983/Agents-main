import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RadioButton } from './RadioButton';

const meta: Meta<typeof RadioButton> = {
  title: 'Components/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof RadioButton>;

export const Default: Story  = { args: { label: 'Option A', value: 'a', name: 'demo' } };
export const Checked: Story  = { args: { label: 'Selected', value: 'b', name: 'demo', checked: true } };
export const Disabled: Story = { args: { label: 'Disabled', value: 'c', name: 'demo', disabled: true } };

export const Group: Story = {
  render: () => {
    const [val, setVal] = useState('b');
    const options = [
      { value: 'a', label: 'Administrator' },
      { value: 'b', label: 'Standard User' },
      { value: 'c', label: 'Viewer' },
      { value: 'd', label: 'Disabled option', disabled: true },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {options.map(o => (
          <RadioButton
            key={o.value}
            name="role"
            value={o.value}
            label={o.label}
            checked={val === o.value}
            disabled={o.disabled}
            onChange={() => !o.disabled && setVal(o.value)}
          />
        ))}
      </div>
    );
  },
};
