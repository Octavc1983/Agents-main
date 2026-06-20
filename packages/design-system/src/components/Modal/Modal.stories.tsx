import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/Checkbox';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
};
export default meta;

type Story = StoryObj<typeof Modal>;

const Trigger = ({ label, children }: { label: string; children: (open: boolean, set: (v: boolean) => void) => React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
      <Button onClick={() => setOpen(true)}>{label}</Button>
      {children(open, setOpen)}
    </div>
  );
};

export const Default: Story = {
  render: () => (
    <Trigger label="Open modal">
      {(open, setOpen) => (
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Confirm action"
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="main" onClick={() => setOpen(false)}>Confirm</Button>
            </>
          }
        >
          Are you sure you want to proceed with this action?
        </Modal>
      )}
    </Trigger>
  ),
};

export const WithCheckboxes: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const items = ['User management', 'Firewall rules', 'SaaS environment'];
    const [checked, setChecked] = useState<Set<string>>(new Set());
    const toggle = (id: string) => setChecked(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
    return (
      <div style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
        <Button onClick={() => setOpen(true)}>Open checklist modal</Button>
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Confirm your setup"
          closeOnBackdropClick={false}
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="main" disabled={checked.size < items.length} onClick={() => setOpen(false)}>Save</Button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ color: '#BBC2D0', fontSize: '14px', margin: 0 }}>
              Confirm you have completed the following steps:
            </p>
            {items.map(item => (
              <Checkbox key={item} label={item} checked={checked.has(item)} onChange={() => toggle(item)} />
            ))}
          </div>
        </Modal>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [size, setSize] = useState<'small' | 'medium' | 'large' | null>(null);
    return (
      <div style={{ padding: '40px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
        {(['small', 'medium', 'large'] as const).map(s => (
          <Button key={s} variant="secondary" onClick={() => setSize(s)}>{s}</Button>
        ))}
        <Modal isOpen={size !== null} onClose={() => setSize(null)} title={`${size} modal`} size={size ?? 'medium'}>
          This is a {size} modal.
        </Modal>
      </div>
    );
  },
};
