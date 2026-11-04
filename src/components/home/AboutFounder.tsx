import React from 'react';
import { ArrowUpRight, Award, MapPin, CheckCircle2 } from 'lucide-react';
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
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #DAE3ED',
      }}
    >
      <Container>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
            gap: 'clamp(32px, 6vw, 64px)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Visual Profile & Proof */}
          <div
            style={{
              backgroundColor: '#F4F7FB',
              borderRadius: '16px',
              border: '1px solid #DAE3ED',
              padding: 'clamp(20px, 4vw, 40px) clamp(12px, 2.5vw, 36px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  backgroundColor: '#0B1730',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  fontWeight: 800,
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                MD
              </div>
              <div>
                <h3 className="mt-h3" style={{ fontSize: '20px', color: '#0B1730', marginBottom: '2px' }}>
                  Moussa Diagne
                </h3>
                <p style={{ fontSize: '14px', color: '#465670', margin: 0, fontWeight: 500 }}>
                  {isEn ? 'MusaTech Founder & Full Stack Engineer' : 'Fondateur MusaTech & Ingénieur Full Stack'}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#172A46', marginTop: '4px' }}>
                  <MapPin size={14} color="#19B8CD" />
                  <span>Dakar, Sénégal 🇸🇳</span>
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '16px 20px',
                border: '1px solid #DAE3ED',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#0B1730', fontWeight: 600, fontSize: '14px' }}>
                <Award size={18} color="#19B8CD" />
                <span>{isEn ? 'Core Engagements' : 'Engagements Fondateurs'}</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#465670', lineHeight: 1.45 }}>
                  <CheckCircle2 size={16} color="#19B8CD" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{isEn ? 'Direct technical communication (zero agency sales layers)' : 'Interlocuteur technique direct (zéro filtre commercial)'}</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#465670', lineHeight: 1.45 }}>
                  <CheckCircle2 size={16} color="#19B8CD" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{isEn ? 'Clean, tested, maintainable, and documented codebase' : 'Code propre, testé, maintenable et documenté'}</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#465670', lineHeight: 1.45 }}>
                  <CheckCircle2 size={16} color="#19B8CD" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{isEn ? 'High availability for local and international partnerships' : 'Disponibilité et réactivité locales & internationales'}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Editorial Text */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                backgroundColor: '#E9F1F7',
                color: '#172A46',
                border: '1px solid #DAE3ED',
                marginBottom: '16px',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#19B8CD' }} />
              {isEn ? 'About MusaTech' : 'À Propos de MusaTech'}
            </div>

            <h2 className="mt-h2" style={{ marginBottom: '24px', color: '#0B1730' }}>
              {aboutData.title}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              <p className="mt-body" style={{ color: '#172A46', fontSize: '16px' }}>
                {aboutData.p1}
              </p>
              <p className="mt-body" style={{ color: '#465670', fontSize: '15px' }}>
                {aboutData.p2}
              </p>
              <p className="mt-body" style={{ color: '#465670', fontSize: '15px' }}>
                {aboutData.p3}
              </p>
            </div>

            <LinkButton
              href={aboutData.ctaHref}
              variant="outline"
              size="default"
              icon={<ArrowUpRight size={16} />}
            >
              {aboutData.ctaText}
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
};
