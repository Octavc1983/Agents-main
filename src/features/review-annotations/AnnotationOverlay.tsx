import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnnotations } from './AnnotationContext';
import './AnnotationOverlay.scss';

interface DragState {
  annotationId: string;
  startMouseX: number;
  startMouseY: number;
  startPinX: number;
  startPinY: number;
  currentX: number;
  currentY: number;
}

export const AnnotationOverlay: React.FC = () => {
  const {
    open,
    annotations,
    isPlacingPin,
    setPendingPin,
    pendingPin,
    activeCalloutId,
    setActiveCalloutId,
    overlayVisible,
    movePinPosition,
  } = useAnnotations();
  const { pathname } = useLocation();
  const overlayRef = useRef<HTMLDivElement>(null);

  const [drag, setDrag] = useState<DragState | null>(null);
  const dragRef = useRef<DragState | null>(null);

  // Keep ref in sync so mousemove/mouseup handlers always see the latest value
  useEffect(() => { dragRef.current = drag; }, [drag]);

  // Global mousemove / mouseup for drag
  useEffect(() => {
    if (!drag) return;

    const onMove = (e: MouseEvent) => {
      const d = dragRef.current;
      if (!d) return;
      const dx = e.clientX - d.startMouseX;
      const dy = e.clientY - d.startMouseY;
      setDrag(prev => prev ? { ...prev, currentX: prev.startPinX + dx, currentY: prev.startPinY + dy } : null);
    };

    const onUp = () => {
      const d = dragRef.current;
      if (d) {
        movePinPosition(d.annotationId, d.currentX, d.currentY);
      }
      setDrag(null);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [drag, movePinPosition]);

  // Close callout when clicking outside
  useEffect(() => {
    if (!activeCalloutId) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.annotation-overlay__pin') && !target.closest('.annotation-overlay__callout')) {
        setActiveCalloutId(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [activeCalloutId, setActiveCalloutId]);

  const handleOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPlacingPin) return;
    const target = e.target as HTMLElement;
    if (target.closest('.annotation-overlay__pin') || target.closest('.annotation-overlay__callout')) return;

    const rect = overlayRef.current?.getBoundingClientRect();
    const x = e.clientX - (rect?.left ?? 0);
    const y = e.clientY - (rect?.top ?? 0);
    setPendingPin({ x, y });
  }, [isPlacingPin, setPendingPin]);

  const startDrag = useCallback((
    e: React.MouseEvent,
    annotationId: string,
    pinX: number,
    pinY: number,
  ) => {
    // Don't start drag on right-click
    if (e.button !== 0) return;
    // Don't steal a click that should open a callout — we distinguish later
    e.stopPropagation();
    e.preventDefault();
    setDrag({
      annotationId,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      startPinX: pinX,
      startPinY: pinY,
      currentX: pinX,
      currentY: pinY,
    });
  }, []);

  const isDragging = drag !== null;

  // All hooks are above this line — safe to return early now
  if (!open) return null;

  const pageAnnotations = annotations.filter(
    a => a.pageRoute === pathname && a.deletedAt === null && a.pinX !== undefined
  );

  return (
    <div
      ref={overlayRef}
      className={`annotation-overlay${isPlacingPin ? ' annotation-overlay--placing' : ''}${isDragging ? ' annotation-overlay--dragging' : ''}`}
      onClick={handleOverlayClick}
      aria-hidden={!isPlacingPin}
      role={isPlacingPin ? 'button' : undefined}
      aria-label={isPlacingPin ? 'Click on the page to place annotation pin' : undefined}
    >
      {/* Ghost pending pin */}
      {isPlacingPin && pendingPin && (
        <div
          className="annotation-overlay__pin annotation-overlay__pin--pending"
          style={{ left: pendingPin.x, top: pendingPin.y }}
          aria-hidden="true"
        >
          <span>?</span>
        </div>
      )}

      {overlayVisible && pageAnnotations.map(a => {
        const isDraggingThis = drag?.annotationId === a.id;
        const pinX = isDraggingThis ? drag.currentX : (a.pinX ?? 0);
        const pinY = isDraggingThis ? drag.currentY : (a.pinY ?? 0);
        const calloutX = pinX + 28;

        return (
          <React.Fragment key={a.id}>
            <button
              type="button"
              className={`annotation-overlay__pin${a.resolved ? ' annotation-overlay__pin--resolved' : ''}${isDraggingThis ? ' annotation-overlay__pin--dragging' : ''}`}
              style={{ left: pinX, top: pinY }}
              onMouseDown={e => startDrag(e, a.id, a.pinX ?? 0, a.pinY ?? 0)}
              onClick={e => {
                e.stopPropagation();
                // Only open callout if this was a click, not the end of a drag
                const d = dragRef.current;
                const wasDrag = d && (
                  Math.abs(d.currentX - d.startPinX) > 4 ||
                  Math.abs(d.currentY - d.startPinY) > 4
                );
                if (!wasDrag) {
                  setActiveCalloutId(activeCalloutId === a.id ? null : a.id);
                }
              }}
              aria-label={`Annotation ${a.number}: ${a.text}`}
              aria-expanded={activeCalloutId === a.id}
              title="Drag to reposition"
            >
              <span>{a.number}</span>
            </button>

            {activeCalloutId === a.id && !isDraggingThis && (
              <div
                className={`annotation-overlay__callout annotation-overlay__callout--${a.severity}`}
                style={{ left: calloutX, top: pinY }}
                role="tooltip"
              >
                <div className="annotation-overlay__callout-header">
                  <span className="annotation-overlay__callout-number">{a.number}</span>
                  <span className="annotation-overlay__callout-author">{a.author}</span>
                  <button
                    type="button"
                    className="annotation-overlay__callout-close"
                    onClick={e => { e.stopPropagation(); setActiveCalloutId(null); }}
                    aria-label="Close callout"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <line x1="2" y1="2" x2="10" y2="10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                      <line x1="10" y1="2" x2="2" y2="10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
                <p className="annotation-overlay__callout-text">{a.text}</p>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
