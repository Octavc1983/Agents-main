import { createContext, useContext, useState, useCallback } from 'react';
import type React from 'react';
import type { Annotation, AnnotationSeverity } from './annotationTypes';

let _nextId = 1;
const uid = () => String(_nextId++);

interface AnnotationContextValue {
  open: boolean;
  annotations: Annotation[];
  openPanel: () => void;
  closePanel: () => void;
  addAnnotation: (pageRoute: string, text: string, severity: AnnotationSeverity) => void;
  editAnnotation: (id: string, text: string) => void;
  resolveAnnotation: (id: string) => void;
  deleteAnnotation: (id: string) => void;
}

const AnnotationContext = createContext<AnnotationContextValue | null>(null);

export const AnnotationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  const openPanel = useCallback(() => setOpen(true), []);
  const closePanel = useCallback(() => setOpen(false), []);

  const addAnnotation = useCallback((pageRoute: string, text: string, severity: AnnotationSeverity) => {
    const now = new Date().toISOString();
    setAnnotations(prev => [...prev, {
      id: uid(),
      pageRoute,
      author: 'Thomas Anderson',
      authorInitials: 'TA',
      timestamp: now,
      text,
      severity,
      resolved: false,
      deletedAt: null,
      history: [],
    }]);
  }, []);

  const editAnnotation = useCallback((id: string, text: string) => {
    const now = new Date().toISOString();
    setAnnotations(prev => prev.map(a => a.id !== id ? a : {
      ...a,
      history: [...a.history, { text: a.text, editedAt: now }],
      text,
    }));
  }, []);

  const resolveAnnotation = useCallback((id: string) => {
    setAnnotations(prev => prev.map(a => a.id !== id ? a : { ...a, resolved: !a.resolved }));
  }, []);

  const deleteAnnotation = useCallback((id: string) => {
    const now = new Date().toISOString();
    setAnnotations(prev => prev.map(a => a.id !== id ? a : { ...a, deletedAt: now }));
  }, []);

  return (
    <AnnotationContext.Provider value={{
      open, annotations, openPanel, closePanel,
      addAnnotation, editAnnotation, resolveAnnotation, deleteAnnotation,
    }}>
      {children}
    </AnnotationContext.Provider>
  );
};

export const useAnnotations = (): AnnotationContextValue => {
  const ctx = useContext(AnnotationContext);
  if (!ctx) throw new Error('useAnnotations must be used inside AnnotationProvider');
  return ctx;
};
