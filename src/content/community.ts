// Photos and member stories for the Our Community section and /community page.
import { photos, type Photo } from './photos';

export interface CommunityPhoto {
  photo: Photo;
  caption: string;
}

export const communityPhotos: CommunityPhoto[] = [
  { photo: photos.quadSelfie, caption: 'Members on the Main Quad' },
  { photo: photos.drawingTable, caption: 'Drawing together' },
  { photo: photos.stickerSale, caption: 'Sticker sale fundraiser' },
  { photo: photos.valentinesSocial, caption: 'Valentine’s social' },
  { photo: photos.studentExpo, caption: 'Tabling at a student expo' },
  { photo: photos.quadDay2026, caption: 'Quad Day 2026' },
  { photo: photos.certificates, caption: 'Certificate presentation' },
  { photo: photos.exhibitGroup, caption: 'Working session' },
];

export interface MemberStory {
  name: string;
  /** e.g. "Marketing, sophomore" */
  detail: string;
  quote: string;
  photo?: Photo;
}

// Add real member stories here (with the member's permission). Empty slots render as
// labeled placeholders on the page.
export const memberStories: MemberStory[] = [];
