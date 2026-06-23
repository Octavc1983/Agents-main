import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  SearchIcon,
  WarningIcon,
  ErrorCircleIcon,
  CheckCircleIcon,
  DotsMenuIcon,
} from '@idira/design-system/icons';
import { ConditionBox } from '../../features/rule-builder/components/ConditionBox';
import { confirmationDialogTemplate } from '../../prototype-templates/ConfirmationDialogTemplate';
import type { RuleEntityType } from '../RuleCenterPage/RuleCenterPage.types';
import type {
  CanvasConnection,
  ConditionNodeData,
  RuleBuilderCanvasState,
  RuleGraphSnapshot,
  RuleValidationResult,
  CanvasViewport,
} from './RuleBuilderPage.types';
import {
  getRuleBuilderEntityLabel,
  makeStartNode,
  RULE_BUILDER_ENTITY_OPTIONS,
  MOCK_SAVE_DELAY_MS,
  MOCK_ACTIVATE_DELAY_MS,
  MOCK_SAVE_OUTCOME,
  MOCK_ACTIVATE_OUTCOME,
} from '../../mock/ruleBuilderMockData';
import './RuleBuilderPage.scss';

// ── Content strings ───────────────────────────────────────────────────────────
// All visible text and aria-labels live here. No raw strings in JSX.

const CONTENT = {
  defaultTitle:             'New Rule Set',
  wipBadge:                 'WIP',
  editTitleLabel:           'Edit rule title',
  titleInputLabel:          'Rule title',
  searchPlaceholder:        'Search rule graph',
  searchLabel:              'Search rule graph',
  searchClearLabel:         'Clear search',
  searchMatchSingular:      'match',
  searchMatchPlural:        'matches',
  searchNoResults:          'No matching nodes found',
  searchResultLabel:        'Search results',
  searchResultItemLabel:    (type: string, summary: string) => `${type}: ${summary}`,
  summaryNodes:             'nodes',
  summaryConditions:        'conditions',
  summaryDot:               '·',
  validationStatusLabel:    'Rule validation status',
  statusDraft:              'Draft',
  statusReady:              'Ready to activate',
  statusSaving:             'Saving…',
  statusSaved:              'Saved',
  statusSaveFailed:         'Save failed',
  statusActivating:         'Activating…',
  statusActive:             'Active',
  statusActivationFailed:   'Activation failed',
  statusReadOnly:           'Read-only',
  statusEmpty:              'Empty',
  statusIssue:              'issue',
  statusIssues:             'issues',
  statusWarning:            'warning',
  statusWarnings:           'warnings',
  statusIssueSep:           ' · ',
  undoLabel:                'Undo last change',
  redoLabel:                'Redo last change',
  cancelLabel:              'Cancel',
  saveDraftLabel:           'Save as draft',
  savingLabel:              'Saving…',
  savedLabel:               'Saved',
  saveFailedLabel:          'Save failed — Retry',
  activateLabel:            'Activate',
  activatingLabel:          'Activating…',
  activeLabel:              'Active',
  activationFailedLabel:    'Retry activation',
  zoomOutLabel:             'Zoom out',
  zoomInLabel:              'Zoom in',
  fitLabel:                 'Fit rule graph to view',
  addConditionLabel:        'Add condition',
  addConditionShort:        'Add\ncondition',
  startNodeLabel:           'Start point',
  entityFieldLabel:         'Entity',
  startNodeMenuLabel:       'Start node actions',
  discardTitle:             'Discard changes?',
  discardDesc:              'You have unsaved changes. If you leave now, your rule configuration will be lost.',
  discardConfirm:           'Discard changes',
  discardCancel:            'Keep editing',
  // Validation popover
  popoverTitleIssues:       (n: number) => n === 1 ? '1 issue' : `${n} issues`,
  popoverTitleWarnings:     (n: number) => n === 1 ? '1 warning' : `${n} warnings`,
  popoverTitleMixed:        (e: number, w: number) =>
    `${e === 1 ? '1 issue' : `${e} issues`} · ${w === 1 ? '1 warning' : `${w} warnings`}`,
  popoverTitleValid:        'No issues',
  popoverBodyValid:         'All conditions are valid and the rule is ready to activate.',
  popoverClose:             'Close validation panel',
  popoverNodeTypeCondition: 'Condition',
  popoverNodeTypeSummary:   (prop: string) => prop || 'Unnamed condition',
  popoverProblemOrphaned:   'This condition is not connected to the rule graph.',
  popoverNextOrphaned:      'Connect an input from the Start point or another condition.',
  popoverProblemNoProperty: 'No property selected.',
  popoverNextNoProperty:    'Select a property to define what this condition checks.',
  popoverProblemNoOperator: 'No operator selected.',
  popoverNextNoOperator:    'Select an operator to define how the property is evaluated.',
  popoverProblemNoValue:    (op: string) => op ? `Enter a value for "${op}".` : 'A value is required for this operator.',
  popoverNextNoValue:       'Choose a value to complete this condition.',
  popoverProblemNoTrue:     'True branch is not connected.',
  popoverNextNoTrue:        'Connect the True output to continue the rule path.',
  popoverProblemNoFalse:    'False branch is not connected.',
  popoverNextNoFalse:       'Connect the False output or leave it intentionally open.',
  popoverProblemBothBranches: 'Neither True nor False branch is connected.',
  popoverNextBothBranches:  'Connect at least one branch to define the rule path.',
  // Validate-then-activate with warnings
  activateWithWarningsTitle: 'Activate with warnings?',
  activateWithWarningsDesc:  'This rule has open branch warnings. Conditions without a False branch will stop the rule when not matched. The rule will still activate and process matching entities.',
  activateWithWarningsConfirm: 'Activate anyway',
  activateWithWarningsCancel:  'Keep editing',
  // Validation messages (graph-level, not node-level)
  validationNoConditions:   'Add at least one condition to activate this rule.',
  validationNoStartEntity:  'Start node must have a valid entity type.',
  validationDuplicateIds:   'Duplicate node IDs detected. Please reset the canvas.',
  validationCycle:          'Unsupported cycle detected in the rule graph.',
} as const;

// ── Zoom + canvas constants ───────────────────────────────────────────────────

const ZOOM_STEP    = 0.1;
const ZOOM_MIN     = 0.25;
const ZOOM_MAX     = 2.0;
const ZOOM_DEFAULT = 1.0;
const CANVAS_SAFETY_MARGIN = 48;
const NODE_W = 300;
const NODE_H = 120;
const MAX_HISTORY = 50;

// ── Operators that do NOT require a value ─────────────────────────────────────

const OPERATORS_WITHOUT_VALUE = new Set(['exists', 'does-not-exist', 'Exists', 'Does not exist']);

// ── Canvas toolbar icons ──────────────────────────────────────────────────────

const EditTitleIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 10.5V12h1.5L11 4.5 9.5 3 2 10.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M9.5 3L11 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const ZoomOutIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M4 6h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M10.5 10.5L13 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const ZoomInIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M4 6h4M6 4v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M10.5 10.5L13 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const FitIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.3" />
    <path d="M2 5h10M5 2v10" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
  </svg>
);

const UndoIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 5h5a4 4 0 0 1 0 8H4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 5l2.5-2.5M2 5l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RedoIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M12 5H7a4 4 0 0 0 0 8h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 5l-2.5-2.5M12 5l-2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AddCircleIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 6v8M6 10h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CloseSmIcon: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

// ── Start Node ────────────────────────────────────────────────────────────────

const StartNode: React.FC<{ entityLabel: string; onAddCondition: () => void }> = ({
  entityLabel,
  onAddCondition,
}) => (
  <div className="rb-start-node">
    <div className="rb-start-node__header">
      <span className="rb-start-node__label">{CONTENT.startNodeLabel}</span>
      <button type="button" className="rb-start-node__menu" aria-label={CONTENT.startNodeMenuLabel}>
        <DotsMenuIcon size={14} />
      </button>
    </div>
    <div className="rb-start-node__body">
      <span className="rb-start-node__field-label">{CONTENT.entityFieldLabel}</span>
      <span className="rb-start-node__field-value">{entityLabel}</span>
    </div>
    <div className="rb-start-node__port-row">
      <div className="rb-start-node__connector-line" aria-hidden="true" />
      <button
        type="button"
        className="rb-start-node__add-btn"
        onClick={onAddCondition}
        aria-label={CONTENT.addConditionLabel}
      >
        <AddCircleIcon />
      </button>
    </div>
  </div>
);

// ── Connector (SVG children — must be inside an <svg>) ────────────────────────

const ConnectorLine: React.FC<{
  fromX: number; fromY: number;
  toX: number;   toY: number;
}> = ({ fromX, fromY, toX, toY }) => {
  const mx = (fromX + toX) / 2;
  return (
    <g className="rb-canvas__connector">
      <path
        d={`M ${fromX} ${fromY} C ${mx} ${fromY}, ${mx} ${toY}, ${toX} ${toY}`}
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx={fromX} cy={fromY} r="4" fill="currentColor" />
    </g>
  );
};

// ── Graph validation ──────────────────────────────────────────────────────────

// Per-node issue type for enhanced popover display
export type NodeIssueKind =
  | 'orphaned'
  | 'no-property'
  | 'no-operator'
  | 'no-value'
  | 'no-true-branch'
  | 'no-false-branch'
  | 'no-branches';

export interface NodeIssue {
  nodeId: string;
  kind: NodeIssueKind;
  isWarning: boolean;
}

export interface EnhancedValidationResult extends RuleValidationResult {
  nodeIssues: NodeIssue[];
  graphErrorMessage?: string;
}

function validateGraph(
  entityType: string,
  nodes: ConditionNodeData[],
  connections: CanvasConnection[],
): EnhancedValidationResult {
  // 1. Start Node entity
  if (!entityType || !RULE_BUILDER_ENTITY_OPTIONS.some((o) => o.value === entityType)) {
    return { isValid: false, invalidNodeIds: [], warningNodeIds: [], nodeIssues: [], graphErrorMessage: CONTENT.validationNoStartEntity };
  }

  // 2. At least one condition
  if (nodes.length === 0) {
    return { isValid: false, invalidNodeIds: [], warningNodeIds: [], nodeIssues: [], graphErrorMessage: CONTENT.validationNoConditions };
  }

  // 3. Duplicate node IDs
  const ids = nodes.map((n) => n.id);
  const uniqueIds = new Set(ids);
  if (uniqueIds.size !== ids.length) {
    return { isValid: false, invalidNodeIds: [], warningNodeIds: [], nodeIssues: [], graphErrorMessage: CONTENT.validationDuplicateIds };
  }

  // 4. Cycle detection (DFS)
  const allNodeIds = new Set(['start-node', ...ids]);
  const adjacency = new Map<string, string[]>();
  for (const conn of connections) {
    if (!adjacency.has(conn.fromNodeId)) adjacency.set(conn.fromNodeId, []);
    adjacency.get(conn.fromNodeId)!.push(conn.toNodeId);
  }
  const hasCycle = (() => {
    const visited = new Set<string>();
    const inStack = new Set<string>();
    function dfs(nodeId: string): boolean {
      if (inStack.has(nodeId)) return true;
      if (visited.has(nodeId)) return false;
      visited.add(nodeId);
      inStack.add(nodeId);
      for (const next of (adjacency.get(nodeId) ?? [])) {
        if (dfs(next)) return true;
      }
      inStack.delete(nodeId);
      return false;
    }
    for (const id of allNodeIds) { if (dfs(id)) return true; }
    return false;
  })();
  if (hasCycle) {
    return { isValid: false, invalidNodeIds: [], warningNodeIds: [], nodeIssues: [], graphErrorMessage: CONTENT.validationCycle };
  }

  // 5. Reachability (BFS) from start-node
  const reachable = new Set<string>(['start-node']);
  const queue = ['start-node'];
  while (queue.length > 0) {
    const curr = queue.shift()!;
    for (const next of (adjacency.get(curr) ?? [])) {
      if (!reachable.has(next)) { reachable.add(next); queue.push(next); }
    }
  }

  const invalidNodeIds: string[] = [];
  const warningNodeIds: string[] = [];
  const nodeIssues: NodeIssue[] = [];

  for (const node of nodes) {
    const incomingConn = connections.filter((c) => c.toNodeId === node.id);

    // 6. Invalid connector references
    for (const conn of connections) {
      if (!allNodeIds.has(conn.fromNodeId) || !allNodeIds.has(conn.toNodeId)) {
        if (!invalidNodeIds.includes(node.id)) invalidNodeIds.push(node.id);
        nodeIssues.push({ nodeId: node.id, kind: 'orphaned', isWarning: false });
        break;
      }
    }
    if (invalidNodeIds.includes(node.id)) continue;

    // 7. Orphaned — no incoming, not reachable
    if (incomingConn.length === 0 && !reachable.has(node.id)) {
      invalidNodeIds.push(node.id);
      nodeIssues.push({ nodeId: node.id, kind: 'orphaned', isWarning: false });
      continue;
    }

    // 8. Per-node content checks
    if (!node.propertyLabel) {
      invalidNodeIds.push(node.id);
      nodeIssues.push({ nodeId: node.id, kind: 'no-property', isWarning: false });
      continue;
    }
    if (!node.operatorLabel) {
      invalidNodeIds.push(node.id);
      nodeIssues.push({ nodeId: node.id, kind: 'no-operator', isWarning: false });
      continue;
    }
    if (!OPERATORS_WITHOUT_VALUE.has(node.operatorLabel) && !node.valueLabel) {
      invalidNodeIds.push(node.id);
      nodeIssues.push({ nodeId: node.id, kind: 'no-value', isWarning: false });
      continue;
    }

    // 9. Branch warnings
    const outgoing = connections.filter((c) => c.fromNodeId === node.id);
    const hasTrueBranch  = outgoing.some((c) => c.fromPort === 'true');
    const hasFalseBranch = outgoing.some((c) => c.fromPort === 'false');
    if (!hasTrueBranch && !hasFalseBranch) {
      warningNodeIds.push(node.id);
      nodeIssues.push({ nodeId: node.id, kind: 'no-branches', isWarning: true });
    } else if (!hasTrueBranch) {
      warningNodeIds.push(node.id);
      nodeIssues.push({ nodeId: node.id, kind: 'no-true-branch', isWarning: true });
    } else if (!hasFalseBranch) {
      warningNodeIds.push(node.id);
      nodeIssues.push({ nodeId: node.id, kind: 'no-false-branch', isWarning: true });
    }
  }

  return { isValid: invalidNodeIds.length === 0, invalidNodeIds, warningNodeIds, nodeIssues };
}

// ── Validation trigger label (RB-4) ──────────────────────────────────────────

function getValidationTriggerLabel(
  state: RuleBuilderCanvasState,
  invalidCount: number,
  warningCount: number,
): string {
  switch (state) {
    case 'saving':           return CONTENT.statusSaving;
    case 'saved':            return CONTENT.statusSaved;
    case 'save-failed':      return CONTENT.statusSaveFailed;
    case 'activating':       return CONTENT.statusActivating;
    case 'active':           return CONTENT.statusActive;
    case 'activation-failed':return CONTENT.statusActivationFailed;
    case 'read-only':        return CONTENT.statusReadOnly;
    case 'empty':            return CONTENT.statusEmpty;
    default: break;
  }
  if (invalidCount > 0 && warningCount > 0) {
    return CONTENT.popoverTitleMixed(invalidCount, warningCount);
  }
  if (invalidCount > 0) {
    return invalidCount === 1
      ? `1 ${CONTENT.statusIssue}`
      : `${invalidCount} ${CONTENT.statusIssues}`;
  }
  if (warningCount > 0) {
    return warningCount === 1
      ? `1 ${CONTENT.statusWarning}`
      : `${warningCount} ${CONTENT.statusWarnings}`;
  }
  if (state === 'draft' || state === 'dirty' || state === 'valid') {
    return CONTENT.statusReady;
  }
  return CONTENT.statusEmpty;
}

function getStatusIconEl(state: RuleBuilderCanvasState, invalidCount: number, warningCount: number): React.ReactElement {
  if (state === 'activation-failed' || state === 'save-failed' || invalidCount > 0) {
    return <ErrorCircleIcon size={14} className="rb__status-icon rb__status-icon--invalid" />;
  }
  if (warningCount > 0) {
    return <WarningIcon size={14} className="rb__status-icon rb__status-icon--warning" />;
  }
  if (state === 'active' || state === 'saved' || state === 'valid' || state === 'draft' || state === 'dirty') {
    return <CheckCircleIcon size={14} className="rb__status-icon rb__status-icon--valid" />;
  }
  return <CheckCircleIcon size={14} className="rb__status-icon rb__status-icon--idle" />;
}

// ── Issue copy helpers (RB-6) ─────────────────────────────────────────────────

function getIssueProblem(issue: NodeIssue, node: ConditionNodeData | undefined): string {
  switch (issue.kind) {
    case 'orphaned':      return CONTENT.popoverProblemOrphaned;
    case 'no-property':   return CONTENT.popoverProblemNoProperty;
    case 'no-operator':   return CONTENT.popoverProblemNoOperator;
    case 'no-value':      return CONTENT.popoverProblemNoValue(node?.operatorLabel ?? '');
    case 'no-true-branch':return CONTENT.popoverProblemNoTrue;
    case 'no-false-branch':return CONTENT.popoverProblemNoFalse;
    case 'no-branches':   return CONTENT.popoverProblemBothBranches;
  }
}

function getIssueNextAction(issue: NodeIssue): string {
  switch (issue.kind) {
    case 'orphaned':      return CONTENT.popoverNextOrphaned;
    case 'no-property':   return CONTENT.popoverNextNoProperty;
    case 'no-operator':   return CONTENT.popoverNextNoOperator;
    case 'no-value':      return CONTENT.popoverNextNoValue;
    case 'no-true-branch':return CONTENT.popoverNextNoTrue;
    case 'no-false-branch':return CONTENT.popoverNextNoFalse;
    case 'no-branches':   return CONTENT.popoverNextBothBranches;
  }
}

// ── Search Results Popover (RB-1) ─────────────────────────────────────────────

interface SearchResult {
  nodeId: string;
  nodeType: string;
  summary: string;
  matchContext: string;
}

interface SearchPopoverProps {
  results: SearchResult[];
  query: string;
  onSelect: (nodeId: string) => void;
  onClose: () => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
}

const SearchPopover: React.FC<SearchPopoverProps> = ({
  results,
  query,
  onSelect,
  onClose,
  searchInputRef,
}) => {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const searchWrap = searchInputRef.current?.closest('.rb__search-wrap');
      if (
        listRef.current &&
        !listRef.current.contains(e.target as Node) &&
        searchWrap &&
        !searchWrap.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose, searchInputRef]);

  return (
    <ul
      ref={listRef}
      className="rb__search-popover"
      role="listbox"
      aria-label={CONTENT.searchResultLabel}
    >
      {results.length === 0 ? (
        <li className="rb__search-popover__empty" role="option" aria-selected="false">
          {CONTENT.searchNoResults}
        </li>
      ) : (
        results.map((r) => (
          <li key={r.nodeId} role="option" aria-selected="false" className="rb__search-popover__item">
            <button
              type="button"
              className="rb__search-popover__btn"
              aria-label={CONTENT.searchResultItemLabel(r.nodeType, r.summary)}
              onClick={() => { onSelect(r.nodeId); onClose(); }}
            >
              <span className="rb__search-popover__node-type">{r.nodeType}</span>
              <span className="rb__search-popover__summary">{r.summary}</span>
              {r.matchContext && (
                <span className="rb__search-popover__context">
                  {highlightMatch(r.matchContext, query)}
                </span>
              )}
            </button>
          </li>
        ))
      )}
    </ul>
  );
};

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rb__search-popover__highlight">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

// ── Validation Popover (RB-6) ─────────────────────────────────────────────────

interface ValidationPopoverProps {
  validation: EnhancedValidationResult;
  nodes: ConditionNodeData[];
  onClose: () => void;
  onSelectNode: (nodeId: string) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const ValidationPopover: React.FC<ValidationPopoverProps> = ({
  validation,
  nodes,
  onClose,
  onSelectNode,
  triggerRef,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); triggerRef.current?.focus(); }
    };
    const handleClick = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [onClose, triggerRef]);

  useEffect(() => {
    const first = popoverRef.current?.querySelector<HTMLElement>('button, [tabindex="0"]');
    first?.focus();
  }, []);

  const errCount  = validation.invalidNodeIds.length;
  const warnCount = validation.warningNodeIds.length;
  const isClean   = errCount === 0 && warnCount === 0;

  const title = isClean
    ? CONTENT.popoverTitleValid
    : errCount > 0 && warnCount > 0
      ? CONTENT.popoverTitleMixed(errCount, warnCount)
      : errCount > 0
        ? CONTENT.popoverTitleIssues(errCount)
        : CONTENT.popoverTitleWarnings(warnCount);

  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  // Errors first, then warnings — matches spec order
  const errorIssues   = validation.nodeIssues.filter((i) => !i.isWarning);
  const warningIssues = validation.nodeIssues.filter((i) => i.isWarning);
  const orderedIssues = [...errorIssues, ...warningIssues];

  return (
    <div
      className="rb__validation-popover"
      role="dialog"
      aria-label={title}
      aria-modal="false"
      ref={popoverRef}
    >
      <div className="rb__validation-popover__header">
        <span className="rb__validation-popover__title">{title}</span>
        <button
          type="button"
          className="rb__validation-popover__close"
          onClick={() => { onClose(); triggerRef.current?.focus(); }}
          aria-label={CONTENT.popoverClose}
        >
          <CloseSmIcon />
        </button>
      </div>

      <div className="rb__validation-popover__body">
        {isClean ? (
          <p className="rb__validation-popover__empty">{CONTENT.popoverBodyValid}</p>
        ) : validation.graphErrorMessage ? (
          <p className="rb__validation-popover__graph-error">
            <ErrorCircleIcon size={14} className="rb__validation-popover__item-icon rb__validation-popover__item-icon--invalid" />
            {validation.graphErrorMessage}
          </p>
        ) : (
          <ul className="rb__validation-popover__list" role="list">
            {orderedIssues.map((issue, idx) => {
              const node = nodeMap.get(issue.nodeId);
              const summary   = CONTENT.popoverNodeTypeSummary(node?.propertyLabel ?? '');
              const problem   = getIssueProblem(issue, node);
              const nextAction = getIssueNextAction(issue);
              const Icon = issue.isWarning
                ? <WarningIcon size={14} className="rb__validation-popover__item-icon rb__validation-popover__item-icon--warning" />
                : <ErrorCircleIcon size={14} className="rb__validation-popover__item-icon rb__validation-popover__item-icon--invalid" />;

              return (
                <li
                  key={`${issue.nodeId}-${issue.kind}-${idx}`}
                  className={`rb__validation-popover__item rb__validation-popover__item--${issue.isWarning ? 'warning' : 'invalid'}`}
                >
                  <button
                    type="button"
                    className="rb__validation-popover__node-btn"
                    onClick={() => { onSelectNode(issue.nodeId); onClose(); triggerRef.current?.focus(); }}
                  >
                    <span className="rb__validation-popover__item-icon-wrap" aria-hidden="true">
                      {Icon}
                    </span>
                    <span className="rb__validation-popover__item-body">
                      <span className="rb__validation-popover__item-header">
                        <span className="rb__validation-popover__node-type">{CONTENT.popoverNodeTypeCondition}</span>
                        <span className="rb__validation-popover__node-summary">{summary}</span>
                      </span>
                      <span className="rb__validation-popover__item-problem">{problem}</span>
                      <span className="rb__validation-popover__item-next">{nextAction}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

// ── RuleBuilderPage ───────────────────────────────────────────────────────────

export const RuleBuilderPage: React.FC = () => {
  const navigate        = useNavigate();
  const [searchParams]  = useSearchParams();
  const nodeCounter     = useRef(0);
  const workspaceRef    = useRef<HTMLDivElement>(null);
  const validationBtnRef = useRef<HTMLButtonElement | null>(null);
  const searchInputRef  = useRef<HTMLInputElement | null>(null);

  const entityType  = (searchParams.get('entity') ?? 'accounts') as RuleEntityType;
  const entityLabel = getRuleBuilderEntityLabel(entityType);

  const startNode = useMemo(
    () => makeStartNode(entityType, entityLabel),
    [entityType, entityLabel],
  );

  // ── Rule-level state ───────────────────────────────────────────────────────

  const [ruleTitle, setRuleTitle]           = useState(CONTENT.defaultTitle);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [canvasState, setCanvasState]       = useState<RuleBuilderCanvasState>('empty');
  const [isDirty, setIsDirty]               = useState(false);

  // ── Graph state ────────────────────────────────────────────────────────────

  const [nodes, setNodes]             = useState<ConditionNodeData[]>([]);
  const [connections, setConnections] = useState<CanvasConnection[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // ── Undo / Redo ────────────────────────────────────────────────────────────

  const [undoStack, setUndoStack] = useState<RuleGraphSnapshot[]>([]);
  const [redoStack, setRedoStack] = useState<RuleGraphSnapshot[]>([]);

  const canUndo = undoStack.length > 0;
  const canRedo = redoStack.length > 0;

  const pushHistory = useCallback((prevNodes: ConditionNodeData[], prevConns: CanvasConnection[]) => {
    setUndoStack((stack) => {
      const next = [...stack, { nodes: prevNodes, connections: prevConns }];
      return next.length > MAX_HISTORY ? next.slice(next.length - MAX_HISTORY) : next;
    });
    setRedoStack([]);
  }, []);

  const handleUndo = useCallback(() => {
    if (!canUndo) return;
    setUndoStack((stack) => {
      const prev = stack[stack.length - 1];
      setRedoStack((r) => [...r, { nodes, connections }]);
      setNodes(prev.nodes as ConditionNodeData[]);
      setConnections(prev.connections);
      setIsDirty(true);
      return stack.slice(0, -1);
    });
  }, [canUndo, nodes, connections]);

  const handleRedo = useCallback(() => {
    if (!canRedo) return;
    setRedoStack((stack) => {
      const next = stack[stack.length - 1];
      setUndoStack((u) => [...u, { nodes, connections }]);
      setNodes(next.nodes as ConditionNodeData[]);
      setConnections(next.connections);
      setIsDirty(true);
      return stack.slice(0, -1);
    });
  }, [canRedo, nodes, connections]);

  // ── Viewport (pan + zoom) ──────────────────────────────────────────────────

  const [viewport, setViewport] = useState<CanvasViewport>({ x: 0, y: 0, zoom: ZOOM_DEFAULT });

  const zoom = viewport.zoom;
  const zoomPercent = Math.round(zoom * 100);

  const setZoom = useCallback((updater: (z: number) => number) => {
    setViewport((vp) => ({ ...vp, zoom: updater(vp.zoom) }));
  }, []);

  const zoomIn  = useCallback(() => setZoom((z) => Math.min(parseFloat((z + ZOOM_STEP).toFixed(2)), ZOOM_MAX)), [setZoom]);
  const zoomOut = useCallback(() => setZoom((z) => Math.max(parseFloat((z - ZOOM_STEP).toFixed(2)), ZOOM_MIN)), [setZoom]);

  const panToNode = useCallback((nodeId: string) => {
    const targetNode = nodeId === startNode.id
      ? startNode
      : nodes.find((n) => n.id === nodeId);
    if (!targetNode || !workspaceRef.current) return;
    const ws = workspaceRef.current;
    const panX = ws.clientWidth  / 2 - (targetNode.position.x + NODE_W / 2) * zoom;
    const panY = ws.clientHeight / 2 - (targetNode.position.y + NODE_H / 2) * zoom;
    setViewport((vp) => ({ ...vp, x: panX, y: panY }));
  }, [startNode, nodes, zoom]);

  const selectAndRevealNode = useCallback((nodeId: string) => {
    setSelectedNodeId(nodeId);
    panToNode(nodeId);
  }, [panToNode]);

  const fitCanvas = useCallback(() => {
    const allNodes: Array<{ position: { x: number; y: number } }> = [startNode, ...nodes];
    const ws = workspaceRef.current;
    if (!ws) { setViewport((vp) => ({ ...vp, zoom: ZOOM_DEFAULT, x: 0, y: 0 })); return; }
    const hostW = ws.clientWidth;
    const hostH = ws.clientHeight;
    const minX = Math.min(...allNodes.map((n) => n.position.x));
    const minY = Math.min(...allNodes.map((n) => n.position.y));
    const maxX = Math.max(...allNodes.map((n) => n.position.x + NODE_W));
    const maxY = Math.max(...allNodes.map((n) => n.position.y + NODE_H));
    const graphW = maxX - minX + CANVAS_SAFETY_MARGIN * 2;
    const graphH = maxY - minY + CANVAS_SAFETY_MARGIN * 2;
    const scale  = Math.max(Math.min(hostW / graphW, hostH / graphH, ZOOM_MAX), ZOOM_MIN);
    const panX   = (hostW  - (maxX + minX) * scale) / 2;
    const panY   = (hostH - (maxY + minY) * scale) / 2;
    setViewport({ x: panX, y: panY, zoom: parseFloat(scale.toFixed(2)) });
  }, [startNode, nodes]);

  // ── Title editing ──────────────────────────────────────────────────────────

  const titleInputRef = useRef<HTMLInputElement>(null);

  const startEditTitle = useCallback(() => {
    setIsEditingTitle(true);
    setTimeout(() => titleInputRef.current?.select(), 0);
  }, []);

  const commitTitle = useCallback(() => {
    setIsEditingTitle(false);
    setIsDirty(true);
  }, []);

  // ── Search (RB-1, RB-2, RB-3) ─────────────────────────────────────────────

  const [searchQuery, setSearchQuery] = useState('');
  const [searchPopoverOpen, setSearchPopoverOpen] = useState(false);

  const searchResults = useMemo((): SearchResult[] => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    const results: SearchResult[] = [];
    for (const node of nodes) {
      const fields = [node.propertyLabel, node.operatorLabel, node.valueLabel ?? ''];
      const matchedField = fields.find((f) => f.toLowerCase().includes(q));
      if (matchedField !== undefined) {
        const summary = node.propertyLabel
          ? [node.propertyLabel, node.operatorLabel, node.valueLabel].filter(Boolean).join(' ')
          : 'Unnamed condition';
        results.push({
          nodeId:       node.id,
          nodeType:     CONTENT.popoverNodeTypeCondition,
          summary,
          matchContext: matchedField,
        });
      }
    }
    return results;
  }, [searchQuery, nodes]);

  const matchedNodeIds = useMemo(
    () => new Set(searchResults.map((r) => r.nodeId)),
    [searchResults],
  );

  const matchCount = searchResults.length;

  const searchMatchLabel = useMemo(() => {
    if (!searchQuery.trim()) return '';
    if (matchCount === 0) return '';
    return `${matchCount} ${matchCount === 1 ? CONTENT.searchMatchSingular : CONTENT.searchMatchPlural}`;
  }, [searchQuery, matchCount]);

  // Two-stage Escape (RB-2):
  // Stage 1 — popover open → close popover, keep query
  // Stage 2 — popover closed + query active → clear query, blur to canvas
  const handleSearchKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      if (searchPopoverOpen) {
        setSearchPopoverOpen(false);
        // keep query, keep focus in input
      } else if (searchQuery) {
        setSearchQuery('');
        setSearchPopoverOpen(false);
        workspaceRef.current?.focus();
      }
      return;
    }
    if (e.key === 'Enter' && searchResults.length > 0) {
      selectAndRevealNode(searchResults[0].nodeId);
      setSearchPopoverOpen(false);
    }
    if (e.key === 'ArrowDown' && searchResults.length > 0) {
      // Move focus into the popover list
      const first = document.querySelector<HTMLElement>('.rb__search-popover__btn');
      first?.focus();
    }
  }, [searchPopoverOpen, searchQuery, searchResults, selectAndRevealNode]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    setSearchPopoverOpen(val.trim().length > 0);
  }, []);

  const handleSearchFocus = useCallback(() => {
    if (searchQuery.trim()) setSearchPopoverOpen(true);
  }, [searchQuery]);

  const handleSearchResultSelect = useCallback((nodeId: string) => {
    selectAndRevealNode(nodeId);
    setSearchPopoverOpen(false);
    // query stays active — other matches stay highlighted
  }, [selectAndRevealNode]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchPopoverOpen(false);
    searchInputRef.current?.focus();
  }, []);

  // ── Validation ─────────────────────────────────────────────────────────────

  const validation = useMemo(
    () => validateGraph(entityType, nodes, connections),
    [entityType, nodes, connections],
  );

  const derivedCanvasState = useMemo((): RuleBuilderCanvasState => {
    const operational: RuleBuilderCanvasState[] = ['saving', 'saved', 'save-failed', 'activating', 'active', 'activation-failed', 'read-only'];
    if (operational.includes(canvasState)) return canvasState;
    if (nodes.length === 0) return 'empty';
    if (!validation.isValid) return 'invalid';
    if (validation.warningNodeIds.length > 0) return 'warning';
    return isDirty ? 'dirty' : 'draft';
  }, [canvasState, isDirty, nodes, validation]);

  // ── Validation popover (RB-5) ──────────────────────────────────────────────

  const isValidationTriggerDisabled =
    canvasState === 'saving' || canvasState === 'activating';

  const [isValidationPopoverOpen, setIsValidationPopoverOpen] = useState(false);

  const toggleValidationPopover = useCallback(() => {
    if (isValidationTriggerDisabled) return;
    setIsValidationPopoverOpen((v) => !v);
  }, [isValidationTriggerDisabled]);

  const closeValidationPopover = useCallback(() => {
    setIsValidationPopoverOpen(false);
  }, []);

  // ── Rule summary ───────────────────────────────────────────────────────────

  const totalConditions = nodes.length;
  const totalNodes      = nodes.length + 1;

  // ── Add condition ──────────────────────────────────────────────────────────

  const handleAddCondition = useCallback(() => {
    nodeCounter.current += 1;
    const col = nodes.length % 3;
    const row = Math.floor(nodes.length / 3);
    const newNode: ConditionNodeData = {
      id: `condition-${nodeCounter.current}`,
      type: 'condition',
      propertyLabel: '',
      operatorLabel: '',
      valueLabel: undefined,
      position: { x: 480 + col * 340, y: 120 + row * 180 },
    };
    pushHistory(nodes, connections);
    setNodes((prev) => [...prev, newNode]);
    setIsDirty(true);
  }, [nodes, connections, pushHistory]);

  // ── Save draft ─────────────────────────────────────────────────────────────

  const operationInProgress = canvasState === 'saving' || canvasState === 'activating';
  const isSaveDisabled = operationInProgress || canvasState === 'active' || !isDirty;

  const handleSaveDraft = useCallback(() => {
    if (isSaveDisabled) return;
    setCanvasState('saving');
    setTimeout(() => {
      if (MOCK_SAVE_OUTCOME === 'success') {
        setCanvasState('saved');
        setIsDirty(false);
        setUndoStack([]);
        setRedoStack([]);
        setTimeout(() => {
          setCanvasState((s: RuleBuilderCanvasState) => (s === 'saved' ? 'draft' : s));
        }, 1500);
      } else {
        setCanvasState('save-failed');
      }
    }, MOCK_SAVE_DELAY_MS);
  }, [isSaveDisabled]);

  // ── Activate (RB-7) ────────────────────────────────────────────────────────

  const isActivateDisabled = operationInProgress || canvasState === 'active' || canvasState === 'read-only';

  const doActivate = useCallback(() => {
    setCanvasState('activating');
    setTimeout(() => {
      if (MOCK_ACTIVATE_OUTCOME === 'success') {
        setCanvasState('active');
        setUndoStack([]);
        setRedoStack([]);
      } else {
        setCanvasState('activation-failed');
      }
    }, MOCK_ACTIVATE_DELAY_MS);
  }, []);

  const handleActivate = useCallback(() => {
    if (isActivateDisabled) return;
    const result = validateGraph(entityType, nodes, connections);

    // Blocking errors → reveal first, open popover
    if (!result.isValid) {
      if (result.invalidNodeIds.length > 0) selectAndRevealNode(result.invalidNodeIds[0]);
      setIsValidationPopoverOpen(true);
      return;
    }

    // Warnings only → confirmation dialog (RB-7)
    if (result.warningNodeIds.length > 0) {
      confirmationDialogTemplate.open({
        id: 'rb-activate-with-warnings',
        variant: 'warning',
        title: CONTENT.activateWithWarningsTitle,
        description: CONTENT.activateWithWarningsDesc,
        confirmLabel: CONTENT.activateWithWarningsConfirm,
        cancelLabel:  CONTENT.activateWithWarningsCancel,
        confirmAction: doActivate,
      });
      return;
    }

    doActivate();
  }, [isActivateDisabled, entityType, nodes, connections, selectAndRevealNode, doActivate]);

  // ── Cancel ─────────────────────────────────────────────────────────────────

  const isCancelDisabled = operationInProgress;

  const handleCancel = useCallback(() => {
    if (isCancelDisabled) return;
    if (!isDirty) { navigate('/manage/rules-center'); return; }
    confirmationDialogTemplate.open({
      id: 'rb-discard',
      variant: 'discard',
      title: CONTENT.discardTitle,
      description: CONTENT.discardDesc,
      confirmLabel: CONTENT.discardConfirm,
      cancelLabel: CONTENT.discardCancel,
      confirmAction: () => { navigate('/manage/rules-center'); },
    });
  }, [isCancelDisabled, isDirty, navigate]);

  // ── Toolbar button labels ──────────────────────────────────────────────────

  const saveDraftLabel = (() => {
    if (canvasState === 'saving')      return CONTENT.savingLabel;
    if (canvasState === 'saved')       return CONTENT.savedLabel;
    if (canvasState === 'save-failed') return CONTENT.saveFailedLabel;
    return CONTENT.saveDraftLabel;
  })();

  const activateLabel = (() => {
    if (canvasState === 'activating')        return CONTENT.activatingLabel;
    if (canvasState === 'active')            return CONTENT.activeLabel;
    if (canvasState === 'activation-failed') return CONTENT.activationFailedLabel;
    return CONTENT.activateLabel;
  })();

  const validationTriggerLabel = getValidationTriggerLabel(
    derivedCanvasState,
    validation.invalidNodeIds.length,
    validation.warningNodeIds.length,
  );

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="rb">

      {/* ── Rule Context Header ──────────────────────────────────────── */}
      <div className="rb__context-header">
        <div className="rb__title-row">
          {isEditingTitle ? (
            <input
              ref={titleInputRef}
              className="rb__title-input"
              value={ruleTitle}
              onChange={(e) => setRuleTitle(e.target.value)}
              onBlur={commitTitle}
              onKeyDown={(e) => { if (e.key === 'Enter') commitTitle(); }}
              aria-label={CONTENT.titleInputLabel}
            />
          ) : (
            <h1 className="rb__title">{ruleTitle}</h1>
          )}
          <button
            type="button"
            className="rb__edit-title-btn"
            onClick={startEditTitle}
            aria-label={CONTENT.editTitleLabel}
          >
            <EditTitleIcon />
          </button>
          <span className="rb__wip-badge">{CONTENT.wipBadge}</span>
        </div>
      </div>

      {/* ── Canvas Toolbar ────────────────────────────────────────────── */}
      <div className="rb__toolbar" role="toolbar" aria-label="Rule builder toolbar">

        {/* Left */}
        <div className="rb__toolbar-left">

          {/* Search (RB-1, RB-2, RB-3) */}
          <div className="rb__search-wrap">
            <SearchIcon size={12} className="rb__search-icon" />
            <input
              ref={searchInputRef}
              type="search"
              role="combobox"
              aria-expanded={searchPopoverOpen}
              aria-haspopup="listbox"
              aria-autocomplete="list"
              className="rb__search-input"
              placeholder={CONTENT.searchPlaceholder}
              aria-label={CONTENT.searchLabel}
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              onKeyDown={handleSearchKeyDown}
            />
            {searchQuery && (
              <button
                type="button"
                className="rb__search-clear"
                aria-label={CONTENT.searchClearLabel}
                onClick={clearSearch}
              >
                <CloseSmIcon />
              </button>
            )}
            {searchPopoverOpen && (
              <SearchPopover
                results={searchResults}
                query={searchQuery}
                onSelect={handleSearchResultSelect}
                onClose={() => setSearchPopoverOpen(false)}
                searchInputRef={searchInputRef}
              />
            )}
          </div>

          {/* Match count (RB-3) */}
          {searchMatchLabel && (
            <span className="rb__search-count" aria-live="polite" aria-atomic="true">
              {searchMatchLabel}
            </span>
          )}

          <span className="rb__toolbar-divider" aria-hidden="true" />
          <span className="rb__meta" aria-live="polite">
            <strong>{totalNodes}</strong>{' '}{CONTENT.summaryNodes}{' '}{CONTENT.summaryDot}{' '}
            <strong>{totalConditions}</strong>{' '}{CONTENT.summaryConditions}
          </span>
          <span className="rb__toolbar-divider" aria-hidden="true" />

          {/* Validation trigger (RB-4, RB-5) */}
          <div className="rb__validation-status-wrap">
            <button
              ref={validationBtnRef}
              type="button"
              className={`rb__status-btn rb__status-btn--${derivedCanvasState}`}
              onClick={toggleValidationPopover}
              aria-label={`${CONTENT.validationStatusLabel}: ${validationTriggerLabel}`}
              aria-expanded={isValidationPopoverOpen}
              aria-haspopup="dialog"
              aria-live="polite"
              disabled={isValidationTriggerDisabled}
            >
              {getStatusIconEl(derivedCanvasState, validation.invalidNodeIds.length, validation.warningNodeIds.length)}
              <span>{validationTriggerLabel}</span>
            </button>
            {isValidationPopoverOpen && (
              <ValidationPopover
                validation={validation}
                nodes={nodes}
                onClose={closeValidationPopover}
                onSelectNode={selectAndRevealNode}
                triggerRef={validationBtnRef}
              />
            )}
          </div>
        </div>

        {/* Center */}
        <div className="rb__toolbar-center">
          <button
            type="button"
            className="rb__zoom-btn"
            onClick={zoomOut}
            aria-label={CONTENT.zoomOutLabel}
            disabled={zoom <= ZOOM_MIN}
          >
            <ZoomOutIcon />
          </button>
          <span className="rb__zoom-value" aria-label={`Zoom ${zoomPercent}%`}>{zoomPercent}%</span>
          <button
            type="button"
            className="rb__zoom-btn"
            onClick={zoomIn}
            aria-label={CONTENT.zoomInLabel}
            disabled={zoom >= ZOOM_MAX}
          >
            <ZoomInIcon />
          </button>
          <span className="rb__toolbar-divider" aria-hidden="true" />
          <button
            type="button"
            className="rb__zoom-btn"
            onClick={fitCanvas}
            aria-label={CONTENT.fitLabel}
            disabled={totalNodes === 0}
          >
            <FitIcon />
          </button>
        </div>

        {/* Right */}
        <div className="rb__toolbar-right">
          <button
            type="button"
            className="rb__icon-btn"
            onClick={handleUndo}
            aria-label={CONTENT.undoLabel}
            disabled={!canUndo}
          >
            <UndoIcon />
          </button>
          <button
            type="button"
            className="rb__icon-btn"
            onClick={handleRedo}
            aria-label={CONTENT.redoLabel}
            disabled={!canRedo}
          >
            <RedoIcon />
          </button>
          <span className="rb__toolbar-divider" aria-hidden="true" />
          <button
            type="button"
            className="rb__cancel-btn"
            onClick={handleCancel}
            disabled={isCancelDisabled}
          >
            {CONTENT.cancelLabel}
          </button>
          <button
            type="button"
            className={`rb__draft-btn${isSaveDisabled ? ' rb__draft-btn--disabled' : ''}`}
            onClick={handleSaveDraft}
            disabled={isSaveDisabled}
            aria-disabled={isSaveDisabled}
          >
            {saveDraftLabel}
          </button>
          <button
            type="button"
            className={`rb__activate-btn${isActivateDisabled ? ' rb__activate-btn--disabled' : ''}`}
            onClick={handleActivate}
            disabled={isActivateDisabled}
            aria-disabled={isActivateDisabled}
          >
            {activateLabel}
          </button>
        </div>
      </div>

      {/* ── Canvas Workspace ──────────────────────────────────────────── */}
      <div
        className="rb__workspace"
        ref={workspaceRef}
        tabIndex={-1}
        aria-label="Rule graph canvas"
      >

        {/* Decorative dot grid */}
        <div className="rb__dot-grid" aria-hidden="true" />

        {/* Canvas surface — zoom + pan transform */}
        <div
          className="rb__canvas-surface"
          style={{
            transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
            transformOrigin: '0 0',
          }}
        >
          {/* Connector SVG layer */}
          <svg className="rb-canvas__connector-layer" aria-hidden="true">
            {nodes.map((node) => {
              const fromX = startNode.position.x + NODE_W + 16;
              const fromY = startNode.position.y + NODE_H / 2;
              const toX   = node.position.x;
              const toY   = node.position.y + NODE_H / 2;
              return (
                <ConnectorLine key={`conn-${node.id}`}
                  fromX={fromX} fromY={fromY} toX={toX} toY={toY}
                />
              );
            })}
          </svg>

          {/* Start node */}
          <div
            className="rb__node-wrapper"
            style={{ left: startNode.position.x, top: startNode.position.y }}
          >
            <StartNode entityLabel={entityLabel} onAddCondition={handleAddCondition} />
          </div>

          {/* Condition nodes */}
          {nodes.map((node) => {
            const isSearchMatch = matchedNodeIds.has(node.id);
            const isInvalidNode = validation.invalidNodeIds.includes(node.id);
            const isWarningNode = validation.warningNodeIds.includes(node.id);
            // Priority: invalid > warning > selected > search-match > default (RB-8)
            const nodeStatus =
              isInvalidNode                        ? 'invalid'  :
              isWarningNode                        ? 'warning'  :
              selectedNodeId === node.id           ? 'selected' :
              (node.propertyLabel && node.operatorLabel) ? 'valid' : 'draft';

            return (
              <div
                key={node.id}
                className={[
                  'rb__node-wrapper',
                  isSearchMatch && !isInvalidNode && !isWarningNode ? 'rb__node-wrapper--search-match' : '',
                ].filter(Boolean).join(' ')}
                style={{ left: node.position.x, top: node.position.y }}
              >
                <ConditionBox
                  data={{
                    id: node.id,
                    status: nodeStatus,
                    propertyLabel: node.propertyLabel,
                    operatorLabel: node.operatorLabel,
                    valueLabel: node.valueLabel,
                    hasInputConnection: true,
                    hasTrueConnection: connections.some((c) => c.fromNodeId === node.id && c.fromPort === 'true'),
                    hasFalseConnection: connections.some((c) => c.fromNodeId === node.id && c.fromPort === 'false'),
                    isMenuAvailable: true,
                  }}
                  onSelect={setSelectedNodeId}
                />
              </div>
            );
          })}
        </div>

        {/* Floating Add Condition — workspace-relative, never viewport-fixed */}
        <div className="rb__floating-add">
          <button
            type="button"
            className="rb__floating-add-btn"
            onClick={handleAddCondition}
            aria-label={CONTENT.addConditionLabel}
          >
            <AddCircleIcon />
          </button>
          <span className="rb__floating-add-label" aria-hidden="true">
            {CONTENT.addConditionShort}
          </span>
        </div>

      </div>
    </div>
  );
};

export default RuleBuilderPage;
