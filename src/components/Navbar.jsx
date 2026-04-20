import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const { t } = useTranslation();
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
      <div className="nav-right">
        <ul>
          <li><a href="#work">{t('nav.work')}</a></li>
          <li><a href="#expertise">{t('nav.expertise')}</a></li>
          <li><a href="#experience">{t('nav.experience')}</a></li>
          <li><a href="#contact" className="contact-btn">{t('nav.contact')}</a></li>
        </ul>
        <LanguageSwitcher />
      </div>
    </nav>
  );
};

export default Navbar;
