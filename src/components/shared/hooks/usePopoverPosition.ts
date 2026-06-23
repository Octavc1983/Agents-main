import { useState, useEffect, type RefObject } from 'react';

export type PopoverPlacement =
  | 'bottom-start'
  | 'bottom-end'
  | 'top-start'
  | 'top-end';

export interface UsePopoverPositionOptions {
  isOpen: boolean;
  triggerRef: RefObject<HTMLElement | null>;
  placement?: PopoverPlacement;
  offset?: number;
  boundaryPadding?: number;
}

export interface PopoverPosition {
  top: number;
  left: number;
  placement: PopoverPlacement;
}

function computePosition(
  rect: DOMRect,
  width: number,
  maxHeight: number,
  opts: Required<Pick<UsePopoverPositionOptions, 'placement' | 'offset' | 'boundaryPadding'>>,
): PopoverPosition {
  const { placement, offset, boundaryPadding: bp } = opts;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let resolvedPlacement = placement;

  const isBottom = placement.startsWith('bottom');
  const isEnd = placement.endsWith('end');

  // Vertical — flip placement if preferred direction doesn't fit
  const spaceBelow = vh - rect.bottom - offset;
  const spaceAbove = rect.top - offset;
  const fitsBelow = spaceBelow >= maxHeight;
  const fitsAbove = spaceAbove >= maxHeight;

  if (isBottom && !fitsBelow && fitsAbove) {
    resolvedPlacement = placement.replace('bottom', 'top') as PopoverPlacement;
  } else if (!isBottom && !fitsAbove && fitsBelow) {
    resolvedPlacement = placement.replace('top', 'bottom') as PopoverPlacement;
  }

  const useTop = resolvedPlacement.startsWith('top');
  let top = useTop ? rect.top - maxHeight - offset : rect.bottom + offset;

  // Horizontal
  let left = isEnd ? rect.right - width : rect.left;

  // Clamp to viewport
  if (left + width > vw - bp) left = vw - width - bp;
  if (left < bp) left = bp;
  if (top < bp) top = bp;
  if (top + maxHeight > vh - bp) top = vh - maxHeight - bp;

  return { top, left, placement: resolvedPlacement };
}

/**
 * Standalone computation for callers that already have a DOMRect (no ref).
 */
export function computePopoverPosition(
  anchorRect: DOMRect,
  width: number,
  maxHeight: number,
  opts: Required<Pick<UsePopoverPositionOptions, 'placement' | 'offset' | 'boundaryPadding'>>,
): PopoverPosition {
  return computePosition(anchorRect, width, maxHeight, opts);
}

/**
 * Computes and tracks a viewport-safe portal position anchored to a trigger element.
 * Recomputes when isOpen becomes true, on scroll, and on resize.
 *
 * Hook owns: trigger geometry, viewport clamping, placement fallback, resize/scroll recalculation.
 * Hook does NOT own: open state, portal rendering, focus management, click-outside, content.
 */
export function usePopoverPosition(
  opts: UsePopoverPositionOptions,
  popoverWidth: number,
  popoverMaxHeight: number = 300,
): PopoverPosition {
  const {
    isOpen,
    triggerRef,
    placement = 'bottom-start',
    offset = 6,
    boundaryPadding = 8,
  } = opts;

  const [pos, setPos] = useState<PopoverPosition>({
    top: 0,
    left: 0,
    placement,
  });

  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;

    const recalculate = () => {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      setPos(computePosition(rect, popoverWidth, popoverMaxHeight, {
        placement,
        offset,
        boundaryPadding,
      }));
    };

    recalculate();

    window.addEventListener('scroll', recalculate, true);
    window.addEventListener('resize', recalculate);
    return () => {
      window.removeEventListener('scroll', recalculate, true);
      window.removeEventListener('resize', recalculate);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return pos;
}
