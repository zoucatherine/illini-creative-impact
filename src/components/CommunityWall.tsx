import { DoodleShape, type DoodleKind } from './ProjectBands';

// Illustration of the It’s Okay to Fall collective artwork: a row of tall display boards standing
// side by side, filling with small marks over the day. Marks are generated from a fixed seed, so the
// server-rendered and client-rendered SVG match. Not a photo, and the messages are examples.

const BOARD_COUNT = 5;
const BOARD = { width: 164, gap: 8, top: 24, bottom: 344 };
const START_X = (960 - (BOARD_COUNT * BOARD.width + (BOARD_COUNT - 1) * BOARD.gap)) / 2;
const ROWS = 6;
const COLS = 3;
const PAD = 10;
const ROW_H = (BOARD.bottom - BOARD.top - PAD * 2) / ROWS;
const COL_W = (BOARD.width - PAD * 2) / COLS;

const COLORS = ['#E87722', '#B7410E', '#D4A017', '#4A6FA5', '#6B8E4E', '#131E38'];
const KINDS: DoodleKind[] = ['heart', 'star', 'sun', 'flower', 'spiral', 'smiley', 'rainbow', 'squiggle', 'leaf'];
// Example messages, written by us for the illustration. Not quotes from attendees.
const WORDS = [
  'you’re not alone',
  'breathe',
  'still here',
  'one day at a time',
  'proud of you',
  'rest counts',
  'keep going',
  'we’ve got you',
  'it gets lighter',
  'me too',
  'be gentle',
  'ask for help',
];

type Mark =
  | { type: 'doodle'; kind: DoodleKind; x: number; y: number; scale: number; rotate: number; color: string; order: number }
  | { type: 'stroke'; d: string; color: string; order: number }
  | { type: 'word'; text: string; x: number; y: number; rotate: number; color: string; order: number };

function seeded(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function boardX(index: number) {
  return START_X + index * (BOARD.width + BOARD.gap);
}

function buildMarks(): Mark[] {
  const random = seeded(1110);
  const pick = <T,>(items: T[]) => items[Math.floor(random() * items.length)];
  const marks: Mark[] = [];
  let word = 0;

  for (let board = 0; board < BOARD_COUNT; board++) {
    const left = boardX(board) + PAD;
    // Two rows per board hold a written message; the rest hold drawings and strokes.
    const wordRows = new Set([Math.floor(random() * 3), 3 + Math.floor(random() * 3)]);
    for (let row = 0; row < ROWS; row++) {
      const top = BOARD.top + PAD + row * ROW_H;
      if (wordRows.has(row)) {
        const text = WORDS[word++ % WORDS.length];
        const width = text.length * 7.2;
        marks.push({
          type: 'word',
          text,
          x: left + 4 + random() * Math.max(0, BOARD.width - PAD * 2 - width - 8),
          y: top + ROW_H * 0.62,
          rotate: (random() - 0.5) * 8,
          color: random() > 0.35 ? '#131E38' : '#A84C0A',
          order: random(),
        });
        continue;
      }
      for (let col = 0; col < COLS; col++) {
        if (random() < 0.22) continue; // leave some space open
        const cx = left + col * COL_W + COL_W / 2 + (random() - 0.5) * 10;
        const cy = top + ROW_H / 2 + (random() - 0.5) * 10;
        const color = pick(COLORS);
        if (random() < 0.3) {
          const w = COL_W * 0.8;
          const x0 = cx - w / 2;
          const lift = 6 + random() * 8;
          marks.push({
            type: 'stroke',
            d: `M${x0} ${cy}q${w / 4} ${-lift} ${w / 2} 0t${w / 2} 0`,
            color,
            order: random(),
          });
        } else {
          const scale = 0.55 + random() * 0.2;
          marks.push({
            type: 'doodle',
            kind: pick(KINDS),
            x: cx - 24 * scale,
            y: cy - 24 * scale,
            scale,
            rotate: (random() - 0.5) * 30,
            color,
            order: random(),
          });
        }
      }
    }
  }
  return marks;
}

const MARKS = buildMarks();

// A single line that runs across every board: the individual marks joined into one piece.
const THREAD = (() => {
  const x0 = boardX(0) + 6;
  const x1 = boardX(BOARD_COUNT - 1) + BOARD.width - 6;
  const steps = 10;
  const step = (x1 - x0) / steps;
  let d = `M${x0} 196`;
  for (let i = 0; i < steps; i++) d += ` q${step / 2} ${i % 2 ? 34 : -34} ${step} 0`;
  return d;
})();

export function CommunityWall({
  progress = 1,
  intro = false,
  tone = 'light',
  id,
  className = '',
}: {
  /** 0 to 1: how far through the day the artwork is. Marks added by then are shown. */
  progress?: number;
  /** Animate the visible marks in on first paint. */
  intro?: boolean;
  tone?: 'light' | 'dark';
  /** Unique prefix for the title and description ids. */
  id: string;
  className?: string;
}) {
  const dark = tone === 'dark';
  return (
    <svg
      viewBox="0 0 960 384"
      role="img"
      aria-labelledby={`${id}-title ${id}-desc`}
      className={`h-auto w-full ${intro ? 'wall-intro' : ''} ${className}`}
    >
      <title id={`${id}-title`}>Illustration of the collective artwork</title>
      <desc id={`${id}-desc`}>
        Five tall display boards stand side by side, covered in small hand-drawn marks: hearts, stars, suns, flowers,
        strokes of color, and short handwritten messages such as “you’re not alone” and “one day at a time.” A single
        line runs across all the boards, joining the marks into one piece.
      </desc>

      <line
        x1={20}
        y1={374}
        x2={940}
        y2={374}
        stroke={dark ? '#FFFFFF' : '#131E38'}
        strokeOpacity={dark ? 0.25 : 0.2}
        strokeWidth={2}
        strokeDasharray="6 8"
      />

      {Array.from({ length: BOARD_COUNT }, (_, index) => {
        const x = boardX(index);
        return (
          <g key={index}>
            <g stroke={dark ? '#FFFFFF' : '#131E38'} strokeOpacity={dark ? 0.45 : 1} strokeWidth={3} strokeLinecap="round">
              <line x1={x + 28} y1={BOARD.bottom} x2={x + 28} y2={372} />
              <line x1={x + BOARD.width - 28} y1={BOARD.bottom} x2={x + BOARD.width - 28} y2={372} />
            </g>
            <rect
              x={x}
              y={BOARD.top}
              width={BOARD.width}
              height={BOARD.bottom - BOARD.top}
              rx={4}
              fill={dark ? '#FDFBF7' : '#FFFFFF'}
              stroke="#131E38"
              strokeOpacity={dark ? 0 : 1}
              strokeWidth={2.5}
            />
          </g>
        );
      })}

      <path
        d={THREAD}
        pathLength={1}
        fill="none"
        stroke="#E87722"
        strokeOpacity={0.55}
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray="1 1"
        className="wall-thread"
        style={{ strokeDashoffset: 1 - progress }}
      />

      {MARKS.map((mark, index) => {
        const on = mark.order <= progress;
        const style = intro ? { animationDelay: `${0.25 + mark.order * 1.8}s` } : undefined;
        const className = `wall-mark ${on ? 'is-on' : ''}`;
        if (mark.type === 'word') {
          return (
            <g key={index} transform={`rotate(${mark.rotate} ${mark.x} ${mark.y})`}>
              <text
                x={mark.x}
                y={mark.y}
                className={className}
                style={style}
                fill={mark.color}
                fontFamily="Caveat, 'Segoe Print', 'Bradley Hand', cursive"
                fontSize={19}
                fontWeight={600}
              >
                {mark.text}
              </text>
            </g>
          );
        }
        if (mark.type === 'stroke') {
          return (
            <path
              key={index}
              d={mark.d}
              className={className}
              style={style}
              fill="none"
              stroke={mark.color}
              strokeWidth={4}
              strokeLinecap="round"
            />
          );
        }
        return (
          <g
            key={index}
            transform={`translate(${mark.x} ${mark.y}) rotate(${mark.rotate} ${24 * mark.scale} ${24 * mark.scale}) scale(${mark.scale})`}
          >
            <g className={className} style={style}>
              <DoodleShape kind={mark.kind} color={mark.color} />
            </g>
          </g>
        );
      })}
    </svg>
  );
}
