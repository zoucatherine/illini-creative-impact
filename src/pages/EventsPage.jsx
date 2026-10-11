import { useEffect, useState } from 'react';

const mockEvents = [
  {
    id: 'creative-lab',
    title: 'Creative Lab: Ideas in Motion',
    start: '2026-10-22T18:00:00-05:00',
    location: 'Campus Creative Studio',
    description: 'A hands-on evening for turning early ideas into visual concepts.',
  },
  {
    id: 'community-social',
    title: 'Fall Community Social',
    start: '2026-10-29T17:30:00-05:00',
    location: 'Illini Union',
    description: 'Meet fellow creators, share what you are working on, and find collaborators.',
  },
  {
    id: 'strategy-workshop',
    title: 'Brand & Strategy Workshop',
    start: '2026-11-05T18:00:00-06:00',
    location: 'Business Instructional Facility',
    description: 'Learn practical ways to connect a strong creative idea to a clear strategy.',
  },
];

function formatEventDate(start) {
  const date = new Date(start);
  return {
    month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    day: date.toLocaleDateString('en-US', { day: 'numeric' }),
    full: date.toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: start.includes('T') ? 'short' : undefined,
    }),
  };
}

function normalizeEvent(event) {
  const start = event.start?.dateTime ?? event.start?.date;
  const description = event.description?.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

  return {
    id: event.id,
    title: event.summary || 'Untitled event',
    start,
    location: event.location || 'Location to be announced',
    description: description || 'More details will be shared soon.',
  };
}

export default function EventsPage() {
  const hasCalendarConfig = Boolean(
    import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY &&
      import.meta.env.VITE_GOOGLE_CALENDAR_ID,
  );
  const [events, setEvents] = useState(mockEvents);
  const [isLoading, setIsLoading] = useState(hasCalendarConfig);
  const [usingMockEvents, setUsingMockEvents] = useState(!hasCalendarConfig);
  const calendarId = import.meta.env.VITE_GOOGLE_CALENDAR_ID;
  const calendarEmbedUrl = calendarId
    ? `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(calendarId)}&ctz=America%2FChicago`
    : null;
  const calendarSubscribeUrl = calendarId
    ? `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(calendarId)}`
    : null;

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY;
    const calendarId = import.meta.env.VITE_GOOGLE_CALENDAR_ID;

    if (!apiKey || !calendarId) {
      return;
    }

    const params = new URLSearchParams({
      key: apiKey,
      singleEvents: 'true',
      orderBy: 'startTime',
      maxResults: '12',
      timeMin: new Date().toISOString(),
    });

    fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params}`,
    )
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Google Calendar request failed with status ${response.status}.`);
        }
        return response.json();
      })
      .then((data) => {
        const fetchedEvents = (data.items ?? [])
          .filter((event) => event.start?.dateTime || event.start?.date)
          .map(normalizeEvent);

        setEvents(fetchedEvents.length > 0 ? fetchedEvents : mockEvents);
        setUsingMockEvents(fetchedEvents.length === 0);
      })
      .catch((error) => {
        console.error('Unable to load Google Calendar events.', error);
        setEvents(mockEvents);
        setUsingMockEvents(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section className="min-h-[calc(100svh-5rem)] bg-[#FDFBF7] px-6 py-24 text-[#131E38] sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-illiniOrange">
            Gather with us
          </p>
          <h1 className="font-editorial text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Make space for{' '}
            <span className="box-decoration-clone rounded-sm bg-[#E87722]/35 px-1.5 py-0.5 italic">
              inspiration.
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-700">
            Find workshops, socials, showcases, and other ways to connect with
            the Illini creative community.
          </p>
        </div>

        {usingMockEvents && (
          <p className="mt-8 rounded-lg border border-illiniOrange/20 bg-illiniOrange/10 px-4 py-3 text-sm text-slate-700">
            Showing sample events while the calendar connection is being configured.
          </p>
        )}

        {isLoading ? (
          <p className="mt-12 text-slate-700">Loading upcoming events...</p>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => {
              const date = formatEventDate(event.start);

              return (
                <article
                  className="overflow-hidden rounded-2xl border border-[#131E38]/10 bg-white shadow-lg shadow-[#131E38]/5"
                  key={event.id}
                >
                  <div className="flex items-center gap-4 border-b border-[#131E38]/10 bg-[#131E38] px-6 py-5 text-white">
                    <div className="min-w-16 rounded-lg bg-illiniOrange px-3 py-2 text-center">
                      <p className="text-xs font-bold tracking-widest">{date.month}</p>
                      <p className="text-2xl font-extrabold leading-none">{date.day}</p>
                    </div>
                    <p className="text-sm text-white/80">{date.full}</p>
                  </div>
                  <div className="p-7">
                    <h2 className="font-editorial text-2xl font-bold">{event.title}</h2>
                    <p className="mt-4 text-sm font-semibold text-illiniOrange">{event.location}</p>
                    <p className="mt-4 leading-7 text-slate-700">{event.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <section className="mt-20" aria-labelledby="full-schedule-heading">
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-illiniOrange">
                Plan ahead
              </p>
              <h2
                id="full-schedule-heading"
                className="font-editorial text-4xl font-extrabold italic tracking-tight sm:text-5xl"
              >
                Full Schedule
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-700">
              Subscribe to the calendar to keep every workshop, social, and
              showcase on your personal schedule.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#131E38]/10 bg-white p-2 shadow-md sm:p-4">
            {calendarEmbedUrl ? (
              <iframe
                src={calendarEmbedUrl}
                title="Illini Creative Impact full event calendar"
                className="h-[32rem] w-full rounded-xl border-0 sm:h-[40rem]"
                loading="lazy"
              />
            ) : (
              <div className="flex min-h-[32rem] flex-col items-center justify-center rounded-xl bg-[#FDFBF7] px-6 text-center sm:min-h-[40rem]">
                <h3 className="font-editorial text-2xl font-bold">
                  Calendar connection coming soon
                </h3>
                <p className="mt-3 max-w-md leading-7 text-slate-700">
                  Add the public Google Calendar ID to
                  <code className="mx-1 rounded bg-[#131E38]/10 px-1.5 py-0.5 text-sm">
                    VITE_GOOGLE_CALENDAR_ID
                  </code>
                  to display the full schedule here.
                </p>
              </div>
            )}
          </div>

          {calendarSubscribeUrl ? (
            <a
              href={calendarSubscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex rounded-full bg-[#E87722] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-orange-700"
            >
              Subscribe to the calendar
            </a>
          ) : (
            <p className="mt-5 text-sm text-slate-700">
              Once the calendar is connected, you will be able to subscribe
              directly from this page.
            </p>
          )}
        </section>
      </div>
    </section>
  );
}
