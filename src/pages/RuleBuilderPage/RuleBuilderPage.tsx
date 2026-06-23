import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ConditionBox } from '../../features/rule-builder/components/ConditionBox';
import { ActionBox } from '../../features/rule-builder/components/ActionBox';
import { confirmationDialogTemplate } from '../../prototype-templates/ConfirmationDialogTemplate';
import { StartPointBox } from './components/StartPointBox/StartPointBox';
import { RuleBuilderToolbar } from './components/RuleBuilderToolbar';
import { RuleValidationPopover } from './components/RuleValidationPopover';
import { RuleSearchPopover } from './components/RuleSearchPopover';
import type { RuleEntityType } from '../RuleCenterPage/RuleCenterPage.types';
import type {
  RuleBranch,
  ConditionNodeData,
  ActionNodeData,
  CanvasConnection,
  RuleBuilderCanvasState,
  RuleGraphSnapshot,
} from './RuleBuilderPage.types';
import type { ValidationIssueItem } from './components/RuleValidationPopover/RuleValidationPopover.types';
import {
  getRuleBuilderEntityLabel,
  RULE_BUILDER_ACTION_OPTIONS,
  MOCK_SAVE_DELAY_MS,
  MOCK_ACTIVATE_DELAY_MS,
  MOCK_SAVE_OUTCOME,
  MOCK_ACTIVATE_OUTCOME,
  EMPTY_GRAPH_SNAPSHOT,
} from '../../mock/ruleBuilderMockData';
import {
  createDraftRuleBranch,
  getIncompleteBranch,
  computeFanOutConnectors,
  resetBranchCounters,
} from './RuleBuilderPage.branch';
import {
  validateForSaveDraft,
  validateRuleSet,
  getIssueProblem,
  getIssueNextAction,
} from './RuleBuilderPage.validation';
import { RULE_BUILDER_STRINGS as S } from './RuleBuilderPage.strings';
import {
  START_NODE_X, START_NODE_Y, START_NODE_W, START_NODE_H,
  CONDITION_NODE_W, CONDITION_NODE_H,
  ACTION_NODE_W, ACTION_NODE_H,
} from './RuleBuilderPage.constants';
import { useRuleGraphHistory } from './hooks/useRuleGraphHistory';
import { useCanvasViewport } from './hooks/useCanvasViewport';
import { useRuleSearch } from './hooks/useRuleSearch';
import './RuleBuilderPage.scss';

// ── Fan-out connector SVG ─────────────────────────────────────────────────────

interface FanOutConnectorsProps {
  branches:       RuleBranch[];
  conditionNodes: ConditionNodeData[];
}

const FanOutConnectors: React.FC<FanOutConnectorsProps> = ({ branches, conditionNodes }) => {
  const segments = computeFanOutConnectors(branches, conditionNodes);
  if (segments.length === 0) return null;

  const startOutX  = START_NODE_X + START_NODE_W;
  const startOutY  = START_NODE_Y + START_NODE_H / 2;
  const trunkX     = segments[0]?.trunkX ?? startOutX + 40;
  const trunkMinY  = Math.min(startOutY, ...segments.map((s) => s.trunkToY));
  const trunkMaxY  = Math.max(startOutY, ...segments.map((s) => s.trunkToY));

  return (
    <g className="rb-canvas__fanout" aria-hidden="true">
      {/* Horizontal stub: start-node output → trunk */}
      <line
        x1={startOutX} y1={startOutY}
        x2={trunkX}    y2={startOutY}
        className="rb-canvas__fanout-line"
      />
      {/* Vertical trunk */}
      {segments.length > 1 && (
        <line
          x1={trunkX} y1={trunkMinY}
          x2={trunkX} y2={trunkMaxY}
          className="rb-canvas__fanout-line"
        />
      )}
      {/* Horizontal branches → each condition input port */}
      {segments.map((seg) => (
        <React.Fragment key={seg.branchId}>
          <line
            x1={trunkX}  y1={seg.branchY}
            x2={seg.toX} y2={seg.toY}
            className="rb-canvas__fanout-line"
          />
          <circle cx={seg.toX} cy={seg.toY} r="4" className="rb-canvas__fanout-dot" />
        </React.Fragment>
      ))}
      {/* Trunk origin dot */}
      <circle cx={startOutX} cy={startOutY} r="4" className="rb-canvas__fanout-dot" />
    </g>
  );
};

// ── Condition → Action connector SVG ─────────────────────────────────────────

interface CondToActionConnProps {
  condNode:   ConditionNodeData;
  actionNode: ActionNodeData;
}

const CondToActionConn: React.FC<CondToActionConnProps> = ({ condNode, actionNode }) => {
  const fromX = condNode.position.x + CONDITION_NODE_W;
  const fromY = condNode.position.y + CONDITION_NODE_H / 2;
  const toX   = actionNode.position.x;
  const toY   = actionNode.position.y + ACTION_NODE_H / 2;
  const mx    = (fromX + toX) / 2;

  return (
    <g className="rb-canvas__connector" aria-hidden="true">
      <path
        d={`M ${fromX} ${fromY} C ${mx} ${fromY}, ${mx} ${toY}, ${toX} ${toY}`}
        className="rb-canvas__connector-path"
      />
      <circle cx={fromX} cy={fromY} r="4" className="rb-canvas__connector-dot" />
    </g>
  );
};

// ── RuleBuilderPage ───────────────────────────────────────────────────────────

export const RuleBuilderPage: React.FC = () => {
  const navigate       = useNavigate();
  const [searchParams] = useSearchParams();
  const workspaceRef   = useRef<HTMLDivElement>(null);
  const validationBtnRef = useRef<HTMLButtonElement>(null);
  const searchInputRef   = useRef<HTMLInputElement>(null);

  const entityType  = (searchParams.get('entity') ?? 'accounts') as RuleEntityType;
  const entityLabel = getRuleBuilderEntityLabel(entityType);

  // ── Graph state ────────────────────────────────────────────────────────────

  const [branches,        setBranches]        = useState<RuleBranch[]>(EMPTY_GRAPH_SNAPSHOT.branches);
  const [conditionNodes,  setConditionNodes]  = useState<ConditionNodeData[]>(EMPTY_GRAPH_SNAPSHOT.conditionNodes);
  const [actionNodes,     setActionNodes]     = useState<ActionNodeData[]>(EMPTY_GRAPH_SNAPSHOT.actionNodes);
  const [connections,     setConnections]     = useState<CanvasConnection[]>(EMPTY_GRAPH_SNAPSHOT.connections);
  const [selectedNodeId,  setSelectedNodeId]  = useState<string | null>(null);

  // ── Rule state ─────────────────────────────────────────────────────────────

  const [ruleTitle,   setRuleTitle]   = useState(S.defaultTitle);
  const [canvasState, setCanvasState] = useState<RuleBuilderCanvasState>('empty');
  const [isDirty,     setIsDirty]     = useState(false);
  const [hasValidationBeenTriggered, setHasValidationBeenTriggered] = useState(false);

  // ── Undo / Redo ────────────────────────────────────────────────────────────

  const { canUndo, canRedo, pushHistory, undo, redo, clearHistory } = useRuleGraphHistory();

  const currentSnapshot = useCallback((): RuleGraphSnapshot => ({
    branches, conditionNodes, actionNodes, connections,
  }), [branches, conditionNodes, actionNodes, connections]);

  const applySnapshot = useCallback((snap: RuleGraphSnapshot) => {
    setBranches(snap.branches);
    setConditionNodes(snap.conditionNodes);
    setActionNodes(snap.actionNodes);
    setConnections(snap.connections);
    setIsDirty(true);
  }, []);

  const handleUndo = useCallback(() => {
    undo(currentSnapshot(), applySnapshot);
  }, [undo, currentSnapshot, applySnapshot]);

  const handleRedo = useCallback(() => {
    redo(currentSnapshot(), applySnapshot);
  }, [redo, currentSnapshot, applySnapshot]);

  // ── Viewport ───────────────────────────────────────────────────────────────

  const { viewport, zoomPercent, zoomIn, zoomOut, panToNode, fitCanvas } =
    useCanvasViewport(workspaceRef);

  const handleFitCanvas = useCallback(() => {
    const rects: Array<{ x: number; y: number; w: number; h: number }> = [
      { x: START_NODE_X, y: START_NODE_Y, w: START_NODE_W, h: START_NODE_H },
      ...conditionNodes.map((n) => ({ x: n.position.x, y: n.position.y, w: CONDITION_NODE_W, h: CONDITION_NODE_H })),
      ...actionNodes.map((n)    => ({ x: n.position.x, y: n.position.y, w: ACTION_NODE_W,    h: ACTION_NODE_H })),
    ];
    fitCanvas(rects);
  }, [conditionNodes, actionNodes, fitCanvas]);

  // ── Search ─────────────────────────────────────────────────────────────────

  const {
    searchQuery, searchPopoverOpen, searchResults, matchedNodeIds,
    searchMatchLabel, handleSearchChange, handleSearchFocus, clearSearch, closePopover,
  } = useRuleSearch(conditionNodes, actionNodes);

  // ── Validation ─────────────────────────────────────────────────────────────

  const validation = useMemo(
    () => validateRuleSet(entityType, branches, conditionNodes, actionNodes, connections),
    [entityType, branches, conditionNodes, actionNodes, connections],
  );

  const issueCount   = hasValidationBeenTriggered ? validation.invalidBranchIds.length  : 0;
  const warningCount = hasValidationBeenTriggered ? validation.warningBranchIds.length   : 0;

  const derivedCanvasState = useMemo((): RuleBuilderCanvasState => {
    const operational: RuleBuilderCanvasState[] = [
      'saving', 'saved', 'save-failed', 'activating', 'active', 'activation-failed', 'read-only',
    ];
    if (operational.includes(canvasState)) return canvasState;
    if (branches.length === 0) return 'empty';
    if (hasValidationBeenTriggered && !validation.isValid) return 'invalid';
    if (hasValidationBeenTriggered && validation.warningBranchIds.length > 0) return 'warning';
    return isDirty ? 'dirty' : 'draft';
  }, [canvasState, isDirty, branches, validation, hasValidationBeenTriggered]);

  // ── Validation popover ─────────────────────────────────────────────────────

  const isValidationPopoverOpenRef = useRef(false);
  const [isValidationPopoverOpen, setIsValidationPopoverOpen] = useState(false);

  useEffect(() => {
    isValidationPopoverOpenRef.current = isValidationPopoverOpen;
  }, [isValidationPopoverOpen]);

  const toggleValidationPopover = useCallback(() => {
    if (canvasState === 'saving' || canvasState === 'activating') return;
    setIsValidationPopoverOpen((v) => !v);
  }, [canvasState]);

  const closeValidationPopover = useCallback(() => setIsValidationPopoverOpen(false), []);

  const validationIssueItems = useMemo((): ValidationIssueItem[] => {
    if (!hasValidationBeenTriggered) return [];
    const condMap = new Map(conditionNodes.map((n) => [n.id, n]));
    return validation.branchIssues.map((issue) => {
      const condNode = condMap.get(issue.conditionNodeId);
      return {
        branchId:    issue.branchId,
        conditionId: issue.conditionNodeId,
        kind:        issue.kind,
        isWarning:   issue.isWarning,
        nodeType:    issue.kind === 'no-action' ? S.popoverNodeTypeAction : S.popoverNodeTypeCondition,
        nodeSummary: S.popoverNodeTypeSummary(condNode?.propertyLabel ?? ''),
        problem:     getIssueProblem(issue.kind, condNode),
        nextAction:  getIssueNextAction(issue.kind),
      };
    });
  }, [hasValidationBeenTriggered, validation.branchIssues, conditionNodes]);

  // ── Select and reveal node ─────────────────────────────────────────────────

  const selectAndRevealNode = useCallback((nodeId: string) => {
    setSelectedNodeId(nodeId);
    const condNode   = conditionNodes.find((n) => n.id === nodeId);
    const actionNode = actionNodes.find((n) => n.id === nodeId);
    const target     = condNode ?? actionNode;
    if (target) {
      panToNode({
        nodeX: target.position.x,
        nodeY: target.position.y,
        nodeW: condNode ? CONDITION_NODE_W : ACTION_NODE_W,
        nodeH: condNode ? CONDITION_NODE_H : ACTION_NODE_H,
      });
    }
  }, [conditionNodes, actionNodes, panToNode]);

  // ── Add Rule Branch ────────────────────────────────────────────────────────

  const incompleteBranch = useMemo(
    () => getIncompleteBranch(branches, conditionNodes, actionNodes, connections),
    [branches, conditionNodes, actionNodes, connections],
  );
  const isAddRuleBlocked = incompleteBranch !== null;

  const handleAddRule = useCallback(() => {
    if (isAddRuleBlocked) return;
    const idx = branches.length;
    pushHistory(currentSnapshot());
    const { branch, conditionNode, actionNode, connections: newConns } = createDraftRuleBranch(idx);
    setBranches((prev) => [...prev, branch]);
    setConditionNodes((prev) => [...prev, conditionNode]);
    setActionNodes((prev) => [...prev, actionNode]);
    setConnections((prev) => [...prev, ...newConns]);
    setIsDirty(true);
    if (branches.length === 0) setCanvasState('draft');
  }, [isAddRuleBlocked, branches, pushHistory, currentSnapshot]);

  // ── Update action node ─────────────────────────────────────────────────────

  const handleActionChange = useCallback((nodeId: string, actionId: string) => {
    const opt = RULE_BUILDER_ACTION_OPTIONS.find((o) => o.id === actionId);
    setActionNodes((prev) =>
      prev.map((n) => n.id === nodeId
        ? { ...n, actionId, actionLabel: opt?.label ?? actionId }
        : n,
      ),
    );
    setIsDirty(true);
  }, []);

  // ── Title commit ───────────────────────────────────────────────────────────

  const handleCommitTitle = useCallback((next: string) => {
    setRuleTitle(next);
    setIsDirty(true);
  }, []);

  // ── Save draft ─────────────────────────────────────────────────────────────

  const operationInProgress = canvasState === 'saving' || canvasState === 'activating';
  const isSaveDisabled      = operationInProgress || canvasState === 'active' || !isDirty;

  const handleSaveDraft = useCallback(() => {
    if (isSaveDisabled) return;
    const check = validateForSaveDraft(branches, conditionNodes, actionNodes, connections);
    if (check.blocked) { setCanvasState('save-failed'); return; }
    setCanvasState('saving');
    setTimeout(() => {
      if (MOCK_SAVE_OUTCOME === 'success') {
        setCanvasState('saved');
        setIsDirty(false);
        clearHistory();
        setTimeout(() => {
          setCanvasState((s) => (s === 'saved' ? 'draft' : s));
        }, 1500);
      } else {
        setCanvasState('save-failed');
      }
    }, MOCK_SAVE_DELAY_MS);
  }, [isSaveDisabled, branches, conditionNodes, actionNodes, connections, clearHistory]);

  // ── Activate ───────────────────────────────────────────────────────────────

  const isActivateDisabled = operationInProgress || canvasState === 'active' || canvasState === 'read-only';

  const doActivate = useCallback(() => {
    setCanvasState('activating');
    setTimeout(() => {
      if (MOCK_ACTIVATE_OUTCOME === 'success') {
        setCanvasState('active');
        clearHistory();
      } else {
        setCanvasState('activation-failed');
      }
    }, MOCK_ACTIVATE_DELAY_MS);
  }, [clearHistory]);

  const handleActivate = useCallback(() => {
    if (isActivateDisabled) return;
    setHasValidationBeenTriggered(true);
    const result = validateRuleSet(entityType, branches, conditionNodes, actionNodes, connections);

    if (!result.isValid) {
      if (result.invalidBranchIds.length > 0) {
        const firstInvalidBranch = branches.find((b) => b.id === result.invalidBranchIds[0]);
        if (firstInvalidBranch) selectAndRevealNode(firstInvalidBranch.conditionNodeId);
      }
      setIsValidationPopoverOpen(true);
      return;
    }

    if (result.broadScopeWarning) {
      confirmationDialogTemplate.open({
        id: 'rb-activate-with-warnings',
        variant: 'warning',
        title: S.activateWithWarningsTitle,
        description: S.activateWithWarningsDesc,
        confirmLabel: S.activateWithWarningsConfirm,
        cancelLabel:  S.activateWithWarningsCancel,
        confirmAction: doActivate,
      });
      return;
    }

    doActivate();
  }, [
    isActivateDisabled, entityType, branches, conditionNodes, actionNodes,
    connections, selectAndRevealNode, doActivate,
  ]);

  // ── Cancel ─────────────────────────────────────────────────────────────────

  const handleCancel = useCallback(() => {
    if (operationInProgress) return;
    if (!isDirty) { navigate('/manage/rules-center'); return; }
    confirmationDialogTemplate.open({
      id: 'rb-discard',
      variant: 'discard',
      title: S.discardTitle,
      description: S.discardDesc,
      confirmLabel: S.discardConfirm,
      cancelLabel:  S.discardCancel,
      confirmAction: () => { navigate('/manage/rules-center'); },
    });
  }, [operationInProgress, isDirty, navigate]);

  // ── Search key handling ────────────────────────────────────────────────────

  const handleSearchKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Escape') return;
    e.preventDefault();
    if (isValidationPopoverOpenRef.current) return; // let validation popover handle it
    if (searchPopoverOpen) {
      closePopover();
    } else if (searchQuery) {
      clearSearch();
      workspaceRef.current?.focus();
    }
  }, [searchPopoverOpen, searchQuery, closePopover, clearSearch]);

  // ── Reset counters on mount ────────────────────────────────────────────────

  useEffect(() => {
    resetBranchCounters();
  }, []);

  // ── Determine node validation display state ────────────────────────────────

  const invalidConditionIds = useMemo(() => {
    if (!hasValidationBeenTriggered) return new Set<string>();
    return new Set(
      validation.branchIssues
        .filter((i) => !i.isWarning && i.conditionNodeId)
        .map((i) => i.conditionNodeId),
    );
  }, [hasValidationBeenTriggered, validation.branchIssues]);

  const warningConditionIds = useMemo(() => {
    if (!hasValidationBeenTriggered) return new Set<string>();
    return new Set(
      validation.branchIssues
        .filter((i) => i.isWarning && i.conditionNodeId)
        .map((i) => i.conditionNodeId),
    );
  }, [hasValidationBeenTriggered, validation.branchIssues]);

  const invalidActionIds = useMemo(() => {
    if (!hasValidationBeenTriggered) return new Set<string>();
    return new Set(
      validation.branchIssues
        .filter((i) => !i.isWarning && i.kind === 'no-action')
        .map((i) => {
          const branch = branches.find((b) => b.id === i.branchId);
          return branch?.actionNodeId ?? '';
        })
        .filter(Boolean),
    );
  }, [hasValidationBeenTriggered, validation.branchIssues, branches]);

  // ── Render ─────────────────────────────────────────────────────────────────

  const canvasHasContent = branches.length > 0;

  return (
    <div className="rb">

      {/* ── Toolbar ────────────────────────────────────────────────────── */}
      <RuleBuilderToolbar
        title={ruleTitle}
        canvasState={derivedCanvasState}
        onCommitTitle={handleCommitTitle}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={handleUndo}
        onRedo={handleRedo}
        issueCount={issueCount}
        warningCount={warningCount}
        hasValidationBeenTriggered={hasValidationBeenTriggered}
        isValidationPopoverOpen={isValidationPopoverOpen}
        validationTriggerRef={validationBtnRef}
        onToggleValidation={toggleValidationPopover}
        onCancel={handleCancel}
        onSaveDraft={handleSaveDraft}
        onActivate={handleActivate}
        zoomPercent={zoomPercent}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onFitCanvas={handleFitCanvas}
      />

      {/* ── Validation Popover ──────────────────────────────────────────── */}
      <div className="rb__validation-popover-anchor">
        <RuleValidationPopover
          isOpen={isValidationPopoverOpen}
          triggerRef={validationBtnRef}
          anchorEl={null}
          issueCount={issueCount}
          warningCount={warningCount}
          issues={validationIssueItems}
          broadScopeWarning={
            hasValidationBeenTriggered ? validation.broadScopeWarning : undefined
          }
          onClose={closeValidationPopover}
          onSelectNode={selectAndRevealNode}
        />
      </div>

      {/* ── Canvas Workspace ────────────────────────────────────────────── */}
      <div className="rb__workspace-row">

        {/* Search sidebar */}
        <div className="rb__search-sidebar">
          <RuleSearchPopover
            searchQuery={searchQuery}
            isOpen={searchPopoverOpen}
            results={searchResults}
            matchLabel={searchMatchLabel}
            searchInputRef={searchInputRef}
            onSearchChange={handleSearchChange}
            onSearchFocus={handleSearchFocus}
            onClearSearch={clearSearch}
            onSelectResult={selectAndRevealNode}
            onClose={closePopover}
          />
        </div>

        {/* Canvas */}
        <div
          className="rb__workspace"
          ref={workspaceRef}
          tabIndex={-1}
          aria-label="Rule graph canvas"
          onKeyDown={handleSearchKeyDown as unknown as React.KeyboardEventHandler<HTMLDivElement>}
        >
          <div className="rb__dot-grid" aria-hidden="true" />

          <div
            className="rb__canvas-surface"
            style={{
              transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
              transformOrigin: '0 0',
            }}
          >
            {/* SVG connector layer */}
            <svg className="rb-canvas__connector-layer" aria-hidden="true">
              <FanOutConnectors branches={branches} conditionNodes={conditionNodes} />
              {branches.map((branch) => {
                const condNode   = conditionNodes.find((n) => n.id === branch.conditionNodeId);
                const actionNode = actionNodes.find((n) => n.id === branch.actionNodeId);
                if (!condNode || !actionNode) return null;
                return (
                  <CondToActionConn
                    key={branch.id}
                    condNode={condNode}
                    actionNode={actionNode}
                  />
                );
              })}
            </svg>

            {/* Start Point node */}
            <div
              className="rb__node-wrapper"
              style={{ left: START_NODE_X, top: START_NODE_Y }}
            >
              <StartPointBox
                entityLabel={entityLabel}
                onAddRule={handleAddRule}
                isAddRuleBlocked={isAddRuleBlocked}
                addRuleBlockedMsg={S.addRuleBlockedGuidance}
              />
            </div>

            {/* Condition + Action nodes per branch */}
            {branches.map((branch) => {
              const condNode   = conditionNodes.find((n) => n.id === branch.conditionNodeId);
              const actionNode = actionNodes.find((n) => n.id === branch.actionNodeId);
              if (!condNode || !actionNode) return null;

              const isCondInvalid  = invalidConditionIds.has(condNode.id);
              const isCondWarning  = warningConditionIds.has(condNode.id);
              const isCondSelected = selectedNodeId === condNode.id;
              const isCondMatch    = matchedNodeIds.has(condNode.id);

              const condStatus =
                isCondInvalid                                            ? 'invalid'  :
                isCondWarning                                            ? 'warning'  :
                isCondSelected                                           ? 'selected' :
                (condNode.propertyLabel && condNode.operatorLabel)       ? 'valid'    : 'draft';

              const isActInvalid  = invalidActionIds.has(actionNode.id);
              const isActSelected = selectedNodeId === actionNode.id;

              const actStatus: 'idle' | 'selected' | 'invalid' | 'disabled' | 'read-only' =
                isActInvalid  ? 'invalid'  :
                isActSelected ? 'selected' : 'idle';

              return (
                <React.Fragment key={branch.id}>
                  {/* Condition node */}
                  <div
                    className={[
                      'rb__node-wrapper',
                      isCondMatch && !isCondInvalid && !isCondWarning ? 'rb__node-wrapper--search-match' : '',
                    ].filter(Boolean).join(' ')}
                    style={{ left: condNode.position.x, top: condNode.position.y }}
                  >
                    <ConditionBox
                      data={{
                        id: condNode.id,
                        status: condStatus,
                        propertyLabel: condNode.propertyLabel,
                        operatorLabel: condNode.operatorLabel,
                        valueLabel: condNode.valueLabel,
                        hasInputConnection: true,
                        hasTrueConnection:  true,
                        hasFalseConnection: false,
                        isMenuAvailable: true,
                      }}
                      onSelect={setSelectedNodeId}
                    />
                  </div>

                  {/* Action node */}
                  <div
                    className="rb__node-wrapper"
                    style={{ left: actionNode.position.x, top: actionNode.position.y }}
                  >
                    <ActionBox
                      data={{
                        id:                actionNode.id,
                        status:            actStatus,
                        actionId:          actionNode.actionId,
                        actionLabel:       actionNode.actionLabel,
                        hasInputConnection: true,
                        isMenuAvailable:   true,
                      }}
                      actionOptions={RULE_BUILDER_ACTION_OPTIONS}
                      onSelect={setSelectedNodeId}
                      onActionChange={handleActionChange}
                    />
                  </div>
                </React.Fragment>
              );
            })}

            {/* Empty canvas placeholder */}
            {!canvasHasContent && (
              <div
                className="rb__empty-canvas"
                style={{
                  left: START_NODE_X + START_NODE_W + 200,
                  top:  START_NODE_Y + START_NODE_H / 2 - 40,
                }}
              >
                <span className="rb__empty-canvas-hint">
                  Click the <strong>+</strong> on the Start Point to add the first rule
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RuleBuilderPage;
