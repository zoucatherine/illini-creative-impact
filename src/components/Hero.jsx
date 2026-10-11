import { useEffect, useState } from 'react';
import studentExpoImage from '../assets/hero-images/student-expo.jpg';
import exhibitGroupImage from '../assets/hero-images/exibit-group.jpg';
import quadDayImage from '../assets/hero-images/2026-quad-day.jpg';
import valentinesSocialImage from '../assets/hero-images/valentines-social.jpg';

const backgroundImages = [
  studentExpoImage,
  exhibitGroupImage,
  quadDayImage,
  valentinesSocialImage,
];

export default function Hero() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveImageIndex((currentIndex) => (currentIndex + 1) % backgroundImages.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section
      className="relative isolate flex min-h-[clamp(34rem,78svh,52rem)] items-center overflow-hidden bg-primaryNavy"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
        {backgroundImages.map((image, imageIndex) => (
          <img
            key={image}
            src={image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[1200ms] ease-in-out"
            style={{
              opacity: imageIndex === activeImageIndex ? 1 : 0,
              willChange: 'opacity',
            }}
          />
        ))}
      </div>
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-primaryNavy via-primaryNavy/95 to-primaryNavy/65"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 lg:px-16">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-illiniOrange">
            Illini Creative Impact
          </p>
          <h1
            id="hero-title"
            className="max-w-2xl text-5xl font-extrabold leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-8xl"
          >
            Creativity meets <span className="italic">impact.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/90 sm:text-xl">
            Join a community of Illinois students turning bold ideas into meaningful change.
          </p>
          <a
            href="/join"
            className="mt-9 inline-flex items-center rounded-full bg-illiniOrange px-7 py-3.5 font-bold text-white shadow-lg shadow-black/20 transition-colors hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-illiniOrange"
          >
            Join the movement
          </a>
        </div>
      </div>
    </section>
  );
}
