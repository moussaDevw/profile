import React from 'react';
import { ArrowDown, MessageSquare } from 'lucide-react';
import { Container } from '../../design-system/Container';
import { LinkButton } from '../../design-system/Button';
import { getFinalCtaData } from '../../content/homeData';
import { useRouter } from '../../lib/router';

export const FinalCta: React.FC = () => {
  const { locale } = useRouter();
  const ctaData = getFinalCtaData(locale);

  return (
    <section
      className="mt-section"
      style={{
        backgroundColor: '#0B1730',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container>
        <div
          style={{
            maxWidth: '760px',
            margin: '0 auto',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '16px',
              backgroundColor: 'rgba(25, 184, 205, 0.15)',
              border: '1px solid rgba(25, 184, 205, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
            }}
          >
            <MessageSquare size={26} color="#19B8CD" />
          </div>

          <h2
            className="mt-h2"
            style={{
              color: '#FFFFFF',
              marginBottom: '16px',
              letterSpacing: '-0.015em',
            }}
          >
            {ctaData.title}
          </h2>

          <p
            className="mt-body"
            style={{
              color: '#DAE3ED',
              fontSize: '18px',
              lineHeight: 1.6,
              marginBottom: '36px',
            }}
          >
            {ctaData.description}
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              justifyContent: 'center',
            }}
          >
            <LinkButton href={ctaData.cta1.href} variant="cyan" size="lg" icon={<ArrowDown size={16} />}>
              {ctaData.cta1.label}
            </LinkButton>

            <LinkButton
              href={ctaData.cta2.href}
              variant="outline-light"
              size="lg"
            >
              {ctaData.cta2.label}
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
};
