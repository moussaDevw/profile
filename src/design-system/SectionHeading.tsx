import React from 'react';

export interface SectionHeadingProps {
  tag?: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  align?: 'left' | 'center';
  theme?: 'light' | 'dark';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  tag,
  title,
  description,
  align = 'center',
  theme = 'light',
  className = '',
}) => {
  const isDark = theme === 'dark';
  const isCenter = align === 'center';

  return (
    <div
      className={`mt-section-heading ${className}`}
      style={{
        textAlign: isCenter ? 'center' : 'left',
        maxWidth: isCenter ? '820px' : '860px',
        marginLeft: isCenter ? 'auto' : 0,
        marginRight: isCenter ? 'auto' : 0,
        marginBottom: 'clamp(36px, 6vw, 56px)',
      }}
    >
      {tag && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '7px 16px',
            borderRadius: '9999px',
            fontSize: '12.5px',
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.14)' : '#D9F2EE',
            color: isDark ? '#A7F3D0' : '#0A4B3E',
            marginBottom: '18px',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: isDark ? '#6EE7B7' : '#0E6049',
            }}
          />
          {tag}
        </div>
      )}

      <h2
        className="mt-h2"
        style={{
          color: isDark ? '#FFFFFF' : '#0B1730',
          marginBottom: description ? '16px' : 0,
          fontWeight: 800,
          letterSpacing: '-0.025em',
          lineHeight: 1.14,
        }}
      >
        {title}
      </h2>

      {description && (
        <p
          className="mt-body"
          style={{
            color: isDark ? '#D1FAE5' : '#465670',
            maxWidth: '660px',
            marginLeft: isCenter ? 'auto' : 0,
            marginRight: isCenter ? 'auto' : 0,
            lineHeight: 1.62,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
};
