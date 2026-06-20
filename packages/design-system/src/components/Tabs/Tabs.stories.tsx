import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { HorizontalTabs } from './HorizontalTabs';

const TABS = [
  { id: 'overview',  label: 'Overview' },
  { id: 'activity',  label: 'Activity' },
  { id: 'settings',  label: 'Settings' },
  { id: 'disabled',  label: 'Disabled', disabled: true },
];

const meta: Meta<typeof HorizontalTabs> = {
  title: 'Components/Tabs',
  component: HorizontalTabs,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof HorizontalTabs>;

export const Default: Story = { args: { items: TABS, defaultActiveId: 'overview' } };

export const Controlled: Story = {
  render: () => {
    const [active, setActive] = useState('overview');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '500px' }}>
        <HorizontalTabs items={TABS} activeId={active} onChange={setActive} />
        <p style={{ color: '#BBC2D0', fontSize: '14px', margin: 0 }}>Active tab: <strong style={{ color: '#fff' }}>{active}</strong></p>
      </div>
    );
  },
};
