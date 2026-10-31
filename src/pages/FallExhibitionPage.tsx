import React from 'react';
import { useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { ArtScroller } from '../components/ArtScroller';
import { CommunityWall } from '../components/CommunityWall';
import { HeroThread, PhotoCredit } from '../components/FallCampaign';
import { AccentTitle, ArrowLink, ButtonLink, Container, ContentNeeded, Eyebrow, Reveal } from '../components/ui';
import {
  accessibility,
  artistThemes,
  audiences,
  calendarHref,
  campusGuests,
  campusResources,
  collaborators,
  crisisResources,
  contributions,
  fallExhibition as event,
  faqs,
  leadMailto,
  markJourney,
  openingTimeLabel,
  openingTimeline,
  program,
  rsvpLaterHref,
  rsvpOpeningHref,
  schedule,
} from '../content/fallExhibition';
import { campusPhotos } from '../content/campusPhotos';
import { earthDayArtworks, earthDayGalleryUrl } from '../content/earthDayGallery';
import { photos } from '../content/photos';
import { site } from '../content/site';
import { useDocumentMeta } from '../lib/router';
import alexZhangPortrait from '../assets/officer-portraits/alex-zhang.webp';
import ameliaCarpenterPortrait from '../assets/officer-portraits/amelia-carpenter.webp';

const description =
  'It’s Okay to Fall: a campus-wide mental health art initiative at UIUC. Add your mark to one collective artwork that grows all day. November 10, 2026, 10 AM to 8 PM, Illini Union, Illini Room C (first floor).';

const confirmedGuests = campusGuests.filter((guest) => guest.status === 'confirmed');
const wellnessOrgs = collaborators.filter((org) => org.wellness);

const number = (index: number) => String(index + 1).padStart(2, '0');

const portraits: Record<string, string> = {
  'Alex Zhang': alexZhangPortrait,
  'Amelia Carpenter': ameliaCarpenterPortrait,
};

// Structured data so search engines can show the event's date and place.
const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: event.title,
  description,
  startDate: event.start,
  endDate: event.end,
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: event.venue,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1401 W Green St',
      addressLocality: 'Urbana',
      addressRegion: 'IL',
      postalCode: '61801',
      addressCountry: 'US',
    },
  },
  organizer: { '@type': 'Organization', name: site.name, url: site.url },
  url: `${site.url}/work/${event.slug}`,
  image: `${site.url}/og-image.jpg`,
};

const beats = [
  {
    title: 'Pick up a marker',
    body: 'Drawing materials are provided at the boards.',
  },
  {
    title: 'Leave a mark',
    body: 'Draw something, add a color, or write a few words. You don’t have to share anything personal.',
  },
  {
    title: 'Watch it become one piece',
    body: 'By 8 PM, everyone’s marks add up to one artwork.',
  },
];

function clockLabel(progress: number) {
  const minutes = 10 * 60 + Math.round((progress * 600) / 15) * 15;
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  const display = hour > 12 ? hour - 12 : hour;
  return `${display}:${String(minute).padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`;
}

/** The artwork filling from 10 AM to 8 PM as the visitor scrolls. Shows the finished wall with reduced motion. */
function GrowingWall() {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [scrolled, setScrolled] = React.useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (value) => setScrolled(Math.min(1, Math.round(value * 1.15 * 40) / 40)));

  const progress = reduceMotion ? 1 : scrolled;
  const beat = progress < 0.34 ? 0 : progress < 0.72 ? 1 : 2;

  return (
    <div ref={ref} className={reduceMotion ? '' : 'relative h-[230vh]'}>
      <div className={reduceMotion ? 'py-12' : 'sticky top-0 flex min-h-svh flex-col justify-center pb-6 pt-20'}>
        <Container>
          <figure>
            <div className="flex items-end justify-between gap-4">
              <p className="font-editorial text-3xl font-bold tabular-nums text-primaryNavy sm:text-5xl" aria-hidden="true">
                {clockLabel(progress)}
              </p>
              <p className="text-right text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                November 10 · 10 AM to 8 PM
              </p>
            </div>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-primaryNavy/10" aria-hidden="true">
              <div className="h-full origin-left rounded-full bg-illiniOrange" style={{ transform: `scaleX(${progress})` }} />
            </div>
            <div className="mt-5 rounded-2xl bg-sand p-3 ring-1 ring-primaryNavy/10 sm:p-6">
              {/* Sized to the viewport height so the clock, wall, and steps fit on screen while pinned. */}
              <div className="mx-auto" style={{ width: 'min(100%, calc((100svh - 21rem) * 2.5))' }}>
                <CommunityWall id="growing-wall" progress={progress} />
              </div>
            </div>
            <figcaption className="mt-3 text-sm text-slate-500">
              Concept illustration.
            </figcaption>
          </figure>

          <ol className="mt-6 grid gap-6 sm:grid-cols-3">
            {beats.map((item, index) => (
              <li
                key={item.title}
                className={`border-t-2 pt-4 transition-colors duration-500 ${
                  reduceMotion || index <= beat ? 'border-illiniOrange' : 'border-primaryNavy/15'
                }`}
              >
                <p
                  className={`font-editorial text-xl font-bold transition-colors duration-500 sm:text-2xl ${
                    reduceMotion || index === beat ? 'text-primaryNavy' : 'text-primaryNavy/45'
                  }`}
                >
                  <span className="mr-2 italic text-illiniOrange" aria-hidden="true">
                    {number(index)}
                  </span>
                  {item.title}
                </p>
                <p className="mt-2 hidden leading-7 text-slate-600 sm:block">{item.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </div>
    </div>
  );
}

export default function FallExhibitionPage() {
  useDocumentMeta('It’s Okay to Fall · November 10, 2026', description);

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema).replace(/</g, '\\u003c') }} />

      {/* Hero: the Illini Union across the Main Quad in autumn */}
      <header className="relative isolate overflow-hidden bg-primaryNavy text-white">
        <img
          src={campusPhotos.unionQuadAutumn.src}
          srcSet={campusPhotos.unionQuadAutumn.srcSet}
          sizes="100vw"
          width={campusPhotos.unionQuadAutumn.width}
          height={campusPhotos.unionQuadAutumn.height}
          alt={campusPhotos.unionQuadAutumn.alt}
          fetchPriority="high"
          decoding="async"
          className="hero-photo absolute inset-0 -z-20 h-full w-full object-cover object-[50%_30%]"
        />
        {/* Navy wash keeps the text readable: from the bottom on phones, from the left on wide screens. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-primaryNavy from-40% via-primaryNavy/60 to-primaryNavy/0 lg:bg-gradient-to-r lg:from-primaryNavy/95 lg:from-15% lg:via-primaryNavy/55 lg:via-50% lg:to-primaryNavy/0"
        />
        <HeroThread className="hero-thread top-[16%] h-20 lg:top-[9%] lg:h-28" />

        <Container className="flex min-h-[100svh] flex-col pb-8 pt-28 sm:pt-32 lg:min-h-[92svh]">
          <a href="/events#projects" className="text-sm font-semibold text-white/80 hover:text-illiniOrange">
            ← All projects
          </a>
          <div className="flex-1" />
          <p className="mt-40 text-sm font-bold uppercase tracking-[0.2em] text-illiniOrange lg:mt-16">
            A community art event for mental health
          </p>
          <h1 className="mt-4 max-w-5xl font-editorial text-6xl font-bold leading-[0.95] tracking-tight sm:text-8xl lg:text-[8.5rem]">
            <AccentTitle text={event.title} accent="Fall" />
          </h1>

          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-6">
              <p className="font-editorial text-2xl italic leading-snug text-white sm:text-3xl">
                You don’t have to finish the semester alone.
              </p>
              <p className="mt-5 max-w-xl text-lg leading-8 text-white/85">
                The end of the semester can feel heavy. Take a break from it: add a drawing, a color, or a few words
                to one shared artwork, and see how many people are carrying the same things you are. Hard stretches
                pass, and no one has to get through them alone.
              </p>
            </div>
            <div className="lg:col-span-6 lg:justify-self-end">
              <div className="rounded-2xl bg-primaryNavy/70 p-5 ring-1 ring-white/15 backdrop-blur-md sm:p-6">
                <dl className="grid gap-4 sm:grid-cols-3">
                  {[
                    { label: 'Date', value: event.dateLabel },
                    { label: 'Time', value: event.timeLabel },
                    { label: 'Where', value: event.venue },
                  ].map((detail) => (
                    <div key={detail.label} className="border-l-2 border-illiniOrange pl-4">
                      <dt className="text-xs font-bold uppercase tracking-[0.16em] text-illiniOrange">{detail.label}</dt>
                      <dd className="mt-1 font-semibold leading-6 text-white">{detail.value}</dd>
                    </div>
                  ))}
                </dl>
                <ol className="mt-5 space-y-1.5 border-t border-white/15 pt-4 text-sm" aria-label="Schedule">
                  {schedule.map((item) => (
                    <li key={item.time} className="flex flex-wrap gap-x-3">
                      <span className="font-semibold tabular-nums text-illiniOrange">{item.time}</span>
                      <span className="text-white">{item.title}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={calendarHref}>Add it to your calendar</ButtonLink>
                <ButtonLink href="#take-part" variant="onDark">
                  How to take part
                </ButtonLink>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-white/15 pt-5 text-sm sm:flex-row sm:items-center sm:justify-between">
            <span className="flex flex-wrap gap-x-6 gap-y-2">
              <ArrowLink href="#artists" tone="dark">
                Artists: show your work
              </ArrowLink>
              <ArrowLink href="#invitation" tone="dark">
                Organizations: help make it
              </ArrowLink>
            </span>
            <PhotoCredit photo={campusPhotos.unionQuadAutumn} label="The Illini Union from the Main Quad" tone="dark" />
          </div>
        </Container>
      </header>

      {/* The centerpiece */}
      <section id="take-part" aria-labelledby="centerpiece-title" className="bg-cream pt-20 sm:pt-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow>The centerpiece</Eyebrow>
              <h2
                id="centerpiece-title"
                className="font-editorial text-4xl font-bold leading-[1.05] tracking-tight text-primaryNavy sm:text-6xl"
              >
                The collective artwork
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                The boards start the day blank. Everyone who comes adds a drawing, a color, or a few words. By 8 PM,
                it’s one artwork made by everyone who came.
              </p>
            </div>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-5 lg:col-span-5">
              {[
                ['4–6', 'tall vertical boards'],
                ['10 AM–8 PM', 'open all day'],
                ['All', 'drawing materials provided'],
                ['No', 'art experience needed'],
              ].map(([figure, label]) => (
                <li key={label} className="border-l-2 border-illiniOrange pl-4">
                  <span className="block font-editorial text-3xl font-bold text-primaryNavy">{figure}</span>
                  <span className="text-slate-600">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
        <GrowingWall />
        <Container>
          <div className="grid gap-4 border-t border-primaryNavy/15 py-14 sm:py-16 lg:grid-cols-12 lg:gap-10">
            <h3 className="font-editorial text-3xl font-bold leading-tight text-primaryNavy sm:text-4xl lg:col-span-5">
              A community-wide beginning
            </h3>
            <p className="max-w-2xl text-lg leading-8 text-slate-600 lg:col-span-7">
              We’re bringing together students, faculty, university leaders, and community partners to begin a shared
              work of art. Each contribution is a message of encouragement, connection, and support for mental health
              across our campus.
            </p>
          </div>
        </Container>
      </section>

      {/* Program */}
      <section id="program" aria-labelledby="program-title" className="bg-white py-20 sm:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>In the room</Eyebrow>
              <h2
                id="program-title"
                className="font-editorial text-4xl font-bold leading-[1.05] tracking-tight text-primaryNavy sm:text-5xl"
              >
                What you’ll find at the event
              </h2>

              {/* Photos from earlier ICI events, to show the spirit of the day. Not from It’s Okay to Fall. */}
              <Reveal className="mt-12">
                <figure>
                  <div className="grid grid-cols-6">
                    <div className="col-span-5 overflow-hidden rounded-2xl">
                      <img
                        src={photos.drawingTable.src}
                        alt={photos.drawingTable.alt}
                        loading="lazy"
                        decoding="async"
                        style={{ objectPosition: photos.drawingTable.position }}
                        className="aspect-[4/5] w-full object-cover transition-transform duration-1000 hover:scale-[1.03]"
                      />
                    </div>
                    <div className="col-span-4 col-start-3 -mt-24 overflow-hidden rounded-2xl ring-8 ring-white sm:-mt-32">
                      <img
                        src={photos.artExhibition.src}
                        alt={photos.artExhibition.alt}
                        loading="lazy"
                        decoding="async"
                        style={{ objectPosition: photos.artExhibition.position }}
                        className="aspect-[4/3] w-full object-cover transition-transform duration-1000 hover:scale-[1.03]"
                      />
                    </div>
                  </div>
                  <figcaption className="mt-4 text-sm leading-6 text-slate-500">
                    From past Illini Creative Impact events: members drawing together, and student artwork at an ICI
                    exhibition.
                  </figcaption>
                </figure>
              </Reveal>
            </div>
            <ol className="divide-y divide-primaryNavy/10 self-start border-y border-primaryNavy/10 lg:col-span-7">
              {program.map((item, index) => (
                <li key={item.title} className="grid gap-4 py-8 sm:grid-cols-[4rem_1fr]">
                  <span className="font-editorial text-3xl font-bold italic text-illiniOrange" aria-hidden="true">
                    {number(index)}
                  </span>
                  <div>
                    <h3 className="font-editorial text-2xl font-bold text-primaryNavy sm:text-3xl">{item.title}</h3>
                    <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-600">{item.body}</p>
                    {item.note && <p className="mt-2 max-w-2xl leading-7 text-slate-500">{item.note}</p>}
                    {item.link && (
                      <div className="mt-4">
                        <ArrowLink href={item.link.href}>{item.link.label}</ArrowLink>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Health and counseling organizations taking part */}
      {wellnessOrgs.length > 0 && (
        <section id="support" aria-labelledby="support-title" className="bg-cream py-20 sm:py-28">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-6">
                <Eyebrow>At the event</Eyebrow>
                <h2
                  id="support-title"
                  className="font-editorial text-4xl font-bold leading-[1.05] tracking-tight text-primaryNavy sm:text-6xl"
                >
                  Mental health support
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-slate-600 lg:col-span-6">
                Come for the artwork and find out where to turn when things get hard. These health and counseling
                organizations are part of the day, so you can learn what support is out there on campus and in
                Champaign-Urbana.
              </p>
            </div>
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {wellnessOrgs.map((org) => (
                <li key={org.name} className="rounded-2xl border-t-4 border-illiniOrange bg-white p-7 shadow-sm">
                  <p className="font-editorial text-2xl font-bold text-primaryNavy sm:text-3xl">
                    {org.href ? (
                      <a href={org.href} className="hover:text-orangeInk">
                        {org.name}
                      </a>
                    ) : (
                      org.name
                    )}
                  </p>
                  {org.contribution && <p className="mt-2 leading-7 text-slate-600">{org.contribution}</p>}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ArrowLink href="#resources">Campus resources you can reach any day</ArrowLink>
            </div>
          </Container>
        </section>
      )}

      {/* A campus-wide invitation */}
      <section id="invitation" aria-labelledby="invitation-title" className="bg-primaryNavy py-20 text-white sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Eyebrow tone="dark">A campus-wide invitation</Eyebrow>
              <h2
                id="invitation-title"
                className="font-editorial text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl"
              >
                Bring your organization
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-8 text-white/80 lg:col-span-6 lg:pt-10">
              <p>
                Mental health is easier to talk about when there’s a low-pressure way in. Making something side by side,
                and seeing what others have added, opens that conversation without asking anyone to speak first.
              </p>
              <p>
                Students in Illini Creative Impact are organizing the day, but it’s meant to belong to the whole campus.
                We’re inviting student organizations, departments, and community groups to help make it, as contributors
                to the work rather than names on a banner.
              </p>
            </div>
          </div>

          <Reveal className="mt-14">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Ways to contribute</h3>
            <ol className="mt-5 grid border-t border-white/15 sm:grid-cols-2 lg:grid-cols-5">
              {contributions.map((item, index) => (
                <li key={item.title} className="border-b border-white/15 py-6 sm:pr-6 lg:border-b-0">
                  <span className="font-editorial text-xl font-bold italic text-illiniOrange" aria-hidden="true">
                    {number(index)}
                  </span>
                  <p className="mt-2 font-editorial text-xl font-bold">{item.title}</p>
                  <p className="mt-2 leading-7 text-white/70">{item.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {audiences.map((audience) => (
              <section
                key={audience.id}
                aria-labelledby={`audience-${audience.id}`}
                className="flex flex-col rounded-2xl bg-white/[0.06] p-7 ring-1 ring-white/10"
              >
                <h3 id={`audience-${audience.id}`} className="font-editorial text-2xl font-bold">
                  {audience.who}
                </h3>
                <p className="mt-3 flex-1 leading-7 text-white/75">{audience.pitch}</p>
                <div className="mt-6">
                  <ArrowLink href={audience.cta.href} tone="dark">
                    {audience.cta.label}
                  </ArrowLink>
                </div>
              </section>
            ))}
          </div>

          <div className="mt-14 border-t border-white/15 pt-8">
            {collaborators.length > 0 ? (
              <>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Collaborating with us</h3>
                <ul className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                  {collaborators.map((org) => (
                    <li key={org.name}>
                      <p className="font-editorial text-xl font-bold">
                        {org.href ? (
                          <a href={org.href} className="hover:text-illiniOrange">
                            {org.name}
                          </a>
                        ) : (
                          org.name
                        )}
                      </p>
                      {org.contribution && <p className="mt-1 text-white/70">{org.contribution}</p>}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </Container>
      </section>

      {/* Opening: an invitation to campus leaders */}
      <section id="opening" aria-labelledby="opening-title" className="overflow-hidden bg-sand py-20 sm:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
            <figure className="relative lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={campusPhotos.almaMater.src}
                  srcSet={campusPhotos.almaMater.srcSet}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  width={campusPhotos.almaMater.width}
                  height={campusPhotos.almaMater.height}
                  alt={campusPhotos.almaMater.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover object-[50%_35%] transition-transform duration-1000 hover:scale-[1.03]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primaryNavy/90 via-primaryNavy/50 to-transparent px-6 pb-6 pt-24"
                >
                  <p className="font-editorial text-xl italic leading-snug text-white sm:text-2xl">
                    “To thy happy children of the future, those of the past send greetings.”
                  </p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-illiniOrange">
                    Inscription on the Alma Mater
                  </p>
                </div>
              </div>
              <figcaption className="mt-3">
                <PhotoCredit photo={campusPhotos.almaMater} label="Alma Mater by Lorado Taft, on the UIUC campus" />
              </figcaption>
            </figure>

            <div className="lg:col-span-7">
              <Eyebrow>Opening ceremony · {openingTimeLabel}</Eyebrow>
              <h2
                id="opening-title"
                className="font-editorial text-5xl font-bold leading-[1] tracking-tight text-primaryNavy sm:text-7xl"
              >
                Make the first <span className="italic text-orangeInk">mark.</span>
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
                Before the rest of campus adds their voices, we’re inviting leaders from across Illinois to make the
                first contributions to a collective artwork for mental health awareness.
              </p>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-700">
                One small mark. A few minutes of your time. A reminder that no one in our community stands alone.
              </p>

              <ol className="mt-10 border-t border-primaryNavy/15">
                {openingTimeline.map((step) => (
                  <li
                    key={step.time}
                    className="grid gap-1 border-b border-primaryNavy/15 py-5 sm:grid-cols-[7rem_1fr] sm:gap-6"
                  >
                    <p className="font-editorial text-xl font-bold tabular-nums text-orangeInk">{step.time}</p>
                    <div>
                      <p className="font-editorial text-xl font-bold text-primaryNavy">{step.title}</p>
                      <p className="mt-1 leading-7 text-slate-600">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={rsvpOpeningHref} variant="navy">
                  RSVP to make your mark
                </ButtonLink>
                <ButtonLink href={rsvpLaterHref} variant="secondary">
                  Contribute later in the day
                </ButtonLink>
              </div>
              <div className="mt-4 text-sm">
                <ArrowLink href={leadMailto('a leader to invite to the opening')}>Suggest someone to invite</ArrowLink>
              </div>

            </div>
          </div>

          {/* Confirmed campus leaders. Full width so the rows fill sideways as more names are added. */}
          {confirmedGuests.length > 0 && (
            <div className="mt-16 border-t border-primaryNavy/15">
              {[
                { id: 'opening', label: 'Making the first marks', guests: confirmedGuests.filter((g) => g.category === 'opening') },
                { id: 'day', label: 'Joining us during the day', guests: confirmedGuests.filter((g) => g.category === 'day') },
              ]
                .filter((group) => group.guests.length > 0)
                .map((group) => (
                  <div key={group.id} className="grid gap-4 border-b border-primaryNavy/15 py-7 lg:grid-cols-12 lg:gap-10">
                    <h3 className="pt-1 text-xs font-bold uppercase tracking-[0.2em] text-orangeInk lg:col-span-3">
                      {group.label}
                    </h3>
                    <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-3">
                      {group.guests.map((guest) => (
                        <li key={guest.name}>
                          <p className="font-editorial text-lg font-bold leading-snug text-primaryNavy">{guest.name}</p>
                          <p className="mt-0.5 text-sm leading-snug text-slate-600">{guest.title}</p>
                          {guest.arrival && (
                            <p className="mt-1 text-sm font-semibold text-orangeInk">Around {guest.arrival}</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          )}

          {/* For leaders who can't be there at 10 AM, and for spreading the invitation on from there. */}
          <div className="mt-16 grid gap-10 rounded-2xl bg-white/70 p-7 ring-1 ring-primaryNavy/10 sm:p-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orangeInk">Can’t make the opening?</p>
              <h3 className="mt-3 font-editorial text-3xl font-bold leading-tight text-primaryNavy sm:text-4xl">
                Your mark still matters.
              </h3>
              <p className="mt-4 leading-7 text-slate-700">
                Stop by any time from 10 AM to 8 PM to add to the growing artwork. It takes a few minutes, and no art
                experience is needed.
              </p>
              <p className="mt-4 leading-7 text-slate-700">
                Bring your community along. Whether you represent a college, department, student organization, or
                campus office, encourage the people you work with to add their voices too.
              </p>
            </div>
            <ol className="lg:col-span-7 lg:border-l lg:border-primaryNavy/10 lg:pl-14">
              {markJourney.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-3 py-4 first:pt-0 last:pb-0">
                  <span className="font-editorial text-xl font-bold italic text-orangeInk" aria-hidden="true">
                    {number(index)}
                  </span>
                  <div>
                    <p className="font-editorial text-xl font-bold text-primaryNavy">{step.title}</p>
                    <p className="mt-1 leading-7 text-slate-600">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <p className="mx-auto mt-16 max-w-3xl text-balance text-center font-editorial text-3xl italic leading-snug text-primaryNavy sm:text-4xl">
            The first marks begin the story. The rest of campus makes it ours.
          </p>

        </Container>
      </section>

      {/* Artists */}
      <section id="artists" aria-labelledby="artists-title" className="bg-cream py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow>Call for student artists</Eyebrow>
              <h2
                id="artists-title"
                className="font-editorial text-4xl font-bold leading-[1.05] tracking-tight text-primaryNavy sm:text-6xl"
              >
                Submit your artwork
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                We’re looking for student art about mental health. Selected pieces will be shown at the event on
                November 10.
              </p>
              <ButtonLink href={event.forms.artwork} variant="navy" className="mt-8">
                Submit your artwork
              </ButtonLink>
            </div>
            <div className="lg:col-span-5 lg:pt-12">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Themes we’re looking for</h3>
              <ul className="mt-4 divide-y divide-primaryNavy/10 border-y border-primaryNavy/10">
                {artistThemes.map((theme) => (
                  <li key={theme} className="py-3 font-editorial text-2xl font-semibold text-primaryNavy">
                    {theme}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-20 border-t border-primaryNavy/10 pt-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h3 id="planned-artwork" className="font-editorial text-3xl font-bold text-primaryNavy sm:text-4xl">
                  Artwork we plan to show
                </h3>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  Selected from our Earth Day Every Day contest.
                </p>
              </div>
              <ArrowLink href={earthDayGalleryUrl}>See every Earth Day entry</ArrowLink>
            </div>
            <div className="mt-10">
              <ArtScroller artworks={earthDayArtworks} label="Artwork we plan to show" />
            </div>
          </div>
        </Container>
      </section>

      {/* Visit */}
      <section id="visit" aria-labelledby="visit-title" className="bg-white py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <figure className="lg:col-span-7">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={campusPhotos.unionFront.src}
                  srcSet={campusPhotos.unionFront.srcSet}
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  width={campusPhotos.unionFront.width}
                  height={campusPhotos.unionFront.height}
                  alt={campusPhotos.unionFront.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-1000 hover:scale-[1.03]"
                />
              </div>
              <figcaption className="mt-3">
                <PhotoCredit photo={campusPhotos.unionFront} label="The Illini Union, on the Main Quad" />
              </figcaption>
            </figure>
            <div className="lg:col-span-5">
              <Eyebrow>November 10, Illini Union</Eyebrow>
              <h2
                id="visit-title"
                className="font-editorial text-4xl font-bold leading-[1.05] tracking-tight text-primaryNavy sm:text-5xl"
              >
                Plan your visit
              </h2>
              <dl className="mt-8 space-y-5">
                {[
                  { label: 'Date', value: event.dateLabel },
                  { label: 'Time', value: `${event.timeLabel}, the artwork grows all day` },
                  { label: 'Where', value: `${event.venue}, ${event.address}` },
                ].map((detail) => (
                  <div key={detail.label} className="border-l-2 border-illiniOrange pl-4">
                    <dt className="text-xs font-bold uppercase tracking-[0.16em] text-orangeInk">{detail.label}</dt>
                    <dd className="mt-1 text-lg font-semibold text-primaryNavy">{detail.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                <ArrowLink href={calendarHref}>Add to Google Calendar</ArrowLink>
                <ArrowLink href={event.mapsHref}>Directions</ArrowLink>
              </div>

              {accessibility && (
                <div className="mt-10">
                  <h3 className="font-editorial text-2xl font-bold text-primaryNavy">Accessibility</h3>
                  <p className="mt-3 leading-7 text-slate-600">{accessibility}</p>
                </div>
              )}
              <div className="mt-4 space-y-3">
                <ContentNeeded>Confirm admission and whether an RSVP is needed, then add them to the visit details.</ContentNeeded>
                {!accessibility && <ContentNeeded>Add accessibility information in content/fallExhibition.ts.</ContentNeeded>}
              </div>
            </div>
          </div>

          <div className="mt-20 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h3 className="font-editorial text-3xl font-bold text-primaryNavy">Questions</h3>
              <div className="mt-6 divide-y divide-primaryNavy/10 border-y border-primaryNavy/10">
                {faqs.map((faq) => (
                  <details key={faq.q} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-editorial text-xl font-bold text-primaryNavy [&::-webkit-details-marker]:hidden">
                      {faq.q}
                      <span
                        aria-hidden="true"
                        className="text-2xl font-normal text-orangeInk transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 max-w-2xl leading-7 text-slate-600">{faq.a}</p>
                  </details>
                ))}
              </div>

            </div>
            <div className="lg:col-span-5">
              <aside aria-labelledby="care-title" className="rounded-2xl bg-sand p-7">
                <h3 id="care-title" className="font-editorial text-2xl font-bold text-primaryNavy">
                  A note on care
                </h3>
                <p className="mt-3 leading-7 text-slate-700">
                  Taking part is always optional, and so is anything you share. The creative activities are a way to
                  connect, not therapy, and any organizations at the event are there to share information, not to
                  provide treatment.
                </p>
                <p className="mt-3 leading-7 text-slate-700">
                  If you or someone you know is struggling right now, you can call or text{' '}
                  <a href="tel:988" className="font-bold text-orangeInk underline underline-offset-4">
                    988
                  </a>
                  , the Suicide &amp; Crisis Lifeline, any time.
                </p>
                <div className="mt-4">
                  <ArrowLink href="#resources">Campus resources</ArrowLink>
                </div>
              </aside>
            </div>
          </div>
        </Container>
      </section>

      {/* Campus resources */}
      <section id="resources" aria-labelledby="resources-title" className="bg-cream py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>Support</Eyebrow>
              <h2
                id="resources-title"
                className="font-editorial text-4xl font-bold leading-[1.05] tracking-tight text-primaryNavy sm:text-5xl"
              >
                Campus resources
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                The end of the semester can be a lot, and you don’t have to handle it alone. These services are here for
                UIUC students, on November 10 and every day after.
              </p>
            </div>

            <div className="lg:col-span-7">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-orangeInk">On campus</h3>
              <ul className="mt-5 grid gap-5 sm:grid-cols-2">
                {campusResources.map((resource) => (
                  <li key={resource.name} className="flex flex-col rounded-2xl bg-white p-6 shadow-sm">
                    <p className="font-editorial text-2xl font-bold text-primaryNavy">{resource.name}</p>
                    {resource.contacts.map((contact) => (
                      <a
                        key={contact.href}
                        href={contact.href}
                        className="mt-2 text-xl font-bold text-orangeInk underline-offset-4 hover:underline"
                      >
                        {contact.label}
                      </a>
                    ))}
                    <p className="mt-3 leading-7 text-slate-600">{resource.body}</p>
                    {resource.detail && <p className="mt-3 text-sm leading-6 text-slate-500">{resource.detail}</p>}
                    {resource.link && (
                      <div className="mt-auto pt-5">
                        <ArrowLink href={resource.link.href}>{resource.link.label}</ArrowLink>
                      </div>
                    )}
                  </li>
                ))}
              </ul>

              <h3 className="mt-12 text-xs font-bold uppercase tracking-[0.2em] text-orangeInk">Any time, day or night</h3>
              <ul className="mt-2 divide-y divide-primaryNavy/10">
                {crisisResources.map((resource) => (
                  <li key={resource.name} className="grid gap-1 py-4 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6">
                    <div>
                      <p className="font-bold text-primaryNavy">{resource.name}</p>
                      <p className="text-slate-600">{resource.body}</p>
                    </div>
                    {resource.contacts.map((contact) => (
                      <a
                        key={contact.href}
                        href={contact.href}
                        className="text-lg font-bold text-orangeInk underline-offset-4 hover:underline"
                      >
                        {contact.label}
                      </a>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Organizers */}
      <section aria-labelledby="team-title" className="bg-primaryNavy py-20 text-white sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <Eyebrow tone="dark">Help make it happen</Eyebrow>
              <h2 id="team-title" className="font-editorial text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                Join the organizing team
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">
                No experience needed.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={event.joinHref}>Join the team</ButtonLink>
                <ButtonLink href={event.discord} variant="onDark">
                  Join on Discord
                </ButtonLink>
              </div>
            </div>
            <div className="lg:col-span-5">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Led by</h3>
              <ul className="mt-5 space-y-5">
                {event.leads.map((lead) => (
                  <li key={lead.name} className="flex items-center gap-4">
                    <img
                      src={portraits[lead.name]}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-16 w-16 rounded-full border-2 border-illiniOrange/60 object-cover"
                    />
                    <p className="leading-6">
                      <span className="block font-editorial text-xl font-bold">{lead.name}</span>
                      <a href={`mailto:${lead.email}`} className="text-illiniOrange hover:underline">
                        {lead.email}
                      </a>
                    </p>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <ArrowLink href={leadMailto('question')} tone="dark">
                  Email both organizers
                </ArrowLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </article>
  );
}
