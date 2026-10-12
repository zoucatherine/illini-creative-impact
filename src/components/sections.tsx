import { memberStories } from '../content/community';
import { partners } from '../content/partners';
import { projects } from '../content/projects';
import { photos, type Photo } from '../content/photos';
import { joinHref, pitchHref, site } from '../content/site';
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
// Homepage: smaller line for initiatives still in development
// ---------------------------------------------------------------------------

export function InDevelopmentStrip() {
  const developing = projects.filter((project) => project.status === 'in-development');
  if (developing.length === 0) return null;
  return (
    <div className="mt-20 flex flex-col gap-4 border-t border-primaryNavy/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
      <ul className="space-y-2">
        {developing.map((project) => (
          <li key={project.slug} className="text-slate-600">
            <span className="mr-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">In development</span>
            <a
              href={`/work/${project.slug}`}
              className="font-semibold text-primaryNavy underline-offset-4 hover:text-orangeInk hover:underline"
            >
              {project.title}
            </a>
            <span className="hidden md:inline">: {project.teaser}</span>
          </li>
        ))}
      </ul>
      <ArrowLink href="/work">All projects</ArrowLink>
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
              A cause you care about. An event you wish existed. A project you’ve always wanted to start.
            </p>
            <p className="mt-4 text-lg leading-8 text-white/80">
              Bring your idea to ICI. We’ll help you find collaborators and take the first steps.
            </p>
            <ButtonLink href={pitchHref} className="mt-9">
              Pitch an Idea
            </ButtonLink>
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
                  <div className="flex h-full min-h-40 -rotate-1 flex-col justify-center rounded-md border-2 border-dashed border-white/40 p-7">
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">Your turn</span>
                    <span className="mt-3 font-editorial text-3xl font-semibold italic text-white">
                      Your idea goes here.
                    </span>
                  </div>
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
// Homepage: whatever you create, bring it here
// ---------------------------------------------------------------------------

const disciplines = [
  { label: 'Art & Design', style: 'text-primaryNavy' },
  { label: 'Film & Photography', style: 'italic text-orangeInk' },
  { label: 'Writing', style: 'text-primaryNavy' },
  { label: 'Marketing', style: 'rounded-full bg-illiniOrange px-[0.45em] text-primaryNavy' },
  { label: 'Entrepreneurship', style: 'italic text-primaryNavy' },
  { label: 'Event Planning', style: 'text-orangeInk' },
  { label: 'Strategy & Organizing', style: 'rounded-full bg-primaryNavy px-[0.45em] text-white' },
];

export function CreativesSection() {
  return (
    <section id="creatives" aria-labelledby="creatives-title" className="bg-white py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Every kind of creative</Eyebrow>
            <h2
              id="creatives-title"
              className="font-editorial text-4xl font-bold leading-[1.05] tracking-tight text-primaryNavy sm:text-5xl"
            >
              Whatever you create, bring it here.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              From filmmakers and artists to marketers, writers, and entrepreneurs. There’s room for your talents at
              ICI.
            </p>
            <p className="mt-6 font-bold text-primaryNavy">All majors. All experience levels.</p>
          </div>

          {/* Disciplines set as one editorial, wrapping line of type. */}
          <ul
            className="flex flex-wrap items-baseline gap-x-5 gap-y-3 font-editorial text-3xl font-bold leading-tight tracking-tight sm:text-5xl lg:col-span-8 xl:text-6xl"
            aria-label="Creative interests welcome at ICI"
          >
            {disciplines.map((discipline, index) => (
              <li key={discipline.label} className="flex items-baseline gap-x-5">
                <span
                  className={`inline-block transition-transform duration-300 hover:-rotate-2 ${discipline.style}`}
                >
                  {discipline.label}
                </span>
                {index < disciplines.length - 1 && (
                  <span className="text-illiniOrange/60" aria-hidden="true">
                    /
                  </span>
                )}
              </li>
            ))}
            <li>
              <span className="inline-block rounded-full px-[0.45em] italic text-primaryNavy/70 ring-2 ring-inset ring-primaryNavy/25">
                and whatever you’re into
              </span>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Get Involved page: how different skills contribute
// ---------------------------------------------------------------------------

const skillRoles = [
  {
    name: 'Artists & Designers',
    body: 'Create visuals, exhibitions, installations, and materials for community partners.',
    example: { label: 'A food drive flyer for Trinity Community Food Pantry', href: '/work/trinity-community-food-pantry' },
  },
  { name: 'Filmmakers & Photographers', body: 'Capture stories, document events, and help organizations communicate visually.' },
  { name: 'Writers & Storytellers', body: 'Develop campaigns, tell community stories, and help causes reach more people.' },
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

export function SkillRoles() {
  return (
    <ul className="grid gap-x-16 md:grid-cols-2">
      {skillRoles.map((role) => (
        <li key={role.name} className="border-t border-primaryNavy/15 py-7">
          <h3 className="font-editorial text-2xl font-bold text-primaryNavy">{role.name}</h3>
          <p className="mt-2 leading-7 text-slate-600">{role.body}</p>
          {role.example && (
            <p className="mt-3 text-sm">
              <span className="mr-2 font-bold uppercase tracking-[0.14em] text-slate-500">In action</span>
              <a href={role.example.href} className="font-semibold text-orangeInk underline-offset-4 hover:underline">
                {role.example.label}
              </a>
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------------------
// Homepage: life at ICI
// ---------------------------------------------------------------------------

const lifeGallery: Array<{ photo: Photo; caption: string; span: string }> = [
  { photo: photos.quadSelfie, caption: 'On the Main Quad', span: 'col-span-2 row-span-2' },
  { photo: photos.artExhibition, caption: 'Student artwork', span: 'row-span-2' },
  { photo: photos.stickerSale, caption: 'Sticker sale fundraiser', span: '' },
  { photo: photos.valentinesSocial, caption: 'Valentine’s social', span: '' },
  { photo: photos.studentExpo, caption: 'Student expo', span: 'col-span-2' },
  { photo: photos.quadDay2026, caption: 'Quad Day 2026', span: 'col-span-2' },
];

export function LifeSection() {
  return (
    <section id="community" aria-labelledby="community-title" className="bg-cream py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="community-title"
            eyebrow="Life at ICI"
            title="The people behind the work."
            intro="From late night planning to campus socials, the best part of ICI is the people you create with."
          />
          <ArrowLink href="/community">More photos</ArrowLink>
        </div>

        {/* Varied tile sizes; captions appear on hover or focus to keep the photos front and center. */}
        <ul className="mt-14 grid auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:gap-4 lg:auto-rows-[13rem] lg:grid-cols-4">
          {lifeGallery.map((item) => (
            <li key={item.caption} className={`group relative overflow-hidden rounded-2xl bg-sand ${item.span}`}>
              <img
                src={item.photo.src}
                alt={item.photo.alt}
                loading="lazy"
                decoding="async"
                style={{ objectPosition: item.photo.position }}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <p className="absolute bottom-3 left-3 rounded-full bg-primaryNavy/80 px-3 py-1 text-xs font-semibold text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
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
    <section aria-labelledby="final-cta-title" className="overflow-hidden bg-illiniOrange py-24 text-primaryNavy sm:py-32">
      <Container className="grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Eyebrow>
            <span className="text-primaryNavy">{site.name}</span>
          </Eyebrow>
          <h2
            id="final-cta-title"
            className="font-editorial text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
          >
            There’s always more good to be <span className="italic">done.</span>
          </h2>
          <p className="mt-8 font-editorial text-2xl font-semibold leading-snug sm:text-3xl">
            Find your people. Build something together. <span className="italic">Make it matter.</span>
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

        {/* A loose stack of real photos to close on the people, not another paragraph. */}
        <div className="relative hidden h-[26rem] lg:col-span-5 lg:block" aria-hidden="true">
          {[
            { photo: photos.valentinesSocial, style: 'left-0 top-6 w-64 -rotate-6' },
            { photo: photos.quadSelfie, style: 'right-0 top-0 w-64 rotate-3' },
            { photo: photos.drawingTable, style: 'left-20 bottom-0 w-60 rotate-2' },
          ].map(({ photo, style }) => (
            <img
              key={photo.src}
              src={photo.src}
              alt=""
              loading="lazy"
              decoding="async"
              className={`absolute aspect-[4/3] rounded-md border-[10px] border-white object-cover shadow-2xl shadow-primaryNavy/30 ${style}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
