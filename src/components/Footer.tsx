import React from 'react';
interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Illini Creative Impact. All rights reserved.</p>
      <p>Follow us on social media for the latest updates.</p>
      <p>
        <a href="https://discord.com/invite/9uBHgdJbQK" target="_blank" rel="noopener noreferrer">Discord</a> | 
        <a href="https://www.instagram.com/iabc_uiuc/" target="_blank" rel="noopener noreferrer">Instagram</a>
      </p>
    </footer>
  );
};

export default Footer;