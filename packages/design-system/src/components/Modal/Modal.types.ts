export type ModalSize = 'small' | 'medium' | 'large' | 'full';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: ModalSize;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  isDismissible?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
  ariaLabel?: string;
  /** id prefix for aria-labelledby / aria-describedby — auto-generated if omitted */
  id?: string;
}
