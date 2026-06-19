import React, { useState, useCallback, useRef } from 'react';
import './CopyButton.scss';

export interface CopyButtonProps {
  value: string;
  label?: string;
  dismissAfter?: number;
  className?: string;
  'aria-label'?: string;
}

const CopyIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="5.5" y="5.5" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.3" />
    <path d="M3 10.5V3h7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const CheckIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M11.2195 6.50683C11.4994 6.20149 11.4788 5.72707 11.1734 5.44718C10.8681 5.16728 10.3937 5.18791 10.1138 5.49325L6.44711 9.49325L5.33331 8.33337C5.04042 8.04048 4.56554 8.04048 4.27265 8.33337C3.97976 8.62626 3.97976 9.10114 4.27265 9.39403L5.86364 10.985L6.99998 10L7.55285 10.5068L11.2195 6.50683Z" fill="currentColor" />
    <path d="M13.9166 8.00004C13.9166 11.2677 11.2677 13.9167 7.99998 13.9167C4.73229 13.9167 2.08331 11.2677 2.08331 8.00004C2.08331 4.73236 4.73229 2.08337 7.99998 2.08337C11.2677 2.08337 13.9166 4.73236 13.9166 8.00004Z" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const CopyButton: React.FC<CopyButtonProps> = ({
  value,
  label,
  dismissAfter = 2000,
  className,
  'aria-label': ariaLabel,
}) => {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = value;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }

    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), dismissAfter);
  }, [value, dismissAfter]);

  return (
    <span className={['copy-btn', className].filter(Boolean).join(' ')}>
      <button
        type="button"
        className="copy-btn__trigger"
        onClick={handleCopy}
        aria-label={ariaLabel ?? `Copy${label ? ` ${label}` : ''}`}
        aria-pressed={copied}
      >
        <CopyIcon />
      </button>

      {copied && (
        <span className="copy-btn__badge" role="status" aria-live="polite">
          {/* SVG pill with left-pointing arrow tail — exact shape from spec */}
          <svg
            className="copy-btn__badge-bg"
            width="91" height="27"
            viewBox="0 0 91 27"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M11.3134 0.5H82.201C86.3432 0.5 89.701 3.85786 89.701 8V19C89.701 23.1421 86.3432 26.5 82.201 26.5H11.3134C7.17123 26.5 3.81335 23.1421 3.81335 19V16.7842C3.81332 16.2834 3.56359 15.8155 3.14734 15.5371L0.722534 13.916C0.426454 13.718 0.426458 13.282 0.722534 13.084L3.14734 11.4629C3.56359 11.1845 3.81332 10.7166 3.81335 10.2158V8C3.81335 3.85787 7.17123 0.50001 11.3134 0.5Z"
              fill="var(--copy-badge-bg)"
              stroke="var(--copy-badge-border)"
            />
          </svg>
          <span className="copy-btn__badge-content">
            <CheckIcon />
            Copied!
          </span>
        </span>
      )}
    </span>
  );
};
