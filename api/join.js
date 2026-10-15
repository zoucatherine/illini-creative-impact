// Vercel serverless function: receives "Join ICI" membership interest submissions and posts them
// to a Discord channel. Uses DISCORD_JOIN_WEBHOOK, or falls back to DISCORD_PITCH_WEBHOOK so
// sign-ups still arrive somewhere until a dedicated channel is set up.
import { escapeMarkdown, postToDiscord, readWebhook } from './pitch.js';

const LIMITS = { name: 100, email: 120, majorYear: 120, message: 1000, listItem: 80, listLength: 12 };

const INVOLVEMENT_LABELS = {
  projects: 'Project teams',
  events: 'Event planning',
  initiative: 'Proposing an initiative',
  general: 'General involvement',
};

function clean(value, max) {
  return String(value ?? '')
    .trim()
    .slice(0, max);
}

function cleanList(value) {
  return Array.isArray(value)
    ? value.slice(0, LIMITS.listLength).map((item) => clean(item, LIMITS.listItem)).filter(Boolean)
    : [];
}

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

/** Validates a submission. Returns { data } or { error }. Exported for testing. */
export function parseJoin(body) {
  if (!body || typeof body !== 'object') return { error: 'Invalid request.' };
  if (body._gotcha) return { spam: true };

  const data = {
    name: clean(body.name, LIMITS.name),
    email: clean(body.email, LIMITS.email),
    majorYear: clean(body.majorYear, LIMITS.majorYear),
    message: clean(body.message, LIMITS.message),
    involvement: Array.isArray(body.involvement)
      ? body.involvement.map((value) => INVOLVEMENT_LABELS[value]).filter(Boolean)
      : [],
    skills: cleanList(body.skills),
    projects: cleanList(body.projects),
  };

  if (!data.name) return { error: 'Missing required fields.' };
  if (!/^[^\s@]+@illinois\.edu$/i.test(data.email)) return { error: 'An @illinois.edu email is required.' };
  if (data.involvement.length === 0) return { error: 'Pick at least one way to get involved.' };
  return { data };
}

/** Builds the Discord message. Mentions are disabled so submissions can't ping @everyone. */
export function discordMessage(data) {
  const list = (items) => items.map(escapeMarkdown).join(', ');
  const fields = [
    { name: 'From', value: `${escapeMarkdown(data.name)} (${escapeMarkdown(data.email)})` },
    { name: 'Wants to get involved with', value: data.involvement.join(', ') },
  ];
  if (data.majorYear) fields.push({ name: 'Major / year', value: escapeMarkdown(data.majorYear) });
  if (data.projects.length > 0) fields.push({ name: 'Projects', value: list(data.projects) });
  if (data.skills.length > 0) fields.push({ name: 'Interests', value: list(data.skills) });
  if (data.message) fields.push({ name: 'Message', value: escapeMarkdown(data.message) });

  return {
    username: 'ICI Website',
    allowed_mentions: { parse: [] },
    embeds: [
      {
        title: `🙋 New member sign-up: ${data.name}`.slice(0, 256),
        color: 0x131e38,
        fields: fields.map((field) => ({ ...field, value: field.value.slice(0, 1024) })),
        footer: { text: `Reply to ${data.email}` },
        timestamp: new Date().toISOString(),
      },
    ],
  };
}

export async function POST(request) {
  const raw = process.env.DISCORD_JOIN_WEBHOOK || process.env.DISCORD_PITCH_WEBHOOK;
  if (!raw) return json(500, { error: 'Sign-ups are not configured.' });
  const webhook = readWebhook(raw);
  if (!webhook) {
    console.error('DISCORD_JOIN_WEBHOOK (or DISCORD_PITCH_WEBHOOK) is not a valid Discord webhook URL.');
    return json(500, { error: 'Sign-ups are misconfigured.' });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json(400, { error: 'Invalid request.' });
  }

  const result = parseJoin(body);
  if (result.spam) return json(200, { ok: true });
  if (result.error) return json(400, { error: result.error });

  let response;
  try {
    response = await postToDiscord(webhook, discordMessage(result.data), `🙋 Sign-up: ${result.data.name}`);
  } catch (error) {
    console.error('Discord webhook request failed', error);
    return json(502, { error: 'Could not deliver the sign-up.' });
  }

  if (!response.ok) {
    console.error('Discord webhook failed', response.status, await response.text());
    return json(502, { error: 'Could not deliver the sign-up.', discordStatus: response.status });
  }
  return json(200, { ok: true });
}
