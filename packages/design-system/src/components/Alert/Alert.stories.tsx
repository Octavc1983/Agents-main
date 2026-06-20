import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'attention'] },
  },
};
export default meta;

type Story = StoryObj<typeof Alert>;

export const Info: Story      = { args: { variant: 'info',      message: 'This is an informational notice.' } };
export const Success: Story   = { args: { variant: 'success',   message: 'Your changes have been saved.' } };
export const Warning: Story   = { args: { variant: 'warning',   message: 'Your session will expire in 5 minutes.' } };
export const Attention: Story = { args: { variant: 'attention', message: 'You are in read-only mode.' } };

export const WithSubMessage: Story = {
  args: {
    variant: 'warning',
    message: 'Migration required',
    subMessage: 'Complete the PAM migration before the end of the quarter to avoid service interruption.',
    onClose: () => {},
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '560px' }}>
      {(['info','success','warning','attention'] as const).map(v => (
        <Alert key={v} variant={v} message={`This is a ${v} alert.`} onClose={() => {}} />
      ))}
    </div>
  ),
};
