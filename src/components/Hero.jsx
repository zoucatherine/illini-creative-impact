import { useEffect, useState } from 'react';
import { photos } from '../content/photos';
import { joinHref } from '../content/site';

const backgroundImages = [
  { photo: photos.valentinesSocial, caption: 'Valentine’s social' },
  { photo: photos.quadDay2026, caption: 'Quad Day 2026' },
  { photo: photos.drawingTable, caption: 'Drawing together' },
  { photo: photos.studentExpo, caption: 'Student expo' },
];

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

export default function Hero() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(prefersReducedMotion);

  useEffect(() => {
    if (isPaused) return undefined;
    const intervalId = window.setInterval(() => {
      setActiveImageIndex((currentIndex) => (currentIndex + 1) % backgroundImages.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [isPaused]);

  const active = backgroundImages[activeImageIndex];

  return (
    <section
      className="relative isolate flex min-h-[clamp(36rem,92svh,58rem)] items-end overflow-hidden bg-primaryNavy"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
        {backgroundImages.map(({ photo }, imageIndex) => (
          <img
            key={photo.src}
            src={photo.src}
            alt=""
            fetchPriority={imageIndex === 0 ? 'high' : 'low'}
            className="absolute inset-0 h-full w-full scale-105 object-cover object-center transition-opacity duration-[1200ms] ease-in-out"
            style={{ opacity: imageIndex === activeImageIndex ? 1 : 0, willChange: 'opacity' }}
          />
        ))}
      </div>
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-primaryNavy via-primaryNavy/80 to-primaryNavy/40 lg:bg-gradient-to-r lg:from-primaryNavy lg:via-primaryNavy/85 lg:to-primaryNavy/30"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-7xl px-6 pb-16 pt-36 sm:px-10 sm:pb-24 lg:px-16">
        <div className="max-w-4xl">
          <p className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-illiniOrange">
            Illini Creative Impact · UIUC
          </p>
          <h1
            id="hero-title"
            className="font-editorial text-5xl font-bold leading-[0.98] tracking-tight text-white sm:text-7xl lg:text-8xl"
          >
            Creativity can change our <span className="italic text-illiniOrange">communities.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/85 sm:text-xl sm:leading-9">
            We bring students together to support local organizations, champion causes, and create experiences that
            bring people closer.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href={joinHref}
              className="inline-flex items-center justify-center rounded-full bg-illiniOrange px-7 py-4 text-base font-bold text-primaryNavy shadow-lg shadow-black/20 transition-colors hover:bg-[#f08a3c]"
            >
              Join ICI
            </a>
            <a
              href="/#work"
              className="inline-flex items-center justify-center rounded-full border-2 border-white/40 px-7 py-4 text-base font-bold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Explore Our Work
            </a>
          </div>
        </div>

        <div className="mt-14 flex items-center justify-between gap-4 border-t border-white/15 pt-5 text-sm text-white/70">
          <p aria-live="off">
            <span className="sr-only">Background photo: </span>
            {active.caption}
          </p>
          <button
            type="button"
            onClick={() => setIsPaused((paused) => !paused)}
            className="rounded-full px-3 py-1.5 font-semibold text-white/80 ring-1 ring-white/25 transition-colors hover:bg-white/10 hover:text-white"
          >
            {isPaused ? 'Play slideshow' : 'Pause slideshow'}
          </button>
        </div>
      </div>
    </section>
  );
}
