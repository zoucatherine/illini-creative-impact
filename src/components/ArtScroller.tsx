import React from 'react';
import type { Artwork } from '../content/earthDayGallery';

/**
 * Horizontal, swipeable gallery wall. Works with touch, trackpad, keyboard (focus the
 * strip and use arrow keys), and the previous/next buttons.
 */
export function ArtScroller({ artworks, label }: { artworks: Artwork[]; label: string }) {
  const stripRef = React.useRef<HTMLUListElement>(null);

  const scrollByPage = (direction: 1 | -1) => {
    const strip = stripRef.current;
    if (!strip) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    strip.scrollBy({ left: direction * strip.clientWidth * 0.8, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <div>
      <div className="flex justify-end gap-2">
        {[
          { direction: -1 as const, label: 'Previous artworks', glyph: '←' },
          { direction: 1 as const, label: 'Next artworks', glyph: '→' },
        ].map((button) => (
          <button
            key={button.label}
            type="button"
            onClick={() => scrollByPage(button.direction)}
            aria-label={button.label}
            className="flex h-11 w-11 items-center justify-center rounded-full text-lg font-bold text-primaryNavy ring-1 ring-primaryNavy/20 transition-colors hover:bg-primaryNavy hover:text-white"
          >
            <span aria-hidden="true">{button.glyph}</span>
          </button>
        ))}
      </div>

      <ul
        ref={stripRef}
        tabIndex={0}
        aria-label={label}
        className="-mx-6 mt-6 flex snap-x snap-mandatory scroll-px-6 gap-5 overflow-x-auto px-6 pb-6 [scrollbar-width:thin] sm:-mx-10 sm:scroll-px-10 sm:px-10 lg:-mx-16 lg:scroll-px-16 lg:px-16"
      >
        {artworks.map((artwork) => (
          <li key={artwork.src} className="shrink-0 snap-start">
            <figure>
              <div className="flex h-64 items-center justify-center rounded-lg bg-white p-3 shadow-lg shadow-primaryNavy/10 ring-1 ring-primaryNavy/10 sm:h-80 lg:h-96">
                <img
                  src={artwork.src}
                  alt={artwork.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-auto max-w-[78vw] rounded object-contain sm:max-w-none"
                />
              </div>
              <figcaption className="mt-3 max-w-[16rem] text-sm leading-5">
                <span className="block font-editorial text-base font-semibold italic text-primaryNavy">
                  {artwork.title}
                </span>
                <span className="text-slate-600">
                  {artwork.artist}
                  {artwork.location && ` · ${artwork.location}`}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
