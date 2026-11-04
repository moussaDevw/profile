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

  return (
    <article
      className={`mt-card mt-project-card ${className}`}
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '16px' }}>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 700,
              color: '#0B1730',
              backgroundColor: '#E9F1F7',
              padding: '4px 12px',
              borderRadius: '9999px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            {category}
          </span>
          <span style={{ fontSize: '13px', color: '#465670', fontWeight: 500, fontFamily: "'Geist Mono', monospace" }}>
            {year}
          </span>
        </div>

        <h3 className="mt-h3" style={{ marginBottom: '6px', color: '#0B1730' }}>
          {name}
        </h3>

        <div style={{ fontSize: '14px', color: '#465670', marginBottom: '16px', fontWeight: 500 }}>
          {client}
        </div>

        {impactMetric && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(25, 184, 205, 0.1)',
              color: '#0B1730',
              border: '1px solid rgba(25, 184, 205, 0.25)',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              marginBottom: '16px',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#19B8CD' }} />
            {impactMetric}
          </div>
        )}

        <p className="mt-body mt-muted" style={{ fontSize: '15px', marginBottom: '24px' }}>
          {summary}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '28px' }}>
          {stack.map((tech, idx) => (
            <span
              key={idx}
              style={{
                fontSize: '12px',
                fontFamily: "'Geist Mono', monospace",
                color: '#172A46',
                backgroundColor: '#F4F7FB',
                border: '1px solid #DAE3ED',
                padding: '3px 8px',
                borderRadius: '6px',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', paddingTop: '16px', borderTop: '1px solid #DAE3ED' }}>
        {onClickDetails ? (
          <button
            type="button"
            onClick={onClickDetails}
            style={{
              background: 'none',
              border: 'none',
              padding: '8px 0',
              minHeight: '44px',
              color: '#0B1730',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>{isEn ? 'View Case Study' : "Voir l'étude de cas"}</span>
            <ArrowUpRight size={15} color="#19B8CD" />
          </button>
        ) : liveUrl ? (
          <a
            href={liveUrl}
            onClick={(e) => handleLinkClick(e, liveUrl)}
            target={liveUrl.startsWith('http') ? '_blank' : undefined}
            rel={liveUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
            style={{
              color: '#0B1730',
              fontWeight: 600,
              fontSize: '14px',
              textDecoration: 'none',
              padding: '8px 0',
              minHeight: '44px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>{isEn ? 'Explore Project' : 'Voir le projet'}</span>
            <ArrowUpRight size={15} color="#19B8CD" />
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
              textDecoration: 'none',
            }}
            title="Code source GitHub"
          >
            <Code2 size={16} />
            <span>Code</span>
          </a>
        )}
      </div>
    </article>
  );
};

