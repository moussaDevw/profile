import { useTranslation, Trans } from 'react-i18next';
import { Reveal } from './Reveal';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="hero">
      <div>
        <Reveal>
          <div className="hero-meta">
            <div>{t('hero.location')}<strong>{t('hero.city')}</strong></div>
            <div>{t('hero.available')}<strong className="live">{t('hero.status')}</strong></div>
            <div>{t('hero.specialty')}<strong>{t('hero.frontend_fullstack')}</strong></div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="hero-title">
            <span className="line">Moussa</span>
            <span className="line line-2"><span className="italic">Diagne</span></span>
          </h1>
        </Reveal>
      </div>

      <div className="hero-bottom">
        <Reveal delay={0.2}>
          <p className="hero-bio">
            <Trans i18nKey="hero.bio">
              Développeur front-end spécialisé dans les <em>plateformes web complexes</em> — téléconsultation, EdTech, marketplaces. Je construis des interfaces <em>temps réel</em> avec React, Next.js et TypeScript, pensées pour la performance, l'UX et la maintenabilité.
            </Trans>
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="hero-stats">
            <div>
              <div className="stat-num">7<sup>+</sup></div>
              <div className="stat-label">{t('hero.years_xp')}</div>
            </div>
            <div>
              <div className="stat-num">12<sup>+</sup></div>
              <div className="stat-label">{t('hero.projects_delivered')}</div>
            </div>
            <div>
              <div className="stat-num">4</div>
              <div className="stat-label">{t('hero.marketplaces')}</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;
