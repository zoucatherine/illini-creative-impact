export const site = {
  name: 'Illini Creative Impact',
  shortName: 'ICI',
  formerName: 'Illini Art & Business Collective',
  belief: 'We believe creativity can drive change in our communities.',
  url: 'https://illini-creative-impact.vercel.app',
  social: {
    discord: 'https://discord.com/invite/9uBHgdJbQK',
    // TODO: update if the Instagram handle changes with the rebrand.
    instagram: 'https://www.instagram.com/iabc_uiuc/',
  },
  forms: {
    // See .env.example. Empty values disable submission with an explanatory notice.
    joinEndpoint: import.meta.env.VITE_JOIN_FORM_ENDPOINT as string | undefined,
    partnerEndpoint: import.meta.env.VITE_PARTNER_FORM_ENDPOINT as string | undefined,
    // Idea pitches fall back to the membership endpoint so one Formspree form can collect both.
    ideaEndpoint: (import.meta.env.VITE_IDEA_FORM_ENDPOINT || import.meta.env.VITE_JOIN_FORM_ENDPOINT) as
      | string
      | undefined,
  },
};

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Our Work' },
  { href: '/events', label: 'Events' },
  { href: '/get-involved', label: 'Get Involved' },
  { href: '/about', label: 'About' },
];

export const joinHref = '/get-involved#join';
export const pitchHref = '/pitch';
export const partnerHref = '/partner';
