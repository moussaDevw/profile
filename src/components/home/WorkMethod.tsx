import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Check } from 'lucide-react';
import { Container } from '../../design-system/Container';
import { getMethodSteps } from '../../content/homeData';
import { useRouter } from '../../lib/router';

const MethodScrollWord: React.FC<{
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

export const WorkMethod: React.FC = () => {
  const { locale } = useRouter();
  const methodSteps = getMethodSteps(locale);
  const isEn = locale === 'en';

  const headingRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ['start 0.88', 'end 0.45'],
  });

  const titleText = isEn
    ? 'Transparent collaboration from concept to production.'
    : "Un accompagnement clair, de l'idée à la mise en ligne.";
  const titleWords = titleText.split(' ');

  const stepPalettes = [
    { bg: '#D9F2EE', tagBg: '#BAE6DF', tagColor: '#0A4B3E', accent: '#0E6049' },
    { bg: '#FBF0E4', tagBg: '#F6DCC0', tagColor: '#7C2D12', accent: '#B45309' },
    { bg: '#EEF2FF', tagBg: '#D8E1FF', tagColor: '#1E3A8A', accent: '#4338CA' },
    { bg: '#FCE8EC', tagBg: '#F9CED8', tagColor: '#831843', accent: '#BE123C' },
  ];

  return (
    <section
      id="methode"
      className="mt-section"
      style={{
        width: '100%',
        backgroundColor: '#FFFFFF',
        paddingTop: 'clamp(56px, 7vw, 88px)',
        paddingBottom: '0',
        borderBottom: '1px solid #EAE6DF',
      }}
    >
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
          <span>{isEn ? 'Work Methodology' : 'Notre Démarche'}</span>
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
                <MethodScrollWord
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
            ? 'A disciplined 4-stage engineering approach ensuring milestone clarity, fixed budgets, and uncompromised code quality.'
            : 'Une méthode de travail éprouvée pour garantir le respect des délais, la transparence budgétaire et une qualité de code irréprochable.'}
        </p>
      </div>

      {/* 4 Étapes en Bandes Pastel 100% Pleine Largeur */}
      <div className="mt-grid-4" style={{ display: 'flex', flexDirection: 'column', gap: '0', width: '100%' }}>
        {methodSteps.map((step, idx) => {
          const palette = stepPalettes[idx % stepPalettes.length];

          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ type: 'spring', stiffness: 85, damping: 18 }}
              style={{
                width: '100%',
                backgroundColor: palette.bg,
                borderRadius: '0',
                padding: 'clamp(44px, 5.5vw, 72px) 0',
              }}
            >
              <Container>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                    gap: 'clamp(24px, 4vw, 48px)',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <span
                      style={{
                        display: 'inline-block',
                        backgroundColor: palette.tagBg,
                        color: palette.tagColor,
                        fontWeight: 800,
                        fontSize: '12px',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        padding: '6px 14px',
                        borderRadius: '10px',
                        marginBottom: '16px',
                      }}
                    >
                      {isEn ? 'STEP' : 'ÉTAPE'} {step.number}
                    </span>

                    <h3
                      className="mt-h3"
                      style={{
                        fontSize: 'clamp(24px, 2.8vw, 34px)',
                        fontWeight: 800,
                        color: '#0B1730',
                        lineHeight: 1.15,
                        marginBottom: '12px',
                      }}
                    >
                      {step.title}
                    </h3>

                    <p
                      style={{
                        fontSize: '15.5px',
                        color: '#334155',
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {step.description}
                    </p>
                  </div>

                  {/* Carte Flottante Livrable de l'Étape */}
                  <motion.div
                    whileHover={{ y: -4, scale: 1.01 }}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '28px',
                      padding: '24px 28px',
                      boxShadow: '0 18px 42px rgba(11, 23, 48, 0.07)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: '#ECFDF5',
                        color: '#10B981',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Check size={20} strokeWidth={3} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: '11.5px',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: palette.accent,
                          marginBottom: '4px',
                        }}
                      >
                        {isEn ? 'Concrete Deliverable' : 'Livrable concret garanti'}
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#0B1730' }}>
                        {step.deliverable}
                      </div>
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
