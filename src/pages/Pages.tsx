import React from 'react';

interface PageContent {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  cards: Array<{ title: string; body: string }>;
}

const pageContent: Record<string, PageContent> = {
  '/about': {
    eyebrow: 'About us',
    title: 'Creativity with purpose.',
    highlight: 'purpose.',
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
    highlight: 'ideas',
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
    highlight: 'inspiration.',
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
    highlight: 'creativity',
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
    highlight: 'connection.',
    description:
      'Have a project idea, partnership opportunity, or question? We would love to hear from you and build something meaningful together.',
    cards: [
      { title: 'General questions', body: 'Reach out to learn more about our organization, meetings, and current projects.' },
      { title: 'Collaborate with us', body: 'We welcome proposals from student groups, campus organizations, and community partners.' },
      { title: 'Stay connected', body: 'Follow us on social media for announcements, event reminders, and new work.' },
    ],
  },
  '/teams': {
    eyebrow: 'Our teams',
    title: 'Find your creative people.',
    highlight: 'creative',
    description:
      'Bring your perspective to a team that matches your interests, from visual storytelling to strategy and community building.',
    cards: [
      { title: 'Creative direction', body: 'Shape visual ideas, campaigns, and experiences that express our collective voice.' },
      { title: 'Business strategy', body: 'Help projects grow through thoughtful planning, partnerships, and communication.' },
      { title: 'Community team', body: 'Create welcoming events and meaningful connections for every member.' },
    ],
  },
  '/faq': {
    eyebrow: 'FAQ',
    title: 'Questions welcome here.',
    highlight: 'welcome',
    description:
      'Get a quick introduction to membership, meetings, and the ways you can participate in Illini Creative Impact.',
    cards: [
      { title: 'Who can join?', body: 'Any Illinois student interested in creativity, business, or community is welcome.' },
      { title: 'Do I need experience?', body: 'Not at all. We value curiosity and enthusiasm as much as previous experience.' },
      { title: 'How do I get started?', body: 'Visit our Join page or connect with us on social media to find the next gathering.' },
    ],
  },
};

export const StarterPage: React.FC<{ path: string }> = ({ path }) => {
  const content = pageContent[path] ?? pageContent['/about'];
  const [titleBefore, titleAfter] = content.title.split(content.highlight);

  return (
    <section className="min-h-[calc(100svh-5rem)] bg-[#FDFBF7] px-6 py-24 text-[#131E38] sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-illiniOrange">
            {content.eyebrow}
          </p>
          <h1 className="font-editorial text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {titleBefore}
            <span className="box-decoration-clone rounded-sm bg-[#E87722]/35 px-1.5 py-0.5 italic text-[#131E38]">
              {content.highlight}
            </span>
            {titleAfter}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-700">
            {content.description}
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {content.cards.map((card) => (
            <article
              className="rounded-2xl border border-[#131E38]/10 bg-white p-8 shadow-lg shadow-[#131E38]/5"
              key={card.title}
            >
              <div className="mb-8 h-1 w-12 rounded-full bg-illiniOrange" />
              <h2 className="font-editorial text-2xl font-bold">{card.title}</h2>
              <p className="mt-4 leading-7 text-slate-700">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
