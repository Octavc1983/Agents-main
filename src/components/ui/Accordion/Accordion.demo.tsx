import React from 'react';
import { Accordion } from './Accordion';
import './Accordion.demo.scss';

const ITEMS = [
  {
    id: 'item-1',
    title: 'Title',
    defaultOpen: false,
  },
  {
    id: 'item-2',
    title: 'Title',
    defaultOpen: true,
    content: <div className="accordion-demo__content-placeholder" aria-hidden="true" />,
  },
];

export const AccordionDemo: React.FC = () => (
  <div className="accordion-demo">
    <h1 className="accordion-demo__title">Accordion</h1>

    <div className="accordion-demo__grid">
      <div>
        <span className="accordion-demo__col-label">Idle</span>
        <Accordion items={ITEMS} />
      </div>

      <div>
        <span className="accordion-demo__col-label">Hover/Focus</span>
        <Accordion items={ITEMS} />
      </div>
    </div>
  </div>
);
