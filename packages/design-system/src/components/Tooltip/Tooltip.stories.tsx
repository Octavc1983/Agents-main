import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    disabled:  { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: { content: 'This is a tooltip', placement: 'top' },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="secondary">Hover me</Button>
    </Tooltip>
  ),
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', padding: '60px', justifyContent: 'center', flexWrap: 'wrap' }}>
      {(['top','right','bottom','left'] as const).map(p => (
        <Tooltip key={p} content={`Placed ${p}`} placement={p}>
          <Button variant="secondary">{p}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Tooltip content="This is a longer tooltip message that explains what this action does in more detail." placement="top">
      <Button variant="secondary">More info</Button>
    </Tooltip>
  ),
};
