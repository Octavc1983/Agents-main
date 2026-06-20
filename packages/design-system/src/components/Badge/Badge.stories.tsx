import type { Meta, StoryObj } from '@storybook/react';
import { Badge, SeverityBadge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    color:   { control: 'select', options: ['critical','high','medium','low','info','success','warning','neutral'] },
    variant: { control: 'select', options: ['fill','stroke','subtle'] },
  },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = { args: { label: 'Neutral', color: 'neutral' } };
export const Critical: Story = { args: { label: 'Critical', color: 'critical' } };
export const Success: Story  = { args: { label: 'Success',  color: 'success' } };
export const Warning: Story  = { args: { label: 'Warning',  color: 'warning' } };

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
      {(['critical','high','medium','low','info','success','warning','neutral'] as const).map(c => (
        <Badge key={c} label={c} color={c} />
      ))}
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
      {(['fill','stroke','subtle'] as const).map(v => (
        <Badge key={v} label={v} color="critical" variant={v} />
      ))}
    </div>
  ),
};

export const Severity: StoryObj<typeof SeverityBadge> = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      {(['critical','high','medium','low'] as const).map(s => (
        <SeverityBadge key={s} severity={s} />
      ))}
    </div>
  ),
};
