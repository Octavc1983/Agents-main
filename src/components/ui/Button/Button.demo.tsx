import React from 'react';
import { Button } from './Button';
import { FilterButton } from './FilterButton';
import { IconButton } from './IconButton';
import { SplitButton } from './SplitButton';
import { TextLink } from './TextLink';
import './Button.demo.scss';

const PlusIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const FilterIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 6h18M7 12h10M11 18h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const ButtonDemo: React.FC = () => (
  <div className="btn-demo">
    <h1 className="btn-demo__title">Buttons</h1>

    {/* ── Main / Secondary / Text ── */}
    <section className="btn-demo__section">
      {(['main', 'secondary', 'text'] as const).map(variant => (
        <div key={variant} className="btn-demo__group">
          <h2 className="btn-demo__group-title">
            {variant === 'main' ? 'Main' : variant === 'secondary' ? 'Secondary' : 'Text'} Button
          </h2>
          <div className="btn-demo__size-row">
            {(['lg', 'md', 'sm'] as const).map(size => (
              <div key={size} className="btn-demo__col">
                <span className="btn-demo__label">{size === 'lg' ? 'Large 34px' : size === 'md' ? 'Medium 28px' : 'Small 24px'}</span>
                <Button variant={variant} size={size}>Button</Button>
                <Button variant={variant} size={size}>Button</Button>
                <Button variant={variant} size={size}>Button</Button>
                <Button variant={variant} size={size} disabled>Button</Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>

    {/* ── Filter Button ── */}
    <section className="btn-demo__section">
      <h2 className="btn-demo__group-title">Filter Button</h2>
      <div className="btn-demo__col">
        {(['default', 'hover', 'pressed', 'selected', 'disabled'] as const).map(state => (
          <div key={state} className="btn-demo__row">
            <FilterButton label="Filter" icon={<FilterIcon />} state={state} />
            <span className="btn-demo__state-label">
              {state.charAt(0).toUpperCase() + state.slice(1)}
            </span>
          </div>
        ))}
      </div>
    </section>

    {/* ── Icon Button ── */}
    <section className="btn-demo__section">
      <h2 className="btn-demo__group-title">Icon Buttons</h2>
      {(['idle', 'hover', 'pressed', 'selected', 'disabled'] as const).map(state => (
        <div key={state} className="btn-demo__row">
          {([16, 24, 32] as const).map(sz => (
            <IconButton
              key={sz}
              icon={<PlusIcon size={sz} />}
              iconSize={sz}
              state={state}
              aria-label={`${state} icon button ${sz}px`}
            />
          ))}
        </div>
      ))}
    </section>

    {/* ── Split Button ── */}
    <section className="btn-demo__section">
      <h2 className="btn-demo__group-title">Split Button</h2>
      {(['sm', 'md', 'lg'] as const).map(size => (
        <div key={size} className="btn-demo__row">
          {(['primary', 'secondary'] as const).map(variant => (
            <SplitButton key={variant} label="Button" variant={variant} size={size} />
          ))}
          {(['primary', 'secondary'] as const).map(variant => (
            <SplitButton key={`${variant}-disabled`} label="Button" variant={variant} size={size} disabled />
          ))}
        </div>
      ))}
    </section>

    {/* ── Text Link ── */}
    <section className="btn-demo__section">
      <h2 className="btn-demo__group-title">Text Link</h2>
      <div className="btn-demo__row">
        <TextLink>Text link</TextLink>
        <TextLink disabled>Text link</TextLink>
      </div>
    </section>
  </div>
);
