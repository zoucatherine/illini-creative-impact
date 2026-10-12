import React from 'react';
import { projects } from '../content/projects';
import { site } from '../content/site';

type Status = 'idle' | 'submitting' | 'success' | 'error';
type Errors = Record<string, string>;

/** Posts JSON to a form endpoint (e.g. Formspree). */
async function submitJson(endpoint: string, payload: Record<string, unknown>) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Form endpoint responded with ${response.status}`);
  }
}

function focusFirstError(form: HTMLFormElement, errors: Errors) {
  const first = Object.keys(errors)[0];
  if (!first) return;
  const field = form.querySelector<HTMLElement>(`[name="${first}"]`);
  field?.focus();
}

const inputClass =
  'mt-2 block w-full rounded-xl border-0 bg-white px-4 py-3 text-base text-primaryNavy ring-1 ring-inset ring-primaryNavy/20 placeholder:text-slate-400 focus:ring-2 focus:ring-illiniOrange focus:outline-none aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-600';

function Field({
  name,
  label,
  hint,
  error,
  required,
  children,
}: {
  name: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: (props: {
    id: string;
    name: string;
    'aria-invalid': boolean;
    'aria-describedby'?: string;
    required?: boolean;
  }) => React.ReactNode;
}) {
  const id = `field-${name}`;
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;
  return (
    <div>
      <label htmlFor={id} className="block font-semibold text-primaryNavy">
        {label}
        {required ? (
          <span className="text-orangeInk" aria-hidden="true">
            {' '}
            *
          </span>
        ) : (
          <span className="font-normal text-slate-500"> (optional)</span>
        )}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-slate-600">
          {hint}
        </p>
      )}
      {children({ id, name, 'aria-invalid': Boolean(error), 'aria-describedby': describedBy, required })}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm font-semibold text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

function CheckboxGroup({
  name,
  legend,
  hint,
  options,
  defaultChecked = [],
  error,
  required,
}: {
  name: string;
  legend: string;
  hint?: string;
  options: Array<{ value: string; label: string; description?: string }>;
  defaultChecked?: string[];
  error?: string;
  required?: boolean;
}) {
  const id = `field-${name}`;
  return (
    <fieldset aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}>
      <legend className="font-semibold text-primaryNavy">
        {legend}
        {required ? (
          <span className="text-orangeInk" aria-hidden="true">
            {' '}
            *
          </span>
        ) : (
          <span className="font-normal text-slate-500"> (optional)</span>
        )}
      </legend>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-slate-600">
          {hint}
        </p>
      )}
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-start gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-inset ring-primaryNavy/15 has-[:checked]:ring-2 has-[:checked]:ring-illiniOrange"
          >
            <input
              type="checkbox"
              name={name}
              value={option.value}
              defaultChecked={defaultChecked.includes(option.value)}
              className="mt-1 h-4 w-4 accent-[#E87722]"
            />
            <span>
              <span className="block font-semibold text-primaryNavy">{option.label}</span>
              {option.description && <span className="block text-sm text-slate-600">{option.description}</span>}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm font-semibold text-red-700">
          {error}
        </p>
      )}
    </fieldset>
  );
}

function FormStatus({
  status,
  configured,
  notConfiguredMessage,
  errorMessage,
}: {
  status: Status;
  configured: boolean;
  notConfiguredMessage: React.ReactNode;
  errorMessage: React.ReactNode;
}) {
  return (
    <div role="status" aria-live="polite">
      {!configured && (
        <p className="rounded-xl bg-primaryNavy/5 px-4 py-3 text-sm leading-6 text-primaryNavy">
          {notConfiguredMessage}
        </p>
      )}
      {status === 'error' && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm leading-6 text-red-800">{errorMessage}</p>
      )}
    </div>
  );
}

function SubmitButton({ status, configured, children }: { status: Status; configured: boolean; children: string }) {
  return (
    <button
      type="submit"
      disabled={!configured || status === 'submitting'}
      className="inline-flex items-center justify-center rounded-full bg-illiniOrange px-7 py-3.5 font-bold text-primaryNavy transition-colors hover:bg-[#f08a3c] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {status === 'submitting' ? 'Sending…' : children}
    </button>
  );
}

function SuccessMessage({ title, children }: { title: string; children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => ref.current?.focus(), []);
  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="status"
      className="rounded-2xl bg-white p-8 ring-1 ring-emerald-700/20 focus:outline-none"
    >
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-800">Received</p>
      <h3 className="mt-2 font-editorial text-3xl font-bold text-primaryNavy">{title}</h3>
      <div className="mt-3 leading-7 text-slate-600">{children}</div>
    </div>
  );
}

const honeypot = (
  // Spam trap: hidden from people, filled in by bots. Formspree ignores submissions that include it.
  <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
);

// ---------------------------------------------------------------------------
// Membership interest form
// ---------------------------------------------------------------------------

const involvementOptions = [
  { value: 'projects', label: 'Project teams', description: 'Marketing, design, outreach, strategy, partnerships' },
  { value: 'events', label: 'Event planning', description: 'Exhibitions, the art contest, socials' },
  { value: 'initiative', label: 'Proposing an initiative', description: 'You have an idea to bring to life' },
  { value: 'general', label: 'General involvement', description: 'Not sure yet — show me around' },
];

const skillOptions = [
  'Marketing',
  'Design',
  'Outreach',
  'Strategy',
  'Project management',
  'Community partnerships',
  'Art',
  'Writing',
  'Photo & video',
].map((value) => ({ value, label: value }));

export function JoinForm({ initialInterest, initialProject }: { initialInterest?: string; initialProject?: string }) {
  const endpoint = site.forms.joinEndpoint;
  const configured = Boolean(endpoint);
  const [status, setStatus] = React.useState<Status>('idle');
  const [errors, setErrors] = React.useState<Errors>({});
  const [proposing, setProposing] = React.useState(initialInterest === 'initiative');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const involvement = data.getAll('involvement').map(String);

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = 'Please enter your name.';
    if (!email) nextErrors.email = 'Please enter your Illinois email.';
    else if (!/^[^\s@]+@illinois\.edu$/i.test(email)) nextErrors.email = 'Use your @illinois.edu email address.';
    if (involvement.length === 0) nextErrors.involvement = 'Pick at least one — you can change your mind later.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      focusFirstError(form, nextErrors);
      return;
    }
    if (!endpoint || data.get('_gotcha')) return;

    setStatus('submitting');
    try {
      await submitJson(endpoint, {
        form: 'Membership interest',
        name,
        email,
        majorYear: String(data.get('majorYear') ?? '').trim(),
        involvement,
        skills: data.getAll('skills').map(String),
        projects: data.getAll('projects').map(String),
        message: String(data.get('message') ?? '').trim(),
      });
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <SuccessMessage title="Thanks — you’re on our list.">
        <p>
          We’ll reach out to your Illinois email with next steps. In the meantime, the fastest way to meet everyone is
          our{' '}
          <a href={site.social.discord} target="_blank" rel="noopener noreferrer" className="font-bold text-orangeInk underline">
            Discord
          </a>
          .
        </p>
      </SuccessMessage>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-8">
      {honeypot}
      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="name" label="Name" required error={errors.name}>
          {(props) => <input {...props} type="text" autoComplete="name" className={inputClass} />}
        </Field>
        <Field name="email" label="Illinois email" required error={errors.email}>
          {(props) => (
            <input
              {...props}
              type="email"
              autoComplete="email"
              placeholder="netid@illinois.edu"
              className={inputClass}
            />
          )}
        </Field>
      </div>
      <Field name="majorYear" label="Major / year" hint="Every major is welcome — this just helps us introduce you to people.">
        {(props) => <input {...props} type="text" placeholder="e.g. Marketing, sophomore" className={inputClass} />}
      </Field>

      <div
        onChange={(event) => {
          const target = event.target as HTMLInputElement;
          if (target.name === 'involvement' && target.value === 'initiative') setProposing(target.checked);
        }}
      >
        <CheckboxGroup
          name="involvement"
          legend="How would you like to get involved?"
          hint="Choose as many as you like."
          options={involvementOptions}
          defaultChecked={initialInterest ? [initialInterest] : []}
          error={errors.involvement}
          required
        />
      </div>

      <CheckboxGroup name="skills" legend="Areas you’re interested in" options={skillOptions} />

      <CheckboxGroup
        name="projects"
        legend="Projects you’d like to hear about"
        options={projects.map((project) => ({ value: project.slug, label: project.title }))}
        defaultChecked={initialProject ? [initialProject] : []}
      />

      <Field
        name="message"
        label={proposing ? 'Tell us about your idea' : 'Anything else?'}
        hint={proposing ? 'A cause, a partner, an event — a few sentences is plenty.' : undefined}
      >
        {(props) => <textarea {...props} rows={proposing ? 6 : 4} className={inputClass} />}
      </Field>

      <FormStatus
        status={status}
        configured={configured}
        notConfiguredMessage={
          <>
            Online sign-up isn’t connected yet. For now, the best way to get involved is to{' '}
            <a href={site.social.discord} target="_blank" rel="noopener noreferrer" className="font-bold underline">
              join our Discord
            </a>{' '}
            or message us on{' '}
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="font-bold underline">
              Instagram
            </a>
            .
          </>
        }
        errorMessage={
          <>
            Something went wrong and your form wasn’t sent. Please try again, or reach us on{' '}
            <a href={site.social.discord} target="_blank" rel="noopener noreferrer" className="font-bold underline">
              Discord
            </a>
            .
          </>
        }
      />
      <SubmitButton status={status} configured={configured}>
        Send my interest
      </SubmitButton>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Community partnership inquiry
// ---------------------------------------------------------------------------

const supportOptions = [
  { value: 'design', label: 'Design & promotional materials', description: 'Branding, posters, signage, flyers' },
  { value: 'outreach', label: 'Outreach & social media', description: 'Spreading the word about a program or need' },
  { value: 'events', label: 'Event planning & support', description: 'Organizing or helping run an event' },
  { value: 'strategy', label: 'Strategy & research', description: 'Thinking through a problem or plan' },
  { value: 'volunteers', label: 'Volunteer help', description: 'Students on site for a specific effort' },
  { value: 'other', label: 'Something else', description: 'Tell us below' },
];

export function PartnerForm() {
  const endpoint = site.forms.partnerEndpoint;
  const configured = Boolean(endpoint);
  const [status, setStatus] = React.useState<Status>('idle');
  const [errors, setErrors] = React.useState<Errors>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? '').trim();
    const support = data.getAll('support').map(String);

    const nextErrors: Errors = {};
    if (!value('organization')) nextErrors.organization = 'Please enter your organization’s name.';
    if (!value('contactName')) nextErrors.contactName = 'Please enter a contact name.';
    if (!value('email')) nextErrors.email = 'Please enter an email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value('email'))) nextErrors.email = 'Please enter a valid email address.';
    if (!value('need')) nextErrors.need = 'Tell us briefly about the project or need.';
    if (support.length === 0) nextErrors.support = 'Pick at least one type of support.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      focusFirstError(form, nextErrors);
      return;
    }
    if (!endpoint || data.get('_gotcha')) return;

    setStatus('submitting');
    try {
      await submitJson(endpoint, {
        form: 'Partnership inquiry',
        organization: value('organization'),
        contactName: value('contactName'),
        email: value('email'),
        phone: value('phone'),
        website: value('website'),
        need: value('need'),
        support,
        timeline: value('timeline'),
        details: value('details'),
      });
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <SuccessMessage title="Thank you for reaching out.">
        <p>
          Our external relations team will read your note and follow up by email. We’ll be honest about what students
          can take on and when.
        </p>
      </SuccessMessage>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-8">
      {honeypot}
      <Field name="organization" label="Organization name" required error={errors.organization}>
        {(props) => <input {...props} type="text" autoComplete="organization" className={inputClass} />}
      </Field>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="contactName" label="Your name" required error={errors.contactName}>
          {(props) => <input {...props} type="text" autoComplete="name" className={inputClass} />}
        </Field>
        <Field name="email" label="Email" required error={errors.email}>
          {(props) => <input {...props} type="email" autoComplete="email" className={inputClass} />}
        </Field>
        <Field name="phone" label="Phone">
          {(props) => <input {...props} type="tel" autoComplete="tel" className={inputClass} />}
        </Field>
        <Field name="website" label="Website">
          {(props) => <input {...props} type="url" autoComplete="url" placeholder="https://" className={inputClass} />}
        </Field>
      </div>
      <Field
        name="need"
        label="What’s the project or community need?"
        hint="What are you trying to do, and who does it serve?"
        required
        error={errors.need}
      >
        {(props) => <textarea {...props} rows={4} className={inputClass} />}
      </Field>
      <CheckboxGroup
        name="support"
        legend="What kind of support are you looking for?"
        options={supportOptions}
        error={errors.support}
        required
      />
      <Field name="timeline" label="Timeline" hint="Any dates or deadlines we should know about.">
        {(props) => <input {...props} type="text" className={inputClass} />}
      </Field>
      <Field name="details" label="Additional details">
        {(props) => <textarea {...props} rows={4} className={inputClass} />}
      </Field>

      <FormStatus
        status={status}
        configured={configured}
        notConfiguredMessage={
          <>
            Online inquiries aren’t connected yet. In the meantime, please email our{' '}
            <a href="/about#officers" className="font-bold underline">
              VP External team
            </a>{' '}
            directly.
          </>
        }
        errorMessage={
          <>
            Something went wrong and your inquiry wasn’t sent. Please try again, or email our{' '}
            <a href="/about#officers" className="font-bold underline">
              VP External team
            </a>
            .
          </>
        }
      />
      <SubmitButton status={status} configured={configured}>
        Send inquiry
      </SubmitButton>
    </form>
  );
}
