import React from 'react';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

interface HeroGalleryBehindProps {
  title?: string;
  subtitle?: string;
  images: GalleryImage[];
}

export const HeroGalleryBehind: React.FC<HeroGalleryBehindProps> = ({
  title = 'Discover Our Collection',
  subtitle = 'Explore the visual story layered beneath the surface.',
  images,
}) => {
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);

  React.useEffect(() => {
    if (images.length < 2) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveImageIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [images.length]);

  return (
    <section className="hero-gallery relative flex w-full min-w-0 items-center justify-center overflow-hidden bg-white">
      <div className="hero-gallery-frame absolute inset-0 z-0" aria-hidden="true">
        {images.map((image, imageIndex) => (
          <img
            key={image.id}
            src={image.src}
            alt=""
            className={`hero-gallery-image h-full w-full object-cover object-center blur-[1px] ${
              imageIndex === activeImageIndex ? 'is-active' : ''
            }`}
          />
        ))}
      </div>

      <div className="absolute inset-0 z-10 bg-white/5 backdrop-blur-[1px]" />

      <div className="relative z-20 max-w-3xl px-6 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-black drop-shadow-lg md:text-6xl">
          {title}
        </h1>
        <p className="mb-8 text-lg text-zinc-800 drop-shadow-md md:text-xl">
          {subtitle}
        </p>
        <button className="cursor-pointer rounded-full bg-black px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-zinc-800">
          Explore Gallery
        </button>
      </div>
    </section>
  );
};
