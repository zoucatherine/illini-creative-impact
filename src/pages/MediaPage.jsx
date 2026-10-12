import { MemberStories } from '../components/sections';
import { ButtonLink, Container, Reveal } from '../components/ui';
import { communityPhotos } from '../content/community';
import { joinHref } from '../content/site';
import { useDocumentMeta } from '../lib/router';
import { PageHeader } from './Pages';

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
          </ul>

          <MemberStories />

          <div className="mt-16">
            <ButtonLink href={joinHref}>Join ICI</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
