import type { ActiveModal, FormDialogConfig, SystemNoticeConfig } from './modal.types';

type Listener = (modal: ActiveModal | null) => void;

class ModalService {
  private current: ActiveModal | null = null;
  private listeners = new Set<Listener>();

  private notify() {
    this.listeners.forEach(fn => fn(this.current));
  }

  subscribe(fn: Listener) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  getActive(): ActiveModal | null {
    return this.current;
  }

  openForm<T>(config: FormDialogConfig<T>) {
    if (this.current?.config.id === config.id) return;
    this.current = { kind: 'form', config: config as FormDialogConfig<unknown> };
    this.notify();
  }

  openNotice(config: SystemNoticeConfig) {
    if (this.current?.config.id === config.id) return;
    this.current = { kind: 'notice', config };
    this.notify();
  }

  close() {
    this.current = null;
    this.notify();
  }
}

export const modalService = new ModalService();
