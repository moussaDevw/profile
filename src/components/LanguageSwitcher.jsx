import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  return (
    <motion.button 
      className="lang-switcher"
      onClick={toggleLanguage}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className={i18n.language === 'fr' ? 'active' : ''}>FR</span>
      <span className="separator">/</span>
      <span className={i18n.language === 'en' ? 'active' : ''}>EN</span>
    </motion.button>
  );
};

export default LanguageSwitcher;
