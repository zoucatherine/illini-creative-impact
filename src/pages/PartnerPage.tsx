import { PartnerForm } from '../components/forms';
import { Container, Eyebrow } from '../components/ui';
import { partners } from '../content/partners';
import { useDocumentMeta } from '../lib/router';
import { PageHeader } from './Pages';

const steps = [
  {
    title: 'Tell us what you need',
    body: 'A few sentences about the project, the people it serves, and any timeline.',
  },
  {
    title: 'We talk it through',
    body: 'A student from our external relations team follows up to understand the request and ask questions.',
  },
  {
    title: 'We decide together',
    body: 'If it’s a good fit for what students can take on, we put together a team. If not, we’ll tell you honestly.',
  },
];

export default function PartnerPage() {
  useDocumentMeta(
    'Partner With ICI',
    'Local nonprofits and community organizations can reach out to Illini Creative Impact with projects, needs, and ideas to collaborate.',
  );
  const activePartners = partners.filter((partner) => partner.status === 'active');

  return (
    <>
      <PageHeader
        eyebrow="Community partnerships"
        title={
          <>
            Have a need? <span className="italic text-illiniOrange">Let’s talk.</span>
          </>
        }
        intro="Local nonprofits, community organizations, and other groups can reach out with a project, a need, or an idea to collaborate. We’re a student-led organization, eager to help where we can."
      />

      <section aria-labelledby="how-it-works" className="bg-cream py-20 sm:py-24">
        <Container>
          <h2 id="how-it-works" className="font-editorial text-4xl font-bold text-primaryNavy">
            How it works
          </h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="rounded-2xl bg-white p-7 ring-1 ring-primaryNavy/10">
                <span className="font-editorial text-4xl font-bold italic text-illiniOrange" aria-hidden="true">
                  {index + 1}
                </span>
                <h3 className="mt-3 font-editorial text-2xl font-bold text-primaryNavy">{step.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 max-w-3xl rounded-2xl bg-sand p-6 leading-7 text-primaryNavy">
            <strong>A note on expectations:</strong> ICI members are students volunteering their time, not a
            professional agency. We can’t guarantee we’ll take on every request, and timelines depend on the academic
            calendar. What we can promise is to take your need seriously and be straightforward with you.
          </div>
          {activePartners.length > 0 && (
            <p className="mt-8 text-slate-600">
              Current partners:{' '}
              {activePartners.map((partner, index) => (
                <span key={partner.name}>
                  {index > 0 && ', '}
                  <a
                    href={partner.projectSlug ? `/work/${partner.projectSlug}` : '/#partners'}
                    className="font-bold text-orangeInk underline-offset-4 hover:underline"
                  >
                    {partner.name}
                  </a>
                </span>
              ))}
            </p>
          )}
        </Container>
      </section>

      <section id="inquiry" aria-labelledby="inquiry-title" className="bg-white py-20 sm:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>Partnership inquiry</Eyebrow>
              <h2 id="inquiry-title" className="font-editorial text-4xl font-bold leading-tight text-primaryNavy sm:text-5xl">
                Tell us about your project
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Share as much or as little as you know right now. Rough ideas are welcome.
              </p>
            </div>
            <div className="rounded-3xl bg-cream p-6 ring-1 ring-primaryNavy/10 sm:p-10 lg:col-span-8">
              <PartnerForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
