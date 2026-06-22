/**
 * ConfirmationDialogTemplate — Page Composition Template
 *
 * Thin imperative API over the modal service for destructive-action confirmations.
 * Delegates rendering to ConfirmationDialogRenderer inside ModalProvider.
 *
 * This is NOT a DS component. It is a prototype-layer template.
 * Rendering is owned by ModalProvider — this file exposes only the open/close API.
 */

import { modalService } from '../../app/services/modal/ModalService';
import type { ConfirmationDialogConfig } from '../../app/services/modal/modal.types';

export const confirmationDialogTemplate = {
  open(config: ConfirmationDialogConfig) {
    modalService.openConfirmation(config);
  },

  close() {
    modalService.close();
  },
};
