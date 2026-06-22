import React, { useState, useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@idira/design-system';
import { HorizontalTabs } from '@idira/design-system';
import { TableFiltersTemplate } from '../../prototype-templates/TableFiltersTemplate';
import type { TableColumn } from '../../prototype-templates/TableFiltersTemplate';
import { EntityPickerPopover } from './EntityPickerPopover';
import type { RuleCenterRule, RuleTabType, RuleEntityType } from './RuleCenterPage.types';
import { RULE_CENTER_MOCK } from '../../mock/ruleCenterMockData';
import './RuleCenterPage.scss';

// ── SVG icons ─────────────────────────────────────────────────────────────────

const DraftStatusIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-label="Draft" role="img">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
  </svg>
);

const ActiveStatusIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-label="Active" role="img">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="10" cy="10" r="4" fill="currentColor" />
  </svg>
);

const DownloadIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M7 1v8M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const MoreIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="3" cy="8" r="1.25" fill="currentColor" />
    <circle cx="8" cy="8" r="1.25" fill="currentColor" />
    <circle cx="13" cy="8" r="1.25" fill="currentColor" />
  </svg>
);

// ── Tab items ─────────────────────────────────────────────────────────────────

const TAB_ITEMS = [
  { id: 'enrichment',  label: 'Enrichment'  },
  { id: 'remediation', label: 'Remediation' },
];

// ── Filter groups ─────────────────────────────────────────────────────────────

const FILTER_GROUPS = [
  {
    id: 'status', label: 'Status', type: 'multi-select' as const,
    options: [
      { value: 'draft',    label: 'Draft'    },
      { value: 'active',   label: 'Active'   },
      { value: 'inactive', label: 'Inactive' },
    ],
  },
  {
    id: 'entity', label: 'Entity', type: 'multi-select' as const,
    options: [
      { value: 'Accounts',          label: 'Accounts'          },
      { value: 'Manage accounts',   label: 'Manage accounts'   },
      { value: 'Federated users',   label: 'Federated users'   },
      { value: 'Federated groups',  label: 'Federated groups'  },
      { value: 'Web application',   label: 'Web application'   },
      { value: 'Users',             label: 'Users'             },
      { value: 'Virtual machines',  label: 'Virtual machines'  },
    ],
  },
  {
    id: 'createdBy', label: 'Created by', type: 'multi-select' as const,
    options: [
      { value: 'System',               label: 'System'               },
      { value: 'admin@cyberark.com',   label: 'admin@cyberark.com'   },
    ],
  },
];

// ── Action badge ──────────────────────────────────────────────────────────────

const ACTION_ICON_MAP: Record<string, React.ReactNode> = {
  'Remove tag': (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'Set risk': (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 4v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="6" cy="8.5" r="0.6" fill="currentColor" />
    </svg>
  ),
};

const ActionBadge: React.FC<{ action: string }> = ({ action }) => (
  <span className={`rc-action-badge rc-action-badge--${action === 'Remove tag' ? 'tag' : 'risk'}`}>
    {ACTION_ICON_MAP[action]}
    <span>{action}</span>
  </span>
);

// ── Rule name cell ─────────────────────────────────────────────────────────────

const RuleNameCell: React.FC<{ rule: RuleCenterRule }> = ({ rule }) => (
  <div className="rc-name-cell">
    <span className="rc-name-cell__name" title={rule.name}>{rule.name}</span>
    <span className="rc-name-cell__meta">
      <span>Entity: {rule.entityMeta.type}</span>
      <span>Type: {rule.entityMeta.platform}</span>
      <span>Subtype: {rule.entityMeta.subtype}</span>
      <span>Source: {rule.entityMeta.source}</span>
    </span>
  </div>
);

// ── Format time ───────────────────────────────────────────────────────────────

function formatTime(d: Date): string {
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

// ── RuleCenterPage ────────────────────────────────────────────────────────────

export const RuleCenterPage: React.FC = () => {
  const navigate = useNavigate();
  const addBtnRef = useRef<HTMLButtonElement>(null);

  const [activeTab, setActiveTab]             = useState<RuleTabType>('enrichment');
  const [entityPickerOpen, setEntityPickerOpen] = useState(false);
  const [anchorRect, setAnchorRect]           = useState<DOMRect | null>(null);
  const [updatedAt, setUpdatedAt]             = useState(() => formatTime(new Date()));
  const [isRefreshing, setIsRefreshing]       = useState(false);

  const rows = RULE_CENTER_MOCK[activeTab];

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleTabChange = useCallback((id: string) => {
    setActiveTab(id as RuleTabType);
  }, []);

  const handleAddRuleSet = useCallback(() => {
    const rect = addBtnRef.current?.getBoundingClientRect();
    if (!rect) return;
    setAnchorRect(rect);
    setEntityPickerOpen(true);
  }, []);

  const handleEntitySelect = useCallback((entity: RuleEntityType) => {
    navigate(`/manage/rules-center/new?entity=${entity}`);
  }, [navigate]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setUpdatedAt(formatTime(new Date()));
      setIsRefreshing(false);
    }, 600);
  }, []);

  // ── Filter value ─────────────────────────────────────────────────────────────

  const getFilterValue = useCallback((rule: RuleCenterRule, groupId: string): string => {
    if (groupId === 'status')    return rule.status;
    if (groupId === 'entity')    return rule.entity;
    if (groupId === 'createdBy') return rule.createdBy;
    return '';
  }, []);

  // ── Searchable fields ─────────────────────────────────────────────────────────

  const searchableFields = useMemo(() => [
    (r: RuleCenterRule) => r.name,
    (r: RuleCenterRule) => r.entity,
    (r: RuleCenterRule) => r.createdBy,
  ], []);

  // ── Columns ───────────────────────────────────────────────────────────────────

  const columns = useMemo<TableColumn<RuleCenterRule>[]>(() => [
    {
      id: 'status',
      label: '',
      narrow: true,
      render: (row) => (
        <span className={`rc-status-icon rc-status-icon--${row.status}`}>
          {row.status === 'active' ? <ActiveStatusIcon /> : <DraftStatusIcon />}
        </span>
      ),
    },
    {
      id: 'name',
      label: 'Name',
      render: (row) => <RuleNameCell rule={row} />,
      searchableValue: (row) => row.name,
    },
    {
      id: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="rc-actions-cell">
          {row.actions.map((a) => <ActionBadge key={a} action={a} />)}
        </div>
      ),
    },
    {
      id: 'entity',
      label: 'Entity',
      render: (row) => (
        <span className="rc-cell-text" title={row.entity}>{row.entity}</span>
      ),
      hideWhenNarrow: true,
    },
    {
      id: 'createdBy',
      label: 'Created by',
      render: (row) => (
        <span className="rc-cell-text" title={row.createdBy}>{row.createdBy}</span>
      ),
      hideWhenNarrow: true,
    },
    {
      id: 'rulesCount',
      label: 'Rules',
      narrow: true,
      render: (row) => (
        <span className="rc-cell-text rc-cell-text--center">{row.rulesCount}</span>
      ),
    },
    {
      id: 'lastUpdated',
      label: 'Last updated',
      render: (row) => (
        <span className="rc-cell-text" title={row.lastUpdated}>{row.lastUpdated}</span>
      ),
      hideWhenNarrow: true,
    },
    {
      id: 'edit',
      label: '',
      narrow: true,
      render: (row) => (
        <button
          type="button"
          className="rc-edit-btn"
          onClick={(e) => { e.stopPropagation(); navigate(`/manage/rules-center/${row.id}`); }}
          aria-label={`Edit ${row.name}`}
        >
          Edit
        </button>
      ),
    },
  ], [navigate]);

  // ── Toolbar actions ───────────────────────────────────────────────────────────

  const secondaryActions = (
    <div className="rc-toolbar-secondary">
      <button type="button" className="rc-download-btn" aria-label="Download history">
        <DownloadIcon />
        <span>Download history</span>
      </button>
    </div>
  );

  const primaryAction = (
    <div className="rc-toolbar-primary">
      <button
        ref={addBtnRef}
        type="button"
        className="rc-add-btn"
        onClick={handleAddRuleSet}
        aria-haspopup="menu"
        aria-expanded={entityPickerOpen}
      >
        Add rule set
      </button>
      <button type="button" className="rc-more-btn" aria-label="More actions">
        <MoreIcon />
      </button>
    </div>
  );

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div className="rule-center">

      {/* Page title */}
      <h1 className="rule-center__title">Rule center</h1>

      {/* Tabs */}
      <div className="rule-center__tabs">
        <HorizontalTabs
          items={TAB_ITEMS}
          activeId={activeTab}
          onChange={handleTabChange}
        />
      </div>

      {/* Table */}
      <div className="rule-center__table">
        <TableFiltersTemplate<RuleCenterRule>
          title=""
          rows={rows}
          columns={columns}
          getRowId={(r) => r.id}
          searchPlaceholder="Search"
          searchableFields={searchableFields}
          filterGroups={FILTER_GROUPS}
          getFilterValue={getFilterValue}
          primaryAction={primaryAction}
          secondaryActions={secondaryActions}
          updatedAt={updatedAt}
          onRefresh={handleRefresh}
          isLoading={isRefreshing}
          emptyTitle="No rule sets"
          emptyDescription="Add a rule set to get started."
        />
      </div>

      {/* Entity picker popover */}
      {entityPickerOpen && anchorRect && (
        <EntityPickerPopover
          anchorRect={anchorRect}
          onSelect={handleEntitySelect}
          onClose={() => setEntityPickerOpen(false)}
        />
      )}
    </div>
  );
};

export default RuleCenterPage;
