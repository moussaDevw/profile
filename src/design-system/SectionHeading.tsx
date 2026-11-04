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
        maxWidth: isCenter ? '760px' : '820px',
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
            padding: '6px 14px',
            borderRadius: '9999px',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            backgroundColor: isDark ? 'rgba(25, 184, 205, 0.12)' : '#E9F1F7',
            color: isDark ? '#19B8CD' : '#172A46',
            border: `1px solid ${isDark ? 'rgba(25, 184, 205, 0.25)' : '#DAE3ED'}`,
            marginBottom: '16px',
            fontFamily: "'Inter', sans-serif",
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
          {tag}
        </div>
      )}

      <h2
        className="mt-h2"
        style={{
          color: isDark ? '#FFFFFF' : '#0B1730',
          marginBottom: description ? '16px' : 0,
        }}
      >
        {title}
      </h2>

      {description && (
        <p
          className="mt-body"
          style={{
            color: isDark ? '#DAE3ED' : '#465670',
            maxWidth: '640px',
            marginLeft: isCenter ? 'auto' : 0,
            marginRight: isCenter ? 'auto' : 0,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
};

