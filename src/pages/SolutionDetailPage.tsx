import React, { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  Sparkles,
  Users,
  Layers,
  Clock,
  Briefcase,
  FileText,
} from 'lucide-react';
import { Container } from '../design-system/Container';
import { SectionHeading } from '../design-system/SectionHeading';
import { FaqAccordion } from '../design-system/FaqAccordion';
import { LinkButton } from '../design-system/Button';
import { getSolutionBySlug } from '../content/solutionsData';
import { NavLink, useRouter } from '../lib/router';
import { updatePageMetadata } from '../lib/seoMetadata';
import { SOLUTION_SLUG_MAP } from '../lib/i18nRoutes';

interface SolutionDetailPageProps {
  slug: string;
}

export const SolutionDetailPage: React.FC<SolutionDetailPageProps> = ({ slug }) => {
  const { locale } = useRouter();
  const isEn = locale === 'en';
  const solution = getSolutionBySlug(slug, locale);

  useEffect(() => {
    if (solution) {
      const frSlug = SOLUTION_SLUG_MAP[slug]?.fr || slug;
      const enSlug = SOLUTION_SLUG_MAP[slug]?.en || slug;
      updatePageMetadata({
        title: isEn
          ? `${solution.sectorName} Industry Solutions | MusaTech Engineering`
          : solution.meta.title,
        description: isEn
          ? solution.hero.pitch
          : solution.meta.description,
        canonicalPath: isEn ? `/en/solutions/${enSlug}` : `/fr/solutions/${frSlug}`,
        frPath: `/fr/solutions/${frSlug}`,
        enPath: `/en/solutions/${enSlug}`,
        locale,
        breadcrumbs: [
          { name: isEn ? 'Home' : 'Accueil', path: isEn ? '/en' : '/fr' },
          { name: isEn ? 'Industry Solutions' : 'Solutions Sectorielles', path: isEn ? '/en/solutions' : '/fr/solutions' },
          { name: solution.sectorName, path: isEn ? `/en/solutions/${enSlug}` : `/fr/solutions/${frSlug}` },
        ],
        schemaType: 'service',
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [solution, slug, isEn, locale]);

  if (!solution) {
    return (
      <Container style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h1 className="mt-h2" style={{ color: '#0B1730', marginBottom: '16px' }}>
          {isEn ? 'Sector not found' : 'Secteur non trouvé'}
        </h1>
        <p className="mt-body mt-muted" style={{ marginBottom: '24px' }}>
          {isEn
            ? 'The requested industry solution does not exist or is being drafted.'
            : "La solution sectorielle demandée n'existe pas ou est en cours de structuration."}
        </p>
        <LinkButton href={isEn ? '/en/solutions' : '/solutions'} variant="primary">
          {isEn ? 'Back to Industry Solutions' : 'Retour aux solutions sectorielles'}
        </LinkButton>
      </Container>
    );
  }

  const isProposal = solution.status === 'draft_proposal';
  const quoteHref = isEn ? `/en/quote?sector=${solution.quoteSlug}` : `/fr/devis?sector=${solution.quoteSlug}`;

  return (
    <div className={`mt-solution-detail-page mt-solution-${solution.slug}`}>
      {/* 1. Hero Spécifique au Secteur */}
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
            <NavLink href={isEn ? '/en/solutions' : '/solutions'} style={{ color: '#172A46', textDecoration: 'none', fontWeight: 500 }}>
              {isEn ? 'Solutions' : 'Solutions'}
            </NavLink>
            <span>/</span>
            <span style={{ color: '#19B8CD', fontWeight: 600 }}>{solution.sectorName}</span>
          </div>

          {/* Draft banner si en attente de validation */}
          {isProposal && (
            <div
              style={{
                marginBottom: '24px',
                padding: '12px 18px',
                backgroundColor: '#FFFBEB',
                border: '1px solid #FDE68A',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '13px',
                color: '#92400E',
              }}
            >
              <AlertCircle size={18} color="#D97706" style={{ flexShrink: 0 }} />
              <span>
                <strong>{isEn ? 'Industry proposal under review:' : 'Proposition sectorielle en cours de validation :'}</strong>{' '}
                {isEn
                  ? `this outline constitutes our functional architecture proposal for the ${solution.sectorName} sector. Reach out to tailor it to your exact use case.`
                  : `ce contenu constitue notre proposition d'architecture fonctionnelle pour le secteur ${solution.sectorName}. Contactez-nous pour l'ajuster à votre cas d'usage.`}
              </span>
            </div>
          )}

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 520px), 1fr))',
              gap: '40px',
              alignItems: 'center',
            }}
          >
            <div>
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
                  marginBottom: '16px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                <Sparkles size={14} color="#19B8CD" />
                <span>{solution.hero.badge}</span>
              </div>

              <h1
                className="mt-h1"
                style={{
                  color: '#0B1730',
                  marginBottom: '16px',
                  lineHeight: 1.15,
                }}
              >
                {solution.hero.title}
              </h1>

              <p
                className="mt-body mt-muted"
                style={{
                  fontSize: '17px',
                  lineHeight: 1.6,
                  marginBottom: '16px',
                }}
              >
                {solution.hero.description}
              </p>

              <p
                style={{
                  fontSize: '14px',
                  color: '#172A46',
                  fontWeight: 500,
                  backgroundColor: '#F4F7FB',
                  borderLeft: '3px solid #19B8CD',
                  padding: '10px 14px',
                  borderRadius: '0 8px 8px 0',
                  marginBottom: '28px',
                }}
              >
                {solution.hero.pitch}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <LinkButton
                  href={quoteHref}
                  variant="primary"
                  size="lg"
                >
                  {isEn
                    ? `Request a quote for ${solution.sectorName}`
                    : `Demander un devis pour ${solution.sectorName}`}
                </LinkButton>
                <LinkButton href="#fonctionnalites" variant="secondary" size="lg">
                  {isEn ? 'Explore Capabilities' : 'Explorer les fonctionnalités'}
                </LinkButton>
              </div>
            </div>

            {/* Encadré Synthèse Métier */}
            <div
              style={{
                backgroundColor: '#0B1730',
                color: '#FFFFFF',
                borderRadius: '16px',
                padding: 'clamp(20px, 3.5vw, 32px) clamp(12px, 2.5vw, 32px)',
                boxShadow: '0 12px 32px rgba(11, 23, 48, 0.12)',
                border: '1px solid rgba(218, 227, 237, 0.15)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '20px',
                  borderBottom: '1px solid rgba(218, 227, 237, 0.15)',
                  paddingBottom: '16px',
                }}
              >
                <Layers size={22} color="#19B8CD" />
                <span style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '0.02em' }}>
                  {isEn ? 'Architecture & MusaTech Commitments' : 'Architecture & Engagements MusaTech'}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle2 size={18} color="#19B8CD" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#FFFFFF' }}>
                      {isEn ? '100% custom engineering:' : 'Développement 100 % sur mesure :'}
                    </strong>{' '}
                    {isEn
                      ? 'no rigid templates, modeled strictly around your operational rules.'
                      : 'aucune contrainte de modèle rigide, adapté à vos règles de gestion.'}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle2 size={18} color="#19B8CD" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#FFFFFF' }}>
                      {isEn ? 'Mobile & local integration:' : 'Intégration mobile & locale :'}
                    </strong>{' '}
                    {isEn
                      ? 'Wave / Orange Money payments and WhatsApp gateways adapted to the regional market.'
                      : 'paiements Wave / Orange Money et passerelles WhatsApp adaptées au marché.'}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle2 size={18} color="#19B8CD" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#FFFFFF' }}>
                      {isEn ? 'Full code ownership:' : 'Propriété intégrale du code :'}
                    </strong>{' '}
                    {isEn
                      ? 'you own your platform and database, hosted on your dedicated servers.'
                      : 'vous êtes propriétaire de votre portail, hébergé sur vos propres serveurs.'}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CheckCircle2 size={18} color="#19B8CD" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#FFFFFF' }}>
                      {isEn ? 'Founder-led onboarding:' : 'Formation & Accompagnement :'}
                    </strong>{' '}
                    {isEn
                      ? 'personal technical training delivered directly by Moussa Diagne.'
                      : 'prise en main assurée directement par Moussa Diagne.'}
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: '24px',
                  paddingTop: '20px',
                  borderTop: '1px solid rgba(218, 227, 237, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ fontSize: '13px', color: '#94A3B8' }}>
                  {isEn ? 'Estimated delivery timeframe' : 'Délai indicatif moyen'}
                </span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#19B8CD' }}>
                  {isEn ? '3 to 6 weeks per milestone' : '3 à 6 semaines par lot'}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Problèmes Métier */}
      <section
        id="problemes"
        style={{
          padding: 'clamp(56px, 8vw, 96px) 0',
          backgroundColor: '#F4F7FB',
          borderBottom: '1px solid #DAE3ED',
        }}
      >
        <Container>
          <SectionHeading
            tag={isEn ? 'Operational Realities' : 'Constats de Terrain'}
            title={
              isEn
                ? 'What operational roadblocks do we solve in your business?'
                : 'Quels blocages résolvons-nous dans votre activité ?'
            }
            description={
              isEn
                ? 'Recurring friction slowing down enterprise growth and how our architecture neutralizes them.'
                : 'Les difficultés récurrentes qui ralentissent la croissance de votre entreprise et comment notre approche les neutralise.'
            }
            align="center"
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: '24px',
              marginTop: '40px',
            }}
          >
            {solution.problems.map((prob, idx) => (
              <div
                key={idx}
                className="mt-card"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #DAE3ED',
                  padding: 'clamp(18px, 3.5vw, 28px) clamp(12px, 2.5vw, 28px)',
                  boxShadow: '0 4px 12px rgba(11, 23, 48, 0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      color: '#DC2626',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                    }}
                  >
                    <AlertCircle size={20} />
                  </div>

                  <h3
                    className="mt-h3"
                    style={{
                      fontSize: '18px',
                      color: '#0B1730',
                      marginBottom: '10px',
                      lineHeight: 1.35,
                    }}
                  >
                    {prob.title}
                  </h3>

                  <p
                    className="mt-body mt-muted"
                    style={{ fontSize: '14px', lineHeight: 1.6, marginBottom: '14px' }}
                  >
                    {prob.problem}
                  </p>

                  <div
                    style={{
                      fontSize: '13px',
                      color: '#7F1D1D',
                      backgroundColor: '#FEF2F2',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      marginBottom: '20px',
                    }}
                  >
                    <strong>{isEn ? 'Observed impact:' : 'Impact observé :'}</strong> {prob.impact}
                  </div>
                </div>

                <div
                  style={{
                    borderTop: '1px solid #E2E8F0',
                    paddingTop: '16px',
                    fontSize: '14px',
                    color: '#0B1730',
                  }}
                >
                  <strong style={{ color: '#19B8CD', display: 'block', marginBottom: '4px' }}>
                    {isEn ? 'The MusaTech solution:' : 'La réponse MusaTech :'}
                  </strong>
                  {prob.solutionBenefit}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Solutions & Fonctionnalités Possibles */}
      <section
        id="fonctionnalites"
        style={{
          padding: 'clamp(56px, 8vw, 96px) 0',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #DAE3ED',
        }}
      >
        <Container>
          <SectionHeading
            tag={isEn ? 'Available Capabilities' : 'Fonctionnalités Disponibles'}
            title={
              isEn
                ? 'What MusaTech can engineer for your organization'
                : 'Ce que MusaTech peut développer pour votre organisation'
            }
            description={
              isEn
                ? 'A curated catalog of modular components configurable to your exact workflow specifications.'
                : 'Une sélection de modules configurables et développables selon vos règles de gestion précises. Chaque brique est personnalisable.'
            }
            align="center"
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: '24px',
              marginTop: '40px',
            }}
          >
            {solution.features.map((feat, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: feat.isOption ? '#F8FAFC' : '#F4F7FB',
                  borderRadius: '14px',
                  border: feat.isOption ? '1px dashed #94A3B8' : '1px solid #DAE3ED',
                  padding: 'clamp(16px, 3.5vw, 24px) clamp(12px, 2.5vw, 24px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        color: feat.isOption ? '#475569' : '#19B8CD',
                        backgroundColor: feat.isOption ? '#E2E8F0' : 'rgba(25, 184, 205, 0.15)',
                        padding: '4px 8px',
                        borderRadius: '4px',
                      }}
                    >
                      {feat.category}
                    </span>

                    {feat.isOption && (
                      <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
                        {isEn ? 'Optional module' : 'Module optionnel'}
                      </span>
                    )}
                  </div>

                  <h3
                    className="mt-h3"
                    style={{
                      fontSize: '18px',
                      color: '#0B1730',
                      marginBottom: '8px',
                      lineHeight: 1.3,
                    }}
                  >
                    {feat.title}
                  </h3>

                  <p
                    className="mt-body mt-muted"
                    style={{ fontSize: '14px', lineHeight: 1.6 }}
                  >
                    {feat.description}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: '16px',
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(218, 227, 237, 0.8)',
                    fontSize: '12px',
                    color: '#64748B',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <CheckCircle2 size={14} color="#19B8CD" />
                  <span>
                    {isEn
                      ? 'Custom-built to match your precise specifications'
                      : 'Développable sur mesure selon votre cahier des charges'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: '32px',
              textAlign: 'center',
              fontSize: '13px',
              color: '#64748B',
            }}
          >
            {isEn
              ? '* The capabilities above represent our custom engineering scope and are estimated according to your specific requirements.'
              : 'Les fonctionnalités ci-dessus constituent notre offre de développement sur mesure et font l’objet d’un chiffrage adapté à votre périmètre exact.'}
          </div>
        </Container>
      </section>

      {/* 4. Bénéfices Métier */}
      <section
        id="benefices"
        style={{
          padding: 'clamp(56px, 8vw, 96px) 0',
          backgroundColor: '#F4F7FB',
          borderBottom: '1px solid #DAE3ED',
        }}
      >
        <Container>
          <SectionHeading
            tag={isEn ? 'Business Return' : 'Valeur Ajoutée'}
            title={
              isEn
                ? 'Measurable operational impact for your organization'
                : 'Les bénéfices concrets pour votre structure'
            }
            description={
              isEn
                ? 'Investing in dedicated software yields tangible ROI from the earliest rollout phases.'
                : "Investir dans une solution dédiée génère un retour sur investissement mesurable dès les premières semaines d'exploitation."
            }
            align="center"
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: '24px',
              marginTop: '40px',
            }}
          >
            {solution.benefits.map((ben, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '14px',
                  border: '1px solid #DAE3ED',
                  padding: 'clamp(16px, 3.5vw, 24px) clamp(12px, 2.5vw, 24px)',
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
                  {ben.highlight}
                </div>
                <h3 className="mt-h3" style={{ fontSize: '18px', color: '#0B1730', marginBottom: '8px' }}>
                  {ben.title}
                </h3>
                <p className="mt-body mt-muted" style={{ fontSize: '14px', lineHeight: 1.6 }}>
                  {ben.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Exemple de Parcours Utilisateur */}
      <section
        id="parcours"
        style={{
          padding: 'clamp(56px, 8vw, 96px) 0',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #DAE3ED',
        }}
      >
        <Container>
          <div style={{ maxWidth: '880px', margin: '0 auto' }}>
            <SectionHeading
              tag={isEn ? 'Real-World Workflow' : "Cas d'Usage Réel"}
              title={solution.userFlow.title}
              description={solution.userFlow.subtitle}
              align="center"
            />

            <div
              style={{
                marginTop: '48px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {solution.userFlow.steps.map((st) => (
                <div
                  key={st.stepNumber}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '20px',
                    backgroundColor: '#F4F7FB',
                    border: '1px solid #DAE3ED',
                    borderRadius: '12px',
                    padding: '16px clamp(10px, 2.5vw, 20px)',
                    alignItems: 'flex-start',
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: '#172A46',
                      color: '#19B8CD',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '16px',
                      flexShrink: 0,
                      fontFamily: 'Manrope, sans-serif',
                    }}
                  >
                    {st.stepNumber}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '6px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          backgroundColor: '#E9F1F7',
                          color: '#172A46',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          textTransform: 'uppercase',
                        }}
                      >
                        {st.actor}
                      </span>
                      <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0B1730', margin: 0 }}>
                        {st.action}
                      </h4>
                    </div>

                    <p style={{ margin: 0, fontSize: '14px', color: '#465670', lineHeight: 1.5 }}>
                      {st.outcome}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 6. Réalisations Pertinentes ou Transparence */}
      <section
        id="realisations"
        style={{
          padding: 'clamp(56px, 8vw, 96px) 0',
          backgroundColor: '#F4F7FB',
          borderBottom: '1px solid #DAE3ED',
        }}
      >
        <Container>
          <div style={{ maxWidth: '880px', margin: '0 auto' }}>
            <SectionHeading
              tag={isEn ? 'Case References & Experience' : 'Références & Expérience'}
              title={isEn ? 'Our technical provenance in this domain' : 'Notre légitimité technique sur ce domaine'}
              description={
                isEn
                  ? 'At MusaTech, we only present verified client engagements without fabricating fake sector portfolio items.'
                  : 'Chez MusaTech, nous présentons uniquement des expériences vérifiables sans inventer de projets sectoriels factices.'
              }
              align="center"
            />

            <div style={{ marginTop: '36px' }}>
              {solution.relatedProject ? (
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #DAE3ED',
                    borderRadius: '16px',
                    padding: 'clamp(20px, 3.5vw, 32px) clamp(12px, 2.5vw, 32px)',
                    boxShadow: '0 4px 16px rgba(11, 23, 48, 0.04)',
                  }}
                >
                  <div
                    style={{
                      display: 'inline-block',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#19B8CD',
                      backgroundColor: 'rgba(25, 184, 205, 0.1)',
                      padding: '4px 10px',
                      borderRadius: '100px',
                      marginBottom: '12px',
                    }}
                  >
                    {isEn ? 'Verified Case Study' : 'Réalisation Vérifiable'}
                  </div>

                  <h3 className="mt-h3" style={{ fontSize: '22px', color: '#0B1730', marginBottom: '8px' }}>
                    {solution.relatedProject.name}
                  </h3>

                  {solution.relatedProject.metric && (
                    <div
                      style={{
                        fontSize: '15px',
                        fontWeight: 700,
                        color: '#172A46',
                        marginBottom: '14px',
                      }}
                    >
                      {solution.relatedProject.metric}
                    </div>
                  )}

                  <p className="mt-body mt-muted" style={{ fontSize: '15px', lineHeight: 1.6, marginBottom: '16px' }}>
                    {solution.relatedProject.context}
                  </p>

                  <div
                    style={{
                      backgroundColor: '#F4F7FB',
                      borderLeft: '3px solid #172A46',
                      padding: '12px 16px',
                      borderRadius: '0 8px 8px 0',
                      marginBottom: '20px',
                      fontSize: '14px',
                      color: '#172A46',
                    }}
                  >
                    <strong>{isEn ? "Founder's verified role:" : 'Rôle réel du développeur :'}</strong>{' '}
                    {solution.relatedProject.founderRole}
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {solution.relatedProject.stack.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontSize: '12px',
                          backgroundColor: '#E9F1F7',
                          color: '#172A46',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontWeight: 500,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #DAE3ED',
                    borderRadius: '16px',
                    padding: 'clamp(20px, 3.5vw, 32px) clamp(12px, 2.5vw, 32px)',
                    textAlign: 'left',
                  }}
                >
                  <div
                    style={{
                      display: 'inline-block',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#172A46',
                      backgroundColor: '#E9F1F7',
                      padding: '4px 10px',
                      borderRadius: '100px',
                      marginBottom: '12px',
                    }}
                  >
                    {isEn ? 'Transparency & Client Confidentiality' : 'Transparence & Confidentialité'}
                  </div>

                  <h3 className="mt-h3" style={{ fontSize: '20px', color: '#0B1730', marginBottom: '12px' }}>
                    {isEn
                      ? 'Proven Foundation & Client Data Protection'
                      : 'Socle éprouvé & protection des données clients'}
                  </h3>

                  <p className="mt-body mt-muted" style={{ fontSize: '15px', lineHeight: 1.6, marginBottom: '16px' }}>
                    {isEn
                      ? 'MusaTech builds platforms on our battle-tested engineering stack (NestJS, PostgreSQL, React). Out of respect for client trust and non-disclosure agreements (NDA), we never publicly expose proprietary dashboards, metrics, or internal workflows without express authorization.'
                      : "MusaTech conçoit des plateformes basées sur nos composants éprouvés de gestion (NestJS, PostgreSQL, React). Par respect pour nos clients et nos engagements de confidentialité (NDA), nous ne divulguons pas de statistiques ou de captures d'outils internes privés sans autorisation expresse."}
                  </p>

                  <p className="mt-body mt-muted" style={{ fontSize: '15px', lineHeight: 1.6 }}>
                    {isEn
                      ? 'During our initial technical discovery call, we can demonstrate interactive functional workflows illustrating the exact filtering, reporting, and permission mechanisms tailored to your organization.'
                      : "Lors de notre premier échange de cadrage, nous pouvons vous présenter des démonstrations fonctionnelles interactives illustrant exactement les mécanismes de gestion, de filtrage et d'alertes adaptés à votre cas d'usage."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* 7. FAQ Sectorielle */}
      <section
        id="faq"
        style={{
          padding: 'clamp(56px, 8vw, 96px) 0',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #DAE3ED',
        }}
      >
        <Container>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <SectionHeading
              tag={isEn ? 'Industry FAQ' : 'FAQ Métier'}
              title={
                isEn
                  ? `Frequently Asked Questions About ${solution.sectorName}`
                  : `Questions fréquentes sur l'offre ${solution.sectorName}`
              }
              description={
                isEn
                  ? 'Direct answers to your technical, operational, and commercial questions.'
                  : 'Les réponses concrètes à vos interrogations techniques, contractuelles et financières.'
              }
              align="center"
            />

            <div style={{ marginTop: '40px' }}>
              <FaqAccordion items={solution.faq} idPrefix={`solution-faq-${solution.slug}`} />
            </div>
          </div>
        </Container>
      </section>

      {/* 8. Demande de Devis avec Présélection */}
      <section
        id="devis-cta"
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
              {isEn ? 'Ready to Take the Next Step?' : 'Prêt à franchir le pas ?'}
            </span>

            <h2 className="mt-h2" style={{ color: '#FFFFFF', marginBottom: '16px' }}>
              {isEn
                ? `Digitize your ${solution.sectorName.toLowerCase()} operations`
                : `Digitalisons vos opérations ${solution.sectorName.toLowerCase()}`}
            </h2>

            <p style={{ color: '#A5B4C7', fontSize: '16px', lineHeight: 1.6, marginBottom: '32px' }}>
              {isEn
                ? 'Describe your organization and core operational needs. Moussa Diagne will evaluate your requirements and return a detailed technical and commercial proposal within 24 to 48 business hours.'
                : 'Décrivez votre structure et vos besoins essentiels. Moussa Diagne étudiera votre projet et vous transmettra une proposition technique et financière personnalisée sous 24 à 48 heures ouvrées.'}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
              <LinkButton
                href={quoteHref}
                variant="primary"
                size="lg"
              >
                {isEn
                  ? `Request a quote for ${solution.sectorName}`
                  : `Demander un devis pour ${solution.sectorName}`}
              </LinkButton>

              <LinkButton
                href={isEn ? '/en/solutions' : '/solutions'}
                variant="outline-light"
                size="lg"
              >
                {isEn ? 'View all industry solutions' : 'Voir tous les secteurs'}
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
