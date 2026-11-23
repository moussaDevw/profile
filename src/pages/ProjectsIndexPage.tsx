import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  ShieldCheck,
  Layers,
  Code2,
  Users,
  Briefcase,
  ExternalLink,
  Check,
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

  const stagePalettes = [
    { bg: '#D9F2EE', tagBg: '#BAE6DF', tagColor: '#0A4B3E', accent: '#0E6049' },
    { bg: '#FCE8EC', tagBg: '#F9CED8', tagColor: '#831843', accent: '#BE123C' },
    { bg: '#FBF0E4', tagBg: '#F6DCC0', tagColor: '#7C2D12', accent: '#B45309' },
    { bg: '#EEF2FF', tagBg: '#D8E1FF', tagColor: '#1E3A8A', accent: '#4338CA' },
  ];

  return (
    <div className="mt-page-projects">
      {/* 1. Hero Section — Ouverture Centrée & Aérée Style Alan.com 100% Pleine Largeur */}
      <section
        style={{
          width: '100%',
          paddingTop: 'clamp(52px, 7vw, 88px)',
          paddingBottom: 'clamp(44px, 6vw, 72px)',
          backgroundColor: '#FAF8F5',
          borderBottom: '1px solid #EAE6DF',
        }}
      >
        <Container>
          {/* Breadcrumb */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '13px',
              color: '#465670',
              marginBottom: '22px',
            }}
          >
            <NavLink href={isEn ? '/en' : '/'} style={{ color: '#0B1730', textDecoration: 'none', fontWeight: 700 }}>
              {isEn ? 'Home' : 'Accueil'}
            </NavLink>
            <span>/</span>
            <span style={{ color: '#0E6049', fontWeight: 800 }}>
              {isEn ? 'Case Studies' : 'Réalisations'}
            </span>
          </div>

          <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                backgroundColor: '#FFFFFF',
                borderRadius: '9999px',
                fontSize: '12.5px',
                fontWeight: 800,
                color: '#0B1730',
                boxShadow: '0 4px 14px rgba(11, 23, 48, 0.05)',
                marginBottom: '22px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0E6049' }} />
              <span>{isEn ? 'Verified Case Studies & Production Systems' : 'Études de Cas & Projets Vérifiés'}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mt-h1"
              style={{
                color: '#0B1730',
                marginBottom: '20px',
                lineHeight: 1.08,
                fontSize: 'clamp(36px, 5vw, 58px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
              }}
            >
              {isEn
                ? 'Production platforms engineered for real-world impact.'
                : 'Des projets concrets, des solutions utiles.'}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-body"
              style={{
                color: '#3B4A5E',
                fontSize: 'clamp(17px, 2vw, 19.5px)',
                lineHeight: 1.62,
                maxWidth: '720px',
                margin: '0 auto 30px',
              }}
            >
              {isEn
                ? 'Explore production web apps, mobile solutions, and enterprise software engineered by Moussa Diagne. We document the exact business context, engineering challenges solved, and verified personal contributions for every engagement.'
                : 'Découvrez les applications web, mobiles et plateformes logicielles sur lesquelles Moussa Diagne est intervenu. Nous documentons avec exactitude le contexte de chaque projet, les défis techniques relevés et la contribution personnelle apportée.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px', marginBottom: '36px' }}
            >
              <LinkButton
                href={isEn ? '/en/quote' : '/fr/devis'}
                variant="primary"
                size="lg"
                style={{
                  borderRadius: '9999px',
                  backgroundColor: '#0B1730',
                  color: '#FFFFFF',
                  paddingLeft: '30px',
                  paddingRight: '30px',
                }}
              >
                {isEn ? 'Start Your Project With MusaTech' : 'Démarrer votre projet avec MusaTech'}
              </LinkButton>
              <LinkButton
                href={isEn ? '/en/services' : '/services'}
                variant="outline"
                size="lg"
                style={{
                  borderRadius: '9999px',
                  backgroundColor: '#FFFFFF',
                  paddingLeft: '28px',
                  paddingRight: '28px',
                }}
              >
                {isEn ? 'Explore Services & Pricing' : 'Consulter les tarifs & services'}
              </LinkButton>
            </motion.div>

            {/* Encadré d'Éthique & Déontologie en Carte Flottante Blanche Alan */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '28px',
                padding: '20px 26px',
                boxShadow: '0 14px 34px -10px rgba(11, 23, 48, 0.06)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                textAlign: 'left',
                marginBottom: '32px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: '1 1 420px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '14px',
                    backgroundColor: '#D9F2EE',
                    color: '#0E6049',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <ShieldCheck size={22} />
                </div>
                <div style={{ fontSize: '13.5px', color: '#1E293B', lineHeight: 1.55 }}>
                  <strong>
                    {isEn ? 'Authorship & Provenance Transparency:' : 'Transparence de paternité :'}
                  </strong>{' '}
                  {isEn
                    ? 'MusaTech strictly distinguishes personal open-source projects from freelance consulting missions, team products, and employer engagements. No client metric or claim is exaggerated.'
                    : 'MusaTech distingue explicitement les projets personnels des missions freelance, des contributions en équipe et des projets réalisés pour un employeur. Aucun résultat n’est inventé ni surévalué.'}
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '11.5px', fontWeight: 700 }}>
                <span style={{ padding: '5px 12px', borderRadius: '9999px', backgroundColor: '#E0F2FE', color: '#0369A1' }}>
                  {isEn ? 'Personal Project' : 'Projet personnel'}
                </span>
                <span style={{ padding: '5px 12px', borderRadius: '9999px', backgroundColor: '#FEF3C7', color: '#B45309' }}>
                  {isEn ? 'Freelance Engagement' : 'Mission freelance'}
                </span>
                <span style={{ padding: '5px 12px', borderRadius: '9999px', backgroundColor: '#F3E8FF', color: '#7E22CE' }}>
                  {isEn ? 'Team Collaboration' : 'Réalisé en équipe'}
                </span>
                <span style={{ padding: '5px 12px', borderRadius: '9999px', backgroundColor: '#DCFCE7', color: '#15803D' }}>
                  {isEn ? 'Employer Product' : 'Pour un employeur'}
                </span>
              </div>
            </div>

            {/* Onglets Filtres Pilules */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
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
                      padding: '10px 20px',
                      borderRadius: '9999px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      border: isActive ? '1px solid #0B1730' : '1px solid #E2DDD5',
                      backgroundColor: isActive ? '#0B1730' : '#FFFFFF',
                      color: isActive ? '#FFFFFF' : '#0B1730',
                      boxShadow: isActive ? '0 6px 16px rgba(11, 23, 48, 0.14)' : 'none',
                    }}
                  >
                    {sec.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* 2. SCÈNES ÉTUDES DE CAS 100% PLEINE LARGEUR (BORD À BORD COMME SUR ALAN.COM) */}
      <section style={{ width: '100%' }}>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          {filteredProjects.map((project, idx) => {
            const badge = getNatureBadgeStyle(project.nature);
            const palette = stagePalettes[idx % stagePalettes.length];
            const detailHref = isEn ? `/en/case-studies/${project.slug}` : `/realisations/${project.slug}`;

            return (
              <motion.article
                key={project.slug}
                className="mt-project-listing-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ type: 'spring', stiffness: 80, damping: 18 }}
                style={{
                  width: '100%',
                  backgroundColor: palette.bg,
                  borderRadius: '0',
                  padding: 'clamp(52px, 7vw, 92px) 0',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Container>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                      gap: 'clamp(28px, 4.5vw, 52px)',
                      alignItems: 'center',
                    }}
                  >
                    {/* Colonne Gauche : Contexte, Titre, Résumé & Actions */}
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          gap: '10px',
                          marginBottom: '18px',
                        }}
                      >
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '11.5px',
                            fontWeight: 800,
                            padding: '6px 14px',
                            borderRadius: '9999px',
                            backgroundColor: badge.bg,
                            color: badge.color,
                            border: badge.border,
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                          }}
                        >
                          {badge.icon}
                          <span>{project.natureLabel}</span>
                        </span>

                        <span
                          style={{
                            fontSize: '12.5px',
                            fontWeight: 800,
                            color: palette.tagColor,
                            backgroundColor: palette.tagBg,
                            padding: '6px 14px',
                            borderRadius: '9999px',
                          }}
                        >
                          {project.year}
                        </span>
                      </div>

                      <div
                        style={{
                          fontSize: '13.5px',
                          fontWeight: 800,
                          color: palette.accent,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          marginBottom: '8px',
                        }}
                      >
                        {project.sector} · {project.solutionType}
                      </div>

                      <h2
                        className="mt-h3"
                        style={{
                          fontSize: 'clamp(28px, 3.6vw, 42px)',
                          fontWeight: 800,
                          color: '#0B1730',
                          marginBottom: '16px',
                          lineHeight: 1.12,
                          letterSpacing: '-0.025em',
                        }}
                      >
                        {project.name}
                      </h2>

                      <p
                        className="mt-body"
                        style={{
                          fontSize: '16px',
                          color: '#1E293B',
                          lineHeight: 1.65,
                          marginBottom: '26px',
                        }}
                      >
                        {project.shortSummary}
                      </p>

                      {/* Boutons d'action pilules */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px' }}>
                        <LinkButton
                          href={detailHref}
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
                          {isEn ? 'Read Technical Case Study' : 'Lire l’étude de cas technique'}
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
                              fontSize: '13.5px',
                              color: '#0B1730',
                              backgroundColor: '#FFFFFF',
                              padding: '12px 22px',
                              borderRadius: '9999px',
                              textDecoration: 'none',
                              fontWeight: 700,
                              boxShadow: '0 4px 12px rgba(11, 23, 48, 0.05)',
                            }}
                          >
                            <ExternalLink size={15} />
                            <span>{isEn ? 'GitHub Code' : 'Code GitHub'}</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Colonne Droite : Carte Flottante Blanche Rôle, Fonctionnalités & Stack */}
                    <motion.div
                      whileHover={{ y: -5, scale: 1.01 }}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '34px',
                        padding: 'clamp(24px, 3.5vw, 36px)',
                        boxShadow: '0 24px 52px -12px rgba(11, 23, 48, 0.09)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '18px',
                      }}
                    >
                      {/* Rôle exact */}
                      <div
                        style={{
                          backgroundColor: '#FAF8F5',
                          padding: '14px 18px',
                          borderRadius: '20px',
                          fontSize: '13.5px',
                          color: '#0B1730',
                        }}
                      >
                        <span
                          style={{
                            display: 'block',
                            fontSize: '11px',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            color: palette.accent,
                            marginBottom: '4px',
                          }}
                        >
                          {isEn ? 'Verified Contribution:' : 'Contribution :'}
                        </span>
                        <strong style={{ fontSize: '15px' }}>{project.personalContribution.roleTitle}</strong>
                      </div>

                      {/* Fonctionnalités livrées */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {project.mainFeatures.slice(0, 3).map((feat) => (
                          <div
                            key={feat}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              fontSize: '13.5px',
                              fontWeight: 600,
                              color: '#1E293B',
                            }}
                          >
                            <span
                              style={{
                                width: '22px',
                                height: '22px',
                                borderRadius: '50%',
                                backgroundColor: '#ECFDF5',
                                color: '#10B981',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                              }}
                            >
                              <Check size={13} strokeWidth={3} />
                            </span>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Stack technique */}
                      <div style={{ paddingTop: '12px', borderTop: '1px solid #F1EFEA' }}>
                        <div
                          style={{
                            fontSize: '11px',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            color: '#64748B',
                            marginBottom: '10px',
                          }}
                        >
                          {isEn ? 'Deployed Tech Stack' : 'Stack technique'}
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {project.technologies.slice(0, 6).map((tech) => (
                            <span
                              key={tech.name}
                              style={{
                                fontSize: '12px',
                                backgroundColor: palette.bg,
                                color: '#0B1730',
                                padding: '6px 14px',
                                borderRadius: '9999px',
                                fontWeight: 700,
                              }}
                            >
                              {tech.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </Container>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* 3. CTA Final — Pleine Largeur Vert Forêt Alan */}
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
          <div
            style={{
              maxWidth: '780px',
              margin: '0 auto',
            }}
          >
            <h2
              className="mt-h2"
              style={{
                color: '#FFFFFF',
                marginBottom: '16px',
                fontSize: 'clamp(30px, 4.2vw, 46px)',
                fontWeight: 800,
              }}
            >
              {isEn ? 'Have a similar software project in mind?' : 'Un projet digital similaire à concrétiser ?'}
            </h2>
            <p style={{ color: '#D1FAE5', fontSize: '17px', lineHeight: 1.62, marginBottom: '32px' }}>
              {isEn
                ? 'Whether you need a cross-platform mobile app, a high-performance NestJS backend, or a complete operational CRM, MusaTech applies this engineering discipline to accelerate your business.'
                : 'Que vous ayez besoin d’un MVP mobile, d’une API NestJS performante ou d’un logiciel métier complet, MusaTech met cette rigueur technique au service de votre croissance.'}
            </p>
            <LinkButton
              href={isEn ? '/en/quote' : '/fr/devis'}
              variant="primary"
              size="lg"
              icon={<ArrowUpRight size={16} />}
              style={{
                borderRadius: '9999px',
                backgroundColor: '#FFFFFF',
                color: '#0B1730',
                border: 'none',
                paddingLeft: '32px',
                paddingRight: '32px',
              }}
            >
              {isEn ? 'Request a Proposal For Your Project' : 'Demander un devis pour votre projet'}
            </LinkButton>
          </div>
        </Container>
      </section>
    </div>
  );
};
