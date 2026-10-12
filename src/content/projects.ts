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
  /** Rendered as a labeled "content needed" block when the section has no real content yet. */
  placeholder?: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  status: ProjectStatus;
  /** Overrides the default status label, e.g. "Fall semester event". */
  statusLabel?: string;
  /** One or two sentences for cards and the showcase. */
  summary: string;
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
}

export const projects: Project[] = [
  {
    slug: 'trinity-community-food-pantry',
    title: 'Trinity Community Food Pantry',
    category: 'Community partnership',
    status: 'active',
    partner: 'Trinity Community Food Pantry',
    summary:
      'Students take on the pantry’s creative and promotional needs — branding, posters, signage, and the materials that help neighbors find and use it.',
    cover: { placeholder: 'Pantry signage, posters, or students working with pantry staff' },
    overview:
      'ICI works with Trinity Community Food Pantry on the creative side of keeping a pantry running: how it presents itself, how people find it, and how information reaches the neighbors it serves.',
    need:
      'A food pantry’s volunteers spend their time on food and people. Clear signage, consistent branding, and well-made promotional materials still matter — they help people know when and how to get support — but they are hard to prioritize. That is work students can take on.',
    contributions: [
      'Branding and visual identity work',
      'Posters and promotional materials',
      'Signage for the pantry space',
      'Other design requests as the pantry’s needs come up',
    ],
    gallery: [
      { placeholder: 'Finished poster or flyer' },
      { placeholder: 'Signage installed at the pantry' },
      { placeholder: 'Students working on designs' },
    ],
    sections: [
      {
        title: 'Work samples',
        placeholder:
          'Add finished pieces (posters, signage, branding) once the pantry has approved sharing them.',
      },
    ],
    involvement:
      'Join the project team if you want to design, write, or help manage requests from the pantry. No design portfolio required — there is room for people who can organize, communicate, and follow through.',
  },
  {
    slug: 'spring-art-contest',
    title: 'Spring Art Contest',
    category: 'Signature event',
    status: 'recurring',
    summary:
      'Our flagship campus event: a contest that brings student artists together and puts their work in front of the wider university community.',
    // TODO: confirm this photo is from the Spring Art Contest.
    cover: { photo: photos.artExhibition, caption: 'Recognizing a student artist' },
    overview:
      'The Spring Art Contest is ICI’s recurring signature event. Student artists submit work, the university community comes to see it, and the strongest pieces are recognized.',
    need:
      'Plenty of students make art without anywhere to show it. The contest gives them a reason to finish a piece, a public audience, and recognition — and it gives everyone else on campus a reason to show up.',
    contributions: [
      'Planning the contest timeline and rules',
      'Promoting the call for submissions across campus',
      'Coordinating submissions and judging',
      'Designing the exhibition and running the event day',
    ],
    gallery: [
      // TODO: confirm these photos are from the Spring Art Contest.
      { photo: photos.artExhibition, caption: 'Student work on display' },
      { photo: photos.certificates, caption: 'Recognizing participants' },
      { placeholder: 'Winning artwork' },
    ],
    sections: [
      {
        title: 'Artwork gallery',
        placeholder: 'Add images of submitted and winning pieces, with artist names and permission.',
      },
      {
        title: 'Past highlights',
        placeholder: 'Add past winners, number of submissions, and attendance once confirmed.',
      },
      {
        title: 'Submissions',
        placeholder: 'Submission guidelines and the submission link will be posted when the next contest opens.',
      },
      {
        title: 'Next contest',
        body: 'Dates for the next Spring Art Contest have not been announced. Follow ICI on Instagram or join the Discord to hear first.',
      },
    ],
    involvement:
      'Help plan the next contest: outreach to artists, promotion, logistics, judging coordination, or event-day setup. Artists who want to enter can watch for the next call for submissions.',
  },
  {
    slug: 'fall-exhibition',
    title: 'Fall Exhibition & Community Art',
    category: 'Exhibition & art market',
    status: 'recurring',
    // TODO: confirm whether this runs every fall.
    statusLabel: 'Fall semester event',
    summary:
      'An exhibition and art market centered on mental health awareness, built around a collaborative artwork that attendees help create.',
    // TODO: confirm this photo is from the Fall Exhibition.
    cover: { photo: photos.exhibitGroup, caption: 'Members preparing artwork' },
    overview:
      'The Fall Exhibition pairs a student art exhibition with an art market, organized around mental health awareness. At its center is a collaborative community artwork: a piece that attendees add to themselves.',
    need:
      'Mental health is easier to talk about when there is a shared, low-pressure way in. Making something together — and seeing what others contributed — opens that conversation. The art market also gives student artists a place to sell their work.',
    contributions: [
      'Curating the exhibition and recruiting student artists',
      'Organizing art market vendors',
      'Designing and facilitating the collaborative artwork',
      'Promotion, event logistics, and day-of operations',
    ],
    gallery: [
      { placeholder: 'The collaborative community artwork' },
      { placeholder: 'Art market vendors' },
      { placeholder: 'Attendees adding to the community piece' },
    ],
    sections: [
      {
        title: 'The community artwork',
        body: 'Attendees are invited to add to a shared piece during the event. The finished artwork reflects everyone who took part — not a single artist.',
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
    slug: 'noshbox',
    title: 'Noshbox Collaboration',
    category: 'Local partnership',
    status: 'in-development',
    partner: 'Noshbox',
    summary:
      'A developing partnership with Noshbox to explore community-centered creative events and experiences. Details are still being worked out.',
    cover: { placeholder: 'Photo from Noshbox or a planning session' },
    overview:
      'ICI and Noshbox are exploring how to create community-centered creative events together. This initiative is in development — the format, dates, and scope have not been finalized.',
    need:
      'Local businesses can be gathering places. This collaboration is looking at how a creative event could bring students and neighbors into the same room around something they make or experience together.',
    contributions: [
      'Shaping early event concepts',
      'Planning and logistics as ideas firm up',
      'Promotion once an event is confirmed',
    ],
    gallery: [{ placeholder: 'Planning or event photos' }],
    involvement:
      'Early-stage initiatives are a good place to have real influence on what gets built. If you want to help shape this one, mention Noshbox in the interest form.',
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
