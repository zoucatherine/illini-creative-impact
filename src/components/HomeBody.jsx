import exhibitGroupImage from '../assets/hero-images/exibit-group.jpg';
import presentationImage from '../assets/hero-images/presentation.jpg';
import communityImage from '../assets/hero-images/community.jpg';
import businessImage from '../assets/hero-images/business.jpg';

const tracks = [
  {
    title: 'Creative Projects',
    image: presentationImage,
    imageAlt: 'Students presenting a creative project',
    description:
      'Turn bold ideas into thoughtful campaigns, experiences, and visual work that makes an impact.',
  },
  {
    title: 'Business & Strategy',
    image: businessImage,
    imageAlt: 'Students collaborating on business strategy',
    description:
      'Build the planning, communication, and strategic skills that help creative ideas thrive.',
  },
  {
    title: 'Community',
    image: communityImage,
    imageAlt: 'Members gathering together as a creative community',
    description:
      'Find collaborators, share your perspective, and grow with a welcoming community of creators.',
  },
];

export default function HomeBody() {
  return (
    <div className="bg-[#FDFBF7] text-[#131E38]">
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2 lg:gap-24">
          <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-illiniOrange">
            About us
          </p>
          <h2 className="max-w-lg font-editorial text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="italic">
              Where Creativity Meets{' '}
              <span className="box-decoration-clone rounded-sm bg-[#E87722]/35 px-1.5 py-0.5 text-[#131E38]">
                Strategy
              </span>
            </span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-700">
            Illini Art &amp; Business Collective bridges art and business to help
            students transform creative thinking into meaningful action. We make
            room for experimentation, collaboration, and ideas that move
            communities forward.
          </p>
          <a
            href="/about"
            className="mt-8 inline-flex font-bold text-illiniOrange transition-colors hover:text-[#131E38]"
          >
            Learn more about us <span aria-hidden="true" className="ml-2">-&gt;</span>
          </a>
          </div>

          <div className="relative min-h-[24rem] md:min-h-[30rem]">
            <img
              src={presentationImage}
              alt="Students presenting a creative project"
              className="h-full min-h-[24rem] w-[88%] rounded-2xl object-cover shadow-xl md:min-h-[30rem]"
            />
            <img
              src={exhibitGroupImage}
              alt="Students collaborating at a creative exhibit"
              className="absolute bottom-0 right-0 h-44 w-2/5 rounded-2xl border-8 border-[#FDFBF7] object-cover shadow-xl md:h-56"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#131E38]/70 via-transparent to-transparent" />
            <p className="absolute bottom-6 left-6 max-w-xs text-lg font-semibold text-white drop-shadow-lg">
              Ideas are stronger when we build them together.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-[#131E38]/10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-illiniOrange">
              What we do
            </p>
            <h2 className="font-editorial text-4xl font-extrabold tracking-tight sm:text-5xl">
              Find your track.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              Explore the ways you can contribute, learn, and make an impact
              through the collective.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {tracks.map((track) => (
              <article
                key={track.title}
                className="overflow-hidden rounded-2xl border border-[#131E38]/10 bg-white shadow-lg shadow-[#131E38]/5 transition-transform duration-200 hover:-translate-y-1"
              >
                <img
                  src={track.image}
                  alt={track.imageAlt}
                  className="h-40 w-full object-cover"
                />
                <div className="p-8">
                  <div className="mb-6 h-1 w-12 rounded-full bg-illiniOrange" />
                  <h3 className="text-2xl font-bold">
                    {track.title === 'Business & Strategy' ? (
                      <>
                        Business &amp; Strategy
                      </>
                    ) : (
                      track.title
                    )}
                  </h3>
                  <p className="mt-4 leading-7 text-slate-700">{track.description}</p>
                  <a
                    href="/join"
                    className="mt-7 inline-flex font-bold text-illiniOrange transition-colors hover:text-[#131E38]"
                  >
                    Get involved <span aria-hidden="true" className="ml-2">-&gt;</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
