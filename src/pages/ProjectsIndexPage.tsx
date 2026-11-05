import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  Layers,
  Code2,
  Users,
  Briefcase,
  ExternalLink,
} from 'lucide-react';
import { Container } from '../design-system/Container';
import { LinkButton } from '../design-system/Button';
import { getAllProjects, ProjectNature } from '../content/projectsData';
import { NavLink, useRouter } from '../lib/router';
import { updatePageMetadata } from '../lib/seoMetadata';
import { trackProjectViewed } from '../lib/analytics';

export const ProjectsIndexPage: React.FC = () => {
  const { locale } = useRouter();
  const isEn = locale === 'en';
  const projects = getAllProjects(locale);
  const [selectedSector, setSelectedSector] = useState<string>('all');

  useEffect(() => {
    updatePageMetadata({
      title: isEn
        ? 'Technical Case Studies & Real-World Projects | MusaTech Dakar'
        : 'Réalisations & Études de Cas Techniques | MusaTech Dakar',
      description: isEn
        ? 'Explore verified production platforms engineered by Moussa Diagne: InsurTech mobile app, telemedicine, AI-powered EdTech, and enterprise logistics.'
        : 'Explorez nos études de cas réelles et vérifiées : InsurTech mobile, télémédecine, EdTech IA et logistique internationale.',
      canonicalPath: isEn ? '/en/case-studies' : '/fr/realisations',
      frPath: '/fr/realisations',
      enPath: '/en/case-studies',
      locale,
      breadcrumbs: [
        { name: isEn ? 'Home' : 'Accueil', path: isEn ? '/en' : '/fr' },
        { name: isEn ? 'Case Studies' : 'Réalisations', path: isEn ? '/en/case-studies' : '/fr/realisations' },
      ],
      schemaType: 'case-study',
    });
    trackProjectViewed({ projectSlug: 'all', locale });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isEn, locale]);

  const sectors = isEn
    ? [
        { id: 'all', label: 'All Case Studies' },
        { id: 'InsurTech & Insurance', label: 'InsurTech & Mobile' },
        { id: 'HealthTech & Telemedicine', label: 'HealthTech & WebRTC' },
        { id: 'EdTech & AI Pedagogy', label: 'EdTech & AI' },
        { id: 'Logistics & International Freight Forwarding', label: 'Logistics & CRM' },
      ]
    : [
        { id: 'all', label: 'Toutes les réalisations' },
        { id: 'InsurTech & Assurance', label: 'InsurTech & Mobile' },
        { id: 'HealthTech & Santé', label: 'Santé & WebRTC' },
        { id: 'EdTech & Pédagogie IA', label: 'EdTech & IA' },
        { id: 'Logistique & Transport International', label: 'Logistique & CRM' },
      ];

  const filteredProjects =
    selectedSector === 'all'
      ? projects
      : projects.filter((p) => p.sector === selectedSector);

  const getNatureBadgeStyle = (nature: ProjectNature) => {
    switch (nature) {
      case 'personal_project':
        return {
          bg: '#E0F2FE',
          color: '#0369A1',
          border: '1px solid #BAE6FD',
          icon: <Code2 size={13} />,
        };
      case 'freelance_mission':
        return {
          bg: '#FEF3C7',
          color: '#B45309',
          border: '1px solid #FDE68A',
          icon: <Briefcase size={13} />,
        };
      case 'team_project':
        return {
          bg: '#F3E8FF',
          color: '#7E22CE',
          border: '1px solid #E9D5FF',
          icon: <Users size={13} />,
        };
      case 'employee_project':
        return {
          bg: '#DCFCE7',
          color: '#15803D',
          border: '1px solid #BBF7D0',
          icon: <Layers size={13} />,
        };
      default:
        return {
          bg: '#F1F5F9',
          color: '#475569',
          border: '1px solid #E2E8F0',
          icon: <Code2 size={13} />,
        };
    }
  };

  return (
    <div className="mt-page-projects">
      {/* 1. Hero Section */}
      <section
        style={{
          paddingTop: 'clamp(56px, 8vw, 96px)',
          paddingBottom: 'clamp(56px, 8vw, 80px)',
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
            <span style={{ color: '#19B8CD', fontWeight: 600 }}>
              {isEn ? 'Case Studies' : 'Réalisations'}
            </span>
          </div>

          <div style={{ maxWidth: '840px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                backgroundColor: 'rgba(25, 184, 205, 0.1)',
                border: '1px solid rgba(25, 184, 205, 0.25)',
                borderRadius: '100px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#172A46',
                marginBottom: '20px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              <Sparkles size={14} color="#19B8CD" />
              <span>{isEn ? 'Verified Case Studies & Production Systems' : 'Études de Cas & Projets Vérifiés'}</span>
            </div>

            <h1
              className="mt-h1"
              style={{
                color: '#0B1730',
                marginBottom: '20px',
                lineHeight: 1.15,
              }}
            >
              {isEn
                ? 'Production platforms engineered for real-world impact.'
                : 'Des projets concrets, des solutions utiles.'}
            </h1>

            <p
              className="mt-body mt-muted"
              style={{
                fontSize: '18px',
                lineHeight: 1.6,
                marginBottom: '32px',
              }}
            >
              {isEn
                ? 'Explore production web apps, mobile solutions, and enterprise software engineered by Moussa Diagne. We document the exact business context, engineering challenges solved, and verified personal contributions for every engagement.'
                : 'Découvrez les applications web, mobiles et plateformes logicielles sur lesquelles Moussa Diagne est intervenu. Nous documentons avec exactitude le contexte de chaque projet, les défis techniques relevés et la contribution personnelle apportée.'}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <LinkButton href={isEn ? '/en/quote' : '/fr/devis'} variant="primary" size="lg">
                {isEn ? 'Start Your Project With MusaTech' : 'Démarrer votre projet avec MusaTech'}
              </LinkButton>
              <LinkButton href={isEn ? '/en/services' : '/services'} variant="secondary" size="lg">
                {isEn ? 'Explore Services & Pricing' : 'Consulter les tarifs & services'}
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Encadré d'Éthique & Déontologie */}
      <section
        style={{
          padding: '24px 0',
          backgroundColor: '#F8FAFC',
          borderBottom: '1px solid #DAE3ED',
        }}
      >
        <Container>
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '16px clamp(12px, 2.5vw, 24px)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ShieldCheck size={24} color="#19B8CD" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '14px', color: '#1E293B', lineHeight: 1.5 }}>
                <strong>
                  {isEn ? 'Authorship & Provenance Transparency:' : 'Transparence de paternité :'}
                </strong>{' '}
                {isEn
                  ? 'MusaTech strictly distinguishes personal open-source projects from freelance consulting missions, team products, and employer engagements. No client metric or claim is exaggerated.'
                  : 'MusaTech distingue explicitement les projets personnels des missions freelance, des contributions en équipe et des projets réalisés pour un employeur. Aucun résultat n’est inventé ni surévalué.'}
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '11px', fontWeight: 600 }}>
              <span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: '#E0F2FE', color: '#0369A1' }}>
                {isEn ? 'Personal Project' : 'Projet personnel'}
              </span>
              <span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: '#FEF3C7', color: '#B45309' }}>
                {isEn ? 'Freelance Engagement' : 'Mission freelance'}
              </span>
              <span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: '#F3E8FF', color: '#7E22CE' }}>
                {isEn ? 'Team Collaboration' : 'Réalisé en équipe'}
              </span>
              <span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: '#DCFCE7', color: '#15803D' }}>
                {isEn ? 'Employer Product' : 'Pour un employeur'}
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Filtres & Grille des Réalisations */}
      <section
        style={{
          padding: 'clamp(56px, 8vw, 96px) 0',
          backgroundColor: '#F4F7FB',
          borderBottom: '1px solid #DAE3ED',
        }}
      >
        <Container>
          {/* Onglets Filtres */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              marginBottom: '40px',
              justifyContent: 'center',
            }}
          >
            {sectors.map((sec) => {
              const isActive = selectedSector === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setSelectedSector(sec.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '100px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: isActive ? '1px solid #0B1730' : '1px solid #DAE3ED',
                    backgroundColor: isActive ? '#0B1730' : '#FFFFFF',
                    color: isActive ? '#FFFFFF' : '#465670',
                  }}
                >
                  {sec.label}
                </button>
              );
            })}
          </div>

          {/* Grille de cartes */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 540px), 1fr))',
              gap: '28px',
            }}
          >
            {filteredProjects.map((project) => {
              const badge = getNatureBadgeStyle(project.nature);
              const detailHref = isEn ? `/en/case-studies/${project.slug}` : `/realisations/${project.slug}`;

              return (
                <article
                  key={project.slug}
                  className="mt-project-listing-card"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #DAE3ED',
                    padding: 'clamp(18px, 3.5vw, 36px) clamp(12px, 2.5vw, 32px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 16px rgba(11, 23, 48, 0.04)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                >
                  <div>
                    {/* Header carte : Badges nature et secteur */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '10px',
                        marginBottom: '18px',
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '4px 10px',
                          borderRadius: '100px',
                          backgroundColor: badge.bg,
                          color: badge.color,
                          border: badge.border,
                          textTransform: 'uppercase',
                          letterSpacing: '0.03em',
                        }}
                      >
                        {badge.icon}
                        <span>{project.natureLabel}</span>
                      </span>

                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#465670',
                          backgroundColor: '#F4F7FB',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          border: '1px solid #E2E8F0',
                        }}
                      >
                        {project.year}
                      </span>
                    </div>

                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#19B8CD', marginBottom: '6px' }}>
                      {project.sector} · {project.solutionType}
                    </div>

                    <h2
                      className="mt-h3"
                      style={{
                        fontSize: '22px',
                        color: '#0B1730',
                        marginBottom: '10px',
                        lineHeight: 1.3,
                      }}
                    >
                      {project.name}
                    </h2>

                    <p
                      className="mt-body mt-muted"
                      style={{
                        fontSize: '15px',
                        lineHeight: 1.6,
                        marginBottom: '18px',
                      }}
                    >
                      {project.shortSummary}
                    </p>

                    {/* Rôle exact */}
                    <div
                      style={{
                        backgroundColor: '#F8FAFC',
                        borderLeft: '3px solid #172A46',
                        padding: '10px 14px',
                        borderRadius: '0 6px 6px 0',
                        marginBottom: '20px',
                        fontSize: '13px',
                        color: '#1E293B',
                      }}
                    >
                      <strong>{isEn ? 'Contribution:' : 'Contribution :'}</strong> {project.personalContribution.roleTitle}
                    </div>

                    {/* Stack technique */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                      {project.technologies.slice(0, 6).map((tech) => (
                        <span
                          key={tech.name}
                          style={{
                            fontSize: '12px',
                            backgroundColor: '#F1F5F9',
                            color: '#1E293B',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            fontWeight: 500,
                          }}
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions bas de carte */}
                  <div
                    style={{
                      borderTop: '1px solid #DAE3ED',
                      paddingTop: '20px',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                    }}
                  >
                    <NavLink
                      href={detailHref}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: '#172A46',
                        fontWeight: 700,
                        fontSize: '14px',
                        textDecoration: 'none',
                      }}
                    >
                      <span>{isEn ? 'Read Technical Case Study' : 'Lire l’étude de cas technique'}</span>
                      <ArrowUpRight size={16} color="#19B8CD" />
                    </NavLink>

                    {project.demoAndMedia.githubRepoUrl && (
                      <a
                        href={project.demoAndMedia.githubRepoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '13px',
                          color: '#465670',
                          textDecoration: 'none',
                          fontWeight: 500,
                        }}
                      >
                        <ExternalLink size={14} />
                        <span>{isEn ? 'GitHub Code' : 'Code GitHub'}</span>
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 4. CTA Final */}
      <section
        style={{
          padding: 'clamp(64px, 8vw, 96px) 0',
          backgroundColor: '#FFFFFF',
          textAlign: 'center',
        }}
      >
        <Container>
          <div
            style={{
              maxWidth: '760px',
              margin: '0 auto',
              backgroundColor: '#0B1730',
              color: '#FFFFFF',
              borderRadius: '20px',
              padding: 'clamp(36px, 6vw, 56px) 24px',
              boxShadow: '0 12px 32px rgba(11, 23, 48, 0.1)',
            }}
          >
            <h2 className="mt-h2" style={{ color: '#FFFFFF', marginBottom: '16px' }}>
              {isEn ? 'Have a similar software project in mind?' : 'Un projet digital similaire à concrétiser ?'}
            </h2>
            <p style={{ color: '#A5B4C7', fontSize: '16px', lineHeight: 1.6, marginBottom: '28px' }}>
              {isEn
                ? 'Whether you need a cross-platform mobile app, a high-performance NestJS backend, or a complete operational CRM, MusaTech applies this engineering discipline to accelerate your business.'
                : 'Que vous ayez besoin d’un MVP mobile, d’une API NestJS performante ou d’un logiciel métier complet, MusaTech met cette rigueur technique au service de votre croissance.'}
            </p>
            <LinkButton
              href={isEn ? '/en/quote' : '/fr/devis'}
              variant="primary"
              size="lg"
              style={{ backgroundColor: '#19B8CD', color: '#0B1730', border: '1px solid #19B8CD' }}
            >
              {isEn ? 'Request a Proposal For Your Project' : 'Demander un devis pour votre projet'}
            </LinkButton>
          </div>
        </Container>
      </section>
    </div>
  );
};
