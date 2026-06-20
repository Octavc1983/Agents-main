import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Accordion>;

const ITEMS = [
  { id: '1', title: 'What is IDIRA?',           content: 'IDIRA is an identity security platform by Palo Alto Networks.' },
  { id: '2', title: 'How do I migrate from PAM?', content: 'Follow the migration wizard under Setup → Migrations.' },
  { id: '3', title: 'Where can I find audit logs?', content: 'Audit logs are available under the Audit & Reports space.', disabled: true },
];

export const Default: Story = { args: { items: ITEMS } };
export const AllOpen: Story  = { args: { items: ITEMS, defaultOpenIds: ['1', '2'] } };
