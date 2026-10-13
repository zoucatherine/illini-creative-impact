// Vercel serverless function: receives "Pitch an Idea" submissions from /pitch and posts them
// to a Discord channel. The webhook URL stays on the server (DISCORD_PITCH_WEBHOOK env var),
// so it never ships in the website's code.

const LIMITS = { name: 100, email: 120, idea: 200, goal: 1000, supportDetails: 800 };

const SUPPORT_LABELS = {
  teammates: 'People to work with',
  design: 'Design or visual help',
  outreach: 'Marketing & outreach',
  events: 'Event planning',
  partners: 'A partner organization',
  advice: 'Advice on next steps',
};

function clean(value, max) {
  return String(value ?? '')
    .trim()
    .slice(0, max);
}

/**
 * Neutralizes Discord markdown in user-submitted text so it renders literally: no masked
 * links ([text](url)), headings, bold, spoilers, code blocks, quotes, or <@mention> tags.
 */
export function escapeMarkdown(text) {
  return text.replace(/[\\*_~`|<>#[\]()-]/g, (char) => `\\${char}`);
}

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

/** Validates a submission. Returns { data } or { error }. Exported for testing. */
export function parsePitch(body) {
  if (!body || typeof body !== 'object') return { error: 'Invalid request.' };
  // Spam trap: real people never see or fill this field.
  if (body._gotcha) return { spam: true };

  const data = {
    name: clean(body.name, LIMITS.name),
    email: clean(body.email, LIMITS.email),
    idea: clean(body.idea, LIMITS.idea),
    goal: clean(body.goal, LIMITS.goal),
    supportDetails: clean(body.supportDetails, LIMITS.supportDetails),
    support: Array.isArray(body.support)
      ? body.support.map((value) => SUPPORT_LABELS[value]).filter(Boolean)
      : [],
  };

  if (!data.name || !data.idea || !data.goal) return { error: 'Missing required fields.' };
  if (!/^[^\s@]+@illinois\.edu$/i.test(data.email)) return { error: 'An @illinois.edu email is required.' };
  return { data };
}

/** Builds the Discord message. Mentions are disabled so submissions can't ping @everyone. */
export function discordMessage(data) {
  // Everything people typed is escaped; support labels come from our own fixed list.
  const fields = [
    { name: 'From', value: `${escapeMarkdown(data.name)} (${escapeMarkdown(data.email)})` },
    { name: 'What they hope to accomplish', value: escapeMarkdown(data.goal) },
  ];
  if (data.support.length > 0) fields.push({ name: 'Looking for', value: data.support.join(', ') });
  if (data.supportDetails) fields.push({ name: 'Details', value: escapeMarkdown(data.supportDetails) });

  return {
    username: 'ICI Website',
    allowed_mentions: { parse: [] },
    embeds: [
      {
        title: `💡 New idea: ${data.idea}`.slice(0, 256),
        color: 0xe87722,
        fields: fields.map((field) => ({ ...field, value: field.value.slice(0, 1024) })),
        footer: { text: `Reply to ${data.email}` },
        timestamp: new Date().toISOString(),
      },
    ],
  };
}

/**
 * Reads the webhook from the environment, forgiving copy/paste extras such as
 * surrounding spaces, quotes, backticks, or angle brackets. Exported for testing.
 */
export function readWebhook(raw) {
  const value = String(raw ?? '')
    .trim()
    .replace(/^[`'"<\s]+|[`'">\s]+$/g, '');
  return /^https:\/\/(?:\w+\.)?discord(?:app)?\.com\/api\/webhooks\/\d+\/[\w-]+$/.test(value) ? value : null;
}

export async function POST(request) {
  if (!process.env.DISCORD_PITCH_WEBHOOK) return json(500, { error: 'Pitch submissions are not configured.' });
  const webhook = readWebhook(process.env.DISCORD_PITCH_WEBHOOK);
  if (!webhook) {
    console.error('DISCORD_PITCH_WEBHOOK is not a valid Discord webhook URL.');
    return json(500, { error: 'Pitch submissions are misconfigured.' });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json(400, { error: 'Invalid request.' });
  }

  const result = parsePitch(body);
  if (result.spam) return json(200, { ok: true });
  if (result.error) return json(400, { error: result.error });

  let response;
  try {
    response = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordMessage(result.data)),
    });
  } catch (error) {
    console.error('Discord webhook request failed', error);
    return json(502, { error: 'Could not deliver the pitch.' });
  }

  if (!response.ok) {
    // Discord's status (e.g. 401 bad token, 404 deleted webhook, 429 rate limited) is
    // returned too, so failures can be diagnosed from the browser's network tab.
    console.error('Discord webhook failed', response.status, await response.text());
    return json(502, { error: 'Could not deliver the pitch.', discordStatus: response.status });
  }
  return json(200, { ok: true });
}
