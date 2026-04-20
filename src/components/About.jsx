import { useTranslation, Trans } from 'react-i18next';
import { Reveal, SectionLabel } from './Reveal';

export const About = () => {
  const { t } = useTranslation();
  return (
    <section className="about" id="about">
      <SectionLabel number="01" label={t('sections.about')} />
      <Reveal delay={0.1}>
        <div className="about-text">
          <p>
            <Trans i18nKey="about.text">
              <span className="drop">I</span>ntéressé par les produits <em>utiles</em>, les startups <em>ambitieuses</em> et les environnements techniques <em>exigeants</em>. Co-fondateur de <em>Tàgg Group</em>, j'interviens sur des architectures React / Next.js / TypeScript avec une gestion d'état avancée et une attention particulière portée à la performance, l'UX et la maintenabilité.
            </Trans>
          </p>
        </div>
      </Reveal>
    </section>
  );
};

export const PullQuote = () => {
  const { t } = useTranslation();
  return (
    <div className="pullquote">
      <Reveal>
        <blockquote>
          <Trans i18nKey="about.quote">
            Construire des interfaces qui respectent à la fois <em>l'utilisateur final</em> et <em>le développeur suivant</em>.
          </Trans>
        </blockquote>
      </Reveal>
    </div>
  );
};
