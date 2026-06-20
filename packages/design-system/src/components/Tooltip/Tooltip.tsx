import React, { useState, useRef, useEffect, useCallback, type ReactElement, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import './Tooltip.scss';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: ReactNode;
  placement?: TooltipPlacement;
  disabled?: boolean;
  delayMs?: number;
  children: ReactElement;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  placement = 'top',
  disabled = false,
  delayMs = 300,
  children,
  className,
}) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const computePosition = useCallback(() => {
    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;
    if (!trigger || !tooltip) return;

    const tr = trigger.getBoundingClientRect();
    const tt = tooltip.getBoundingClientRect();
    const GAP = 8;

    let top = 0;
    let left = 0;

    switch (placement) {
      case 'top':
        top = tr.top - tt.height - GAP + window.scrollY;
        left = tr.left + tr.width / 2 - tt.width / 2 + window.scrollX;
        break;
      case 'bottom':
        top = tr.bottom + GAP + window.scrollY;
        left = tr.left + tr.width / 2 - tt.width / 2 + window.scrollX;
        break;
      case 'left':
        top = tr.top + tr.height / 2 - tt.height / 2 + window.scrollY;
        left = tr.left - tt.width - GAP + window.scrollX;
        break;
      case 'right':
        top = tr.top + tr.height / 2 - tt.height / 2 + window.scrollY;
        left = tr.right + GAP + window.scrollX;
        break;
    }

    setCoords({ top, left });
  }, [placement]);

  const show = () => {
    if (disabled) return;
    timerRef.current = setTimeout(() => {
      setVisible(true);
    }, delayMs);
  };

  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  };

  useEffect(() => {
    if (visible) computePosition();
  }, [visible, computePosition]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const child = React.Children.only(children) as ReactElement;

  const trigger = React.cloneElement(child, {
    ref: triggerRef,
    onMouseEnter: (e: React.MouseEvent) => {
      show();
      (child.props as Record<string, unknown>).onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      hide();
      (child.props as Record<string, unknown>).onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent) => {
      show();
      (child.props as Record<string, unknown>).onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent) => {
      hide();
      (child.props as Record<string, unknown>).onBlur?.(e);
    },
  });

  return (
    <>
      {trigger}
      {visible && createPortal(
        <div
          ref={tooltipRef}
          role="tooltip"
          className={['tooltip', `tooltip--${placement}`, className].filter(Boolean).join(' ')}
          style={{ top: coords.top, left: coords.left }}
        >
          {content}
          <span className="tooltip__arrow" aria-hidden="true" />
        </div>,
        document.body,
      )}
    </>
  );
};
