import { useState, useCallback } from 'react';
import type { RuleGraphSnapshot } from '../RuleBuilderPage.types';
import { MAX_HISTORY } from '../RuleBuilderPage.constants';

export function useRuleGraphHistory() {
  const [undoStack, setUndoStack] = useState<RuleGraphSnapshot[]>([]);
  const [redoStack, setRedoStack] = useState<RuleGraphSnapshot[]>([]);

  const canUndo = undoStack.length > 0;
  const canRedo = redoStack.length > 0;

  const pushHistory = useCallback((snapshot: RuleGraphSnapshot) => {
    setUndoStack((stack) => {
      const next = [...stack, snapshot];
      return next.length > MAX_HISTORY ? next.slice(next.length - MAX_HISTORY) : next;
    });
    setRedoStack([]);
  }, []);

  const undo = useCallback(
    (
      current: RuleGraphSnapshot,
      apply: (snapshot: RuleGraphSnapshot) => void,
    ) => {
      if (!canUndo) return;
      setUndoStack((stack) => {
        const prev = stack[stack.length - 1];
        setRedoStack((r) => [...r, current]);
        apply(prev);
        return stack.slice(0, -1);
      });
    },
    [canUndo],
  );

  const redo = useCallback(
    (
      current: RuleGraphSnapshot,
      apply: (snapshot: RuleGraphSnapshot) => void,
    ) => {
      if (!canRedo) return;
      setRedoStack((stack) => {
        const next = stack[stack.length - 1];
        setUndoStack((u) => [...u, current]);
        apply(next);
        return stack.slice(0, -1);
      });
    },
    [canRedo],
  );

  const clearHistory = useCallback(() => {
    setUndoStack([]);
    setRedoStack([]);
  }, []);

  return { canUndo, canRedo, pushHistory, undo, redo, clearHistory };
}
