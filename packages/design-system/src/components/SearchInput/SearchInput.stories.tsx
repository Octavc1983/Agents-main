import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SearchInput } from './SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  argTypes: {
    size:     { control: 'select', options: ['sm', 'md'] },
    disabled: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof SearchInput>;

export const Default: Story  = { args: { placeholder: 'Search…' } };
export const Small: Story    = { args: { placeholder: 'Search…', size: 'sm' } };
export const Disabled: Story = { args: { placeholder: 'Search…', disabled: true } };

export const Controlled: Story = {
  render: () => {
    const [val, setVal] = useState('');
    return (
      <SearchInput
        placeholder="Search users…"
        value={val}
        onChange={e => setVal(e.target.value)}
        onClear={() => setVal('')}
      />
    );
  },
};
