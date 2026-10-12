import { communityPhotos, memberStories } from '../content/community';
import { partners } from '../content/partners';
import { joinHref, partnerHref, proposeHref, site } from '../content/site';
import { ArrowLink, ButtonLink, Container, Eyebrow, Reveal, SectionHeading, StatusBadge } from './ui';

const pathways = [
  {
    title: 'Join a project team',
    body: 'Work alongside other students on real requests from real organizations.',
    examples: ['Marketing', 'Outreach', 'Design', 'Strategy', 'Project management', 'Community partnerships'],
    href: '/get-involved?interest=projects#join',
    cta: 'I want to work on projects',
  },
  {
    title: 'Bring events to life',
    body: 'Help plan and run the things people actually show up to.',
    examples: ['Exhibitions', 'Art competitions', 'Socials', 'Community experiences'],
    href: '/get-involved?interest=events#join',
    cta: 'I want to help with events',
  },
  {
    title: 'Start an initiative',
    body: 'Have an idea for a cause, partnership, or project? Propose it, and we will help you find a team.',
    examples: ['A cause you care about', 'A partner you know', 'An event you wish existed'],
    href: proposeHref,
    cta: 'I have an idea',
  },
];

export function Pathways({ headingLevel = 'h3' }: { headingLevel?: 'h2' | 'h3' }) {
  const Heading = headingLevel;
  return (
    <ol className="grid gap-6 lg:grid-cols-3">
      {pathways.map((pathway, index) => (
        <li key={pathway.title}>
          <Reveal delay={index * 0.08} className="h-full">
            <article className="flex h-full flex-col rounded-2xl bg-white p-7 ring-1 ring-primaryNavy/10 sm:p-8">
              <span className="font-editorial text-5xl font-bold italic text-illiniOrange" aria-hidden="true">
                {index + 1}
              </span>
              <Heading className="mt-4 font-editorial text-2xl font-bold text-primaryNavy sm:text-3xl">
                {pathway.title}
              </Heading>
              <p className="mt-3 leading-7 text-slate-600">{pathway.body}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Examples">
                {pathway.examples.map((example) => (
                  <li key={example} className="rounded-full bg-sand px-3 py-1 text-sm text-primaryNavy">
                    {example}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-7">
                <ArrowLink href={pathway.href}>{pathway.cta}</ArrowLink>
              </div>
            </article>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

export function GetInvolvedSection() {
  return (
    <section id="get-involved" aria-labelledby="get-involved-title" className="bg-white py-24 sm:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionHeading
              id="get-involved-title"
              eyebrow="Get involved"
              title={
                <>
                  Joining means <span className="italic text-orangeInk">doing</span> something.
                </>
              }
              intro="Pick what interests you and jump in. These are starting points, not departments, so you can work across more than one."
            />
          </div>
          <ul className="space-y-3 text-primaryNavy lg:col-span-4">
            {['Every major is welcome', 'No experience needed', 'Work across as many projects as you like'].map((item) => (
              <li key={item} className="flex items-center gap-3 font-semibold">
                <span className="h-2 w-2 rounded-full bg-illiniOrange" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-14">
          <Pathways />
        </div>
        <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <ButtonLink href={joinHref}>Get Involved</ButtonLink>
          <p className="text-sm text-slate-600">Takes about a minute.</p>
        </div>
      </Container>
    </section>
  );
}

export function PartnersSection() {
  return (
    <section id="partners" aria-labelledby="partners-title" className="bg-sand py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="partners-title"
              eyebrow="Community partners"
              title="Who we work with."
              intro="A lot of our work starts with organizations beyond campus that could use a hand. We listen to what they need, then figure out what students can take on."
            />
            <div className="mt-8 rounded-2xl bg-primaryNavy p-7 text-white">
              <h3 className="font-editorial text-2xl font-bold">Partner with ICI</h3>
              <p className="mt-3 leading-7 text-white/80">
                Local nonprofits, community organizations, and other groups can reach out with a project, a need, or
                an idea to collaborate. We’re a student organization, so we’ll be upfront about what we can take on.
              </p>
              <ButtonLink href={partnerHref} className="mt-6">
                Partner With ICI
              </ButtonLink>
            </div>
          </div>
          <ul className="space-y-5 lg:col-span-7 lg:pt-16">
            {partners.map((partner) => (
              <li key={partner.name}>
                <Reveal>
                  <article className="rounded-2xl bg-cream p-7 ring-1 ring-primaryNavy/10">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="font-editorial text-2xl font-bold text-primaryNavy sm:text-3xl">{partner.name}</h3>
                      <StatusBadge
                        label={partner.status === 'active' ? 'Active partner' : 'In development'}
                        tone={partner.status === 'active' ? 'live' : 'muted'}
                      />
                    </div>
                    <p className="mt-3 leading-7 text-slate-600">{partner.description}</p>
                    {partner.projectSlug && (
                      <div className="mt-4">
                        <ArrowLink href={`/work/${partner.projectSlug}`}>See the project</ArrowLink>
                      </div>
                    )}
                  </article>
                </Reveal>
              </li>
            ))}
            <li className="rounded-2xl border border-dashed border-primaryNavy/25 p-7 text-slate-600">
              <p className="font-editorial text-xl font-bold text-primaryNavy">Your organization?</p>
              <p className="mt-2 leading-7">
                We’re always looking for new ways to help.{' '}
                <a href={partnerHref} className="font-bold text-orangeInk underline-offset-4 hover:underline">
                  Tell us what you’re working on.
                </a>
              </p>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}

export function CommunitySection({ limit = 5 }: { limit?: number }) {
  const shown = communityPhotos.slice(0, limit);
  return (
    <section id="community" aria-labelledby="community-title" className="bg-cream py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="community-title"
            eyebrow="Our community"
            title="The people behind the work."
            intro="Projects are what we do. This is who does them, and what it looks like when we get together."
          />
          <ArrowLink href="/community">See more photos</ArrowLink>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2">
          {shown.map((item, index) => (
            <li
              key={item.caption}
              className={`group relative overflow-hidden rounded-2xl bg-sand ${
                index === 0 ? 'col-span-2 row-span-2 aspect-square lg:aspect-auto' : 'aspect-square'
              }`}
            >
              <img
                src={item.photo.src}
                alt={item.photo.alt}
                loading="lazy"
                decoding="async"
                style={{ objectPosition: item.photo.position }}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <p className="absolute bottom-3 left-3 rounded-full bg-primaryNavy/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                {item.caption}
              </p>
            </li>
          ))}
        </ul>

        <MemberStories />
      </Container>
    </section>
  );
}

export function MemberStories() {
  if (memberStories.length > 0) {
    return (
      <ul className="mt-14 grid gap-6 md:grid-cols-3">
        {memberStories.map((story) => (
          <li key={story.name}>
            <figure className="h-full rounded-2xl bg-white p-7 ring-1 ring-primaryNavy/10">
              <blockquote className="font-editorial text-xl leading-8 text-primaryNavy">“{story.quote}”</blockquote>
              <figcaption className="mt-5 text-sm text-slate-600">
                <span className="font-bold text-primaryNavy">{story.name}</span> · {story.detail}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="mt-14 grid gap-4 md:grid-cols-3">
      {['Member story', 'Member story', 'Member story'].map((label, index) => (
        <div
          key={index}
          className="placeholder-hatch rounded-2xl border border-dashed border-primaryNavy/25 p-7 text-sm leading-6 text-slate-600"
        >
          <p className="font-bold uppercase tracking-[0.16em] text-slate-500">{label}: content needed</p>
          <p className="mt-2">
            A short quote from a member about a project they worked on. Add in <code>src/content/community.ts</code>.
          </p>
        </div>
      ))}
    </div>
  );
}

export function FinalCTA() {
  return (
    <section aria-labelledby="final-cta-title" className="bg-illiniOrange py-24 text-primaryNavy sm:py-32">
      <Container>
        <div className="max-w-4xl">
          <Eyebrow>
            <span className="text-primaryNavy">{site.name}</span>
          </Eyebrow>
          <h2
            id="final-cta-title"
            className="font-editorial text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
          >
            There’s always more good to be <span className="italic">done.</span>
          </h2>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-primaryNavy/85 sm:text-xl">
            Bring your ideas, your curiosity, and your willingness to contribute. We’ll find something meaningful to
            build together.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href={joinHref} variant="navy">
              Join Illini Creative Impact
            </ButtonLink>
            <ButtonLink
              href={proposeHref}
              variant="secondary"
              className="border-primaryNavy/40 hover:bg-primaryNavy/5"
            >
              Propose an Idea
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
