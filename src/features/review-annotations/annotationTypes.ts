export type AnnotationSeverity = 'info' | 'warning' | 'critical';

export interface Annotation {
  id: string;
  pageRoute: string;
  author: string;
  authorInitials: string;
  timestamp: string;
  text: string;
  severity: AnnotationSeverity;
  resolved: boolean;
  deletedAt: string | null;
  history: Array<{ text: string; editedAt: string }>;
}
