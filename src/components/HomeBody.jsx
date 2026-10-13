import { ProjectShowcase } from './ProjectShowcase';
import { CreativesSection, FinalCTA, IdeaSection, InDevelopmentStrip, LifeSection } from './sections';
import { Container, SectionHeading } from './ui';
import { projects } from '../content/projects';

// Homepage story: what we do (work), what you can do (ideas, creatives), who you'll do it with (life), join.
const featuredProjects = projects.filter((project) => project.status !== 'in-development');

export default function HomeBody() {
  return (
    <>
      <section id="work" aria-labelledby="work-title" className="bg-cream py-24 sm:py-32">
        <Container>
          <SectionHeading
            id="work-title"
            eyebrow="Our work"
            title="What we’re building."
            intro="Every project is student led, from first idea to finished work."
          />
          <ProjectShowcase items={featuredProjects} compact />
          <InDevelopmentStrip />
        </Container>
      </section>

      <IdeaSection />

      <CreativesSection />

      <LifeSection />

      <FinalCTA />
    </>
  );
}
