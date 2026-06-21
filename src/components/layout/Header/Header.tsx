import { useState, useRef, useEffect, type FC, type ReactNode } from 'react';
import { useThemeMode } from '../../../providers/ThemeProvider';
import './Header.scss';

// ── Inline icons (header-specific — gradient AI, bell, help, moon, sun) ───────

const AISparkleIcon: FC<{ size?: number }> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <g filter="url(#ai-hdr-shadow)">
      <path d="M7.16092 11.4282C7.35371 11.4282 7.52108 11.5617 7.56344 11.7498L7.77458 12.6888C7.91902 13.33 8.41996 13.831 9.06118 13.9754L10.0002 14.1866C10.1883 14.2289 10.3218 14.3963 10.3218 14.5891C10.3218 14.7819 10.1883 14.9492 10.0002 14.9916L9.06118 15.2027C8.41996 15.3472 7.91902 15.8481 7.77458 16.4893L7.56344 17.4284C7.52108 17.6164 7.35371 17.75 7.16092 17.75C6.96812 17.75 6.80076 17.6164 6.7584 17.4284L6.54726 16.4893C6.40282 15.8481 5.90188 15.3472 5.26066 15.2027L4.32165 14.9916C4.13357 14.9492 4 14.7819 4 14.5891C4 14.3963 4.13357 14.2289 4.32165 14.1866L5.26066 13.9754C5.90188 13.831 6.40282 13.33 6.54726 12.6888L6.7584 11.7498C6.80076 11.5617 6.96812 11.4282 7.16092 11.4282Z" fill="url(#ai-hdr-g1)" />
      <path d="M12.8506 4C13.0722 4 13.2642 4.1536 13.313 4.3698L13.6538 5.88173C13.9024 6.98554 14.7645 7.84759 15.8683 8.09623L17.3802 8.43702C17.5964 8.4858 17.75 8.67777 17.75 8.89943C17.75 9.12108 17.5964 9.31305 17.3802 9.36183L15.8683 9.70262C14.7645 9.95126 13.9024 10.8133 13.6538 11.9171L13.313 13.429C13.2642 13.6453 13.0722 13.7989 12.8506 13.7989C12.6289 13.7989 12.4369 13.6453 12.3882 13.429L12.0474 11.9171C11.7987 10.8133 10.9367 9.95126 9.83288 9.70262L8.32095 9.36183C8.10474 9.31305 7.95115 9.12108 7.95115 8.89943C7.95115 8.67777 8.10474 8.4858 8.32095 8.43702L9.83288 8.09623C10.9367 7.84759 11.7987 6.98554 12.0474 5.88173L12.3882 4.3698C12.4369 4.1536 12.6289 4 12.8506 4Z" fill="url(#ai-hdr-g2)" />
    </g>
    <defs>
      <filter id="ai-hdr-shadow" x="0" y="0" width="21.75" height="21.75" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset /><feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.36 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
      <linearGradient id="ai-hdr-g1" x1="4.38194" y1="5.90972" x2="15.0764" y2="16.6042" gradientUnits="userSpaceOnUse">
        <stop stopColor="#BDC0FF" /><stop offset="1" stopColor="#304FFE" />
      </linearGradient>
      <linearGradient id="ai-hdr-g2" x1="4.38194" y1="5.90972" x2="15.0764" y2="16.6042" gradientUnits="userSpaceOnUse">
        <stop stopColor="#BDC0FF" /><stop offset="1" stopColor="#304FFE" />
      </linearGradient>
    </defs>
  </svg>
);

const BellIcon: FC = () => (
  <svg width="16" height="17" viewBox="0 0 24 26" fill="none" aria-hidden="true">
    <path d="M2.52992 19.9122C2.31727 21.3062 3.268 22.2738 4.43205 22.756C8.89481 24.6048 15.1052 24.6048 19.5679 22.756C20.732 22.2738 21.6827 21.3062 21.4701 19.9122C21.3394 19.0555 20.6932 18.3421 20.2144 17.6455C19.5873 16.7219 19.525 15.7144 19.5249 14.6426C19.5249 10.5004 16.1559 7.14258 12 7.14258C7.84413 7.14258 4.47513 10.5004 4.47513 14.6426C4.47503 15.7144 4.41272 16.7219 3.78561 17.6455C3.30684 18.3421 2.66061 19.0555 2.52992 19.9122Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 22.1426C8.45849 23.8678 10.0755 25.1426 12 25.1426C13.9245 25.1426 15.5415 23.8678 16 22.1426" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const QuestionCircleIcon: FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 8.84615C10 7.82655 10.8954 7 12 7C13.1046 7 14 7.82655 14 8.84615C14 9.21368 13.8837 9.55612 13.6831 9.84381C13.0854 10.7012 12 11.5189 12 12.5385V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11.992 16H12.001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MoonIcon: FC = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M14.3333 9.38558C13.5335 9.81264 12.6201 10.0547 11.6501 10.0547C8.49937 10.0547 5.94524 7.50059 5.94524 4.34991C5.94524 3.37991 6.18733 2.46646 6.61438 1.66667C3.77839 2.33133 1.66663 4.87676 1.66663 7.91542C1.66663 11.4599 4.54003 14.3333 8.08455 14.3333C11.1232 14.3333 13.6686 12.2216 14.3333 9.38558Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SunIcon: FC = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8.00004 1.33333V2.33333M8.00004 13.6667V14.6667M12.7139 12.7142L12.0068 12.0071M3.99288 3.99283L3.28577 3.28573M14.6667 7.99999H13.6667M2.33337 7.99999H1.33337M12.7142 3.2858L12.0071 3.99291M3.9932 12.0072L3.2861 12.7143M11.3334 7.99999C11.3334 9.84094 9.84099 11.3333 8.00004 11.3333C6.15909 11.3333 4.66671 9.84094 4.66671 7.99999C4.66671 6.15905 6.15909 4.66666 8.00004 4.66666C9.84099 4.66666 11.3334 6.15905 11.3334 7.99999Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ExternalLinkSmIcon: FC = () => (
  <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M13.6522 2.34521L9.95272 6.03454M13.6522 2.34521C13.3229 2.01553 11.1045 2.04626 10.6355 2.05293M13.6522 2.34521C13.9815 2.67488 13.9508 4.89572 13.9442 5.36523" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.39903 2.00186C4.96644 2.00624 3.6926 2.06596 2.87853 2.88002C2 3.75852 2 5.17245 2 8.00028C2 10.8282 2 12.2421 2.87853 13.1206C3.75705 13.9991 5.17102 13.9991 7.99898 13.9991C10.8269 13.9991 12.2409 13.9991 13.1194 13.1206C13.9334 12.3066 13.9932 11.0327 13.9976 8.60021" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CloseXIcon: FC = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M12.667 3.33325L3.33362 12.6666M3.33362 3.33325L12.667 12.6666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Avatar chip ───────────────────────────────────────────────────────────────

const UserAvatar: FC<{ initials: string; large?: boolean }> = ({ initials, large }) => (
  <span className={`header-avatar${large ? ' header-avatar--large' : ''}`} aria-hidden="true">
    {initials}
  </span>
);

// ── Notification bell ─────────────────────────────────────────────────────────

interface NotificationBellProps {
  count?: number;
  onClick?: () => void;
}

const NotificationBell: FC<NotificationBellProps> = ({ count, onClick }) => (
  <button
    type="button"
    className="header-icon-btn"
    onClick={onClick}
    aria-label={`Notifications${count ? `, ${count} unread` : ''}`}
  >
    <span className="header-icon-btn__bell-wrap">
      <BellIcon />
      {count != null && count > 0 && (
        <span className="header-icon-btn__badge" aria-hidden="true">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </span>
  </button>
);

// ── Help dropdown ─────────────────────────────────────────────────────────────

const HELP_ITEMS = [
  { label: 'Get help on this page', href: '#' },
  { label: 'Search the Documentations', href: '#', external: true },
  { label: "Find what's new", href: '#', external: true },
];

const HelpMenu: FC = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div className="header-help" ref={ref}>
      <button
        type="button"
        className="header-icon-btn header-icon-btn--label"
        onClick={() => setOpen(v => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <QuestionCircleIcon />
        <span>Help</span>
      </button>
      {open && (
        <div className="header-help__dropdown" role="menu">
          {HELP_ITEMS.map(item => (
            <a
              key={item.label}
              href={item.href}
              className="header-help__item"
              role="menuitem"
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
            >
              {item.label}
              {item.external && <ExternalLinkSmIcon />}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Chevron for accordion ─────────────────────────────────────────────────────

const ChevronIcon: FC<{ open: boolean }> = ({ open }) => (
  <svg
    width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"
    style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 150ms' }}
  >
    <path d="M3 9L7 5L11 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── User menu ─────────────────────────────────────────────────────────────────

interface UserMenuProps {
  name: string;
  initials: string;
}

const UserMenu: FC<UserMenuProps> = ({ name, initials }) => {
  const { mode, setMode } = useThemeMode();
  const isDark = mode === 'dark';
  const [open, setOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div className="header-user" ref={ref}>
      <button
        type="button"
        className="header-user__trigger"
        onClick={() => setOpen(v => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`User menu — ${name}`}
      >
        <UserAvatar initials={initials} />
        <span className="header-user__name">{name}</span>
      </button>

      {open && (
        <div className="header-user__dropdown" role="menu" aria-label="User menu">

          {/* ── Profile row ── */}
          <div className="header-user__profile">
            <UserAvatar initials={initials} large />
            <div className="header-user__profile-info">
              <span className="header-user__full-name">{name}</span>
              <a href="#" className="header-user__profile-link">
                Manage your profile
                <ExternalLinkSmIcon />
              </a>
            </div>
            <button
              type="button"
              className="header-user__close"
              onClick={() => setOpen(false)}
              aria-label="Close user menu"
            >
              <CloseXIcon />
            </button>
          </div>

          <div className="header-user__divider" />

          {/* ── Sign-in info accordion ── */}
          <div className="header-user__section">
            <button
              type="button"
              className="header-user__row header-user__row--action header-user__row--accordion"
              onClick={() => setSignInOpen(v => !v)}
              aria-expanded={signInOpen}
            >
              <span>Sign-in info</span>
              <ChevronIcon open={signInOpen} />
            </button>
            {signInOpen && (
              <div className="header-user__signin-details">
                <div className="header-user__signin-row">
                  <span>Last sign-in:</span><span>02/14/2018 8:34 AM</span>
                </div>
                <div className="header-user__signin-row">
                  <span>Signed in from:</span><span>18.220.51.23</span>
                </div>
                <div className="header-user__signin-row">
                  <span>Failed sign-in attempts:</span><span>1</span>
                </div>
                <div className="header-user__signin-row">
                  <span>Last failed sign-in:</span><span>02/10/2018 17:20 PM</span>
                </div>
                <div className="header-user__signin-row">
                  <span>Failed to sign in from:</span><span>18.220.51.23</span>
                </div>
              </div>
            )}
          </div>

          <div className="header-user__divider" />

          {/* ── Settings section ── */}
          <div className="header-user__section">
            <button type="button" className="header-user__row header-user__row--action">
              Reload rights
            </button>
            <div className="header-user__row">
              <span>AI/ML and data usage</span>
              <span className="header-user__value">Enabled</span>
            </div>
            <div className="header-user__row header-user__row--theme">
              <div className="header-user__theme-label-wrap">
                <span>Theme</span>
                <span className="header-user__theme-subtitle">Dark mode is only available on certain pages.</span>
              </div>
              <button
                type="button"
                className={`header-user__theme-toggle${isDark ? ' header-user__theme-toggle--dark' : ''}`}
                onClick={() => setMode(isDark ? 'light' : 'dark')}
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                aria-pressed={isDark}
              >
                <span className="header-user__theme-track">
                  <span className="header-user__theme-thumb">
                    {isDark ? <MoonIcon /> : <SunIcon />}
                  </span>
                </span>
              </button>
            </div>
            <button type="button" className="header-user__row header-user__row--action">About</button>
          </div>

          <div className="header-user__divider" />

          <div className="header-user__section">
            <button type="button" className="header-user__row header-user__row--action header-user__row--signout">
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Header ────────────────────────────────────────────────────────────────────

export interface HeaderProps {
  title: string;
  userName?: string;
  userInitials?: string;
  notificationCount?: number;
  onAIClick?: () => void;
  onNotificationsClick?: () => void;
  reviewButton?: ReactNode;
}

export const Header: FC<HeaderProps> = ({
  title,
  userName = 'Alex Smith',
  userInitials = 'AS',
  notificationCount = 1,
  onAIClick,
  onNotificationsClick,
  reviewButton,
}) => (
  <header className="header">
    <h1 className="header__title">{title}</h1>

    <div className="header__actions">
      {reviewButton}
      <button
        type="button"
        className="header-icon-btn header-icon-btn--ai"
        onClick={onAIClick}
        aria-label="AI suggestions"
      >
        <AISparkleIcon size={20} />
      </button>

      <NotificationBell count={notificationCount} onClick={onNotificationsClick} />

      <HelpMenu />

      <span className="header__divider" aria-hidden="true" />

      <UserMenu name={userName} initials={userInitials} />
    </div>
  </header>
);
