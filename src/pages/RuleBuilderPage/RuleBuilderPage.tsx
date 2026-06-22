import React, { useState, useCallback, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@idira/design-system';
import { ConditionBox } from '../../features/rule-builder/components/ConditionBox';
import { confirmationDialogTemplate } from '../../prototype-templates/ConfirmationDialogTemplate';
import type { RuleEntityType } from '../RuleCenterPage/RuleCenterPage.types';
import type { CanvasNode, RuleBuilderCanvasState } from './RuleBuilderPage.types';
import { RULE_ENTITY_OPTIONS } from '../../mock/ruleCenterMockData';
import './RuleBuilderPage.scss';

// ── SVG icons ─────────────────────────────────────────────────────────────────

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

const EditTitleIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 10.5V12h1.5L11 4.5 9.5 3 2 10.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M9.5 3L11 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const AddIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 6v8M6 10h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ── Entity label lookup ───────────────────────────────────────────────────────

function getEntityLabel(entityType: string): string {
  return RULE_ENTITY_OPTIONS.find((o) => o.value === entityType)?.label ?? entityType;
}

// ── Dot grid background ───────────────────────────────────────────────────────

const DotGrid: React.FC = () => (
  <svg
    className="rb-canvas__grid"
    aria-hidden="true"
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
  >
    <defs>
      <pattern id="rb-dot-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#rb-dot-grid)" />
  </svg>
);

// ── Connector line between Start Node and first Condition ─────────────────────

const ConnectorLine: React.FC<{
  fromX: number; fromY: number;
  toX: number;   toY: number;
}> = ({ fromX, fromY, toX, toY }) => {
  const mx = (fromX + toX) / 2;
  return (
    <svg
      className="rb-canvas__connector"
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <path
        d={`M ${fromX} ${fromY} C ${mx} ${fromY}, ${mx} ${toY}, ${toX} ${toY}`}
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx={fromX} cy={fromY} r="4" fill="currentColor" />
    </svg>
  );
};

// ── Start Node ────────────────────────────────────────────────────────────────

const DotsMenuIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="7" cy="2.5" r="1.2" fill="currentColor" />
    <circle cx="7" cy="7"   r="1.2" fill="currentColor" />
    <circle cx="7" cy="11.5" r="1.2" fill="currentColor" />
  </svg>
);

interface StartNodeProps {
  entityLabel: string;
  onAddCondition: () => void;
}

const StartNode: React.FC<StartNodeProps> = ({ entityLabel, onAddCondition }) => (
  <div className="rb-start-node">
    <div className="rb-start-node__header">
      <span className="rb-start-node__label">Start point</span>
      <button type="button" className="rb-start-node__menu" aria-label="Start node actions">
        <DotsMenuIcon />
      </button>
    </div>
    <div className="rb-start-node__body">
      <span className="rb-start-node__field-label">Entity</span>
      <span className="rb-start-node__field-value">{entityLabel}</span>
    </div>
    {/* Output port + add connector */}
    <div className="rb-start-node__port-row">
      <div className="rb-start-node__connector-line" aria-hidden="true" />
      <button
        type="button"
        className="rb-start-node__add-btn"
        onClick={onAddCondition}
        aria-label="Add condition after start"
      >
        <AddIcon />
      </button>
    </div>
  </div>
);

// ── ZOOM constants ────────────────────────────────────────────────────────────

const ZOOM_STEP = 0.15;
const ZOOM_MIN  = 0.25;
const ZOOM_MAX  = 2.0;

// ── RuleBuilderPage ───────────────────────────────────────────────────────────

export const RuleBuilderPage: React.FC = () => {
  const navigate      = useNavigate();
  const [searchParams] = useSearchParams();

  const entityType  = (searchParams.get('entity') ?? 'accounts') as RuleEntityType;
  const entityLabel = getEntityLabel(entityType);

  // ── Rule state ─────────────────────────────────────────────────────────────

  const [ruleTitle, setRuleTitle]       = useState('New Rule set Enrichment');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [canvasState, setCanvasState]   = useState<RuleBuilderCanvasState>('draft');
  const [isDirty, setIsDirty]           = useState(false);
  const [zoom, setZoom]                 = useState(1);
  const [nodes, setNodes]               = useState<CanvasNode[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const titleInputRef = useRef<HTMLInputElement>(null);

  // ── Has a condition node ───────────────────────────────────────────────────
  const conditionNodes = nodes.filter((n) => n.type === 'condition');

  // ── Zoom controls ──────────────────────────────────────────────────────────

  const zoomIn  = useCallback(() => setZoom((z) => Math.min(z + ZOOM_STEP, ZOOM_MAX)), []);
  const zoomOut = useCallback(() => setZoom((z) => Math.max(z - ZOOM_STEP, ZOOM_MIN)), []);
  const fitCanvas = useCallback(() => setZoom(1), []);

  const zoomPercent = Math.round(zoom * 100);

  // ── Title editing ──────────────────────────────────────────────────────────

  const startEditTitle = useCallback(() => {
    setIsEditingTitle(true);
    setTimeout(() => titleInputRef.current?.select(), 0);
  }, []);

  const commitTitle = useCallback(() => {
    setIsEditingTitle(false);
    setIsDirty(true);
  }, []);

  // ── Add condition ──────────────────────────────────────────────────────────

  const handleAddCondition = useCallback(() => {
    const newNode: CanvasNode = {
      id: `condition-${Date.now()}`,
      type: 'condition',
      propertyLabel: '',
      operatorLabel: '',
      valueLabel: undefined,
      position: { x: 560, y: 160 },
    };
    setNodes((prev) => [...prev, newNode]);
    setIsDirty(true);
    setCanvasState('dirty');
  }, []);

  // ── Save as draft ──────────────────────────────────────────────────────────

  const handleSaveDraft = useCallback(() => {
    if (canvasState === 'saving') return;
    setCanvasState('saving');
    setTimeout(() => {
      setCanvasState('saved');
      setIsDirty(false);
      setTimeout(() => setCanvasState('draft'), 1500);
    }, 800);
  }, [canvasState]);

  // ── Activate ───────────────────────────────────────────────────────────────

  const handleActivate = useCallback(() => {
    if (canvasState === 'activating') return;
    setCanvasState('activating');
    setTimeout(() => {
      setCanvasState('active');
    }, 1000);
  }, [canvasState]);

  const isActivateDisabled = canvasState === 'activating' || canvasState === 'active';
  const isSaveDisabled     = canvasState === 'saving' || canvasState === 'saved';

  // ── Cancel ─────────────────────────────────────────────────────────────────

  const handleCancel = useCallback(() => {
    if (!isDirty) {
      navigate('/manage/rules-center');
      return;
    }
    confirmationDialogTemplate.open({
      id: 'rb-discard',
      variant: 'discard',
      title: 'Discard changes?',
      description: 'You have unsaved changes. If you leave now, your rule configuration will be lost.',
      confirmLabel: 'Discard changes',
      cancelLabel: 'Keep editing',
      confirmAction: () => { navigate('/manage/rules-center'); },
    });
  }, [isDirty, navigate]);

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
              aria-label="Rule title"
            />
          ) : (
            <h1 className="rb__title">{ruleTitle}</h1>
          )}
          <button
            type="button"
            className="rb__edit-title-btn"
            onClick={startEditTitle}
            aria-label="Edit rule title"
          >
            <EditTitleIcon />
          </button>
          <span className="rb__wip-badge">WIP – Waiting for TW</span>
        </div>
      </div>

      {/* ── Canvas Toolbar ────────────────────────────────────────────── */}
      <div className="rb__toolbar">
        <div className="rb__toolbar-left">
          <div className="rb__search-wrap">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="rb__search-icon" aria-hidden="true">
              <circle cx="5" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M8 8l2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              className="rb__search-input"
              placeholder="Search property"
              aria-label="Search property"
            />
          </div>
          <span className="rb__toolbar-divider" aria-hidden="true" />
          <span className="rb__meta">Rules: <strong>{conditionNodes.length}</strong></span>
          <span className="rb__toolbar-divider" aria-hidden="true" />
          <span className="rb__status-badge">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" />
            </svg>
            {canvasState === 'saved' ? 'Saved' : canvasState === 'active' ? 'Active' : 'Draft'}
          </span>
        </div>

        <div className="rb__toolbar-center">
          <button type="button" className="rb__zoom-btn" onClick={zoomOut} aria-label="Zoom out">
            <ZoomOutIcon />
          </button>
          <span className="rb__zoom-value">{zoomPercent}%</span>
          <button type="button" className="rb__zoom-btn" onClick={zoomIn} aria-label="Zoom in">
            <ZoomInIcon />
          </button>
          <span className="rb__toolbar-divider" aria-hidden="true" />
          <button type="button" className="rb__zoom-btn" onClick={fitCanvas} aria-label="Fit canvas">
            <FitIcon />
          </button>
        </div>

        <div className="rb__toolbar-right">
          <button
            type="button"
            className="rb__cancel-btn"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className={`rb__draft-btn${isSaveDisabled ? ' rb__draft-btn--disabled' : ''}`}
            onClick={handleSaveDraft}
            disabled={isSaveDisabled}
          >
            {canvasState === 'saving' ? 'Saving…' : canvasState === 'saved' ? 'Saved' : 'Save as draft'}
          </button>
          <button
            type="button"
            className={`rb__activate-btn${isActivateDisabled ? ' rb__activate-btn--disabled' : ''}`}
            onClick={handleActivate}
            disabled={isActivateDisabled}
            aria-disabled={isActivateDisabled}
          >
            {canvasState === 'activating' ? 'Activating…' : canvasState === 'active' ? 'Active' : 'Activate'}
          </button>
        </div>
      </div>

      {/* ── Canvas Workspace ──────────────────────────────────────────── */}
      <div className="rb__workspace">

        {/* Dot grid */}
        <DotGrid />

        {/* Canvas surface — transforms with zoom */}
        <div
          className="rb__canvas-surface"
          style={{ transform: `scale(${zoom})`, transformOrigin: '120px 180px' }}
        >

          {/* Start node */}
          <div className="rb__node-wrapper" style={{ left: 120, top: 120 }}>
            <StartNode
              entityLabel={entityLabel}
              onAddCondition={handleAddCondition}
            />
          </div>

          {/* Connector + condition nodes */}
          {conditionNodes.map((node) => {
            if (node.type !== 'condition') return null;
            // connector from start node output port to condition input port
            const fromX = 120 + 300 + 48; // start node right edge + connector
            const fromY = 120 + 44;        // start node vertical center
            const toX   = node.position.x;
            const toY   = node.position.y + 44;

            return (
              <React.Fragment key={node.id}>
                <ConnectorLine fromX={fromX} fromY={fromY} toX={toX} toY={toY} />
                <div
                  className="rb__node-wrapper"
                  style={{ left: node.position.x, top: node.position.y }}
                >
                  <ConditionBox
                    data={{
                      id: node.id,
                      status: selectedNodeId === node.id ? 'selected' : 'draft',
                      propertyLabel: node.propertyLabel,
                      operatorLabel: node.operatorLabel,
                      valueLabel: node.valueLabel,
                      hasInputConnection: true,
                      hasTrueConnection: false,
                      hasFalseConnection: false,
                      isMenuAvailable: true,
                    }}
                    onSelect={setSelectedNodeId}
                  />
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Floating Add Condition — fixed to workspace, not canvas surface */}
        <div className="rb__floating-add">
          <button
            type="button"
            className="rb__floating-add-btn"
            onClick={handleAddCondition}
            aria-label="Add condition"
          >
            <AddIcon />
          </button>
          <span className="rb__floating-add-label">Add{'\n'}condition</span>
        </div>

      </div>
    </div>
  );
};

export default RuleBuilderPage;
