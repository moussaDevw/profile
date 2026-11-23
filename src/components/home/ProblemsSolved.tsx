import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { EyeOff, AlertCircle, Unlink, Lightbulb, Check, ArrowRight } from 'lucide-react';
import { Container } from '../../design-system/Container';
import { getProblemsData } from '../../content/homeData';
import { useRouter } from '../../lib/router';

const ProblemScrollWord: React.FC<{
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

export const ProblemsSolved: React.FC = () => {
  const { locale } = useRouter();
  const problemsData = getProblemsData(locale);
  const isEn = locale === 'en';

  const headingRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ['start 0.88', 'end 0.45'],
  });

  const titleText = isEn
    ? 'Your business deserves software engineered for your ambition.'
    : 'Votre activité mérite des outils à la hauteur de vos ambitions.';
  const titleWords = titleText.split(' ');

  const getScenePalette = (id: string) => {
    switch (id) {
      case 'visibilite':
        return {
          surfaceBg: '#E6F5F3',
          tagBg: '#BCE6DF',
          tagColor: '#0A4B3E',
          tagLabel: isEn ? 'VISIBILITY & TRUST' : 'VISIBILITÉ & CRÉDIBILITÉ',
          accentColor: '#0E6049',
          icon: <EyeOff size={20} color="#0E6049" />,
          metricValue: '+140%',
          metricLabel: isEn ? 'Qualified B2B inquiries' : 'Demandes de devis qualifiées',
        };
      case 'gestion-manuelle':
        return {
          surfaceBg: '#FBF0E4',
          tagBg: '#F6DCC0',
          tagColor: '#7C2D12',
          tagLabel: isEn ? 'AUTOMATION & TIME' : 'AUTOMATISATION & GAIN DE TEMPS',
          accentColor: '#B45309',
          icon: <AlertCircle size={20} color="#B45309" />,
          metricValue: '-75%',
          metricLabel: isEn ? 'Manual data entry tasks' : 'Saisies manuelles & erreurs Excel',
        };
      case 'outils-deconnectes':
        return {
          surfaceBg: '#EEF2FF',
          tagBg: '#D9E2FF',
          tagColor: '#1E3A8A',
          tagLabel: isEn ? 'UNIFIED ECOSYSTEM' : 'ÉCOSYSTÈME CENTRALISÉ',
          accentColor: '#4338CA',
          icon: <Unlink size={20} color="#4338CA" />,
          metricValue: '100%',
          metricLabel: isEn ? 'Real-time data sync' : 'Données synchronisées en temps réel',
        };
      default:
        return {
          surfaceBg: '#FCE8EC',
          tagBg: '#F9CED8',
          tagColor: '#831843',
          tagLabel: isEn ? 'TAILORED PRODUCT' : 'LOGICIEL SUR MESURE',
          accentColor: '#BE123C',
          icon: <Lightbulb size={20} color="#BE123C" />,
          metricValue: '24-48h',
          metricLabel: isEn ? 'From idea to technical roadmap' : 'De l’idée au plan d’architecture',
        };
    }
  };

  return (
    <section
      id="problemes"
      className="mt-section"
      style={{
        width: '100%',
        backgroundColor: '#FFFFFF',
        paddingTop: 'clamp(48px, 6vw, 80px)',
        paddingBottom: 'clamp(56px, 8vw, 96px)',
        borderBottom: '1px solid #EAE6DF',
      }}
    >
      {/* En-tête centré avec illumination des mots au scroll (Style Alan.com) */}
      <div
        ref={headingRef}
        style={{
          textAlign: 'center',
          maxWidth: '860px',
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
            backgroundColor: '#EEF6F8',
            color: '#0D7B8A',
            padding: '8px 18px',
            borderRadius: '9999px',
            fontSize: '13px',
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}
        >
          <span>{isEn ? 'Diagnosis & Challenges' : 'Diagnostic & Enjeux'}</span>
        </motion.div>

        {/* Note: Texte complet également accessible pour les lecteurs d'écran / tests */}
        <h2
          aria-label={titleText}
          style={{
            fontSize: 'clamp(30px, 4.4vw, 50px)',
            fontWeight: 800,
            color: '#0B1730',
            letterSpacing: '-0.03em',
            lineHeight: 1.14,
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
                <ProblemScrollWord
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
            maxWidth: '660px',
            margin: '0 auto',
            fontWeight: 500,
          }}
        >
          {isEn
            ? 'Identifying operational bottlenecks is the foundational step toward building high-ROI, sustainable digital platforms.'
            : 'Identifier les freins opérationnels de votre entreprise est la première étape pour concevoir des outils digitaux rentables et durables.'}
        </p>
      </div>

      {/* Bandes Pastel Pleine Largeur (100% Width bord à bord sans marge ni padding latéral) */}
      <div className="mt-grid-2" style={{ display: 'flex', flexDirection: 'column', gap: '0', width: '100%' }}>
        {problemsData.map((item, idx) => {
          const palette = getScenePalette(item.id);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                type: 'spring',
                stiffness: 85,
                damping: 18,
                delay: idx * 0.05,
              }}
              style={{
                width: '100%',
                backgroundColor: palette.surfaceBg,
                borderRadius: '0',
                padding: 'clamp(48px, 6vw, 80px) 0',
              }}
            >
              <Container>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                    gap: 'clamp(24px, 4vw, 44px)',
                    alignItems: 'center',
                  }}
                >
                  {/* Colonne 1 : Le Constat / Frein Opérationnel */}
                  <div>
                    <span
                      style={{
                        display: 'inline-block',
                        backgroundColor: palette.tagBg,
                        color: palette.tagColor,
                        fontWeight: 800,
                        fontSize: '11.5px',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        padding: '6px 14px',
                        borderRadius: '10px',
                        marginBottom: '16px',
                      }}
                    >
                      {palette.tagLabel}
                    </span>

                    <h3
                      className="mt-h3"
                      style={{
                        fontSize: 'clamp(24px, 2.8vw, 34px)',
                        fontWeight: 800,
                        color: '#0B1730',
                        lineHeight: 1.16,
                        letterSpacing: '-0.02em',
                        marginBottom: '14px',
                      }}
                    >
                      {item.difficulty}
                    </h3>

                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#64748B',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        marginBottom: '6px',
                      }}
                    >
                      {palette.icon}
                      <span>{isEn ? 'Without Tailored Tools' : 'Le frein au quotidien'}</span>
                    </div>

                    <p
                      style={{
                        margin: 0,
                        fontSize: '15.5px',
                        color: '#334155',
                        lineHeight: 1.6,
                      }}
                    >
                      {item.problemDescription}
                    </p>
                  </div>

                  {/* Colonne 2 : Carte Flottante "Avec MusaTech" (Style Widget Alan.com) */}
                  <motion.div
                    whileHover={{ y: -5, scale: 1.01 }}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '32px',
                      padding: 'clamp(22px, 3vw, 32px)',
                      boxShadow: '0 22px 48px -12px rgba(11, 23, 48, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          backgroundColor: '#ECFDF5',
                          color: '#047857',
                          padding: '6px 14px',
                          borderRadius: '9999px',
                          fontSize: '12.5px',
                          fontWeight: 800,
                        }}
                      >
                        <Check size={15} strokeWidth={3} />
                        <span>{isEn ? 'With MusaTech' : 'Avec MusaTech'}</span>
                      </span>

                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: 700,
                          color: palette.accentColor,
                          backgroundColor: palette.surfaceBg,
                          padding: '5px 12px',
                          borderRadius: '9999px',
                        }}
                      >
                        {palette.metricValue}
                      </span>
                    </div>

                    <p
                      style={{
                        margin: 0,
                        fontSize: '16.5px',
                        fontWeight: 700,
                        color: '#0B1730',
                        lineHeight: 1.55,
                      }}
                    >
                      {item.solutionBenefit}
                    </p>

                    <div
                      style={{
                        paddingTop: '12px',
                        borderTop: '1px solid #F1F5F9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '13px',
                        fontWeight: 700,
                        color: palette.accentColor,
                      }}
                    >
                      <span>{palette.metricLabel}</span>
                      <ArrowRight size={16} />
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
