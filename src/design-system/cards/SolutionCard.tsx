import React from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { useRouter } from '../../lib/router';

export interface SolutionCardProps {
  sector: string;
  icon: React.ReactNode;
  title: string;
  problem: string;
  features: string[];
  ctaHref?: string;
  className?: string;
}

export const SolutionCard: React.FC<SolutionCardProps> = ({
  sector,
  icon,
  title,
  problem,
  features,
  ctaHref = '#contact',
  className = '',
}) => {
  const { navigate, locale } = useRouter();
  const isEn = locale === 'en';

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!e.defaultPrevented && !e.metaKey && !e.ctrlKey && !e.shiftKey && ctaHref) {
      if (ctaHref.startsWith('/') || ctaHref.startsWith('#')) {
        e.preventDefault();
        navigate(ctaHref);
      }
    }
  };

  return (
    <article
      className={`mt-card mt-solution-card ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '32px',
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(11, 23, 48, 0.05)',
        padding: 'clamp(22px, 3.5vw, 34px)',
        boxShadow: '0 14px 34px -10px rgba(11, 23, 48, 0.06)',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '16px',
              backgroundColor: '#D9F2EE',
              color: '#0A4B3E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </div>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 800,
              color: '#0A4B3E',
              backgroundColor: '#D9F2EE',
              padding: '5px 14px',
              borderRadius: '9999px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            {sector}
          </span>
        </div>

        <h3 className="mt-h3" style={{ marginBottom: '12px', color: '#0B1730', fontWeight: 800 }}>
          {title}
        </h3>

        <div
          style={{
            backgroundColor: '#FAF8F5',
            padding: '14px 18px',
            borderRadius: '18px',
            marginBottom: '20px',
            fontSize: '14px',
            color: '#465670',
            lineHeight: 1.55,
          }}
        >
          <strong style={{ color: '#0B1730', display: 'block', fontSize: '12.5px', marginBottom: '4px', textTransform: 'uppercase' }}>
            {isEn ? 'Problem Solved:' : 'Problème résolu :'}
          </strong>
          {problem}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
          {features.map((feature, idx) => (
            <span
              key={idx}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '12.5px',
                fontWeight: 700,
                color: '#0B1730',
                backgroundColor: '#EEF6F8',
                padding: '6px 12px',
                borderRadius: '9999px',
              }}
            >
              <Check size={12} color="#0E6049" strokeWidth={3} />
              {feature}
            </span>
          ))}
        </div>
      </div>

      <a
        href={ctaHref}
        onClick={handleLinkClick}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          color: '#0E6049',
          fontWeight: 800,
          fontSize: '14.5px',
          textDecoration: 'none',
          padding: '8px 0',
          minHeight: '44px',
          transition: 'color 0.2s ease',
        }}
        className="mt-solution-link"
      >
        <span>{isEn ? 'Explore This Solution' : 'Consulter cette solution'}</span>
        <ArrowUpRight size={16} color="#0E6049" />
      </a>
    </article>
  );
};
