import { DoodleShape, type DoodleKind } from './ProjectBands';

// Illustration of the It’s Okay to Fall collective artwork: a row of tall display boards standing
// side by side, filling with marks over the day. Marks are generated from a fixed seed, so the
// server-rendered and client-rendered SVG match. Not a photo, and the messages are examples.
//
// Nobody knows what the finished piece will look like, so the marks are placed freely rather than
// on a grid: different sizes, overlapping, a mix of drawings, scribbles, washes of color, and
// handwriting in different moods.

const BOARD_COUNT = 5;
const BOARD = { width: 164, gap: 8, top: 24, bottom: 344 };
const START_X = (960 - (BOARD_COUNT * BOARD.width + (BOARD_COUNT - 1) * BOARD.gap)) / 2;
const PAD = 8;

const COLORS = ['#E87722', '#B7410E', '#D4A017', '#4A6FA5', '#6B8E4E', '#131E38', '#7B5EA7', '#2E8B8B', '#C0392B'];
const KINDS: DoodleKind[] = ['heart', 'flower', 'leaf', 'spiral', 'squiggle', 'star', 'leaf', 'spiral'];
// Example messages, written by us for the illustration. Not quotes from attendees.
const WORDS = [
  'you’re not alone',
  'tired, but here',
  'it’s heavy sometimes',
  'still here',
  'me too',
  'one day at a time',
  'not okay today. still okay.',
  'I failed and I’m fine',
  'call your mom',
  'rest counts',
  'small steps',
  'same',
  'we’ve got you',
  'it gets lighter',
  'be gentle with yourself',
  'ask for help',
  'proud of you',
  'you matter',
  'breathe',
  'held',
];

type Mark =
  | { type: 'doodle'; kind: DoodleKind; x: number; y: number; scale: number; rotate: number; color: string; order: number }
  | { type: 'stroke'; d: string; color: string; width: number; order: number }
  | { type: 'wash'; cx: number; cy: number; rx: number; ry: number; rotate: number; color: string; order: number }
  | { type: 'word'; text: string; x: number; y: number; size: number; rotate: number; color: string; order: number };

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

type Box = { x: number; y: number; w: number; h: number };

function overlaps(a: Box, b: Box, slack = 0) {
  return a.x + slack < b.x + b.w && b.x + slack < a.x + a.w && a.y + slack < b.y + b.h && b.y + slack < a.y + a.h;
}

function buildMarks(): Mark[] {
  const random = seeded(1110);
  const pick = <T,>(items: T[]) => items[Math.floor(random() * items.length)];
  const between = (min: number, max: number) => min + random() * (max - min);
  const marks: Mark[] = [];
  let word = Math.floor(random() * WORDS.length);

  for (let board = 0; board < BOARD_COUNT; board++) {
    const left = boardX(board) + PAD;
    const right = boardX(board) + BOARD.width - PAD;
    const top = BOARD.top + PAD;
    const bottom = BOARD.bottom - PAD;
    const inX = (margin: number) => between(left + margin, right - margin);
    const inY = (margin: number) => between(top + margin, bottom - margin);
    // Everything placed on this board so far. Words never overlap anything; shapes may brush each other
    // slightly but keep clear of the writing, so the board reads as crowded rather than jumbled.
    const taken: Box[] = [];
    const fits = (box: Box, slack: number) => taken.every((other) => !overlaps(box, other, slack));
    const place = (make: () => Box, slack: number, attempts = 24): Box | undefined => {
      for (let i = 0; i < attempts; i++) {
        const box = make();
        if (fits(box, slack)) {
          taken.push(box);
          return box;
        }
      }
      return undefined;
    };

    // Handwriting first, so it always gets room. Different sizes and moods.
    const wordCount = 3 + Math.floor(random() * 2);
    for (let i = 0; i < wordCount; i++) {
      const text = WORDS[word % WORDS.length];
      const size = between(14, 23);
      const width = Math.min(text.length * size * 0.42, right - left);
      const box = place(() => ({ x: left + between(0, right - left - width), y: inY(14) - size * 0.8, w: width, h: size }), -2);
      if (!box) continue;
      word++;
      marks.push({
        type: 'word',
        text,
        x: box.x,
        y: box.y + size * 0.8,
        size,
        rotate: between(-9, 9),
        color: random() > 0.3 ? '#131E38' : pick(['#A84C0A', '#4A6FA5', '#6B8E4E']),
        order: random(),
      });
    }

    // A soft wash of color on most boards, often among the first things put down.
    if (random() < 0.7) {
      const rx = between(26, 50);
      const ry = between(18, 34);
      const box = place(() => ({ x: inX(rx + 4) - rx, y: inY(ry + 4) - ry, w: rx * 2, h: ry * 2 }), 10);
      if (box) {
        marks.push({
          type: 'wash',
          cx: box.x + rx,
          cy: box.y + ry,
          rx,
          ry,
          rotate: between(-30, 30),
          color: pick(COLORS),
          order: random() * 0.7,
        });
      }
    }

    // Drawings, scribbles, rings, and dots, placed freely.
    const shapeCount = 6 + Math.floor(random() * 3);
    for (let i = 0; i < shapeCount; i++) {
      const color = pick(COLORS);
      const roll = random();
      const order = random();
      if (roll < 0.55) {
        const scale = between(0.35, 0.95);
        const size = 48 * scale;
        const box = place(() => ({ x: inX(size / 2 + 2) - size / 2, y: inY(size / 2 + 2) - size / 2, w: size, h: size }), 6);
        if (!box) continue;
        marks.push({ type: 'doodle', kind: pick(KINDS), x: box.x, y: box.y, scale, rotate: between(-45, 45), color, order });
      } else if (roll < 0.78) {
        // A loose scribble: a few quadratic curves wandering across part of the board.
        const segments = 2 + Math.floor(random() * 3);
        const direction = random() > 0.5 ? 1 : -1;
        const w = segments * 18;
        const h = 30;
        const box = place(() => ({ x: inX(w / 2 + 2) - w / 2, y: inY(h / 2 + 2) - h / 2, w, h }), 4);
        if (!box) continue;
        const x0 = direction > 0 ? box.x + 2 : box.x + w - 2;
        let d = `M${x0.toFixed(1)} ${(box.y + h / 2).toFixed(1)}`;
        for (let k = 0; k < segments; k++) {
          d += ` q${(direction * between(6, 12)).toFixed(1)} ${between(-14, 14).toFixed(1)} ${(direction * between(14, 18)).toFixed(1)} ${between(-5, 5).toFixed(1)}`;
        }
        marks.push({ type: 'stroke', d, color, width: between(2.5, 4.5), order });
      } else if (roll < 0.9) {
        // An imperfect ring.
        const r = between(8, 18);
        const box = place(() => ({ x: inX(r + 3) - r, y: inY(r + 3) - r, w: r * 2, h: r * 2 }), 4);
        if (!box) continue;
        const cx = box.x + r;
        const cy = box.y + r;
        const wobble = between(0.88, 1.12);
        const d = `M${(cx - r).toFixed(1)} ${cy.toFixed(1)} a${r.toFixed(1)} ${(r * wobble).toFixed(1)} ${between(-20, 20).toFixed(0)} 1 0 ${(2 * r).toFixed(1)} 0 a${r.toFixed(1)} ${(r * wobble).toFixed(1)} 0 1 0 ${(-2 * r + between(-3, 3)).toFixed(1)} ${between(-2, 2).toFixed(1)}`;
        marks.push({ type: 'stroke', d, color, width: between(2, 3.5), order });
      } else {
        // A cluster of dots.
        const box = place(() => ({ x: inX(16) - 14, y: inY(14) - 12, w: 28, h: 24 }), 4);
        if (!box) continue;
        let d = '';
        const count = 3 + Math.floor(random() * 4);
        for (let k = 0; k < count; k++) {
          d += `M${(box.x + between(2, 26)).toFixed(1)} ${(box.y + between(2, 22)).toFixed(1)}h0.1`;
        }
        marks.push({ type: 'stroke', d, color, width: between(5, 7), order });
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
        Five tall display boards stand side by side, covered in overlapping hand-drawn marks of different sizes:
        washes of color, scribbles, rings, hearts, flowers, leaves, and short handwritten messages such as “you’re
        not alone,” “tired, but here,” and “me too.” A single line runs across all the boards, joining the marks
        into one piece.
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

      {/* Marks are clipped to the boards, so a drawing can run right up to an edge without spilling off it. */}
      <defs>
        <clipPath id={`${id}-boards`}>
          {Array.from({ length: BOARD_COUNT }, (_, index) => (
            <rect key={index} x={boardX(index)} y={BOARD.top} width={BOARD.width} height={BOARD.bottom - BOARD.top} rx={4} />
          ))}
        </clipPath>
      </defs>

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

      <g clipPath={`url(#${id}-boards)`}>
      {MARKS.map((mark, index) => {
        const on = mark.order <= progress;
        const style = intro ? { animationDelay: `${0.25 + mark.order * 1.8}s` } : undefined;
        const className = `wall-mark ${on ? 'is-on' : ''}`;
        if (mark.type === 'wash') {
          return (
            <ellipse
              key={index}
              cx={mark.cx}
              cy={mark.cy}
              rx={mark.rx}
              ry={mark.ry}
              transform={`rotate(${mark.rotate} ${mark.cx} ${mark.cy})`}
              className={className}
              style={style}
              fill={mark.color}
              fillOpacity={0.16}
            />
          );
        }
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
                fontSize={mark.size}
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
              strokeWidth={mark.width}
              strokeLinecap="round"
              strokeLinejoin="round"
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
      </g>

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
    </svg>
  );
}
