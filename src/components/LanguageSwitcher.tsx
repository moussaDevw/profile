import React from 'react';
import { useRouter } from '../lib/router';
import { Locale } from '../lib/i18nRoutes';

export const LanguageSwitcher: React.FC = () => {
  const { locale, changeLanguage } = useRouter();

  const handleSelect = (lang: Locale) => {
    if (lang !== locale) {
      changeLanguage(lang);
    }
  };

  return (
    <div
      role="group"
      aria-label="Sélection de la langue / Language selection"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px',
        backgroundColor: '#F4F7FB',
        border: '1px solid #DAE3ED',
        borderRadius: '8px',
        gap: '2px',
      }}
    >
      <button
        type="button"
        onClick={() => handleSelect('fr')}
        aria-pressed={locale === 'fr'}
        aria-label="Passer le site en français"
        style={{
          border: 'none',
          cursor: 'pointer',
          padding: '4px 10px',
          borderRadius: '6px',
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          fontWeight: 700,
          backgroundColor: locale === 'fr' ? '#0B1730' : 'transparent',
          color: locale === 'fr' ? '#FFFFFF' : '#465670',
          transition: 'all 0.15s ease',
          outline: 'none',
        }}
      >
        FR
      </button>

      <span
        aria-hidden="true"
        style={{
          width: '1px',
          height: '14px',
          backgroundColor: '#DAE3ED',
        }}
      />

      <button
        type="button"
        onClick={() => handleSelect('en')}
        aria-pressed={locale === 'en'}
        aria-label="Switch website to English"
        style={{
          border: 'none',
          cursor: 'pointer',
          padding: '4px 10px',
          borderRadius: '6px',
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          fontWeight: 700,
          backgroundColor: locale === 'en' ? '#0B1730' : 'transparent',
          color: locale === 'en' ? '#FFFFFF' : '#465670',
          transition: 'all 0.15s ease',
          outline: 'none',
        }}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;

