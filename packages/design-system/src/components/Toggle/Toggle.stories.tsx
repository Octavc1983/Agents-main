import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story   = { args: { labelRight: 'Enable feature', defaultChecked: false } };
export const Checked: Story   = { args: { labelRight: 'Enabled', defaultChecked: true } };
export const Disabled: Story  = { args: { labelRight: 'Disabled', disabled: true } };
export const WithLabels: Story = { args: { labelLeft: 'Off', labelRight: 'On', defaultChecked: false } };

export const Controlled: Story = {
  render: () => {
    const [on, setOn] = useState(false);
    return (
      <Toggle
        checked={on}
        labelRight={on ? 'Dark mode on' : 'Dark mode off'}
        onChange={v => setOn(v)}
      />
    );
  },
};

export const Group: Story = {
  render: () => {
    const features = ['Auto-rotate credentials', 'Session recording', 'Just-in-time access'];
    const [enabled, setEnabled] = useState<Set<string>>(new Set(['Session recording']));
    const toggle = (f: string) => setEnabled(prev => { const n = new Set(prev); n.has(f) ? n.delete(f) : n.add(f); return n; });
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {features.map(f => (
          <Toggle key={f} labelRight={f} checked={enabled.has(f)} onChange={() => toggle(f)} />
        ))}
      </div>
    );
  },
};
