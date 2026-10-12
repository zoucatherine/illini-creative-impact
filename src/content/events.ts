// Event content. Add, edit, or move events here — the layout updates automatically.
//
// status:
//   'upcoming'       — date confirmed (set `date`, ISO format, e.g. '2027-03-14T18:00:00-05:00')
//   'dates-tba'      — happening, but no confirmed date yet
//   'recurring'      — runs regularly (e.g. every semester)
//   'in-development' — being planned; not confirmed
//   'past'           — already happened
//
// Leave `date` / `location` / `link` empty until confirmed; the card shows "to be announced".
import { photos, type Photo } from './photos';

export type EventStatus = 'upcoming' | 'dates-tba' | 'recurring' | 'in-development' | 'past';

export const eventStatusLabel: Record<EventStatus, string> = {
  upcoming: 'Upcoming',
  'dates-tba': 'Dates TBA',
  recurring: 'Recurring',
  'in-development': 'In development',
  past: 'Past',
};

export interface ClubEvent {
  id: string;
  title: string;
  status: EventStatus;
  description: string;
  /** ISO date-time, only once confirmed. */
  date?: string;
  /** Loose timing when there is no confirmed date, e.g. "Spring semester". */
  when?: string;
  location?: string;
  /** Registration or info link. Internal paths (/work/...) or full URLs. */
  link?: { href: string; label: string };
  photo?: Photo;
  /** Highlight as a flagship event. */
  flagship?: boolean;
}

export const events: ClubEvent[] = [
  {
    id: 'spring-art-contest',
    title: 'Spring Art Contest',
    status: 'dates-tba',
    flagship: true,
    when: 'Spring semester',
    description:
      'Our signature campus art competition. Student artists submit work, the university community comes to see it, and standout pieces are recognized.',
    link: { href: '/work/spring-art-contest', label: 'About the contest' },
    photo: photos.artExhibition,
  },
  {
    id: 'fall-exhibition',
    title: 'Fall Exhibition & Art Market',
    status: 'dates-tba',
    flagship: true,
    when: 'Fall semester',
    description:
      'An exhibition and art market centered on mental health awareness, with a collaborative artwork attendees help create.',
    link: { href: '/work/fall-exhibition', label: 'About the exhibition' },
    photo: photos.exhibitGroup,
  },
  {
    id: 'creative-socials',
    title: 'Creative Socials',
    status: 'recurring',
    description:
      'Low-key nights to make something, meet members, and hear what projects are coming up. A good first event if you are new.',
    link: { href: 'https://discord.com/invite/9uBHgdJbQK', label: 'Get dates on Discord' },
    photo: photos.drawingTable,
  },
  {
    id: 'noshbox-event',
    title: 'Community event with Noshbox',
    status: 'in-development',
    description:
      'A community-centered creative event we are exploring with Noshbox. Format and timing are still being planned.',
    link: { href: '/work/noshbox', label: 'About the collaboration' },
  },
  {
    id: 'quad-day-2026',
    title: 'Quad Day 2026',
    status: 'past',
    when: '2026',
    location: 'Main Quad',
    description: 'We tabled on the Main Quad to meet new students and talk about what we do.',
    photo: photos.quadDay2026,
  },
  {
    id: 'valentines-social',
    title: 'Valentine’s Social',
    status: 'past',
    description: 'A paper-crafts social — an easy way to meet members and make something together.',
    photo: photos.valentinesSocial,
  },
  {
    id: 'sticker-sale',
    title: 'Sticker Sale Fundraiser',
    status: 'past',
    description: 'A sticker sale outside the Illini Union to raise money for the club.',
    photo: photos.stickerSale,
  },
];
