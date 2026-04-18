import { Reveal } from './Reveal';

const Hero = () => {
  return (
    <section className="hero">
      <div>
        <Reveal>
          <div className="hero-meta">
            <div>Basé à<strong>Dakar, Sénégal 🇸🇳</strong></div>
            <div>Disponible<strong className="live">Nouveaux projets 2026</strong></div>
            <div>Spécialité<strong>Frontend · Fullstack</strong></div>
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
            Développeur front-end spécialisé dans les <em>plateformes web complexes</em> — téléconsultation, EdTech, marketplaces. Je construis des interfaces <em>temps réel</em> avec React, Next.js et TypeScript, pensées pour la performance, l'UX et la maintenabilité.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="hero-stats">
            <div>
              <div className="stat-num">7<sup>+</sup></div>
              <div className="stat-label">Années d'XP</div>
            </div>
            <div>
              <div className="stat-num">12<sup>+</sup></div>
              <div className="stat-label">Projets livrés</div>
            </div>
            <div>
              <div className="stat-num">4</div>
              <div className="stat-label">Marketplaces</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;
