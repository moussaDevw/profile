import React, { useEffect } from 'react';
import {
  Building2,
  GraduationCap,
  Store,
  Truck,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';
import { Container } from '../design-system/Container';
import { SectionHeading } from '../design-system/SectionHeading';
import { LinkButton } from '../design-system/Button';
import { getAllSolutions } from '../content/solutionsData';
import { METHOD_STEPS } from '../content/homeData';
import { NavLink, useRouter } from '../lib/router';
import { updatePageMetadata } from '../lib/seoMetadata';

export const SolutionsIndexPage: React.FC = () => {
  const { locale } = useRouter();
  const isEn = locale === 'en';
  const solutions = getAllSolutions(locale);
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0);

  useEffect(() => {
    updatePageMetadata({
      title: isEn
        ? 'Industry Solutions & Custom Business Software | MusaTech Dakar'
        : 'Solutions Sectorielles & Logiciels Métier sur Mesure | MusaTech Dakar',
      description: isEn
        ? 'Tailored digital solutions for Real Estate, Education, Retail, and Logistics. Purpose-built platforms engineered for local and international markets.'
        : 'Solutions digitales sur mesure pour Immobilier, Éducation, Commerce et Logistique. Des plateformes pensées pour vos réalités métier.',
      canonicalPath: isEn ? '/en/solutions' : '/fr/solutions',
      frPath: '/fr/solutions',
      enPath: '/en/solutions',
      locale,
      breadcrumbs: [
        { name: isEn ? 'Home' : 'Accueil', path: isEn ? '/en' : '/fr' },
        { name: isEn ? 'Industry Solutions' : 'Solutions Sectorielles', path: isEn ? '/en/solutions' : '/fr/solutions' },
      ],
      schemaType: 'service',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isEn, locale]);

  const getSectorIcon = (slug: string) => {
    switch (slug) {
      case 'immobilier':
      case 'real-estate':
        return <Building2 size={28} color="#19B8CD" />;
      case 'education':
        return <GraduationCap size={28} color="#172A46" />;
      case 'commerce':
      case 'retail':
        return <Store size={28} color="#19B8CD" />;
      case 'logistique':
      case 'logistics':
        return <Truck size={28} color="#172A46" />;
      default:
        return <Building2 size={28} color="#19B8CD" />;
    }
  };

  const generalSectorFaq = isEn
    ? [
        {
          q: 'How does MusaTech adapt to the specific realities of my industry?',
          a: 'We always begin with an operational immersion phase: analyzing your current paperwork, field communication channels (WhatsApp, phone, office desks), and local invoicing habits.',
        },
        {
          q: 'How long does it take to deploy an industry-specific platform?',
          a: 'For an operational portal or interactive catalog, the first testable deliverables are ready within 3 to 5 weeks. A staged roadmap enables your team to deploy priority features without waiting for the full rollout.',
        },
        {
          q: 'Can we integrate local payment gateways like Wave and Orange Money?',
          a: 'Yes. All our industry platforms natively integrate mobile money gateways operating in Senegal and West Africa, complete with automated receipt confirmations.',
        },
        {
          q: 'Am I dependent on MusaTech once the platform is delivered?',
          a: 'No. You retain 100% ownership of the source code, databases, and server configurations. Comprehensive documentation allows your organization to evolve the platform with complete independence.',
        },
      ]
    : [
        {
          q: 'Comment MusaTech s’adapte-t-il aux spécificités de mon secteur ?',
          a: 'Nous commençons systématiquement par une phase d’immersion dans vos processus réels : étude de vos formulaires existants, vos canaux de communication (WhatsApp, téléphone, bureau) et vos habitudes de facturation.',
        },
        {
          q: 'Combien de temps faut-il pour déployer une solution sectorielle ?',
          a: 'Pour un portail métier ou catalogue interactif, les premiers livrables testables sont mis à disposition sous 3 à 5 semaines. Une roadmap progressive permet de démarrer avec les fonctions prioritaires sans attendre la fin du projet.',
        },
        {
          q: 'Puis-je intégrer des paiements locaux comme Wave et Orange Money ?',
          a: 'Oui. Toutes nos solutions sectorielles intègrent nativement les passerelles de paiement mobile opérant au Sénégal et en Afrique de l’Ouest, avec accusé de réception automatique.',
        },
        {
          q: 'Suis-je dépendant de MusaTech une fois la plateforme livrée ?',
          a: 'Non. Vous êtes propriétaire à 100 % du code source, de la base de données et des accès serveurs. Une documentation complète vous permet de faire évoluer votre outil en toute indépendance.',
        },
      ];

  const methodSteps = isEn
    ? [
        {
          number: '01',
          title: 'Immersion & Business Scoping',
          description:
            'In-depth study of your internal processes, team roles, and operational blockers. Zero technical jargon, full focus on business efficiency.',
        },
        {
          number: '02',
          title: 'Architecture & Interactive Prototype',
          description:
            'UI/UX design, database schema modeling, and clickable prototype validation before writing the first line of production code.',
        },
        {
          number: '03',
          title: 'Agile Milestone Development',
          description:
            'Bi-weekly delivery sprints, live preview environments, and continuous code quality audits with automated test suites.',
        },
        {
          number: '04',
          title: 'Deployment & Team Onboarding',
          description:
            'Cloud infrastructure setup, end-to-end integration testing, full source code handover, and hands-on staff training.',
        },
      ]
    : METHOD_STEPS;

  return (
    <div className="mt-page-solutions">
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
              {isEn ? 'Industry Solutions' : 'Solutions Sectorielles'}
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
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              <Sparkles size={14} color="#19B8CD" />
              <span>{isEn ? 'B2B Industry Expertise' : 'Expertises Métier B2B'}</span>
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
                ? 'Software built for the operational realities of your industry.'
                : 'Des outils pensés pour les réalités de votre secteur.'}
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
                ? 'Every industry has distinct operational workflows, decision loops, and payment methods. MusaTech engineers custom web platforms and business applications tailored for real estate agencies, academic institutions, retailers, and logistics operators.'
                : 'Chaque métier a ses contraintes de terrain, ses circuits de décision et ses habitudes de paiement. MusaTech développe des plateformes web et applications sur mesure adaptées aux agences immobilières, établissements scolaires, commerces et acteurs de la logistique.'}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <LinkButton href={isEn ? '/en/quote' : '/#devis'} variant="primary" size="lg">
                {isEn ? 'Request a Custom Proposal' : 'Demander un devis personnalisé'}
              </LinkButton>
              <LinkButton href={isEn ? '/en/services' : '/services'} variant="secondary" size="lg">
                {isEn ? 'Explore Service Offerings' : 'Consulter nos offres de services'}
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Grille des Solutions Sectorielles */}
      <section
        style={{
          padding: 'clamp(56px, 8vw, 96px) 0',
          backgroundColor: '#F4F7FB',
          borderBottom: '1px solid #DAE3ED',
        }}
      >
        <Container>
          <SectionHeading
            tag={isEn ? 'Industry Directory' : 'Catalogue des Secteurs'}
            title={isEn ? 'Select your industry' : "Choisissez votre domaine d'activité"}
            description={
              isEn
                ? 'Discover how our dedicated platforms eliminate recurring operational bottlenecks in your sector.'
                : 'Découvrez comment nos plateformes résolvent les blocages opérationnels récurrents de votre métier.'
            }
            align="center"
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 540px), 1fr))',
              gap: '28px',
              marginTop: '40px',
            }}
          >
            {solutions.map((sol) => {
              const isProposal = sol.status === 'draft_proposal';
              const detailHref = isEn ? `/en/solutions/${sol.slug}` : `/solutions/${sol.slug}`;
              const quoteHref = isEn ? `/en/quote?sector=${sol.slug}` : `/#devis?sector=${sol.slug}`;

              return (
                <div
                  key={sol.slug}
                  className="mt-solution-sector-card"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #DAE3ED',
                    padding: 'clamp(18px, 3.5vw, 36px) clamp(12px, 2.5vw, 32px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 16px rgba(11, 23, 48, 0.04)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                  }}
                >
                  <div>
                    {/* Header carte */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '20px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '12px',
                            backgroundColor: '#F4F7FB',
                            border: '1px solid #DAE3ED',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {getSectorIcon(sol.slug)}
                        </div>
                        <span
                          style={{
                            fontSize: '14px',
                            fontWeight: 700,
                            color: '#0B1730',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                          }}
                        >
                          {sol.sectorName}
                        </span>
                      </div>

                      {isProposal ? (
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            color: '#172A46',
                            backgroundColor: '#E9F1F7',
                            padding: '4px 10px',
                            borderRadius: '100px',
                            border: '1px solid #DAE3ED',
                          }}
                        >
                          {isEn ? 'Functional Proposal' : 'Proposition fonctionnelle'}
                        </span>
                      ) : (
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            color: '#0B1730',
                            backgroundColor: 'rgba(25, 184, 205, 0.15)',
                            padding: '4px 10px',
                            borderRadius: '100px',
                          }}
                        >
                          {isEn ? 'Active Offering' : 'Offre active'}
                        </span>
                      )}
                    </div>

                    <h2
                      className="mt-h3"
                      style={{
                        color: '#0B1730',
                        marginBottom: '12px',
                        fontSize: '22px',
                        lineHeight: 1.3,
                      }}
                    >
                      {sol.hero.title}
                    </h2>

                    <p
                      className="mt-body mt-muted"
                      style={{
                        fontSize: '15px',
                        lineHeight: 1.6,
                        marginBottom: '20px',
                      }}
                    >
                      {sol.hero.description}
                    </p>

                    {/* Fonctionnalités clés */}
                    <div style={{ marginBottom: '24px' }}>
                      <div
                        style={{
                          fontSize: '12px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: '#172A46',
                          marginBottom: '10px',
                        }}
                      >
                        {isEn ? 'Key capabilities:' : 'Fonctionnalités réalisables :'}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {sol.features.slice(0, 5).map((feat, idx) => (
                          <span
                            key={idx}
                            style={{
                              fontSize: '12px',
                              backgroundColor: '#F4F7FB',
                              border: '1px solid #DAE3ED',
                              padding: '4px 8px',
                              borderRadius: '6px',
                              color: '#172A46',
                              fontWeight: 500,
                            }}
                          >
                            {feat.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
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
                        color: '#19B8CD',
                        fontWeight: 600,
                        fontSize: '15px',
                        textDecoration: 'none',
                      }}
                    >
                      <span>
                        {isEn
                          ? `Explore ${sol.sectorName} Solution`
                          : `Découvrir la solution ${sol.sectorName}`}
                      </span>
                      <ArrowUpRight size={16} />
                    </NavLink>

                    <LinkButton
                      href={quoteHref}
                      variant="outline"
                      size="sm"
                    >
                      {isEn ? `Quote: ${sol.sectorName}` : `Devis ${sol.sectorName}`}
                    </LinkButton>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 3. Bénéfices Transversaux B2B */}
      <section
        style={{
          padding: 'clamp(56px, 8vw, 96px) 0',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #DAE3ED',
        }}
      >
        <Container>
          <SectionHeading
            tag={isEn ? 'Engineering Standards' : 'Garanties Techniques'}
            title={
              isEn
                ? 'Why choose custom software over generic off-the-shelf tools?'
                : "Pourquoi choisir une solution sur mesure plutôt qu'un outil générique ?"
            }
            description={
              isEn
                ? 'Generic SaaS tools enforce rigid workflows and recurring per-seat fees. MusaTech designs tailored software around your specific operational methods.'
                : 'Les logiciels génériques imposent des processus rigides et des abonnements mensuels croissants. MusaTech conçoit des outils adaptés à vos méthodes de travail.'
            }
            align="center"
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: '24px',
              marginTop: '40px',
            }}
          >
            <div
              className="mt-card"
              style={{
                padding: 'clamp(18px, 3.5vw, 28px) clamp(12px, 2.5vw, 28px)',
                borderRadius: '14px',
                backgroundColor: '#F4F7FB',
                border: '1px solid #DAE3ED',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(25, 184, 205, 0.15)',
                  color: '#19B8CD',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <ShieldCheck size={22} />
              </div>
              <h3 className="mt-h3" style={{ fontSize: '18px', color: '#0B1730', marginBottom: '8px' }}>
                {isEn ? 'Full Intellectual Property' : 'Pleine propriété intellectuelle'}
              </h3>
              <p className="mt-body mt-muted" style={{ fontSize: '14px', lineHeight: 1.6 }}>
                {isEn
                  ? 'Source code, database schemas, and server configurations belong entirely to you with zero recurring per-user licensing fees.'
                  : 'Le code source et les données vous appartiennent sans abonnement mensuel au volume. Vous contrôlez votre infrastructure et vos coûts sur le long terme.'}
              </p>
            </div>

            <div
              className="mt-card"
              style={{
                padding: 'clamp(18px, 3.5vw, 28px) clamp(12px, 2.5vw, 28px)',
                borderRadius: '14px',
                backgroundColor: '#F4F7FB',
                border: '1px solid #DAE3ED',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(23, 42, 70, 0.1)',
                  color: '#172A46',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <Clock size={22} />
              </div>
              <h3 className="mt-h3" style={{ fontSize: '18px', color: '#0B1730', marginBottom: '8px' }}>
                {isEn ? 'Seamless Local & Mobile Integration' : 'Intégration locale fluide'}
              </h3>
              <p className="mt-body mt-muted" style={{ fontSize: '14px', lineHeight: 1.6 }}>
                {isEn
                  ? 'Native support for local payment channels (Wave, Orange Money) and messaging habits (WhatsApp, SMS) ensures immediate adoption by your customers.'
                  : 'Prise en compte native des réalités de paiement (Wave, Orange Money) et de communication (WhatsApp, SMS) pour une adoption immédiate par vos clients.'}
              </p>
            </div>

            <div
              className="mt-card"
              style={{
                padding: 'clamp(18px, 3.5vw, 28px) clamp(12px, 2.5vw, 28px)',
                borderRadius: '14px',
                backgroundColor: '#F4F7FB',
                border: '1px solid #DAE3ED',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(25, 184, 205, 0.15)',
                  color: '#19B8CD',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <CheckCircle2 size={22} />
              </div>
              <h3 className="mt-h3" style={{ fontSize: '18px', color: '#0B1730', marginBottom: '8px' }}>
                {isEn ? 'Direct Founder Collaboration' : 'Accompagnement direct par le fondateur'}
              </h3>
              <p className="mt-body mt-muted" style={{ fontSize: '14px', lineHeight: 1.6 }}>
                {isEn
                  ? 'You work directly with Moussa Diagne, full-stack software engineer. Zero sales intermediaries for quick, reliable technical decisions.'
                  : 'Vous échangez directement avec Moussa Diagne, ingénieur logiciel full-stack. Aucun intermédiaire commercial pour des arbitrages techniques rapides et fiables.'}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. Méthode de Travail */}
      <section
        style={{
          padding: 'clamp(56px, 8vw, 96px) 0',
          backgroundColor: '#0B1730',
          color: '#FFFFFF',
        }}
      >
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px auto' }}>
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
              {isEn ? 'Proven Methodology' : 'Méthodologie Éprouvée'}
            </span>
            <h2 className="mt-h2" style={{ color: '#FFFFFF', marginBottom: '16px' }}>
              {isEn ? 'How we engineer your industry platform' : 'Comment nous concevons votre outil métier'}
            </h2>
            <p style={{ color: '#A5B4C7', fontSize: '16px', lineHeight: 1.6 }}>
              {isEn
                ? 'A transparent 4-stage engineering framework delivering impactful software without scope drift.'
                : 'Un processus transparent en 4 étapes pour livrer une solution efficace sans dépassement de périmètre.'}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
              gap: '24px',
            }}
          >
            {methodSteps.map((step) => (
              <div
                key={step.number}
                style={{
                  backgroundColor: '#172A46',
                  borderRadius: '14px',
                  padding: '24px',
                  border: '1px solid rgba(218, 227, 237, 0.1)',
                }}
              >
                <div
                  style={{
                    fontSize: '28px',
                    fontWeight: 800,
                    color: '#19B8CD',
                    fontFamily: 'Manrope, sans-serif',
                    marginBottom: '12px',
                  }}
                >
                  {step.number}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#CBD5E1', lineHeight: 1.6 }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. FAQ Générale Sectorielle */}
      <section
        style={{
          padding: 'clamp(56px, 8vw, 96px) 0',
          backgroundColor: '#F4F7FB',
          borderBottom: '1px solid #DAE3ED',
        }}
      >
        <Container>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <SectionHeading
              tag={isEn ? 'Industry FAQ' : 'FAQ Métier'}
              title={isEn ? 'Frequently Asked Questions' : 'Questions fréquentes sur nos solutions'}
              description={
                isEn
                  ? 'Key details before kicking off custom software development with MusaTech.'
                  : "Tout ce qu'il faut savoir avant de lancer le développement de votre outil sur mesure."
              }
              align="center"
            />

            <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {generalSectorFaq.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid #DAE3ED',
                      overflow: 'hidden',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      style={{
                        width: '100%',
                        padding: '18px 22px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        textAlign: 'left',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#0B1730',
                      }}
                      aria-expanded={isOpen}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <HelpCircle size={18} color="#19B8CD" />
                        {item.q}
                      </span>
                      <ChevronDown
                        size={18}
                        color="#465670"
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease',
                          flexShrink: 0,
                        }}
                      />
                    </button>
                    {isOpen && (
                      <div
                        style={{
                          padding: '0 22px 20px 50px',
                          color: '#465670',
                          fontSize: '15px',
                          lineHeight: 1.6,
                        }}
                      >
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* 6. CTA Devis */}
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
              backgroundColor: '#F4F7FB',
              border: '1px solid #DAE3ED',
              borderRadius: '20px',
              padding: 'clamp(32px, 6vw, 56px) 24px',
            }}
          >
            <h2 className="mt-h2" style={{ color: '#0B1730', marginBottom: '16px' }}>
              {isEn ? 'Have a project for your enterprise?' : 'Vous avez un projet pour votre entreprise ?'}
            </h2>
            <p className="mt-body mt-muted" style={{ fontSize: '16px', marginBottom: '28px' }}>
              {isEn
                ? 'Share your operational objectives and business rules. We will return a technical feasibility analysis and detailed proposal within 24 to 48 business hours.'
                : 'Partagez-nous vos objectifs et vos règles métier. Nous vous fournirons une analyse de faisabilité et une proposition détaillée sous 24 à 48 heures ouvrées.'}
            </p>
            <LinkButton href={isEn ? '/en/quote' : '/#devis'} variant="primary" size="lg">
              {isEn ? 'Request an Industry Proposal' : 'Demander un devis sectoriel'}
            </LinkButton>
          </div>
        </Container>
      </section>
    </div>
  );
};
