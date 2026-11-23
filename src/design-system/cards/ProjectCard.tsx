import React from 'react';
import { ArrowUpRight, Code2 } from 'lucide-react';
import { useRouter } from '../../lib/router';

export interface ProjectCardProps {
  name: string;
  client: string;
  category: string;
  year: string;
  impactMetric?: string;
  summary: string;
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  onClickDetails?: () => void;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  client,
  category,
  year,
  impactMetric,
  summary,
  stack,
  githubUrl,
  liveUrl,
  onClickDetails,
  className = '',
}) => {
  const { navigate, locale } = useRouter();
  const isEn = locale === 'en';

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!e.defaultPrevented && !e.metaKey && !e.ctrlKey && !e.shiftKey && href) {
      if (href.startsWith('/') || href.startsWith('#')) {
        e.preventDefault();
        navigate(href);
      }
    }
  };

  // Alan-style Soft Pastel Header Palette per case study
  const getPastelBanner = (projectName: string) => {
    const lower = projectName.toLowerCase();
    if (lower.includes('assure')) {
      return { bg: '#EEF6F8', badgeColor: '#0D7B8A' };
    }
    if (lower.includes('daktari')) {
      return { bg: '#ECFDF5', badgeColor: '#047857' };
    }
    return { bg: '#FEF3C7', badgeColor: '#B45309' };
  };

  const pastel = getPastelBanner(name);

  return (
    <article
      className={`mt-card mt-project-card ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '28px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #EAE6DF',
        overflow: 'hidden',
        boxShadow: '0 10px 30px -6px rgba(11, 23, 48, 0.05)',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div>
        {/* Alan-style Pastel Top Impact Banner */}
        <div
          style={{
            backgroundColor: pastel.bg,
            padding: '22px 24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px',
              marginBottom: '12px',
            }}
          >
            <span
              style={{
                fontSize: '11.5px',
                fontWeight: 700,
                color: pastel.badgeColor,
                backgroundColor: '#FFFFFF',
                padding: '4px 12px',
                borderRadius: '9999px',
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
              }}
            >
              {category}
            </span>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#465670',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                padding: '3px 10px',
                borderRadius: '9999px',
                fontFamily: "'Geist Mono', monospace",
              }}
            >
              {year}
            </span>
          </div>

          {impactMetric && (
            <div
              style={{
                fontSize: '15px',
                fontWeight: 800,
                color: '#0B1730',
                fontFamily: "'Manrope', sans-serif",
                lineHeight: 1.35,
              }}
            >
              {impactMetric}
            </div>
          )}
        </div>

        {/* Body Content */}
        <div style={{ padding: '24px 24px 0 24px' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748B', marginBottom: '4px' }}>
            {client}
          </div>

          <h3 className="mt-h3" style={{ marginBottom: '12px', color: '#0B1730', fontSize: '22px', fontWeight: 800 }}>
            {name}
          </h3>

          <p className="mt-body mt-muted" style={{ fontSize: '14.5px', lineHeight: 1.6, marginBottom: '20px' }}>
            {summary}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
            {stack.map((tech, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '12px',
                  fontFamily: "'Geist Mono', monospace",
                  color: '#172A46',
                  backgroundColor: '#F7F5F0',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  fontWeight: 500,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          padding: '16px 24px',
          borderTop: '1px solid #F1EFEA',
        }}
      >
        {onClickDetails ? (
          <button
            type="button"
            onClick={onClickDetails}
            style={{
              background: 'none',
              border: 'none',
              padding: '6px 0',
              minHeight: '44px',
              color: '#0B1730',
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>{isEn ? 'View Case Study' : "Voir l'étude de cas"}</span>
            <ArrowUpRight size={16} color="#19B8CD" />
          </button>
        ) : liveUrl ? (
          <a
            href={liveUrl}
            onClick={(e) => handleLinkClick(e, liveUrl)}
            target={liveUrl.startsWith('http') ? '_blank' : undefined}
            rel={liveUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
            style={{
              color: '#0B1730',
              fontWeight: 700,
              fontSize: '14px',
              textDecoration: 'none',
              padding: '6px 0',
              minHeight: '44px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>{isEn ? 'Explore Project' : 'Voir le projet'}</span>
            <ArrowUpRight size={16} color="#19B8CD" />
          </a>
        ) : (
          <span style={{ fontSize: '13px', color: '#465670', minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}>
            {isEn ? 'Confidential Case Study' : 'Étude de cas confidentielle'}
          </span>
        )}

        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#465670',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
              backgroundColor: '#F7F5F0',
              padding: '5px 12px',
              borderRadius: '9999px',
            }}
            title="Code source GitHub"
          >
            <Code2 size={14} />
            <span>Code</span>
          </a>
        )}
      </div>
    </article>
  );
};





