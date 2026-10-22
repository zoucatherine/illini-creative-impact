// Asset manifest for campus photography (src/assets/photos/campus). Every photo here is openly
// licensed; credits render on the pages that use them. Keep source, author, and license with each
// entry, and add a new entry (with a verified license) before adding a new campus photo.
//
// Not university-owned photos: these come from Wikimedia Commons, not the Illinois photo library,
// and do not imply endorsement by the University of Illinois.
import unionQuadAutumn1280 from '../assets/photos/campus/union-quad-autumn-1280.webp';
import unionQuadAutumn1920 from '../assets/photos/campus/union-quad-autumn-1920.webp';
import unionFront900 from '../assets/photos/campus/union-front-900.webp';
import unionFront1600 from '../assets/photos/campus/union-front-1600.webp';
import almaMater700 from '../assets/photos/campus/alma-mater-700.webp';
import almaMater1200 from '../assets/photos/campus/alma-mater-1200.webp';

export interface CampusPhoto {
  src: string;
  srcSet: string;
  width: number;
  height: number;
  alt: string;
  /** Short credit line, e.g. "Daniel Schwen, CC BY-SA 4.0". */
  credit: string;
  author: string;
  source: string;
  license: string;
  licenseUrl: string;
  taken: string;
  /** How the file differs from the original. Required for share-alike licenses. */
  changes: string;
}

export const campusPhotos = {
  unionQuadAutumn: {
    src: unionQuadAutumn1920,
    srcSet: `${unionQuadAutumn1280} 1280w, ${unionQuadAutumn1920} 1920w`,
    width: 1920,
    height: 1080,
    alt: 'The Illini Union, with its white clock cupola, seen across the Main Quad through trees in red and orange autumn color',
    credit: 'Daniel Schwen, CC BY-SA 4.0',
    author: 'Daniel Schwen',
    source: 'https://commons.wikimedia.org/wiki/File:UIUC_Illini_Union_and_Main_Quad.jpg',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    taken: '2007-11-17',
    changes: 'Cropped from the panorama to 16:9, resized, and converted to WebP. This version is shared under CC BY-SA 4.0.',
  },
  unionFront: {
    src: unionFront1600,
    srcSet: `${unionFront900} 900w, ${unionFront1600} 1600w`,
    width: 1600,
    height: 1200,
    alt: 'Front of the Illini Union: a red brick building with white columns, dormer windows, and a clock cupola, under a clear blue sky',
    credit: 'Raymond Cunningham, CC BY 2.0',
    author: 'Raymond Cunningham',
    source: 'https://commons.wikimedia.org/wiki/File:UIUC_student_union.jpg',
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    taken: '2008-05-21',
    changes: 'Resized and converted to WebP.',
  },
  almaMater: {
    src: almaMater1200,
    srcSet: `${almaMater700} 700w, ${almaMater1200} 1200w`,
    width: 1200,
    height: 1600,
    alt: 'The Alma Mater statue on the UIUC campus: a bronze robed woman with her arms spread wide in welcome, flanked by two figures, above a granite base inscribed “To thy happy children of the future, those of the past send greetings”',
    credit: 'Daderot, public domain',
    author: 'Daderot',
    source: 'https://commons.wikimedia.org/wiki/File:Alma_Mater_-_UIUC_-_DSC09095.JPG',
    license: 'Public domain',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    taken: '2011-06-12',
    // The sculpture (Lorado Taft, 1929) is itself in the US public domain.
    changes: 'Resized and converted to WebP.',
  },
} satisfies Record<string, CampusPhoto>;
