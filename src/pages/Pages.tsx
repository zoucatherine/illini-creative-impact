import React from 'react';
import { useDocumentMeta } from '../lib/router';
import { ButtonLink, Container, Eyebrow } from '../components/ui';

/** Shared header for inner pages. Leaves room for the fixed navbar. */
export const PageHeader: React.FC<{
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
}> = ({ eyebrow, title, intro, children }) => (
  <section className="bg-primaryNavy pb-16 pt-36 text-white sm:pb-20 sm:pt-44">
    <Container>
      <div className="max-w-4xl">
        <Eyebrow tone="dark">{eyebrow}</Eyebrow>
        <h1 className="font-editorial text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {intro && <p className="mt-7 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">{intro}</p>}
        {children}
      </div>
    </Container>
  </section>
);

export const NotFoundPage: React.FC = () => {
  useDocumentMeta('Page not found', 'This page doesn’t exist.');
  return (
    <>
      <PageHeader
        eyebrow="404"
        title="We couldn’t find that page."
        intro="It may have moved during our redesign. Here are a few places to start."
      />
      <Container className="flex flex-wrap gap-4 py-16">
        <ButtonLink href="/">Home</ButtonLink>
        <ButtonLink href="/work" variant="secondary">
          Our Work
        </ButtonLink>
        <ButtonLink href="/get-involved" variant="secondary">
          Get Involved
        </ButtonLink>
      </Container>
    </>
  );
};
