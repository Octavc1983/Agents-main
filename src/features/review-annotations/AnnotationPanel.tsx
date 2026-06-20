import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@idira/design-system';
import { CloseIcon } from '@idira/design-system/icons';
import { useAnnotations } from './AnnotationContext';
import type { AnnotationSeverity } from './annotationTypes';
import './AnnotationPanel.scss';

const SEVERITY_LABELS: Record<AnnotationSeverity, string> = {
  info: 'Note',
  warning: 'Warning',
  critical: 'Critical',
};

const SEVERITY_OPTIONS: AnnotationSeverity[] = ['info', 'warning', 'critical'];

function formatTime(iso: string) {
  try {
    return new Date(iso).toLocaleString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

export const AnnotationPanel: React.FC = () => {
  const { open, closePanel, annotations, addAnnotation, editAnnotation, resolveAnnotation, deleteAnnotation } = useAnnotations();
  const { pathname } = useLocation();

  const [text, setText] = useState('');
  const [severity, setSeverity] = useState<AnnotationSeverity>('info');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [showResolved, setShowResolved] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) textareaRef.current?.focus();
  }, [open]);

  if (!open) return null;

  const visible = annotations.filter(a =>
    a.pageRoute === pathname &&
    a.deletedAt === null &&
    (showResolved ? true : !a.resolved)
  );

  const handleAdd = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    addAnnotation(pathname, trimmed, severity);
    setText('');
  };

  const handleEdit = (id: string) => {
    const trimmed = editText.trim();
    if (!trimmed) return;
    editAnnotation(id, trimmed);
    setEditingId(null);
  };

  const startEdit = (id: string, current: string) => {
    setEditingId(id);
    setEditText(current);
  };

  return (
    <div className="annotation-panel" role="complementary" aria-label="Review annotations">
      <div className="annotation-panel__header">
        <span className="annotation-panel__title">Annotations</span>
        <div className="annotation-panel__header-actions">
          <button
            type="button"
            className={`annotation-panel__toggle${showResolved ? ' annotation-panel__toggle--active' : ''}`}
            onClick={() => setShowResolved(v => !v)}
          >
            {showResolved ? 'Hide resolved' : 'Show resolved'}
          </button>
          <button
            type="button"
            className="annotation-panel__close"
            onClick={closePanel}
            aria-label="Close annotations panel"
          >
            <CloseIcon size={16} />
          </button>
        </div>
      </div>

      <div className="annotation-panel__compose">
        <div className="annotation-panel__severity-row">
          {SEVERITY_OPTIONS.map(s => (
            <button
              key={s}
              type="button"
              className={`annotation-severity-btn annotation-severity-btn--${s}${severity === s ? ' annotation-severity-btn--active' : ''}`}
              onClick={() => setSeverity(s)}
            >
              {SEVERITY_LABELS[s]}
            </button>
          ))}
        </div>
        <textarea
          ref={textareaRef}
          className="annotation-panel__textarea"
          placeholder="Add an annotation for this page…"
          value={text}
          onChange={e => setText(e.target.value)}
          rows={3}
          onKeyDown={e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleAdd(); }}
        />
        <Button variant="main" size="sm" onClick={handleAdd} disabled={!text.trim()}>
          Add
        </Button>
      </div>

      <div className="annotation-panel__list">
        {visible.length === 0 && (
          <p className="annotation-panel__empty">No annotations for this page yet.</p>
        )}
        {visible.map(a => (
          <div
            key={a.id}
            className={`annotation-item annotation-item--${a.severity}${a.resolved ? ' annotation-item--resolved' : ''}`}
          >
            <div className="annotation-item__meta">
              <span className="annotation-item__avatar">{a.authorInitials}</span>
              <span className="annotation-item__author">{a.author}</span>
              <span className="annotation-item__time">{formatTime(a.timestamp)}</span>
              <span className={`annotation-item__badge annotation-item__badge--${a.severity}`}>
                {SEVERITY_LABELS[a.severity]}
              </span>
            </div>

            {editingId === a.id ? (
              <div className="annotation-item__edit">
                <textarea
                  className="annotation-panel__textarea"
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  rows={2}
                  autoFocus
                />
                <div className="annotation-item__edit-actions">
                  <Button variant="main" size="sm" onClick={() => handleEdit(a.id)}>Save</Button>
                  <Button variant="secondary" size="sm" onClick={() => setEditingId(null)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <p className="annotation-item__text">{a.text}</p>
            )}

            {a.history.length > 0 && (
              <p className="annotation-item__edited">Edited {formatTime(a.history[a.history.length - 1].editedAt)}</p>
            )}

            <div className="annotation-item__actions">
              <button type="button" className="annotation-item__action-btn" onClick={() => resolveAnnotation(a.id)}>
                {a.resolved ? 'Unresolve' : 'Resolve'}
              </button>
              {!a.resolved && editingId !== a.id && (
                <button type="button" className="annotation-item__action-btn" onClick={() => startEdit(a.id, a.text)}>
                  Edit
                </button>
              )}
              <button type="button" className="annotation-item__action-btn annotation-item__action-btn--delete" onClick={() => deleteAnnotation(a.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
