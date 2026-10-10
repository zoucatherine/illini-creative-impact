import React from 'react';
interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Illini Creative Impact. All rights reserved.</p>
    </footer>
  );
};

export default Footer;