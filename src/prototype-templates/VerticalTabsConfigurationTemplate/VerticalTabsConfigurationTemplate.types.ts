import type React from 'react';

export type VerticalTabStatus =
  | 'default'
  | 'dirty'
  | 'valid'
  | 'invalid'
  | 'saving'
  | 'saved'
  | 'warning'
  | 'failed'
  | 'blocked'
  | 'locked'
  | 'read-only';

export type ConfigurationSaveModel =
  | 'page-level-save'
  | 'tab-level-save'
  | 'auto-save'
  | 'mixed';

export interface VerticalTab {
  id: string;
  label: string;
  icon?: React.ReactNode;          // optional leading icon in tab rail
  status?: VerticalTabStatus;      // default: 'default'
  isLocked?: boolean;              // prevents opening; locked > status
  isReadOnly?: boolean;            // can open, all fields are read-only
  lockedTooltip?: string;          // shown when user hovers/clicks a locked tab
}

export interface VerticalTabsConfigurationTemplateProps {
  title: string;
  subtitle?: string;               // optional secondary line in header

  tabs: readonly VerticalTab[];
  activeTab: string;               // id of currently active tab
  onTabChange: (tabId: string) => void;

  // Footer actions
  onCancel: () => void;
  onSave: () => void;
  saveLabel?: string;              // default: 'Save changes'
  cancelLabel?: string;            // default: 'Cancel'

  // State controls
  canSave?: boolean;               // default: true; set false to disable primary save
  isSaving?: boolean;              // disables all footer actions + shows loading label
  isDirty?: boolean;               // page-level: any unsaved changes exist

  saveModel?: ConfigurationSaveModel; // default: 'page-level-save'

  // Optional secondary footer action (e.g. "Reset to defaults")
  secondaryAction?: React.ReactNode;

  children: React.ReactNode;       // content for the active tab — scrollable region
}
