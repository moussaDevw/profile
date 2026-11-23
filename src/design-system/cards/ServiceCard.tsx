import React, { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { LinkButton } from '../Button';
import { useRouter } from '../../lib/router';

export interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  startingPrice: string;
  deliverables: string[];
  ctaText?: string;
  ctaHref?: string;
  featured?: boolean;
  featuredLabel?: string;
  priceLabel?: string;
  className?: string;
  index?: string | number;
  locale?: 'fr' | 'en';
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  startingPrice,
  deliverables,
  ctaText,
  ctaHref,
  featured = false,
  featuredLabel,
  priceLabel,
  className = '',
  index,
  locale: propLocale,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const effectiveLocale = propLocale || router?.locale || 'fr';
  const isEn = effectiveLocale === 'en';

  const resolvedFeaturedLabel = featuredLabel || (isEn ? 'Recommended' : 'Recommandé');
  const resolvedPriceLabel = priceLabel || (isEn ? 'Indicative Pricing' : 'Tarif indicatif');
  const resolvedCtaText = ctaText || (isEn ? 'Request a Proposal' : 'Demander un devis');
  const resolvedCtaHref = ctaHref || (isEn ? '/en/quote' : '/fr/devis');

  const pastelHeaderBg = featured ? '#FCE8EC' : '#D9F2EE';
  const pastelAccent = featured ? '#831843' : '#0A4B3E';

  return (
    <article
      className={`mt-card mt-service-card ${featured ? 'mt-card-featured' : ''} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '32px',
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(11, 23, 48, 0.05)',
        padding: 'clamp(22px, 3.5vw, 36px)',
        position: 'relative',
        boxShadow: isHovered
          ? '0 24px 48px -12px rgba(11, 23, 48, 0.12)'
          : '0 14px 34px -10px rgba(11, 23, 48, 0.06)',
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '16px',
                backgroundColor: pastelHeaderBg,
                color: pastelAccent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {icon}
            </div>
            {index && (
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  color: pastelAccent,
                  backgroundColor: pastelHeaderBg,
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  letterSpacing: '0.06em',
                }}
              >
                {typeof index === 'number' ? `0${index}` : index}
              </span>
            )}
          </div>

          {featured && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 14px',
                borderRadius: '9999px',
                backgroundColor: '#FCE8EC',
                color: '#831843',
                fontSize: '11.5px',
                fontWeight: 800,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#BE123C',
                }}
              />
              {resolvedFeaturedLabel}
            </span>
          )}
        </div>

        <h3
          className="mt-h3"
          style={{
            fontSize: '23px',
            fontWeight: 800,
            marginBottom: '10px',
            color: '#0B1730',
            fontFamily: "'Manrope', sans-serif",
            letterSpacing: '-0.02em',
            lineHeight: 1.25,
          }}
        >
          {title}
        </h3>

        <p
          className="mt-body"
          style={{
            fontSize: '15px',
            color: '#465670',
            lineHeight: 1.6,
            marginBottom: '20px',
          }}
        >
          {description}
        </p>

        <div
          style={{
            padding: '16px 18px',
            margin: '0 0 22px 0',
            backgroundColor: '#FAF8F5',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <span
            style={{
              fontSize: '11px',
              color: '#64748B',
              textTransform: 'uppercase',
              fontWeight: 700,
              letterSpacing: '0.05em',
            }}
          >
            {resolvedPriceLabel}
          </span>
          <div
            style={{
              fontSize: '19px',
              fontWeight: 800,
              color: '#0E6049',
              fontFamily: "'Manrope', sans-serif",
              letterSpacing: '-0.02em',
            }}
          >
            {startingPrice}
          </div>
        </div>

        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '0 0 28px 0',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '12px 16px',
          }}
        >
          {deliverables.map((item, idx) => (
            <li
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                fontSize: '13.5px',
                color: '#0B1730',
                fontWeight: 600,
                lineHeight: 1.4,
              }}
            >
              <span
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: '#ECFDF5',
                  color: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '1px',
                }}
              >
                <Check size={12} strokeWidth={3} />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <LinkButton
        href={resolvedCtaHref}
        variant={featured ? 'primary' : 'outline'}
        fullWidth
        icon={<ArrowUpRight size={16} />}
        style={{ borderRadius: '9999px' }}
      >
        {resolvedCtaText}
      </LinkButton>
    </article>
  );
};
