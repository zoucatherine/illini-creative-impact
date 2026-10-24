// Content for the It’s Okay to Fall page (src/pages/FallExhibitionPage.tsx).
//
// Edit this file as plans firm up; the page updates without a redesign:
//   - The page shows no status labels, so each program item's `body` must say in words if it is
//     not confirmed yet. Update `status` and the wording together once something is confirmed.
//   - Add organizations to `collaborators` once they have agreed to take part.
//   - Add campus leaders to `campusGuests` as they confirm; each group appears once it has a confirmed name.
//   - Edit `schedule` (shown under the opening). Set `scheduleTentative` to false once the times are final.
//   - Add text to `accessibility` to show that section.
//   - Campus resources (phone numbers, hours) are at the bottom. Recheck them each semester.
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

export function leadMailto(subject: string, body?: string) {
  const to = fallExhibition.leads.map((lead) => lead.email).join(',');
  const query = `subject=${encodeURIComponent(`It’s Okay to Fall: ${subject}`)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;
  return `mailto:${to}?${query}`;
}

/** RSVPs for invited leaders go to the organizers by email, with a short template to fill in. */
export const rsvpOpeningHref = leadMailto(
  'RSVP for the opening',
  'I’d like to make one of the first marks at the opening on November 10 at 10 AM.\n\nName:\nTitle and department or organization:\nAnyone joining me:\n',
);
export const rsvpLaterHref = leadMailto(
  'Adding my mark later in the day',
  'I can’t make the 10 AM opening, but I’d like to stop by later on November 10 to add my mark.\n\nName:\nTitle and department or organization:\nAbout what time:\n',
);

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
    title: 'Sit down and make something',
    status: 'in-development',
    body: 'Drawing and craft tables anyone can join, no art experience needed.',
  },
  {
    title: 'See work by student artists',
    status: 'open',
    body: 'Student art about mental health, on the walls all day.',
    link: { href: fallExhibition.forms.artwork, label: 'Submit your artwork' },
  },
  {
    title: 'Take home a self-care pack',
    status: 'confirmed',
    body: 'Free packs from the Counseling Center’s Finish Strong campaign, with a few small gifts, tips for getting through stressful weeks, and where to reach out if you feel overwhelmed. While they last.',
    link: { href: 'https://counselingcenter.illinois.edu/', label: 'Visit the Counseling Center' },
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

/** Confirmed collaborating organizations only. */
export const collaborators: Collaborator[] = [
  { name: 'Creative Collective (ClubHub)' },
  { name: 'Game Builders' },
  { name: 'Life Drawing' },
  { name: 'McKinley Health Center' },
  { name: 'Amateur Artists' },
];

/** The opening ceremony's time slot, shown wherever the opening is mentioned. */
export const openingTimeLabel = '10:00–10:30 AM';

export interface CampusGuest {
  name: string;
  title: string;
  /** `opening`: attending the opening ceremony. `day`: visiting later, time not set unless `arrival` is given. */
  category: 'opening' | 'day';
  /** Only `confirmed` guests are shown on the page. */
  status: 'confirmed' | 'tentative';
  /** e.g. "2 PM". Leave out unless the guest has confirmed a time. */
  arrival?: string;
}

// Campus leaders attending. This file is public on GitHub, so add tentative guests here only if
// their name can be public; otherwise track them outside the repo until they confirm.
// Don't describe anyone as speaking unless they have agreed to.
export const campusGuests: CampusGuest[] = [
  {
    name: 'Robin Kaler',
    title: 'Chief of Staff to the Chancellor and Vice Chancellor for Administrative Strategy',
    category: 'opening',
    status: 'confirmed',
  },
  {
    name: 'Stephen Bryan',
    title: 'Associate Vice Chancellor for Student Advocacy and Dean of Students',
    category: 'opening',
    status: 'confirmed',
  },
  {
    name: 'Jacob D. Pinholster',
    title: 'Dean and Professor, College of Fine and Applied Arts',
    category: 'day',
    status: 'confirmed',
  },
];

/** The planned opening, 10:00 to 10:30 AM. Times are a draft, like `schedule`. */
export const openingTimeline = [
  {
    time: '10:00 AM',
    title: 'A shared beginning',
    body: 'A brief welcome and a few words on creativity, mental health, and community.',
  },
  {
    time: '10:10 AM',
    title: 'The first marks',
    body: 'Invited campus leaders and student representatives make the first contributions to the artwork together.',
  },
  {
    time: '10:30 AM',
    title: 'The artwork opens to everyone',
    body: 'Students, faculty, staff, and community members keep building it for the rest of the day.',
  },
];

/** How an invited leader's mark can reach their own community. Sharing is optional. */
export const markJourney = [
  { title: 'Make your mark', body: 'Add a drawing, a color, or a few words to the collective artwork.' },
  { title: 'Share the moment', body: 'Take a photo in front of the artwork. Our team is happy to take it for you.' },
  {
    title: 'Inspire the next',
    body: 'If you’d like, post it to your story or your department’s channels, tag @uiuc_creativeimpact, and invite others to add theirs.',
  },
];

export const artistThemes = ['Emotion', 'Resilience', 'Identity', 'Personal experience', 'Recovery', 'Connection'];

/** The day at a glance, shown in the hero. */
export const schedule: { time: string; title: string }[] = [
  { time: openingTimeLabel, title: 'Opening ceremony' },
  { time: '10:30 AM–8:00 PM', title: 'Exhibition and collaborative artwork, open to all' },
];

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

export interface CampusResource {
  name: string;
  body: string;
  /** Phone numbers or text lines, shown as tap-to-call links. */
  contacts: { label: string; href: string }[];
  /** e.g. hours or location. */
  detail?: string;
  link?: { href: string; label: string };
}

// Checked against counselingcenter.illinois.edu (home, /how-make-appointments, /crisis, /finish-strong)
// and mckinley.illinois.edu/medical-services/mental-health on October 22, 2026. Recheck each semester.
export const finishStrongUrl = 'https://counselingcenter.illinois.edu/finish-strong';

/** On campus, during the week. */
export const campusResources: CampusResource[] = [
  {
    name: 'Counseling Center',
    body: 'Counseling for students, including same-day appointments by phone. For urgent needs, walk in during business hours, no appointment needed.',
    contacts: [{ label: '217-333-3704', href: 'tel:+12173333704' }],
    detail: 'Monday to Friday, 8 AM to 5 PM. 610 E. John St., Turner Student Services Building, second floor.',
    link: { href: 'https://counselingcenter.illinois.edu/how-make-appointments', label: 'Make an appointment' },
  },
  {
    name: 'McKinley Health Center',
    body: 'The Mental Health Clinic offers evaluation, medication, and short-term therapy. Students in a mental health crisis can be seen on weekdays, 8 AM to 4 PM.',
    contacts: [{ label: '217-333-2700', href: 'tel:+12173332700' }],
    detail: 'Call during business hours to book. Dial-A-Nurse at the same number, 24/7. 1109 S. Lincoln Ave., Urbana.',
    link: { href: 'https://mckinley.illinois.edu/medical-services/mental-health', label: 'Mental health at McKinley' },
  },
];

/** Any time, day or night. */
export const crisisResources: CampusResource[] = [
  {
    name: '988 Suicide & Crisis Lifeline',
    body: 'Call or text, in English or Spanish.',
    contacts: [{ label: 'Call or text 988', href: 'tel:988' }],
  },
  {
    name: 'Rosecrance Crisis Line',
    body: 'The Counseling Center’s after-hours line.',
    contacts: [{ label: '815-720-4953', href: 'tel:+18157204953' }],
  },
  {
    name: 'Crisis Text Line',
    body: 'Text with a trained crisis counselor.',
    contacts: [{ label: 'Text HOME to 741741', href: 'sms:741741?&body=HOME' }],
  },
  {
    name: 'Emergency',
    body: 'If someone is in immediate danger.',
    contacts: [{ label: 'Call 911', href: 'tel:911' }],
  },
];
