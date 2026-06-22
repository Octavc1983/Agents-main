import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { SeverityBadge } from '@idira/design-system';
import { IDIRALogoIcon } from '@idira/design-system/icons';
import { TableFiltersTemplate } from '../../prototype-templates/TableFiltersTemplate';
import type { TableColumn } from '../../prototype-templates/TableFiltersTemplate';
import { StatusIcon } from '../../components/shared/StatusIcon';
import { BriefingBar } from '../../features/briefing-bar/BriefingBar';
import type { Secret, SecretProvider, SecretStatus } from '../../types/prototype.types';
import { secretsMock, secretsStats } from '../../mock/secretsMockData';
import './SecretsPage.scss';

// ── Provider icons (inline SVG) ───────────────────────────────────────────────

const ProviderIconAWS: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4.5 9.5C3.5 9.2 2.8 8.4 2.8 7.5c0-1.1.9-2 2.2-2.1C5.3 4.1 6.5 3 8 3s2.7 1.1 3 2.4c1.3.1 2.2 1 2.2 2.1 0 .9-.7 1.7-1.7 2" stroke="#FF9900" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M5.5 12l1-1.5 1 1 1-2 1 2 1-1" stroke="#FF9900" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ProviderIconAzure: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M6 3L2.5 12.5h3L8 7.5 10 13h3.5L9.5 3H6z" fill="#0078D4"/>
    <path d="M9.5 3L7 8.5 5.5 12.5H13.5L9.5 3z" fill="#50E6FF" fillOpacity="0.6"/>
  </svg>
);

const ProviderIconGCP: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 3.5h1.8L11 5H5L6.2 3.5H8z" fill="#EA4335"/>
    <path d="M11 5l1.5 2.5H3.5L5 5h6z" fill="#FBBC04"/>
    <path d="M12.5 7.5L11 10H5L3.5 7.5h9z" fill="#34A853"/>
    <path d="M11 10L9.8 12.5H6.2L5 10h6z" fill="#4285F4"/>
  </svg>
);

const ProviderIconHashiCorp: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 2L4 4.5V7l4-2.5L12 7V4.5L8 2z" fill="#7B42BC"/>
    <path d="M4 7v2.5L8 12l4-2.5V7L8 9.5 4 7z" fill="#7B42BC" fillOpacity="0.6"/>
  </svg>
);

const ProviderIconCyberArk: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="5" stroke="#265BFF" strokeWidth="1.5"/>
    <path d="M6 8l1.5 1.5L10.5 6" stroke="#265BFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PROVIDER_ICON_MAP: Record<SecretProvider, React.FC<{ size?: number }>> = {
  AWS: ProviderIconAWS,
  Azure: ProviderIconAzure,
  GCP: ProviderIconGCP,
  HashiCorp: ProviderIconHashiCorp,
  CyberArk: ProviderIconCyberArk,
};

// ── Tags cell (reuse +N pattern from ManagedAccountsPage) ─────────────────────

const MAX_VISIBLE_TAGS = 3;
const MAX_CALLOUT_TAGS = 15;
const CALLOUT_WIDTH = 320;
const CALLOUT_MAX_HEIGHT = 280;

interface TagsCellProps {
  tags: string[];
  secretName: string;
  popoverId: string;
  openPopoverId: string | null;
  setOpenPopoverId: (id: string | null) => void;
}

const TagChip: React.FC<{ tag: string }> = ({ tag }) => {
  const colonIdx = tag.indexOf(':');
  const hasValue = colonIdx > 0;
  const key = hasValue ? tag.slice(0, colonIdx) : tag;
  const value = hasValue ? tag.slice(colonIdx + 1) : null;
  return (
    <span className="sec-tag">
      <strong className="sec-tag__key">{key}</strong>
      {value !== null && <span className="sec-tag__value">:{value}</span>}
    </span>
  );
};

const TagsCell: React.FC<TagsCellProps> = ({
  tags, secretName, popoverId, openPopoverId, setOpenPopoverId,
}) => {
  const [calloutPos, setCalloutPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const calloutRef = useRef<HTMLDivElement>(null);
  const calloutOpen = openPopoverId === popoverId;

  const visible = tags.slice(0, MAX_VISIBLE_TAGS);
  const overflow = tags.length - MAX_VISIBLE_TAGS;
  const calloutTags = tags.slice(0, MAX_CALLOUT_TAGS);

  const openCallout = useCallback(() => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    let top = rect.bottom + 6;
    let left = rect.left;
    if (left + CALLOUT_WIDTH > window.innerWidth - 8) left = window.innerWidth - CALLOUT_WIDTH - 8;
    if (top + CALLOUT_MAX_HEIGHT > window.innerHeight - 8) {
      top = rect.top - CALLOUT_MAX_HEIGHT - 6;
      if (top < 8) top = 8;
    }
    setCalloutPos({ top, left });
    setOpenPopoverId(popoverId);
  }, [popoverId, setOpenPopoverId]);

  useEffect(() => {
    if (!calloutOpen) return;
    const handler = (e: MouseEvent) => {
      if (calloutRef.current && !calloutRef.current.contains(e.target as Node) &&
          btnRef.current && !btnRef.current.contains(e.target as Node)) {
        setOpenPopoverId(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [calloutOpen, setOpenPopoverId]);

  if (!tags.length) return null;

  return (
    <div className="sec-tags-cell">
      {visible.map((tag, i) => <TagChip key={`${tag}-${i}`} tag={tag} />)}
      {overflow > 0 && (
        <button
          ref={btnRef}
          type="button"
          className="sec-tag sec-tag--overflow-btn"
          onClick={calloutOpen ? () => setOpenPopoverId(null) : openCallout}
          aria-expanded={calloutOpen}
          aria-label={`Show ${overflow} more tags`}
        >
          +{overflow}
        </button>
      )}
      {calloutOpen && ReactDOM.createPortal(
        <div
          ref={calloutRef}
          className="sec-tags-callout"
          style={{ top: calloutPos.top, left: calloutPos.left }}
          role="dialog"
          aria-label={`Tags — ${secretName}`}
        >
          <div className="sec-tags-callout__header">
            <span className="sec-tags-callout__title">Tags — {secretName}</span>
            <button type="button" className="sec-tags-callout__close"
              onClick={() => setOpenPopoverId(null)} aria-label="Close">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M12.667 3.333L3.334 12.667M3.334 3.333l9.333 9.334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="sec-tags-callout__body">
            {calloutTags.map((tag, i) => <TagChip key={`${tag}-${i}`} tag={tag} />)}
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
};

// ── Expiration cell ───────────────────────────────────────────────────────────

const ExpirationCell: React.FC<{ secret: Secret }> = ({ secret }) => {
  if (!secret.expiration) {
    return <span className="sec-cell-text sec-cell-text--muted" title="No expiration">—</span>;
  }
  const isExpired = secret.daysToExpiration !== null && secret.daysToExpiration < 0;
  const isSoon = secret.daysToExpiration !== null && secret.daysToExpiration >= 0 && secret.daysToExpiration <= 30;
  const label = isExpired
    ? `${Math.abs(secret.daysToExpiration!)}d ago`
    : secret.daysToExpiration !== null
      ? `${secret.daysToExpiration}d`
      : secret.expiration;
  return (
    <span
      className={[
        'sec-cell-text',
        isExpired ? 'sec-cell-text--expired' : '',
        isSoon ? 'sec-cell-text--soon' : '',
      ].filter(Boolean).join(' ')}
      title={secret.expiration}
    >
      {label}
    </span>
  );
};

// ── Synced By cell ────────────────────────────────────────────────────────────

const SyncedByCell: React.FC<{ syncedByIdira: boolean }> = ({ syncedByIdira }) => {
  if (!syncedByIdira) {
    return <span className="sec-cell-text sec-cell-text--muted" title="Not synced">—</span>;
  }
  return (
    <span className="sec-synced-by" title="Synced by Idira">
      <IDIRALogoIcon size={16} />
      <span className="sec-synced-by__label">Idira</span>
    </span>
  );
};

// ── Filter groups ─────────────────────────────────────────────────────────────

const FILTER_GROUPS = [
  {
    id: 'platform', label: 'Provider', type: 'multi-select' as const,
    options: [
      { value: 'AWS', label: 'AWS' }, { value: 'Azure', label: 'Azure' },
      { value: 'GCP', label: 'GCP' }, { value: 'HashiCorp', label: 'HashiCorp' },
      { value: 'CyberArk', label: 'CyberArk' },
    ],
  },
  {
    id: 'status', label: 'Status', type: 'multi-select' as const,
    options: [
      { value: 'onboarded', label: 'Onboarded' }, { value: 'not_rotated', label: 'Not rotated' },
      { value: 'idle', label: 'Idle' }, { value: 'expired', label: 'Expired' },
      { value: 'disabled', label: 'Disabled' },
    ],
  },
  {
    id: 'riskLevel', label: 'Risk', type: 'multi-select' as const,
    options: [
      { value: 'critical', label: 'Critical' }, { value: 'high', label: 'High' },
      { value: 'medium', label: 'Medium' }, { value: 'low', label: 'Low' },
    ],
  },
  {
    id: 'secretStore', label: 'Secret Store', type: 'multi-select' as const,
    options: [
      { value: 'AWS Secrets Manager', label: 'AWS Secrets Manager' },
      { value: 'Azure Key Vault', label: 'Azure Key Vault' },
      { value: 'GCP Secret Manager', label: 'GCP Secret Manager' },
      { value: 'HashiCorp Vault', label: 'HashiCorp Vault' },
      { value: 'CyberArk Vault', label: 'CyberArk Vault' },
    ],
  },
  {
    id: 'syncedByIdira', label: 'Synced by Idira', type: 'multi-select' as const,
    options: [
      { value: 'true', label: 'Yes' }, { value: 'false', label: 'No' },
    ],
  },
];

// ── SecretsPage ───────────────────────────────────────────────────────────────

export const SecretsPage: React.FC = () => {
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);
  const [activeProviders, setActiveProviders] = useState<SecretProvider[]>([]);
  const [activeStatuses, setActiveStatuses] = useState<SecretStatus[]>([]);
  const [activeRisks, setActiveRisks] = useState<string[]>([]);

  useEffect(() => {
    if (!openPopoverId) return;
    const close = () => setOpenPopoverId(null);
    window.addEventListener('scroll', close, true);
    return () => window.removeEventListener('scroll', close, true);
  }, [openPopoverId]);

  const handleProviderClick = useCallback((provider: SecretProvider) => {
    setActiveProviders(prev =>
      prev.includes(provider) ? prev.filter(p => p !== provider) : [...prev, provider],
    );
  }, []);

  const handleStatusClick = useCallback((status: SecretStatus) => {
    setActiveStatuses(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status],
    );
  }, []);

  const handleRiskClick = useCallback((risk: string) => {
    setActiveRisks(prev =>
      prev.includes(risk) ? prev.filter(r => r !== risk) : [...prev, risk],
    );
  }, []);

  const filteredRows = useMemo(() => {
    let rows = secretsMock;
    if (activeProviders.length > 0) rows = rows.filter(s => activeProviders.includes(s.platform));
    if (activeStatuses.length > 0) rows = rows.filter(s => activeStatuses.includes(s.status));
    if (activeRisks.length > 0) rows = rows.filter(s => activeRisks.includes(s.riskLevel));
    return rows;
  }, [activeProviders, activeStatuses, activeRisks]);

  const columns = useMemo<TableColumn<Secret>[]>(() => [
    {
      id: 'status',
      label: '',
      narrow: true,
      render: (row) => <StatusIcon status={row.status} size={24} />,
    },
    {
      id: 'identifier',
      label: 'Identifier',
      render: (row) => {
        const Icon = PROVIDER_ICON_MAP[row.platform];
        return (
          <div className="sec-identifier">
            <span className="sec-identifier__icon">
              <Icon size={20} />
            </span>
            <span className="sec-identifier__name" title={row.name}>{row.name}</span>
          </div>
        );
      },
    },
    {
      id: 'secretStore',
      label: 'Secret Store',
      render: (row) => <span className="sec-cell-text" title={row.secretStore}>{row.secretStore}</span>,
      hideWhenNarrow: true,
    },
    {
      id: 'syncedBy',
      label: 'Synced By',
      render: (row) => <SyncedByCell syncedByIdira={row.syncedByIdira} />,
      hideWhenNarrow: true,
    },
    {
      id: 'riskLevel',
      label: 'Posture Risk',
      render: (row) => <SeverityBadge severity={row.riskLevel} variant="fill" />,
      hideWhenNarrow: true,
    },
    {
      id: 'createdAt',
      label: 'Created',
      render: (row) => <span className="sec-cell-text" title={row.createdAt}>{row.createdAt}</span>,
      hideWhenNarrow: true,
    },
    {
      id: 'lastChanged',
      label: 'Last Changed',
      render: (row) => <span className="sec-cell-text" title={row.lastChanged}>{row.lastChanged}</span>,
      hideWhenNarrow: true,
    },
    {
      id: 'expiration',
      label: 'Expiration',
      render: (row) => <ExpirationCell secret={row} />,
      hideWhenNarrow: true,
    },
    {
      id: 'tags',
      label: 'Tags',
      render: (row) => (
        <TagsCell
          tags={row.tags}
          secretName={row.name}
          popoverId={`${row.id}-tags`}
          openPopoverId={openPopoverId}
          setOpenPopoverId={setOpenPopoverId}
        />
      ),
      hideWhenNarrow: true,
    },
  ], [openPopoverId]);

  const getFilterValue = useCallback((secret: Secret, groupId: string) => {
    if (groupId === 'platform') return secret.platform;
    if (groupId === 'status') return secret.status;
    if (groupId === 'riskLevel') return secret.riskLevel;
    if (groupId === 'secretStore') return secret.secretStore;
    if (groupId === 'syncedByIdira') return String(secret.syncedByIdira);
    return '';
  }, []);

  const searchableFields = useMemo(() => [
    (s: Secret) => s.name,
    (s: Secret) => s.platform,
    (s: Secret) => s.secretStore,
  ], []);

  return (
    <div className="secrets-page">
      <BriefingBar
        stats={secretsStats}
        activeProviders={activeProviders}
        activeStatuses={activeStatuses}
        activeRisks={activeRisks}
        onProviderClick={handleProviderClick}
        onStatusClick={handleStatusClick}
        onRiskClick={handleRiskClick}
      />
      <div className="secrets-page__table">
        <TableFiltersTemplate<Secret>
          title="Secrets"
          description="Manage and monitor all secrets across your organization."
          rows={filteredRows}
          columns={columns}
          getRowId={(s) => s.id}
          selectable
          searchPlaceholder="Search secrets..."
          searchableFields={searchableFields}
          filterGroups={FILTER_GROUPS}
          getFilterValue={getFilterValue}
          emptyTitle="No secrets found"
          emptyDescription="No secrets match your current filters."
        />
      </div>
    </div>
  );
};
