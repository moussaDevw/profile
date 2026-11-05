import React, { useEffect } from 'react';
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
      {/* 1. Hero & Présentation du projet */}
      <section
        style={{
          paddingTop: 'clamp(48px, 6vw, 80px)',
          paddingBottom: 'clamp(48px, 6vw, 72px)',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #DAE3ED',
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
              color: '#465670',
              marginBottom: '20px',
            }}
          >
            <NavLink href={isEn ? '/en' : '/'} style={{ color: '#172A46', textDecoration: 'none', fontWeight: 500 }}>
              {isEn ? 'Home' : 'Accueil'}
            </NavLink>
            <span>/</span>
            <NavLink href={isEn ? '/en/case-studies' : '/realisations'} style={{ color: '#172A46', textDecoration: 'none', fontWeight: 500 }}>
              {isEn ? 'Case Studies' : 'Réalisations'}
            </NavLink>
            <span>/</span>
            <span style={{ color: '#19B8CD', fontWeight: 600 }}>{project.name}</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 520px), 1fr))',
              gap: '40px',
              alignItems: 'center',
            }}
          >
            <div>
              {/* Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12px',
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: '100px',
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
                    fontWeight: 600,
                    color: '#172A46',
                    backgroundColor: '#F4F7FB',
                    border: '1px solid #DAE3ED',
                    padding: '4px 10px',
                    borderRadius: '100px',
                  }}
                >
                  {project.sector}
                </span>

                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#64748B',
                  }}
                >
                  {isEn ? `Year: ${project.year}` : `Année : ${project.year}`}
                </span>
              </div>

              {/* Titre & Type */}
              <h1
                className="mt-h1"
                style={{
                  color: '#0B1730',
                  marginBottom: '12px',
                  lineHeight: 1.15,
                }}
              >
                {project.name}
              </h1>

              <div
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#19B8CD',
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
                  lineHeight: 1.6,
                  color: '#172A46',
                  marginBottom: '24px',
                }}
              >
                {project.presentation}
              </p>

              {/* Liens de démo ou dépôt */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <LinkButton href={quoteHref} variant="primary" size="lg">
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
                      padding: '0 20px',
                      borderRadius: '10px',
                      backgroundColor: '#F4F7FB',
                      border: '1px solid #DAE3ED',
                      color: '#0B1730',
                      fontWeight: 600,
                      fontSize: '14px',
                      textDecoration: 'none',
                      minHeight: '48px',
                    }}
                  >
                    <ExternalLink size={16} />
                    <span>{isEn ? 'Explore GitHub Code' : 'Explorer le code GitHub'}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Fiche d'Identité & Déclaration de Paternité */}
            <div
              style={{
                backgroundColor: '#F8FAFC',
                border: '1px solid #DAE3ED',
                borderRadius: '16px',
                padding: 'clamp(18px, 3.5vw, 28px) clamp(12px, 2.5vw, 28px)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px',
                  borderBottom: '1px solid #E2E8F0',
                  paddingBottom: '12px',
                }}
              >
                <ShieldCheck size={20} color="#19B8CD" />
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#0B1730', textTransform: 'uppercase' }}>
                  {isEn ? 'Project Scope & Authorship' : 'Fiche de Cadrage & Paternité'}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '12px' }}>
                    {isEn ? 'Project Context' : 'Cadre du projet'}
                  </span>
                  <strong style={{ color: '#0B1730' }}>{project.clientOrContext}</strong>
                </div>

                <div>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '12px' }}>
                    {isEn ? 'Role of Moussa Diagne' : 'Rôle de Moussa Diagne'}
                  </span>
                  <strong style={{ color: '#0B1730' }}>{project.personalContribution.roleTitle}</strong>
                </div>

                <div>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '12px' }}>
                    {isEn ? 'Legal Nature' : 'Nature légale'}
                  </span>
                  <strong style={{ color: '#0B1730' }}>{project.natureLabel}</strong>
                </div>

                {project.verifiedResults && (
                  <div>
                    <span style={{ color: '#64748B', display: 'block', fontSize: '12px' }}>
                      {isEn ? 'Verified Metric' : 'Résultat vérifié'}
                    </span>
                    <strong style={{ color: '#19B8CD' }}>{project.verifiedResults.metricHighlight}</strong>
                  </div>
                )}
              </div>

              {/* Note de délimitation obligatoire */}
              <div
                style={{
                  marginTop: '20px',
                  paddingTop: '16px',
                  borderTop: '1px solid #E2E8F0',
                  fontSize: '12px',
                  lineHeight: 1.5,
                  color: '#475569',
                  backgroundColor: '#FFFFFF',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                }}
              >
                <div style={{ fontWeight: 600, color: '#0B1730', marginBottom: '4px' }}>
                  {isEn ? 'MusaTech Transparency Declaration:' : 'Déclaration de transparence MusaTech :'}
                </div>
                {project.attributionDisclaimer}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2 & 3. Contexte Métier & Problème à Résoudre */}
      <section
        style={{
          padding: 'clamp(56px, 8vw, 88px) 0',
          backgroundColor: '#F4F7FB',
          borderBottom: '1px solid #DAE3ED',
        }}
      >
        <Container>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
              gap: '32px',
            }}
          >
            {/* 2. Contexte Métier */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                border: '1px solid #DAE3ED',
                padding: 'clamp(20px, 3.5vw, 32px) clamp(12px, 2.5vw, 32px)',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#19B8CD',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  marginBottom: '8px',
                }}
              >
                {isEn ? '02 · Business Context' : '02 · Contexte Métier'}
              </div>
              <h2 className="mt-h3" style={{ fontSize: '20px', color: '#0B1730', marginBottom: '14px' }}>
                {isEn ? 'Operational Environment' : 'L’environnement opérationnel'}
              </h2>
              <p className="mt-body mt-muted" style={{ fontSize: '15px', lineHeight: 1.6 }}>
                {project.businessContext}
              </p>
            </div>

            {/* 3. Problème à Résoudre */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                border: '1px solid #DAE3ED',
                padding: 'clamp(20px, 3.5vw, 32px) clamp(12px, 2.5vw, 32px)',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#DC2626',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  marginBottom: '8px',
                }}
              >
                {isEn ? '03 · Core Problem' : '03 · Problématique Clé'}
              </div>
              <h2 className="mt-h3" style={{ fontSize: '20px', color: '#0B1730', marginBottom: '14px' }}>
                {isEn ? 'Initial Challenge' : 'Le défi initial'}
              </h2>
              <p className="mt-body mt-muted" style={{ fontSize: '15px', lineHeight: 1.6 }}>
                {project.problemToSolve}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 4 & 5. Solution Développée & Fonctionnalités Principales */}
      <section
        style={{
          padding: 'clamp(56px, 8vw, 88px) 0',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #DAE3ED',
        }}
      >
        <Container>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            {/* 4. Solution Développée */}
            <div style={{ marginBottom: '48px' }}>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#19B8CD',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  marginBottom: '8px',
                }}
              >
                {isEn ? '04 · Engineered Solution' : '04 · Solution Développée'}
              </div>
              <h2 className="mt-h2" style={{ color: '#0B1730', marginBottom: '16px' }}>
                {isEn ? 'Software Architecture Deployed' : 'L’architecture logicielle mise en place'}
              </h2>
              <p className="mt-body mt-muted" style={{ fontSize: '17px', lineHeight: 1.6 }}>
                {project.solutionDeveloped}
              </p>
            </div>

            {/* 5. Fonctionnalités Principales */}
            <div>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#172A46',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  marginBottom: '12px',
                }}
              >
                {isEn ? '05 · Key Capabilities' : '05 · Fonctionnalités Principales'}
              </div>
              <h3 className="mt-h3" style={{ fontSize: '20px', color: '#0B1730', marginBottom: '24px' }}>
                {isEn ? 'Delivered Operational Capabilities' : 'Capacités opérationnelles livrées'}
              </h3>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
                  gap: '16px',
                }}
              >
                {project.mainFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: '14px clamp(10px, 2.5vw, 16px)',
                      borderRadius: '10px',
                      backgroundColor: '#F4F7FB',
                      border: '1px solid #DAE3ED',
                    }}
                  >
                    <CheckCircle2 size={18} color="#19B8CD" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '14px', color: '#172A46', lineHeight: 1.5, fontWeight: 500 }}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. Contribution Personnelle Exacte */}
      <section
        style={{
          padding: 'clamp(56px, 8vw, 88px) 0',
          backgroundColor: '#0B1730',
          color: '#FFFFFF',
        }}
      >
        <Container>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#19B8CD',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '8px',
              }}
            >
              {isEn ? '06 · Exact Role of MusaTech Founder' : '06 · Rôle Exact du Fondateur MusaTech'}
            </div>

            <h2 className="mt-h2" style={{ color: '#FFFFFF', marginBottom: '16px' }}>
              {isEn ? 'Personal Contribution of Moussa Diagne' : 'La contribution personnelle de Moussa Diagne'}
            </h2>

            <div
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#19B8CD',
                marginBottom: '16px',
              }}
            >
              {isEn
                ? `Official Role: ${project.personalContribution.roleTitle}`
                : `Rôle officiel : ${project.personalContribution.roleTitle}`}
            </div>

            <p style={{ color: '#CBD5E1', fontSize: '16px', lineHeight: 1.6, marginBottom: '32px' }}>
              {project.personalContribution.description}
            </p>

            <div
              style={{
                backgroundColor: '#172A46',
                border: '1px solid rgba(218, 227, 237, 0.15)',
                borderRadius: '14px',
                padding: 'clamp(16px, 3.5vw, 24px) clamp(12px, 2.5vw, 24px)',
              }}
            >
              <h4 style={{ fontSize: '15px', color: '#FFFFFF', fontWeight: 700, marginBottom: '16px' }}>
                {isEn ? 'Key deliverables & engineering responsibilities:' : 'Livrables et responsabilités effectives :'}
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {project.personalContribution.keyDeliverables.map((del, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: '#19B8CD',
                        marginTop: '8px',
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: '14px', color: '#E2E8F0', lineHeight: 1.5 }}>
                      {del}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 7. Technologies Utilisées */}
      <section
        style={{
          padding: 'clamp(56px, 8vw, 88px) 0',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #DAE3ED',
        }}
      >
        <Container>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#19B8CD',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '8px',
              }}
            >
              {isEn ? '07 · Technologies Used' : '07 · Technologies Utilisées'}
            </div>
            <h2 className="mt-h2" style={{ color: '#0B1730', marginBottom: '24px' }}>
              {isEn ? 'Production Tech Stack' : 'Stack technique déployée'}
            </h2>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {project.technologies.map((t, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    backgroundColor: '#F4F7FB',
                    border: '1px solid #DAE3ED',
                    fontSize: '14px',
                    color: '#172A46',
                    fontWeight: 600,
                  }}
                >
                  <Cpu size={15} color="#19B8CD" />
                  <span>{t.name}</span>
                  {t.category && (
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 500,
                        color: '#64748B',
                        backgroundColor: '#E2E8F0',
                        padding: '2px 6px',
                        borderRadius: '4px',
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
      </section>

      {/* 8. Défis Techniques */}
      <section
        style={{
          padding: 'clamp(56px, 8vw, 88px) 0',
          backgroundColor: '#F4F7FB',
          borderBottom: '1px solid #DAE3ED',
        }}
      >
        <Container>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#19B8CD',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '8px',
              }}
            >
              {isEn ? '08 · Technical Challenges' : '08 · Défis Techniques'}
            </div>
            <h2 className="mt-h2" style={{ color: '#0B1730', marginBottom: '24px' }}>
              {isEn ? 'Engineering Complexities & Resolutions' : 'Complexités d’ingénierie et résolutions'}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {project.technicalChallenges.map((ch, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '14px',
                    border: '1px solid #DAE3ED',
                    padding: 'clamp(16px, 3.5vw, 24px) clamp(12px, 2.5vw, 24px)',
                  }}
                >
                  <h3 className="mt-h3" style={{ fontSize: '18px', color: '#0B1730', marginBottom: '8px' }}>
                    {ch.title}
                  </h3>
                  <p className="mt-body mt-muted" style={{ fontSize: '14px', lineHeight: 1.6, marginBottom: '14px' }}>
                    <strong>{isEn ? 'The challenge:' : 'La difficulté :'}</strong> {ch.description}
                  </p>
                  <div
                    style={{
                      borderTop: '1px solid #E2E8F0',
                      paddingTop: '12px',
                      fontSize: '14px',
                      color: '#172A46',
                    }}
                  >
                    <strong style={{ color: '#19B8CD', display: 'block', marginBottom: '4px' }}>
                      {isEn ? 'The applied technical solution:' : 'La solution technique appliquée :'}
                    </strong>
                    {ch.resolution}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 9 & 10. Résultats Vérifiés & Démo / Médias Autorisés */}
      <section
        style={{
          padding: 'clamp(56px, 8vw, 88px) 0',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #DAE3ED',
        }}
      >
        <Container>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
              gap: '32px',
            }}
          >
            {/* 9. Résultats Vérifiés */}
            <div
              style={{
                backgroundColor: '#F4F7FB',
                borderRadius: '14px',
                border: '1px solid #DAE3ED',
                padding: 'clamp(18px, 3.5vw, 28px) clamp(12px, 2.5vw, 28px)',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#19B8CD',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  marginBottom: '8px',
                }}
              >
                {isEn ? '09 · Verified Results' : '09 · Résultats Vérifiés'}
              </div>
              <h3 className="mt-h3" style={{ fontSize: '18px', color: '#0B1730', marginBottom: '14px' }}>
                {isEn ? 'Documented Factual Impact' : 'Impact factuel documenté'}
              </h3>

              {project.verifiedResults ? (
                <div>
                  {project.verifiedResults.metricHighlight && (
                    <div
                      style={{
                        fontSize: '24px',
                        fontWeight: 800,
                        color: '#0B1730',
                        fontFamily: 'Manrope, sans-serif',
                        marginBottom: '8px',
                      }}
                    >
                      {project.verifiedResults.metricHighlight}
                    </div>
                  )}
                  <p className="mt-body mt-muted" style={{ fontSize: '14px', lineHeight: 1.6, marginBottom: '12px' }}>
                    {project.verifiedResults.description}
                  </p>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>
                    <strong>{isEn ? 'Verifiable source:' : 'Source vérifiable :'}</strong> {project.verifiedResults.sourceOrEvidence}
                  </div>
                </div>
              ) : (
                <p className="mt-body mt-muted" style={{ fontSize: '14px', lineHeight: 1.6 }}>
                  {isEn
                    ? 'No external commercial metrics are claimed without third-party audit. The core software deliverables, architecture patterns, and deployed modules constitute the primary technical benchmark.'
                    : 'Aucune statistique commerciale externe non auditée n’est revendiquée pour ce projet. Seuls les livrables d’architecture logicielle et les modules effectivement programmés constituent la référence technique.'}
                </p>
              )}
            </div>

            {/* 10. Captures ou Démo Autorisées */}
            <div
              style={{
                backgroundColor: '#F4F7FB',
                borderRadius: '14px',
                border: '1px solid #DAE3ED',
                padding: 'clamp(18px, 3.5vw, 28px) clamp(12px, 2.5vw, 28px)',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#172A46',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  marginBottom: '8px',
                }}
              >
                {isEn ? '10 · Screenshots & Demonstrations' : '10 · Captures & Démonstrations'}
              </div>
              <h3 className="mt-h3" style={{ fontSize: '18px', color: '#0B1730', marginBottom: '14px' }}>
                {isEn ? 'Access & Confidentiality Policy' : 'Accès et politique de confidentialité'}
              </h3>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '16px' }}>
                {project.demoAndMedia.ndaProtected ? (
                  <Lock size={20} color="#DC2626" style={{ flexShrink: 0, marginTop: '2px' }} />
                ) : (
                  <CheckCircle2 size={20} color="#19B8CD" style={{ flexShrink: 0, marginTop: '2px' }} />
                )}
                <p style={{ margin: 0, fontSize: '14px', color: '#465670', lineHeight: 1.5 }}>
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
                      gap: '6px',
                      color: '#0B1730',
                      fontWeight: 600,
                      fontSize: '14px',
                      textDecoration: 'none',
                    }}
                  >
                    <span>{isEn ? 'View Public GitHub Repository' : 'Voir le dépôt public GitHub'}</span>
                    <ExternalLink size={14} color="#19B8CD" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* 11. CTA vers /devis */}
      <section
        style={{
          padding: 'clamp(64px, 8vw, 96px) 0',
          backgroundColor: '#0B1730',
          color: '#FFFFFF',
          textAlign: 'center',
        }}
      >
        <Container>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <span
              style={{
                display: 'inline-block',
                fontSize: '12px',
                fontWeight: 700,
                color: '#19B8CD',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '12px',
              }}
            >
              {isEn ? '11 · Ready to Engineer Your Solution?' : '11 · Prêt à Développer Votre Solution ?'}
            </span>

            <h2 className="mt-h2" style={{ color: '#FFFFFF', marginBottom: '16px' }}>
              {isEn ? 'Benefit from the Same Engineering Rigor' : 'Bénéficiez du même niveau d’exigence technique'}
            </h2>

            <p style={{ color: '#A5B4C7', fontSize: '16px', lineHeight: 1.6, marginBottom: '32px' }}>
              {isEn
                ? 'Looking to develop a robust mobile app, SaaS platform, or business software? Connect directly with Moussa Diagne to assess technical feasibility.'
                : 'Vous souhaitez développer une application mobile, une plateforme SaaS ou un logiciel métier robuste ? Échangez directement avec Moussa Diagne pour étudier la faisabilité technique de votre projet.'}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
              <LinkButton
                href={quoteHref}
                variant="primary"
                size="lg"
                style={{ backgroundColor: '#19B8CD', color: '#0B1730', border: '1px solid #19B8CD' }}
              >
                {isEn ? 'Request a Proposal for Your Project' : 'Demander un devis pour votre projet'}
              </LinkButton>

              <LinkButton
                href={isEn ? '/en/case-studies' : '/realisations'}
                variant="outline-light"
                size="lg"
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
