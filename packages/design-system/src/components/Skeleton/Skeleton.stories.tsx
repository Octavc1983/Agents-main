import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['text', 'rect', 'circle'] },
  },
};
export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Text: Story   = { args: { variant: 'text',   width: 240 } };
export const Rect: Story   = { args: { variant: 'rect',   width: 240, height: 80 } };
export const Circle: Story = { args: { variant: 'circle', width: 40,  height: 40 } };
export const MultiLine: Story = { args: { variant: 'text', lines: 4, width: '100%' } };

export const CardSkeleton: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '320px', padding: '20px', background: '#17243b', borderRadius: '8px' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Skeleton variant="circle" width={40} height={40} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>
      <Skeleton variant="rect" width="100%" height={120} />
      <Skeleton variant="text" lines={3} width="100%" />
    </div>
  ),
};
