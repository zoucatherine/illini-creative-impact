import { useEffect, useState } from 'react';
import { EventCard } from '../components/EventCard';
import { ButtonLink, Container, Reveal } from '../components/ui';
import { events } from '../content/events';
import { site } from '../content/site';
import { useDocumentMeta } from '../lib/router';
import { PageHeader } from './Pages';

function normalizeCalendarEvent(event) {
  const description = event.description?.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

  return {
    id: `gcal-${event.id}`,
    title: event.summary || 'Untitled event',
    status: 'upcoming',
    date: event.start?.dateTime ?? event.start?.date,
    location: event.location || undefined,
    description: description || 'More details will be shared soon.',
    link: event.htmlLink ? { href: event.htmlLink, label: 'View in Google Calendar' } : undefined,
  };
}

function EventGroup({ id, title, intro, items }) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby={id} className="mt-20 first:mt-0">
      <h2 id={id} className="font-editorial text-3xl font-bold text-primaryNavy sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-3 max-w-2xl leading-7 text-slate-600">{intro}</p>}
      <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((event, index) => (
          <li key={event.id}>
            <Reveal delay={(index % 3) * 0.06} className="h-full">
              <EventCard event={event} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function EventsPage() {
  useDocumentMeta(
    'Events',
    'Upcoming and past events from Illini Creative Impact: the Earth Day Every Day art contest, the It’s Okay to Fall exhibition, creative socials, and community initiatives.',
  );

  const calendarId = import.meta.env.VITE_GOOGLE_CALENDAR_ID;
  const apiKey = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY;
  const [calendarEvents, setCalendarEvents] = useState([]);
  const calendarEmbedUrl = calendarId
    ? `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(calendarId)}&ctz=America%2FChicago`
    : null;
  const calendarSubscribeUrl = calendarId
    ? `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(calendarId)}`
    : null;

  // Optional live feed: when a public Google Calendar is configured, its upcoming events
  // appear alongside the events in src/content/events.ts.
  useEffect(() => {
    if (!apiKey || !calendarId) return;

    const params = new URLSearchParams({
      key: apiKey,
      singleEvents: 'true',
      orderBy: 'startTime',
      maxResults: '12',
      timeMin: new Date().toISOString(),
    });

    fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params}`)
      .then(async (response) => {
        if (!response.ok) throw new Error(`Google Calendar request failed with status ${response.status}.`);
        return response.json();
      })
      .then((data) => {
        setCalendarEvents(
          (data.items ?? []).filter((event) => event.start?.dateTime || event.start?.date).map(normalizeCalendarEvent),
        );
      })
      .catch((error) => console.error('Unable to load Google Calendar events.', error));
  }, [apiKey, calendarId]);

  const upcoming = [
    ...calendarEvents,
    ...events.filter((event) => event.status === 'upcoming').sort((a, b) => (a.date ?? '').localeCompare(b.date ?? '')),
  ];
  const planned = events.filter((event) => ['dates-tba', 'recurring', 'in-development'].includes(event.status));
  const past = events.filter((event) => event.status === 'past');

  return (
    <>
      <PageHeader
        eyebrow="Events & experiences"
        title={
          <>
            Come make something <span className="italic text-illiniOrange">with us.</span>
          </>
        }
        intro="Exhibitions, competitions, socials, and community events. They’re also the easiest way to meet us."
      />

      <div className="bg-cream py-20 sm:py-24">
        <Container>
          {upcoming.length > 0 ? (
            <EventGroup id="upcoming" title="Upcoming" items={upcoming} />
          ) : (
            <section aria-labelledby="upcoming" className="rounded-2xl bg-white p-8 ring-1 ring-primaryNavy/10 sm:p-10">
              <h2 id="upcoming" className="font-editorial text-3xl font-bold text-primaryNavy">
                Upcoming
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                No dates are confirmed right now. We announce events on Discord and Instagram first.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={site.social.discord}>Join the Discord</ButtonLink>
                <ButtonLink href={site.social.instagram} variant="secondary">
                  Follow on Instagram
                </ButtonLink>
              </div>
            </section>
          )}

          <EventGroup
            id="planned"
            title="Signature & recurring events"
            intro="These are in the works. Dates and locations appear here once they’re confirmed."
            items={planned}
          />

          <EventGroup id="past" title="Past events" items={past} />

          {calendarEmbedUrl && (
            <section className="mt-20" aria-labelledby="full-schedule-heading">
              <h2 id="full-schedule-heading" className="font-editorial text-3xl font-bold text-primaryNavy sm:text-4xl">
                Full schedule
              </h2>
              <div className="mt-8 overflow-hidden rounded-2xl bg-white p-2 ring-1 ring-primaryNavy/10 sm:p-4">
                <iframe
                  src={calendarEmbedUrl}
                  title="Illini Creative Impact event calendar"
                  className="h-[32rem] w-full rounded-xl border-0 sm:h-[40rem]"
                  loading="lazy"
                />
              </div>
              {calendarSubscribeUrl && (
                <ButtonLink href={calendarSubscribeUrl} className="mt-5">
                  Subscribe to the calendar
                </ButtonLink>
              )}
            </section>
          )}
        </Container>
      </div>
    </>
  );
}
