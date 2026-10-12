import { projects, projectStatusLabel, type Project } from '../content/projects';
import { ArrowLink, PhotoFrame, Reveal, StatusBadge } from './ui';

export function ProjectStatusBadge({ project }: { project: Project }) {
  return (
    <StatusBadge
      label={project.statusLabel ?? projectStatusLabel[project.status]}
      tone={project.status === 'active' ? 'live' : project.status === 'in-development' ? 'muted' : 'neutral'}
    />
  );
}

/** Editorial, alternating rows: the main showcase on the homepage and /work. */
export function ProjectShowcase({ items = projects }: { items?: Project[] }) {
  return (
    <ol className="mt-16 space-y-20 lg:space-y-28">
      {items.map((project, index) => {
        const flip = index % 2 === 1;
        return (
          <li key={project.slug}>
            <Reveal>
              <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
                <a
                  href={`/work/${project.slug}`}
                  tabIndex={-1}
                  aria-hidden="true"
                  className={`block lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}
                >
                  <PhotoFrame
                    slot={project.cover}
                    showCaption
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="aspect-[4/3] w-full rounded-2xl shadow-xl shadow-primaryNavy/10 transition-transform duration-500 hover:scale-[1.01] sm:aspect-[16/10]"
                  />
                </a>
                <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-editorial text-2xl font-bold text-illiniOrange" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                      {project.category}
                    </span>
                    <ProjectStatusBadge project={project} />
                  </div>
                  <h3 className="mt-4 font-editorial text-3xl font-bold leading-tight tracking-tight text-primaryNavy sm:text-4xl">
                    <a href={`/work/${project.slug}`} className="hover:text-orangeInk">
                      {project.title}
                    </a>
                  </h3>
                  <p className="mt-4 text-lg leading-8 text-slate-600">{project.summary}</p>
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
                  <div className="mt-7">
                    <ArrowLink href={`/work/${project.slug}`}>
                      <span>
                        Read more<span className="sr-only"> about {project.title}</span>
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

/** Compact card used for "more projects" lists. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-primaryNavy/10 transition-shadow hover:shadow-xl hover:shadow-primaryNavy/10">
      <PhotoFrame slot={project.cover} className="aspect-[16/10] w-full" sizes="(min-width: 768px) 33vw, 100vw" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{project.category}</span>
          <ProjectStatusBadge project={project} />
        </div>
        <h3 className="mt-3 font-editorial text-2xl font-bold text-primaryNavy">
          <a href={`/work/${project.slug}`} className="after:absolute after:inset-0 hover:text-orangeInk">
            {project.title}
          </a>
        </h3>
        <p className="mt-3 flex-1 leading-7 text-slate-600">{project.summary}</p>
      </div>
    </article>
  );
}
