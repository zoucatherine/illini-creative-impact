import React from 'react';

interface PageContent {
  eyebrow: string;
  title: string;
  description: string;
  cards: Array<{ title: string; body: string }>;
}

const pageContent: Record<string, PageContent> = {
  '/about': {
    eyebrow: 'About us',
    title: 'Creativity with purpose.',
    description:
      'Illini Creative Impact brings students together to use design, storytelling, and collaboration to create meaningful change on campus and beyond.',
    cards: [
      { title: 'Our mission', body: 'We make creative work more accessible, collaborative, and connected to the needs of our community.' },
      { title: 'Our community', body: 'Students from every discipline are welcome, whether you are an experienced creator or just getting started.' },
      { title: 'Our impact', body: 'We turn ideas into events, campaigns, and partnerships that leave a positive mark.' },
    ],
  },
  '/join': {
    eyebrow: 'Join the community',
    title: 'Bring your ideas to life.',
    description:
      'Join a welcoming group of makers, organizers, and storytellers. Find your people, build your portfolio, and make an impact together.',
    cards: [
      { title: 'Attend a meeting', body: 'Meet the team and learn how to get involved at our next community gathering.' },
      { title: 'Share your skills', body: 'Contribute in design, photography, writing, event planning, social media, or any creative discipline.' },
      { title: 'Start something new', body: 'Pitch an idea and find collaborators to help turn it into a project.' },
    ],
  },
  '/events': {
    eyebrow: 'Events',
    title: 'Make space for inspiration.',
    description:
      'From hands-on workshops to campus showcases, our events are designed to connect people and spark new creative work.',
    cards: [
      { title: 'Creative workshops', body: 'Build practical skills through relaxed, beginner-friendly sessions led by fellow students.' },
      { title: 'Community socials', body: 'Connect with other creatives, share what you are working on, and find your next collaborator.' },
      { title: 'Campus showcases', body: 'Celebrate the work and ideas that are making a difference across the Illinois community.' },
    ],
  },
  '/media': {
    eyebrow: 'Media',
    title: 'See creativity in action.',
    description:
      'Explore stories, photos, and highlights from our community. This space will grow with every project and event we share.',
    cards: [
      { title: 'Project highlights', body: 'A closer look at the campaigns, installations, and collaborations created by our members.' },
      { title: 'Photo stories', body: 'Go behind the scenes at events and see the people who make our community special.' },
      { title: 'Member spotlights', body: 'Meet the students bringing their unique perspectives and talents to the group.' },
    ],
  },
  '/contact': {
    eyebrow: 'Contact',
    title: 'Let’s create a connection.',
    description:
      'Have a project idea, partnership opportunity, or question? We would love to hear from you and build something meaningful together.',
    cards: [
      { title: 'General questions', body: 'Reach out to learn more about our organization, meetings, and current projects.' },
      { title: 'Collaborate with us', body: 'We welcome proposals from student groups, campus organizations, and community partners.' },
      { title: 'Stay connected', body: 'Follow us on social media for announcements, event reminders, and new work.' },
    ],
  },
};

export const StarterPage: React.FC<{ path: string }> = ({ path }) => {
  const content = pageContent[path] ?? pageContent['/about'];

  return (
    <section className="starter-page">
      <div className="starter-page-intro">
        <p className="starter-page-eyebrow">{content.eyebrow}</p>
        <h1>{content.title}</h1>
        <p className="starter-page-description">{content.description}</p>
      </div>
      <div className="starter-page-cards">
        {content.cards.map((card) => (
          <article className="starter-page-card" key={card.title}>
            <h2>{card.title}</h2>
            <p>{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
