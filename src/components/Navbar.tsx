import React from 'react';

interface NavbarProps {}

const navLinks = [
  { href: "#about", label: "About Us" },
  { href: "#join", label: "Join" },
  { href: "#events", label: "Events" },
  { href: "#media", label: "Media" },
  { href: "#contact", label: "Contact" }
];

export const Navbar: React.FC<NavbarProps> = () => {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        Illini Creative Impact
      </div>

        {/* Navigation toggle button for mobile view */}
      <button
        className="nav-toggle"
        onClick={() => setIsNavOpen(!isNavOpen)}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

        {/* Navigation links */}
      <div className={`nav-links ${isNavOpen ? 'active' : ''}`}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;