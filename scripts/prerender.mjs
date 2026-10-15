// Runs after `vite build`. Writes a prerendered HTML file for every page in dist/, plus
// 404.html and sitemap.xml. Vercel serves dist/about.html at /about (cleanUrls in vercel.json).
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const serverDir = join(root, 'dist-ssr');

const { render, routes, site } = await import(pathToFileURL(join(serverDir, 'entry-server.js')).href);

const template = readFileSync(join(dist, 'index.html'), 'utf8');

const escapeHtml = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Puts `value` between the pattern's two capture groups. Uses a function so `$` in page
// text is never read as a replacement pattern.
function setTag(html, pattern, value) {
  if (!pattern.test(html)) throw new Error(`prerender: index.html is missing ${pattern}`);
  return html.replace(pattern, (_match, before, after) => before + value + after);
}

function page(path, { noindex = false } = {}) {
  const { html, title, description } = render(path);
  if (!title || !description) throw new Error(`prerender: ${path} did not set a title and description`);
  const url = site.url + path;
  const t = escapeHtml(title);
  const d = escapeHtml(description);
  let out = template;
  out = setTag(out, /(<title>)[^<]*(<\/title>)/, t);
  out = setTag(out, /(<meta\s+name="description"\s+content=")[^"]*(")/, d);
  out = setTag(out, /(<meta property="og:title" content=")[^"]*(")/, t);
  out = setTag(out, /(<meta\s+property="og:description"\s+content=")[^"]*(")/, d);
  out = setTag(out, /(<meta property="og:url" content=")[^"]*(")/, url);
  if (noindex) {
    out = out.replace(/\s*<link rel="canonical"[^>]*>/, '');
    out = setTag(out, /(<\/title>)()/, '\n    <meta name="robots" content="noindex" />');
  } else {
    out = setTag(out, /(<link rel="canonical" href=")[^"]*(")/, url);
  }
  return setTag(out, /(<div id="root">)(<\/div>)/, html);
}

function write(file, contents) {
  mkdirSync(dirname(join(dist, file)), { recursive: true });
  writeFileSync(join(dist, file), contents);
}

for (const path of routes) {
  write(path === '/' ? 'index.html' : `${path.slice(1)}.html`, page(path));
}
write('404.html', page('/this-page-does-not-exist', { noindex: true }));

const today = new Date().toISOString().slice(0, 10);
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((path) => `  <url><loc>${site.url}${path === '/' ? '/' : path}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`,
);

rmSync(serverDir, { recursive: true, force: true });
console.log(`prerendered ${routes.length} pages, 404.html, and sitemap.xml`);
