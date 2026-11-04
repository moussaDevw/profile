import React from 'react';
import { ArrowDown, ArrowUpRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { Container } from '../../design-system/Container';
import { LinkButton } from '../../design-system/Button';
import { getHeroData } from '../../content/homeData';
import { useRouter } from '../../lib/router';

export const HomeHero: React.FC = () => {
  const { locale } = useRouter();
  const heroData = getHeroData(locale);
  const isEn = locale === 'en';

  return (
    <section
      className="mt-hero-section"
      style={{
        paddingTop: 'clamp(56px, 8vw, 100px)',
        paddingBottom: 'clamp(56px, 8vw, 96px)',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #DAE3ED',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 520px), 1fr))',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Text & CTAs */}
          <div style={{ maxWidth: '640px' }}>
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
                marginBottom: '20px',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#19B8CD',
                }}
              />
              {heroData.surtitle}
            </div>

            <h1
              className="mt-h1"
              style={{
                marginBottom: '20px',
                color: '#0B1730',
                letterSpacing: '-0.02em',
              }}
            >
              {heroData.title}
            </h1>

            <p
              className="mt-body"
              style={{
                color: '#172A46',
                fontSize: '18px',
                lineHeight: 1.6,
                marginBottom: '16px',
              }}
            >
              {heroData.description}
            </p>

            <p
              style={{
                fontSize: '15px',
                color: '#465670',
                marginBottom: '32px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '18px' }}>🇸🇳</span>
              <span>{heroData.complementaryText}</span>
            </p>

            {/* CTAs */}
            <div
              className="mt-hero-cta-group"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                marginBottom: '40px',
              }}
            >
              <LinkButton
                href={heroData.cta1.href}
                variant="cyan"
                size="lg"
                icon={<ArrowDown size={16} />}
              >
                {heroData.cta1.label}
              </LinkButton>

              <LinkButton
                href={heroData.cta2.href}
                variant="outline"
                size="lg"
                icon={<ArrowUpRight size={16} />}
              >
                {heroData.cta2.label}
              </LinkButton>
            </div>

            {/* Reassurance Micro-Badges */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                paddingTop: '24px',
                borderTop: '1px solid #DAE3ED',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#172A46', fontWeight: 500 }}>
                <CheckCircle2 size={16} color="#19B8CD" />
                <span>{isEn ? 'Single Expert Point of Contact' : 'Interlocuteur unique & expert'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#172A46', fontWeight: 500 }}>
                <ShieldCheck size={16} color="#19B8CD" />
                <span>{isEn ? '100% Codebase Ownership' : 'Code source 100% garanti'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#172A46', fontWeight: 500 }}>
                <Zap size={16} color="#19B8CD" />
                <span>{isEn ? 'Clear Proposal in 24-48h' : 'Devis transparent sous 24h'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Platform Visual UI Mockup */}
          <div
            style={{
              position: 'relative',
              borderRadius: '16px',
              border: '1px solid #DAE3ED',
              backgroundColor: '#0B1730',
              boxShadow: '0 20px 48px -12px rgba(11, 23, 48, 0.25)',
              overflow: 'hidden',
              padding: 'clamp(16px, 3vw, 28px) clamp(12px, 2.5vw, 24px)',
              color: '#FFFFFF',
            }}
          >
            {/* Window bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '16px',
                marginBottom: '20px',
                borderBottom: '1px solid rgba(218, 227, 237, 0.12)',
              }}
            >
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FF5F56' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27C93F' }} />
              </div>
              <span
                style={{
                  fontSize: '12px',
                  fontFamily: "'Geist Mono', monospace",
                  color: '#DAE3ED',
                  opacity: 0.8,
                }}
              >
                musatech-engine.config.ts
              </span>
              <span
                style={{
                  fontSize: '11px',
                  backgroundColor: 'rgba(25, 184, 205, 0.2)',
                  color: '#19B8CD',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontWeight: 600,
                }}
              >
                PROD READY
              </span>
            </div>

            {/* Architecture Card Preview */}
            <div
              style={{
                backgroundColor: '#172A46',
                borderRadius: '12px',
                padding: 'clamp(16px, 3vw, 20px)',
                marginBottom: '16px',
                border: '1px solid rgba(25, 184, 205, 0.2)',
                overflowX: 'auto',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', minWidth: '260px' }}>
                <span style={{ fontSize: '13px', color: '#19B8CD', fontWeight: 600 }}>
                  {isEn ? 'Software Architecture' : 'Architecture Applicative'}
                </span>
                <span style={{ fontSize: '12px', color: '#DAE3ED', opacity: 0.7 }}>
                  {isEn ? 'Senegal × Global' : 'Dakar × International'}
                </span>
              </div>
              <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 'clamp(11.5px, 2.8vw, 13px)', lineHeight: 1.7, color: '#E9F1F7', minWidth: '260px' }}>
                <div><span style={{ color: '#19B8CD' }}>const</span> app = <span style={{ color: '#E0A838' }}>new MusaTechSolution</span>({'{'}</div>
                <div style={{ paddingLeft: '16px' }}>backend: <span style={{ color: '#88C0D0' }}>'NestJS / Node.js'</span>,</div>
                <div style={{ paddingLeft: '16px' }}>frontend: <span style={{ color: '#88C0D0' }}>'React 19 / Next.js'</span>,</div>
                <div style={{ paddingLeft: '16px' }}>mobile: <span style={{ color: '#88C0D0' }}>'React Native / Expo'</span>,</div>
                <div style={{ paddingLeft: '16px' }}>database: <span style={{ color: '#88C0D0' }}>'PostgreSQL / Redis'</span>,</div>
                <div style={{ paddingLeft: '16px' }}>payments: [<span style={{ color: '#88C0D0' }}>'Wave'</span>, <span style={{ color: '#88C0D0' }}>'Orange Money'</span>, <span style={{ color: '#88C0D0' }}>'Stripe'</span>],</div>
                <div style={{ paddingLeft: '16px' }}>security: <span style={{ color: '#27C93F' }}>'WCAG AA + SSL + JWT'</span></div>
                <div>{'}'});</div>
              </div>
            </div>

            {/* Verification Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(6px, 2vw, 12px)' }}>
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  padding: 'clamp(8px, 2vw, 12px)',
                  borderRadius: '8px',
                  border: '1px solid rgba(218, 227, 237, 0.08)',
                }}
              >
                <div style={{ fontSize: 'clamp(10px, 2.5vw, 11px)', color: '#DAE3ED', opacity: 0.7, marginBottom: '4px' }}>
                  {isEn ? 'Uptime' : 'Disponibilité'}
                </div>
                <div style={{ fontSize: 'clamp(14px, 3.5vw, 16px)', fontWeight: 700, color: '#FFFFFF', fontFamily: "'Manrope', sans-serif" }}>
                  99.9%
                </div>
              </div>

              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  padding: 'clamp(8px, 2vw, 12px)',
                  borderRadius: '8px',
                  border: '1px solid rgba(218, 227, 237, 0.08)',
                }}
              >
                <div style={{ fontSize: 'clamp(10px, 2.5vw, 11px)', color: '#DAE3ED', opacity: 0.7, marginBottom: '4px' }}>
                  {isEn ? 'Response Time' : 'Temps de réponse'}
                </div>
                <div style={{ fontSize: 'clamp(14px, 3.5vw, 16px)', fontWeight: 700, color: '#19B8CD', fontFamily: "'Manrope', sans-serif" }}>
                  &lt; 150ms
                </div>
              </div>

              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  padding: 'clamp(8px, 2vw, 12px)',
                  borderRadius: '8px',
                  border: '1px solid rgba(218, 227, 237, 0.08)',
                }}
              >
                <div style={{ fontSize: 'clamp(10px, 2.5vw, 11px)', color: '#DAE3ED', opacity: 0.7, marginBottom: '4px' }}>
                  {isEn ? 'Type Safety' : 'Tests & Qualité'}
                </div>
                <div style={{ fontSize: 'clamp(14px, 3.5vw, 16px)', fontWeight: 700, color: '#27C93F', fontFamily: "'Manrope', sans-serif" }}>
                  100% typé
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
