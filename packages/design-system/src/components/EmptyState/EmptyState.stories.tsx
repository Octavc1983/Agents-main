import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';
import { Button } from '../Button/Button';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    title: 'No results found',
    description: 'Try adjusting your filters or search terms.',
  },
};

export const WithAction: Story = {
  args: {
    title: 'No scans yet',
    description: 'Run your first scan to see results here.',
    action: <Button variant="main">Start scan</Button>,
  },
};

export const NoMatches: Story = {
  args: {
    title: 'No matching users',
    description: 'No users match the current filter criteria. Clear filters to see all users.',
    action: <Button variant="secondary">Clear filters</Button>,
  },
};
