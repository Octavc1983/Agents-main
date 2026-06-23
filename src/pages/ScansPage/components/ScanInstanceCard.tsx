import React, { useState } from 'react';
import type { ScanInstance } from '../ScansPage.types';
import { SCAN_STATUS_META } from '../ScansPage.constants';

interface ScanInstanceCardProps {
  instance: ScanInstance;
  defaultOpen?: boolean;
}

export const ScanInstanceCard: React.FC<ScanInstanceCardProps> = ({ instance, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const meta = SCAN_STATUS_META[instance.status];
  const { Icon } = meta;

  return (
    <div className={`scan-instance-card${isOpen ? ' scan-instance-card--open' : ''}`}>
      <button
        type="button"
        className="scan-instance-card__header"
        onClick={() => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
      >
        <span className="scan-instance-card__status">
          <Icon size={20} />
        </span>
        <span className={`scan-instance-card__label ${meta.cssClass}`}>{meta.label}</span>
        <span className="scan-instance-card__timestamp">{instance.timestamp}</span>
        <span className="scan-instance-card__chevron" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d={isOpen ? 'M3 9l4-4 4 4' : 'M3 5l4 4 4-4'}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="scan-instance-card__body">
          <dl className="scan-instance-card__fields">
            <div className="scan-instance-card__field">
              <dt className="scan-instance-card__field-label">ID:</dt>
              <dd className="scan-instance-card__field-value" title={instance.id}>{instance.id}</dd>
            </div>
            <div className="scan-instance-card__field">
              <dt className="scan-instance-card__field-label">Scan definition ID:</dt>
              <dd className="scan-instance-card__field-value" title={instance.scanDefinitionId}>{instance.scanDefinitionId}</dd>
            </div>
            <div className="scan-instance-card__field">
              <dt className="scan-instance-card__field-label">Name:</dt>
              <dd className="scan-instance-card__field-value" title={instance.name}>{instance.name}</dd>
            </div>
            <div className="scan-instance-card__field">
              <dt className="scan-instance-card__field-label">Account ID:</dt>
              <dd className="scan-instance-card__field-value" title={instance.accountId}>{instance.accountId}</dd>
            </div>
            <div className="scan-instance-card__field">
              <dt className="scan-instance-card__field-label">Scan type:</dt>
              <dd className="scan-instance-card__field-value" title={instance.scanType}>{instance.scanType}</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
};
