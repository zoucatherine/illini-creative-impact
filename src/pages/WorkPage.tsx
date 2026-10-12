import { ProjectShowcase } from '../components/ProjectShowcase';
import { FinalCTA } from '../components/sections';
import { ArrowLink, Container } from '../components/ui';
import { proposeHref } from '../content/site';
import { useDocumentMeta } from '../lib/router';
import { PageHeader } from './Pages';

export default function WorkPage() {
  useDocumentMeta(
    'Our Work',
    'Community partnerships, signature events, and initiatives led by students from Illini Creative Impact at UIUC.',
  );

  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title={
          <>
            Projects with a <span className="italic text-illiniOrange">purpose.</span>
          </>
        }
        intro="Each project starts with a need: a partner who could use help, or a community that deserves a better event. Students take it from there."
      >
        <div className="mt-8">
          <ArrowLink href={proposeHref} tone="dark">
            Have an idea for the next one?
          </ArrowLink>
        </div>
      </PageHeader>
      <section className="bg-cream pb-24 pt-4 sm:pb-32">
        <Container>
          <ProjectShowcase />
        </Container>
      </section>
      <FinalCTA />
    </>
  );
}
