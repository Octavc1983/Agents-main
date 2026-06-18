import React, { useState, useEffect, useRef } from 'react';
import { VerticalTabs } from '../../design-system/components/VerticalTabs';
import { Button } from '../../components/ui/Button/Button';
import { LoadingState } from '../../components/ui/LoadingState/LoadingState';
import {
  SettingsIcon,
  SecurityIcon,
  CheckCircleIcon,
  CloseIcon,
  ErrorCircleIcon,
} from '../../assets/icons/NavIcons';
import { mockAccountUser, mockAccountOrganization } from '../../mock/accountMockData';
import type { AccountUser, AccountOrganization, AccountSettingsTab } from '../../types/prototype.types';
import './AccountSettingsPage.scss';

// ─── State control (change to 'loading' | 'success' | 'error' to preview states) ───
const PAGE_STATE: 'default' | 'loading' = 'default';

// ─── Inline sub-components ────────────────────────────────────────────────────

interface TextInputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  endAdornment?: React.ReactNode;
}

const TextInput: React.FC<TextInputProps> = ({
  label, value, onChange, type = 'text', error, disabled, placeholder, endAdornment,
}) => (
  <div className={`acc-input ${error ? 'acc-input--error' : ''} ${disabled ? 'acc-input--disabled' : ''}`}>
    <label className="acc-input__label">{label}</label>
    <div className="acc-input__wrapper">
      <input
        className="acc-input__field"
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        aria-invalid={!!error}
      />
      {endAdornment && <span className="acc-input__adornment">{endAdornment}</span>}
    </div>
    {error && (
      <span className="acc-input__error">
        <ErrorCircleIcon size={12} /> {error}
      </span>
    )}
  </div>
);

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, label, description, disabled }) => (
  <div className="acc-toggle">
    <div className="acc-toggle__text">
      <span className="acc-toggle__label">{label}</span>
      {description && <span className="acc-toggle__desc">{description}</span>}
    </div>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      className={`acc-toggle__track ${checked ? 'acc-toggle__track--on' : ''} ${disabled ? 'acc-toggle__track--disabled' : ''}`}
      onClick={() => !disabled && onChange(!checked)}
    >
      <span className="acc-toggle__thumb" />
    </button>
  </div>
);

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => (
  <div className={`acc-toast acc-toast--${type}`} role="alert">
    <span className="acc-toast__icon">
      {type === 'success' ? <CheckCircleIcon size={16} /> : <ErrorCircleIcon size={16} />}
    </span>
    <span className="acc-toast__message">{message}</span>
    <button className="acc-toast__close" onClick={onClose} aria-label="Dismiss">
      <CloseIcon size={14} />
    </button>
  </div>
);

interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="acc-modal-overlay" onClick={onClose}>
      <div className="acc-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal aria-label={title}>
        <div className="acc-modal__header">
          <h3 className="acc-modal__title">{title}</h3>
          <button className="acc-modal__close" onClick={onClose} aria-label="Close modal">
            <CloseIcon size={16} />
          </button>
        </div>
        <div className="acc-modal__body">{children}</div>
      </div>
    </div>
  );
};

const SkeletonRow: React.FC<{ width?: string }> = ({ width = '100%' }) => (
  <div className="acc-skeleton" style={{ width }} />
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'profile', label: 'Profile', subtitle: 'Personal information' },
  { id: 'security', label: 'Security', subtitle: 'Password & 2FA' },
  { id: 'organization', label: 'Organization', subtitle: 'Company details' },
];

export const AccountSettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AccountSettingsTab>('profile');
  const [isLoading, setIsLoading] = useState(PAGE_STATE === 'loading');

  // Profile form state
  const [user, setUser] = useState<AccountUser>(mockAccountUser);
  const [profileErrors, setProfileErrors] = useState<Partial<Record<keyof AccountUser, string>>>({});

  // Organization form state
  const [org, setOrg] = useState<AccountOrganization>(mockAccountOrganization);
  const isAdmin = user.role === 'Workspace Admin';

  // Dirty tracking
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Change Password modal
  const [pwModalOpen, setPwModalOpen] = useState(false);
  const [pwFields, setPwFields] = useState({ current: '', next: '', confirm: '' });
  const [pwShow, setPwShow] = useState({ current: false, next: false, confirm: false });
  const [pwErrors, setPwErrors] = useState<Partial<typeof pwFields>>({});
  const [pwSaving, setPwSaving] = useState(false);

  // Avatar
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulate initial data fetch
  useEffect(() => {
    if (PAGE_STATE === 'loading') {
      const t = setTimeout(() => setIsLoading(false), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      if (toastTimer.current) clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setToast(null), 4000);
    }
    return () => { if (toastTimer.current) clearTimeout(toastTimer.current); };
  }, [toast]);

  const markDirty = () => setIsDirty(true);

  const updateUser = (field: keyof AccountUser, value: string | boolean) => {
    setUser(prev => ({ ...prev, [field]: value }));
    setProfileErrors(prev => ({ ...prev, [field]: undefined }));
    markDirty();
  };

  const updateOrgAddress = (field: keyof AccountOrganization['address'], value: string) => {
    setOrg(prev => ({ ...prev, address: { ...prev.address, [field]: value } }));
    markDirty();
  };

  // Email format validation
  const validateProfile = (): boolean => {
    const errors: typeof profileErrors = {};
    if (!user.firstName.trim()) errors.firstName = 'First name is required';
    if (!user.lastName.trim()) errors.lastName = 'Last name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) errors.email = 'Enter a valid email address';
    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (activeTab === 'profile' && !validateProfile()) return;
    setIsSaving(true);
    // Simulate API call
    await new Promise(res => setTimeout(res, 1200));
    setIsSaving(false);
    setIsDirty(false);
    setToast({ message: 'Account settings updated successfully.', type: 'success' });
  };

  const handleCancel = () => {
    setUser(mockAccountUser);
    setOrg(mockAccountOrganization);
    setProfileErrors({});
    setIsDirty(false);
  };

  const validatePassword = (): boolean => {
    const errors: typeof pwErrors = {};
    if (!pwFields.current) errors.current = 'Current password is required';
    if (pwFields.next.length < 8) errors.next = 'Password must be at least 8 characters';
    if (pwFields.next !== pwFields.confirm) errors.confirm = 'Passwords do not match';
    setPwErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordSave = async () => {
    if (!validatePassword()) return;
    setPwSaving(true);
    await new Promise(res => setTimeout(res, 1000));
    setPwSaving(false);
    setPwModalOpen(false);
    setPwFields({ current: '', next: '', confirm: '' });
    setPwErrors({});
    setToast({ message: 'Password changed successfully.', type: 'success' });
  };

  const togglePwShow = (field: keyof typeof pwShow) =>
    setPwShow(prev => ({ ...prev, [field]: !prev[field] }));

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUser(prev => ({ ...prev, avatarUrl: url }));
    markDirty();
  };

  const EyeIcon: React.FC<{ visible: boolean; onClick: () => void }> = ({ visible, onClick }) => (
    <button type="button" className="acc-eye-btn" onClick={onClick} aria-label={visible ? 'Hide password' : 'Show password'}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {visible ? (
          <>
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
            <line x1="1" y1="1" x2="23" y2="23" />
          </>
        ) : (
          <>
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </>
        )}
      </svg>
    </button>
  );

  const LockBadge = () => (
    <span className="acc-lock-badge" title="Editing restricted to Workspace Admins">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
      Admin only
    </span>
  );

  // ── Panels ──────────────────────────────────────────────────────────────────

  const renderProfilePanel = () => (
    <div className="acc-panel">
      <div className="acc-section">
        <h2 className="acc-section__title">
          <SettingsIcon size={18} /> Profile Information
        </h2>

        {/* Avatar */}
        <div className="acc-avatar-row">
          <div
            className="acc-avatar"
            onClick={handleAvatarClick}
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
              e.preventDefault();
              const file = e.dataTransfer.files?.[0];
              if (file?.type.startsWith('image/')) {
                setUser(prev => ({ ...prev, avatarUrl: URL.createObjectURL(file) }));
                markDirty();
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Upload profile picture"
            onKeyDown={e => e.key === 'Enter' && handleAvatarClick()}
          >
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt="Profile" className="acc-avatar__img" />
            ) : (
              <span className="acc-avatar__initials">
                {user.firstName[0]}{user.lastName[0]}
              </span>
            )}
            <div className="acc-avatar__overlay">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Upload
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="acc-avatar__file-input"
            onChange={handleFileChange}
            aria-hidden
          />
          <div className="acc-avatar-row__info">
            <p className="acc-avatar-row__name">{user.firstName} {user.lastName}</p>
            <p className="acc-avatar-row__role">{user.role}</p>
            <p className="acc-avatar-row__hint">Click or drag & drop to upload. JPG, PNG, GIF up to 5 MB.</p>
          </div>
        </div>

        <div className="acc-form-grid">
          <TextInput
            label="First Name"
            value={user.firstName}
            onChange={v => updateUser('firstName', v)}
            error={profileErrors.firstName}
            placeholder="John"
          />
          <TextInput
            label="Last Name"
            value={user.lastName}
            onChange={v => updateUser('lastName', v)}
            error={profileErrors.lastName}
            placeholder="Doe"
          />
          <TextInput
            label="Email Address"
            value={user.email}
            onChange={v => updateUser('email', v)}
            type="email"
            error={profileErrors.email}
            placeholder="john.doe@company.com"
          />
          <TextInput
            label="Phone Number"
            value={user.phone}
            onChange={v => updateUser('phone', v)}
            placeholder="+1 555 123 4567"
          />
        </div>
      </div>
    </div>
  );

  const renderSecurityPanel = () => (
    <div className="acc-panel">
      <div className="acc-section">
        <h2 className="acc-section__title">
          <SecurityIcon size={18} /> Security
        </h2>

        <div className="acc-security-row">
          <div className="acc-security-row__text">
            <span className="acc-security-row__label">Password</span>
            <span className="acc-security-row__desc">Last changed more than 90 days ago</span>
          </div>
          <Button variant="secondary" size="sm" onClick={() => setPwModalOpen(true)}>
            Change Password
          </Button>
        </div>

        <div className="acc-divider" />

        <ToggleSwitch
          label="Two-Factor Authentication (2FA)"
          description="Add an extra layer of security to your account by requiring a verification code on sign-in."
          checked={user.is2faEnabled}
          onChange={v => { updateUser('is2faEnabled', v); markDirty(); }}
        />
      </div>
    </div>
  );

  const renderOrganizationPanel = () => (
    <div className="acc-panel">
      <div className="acc-section">
        <h2 className="acc-section__title">
          Organization Details
          {!isAdmin && <LockBadge />}
        </h2>
        {!isAdmin && (
          <p className="acc-section__notice">
            Contact your workspace administrator to edit organization details.
          </p>
        )}

        <div className="acc-form-grid">
          <TextInput
            label="Company Name"
            value={org.name}
            onChange={v => { setOrg(p => ({ ...p, name: v })); markDirty(); }}
            disabled={!isAdmin}
            placeholder="Acme Corp"
          />
          <TextInput
            label="Tax ID / VAT Number"
            value={org.taxId}
            onChange={v => { setOrg(p => ({ ...p, taxId: v })); markDirty(); }}
            disabled={!isAdmin}
            placeholder="US123456789"
          />
        </div>

        <p className="acc-subsection-label">Corporate Address</p>
        <div className="acc-form-grid acc-form-grid--full">
          <TextInput
            label="Street Address"
            value={org.address.street}
            onChange={v => updateOrgAddress('street', v)}
            disabled={!isAdmin}
            placeholder="123 Main Street"
          />
        </div>
        <div className="acc-form-grid">
          <TextInput
            label="City"
            value={org.address.city}
            onChange={v => updateOrgAddress('city', v)}
            disabled={!isAdmin}
            placeholder="San Francisco"
          />
          <TextInput
            label="State / Region"
            value={org.address.state}
            onChange={v => updateOrgAddress('state', v)}
            disabled={!isAdmin}
            placeholder="CA"
          />
          <TextInput
            label="Postal Code"
            value={org.address.postalCode}
            onChange={v => updateOrgAddress('postalCode', v)}
            disabled={!isAdmin}
            placeholder="94105"
          />
          <TextInput
            label="Country"
            value={org.address.country}
            onChange={v => updateOrgAddress('country', v)}
            disabled={!isAdmin}
            placeholder="United States"
          />
        </div>
      </div>
    </div>
  );

  const renderSkeleton = () => (
    <div className="acc-panel acc-panel--skeleton">
      <div className="acc-section">
        <SkeletonRow width="160px" />
        <div className="acc-avatar-row">
          <div className="acc-skeleton acc-skeleton--circle" />
          <div className="acc-skeleton-stack">
            <SkeletonRow width="140px" />
            <SkeletonRow width="100px" />
          </div>
        </div>
        <div className="acc-form-grid">
          {[1,2,3,4].map(i => (
            <div key={i}>
              <SkeletonRow width="80px" />
              <SkeletonRow />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="account-settings">
      <div className="account-settings__header">
        <h1 className="account-settings__title">Account Settings</h1>
      </div>

      <div className="account-settings__body">
        <aside className="account-settings__nav">
          <VerticalTabs
            items={TABS}
            activeId={activeTab}
            onChange={id => setActiveTab(id as AccountSettingsTab)}
          />
        </aside>

        <main className="account-settings__content">
          {isLoading ? (
            renderSkeleton()
          ) : (
            <>
              {activeTab === 'profile' && renderProfilePanel()}
              {activeTab === 'security' && renderSecurityPanel()}
              {activeTab === 'organization' && renderOrganizationPanel()}
            </>
          )}
        </main>
      </div>

      {/* Sticky footer */}
      {!isLoading && (
        <footer className="account-settings__footer">
          <Button variant="secondary" size="md" onClick={handleCancel} disabled={!isDirty}>
            Cancel
          </Button>
          <Button variant="primary" size="md" onClick={handleSave} disabled={!isDirty} isLoading={isSaving}>
            {isSaving ? 'Saving…' : 'Save Changes'}
          </Button>
        </footer>
      )}

      {/* Change Password Modal */}
      <Modal isOpen={pwModalOpen} title="Change Password" onClose={() => { setPwModalOpen(false); setPwErrors({}); }}>
        <div className="acc-pw-modal-fields">
          <TextInput
            label="Current Password"
            type={pwShow.current ? 'text' : 'password'}
            value={pwFields.current}
            onChange={v => { setPwFields(p => ({ ...p, current: v })); setPwErrors(p => ({ ...p, current: undefined })); }}
            error={pwErrors.current}
            endAdornment={<EyeIcon visible={pwShow.current} onClick={() => togglePwShow('current')} />}
          />
          <TextInput
            label="New Password"
            type={pwShow.next ? 'text' : 'password'}
            value={pwFields.next}
            onChange={v => { setPwFields(p => ({ ...p, next: v })); setPwErrors(p => ({ ...p, next: undefined })); }}
            error={pwErrors.next}
            endAdornment={<EyeIcon visible={pwShow.next} onClick={() => togglePwShow('next')} />}
          />
          <TextInput
            label="Confirm New Password"
            type={pwShow.confirm ? 'text' : 'password'}
            value={pwFields.confirm}
            onChange={v => { setPwFields(p => ({ ...p, confirm: v })); setPwErrors(p => ({ ...p, confirm: undefined })); }}
            error={pwErrors.confirm}
            endAdornment={<EyeIcon visible={pwShow.confirm} onClick={() => togglePwShow('confirm')} />}
          />
        </div>
        <div className="acc-pw-modal-actions">
          <Button variant="secondary" size="md" onClick={() => { setPwModalOpen(false); setPwErrors({}); }}>
            Cancel
          </Button>
          <Button variant="primary" size="md" onClick={handlePasswordSave} isLoading={pwSaving}>
            {pwSaving ? 'Saving…' : 'Update Password'}
          </Button>
        </div>
      </Modal>

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};
