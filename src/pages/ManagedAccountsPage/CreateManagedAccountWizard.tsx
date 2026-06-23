import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@idira/design-system';
import { WizardTemplate } from '../../prototype-templates/WizardTemplate';
import { accountService } from '../../local-backend/services/account.service';
import { localDatabaseStore } from '../../local-backend/state/localDatabase.store';
import type { ManagedAccountType, ManagedAccountPlatform } from '../../types/prototype.types';
import './CreateManagedAccountWizard.scss';

// ── Step definitions ──────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: 'Account type' },
  { id: 2, label: 'Platform' },
  { id: 3, label: 'Account details' },
  { id: 4, label: 'Access & ownership' },
  { id: 5, label: 'Review' },
] as const;

type StepId = typeof STEPS[number]['id'];

const ACCOUNT_TYPES: Array<{ value: ManagedAccountType; label: string; description: string }> = [
  { value: 'local', label: 'Local', description: 'A local account on a specific host' },
  { value: 'domain', label: 'Domain', description: 'A Windows domain account' },
  { value: 'service', label: 'Service', description: 'A service or application account' },
  { value: 'cloud', label: 'Cloud', description: 'A cloud provider identity (AWS, Azure, GCP)' },
];

const PLATFORMS: Array<{ value: ManagedAccountPlatform; label: string }> = [
  { value: 'Windows', label: 'Windows' },
  { value: 'Linux', label: 'Linux' },
  { value: 'AWS', label: 'AWS' },
  { value: 'Azure', label: 'Azure' },
  { value: 'GCP', label: 'GCP' },
  { value: 'Oracle', label: 'Oracle' },
  { value: 'SAP', label: 'SAP' },
];

// ── Wizard state ──────────────────────────────────────────────────────────────

interface WizardState {
  accountType: ManagedAccountType | '';
  platform: ManagedAccountPlatform | '';
  name: string;
  address: string;
  username: string;
  password: string;
  safe: string;
  owner: string;
  tags: string;
  description: string;
}

const INITIAL: WizardState = {
  accountType: '', platform: '', name: '', address: '',
  username: '', password: '', safe: '', owner: '', tags: '', description: '',
};

// ── Step components ───────────────────────────────────────────────────────────

const Step1: React.FC<{ value: WizardState['accountType']; onChange: (v: ManagedAccountType) => void }> = ({ value, onChange }) => (
  <div className="wizard-step">
    <h3 className="wizard-step__title">Select account type</h3>
    <div className="wizard-step__grid">
      {ACCOUNT_TYPES.map(t => (
        <button
          key={t.value}
          type="button"
          className={`wizard-type-card${value === t.value ? ' wizard-type-card--selected' : ''}`}
          onClick={() => onChange(t.value)}
          aria-pressed={value === t.value}
        >
          <span className="wizard-type-card__label">{t.label}</span>
          <span className="wizard-type-card__desc">{t.description}</span>
        </button>
      ))}
    </div>
  </div>
);

const Step2: React.FC<{ value: WizardState['platform']; onChange: (v: ManagedAccountPlatform) => void }> = ({ value, onChange }) => (
  <div className="wizard-step">
    <h3 className="wizard-step__title">Select platform</h3>
    <div className="wizard-step__grid wizard-step__grid--narrow">
      {PLATFORMS.map(p => (
        <button
          key={p.value}
          type="button"
          className={`wizard-platform-card${value === p.value ? ' wizard-platform-card--selected' : ''}`}
          onClick={() => onChange(p.value)}
          aria-pressed={value === p.value}
        >
          <span className="wizard-platform-card__abbr">{p.value.substring(0, 2).toUpperCase()}</span>
          <span className="wizard-platform-card__label">{p.label}</span>
        </button>
      ))}
    </div>
  </div>
);

const Step3: React.FC<{ state: WizardState; onChange: (k: keyof WizardState, v: string) => void }> = ({ state, onChange }) => (
  <div className="wizard-step">
    <h3 className="wizard-step__title">Account details</h3>
    <div className="wizard-step__form">
      <label className="wizard-field">
        <span className="wizard-field__label">Account name <span aria-hidden="true">*</span></span>
        <input className="wizard-field__input" type="text" value={state.name} onChange={e => onChange('name', e.target.value)} placeholder="e.g. svc_backup_prod" />
      </label>
      <label className="wizard-field">
        <span className="wizard-field__label">Address / hostname <span aria-hidden="true">*</span></span>
        <input className="wizard-field__input" type="text" value={state.address} onChange={e => onChange('address', e.target.value)} placeholder="e.g. 10.0.1.15 or server.corp.local" />
      </label>
      <label className="wizard-field">
        <span className="wizard-field__label">Username</span>
        <input className="wizard-field__input" type="text" value={state.username} onChange={e => onChange('username', e.target.value)} placeholder="e.g. admin" />
      </label>
      <label className="wizard-field">
        <span className="wizard-field__label">Initial password</span>
        <input className="wizard-field__input" type="password" value={state.password} onChange={e => onChange('password', e.target.value)} placeholder="Enter initial password" />
      </label>
      <label className="wizard-field wizard-field--full">
        <span className="wizard-field__label">Description</span>
        <textarea className="wizard-field__textarea" value={state.description} onChange={e => onChange('description', e.target.value)} rows={3} placeholder="Optional description" />
      </label>
    </div>
  </div>
);

const Step4: React.FC<{ state: WizardState; onChange: (k: keyof WizardState, v: string) => void }> = ({ state, onChange }) => (
  <div className="wizard-step">
    <h3 className="wizard-step__title">Access &amp; ownership</h3>
    <div className="wizard-step__form">
      <label className="wizard-field">
        <span className="wizard-field__label">Safe <span aria-hidden="true">*</span></span>
        <input className="wizard-field__input" type="text" value={state.safe} onChange={e => onChange('safe', e.target.value)} placeholder="e.g. Prod-ServiceAccounts" />
      </label>
      <label className="wizard-field">
        <span className="wizard-field__label">Owner</span>
        <input className="wizard-field__input" type="text" value={state.owner} onChange={e => onChange('owner', e.target.value)} placeholder="e.g. ops-team" />
      </label>
      <label className="wizard-field wizard-field--full">
        <span className="wizard-field__label">Tags</span>
        <input className="wizard-field__input" type="text" value={state.tags} onChange={e => onChange('tags', e.target.value)} placeholder="Comma-separated tags, e.g. production, backup" />
      </label>
    </div>
  </div>
);

const Step5: React.FC<{ state: WizardState }> = ({ state }) => (
  <div className="wizard-step">
    <h3 className="wizard-step__title">Review and create</h3>
    <div className="wizard-review">
      {([
        ['Type', state.accountType],
        ['Platform', state.platform],
        ['Name', state.name],
        ['Address', state.address],
        ['Username', state.username],
        ['Safe', state.safe],
        ['Owner', state.owner],
        ['Tags', state.tags],
        ['Description', state.description],
      ] as [string, string][]).filter(([, v]) => v).map(([label, value]) => (
        <div key={label} className="wizard-review__row">
          <span className="wizard-review__label">{label}</span>
          <span className="wizard-review__value">{value}</span>
        </div>
      ))}
    </div>
  </div>
);

// ── CreateManagedAccountWizard ────────────────────────────────────────────────

interface Props {
  onClose: () => void;
}

export const CreateManagedAccountWizard: React.FC<Props> = ({ onClose }) => {
  const [step, setStep] = useState<StepId>(1);
  const [state, setState] = useState<WizardState>(INITIAL);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);

  const set = (k: keyof WizardState, v: string) => setState(prev => ({ ...prev, [k]: v }));

  const isDirty = Object.values(state).some(v => v !== '');

  const handleBack = () => setStep(s => (s > 1 ? (s - 1) as StepId : s));

  const handleNext = () => {
    if (step < 5) {
      setStep(s => (s + 1) as StepId);
    } else {
      setSaving(true);
      const store = localDatabaseStore.get();
      const safeEntry = store.safes.find(
        (s) => s.name.toLowerCase() === state.safe.toLowerCase(),
      ) ?? store.safes[0];
      const ownerEntry = store.users.find(
        (u) => u.name.toLowerCase() === state.owner.toLowerCase(),
      ) ?? store.users[0];
      accountService.create(
        {
          name: state.name,
          accountType: state.accountType as string,
          platform: state.platform as string,
          address: state.address,
          status: 'pending',
          ownerId: ownerEntry.id,
          safeId: safeEntry.id,
          description: state.description || undefined,
          tagIds: [],
        },
        {
          requestId: `req-create-${state.name}`,
          idempotencyKey: `create-${state.name}-${state.address}`,
        },
      ).then(() => {
        setSaving(false);
        setSaved(true);
      }).catch(() => {
        setSaving(false);
      });
    }
  };

  const handleClose = () => {
    if (isDirty && !saved) {
      setConfirmCancel(true);
    } else {
      onClose();
    }
  };

  const canNext = (() => {
    if (step === 1) return !!state.accountType;
    if (step === 2) return !!state.platform;
    if (step === 3) return !!state.name && !!state.address;
    if (step === 4) return !!state.safe;
    return true;
  })();

  if (saved) {
    return ReactDOM.createPortal(
      <div className="wizard-tpl-backdrop" role="dialog" aria-modal="true" aria-label="Create managed account">
        <div className="wizard-tpl wizard-tpl--success">
          <div className="wizard-success">
            <svg className="wizard-success__icon" width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" />
              <path d="M14 24L21 31L34 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h2 className="wizard-success__title">Account created</h2>
            <p className="wizard-success__desc">
              <strong>{state.name}</strong> has been created successfully in <strong>{state.safe}</strong>.
            </p>
            <Button variant="main" size="md" onClick={onClose}>Done</Button>
          </div>
        </div>
      </div>,
      document.body,
    );
  }

  return (
    <>
      <WizardTemplate
        title="Create managed account"
        steps={STEPS}
        currentStep={step}
        onClose={handleClose}
        onBack={handleBack}
        onNext={handleNext}
        canNext={canNext}
        nextLabel="Create account"
        isSubmitting={saving}
      >
        {step === 1 && <Step1 value={state.accountType} onChange={v => set('accountType', v)} />}
        {step === 2 && <Step2 value={state.platform} onChange={v => set('platform', v)} />}
        {step === 3 && <Step3 state={state} onChange={set} />}
        {step === 4 && <Step4 state={state} onChange={set} />}
        {step === 5 && <Step5 state={state} />}
      </WizardTemplate>

      {confirmCancel && ReactDOM.createPortal(
        <div className="wizard-tpl-backdrop wizard-tpl-backdrop--above" role="dialog" aria-modal="true" aria-label="Confirm cancel">
          <div className="wizard-confirm">
            <h3 className="wizard-confirm__title">Discard changes?</h3>
            <p className="wizard-confirm__body">You have unsaved changes. If you leave now, your progress will be lost.</p>
            <div className="wizard-confirm__actions">
              <Button variant="secondary" size="sm" onClick={() => setConfirmCancel(false)}>
                Keep editing
              </Button>
              <Button variant="main" size="sm" onClick={onClose}>
                Discard and leave
              </Button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
};
