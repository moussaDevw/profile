import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('work');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['work', 'expertise', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { id: 'work', label: t('nav.work') },
    { id: 'expertise', label: t('nav.expertise') },
    { id: 'experience', label: t('nav.experience') },
  ];

  return (
    <header className="navbar-header">
      <motion.nav 
        className={`floating-navbar ${scrolled ? 'is-scrolled' : ''}`}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Brand Logo & Status */}
        <a href="#" className="nav-logo-group" onClick={() => setMobileMenuOpen(false)}>
          <div className="logo-text">
            Moussa<span className="logo-dot">.</span>D
          </div>
          <div className="status-badge" title="Disponible pour de nouveaux projets">
            <span className="status-dot"></span>
            <span className="status-text">Dispo</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="desktop-nav">
          <ul className="nav-pill-list">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveSection(item.id)}
                  >
                    <span className="nav-link-text">{item.label}</span>
                    {isActive && (
                      <motion.div
                        className="active-indicator-pill"
                        layoutId="activeIndicator"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Action Controls */}
        <div className="nav-actions-group">
          <LanguageSwitcher />

          <motion.a
            href="#contact"
            className="contact-cta-button"
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="cta-text">{t('nav.contact')}</span>
            <ArrowUpRight size={15} className="cta-icon" />
          </motion.a>

          {/* Mobile Menu Button */}
          <motion.button 
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Backdrop & Drawer Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Dark Blurred Backdrop */}
            <motion.div 
              className="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Glass Drawer */}
            <motion.div 
              className="mobile-nav-drawer"
              initial={{ opacity: 0, scale: 0.95, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -12 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            >
              <div className="mobile-drawer-header">
                <span className="mobile-drawer-title">Navigation</span>
                <span className="mobile-drawer-status">
                  <span className="status-dot"></span> Available
                </span>
              </div>
              <ul className="mobile-nav-list">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={isActive ? 'active' : ''}
                        onClick={() => {
                          setActiveSection(item.id);
                          setMobileMenuOpen(false);
                        }}
                      >
                        <span>{item.label}</span>
                        <ArrowUpRight size={16} className="mobile-link-icon" />
                      </a>
                    </li>
                  );
                })}
                <li className="mobile-cta-li">
                  <a
                    href="#contact"
                    className="mobile-contact-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{t('nav.contact')}</span>
                    <ArrowUpRight size={18} />
                  </a>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;