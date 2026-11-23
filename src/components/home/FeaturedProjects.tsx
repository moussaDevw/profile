import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { ShieldCheck, ArrowUpRight, Check } from 'lucide-react';
import { Container } from '../../design-system/Container';
import { LinkButton } from '../../design-system/Button';
import { getFeaturedProjects } from '../../content/homeData';
import { useRouter } from '../../lib/router';
import { getLocalizedHref } from '../../lib/i18nRoutes';

const ProjectScrollWord: React.FC<{
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}> = ({ word, progress, range }) => {
  const opacity = useTransform(progress, range, [0.22, 1]);
  const y = useTransform(progress, range, [5, 0]);

  return (
    <motion.span
      style={{
        opacity,
        y,
        display: 'inline-block',
        marginRight: '0.28em',
      }}
    >
      {word}
    </motion.span>
  );
};

export const FeaturedProjects: React.FC = () => {
  const { locale } = useRouter();
  const projects = getFeaturedProjects(locale);
  const isEn = locale === 'en';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const headingRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ['start 0.88', 'end 0.45'],
  });

  const titleText = isEn
    ? 'Proven systems, high-utility engineering.'
    : 'Des projets concrets, des solutions utiles.';
  const titleWords = titleText.split(' ');

  const categories = [
    { id: 'all', label: isEn ? 'All Case Studies' : 'Toutes les réalisations' },
    { id: 'web', label: isEn ? 'InsurTech & Web' : 'InsurTech & Web' },
    { id: 'mobile', label: isEn ? 'HealthTech & Mobile' : 'HealthTech & Mobile' },
    { id: 'cloud', label: isEn ? 'EdTech & Cloud' : 'EdTech & Cloud' },
  ];

  const filteredProjects = projects.filter((proj) => {
    if (selectedCategory === 'all') return true;
    const cat = proj.category.toLowerCase();
    if (selectedCategory === 'web') return cat.includes('web') || cat.includes('insurtech');
    if (selectedCategory === 'mobile') return cat.includes('mobile') || cat.includes('health');
    if (selectedCategory === 'cloud') return cat.includes('cloud') || cat.includes('edtech');
    return true;
  });

  const palettes = [
    { bg: '#D9F2EE', tagBg: '#BAE6DF', tagColor: '#0A4B3E', accent: '#0E6049' },
    { bg: '#FCE8EC', tagBg: '#F9CED8', tagColor: '#831843', accent: '#BE123C' },
    { bg: '#FBF0E4', tagBg: '#F6DCC0', tagColor: '#7C2D12', accent: '#B45309' },
    { bg: '#EEF2FF', tagBg: '#D8E1FF', tagColor: '#1E3A8A', accent: '#4338CA' },
  ];

  return (
    <section
      id="realisations"
      className="mt-section"
      style={{
        width: '100%',
        backgroundColor: '#FFFFFF',
        paddingTop: 'clamp(56px, 7vw, 88px)',
        paddingBottom: '0',
        borderBottom: '1px solid #EAE6DF',
      }}
    >
      {/* En-tête centré avec illumination au scroll + Filtres */}
      <div
        ref={headingRef}
        style={{
          textAlign: 'center',
          maxWidth: '880px',
          margin: '0 auto clamp(36px, 5vw, 56px)',
          padding: '0 24px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#E8EEFF',
            color: '#1E3A8A',
            padding: '8px 18px',
            borderRadius: '9999px',
            fontSize: '13px',
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}
        >
          <ShieldCheck size={15} color="#4338CA" />
          <span>{isEn ? 'Selected Case Studies' : 'Réalisations Sélectionnées'}</span>
        </motion.div>

        <h2
          aria-label={titleText}
          style={{
            fontSize: 'clamp(30px, 4.6vw, 52px)',
            fontWeight: 800,
            color: '#0B1730',
            letterSpacing: '-0.03em',
            lineHeight: 1.12,
            marginBottom: '18px',
            fontFamily: "'Manrope', sans-serif",
          }}
        >
          <span style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
            {titleText}
          </span>
          <span aria-hidden="true">
            {titleWords.map((word, idx) => {
              const start = idx / titleWords.length;
              const end = Math.min(1, start + 1.4 / titleWords.length);
              return (
                <ProjectScrollWord
                  key={`${word}-${idx}`}
                  word={word}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </span>
        </h2>

        <p
          style={{
            fontSize: 'clamp(16px, 1.8vw, 19px)',
            color: '#465670',
            lineHeight: 1.6,
            maxWidth: '680px',
            margin: '0 auto 28px',
            fontWeight: 500,
          }}
        >
          {isEn
            ? 'A curated selection of real-world production platforms built with strict requirements for resilience, performance, and user adoption.'
            : "Aperçu de réalisations réelles conçues avec des exigences strictes de robustesse, de performance et d'expérience utilisateur."}
        </p>

        {/* Filtres Pilules */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '9999px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: isActive ? '1px solid #0B1730' : '1px solid #E2DDD5',
                  backgroundColor: isActive ? '#0B1730' : '#FAF8F5',
                  color: isActive ? '#FFFFFF' : '#0B1730',
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bandes Études de Cas 100% Pleine Largeur (Bord à Bord) */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        {filteredProjects.map((project, idx) => {
          const palette = palettes[idx % palettes.length];
          const projectSlug = project.id === 'edaktarii' ? 'edaktari' : project.id;
          const liveUrl = isEn
            ? `/en/case-studies/${projectSlug}`
            : `/fr/realisations/${projectSlug}`;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.16 }}
              transition={{ type: 'spring', stiffness: 80, damping: 18 }}
              style={{
                width: '100%',
                backgroundColor: palette.bg,
                borderRadius: '0',
                padding: 'clamp(48px, 6vw, 84px) 0',
              }}
            >
              <Container>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                    gap: 'clamp(28px, 4vw, 48px)',
                    alignItems: 'center',
                  }}
                >
                  {/* Colonne Gauche : Nom du Projet, Catégorie & Résumé */}
                  <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          backgroundColor: palette.tagBg,
                          color: palette.tagColor,
                          fontWeight: 800,
                          fontSize: '11.5px',
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          padding: '6px 14px',
                          borderRadius: '10px',
                        }}
                      >
                        {project.category}
                      </span>
                      <span
                        style={{
                          fontSize: '12.5px',
                          fontWeight: 700,
                          color: '#475569',
                          backgroundColor: 'rgba(255,255,255,0.75)',
                          padding: '5px 12px',
                          borderRadius: '9999px',
                        }}
                      >
                        {project.client} · {project.year}
                      </span>
                    </div>

                    <h3
                      className="mt-h3"
                      style={{
                        fontSize: 'clamp(28px, 3.4vw, 40px)',
                        fontWeight: 800,
                        color: '#0B1730',
                        lineHeight: 1.12,
                        letterSpacing: '-0.025em',
                        marginBottom: '16px',
                      }}
                    >
                      {project.name}
                    </h3>

                    <p
                      style={{
                        fontSize: '16px',
                        color: '#1E293B',
                        lineHeight: 1.62,
                        marginBottom: '26px',
                      }}
                    >
                      {project.summary}
                    </p>

                    <LinkButton
                      href={liveUrl}
                      variant="primary"
                      size="lg"
                      icon={<ArrowUpRight size={16} />}
                      style={{
                        borderRadius: '9999px',
                        backgroundColor: '#0B1730',
                        color: '#FFFFFF',
                        paddingLeft: '26px',
                        paddingRight: '26px',
                      }}
                    >
                      {isEn ? 'Read Technical Case Study' : 'Découvrir l’étude de cas'}
                    </LinkButton>
                  </div>

                  {/* Colonne Droite : Carte Flottante Impact & Stack Technique */}
                  <motion.div
                    whileHover={{ y: -5, scale: 1.01 }}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '32px',
                      padding: 'clamp(24px, 3.5vw, 34px)',
                      boxShadow: '0 22px 48px -12px rgba(11, 23, 48, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '18px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        backgroundColor: '#ECFDF5',
                        padding: '14px 18px',
                        borderRadius: '20px',
                      }}
                    >
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: '#10B981',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Check size={18} strokeWidth={3} />
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: 800, color: '#047857', textTransform: 'uppercase' }}>
                          {isEn ? 'Verified Production Impact' : 'Impact & Résultat mesuré'}
                        </div>
                        <div style={{ fontSize: '15px', fontWeight: 800, color: '#0B1730' }}>
                          {project.impactMetric}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: '11.5px',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: '#64748B',
                          marginBottom: '10px',
                        }}
                      >
                        {isEn ? 'Production Stack' : 'Technologies déployées'}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            style={{
                              fontSize: '12.5px',
                              fontWeight: 700,
                              color: '#0B1730',
                              backgroundColor: '#FAF8F5',
                              border: '1px solid #E5E0D8',
                              padding: '6px 14px',
                              borderRadius: '9999px',
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </Container>
            </motion.div>
          );
        })}
      </div>

      {/* Pied de section Pleine Largeur */}
      <div
        style={{
          width: '100%',
          backgroundColor: '#FAF8F5',
          padding: '36px 24px',
          textAlign: 'center',
        }}
      >
        <LinkButton
          href={getLocalizedHref('projects', locale)}
          variant="outline"
          size="lg"
          icon={<ArrowUpRight size={16} />}
          style={{ borderRadius: '9999px', backgroundColor: '#FFFFFF', paddingLeft: '30px', paddingRight: '30px' }}
        >
          {isEn ? 'Explore All Technical Case Studies' : 'Voir toutes les études de cas techniques'}
        </LinkButton>
      </div>
    </section>
  );
};
