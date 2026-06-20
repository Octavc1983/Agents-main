import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant:   { control: 'select', options: ['main', 'secondary', 'text'] },
    size:      { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled:  { control: 'boolean' },
    isLoading: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Main: Story      = { args: { variant: 'main',      children: 'Main button' } };
export const Secondary: Story = { args: { variant: 'secondary', children: 'Secondary button' } };
export const Text: Story      = { args: { variant: 'text',      children: 'Text button' } };
export const Small: Story     = { args: { size: 'sm',           children: 'Small button' } };
export const Large: Story     = { args: { size: 'lg',           children: 'Large button' } };
export const Loading: Story   = { args: { isLoading: true,      children: 'Saving…' } };
export const Disabled: Story  = { args: { disabled: true,       children: 'Disabled' } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="main">Main</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="text">Text</Button>
      <Button variant="main" size="sm">Small</Button>
      <Button variant="main" size="lg">Large</Button>
      <Button variant="main" isLoading>Loading</Button>
      <Button variant="main" disabled>Disabled</Button>
    </div>
  ),
};
