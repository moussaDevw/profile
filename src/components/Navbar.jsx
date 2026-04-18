import { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <div className="logo">Moussa<span>.</span>D</div>
      <ul>
        <li><a href="#work">Travaux</a></li>
        <li><a href="#expertise">Expertise</a></li>
        <li><a href="#experience">Parcours</a></li>
        <li><a href="#contact" className="contact-btn">Me contacter →</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
