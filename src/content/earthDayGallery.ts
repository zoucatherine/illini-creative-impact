// Selected entries from the Earth Day Every Day web gallery (earthdayeveryday.artcall.org).
// Images are resized copies of the artists' submissions. Titles and names are as submitted.
import art05 from '../assets/earth-day/art-05.webp';
import art13 from '../assets/earth-day/art-13.webp';
import art20 from '../assets/earth-day/art-20.webp';
import art15 from '../assets/earth-day/art-15.webp';
import art09 from '../assets/earth-day/art-09.webp';
import art12 from '../assets/earth-day/art-12.webp';
import art01 from '../assets/earth-day/art-01.webp';
import art16 from '../assets/earth-day/art-16.webp';
import art08 from '../assets/earth-day/art-08.webp';
import art11 from '../assets/earth-day/art-11.webp';
import art04 from '../assets/earth-day/art-04.webp';
import art10 from '../assets/earth-day/art-10.webp';
import art03 from '../assets/earth-day/art-03.webp';
import art17 from '../assets/earth-day/art-17.webp';
import art14 from '../assets/earth-day/art-14.webp';
import art07 from '../assets/earth-day/art-07.webp';
import art02 from '../assets/earth-day/art-02.webp';
import art19 from '../assets/earth-day/art-19.webp';

export interface Artwork {
  src: string;
  title: string;
  artist: string;
  location: string;
  alt: string;
}

export const earthDayGalleryUrl = 'https://earthdayeveryday.artcall.org/pages/web-gallery';

export const earthDayArtworks: Artwork[] = [
  { src: art05, title: 'Royal Gaze', artist: 'Tamara', location: 'Croatia', alt: 'Acrylic painting of a blue peacock with its tail feathers fanned out' },
  { src: art13, title: 'Snow Leopard', artist: 'Alex', location: 'Illinois', alt: 'Realistic drawing of a snow leopard’s head in profile' },
  { src: art20, title: 'Spring Squirrels', artist: 'Jasmine', location: 'Illinois', alt: 'Illustration of squirrels at the foot of a large tree in spring' },
  { src: art15, title: 'The Messy Genius', artist: 'Kevorkk Steven', location: 'Lagos, Nigeria', alt: 'Abstract piece of melted, swirling rainbow colors' },
  { src: art09, title: 'Mullaghmore Unesco Site, Ireland', artist: 'Fiona', location: '', alt: 'Painting of a layered limestone hillside under a gray sky' },
  { src: art12, title: 'Rain', artist: 'Jeff', location: '', alt: 'Abstract painting of blue and yellow splatters with a pink framed section' },
  { src: art01, title: 'M Elizabeth Photography', artist: 'Megan', location: 'Indiana', alt: 'Close up photograph of a pale purple wild geranium flower' },
  { src: art16, title: 'São Jorge e o Dragão', artist: 'Ediomar', location: 'Santa Catarina, Brazil', alt: 'Detailed painting of Saint George on a white horse with the dragon, in gold and black' },
  { src: art08, title: 'Blooming', artist: 'Ornela', location: 'Mallorca, Spain', alt: 'Textile piece of tufted yarn in bright pink, blue, green, and yellow' },
  { src: art11, title: 'i will remain the same', artist: 'Paridhi', location: 'Illinois', alt: 'Charcoal drawing of tree roots reaching into rippling water' },
  { src: art04, title: 'Platasi', artist: 'Juana Perfecta', location: 'California', alt: 'Mixed media collage of layered paper and painted blocks in muted colors' },
  { src: art10, title: 'Forces of Nature', artist: 'Krešimira', location: 'Croatia', alt: 'Ink and watercolor drawing of an eagle, rams, and other animals in decorative patterns' },
  { src: art03, title: 'Along The Street', artist: 'Leila', location: 'Illinois', alt: 'Photograph of purple flowers on a dark vine at night' },
  { src: art17, title: 'Mycelial Memory', artist: 'Gen', location: 'Illinois', alt: 'Charcoal drawing of twisting roots and leaves' },
  { src: art14, title: 'Connections', artist: 'Malia', location: 'California', alt: 'Sculpture of two green ceramic vessels joined by a clear pool of resin' },
  { src: art07, title: 'Butterflies', artist: 'Aliyah', location: 'California', alt: 'Framed print densely filled with butterflies' },
  { src: art02, title: 'At the Limits of Our Knowing', artist: 'Tripp Baird', location: 'California', alt: 'Abstract painting of dark blue, rust, and gold textures' },
  { src: art19, title: 'Enduring Scraps', artist: 'Ethan', location: 'California', alt: 'Black and white photograph of a makeshift shack built on a stone wall' },
];
