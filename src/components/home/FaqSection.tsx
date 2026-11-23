import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { MessageCircle, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Container } from '../../design-system/Container';
import { FaqAccordion } from '../../design-system/FaqAccordion';
import { LinkButton } from '../../design-system/Button';
import { getHomeFaq } from '../../content/homeData';
import { useRouter } from '../../lib/router';
import { getLocalizedHref } from '../../lib/i18nRoutes';

const FaqScrollWord: React.FC<{
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

export const FaqSection: React.FC = () => {
  const { locale } = useRouter();
  const faqData = getHomeFaq(locale);
  const isEn = locale === 'en';

  const headingRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ['start 0.88', 'end 0.45'],
  });

  const titleText = isEn
    ? 'Frequently Asked Questions, clear answers.'
    : 'Questions fréquentes, réponses transparentes.';
  const titleWords = titleText.split(' ');

  return (
    <section
      id="faq"
      className="mt-section"
      style={{
        width: '100%',
        backgroundColor: '#FFFFFF',
        paddingTop: 'clamp(56px, 7vw, 88px)',
        paddingBottom: '0',
        borderBottom: '1px solid #EAE6DF',
      }}
    >
      {/* En-tête centré avec illumination des mots au scroll (Style Alan.com) */}
      <div
        ref={headingRef}
        style={{
          textAlign: 'center',
          maxWidth: '860px',
          margin: '0 auto clamp(40px, 6vw, 60px)',
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
            backgroundColor: '#EEF2FF',
            color: '#1E3A8A',
            padding: '8px 18px',
            borderRadius: '9999px',
            fontSize: '13px',
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}
        >
          <span>{isEn ? 'FAQ & Transparency' : 'FAQ & Transparence'}</span>
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
                <FaqScrollWord
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
            ? 'Transparent answers regarding our engineering process, pricing baseline, and engagement terms.'
            : "Des réponses claires et sans jargon sur notre méthode, nos tarifs et nos modalités d'intervention."}
        </p>
      </div>

      {/* Scène Pastel 100% Pleine Largeur (Bord à Bord) avec Carte Support à Gauche + Accordéon Flottant à Droite */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ type: 'spring', stiffness: 80, damping: 18 }}
        style={{
          width: '100%',
          backgroundColor: '#FBF0E4',
          borderRadius: '0',
          padding: 'clamp(52px, 7vw, 92px) 0',
        }}
      >
        <Container>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: 'clamp(32px, 5vw, 56px)',
              alignItems: 'start',
            }}
          >
            {/* Colonne Gauche : Carte Conseil & Contact Direct (Style Alan.com) */}
            <div style={{ maxWidth: '420px' }}>
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: '#F6DCC0',
                  color: '#7C2D12',
                  fontWeight: 800,
                  fontSize: '11.5px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  padding: '6px 14px',
                  borderRadius: '10px',
                  marginBottom: '18px',
                }}
              >
                {isEn ? 'DIRECT SUPPORT' : 'ACCOMPAGNEMENT DIRECT'}
              </span>

              <h3
                className="mt-h3"
                style={{
                  fontSize: 'clamp(26px, 3vw, 36px)',
                  fontWeight: 800,
                  color: '#0B1730',
                  lineHeight: 1.15,
                  letterSpacing: '-0.025em',
                  marginBottom: '16px',
                }}
              >
                {isEn
                  ? 'Still have a specific question?'
                  : 'Une question précise sur votre projet ?'}
              </h3>

              <p
                style={{
                  fontSize: '15.5px',
                  color: '#431407',
                  lineHeight: 1.62,
                  marginBottom: '24px',
                }}
              >
                {isEn
                  ? 'Speak directly with Moussa Diagne. No bots, no call centers — get a tailored technical answer within 24 hours.'
                  : 'Échangez directement avec Moussa Diagne. Pas de robot ni de standard : vous obtenez une réponse claire et personnalisée sous 24h.'}
              </p>

              {/* Carte Blanche Flottante Réassurance */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '28px',
                  padding: '22px 24px',
                  boxShadow: '0 18px 40px rgba(124, 45, 18, 0.08)',
                  marginBottom: '24px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '12px',
                      backgroundColor: '#D9F2EE',
                      color: '#0E6049',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#0B1730' }}>
                      {isEn ? 'Fast response guaranteed' : 'Réponse rapide garantie'}
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>
                      WhatsApp · Email · {isEn ? 'Video call' : 'Appel vidéo'}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#047857',
                    backgroundColor: '#ECFDF5',
                    padding: '8px 14px',
                    borderRadius: '9999px',
                  }}
                >
                  <CheckCircle2 size={15} color="#10B981" />
                  <span>{isEn ? 'Free initial scoping call' : 'Premier échange de cadrage gratuit'}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <LinkButton
                  href={getLocalizedHref('quote', locale)}
                  variant="primary"
                  size="lg"
                  icon={<ArrowUpRight size={16} />}
                  style={{
                    borderRadius: '9999px',
                    backgroundColor: '#0B1730',
                    color: '#FFFFFF',
                    paddingLeft: '26px',
                    paddingRight: '26px',
                  }}
                >
                  {isEn ? 'Request a Quote' : 'Demander un devis'}
                </LinkButton>

                <LinkButton
                  href={getLocalizedHref('contact', locale)}
                  variant="outline"
                  size="lg"
                  style={{
                    borderRadius: '9999px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5D5C3',
                    paddingLeft: '24px',
                    paddingRight: '24px',
                  }}
                >
                  {isEn ? 'Ask a Question' : 'Poser une question'}
                </LinkButton>
              </div>
            </div>

            {/* Colonne Droite : Accordéon FAQ en Bulles Flottantes Blanches */}
            <div>
              <FaqAccordion items={faqData} idPrefix="home-faq" />
            </div>
          </div>
        </Container>
      </motion.div>
    </section>
  );
};
