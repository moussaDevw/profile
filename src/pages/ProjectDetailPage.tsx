import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Layers,
  Users,
  Briefcase,
  Cpu,
  Lock,
  ArrowUpRight,
  Check,
} from 'lucide-react';
import { Container } from '../design-system/Container';
import { LinkButton } from '../design-system/Button';
import { getProjectBySlug, ProjectNature } from '../content/projectsData';
import { NavLink, useRouter } from '../lib/router';
import { updatePageMetadata } from '../lib/seoMetadata';
import { trackProjectViewed } from '../lib/analytics';

interface ProjectDetailPageProps {
  slug: string;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ slug }) => {
  const { locale } = useRouter();
  const isEn = locale === 'en';
  const project = getProjectBySlug(slug, locale);

  useEffect(() => {
    if (project) {
      updatePageMetadata({
        title: isEn
          ? `${project.name} | Technical Case Study & Architecture MusaTech`
          : project.seo.metaTitle,
        description: isEn
          ? project.shortSummary
          : project.seo.metaDescription,
        canonicalPath: isEn ? `/en/case-studies/${slug}` : `/fr/realisations/${slug}`,
        frPath: `/fr/realisations/${slug}`,
        enPath: `/en/case-studies/${slug}`,
        locale,
        breadcrumbs: [
          { name: isEn ? 'Home' : 'Accueil', path: isEn ? '/en' : '/fr' },
          { name: isEn ? 'Case Studies' : 'Réalisations', path: isEn ? '/en/case-studies' : '/fr/realisations' },
          { name: project.name, path: isEn ? `/en/case-studies/${slug}` : `/fr/realisations/${slug}` },
        ],
        schemaType: 'case-study',
        schemaData: {
          name: project.name,
          summary: project.shortSummary,
          technologies: project.technologies,
        },
      });
      trackProjectViewed({ projectSlug: slug, locale });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [project, slug, isEn, locale]);

  if (!project) {
    return (
      <Container style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h1 className="mt-h2" style={{ color: '#0B1730', marginBottom: '16px' }}>
          {isEn ? 'Case Study Not Found' : 'Réalisation non trouvée'}
        </h1>
        <p className="mt-body mt-muted" style={{ marginBottom: '24px' }}>
          {isEn
            ? 'The requested case study does not exist or has been moved.'
            : "Le projet ou l’étude de cas demandé n'existe pas ou a été déplacé."}
        </p>
        <LinkButton href={isEn ? '/en/case-studies' : '/realisations'} variant="primary">
          {isEn ? 'Back to Case Studies' : 'Retour aux réalisations'}
        </LinkButton>
      </Container>
    );
  }

  const getNatureBadgeStyle = (nature: ProjectNature) => {
    switch (nature) {
      case 'personal_project':
        return {
          bg: '#E0F2FE',
          color: '#0369A1',
          border: '1px solid #BAE6FD',
          icon: <Code2 size={15} />,
        };
      case 'freelance_mission':
        return {
          bg: '#FEF3C7',
          color: '#B45309',
          border: '1px solid #FDE68A',
          icon: <Briefcase size={15} />,
        };
      case 'team_project':
        return {
          bg: '#F3E8FF',
          color: '#7E22CE',
          border: '1px solid #E9D5FF',
          icon: <Users size={15} />,
        };
      case 'employee_project':
        return {
          bg: '#DCFCE7',
          color: '#15803D',
          border: '1px solid #BBF7D0',
          icon: <Layers size={15} />,
        };
      default:
        return {
          bg: '#F1F5F9',
          color: '#475569',
          border: '1px solid #E2E8F0',
          icon: <Code2 size={15} />,
        };
    }
  };

  const natureBadge = getNatureBadgeStyle(project.nature);
  const quoteHref = project.relatedServiceSlug
    ? (isEn ? `/en/quote?service=${project.relatedServiceSlug}` : `/fr/devis?service=${project.relatedServiceSlug}`)
    : (isEn ? '/en/quote' : '/fr/devis');

  return (
    <div className={`mt-project-detail-page mt-project-${project.slug}`}>
      {/* =========================================================================
          1. HERO & PRÉSENTATION DU PROJET — SCÈNE VERT MENTHE 100% PLEINE LARGEUR
         ========================================================================= */}
      <section
        style={{
          width: '100%',
          paddingTop: 'clamp(52px, 7vw, 88px)',
          paddingBottom: 'clamp(56px, 7vw, 92px)',
          backgroundColor: '#D9F2EE',
        }}
      >
        <Container>
          {/* Breadcrumb */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              color: '#2C524C',
              marginBottom: '24px',
            }}
          >
            <NavLink href={isEn ? '/en' : '/'} style={{ color: '#0A4B3E', textDecoration: 'none', fontWeight: 700 }}>
              {isEn ? 'Home' : 'Accueil'}
            </NavLink>
            <span>/</span>
            <NavLink href={isEn ? '/en/case-studies' : '/realisations'} style={{ color: '#0A4B3E', textDecoration: 'none', fontWeight: 700 }}>
              {isEn ? 'Case Studies' : 'Réalisations'}
            </NavLink>
            <span>/</span>
            <span style={{ color: '#0E6049', fontWeight: 800 }}>{project.name}</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
              gap: 'clamp(32px, 5vw, 56px)',
              alignItems: 'center',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Badges Pilules */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12px',
                    fontWeight: 800,
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    backgroundColor: natureBadge.bg,
                    color: natureBadge.color,
                    border: natureBadge.border,
                    textTransform: 'uppercase',
                    letterSpacing: '0.03em',
                  }}
                >
                  {natureBadge.icon}
                  <span>{project.natureLabel}</span>
                </span>

                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    color: '#0A4B3E',
                    backgroundColor: '#BAE6DF',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                  }}
                >
                  {project.sector}
                </span>

                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#0B1730',
                    backgroundColor: '#FFFFFF',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                  }}
                >
                  {isEn ? `Year: ${project.year}` : `Année : ${project.year}`}
                </span>
              </div>

              {/* Titre H1 & Type */}
              <h1
                className="mt-h1"
                style={{
                  color: '#0B1730',
                  marginBottom: '12px',
                  lineHeight: 1.08,
                  fontSize: 'clamp(36px, 4.8vw, 56px)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                }}
              >
                {project.name}
              </h1>

              <div
                style={{
                  fontSize: '16px',
                  fontWeight: 800,
                  color: '#0E6049',
                  marginBottom: '18px',
                }}
              >
                {project.solutionType}
              </div>

              {/* Présentation générale */}
              <p
                className="mt-body"
                style={{
                  fontSize: '17px',
                  lineHeight: 1.65,
                  color: '#1E3A36',
                  marginBottom: '28px',
                }}
              >
                {project.presentation}
              </p>

              {/* Boutons Pilules */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                <LinkButton
                  href={quoteHref}
                  variant="primary"
                  size="lg"
                  icon={<ArrowUpRight size={16} />}
                  style={{
                    borderRadius: '9999px',
                    backgroundColor: '#0B1730',
                    color: '#FFFFFF',
                    paddingLeft: '28px',
                    paddingRight: '28px',
                  }}
                >
                  {isEn ? 'Discuss a Similar Project' : 'Discuter d’un projet similaire'}
                </LinkButton>

                {project.demoAndMedia.githubRepoUrl && (
                  <a
                    href={project.demoAndMedia.githubRepoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '0 24px',
                      borderRadius: '9999px',
                      backgroundColor: '#FFFFFF',
                      color: '#0B1730',
                      fontWeight: 700,
                      fontSize: '14px',
                      textDecoration: 'none',
                      minHeight: '48px',
                      boxShadow: '0 4px 14px rgba(11, 23, 48, 0.06)',
                    }}
                  >
                    <ExternalLink size={16} />
                    <span>{isEn ? 'Explore GitHub Code' : 'Explorer le code GitHub'}</span>
                  </a>
                )}
              </div>
            </motion.div>

            {/* Fiche d'Identité & Déclaration de Paternité — Carte Flottante Blanche Alan */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '34px',
                padding: 'clamp(24px, 3.5vw, 36px)',
                boxShadow: '0 24px 52px -12px rgba(14, 96, 73, 0.14)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '18px',
                  borderBottom: '1px solid #F1EFEA',
                  paddingBottom: '14px',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '12px',
                    backgroundColor: '#D9F2EE',
                    color: '#0E6049',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ShieldCheck size={20} />
                </div>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#0B1730', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {isEn ? 'Project Scope & Authorship' : 'Fiche de Cadrage & Paternité'}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px' }}>
                <div style={{ backgroundColor: '#FAF8F5', padding: '12px 16px', borderRadius: '16px' }}>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase' }}>
                    {isEn ? 'Project Context' : 'Cadre du projet'}
                  </span>
                  <strong style={{ color: '#0B1730', fontSize: '14.5px' }}>{project.clientOrContext}</strong>
                </div>

                <div style={{ backgroundColor: '#FAF8F5', padding: '12px 16px', borderRadius: '16px' }}>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase' }}>
                    {isEn ? 'Role of Moussa Diagne' : 'Rôle de Moussa Diagne'}
                  </span>
                  <strong style={{ color: '#0B1730', fontSize: '14.5px' }}>{project.personalContribution.roleTitle}</strong>
                </div>

                <div style={{ backgroundColor: '#FAF8F5', padding: '12px 16px', borderRadius: '16px' }}>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase' }}>
                    {isEn ? 'Legal Nature' : 'Nature légale'}
                  </span>
                  <strong style={{ color: '#0B1730', fontSize: '14.5px' }}>{project.natureLabel}</strong>
                </div>

                {project.verifiedResults && (
                  <div style={{ backgroundColor: '#ECFDF5', padding: '12px 16px', borderRadius: '16px' }}>
                    <span style={{ color: '#047857', display: 'block', fontSize: '11.5px', fontWeight: 800, textTransform: 'uppercase' }}>
                      {isEn ? 'Verified Metric' : 'Résultat vérifié'}
                    </span>
                    <strong style={{ color: '#0E6049', fontSize: '15px' }}>{project.verifiedResults.metricHighlight}</strong>
                  </div>
                )}
              </div>

              {/* Note de délimitation obligatoire */}
              <div
                style={{
                  marginTop: '18px',
                  fontSize: '12.5px',
                  lineHeight: 1.55,
                  color: '#475569',
                  backgroundColor: '#FAF8F5',
                  padding: '14px 16px',
                  borderRadius: '18px',
                }}
              >
                <div style={{ fontWeight: 800, color: '#0B1730', marginBottom: '4px' }}>
                  {isEn ? 'MusaTech Transparency Declaration:' : 'Déclaration de transparence MusaTech :'}
                </div>
                {project.attributionDisclaimer}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          2 & 3. CONTEXTE MÉTIER & PROBLÈME À RÉSOUDRE — SCÈNE CRÈME 100% PLEINE LARGEUR
         ========================================================================= */}
      <motion.section
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ type: 'spring', stiffness: 80, damping: 18 }}
        style={{
          width: '100%',
          padding: 'clamp(56px, 7vw, 92px) 0',
          backgroundColor: '#FAF8F5',
        }}
      >
        <Container>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
              gap: '28px',
            }}
          >
            {/* 2. Contexte Métier */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '32px',
                padding: 'clamp(26px, 3.5vw, 38px)',
                boxShadow: '0 18px 42px -12px rgba(11, 23, 48, 0.06)',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '11.5px',
                  fontWeight: 800,
                  color: '#0A4B3E',
                  backgroundColor: '#D9F2EE',
                  padding: '6px 14px',
                  borderRadius: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '14px',
                }}
              >
                {isEn ? '02 · Business Context' : '02 · Contexte Métier'}
              </span>
              <h2 className="mt-h3" style={{ fontSize: '24px', fontWeight: 800, color: '#0B1730', marginBottom: '14px' }}>
                {isEn ? 'Operational Environment' : 'L’environnement opérationnel'}
              </h2>
              <p className="mt-body" style={{ fontSize: '15.5px', color: '#334155', lineHeight: 1.65, margin: 0 }}>
                {project.businessContext}
              </p>
            </div>

            {/* 3. Problème à Résoudre */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '32px',
                padding: 'clamp(26px, 3.5vw, 38px)',
                boxShadow: '0 18px 42px -12px rgba(11, 23, 48, 0.06)',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '11.5px',
                  fontWeight: 800,
                  color: '#831843',
                  backgroundColor: '#FCE8EC',
                  padding: '6px 14px',
                  borderRadius: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '14px',
                }}
              >
                {isEn ? '03 · Core Problem' : '03 · Problématique Clé'}
              </span>
              <h2 className="mt-h3" style={{ fontSize: '24px', fontWeight: 800, color: '#0B1730', marginBottom: '14px' }}>
                {isEn ? 'Initial Challenge' : 'Le défi initial'}
              </h2>
              <p className="mt-body" style={{ fontSize: '15.5px', color: '#334155', lineHeight: 1.65, margin: 0 }}>
                {project.problemToSolve}
              </p>
            </div>
          </div>
        </Container>
      </motion.section>

      {/* =========================================================================
          4 & 5. SOLUTION DÉVELOPPÉE & FONCTIONNALITÉS — SCÈNE PÊCHE 100% PLEINE LARGEUR
         ========================================================================= */}
      <motion.section
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ type: 'spring', stiffness: 80, damping: 18 }}
        style={{
          width: '100%',
          padding: 'clamp(56px, 7vw, 92px) 0',
          backgroundColor: '#FBF0E4',
        }}
      >
        <Container>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
              gap: 'clamp(32px, 5vw, 52px)',
              alignItems: 'center',
            }}
          >
            {/* 4. Solution Développée */}
            <div>
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '11.5px',
                  fontWeight: 800,
                  color: '#7C2D12',
                  backgroundColor: '#F6DCC0',
                  padding: '6px 14px',
                  borderRadius: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '16px',
                }}
              >
                {isEn ? '04 · Engineered Solution' : '04 · Solution Développée'}
              </span>
              <h2
                className="mt-h2"
                style={{
                  color: '#0B1730',
                  marginBottom: '18px',
                  fontSize: 'clamp(28px, 3.6vw, 40px)',
                  fontWeight: 800,
                  lineHeight: 1.12,
                }}
              >
                {isEn ? 'Software Architecture Deployed' : 'L’architecture logicielle mise en place'}
              </h2>
              <p className="mt-body" style={{ fontSize: '16.5px', color: '#431407', lineHeight: 1.65, margin: 0 }}>
                {project.solutionDeveloped}
              </p>
            </div>

            {/* 5. Fonctionnalités Principales — Carte Flottante Blanche Alan */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '34px',
                padding: 'clamp(26px, 3.5vw, 38px)',
                boxShadow: '0 22px 48px -12px rgba(124, 45, 18, 0.1)',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '11.5px',
                  fontWeight: 800,
                  color: '#B45309',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '8px',
                }}
              >
                {isEn ? '05 · Key Capabilities' : '05 · Fonctionnalités Principales'}
              </span>
              <h3 className="mt-h3" style={{ fontSize: '22px', fontWeight: 800, color: '#0B1730', marginBottom: '20px' }}>
                {isEn ? 'Delivered Operational Capabilities' : 'Capacités opérationnelles livrées'}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {project.mainFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: '12px 16px',
                      borderRadius: '18px',
                      backgroundColor: '#FAF8F5',
                    }}
                  >
                    <span
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: '#ECFDF5',
                        color: '#10B981',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '1px',
                      }}
                    >
                      <Check size={14} strokeWidth={3} />
                    </span>
                    <span style={{ fontSize: '14.5px', color: '#0B1730', lineHeight: 1.45, fontWeight: 700 }}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </motion.section>

      {/* =========================================================================
          6. CONTRIBUTION PERSONNELLE EXACTE — SCÈNE VERT FORÊT ALAN 100% PLEINE LARGEUR
         ========================================================================= */}
      <motion.section
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ type: 'spring', stiffness: 80, damping: 18 }}
        style={{
          width: '100%',
          padding: 'clamp(56px, 8vw, 96px) 0',
          backgroundColor: '#0E6049',
          color: '#FFFFFF',
        }}
      >
        <Container>
          <div style={{ maxWidth: '880px', margin: '0 auto' }}>
            <span
              style={{
                display: 'inline-block',
                fontSize: '12px',
                fontWeight: 800,
                color: '#0B1730',
                backgroundColor: '#FAF8F5',
                padding: '6px 16px',
                borderRadius: '9999px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '18px',
              }}
            >
              {isEn ? '06 · Exact Role of MusaTech Founder' : '06 · Rôle Exact du Fondateur MusaTech'}
            </span>

            <h2 className="mt-h2" style={{ color: '#FFFFFF', marginBottom: '14px', fontWeight: 800 }}>
              {isEn ? 'Personal Contribution of Moussa Diagne' : 'La contribution personnelle de Moussa Diagne'}
            </h2>

            <div
              style={{
                fontSize: '18px',
                fontWeight: 800,
                color: '#A7F3D0',
                marginBottom: '16px',
              }}
            >
              {isEn
                ? `Official Role: ${project.personalContribution.roleTitle}`
                : `Rôle officiel : ${project.personalContribution.roleTitle}`}
            </div>

            <p style={{ color: '#ECFDF5', fontSize: '16.5px', lineHeight: 1.65, marginBottom: '32px' }}>
              {project.personalContribution.description}
            </p>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                color: '#0B1730',
                borderRadius: '32px',
                padding: 'clamp(24px, 3.5vw, 36px)',
                boxShadow: '0 24px 52px rgba(0, 0, 0, 0.2)',
              }}
            >
              <h4 style={{ fontSize: '16px', color: '#0B1730', fontWeight: 800, marginBottom: '18px' }}>
                {isEn ? 'Key deliverables & engineering responsibilities:' : 'Livrables et responsabilités effectives :'}
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {project.personalContribution.keyDeliverables.map((del, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <span
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        backgroundColor: '#D9F2EE',
                        color: '#0E6049',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px',
                      }}
                    >
                      <Check size={13} strokeWidth={3} />
                    </span>
                    <span style={{ fontSize: '14.5px', color: '#1E293B', lineHeight: 1.5, fontWeight: 600 }}>
                      {del}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </motion.section>

      {/* =========================================================================
          7. TECHNOLOGIES UTILISÉES — SCÈNE LAVANDE 100% PLEINE LARGEUR
         ========================================================================= */}
      <motion.section
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ type: 'spring', stiffness: 80, damping: 18 }}
        style={{
          width: '100%',
          padding: 'clamp(52px, 7vw, 88px) 0',
          backgroundColor: '#EEF2FF',
        }}
      >
        <Container>
          <div style={{ maxWidth: '880px', margin: '0 auto' }}>
            <span
              style={{
                display: 'inline-block',
                fontSize: '11.5px',
                fontWeight: 800,
                color: '#1E3A8A',
                backgroundColor: '#D8E1FF',
                padding: '6px 14px',
                borderRadius: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '14px',
              }}
            >
              {isEn ? '07 · Technologies Used' : '07 · Technologies Utilisées'}
            </span>
            <h2 className="mt-h2" style={{ color: '#0B1730', marginBottom: '26px', fontWeight: 800 }}>
              {isEn ? 'Production Tech Stack' : 'Stack technique déployée'}
            </h2>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {project.technologies.map((t, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 18px',
                    borderRadius: '9999px',
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0 6px 16px rgba(30, 58, 138, 0.06)',
                    fontSize: '14px',
                    color: '#0B1730',
                    fontWeight: 700,
                  }}
                >
                  <Cpu size={15} color="#4338CA" />
                  <span>{t.name}</span>
                  {t.category && (
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#4338CA',
                        backgroundColor: '#EEF2FF',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        marginLeft: '4px',
                      }}
                    >
                      {t.category}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </motion.section>

      {/* =========================================================================
          8. DÉFIS TECHNIQUES — SCÈNE ROSE PASTEL 100% PLEINE LARGEUR
         ========================================================================= */}
      <motion.section
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ type: 'spring', stiffness: 80, damping: 18 }}
        style={{
          width: '100%',
          padding: 'clamp(56px, 7vw, 92px) 0',
          backgroundColor: '#FCE8EC',
        }}
      >
        <Container>
          <div style={{ maxWidth: '880px', margin: '0 auto' }}>
            <span
              style={{
                display: 'inline-block',
                fontSize: '11.5px',
                fontWeight: 800,
                color: '#831843',
                backgroundColor: '#F9CED8',
                padding: '6px 14px',
                borderRadius: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '14px',
              }}
            >
              {isEn ? '08 · Technical Challenges' : '08 · Défis Techniques'}
            </span>
            <h2 className="mt-h2" style={{ color: '#0B1730', marginBottom: '28px', fontWeight: 800 }}>
              {isEn ? 'Engineering Complexities & Resolutions' : 'Complexités d’ingénierie et résolutions'}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {project.technicalChallenges.map((ch, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '30px',
                    padding: 'clamp(22px, 3.5vw, 32px)',
                    boxShadow: '0 16px 38px rgba(131, 24, 67, 0.07)',
                  }}
                >
                  <h3 className="mt-h3" style={{ fontSize: '20px', fontWeight: 800, color: '#0B1730', marginBottom: '10px' }}>
                    {ch.title}
                  </h3>
                  <p className="mt-body" style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.6, marginBottom: '16px' }}>
                    <strong>{isEn ? 'The challenge:' : 'La difficulté :'}</strong> {ch.description}
                  </p>
                  <div
                    style={{
                      backgroundColor: '#D9F2EE',
                      borderRadius: '20px',
                      padding: '14px 18px',
                      fontSize: '14.5px',
                      color: '#0B1730',
                      fontWeight: 600,
                    }}
                  >
                    <strong style={{ color: '#0E6049', display: 'block', marginBottom: '4px', fontSize: '12px', textTransform: 'uppercase' }}>
                      {isEn ? 'The applied technical solution:' : 'La solution technique appliquée :'}
                    </strong>
                    {ch.resolution}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </motion.section>

      {/* =========================================================================
          9 & 10. RÉSULTATS VÉRIFIÉS & DÉMO — SCÈNE CRÈME 100% PLEINE LARGEUR
         ========================================================================= */}
      <motion.section
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ type: 'spring', stiffness: 80, damping: 18 }}
        style={{
          width: '100%',
          padding: 'clamp(56px, 7vw, 92px) 0',
          backgroundColor: '#FAF8F5',
        }}
      >
        <Container>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
              gap: '28px',
            }}
          >
            {/* 9. Résultats Vérifiés */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '32px',
                padding: 'clamp(24px, 3.5vw, 36px)',
                boxShadow: '0 18px 42px -12px rgba(11, 23, 48, 0.06)',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '11.5px',
                  fontWeight: 800,
                  color: '#0A4B3E',
                  backgroundColor: '#D9F2EE',
                  padding: '6px 14px',
                  borderRadius: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '14px',
                }}
              >
                {isEn ? '09 · Verified Results' : '09 · Résultats Vérifiés'}
              </span>
              <h3 className="mt-h3" style={{ fontSize: '21px', fontWeight: 800, color: '#0B1730', marginBottom: '14px' }}>
                {isEn ? 'Documented Factual Impact' : 'Impact factuel documenté'}
              </h3>

              {project.verifiedResults ? (
                <div>
                  {project.verifiedResults.metricHighlight && (
                    <div
                      style={{
                        fontSize: '26px',
                        fontWeight: 800,
                        color: '#0E6049',
                        fontFamily: "'Manrope', sans-serif",
                        marginBottom: '10px',
                      }}
                    >
                      {project.verifiedResults.metricHighlight}
                    </div>
                  )}
                  <p className="mt-body" style={{ fontSize: '14.5px', color: '#334155', lineHeight: 1.6, marginBottom: '12px' }}>
                    {project.verifiedResults.description}
                  </p>
                  <div style={{ fontSize: '12.5px', color: '#64748B', backgroundColor: '#FAF8F5', padding: '10px 14px', borderRadius: '14px' }}>
                    <strong>{isEn ? 'Verifiable source:' : 'Source vérifiable :'}</strong> {project.verifiedResults.sourceOrEvidence}
                  </div>
                </div>
              ) : (
                <p className="mt-body" style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                  {isEn
                    ? 'No external commercial metrics are claimed without third-party audit. The core software deliverables, architecture patterns, and deployed modules constitute the primary technical benchmark.'
                    : 'Aucune statistique commerciale externe non auditée n’est revendiquée pour ce projet. Seuls les livrables d’architecture logicielle et les modules effectivement programmés constituent la référence technique.'}
                </p>
              )}
            </div>

            {/* 10. Captures ou Démo Autorisées */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '32px',
                padding: 'clamp(24px, 3.5vw, 36px)',
                boxShadow: '0 18px 42px -12px rgba(11, 23, 48, 0.06)',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '11.5px',
                  fontWeight: 800,
                  color: '#1E3A8A',
                  backgroundColor: '#EEF2FF',
                  padding: '6px 14px',
                  borderRadius: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '14px',
                }}
              >
                {isEn ? '10 · Screenshots & Demonstrations' : '10 · Captures & Démonstrations'}
              </span>
              <h3 className="mt-h3" style={{ fontSize: '21px', fontWeight: 800, color: '#0B1730', marginBottom: '14px' }}>
                {isEn ? 'Access & Confidentiality Policy' : 'Accès et politique de confidentialité'}
              </h3>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                {project.demoAndMedia.ndaProtected ? (
                  <Lock size={20} color="#BE123C" style={{ flexShrink: 0, marginTop: '2px' }} />
                ) : (
                  <CheckCircle2 size={20} color="#0E6049" style={{ flexShrink: 0, marginTop: '2px' }} />
                )}
                <p style={{ margin: 0, fontSize: '14.5px', color: '#334155', lineHeight: 1.6 }}>
                  {project.demoAndMedia.screenshotsNote}
                </p>
              </div>

              {project.demoAndMedia.githubRepoUrl && (
                <div style={{ marginTop: '16px' }}>
                  <a
                    href={project.demoAndMedia.githubRepoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#0E6049',
                      backgroundColor: '#D9F2EE',
                      padding: '10px 18px',
                      borderRadius: '9999px',
                      fontWeight: 800,
                      fontSize: '13.5px',
                      textDecoration: 'none',
                    }}
                  >
                    <span>{isEn ? 'View Public GitHub Repository' : 'Voir le dépôt public GitHub'}</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </Container>
      </motion.section>

      {/* =========================================================================
          11. CTA VERS /DEVIS — SCÈNE VERT FORÊT ALAN 100% PLEINE LARGEUR
         ========================================================================= */}
      <section
        style={{
          width: '100%',
          padding: 'clamp(64px, 8vw, 100px) 0',
          backgroundColor: '#0E6049',
          color: '#FFFFFF',
          textAlign: 'center',
        }}
      >
        <Container>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <span
              style={{
                display: 'inline-block',
                fontSize: '12px',
                fontWeight: 800,
                color: '#0B1730',
                backgroundColor: '#FAF8F5',
                padding: '6px 16px',
                borderRadius: '9999px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '18px',
              }}
            >
              {isEn ? '11 · Ready to Engineer Your Solution?' : '11 · Prêt à Développer Votre Solution ?'}
            </span>

            <h2 className="mt-h2" style={{ color: '#FFFFFF', marginBottom: '16px', fontWeight: 800 }}>
              {isEn ? 'Benefit from the Same Engineering Rigor' : 'Bénéficiez du même niveau d’exigence technique'}
            </h2>

            <p style={{ color: '#D1FAE5', fontSize: '17px', lineHeight: 1.62, marginBottom: '32px' }}>
              {isEn
                ? 'Looking to develop a robust mobile app, SaaS platform, or business software? Connect directly with Moussa Diagne to assess technical feasibility.'
                : 'Vous souhaitez développer une application mobile, une plateforme SaaS ou un logiciel métier robuste ? Échangez directement avec Moussa Diagne pour étudier la faisabilité technique de votre projet.'}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
              <LinkButton
                href={quoteHref}
                variant="primary"
                size="lg"
                style={{
                  borderRadius: '9999px',
                  backgroundColor: '#FFFFFF',
                  color: '#0B1730',
                  border: 'none',
                  paddingLeft: '30px',
                  paddingRight: '30px',
                }}
              >
                {isEn ? 'Request a Proposal for Your Project' : 'Demander un devis pour votre projet'}
              </LinkButton>

              <LinkButton
                href={isEn ? '/en/case-studies' : '/realisations'}
                variant="outline-light"
                size="lg"
                style={{
                  borderRadius: '9999px',
                  paddingLeft: '28px',
                  paddingRight: '28px',
                }}
              >
                {isEn ? 'View All Case Studies' : 'Voir toutes les réalisations'}
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
