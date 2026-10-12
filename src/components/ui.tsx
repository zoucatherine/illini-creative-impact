import React from 'react';
import { motion } from 'framer-motion';
import type { PhotoSlot } from '../content/projects';

export function Container({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16 ${className}`}>{children}</div>;
}

export function Eyebrow({ tone = 'light', children }: { tone?: 'light' | 'dark'; children: React.ReactNode }) {
  return (
    <p
      className={`mb-4 text-sm font-bold uppercase tracking-[0.2em] ${
        tone === 'dark' ? 'text-illiniOrange' : 'text-orangeInk'
      }`}
    >
      {children}
    </p>
  );
}

type ButtonVariant = 'primary' | 'secondary' | 'onDark' | 'navy';

const buttonStyles: Record<ButtonVariant, string> = {
  primary: 'bg-illiniOrange text-primaryNavy hover:bg-[#f08a3c]',
  navy: 'bg-primaryNavy text-white hover:bg-[#1f2d50]',
  secondary: 'border-2 border-primaryNavy/20 text-primaryNavy hover:border-primaryNavy',
  onDark: 'border-2 border-white/40 text-white hover:border-white hover:bg-white/10',
};

export function ButtonLink({
  href,
  variant = 'primary',
  children,
  className = '',
}: {
  href: string;
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
}) {
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3.5 text-base font-bold transition-colors ${buttonStyles[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

export function ArrowLink({
  href,
  children,
  tone = 'light',
}: {
  href: string;
  children: React.ReactNode;
  tone?: 'light' | 'dark';
}) {
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`group inline-flex items-center gap-2 font-bold underline-offset-4 hover:underline ${
        tone === 'dark' ? 'text-illiniOrange' : 'text-orangeInk'
      }`}
    >
      {children}
      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}

export function StatusBadge({
  label,
  tone = 'neutral',
  onDark = false,
}: {
  label: string;
  tone?: 'live' | 'neutral' | 'muted';
  onDark?: boolean;
}) {
  const styles = (
    onDark
      ? {
          live: 'bg-emerald-400/15 text-emerald-200 ring-emerald-300/30',
          neutral: 'bg-illiniOrange/15 text-illiniOrange ring-illiniOrange/30',
          muted: 'bg-white/10 text-white/75 ring-white/20',
        }
      : {
          live: 'bg-emerald-50 text-emerald-800 ring-emerald-700/20',
          neutral: 'bg-orangeInk/10 text-orangeInk ring-orangeInk/20',
          muted: 'bg-primaryNavy/5 text-slate-600 ring-primaryNavy/15',
        }
  )[tone];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset ${styles}`}>
      {tone === 'live' && <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" aria-hidden="true" />}
      {label}
    </span>
  );
}

/** A real photo, or a clearly labeled placeholder describing the photo that belongs there. */
export function PhotoFrame({
  slot,
  className = '',
  showCaption = false,
  sizes,
}: {
  slot: PhotoSlot;
  className?: string;
  showCaption?: boolean;
  sizes?: string;
}) {
  if (slot.photo) {
    return (
      <figure className={`relative overflow-hidden bg-sand ${className}`}>
        <img
          src={slot.photo.src}
          alt={slot.photo.alt}
          loading="lazy"
          decoding="async"
          sizes={sizes}
          style={{ objectPosition: slot.photo.position }}
          className={`h-full w-full ${slot.photo.fit === 'contain' ? 'object-contain p-4 sm:p-6' : 'object-cover'}`}
        />
        {showCaption && slot.caption && (
          <figcaption className="absolute bottom-3 left-3 rounded-full bg-primaryNavy/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            {slot.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <div
      className={`placeholder-hatch flex flex-col items-center justify-center gap-2 border border-dashed border-primaryNavy/25 p-6 text-center ${className}`}
      role="img"
      aria-label={`Photo needed: ${slot.placeholder ?? 'project photo'}`}
    >
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Photo needed</span>
      <span className="max-w-[16rem] text-sm leading-6 text-slate-600">{slot.placeholder}</span>
    </div>
  );
}

/** Labeled block for content that still needs to be written or confirmed. */
export function ContentNeeded({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-primaryNavy/25 bg-white/60 px-5 py-4 text-sm leading-6 text-slate-600">
      <span className="mr-2 font-bold uppercase tracking-[0.14em] text-slate-500">Content needed</span>
      {children}
    </div>
  );
}

/** Subtle fade-up on scroll. Disabled automatically for users who prefer reduced motion. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = 'light',
  id,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  tone?: 'light' | 'dark';
  id?: string;
}) {
  return (
    <div className="max-w-3xl">
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className={`font-editorial text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl ${
          tone === 'dark' ? 'text-white' : 'text-primaryNavy'
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-6 text-lg leading-8 ${tone === 'dark' ? 'text-white/80' : 'text-slate-600'}`}>{intro}</p>
      )}
    </div>
  );
}
