import { ArtScroller } from '../components/ArtScroller';
import { FinalCTA } from '../components/sections';
import { ArrowLink, ButtonLink, Container, Eyebrow, PhotoFrame } from '../components/ui';
import { earthDayArtworks, earthDayGalleryUrl } from '../content/earthDayGallery';
import { photos } from '../content/photos';
import { openRoles } from '../content/roles';
import { useDocumentMeta } from '../lib/router';
import { PageHeader } from './Pages';

// Our Work is the portfolio: things students have made. Initiatives themselves live on /events.
export default function WorkPage() {
  useDocumentMeta(
    'Our Work',
    'Artwork from the Earth Day Every Day contest, design work for Trinity Community Food Pantry, and open roles at Illini Creative Impact.',
  );

  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title={
          <>
            Things we’ve <span className="italic text-illiniOrange">made.</span>
          </>
        }
        intro="Art, design, and the work that comes out of our projects."
      >
        <div className="mt-8">
          <ArrowLink href="/events#projects" tone="dark">
            See our current projects
          </ArrowLink>
        </div>
      </PageHeader>

      <section aria-labelledby="earth-day-title" className="overflow-hidden bg-cream py-20 sm:py-28">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <Eyebrow>Earth Day Every Day</Eyebrow>
              <h2
                id="earth-day-title"
                className="font-editorial text-4xl font-bold leading-tight text-primaryNavy sm:text-5xl"
              >
                Art from across the world.
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Selected entries from the art contest we started with Visionary Arts. Artists of all ages, from Illinois
                to Croatia, Brazil, and Nigeria.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              <ArrowLink href={earthDayGalleryUrl}>See every entry</ArrowLink>
              <ArrowLink href="/work/earth-day-every-day">About the project</ArrowLink>
            </div>
          </div>
          <div className="mt-10">
            <ArtScroller artworks={earthDayArtworks} label="Earth Day Every Day artworks" />
          </div>
        </Container>
      </section>

      <section aria-labelledby="trinity-work-title" className="bg-white py-20 sm:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>Trinity Community Food Pantry</Eyebrow>
              <h2
                id="trinity-work-title"
                className="font-editorial text-4xl font-bold leading-tight text-primaryNavy sm:text-5xl"
              >
                From first draft to final flyer.
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Jasmine Liu designed this flyer for the Riverside High Snack Bag Food Drive, listing the items the pantry
                needed most.
              </p>
              <div className="mt-6">
                <ArrowLink href="/work/trinity-community-food-pantry">About the partnership</ArrowLink>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-5 lg:col-span-7">
              <PhotoFrame
                slot={{ photo: photos.trinityFlyerProcess, caption: 'Draft and final' }}
                showCaption
                className="aspect-[4/3] rounded-2xl ring-1 ring-primaryNavy/10 sm:col-span-3"
              />
              <PhotoFrame
                slot={{ photo: photos.trinityFlyer, caption: 'Final flyer' }}
                showCaption
                className="aspect-[3/4] rounded-2xl ring-1 ring-primaryNavy/10 sm:col-span-2"
              />
            </div>
          </div>
        </Container>
      </section>

      {openRoles.length > 0 && (
        <section aria-labelledby="roles-title" className="bg-primaryNavy py-20 text-white sm:py-24">
          <Container>
            <Eyebrow tone="dark">Now recruiting</Eyebrow>
            <h2 id="roles-title" className="sr-only">
              Open roles
            </h2>
            <ul className="space-y-6">
              {openRoles.map((role) => (
                <li
                  key={role.title}
                  className="grid gap-6 border-t border-white/15 pt-8 lg:grid-cols-12 lg:items-center"
                >
                  <div className="lg:col-span-8">
                    <h3 className="font-editorial text-4xl font-bold sm:text-5xl">
                      {role.title} <span className="italic text-illiniOrange">for {role.forWho}</span>
                    </h3>
                    <p className="mt-4 max-w-2xl text-lg leading-8 text-white/80">{role.description}</p>
                  </div>
                  <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:items-end">
                    <ButtonLink href={role.href}>I’m interested</ButtonLink>
                    {role.projectSlug && (
                      <ArrowLink href={`/work/${role.projectSlug}`} tone="dark">
                        About the project
                      </ArrowLink>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <FinalCTA />
    </>
  );
}
