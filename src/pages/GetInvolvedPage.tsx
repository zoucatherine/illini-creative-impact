import { JoinForm } from '../components/forms';
import { Pathways, SkillRoles } from '../components/sections';
import { ArrowLink, Container, Eyebrow } from '../components/ui';
import { site } from '../content/site';
import { useDocumentMeta } from '../lib/router';
import { PageHeader } from './Pages';

const faqs = [
  {
    question: 'Who can join?',
    answer:
      'Any UIUC student, in any major. Business, art, engineering, or anything else. What matters is that you want to contribute.',
  },
  {
    question: 'Do I need experience?',
    answer:
      'No. You’ll learn by working alongside other members on real projects. Curiosity and following through count for more than a portfolio.',
  },
  {
    question: 'Do I have to pick one team?',
    answer: 'No. The pathways are starting points, not departments. Plenty of members work on a project and help with events.',
  },
  {
    question: 'I have an idea for a project. What happens next?',
    answer:
      'Share it on our Share an Idea page. We’ll talk it through with you, and if it fits, help you find members to build it with.',
  },
];

export default function GetInvolvedPage({ search }: { search: string }) {
  useDocumentMeta(
    'Get Involved',
    'Join Illini Creative Impact: work on community projects, help run events, or start your own initiative. Every major and experience level welcome.',
  );
  const params = new URLSearchParams(search);
  const interest = params.get('interest') ?? undefined;
  const project = params.get('project') ?? undefined;

  return (
    <>
      <PageHeader
        eyebrow="Get involved"
        title={
          <>
            Find your place at <span className="italic text-illiniOrange">ICI.</span>
          </>
        }
        intro="Join a project, help organize an event, or bring an idea of your own. There’s no single way to get involved, and every major and experience level is welcome."
      />

      <section aria-label="Ways to participate" className="bg-cream py-20 sm:py-24">
        <Container>
          <Pathways headingLevel="h2" />
        </Container>
      </section>

      <section aria-labelledby="skills-title" className="bg-white py-20 sm:py-24">
        <Container>
          <h2 id="skills-title" className="font-editorial text-4xl font-bold text-primaryNavy sm:text-5xl">
            Where your skills fit
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Examples, not departments. Most projects need a mix of all of these.
          </p>
          <div className="mt-10">
            <SkillRoles />
          </div>
        </Container>
      </section>

      <section id="join" aria-labelledby="join-title" className="bg-white py-20 sm:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <Eyebrow>Membership interest form</Eyebrow>
                <h2 id="join-title" className="font-editorial text-4xl font-bold leading-tight text-primaryNavy sm:text-5xl">
                  Join Illini Creative Impact
                </h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">
                  Tell us a little about yourself and what you’d like to do. This isn’t an application; it just helps
                  us connect you with the right people and projects.
                </p>
                <p className="mt-6 text-slate-600">
                  Prefer to just say hi?{' '}
                  <a
                    href={site.social.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-orangeInk underline-offset-4 hover:underline"
                  >
                    Join our Discord
                  </a>
                  .
                </p>
              </div>
            </div>
            <div className="rounded-3xl bg-cream p-6 ring-1 ring-primaryNavy/10 sm:p-10 lg:col-span-8">
              <JoinForm initialInterest={interest} initialProject={project} />
            </div>
          </div>
        </Container>
      </section>

      <section id="faq" aria-labelledby="faq-title" className="bg-cream py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <h2 id="faq-title" className="font-editorial text-4xl font-bold text-primaryNavy lg:col-span-4">
              Questions
            </h2>
            <div className="divide-y divide-primaryNavy/10 border-y border-primaryNavy/10 lg:col-span-8">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold text-primaryNavy">
                    {faq.question}
                    <span className="text-2xl text-orangeInk transition-transform group-open:rotate-45" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-2xl leading-7 text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
          <div className="mt-12">
            <ArrowLink href="/partner">Representing an organization? Partner with ICI</ArrowLink>
          </div>
        </Container>
      </section>
    </>
  );
}
