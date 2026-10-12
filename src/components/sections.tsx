import { communityPhotos, memberStories } from '../content/community';
import { partners } from '../content/partners';
import { photos } from '../content/photos';
import { joinHref, partnerHref, pitchHref, site } from '../content/site';
import { ArrowLink, ButtonLink, Container, Eyebrow, Reveal, SectionHeading } from './ui';

// ---------------------------------------------------------------------------
// Get Involved page pathways
// ---------------------------------------------------------------------------

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
    examples: ['Exhibitions', 'Art contests', 'Socials', 'Community experiences'],
    href: '/get-involved?interest=events#join',
    cta: 'I want to help with events',
  },
  {
    title: 'Start an initiative',
    body: 'Have an idea for a cause, partnership, or project? Pitch it, and find people to build it with.',
    examples: ['A cause you care about', 'A partner you know', 'An event you wish existed'],
    href: pitchHref,
    cta: 'Pitch an idea',
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

// ---------------------------------------------------------------------------
// Homepage: partner strip under Our Work
// ---------------------------------------------------------------------------

export function PartnerStrip() {
  return (
    <div className="mt-20 flex flex-col gap-5 border-t border-primaryNavy/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
      <p className="text-slate-600">
        <span className="mr-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Working with</span>
        {partners.map((partner, index) => (
          <span key={partner.name}>
            {index > 0 && (
              <span className="mx-2 text-slate-300" aria-hidden="true">
                /
              </span>
            )}
            <a
              href={partner.projectSlug ? `/work/${partner.projectSlug}` : (partner.url ?? partnerHref)}
              className="font-semibold text-primaryNavy underline-offset-4 hover:text-orangeInk hover:underline"
            >
              {partner.name}
            </a>
          </span>
        ))}
      </p>
      <ArrowLink href={partnerHref}>Representing an organization? Partner with ICI</ArrowLink>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Homepage: your idea, our community
// ---------------------------------------------------------------------------

const ideaNotes = [
  { kind: 'Start a community project', idea: 'A documentary about an issue in town', tone: 'cream', tilt: '-rotate-2' },
  { kind: 'Organize an event', idea: 'The campus event you wish already existed', tone: 'orange', tilt: 'rotate-1' },
  { kind: 'Support a local cause', idea: 'Better outreach for a local nonprofit', tone: 'white', tilt: 'rotate-2' },
  { kind: 'Launch a creative initiative', idea: 'A mental health awareness campaign', tone: 'sand', tilt: '-rotate-1' },
] as const;

const noteTone = {
  cream: 'bg-cream',
  orange: 'bg-illiniOrange',
  white: 'bg-white',
  sand: 'bg-sand',
};

export function IdeaSection() {
  return (
    <section
      id="ideas"
      aria-labelledby="ideas-title"
      className="overflow-hidden bg-primaryNavy py-24 text-white sm:py-32"
    >
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow tone="dark">Your idea, our community</Eyebrow>
            <h2 id="ideas-title" className="font-editorial text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
              What do you want to make <span className="italic text-illiniOrange">happen?</span>
            </h2>
            <p className="mt-7 text-lg leading-8 text-white/80">
              Have a cause you care about? An event you wish existed? An idea you’ve never had the people to pursue?
            </p>
            <p className="mt-4 text-lg leading-8 text-white/80">
              Bring it to ICI. Find collaborators, build a team, and see what you can create together.
            </p>
            <ButtonLink href={pitchHref} className="mt-9">
              Pitch an Idea
            </ButtonLink>
            <p className="mt-5 max-w-md text-sm leading-6 text-white/60">
              Rough ideas are welcome. No proposal or business plan needed. We can’t promise funding, but we’ll help you
              find people and figure out next steps.
            </p>
          </div>

          {/* Idea board: example initiatives pinned up like notes. */}
          <div className="lg:col-span-7">
            <ul className="grid gap-5 sm:grid-cols-2" aria-label="Examples of initiatives students could start">
              {ideaNotes.map((note, index) => (
                <li key={note.kind}>
                  <Reveal delay={index * 0.07}>
                    <div
                      className={`relative rounded-md p-6 text-primaryNavy shadow-xl shadow-black/30 transition-transform duration-300 hover:rotate-0 sm:p-7 ${noteTone[note.tone]} ${note.tilt}`}
                    >
                      <span
                        className="absolute left-1/2 top-3 h-3 w-3 -translate-x-1/2 rounded-full bg-primaryNavy/70 ring-4 ring-primaryNavy/10"
                        aria-hidden="true"
                      />
                      <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-primaryNavy/75">{note.kind}</p>
                      <p className="mt-3 font-editorial text-2xl font-semibold italic leading-snug">{note.idea}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
              <li>
                <Reveal delay={0.3}>
                  <figure className="rotate-1 rounded-md bg-white p-3 pb-4 shadow-xl shadow-black/30">
                    <img
                      src={photos.valentinesSocial.src}
                      alt={photos.valentinesSocial.alt}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <figcaption className="mt-3 text-center font-editorial text-base italic text-primaryNavy">
                      Ideas start at a table like this
                    </figcaption>
                  </figure>
                </Reveal>
              </li>
              <li>
                <Reveal delay={0.36} className="h-full">
                  <a
                    href={pitchHref}
                    className="flex h-full min-h-40 -rotate-1 flex-col justify-center rounded-md border-2 border-dashed border-white/40 p-7 transition-colors hover:border-illiniOrange hover:bg-white/5"
                  >
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">Your turn</span>
                    <span className="mt-3 font-editorial text-2xl font-semibold italic text-white">
                      Your idea goes here.
                    </span>
                    <span className="mt-4 font-bold text-illiniOrange">Pitch it →</span>
                  </a>
                </Reveal>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Homepage: every kind of creative
// ---------------------------------------------------------------------------

const creatives = [
  {
    name: 'Artists & Designers',
    body: 'Create visuals, exhibitions, installations, and materials for community partners.',
    example: { label: 'A food drive flyer for Trinity Community Food Pantry', href: '/work/trinity-community-food-pantry' },
  },
  {
    name: 'Filmmakers & Photographers',
    body: 'Capture stories, document events, and help organizations communicate visually.',
  },
  {
    name: 'Writers & Storytellers',
    body: 'Develop campaigns, tell community stories, and help causes reach more people.',
  },
  {
    name: 'Marketers & Strategists',
    body: 'Help organizations connect with audiences, plan outreach, and tackle communication challenges.',
  },
  {
    name: 'Organizers & Leaders',
    body: 'Coordinate events, lead teams, build partnerships, and turn ambitious ideas into real experiences.',
    example: { label: 'The Earth Day Every Day exhibition', href: '/work/earth-day-every-day' },
  },
  {
    name: 'Entrepreneurs & Problem Solvers',
    body: 'Spot opportunities, propose initiatives, and find new ways to serve communities.',
    example: { label: 'Exploring community events with NoshBox', href: '/work/noshbox' },
  },
];

const interests = [
  'Illustration',
  'Graphic design',
  'Photography',
  'Film & video',
  'Writing',
  'Marketing',
  'Entrepreneurship',
  'Strategy',
  'Event production',
  'Community organizing',
];

export function CreativesSection() {
  return (
    <section id="creatives" aria-labelledby="creatives-title" className="bg-white py-24 sm:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              id="creatives-title"
              eyebrow="Every kind of creative"
              title={
                <>
                  There’s more than one way to <span className="italic text-orangeInk">create.</span>
                </>
              }
              intro="Whether you’re behind a camera, designing something new, building a campaign, organizing an event, or coming up with the next big idea, there’s a place for you here."
            />
          </div>
          <ul className="flex flex-wrap gap-2 lg:col-span-5 lg:justify-end" aria-label="Creative interests">
            {interests.map((interest, index) => (
              <li
                key={interest}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  index % 3 === 0
                    ? 'bg-illiniOrange text-primaryNavy'
                    : index % 3 === 1
                      ? 'bg-primaryNavy text-white'
                      : 'bg-sand text-primaryNavy'
                }`}
              >
                {interest}
              </li>
            ))}
            <li className="rounded-full px-4 py-2 text-sm font-semibold text-primaryNavy ring-1 ring-inset ring-primaryNavy/30">
              Whatever you’re into
            </li>
          </ul>
        </div>

        <ul className="mt-16 grid gap-x-16 md:grid-cols-2">
          {creatives.map((creative) => (
            <li key={creative.name} className="border-t border-primaryNavy/15 py-7">
              <h3 className="font-editorial text-2xl font-bold text-primaryNavy sm:text-3xl">{creative.name}</h3>
              <p className="mt-2 leading-7 text-slate-600">{creative.body}</p>
              {creative.example && (
                <p className="mt-3 text-sm">
                  <span className="mr-2 font-bold uppercase tracking-[0.14em] text-slate-500">In action</span>
                  <a href={creative.example.href} className="font-semibold text-orangeInk underline-offset-4 hover:underline">
                    {creative.example.label}
                  </a>
                </p>
              )}
            </li>
          ))}
        </ul>
        <p className="border-t border-primaryNavy/15 pt-7 font-editorial text-xl italic text-primaryNavy">
          These are examples, not departments. All majors and experience levels are welcome.
        </p>

        {/* Find your place: the conversion step right after seeing where you fit. */}
        <div className="mt-16 grid items-center gap-8 rounded-3xl bg-cream p-8 ring-1 ring-primaryNavy/10 sm:p-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="font-editorial text-4xl font-bold leading-tight text-primaryNavy sm:text-5xl">
              Find your place at ICI.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              Join a project, help organize an event, or bring an idea of your own. There’s no single way to get
              involved.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:items-end">
            <ButtonLink href={joinHref}>Join ICI</ButtonLink>
            <ArrowLink href={pitchHref}>Or pitch an idea</ArrowLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Homepage: life at ICI
// ---------------------------------------------------------------------------

export function LifeSection({ limit = 5 }: { limit?: number }) {
  const shown = communityPhotos.slice(0, limit);
  return (
    <section id="community" aria-labelledby="community-title" className="bg-cream py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="community-title"
            eyebrow="Life at ICI"
            title="The people behind the work."
            intro="Socials, tabling on the Quad, fundraisers, exhibitions, and a lot of making things together."
          />
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <ArrowLink href="/community">More photos</ArrowLink>
            <ArrowLink href="/events">Events & socials</ArrowLink>
          </div>
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

/** Real member quotes only. Renders nothing until stories are added in src/content/community.ts. */
export function MemberStories() {
  if (memberStories.length === 0) return null;
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

// ---------------------------------------------------------------------------
// Partner page: full partner list
// ---------------------------------------------------------------------------

export function PartnerList() {
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {partners.map((partner) => (
        <li key={partner.name}>
          <article className="flex h-full flex-col rounded-2xl bg-white p-7 ring-1 ring-primaryNavy/10">
            <h3 className="font-editorial text-2xl font-bold text-primaryNavy">{partner.name}</h3>
            <p className="mt-3 flex-1 leading-7 text-slate-600">{partner.description}</p>
            {(partner.projectSlug || partner.url) && (
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                {partner.projectSlug && <ArrowLink href={`/work/${partner.projectSlug}`}>See the project</ArrowLink>}
                {partner.url && <ArrowLink href={partner.url}>Website</ArrowLink>}
              </div>
            )}
          </article>
        </li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------------------
// Final call to action
// ---------------------------------------------------------------------------

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
            Have an idea? Bring it. Looking for something to be part of? Find it here. Join students creating new ways
            to support our communities.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href={joinHref} variant="navy">
              Join ICI
            </ButtonLink>
            <ButtonLink href={pitchHref} variant="secondary" className="border-primaryNavy/40 hover:bg-primaryNavy/5">
              Pitch an Idea
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
