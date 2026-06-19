import React, { useState } from 'react';
import './Accordion.scss';

export interface AccordionItemProps {
  id: string;
  title: string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  actions?: React.ReactNode;
  isOpen?: boolean;
  onToggle?: (id: string, open: boolean) => void;
}

export interface AccordionProps {
  items: AccordionItemDef[];
  allowMultiple?: boolean;
  className?: string;
}

export interface AccordionItemDef {
  id: string;
  title: string;
  content?: React.ReactNode;
  defaultOpen?: boolean;
  actions?: React.ReactNode;
}

const ChevronDownIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronUpIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M13 10l-5-5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DotsIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="3" r="1.2" fill="currentColor" />
    <circle cx="8" cy="8" r="1.2" fill="currentColor" />
    <circle cx="8" cy="13" r="1.2" fill="currentColor" />
  </svg>
);

export const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  title,
  children,
  defaultOpen = false,
  actions,
  isOpen: controlledOpen,
  onToggle,
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const handleToggle = () => {
    if (!isControlled) setInternalOpen(v => !v);
    onToggle?.(id, !isOpen);
  };

  const panelId = `accordion-panel-${id}`;
  const headerId = `accordion-header-${id}`;

  return (
    <div className={['accordion-item', isOpen ? 'accordion-item--open' : ''].filter(Boolean).join(' ')}>
      <div className="accordion-item__header" id={headerId}>
        <button
          type="button"
          className="accordion-item__trigger"
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
        >
          <span className="accordion-item__chevron">
            {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </span>
          <span className="accordion-item__title">{title}</span>
        </button>

        <div className="accordion-item__actions">
          {actions || (
            <button
              type="button"
              className="accordion-item__more-btn"
              aria-label={`More options for ${title}`}
            >
              <DotsIcon />
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <div
          id={panelId}
          className="accordion-item__panel"
          role="region"
          aria-labelledby={headerId}
        >
          <div className="accordion-item__content">
            {children || (
              <div className="accordion-item__placeholder" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2l1.5 4.5H14l-3.75 2.75 1.5 4.5L8 11.25l-3.75 2.5 1.5-4.5L2 6.5h4.5L8 2z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = true,
  className,
}) => {
  const [openIds, setOpenIds] = useState<Set<string>>(
    () => new Set(items.filter(i => i.defaultOpen).map(i => i.id))
  );

  const handleToggle = (id: string, open: boolean) => {
    setOpenIds(prev => {
      const next = new Set(prev);
      if (open) {
        if (!allowMultiple) next.clear();
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  return (
    <div className={['accordion', className || ''].filter(Boolean).join(' ')}>
      {items.map(item => (
        <AccordionItem
          key={item.id}
          id={item.id}
          title={item.title}
          isOpen={openIds.has(item.id)}
          onToggle={handleToggle}
          actions={item.actions}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};
