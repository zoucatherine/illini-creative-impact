// Content for the It’s Okay to Fall page (src/pages/FallExhibitionPage.tsx).
//
// Edit this file as plans firm up; the page updates without a redesign:
//   - The page shows no status labels, so each program item's `body` must say in words if it is
//     not confirmed yet. Update `status` and the wording together once something is confirmed.
//   - Add organizations to `collaborators` once they have agreed to take part.
//   - Add people to `openingMoment.guests` as they confirm; the list appears once it has a name.
//   - Edit `schedule` (shown under the opening). Set `scheduleTentative` to false once the times are final.
//   - Add text to `accessibility` to show that section.
// Only list what is confirmed. Nothing here should name a speaker, clinic, or performer before they agree.
import { site } from './site';

export type ProgramStatus = 'confirmed' | 'open' | 'in-development' | 'exploring' | 'planning';

export const programStatusLabel: Record<ProgramStatus, string> = {
  confirmed: 'Confirmed',
  open: 'Submissions open',
  'in-development': 'In development',
  exploring: 'Being explored',
  planning: 'Being planned',
};

export const fallExhibition = {
  slug: 'fall-exhibition',
  title: 'It’s Okay to Fall',
  start: '2026-11-10T10:00:00-06:00',
  end: '2026-11-10T20:00:00-06:00',
  dateLabel: 'Tuesday, November 10, 2026',
  shortDate: 'Nov 10',
  timeLabel: '10 AM – 8 PM',
  venue: 'Illini Union, Ballroom C',
  address: '1401 W Green St, Urbana, IL 61801',
  mapsHref: 'https://www.google.com/maps/search/?api=1&query=Illini+Union%2C+1401+W+Green+St%2C+Urbana%2C+IL',
  // Co-leads. Emails match the officer list on the About page.
  leads: [
    { name: 'Alex Zhang', email: 'alexz10@illinois.edu' },
    { name: 'Amelia Carpenter', email: 'acarp@illinois.edu' },
  ],
  forms: {
    artwork: 'https://docs.google.com/forms/d/e/1FAIpQLSdMsIZ6nAlQUgsdM1ZSw2zdMfN7KSnMi8G4BpeGr6NJr4ZLyQ/viewform',
    clubs: 'https://docs.google.com/forms/d/e/1FAIpQLSekWqZDva0h-gnXA1xIhm3r8aJs-jF73u1RCO7mJqYqs7Uyug/viewform',
  },
  joinHref: '/get-involved?interest=projects&project=fall-exhibition#join',
  discord: site.social.discord,
};

const details = `${fallExhibition.title}: a campus-wide creative initiative for mental health awareness from Illini Creative Impact. Add your mark to one collective artwork. ${site.url}/work/fall-exhibition`;

export const calendarHref =
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  `&text=${encodeURIComponent(fallExhibition.title)}` +
  '&dates=20261110T100000/20261110T200000&ctz=America/Chicago' +
  `&location=${encodeURIComponent(`${fallExhibition.venue}, ${fallExhibition.address}`)}` +
  `&details=${encodeURIComponent(details)}`;

export function leadMailto(subject: string) {
  return `mailto:${fallExhibition.leads.map((lead) => lead.email).join(',')}?subject=${encodeURIComponent(`It’s Okay to Fall: ${subject}`)}`;
}

export interface ProgramItem {
  title: string;
  status: ProgramStatus;
  body: string;
  /** Shown under the body, e.g. a related opportunity. */
  note?: string;
  link?: { href: string; label: string };
}

export const program: ProgramItem[] = [
  {
    title: 'Add to the collective artwork',
    status: 'confirmed',
    body: 'Add a drawing, a color, or a few words to the shared artwork, any time from 10 AM to 8 PM. Drawing materials are provided.',
  },
  {
    title: 'See work by student artists',
    status: 'open',
    body: 'Student art about mental health, on the walls all day.',
    link: { href: fallExhibition.forms.artwork, label: 'Submit your artwork' },
  },
  {
    title: 'Sit down and make something',
    status: 'in-development',
    body: 'Drawing and craft tables anyone can join, no art experience needed.',
  },
  {
    title: 'Meet community and wellness organizations',
    status: 'exploring',
    body: 'We’re inviting campus wellness groups, local counseling providers, and nonprofits to share information and resources.',
  },
  {
    title: 'Student performances',
    status: 'exploring',
    body: 'We’re inviting student performers to share their work.',
  },
  {
    title: 'An opening moment',
    status: 'planning',
    body: 'At 10 AM, campus leaders make the first marks on the artwork.',
    link: { href: '#opening', label: 'How it would work' },
  },
];

/** Ways a club, department, or organization can take part. */
export const contributions = [
  { title: 'Bring your members', body: 'Come together and add to the artwork as a group.' },
  { title: 'Lead an activity', body: 'Host a drawing or craft station that reflects your community.' },
  { title: 'Contribute art or a performance', body: 'Share work from your members on the walls or on the floor.' },
  { title: 'Share mental health resources', body: 'Help visitors find information and support.' },
  { title: 'Help spread the word', body: 'Share the invitation with your members, students, or colleagues.' },
];

export interface Audience {
  id: string;
  who: string;
  pitch: string;
  cta: { href: string; label: string };
}

export const audiences: Audience[] = [
  {
    id: 'student-orgs',
    who: 'Student organizations',
    pitch:
      'Host a drawing table, bring your members to add to the artwork, or share artwork or a performance.',
    cta: { href: fallExhibition.forms.clubs, label: 'Club collaboration form' },
  },
  {
    id: 'wellness-orgs',
    who: 'Mental health and community organizations',
    pitch:
      'Share information and resources with students at the event.',
    cta: { href: leadMailto('community organization'), label: 'Email the organizers' },
  },
  {
    id: 'faculty',
    who: 'Faculty, departments, and university leaders',
    pitch:
      'Tell your students about it, stop by during the day, or help with the opening.',
    cta: { href: leadMailto('faculty and departments'), label: 'Get in touch' },
  },
];

export interface Collaborator {
  name: string;
  /** What they are contributing, e.g. "Leading a drawing station". Leave out until it is decided. */
  contribution?: string;
  href?: string;
}

/** Confirmed collaborating organizations only. McKinley Health Center: add only once they confirm. */
export const collaborators: Collaborator[] = [
  { name: 'Creative Collective (ClubHub)' },
  { name: 'Game Builders' },
  { name: 'Life Drawing' },
];

export const openingMoment: {
  status: 'planning' | 'confirmed';
  /** e.g. "10 AM". Shown once confirmed. */
  time?: string;
  /** Confirmed guests only. */
  guests?: { name: string; role: string }[];
} = {
  status: 'planning',
};

/** What the opening asks of invited campus leaders. */
export const openingAsks = [
  { title: 'Make one of the first marks', body: 'A few minutes at the start of the day, on a blank artwork.' },
  { title: 'Stand with students', body: 'Be there as the doors open, so every student who walks in sees their leaders went first.' },
  { title: 'Bring your community', body: 'Invite your department, team, or organization to come add their marks too.' },
];

export const artistThemes = ['Emotion', 'Resilience', 'Identity', 'Personal experience', 'Recovery', 'Connection'];

/** The day’s timeline, shown under the opening section. Times are a draft until `scheduleTentative` is false. */
export const schedule: { time: string; title: string; note?: string }[] = [
  { time: '10:00 AM', title: 'Opening', note: 'Campus leaders make the first marks' },
  { time: '10:15 AM', title: 'Artwork opens to everyone' },
  { time: 'All day', title: 'Student art exhibition and activities' },
  { time: '7:30 PM', title: 'Last marks on the artwork' },
  { time: '8:00 PM', title: 'Event closes' },
];

export const scheduleTentative = true;

/** Accessibility information for the venue and activities. Shown once written. */
export const accessibility: string | undefined = undefined;

export const faqs = [
  {
    q: 'Do I need to be an artist?',
    a: 'No. A color, a line, or a single word counts. The artwork is made of small contributions from people of every skill level.',
  },
  {
    q: 'Do I have to share anything personal?',
    a: 'No. Taking part is voluntary, and so is anything you choose to say. You can add a mark without writing about yourself at all.',
  },
  {
    q: 'Are materials provided?',
    a: 'Yes. All drawing materials for the collective artwork are provided.',
  },
  {
    q: 'When should I come?',
    a: 'The artwork is open from 10 AM to 8 PM and grows all day, so whenever you come, you’ll see it at a different stage.',
  },
  {
    q: 'How can my club or organization take part?',
    a: 'Student organizations can use the club collaboration form. Other organizations, faculty, and departments can email the organizers, Alex Zhang and Amelia Carpenter.',
  },
];
