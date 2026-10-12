import React from 'react';
import { site } from '../content/site';

export interface Location {
  path: string;
  search: string;
  hash: string;
}

function readLocation(): Location {
  return {
    path: window.location.pathname.replace(/\/+$/, '') || '/',
    search: window.location.search,
    hash: window.location.hash,
  };
}

export function navigate(href: string) {
  window.history.pushState({}, '', href);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

function scrollToHash(hash: string) {
  const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
  if (target) {
    target.scrollIntoView();
  } else {
    window.scrollTo(0, 0);
  }
}

/**
 * Tracks the current URL and turns same-origin link clicks into client-side navigation,
 * so every plain <a href="/..."> in the app works without a full page reload.
 */
export function useLocation() {
  const [location, setLocation] = React.useState(readLocation);

  React.useEffect(() => {
    const handlePopState = () => setLocation(readLocation());

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest('a');
      if (!anchor || anchor.target || anchor.hasAttribute('download')) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;

      event.preventDefault();
      const samePage =
        url.pathname === window.location.pathname && url.search === window.location.search;
      if (samePage && url.hash) {
        window.history.pushState({}, '', url.hash);
        scrollToHash(url.hash);
        return;
      }
      navigate(url.pathname + url.search + url.hash);
    };

    window.addEventListener('popstate', handlePopState);
    document.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  // After a route renders, jump to the requested section or the top of the page.
  React.useEffect(() => {
    const frame = window.requestAnimationFrame(() => scrollToHash(location.hash));
    return () => window.cancelAnimationFrame(frame);
  }, [location.path, location.search, location.hash]);

  return location;
}

function setMeta(selector: string, attribute: 'name' | 'property', key: string, value: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = value;
}

/** Sets the page title, description, and matching social tags for the current route. */
export function useDocumentMeta(title: string | null, description: string) {
  React.useEffect(() => {
    const fullTitle = title ? `${title} · ${site.name}` : `${site.name} · UIUC`;
    document.title = fullTitle;
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta(
      'meta[property="og:url"]',
      'property',
      'og:url',
      site.url + window.location.pathname,
    );
  }, [title, description]);
}
