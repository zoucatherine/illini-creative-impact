import React from 'react';

interface NavbarProps {}

const navLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/join', label: 'Join' },
  { href: '/events', label: 'Events' },
  { href: '/media', label: 'Media' },
  { href: '/contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = () => {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    window.history.pushState({}, '', href);
    window.dispatchEvent(new PopStateEvent('popstate'));
    setIsNavOpen(false);
  };

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? 'border-white/10 bg-[#131E38]/90 backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10 lg:px-16">
      <a
        className="text-lg font-bold tracking-tight text-white transition-colors hover:text-[#E87722] sm:text-xl"
        href="/"
        onClick={(event) => navigate(event, '/')}
      >
        Illini Creative Impact
      </a>

      <button
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-md text-white transition-colors hover:text-[#E87722] md:hidden"
        onClick={() => setIsNavOpen(!isNavOpen)}
        aria-expanded={isNavOpen}
        aria-label={isNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
      >
        <span className="h-0.5 w-6 bg-current" />
        <span className="h-0.5 w-6 bg-current" />
        <span className="h-0.5 w-6 bg-current" />
      </button>

      <div
        className={`absolute inset-x-0 top-full flex-col gap-5 border-b border-white/10 bg-[#131E38]/95 px-6 py-6 backdrop-blur-md md:static md:flex md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none ${
          isNavOpen ? 'flex' : 'hidden'
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(event) => navigate(event, link.href)}
            className="text-sm font-semibold text-white transition-colors duration-200 hover:text-[#E87722]"
          >
            {link.label}
          </a>
        ))}
      </div>
      </div>
    </nav>
  );
};

export default Navbar;