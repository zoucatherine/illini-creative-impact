import { joinHref, partnerHref, pitchHref, site } from '../content/site';

const columns = [
  {
    title: 'Explore',
    links: [
      ['Our Work', '/work'],
      ['Events & Projects', '/events'],
      ['Our Community', '/community'],
      ['About', '/about'],
    ],
  },
  {
    title: 'Participate',
    links: [
      ['Join ICI', joinHref],
      ['Share an idea', pitchHref],
      ['Partner with ICI', partnerHref],
    ],
  },
  {
    title: 'Connect',
    links: [
      ['Discord', site.social.discord],
      ['Instagram', site.social.instagram],
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-primaryNavy text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:px-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:px-16">
        <div>
          <a href="/" className="text-xl font-bold tracking-tight transition-colors hover:text-illiniOrange">
            {site.name}
          </a>
          <p className="mt-4 max-w-sm font-editorial text-lg leading-7 text-white/80">{site.belief}</p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
            A student organization at the University of Illinois Urbana-Champaign. Open to every major.
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">{column.title}</h2>
            <ul className="mt-4 flex flex-col items-start gap-3">
              {column.links.map(([label, href]) => {
                const external = href.startsWith('http');
                return (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-sm text-slate-300 transition-colors duration-200 hover:text-illiniOrange"
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-7xl border-t border-white/10 px-6 py-6 text-sm text-slate-400 sm:px-10 lg:px-16">
        &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
