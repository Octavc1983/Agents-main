import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    state:      { control: 'select', options: ['default', 'hover', 'selected', 'light'] },
    size:       { control: 'select', options: ['fixed', 'auto'] },
    background: { control: 'select', options: ['solid', 'gradient-light-to-dark', 'gradient-dark-to-light'] },
  },
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: { title: 'Card title', subtitle: 'Optional subtitle', size: 'auto', children: 'Card body content goes here.' },
};

export const Interactive: Story = {
  args: { title: 'Clickable card', subtitle: 'Click to select', size: 'auto', onClick: () => alert('clicked') },
};

export const Selected: Story = {
  args: { title: 'Selected card', state: 'selected', size: 'auto' },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      {(['default', 'hover', 'selected', 'light'] as const).map(s => (
        <Card key={s} state={s} size="auto" title={`State: ${s}`} subtitle="Subtitle text">
          Card content
        </Card>
      ))}
    </div>
  ),
};
