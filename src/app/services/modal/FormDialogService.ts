import { modalService } from './ModalService';
import type { FormDialogConfig } from './modal.types';
import { DEFAULT_FORM_DIALOG_SIZE } from './modal.constants';

export const formDialogService = {
  open<T>(config: FormDialogConfig<T>) {
    modalService.openForm<T>({
      size: DEFAULT_FORM_DIALOG_SIZE,
      preventCloseWhenDirty: true,
      showCloseButton: true,
      ...config,
    });
  },

  close() {
    modalService.close();
  },
};
