import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select } from './Select';

const OPTIONS = [
  { value: 'admin',   label: 'Administrator' },
  { value: 'user',    label: 'Standard User' },
  { value: 'viewer',  label: 'Viewer' },
  { value: 'auditor', label: 'Auditor', disabled: true },
];

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    size:       { control: 'select', options: ['sm', 'md'] },
    disabled:   { control: 'boolean' },
    searchable: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = { args: { label: 'Role', options: OPTIONS, placeholder: 'Select a role…' } };
export const Searchable: Story = { args: { label: 'Role', options: OPTIONS, searchable: true, placeholder: 'Search roles…' } };
export const WithError: Story = { args: { label: 'Role', options: OPTIONS, error: 'This field is required.' } };
export const Disabled: Story  = { args: { label: 'Role', options: OPTIONS, disabled: true } };

export const Controlled: Story = {
  render: () => {
    const [val, setVal] = useState('');
    return (
      <Select
        label="Role"
        options={OPTIONS}
        value={val}
        onChange={setVal}
        hint={val ? `Selected: ${val}` : 'Nothing selected yet'}
      />
    );
  },
};
