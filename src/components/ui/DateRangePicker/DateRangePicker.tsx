import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '../Button/Button';
import './DateRangePicker.scss';

// ── Types ─────────────────────────────────────────────────────────────────────

export type DateRange = { from: Date | null; to: Date | null };

export type PresetId =
  | 'today'
  | 'tomorrow'
  | 'this-friday'
  | 'this-saturday'
  | 'this-weekend'
  | 'custom';

export interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  defaultPreset?: PresetId;
  className?: string;
}

export interface DateTimeDialogProps {
  value?: DateRange;
  onSave?: (range: DateRange) => void;
  onCancel?: () => void;
  className?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function isSameDay(a: Date | null, b: Date | null): boolean {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function isBetween(d: Date, from: Date | null, to: Date | null): boolean {
  if (!from || !to) return false;
  return d > from && d < to;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatTime(h: number, m: number): string {
  const hh = h % 12 === 0 ? 12 : h % 12;
  const mm = String(m).padStart(2, '0');
  const ampm = h < 12 ? 'AM' : 'PM';
  return `${hh}:${mm} ${ampm}`;
}

function getNextWeekday(day: number): Date {
  const today = startOfDay(new Date());
  const current = today.getDay();
  const diff = (day - current + 7) % 7 || 7;
  return addDays(today, diff);
}

function getPresetRange(id: PresetId): DateRange {
  const today = startOfDay(new Date());
  switch (id) {
    case 'today': return { from: today, to: today };
    case 'tomorrow': { const t = addDays(today, 1); return { from: t, to: t }; }
    case 'this-friday': { const f = getNextWeekday(5); return { from: f, to: f }; }
    case 'this-saturday': { const s = getNextWeekday(6); return { from: s, to: s }; }
    case 'this-weekend': { const sat = getNextWeekday(6); return { from: sat, to: addDays(sat, 1) }; }
    default: return { from: null, to: null };
  }
}

function getCalendarDays(year: number, month: number): Date[] {
  const first = new Date(year, month, 1);
  const startOffset = first.getDay();
  const days: Date[] = [];
  for (let i = startOffset; i > 0; i--) days.push(addDays(first, -i));
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
  while (days.length < 42) days.push(addDays(days[days.length - 1], 1));
  return days;
}

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_HEADERS = ['Su','Mo','Tu','We','Th','Fr','Sa'];
const PRESETS: { id: PresetId; label: string }[] = [
  { id: 'today', label: 'Today' },
  { id: 'tomorrow', label: 'Tomorrow' },
  { id: 'this-friday', label: 'This Friday' },
  { id: 'this-saturday', label: 'This Saturday' },
  { id: 'this-weekend', label: 'This Weekend' },
  { id: 'custom', label: 'Custom range' },
];

// ── CalendarMonth ─────────────────────────────────────────────────────────────

interface CalendarMonthProps {
  year: number;
  month: number;
  range: DateRange;
  hoverDate?: Date | null;
  onDayClick: (d: Date) => void;
  onDayHover?: (d: Date | null) => void;
  onPrev?: () => void;
  onNext?: () => void;
  showNav?: boolean;
}

const CalendarMonth: React.FC<CalendarMonthProps> = ({
  year, month, range, hoverDate,
  onDayClick, onDayHover, onPrev, onNext, showNav = true,
}) => {
  const today = startOfDay(new Date());
  const days = getCalendarDays(year, month);

  const effectiveTo = range.to ?? hoverDate ?? null;

  return (
    <div className="drp-month">
      {showNav && (
        <div className="drp-month__header">
          {onPrev && (
            <button type="button" className="drp-month__nav-btn" onClick={onPrev} aria-label="Previous month">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
          <span className="drp-month__title">
            <span className="drp-month__title-name">{MONTH_NAMES[month]}</span>
            <span className="drp-month__title-year">{year}</span>
          </span>
          {onNext && (
            <button type="button" className="drp-month__nav-btn" onClick={onNext} aria-label="Next month">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>
      )}

      <div className="drp-month__days-header">
        {DAY_HEADERS.map(d => <span key={d} className="drp-month__day-label">{d}</span>)}
      </div>

      <div className="drp-month__grid" role="grid" aria-label={`${MONTH_NAMES[month]} ${year}`}>
        {days.map((day, i) => {
          const isCurrentMonth = day.getMonth() === month;
          const isToday = isSameDay(day, today);
          const isFrom = isSameDay(day, range.from);
          const isTo = isSameDay(day, effectiveTo);
          const inRange = isBetween(day, range.from, effectiveTo);

          const cls = [
            'drp-day',
            !isCurrentMonth ? 'drp-day--outside' : '',
            isToday ? 'drp-day--today' : '',
            isFrom ? 'drp-day--selected drp-day--from' : '',
            isTo && !isSameDay(day, range.from) ? 'drp-day--selected drp-day--to' : '',
            inRange ? 'drp-day--in-range' : '',
          ].filter(Boolean).join(' ');

          return (
            <button
              key={i}
              type="button"
              role="gridcell"
              className={cls}
              aria-label={day.toDateString()}
              aria-selected={isFrom || isTo}
              aria-disabled={!isCurrentMonth}
              tabIndex={isCurrentMonth ? 0 : -1}
              onClick={() => isCurrentMonth && onDayClick(day)}
              onMouseEnter={() => onDayHover?.(day)}
              onMouseLeave={() => onDayHover?.(null)}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ── TimeScrollPicker ──────────────────────────────────────────────────────────

interface TimeScrollProps {
  hours: number;
  minutes: number;
  onChange: (h: number, m: number) => void;
}

const TimeScrollPicker: React.FC<TimeScrollProps> = ({ hours, minutes, onChange }) => {
  const hoursList = Array.from({ length: 24 }, (_, i) => i);
  const minutesList = [0, 15, 30, 45];

  return (
    <div className="drp-time-scroll">
      <div className="drp-time-scroll__col">
        {hoursList.map(h => (
          <button
            key={h}
            type="button"
            className={['drp-time-scroll__item', h === hours ? 'drp-time-scroll__item--selected' : ''].filter(Boolean).join(' ')}
            onClick={() => onChange(h, minutes)}
          >
            {String(h).padStart(2, '0')}
          </button>
        ))}
      </div>
      <div className="drp-time-scroll__col">
        {minutesList.map(m => (
          <button
            key={m}
            type="button"
            className={['drp-time-scroll__item', m === minutes ? 'drp-time-scroll__item--selected' : ''].filter(Boolean).join(' ')}
            onClick={() => onChange(hours, m)}
          >
            {String(m).padStart(2, '0')}
          </button>
        ))}
      </div>
    </div>
  );
};

// ── DateTimeInput row ─────────────────────────────────────────────────────────

interface DateTimeInputRowProps {
  label: string;
  date: Date | null;
  hours: number;
  minutes: number;
  onDateClick: () => void;
  onTimeClick: () => void;
}

const DateTimeInputRow: React.FC<DateTimeInputRowProps> = ({
  label, date, hours, minutes, onDateClick, onTimeClick,
}) => (
  <div className="drp-dt-row">
    <span className="drp-dt-row__label">{label}</span>
    <div className="drp-dt-row__fields">
      <button type="button" className="drp-dt-row__field" onClick={onDateClick} aria-label={`${label} date`}>
        <span className="drp-dt-row__field-text">{date ? formatDate(date) : 'Select date'}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M5 1v3M11 1v3M2 7h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </button>
      <button type="button" className="drp-dt-row__field" onClick={onTimeClick} aria-label={`${label} time`}>
        <span className="drp-dt-row__field-text">{formatTime(hours, minutes)}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
          <path d="M8 5v3.5l2 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  </div>
);

// ── DateRangePicker ───────────────────────────────────────────────────────────

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  onChange,
  defaultPreset = 'today',
  className,
}) => {
  const today = startOfDay(new Date());
  const [activePreset, setActivePreset] = useState<PresetId>(defaultPreset);
  const [range, setRange] = useState<DateRange>(value ?? getPresetRange(defaultPreset));
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [viewMonth, setViewMonth] = useState({ year: today.getFullYear(), month: today.getMonth() });

  const nextMonth = viewMonth.month === 11
    ? { year: viewMonth.year + 1, month: 0 }
    : { year: viewMonth.year, month: viewMonth.month + 1 };

  const handlePreset = (id: PresetId) => {
    setActivePreset(id);
    if (id !== 'custom') {
      const r = getPresetRange(id);
      setRange(r);
      onChange?.(r);
    }
  };

  const handleDayClick = useCallback((day: Date) => {
    setActivePreset('custom');
    if (!range.from || (range.from && range.to)) {
      const r = { from: day, to: null };
      setRange(r);
      onChange?.(r);
    } else {
      const r = day < range.from
        ? { from: day, to: range.from }
        : { from: range.from, to: day };
      setRange(r);
      onChange?.(r);
    }
  }, [range, onChange]);

  const prevMonth = () => setViewMonth(v =>
    v.month === 0 ? { year: v.year - 1, month: 11 } : { year: v.year, month: v.month - 1 }
  );
  const fwdMonth = () => setViewMonth(v =>
    v.month === 11 ? { year: v.year + 1, month: 0 } : { year: v.year, month: v.month + 1 }
  );

  return (
    <div className={['drp', className].filter(Boolean).join(' ')}>
      <div className="drp__presets">
        {PRESETS.map(p => (
          <button
            key={p.id}
            type="button"
            className={['drp__preset', activePreset === p.id ? 'drp__preset--active' : ''].filter(Boolean).join(' ')}
            onClick={() => handlePreset(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="drp__calendars">
        <CalendarMonth
          {...viewMonth}
          range={range}
          hoverDate={hoverDate}
          onDayClick={handleDayClick}
          onDayHover={setHoverDate}
          onPrev={prevMonth}
          showNav
        />
        <CalendarMonth
          year={nextMonth.year}
          month={nextMonth.month}
          range={range}
          hoverDate={hoverDate}
          onDayClick={handleDayClick}
          onDayHover={setHoverDate}
          onNext={fwdMonth}
          showNav
        />
      </div>
    </div>
  );
};

// ── DateTimeDialog ────────────────────────────────────────────────────────────

export const DateTimeDialog: React.FC<DateTimeDialogProps> = ({
  value,
  onSave,
  onCancel,
  className,
}) => {
  const today = startOfDay(new Date());
  const [range, setRange] = useState<DateRange>(value ?? { from: today, to: today });
  const [fromH, setFromH] = useState(0);
  const [fromM, setFromM] = useState(0);
  const [toH, setToH] = useState(0);
  const [toM, setToM] = useState(0);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [calMonth, setCalMonth] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [activeField, setActiveField] = useState<'from-date' | 'to-date' | 'from-time' | 'to-time' | null>(null);

  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onCancel?.(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onCancel]);

  const handleDayClick = useCallback((day: Date) => {
    if (!range.from || (range.from && range.to)) {
      setRange({ from: day, to: null });
    } else {
      setRange(day < range.from
        ? { from: day, to: range.from }
        : { from: range.from, to: day });
      setActiveField(null);
    }
  }, [range]);

  return (
    <div className="drp-dialog-overlay" ref={overlayRef} role="dialog" aria-modal="true" aria-label="Date and time range">
      <div className={['drp-dialog', className].filter(Boolean).join(' ')}>
        <div className="drp-dialog__header">
          <span className="drp-dialog__title">Date &amp; time</span>
          <button type="button" className="drp-dialog__close" onClick={onCancel} aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="drp-dialog__body">
          <DateTimeInputRow
            label="From"
            date={range.from}
            hours={fromH}
            minutes={fromM}
            onDateClick={() => setActiveField(activeField === 'from-date' ? null : 'from-date')}
            onTimeClick={() => setActiveField(activeField === 'from-time' ? null : 'from-time')}
          />
          <DateTimeInputRow
            label="To"
            date={range.to}
            hours={toH}
            minutes={toM}
            onDateClick={() => setActiveField(activeField === 'to-date' ? null : 'to-date')}
            onTimeClick={() => setActiveField(activeField === 'to-time' ? null : 'to-time')}
          />

          {(activeField === 'from-date' || activeField === 'to-date') && (
            <CalendarMonth
              year={calMonth.year}
              month={calMonth.month}
              range={range}
              hoverDate={hoverDate}
              onDayClick={handleDayClick}
              onDayHover={setHoverDate}
              onPrev={() => setCalMonth(v => v.month === 0 ? { year: v.year - 1, month: 11 } : { year: v.year, month: v.month - 1 })}
              onNext={() => setCalMonth(v => v.month === 11 ? { year: v.year + 1, month: 0 } : { year: v.year, month: v.month + 1 })}
            />
          )}

          {(activeField === 'from-time') && (
            <TimeScrollPicker hours={fromH} minutes={fromM} onChange={(h, m) => { setFromH(h); setFromM(m); }} />
          )}
          {(activeField === 'to-time') && (
            <TimeScrollPicker hours={toH} minutes={toM} onChange={(h, m) => { setToH(h); setToM(m); }} />
          )}
        </div>

        <div className="drp-dialog__footer">
          <Button variant="secondary" size="sm" onClick={onCancel}>Cancel</Button>
          <Button variant="main" size="sm" onClick={() => onSave?.({ from: range.from, to: range.to })}>Save</Button>
        </div>
      </div>
    </div>
  );
};
