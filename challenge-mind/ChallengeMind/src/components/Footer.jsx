import React from 'react';
import '../Styles/FooterStyles.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>&copy; {currentYear} - Challenge. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
