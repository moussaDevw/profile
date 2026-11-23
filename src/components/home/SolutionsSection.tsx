import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Building2, GraduationCap, Store, Truck, Check, ArrowUpRight } from 'lucide-react';
import { Container } from '../../design-system/Container';
import { LinkButton } from '../../design-system/Button';
import { getSolutionsData } from '../../content/homeData';
import { useRouter } from '../../lib/router';

const SolutionScrollWord: React.FC<{
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

export const SolutionsSection: React.FC = () => {
  const { locale } = useRouter();
  const solutions = getSolutionsData(locale);
  const isEn = locale === 'en';

  const headingRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ['start 0.88', 'end 0.45'],
  });

  const titleText = isEn
    ? 'Software engineered for your industry requirements.'
    : 'Des outils pensés pour votre métier.';
  const titleWords = titleText.split(' ');

  const getSectorTheme = (sector: string, index: number) => {
    const s = sector.toLowerCase();
    if (s.includes('immobilier') || s.includes('estate')) {
      return {
        bg: '#D9F2EE',
        tagBg: '#BAE6DF',
        tagColor: '#0A4B3E',
        accent: '#0E6049',
        icon: <Building2 size={24} color="#0E6049" />,
      };
    }
    if (s.includes('éducation') || s.includes('education')) {
      return {
        bg: '#EEF2FF',
        tagBg: '#D8E1FF',
        tagColor: '#1E3A8A',
        accent: '#4338CA',
        icon: <GraduationCap size={24} color="#4338CA" />,
      };
    }
    if (s.includes('commerce') || s.includes('retail')) {
      return {
        bg: '#FCE8EC',
        tagBg: '#F9CED8',
        tagColor: '#831843',
        accent: '#BE123C',
        icon: <Store size={24} color="#BE123C" />,
      };
    }
    if (s.includes('logistique') || s.includes('logistics') || index >= 3) {
      return {
        bg: '#FBF0E4',
        tagBg: '#F6DCC0',
        tagColor: '#7C2D12',
        accent: '#B45309',
        icon: <Truck size={24} color="#B45309" />,
      };
    }
    return {
      bg: '#D9F2EE',
      tagBg: '#BAE6DF',
      tagColor: '#0A4B3E',
      accent: '#0E6049',
      icon: <Building2 size={24} color="#0E6049" />,
    };
  };

  return (
    <section
      id="solutions"
      className="mt-section"
      style={{
        width: '100%',
        backgroundColor: '#FFFFFF',
        paddingTop: 'clamp(56px, 7vw, 88px)',
        paddingBottom: '0',
        borderBottom: '1px solid #EAE6DF',
      }}
    >
      {/* En-tête centré avec illumination mot par mot au scroll */}
      <div
        ref={headingRef}
        style={{
          textAlign: 'center',
          maxWidth: '880px',
          margin: '0 auto clamp(40px, 6vw, 64px)',
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
            backgroundColor: '#FBF0E4',
            color: '#7C2D12',
            padding: '8px 18px',
            borderRadius: '9999px',
            fontSize: '13px',
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}
        >
          <span>{isEn ? 'Industry Specialization' : 'Expertises Métier'}</span>
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
                <SolutionScrollWord
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
            margin: '0 auto',
            fontWeight: 500,
          }}
        >
          {isEn
            ? 'Every business sector has specific operational workflows and constraints. MusaTech delivers domain-focused capabilities that integrate seamlessly with your daily operations.'
            : "Chaque secteur d'activité comporte des contraintes et des habitudes d'usage spécifiques. MusaTech conçoit des fonctionnalités alignées avec votre quotidien opérationnel."}
        </p>
      </div>

      {/* Bandes Secteurs 100% Pleine Largeur (Bord à Bord sans marge ni padding latéral) */}
      <div className="mt-grid-2" style={{ display: 'flex', flexDirection: 'column', gap: '0', width: '100%' }}>
        {solutions.map((sol, index) => {
          const theme = getSectorTheme(sol.sector, index);

          return (
            <motion.div
              key={sol.sector}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.16 }}
              transition={{ type: 'spring', stiffness: 80, damping: 18 }}
              style={{
                width: '100%',
                backgroundColor: theme.bg,
                borderRadius: '0',
                padding: 'clamp(48px, 6vw, 84px) 0',
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
                  {/* Colonne Gauche : Secteur, Titre & Enjeu Métier */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '14px',
                          backgroundColor: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 12px rgba(11, 23, 48, 0.06)',
                        }}
                      >
                        {theme.icon}
                      </div>
                      <span
                        style={{
                          display: 'inline-block',
                          backgroundColor: theme.tagBg,
                          color: theme.tagColor,
                          fontWeight: 800,
                          fontSize: '12px',
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          padding: '6px 14px',
                          borderRadius: '10px',
                        }}
                      >
                        {sol.sector}
                      </span>
                    </div>

                    <h3
                      className="mt-h3"
                      style={{
                        fontSize: 'clamp(26px, 3vw, 36px)',
                        fontWeight: 800,
                        color: '#0B1730',
                        lineHeight: 1.14,
                        letterSpacing: '-0.025em',
                        marginBottom: '14px',
                      }}
                    >
                      {sol.title}
                    </h3>

                    <p
                      style={{
                        fontSize: '15.5px',
                        color: '#334155',
                        lineHeight: 1.62,
                        marginBottom: '24px',
                      }}
                    >
                      {sol.problem}
                    </p>

                    <LinkButton
                      href={sol.ctaHref}
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
                      {isEn ? 'Explore industry solution' : 'Découvrir la solution métier'}
                    </LinkButton>
                  </div>

                  {/* Colonne Droite : Carte Flottante Blanche des Fonctionnalités Métier */}
                  <motion.div
                    whileHover={{ y: -5, scale: 1.01 }}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '32px',
                      padding: 'clamp(24px, 3.5vw, 34px)',
                      boxShadow: '0 22px 48px -12px rgba(11, 23, 48, 0.08)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '12px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: theme.accent,
                        marginBottom: '16px',
                      }}
                    >
                      {isEn ? 'Key Sector Capabilities' : 'Fonctionnalités clés déployées'}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {sol.features.map((feat) => (
                        <div
                          key={feat}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            backgroundColor: '#FAF8F5',
                            padding: '12px 16px',
                            borderRadius: '18px',
                          }}
                        >
                          <div
                            style={{
                              width: '26px',
                              height: '26px',
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
                          <span style={{ fontSize: '14px', fontWeight: 700, color: '#0B1730', lineHeight: 1.4 }}>
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </Container>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
