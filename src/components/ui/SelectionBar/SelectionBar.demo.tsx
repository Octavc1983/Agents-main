import React, { useState } from 'react';
import { SelectionBar } from './SelectionBar';
import './SelectionBar.scss';

const ACTIONS = [
  { id: 'assign', label: 'Assign', onClick: () => {} },
  { id: 'resolve', label: 'Resolve', onClick: () => {} },
  { id: 'archive', label: 'Archive', onClick: () => {} },
  { id: 'export', label: 'Export', onClick: () => {} },
  { id: 'tag', label: 'Tag', onClick: () => {} },
  { id: 'delete', label: 'Delete', onClick: () => {} },
  { id: 'more', label: 'More', onClick: () => {} },
];

export const SelectionBarDemo: React.FC = () => {
  const [visible, setVisible] = useState(true);

  return (
    <div style={{ padding: '32px', background: '#0F1827', minHeight: '100vh', fontFamily: 'Open Sans, sans-serif' }}>
      <h1 style={{ color: '#fff', marginBottom: '32px', fontSize: '20px' }}>Selection Bar</h1>

      {visible ? (
        <SelectionBar
          selectedCount={3}
          totalCount={24}
          filterCount={2}
          actions={ACTIONS}
          onDismiss={() => setVisible(false)}
          onSelectAll={() => {}}
          onClearFilters={() => {}}
        />
      ) : (
        <button onClick={() => setVisible(true)} style={{ color: '#859FFF', background: 'none', border: '1px solid #859FFF', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer' }}>
          Show SelectionBar
        </button>
      )}
    </div>
  );
};
