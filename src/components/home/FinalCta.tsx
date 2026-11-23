import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, CheckCircle2 } from 'lucide-react';
import { Container } from '../../design-system/Container';
import { LinkButton } from '../../design-system/Button';
import { getFinalCtaData } from '../../content/homeData';
import { useRouter } from '../../lib/router';

export const FinalCta: React.FC = () => {
  const { locale } = useRouter();
  const ctaData = getFinalCtaData(locale);
  const isEn = locale === 'en';

  return (
    <section
      className="mt-section"
      style={{
        width: '100%',
        backgroundColor: '#D9F2EE',
        padding: 'clamp(64px, 9vw, 112px) 0',
      }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ type: 'spring', stiffness: 80, damping: 18 }}
          style={{
            maxWidth: '920px',
            margin: '0 auto',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              backgroundColor: '#BAE6DF',
              color: '#0A4B3E',
              fontWeight: 800,
              fontSize: '12px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              padding: '7px 16px',
              borderRadius: '9999px',
              marginBottom: '20px',
            }}
          >
            {isEn ? 'READY TO LAUNCH?' : 'PRÊT À LANCER VOTRE PROJET ?'}
          </span>

          <h2
            className="mt-h2"
            style={{
              color: '#0B1730',
              marginBottom: '18px',
              fontSize: 'clamp(32px, 4.6vw, 52px)',
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
            }}
          >
            {ctaData.title}
          </h2>

          <p
            className="mt-body"
            style={{
              color: '#1E3A36',
              fontSize: 'clamp(17px, 2vw, 20px)',
              lineHeight: 1.6,
              marginBottom: '34px',
              maxWidth: '660px',
            }}
          >
            {ctaData.description}
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '14px',
              justifyContent: 'center',
              marginBottom: '30px',
            }}
          >
            <LinkButton
              href={ctaData.cta1.href}
              variant="primary"
              size="lg"
              icon={<ArrowDown size={16} />}
              style={{
                borderRadius: '9999px',
                backgroundColor: '#0B1730',
                color: '#FFFFFF',
                paddingLeft: '32px',
                paddingRight: '32px',
              }}
            >
              {ctaData.cta1.label}
            </LinkButton>

            <LinkButton
              href={ctaData.cta2.href}
              variant="outline"
              size="lg"
              style={{
                borderRadius: '9999px',
                backgroundColor: '#FFFFFF',
                color: '#0B1730',
                border: '1px solid #BAE6DF',
                paddingLeft: '28px',
                paddingRight: '28px',
              }}
            >
              {ctaData.cta2.label}
            </LinkButton>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '12px',
              fontSize: '13px',
              fontWeight: 700,
              color: '#0A4B3E',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#FFFFFF',
                padding: '7px 14px',
                borderRadius: '9999px',
              }}
            >
              <CheckCircle2 size={14} color="#0E6049" />
              {isEn ? 'Free & non-binding estimate' : 'Devis gratuit & sans engagement'}
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#FFFFFF',
                padding: '7px 14px',
                borderRadius: '9999px',
              }}
            >
              <CheckCircle2 size={14} color="#0E6049" />
              {isEn ? 'Personal response within 24h' : 'Réponse personnelle sous 24h'}
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#FFFFFF',
                padding: '7px 14px',
                borderRadius: '9999px',
              }}
            >
              <CheckCircle2 size={14} color="#0E6049" />
              {isEn ? 'Strict NDA & confidentiality' : 'Confidentialité garantie'}
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
