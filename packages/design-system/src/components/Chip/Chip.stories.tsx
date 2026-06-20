import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Chip } from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story   = { args: { label: 'Active filter' } };
export const Removable: Story = { args: { label: 'Removable', onRemove: () => {} } };
export const Disabled: Story  = { args: { label: 'Disabled', disabled: true } };

export const FilterRow: Story = {
  render: () => {
    const initial = ['Status: Active', 'Type: Admin', 'Region: EU', 'Risk: High'];
    const [chips, setChips] = useState(initial);
    return (
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {chips.map(c => (
          <Chip key={c} label={c} onRemove={() => setChips(prev => prev.filter(x => x !== c))} />
        ))}
        {chips.length === 0 && (
          <button
            type="button"
            style={{ color: '#BBC2D0', background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => setChips(initial)}
          >
            Reset filters
          </button>
        )}
      </div>
    );
  },
};
