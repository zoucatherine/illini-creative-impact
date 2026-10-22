import { ArtScroller } from './ArtScroller';
import { ArrowLink, Container, Eyebrow, Reveal } from './ui';
import type { ProjectExhibit, ProjectFeature } from '../content/projects';

// Four boards placed edge to edge; the canvas sits on their faces, inside their outline.
const BOARD = { width: 190, top: 30, bottom: 330 };
const BOARD_XS = [100, 290, 480, 670];
const CANVAS = { x: 118, y: 52, width: 724, height: 256 };

export type DoodleKind = 'heart' | 'star' | 'sun' | 'flower' | 'leaf' | 'spiral' | 'smiley' | 'rainbow' | 'squiggle';

// Example marks attendees might add, drawn in a 48×48 box. Fuller on the left, open on the right.
const DOODLES: { kind: DoodleKind; x: number; y: number; scale: number; color: string; rotate?: number }[] = [
  { kind: 'heart', x: 150, y: 80, scale: 1.1, color: '#E87722', rotate: -8 },
  { kind: 'sun', x: 230, y: 150, scale: 1.2, color: '#D4A017' },
  { kind: 'star', x: 300, y: 78, scale: 1, color: '#4A6FA5', rotate: 10 },
  { kind: 'flower', x: 160, y: 200, scale: 1.2, color: '#B7410E' },
  { kind: 'spiral', x: 370, y: 130, scale: 1, color: '#6B8E4E' },
  { kind: 'smiley', x: 290, y: 220, scale: 1.1, color: '#131E38' },
  { kind: 'leaf', x: 420, y: 70, scale: 1, color: '#B7410E', rotate: 20 },
  { kind: 'rainbow', x: 430, y: 200, scale: 1.3, color: '#E87722' },
  { kind: 'squiggle', x: 520, y: 110, scale: 1.2, color: '#4A6FA5' },
  { kind: 'heart', x: 560, y: 220, scale: 0.9, color: '#B7410E', rotate: 10 },
  { kind: 'star', x: 630, y: 160, scale: 0.8, color: '#D4A017', rotate: -12 },
  { kind: 'leaf', x: 720, y: 90, scale: 0.8, color: '#E87722', rotate: -30 },
  { kind: 'flower', x: 740, y: 220, scale: 0.8, color: '#6B8E4E' },
];

const LEAF_PATH =
  'M12 2l1.6 3.6 2.6-1.2-.6 3.4 3.4-.8-1.6 3 2.6 1.2-3.6 1.6.8 2.4-3.4-1-.4 3.4-1.4-1.8V22h-1v-4.2l-1.4 1.8-.4-3.4-3.4 1 .8-2.4L4 13.2l2.6-1.2-1.6-3 3.4.8-.6-3.4 2.6 1.2z';

export function DoodleShape({ kind, color }: { kind: DoodleKind; color: string }) {
  const line = { fill: 'none', stroke: color, strokeWidth: 3.5, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
  switch (kind) {
    case 'heart':
      return (
        <path
          d="M24 42C10 32 4 24 4 16c0-7 6-11 12-11 4 0 7 3 8 6 1-3 4-6 8-6 6 0 12 4 12 11 0 8-6 16-20 26z"
          fill={color}
        />
      );
    case 'star':
      return <polygon points="24,4 29.9,17.6 44.5,18.9 33.5,28.6 36.8,43 24,35.4 11.2,43 14.5,28.6 3.5,18.9 18.1,17.6" {...line} />;
    case 'sun':
      return (
        <g {...line}>
          <circle cx={24} cy={24} r={9} fill={color} />
          {Array.from({ length: 8 }, (_, i) => {
            const angle = (i * Math.PI) / 4;
            return (
              <line
                key={i}
                x1={24 + Math.cos(angle) * 14}
                y1={24 + Math.sin(angle) * 14}
                x2={24 + Math.cos(angle) * 21}
                y2={24 + Math.sin(angle) * 21}
              />
            );
          })}
        </g>
      );
    case 'flower':
      return (
        <g>
          {Array.from({ length: 5 }, (_, i) => {
            const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
            return <circle key={i} cx={24 + Math.cos(angle) * 11} cy={24 + Math.sin(angle) * 11} r={7.5} fill={color} />;
          })}
          <circle cx={24} cy={24} r={6} fill="#D4A017" />
        </g>
      );
    case 'leaf':
      return <path d={LEAF_PATH} fill={color} transform="scale(2)" />;
    case 'spiral':
      return <path d="M24 24c0-3 4-3 4 0 0 5-8 5-8 0 0-8 12-8 12 0 0 11-16 11-16 0 0-14 20-14 20 0" {...line} />;
    case 'smiley':
      return (
        <g>
          <circle cx={24} cy={24} r={18} {...line} />
          <circle cx={18} cy={20} r={2.5} fill={color} />
          <circle cx={30} cy={20} r={2.5} fill={color} />
          <path d="M16 28q8 8 16 0" {...line} />
        </g>
      );
    case 'rainbow':
      return (
        <g {...line} strokeWidth={4}>
          <path d="M6 38a18 18 0 0 1 36 0" stroke="#B7410E" />
          <path d="M12 38a12 12 0 0 1 24 0" stroke="#D4A017" />
          <path d="M18 38a6 6 0 0 1 12 0" stroke="#4A6FA5" />
        </g>
      );
    case 'squiggle':
      return <path d="M4 24q5-10 10 0t10 0 10 0 10 0" {...line} />;
  }
}

/**
 * Sketch of the community artwork: one long canvas mounted on a row of big vertical display
 * boards placed edge to edge, with the kind of marks attendees might add. Not to scale.
 */
export function CanvasOnStandsDiagram() {
  return (
    <svg
      viewBox="0 0 960 370"
      role="img"
      aria-labelledby="canvas-diagram-title canvas-diagram-desc"
      className="h-auto w-full min-w-[600px]"
    >
      <title id="canvas-diagram-title">Sketch of the community artwork setup</title>
      <desc id="canvas-diagram-desc">
        A long horizontal canvas mounted on the faces of four big vertical display boards standing edge to edge. The canvas is
        covered in simple drawn symbols, such as hearts, stars, a sun, flowers, and leaves, with open space left to add more.
      </desc>

      {/* Floor */}
      <line x1={30} y1={352} x2={930} y2={352} stroke="#131E38" strokeOpacity={0.2} strokeWidth={2} strokeDasharray="6 8" />

      {/* Display boards, side by side, each on two short feet */}
      {BOARD_XS.map((x) => (
        <g key={x} stroke="#131E38" strokeWidth={3}>
          <rect x={x} y={BOARD.top} width={BOARD.width} height={BOARD.bottom - BOARD.top} rx={4} fill="#F4EEE3" />
          <g strokeLinecap="round">
            <line x1={x + 30} y1={BOARD.bottom} x2={x + 30} y2={350} />
            <line x1={x + BOARD.width - 30} y1={BOARD.bottom} x2={x + BOARD.width - 30} y2={350} />
            <line x1={x + 12} y1={350} x2={x + 48} y2={350} />
            <line x1={x + BOARD.width - 48} y1={350} x2={x + BOARD.width - 12} y2={350} />
          </g>
        </g>
      ))}

      {/* The canvas, running across the faces of all the boards */}
      <rect {...CANVAS} rx={3} fill="#FFFFFF" stroke="#131E38" strokeWidth={2.5} />

      {DOODLES.map((doodle) => (
        <g
          key={`${doodle.kind}-${doodle.x}-${doodle.y}`}
          transform={`translate(${doodle.x} ${doodle.y}) rotate(${doodle.rotate ?? 0} ${24 * doodle.scale} ${24 * doodle.scale}) scale(${doodle.scale})`}
        >
          <DoodleShape kind={doodle.kind} color={doodle.color} />
        </g>
      ))}
    </svg>
  );
}

/** Full-width band for a project's headline piece, placed right under the header. */
export function ProjectFeatureBand({ feature }: { feature: ProjectFeature }) {
  return (
    <section aria-labelledby="project-feature" className="bg-white py-20 sm:py-28">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>{feature.eyebrow}</Eyebrow>
          <h2
            id="project-feature"
            className="font-editorial text-4xl font-bold leading-tight text-primaryNavy sm:text-5xl"
          >
            {feature.title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">{feature.body}</p>
        </div>

        {feature.diagram === 'canvas-on-stands' && (
          <Reveal className="mt-12">
            <figure>
              <div className="overflow-x-auto rounded-2xl bg-cream p-6 ring-1 ring-primaryNavy/10 sm:p-10">
                <CanvasOnStandsDiagram />
              </div>
              <figcaption className="mt-4 text-lg font-semibold text-primaryNavy">All drawing materials will be provided.</figcaption>
            </figure>
          </Reveal>
        )}

      </Container>
    </section>
  );
}

/** Gallery band of artwork the project plans to show. */
export function ProjectExhibitBand({ exhibit }: { exhibit: ProjectExhibit }) {
  return (
    <section aria-labelledby="project-exhibit" className="overflow-hidden bg-sand py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>On the walls</Eyebrow>
            <h2
              id="project-exhibit"
              className="font-editorial text-4xl font-bold leading-tight text-primaryNavy sm:text-5xl"
            >
              {exhibit.title}
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">{exhibit.body}</p>
          </div>
          {exhibit.link && <ArrowLink href={exhibit.link.href}>{exhibit.link.label}</ArrowLink>}
        </div>
        <div className="mt-10">
          <ArtScroller artworks={exhibit.artworks} label={exhibit.title} />
        </div>
      </Container>
    </section>
  );
}
