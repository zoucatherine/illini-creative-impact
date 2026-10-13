import { ProjectCard } from '../components/ProjectShowcase';
import { AccentTitle, ArrowLink, ButtonLink, Container, ContentNeeded, Eyebrow, PhotoFrame, Reveal } from '../components/ui';
import { getProject, projects } from '../content/projects';
import { useDocumentMeta } from '../lib/router';
import { NotFoundPage } from './Pages';

export default function ProjectPage({ slug }: { slug: string }) {
  const project = getProject(slug);
  useDocumentMeta(project?.title ?? 'Page not found', project?.summary ?? 'This page doesn’t exist.');

  if (!project) return <NotFoundPage />;

  const others = projects.filter((item) => item.slug !== project.slug);
  const joinLink = `/get-involved?interest=projects&project=${project.slug}#join`;

  return (
    <article>
      <header className="bg-primaryNavy pb-16 pt-36 text-white sm:pt-44">
        <Container>
          <a href="/events#projects" className="text-sm font-semibold text-white/70 hover:text-illiniOrange">
            ← All projects
          </a>
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-bold uppercase tracking-[0.16em] text-illiniOrange">
                  {project.category}
                </span>
              </div>
              <h1 className="mt-5 font-editorial text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                <AccentTitle text={project.title} accent={project.titleAccent} />
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">{project.summary}</p>
              {project.link && (
                <ButtonLink href={project.link.href} className="mt-8">
                  {project.link.label}
                </ButtonLink>
              )}
            </div>
            <div className="lg:col-span-5">
              <PhotoFrame slot={project.cover} showCaption className="aspect-[4/3] w-full rounded-2xl" />
            </div>
          </div>
        </Container>
      </header>

      <div className="bg-cream py-20 sm:py-28">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="space-y-16 lg:col-span-8">
              <section aria-labelledby="overview">
                <Eyebrow>Overview</Eyebrow>
                <h2 id="overview" className="sr-only">
                  Overview
                </h2>
                <p className="font-editorial text-2xl leading-[1.45] text-primaryNavy sm:text-3xl">{project.overview}</p>
              </section>

              <section aria-labelledby="need">
                <h2 id="need" className="font-editorial text-3xl font-bold text-primaryNavy">
                  The need
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">{project.need}</p>
              </section>

              <section aria-labelledby="contributions">
                <h2 id="contributions" className="font-editorial text-3xl font-bold text-primaryNavy">
                  What ICI students contribute
                </h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {project.contributions.map((item) => (
                    <li key={item} className="flex gap-3 rounded-xl bg-white p-4 ring-1 ring-primaryNavy/10">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-illiniOrange" aria-hidden="true" />
                      <span className="text-primaryNavy">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="gallery">
                <h2 id="gallery" className="font-editorial text-3xl font-bold text-primaryNavy">
                  Photos & work samples
                </h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {project.gallery.map((slot, index) => (
                    <li key={index} className={index === 0 ? 'sm:col-span-2' : ''}>
                      <Reveal>
                        <PhotoFrame
                          slot={slot}
                          showCaption
                          className={`w-full rounded-2xl ${index === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}
                        />
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </section>

              {project.sections?.map((section) => (
                <section key={section.title} aria-label={section.title}>
                  <h2 className="font-editorial text-3xl font-bold text-primaryNavy">{section.title}</h2>
                  <div className="mt-4">
                    {section.body && <p className="text-lg leading-8 text-slate-600">{section.body}</p>}
                    {section.placeholder && <ContentNeeded>{section.placeholder}</ContentNeeded>}
                    {section.link && (
                      <div className="mt-4">
                        <ArrowLink href={section.link.href}>{section.link.label}</ArrowLink>
                      </div>
                    )}
                  </div>
                </section>
              ))}
            </div>

            <aside className="lg:col-span-4">
              <div className="space-y-6 lg:sticky lg:top-28">
                {project.partner && (
                  <div className="rounded-2xl bg-white p-7 ring-1 ring-primaryNavy/10">
                    <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Partner</h2>
                    <p className="mt-2 font-semibold text-primaryNavy">{project.partner}</p>
                  </div>
                )}
                <div className="rounded-2xl bg-primaryNavy p-7 text-white">
                  <h2 className="font-editorial text-2xl font-bold">Get involved</h2>
                  <p className="mt-3 leading-7 text-white/80">{project.involvement}</p>
                  <ButtonLink href={joinLink} className="mt-6 w-full">
                    I’m interested
                  </ButtonLink>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </div>

      <section aria-labelledby="more-projects" className="bg-white py-20 sm:py-24">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="more-projects" className="font-editorial text-3xl font-bold text-primaryNavy sm:text-4xl">
              More of our work
            </h2>
            <ArrowLink href="/events#projects">All projects</ArrowLink>
          </div>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {others.map((item) => (
              <li key={item.slug}>
                <ProjectCard project={item} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </article>
  );
}
