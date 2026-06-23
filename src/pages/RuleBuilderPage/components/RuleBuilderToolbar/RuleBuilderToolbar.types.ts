import type { RuleBuilderCanvasState } from '../../RuleBuilderPage.types';

export interface RuleBuilderToolbarProps {
  // Title area
  title:              string;
  canvasState:        RuleBuilderCanvasState;
  onCommitTitle:      (next: string) => void;

  // Undo / redo
  canUndo:            boolean;
  canRedo:            boolean;
  onUndo:             () => void;
  onRedo:             () => void;

  // Validation trigger badge
  issueCount:         number;
  warningCount:       number;
  hasValidationBeenTriggered: boolean;
  isValidationPopoverOpen:    boolean;
  validationTriggerRef: React.RefObject<HTMLButtonElement>;
  onToggleValidation: () => void;

  // Actions
  onCancel:           () => void;
  onSaveDraft:        () => void;
  onActivate:         () => void;

  // Zoom controls
  zoomPercent:        number;
  onZoomIn:           () => void;
  onZoomOut:          () => void;
  onFitCanvas:        () => void;
}
