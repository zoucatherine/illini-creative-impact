import { eventStatusLabel, type ClubEvent } from '../content/events';
import { AccentTitle, ArrowLink, StatusBadge } from './ui';

function formatDate(iso: string) {
  const date = new Date(iso);
  return {
    month: date.toLocaleDateString('en-US', { month: 'short', timeZone: 'America/Chicago' }).toUpperCase(),
    day: date.toLocaleDateString('en-US', { day: 'numeric', timeZone: 'America/Chicago' }),
    full: date.toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: iso.includes('T') ? 'short' : undefined,
      timeZone: 'America/Chicago',
    }),
  };
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-US', { timeStyle: 'short', timeZone: 'America/Chicago' });
}

const statusTone = {
  upcoming: 'live',
  'dates-tba': 'neutral',
  recurring: 'neutral',
  'in-development': 'muted',
  past: 'muted',
} as const;

/**
 * Event card. `tone="dark"` is used on navy sections.
 * Shows only confirmed details; missing dates and locations read "to be announced".
 */
export function EventCard({ event, tone = 'light' }: { event: ClubEvent; tone?: 'light' | 'dark' }) {
  const date = event.date ? formatDate(event.date) : null;
  const dark = tone === 'dark';

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-2xl ${
        dark ? 'bg-white/[0.06] ring-1 ring-white/10' : 'bg-white ring-1 ring-primaryNavy/10'
      }`}
    >
      {event.photo ? (
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={event.photo.src}
            alt={event.photo.alt}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: event.photo.position }}
            className={`h-full w-full object-cover ${event.status === 'past' ? 'grayscale-[35%]' : ''}`}
          />
          {date && (
            <div className="absolute left-4 top-4 rounded-lg bg-illiniOrange px-3 py-2 text-center text-primaryNavy shadow-lg">
              <p className="text-xs font-bold tracking-widest">{date.month}</p>
              <p className="text-2xl font-extrabold leading-none">{date.day}</p>
            </div>
          )}
        </div>
      ) : (
        <div
          className={`flex aspect-[16/9] items-end p-5 ${
            dark ? 'bg-gradient-to-br from-white/10 to-transparent' : 'placeholder-hatch'
          }`}
          aria-hidden="true"
        >
          <span
            className={`font-editorial text-3xl font-bold italic leading-tight ${
              dark ? 'text-white/40' : 'text-primaryNavy/25'
            }`}
          >
            {event.title}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge label={eventStatusLabel[event.status]} tone={statusTone[event.status]} onDark={dark} />
          {event.flagship && (
            <span className={`text-xs font-bold uppercase tracking-[0.16em] ${dark ? 'text-illiniOrange' : 'text-orangeInk'}`}>
              Flagship
            </span>
          )}
        </div>
        <h3 className={`mt-4 font-editorial text-2xl font-bold ${dark ? 'text-white' : 'text-primaryNavy'}`}>
          <AccentTitle text={event.title} accent={event.titleAccent} />
        </h3>
        <dl className={`mt-3 space-y-1 text-sm ${dark ? 'text-white/70' : 'text-slate-600'}`}>
          <div className="flex gap-2">
            <dt className="font-semibold">When</dt>
            <dd>
              {date ? (
                <>
                  <time dateTime={event.date}>{date.full}</time>
                  {event.endDate && (
                    <>
                      {' to '}
                      <time dateTime={event.endDate}>{formatTime(event.endDate)}</time>
                    </>
                  )}
                </>
              ) : (
                event.when ?? (event.status === 'past' ? 'Past event' : 'To be announced')
              )}
            </dd>
          </div>
          {(event.location || event.status !== 'past') && (
            <div className="flex gap-2">
              <dt className="font-semibold">Where</dt>
              <dd>{event.location ?? 'To be announced'}</dd>
            </div>
          )}
        </dl>
        <p className={`mt-4 flex-1 leading-7 ${dark ? 'text-white/80' : 'text-slate-600'}`}>{event.description}</p>
        {event.link && (
          <div className="mt-5">
            <ArrowLink href={event.link.href} tone={tone}>
              {event.link.label}
            </ArrowLink>
          </div>
        )}
      </div>
    </article>
  );
}
