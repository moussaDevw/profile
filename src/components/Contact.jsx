import { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { motion } from 'framer-motion';
import { Copy, Check, ArrowUpRight, Mail, Phone, Globe, Sparkles } from 'lucide-react';
import { Reveal, SectionLabel } from './Reveal';

const Contact = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const email = 'musadevweb@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-inner">
        <SectionLabel number="05" label={t('sections.contact')} />

        <Reveal>
          <h2 className="contact-title">
            <Trans 
              i18nKey="contact.title"
              components={[<em key="0" />, <br key="1" />]}
            >
              Un projet <em>en tête</em>?<br />
              Parlons-en.
            </Trans>
          </h2>
        </Reveal>

        {/* Copyable Email Bar */}
        <Reveal delay={0.1}>
          <div className="contact-email-wrapper">
            <a href={`mailto:${email}`} className="contact-email">
              {email} <ArrowUpRight size={22} className="email-arrow" />
            </a>

            <motion.button 
              className={`copy-email-btn ${copied ? 'is-copied' : ''}`}
              onClick={copyEmail}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              title="Copier l'adresse email"
            >
              {copied ? (
                <>
                  <Check size={16} />
                  <span>Email copié !</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>Copier</span>
                </>
              )}
            </motion.button>
          </div>
        </Reveal>

        <div className="contact-grid">
          <Reveal delay={0.2}>
            <div className="col">
              <h4>{t('contact.availability_title')}</h4>
              <p>{t('contact.availability_text')}</p>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="col">
              <h4>{t('contact.networks')}</h4>
              <a href="https://www.linkedin.com/in/moussa-diagne-b81226107/" target="_blank" rel="noopener noreferrer">
                <span>{t('contact.linkedin')}</span>
                <ArrowUpRight size={14} />
              </a>
              <a href="https://tagg-group.com" target="_blank" rel="noopener noreferrer">
                <span>{t('contact.tagg')}</span>
                <ArrowUpRight size={14} />
              </a>
              <a href={`mailto:${email}`}>
                <span>{t('contact.email_label')}</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="col">
              <h4>{t('contact.phone')}</h4>
              <a href="tel:+221780105426" className="phone-link">
                <Phone size={16} />
                <span>+221 78 010 54 26</span>
              </a>
            </div>
          </Reveal>
        </div>

        <footer>
          <Reveal delay={0.5}>
            <div>{t('contact.rights')}</div>
          </Reveal>
          <Reveal delay={0.5}>
            <div className="footer-teranga">
              <span>{t('contact.made_in')}</span>
              <span className="teranga-badge">Teranga Modernism</span>
            </div>
          </Reveal>
        </footer>
      </div>
    </section>
  );
};

export default Contact;