import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size:     { control: 'select', options: ['sm', 'md'] },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    type:     { control: 'select', options: ['text','email','password','number','search','url'] },
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story  = { args: { label: 'Username', placeholder: 'Enter username' } };
export const WithHint: Story = { args: { label: 'Email', placeholder: 'user@example.com', hint: 'We will never share your email.' } };
export const WithError: Story = { args: { label: 'Password', type: 'password', error: 'Must be at least 8 characters.' } };
export const Disabled: Story = { args: { label: 'Disabled', value: 'Locked value', disabled: true } };
export const ReadOnly: Story = { args: { label: 'Read only', value: 'Read-only value', readOnly: true } };
export const Small: Story    = { args: { label: 'Small', size: 'sm', placeholder: 'Small input' } };

export const Controlled: Story = {
  render: () => {
    const [val, setVal] = useState('');
    return (
      <Input
        label="Controlled input"
        placeholder="Type something…"
        value={val}
        onChange={e => setVal(e.target.value)}
        hint={`${val.length} characters`}
      />
    );
  },
};
