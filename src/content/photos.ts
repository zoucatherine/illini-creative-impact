// Optimized copies of the photos in src/assets/hero-images (resized webp).
// Alt text describes only what is visible in each photo.
import quadDay2026 from '../assets/photos/quad-day-2026.webp';
import artExhibition from '../assets/photos/art-exhibition.webp';
import stickerSale from '../assets/photos/sticker-sale.webp';
import quadSelfie from '../assets/photos/quad-selfie.webp';
import exhibitGroup from '../assets/photos/exhibit-group.webp';
import drawingTable from '../assets/photos/drawing-table.webp';
import certificates from '../assets/photos/certificates.webp';
import studentExpo from '../assets/photos/student-expo.webp';
import valentinesSocial from '../assets/photos/valentines-social.webp';
import trinityFlyer from '../assets/photos/trinity-flyer.webp';
import trinityFlyerProcess from '../assets/photos/trinity-flyer-process.webp';

export interface Photo {
  src: string;
  alt: string;
  /** CSS object-position for crops, e.g. 'center 20%' to keep faces in frame. */
  position?: string;
  /** 'contain' shows the whole image (for flyers and artwork) instead of cropping. */
  fit?: 'cover' | 'contain';
}

export const photos = {
  quadDay2026: {
    src: quadDay2026,
    alt: 'Three members at the club table on the Main Quad during Quad Day',
  },
  artExhibition: {
    src: artExhibition,
    alt: 'A student holding a certificate in front of a wall of student artwork',
    position: 'center 25%',
  },
  stickerSale: {
    src: stickerSale,
    alt: 'Members standing behind a sticker sale fundraiser table outside the Illini Union',
  },
  quadSelfie: {
    src: quadSelfie,
    alt: 'A group of members taking a selfie on the Main Quad',
  },
  exhibitGroup: {
    src: exhibitGroup,
    alt: 'Members smiling around a table of laptops showing digital artwork',
  },
  drawingTable: {
    src: drawingTable,
    alt: 'Students drawing together with markers around a long table',
    position: 'center 40%',
  },
  certificates: {
    src: certificates,
    alt: 'Four students holding certificates at the front of a hall with wood paneling',
  },
  studentExpo: {
    src: studentExpo,
    alt: 'Members posing beside the club display board at a student expo',
  },
  valentinesSocial: {
    src: valentinesSocial,
    alt: 'Students making paper crafts together at tables during a club social',
  },
  trinityFlyer: {
    src: trinityFlyer,
    alt: 'Flyer for the Riverside High Snack Bag Food Drive for Trinity Community Food Pantry, listing items needed such as canned meat, peanut butter, and granola bars',
    fit: 'contain',
  },
  trinityFlyerProcess: {
    src: trinityFlyerProcess,
    alt: 'Two versions of the Snack Bag Food Drive flyer side by side: a grayscale draft and the final color design',
    fit: 'contain',
  },
} satisfies Record<string, Photo>;
