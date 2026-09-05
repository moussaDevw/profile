import { useTranslation, Trans } from 'react-i18next';
import { ShieldCheck, Cpu, Smartphone, Compass, Sparkles, Zap } from 'lucide-react';
import { Reveal, SectionLabel } from './Reveal';

export const About = () => {
  const { t } = useTranslation();

  return (
    <section className="about-section" id="about">
      <SectionLabel number="01" label={t('sections.about')} />

      <div className="bento-grid">
        {/* Card 1: Bio Hero Banner */}
        <Reveal delay={0.1} className="bento-hero-wrapper">
          <div className="bento-card bento-hero-card">
            <div className="bento-hero-header">
              <div className="bento-badge">
                <Compass size={15} className="bento-icon" />
                <span>Bio &amp; Alignment</span>
              </div>
            </div>

            <div className="bento-hero-content">
              <div className="bento-hero-bio">
                <div className="about-text">
                  <p>
                    <Trans
                      i18nKey="about.text"
                      components={[
                        <span key="0" className="drop">I</span>,
                        <em key="1" />,
                        <em key="2" />,
                        <em key="3" />,
                        <em key="4" />
                      ]}
                    />
                  </p>
                </div>
              </div>

              <div className="bento-hero-stats">
                <div className="hero-mini-stat stat-bissap">
                  <Sparkles size={18} className="stat-icon" />
                  <div className="stat-info">
                    <span className="stat-val">4+ ans</span>
                    <span className="stat-lbl">d'experience produit</span>
                  </div>
                </div>
                <div className="hero-mini-stat stat-orange">
                  <Zap size={18} className="stat-icon" />
                  <div className="stat-info">
                    <span className="stat-val">Architecte</span>
                    <span className="stat-lbl">React &amp; Next.js</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Card 2: Co-founder */}
        <Reveal delay={0.15} className="bento-card-wrapper">
          <div className="bento-card bento-sub-card">
            <div className="bento-card-header">
              <div className="bento-icon-box accent-bissap">
                <ShieldCheck size={22} />
              </div>
              <span className="bento-card-type">Entrepreneurship</span>
            </div>
            <div className="bento-card-body">
              <h4>Co-fondateur Tegg Group</h4>
              <p>Conception d'ecosystemes digitaux scalables, systemes de paiement complexes et applications haute disponibilite.</p>
            </div>
            <div className="bento-card-footer">
              <span className="bento-tag-pill">Product Leadership</span>
            </div>
          </div>
        </Reveal>

        {/* Card 3: Mobile Native */}
        <Reveal delay={0.2} className="bento-card-wrapper">
          <div className="bento-card bento-sub-card">
            <div className="bento-card-header">
              <div className="bento-icon-box accent-indigo">
                <Smartphone size={22} />
              </div>
              <span className="bento-card-type">Engineering</span>
            </div>
            <div className="bento-card-body">
              <h4>Mobile Native &amp; Web Modernism</h4>
              <p>Expertise pointue sur React Native, Expo SDK 56 (SwiftUI / Jetpack Compose) et Next.js 15 App Router.</p>
            </div>
            <div className="bento-card-footer">
              <span className="bento-tag-pill">Expo SDK 56 &amp; React 19</span>
            </div>
          </div>
        </Reveal>

        {/* Card 4: Craft */}
        <Reveal delay={0.25} className="bento-card-wrapper">
          <div className="bento-card bento-sub-card">
            <div className="bento-card-header">
              <div className="bento-icon-box accent-teranga">
                <Cpu size={22} />
              </div>
              <span className="bento-card-type">Philosophy</span>
            </div>
            <div className="bento-card-body">
              <h4>Craft &amp; Maintenabilite</h4>
              <p>Architecture propre, tests rigoureux, modularite et soucis meticuleux du detail visuel.</p>
            </div>
            <div className="bento-card-footer">
              <span className="bento-tag-pill">Clean Architecture</span>
            </div>
          </div>
        </Reveal>
      </div>
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
            Construire des interfaces qui respectent a la fois <em>l'utilisateur final</em> et <em>le developpeur suivant</em>.
          </Trans>
        </blockquote>
      </Reveal>
    </div>
  );
};