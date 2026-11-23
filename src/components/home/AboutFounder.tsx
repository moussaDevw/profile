import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Award, MapPin, Globe2 } from 'lucide-react';
import { Container } from '../../design-system/Container';
import { LinkButton } from '../../design-system/Button';
import { getAboutData } from '../../content/homeData';
import { useRouter } from '../../lib/router';

export const AboutFounder: React.FC = () => {
  const { locale } = useRouter();
  const aboutData = getAboutData(locale);
  const isEn = locale === 'en';

  return (
    <section
      id="a-propos"
      className="mt-section"
      style={{
        width: '100%',
        backgroundColor: '#0E6049',
        color: '#FFFFFF',
        padding: 'clamp(64px, 8vw, 108px) 0',
      }}
    >
      <Container>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
            gap: 'clamp(36px, 6vw, 64px)',
            alignItems: 'center',
          }}
        >
          {/* Colonne Gauche : Carte Flottante Blanche Partenaire Humain (Style Alan.com) */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ type: 'spring', stiffness: 80, damping: 18 }}
            style={{
              backgroundColor: '#FFFFFF',
              color: '#0B1730',
              borderRadius: '36px',
              padding: 'clamp(26px, 4vw, 40px)',
              boxShadow: '0 28px 60px -12px rgba(0, 0, 0, 0.22)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '24px',
                borderBottom: '1px solid #F1EFEA',
                paddingBottom: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '18px',
                    backgroundColor: '#0E6049',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '20px',
                    fontFamily: "'Manrope', sans-serif",
                  }}
                >
                  MD
                </div>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0B1730', margin: 0 }}>
                    Moussa Diagne
                  </h3>
                  <span style={{ fontSize: '13.5px', color: '#465670', fontWeight: 600 }}>
                    {isEn ? 'Consultant & Senior Full Stack Engineer' : 'Consultant & Développeur Full Stack Senior'}
                  </span>
                </div>
              </div>

              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  color: '#047857',
                  backgroundColor: '#ECFDF5',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                }}
              >
                {isEn ? 'Replies in < 24h' : 'Réponse sous 24h'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', fontSize: '14px' }}>
              <div style={{ backgroundColor: '#FAF8F5', padding: '14px', borderRadius: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <MapPin size={16} color="#0E6049" />
                  <span style={{ color: '#64748B', fontSize: '11px', textTransform: 'uppercase', fontWeight: 800 }}>
                    {isEn ? 'Location' : 'Localisation'}
                  </span>
                </div>
                <strong style={{ color: '#0B1730', fontSize: '13.5px' }}>
                  {isEn ? 'Dakar, Senegal (GMT / UTC)' : 'Dakar, Sénégal (Fuseau GMT)'}
                </strong>
              </div>

              <div style={{ backgroundColor: '#FAF8F5', padding: '14px', borderRadius: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Globe2 size={16} color="#0E6049" />
                  <span style={{ color: '#64748B', fontSize: '11px', textTransform: 'uppercase', fontWeight: 800 }}>
                    {isEn ? 'Client Coverage' : 'Marchés accompagnés'}
                  </span>
                </div>
                <strong style={{ color: '#0B1730', fontSize: '13.5px' }}>
                  {isEn ? 'Senegal, West Africa & Remote' : 'Sénégal, Afrique & International'}
                </strong>
              </div>

              <div style={{ backgroundColor: '#D9F2EE', padding: '14px', borderRadius: '18px', gridColumn: '1 / -1' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Award size={16} color="#0A4B3E" />
                  <span style={{ color: '#0A4B3E', fontSize: '11px', textTransform: 'uppercase', fontWeight: 800 }}>
                    {isEn ? 'Core Specializations' : 'Spécialités clés'}
                  </span>
                </div>
                <strong style={{ color: '#0B1730', fontSize: '13.5px' }}>
                  NestJS · React / Next.js · PostgreSQL · React Native · Paiements Wave & Orange Money
                </strong>
              </div>
            </div>
          </motion.div>

          {/* Colonne Droite : Texte Éditorial Blanc sur Fond Vert Forêt Alan */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.08 }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '7px 16px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                backgroundColor: '#FAF8F5',
                color: '#0B1730',
                marginBottom: '20px',
              }}
            >
              <span>{isEn ? 'About MusaTech' : 'À Propos de MusaTech'}</span>
            </div>

            <h2
              className="mt-h2"
              style={{
                marginBottom: '20px',
                color: '#FFFFFF',
                fontSize: 'clamp(28px, 3.8vw, 44px)',
                fontWeight: 800,
                lineHeight: 1.12,
              }}
            >
              {aboutData.title}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              <p className="mt-body" style={{ color: '#ECFDF5', fontSize: '16.5px', lineHeight: 1.65 }}>
                {aboutData.p1}
              </p>
              <p className="mt-body" style={{ color: '#D1FAE5', fontSize: '15.5px', lineHeight: 1.65 }}>
                {aboutData.p2}
              </p>
              <p className="mt-body" style={{ color: '#A7F3D0', fontSize: '15.5px', lineHeight: 1.65 }}>
                {aboutData.p3}
              </p>
            </div>

            <LinkButton
              href={aboutData.ctaHref}
              variant="outline"
              size="lg"
              icon={<ArrowUpRight size={16} />}
              style={{
                borderRadius: '9999px',
                backgroundColor: '#FFFFFF',
                color: '#0B1730',
                border: 'none',
                paddingLeft: '28px',
                paddingRight: '28px',
              }}
            >
              {aboutData.ctaText}
            </LinkButton>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
