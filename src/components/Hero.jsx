import { useTranslation, Trans } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Sparkles, Code2, Rocket, Layers } from 'lucide-react';
import { Reveal } from './Reveal';

const Hero = () => {
  const { t } = useTranslation();

  const techBadges = [
    { name: 'NestJS (Backend)', color: '#ea2845', isNest: true },
    { name: 'Node.js', color: '#68a063' },
    { name: 'PostgreSQL', color: '#336791' },
    { name: 'React 19 & Next.js 15', color: '#232220' },
    { name: 'React Native', color: '#b8324f' },
    { name: 'TypeScript', color: '#3178c6' },
    { name: 'Docker / Redis', color: '#d97724' },
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
              <span>{t('hero.badge')}</span>
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
              <Trans
                i18nKey="hero.bio"
                components={[<em key="0" />, <em key="1" />]}
              />
            </p>

            {/* Quick Action CTAs */}
            <div className="hero-actions">
              <motion.a 
                href="#work" 
                className="btn-hero-primary"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>{t('hero.explore_projects')}</span>
                <ArrowDown size={16} />
              </motion.a>

              <motion.a 
                href="#contact" 
                className="btn-hero-secondary"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>{t('hero.discuss_project')}</span>
                <ArrowUpRight size={16} />
              </motion.a>
            </div>

            {/* Tech Badges */}
            <div className="hero-tech-pills">
              {techBadges.map((tech, idx) => (
                <motion.span 
                  key={tech.name}
                  className={`tech-pill ${tech.isNest ? 'highlight-nest' : ''}`}
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