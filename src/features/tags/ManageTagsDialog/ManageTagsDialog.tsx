import React, { useState, useCallback, useEffect } from 'react';
import { Modal, Button } from '@idira/design-system';
import type { Tag, TagSuggestion } from '../tag.types';
import { TagAutocompleteInput } from '../TagAutocompleteInput/TagAutocompleteInput';
import './ManageTagsDialog.scss';

// ── Props ─────────────────────────────────────────────────────────────────────

export interface ManageTagsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  entityName: string;
  initialTags: Tag[];
  suggestions: TagSuggestion[];
  onSave: (tags: Tag[]) => Promise<void>;
  readOnly?: boolean;
}

// ── Component ─────────────────────────────────────────────────────────────────

export const ManageTagsDialog: React.FC<ManageTagsDialogProps> = ({
  isOpen,
  onClose,
  entityName,
  initialTags,
  suggestions,
  onSave,
  readOnly = false,
}) => {
  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [confirmDiscard, setConfirmDiscard] = useState(false);

  // Reset state when dialog opens
  useEffect(() => {
    if (isOpen) {
      setTags(initialTags);
      setSaving(false);
      setSaveError(null);
      setConfirmDiscard(false);
    }
  }, [isOpen, initialTags]);

  const isDirty =
    tags.length !== initialTags.length ||
    tags.some((t, i) => t.id !== initialTags[i]?.id);

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleClose = useCallback(() => {
    if (saving) return;
    if (isDirty && !readOnly) {
      setConfirmDiscard(true);
    } else {
      onClose();
    }
  }, [saving, isDirty, readOnly, onClose]);

  const handleSave = useCallback(async () => {
    if (saving || readOnly) return;
    setSaving(true);
    setSaveError(null);
    try {
      await onSave(tags);
      onClose();
    } catch {
      setSaveError('We could not save tag changes. Your updates are still available. Try again or cancel.');
    } finally {
      setSaving(false);
    }
  }, [saving, readOnly, tags, onSave, onClose]);

  const handleRetry = useCallback(() => {
    setSaveError(null);
    handleSave();
  }, [handleSave]);

  // ── Discard confirmation ────────────────────────────────────────────────────

  if (confirmDiscard) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={() => setConfirmDiscard(false)}
        title="Discard tag changes?"
        size="small"
        closeOnBackdropClick={false}
        footer={
          <div className="manageTagsDialog__footer">
            <Button variant="secondary" size="sm" onClick={() => setConfirmDiscard(false)}>
              Keep editing
            </Button>
            <Button variant="main" size="sm" onClick={onClose}>
              Discard changes
            </Button>
          </div>
        }
      >
        <p className="manageTagsDialog__discard-text">
          You have unsaved tag updates. Closing now will discard them.
        </p>
      </Modal>
    );
  }

  // ── Main dialog ─────────────────────────────────────────────────────────────

  const saveDisabled = readOnly || saving || !isDirty;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Manage tags"
      description={`Account: ${entityName}`}
      size="medium"
      closeOnBackdropClick={!saving}
      isLoading={false}
      footer={
        <div className="manageTagsDialog__footer">
          <Button variant="secondary" size="sm" onClick={handleClose} disabled={saving}>
            Cancel
          </Button>
          <Button
            variant="main"
            size="sm"
            onClick={handleSave}
            disabled={saveDisabled}
          >
            {saving ? 'Saving…' : 'Save'}
          </Button>
        </div>
      }
    >
      <div className="manageTagsDialog__body">

        {saveError && (
          <div className="manageTagsDialog__error" role="alert">
            <span>{saveError}</span>
            <button
              type="button"
              className="manageTagsDialog__error-retry"
              onClick={handleRetry}
            >
              Try again
            </button>
          </div>
        )}

        {readOnly && (
          <div className="manageTagsDialog__readonly-notice">
            You have view-only access to tags for this account.
          </div>
        )}

        <TagAutocompleteInput
          tags={tags}
          suggestions={suggestions}
          onChange={setTags}
          disabled={saving || readOnly}
        />
      </div>
    </Modal>
  );
};
