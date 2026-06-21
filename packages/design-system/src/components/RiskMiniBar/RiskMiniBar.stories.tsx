import type { Meta, StoryObj } from '@storybook/react';
import { RiskMiniBar } from './RiskMiniBar';

const meta: Meta<typeof RiskMiniBar> = {
  title: 'Components/RiskMiniBar',
  component: RiskMiniBar,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
export default meta;

type Story = StoryObj<typeof RiskMiniBar>;

export const Default: Story = {
  args: {
    label: 'Users',
    totalLabel: '3,241 findings',
    segments: [
      { severity: 'critical', count: 512 },
      { severity: 'high',     count: 897 },
      { severity: 'medium',   count: 1124 },
      { severity: 'low',      count: 708 },
    ],
  },
};

export const CriticalHeavy: Story = {
  args: {
    label: 'Applications',
    segments: [
      { severity: 'critical', count: 1620 },
      { severity: 'high',     count: 410 },
      { severity: 'medium',   count: 180 },
    ],
  },
};

export const AllCategories: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', padding: '16px', background: '#17243b' }}>
      {[
        { label: 'Users',              segments: [{ severity: 'critical' as const, count: 512 }, { severity: 'high' as const, count: 897 }] },
        { label: 'Cloud entitlements', segments: [{ severity: 'critical' as const, count: 780 }, { severity: 'medium' as const, count: 520 }] },
        { label: 'Cloud infra access', segments: [{ severity: 'critical' as const, count: 940 }, { severity: 'high' as const, count: 660 }] },
        { label: 'Applications',       segments: [{ severity: 'critical' as const, count: 1620 }, { severity: 'high' as const, count: 410 }] },
        { label: 'Secrets',            segments: [{ severity: 'critical' as const, count: 287 }, { severity: 'high' as const, count: 511 }, { severity: 'medium' as const, count: 330 }] },
        { label: 'Workloads',          segments: [{ severity: 'critical' as const, count: 110 }, { severity: 'low' as const, count: 340 }] },
        { label: 'AI agents',          segments: [{ severity: 'critical' as const, count: 640 }, { severity: 'high' as const, count: 280 }] },
      ].map(item => (
        <RiskMiniBar key={item.label} label={item.label} segments={item.segments} />
      ))}
    </div>
  ),
};
