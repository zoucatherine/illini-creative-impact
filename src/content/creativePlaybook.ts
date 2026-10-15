// The Creative Playbook: a planned biweekly editorial series (not launched yet).
// Edit this file to change the page at /work/creative-playbook.
//
// Features move through statuses as the team works on them. While a feature is
// 'proposed' or 'researching', the page shows it under "On our radar" with no date and
// no article link. Only add `publishedOn` and `slug` once a piece is actually published.
import type { Photo } from './photos';

export type FeatureStatus = 'proposed' | 'researching' | 'scheduled' | 'published';

export const featureStatusLabel: Record<FeatureStatus, string> = {
  proposed: 'Proposed subject',
  researching: 'In research',
  scheduled: 'Scheduled',
  published: 'Published',
};

export interface PlaybookFeature {
  /** Person, brand, or movement being studied. */
  name: string;
  /** Short discipline line, e.g. "Fashion · Design · Brand Strategy". */
  discipline: string;
  /** Working (or final) editorial title. */
  title: string;
  /** One or two sentences shown on the card. */
  summary: string;
  /** The central question the feature tries to answer. */
  question: string;
  status: FeatureStatus;
  /** Only with permission or a license, plus a visible credit. */
  image?: { photo: Photo; credit: string };
  /** ISO date. Only once confirmed. */
  publishedOn?: string;
  /** Article URL slug. Only once published. */
  slug?: string;
  /** Contributor names, once known and with their OK. */
  contributors?: string[];
  /** Research starting points. Not shown on the page yet. */
  sources?: Array<{ label: string; href: string }>;
}

/**
 * Features shown on the page. Empty for now, so the "On our radar" section is hidden.
 * To show candidates again, move entries from `candidateFeatures` into this list.
 */
export const playbookFeatures: PlaybookFeature[] = [];

/**
 * Possible subjects for the first editions, kept here but not shown on the site.
 * These are possibilities, not announced features.
 */
export const candidateFeatures: PlaybookFeature[] = [
  {
    name: 'Virgil Abloh',
    discipline: 'Fashion · Design · Brand Strategy',
    title: 'Redefining the Rules of Luxury',
    summary:
      'How did a designer trained in architecture combine streetwear, high fashion, music, and collaboration to challenge traditional luxury positioning?',
    question: 'How can changing the context of something familiar transform its perceived value?',
    status: 'proposed',
    sources: [
      {
        label: 'Harvard Gazette: Harvard welcomes Virgil Abloh for GSD lecture',
        href: 'https://news.harvard.edu/gazette/story/2017/11/harvard-welcomes-virgil-abloh-for-gsd-lecture/',
      },
      { label: 'Nike: Virgil Abloh x Nike “The Ten”', href: 'https://about.nike.com/en/newsroom/releases/virgil-abloh-nike-the-10' },
    ],
  },
  {
    name: 'Keith Haring',
    discipline: 'Art · Public Space · Social Impact',
    title: 'Art Beyond the Gallery',
    summary:
      'How did Keith Haring build one of the most recognizable visual languages in contemporary art while bringing his work into public spaces and connecting it to social causes?',
    question: 'What happens when creative work is designed to reach everyone, not just traditional gatekeepers?',
    status: 'proposed',
    sources: [
      { label: 'Keith Haring Foundation: Pop Shop', href: 'https://www.haring.com/!/pop-shop' },
      { label: 'Keith Haring Foundation', href: 'https://www.haring.com/kh_foundation/' },
    ],
  },
  {
    name: 'Yayoi Kusama',
    discipline: 'Visual Art · Identity · Experience Design',
    title: 'The Power of a Recognizable World',
    summary:
      'How did Kusama develop a deeply distinctive artistic language that carries across painting, sculpture, installation, and immersive experiences?',
    question: 'What makes a creative identity powerful enough to work across different media and generations?',
    status: 'proposed',
    sources: [
      { label: 'Hirshhorn Museum: Infinity Mirror Rooms', href: 'https://hirshhorn.si.edu/kusama/infinity-rooms' },
      {
        label: 'Fondation Louis Vuitton: Infinity Mirror Room',
        href: 'https://www.fondationlouisvuitton.fr/en/collection/artworks/infinity-mirror-room',
      },
    ],
  },
  {
    name: 'Tyler, the Creator',
    discipline: 'Music · Creative Direction · Entrepreneurship',
    title: 'Building an Entire Creative World',
    summary:
      'How did Tyler expand his creative identity beyond music into fashion, design, live experiences, and a recognizable cultural universe?',
    question: 'What can creators accomplish when their work becomes an interconnected world rather than a single product?',
    status: 'proposed',
    sources: [
      { label: 'Vogue: Golf Wang fall collection', href: 'https://www.vogue.com/article/tyler-the-creator-golf-wang-fall-collection' },
      {
        label: 'Vogue: Tyler, the Creator on delusion, gatekeeping, and Converse',
        href: 'https://www.vogue.com/article/tyler-the-creator-on-delusion-gatekeeping-latest-collaboration-with-converse',
      },
    ],
  },
];

/** The four recurring lenses every feature is structured around. */
export const playbookLenses = [
  {
    name: 'Identity',
    question: 'What makes them distinctive?',
    body: 'Their style, influences, and positioning.',
  },
  {
    name: 'Strategy',
    question: 'What decisions shaped their success?',
    body: 'Collaborations, distribution, and the bets that paid off.',
  },
  {
    name: 'Impact',
    question: 'What changed because of their work?',
    body: 'Their influence on culture, tradeoffs included.',
  },
  {
    name: 'Takeaways',
    question: 'What can we learn from them?',
    body: 'Lessons for our own projects and careers.',
  },
];

/** Ways to contribute. Not departments: people can do several. */
export const playbookContributions = [
  {
    name: 'Research & Strategy',
    body: 'Dig into creative figures and the choices behind their influence.',
  },
  {
    name: 'Writing & Storytelling',
    body: 'Turn research into clear, engaging stories.',
  },
  {
    name: 'Visual Design',
    body: 'Design the layouts and graphics for each feature.',
  },
  {
    name: 'Content & Distribution',
    body: 'Adapt features into Instagram carousels and short-form content.',
  },
];

export const playbookSteps = [
  {
    title: 'Pitch a creative mind',
    body: 'Suggest a person, brand, or movement worth studying.',
  },
  {
    title: 'Research the decisions',
    body: 'Find the key moments and an angle.',
  },
  {
    title: 'Tell the story',
    body: 'Write and design the feature together.',
  },
  {
    title: 'Share the insight',
    body: 'Publish it on ICI’s platforms.',
  },
];
