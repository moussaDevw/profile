import React from 'react';
import { ArrowUpRight } from 'lucide-react';
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
        borderRadius: '16px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #DAE3ED',
        padding: 'clamp(18px, 3.5vw, 32px) clamp(12px, 2.5vw, 30px)',
        boxShadow: '0 4px 16px -2px rgba(11, 23, 48, 0.04)',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: '#E9F1F7',
              color: '#172A46',
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
              fontWeight: 700,
              color: '#172A46',
              backgroundColor: '#F4F7FB',
              border: '1px solid #DAE3ED',
              padding: '4px 12px',
              borderRadius: '9999px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            {sector}
          </span>
        </div>

        <h3 className="mt-h3" style={{ marginBottom: '12px', color: '#0B1730' }}>
          {title}
        </h3>

        <div
          style={{
            backgroundColor: '#F4F7FB',
            borderLeft: '3px solid #19B8CD',
            padding: '12px 14px',
            borderRadius: '0 8px 8px 0',
            marginBottom: '20px',
            fontSize: '14px',
            color: '#465670',
            lineHeight: 1.5,
          }}
        >
          <strong style={{ color: '#0B1730', display: 'block', fontSize: '13px', marginBottom: '2px' }}>
            {isEn ? 'Problem Solved:' : 'Problème résolu :'}
          </strong>
          {problem}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
          {features.map((feature, idx) => (
            <span
              key={idx}
              style={{
                fontSize: '12px',
                fontWeight: 500,
                color: '#172A46',
                backgroundColor: '#E9F1F7',
                padding: '4px 10px',
                borderRadius: '6px',
              }}
            >
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
          color: '#172A46',
          fontWeight: 600,
          fontSize: '14px',
          textDecoration: 'none',
          padding: '8px 0',
          minHeight: '44px',
          transition: 'color 0.2s ease',
        }}
        className="mt-solution-link"
      >
        <span>{isEn ? 'Explore This Solution' : 'Consulter cette solution'}</span>
        <ArrowUpRight size={16} color="#19B8CD" />
      </a>
    </article>
  );
};

