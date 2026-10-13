import React from 'react';
import { joinHref, nav } from '../content/site';

interface NavbarProps {
  currentPath: string;
}

function isActive(href: string, currentPath: string) {
  return href === '/' ? currentPath === '/' : currentPath === href || currentPath.startsWith(`${href}/`);
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath }) => {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const isHomePage = currentPath === '/';

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shouldShowSolidBackground = isScrolled || !isHomePage || isNavOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        shouldShowSolidBackground ? 'border-white/10 bg-primaryNavy' : 'border-transparent bg-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:font-bold focus:text-primaryNavy"
      >
        Skip to content
      </a>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10 lg:px-16"
        aria-label="Main navigation"
      >
        <a
          className="flex items-baseline gap-2 text-lg font-bold tracking-tight text-white transition-colors hover:text-illiniOrange sm:text-xl"
          href="/"
          onClick={() => setIsNavOpen(false)}
        >
          Illini Creative Impact
        </a>

        <button
          type="button"
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-md text-white transition-colors hover:text-illiniOrange lg:hidden"
          onClick={() => setIsNavOpen(!isNavOpen)}
          aria-expanded={isNavOpen}
          aria-controls="main-menu"
          aria-label={isNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <span className={`h-0.5 w-6 bg-current transition-transform ${isNavOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-6 bg-current transition-opacity ${isNavOpen ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 bg-current transition-transform ${isNavOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>

        <div
          id="main-menu"
          onClick={(event) => {
            if ((event.target as Element).closest('a')) setIsNavOpen(false);
          }}
          className={`absolute inset-x-0 top-full flex-col gap-1 border-b border-white/10 bg-primaryNavy px-6 pb-6 pt-2 lg:static lg:flex lg:flex-row lg:items-center lg:gap-1 lg:border-0 lg:bg-transparent lg:p-0 ${
            isNavOpen ? 'flex' : 'hidden'
          }`}
        >
          {nav.map((link) => {
            const active = isActive(link.href, currentPath);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`rounded-full px-3 py-3 text-base font-semibold transition-colors lg:py-2 lg:text-sm ${
                  active ? 'text-illiniOrange' : 'text-white hover:text-illiniOrange'
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <a
            href={joinHref}
            className="mt-3 inline-flex items-center justify-center rounded-full bg-illiniOrange px-5 py-3 text-sm font-bold text-primaryNavy transition-colors hover:bg-[#f08a3c] lg:ml-4 lg:mt-0 lg:py-2.5"
          >
            Join ICI
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
