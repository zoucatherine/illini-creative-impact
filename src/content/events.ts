// Event content. Add, edit, or move events here and the layout updates automatically.
//
// status:
//   'upcoming'       : date confirmed (set `date`, ISO format, e.g. '2027-03-14T18:00:00-05:00')
//   'dates-tba'      : happening, but no confirmed date yet
//   'recurring'      : runs regularly (e.g. every semester)
//   'in-development' : being planned; not confirmed
//   'past'           : already happened
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
  /** A word in the title to render with the autumn treatment (see AccentTitle). */
  titleAccent?: string;
  status: EventStatus;
  description: string;
  /** ISO date-time, only once confirmed. */
  date?: string;
  /** Loose timing when there is no confirmed date, e.g. "Fall semester". */
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
    id: 'creative-socials',
    title: 'Creative Socials',
    status: 'recurring',
    description:
      'Relaxed nights to make something, meet members, and hear what projects are coming up. A good first event if you are new.',
    link: { href: 'https://discord.com/invite/9uBHgdJbQK', label: 'Get dates on Discord' },
    photo: photos.quadSelfie,
  },
  {
    id: 'earth-day-every-day-2026',
    title: 'Earth Day Every Day Exhibition',
    status: 'past',
    flagship: true,
    date: '2026-04-18',
    location: 'University of Illinois',
    description:
      'Our Earth Day art contest with Visionary Arts, exhibited on campus April 18 and 19. Every submission is still on view in the online gallery.',
    link: { href: 'https://earthdayeveryday.artcall.org/pages/web-gallery', label: 'View the online gallery' },
    photo: photos.artExhibition,
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
    description: 'A paper crafts social. An easy way to meet members and make something together.',
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
