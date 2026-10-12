import { motion } from 'framer-motion';
import presentationImage from '../assets/hero-images/presentation.jpg';
import businessImage from '../assets/hero-images/business.jpg';
import communityImage from '../assets/hero-images/community.jpg';
import exhibitGroupImage from '../assets/hero-images/exibit-group.jpg';
import showcaseImage from '../assets/hero-images/student-expo.jpg';

const milestones = [
  {
    date: 'Fall 2025',
    title: 'The Collective takes shape',
    description:
      'Students from creative and business backgrounds came together around a shared idea: meaningful work is stronger when disciplines collaborate.',
    image: communityImage,
    alt: 'Students gathered together at a community event',
  },
  {
    date: 'Spring 2026',
    title: 'Our first creative workshop',
    description:
      'A hands-on workshop introduced members to the process of turning early concepts into visual stories, campaigns, and experiences.',
    image: presentationImage,
    alt: 'Students presenting a creative project',
  },
  {
    date: 'Spring 2026',
    title: 'Art meets business strategy',
    description:
      'Members explored the strategy behind sustainable creative work, from audience development to partnerships and project planning.',
    image: businessImage,
    alt: 'Students collaborating on a business strategy project',
  },
  {
    date: 'Summer 2026',
    title: 'Building the community',
    description:
      'Gallery nights and social gatherings gave artists, organizers, and strategists a place to share ideas and find new collaborators.',
    image: exhibitGroupImage,
    alt: 'Students collaborating at an art exhibit',
  },
  {
    date: 'Fall 2026',
    title: 'Annual Creative Showcase',
    description:
      'The Collective celebrated its growing community with an evening of student work, live conversations, and new creative partnerships.',
    image: showcaseImage,
    alt: 'Students attending a campus showcase',
  },
];

export default function MediaPage() {
  return (
    <section className="min-h-[calc(100svh-5rem)] bg-[#FDFBF7] px-6 py-24 text-[#131E38] sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <header className="max-w-3xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-illiniOrange">
            Our story
          </p>
          <h1 className="font-editorial text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            A history of{' '}
            <span className="box-decoration-clone rounded-sm bg-[#E87722]/20 px-1.5 py-0.5 italic">
              making.
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-700">
            Follow the milestones, workshops, and gallery nights that have shaped
            Illini Creative Impact.
          </p>
        </header>

        <div className="relative mx-auto mt-20 max-w-5xl pl-10 sm:pl-12">
          <div
            className="absolute bottom-0 left-3 top-0 w-1 rounded-full bg-[#E87722] sm:left-5"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {milestones.map((milestone) => (
              <motion.article
                key={`${milestone.date}-${milestone.title}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, ease: 'easeOut' }}
                className="relative w-full"
              >
                <div className="relative grid w-full overflow-hidden rounded-2xl border border-[#131E38]/10 bg-white shadow-md md:grid-cols-2">
                  <span
                    className="absolute left-[-2.45rem] top-8 h-4 w-4 rounded-full border-4 border-[#FDFBF7] bg-[#E87722]"
                    aria-hidden="true"
                  />
                  <img
                    src={milestone.image}
                    alt={milestone.alt}
                    className="h-80 w-full object-cover object-top md:h-full md:min-h-[300px]"
                  />
                  <div className="p-7 md:p-8">
                    <span className="inline-flex rounded-full border border-illiniOrange/30 bg-illiniOrange/10 px-4 py-2 text-sm font-bold text-illiniOrange">
                      {milestone.date}
                    </span>
                    <h2 className="mt-5 font-editorial text-2xl font-bold">{milestone.title}</h2>
                    <p className="mt-4 leading-7 text-slate-700">{milestone.description}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
