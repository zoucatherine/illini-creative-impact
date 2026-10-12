export const site = {
  name: 'Illini Creative Impact',
  shortName: 'ICI',
  formerName: 'Illini Art & Business Collective',
  belief: 'We believe creativity can drive change in our communities.',
  url: 'https://illini-creative-impact.vercel.app',
  social: {
    discord: 'https://discord.gg/9uBHgdJbQK',
    instagram: 'https://www.instagram.com/uiuc_creativeimpact/',
  },
  forms: {
    // See .env.example. Empty values disable submission with an explanatory notice.
    joinEndpoint: import.meta.env.VITE_JOIN_FORM_ENDPOINT as string | undefined,
    partnerEndpoint: import.meta.env.VITE_PARTNER_FORM_ENDPOINT as string | undefined,
    // Idea pitches go to our own relay (api/pitch.js), which posts them to Discord.
    ideaEndpoint: (import.meta.env.VITE_IDEA_FORM_ENDPOINT as string | undefined) || '/api/pitch',
  },
};

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Our Work' },
  { href: '/events', label: 'Events & Projects' },
  { href: '/get-involved', label: 'Get Involved' },
  { href: '/about', label: 'About' },
];

export const joinHref = '/get-involved#join';
export const pitchHref = '/pitch';
export const partnerHref = '/partner';
