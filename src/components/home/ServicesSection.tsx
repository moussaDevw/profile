import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import {
  Globe,
  ShoppingCart,
  Cpu,
  Smartphone,
  Info,
  Check,
  ArrowUpRight,
} from 'lucide-react';
import { Container } from '../../design-system/Container';
import { LinkButton } from '../../design-system/Button';
import { getServicesData, getServicesDisclaimer } from '../../content/homeData';
import { useRouter } from '../../lib/router';

const ServiceScrollWord: React.FC<{
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}> = ({ word, progress, range }) => {
  const opacity = useTransform(progress, range, [0.22, 1]);
  const y = useTransform(progress, range, [5, 0]);

  return (
    <motion.span
      style={{
        opacity,
        y,
        display: 'inline-block',
        marginRight: '0.28em',
      }}
    >
      {word}
    </motion.span>
  );
};

export const ServicesSection: React.FC = () => {
  const { locale } = useRouter();
  const services = getServicesData(locale);
  const disclaimer = getServicesDisclaimer(locale);
  const isEn = locale === 'en';
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  const headingRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ['start 0.88', 'end 0.45'],
  });

  const titleText = isEn
    ? 'Digital solutions tailored to your operational scale.'
    : 'Des solutions adaptées à vos besoins.';
  const titleWords = titleText.split(' ');

  const needFilters = isEn
    ? [
        { id: null, label: 'All Offers' },
        { id: 'sites-web', label: 'Brand Visibility & Leads' },
        { id: 'e-commerce', label: 'Online Sales (Wave / OM / Card)' },
        { id: 'logiciels-metier', label: 'Internal Process Automation' },
        { id: 'applications-mobiles', label: 'iOS & Android Mobile App' },
      ]
    : [
        { id: null, label: 'Toutes nos offres' },
        { id: 'sites-web', label: 'Gagner en visibilité & clients' },
        { id: 'e-commerce', label: 'Vendre en ligne (Wave / OM / Carte)' },
        { id: 'logiciels-metier', label: 'Automatiser ma gestion métier' },
        { id: 'applications-mobiles', label: 'Lancer une application mobile' },
      ];

  const getServiceTheme = (id: string, idx: number) => {
    switch (id) {
      case 'sites-web':
        return {
          bg: '#D9F2EE',
          tagBg: '#BAE6DF',
          tagColor: '#0A4B3E',
          bezelBg: '#0E5A4A',
          bezelBorder: '#177864',
          accent: '#0E6049',
          badgeText: isEn ? 'WEB & SEO ARCHITECTURE' : 'VITRINE & CONVERSION B2B',
          screenTitle: isEn ? 'Corporate & SEO Portal' : 'Portail Web & Acquisition',
          screenMetric: '99/100',
          screenSub: isEn ? 'Google PageSpeed & SEO' : 'Performance & Référencement Google',
          icon: <Globe size={22} color="#0E6049" />,
        };
      case 'e-commerce':
        return {
          bg: '#FCE8EC',
          tagBg: '#F9CED8',
          tagColor: '#831843',
          bezelBg: '#3D1527',
          bezelBorder: '#6B2846',
          accent: '#BE123C',
          badgeText: isEn ? 'ONLINE STORE & PAYMENTS' : 'BOUTIQUE & PAIEMENTS LOCAUX',
          screenTitle: isEn ? 'Wave · Orange Money · Stripe' : 'Wave · Orange Money · Carte',
          screenMetric: '1-Clic',
          screenSub: isEn ? 'Instant Mobile & Card Checkout' : 'Encaissement mobile & gestion de stock',
          icon: <ShoppingCart size={22} color="#BE123C" />,
        };
      case 'logiciels-metier':
        return {
          bg: '#FBF0E4',
          tagBg: '#F6DCC0',
          tagColor: '#7C2D12',
          bezelBg: '#B86E28',
          bezelBorder: '#DC9550',
          accent: '#B45309',
          badgeText: isEn ? 'SAAS, CRM & ERP' : 'PLATEFORME & LOGICIEL MÉTIER',
          screenTitle: isEn ? 'Custom Operations Engine' : 'Pilotage & Automatisation',
          screenMetric: '-75%',
          screenSub: isEn ? 'Manual spreadsheet tasks eliminated' : 'Tâches manuelles automatisées',
          icon: <Cpu size={22} color="#B45309" />,
        };
      case 'applications-mobiles':
      default:
        return {
          bg: '#EEF2FF',
          tagBg: '#D8E1FF',
          tagColor: '#1E3A8A',
          bezelBg: '#1E293B',
          bezelBorder: '#334155',
          accent: '#4338CA',
          badgeText: isEn ? `OFFER 0${idx + 1} · MOBILE` : 'APPLICATIONS IOS & ANDROID',
          screenTitle: isEn ? 'iOS & Android Native Experience' : 'Expérience Mobile iOS & Android',
          screenMetric: '60 FPS',
          screenSub: isEn ? 'Offline sync & Push notifications' : 'Mode hors-ligne & Notifications Push',
          icon: <Smartphone size={22} color="#4338CA" />,
        };
    }
  };

  const visibleServices = highlightedId
    ? services.filter((s) => s.id === highlightedId)
    : services;

  return (
    <section
      id="services"
      className="mt-section"
      style={{
        width: '100%',
        backgroundColor: '#FFFFFF',
        paddingTop: 'clamp(56px, 7vw, 88px)',
        paddingBottom: '0',
        borderBottom: '1px solid #EAE6DF',
      }}
    >
      {/* En-tête centré avec illumination au scroll + Filtres Pilules */}
      <div
        ref={headingRef}
        style={{
          textAlign: 'center',
          maxWidth: '880px',
          margin: '0 auto clamp(36px, 5vw, 56px)',
          padding: '0 24px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#D9F2EE',
            color: '#0A4B3E',
            padding: '8px 18px',
            borderRadius: '9999px',
            fontSize: '13px',
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}
        >
          <span>{isEn ? 'Core Engineering Services' : 'Nos Services'}</span>
        </motion.div>

        <h2
          aria-label={titleText}
          style={{
            fontSize: 'clamp(30px, 4.6vw, 52px)',
            fontWeight: 800,
            color: '#0B1730',
            letterSpacing: '-0.03em',
            lineHeight: 1.12,
            marginBottom: '18px',
            fontFamily: "'Manrope', sans-serif",
          }}
        >
          <span style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
            {titleText}
          </span>
          <span aria-hidden="true">
            {titleWords.map((word, idx) => {
              const start = idx / titleWords.length;
              const end = Math.min(1, start + 1.4 / titleWords.length);
              return (
                <ServiceScrollWord
                  key={`${word}-${idx}`}
                  word={word}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </span>
        </h2>

        <p
          style={{
            fontSize: 'clamp(16px, 1.8vw, 19px)',
            color: '#465670',
            lineHeight: 1.6,
            maxWidth: '680px',
            margin: '0 auto 28px',
            fontWeight: 500,
          }}
        >
          {isEn
            ? 'From fast corporate web portals to high-traffic e-commerce and mission-critical enterprise systems.'
            : "Que vous ayez besoin d'une vitrine moderne, d'une boutique en ligne avec encaissement local ou d'une plateforme complexe sur-mesure."}
        </p>

        {/* Sélecteur d'objectif interactif (Pilules Alan.com) */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          {needFilters.map((f) => {
            const active = highlightedId === f.id;
            return (
              <button
                key={f.label}
                type="button"
                onClick={() => setHighlightedId(f.id)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '9999px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: active ? '1px solid #0B1730' : '1px solid #E2DDD5',
                  backgroundColor: active ? '#0B1730' : '#FAF8F5',
                  color: active ? '#FFFFFF' : '#0B1730',
                  boxShadow: active ? '0 6px 16px rgba(11, 23, 48, 0.14)' : 'none',
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* SCÈNES PASTEL 100% PLEINE LARGEUR (BORD À BORD SANS MARGE NI PADDING LATÉRAL) */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        {visibleServices.map((service, idx) => {
          const theme = getServiceTheme(service.id, idx);

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ type: 'spring', stiffness: 80, damping: 18 }}
              style={{
                width: '100%',
                backgroundColor: theme.bg,
                borderRadius: '0',
                padding: 'clamp(52px, 7vw, 88px) 0',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Container>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                    gap: 'clamp(28px, 4vw, 48px)',
                    alignItems: 'center',
                  }}
                >
                  {/* Colonne Gauche : Titre de l'Offre, Description & Bouton Pilule */}
                  <div style={{ maxWidth: '390px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        backgroundColor: theme.tagBg,
                        color: theme.tagColor,
                        fontWeight: 800,
                        fontSize: '11.5px',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        padding: '6px 14px',
                        borderRadius: '10px',
                        marginBottom: '18px',
                      }}
                    >
                      {theme.badgeText}
                    </span>

                    <h3
                      className="mt-h3"
                      style={{
                        fontSize: 'clamp(28px, 3.2vw, 38px)',
                        fontWeight: 800,
                        color: '#0B1730',
                        lineHeight: 1.12,
                        letterSpacing: '-0.025em',
                        marginBottom: '16px',
                      }}
                    >
                      {service.title}
                    </h3>

                    <p
                      style={{
                        fontSize: '16px',
                        color: '#1E293B',
                        lineHeight: 1.62,
                        marginBottom: '26px',
                      }}
                    >
                      {service.description}
                    </p>

                    <LinkButton
                      href={service.ctaHref}
                      variant="primary"
                      size="lg"
                      icon={<ArrowUpRight size={16} />}
                      style={{
                        borderRadius: '9999px',
                        backgroundColor: '#0B1730',
                        color: '#FFFFFF',
                        paddingLeft: '24px',
                        paddingRight: '24px',
                      }}
                    >
                      {service.ctaText}
                    </LinkButton>
                  </div>

                  {/* Colonne Centrale : Mockup App / Téléphone de l'Offre (Style Alan.com) */}
                  <motion.div
                    whileHover={{ y: -6 }}
                    style={{
                      margin: '0 auto',
                      width: '100%',
                      maxWidth: '335px',
                      backgroundColor: theme.bezelBg,
                      borderRadius: '44px',
                      padding: '11px',
                      boxShadow: '0 26px 56px -12px rgba(11, 23, 48, 0.25)',
                      border: `3px solid ${theme.bezelBorder}`,
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '34px',
                        padding: '16px 18px 20px',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Dynamic Island */}
                      <div
                        style={{
                          width: '82px',
                          height: '20px',
                          backgroundColor: '#0B1730',
                          borderRadius: '9999px',
                          margin: '0 auto 14px',
                        }}
                      />

                      {/* Carte En-tête dans le Mockup */}
                      <div
                        style={{
                          backgroundColor: theme.bg,
                          borderRadius: '20px',
                          padding: '16px',
                          textAlign: 'center',
                          marginBottom: '14px',
                        }}
                      >
                        <div
                          style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '14px',
                            backgroundColor: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 10px',
                            boxShadow: '0 4px 12px rgba(11, 23, 48, 0.06)',
                          }}
                        >
                          {theme.icon}
                        </div>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: theme.tagColor, marginBottom: '4px' }}>
                          {theme.screenTitle}
                        </div>
                        <div style={{ fontSize: '26px', fontWeight: 800, color: '#0B1730', lineHeight: 1.15 }}>
                          {theme.screenMetric}
                        </div>
                        <div style={{ fontSize: '11px', color: '#475569', marginTop: '4px', fontWeight: 600 }}>
                          {theme.screenSub}
                        </div>
                      </div>

                      {/* Tarif de départ affiché proprement dans l'écran */}
                      <div
                        style={{
                          backgroundColor: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                          borderRadius: '16px',
                          padding: '12px 14px',
                          textAlign: 'center',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '10.5px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            color: '#64748B',
                            marginBottom: '3px',
                          }}
                        >
                          {isEn ? 'Indicative Starting Budget' : 'Budget indicatif'}
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: 800, color: theme.accent }}>
                          {service.startingPrice}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Colonne Droite : Livrables Clés en Bulles Flottantes Blanches */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '28px',
                        padding: '22px 24px',
                        boxShadow: '0 18px 42px rgba(11, 23, 48, 0.07)',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '12px',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: theme.accent,
                          marginBottom: '14px',
                        }}
                      >
                        {isEn ? 'Included Deliverables' : 'Livrables inclus'}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {service.deliverables.map((item) => (
                          <div
                            key={item}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                            }}
                          >
                            <div
                              style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                backgroundColor: '#ECFDF5',
                                color: '#10B981',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                              }}
                            >
                              <Check size={14} strokeWidth={3} />
                            </div>
                            <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#0B1730', lineHeight: 1.4 }}>
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            </motion.div>
          );
        })}
      </div>

      {/* Note Tarifaire Pleine Largeur en Bas de Section */}
      <div
        style={{
          width: '100%',
          backgroundColor: '#FAF8F5',
          padding: '28px 24px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            backgroundColor: '#FFFFFF',
            padding: '14px 24px',
            borderRadius: '9999px',
            boxShadow: '0 4px 16px rgba(11, 23, 48, 0.04)',
            maxWidth: '760px',
            fontSize: '13.5px',
            fontWeight: 600,
            color: '#465670',
          }}
        >
          <Info size={16} color="#00A896" style={{ flexShrink: 0 }} />
          <span>{disclaimer}</span>
        </div>
      </div>
    </section>
  );
};
