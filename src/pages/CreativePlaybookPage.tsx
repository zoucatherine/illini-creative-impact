import { ArrowLink, ButtonLink, Container, Eyebrow, PhotoFrame, Reveal, StatusBadge } from '../components/ui';
import {
  featureStatusLabel,
  playbookContributions,
  playbookFeatures,
  playbookLenses,
  playbookSteps,
  type PlaybookFeature,
} from '../content/creativePlaybook';
import { photos } from '../content/photos';
import { site } from '../content/site';
import { useDocumentMeta } from '../lib/router';
import josephWangPortrait from '../assets/officer-portraits/joseph-wang.webp';

const joinLink = '/get-involved?interest=projects&project=creative-playbook#join';
const number = (index: number) => String(index + 1).padStart(2, '0');

export default function CreativePlaybookPage() {
  useDocumentMeta(
    'The Creative Playbook',
    'An upcoming biweekly series from Illini Creative Impact studying the decisions behind creative influence. Now recruiting student researchers, writers, and designers.',
  );

  // Only published features would get a date and a link; everything else is "on our radar".
  const radar = playbookFeatures.filter((feature) => feature.status !== 'published');

  return (
    <article>
      {/* 1. Hero */}
      <header className="bg-primaryNavy pb-20 pt-28 text-white sm:pt-32">
        <Container>
          <a
            href={joinLink}
            className="group mb-10 flex flex-col gap-3 rounded-2xl bg-illiniOrange px-6 py-5 text-primaryNavy transition-colors hover:bg-[#f08a3c] sm:flex-row sm:items-center sm:justify-between"
          >
            <span>
              <span className="block text-xs font-bold uppercase tracking-[0.2em]">Now recruiting contributors</span>
              <span className="mt-1 block font-editorial text-xl font-bold sm:text-2xl">
                Join the founding team.
              </span>
            </span>
            <span className="shrink-0 font-bold">
              Get involved{' '}
              <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </a>
          <a href="/events#projects" className="text-sm font-semibold text-white/70 hover:text-illiniOrange">
            ← All projects
          </a>
          <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-illiniOrange">Upcoming initiative</p>
                <StatusBadge label="Coming soon" tone="muted" onDark />
              </div>
              <h1 className="mt-5 font-editorial text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                The Creative <span className="italic text-illiniOrange">Playbook</span>
              </h1>
              <p className="mt-6 font-editorial text-2xl italic text-white sm:text-3xl">
                Great creativity doesn’t happen by accident.
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
                A biweekly series on how influential artists, designers, and entrepreneurs built their creative
                identities, and what we can learn from their decisions.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <img
                  src={josephWangPortrait}
                  alt=""
                  className="h-14 w-14 rounded-full border-2 border-illiniOrange/60 object-cover"
                />
                <p className="leading-6 text-white/80">
                  <span className="block text-xs font-bold uppercase tracking-[0.16em] text-white/60">Led by</span>
                  <span className="font-semibold text-white">Joseph Wang</span>
                </p>
              </div>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <ButtonLink href={joinLink}>Help Build This Series →</ButtonLink>
                <ButtonLink href="#concept" variant="onDark">
                  Explore the Concept ↓
                </ButtonLink>
              </div>
            </div>
            <div className="lg:col-span-5">
              <PhotoFrame
                slot={{ photo: photos.creativePlaybookCover }}
                className="aspect-[4/3] w-full rounded-2xl ring-1 ring-white/15 shadow-2xl shadow-black/30"
              />
            </div>
          </div>
        </Container>
      </header>

      {/* 2. The concept */}
      <section id="concept" aria-labelledby="concept-title" className="bg-cream py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>The concept</Eyebrow>
              <h2
                id="concept-title"
                className="font-editorial text-4xl font-bold leading-[1.05] tracking-tight text-primaryNavy sm:text-5xl lg:text-6xl"
              >
                Beyond the finished <span className="italic text-orangeInk">work.</span>
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="font-editorial text-2xl leading-[1.45] text-primaryNavy sm:text-3xl">
                We often recognize great creative work without understanding what made it possible.
              </p>
              <ul className="mt-10 space-y-6 border-l-2 border-illiniOrange pl-6 sm:pl-8">
                {[
                  'What made a particular artist instantly recognizable?',
                  'How did a designer turn an unconventional idea into an influential brand?',
                  'How did a musician build an entire creative world beyond their music?',
                ].map((question) => (
                  <li key={question} className="font-editorial text-xl italic leading-snug text-primaryNavy sm:text-2xl">
                    {question}
                  </li>
                ))}
              </ul>
              <p className="mt-10 text-lg leading-8 text-slate-600">
                Each edition studies the decisions behind creative influence. Not a formula, just better ways of thinking.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. The framework */}
      <section aria-labelledby="framework-title" className="bg-white py-20 sm:py-28">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>What we explore</Eyebrow>
            <h2
              id="framework-title"
              className="font-editorial text-4xl font-bold leading-[1.05] tracking-tight text-primaryNavy sm:text-5xl lg:text-6xl"
            >
              Four ways to understand creative influence.
            </h2>
          </div>
          <ol className="mt-14 grid gap-x-12 gap-y-14 md:grid-cols-2">
            {playbookLenses.map((lens, index) => (
              <li key={lens.name}>
                <Reveal delay={(index % 2) * 0.08}>
                  <div className="border-t-2 border-illiniOrange pt-6">
                    <p className="flex items-baseline gap-3">
                      <span className="font-editorial text-5xl font-bold italic text-orangeInk" aria-hidden="true">
                        {number(index)}
                      </span>
                      <span className="text-sm font-bold uppercase tracking-[0.2em] text-primaryNavy">
                        <span className="sr-only">Lens {index + 1}: </span>
                        {lens.name}
                      </span>
                    </p>
                    <h3 className="mt-4 font-editorial text-2xl font-bold italic text-primaryNavy sm:text-3xl">
                      {lens.question}
                    </h3>
                    <p className="mt-2 text-slate-600">{lens.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 4. On our radar */}
      {radar.length > 0 && (
        <section aria-labelledby="radar-title" className="bg-sand py-20 sm:py-28">
          <Container>
            <div className="max-w-3xl">
              <Eyebrow>On our radar</Eyebrow>
              <h2
                id="radar-title"
                className="font-editorial text-4xl font-bold leading-[1.05] tracking-tight text-primaryNavy sm:text-5xl lg:text-6xl"
              >
                Creative minds we’re exploring.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                From the streets of New York to the worlds of fashion, music, and immersive art, we’re considering our
                first creative figures. Each offers a different perspective on how ideas become influential.
              </p>
            </div>
            <ul className="mt-14 grid gap-6 md:grid-cols-2">
              {radar.map((feature, index) => (
                <li key={feature.name}>
                  <Reveal delay={(index % 2) * 0.08} className="h-full">
                    <FeatureCard feature={feature} />
                  </Reveal>
                </li>
              ))}
            </ul>
            <p className="mt-10 max-w-3xl text-sm leading-6 text-slate-600">
              These are potential subjects, not announced or finished features, and may change as the editorial team
              decides. Illini Creative Impact is not affiliated with or endorsed by these individuals or their
              organizations.
            </p>
          </Container>
        </section>
      )}

      {/* 5. Contributor recruitment */}
      <section aria-labelledby="contribute-title" className="bg-primaryNavy py-20 text-white sm:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow tone="dark">Help bring it to life</Eyebrow>
              <h2
                id="contribute-title"
                className="font-editorial text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
              >
                Help us tell the stories behind great <span className="italic text-illiniOrange">ideas.</span>
              </h2>
              <p className="mt-7 text-lg leading-8 text-white/80">
                We’re building the founding team. No expertise needed, just curiosity.
              </p>
              <ButtonLink href={joinLink} className="mt-9">
                Help Build The Creative Playbook →
              </ButtonLink>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/60">
                Ways to contribute · pick one or several
              </p>
              <ul className="mt-6 grid gap-x-10 gap-y-10 sm:grid-cols-2">
                {playbookContributions.map((item) => (
                  <li key={item.name} className="border-t border-white/20 pt-5">
                    <h3 className="font-editorial text-2xl font-bold">{item.name}</h3>
                    <p className="mt-3 leading-7 text-white/75">{item.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. How the series would work */}
      <section aria-labelledby="process-title" className="bg-cream py-20 sm:py-24">
        <Container>
          <h2 id="process-title" className="font-editorial text-4xl font-bold text-primaryNavy sm:text-5xl">
            From curiosity to a published story.
          </h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {playbookSteps.map((step, index) => (
              <li key={step.title} className="border-t-2 border-illiniOrange pt-6">
                <span className="font-editorial text-4xl font-bold italic text-orangeInk" aria-hidden="true">
                  {number(index)}
                </span>
                <h3 className="mt-2 font-editorial text-2xl font-bold text-primaryNavy">{step.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 italic text-slate-600">We’ll start publishing biweekly once our first features are ready.</p>
        </Container>
      </section>

      {/* 7. Closing call to action */}
      <section aria-labelledby="playbook-cta-title" className="bg-illiniOrange py-24 text-primaryNavy sm:py-28">
        <Container>
          <div className="max-w-4xl">
            <h2
              id="playbook-cta-title"
              className="font-editorial text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl"
            >
              The next great story could start with <span className="italic">your idea.</span>
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-8">
              Have a creative figure worth a closer look? Help shape our first editions.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
              <ButtonLink href={joinLink} variant="navy">
                Get Involved →
              </ButtonLink>
              <a
                href={site.social.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline-offset-4 hover:underline"
              >
                Or say hi on Discord
              </a>
            </div>
          </div>
        </Container>
      </section>
    </article>
  );
}

function FeatureCard({ feature }: { feature: PlaybookFeature }) {
  const published = feature.status === 'published' && feature.slug;
  return (
    <article className="flex h-full flex-col rounded-2xl bg-white p-7 ring-1 ring-primaryNavy/10 sm:p-9">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{feature.discipline}</p>
        <StatusBadge label={featureStatusLabel[feature.status]} tone="muted" />
      </div>
      {feature.image && (
        <figure className="mt-6">
          <img src={feature.image.photo.src} alt={feature.image.photo.alt} className="aspect-[4/3] w-full rounded-xl object-cover" />
          <figcaption className="mt-2 text-xs text-slate-500">{feature.image.credit}</figcaption>
        </figure>
      )}
      <h3 className="mt-6 font-editorial text-4xl font-bold leading-[1.05] tracking-tight text-primaryNavy sm:text-5xl">
        {feature.name}
      </h3>
      <p className="mt-3 font-editorial text-xl italic text-orangeInk">
        {feature.title}
      </p>
      <p className="mt-4 flex-1 leading-7 text-slate-600">{feature.summary}</p>
      <div className="mt-7 border-t border-primaryNavy/10 pt-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">The question</p>
        <p className="mt-2 font-editorial text-lg italic leading-snug text-primaryNavy">{feature.question}</p>
      </div>
      {published && (
        <div className="mt-6">
          <ArrowLink href={`/work/creative-playbook/${feature.slug}`}>Read the feature</ArrowLink>
        </div>
      )}
    </article>
  );
}
