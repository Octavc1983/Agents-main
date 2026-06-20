import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: ['active', 'paused', 'failed', 'done'] },
    value:  { control: { type: 'range', min: 0, max: 100 } },
  },
};
export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = { args: { value: 45, label: 'Migration progress' } };
export const WithPercentage: Story = { args: { value: 72, label: 'Upload', showPercentage: true } };
export const Done: Story    = { args: { value: 100, status: 'done',   label: 'Complete',   showPercentage: true } };
export const Paused: Story  = { args: { value: 60,  status: 'paused', label: 'Paused',     showPercentage: true } };
export const Failed: Story  = { args: { value: 38,  status: 'failed', label: 'Failed',     showPercentage: true } };

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '480px' }}>
      {(['active', 'paused', 'failed', 'done'] as const).map(s => (
        <ProgressBar key={s} value={s === 'done' ? 100 : 60} status={s} label={s} showPercentage />
      ))}
    </div>
  ),
};
