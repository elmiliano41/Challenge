import React, { useEffect, useState } from 'react';
import '../Styles/HeaderStyles.css';

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 10;
      if (window.pageYOffset > scrollThreshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <nav>
        <div className="logo">
          <a href="#">Challenge</a>
        </div>
        <div className="toggle">
          <i className="fas fa-bars"></i>
        </div>
      </nav>
    </header>
  );
}

export default Header;
