import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import {
  ArrowDown,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Check,
  TrendingUp,
  Smartphone,
  CreditCard,
  Layers,
  Activity,
  Lock,
  Search,
  Bell,
  Home,
  BarChart3,
  FolderKanban,
  UserCheck,
} from 'lucide-react';
import { Container } from '../../design-system/Container';
import { LinkButton } from '../../design-system/Button';
import { getHeroData } from '../../content/homeData';
import { useRouter } from '../../lib/router';

/**
 * Mot illuminé progressivement au scroll (effet signature Alan.com visible à 00:01 et 00:04 de la vidéo)
 */
const ScrollWord: React.FC<{
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}> = ({ word, progress, range }) => {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const y = useTransform(progress, range, [6, 0]);

  return (
    <motion.span
      style={{
        opacity,
        y,
        display: 'inline-block',
        marginRight: '0.28em',
        transition: 'color 0.15s ease',
      }}
    >
      {word}
    </motion.span>
  );
};

/**
 * Bandeau pleine largeur avec titre centré dont les mots s'illuminent en vague au scroll
 * (Exactement comme à 00:01 "Merci de ne plus patienter." et 00:04 "La santé n'attend pas. Vous non plus !")
 */
const ScrollIlluminatedBanner: React.FC<{
  badge?: string;
  title: string;
  subtitle: string;
}> = ({ badge, title, subtitle }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.88', 'end 0.42'],
  });

  const words = title.split(' ');

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        backgroundColor: '#FFFFFF',
        textAlign: 'center',
        padding: 'clamp(56px, 8vw, 104px) 24px',
      }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.45 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#E8EEFF',
              color: '#1E3A8A',
              padding: '8px 18px',
              borderRadius: '9999px',
              fontSize: '13.5px',
              fontWeight: 700,
              marginBottom: '22px',
            }}
          >
            <CheckCircle2 size={14} color="#3B82F6" />
            <span>{badge}</span>
          </motion.div>
        )}

        <h2
          style={{
            fontSize: 'clamp(32px, 4.8vw, 56px)',
            fontWeight: 800,
            color: '#0B1730',
            letterSpacing: '-0.03em',
            lineHeight: 1.12,
            marginBottom: '18px',
            fontFamily: "'Manrope', sans-serif",
          }}
        >
          {words.map((word, idx) => {
            const start = idx / words.length;
            const end = Math.min(1, start + 1.4 / words.length);
            return <ScrollWord key={`${word}-${idx}`} word={word} progress={scrollYProgress} range={[start, end]} />;
          })}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontSize: 'clamp(16.5px, 1.9vw, 20px)',
            color: '#465670',
            fontWeight: 600,
            lineHeight: 1.6,
            maxWidth: '640px',
            margin: '0 auto',
          }}
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
};

export const HomeHero: React.FC = () => {
  const { locale } = useRouter();
  const heroData = getHeroData(locale);
  const isEn = locale === 'en';

  const containerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 20,
    restDelta: 0.001,
  });

  const floatUp1 = useTransform(smoothScroll, [0, 0.35], [0, -26]);
  const floatDown1 = useTransform(smoothScroll, [0, 0.35], [0, 22]);
  const floatUp2 = useTransform(smoothScroll, [0.2, 0.65], [20, -24]);
  const floatUp3 = useTransform(smoothScroll, [0.45, 0.9], [24, -22]);

  return (
    <section
      ref={containerRef}
      className="mt-hero-section"
      style={{
        width: '100%',
        backgroundColor: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 1. OUVERTURE PLEINE LARGEUR AÉRÉE & ÉPURÉE */}
      <div
        style={{
          width: '100%',
          backgroundColor: '#FAF8F5',
          paddingTop: 'clamp(44px, 6vw, 76px)',
          paddingBottom: 'clamp(40px, 5vw, 64px)',
        }}
      >
        <Container>
          <div
            style={{
              textAlign: 'center',
              maxWidth: '880px',
              margin: '0 auto',
            }}
          >
            {/* Badge Pilule Alan */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 18px',
                borderRadius: '9999px',
                fontSize: '12.5px',
                fontWeight: 700,
                letterSpacing: '0.03em',
                textTransform: 'uppercase',
                backgroundColor: '#FFFFFF',
                color: '#0B1730',
                boxShadow: '0 4px 16px rgba(11, 23, 48, 0.05)',
                marginBottom: '24px',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#00A896',
                }}
              />
              <span>{heroData.surtitle}</span>
            </motion.div>

            {/* H1 Unique */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.06 }}
              className="mt-h1"
              style={{
                color: '#0B1730',
                letterSpacing: '-0.035em',
                lineHeight: 1.08,
                fontSize: 'clamp(36px, 5.2vw, 60px)',
                fontWeight: 800,
                marginBottom: '22px',
              }}
            >
              {heroData.title}
            </motion.h1>

            {/* Description aérée */}
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="mt-body"
              style={{
                color: '#3B4A5E',
                fontSize: 'clamp(17px, 2vw, 20px)',
                lineHeight: 1.62,
                maxWidth: '680px',
                margin: '0 auto 30px',
              }}
            >
              {heroData.description}
            </motion.p>

            {/* Boutons Pilules */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="mt-hero-cta-group"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '14px',
                marginBottom: '26px',
              }}
            >
              <LinkButton
                href={heroData.cta1.href}
                variant="cyan"
                size="lg"
                icon={<ArrowDown size={16} />}
                style={{ borderRadius: '9999px', paddingLeft: '30px', paddingRight: '30px' }}
              >
                {heroData.cta1.label}
              </LinkButton>

              <LinkButton
                href={heroData.cta2.href}
                variant="outline"
                size="lg"
                icon={<ArrowUpRight size={16} />}
                style={{
                  borderRadius: '9999px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #DCE3EB',
                  paddingLeft: '28px',
                  paddingRight: '28px',
                }}
              >
                {heroData.cta2.label}
              </LinkButton>
            </motion.div>

            {/* 3 Pilules de réassurance discrètes */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '10px',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#0B1730',
                  backgroundColor: '#FFFFFF',
                  padding: '7px 14px',
                  borderRadius: '9999px',
                  boxShadow: '0 2px 6px rgba(11, 23, 48, 0.03)',
                }}
              >
                <CheckCircle2 size={14} color="#00A896" />
                {heroData.complementaryText}
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#0B1730',
                  backgroundColor: '#FFFFFF',
                  padding: '7px 14px',
                  borderRadius: '9999px',
                  boxShadow: '0 2px 6px rgba(11, 23, 48, 0.03)',
                }}
              >
                <ShieldCheck size={14} color="#00A896" />
                {isEn ? '100% Codebase Ownership' : 'Code source 100% garanti'}
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#0B1730',
                  backgroundColor: '#FFFFFF',
                  padding: '7px 14px',
                  borderRadius: '9999px',
                  boxShadow: '0 2px 6px rgba(11, 23, 48, 0.03)',
                }}
              >
                <Zap size={14} color="#00A896" />
                {isEn ? 'Clear Proposal in 24-48h' : 'Devis transparent sous 24h'}
              </span>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* 2. SCÈNES PASTEL 100% FULL-WIDTH (PRENNENT TOUTE LA LARGEUR DE L'ÉCRAN COMME SUR LA VIDÉO ALAN.COM) */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* =========================================================================
            SCÈNE 1 (00:00 de la vidéo) — 100% WIDTH VERT MENTHE PASTEL + IPHONE CENTRAL
           ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ type: 'spring', stiffness: 80, damping: 18 }}
          style={{
            width: '100%',
            backgroundColor: '#D9F2EE',
            borderRadius: '0',
            padding: 'clamp(56px, 7vw, 96px) 0',
            position: 'relative',
            overflow: 'hidden',
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
              {/* Colonne Gauche : Texte Éditorial Aéré */}
              <div style={{ maxWidth: '380px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#BAE6DF',
                    color: '#0A4B3E',
                    fontWeight: 800,
                    fontSize: '11.5px',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '6px 14px',
                    borderRadius: '10px',
                    marginBottom: '18px',
                  }}
                >
                  {isEn ? 'MUSATECH PERFORMANCE' : 'MUSATECH PRÉCISION'}
                </span>

                <h2
                  style={{
                    fontSize: 'clamp(28px, 3.4vw, 40px)',
                    fontWeight: 800,
                    color: '#0B1730',
                    lineHeight: 1.12,
                    letterSpacing: '-0.025em',
                    marginBottom: '18px',
                  }}
                >
                  {isEn
                    ? 'High-performing platforms built to convert.'
                    : 'Une vitrine digitale rapide, qui inspire confiance.'}
                </h2>

                <p style={{ fontSize: '16px', color: '#1E3A36', lineHeight: 1.62, marginBottom: '14px' }}>
                  {isEn
                    ? 'Your website or client portal loads in milliseconds, ranks on Google, and works seamlessly on every screen.'
                    : 'Sites web professionnels, portails clients et plateformes conçus pour charger instantanément et convertir vos visiteurs.'}
                </p>

                <p style={{ fontSize: '15px', color: '#2C524C', lineHeight: 1.58 }}>
                  {isEn
                    ? 'Monitored in real time with 99.9% uptime and clean production architecture.'
                    : 'Suivez vos performances, votre référencement SEO et vos demandes de devis en temps réel.'}
                </p>
              </div>

              {/* Colonne Centrale : Mockup iPhone (Exactement comme à 00:00 de la vidéo Alan) */}
              <motion.div
                style={{
                  y: floatUp1,
                  margin: '0 auto',
                  width: '100%',
                  maxWidth: '340px',
                  backgroundColor: '#0E5A4A',
                  borderRadius: '46px',
                  padding: '11px',
                  boxShadow: '0 28px 60px -12px rgba(11, 56, 46, 0.32)',
                  border: '3px solid #177864',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#F5FAF9',
                    borderRadius: '36px',
                    overflow: 'hidden',
                  }}
                >
                  {/* Header Vert Foncé du Téléphone avec Dynamic Island */}
                  <div
                    style={{
                      backgroundColor: '#0E6049',
                      color: '#FFFFFF',
                      padding: '12px 18px 16px',
                      textAlign: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: '86px',
                        height: '22px',
                        backgroundColor: '#041F18',
                        borderRadius: '9999px',
                        margin: '0 auto 12px',
                      }}
                    />
                    <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '10px' }}>
                      {isEn ? 'MusaTech Pulse' : 'MusaTech Prévention & Perf'}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '16px',
                        fontSize: '11.5px',
                        color: '#A7F3D0',
                        fontWeight: 600,
                      }}
                    >
                      <span style={{ color: '#FFFFFF', borderBottom: '2px solid #FFFFFF', paddingBottom: '3px' }}>
                        {isEn ? 'Overview' : 'Accueil'}
                      </span>
                      <span>{isEn ? 'Metrics' : 'Rapport'}</span>
                      <span>{isEn ? 'Roadmap' : 'Plan'}</span>
                    </div>
                  </div>

                  {/* Contenu Écran iPhone : Cartes Score 99/100 & < 150ms */}
                  <div style={{ padding: '16px' }}>
                    <div
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '20px',
                        padding: '14px',
                        boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
                        marginBottom: '14px',
                      }}
                    >
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', textAlign: 'center' }}>
                        <div style={{ borderRight: '1px solid #EEF2F6', paddingRight: '8px' }}>
                          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
                            {isEn ? 'Health Score' : 'Score Qualité'}
                          </div>
                          <div style={{ fontSize: '26px', fontWeight: 800, color: '#4F46E5', lineHeight: 1.2 }}>
                            99<span style={{ fontSize: '13px', color: '#94A3B8' }}>/100</span>
                          </div>
                          <span
                            style={{
                              display: 'inline-block',
                              fontSize: '10px',
                              fontWeight: 700,
                              backgroundColor: '#EEF2FF',
                              color: '#4F46E5',
                              padding: '2px 8px',
                              borderRadius: '9999px',
                              marginTop: '4px',
                            }}
                          >
                            Top 1%
                          </span>
                        </div>

                        <div>
                          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
                            {isEn ? 'Response Time' : 'Temps réponse'}
                          </div>
                          <div style={{ fontSize: '22px', fontWeight: 800, color: '#0D9488', lineHeight: 1.35 }}>
                            &lt; 150ms
                          </div>
                          <span
                            style={{
                              display: 'inline-block',
                              fontSize: '10px',
                              fontWeight: 700,
                              backgroundColor: '#ECFDF5',
                              color: '#047857',
                              padding: '2px 8px',
                              borderRadius: '9999px',
                              marginTop: '4px',
                            }}
                          >
                            99.9% SLA
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Liste "Vos résultats détaillés" comme sur la vidéo 00:00 */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#0B1730' }}>
                        {isEn ? 'Detailed Diagnostics' : 'Vos résultats détaillés'}
                      </span>
                      <span style={{ fontSize: '11px', color: '#0D9488', fontWeight: 700 }}>
                        {isEn ? 'See all' : 'Tout voir'}
                      </span>
                    </div>

                    <div
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '18px',
                        padding: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        marginBottom: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Check size={14} color="#10B981" />
                          <span style={{ fontSize: '12px', fontWeight: 600, color: '#0B1730' }}>
                            {isEn ? 'Optimal SEO & Vitals (18)' : 'Optimal SEO & Vitals (18)'}
                          </span>
                        </div>
                        <div style={{ width: '54px', height: '6px', backgroundColor: '#10B981', borderRadius: '999px' }} />
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <TrendingUp size={14} color="#00A896" />
                          <span style={{ fontSize: '12px', fontWeight: 600, color: '#0B1730' }}>
                            {isEn ? 'Conversion Funnel' : 'Parcours Conversion'}
                          </span>
                        </div>
                        <div style={{ width: '44px', height: '6px', backgroundColor: '#00A896', borderRadius: '999px' }} />
                      </div>
                    </div>

                    {/* Carte Objectif bas de téléphone */}
                    <div
                      style={{
                        backgroundColor: '#D9F2EE',
                        borderRadius: '16px',
                        padding: '12px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '9.5px',
                          fontWeight: 800,
                          backgroundColor: '#10B981',
                          color: '#FFFFFF',
                          padding: '2px 7px',
                          borderRadius: '6px',
                          textTransform: 'uppercase',
                        }}
                      >
                        PROD READY
                      </span>
                      <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0B1730', marginTop: '6px' }}>
                        {isEn ? 'Optimize your digital acquisition' : 'Optimiser votre acquisition client'}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Colonne Droite : Bulles Flottantes en Vague (comme la bulle "Vos résultats sont prêts" à 00:00) */}
              <motion.div
                style={{
                  y: floatDown1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '16px',
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.03, y: -3 }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '24px',
                    padding: '18px 22px',
                    boxShadow: '0 18px 40px rgba(11, 23, 48, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    maxWidth: '320px',
                  }}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: '#10B981',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Check size={20} strokeWidth={3} />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#0B1730' }}>
                      {isEn ? 'Your platform is live!' : 'Votre plateforme est prête'}
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>
                      {isEn ? 'Deployed with SSL & Monitoring' : 'Déploiement continu & sécurisé'}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03, y: -3 }}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '22px',
                    padding: '16px 20px',
                    boxShadow: '0 12px 30px rgba(11, 23, 48, 0.05)',
                    maxWidth: '320px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span
                      style={{
                        fontSize: '11.5px',
                        fontFamily: "'Geist Mono', monospace",
                        color: '#0E6049',
                        backgroundColor: '#E6F7F4',
                        padding: '3px 9px',
                        borderRadius: '9999px',
                        fontWeight: 700,
                      }}
                    >
                      musatech-engine.config.ts
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#1E3A36', fontWeight: 600, lineHeight: 1.45 }}>
                    {isEn
                      ? '100% Type-Safe architecture built with React 19, NestJS & PostgreSQL.'
                      : 'Architecture 100% typée (React 19, NestJS & PostgreSQL) pensée pour évoluer.'}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </Container>
        </motion.div>

        {/* =========================================================================
            TRANSITION TEXTE ILLUMINÉ AU SCROLL (Exactement comme 00:01 "Merci de ne plus patienter.")
           ========================================================================= */}
        <ScrollIlluminatedBanner
          title={
            isEn
              ? 'Thank you for no longer waiting on slow software.'
              : 'Merci de ne plus patienter devant des outils lents.'
          }
          subtitle={
            isEn
              ? 'Your customers and teams don’t wait anymore. Neither does your growth!'
              : 'Vos clients n’attendent plus. Vos équipes non plus !'
          }
        />

        {/* =========================================================================
            SCÈNE 2 (00:01 de la vidéo) — 100% WIDTH ROSE PASTEL + IPHONE CATALOGUE & PAIEMENTS
           ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ type: 'spring', stiffness: 80, damping: 18 }}
          style={{
            width: '100%',
            backgroundColor: '#FCE8EC',
            borderRadius: '0',
            padding: 'clamp(56px, 7vw, 96px) 0',
            position: 'relative',
            overflow: 'hidden',
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
              {/* Colonne Gauche : Texte Éditorial Rose */}
              <div style={{ maxWidth: '380px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#F9CED8',
                    color: '#831843',
                    fontWeight: 800,
                    fontSize: '11.5px',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '6px 14px',
                    borderRadius: '10px',
                    marginBottom: '18px',
                  }}
                >
                  {isEn ? 'E-COMMERCE & PAYMENTS' : 'COMMERCE & PAIEMENTS'}
                </span>

                <h2
                  style={{
                    fontSize: 'clamp(28px, 3.4vw, 40px)',
                    fontWeight: 800,
                    color: '#0B1730',
                    lineHeight: 1.12,
                    letterSpacing: '-0.025em',
                    marginBottom: '18px',
                  }}
                >
                  {isEn
                    ? 'Online sales crafted with care.'
                    : 'Vos ventes en ligne, aux petits soins.'}
                </h2>

                <p style={{ fontSize: '16px', color: '#4A1D2E', lineHeight: 1.62, marginBottom: '14px' }}>
                  {isEn
                    ? 'Wave, Orange Money, bank cards, and automated invoicing selected and integrated with care.'
                    : 'Wave, Orange Money, cartes bancaires et facturation sélectionnés et intégrés aux petits oignons.'}
                </p>

                <p style={{ fontSize: '15px', color: '#6B2B43', lineHeight: 1.58 }}>
                  {isEn
                    ? 'Your customers order in a few taps and receive instant confirmation on mobile.'
                    : 'Vos clients commandent en quelques clics et reçoivent leur confirmation instantanément.'}
                </p>
              </div>

              {/* Colonne Centrale : Mockup iPhone E-Commerce (comme à 00:01 de la vidéo) */}
              <motion.div
                style={{
                  y: floatUp2,
                  margin: '0 auto',
                  width: '100%',
                  maxWidth: '340px',
                  backgroundColor: '#2D121E',
                  borderRadius: '46px',
                  padding: '11px',
                  boxShadow: '0 28px 60px -12px rgba(74, 25, 44, 0.28)',
                  border: '3px solid #59253A',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '36px',
                    overflow: 'hidden',
                    padding: '14px 16px',
                  }}
                >
                  <div
                    style={{
                      width: '86px',
                      height: '22px',
                      backgroundColor: '#14070D',
                      borderRadius: '9999px',
                      margin: '0 auto 14px',
                    }}
                  />

                  <div style={{ fontSize: '11.5px', color: '#64748B', textAlign: 'center', marginBottom: '14px', fontWeight: 600 }}>
                    {isEn
                      ? 'Frictionless checkout & automated inventory.'
                      : 'Paiement mobile & gestion de stock aux petits oignons.'}
                  </div>

                  {/* Grille 2 cartes produits comme les lunettes à 00:01 de la vidéo */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                    <div
                      style={{
                        backgroundColor: '#FDF2F4',
                        borderRadius: '18px',
                        padding: '14px 10px',
                        textAlign: 'center',
                      }}
                    >
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '14px',
                          backgroundColor: '#FFFFFF',
                          color: '#E11D48',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 10px',
                          boxShadow: '0 4px 10px rgba(225, 29, 72, 0.08)',
                        }}
                      >
                        <Smartphone size={20} />
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#0B1730' }}>Wave & OM</div>
                      <div style={{ fontSize: '10.5px', color: '#64748B', marginTop: '2px' }}>
                        {isEn ? 'Instant Mobile' : 'Paiement 1-clic'}
                      </div>
                    </div>

                    <div
                      style={{
                        backgroundColor: '#FDF2F4',
                        borderRadius: '18px',
                        padding: '14px 10px',
                        textAlign: 'center',
                      }}
                    >
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '14px',
                          backgroundColor: '#FFFFFF',
                          color: '#E11D48',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 10px',
                          boxShadow: '0 4px 10px rgba(225, 29, 72, 0.08)',
                        }}
                      >
                        <CreditCard size={20} />
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#0B1730' }}>Visa & Stripe</div>
                      <div style={{ fontSize: '10.5px', color: '#64748B', marginTop: '2px' }}>
                        {isEn ? 'Multi-currency' : 'Multi-devises'}
                      </div>
                    </div>
                  </div>

                  {/* Boutons pilules "Essayer / Filtrer" comme sur la vidéo 00:01 */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '16px' }}>
                    <span
                      style={{
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        padding: '7px 16px',
                        borderRadius: '9999px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        color: '#0B1730',
                      }}
                    >
                      {isEn ? 'Live Demo' : 'Essayer'}
                    </span>
                    <span
                      style={{
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        padding: '7px 16px',
                        borderRadius: '9999px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        color: '#0B1730',
                      }}
                    >
                      {isEn ? 'Catalog' : 'Filtrer'}
                    </span>
                  </div>

                  {/* Barre de navigation bas d'iPhone */}
                  <div
                    style={{
                      borderTop: '1px solid #F1F5F9',
                      paddingTop: '10px',
                      display: 'flex',
                      justifyContent: 'space-around',
                      fontSize: '10px',
                      color: '#64748B',
                      fontWeight: 600,
                    }}
                  >
                    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', color: '#E11D48' }}>
                      <Home size={14} />
                      {isEn ? 'Store' : 'Boutique'}
                    </span>
                    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                      <BarChart3 size={14} />
                      {isEn ? 'Sales' : 'Ventes'}
                    </span>
                    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                      <FolderKanban size={14} />
                      {isEn ? 'Orders' : 'Stock'}
                    </span>
                    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                      <UserCheck size={14} />
                      {isEn ? 'Clients' : 'Clients'}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Colonne Droite : Cartes Contextuelles E-Commerce */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'flex-start' }}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -3 }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '24px',
                    padding: '18px 22px',
                    boxShadow: '0 18px 40px rgba(131, 24, 67, 0.08)',
                    maxWidth: '310px',
                  }}
                >
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#BE123C', marginBottom: '4px' }}>
                    +38% Conversion
                  </div>
                  <div style={{ fontSize: '13px', color: '#4A1D2E', fontWeight: 600, lineHeight: 1.45 }}>
                    {isEn
                      ? 'Optimized mobile checkout with local & international payment methods.'
                      : 'Parcours d’achat mobile fluide adapté aux habitudes locales et internationales.'}
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03, y: -3 }}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.82)',
                    borderRadius: '20px',
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    maxWidth: '310px',
                  }}
                >
                  <Bell size={18} color="#BE123C" />
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#0B1730' }}>
                    {isEn ? 'Automated WhatsApp & Email receipts' : 'Notifications WhatsApp & factures auto'}
                  </span>
                </motion.div>
              </div>
            </div>
          </Container>
        </motion.div>

        {/* =========================================================================
            SCÈNE 3 (00:02 de la vidéo "ALAN PLAY") — 100% WIDTH PÊCHE PASTEL + IPHONE MÉTIER
           ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ type: 'spring', stiffness: 80, damping: 18 }}
          style={{
            width: '100%',
            backgroundColor: '#FBF0E4',
            borderRadius: '0',
            padding: 'clamp(56px, 7vw, 96px) 0',
            position: 'relative',
            overflow: 'hidden',
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
              {/* Colonne Gauche : Texte Éditorial Pêche */}
              <div style={{ maxWidth: '380px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#F6DCC0',
                    color: '#7C2D12',
                    fontWeight: 800,
                    fontSize: '11.5px',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '6px 14px',
                    borderRadius: '10px',
                    marginBottom: '18px',
                  }}
                >
                  {isEn ? 'MUSATECH FLOW' : 'MUSATECH FLOW'}
                </span>

                <h2
                  style={{
                    fontSize: 'clamp(28px, 3.4vw, 40px)',
                    fontWeight: 800,
                    color: '#0B1730',
                    lineHeight: 1.12,
                    letterSpacing: '-0.025em',
                    marginBottom: '18px',
                  }}
                >
                  {isEn
                    ? 'The right daily workflows, built to last.'
                    : 'Les bons outils métier, qui durent.'}
                </h2>

                <p style={{ fontSize: '16px', color: '#431407', lineHeight: 1.62, marginBottom: '14px' }}>
                  {isEn
                    ? 'Centralize, automate, track, repeat.'
                    : 'Centralisez, automatisez, pilotez, recommencez.'}
                </p>

                <p style={{ fontSize: '15px', color: '#78350F', lineHeight: 1.58 }}>
                  {isEn
                    ? 'Custom CRM, ERP, and iOS/Android mobile apps to transform scattered spreadsheets into effortless team habits.'
                    : 'Des logiciels métier et applications mobiles iOS & Android pour remplacer vos fichiers dispersés par une gestion fluide, à votre rythme et en équipe.'}
                </p>
              </div>

              {/* Colonne Centrale : Mockup iPhone Ambre/Or (Exactement comme à 00:02 de la vidéo) */}
              <motion.div
                style={{
                  y: floatUp3,
                  margin: '0 auto',
                  width: '100%',
                  maxWidth: '340px',
                  backgroundColor: '#C27832',
                  borderRadius: '46px',
                  padding: '11px',
                  boxShadow: '0 28px 60px -12px rgba(146, 64, 14, 0.3)',
                  border: '3px solid #DF9A57',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#FFFDF9',
                    borderRadius: '36px',
                    overflow: 'hidden',
                    padding: '14px 16px',
                  }}
                >
                  <div
                    style={{
                      width: '86px',
                      height: '22px',
                      backgroundColor: '#1C1108',
                      borderRadius: '9999px',
                      margin: '0 auto 12px',
                    }}
                  />

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                    }}
                  >
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: '#F3EFEA',
                        padding: '5px 12px',
                        borderRadius: '9999px',
                        fontSize: '11px',
                        color: '#64748B',
                        fontWeight: 600,
                      }}
                    >
                      <Search size={12} />
                      <span>{isEn ? 'Search...' : 'Rechercher'}</span>
                    </div>
                    <Bell size={15} color="#64748B" />
                  </div>

                  <div
                    style={{
                      backgroundColor: '#EEF2FF',
                      borderRadius: '18px',
                      padding: '14px',
                      textAlign: 'center',
                      marginBottom: '12px',
                    }}
                  >
                    <Layers size={28} color="#4F46E5" style={{ margin: '0 auto 6px' }} />
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#0B1730' }}>
                      {isEn ? '+200,000 active users' : '+200 000 utilisateurs actifs'}
                    </div>
                    <div style={{ fontSize: '11px', color: '#4F46E5', fontWeight: 700 }}>
                      {isEn ? '100% Typed Architecture' : '100% typé · Zéro perte de données'}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                    {[
                      {
                        label: isEn ? 'Automated client onboarding' : 'Suivi des dossiers clients',
                        count: '12 / 12',
                      },
                      {
                        label: isEn ? 'Invoicing & CRM sync' : 'Facturation & relances auto',
                        count: '8 / 8',
                      },
                      {
                        label: isEn ? 'Offline mobile field sync' : 'App mobile iOS & Android',
                        count: '100%',
                      },
                    ].map((task) => (
                      <div
                        key={task.label}
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #F1ECE4',
                          borderRadius: '14px',
                          padding: '10px 12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#0B1730' }}>{task.label}</span>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#0D9488' }}>{task.count} ✓</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ textAlign: 'center', fontSize: '11.5px', fontWeight: 700, color: '#4F46E5' }}>
                    {isEn ? 'View all business modules' : 'Voir tous les modules métier'}
                  </div>
                </div>
              </motion.div>

              {/* Colonne Droite : Cartes Flottantes Métier */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'flex-start' }}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -3 }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '24px',
                    padding: '18px 22px',
                    boxShadow: '0 18px 40px rgba(124, 45, 18, 0.08)',
                    maxWidth: '310px',
                  }}
                >
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#0B1730', marginBottom: '4px' }}>
                    {isEn ? 'Tailored to your field teams' : 'Adapté à vos équipes terrain'}
                  </div>
                  <div style={{ fontSize: '13px', color: '#57534E', lineHeight: 1.45 }}>
                    {isEn
                      ? 'InsurTech, HealthTech, EdTech & Logistics platforms running in production.'
                      : 'InsurTech, HealthTech, EdTech & Logistique : des outils fluides sur mobile et ordinateur.'}
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03, y: -3 }}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.85)',
                    borderRadius: '20px',
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    maxWidth: '310px',
                  }}
                >
                  <Activity size={18} color="#D97706" />
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#0B1730' }}>
                    {isEn ? '3 hours saved per day per team' : 'Jusqu’à 3h gagnées par jour'}
                  </span>
                </motion.div>
              </div>
            </div>
          </Container>
        </motion.div>

        {/* =========================================================================
            SCÈNE 4 (00:03–00:05 de la vidéo) — 100% WIDTH VERT FORÊT PROFOND + BADGE "EFFICACE"
           ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: 'spring', stiffness: 80, damping: 18 }}
          style={{
            width: '100%',
            backgroundColor: '#0E6049',
            color: '#FFFFFF',
            padding: 'clamp(56px, 8vw, 96px) 0',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Container>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                gap: 'clamp(28px, 4vw, 56px)',
                alignItems: 'center',
              }}
            >
              {/* Colonne Gauche : Badge incliné "Efficace" (comme à 00:03) + Stack */}
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '18px', alignItems: 'flex-start' }}>
                <motion.div
                  whileHover={{ rotate: 0, scale: 1.05 }}
                  style={{
                    backgroundColor: '#FAF8F5',
                    color: '#0B1730',
                    padding: '10px 26px',
                    borderRadius: '9999px',
                    fontSize: '16px',
                    fontWeight: 800,
                    transform: 'rotate(-8deg)',
                    boxShadow: '0 12px 28px rgba(0,0,0,0.18)',
                    display: 'inline-block',
                  }}
                >
                  {isEn ? 'Efficient' : 'Efficace'}
                </motion.div>

                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    borderRadius: '24px',
                    padding: '22px 26px',
                    maxWidth: '460px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <Lock size={17} color="#6EE7B7" />
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#A7F3D0' }}>
                      {isEn ? 'Direct Senior Engineering' : 'Ingénierie Senior en Direct'}
                    </span>
                  </div>
                  <p style={{ fontSize: '14.5px', color: '#ECFDF5', lineHeight: 1.58, margin: 0 }}>
                    {isEn
                      ? 'End-to-end security (JWT, RBAC, SSL, WCAG AA) and direct communication via WhatsApp, email, or call.'
                      : 'Sécurité de bout en bout (JWT, RBAC, SSL, WCAG AA) et accompagnement direct à Dakar et à l’international.'}
                  </p>
                </div>
              </div>

              {/* Colonne Droite : Typographie Blanche Impactante */}
              <div style={{ maxWidth: '500px' }}>
                <h2
                  style={{
                    fontSize: 'clamp(28px, 3.8vw, 44px)',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    lineHeight: 1.12,
                    letterSpacing: '-0.025em',
                    marginBottom: '18px',
                  }}
                >
                  {isEn
                    ? 'Your business doesn’t wait. Neither do we.'
                    : 'Votre croissance n’attend pas. Nous non plus.'}
                </h2>

                <p style={{ fontSize: '16.5px', color: '#D1FAE5', lineHeight: 1.62, marginBottom: '14px' }}>
                  {isEn
                    ? 'Speak directly with a true technical expert, without endless middlemen or confusing jargon.'
                    : 'Parlez à un vrai expert technique, sans parcours du combattant ni intermédiaires inutiles.'}
                </p>

                <p style={{ fontSize: '15.5px', color: '#A7F3D0', lineHeight: 1.6, margin: 0 }}>
                  {isEn
                    ? 'Get a clear response in less than 24 hours by WhatsApp, email, or phone.'
                    : 'Obtenez un cadrage clair et un devis détaillé sous 24h par WhatsApp, e-mail ou téléphone.'}
                </p>
              </div>
            </div>
          </Container>
        </motion.div>

        {/* =========================================================================
            TRANSITION FINALE ILLUMINÉE AU SCROLL (Exactement comme 00:04–00:05 "Pour nos membres / La santé n'attend pas. Vous non plus !")
           ========================================================================= */}
        <ScrollIlluminatedBanner
          badge={isEn ? 'For ambitious companies' : 'Pour vos projets'}
          title={
            isEn
              ? 'Digital excellence doesn’t wait. Neither do you!'
              : 'La qualité digitale n’attend pas. Vous non plus !'
          }
          subtitle={
            isEn
              ? 'No endless waiting rooms, no bloated paperwork slowing down your launch.'
              : 'Pas d’attente interminable, pas de complexité inutile qui vous fait perdre du temps.'
          }
        />
      </div>
    </section>
  );
};
