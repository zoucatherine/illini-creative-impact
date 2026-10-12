import { ProjectShowcase } from './ProjectShowcase';
import { CreativesSection, FinalCTA, IdeaSection, LifeSection, PartnerStrip } from './sections';
import { ArrowLink, Container, SectionHeading } from './ui';

// Homepage story: proof (our work), invitation (your idea), belonging (every kind of creative,
// find your place), people (life at ICI), then join.
export default function HomeBody() {
  return (
    <>
      <section id="work" aria-labelledby="work-title" className="bg-cream py-24 sm:py-32">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="work-title"
              eyebrow="Our work"
              title="What we’re building."
              intro="Partnerships, events, and initiatives run by students. Each one started with a real need."
            />
            <ArrowLink href="/work">All projects</ArrowLink>
          </div>
          <ProjectShowcase compact />
          <PartnerStrip />
        </Container>
      </section>

      <IdeaSection />

      <CreativesSection />

      <LifeSection />

      <FinalCTA />
    </>
  );
}
