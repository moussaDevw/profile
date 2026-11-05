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
            className="mt-hero-visual-card"
            style={{
              position: 'relative',
              borderRadius: '16px',
              border: '1.5px solid #1E293B',
              backgroundColor: '#0B1730',
              boxShadow: '0 20px 48px -12px rgba(11, 23, 48, 0.35), 0 0 0 1px rgba(25, 184, 205, 0.1)',
              overflow: 'hidden',
              padding: 'clamp(14px, 3vw, 24px) clamp(10px, 2.5vw, 20px)',
              color: '#FFFFFF',
            }}
          >
            {/* Top subtle neon accent line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, #19B8CD 0%, #E0A838 50%, #27C93F 100%)',
                opacity: 0.8,
              }}
            />

            {/* Window bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '12px',
                marginBottom: '14px',
                borderBottom: '1px solid rgba(218, 227, 237, 0.1)',
                gap: '8px',
              }}
            >
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexShrink: 0 }}>
                  <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#FF5F56', display: 'inline-block' }} />
                  <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#FFBD2E', display: 'inline-block' }} />
                  <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#27C93F', display: 'inline-block' }} />
                </div>
                <span
                  style={{
                    fontSize: 'clamp(11px, 2.5vw, 12px)',
                    fontFamily: "'Geist Mono', monospace",
                    color: '#CBD5E1',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '180px',
                    fontWeight: 500,
                    opacity: 0.9,
                  }}
                >
                  musatech-engine.config.ts
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    backgroundColor: 'rgba(39, 201, 63, 0.12)',
                    color: '#27C93F',
                    border: '1px solid rgba(39, 201, 63, 0.25)',
                    padding: '2px 8px',
                    borderRadius: '100px',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    flexShrink: 0,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#27C93F',
                      boxShadow: '0 0 6px rgba(39, 201, 63, 0.8)',
                    }}
                  />
                  <span>PROD READY</span>
                </span>
              </div>

              {/* Architecture Card Preview */}
              <div
                style={{
                  backgroundColor: '#111E38',
                  borderRadius: '12px',
                  padding: 'clamp(12px, 3vw, 18px)',
                  marginBottom: '14px',
                  border: '1px solid rgba(25, 184, 205, 0.2)',
                  overflowX: 'auto',
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '12px',
                        paddingBottom: '8px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                        gap: '8px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#19B8CD' }} />
                        <span style={{ fontSize: 'clamp(11.5px, 2.6vw, 13px)', color: '#19B8CD', fontWeight: 600 }}>
                          {isEn ? 'Software Architecture' : 'Architecture Applicative'}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: 'clamp(10.5px, 2.4vw, 12px)',
                          color: '#94A3B8',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontWeight: 500,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {isEn ? 'Senegal × Global' : 'Dakar × International'}
                      </span>
                    </div>
                      <div
                        style={{
                          fontFamily: "'Geist Mono', monospace",
                          fontSize: 'clamp(11px, 2.6vw, 13px)',
                          lineHeight: 1.65,
                          color: '#E2E8F0',
                        }}
                      >
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <span style={{ color: '#475569', userSelect: 'none', minWidth: '14px', textAlign: 'right' }}>1</span>
                          <div>
                            <span style={{ color: '#19B8CD' }}>const</span> app = <span style={{ color: '#E0A838' }}>new MusaTechSolution</span>({'{'}
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                          <span style={{ color: '#475569', userSelect: 'none', minWidth: '14px', textAlign: 'right' }}>2</span>
                          <div style={{ paddingLeft: '8px' }}>
                            <span style={{ color: '#94A3B8' }}>backend:</span> <span style={{ color: '#88C0D0' }}>'NestJS / Node.js'</span>,
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                          <span style={{ color: '#475569', userSelect: 'none', minWidth: '14px', textAlign: 'right' }}>3</span>
                          <div style={{ paddingLeft: '8px' }}>
                            <span style={{ color: '#94A3B8' }}>frontend:</span> <span style={{ color: '#88C0D0' }}>'React 19 / Next.js'</span>,
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                          <span style={{ color: '#475569', userSelect: 'none', minWidth: '14px', textAlign: 'right' }}>4</span>
                          <div style={{ paddingLeft: '8px' }}>
                            <span style={{ color: '#94A3B8' }}>mobile:</span> <span style={{ color: '#88C0D0' }}>'React Native / Expo'</span>,
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                          <span style={{ color: '#475569', userSelect: 'none', minWidth: '14px', textAlign: 'right' }}>5</span>
                          <div style={{ paddingLeft: '8px' }}>
                            <span style={{ color: '#94A3B8' }}>database:</span> <span style={{ color: '#88C0D0' }}>'PostgreSQL / Redis'</span>,
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                          <span style={{ color: '#475569', userSelect: 'none', minWidth: '14px', textAlign: 'right' }}>6</span>
                          <div style={{ paddingLeft: '8px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                            <span style={{ color: '#94A3B8' }}>payments:</span>
                            <span>[<span style={{ color: '#88C0D0' }}>'Wave'</span>, <span style={{ color: '#88C0D0' }}>'Orange Money'</span>, <span style={{ color: '#88C0D0' }}>'Stripe'</span>],</span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                          <span style={{ color: '#475569', userSelect: 'none', minWidth: '14px', textAlign: 'right' }}>7</span>
                          <div style={{ paddingLeft: '8px' }}>
                            <span style={{ color: '#94A3B8' }}>security:</span> <span style={{ color: '#27C93F' }}>'WCAG AA + SSL + JWT'</span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                          <span style={{ color: '#475569', userSelect: 'none', minWidth: '14px', textAlign: 'right' }}>8</span>
                          <div>{'}'});</div>
                        </div>
                      </div>
                    </div>

                    {/* Verification Stats Row */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, 1fr)',
                          gap: 'clamp(6px, 1.8vw, 10px)',
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.04)',
                            padding: 'clamp(8px, 2vw, 12px) 6px',
                            borderRadius: '10px',
                            border: '1px solid rgba(218, 227, 237, 0.08)',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                            <div
                              style={{
                                fontSize: 'clamp(14px, 3.5vw, 17px)',
                                fontWeight: 800,
                                color: '#FFFFFF',
                                fontFamily: "'Manrope', sans-serif",
                                lineHeight: 1.2,
                                marginBottom: '3px',
                              }}
                            >
                              99.9%
                            </div>
                            <div
                              style={{
                                fontSize: 'clamp(10px, 2.2vw, 11px)',
                                color: '#94A3B8',
                                lineHeight: 1.2,
                                fontWeight: 500,
                              }}
                            >
                              {isEn ? 'Uptime' : 'Disponibilité'}
                            </div>
                          </div>

                          <div
                            style={{
                              backgroundColor: 'rgba(255, 255, 255, 0.04)',
                              padding: 'clamp(8px, 2vw, 12px) 6px',
                              borderRadius: '10px',
                              border: '1px solid rgba(218, 227, 237, 0.08)',
                              textAlign: 'center',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                              <div
                                style={{
                                  fontSize: 'clamp(14px, 3.5vw, 17px)',
                                  fontWeight: 800,
                                  color: '#19B8CD',
                                  fontFamily: "'Manrope', sans-serif",
                                  lineHeight: 1.2,
                                  marginBottom: '3px',
                                }}
                              >
                                &lt; 150ms
                              </div>
                              <div
                                style={{
                                  fontSize: 'clamp(10px, 2.2vw, 11px)',
                                  color: '#94A3B8',
                                  lineHeight: 1.2,
                                  fontWeight: 500,
                                }}
                              >
                                {isEn ? 'Response Time' : 'Temps de réponse'}
                              </div>
                            </div>

                            <div
                              style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                                padding: 'clamp(8px, 2vw, 12px) 6px',
                                borderRadius: '10px',
                                border: '1px solid rgba(218, 227, 237, 0.08)',
                                textAlign: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                                <div
                                  style={{
                                    fontSize: 'clamp(14px, 3.5vw, 17px)',
                                    fontWeight: 800,
                                    color: '#27C93F',
                                    fontFamily: "'Manrope', sans-serif",
                                    lineHeight: 1.2,
                                    marginBottom: '3px',
                                  }}
                                >
                                  100% typé
                                </div>
                                <div
                                  style={{
                                    fontSize: 'clamp(10px, 2.2vw, 11px)',
                                    color: '#94A3B8',
                                    lineHeight: 1.2,
                                    fontWeight: 500,
                                  }}
                                >
                                  {isEn ? 'Type Safety' : 'Tests & Qualité'}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Container>
                    </section>
                    );
};
