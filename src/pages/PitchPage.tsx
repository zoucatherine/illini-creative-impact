import { IdeaForm } from '../components/forms';
import { ArrowLink, Container, Eyebrow } from '../components/ui';
import { joinHref } from '../content/site';
import { useDocumentMeta } from '../lib/router';
import { PageHeader } from './Pages';

const steps = [
  {
    title: 'Tell us the idea',
    body: 'A name and a few sentences. It doesn’t need to be polished or fully figured out.',
  },
  {
    title: 'We talk it through',
    body: 'An officer reaches out to hear more and think about what it would take.',
  },
  {
    title: 'Find your people',
    body: 'We share it with members who might want to help, and you start building it together.',
  },
];

export default function PitchPage() {
  useDocumentMeta(
    'Pitch an Idea',
    'Have a cause, event, or project you want to make happen? Pitch it to Illini Creative Impact and find students to build it with.',
  );

  return (
    <>
      <PageHeader
        eyebrow="Your idea, our community"
        title={
          <>
            What do you want to make <span className="italic text-illiniOrange">happen?</span>
          </>
        }
        intro="A fundraiser, a campaign, a documentary, a new campus event, help for a local nonprofit. Bring it to ICI, find collaborators, and see what you can create together."
      />

      <section aria-labelledby="how-pitching-works" className="bg-cream py-20 sm:py-24">
        <Container>
          <h2 id="how-pitching-works" className="font-editorial text-4xl font-bold text-primaryNavy">
            How it works
          </h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="border-t-2 border-illiniOrange pt-6">
                <span className="font-editorial text-4xl font-bold italic text-orangeInk" aria-hidden="true">
                  {index + 1}
                </span>
                <h3 className="mt-2 font-editorial text-2xl font-bold text-primaryNavy">{step.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 max-w-3xl rounded-2xl bg-sand p-6 leading-7 text-primaryNavy">
            <strong>Being upfront:</strong> ICI is a student organization. We can’t promise funding or a ready made team,
            and not every idea will be a fit. What we can offer is encouragement, people who care, and a community to
            organize with.
          </p>
        </Container>
      </section>

      <section id="pitch" aria-labelledby="pitch-title" className="bg-white py-20 sm:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>Pitch an idea</Eyebrow>
              <h2 id="pitch-title" className="font-editorial text-4xl font-bold leading-tight text-primaryNavy sm:text-5xl">
                Start with a few sentences.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                No proposal or business plan needed. Early, rough ideas are exactly what this is for.
              </p>
              <p className="mt-6 text-slate-600">
                Don’t have an idea yet? <ArrowLink href={joinHref}>Join ICI instead</ArrowLink>
              </p>
            </div>
            <div className="rounded-3xl bg-cream p-6 ring-1 ring-primaryNavy/10 sm:p-10 lg:col-span-8">
              <IdeaForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
