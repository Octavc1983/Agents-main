import React from 'react';
import { ActionMenu } from './ActionMenu';
import './ActionMenu.demo.scss';

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="5" y="5" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 11V3h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ITEMS = [
  { id: 'item-1', label: 'Item', icon: <CopyIcon /> },
  { id: 'item-2', label: 'Item', icon: <CopyIcon /> },
  { id: 'item-3', label: 'Item', icon: <CopyIcon />, selected: true },
  { id: 'item-4', label: 'Item', icon: <CopyIcon /> },
  { id: 'item-5', label: 'Item', icon: <CopyIcon /> },
  { id: 'item-6', label: 'Item', icon: <CopyIcon /> },
  { id: 'item-7', label: 'Item', icon: <CopyIcon />, disabled: true },
];

export const ActionMenuDemo: React.FC = () => (
  <div className="action-menu-demo">
    <h1 className="action-menu-demo__title">Action menu</h1>

    <div className="action-menu-demo__row">
      <div className="action-menu-demo__col">
        <span className="action-menu-demo__label">Idle</span>
        <ActionMenu items={ITEMS} />
      </div>

      <div className="action-menu-demo__col action-menu-demo__col--dark">
        <ActionMenu items={ITEMS} />
      </div>
    </div>

    <div className="action-menu-demo__states">
      <div className="action-menu-demo__state-col">
        <span className="action-menu-demo__state-label">Idle</span>
        <span className="action-menu-demo__state-label">Hover</span>
        <span className="action-menu-demo__state-label">Selected</span>
        <span className="action-menu-demo__state-label">Disabled</span>
      </div>
      <ActionMenu
        items={[
          { id: 's1', label: 'Item', icon: <CopyIcon /> },
          { id: 's2', label: 'Item', icon: <CopyIcon /> },
          { id: 's3', label: 'Item', icon: <CopyIcon />, selected: true },
          { id: 's4', label: 'Item', icon: <CopyIcon />, disabled: true },
        ]}
      />
    </div>
  </div>
);
