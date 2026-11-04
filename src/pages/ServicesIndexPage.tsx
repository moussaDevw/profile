import React, { useEffect } from 'react';
import { ArrowUpRight, TrendingUp, ShieldCheck, Zap, Globe, ShoppingCart, Cpu, Smartphone, Info } from 'lucide-react';
import { Container } from '../design-system/Container';
import { SectionHeading } from '../design-system/SectionHeading';
import { LinkButton } from '../design-system/Button';
import { ServiceCard } from '../design-system/cards/ServiceCard';
import { ProjectCard } from '../design-system/cards/ProjectCard';
import { getAllServices } from '../content/servicesData';
import { getFeaturedProjects, METHOD_STEPS_FR, METHOD_STEPS_EN, getServicesDisclaimer } from '../content/homeData';
import { NavLink, useRouter } from '../lib/router';
import { updatePageMetadata } from '../lib/seoMetadata';
import { getLocalizedHref } from '../lib/i18nRoutes';
import { trackServiceViewed } from '../lib/analytics';

export const ServicesIndexPage: React.FC = () => {
  const { locale } = useRouter();
  const isEn = locale === 'en';
  const services = getAllServices(locale);
  const featuredProjects = getFeaturedProjects(locale);
  const methodSteps = isEn ? METHOD_STEPS_EN : METHOD_STEPS_FR;
  const disclaimer = getServicesDisclaimer(locale);

  useEffect(() => {
    updatePageMetadata({
      title: isEn
        ? 'Engineering Services & Pricing | MusaTech Software Agency'
        : 'Services & Tarifs de Développement Web, Mobile & Logiciel | MusaTech',
      description: isEn
        ? 'Discover MusaTech engineering capabilities: modern websites, custom e-commerce, enterprise business platforms, and mobile applications.'
        : 'Découvrez nos 4 offres clés : sites web professionnels, e-commerce sur mesure, logiciels métier et applications mobiles.',
      canonicalPath: isEn ? '/en/services' : '/fr/services',
      frPath: '/fr/services',
      enPath: '/en/services',
      locale,
      breadcrumbs: [
        { name: isEn ? 'Home' : 'Accueil', path: isEn ? '/en' : '/fr' },
        { name: isEn ? 'Services' : 'Services', path: isEn ? '/en/services' : '/fr/services' },
      ],
      schemaType: 'service',
    });
    trackServiceViewed({ serviceSlug: 'all', locale });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isEn, locale]);

const getServiceIcon = (slug: string) => {
  switch (slug) {
    case 'sites-web':
      return <Globe size={24} color="#172A46" />;
    case 'e-commerce':
      return <ShoppingCart size={24} color="#19B8CD" />;
    case 'logiciels-metier':
      return <Cpu size={24} color="#172A46" />;
    case 'applications-mobiles':
      return <Smartphone size={24} color="#172A46" />;
    default:
      return <Globe size={24} />;
  }
};

return (
  <div className="mt-page-services">
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#465670', marginBottom: '20px' }}>
            <NavLink href={getLocalizedHref('home', locale)} style={{ color: '#172A46', textDecoration: 'none', fontWeight: 500 }}>
              {isEn ? 'Home' : 'Accueil'}
            </NavLink>
            <span>/</span>
            <span style={{ color: '#19B8CD', fontWeight: 600 }}>Services</span>
        </div>

        <div style={{ maxWidth: '820px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              backgroundColor: '#E9F1F7',
              color: '#172A46',
              border: '1px solid #DAE3ED',
              marginBottom: '20px',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#19B8CD' }} />
            {isEn ? 'Engineering Catalog & Transparent Pricing' : 'Catalogue & Tarifs Transparents'}
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
                ? 'High-impact digital engineering designed for tangible business ROI.'
                : 'Des solutions logicielles pensées pour votre rentabilité.'}
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
                  ? 'MusaTech partners with business leaders and technical founders to build reliable websites, robust e-commerce platforms, tailored enterprise software, and mobile apps. Every engagement features defined deliverables, transparent pricing, and direct technical leadership.'
                  : "MusaTech accompagne les entreprises et porteurs de projets dans la création de sites web performants, de boutiques e-commerce, de plateformes métier sur mesure et d'applications mobiles. Des périmètres clairs, des tarifs de départ lisibles et un interlocuteur technique unique."}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                  <LinkButton href={getLocalizedHref('quote', locale)} variant="cyan" size="lg" icon={<ArrowUpRight size={18} />}>
                    {isEn ? 'Request a Proposal' : 'Demander un devis personnalisé'}
                  </LinkButton>
                  <LinkButton href="#offres" variant="outline" size="lg">
                    {isEn ? 'Explore the 4 Core Offers' : 'Découvrir les 4 offres'}
                  </LinkButton>
              </div>
            </div>
          </Container>
        </section>

          {/* 2. Grille des 4 Offres */}
          <section
            id="offres"
            className="mt-section"
            style={{
              backgroundColor: '#F4F7FB',
              borderBottom: '1px solid #DAE3ED',
            }}
          >
            <Container>
              <SectionHeading
                tag={isEn ? 'Our 4 Core Offers' : 'Nos 4 Offres Clés'}
                title={isEn ? 'Structured scopes to fit your project stage.' : 'Des périmètres structurés pour chaque étape de votre croissance.'}
                description={
                  isEn
                    ? 'Each solution includes clearly defined deliverables and a starting baseline. No vague promises, no hidden costs.'
                    : 'Chaque offre dispose d’un socle de fonctionnalités défini et d’un tarif de départ clair. Pas de promesse vague, pas de coûts cachés.'
                }
                align="center"
              />

              <div className="mt-grid-2">
                    {services.map((service, idx) => {
                      const ctaHref = isEn
                        ? `/en/services/${service.slug === 'sites-web' ? 'websites' : service.slug === 'logiciels-metier' ? 'business-software' : service.slug === 'applications-mobiles' ? 'mobile-apps' : service.slug}`
                        : `/fr/services/${service.slug}`;

                      const displayTitle = isEn
                        ? (service.slug === 'sites-web'
                          ? 'Professional Websites'
                          : service.slug === 'e-commerce'
                            ? 'Custom E-commerce'
                            : service.slug === 'logiciels-metier'
                              ? 'Custom Business Software'
                              : 'Mobile Applications')
                        : service.title;

                      const displayPrice = isEn
                        ? (service.slug === 'sites-web'
                          ? 'From 250,000 XOF · Custom scope'
                          : service.slug === 'e-commerce'
                            ? 'From 600,000 XOF · Custom scope'
                            : service.slug === 'logiciels-metier'
                              ? 'From 1,500,000 XOF · Custom scope'
                              : 'From 2,000,000 XOF · Custom scope')
                        : service.startingPrice;

                      return (
                        <ServiceCard
                          key={service.slug}
                          index={`0${idx + 1}`}
                          icon={getServiceIcon(service.slug)}
                          title={displayTitle}
                          description={service.shortDescription}
                          startingPrice={displayPrice}
                          deliverables={service.starterScope.items.slice(0, 4)}
                          ctaText={isEn ? 'View Detailed Scope' : 'Consulter le détail'}
                          ctaHref={ctaHref}
                          featured={service.slug === 'e-commerce'}
                        />
                );
            })}
              </div>

              <div
                style={{
                  marginTop: '40px',
                  padding: '14px clamp(12px, 2.5vw, 24px)',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #DAE3ED',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  maxWidth: '780px',
                  margin: '40px auto 0 auto',
                  fontSize: '13px',
                  color: '#465670',
                }}
              >
                <Info size={18} color="#19B8CD" style={{ flexShrink: 0 }} />
                <span>{disclaimer}</span>
              </div>
            </Container>
          </section>

          {/* 3. Bénéfices Business */}
            <section
              className="mt-section"
              style={{
                backgroundColor: '#FFFFFF',
                borderBottom: '1px solid #DAE3ED',
              }}
            >
              <Container>
                <SectionHeading
                  tag={isEn ? 'Tangible ROI' : 'Bénéfices Business'}
                  title={isEn ? 'Why invest in tailored digital engineering?' : 'Pourquoi investir dans des outils sur mesure ?'}
                  description={
                    isEn
                      ? 'Standard templates quickly reach limitations. Custom systems offer durable returns.'
                      : 'Les solutions génériques ou mal adaptées coûtent cher en temps perdu et en opportunités manquées. MusaTech conçoit des actifs durables.'
                  }
                  align="center"
                />

                <div className="mt-grid-3">
                      <div
                        className="mt-card"
                        style={{
                          backgroundColor: '#F4F7FB',
                          borderRadius: '16px',
                          border: '1px solid #DAE3ED',
                          padding: '32px 28px',
                        }}
                      >
                        <div
                          style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #DAE3ED',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '20px',
                          }}
                        >
                          <TrendingUp size={24} color="#19B8CD" />
                        </div>
                          <h3 className="mt-h3" style={{ fontSize: '19px', color: '#0B1730', marginBottom: '12px' }}>
                            {isEn ? 'Increased Revenue & Qualified Inquiries' : 'Gains de productivité réels'}
                          </h3>
                            <p className="mt-body mt-muted" style={{ fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
                              {isEn
                                ? 'A fast, well-structured interface inspires trust and guides prospects naturally to action.'
                                : 'Une interface rapide, claire et adaptée aux usages locaux (paiement mobile, navigation smartphone) convertit significativement plus de visiteurs en clients réels.'}
                            </p>
                          </div>

                              <div
                                className="mt-card"
                                style={{
                                  backgroundColor: '#F4F7FB',
                                  borderRadius: '16px',
                                  border: '1px solid #DAE3ED',
                                  padding: '32px 28px',
                                }}
                              >
                                <div
                                  style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    backgroundColor: '#FFFFFF',
                                    border: '1px solid #DAE3ED',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '20px',
                                  }}
                                >
                                  <ShieldCheck size={24} color="#19B8CD" />
                                </div>
                                  <h3 className="mt-h3" style={{ fontSize: '19px', color: '#0B1730', marginBottom: '12px' }}>
                                    {isEn ? '100% Codebase Ownership & Independence' : 'Pleine propriété du code'}
                                  </h3>
                                    <p className="mt-body mt-muted" style={{ fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
                                      {isEn
                                        ? 'You own 100% of your source code and data. No subscription locks or proprietary agency traps.'
                                        : 'Vous êtes propriétaire à 100% de votre code source, de vos bases de données et de votre nom de domaine. Pas de dépendance forcée à une formule d’abonnement.'}
                                    </p>
                                  </div>

                                      <div
                                        className="mt-card"
                                        style={{
                                          backgroundColor: '#F4F7FB',
                                          borderRadius: '16px',
                                          border: '1px solid #DAE3ED',
                                          padding: '32px 28px',
                                        }}
                                      >
                                        <div
                                          style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '12px',
                                            backgroundColor: '#FFFFFF',
                                            border: '1px solid #DAE3ED',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: '20px',
                                          }}
                                        >
                                          <Zap size={24} color="#172A46" />
                                        </div>
                                          <h3 className="mt-h3" style={{ fontSize: '19px', color: '#0B1730', marginBottom: '12px' }}>
                                            {isEn ? 'Modern & Sustainable Architecture' : 'Technologies modernes & pérennes'}
                                          </h3>
                                            <p className="mt-body mt-muted" style={{ fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
                                              {isEn
                                                ? 'Centralize operations on a single platform to eliminate errors and save hundreds of operational hours.'
                                                : 'NestJS, React 19, TypeScript et PostgreSQL pour garantir une évolutivité sans dette technique.'}
                                            </p>
                                          </div>
                                      </div>
                                    </Container>
                                  </section>

                                    {/* 4. Réalisations pertinentes */}
                                    <section
                                      className="mt-section"
                                      style={{
                                        backgroundColor: '#F4F7FB',
                                        borderBottom: '1px solid #DAE3ED',
                                      }}
                                    >
                                      <Container>
                                        <SectionHeading
                                          tag={isEn ? 'Real-world References' : 'Preuves de Réalisation'}
                                          title={isEn ? 'Tested, documented, production-deployed systems.' : 'Des architectures déployées en production.'}
                                          description={
                                            isEn
                                              ? 'Discover real applications built for startups and growing enterprises.'
                                              : 'Découvrez des exemples concrets de plateformes développées pour des entreprises et startups.'
                                          }
                                          align="center"
                                        />

                                        <div className="mt-grid-3">
                                          {featuredProjects.slice(0, 3).map((project) => {
                                            const projectSlug = project.id === 'edaktarii' ? 'edaktari' : project.id;
                                            const liveUrl = isEn
                                              ? `/en/case-studies/${projectSlug}`
                                              : `/fr/realisations/${projectSlug}`;

                                            return (
                                              <ProjectCard
                                                key={project.id}
                                                name={project.name}
                                                client={project.client}
                                                category={project.category}
                                                year={project.year}
                                                impactMetric={project.impactMetric}
                                                summary={project.summary}
                                                stack={project.stack}
                                                githubUrl={project.githubUrl}
                                                liveUrl={liveUrl}
                                              />
                                            );
                                          })}
                                        </div>

                                        <div style={{ marginTop: '40px', textAlign: 'center' }}>
                                          <LinkButton href={getLocalizedHref('projects', locale)} variant="secondary">
                                            {isEn ? 'View All Case Studies' : 'Voir toutes les réalisations réelles'}
                                          </LinkButton>
                                        </div>
                                      </Container>
                                    </section>

                                    {/* 5. Méthode de Collaboration */}
                                      <section
                                        className="mt-section"
                                        style={{
                                          backgroundColor: '#FFFFFF',
                                          borderBottom: '1px solid #DAE3ED',
                                        }}
                                      >
                                        <Container>
                                          <SectionHeading
                                            tag={isEn ? 'Disciplined Delivery' : 'Méthode de Travail'}
                                            title={isEn ? 'A reliable process with zero surprises.' : 'Un cadre transparent en 4 étapes.'}
                                            description={
                                              isEn
                                                ? 'Regular milestone reviews, live staging demos, and verified code quality.'
                                                : 'Des points réguliers, des livrables concrets et une visibilité totale sur l’avancement de votre projet.'
                                            }
                                            align="center"
                                          />

                                          <div className="mt-grid-4">
                                              {
                                                methodSteps.map((step) => (
                                                  <div
                                                    key={step.number}
                                                    className="mt-card"
                                                    style={{
                                                      backgroundColor: '#F4F7FB',
                                                      borderRadius: '16px',
                                                      border: '1px solid #DAE3ED',
                                                      padding: '28px 24px',
                                                      display: 'flex',
                                                      flexDirection: 'column',
                                                      justifyContent: 'space-between',
                                                    }}
                                                  >
                                                    <div>
                                                        <span
                                                          style={{
                                                            fontSize: '26px',
                                                            fontWeight: 800,
                                                            color: '#19B8CD',
                                                            fontFamily: "'Manrope', sans-serif",
                                                            display: 'block',
                                                            marginBottom: '12px',
                                                          }}
                                                        >
                                                          {step.number}
                                                        </span>
                                                          <h3 className="mt-h3" style={{ fontSize: '18px', color: '#0B1730', marginBottom: '10px' }}>
                                                            {step.title}
                                                          </h3>
                                                            <p className="mt-body mt-muted" style={{ fontSize: '14px', lineHeight: 1.5, marginBottom: '16px' }}>
                                                              {step.description}
                                                            </p>
                                                          </div>
                                                            <div style={{ borderTop: '1px solid #DAE3ED', paddingTop: '12px', fontSize: '12px', color: '#172A46', fontWeight: 600 }}>
                                                              <span style={{ color: '#19B8CD' }}>{isEn ? 'Deliverable: ' : 'Livrable : '}</span>
                                                              {step.deliverable}
                                                            </div>
                                                          </div>
            ))}
                                                        </div>
                                                      </Container>
                                                    </section>

                                                      {/* 6. CTA Final vers /devis */}
                                                      <section
                                                        style={{
                                                          padding: 'clamp(56px, 8vw, 88px) 0',
                                                          backgroundColor: '#0B1730',
                                                          color: '#FFFFFF',
                                                          textAlign: 'center',
                                                        }}
                                                      >
                                                        <Container>
                                                            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
                                                              <h2 className="mt-h2" style={{ color: '#FFFFFF', marginBottom: '16px' }}>
                                                                {isEn ? 'Have a project? Let’s evaluate your scope.' : 'Un projet à développer ? Discutons de votre périmètre.'}
                                                              </h2>
                                                                <p className="mt-body" style={{ color: '#DAE3ED', fontSize: '17px', lineHeight: 1.6, marginBottom: '32px' }}>
                                                                  {isEn
                                                                    ? 'Receive a comprehensive technical and financial proposal within 24 to 48 business hours, tailored to your exact operational requirements.'
                                                                    : 'Recevez une estimation claire et détaillée sous 24h à 48h ouvrées. Moussa Diagne étudie votre besoin et vous conseille sur l’architecture la plus adaptée.'}
                                                                </p>
                                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
                                                                  <LinkButton href={getLocalizedHref('quote', locale)} variant="cyan" size="lg" icon={<ArrowUpRight size={18} />}>
                                                                    {isEn ? 'Request a Proposal' : 'Demander un devis détaillé'}
                                                                  </LinkButton>
                                                                  <LinkButton href={getLocalizedHref('contact', locale)} variant="outline" size="lg" style={{ color: '#FFFFFF', borderColor: '#DAE3ED' }}>
                                                                    {isEn ? 'Contact Me Directly' : 'Me contacter directement'}
                                                                  </LinkButton>
                                                                </div>
                                                            </div>
                                                        </Container>
                                                      </section>
                                                  </div>
                                                );
                                              };
