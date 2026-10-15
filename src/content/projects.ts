// Project content. Edit this file to update the Our Work showcase and project pages.
// Anything not yet confirmed is left as a `placeholder` so the page labels it clearly
// instead of inventing details. Replace placeholders with real content when you have it.
import { photos, type Photo } from './photos';
import alexZhangPortrait from '../assets/officer-portraits/alex-zhang.webp';
import alyanAjaniPortrait from '../assets/officer-portraits/alyan-ajani.webp';
import ameliaCarpenterPortrait from '../assets/officer-portraits/amelia-carpenter.webp';
import josephWangPortrait from '../assets/officer-portraits/joseph-wang.webp';
import mayumiCaisipPortrait from '../assets/officer-portraits/mayumi-caisip.webp';

export interface ProjectLead {
  name: string;
  portrait: string;
  /** Public contact email (same as on the About page). */
  email: string;
}

// Initiative leads. Emails match the officer list on the About page.
const leads = {
  alex: { name: 'Alex Zhang', portrait: alexZhangPortrait, email: 'alexz10@illinois.edu' },
  alyan: { name: 'Alyan Ajani', portrait: alyanAjaniPortrait, email: 'alyanaa2@illinois.edu' },
  amelia: { name: 'Amelia Carpenter', portrait: ameliaCarpenterPortrait, email: 'acarp@illinois.edu' },
  joseph: { name: 'Joseph Wang', portrait: josephWangPortrait, email: 'josephwang87654321@gmail.com' },
  mayumi: { name: 'Mayumi Caisip', portrait: mayumiCaisipPortrait, email: 'mcaisip2@illinois.edu' },
} satisfies Record<string, ProjectLead>;

export type ProjectStatus = 'active' | 'recurring' | 'upcoming' | 'in-development';

export const projectStatusLabel: Record<ProjectStatus, string> = {
  active: 'Active partnership',
  recurring: 'Recurring event',
  upcoming: 'Coming soon',
  'in-development': 'In development',
};

export interface PhotoSlot {
  /** A real photo. Omit and set `placeholder` when the photo still needs to be provided. */
  photo?: Photo;
  caption?: string;
  /** Describes the photo that should go here. Shown on a labeled placeholder. */
  placeholder?: string;
}

export interface ProjectSection {
  title: string;
  body?: string;
  link?: { href: string; label: string };
  /** Rendered as a labeled "content needed" block when the section has no real content yet. */
  placeholder?: string;
}

export interface Project {
  slug: string;
  title: string;
  /** A word in the title to render with the autumn treatment (see AccentTitle). */
  titleAccent?: string;
  category: string;
  status: ProjectStatus;
  /** Overrides the default status label, e.g. "Fall semester event". */
  statusLabel?: string;
  /** One or two sentences for cards and the showcase. */
  summary: string;
  /** One short line for the homepage showcase. */
  teaser?: string;
  /** Small status pills shown on cards, e.g. ["Coming soon", "Recruiting contributors"]. */
  badges?: string[];
  /** Label for the card link. Defaults to "Read more". */
  ctaLabel?: string;
  /** Student leading this initiative, shown as a "Led by" bubble. */
  lead?: ProjectLead;
  cover: PhotoSlot;
  overview: string;
  /** The community need or opportunity being addressed. */
  need: string;
  /** What ICI students contribute. */
  contributions: string[];
  gallery: PhotoSlot[];
  /** Extra project-specific sections (gallery, submissions, etc.). */
  sections?: ProjectSection[];
  /** How a student can get involved with this project specifically. */
  involvement: string;
  partner?: string;
  /** Main external link, e.g. a contest website or gallery. */
  link?: { href: string; label: string };
}

export const projects: Project[] = [
  {
    slug: 'trinity-community-food-pantry',
    title: 'Trinity Community Food Pantry',
    category: 'Community partnership',
    status: 'active',
    partner: 'Trinity Community Food Pantry',
    lead: leads.alyan,
    teaser:
      'Helping feed hungry kids in Jacksonville, Florida. Our flyers and signage help the pantry reach more families, and our new grant writing team is working to keep its shelves full.',
    summary:
      'Helping a food pantry feed hungry kids and families in Jacksonville, Florida. Students design the flyers, signage, and food drive materials that bring in donations, and are building a grant writing team to help keep it running.',
    cover: { photo: photos.trinityFlyer, caption: 'Food drive flyer by Jasmine Liu' },
    overview:
      'Trinity Community Food Pantry feeds hungry kids and families in Jacksonville, Florida. ICI handles the creative side of keeping it running: how the pantry presents itself, how donors and neighbors find it, and how word of each food drive gets out.',
    need:
      'A food pantry’s volunteers spend their time on food and people. Clear signage, consistent branding, and polished promotional materials still matter, because they help people know when and how to get support. They are just hard to prioritize. That is work students can take on.',
    contributions: [
      'Branding and visual identity work',
      'Posters and promotional materials',
      'Signage for the pantry space',
      'Other design requests as the pantry’s needs come up',
      'Grant research and writing, guided by UIUC’s Effective Grant Writing course (now recruiting)',
    ],
    gallery: [
      { photo: photos.trinityFlyerProcess, caption: 'Snack Bag Food Drive flyer, draft and final, by Jasmine Liu' },
      { photo: photos.trinityFlyer, caption: 'Final flyer by Jasmine Liu' },
      { placeholder: 'Signage installed at the pantry, or students working on designs' },
    ],
    sections: [
      {
        title: 'Work samples',
        body: 'Jasmine Liu designed this flyer for the Riverside High Snack Bag Food Drive, listing the items the pantry needed most.',
      },
      {
        title: 'Learn grant writing on a real cause',
        body: 'Our grant writers don’t have to start as experts. Members can take UIUC’s Effective Grant Writing course and work on the pantry’s grants alongside it: when the class covers a letter of inquiry or using Census data to make the case for a nonprofit, you do the same work for Trinity. The course’s professor has offered to help guide the effort, and may support it more directly if enough ICI members take the class together.',
      },
    ],
    involvement:
      'Join the project team if you want to design, write, or help manage requests from the pantry. No design portfolio required. There is room for people who can organize, communicate, and follow through.',
  },
  {
    slug: 'earth-day-every-day',
    title: 'Earth Day Every Day Art Contest',
    category: 'Art contest & exhibition',
    status: 'active',
    statusLabel: 'Online gallery open',
    partner: 'Visionary Arts',
    lead: leads.alex,
    link: { href: 'https://earthdayeveryday.artcall.org/pages/web-gallery', label: 'View the online gallery' },
    teaser:
      'Art that keeps the planet in view all year, not just one day. What started as a contest with Visionary Arts grew into a movement across the United States and Europe.',
    summary:
      'Art that keeps the planet in view all year, not just one day. We helped start it with Visionary Arts, and it grew into a contest and exhibition with artists of every age across the United States and in Europe.',
    // TODO: confirm this photo is from the Earth Day Every Day exhibition.
    cover: { photo: photos.artExhibition, caption: 'Exhibition at Illinois' },
    overview:
      'ICI helped start Earth Day Every Day with Visionary Arts, an art academy in San Jose, California. What began as an art contest became a movement that spread across the United States and into Europe. It is open to artists of all ages, and every submission is shown in an online gallery.',
    need:
      'Earth Day is one day on the calendar. This contest asks artists to keep the planet in view all year, and gives people of every age a public place to share that work, both online and in person.',
    contributions: [
      'Promoting the call for submissions on campus',
      'Organizing the exhibition at the University of Illinois',
      'Coordinating with Visionary Arts',
      'Running the exhibition days',
    ],
    gallery: [
      // TODO: confirm these photos are from the Earth Day Every Day exhibition.
      { photo: photos.artExhibition, caption: 'Student work on display' },
      { photo: photos.certificates, caption: 'Certificate presentation' },
      { placeholder: 'Artwork from the exhibition' },
    ],
    sections: [
      {
        title: 'Online gallery',
        body: 'Every submission is exhibited online, and visitors can vote for their favorites.',
        link: { href: 'https://earthdayeveryday.artcall.org/pages/web-gallery', label: 'Browse the gallery' },
      },
      {
        title: '2026 exhibitions',
        body: 'The 2026 artwork was shown at the University of Illinois on April 18 and 19, at Earth Day celebrations in Mountain View and Santa Clara County, and at Visionary Arts in San Jose.',
        link: { href: 'https://earthdayeveryday.artcall.org/', label: 'Contest website' },
      },
      {
        title: 'Highlights',
        placeholder: 'Add winners and standout pieces from the Illinois exhibition, with artist permission.',
      },
    ],
    involvement:
      'Help with the next round: promotion, outreach to student artists, and running the exhibition on campus. Follow ICI on Instagram or join the Discord to hear when it opens.',
  },
  {
    slug: 'fall-exhibition',
    title: 'It’s Okay to Fall',
    titleAccent: 'Fall',
    category: 'Fall exhibition',
    status: 'recurring',
    // TODO: confirm whether this runs every fall.
    statusLabel: 'Fall semester event',
    lead: leads.amelia,
    teaser:
      'A mental health exhibition built around one shared artwork that everyone adds to, because it’s okay to stumble and no one should have to get back up alone.',
    summary:
      'A mental health exhibition built around one shared artwork that every attendee adds to. A reminder that it’s okay to stumble, and an easy way into a conversation that matters.',
    // Chosen to reflect the theme (making art together, no pressure), not taken at the exhibition.
    cover: { photo: photos.drawingTable, caption: 'Making art together' },
    overview:
      'It’s Okay to Fall is our fall exhibition, organized around mental health awareness. The name plays on the season and on the idea that it’s okay to stumble. At its center is a collaborative community artwork: a piece that attendees add to themselves.',
    need:
      'Mental health is easier to talk about when there is a shared, easy way in. Making something together, and seeing what others contributed, opens that conversation.',
    contributions: [
      'Curating the exhibition and recruiting student artists',
      'Designing and facilitating the collaborative artwork',
      'Promotion, event logistics, and running the event',
    ],
    gallery: [
      { placeholder: 'The collaborative community artwork' },
      { placeholder: 'Student artwork on display' },
      { placeholder: 'Attendees adding to the community piece' },
    ],
    sections: [
      {
        title: 'The community artwork',
        body: 'Attendees are invited to add to a shared piece during the event. The finished artwork reflects everyone who took part, not a single artist.',
      },
      {
        title: 'Take part',
        placeholder: 'Add this year’s date, location, and how artists can submit work once confirmed.',
      },
    ],
    involvement:
      'Help curate, recruit artists, design the community artwork, or run the event. Artists interested in exhibiting can reach out through the interest form.',
  },
  {
    slug: 'art-markets',
    title: 'Student Art Markets',
    titleAccent: 'Art',
    category: 'Art markets',
    lead: leads.mayumi,
    status: 'recurring',
    teaser:
      'Markets where student artists sell their work to real buyers, every medium welcome. Next up: the Hallo-Eve Art Mart on the Main Quad, October 30, 10am to 3pm.',
    summary:
      'ICI runs art markets where student artists table and sell their own work, every medium welcome. Real buyers, a real audience, and a chance to earn from what you make. Next up: the Hallo-Eve Art Mart, October 30, 10am to 3pm, on the Main Quad at the Union.',
    cover: { photo: photos.halloEveFlyer, caption: 'Hallo-Eve Art Mart, October 30' },
    overview:
      'Our art markets turn campus into a place where student artists can sell their work directly to visitors. We find the space, recruit the artists, and run the day, so artists can focus on what they make.',
    need: 'Student artists need places to show and sell what they make. A market gives them a table, an audience, and a chance to earn from their work, and gives everyone else a reason to buy from the artists around them.',
    contributions: [
      'Recruiting and coordinating artist tables',
      'Finding venues and planning logistics',
      'Promotion and flyer design',
      'Running the markets on the day',
    ],
    gallery: [{ placeholder: 'Artist tables' }, { placeholder: 'Visitors browsing the market' }],
    sections: [
      {
        title: 'Next up: Hallo-Eve Art Mart',
        body: 'October 30, 10am to 3pm, on the Main Quad by the Illini Union. Artists of all mediums can sign up to sell their work.',
      },
    ],
    involvement:
      'We’re recruiting people to help run our markets: recruit artists, plan logistics, promote, and staff the day. Artists interested in a table can reach out through the interest form.',
  },
  {
    // Has its own page (src/pages/CreativePlaybookPage.tsx); series content lives in content/creativePlaybook.ts.
    slug: 'creative-playbook',
    title: 'The Creative Playbook',
    category: 'Creative Research & Storytelling',
    status: 'upcoming',
    badges: ['Coming soon', 'Recruiting contributors'],
    ctaLabel: 'Explore initiative',
    lead: leads.joseph,
    teaser:
      'A biweekly series exploring the creative minds behind influential ideas, brands, and cultural movements. Discover the strategies behind their work and the lessons we can apply to our own.',
    summary:
      'A biweekly series exploring the creative minds behind influential ideas, brands, and cultural movements. Discover the strategies behind their work and the lessons we can apply to our own.',
    cover: { photo: photos.creativePlaybookCover },
    overview:
      'The Creative Playbook is an upcoming biweekly series exploring how remarkable individuals developed their creative identities, reached audiences, and turned ideas into cultural impact.',
    need: 'We often recognize great creative work without understanding what made it possible. Studying the decisions behind it gives students useful ways of thinking, creating, and reaching people.',
    contributions: ['Research & strategy', 'Writing & storytelling', 'Visual design', 'Content & distribution'],
    gallery: [],
    involvement:
      'We’re building the founding team. Research, writing, design, or distribution: bring your curiosity, no expertise required.',
  },
  {
    slug: 'noshbox',
    title: 'NoshBox Collaboration',
    category: 'Partnership in development',
    status: 'in-development',
    partner: 'NoshBox',
    teaser: 'Exploring creative community events with a local restaurant pickup app.',
    summary:
      'A developing partnership with NoshBox, a pickup app for restaurants in Champaign and Urbana, to explore creative events and experiences centered on the community. Details are still being worked out.',
    cover: { photo: photos.noshboxLogo },
    link: { href: 'https://www.noshboxapp.com/', label: 'Visit NoshBox' },
    overview:
      'ICI and NoshBox are exploring how to create creative events together that center the community. This initiative is in development, and the format, dates, and scope have not been finalized.',
    need:
      'Local businesses can be gathering places. This collaboration is looking at how a creative event could bring students and neighbors into the same room around something they make or experience together.',
    contributions: [
      'Shaping early event concepts',
      'Planning and logistics as ideas firm up',
      'Promotion once an event is confirmed',
    ],
    gallery: [{ placeholder: 'Planning or event photos' }],
    involvement:
      'Initiatives at an early stage are a good place to have real influence on what gets built. If you want to help shape this one, mention NoshBox in the interest form.',
  },
];

// Old project URLs that should still resolve after a project was renamed.
const slugAliases: Record<string, string> = { 'hallo-eve-art-mart': 'art-markets' };

export function getProject(slug: string) {
  const resolved = slugAliases[slug] ?? slug;
  return projects.find((project) => project.slug === resolved);
}
