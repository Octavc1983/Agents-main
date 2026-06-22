export type ConditionNodeStatus =
  | 'draft'
  | 'valid'
  | 'invalid'
  | 'warning'
  | 'selected'
  | 'read-only'
  | 'disabled';

export type ConditionOperator =
  | 'equals'
  | 'not-equals'
  | 'contains'
  | 'does-not-contain'
  | 'exists'
  | 'does-not-exist'
  | 'greater-than'
  | 'less-than';

export type ConditionBoxData = {
  id: string;
  status: ConditionNodeStatus;

  propertyLabel: string;
  operatorLabel: string;
  valueLabel?: string;

  hasInputConnection: boolean;
  hasTrueConnection: boolean;
  hasFalseConnection: boolean;

  validationMessageKey?: string;
  warningMessageKey?: string;

  isReadOnly?: boolean;
  isMenuAvailable?: boolean;
};

export type ConditionBoxStateSummary = {
  nodeId: string;
  isValid: boolean;
  hasWarning: boolean;
  hasInputConnection: boolean;
  hasTrueConnection: boolean;
  hasFalseConnection: boolean;
};

export type ConditionBoxProps = {
  data: ConditionBoxData;
  /** Fired when the node body (not port, not menu) is clicked. */
  onSelect?: (nodeId: string) => void;
  /** Fired when the menu trigger is clicked. */
  onMenuOpen?: (nodeId: string, anchorRect: DOMRect) => void;
  /** Fired when an output port is clicked (drag-start for connection). */
  onPortClick?: (nodeId: string, port: 'input' | 'true' | 'false') => void;
  /** Called whenever local validity changes. */
  onStateSummary?: (summary: ConditionBoxStateSummary) => void;
};
