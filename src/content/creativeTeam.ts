// Creatives Team recruitment content, shown on the Get Involved page (#creative-team).
// The Creatives Team is a cross-project team for marketing, design, and storytelling.
// It is not a project, so it is not listed in projects.ts.

/** Where every Creatives Team CTA goes: the Creatives Team application (Google Form, opens in a new tab). */
export const creativeTeamHref =
  'https://docs.google.com/forms/d/e/1FAIpQLSf3UtnVTRHP7xU5a5_iTfE5O9vbiL4vx_ZWZVxXxZ58Ix_mSw/viewform?usp=header';

/**
 * Campaigns the Creatives Team can work on. Each one links to a project in projects.ts by slug,
 * which supplies the cover image and status pill. Add, remove, or reorder freely.
 */
export const creativeCampaigns = [
  {
    slug: 'art-markets',
    title: 'Hallo-Eve Art Mart',
    category: 'Event marketing',
    body: 'Get campus excited to show up: posters, social content, and short-form video.',
    tags: ['Event promotion', 'Social campaigns', 'Poster design', 'Photo & video'],
  },
  {
    slug: 'fall-exhibition',
    title: 'It’s Okay to Fall',
    category: 'Awareness campaign',
    body: 'Promote a mental health art showcase and invite students to share their stories.',
    tags: ['Campaign concepts', 'Visual storytelling', 'Artist outreach'],
  },
  {
    slug: 'trinity-community-food-pantry',
    title: 'Trinity Community Food Pantry',
    category: 'Community partnership',
    body: 'Help a food pantry reach more families with stronger stories and materials.',
    tags: ['Nonprofit storytelling', 'Flyer design', 'Outreach materials'],
  },
  {
    slug: 'creative-playbook',
    title: 'The Creative Playbook',
    category: 'Editorial & content',
    body: 'Launch our series on the strategies behind influential creatives.',
    tags: ['Editorial graphics', 'Instagram carousels', 'Content adaptation'],
  },
];

/** Flexible ways to contribute. Not departments: members mix and match. */
export const creativeAreas = [
  { name: 'Marketing & Strategy', body: 'Campaign ideas, messaging, and reaching the right people.' },
  { name: 'Design & Visuals', body: 'Posters, graphics, and campaign identities.' },
  { name: 'Content & Storytelling', body: 'Photos, video, writing, and social content.' },
  { name: 'Creative Direction', body: 'Turning rough concepts into cohesive campaigns.' },
];

export const creativeExpectations = [
  { name: 'Own a piece of the work', body: 'Contribute to at least one active campaign you care about.' },
  { name: 'Collaborate', body: 'Share ideas and give honest feedback.' },
  { name: 'Communicate', body: 'Stay responsive and follow through on what you commit to.' },
  { name: 'Keep experimenting', body: 'Pitch ideas and try new approaches.' },
];

export const creativeBenefits = [
  'Portfolio work from real campaigns',
  'Hands-on marketing, design, and storytelling skills',
  'Ownership and leadership experience',
  'Work with real community impact',
];
