import { useTranslation, Trans } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Sparkles, Code2, Rocket, Layers } from 'lucide-react';
import { Reveal } from './Reveal';

const Hero = () => {
  const { t } = useTranslation();

  const techBadges = [
    { name: 'React 19', color: '#46507e' },
    { name: 'Next.js 15', color: '#232220' },
    { name: 'React Native / Expo 56', color: '#b8324f' },
    { name: 'TypeScript', color: '#46507e' },
    { name: 'Zustand', color: '#d97724' },
    { name: 'TanStack Query', color: '#f2784f' },
    { name: 'NestJS', color: '#b35a33' },
  ];

  return (
    <section className="hero">
      <div className="hero-top">
        <Reveal>
          <div className="hero-meta">
            <div className="meta-item">
              <span className="meta-label">{t('hero.location')}</span>
              <strong>{t('hero.city')}</strong>
            </div>
            <div className="meta-item live-badge-item">
              <span className="meta-label">{t('hero.available')}</span>
              <strong className="live">
                <span className="pulse-dot"></span>
                {t('hero.status')}
              </strong>
            </div>
            <div className="meta-item">
              <span className="meta-label">{t('hero.specialty')}</span>
              <strong>{t('hero.frontend_fullstack')}</strong>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="hero-heading-group">
            <motion.div 
              className="hero-badge"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles size={14} className="badge-icon" />
              <span>Front-End Architect & Product Builder</span>
            </motion.div>
            <h1 className="hero-title">
              <span className="line">Moussa</span>
              <span className="line line-2">
                <span className="italic">Diagne</span>
                <span className="accent-dot">.</span>
              </span>
            </h1>
          </div>
        </Reveal>
      </div>

      <div className="hero-bottom">
        <Reveal delay={0.2}>
          <div className="hero-bio-container">
            <p className="hero-bio">
              <Trans i18nKey="hero.bio">
                Développeur front-end spécialisé dans les <em>plateformes web complexes</em> — téléconsultation, EdTech, marketplaces. Je construis des interfaces <em>temps réel</em> avec React, Next.js et TypeScript, pensées pour la performance, l'UX et la maintenabilité.
              </Trans>
            </p>

            {/* Quick Action CTAs */}
            <div className="hero-actions">
              <motion.a 
                href="#work" 
                className="btn-hero-primary"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>Explorer mes projets</span>
                <ArrowDown size={16} />
              </motion.a>

              <motion.a 
                href="#contact" 
                className="btn-hero-secondary"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>Discuter d'un projet</span>
                <ArrowUpRight size={16} />
              </motion.a>
            </div>

            {/* Tech Badges */}
            <div className="hero-tech-pills">
              {techBadges.map((tech, idx) => (
                <motion.span 
                  key={tech.name}
                  className="tech-pill"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.05 }}
                  whileHover={{ scale: 1.06, y: -1 }}
                >
                  <span className="pill-dot" style={{ backgroundColor: tech.color }}></span>
                  {tech.name}
                </motion.span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="hero-stats">
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <Code2 size={20} />
              </div>
              <div className="stat-num">7<sup>+</sup></div>
              <div className="stat-label">{t('hero.years_xp')}</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <Rocket size={20} />
              </div>
              <div className="stat-num">12<sup>+</sup></div>
              <div className="stat-label">{t('hero.projects_delivered')}</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <Layers size={20} />
              </div>
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