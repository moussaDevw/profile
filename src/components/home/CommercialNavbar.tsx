import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { LinkButton } from '../../design-system/Button';
import LanguageSwitcher from '../LanguageSwitcher';
import { useRouter } from '../../lib/router';
import { getLocalizedHref } from '../../lib/i18nRoutes';

export const CommercialNavbar: React.FC = () => {
  const { path, navigate, locale } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('services');

  const isEn = locale === 'en';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (path === '/' || path === '/fr' || path === '/en') {
        const sections = ['services', 'solutions', 'realisations', 'methode', 'a-propos', 'faq', 'devis'];
        const scrollPosition = window.scrollY + 200;

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
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [path]);

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

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 860) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = isEn
    ? [
        { id: 'services', label: 'Services', href: getLocalizedHref('services', 'en') },
        { id: 'solutions', label: 'Solutions', href: getLocalizedHref('solutions', 'en') },
        { id: 'realisations', label: 'Case Studies', href: getLocalizedHref('projects', 'en') },
        { id: 'a-propos', label: 'About', href: getLocalizedHref('about', 'en') },
        { id: 'contact', label: 'Contact', href: getLocalizedHref('contact', 'en') },
      ]
    : [
        { id: 'services', label: 'Services', href: getLocalizedHref('services', 'fr') },
        { id: 'solutions', label: 'Solutions', href: getLocalizedHref('solutions', 'fr') },
        { id: 'realisations', label: 'Réalisations', href: getLocalizedHref('projects', 'fr') },
        { id: 'a-propos', label: 'À propos', href: getLocalizedHref('about', 'fr') },
        { id: 'contact', label: 'Contact', href: getLocalizedHref('contact', 'fr') },
      ];

  const handleNavClick = (item: { id: string; href: string }, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const isHomePage = path === '/' || path === '/fr' || path === '/en';
    const targetElement = isHomePage ? document.getElementById(item.id) : null;

    if (targetElement) {
      const headerOffset = 76;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(item.id);
    } else {
      navigate(item.href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    navigate(getLocalizedHref('home', locale));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    navigate(getLocalizedHref('quote', locale));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className="mt-commercial-navbar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 1000,
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.96)' : '#FFFFFF',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid #DAE3ED',
          boxShadow: scrolled ? '0 4px 20px -2px rgba(11, 23, 48, 0.08)' : 'none',
          transition: 'background-color 0.25s ease, box-shadow 0.25s ease',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 clamp(10px, 2.5vw, 32px)',
            height: '72px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
        {/* Brand Logo & Status */}
        <a
          href={getLocalizedHref('home', locale)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
          }}
          onClick={handleLogoClick}
        >
          <div
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '22px',
              fontWeight: 800,
              color: '#0B1730',
              letterSpacing: '-0.02em',
            }}
          >
            MusaTech<span style={{ color: '#19B8CD' }}>.</span>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              fontWeight: 600,
              backgroundColor: '#E9F1F7',
              color: '#172A46',
              padding: '3px 8px',
              borderRadius: '9999px',
              border: '1px solid #DAE3ED',
            }}
            title={isEn ? 'Available for new engineering projects' : 'Disponible pour de nouveaux projets'}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#27C93F',
              }}
            />
            <span>{isEn ? 'Available' : 'Disponible'}</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav
          style={{
            display: 'none',
          }}
          className="mt-desktop-nav"
        >
          <ul
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '28px',
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            {navItems.map((item) => {
              const isHomeActive =
                (path === '/' || path === '/fr' || path === '/en') && activeSection === item.id;
              const isRouteActive = path.startsWith(item.href) && item.href !== '/' && item.href !== '/fr' && item.href !== '/en';
              const isActive = isHomeActive || isRouteActive;

              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '14px',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? '#0B1730' : '#465670',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                      position: 'relative',
                      padding: '8px 0',
                    }}
                    onClick={(e) => handleNavClick(item, e)}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '2px',
                          backgroundColor: '#19B8CD',
                          borderRadius: '2px',
                        }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="mt-lang-wrapper">
            <LanguageSwitcher />
          </div>

          <div style={{ display: 'none' }} className="mt-cta-wrapper">
            <LinkButton
              href={getLocalizedHref('quote', locale)}
              variant="cyan"
              size="sm"
              icon={<ArrowUpRight size={15} />}
              onClick={handleCtaClick}
            >
              {isEn ? 'Request a Quote' : 'Demander un devis'}
            </LinkButton>
          </div>

          {/* Mobile Menu Button (Accessible Target >= 44px) */}
          <button
            type="button"
            className="mt-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? (isEn ? 'Close menu' : 'Fermer le menu') : (isEn ? 'Open menu' : 'Ouvrir le menu')}
            aria-expanded={mobileMenuOpen}
            style={{
              background: '#F4F7FB',
              border: '1px solid #DAE3ED',
              borderRadius: '8px',
              width: '44px',
              height: '44px',
              minWidth: '44px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#0B1730',
            }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Backdrop & Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: '72px 0 0 0',
            backgroundColor: 'rgba(11, 23, 48, 0.4)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderBottom: '1px solid #DAE3ED',
              padding: '20px 14px 28px 14px',
              boxShadow: '0 12px 32px rgba(11, 23, 48, 0.1)',
              maxHeight: 'calc(100vh - 72px)',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 24px 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      backgroundColor: path.startsWith(item.href) && item.href !== '/' ? '#F4F7FB' : 'transparent',
                      color: path.startsWith(item.href) && item.href !== '/' ? '#0B1730' : '#172A46',
                      fontWeight: 600,
                      textDecoration: 'none',
                      fontSize: '16px',
                      border: path.startsWith(item.href) && item.href !== '/' ? '1px solid #DAE3ED' : '1px solid transparent',
                    }}
                    onClick={(e) => handleNavClick(item, e)}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight size={16} color="#19B8CD" />
                  </a>
                </li>
              ))}
            </ul>

            <LinkButton
              href={getLocalizedHref('quote', locale)}
              variant="cyan"
              fullWidth
              size="lg"
              onClick={handleCtaClick}
            >
              {isEn ? 'Request a Quote' : 'Demander un devis'}
            </LinkButton>
          </div>
        </div>
      )}

      {/* Responsive styles */}
      <style>{`
        .mt-lang-wrapper {
          display: flex !important;
          align-items: center;
        }
        @media (min-width: 860px) {
          .mt-desktop-nav {
            display: block !important;
          }
          .mt-cta-wrapper {
            display: block !important;
          }
          .mt-mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
    {/* Spacer to preserve document flow beneath fixed navbar */}
    <div className="mt-navbar-spacer" style={{ height: '72px' }} aria-hidden="true" />
    </>
  );
};
