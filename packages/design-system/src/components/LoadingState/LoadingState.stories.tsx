import type { Meta, StoryObj } from '@storybook/react';
import { LoadingState } from './LoadingState';

const meta: Meta<typeof LoadingState> = {
  title: 'Components/LoadingState',
  component: LoadingState,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof LoadingState>;

export const Default: Story  = { args: {} };
export const WithLabel: Story = { args: { label: 'Loading users…' } };
export const Fullpage: Story  = {
  args: { label: 'Loading page…' },
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <div style={{ height: '100vh', background: '#0F1827', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <LoadingState {...args} />
    </div>
  ),
};
