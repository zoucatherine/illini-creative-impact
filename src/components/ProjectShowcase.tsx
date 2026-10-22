import { projects, type Project } from '../content/projects';
import { site } from '../content/site';
import { campusPhotos } from '../content/campusPhotos';
import { earthDayArtworks } from '../content/earthDayGallery';
import { ArtSlideshow } from './ArtSlideshow';
import { FallExhibitionPhoto, PhotoCredit } from './FallCampaign';
import { AccentTitle, ArrowLink, ButtonLink, PhotoFrame, Reveal, StatusBadge } from './ui';

/**
 * Editorial, alternating rows: the main showcase on the homepage and /work.
 * `compact` (homepage) keeps rows short; contribution details live on /work and project pages.
 */
export function ProjectShowcase({ items = projects, compact = false }: { items?: Project[]; compact?: boolean }) {
  return (
    <ol className={`mt-16 ${compact ? 'space-y-16 lg:space-y-20' : 'space-y-20 lg:space-y-28'}`}>
      {items.map((project, index) => {
        const flip = index % 2 === 1;
        // It’s Okay to Fall keeps the standard row, dressed in its event page’s look.
        const fall = project.slug === 'fall-exhibition';
        return (
          <li key={project.slug}>
            <Reveal>
              <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
                <div className={`lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
                  <a href={`/work/${project.slug}`} tabIndex={-1} aria-hidden="true" className="block">
                    {fall ? (
                      <FallExhibitionPhoto />
                    ) : project.slug === 'earth-day-every-day' ? (
                      // Show the submissions themselves rather than a photo of the exhibition.
                      <ArtSlideshow
                        artworks={earthDayArtworks}
                        className="aspect-[4/3] w-full rounded-2xl shadow-xl shadow-primaryNavy/10 sm:aspect-[16/10]"
                      />
                    ) : (
                      <PhotoFrame
                        slot={project.cover}
                        showCaption
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        className="aspect-[4/3] w-full rounded-2xl shadow-xl shadow-primaryNavy/10 transition-transform duration-500 hover:scale-[1.01] sm:aspect-[16/10]"
                      />
                    )}
                  </a>
                  {fall && (
                    <p className="mt-2 text-right">
                      <PhotoCredit photo={campusPhotos.unionQuadAutumn} label="The Illini Union" size="small" />
                    </p>
                  )}
                </div>

                <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-editorial text-2xl font-bold text-illiniOrange" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                      {project.category}
                    </span>
                  </div>
                  <ProjectBadges project={project} className="mt-4" />
                  <h3 className="mt-4 font-editorial text-3xl font-bold leading-tight tracking-tight text-primaryNavy sm:text-4xl">
                    <a href={`/work/${project.slug}`} className="hover:text-orangeInk">
                      <AccentTitle text={project.title} accent={project.titleAccent} />
                    </a>
                  </h3>
                  {fall && (
                    <p className="mt-3 font-editorial text-xl italic text-primaryNavy sm:text-2xl">
                      One campus. Many stories. One artwork.
                    </p>
                  )}
                  {/* The date panel sits on the photo, which is hidden from screen readers; say it here too. */}
                  {fall && <p className="sr-only">November 10, 2026, 10 AM to 8 PM, Illini Union, Ballroom C.</p>}
                  <p className="mt-4 text-lg leading-8 text-slate-600">
                    {compact ? (project.teaser ?? project.summary) : project.summary}
                  </p>
                  {project.lead && <LeadBubble lead={project.lead} coLead={project.coLead} className="mt-6" />}
                  {!compact && (
                    <div className="mt-6 border-t border-primaryNavy/10 pt-5">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                        What students contribute
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {project.contributions.slice(0, 3).map((item) => (
                          <li
                            key={item}
                            className="rounded-full bg-white px-3 py-1.5 text-sm text-primaryNavy ring-1 ring-primaryNavy/10"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
                    <div className="flex flex-wrap gap-3">
                      {project.primaryAction ? (
                        <ButtonLink href={project.primaryAction.href}>{project.primaryAction.label}</ButtonLink>
                      ) : (
                        <ButtonLink href={site.social.discord}>
                          <span>
                            Join<span className="sr-only"> {project.title}</span> on Discord
                          </span>
                        </ButtonLink>
                      )}
                      {project.submissionForm && (
                        <ButtonLink href={project.submissionForm.href} variant="secondary">
                          {project.submissionForm.label}
                        </ButtonLink>
                      )}
                    </div>
                    <ArrowLink href={`/work/${project.slug}`}>
                      <span>
                        {project.ctaLabel ?? 'Read more'}<span className="sr-only"> about {project.title}</span>
                      </span>
                    </ArrowLink>
                  </div>
                </div>
              </article>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}

function LeadBubble({
  lead,
  coLead,
  className = '',
}: {
  lead: NonNullable<Project['lead']>;
  coLead?: Project['coLead'];
  className?: string;
}) {
  const people = coLead ? [lead, coLead] : [lead];
  return (
    <div className={`inline-flex max-w-full items-center gap-3 rounded-full bg-white py-1.5 pl-1.5 pr-5 ring-1 ring-primaryNavy/10 ${className}`}>
      <span className="flex shrink-0 -space-x-3">
        {people.map((person) => (
          <img
            key={person.name}
            src={person.portrait}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-10 w-10 rounded-full object-cover ring-2 ring-white"
          />
        ))}
      </span>
      <p className="min-w-0 text-sm leading-5">
        <span className="block text-slate-600">
          Led by{' '}
          {people.map((person, index) => (
            <span key={person.name}>
              {index > 0 && ' & '}
              <span className="font-bold text-primaryNavy">{person.name}</span>
            </span>
          ))}
        </span>
        <a
          href={`mailto:${people.map((person) => person.email).join(',')}`}
          className="block truncate text-orangeInk hover:underline"
        >
          {coLead ? 'Email the leads' : lead.email}
        </a>
      </p>
    </div>
  );
}

function ProjectBadges({ project, className = '' }: { project: Project; className?: string }) {
  if (!project.badges?.length) return null;
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {project.badges.map((badge, index) => (
        <StatusBadge key={badge} label={badge} tone={index === 0 ? 'neutral' : 'muted'} />
      ))}
    </div>
  );
}

/** Compact card used for "more projects" lists. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-primaryNavy/10 transition-shadow hover:shadow-xl hover:shadow-primaryNavy/10">
      <PhotoFrame slot={project.cover} className="aspect-[16/10] w-full" sizes="(min-width: 768px) 33vw, 100vw" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{project.category}</span>
        </div>
        <ProjectBadges project={project} className="mt-3" />
        <h3 className="mt-3 font-editorial text-2xl font-bold text-primaryNavy">
          <a href={`/work/${project.slug}`} className="after:absolute after:inset-0 hover:text-orangeInk">
            <AccentTitle text={project.title} accent={project.titleAccent} />
          </a>
        </h3>
        <p className="mt-3 flex-1 leading-7 text-slate-600">{project.teaser ?? project.summary}</p>
      </div>
    </article>
  );
}
