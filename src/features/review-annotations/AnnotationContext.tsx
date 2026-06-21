import { createContext, useContext, useState, useCallback } from 'react';
import type React from 'react';
import type { Annotation, AnnotationSeverity } from './annotationTypes';

let _nextId = 1;
const uid = () => String(_nextId++);
let _nextNumber = 1;

interface PendingPin { x: number; y: number }

interface AnnotationContextValue {
  open: boolean;
  annotations: Annotation[];
  openPanel: () => void;
  closePanel: () => void;
  addAnnotation: (pageRoute: string, text: string, severity: AnnotationSeverity) => void;
  editAnnotation: (id: string, text: string) => void;
  resolveAnnotation: (id: string) => void;
  deleteAnnotation: (id: string) => void;
  isPlacingPin: boolean;
  startPlacingPin: () => void;
  cancelPlacingPin: () => void;
  pendingPin: PendingPin | null;
  setPendingPin: (pin: PendingPin | null) => void;
  overlayVisible: boolean;
  setOverlayVisible: (v: boolean) => void;
  activeCalloutId: string | null;
  setActiveCalloutId: (id: string | null) => void;
  movePinPosition: (id: string, x: number, y: number) => void;
}

const AnnotationContext = createContext<AnnotationContextValue | null>(null);

export const AnnotationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [isPlacingPin, setIsPlacingPin] = useState(false);
  const [pendingPin, setPendingPin] = useState<PendingPin | null>(null);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [activeCalloutId, setActiveCalloutId] = useState<string | null>(null);

  const openPanel = useCallback(() => setOpen(true), []);
  const closePanel = useCallback(() => setOpen(false), []);
  const startPlacingPin = useCallback(() => { setIsPlacingPin(true); setPendingPin(null); }, []);
  const cancelPlacingPin = useCallback(() => { setIsPlacingPin(false); setPendingPin(null); }, []);

  const addAnnotation = useCallback((pageRoute: string, text: string, severity: AnnotationSeverity) => {
    const now = new Date().toISOString();
    const pin = pendingPin;
    setAnnotations(prev => [...prev, {
      id: uid(),
      number: _nextNumber++,
      pageRoute,
      author: 'Thomas Anderson',
      authorInitials: 'TA',
      timestamp: now,
      text,
      severity,
      resolved: false,
      deletedAt: null,
      history: [],
      pinX: pin?.x,
      pinY: pin?.y,
    }]);
    setIsPlacingPin(false);
    setPendingPin(null);
  }, [pendingPin]);

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

  const movePinPosition = useCallback((id: string, x: number, y: number) => {
    setAnnotations(prev => prev.map(a => a.id !== id ? a : { ...a, pinX: x, pinY: y }));
  }, []);

  return (
    <AnnotationContext.Provider value={{
      open, annotations, openPanel, closePanel,
      addAnnotation, editAnnotation, resolveAnnotation, deleteAnnotation,
      isPlacingPin, startPlacingPin, cancelPlacingPin,
      pendingPin, setPendingPin,
      overlayVisible, setOverlayVisible,
      activeCalloutId, setActiveCalloutId,
      movePinPosition,
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
