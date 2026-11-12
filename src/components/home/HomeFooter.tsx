import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Container } from '../../design-system/Container';
import { useRouter } from '../../lib/router';
import { getLocalizedHref } from '../../lib/i18nRoutes';

export const HomeFooter: React.FC = () => {
  const { navigate, locale } = useRouter();
  const isEn = locale === 'en';

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!e.defaultPrevented && !e.metaKey && !e.ctrlKey && !e.shiftKey && href) {
      if (href.startsWith('/') || href.startsWith('#')) {
        e.preventDefault();
        navigate(href);
      }
    }
  };

  return (
    <footer
      style={{
        backgroundColor: '#0B1730',
        color: '#FFFFFF',
        borderTop: '1px solid rgba(218, 227, 237, 0.1)',
        paddingTop: 'clamp(48px, 6vw, 64px)',
        paddingBottom: 'clamp(32px, 4vw, 40px)',
      }}
    >
      <Container>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          {/* Brand Info */}
          <div>
            <div
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '24px',
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                marginBottom: '16px',
              }}
            >
              MusaTech<span style={{ color: '#19B8CD' }}>.</span>
            </div>

            <p style={{ fontSize: '15px', color: '#DAE3ED', lineHeight: 1.6, marginBottom: '20px', maxWidth: '320px' }}>
              {isEn
                ? 'Custom software engineering and modern digital platforms for ambitious companies in Senegal and worldwide.'
                : 'Solutions digitales sur mesure pour entreprises ambitieuses au Sénégal et à l’international.'}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#19B8CD' }}>
              <MapPin size={16} />
              <span>Dakar, Sénégal 🇸🇳</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#FFFFFF',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '20px',
              }}
            >
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <a
                  href={getLocalizedHref('services', locale)}
                  onClick={(e) => handleLink(e, getLocalizedHref('services', locale))}
                  style={{ color: '#DAE3ED', textDecoration: 'none', fontSize: '14px' }}
                >
                  {isEn ? 'Services & Pricing' : 'Services & Tarifs'}
                </a>
              </li>
              <li>
                <a
                  href={getLocalizedHref('solutions', locale)}
                  onClick={(e) => handleLink(e, getLocalizedHref('solutions', locale))}
                  style={{ color: '#DAE3ED', textDecoration: 'none', fontSize: '14px' }}
                >
                  {isEn ? 'Industry Solutions' : 'Solutions par secteur'}
                </a>
              </li>
              <li>
                <a
                  href={getLocalizedHref('projects', locale)}
                  onClick={(e) => handleLink(e, getLocalizedHref('projects', locale))}
                  style={{ color: '#DAE3ED', textDecoration: 'none', fontSize: '14px' }}
                >
                  {isEn ? 'Verified Case Studies' : 'Réalisations réelles'}
                </a>
              </li>
              <li>
                <a
                  href={getLocalizedHref('about', locale)}
                  onClick={(e) => handleLink(e, getLocalizedHref('about', locale))}
                  style={{ color: '#DAE3ED', textDecoration: 'none', fontSize: '14px' }}
                >
                  {isEn ? 'About Moussa Diagne' : 'À propos de Moussa Diagne'}
                </a>
              </li>
              <li>
                <a
                  href={getLocalizedHref('contact', locale)}
                  onClick={(e) => handleLink(e, getLocalizedHref('contact', locale))}
                  style={{ color: '#DAE3ED', textDecoration: 'none', fontSize: '14px' }}
                >
                  {isEn ? 'Direct Contact' : 'Contact direct'}
                </a>
              </li>
              <li>
                <a
                  href={getLocalizedHref('quote', locale)}
                  onClick={(e) => handleLink(e, getLocalizedHref('quote', locale))}
                  style={{ color: '#DAE3ED', textDecoration: 'none', fontSize: '14px' }}
                >
                  {isEn ? 'Request a Proposal' : 'Demander un devis'}
                </a>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4
              style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#FFFFFF',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '20px',
              }}
            >
              Services
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <a
                  href={isEn ? '/en/services/websites' : '/fr/services/sites-web'}
                  onClick={(e) => handleLink(e, isEn ? '/en/services/websites' : '/fr/services/sites-web')}
                  style={{ color: '#DAE3ED', textDecoration: 'none', fontSize: '14px' }}
                >
                  {isEn ? 'Professional Websites' : 'Sites web professionnels'}
                </a>
              </li>
              <li>
                <a
                  href={isEn ? '/en/services/e-commerce' : '/fr/services/e-commerce'}
                  onClick={(e) => handleLink(e, isEn ? '/en/services/e-commerce' : '/fr/services/e-commerce')}
                  style={{ color: '#DAE3ED', textDecoration: 'none', fontSize: '14px' }}
                >
                  {isEn ? 'Custom E-commerce' : 'Sites e-commerce'}
                </a>
              </li>
              <li>
                <a
                  href={isEn ? '/en/services/business-software' : '/fr/services/logiciels-metier'}
                  onClick={(e) => handleLink(e, isEn ? '/en/services/business-software' : '/fr/services/logiciels-metier')}
                  style={{ color: '#DAE3ED', textDecoration: 'none', fontSize: '14px' }}
                >
                  {isEn ? 'Custom Business Software' : 'Logiciels métier & ERP'}
                </a>
              </li>
              <li>
                <a
                  href={isEn ? '/en/services/mobile-apps' : '/fr/services/applications-mobiles'}
                  onClick={(e) => handleLink(e, isEn ? '/en/services/mobile-apps' : '/fr/services/applications-mobiles')}
                  style={{ color: '#DAE3ED', textDecoration: 'none', fontSize: '14px' }}
                >
                  {isEn ? 'Mobile Applications' : 'Applications mobiles'}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div>
            <h4
              style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#FFFFFF',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '20px',
              }}
            >
              {isEn ? 'Direct Contact' : 'Contact Direct'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <a
                href="mailto:musadev27@gmail.com"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#DAE3ED',
                  textDecoration: 'none',
                  fontSize: '14px',
                }}
              >
                <Mail size={16} color="#19B8CD" />
                <span>musadev27@gmail.com</span>
              </a>

              <a
                href="tel:+221782824175"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#DAE3ED',
                  textDecoration: 'none',
                  fontSize: '14px',
                }}
              >
                <Phone size={16} color="#19B8CD" />
                <span>+221 78 282 41 75</span>
              </a>

              <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                <a
                  href="https://github.com/moussaDevw"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#DAE3ED',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    textDecoration: 'none',
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/moussa-diagne-b81226107/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#DAE3ED',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    textDecoration: 'none',
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '32px',
            borderTop: '1px solid rgba(218, 227, 237, 0.1)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: '13px',
            color: '#DAE3ED',
            opacity: 0.85,
          }}
        >
          <div>
            © {new Date().getFullYear()} MusaTech — {isEn ? 'Founded by Moussa Diagne. All rights reserved.' : 'Fondé par Moussa Diagne. Tous droits réservés.'}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <a
              href={getLocalizedHref('legal', locale)}
              onClick={(e) => handleLink(e, getLocalizedHref('legal', locale))}
              style={{ color: '#DAE3ED', textDecoration: 'none' }}
            >
              {isEn ? 'Legal Notice' : 'Mentions légales'}
            </a>
            <a
              href={getLocalizedHref('privacy', locale)}
              onClick={(e) => handleLink(e, getLocalizedHref('privacy', locale))}
              style={{ color: '#DAE3ED', textDecoration: 'none' }}
            >
              {isEn ? 'Privacy Policy' : 'Confidentialité'}
            </a>
            <span>Dakar 🇸🇳</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
