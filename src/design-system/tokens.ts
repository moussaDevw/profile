/**
 * MusaTech Design System — Tokens
 * Direction: Corporate moderne avec touches tech premium
 */

export const colors = {
  navy: '#0B1730',
  slate: '#172A46',
  cyan: '#19B8CD',
  white: '#FFFFFF',
  surface: '#F4F7FB',
  surfaceAlt: '#E9F1F7',
  border: '#DAE3ED',
  muted: '#465670',
} as const;

export const typography = {
  fonts: {
    heading: "'Manrope', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'Geist Mono', monospace",
  },
  sizes: {
    h1Desktop: '56px',
    h1Mobile: '36px',
    h2Desktop: '40px',
    h2Mobile: '28px',
    h3Desktop: '22px',
    h3Mobile: '20px',
    bodyDesktop: '17px',
    bodyMobile: '16px',
    small: '14px',
    tiny: '12px',
  },
  lineHeights: {
    heading: 1.15,
    subheading: 1.25,
    body: 1.6,
  },
} as const;

export const metrics = {
  containerMax: '1200px',
  sectionSpacingDesktop: '96px',
  sectionSpacingMobile: '64px',
  radiusCard: '16px',
  radiusButton: '10px',
  buttonMinHeight: '48px',
} as const;

export const transitions = {
  default: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
  smooth: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
} as const;

