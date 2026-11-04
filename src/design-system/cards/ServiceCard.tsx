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
  ctaHref = '#devis',
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

  return (
    <article
      className={`mt-card mt-service-card ${featured ? 'mt-card-featured' : ''} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '16px',
        backgroundColor: '#FFFFFF',
        border: featured
          ? '1.5px solid #19B8CD'
          : isHovered
            ? '1.5px solid #CBD5E1'
            : '1px solid #E2E8F0',
        padding: 'clamp(18px, 3.5vw, 36px) clamp(12px, 2.5vw, 32px)',
        position: 'relative',
        boxShadow: featured
          ? isHovered
            ? '0 20px 40px -4px rgba(25, 184, 205, 0.18), 0 6px 16px rgba(11, 23, 48, 0.04)'
            : '0 12px 30px -4px rgba(25, 184, 205, 0.12), 0 4px 12px rgba(11, 23, 48, 0.03)'
          : isHovered
            ? '0 18px 38px -4px rgba(11, 23, 48, 0.08), 0 4px 12px rgba(11, 23, 48, 0.02)'
            : '0 2px 14px -2px rgba(11, 23, 48, 0.03)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div>
        {/* Top Header : Icône + Index discret + Badge intégré bilingue */}
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
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: featured ? '#E6F8FA' : '#F4F7FB',
                color: featured ? '#0D7B8A' : '#172A46',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: featured
                  ? '1px solid rgba(25, 184, 205, 0.35)'
                  : '1px solid #E2E8F0',
                transition: 'all 0.2s ease',
              }}
            >
              {icon}
            </div>
            {index && (
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#94A3B8',
                  fontFamily: "'Inter', monospace",
                  letterSpacing: '0.08em',
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
                padding: '4px 12px',
                borderRadius: '9999px',
                backgroundColor: '#E6F8FA',
                color: '#0D7B8A',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                border: '1px solid rgba(25, 184, 205, 0.3)',
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
              {resolvedFeaturedLabel}
            </span>
          )}
        </div>

        {/* Titre & Description */}
        <h3
          className="mt-h3"
          style={{
            fontSize: '21px',
            fontWeight: 700,
            marginBottom: '10px',
            color: '#0B1730',
            fontFamily: "'Manrope', sans-serif",
            letterSpacing: '-0.02em',
            lineHeight: 1.3,
          }}
        >
          {title}
        </h3>

        <p
          className="mt-body"
          style={{
            fontSize: '14.5px',
            color: '#4A5568',
            lineHeight: 1.6,
            marginBottom: '20px',
          }}
        >
          {description}
        </p>

        {/* Ligne Tarif Indicatif épurée et bilingue */}
        <div
          style={{
            padding: '16px 0',
            margin: '0 0 22px 0',
            borderTop: '1px solid #EDF2F7',
            borderBottom: '1px solid #EDF2F7',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <span
            style={{
              fontSize: '11px',
              color: '#718096',
              textTransform: 'uppercase',
              fontWeight: 600,
              letterSpacing: '0.05em',
            }}
          >
            {resolvedPriceLabel}
          </span>
          <div
            style={{
              fontSize: '19px',
              fontWeight: 700,
              color: '#0B1730',
              fontFamily: "'Manrope', sans-serif",
              letterSpacing: '-0.02em',
            }}
          >
            {startingPrice}
          </div>
        </div>

        {/* Livrables essentiels : grille 2 colonnes fluide et aérée sur desktop */}
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
                color: '#2D3748',
                lineHeight: 1.4,
              }}
            >
              <span
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: '#E6F8FA',
                  color: '#0D7B8A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '1px',
                }}
              >
                <Check size={11} strokeWidth={2.75} />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bouton d'action */}
      <LinkButton
        href={ctaHref}
        variant={featured ? 'cyan' : 'outline'}
        fullWidth
        icon={<ArrowUpRight size={16} />}
      >
        {resolvedCtaText}
      </LinkButton>
    </article>
  );
};
