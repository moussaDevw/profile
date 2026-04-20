import { useTranslation, Trans } from 'react-i18next';
import { Reveal, SectionLabel } from './Reveal';

const Contact = () => {
  const { t } = useTranslation();

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

        <Reveal delay={0.1}>
          <a href="mailto:musadevweb@gmail.com" className="contact-email">musadevweb@gmail.com →</a>
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
              <a href="https://www.linkedin.com/in/moussa-diagne-b81226107/" target="_blank" rel="noopener noreferrer">{t('contact.linkedin')} ↗</a>
              <a href="https://tagg-group.com" target="_blank" rel="noopener noreferrer">{t('contact.tagg')} ↗</a>
              <a href="mailto:musadevweb@gmail.com">{t('contact.email_label')} ↗</a>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="col">
              <h4>{t('contact.phone')}</h4>
              <a href="tel:+221780105426">+221 78 010 54 26</a>
            </div>
          </Reveal>
        </div>

        <footer>
          <Reveal delay={0.5}>
            <div>{t('contact.rights')}</div>
          </Reveal>
          <Reveal delay={0.5}>
            <div>{t('contact.made_in')}</div>
          </Reveal>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
