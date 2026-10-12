import { events } from '../content/events';
import { site } from '../content/site';
import { EventCard } from './EventCard';
import { ProjectShowcase } from './ProjectShowcase';
import { CommunitySection, FinalCTA, GetInvolvedSection, PartnersSection } from './sections';
import { ArrowLink, Container, Reveal, SectionHeading } from './ui';

const creativeWays = [
  'problem solving',
  'entrepreneurship',
  'strategy',
  'organizing',
  'design',
  'communication',
  'art',
];

export default function HomeBody() {
  const featuredEvents = events.filter((event) => event.status !== 'past').slice(0, 3);

  return (
    <>
      <section id="work" aria-labelledby="work-title" className="bg-cream py-24 sm:py-32">
        <Container>
          <Reveal>
            <p className="max-w-5xl font-editorial text-3xl font-medium leading-[1.25] tracking-tight text-primaryNavy sm:text-4xl lg:text-5xl">
              {site.belief.replace('.', '')}
              <span className="text-illiniOrange">.</span>{' '}
              <span className="text-slate-500">
                For us, creativity means {creativeWays.slice(0, -1).join(', ')}, and {creativeWays.at(-1)}: any
                unconventional way to help someone.
              </span>
            </p>
          </Reveal>

          <div className="mt-24 flex flex-col gap-6 border-t border-primaryNavy/10 pt-16 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="work-title"
              eyebrow="Our work"
              title="What we’re building."
              intro="Partnerships, events, and initiatives run by students. Each one started with a real need."
            />
            <ArrowLink href="/work">All projects</ArrowLink>
          </div>
          <ProjectShowcase />
        </Container>
      </section>

      <GetInvolvedSection />

      <PartnersSection />

      <section id="events" aria-labelledby="events-title" className="bg-primaryNavy py-24 sm:py-32">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              tone="dark"
              id="events-title"
              eyebrow="Events & experiences"
              title="Come to something."
              intro="From our signature art contest to smaller socials. Dates are posted here once they’re confirmed."
            />
            <ArrowLink href="/events" tone="dark">
              All events
            </ArrowLink>
          </div>
          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredEvents.map((event, index) => (
              <li key={event.id}>
                <Reveal delay={index * 0.08} className="h-full">
                  <EventCard event={event} tone="dark" />
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CommunitySection />

      <FinalCTA />
    </>
  );
}
