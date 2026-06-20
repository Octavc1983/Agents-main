import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    disabled:      { control: 'boolean' },
    indeterminate: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story     = { args: { label: 'Accept terms', defaultChecked: false } };
export const Checked: Story     = { args: { label: 'Already checked', checked: true } };
export const Disabled: Story    = { args: { label: 'Disabled', disabled: true } };
export const Indeterminate: Story = { args: { label: 'Indeterminate', indeterminate: true } };

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        label={checked ? 'Checked ✓' : 'Unchecked'}
        checked={checked}
        onChange={setChecked}
      />
    );
  },
};

export const Group: Story = {
  render: () => {
    const [vals, setVals] = useState({ a: false, b: true, c: false });
    const toggle = (k: keyof typeof vals) => setVals(v => ({ ...v, [k]: !v[k] }));
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Checkbox label="Option A" checked={vals.a} onChange={() => toggle('a')} />
        <Checkbox label="Option B" checked={vals.b} onChange={() => toggle('b')} />
        <Checkbox label="Option C" checked={vals.c} onChange={() => toggle('c')} />
      </div>
    );
  },
};
