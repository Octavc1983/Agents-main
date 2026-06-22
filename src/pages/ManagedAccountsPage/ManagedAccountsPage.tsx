import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { Button, SeverityBadge } from '@idira/design-system';
import { ManageTagsDialog } from '../../features/tags/ManageTagsDialog/ManageTagsDialog';
import { MOCK_TAG_SUGGESTIONS } from '../../mock/tagsMockData';
import type { Tag } from '../../features/tags/tag.types';
import { StatusIcon } from '../../components/shared/StatusIcon';
import {
  WindowsPlatformIcon, LinuxPlatformIcon, AWSPlatformIcon, AzurePlatformIcon,
  GCPPlatformIcon, OraclePlatformIcon, SAPPlatformIcon, UbuntuPlatformIcon,
  MacOSPlatformIcon, RHELPlatformIcon, DebianPlatformIcon, FedoraPlatformIcon,
  DockerPlatformIcon, KubernetesPlatformIcon, PostgreSQLPlatformIcon,
  MySQLPlatformIcon, GitHubPlatformIcon, GitLabPlatformIcon, BitbucketPlatformIcon,
  GitPlatformIcon, SalesforcePlatformIcon, JiraPlatformIcon, SlackPlatformIcon,
  ZoomPlatformIcon, JenkinsPlatformIcon, SplunkPlatformIcon, PythonPlatformIcon,
  ChromePlatformIcon, GooglePlatformIcon,
} from '@idira/design-system/icons';
import { TableFiltersTemplate } from '../../prototype-templates/TableFiltersTemplate';
import type { TableColumn } from '../../prototype-templates/TableFiltersTemplate';
import { FatlinesListMasterDetailsTemplate } from '../../prototype-templates/FatlinesListMasterDetailsTemplate';
import type { ManagedAccount, ManagedAccountPlatform } from '../../types/prototype.types';
import { managedAccountsMock } from '../../mock/managedAccountsMockData';
import { CreateManagedAccountWizard } from './CreateManagedAccountWizard';
import './ManagedAccountsPage.scss';

// ── Platform icon ─────────────────────────────────────────────────────────────

const PLATFORM_ICON_MAP: Record<ManagedAccountPlatform, React.FC<{ size?: number }>> = {
  Windows: WindowsPlatformIcon, Linux: LinuxPlatformIcon, AWS: AWSPlatformIcon,
  Azure: AzurePlatformIcon, GCP: GCPPlatformIcon, Oracle: OraclePlatformIcon,
  SAP: SAPPlatformIcon, Ubuntu: UbuntuPlatformIcon, MacOS: MacOSPlatformIcon,
  RHEL: RHELPlatformIcon, Debian: DebianPlatformIcon, Fedora: FedoraPlatformIcon,
  Docker: DockerPlatformIcon, Kubernetes: KubernetesPlatformIcon,
  PostgreSQL: PostgreSQLPlatformIcon, MySQL: MySQLPlatformIcon,
  GitHub: GitHubPlatformIcon, GitLab: GitLabPlatformIcon, Bitbucket: BitbucketPlatformIcon,
  Git: GitPlatformIcon, Salesforce: SalesforcePlatformIcon, Jira: JiraPlatformIcon,
  Slack: SlackPlatformIcon, Zoom: ZoomPlatformIcon, Jenkins: JenkinsPlatformIcon,
  Splunk: SplunkPlatformIcon, Python: PythonPlatformIcon, Chrome: ChromePlatformIcon,
  Google: GooglePlatformIcon,
};

const PlatformIcon: React.FC<{ platform: ManagedAccountPlatform }> = ({ platform }) => {
  const Icon = PLATFORM_ICON_MAP[platform];
  return (
    <span className="ma-platform-icon" title={platform}>
      {Icon ? <Icon size={24} /> : <span aria-label={platform}>{platform.substring(0, 2).toUpperCase()}</span>}
    </span>
  );
};

// ── Tag chip ──────────────────────────────────────────────────────────────────

const TagChip: React.FC<{ tag: string; variant?: 'table' | 'callout' }> = ({ tag, variant = 'table' }) => {
  const colonIdx = tag.indexOf(':');
  const hasValue = colonIdx > 0;
  const key = hasValue ? tag.slice(0, colonIdx) : tag;
  const value = hasValue ? tag.slice(colonIdx + 1) : null;

  return (
    <span className={`ma-tag${variant === 'callout' ? ' ma-tag--callout' : ''}`}>
      <strong className="ma-tag__key">{key}</strong>
      {value !== null && <span className="ma-tag__value">:{value}</span>}
    </span>
  );
};

// ── Tags cell with overflow callout ───────────────────────────────────────────

const MAX_VISIBLE_TAGS = 3;
const MAX_CALLOUT_TAGS = 15;
const CALLOUT_WIDTH = 340;
const CALLOUT_MAX_HEIGHT = 290; // header ~50px + body max-height 240px

interface TagsCellProps {
  tags: string[];
  accountName: string;
  popoverId: string;
  openPopoverId: string | null;
  setOpenPopoverId: (id: string | null) => void;
}

const TagsCell: React.FC<TagsCellProps> = ({
  tags, accountName, popoverId, openPopoverId, setOpenPopoverId,
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

    if (left + CALLOUT_WIDTH > window.innerWidth - 8) {
      left = window.innerWidth - CALLOUT_WIDTH - 8;
    }
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
      if (
        calloutRef.current && !calloutRef.current.contains(e.target as Node) &&
        btnRef.current && !btnRef.current.contains(e.target as Node)
      ) {
        setOpenPopoverId(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [calloutOpen, setOpenPopoverId]);

  if (!tags.length) return null;

  return (
    <div className="ma-tags-cell">
      {visible.map((tag, i) => <TagChip key={`${tag}-${i}`} tag={tag} />)}

      {overflow > 0 && (
        <button
          ref={btnRef}
          type="button"
          className="ma-tag ma-tag--overflow-btn"
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
          className="ma-tags-callout"
          style={{ top: calloutPos.top, left: calloutPos.left }}
          role="dialog"
          aria-label={`Tags — ${accountName}`}
        >
          <div className="ma-tags-callout__header">
            <span className="ma-tags-callout__title">Tags — {accountName}</span>
            <button
              type="button"
              className="ma-tags-callout__close"
              onClick={() => setOpenPopoverId(null)}
              aria-label="Close"
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M12.667 3.333L3.334 12.667M3.334 3.333l9.333 9.334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="ma-tags-callout__body">
            {calloutTags.map((tag, i) => <TagChip key={`${tag}-${i}`} tag={tag} variant="callout" />)}
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
};

// ── Row actions menu (3 dots) ─────────────────────────────────────────────────

const MENU_WIDTH = 180;
const MENU_HEIGHT = 44;

interface RowActionsMenuProps {
  account: ManagedAccount;
  onManageTags: (account: ManagedAccount) => void;
  popoverId: string;
  openPopoverId: string | null;
  setOpenPopoverId: (id: string | null) => void;
}

const DotsIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="3" cy="8" r="1.25" fill="currentColor" />
    <circle cx="8" cy="8" r="1.25" fill="currentColor" />
    <circle cx="13" cy="8" r="1.25" fill="currentColor" />
  </svg>
);

const RowActionsMenu: React.FC<RowActionsMenuProps> = ({
  account, onManageTags, popoverId, openPopoverId, setOpenPopoverId,
}) => {
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const open = openPopoverId === popoverId;

  const openMenu = useCallback(() => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    let top = rect.bottom + 4;
    let left = rect.right - MENU_WIDTH;

    if (left < 8) left = 8;
    if (top + MENU_HEIGHT > window.innerHeight - 8) {
      top = rect.top - MENU_HEIGHT - 4;
    }

    setMenuPos({ top, left });
    setOpenPopoverId(popoverId);
  }, [popoverId, setOpenPopoverId]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        btnRef.current && !btnRef.current.contains(e.target as Node)
      ) {
        setOpenPopoverId(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, setOpenPopoverId]);

  return (
    <div className="ma-row-actions">
      <button
        ref={btnRef}
        type="button"
        className={`ma-row-actions__btn${open ? ' ma-row-actions__btn--active' : ''}`}
        onClick={open ? () => setOpenPopoverId(null) : openMenu}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Row actions"
      >
        <DotsIcon />
      </button>

      {open && ReactDOM.createPortal(
        <div
          ref={menuRef}
          className="ma-row-actions__menu"
          style={{ top: menuPos.top, left: menuPos.left }}
          role="menu"
        >
          <button
            type="button"
            className="ma-row-actions__item"
            role="menuitem"
            onClick={() => { setOpenPopoverId(null); onManageTags(account); }}
          >
            Manage tags
          </button>
        </div>,
        document.body,
      )}
    </div>
  );
};

// ── Convert account raw tags (string[]) → Tag[] ───────────────────────────────

function accountTagsToTagModel(rawTags: string[]): Tag[] {
  return rawTags.map((raw, i) => {
    const colonIdx = raw.indexOf(':');
    const key = colonIdx > 0 ? raw.slice(0, colonIdx) : raw;
    const value = colonIdx > 0 ? raw.slice(colonIdx + 1) : undefined;
    return {
      id: `tag-row-${i}-${raw}`,
      key,
      value,
      source: 'manual' as const,
      isRemovable: true,
      isEditable: false,
    };
  });
}

// ── Filter groups ─────────────────────────────────────────────────────────────

const FILTER_GROUPS = [
  {
    id: 'safe', label: 'Safe', type: 'multi-select' as const,
    options: [
      { value: 'Prod-ServiceAccounts', label: 'Prod-ServiceAccounts' },
      { value: 'DomainAdmins', label: 'DomainAdmins' },
      { value: 'DBAdmins', label: 'DBAdmins' },
      { value: 'CloudAccounts', label: 'CloudAccounts' },
      { value: 'SAPAccounts', label: 'SAPAccounts' },
      { value: 'UnixAdmins', label: 'UnixAdmins' },
      { value: 'SaaSAccounts', label: 'SaaSAccounts' },
      { value: 'WorkstationAdmins', label: 'WorkstationAdmins' },
      { value: 'SecurityAccounts', label: 'SecurityAccounts' },
    ],
  },
  {
    id: 'organization', label: 'Organization', type: 'multi-select' as const,
    options: [
      { value: 'CyberArk', label: 'CyberArk' },
      { value: 'Acme Corp', label: 'Acme Corp' },
      { value: 'FinanceDiv', label: 'FinanceDiv' },
      { value: 'IT-Ops', label: 'IT-Ops' },
      { value: 'Security Team', label: 'Security Team' },
    ],
  },
  {
    id: 'platform', label: 'Platform', type: 'multi-select' as const,
    options: [
      { value: 'Windows', label: 'Windows' }, { value: 'Linux', label: 'Linux' },
      { value: 'AWS', label: 'AWS' }, { value: 'Azure', label: 'Azure' },
      { value: 'GCP', label: 'GCP' }, { value: 'Oracle', label: 'Oracle' },
      { value: 'SAP', label: 'SAP' }, { value: 'Ubuntu', label: 'Ubuntu' },
      { value: 'MacOS', label: 'macOS' }, { value: 'RHEL', label: 'RHEL' },
      { value: 'Debian', label: 'Debian' }, { value: 'Fedora', label: 'Fedora' },
      { value: 'Docker', label: 'Docker' }, { value: 'Kubernetes', label: 'Kubernetes' },
      { value: 'PostgreSQL', label: 'PostgreSQL' }, { value: 'MySQL', label: 'MySQL' },
      { value: 'GitHub', label: 'GitHub' }, { value: 'GitLab', label: 'GitLab' },
      { value: 'Salesforce', label: 'Salesforce' }, { value: 'Jira', label: 'Jira' },
      { value: 'Slack', label: 'Slack' }, { value: 'Jenkins', label: 'Jenkins' },
      { value: 'Splunk', label: 'Splunk' },
    ],
  },
  {
    id: 'accountType', label: 'Type', type: 'multi-select' as const,
    options: [
      { value: 'local', label: 'Local' }, { value: 'domain', label: 'Domain' },
      { value: 'service', label: 'Service' }, { value: 'cloud', label: 'Cloud' },
    ],
  },
  {
    id: 'status', label: 'Status', type: 'multi-select' as const,
    options: [
      { value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' },
      { value: 'pending', label: 'Pending' }, { value: 'locked', label: 'Locked' },
      { value: 'marked_for_deletion', label: 'Marked for deletion' }, { value: 'deleted', label: 'Deleted' },
    ],
  },
  {
    id: 'riskLevel', label: 'Risk', type: 'multi-select' as const,
    options: [
      { value: 'critical', label: 'Critical' },
      { value: 'high', label: 'High' },
      { value: 'medium', label: 'Medium' },
      { value: 'low', label: 'Low' },
    ],
  },
];

// ── ManagedAccountsPage ───────────────────────────────────────────────────────

function formatTime(d: Date): string {
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

// ── Account details panel ──────────────────────────────────────────────────────

const CloseDetailsIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M12.667 3.333L3.334 12.667M3.334 3.333l9.333 9.334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

interface AccountDetailsPanelProps {
  account: ManagedAccount;
  onClose: () => void;
  onManageTags: (account: ManagedAccount) => void;
}

const AccountDetailsPanel: React.FC<AccountDetailsPanelProps> = ({ account, onClose, onManageTags }) => {
  const PlatformIconComp = PLATFORM_ICON_MAP[account.platform];
  return (
    <div className="ma-details-panel">
      <div className="ma-details-panel__header">
        <div className="ma-details-panel__title-row">
          <span className="ma-details-panel__platform-icon">
            {PlatformIconComp ? <PlatformIconComp size={28} /> : null}
          </span>
          <div className="ma-details-panel__title-text">
            <span className="ma-details-panel__name">{account.name}</span>
            <span className="ma-details-panel__platform">{account.platform}</span>
          </div>
        </div>
        <button
          type="button"
          className="ma-details-panel__close"
          onClick={onClose}
          aria-label="Close details"
        >
          <CloseDetailsIcon />
        </button>
      </div>

      <div className="ma-details-panel__body">
        <dl className="ma-details-panel__grid">
          <dt>Status</dt>
          <dd><StatusIcon status={account.status} size={24} showLabel /></dd>

          <dt>Risk</dt>
          <dd><SeverityBadge severity={account.riskLevel} variant="fill" /></dd>

          <dt>Safe</dt>
          <dd>{account.safe}</dd>

          <dt>Organization</dt>
          <dd>{account.organization ?? '—'}</dd>

          <dt>Address</dt>
          <dd>{account.address || '—'}</dd>

          <dt>Account ID</dt>
          <dd className="ma-details-panel__mono">{account.id.toUpperCase()}</dd>

          <dt>Type</dt>
          <dd className="ma-details-panel__capitalize">{account.accountType}</dd>

          <dt>Owner</dt>
          <dd>{account.owner}</dd>

          <dt>Last password change</dt>
          <dd>{account.lastPasswordChange}</dd>

          <dt>Created</dt>
          <dd>{account.createdAt}</dd>
        </dl>

        {account.tags.length > 0 && (
          <div className="ma-details-panel__tags-section">
            <span className="ma-details-panel__section-label">Tags</span>
            <div className="ma-details-panel__tags">
              {account.tags.map((tag, i) => (
                <TagChip key={`${tag}-${i}`} tag={tag} variant="callout" />
              ))}
            </div>
            <button
              type="button"
              className="ma-details-panel__manage-tags-btn"
              onClick={() => onManageTags(account)}
            >
              Manage tags
            </button>
          </div>
        )}

        {account.description && (
          <p className="ma-details-panel__description">{account.description}</p>
        )}
      </div>
    </div>
  );
};

// ── ManagedAccountsPage ───────────────────────────────────────────────────────

export const ManagedAccountsPage: React.FC = () => {
  const [wizardOpen, setWizardOpen] = useState(false);
  const [tagsDialogAccount, setTagsDialogAccount] = useState<ManagedAccount | null>(null);
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState(() => formatTime(new Date()));
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

  // Close any open popover when the page scrolls (#8)
  useEffect(() => {
    if (!openPopoverId) return;
    const close = () => setOpenPopoverId(null);
    window.addEventListener('scroll', close, true);
    return () => window.removeEventListener('scroll', close, true);
  }, [openPopoverId]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setUpdatedAt(formatTime(new Date()));
      setIsRefreshing(false);
    }, 800);
  }, []);

  const columns = useMemo<TableColumn<ManagedAccount>[]>(() => [
    {
      id: 'status',
      label: '',
      narrow: true,
      render: (row) => <StatusIcon status={row.status} size={24} />,
    },
    {
      id: 'identifiers',
      label: 'Identifiers',
      render: (row) => (
        <div className="ma-identifiers">
          <PlatformIcon platform={row.platform} />
          <div className="ma-identifiers__text">
            <span className="ma-identifiers__name">{row.name}</span>
            <span className="ma-identifiers__meta">
              {row.address && <span>Address: {row.address}</span>}
              <span>Account ID: {row.id.toUpperCase()}</span>
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 'safe',
      label: 'Safe',
      render: (row) => <span className="ma-cell-text" title={row.safe}>{row.safe}</span>,
    },
    {
      id: 'organization',
      label: 'Organization',
      render: (row) => <span className="ma-cell-text" title={row.organization ?? '—'}>{row.organization ?? '—'}</span>,
      hideWhenNarrow: true,
    },
    {
      id: 'platform',
      label: 'Platform',
      render: (row) => <span className="ma-cell-text" title={row.platform}>{row.platform}</span>,
      hideWhenNarrow: true,
    },
    {
      id: 'riskLevel',
      label: 'Risk',
      render: (row) => <SeverityBadge severity={row.riskLevel} variant="fill" />,
      hideWhenNarrow: true,
    },
    {
      id: 'subtype',
      label: 'Subtype',
      render: (row) => <span className="ma-cell-text ma-cell-text--capitalize" title={row.accountType}>{row.accountType}</span>,
      hideWhenNarrow: true,
    },
    {
      id: 'tags',
      label: 'Tags',
      render: (row) => (
        <TagsCell
          tags={row.tags}
          accountName={row.name}
          popoverId={`${row.id}-tags`}
          openPopoverId={openPopoverId}
          setOpenPopoverId={setOpenPopoverId}
        />
      ),
      hideWhenNarrow: true,
    },
  ], [openPopoverId]);

  const sharedActions = (
    <Button variant="main" size="sm" onClick={() => setWizardOpen(true)}>
      Add account
    </Button>
  );

  const getFilterValue = useCallback((account: ManagedAccount, groupId: string) => {
    if (groupId === 'safe') return account.safe;
    if (groupId === 'organization') return account.organization ?? '';
    if (groupId === 'platform') return account.platform;
    if (groupId === 'accountType') return account.accountType;
    if (groupId === 'status') return account.status;
    if (groupId === 'riskLevel') return account.riskLevel;
    return '';
  }, []);

  const searchableFields = useMemo(() => [
    (a: ManagedAccount) => a.name,
    (a: ManagedAccount) => a.address,
    (a: ManagedAccount) => a.owner,
    (a: ManagedAccount) => a.safe,
    (a: ManagedAccount) => a.organization ?? '',
    (a: ManagedAccount) => a.platform,
  ], []);

  return (
    <>
      <FatlinesListMasterDetailsTemplate<ManagedAccount>
        rows={managedAccountsMock}
        getRowId={(a) => a.id}
        selectedEntityId={selectedAccountId}
        onSelectedEntityChange={setSelectedAccountId}
        renderList={(onRowClick) => (
          <TableFiltersTemplate<ManagedAccount>
            title="Managed accounts"
            description="Discover, connect, and monitor all AI agents across the organization."
            rows={managedAccountsMock}
            columns={columns}
            getRowId={(a) => a.id}
            selectable
            searchPlaceholder="Search / Filter"
            searchableFields={searchableFields}
            filterGroups={FILTER_GROUPS}
            getFilterValue={getFilterValue}
            primaryAction={sharedActions}
            updatedAt={updatedAt}
            onRefresh={handleRefresh}
            isLoading={isRefreshing}
            emptyTitle="No managed accounts"
            emptyDescription="Create your first managed account to get started."
            onRowClick={onRowClick}
            rowActions={(account) => (
              <RowActionsMenu
                account={account}
                onManageTags={setTagsDialogAccount}
                popoverId={`${account.id}-menu`}
                openPopoverId={openPopoverId}
                setOpenPopoverId={setOpenPopoverId}
              />
            )}
          />
        )}
        renderDetails={(account) => (
          <AccountDetailsPanel
            account={account}
            onClose={() => setSelectedAccountId(null)}
            onManageTags={setTagsDialogAccount}
          />
        )}
      />

      {wizardOpen && (
        <CreateManagedAccountWizard onClose={() => setWizardOpen(false)} />
      )}
      {tagsDialogAccount && (
        <ManageTagsDialog
          isOpen={!!tagsDialogAccount}
          onClose={() => setTagsDialogAccount(null)}
          entityName={tagsDialogAccount.name}
          initialTags={accountTagsToTagModel(tagsDialogAccount.tags)}
          suggestions={MOCK_TAG_SUGGESTIONS}
          onSave={async (_tags: Tag[]) => { await new Promise(r => setTimeout(r, 600)); }}
        />
      )}
    </>
  );
};

export default ManagedAccountsPage;
