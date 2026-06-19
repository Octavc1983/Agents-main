import { modalService } from './ModalService';
import type { SystemNoticeConfig } from './modal.types';
import { DEFAULT_NOTICE_SIZE } from './modal.constants';

export const systemNoticeService = {
  show(config: SystemNoticeConfig) {
    modalService.openNotice({
      size: DEFAULT_NOTICE_SIZE,
      isDismissible: true,
      tone: 'neutral',
      ...config,
    });
  },

  confirm(config: SystemNoticeConfig & { onConfirm: () => Promise<void> | void }) {
    modalService.openNotice({
      size: DEFAULT_NOTICE_SIZE,
      isDismissible: false,
      tone: 'neutral',
      primaryActionLabel: 'Confirm',
      secondaryActionLabel: 'Cancel',
      ...config,
    });
  },

  danger(config: SystemNoticeConfig & { onConfirm: () => Promise<void> | void }) {
    modalService.openNotice({
      size: DEFAULT_NOTICE_SIZE,
      isDismissible: false,
      tone: 'destructive',
      primaryActionLabel: 'Delete',
      secondaryActionLabel: 'Cancel',
      ...config,
    });
  },

  close() {
    modalService.close();
  },
};
