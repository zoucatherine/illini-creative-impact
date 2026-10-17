// Build-time entry for scripts/prerender.mjs. Renders each page to static HTML so search
// engines and link previews see real content and per-page titles without running JavaScript.
import { renderToString } from 'react-dom/server';
import App from './App.tsx';
import { projects } from './content/projects';
import { serverMeta, setServerLocation } from './lib/router';

export { site } from './content/site';

/** Every canonical page on the site. Old URLs (/join, /pitch, ...) redirect in vercel.json. */
export const routes = [
  '/',
  '/work',
  '/events',
  '/get-involved',
  '/share-an-idea',
  '/partner',
  '/community',
  '/about',
  ...projects.map((project) => `/work/${project.slug}`),
];

export function render(path: string) {
  setServerLocation(path);
  const html = renderToString(<App />);
  return { html, title: serverMeta.title, description: serverMeta.description };
}
