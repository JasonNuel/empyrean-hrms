import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Empyrean Technology. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
