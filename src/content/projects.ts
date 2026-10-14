// Project content. Edit this file to update the Our Work showcase and project pages.
// Anything not yet confirmed is left as a `placeholder` so the page labels it clearly
// instead of inventing details. Replace placeholders with real content when you have it.
import { photos, type Photo } from './photos';

export type ProjectStatus = 'active' | 'recurring' | 'in-development';

export const projectStatusLabel: Record<ProjectStatus, string> = {
  active: 'Active partnership',
  recurring: 'Recurring event',
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
    teaser: 'Branding, posters, and signage for a local food pantry.',
    summary:
      'Students take on the pantry’s creative and promotional needs: branding, posters, signage, and the materials that help neighbors find and use it.',
    cover: { photo: photos.trinityFlyer, caption: 'Food drive flyer by Jasmine Liu' },
    overview:
      'ICI works with Trinity Community Food Pantry on the creative side of keeping a pantry running: how it presents itself, how people find it, and how information reaches the neighbors it serves.',
    need:
      'A food pantry’s volunteers spend their time on food and people. Clear signage, consistent branding, and polished promotional materials still matter, because they help people know when and how to get support. They are just hard to prioritize. That is work students can take on.',
    contributions: [
      'Branding and visual identity work',
      'Posters and promotional materials',
      'Signage for the pantry space',
      'Other design requests as the pantry’s needs come up',
      'Grant writing (now recruiting)',
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
    link: { href: 'https://earthdayeveryday.artcall.org/pages/web-gallery', label: 'View the online gallery' },
    teaser: 'An environmental art contest we started with Visionary Arts. It spread across the United States and into Europe.',
    summary:
      'An Earth Day art movement we helped start with Visionary Arts. It grew into a contest and exhibition with artists across the United States and in Europe.',
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
    category: 'Fall exhibition & art market',
    status: 'recurring',
    // TODO: confirm whether this runs every fall.
    statusLabel: 'Fall semester event',
    teaser: 'Our upcoming mental health exhibition and art market, built around a community artwork everyone adds to.',
    summary:
      'An exhibition and art market centered on mental health awareness, built around a collaborative artwork that attendees help create.',
    // Chosen to reflect the theme (making art together, no pressure), not taken at the exhibition.
    cover: { photo: photos.drawingTable, caption: 'Making art together' },
    overview:
      'It’s Okay to Fall is our fall exhibition and art market, organized around mental health awareness. The name plays on the season and on the idea that it’s okay to stumble. At its center is a collaborative community artwork: a piece that attendees add to themselves.',
    need:
      'Mental health is easier to talk about when there is a shared, easy way in. Making something together, and seeing what others contributed, opens that conversation. The art market also gives student artists a place to sell their work.',
    contributions: [
      'Curating the exhibition and recruiting student artists',
      'Organizing art market vendors',
      'Designing and facilitating the collaborative artwork',
      'Promotion, event logistics, and running the event',
    ],
    gallery: [
      { placeholder: 'The collaborative community artwork' },
      { placeholder: 'Art market vendors' },
      { placeholder: 'Attendees adding to the community piece' },
    ],
    sections: [
      {
        title: 'The community artwork',
        body: 'Attendees are invited to add to a shared piece during the event. The finished artwork reflects everyone who took part, not a single artist.',
      },
      {
        title: 'Take part',
        placeholder: 'Add this year’s date, location, and how artists can apply for a market table once confirmed.',
      },
    ],
    involvement:
      'Help curate, recruit vendors, design the community artwork, or run the event. Artists interested in exhibiting or selling can reach out through the interest form.',
  },
  {
    slug: 'hallo-eve-art-mart',
    title: 'Hallo-Eve Art Mart',
    titleAccent: 'Hallo-Eve',
    category: 'Art market',
    status: 'recurring',
    // TODO: confirm whether this runs every year.
    statusLabel: 'Fall semester event',
    teaser: 'Student artists table and sell their work on the Main Quad. October 30, 10am to 3pm.',
    summary:
      'A student art market on the Main Quad, separate from It’s Okay to Fall, where artists table and sell their own work. October 30, 10am to 3pm, at the Union.',
    cover: { photo: photos.halloEveFlyer },
    overview:
      'The Hallo-Eve Art Mart is an ICI event where student artists set up tables on the Main Quad and sell their work directly to visitors. All mediums are welcome.',
    need: 'Student artists need places to show and sell what they make. A market gives them a table, an audience, and a chance to earn from their work.',
    contributions: [
      'Recruiting and coordinating artist tables',
      'Event logistics and setup',
      'Promotion',
      'Running the market on the day',
    ],
    gallery: [{ placeholder: 'Artist tables' }, { placeholder: 'Visitors browsing the market' }],
    sections: [
      {
        title: 'Take part',
        body: 'October 30, 10am to 3pm, on the Main Quad by the Illini Union. Artists of all mediums can sign up to sell their work.',
      },
    ],
    involvement:
      'Help recruit artists, plan logistics, or run the market. Artists interested in a table can reach out through the interest form.',
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

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
