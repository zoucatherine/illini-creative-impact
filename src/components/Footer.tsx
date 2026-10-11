export const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-primaryNavy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:px-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] lg:px-16">
        <div>
          <a
            href="/"
            className="text-xl font-bold tracking-tight transition-colors hover:text-illiniOrange"
          >
            Illini Creative Impact
          </a>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
            A creative community turning bold ideas into meaningful impact.
          </p>
          <p className="mt-6 text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Illini Art &amp; Business Collective. All rights reserved.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">
            Explore
          </h2>
          <nav className="mt-4 flex flex-col items-start gap-3" aria-label="Footer navigation">
            {[
              ['Home', '/'],
              ['About Us', '/about'],
              ['Events', '/events'],
              ['Teams', '/teams'],
              ['FAQ', '/faq'],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-sm text-slate-400 transition-colors duration-200 hover:text-illiniOrange"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">
            Connect
          </h2>
          <div className="mt-4 flex flex-col items-start gap-3">
            <a
              href="https://discord.com/invite/9uBHgdJbQK"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-400 transition-colors duration-200 hover:text-illiniOrange"
            >
              Discord
            </a>
            <a
              href="https://www.instagram.com/iabc_uiuc/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-400 transition-colors duration-200 hover:text-illiniOrange"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;