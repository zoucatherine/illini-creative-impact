import React from 'react';
import type { Artwork } from '../content/earthDayGallery';

const INTERVAL = 4000;

/**
 * Crossfading slideshow of artwork for a showcase row. Advances on its own, pauses on hover, and
 * stays on the first piece for visitors who prefer reduced motion. Each image loads one slide ahead.
 */
export function ArtSlideshow({ artworks, className = '' }: { artworks: Artwork[]; className?: string }) {
  const [current, setCurrent] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  // Indices that have been shown or are next up; only these get an <img>.
  const [loaded, setLoaded] = React.useState(() => new Set([0, 1]));

  React.useEffect(() => {
    if (paused || artworks.length < 2) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      setCurrent((index) => {
        const next = (index + 1) % artworks.length;
        setLoaded((set) => new Set(set).add(next).add((next + 1) % artworks.length));
        return next;
      });
    }, INTERVAL);
    return () => window.clearInterval(timer);
  }, [paused, artworks.length]);

  const art = artworks[current];

  return (
    <figure
      className={`relative isolate overflow-hidden bg-primaryNavy ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {artworks.map((artwork, index) =>
        loaded.has(index) ? (
          <div
            key={artwork.src}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden={index !== current}
          >
            {/* Blurred copy fills the frame behind artwork that doesn’t match its shape. */}
            <img src={artwork.src} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-2xl" />
            <img
              src={artwork.src}
              alt={artwork.alt}
              loading={index === 0 ? 'lazy' : 'eager'}
              decoding="async"
              className="relative h-full w-full object-contain p-6 drop-shadow-xl sm:p-8"
            />
          </div>
        ) : null,
      )}
      <figcaption className="absolute bottom-3 left-3 max-w-[80%] truncate rounded-full bg-primaryNavy/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
        “{art.title}” by {art.artist}
      </figcaption>
      <div aria-hidden="true" className="absolute bottom-4 right-4 flex gap-1">
        {artworks.map((artwork, index) => (
          <span
            key={artwork.src}
            className={`h-1.5 rounded-full bg-white transition-all duration-500 ${index === current ? 'w-4' : 'w-1.5 opacity-40'}`}
          />
        ))}
      </div>
    </figure>
  );
}
