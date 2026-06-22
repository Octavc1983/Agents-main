/**
 * VerticalTabsConfigurationTemplate — Page Composition Template
 *
 * Fills the entire Main Content area. AppShell, Sidebar, and Header remain intact.
 * Fixed vertical tab rail (left) + scrollable active-tab content + fixed footer.
 * Supports per-tab status, locked/read-only tabs, and page-level or tab-level save.
 *
 * This is NOT a DS component. It is a prototype-layer template.
 * No inline styles. No new tokens. SVG icons only.
 */

import React from 'react';
import { Button } from '@idira/design-system';
import type {
  VerticalTabsConfigurationTemplateProps,
  VerticalTab,
  VerticalTabStatus,
} from './VerticalTabsConfigurationTemplate.types';
import './VerticalTabsConfigurationTemplate.scss';

// ── Status indicator icons ─────────────────────────────────────────────────────

const DotIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true" className={className}>
    <circle cx="4" cy="4" r="3" fill="currentColor" />
  </svg>
);

const InvalidIcon: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.3" />
    <line x1="6" y1="3.5" x2="6" y2="6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <circle cx="6" cy="8.5" r="0.6" fill="currentColor" />
  </svg>
);

const WarnIcon: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M6 1.5L11 10H1L6 1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <line x1="6" y1="5" x2="6" y2="7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const LockIcon: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <rect x="2" y="5.5" width="8" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
    <path d="M4 5.5V4a2 2 0 0 1 4 0v1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const SavedCheckIcon: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2 6.5L5 9.5L10 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Tab status indicator ────────────────────────────────────────────────────────

function getTabStatusIndicator(status: VerticalTabStatus | undefined): React.ReactNode | null {
  switch (status) {
    case 'dirty':    return <DotIcon className="vtc-tpl__tab-indicator vtc-tpl__tab-indicator--dirty" />;
    case 'invalid':  return <InvalidIcon />;
    case 'warning':  return <WarnIcon />;
    case 'saved':    return <SavedCheckIcon />;
    case 'locked':   return <LockIcon />;
    default:         return null;
  }
}

function isTabOpenable(tab: VerticalTab): boolean {
  if (tab.isLocked) return false;
  if (tab.status === 'locked' || tab.status === 'saving') return false;
  return true;
}

// ── Tab rail ────────────────────────────────────────────────────────────────────

interface TabRailProps {
  tabs: ReadonlyArray<VerticalTab>;
  activeTab: string;
  onTabChange: (id: string) => void;
}

const TabRail: React.FC<TabRailProps> = ({ tabs, activeTab, onTabChange }) => (
  <nav className="vtc-tpl__rail" aria-label="Configuration sections">
    <ul className="vtc-tpl__tab-list" role="tablist" aria-orientation="vertical">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        const openable = isTabOpenable(tab);
        const indicator = getTabStatusIndicator(tab.status);

        return (
          <li key={tab.id} role="presentation">
            <button
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-disabled={!openable}
              className={[
                'vtc-tpl__tab',
                isActive ? 'vtc-tpl__tab--active' : '',
                !openable ? 'vtc-tpl__tab--locked' : '',
                tab.status ? `vtc-tpl__tab--${tab.status}` : '',
              ].filter(Boolean).join(' ')}
              onClick={() => openable && !isActive && onTabChange(tab.id)}
              title={tab.isLocked && tab.lockedTooltip ? tab.lockedTooltip : undefined}
              tabIndex={isActive ? 0 : -1}
            >
              {tab.icon && (
                <span className="vtc-tpl__tab-icon" aria-hidden="true">{tab.icon}</span>
              )}
              <span className="vtc-tpl__tab-label">{tab.label}</span>
              {indicator && (
                <span className="vtc-tpl__tab-status" aria-hidden="true">
                  {indicator}
                </span>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  </nav>
);

// ── VerticalTabsConfigurationTemplate ──────────────────────────────────────────

export const VerticalTabsConfigurationTemplate: React.FC<VerticalTabsConfigurationTemplateProps> = ({
  title,
  subtitle,
  tabs,
  activeTab,
  onTabChange,
  onCancel,
  onSave,
  saveLabel = 'Save changes',
  cancelLabel = 'Cancel',
  canSave = true,
  isSaving = false,
  isDirty = false,
  secondaryAction,
  children,
}) => {
  const isSaveDisabled = !canSave || isSaving;
  const resolvedSaveLabel = isSaving ? 'Saving…' : saveLabel;

  return (
    <div className="vtc-tpl">

      {/* ── Fixed header ─────────────────────────────────────────────── */}
      <header className="vtc-tpl__header">
        <div className="vtc-tpl__header-text">
          <h1 className="vtc-tpl__title">{title}</h1>
          {subtitle && <p className="vtc-tpl__subtitle">{subtitle}</p>}
        </div>
        {isDirty && !isSaving && (
          <span className="vtc-tpl__dirty-indicator" aria-label="Unsaved changes">
            Unsaved changes
          </span>
        )}
      </header>

      {/* ── Body: rail + content ─────────────────────────────────────── */}
      <div className="vtc-tpl__body">

        {/* Fixed vertical tab rail */}
        <TabRail tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />

        {/* Scrollable active-tab content */}
        <div
          className="vtc-tpl__content"
          role="tabpanel"
          aria-label={tabs.find((t) => t.id === activeTab)?.label ?? activeTab}
        >
          {children}
        </div>
      </div>

      {/* ── Fixed footer ─────────────────────────────────────────────── */}
      <footer className="vtc-tpl__footer">
        <Button
          variant="text"
          size="sm"
          onClick={onCancel}
          disabled={isSaving}
        >
          {cancelLabel}
        </Button>

        <div className="vtc-tpl__footer-actions">
          {secondaryAction}
          <Button
            variant="main"
            size="sm"
            onClick={onSave}
            disabled={isSaveDisabled}
          >
            {resolvedSaveLabel}
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default VerticalTabsConfigurationTemplate;
