import React, { useState } from 'react';
import { DateRangePicker, DateTimeDialog } from './DateRangePicker';
import './DateRangePicker.demo.scss';

export const DateRangePickerDemo: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="drp-demo">
      <h1 className="drp-demo__title">Calendar &amp; Time Range Select</h1>

      <section className="drp-demo__section">
        <span className="drp-demo__label">Date Range Picker — dual month</span>
        <DateRangePicker defaultPreset="this-saturday" />
      </section>

      <section className="drp-demo__section">
        <span className="drp-demo__label">Date Range Picker — preset: Today</span>
        <DateRangePicker defaultPreset="today" />
      </section>

      <section className="drp-demo__section">
        <span className="drp-demo__label">Date &amp; Time Dialog</span>
        <button
          type="button"
          className="drp-demo__trigger"
          onClick={() => setDialogOpen(true)}
        >
          Open Date &amp; Time dialog
        </button>
        {dialogOpen && (
          <DateTimeDialog
            onSave={() => setDialogOpen(false)}
            onCancel={() => setDialogOpen(false)}
          />
        )}
      </section>
    </div>
  );
};
