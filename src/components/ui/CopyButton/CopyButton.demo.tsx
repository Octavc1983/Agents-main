import React, { useState } from 'react';
import { CopyButton } from './CopyButton';
import './CopyButton.demo.scss';

export const CopyButtonDemo: React.FC = () => {
  const [customValue, setCustomValue] = useState('Hello, world!');

  return (
    <div className="copy-btn-demo">
      <h1 className="copy-btn-demo__title">CopyButton</h1>

      <section className="copy-btn-demo__section">
        <span className="copy-btn-demo__section-title">Inline with text</span>
        <div className="copy-btn-demo__row">
          <code className="copy-btn-demo__code">npx run dev</code>
          <CopyButton value="npx run dev" label="command" />
        </div>
      </section>

      <section className="copy-btn-demo__section">
        <span className="copy-btn-demo__section-title">Inline with long string</span>
        <div className="copy-btn-demo__row">
          <code className="copy-btn-demo__code">arn:aws:iam::123456789012:role/ExampleRole</code>
          <CopyButton value="arn:aws:iam::123456789012:role/ExampleRole" label="ARN" />
        </div>
      </section>

      <section className="copy-btn-demo__section">
        <span className="copy-btn-demo__section-title">Custom dismiss delay (500ms)</span>
        <div className="copy-btn-demo__row">
          <code className="copy-btn-demo__code">quick-dismiss</code>
          <CopyButton value="quick-dismiss" dismissAfter={500} />
        </div>
      </section>

      <section className="copy-btn-demo__section">
        <span className="copy-btn-demo__section-title">Editable value</span>
        <div className="copy-btn-demo__row">
          <input
            className="copy-btn-demo__input"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
          />
          <CopyButton value={customValue} label="text" />
        </div>
      </section>
    </div>
  );
};
