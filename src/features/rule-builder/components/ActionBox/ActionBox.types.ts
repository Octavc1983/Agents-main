export type ActionBoxStatus =
  | 'draft'
  | 'configured'
  | 'selected'
  | 'invalid'
  | 'disabled'
  | 'read-only';

export interface ActionOption {
  id:          string;
  label:       string;
  description: string;
}

export interface ActionBoxData {
  id:                  string;
  status:              ActionBoxStatus;
  actionId:            string | null;
  actionLabel:         string;
  hasInputConnection:  boolean;
  isMenuAvailable?:    boolean;
  isReadOnly?:         boolean;
}

export interface ActionBoxStateSummary {
  nodeId:              string;
  isConfigured:        boolean;
  hasInputConnection:  boolean;
}

export interface ActionBoxProps {
  data:           ActionBoxData;
  actionOptions:  ActionOption[];
  onSelect?:      (id: string) => void;
  onActionChange?: (nodeId: string, actionId: string) => void;
  onMenuOpen?:    (nodeId: string, triggerRect: DOMRect) => void;
  onStateSummary?: (summary: ActionBoxStateSummary) => void;
}
