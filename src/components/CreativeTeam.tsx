import {
  creativeAreas,
  creativeBenefits,
  creativeCampaigns,
  creativeExpectations,
  creativeTeamHref,
} from '../content/creativeTeam';
import { getProject } from '../content/projects';
import { ArrowLink, ButtonLink, Container, Eyebrow, PhotoFrame, Reveal, StatusBadge } from './ui';

const number = (index: number) => String(index + 1).padStart(2, '0');

/** Creatives Team recruitment block for the Get Involved page. */
export function CreativeTeamSection() {
  return (
    <div id="creative-team">
      {/* Intro */}
      <section aria-labelledby="creative-team-title" className="bg-primaryNavy py-20 text-white sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow tone="dark">Creatives Team · Recruiting</Eyebrow>
            <h2
              id="creative-team-title"
              className="font-editorial text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
            >
              Make something people <span className="italic text-illiniOrange">show up for.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-lg leading-8 text-white/80">
              We’re looking for marketers, designers, and content creators to tell ICI’s stories and launch campaigns
              that get people involved.
            </p>
            <ButtonLink href={creativeTeamHref} className="mt-8">
              Join the Creatives Team →
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* What you'll work on */}
      <section aria-labelledby="creative-work-title" className="bg-cream py-20 sm:py-28">
        <Container>
          <Eyebrow>What you’ll work on</Eyebrow>
          <h2
            id="creative-work-title"
            className="font-editorial text-4xl font-bold leading-[1.05] tracking-tight text-primaryNavy sm:text-5xl"
          >
            Real projects. Real audiences. <span className="italic text-orangeInk">Real impact.</span>
          </h2>
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {creativeCampaigns.map((campaign, index) => {
              const project = getProject(campaign.slug);
              return (
                <li key={campaign.slug}>
                  <Reveal delay={(index % 2) * 0.08} className="h-full">
                    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-primaryNavy/10 sm:flex-row">
                      {project && (
                        <PhotoFrame
                          slot={project.cover}
                          sizes="(min-width: 768px) 20vw, 100vw"
                          className="aspect-[16/10] w-full shrink-0 sm:aspect-auto sm:w-2/5"
                        />
                      )}
                      <div className="flex flex-1 flex-col p-6">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                            {campaign.category}
                          </span>
                          {project?.badges?.[0] && <StatusBadge label={project.badges[0]} />}
                        </div>
                        <h3 className="mt-3 font-editorial text-2xl font-bold text-primaryNavy">
                          <a href={`/work/${campaign.slug}`} className="after:absolute after:inset-0 hover:text-orangeInk">
                            {campaign.title}
                          </a>
                        </h3>
                        <p className="mt-2 leading-7 text-slate-600">{campaign.body}</p>
                        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Creative opportunities">
                          {campaign.tags.map((tag) => (
                            <li key={tag} className="rounded-full bg-sand px-3 py-1 text-sm text-primaryNavy">
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Ways to contribute + expectations, side by side */}
      <section aria-label="How the Creatives Team works" className="bg-white py-20 sm:py-28">
        <Container className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="font-editorial text-4xl font-bold leading-tight text-primaryNavy">
              There’s more than one way to be creative.
            </h2>
            <p className="mt-3 text-slate-600">Not departments. Mix and match.</p>
            <ul className="mt-8">
              {creativeAreas.map((area) => (
                <li key={area.name} className="border-t border-primaryNavy/15 py-5">
                  <h3 className="font-editorial text-xl font-bold text-primaryNavy">{area.name}</h3>
                  <p className="mt-1 text-slate-600">{area.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow>What we ask of you</Eyebrow>
            <h2 className="font-editorial text-4xl font-bold leading-tight text-primaryNavy">
              Bring your ideas. <span className="italic text-orangeInk">Follow through.</span>
            </h2>
            <p className="mt-3 text-slate-600">No experience required. Pick projects that fit your interests and schedule.</p>
            <ol className="mt-8 space-y-6">
              {creativeExpectations.map((item, index) => (
                <li key={item.name} className="flex gap-5">
                  <span className="font-editorial text-3xl font-bold italic text-illiniOrange" aria-hidden="true">
                    {number(index)}
                  </span>
                  <div>
                    <h3 className="font-editorial text-xl font-bold text-primaryNavy">{item.name}</h3>
                    <p className="mt-1 text-slate-600">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Benefits + CTA */}
      <section aria-labelledby="creative-cta-title" className="bg-illiniOrange py-20 text-primaryNavy sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <h2
              id="creative-cta-title"
              className="font-editorial text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl"
            >
              Your next creative project <span className="italic">starts here.</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8">
              Designing for years or trying it for the first time, we’d love to see what you bring.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
              <ButtonLink href={creativeTeamHref} variant="navy">
                Join the Creatives Team →
              </ButtonLink>
              <span className="text-sm font-semibold">No prior experience required.</span>
            </div>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm font-bold uppercase tracking-[0.16em]">Create work you’re proud to show</p>
            <ul className="mt-5 space-y-3">
              {creativeBenefits.map((benefit) => (
                <li key={benefit} className="flex gap-3 text-lg font-semibold">
                  <span aria-hidden="true">→</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </div>
  );
}

/** Small secondary invitation under the pathway cards. */
export function IdeaInvitation({ href }: { href: string }) {
  return (
    <div className="mt-10 flex flex-col gap-3 border-t border-primaryNavy/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-slate-600">
        <span className="font-semibold text-primaryNavy">Have an idea of your own?</span> A cause, a partnership, or an
        event you wish existed. Bring it to ICI and find people to build it with.
      </p>
      <div className="shrink-0">
        <ArrowLink href={href}>Share your idea</ArrowLink>
      </div>
    </div>
  );
}
