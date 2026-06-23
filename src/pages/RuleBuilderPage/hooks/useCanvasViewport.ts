import { useState, useCallback } from 'react';
import type { CanvasViewport } from '../RuleBuilderPage.types';
import {
  ZOOM_STEP, ZOOM_MIN, ZOOM_MAX, ZOOM_DEFAULT,
  CANVAS_SAFETY_MARGIN,
} from '../RuleBuilderPage.constants';

interface PanToNodeOptions {
  nodeX: number;
  nodeY: number;
  nodeW: number;
  nodeH: number;
}

export function useCanvasViewport(workspaceRef: React.RefObject<HTMLDivElement | null>) {
  const [viewport, setViewport] = useState<CanvasViewport>({ x: 0, y: 0, zoom: ZOOM_DEFAULT });

  const zoom        = viewport.zoom;
  const zoomPercent = Math.round(zoom * 100);

  const setZoom = useCallback((updater: (z: number) => number) => {
    setViewport((vp) => ({ ...vp, zoom: updater(vp.zoom) }));
  }, []);

  const zoomIn  = useCallback(() => setZoom((z) => Math.min(parseFloat((z + ZOOM_STEP).toFixed(2)), ZOOM_MAX)), [setZoom]);
  const zoomOut = useCallback(() => setZoom((z) => Math.max(parseFloat((z - ZOOM_STEP).toFixed(2)), ZOOM_MIN)), [setZoom]);

  const panToNode = useCallback(({ nodeX, nodeY, nodeW, nodeH }: PanToNodeOptions) => {
    if (!workspaceRef.current) return;
    const ws = workspaceRef.current;
    const panX = ws.clientWidth  / 2 - (nodeX + nodeW / 2) * zoom;
    const panY = ws.clientHeight / 2 - (nodeY + nodeH / 2) * zoom;
    setViewport((vp) => ({ ...vp, x: panX, y: panY }));
  }, [workspaceRef, zoom]);

  const fitCanvas = useCallback((
    allRects: Array<{ x: number; y: number; w: number; h: number }>,
  ) => {
    const ws = workspaceRef.current;
    if (!ws || allRects.length === 0) {
      setViewport((vp) => ({ ...vp, zoom: ZOOM_DEFAULT, x: 0, y: 0 }));
      return;
    }
    const hostW = ws.clientWidth;
    const hostH = ws.clientHeight;
    const minX  = Math.min(...allRects.map((r) => r.x));
    const minY  = Math.min(...allRects.map((r) => r.y));
    const maxX  = Math.max(...allRects.map((r) => r.x + r.w));
    const maxY  = Math.max(...allRects.map((r) => r.y + r.h));
    const graphW = maxX - minX + CANVAS_SAFETY_MARGIN * 2;
    const graphH = maxY - minY + CANVAS_SAFETY_MARGIN * 2;
    const scale  = Math.max(Math.min(hostW / graphW, hostH / graphH, ZOOM_MAX), ZOOM_MIN);
    const panX   = (hostW  - (maxX + minX) * scale) / 2;
    const panY   = (hostH - (maxY + minY) * scale) / 2;
    setViewport({ x: panX, y: panY, zoom: parseFloat(scale.toFixed(2)) });
  }, [workspaceRef]);

  return { viewport, zoom, zoomPercent, zoomIn, zoomOut, panToNode, fitCanvas };
}
