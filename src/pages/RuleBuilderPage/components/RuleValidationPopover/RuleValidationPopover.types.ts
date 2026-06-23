import type { RuleBranchIssueKind } from '../../RuleBuilderPage.types';

export interface ValidationIssueItem {
  branchId:    string;
  conditionId: string;
  kind:        RuleBranchIssueKind;
  isWarning:   boolean;
  nodeType:    string;
  nodeSummary: string;
  problem:     string;
  nextAction:  string;
}

export interface RuleValidationPopoverProps {
  isOpen:         boolean;
  triggerRef:     React.RefObject<HTMLButtonElement>;
  anchorEl:       HTMLElement | null;
  issueCount:     number;
  warningCount:   number;
  issues:         ValidationIssueItem[];
  broadScopeWarning?: string;
  onClose:        () => void;
  onSelectNode:   (nodeId: string) => void;
}
