import { MemberStories } from '../components/sections';
import { ButtonLink, Container, Reveal } from '../components/ui';
import { communityPhotos } from '../content/community';
import { joinHref } from '../content/site';
import { useDocumentMeta } from '../lib/router';
import { PageHeader } from './Pages';

const neededPhotos = [
  'Behind-the-scenes project work',
  'Student artwork',
  'Fall Exhibition',
  'Trinity Community Food Pantry work',
];

// Served at /community (and the older /media URL).
export default function MediaPage() {
  useDocumentMeta(
    'Our Community',
    'Photos and stories from the members of Illini Creative Impact at UIUC.',
  );

  return (
    <>
      <PageHeader
        eyebrow="Our community"
        title={
          <>
            Where the work <span className="italic text-illiniOrange">happens.</span>
          </>
        }
        intro="Tabling on the Quad, socials, fundraisers, and the people who make our projects run."
      />

      <section aria-label="Photo gallery" className="bg-cream py-20 sm:py-24">
        <Container>
          <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {communityPhotos.map((item) => (
              <li key={item.caption} className="mb-4 break-inside-avoid">
                <Reveal>
                  <figure className="overflow-hidden rounded-2xl bg-white ring-1 ring-primaryNavy/10">
                    <img
                      src={item.photo.src}
                      alt={item.photo.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full"
                    />
                    <figcaption className="px-5 py-4 text-sm font-semibold text-primaryNavy">{item.caption}</figcaption>
                  </figure>
                </Reveal>
              </li>
            ))}
            {neededPhotos.map((label) => (
              <li
                key={label}
                className="placeholder-hatch mb-4 flex aspect-[4/3] break-inside-avoid flex-col items-center justify-center rounded-2xl border border-dashed border-primaryNavy/25 p-6 text-center"
              >
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Photo needed</span>
                <span className="mt-2 text-sm text-slate-600">{label}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-20 font-editorial text-3xl font-bold text-primaryNavy sm:text-4xl">Member stories</h2>
          <MemberStories />

          <div className="mt-16">
            <ButtonLink href={joinHref}>Join ICI</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
