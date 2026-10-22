// Shared pieces of the It’s Okay to Fall visual identity, used on its page and its homepage showcase row.
import { campusPhotos, type CampusPhoto } from '../content/campusPhotos';
import { fallExhibition } from '../content/fallExhibition';

/** Credit line for an openly licensed photo: what it shows, author, and license, with links. */
export function PhotoCredit({
  photo,
  label,
  tone = 'light',
  size = 'normal',
}: {
  photo: CampusPhoto;
  label: string;
  tone?: 'light' | 'dark';
  size?: 'normal' | 'small';
}) {
  const link = tone === 'dark' ? 'underline-offset-2 hover:text-white hover:underline' : 'underline-offset-2 hover:text-primaryNavy hover:underline';
  return (
    <span
      className={`${size === 'small' ? 'text-[0.65rem] leading-4' : 'text-xs leading-5'} ${
        tone === 'dark' ? 'text-white/65' : 'text-slate-500'
      }`}
    >
      {label}. Photo:{' '}
      <a href={photo.source} target="_blank" rel="noopener noreferrer" className={link}>
        {photo.author}
      </a>
      ,{' '}
      <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer" className={link}>
        {photo.license}
      </a>
    </span>
  );
}

/** One orange line drawn across the hero photo: the thread that joins everyone’s marks. Decorative. */
export function HeroThread({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 200"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 -z-10 w-full opacity-80 ${className}`}
    >
      <path
        d="M-20 140 C 180 40, 320 190, 520 110 S 860 30, 1040 120 S 1320 170, 1460 60"
        pathLength={1}
        fill="none"
        stroke="#E87722"
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray="1 1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Photo for the It’s Okay to Fall row in the homepage showcase: the autumn Union with the event’s orange thread. */
export function FallExhibitionPhoto() {
  const photo = campusPhotos.unionQuadAutumn;
  return (
    <figure className="relative isolate aspect-[4/3] w-full overflow-hidden rounded-2xl bg-primaryNavy shadow-xl shadow-primaryNavy/10 transition-transform duration-500 hover:scale-[1.01] sm:aspect-[16/10]">
      <img
        src={photo.src}
        srcSet={photo.srcSet}
        sizes="(min-width: 1024px) 55vw, 100vw"
        width={photo.width}
        height={photo.height}
        alt={photo.alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[50%_30%]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-primaryNavy/70 via-primaryNavy/10 to-transparent" />
      <HeroThread className="top-[14%] h-14 sm:h-20" />
      <dl className="absolute inset-x-3 bottom-3 grid grid-cols-3 gap-3 rounded-xl bg-primaryNavy/70 p-3 text-white ring-1 ring-white/15 backdrop-blur-md sm:inset-x-5 sm:bottom-5 sm:gap-4 sm:p-4">
        {[
          { label: 'Date', value: 'Nov 10, 2026' },
          { label: 'Time', value: fallExhibition.timeLabel },
          { label: 'Where', value: fallExhibition.venue },
        ].map((detail) => (
          <div key={detail.label} className="border-l-2 border-illiniOrange pl-3">
            <dt className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-illiniOrange sm:text-xs">{detail.label}</dt>
            <dd className="mt-1 text-xs font-semibold leading-5 sm:text-sm">{detail.value}</dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}
