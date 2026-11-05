import React, { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ShieldCheck,
  Sparkles,
  Clock,
  PlusCircle,
  Check,
} from 'lucide-react';
import { Container } from '../design-system/Container';
import { SectionHeading } from '../design-system/SectionHeading';
import { FaqAccordion } from '../design-system/FaqAccordion';
import { LinkButton } from '../design-system/Button';
import { ProjectCard } from '../design-system/cards/ProjectCard';
import { getServiceBySlug } from '../content/servicesData';
import { REALISATIONS_DATA } from '../content/homeData';
import { NavLink, useRouter } from '../lib/router';
import { updatePageMetadata } from '../lib/seoMetadata';
import { SERVICE_SLUG_MAP, getLocalizedHref } from '../lib/i18nRoutes';
import { trackServiceViewed } from '../lib/analytics';

interface ServiceDetailPageProps {
  slug: string;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ slug }) => {
  const { locale } = useRouter();
  const isEn = locale === 'en';
  const service = getServiceBySlug(slug, locale);

  useEffect(() => {
    if (service) {
      const frSlug = SERVICE_SLUG_MAP[slug]?.fr || slug;
      const enSlug = SERVICE_SLUG_MAP[slug]?.en || slug;
      updatePageMetadata({
        title: isEn
          ? `${service.title} | MusaTech Engineering Services`
          : service.meta.title,
        description: isEn
          ? service.shortDescription
          : service.meta.description,
        canonicalPath: isEn ? `/en/services/${enSlug}` : `/fr/services/${frSlug}`,
        frPath: `/fr/services/${frSlug}`,
        enPath: `/en/services/${enSlug}`,
        locale,
        breadcrumbs: [
          { name: isEn ? 'Home' : 'Accueil', path: isEn ? '/en' : '/fr' },
          { name: isEn ? 'Services' : 'Services', path: isEn ? '/en/services' : '/fr/services' },
          { name: service.title, path: isEn ? `/en/services/${enSlug}` : `/fr/services/${frSlug}` },
        ],
        schemaType: 'service',
        schemaData: {
          name: service.title,
          description: service.shortDescription,
          startingPrice: service.startingPrice,
        },
      });
      trackServiceViewed({ serviceSlug: slug, locale });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [service, slug, isEn, locale]);

  if (!service) {
    return (
      <Container style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h1 className="mt-h2" style={{ color: '#0B1730', marginBottom: '16px' }}>
          {isEn ? 'Service Not Found' : 'Service non trouvé'}
        </h1>
        <p className="mt-body mt-muted" style={{ marginBottom: '24px' }}>
          {isEn
            ? 'The requested engineering offer does not exist or has been relocated.'
            : "L'offre demandée n'existe pas ou a été déplacée."}
        </p>
        <LinkButton href={getLocalizedHref('services', locale)} variant="primary">
          {isEn ? 'Back to Services Hub' : 'Retour aux services'}
        </LinkButton>
      </Container>
    );
  }

  const relatedProjects = REALISATIONS_DATA.filter((p) =>
    service.relatedProjectIds.includes(p.id)
  );

  const quoteUrl = isEn
    ? `/en/quote?service=${service.slug}`
    : `/fr/devis?service=${service.slug}`;

  return (
    <div className={`mt-service-detail-page mt-service-${service.slug}`}>
      {/* 1. Hero Section de l'offre */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#465670', marginBottom: '20px' }}>
            <NavLink href={getLocalizedHref('home', locale)} style={{ color: '#172A46', textDecoration: 'none', fontWeight: 500 }}>
              {isEn ? 'Home' : 'Accueil'}
            </NavLink>
            <span>/</span>
            <NavLink href={getLocalizedHref('services', locale)} style={{ color: '#172A46', textDecoration: 'none', fontWeight: 500 }}>
              {isEn ? 'Services' : 'Services'}
            </NavLink>
            <span>/</span>
            <span style={{ color: '#19B8CD', fontWeight: 600 }}>{service.title}</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 540px), 1fr))',
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
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  backgroundColor: '#E9F1F7',
                  color: '#172A46',
                  border: '1px solid #DAE3ED',
                  marginBottom: '16px',
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#19B8CD' }} />
                {isEn ? 'Core Offering' : 'Offre Spécialisée'}
              </div>

              <h1 className="mt-h1" style={{ marginBottom: '16px', color: '#0B1730' }}>
                {service.title}
              </h1>

              <p className="mt-body" style={{ color: '#172A46', fontSize: '18px', lineHeight: 1.6, marginBottom: '28px' }}>
                {service.heroTagline}
              </p>

              {/* CTA vers devis avec service présélectionné */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <LinkButton
                  href={quoteUrl}
                  variant="cyan"
                  size="lg"
                  icon={<ArrowDown size={18} />}
                >
                  {isEn ? 'Request a Quote for this Service' : 'Demander un devis pour ce service'}
                </LinkButton>
                <LinkButton href="#perimetre" variant="outline" size="lg">
                  {isEn ? 'View Starter Scope' : 'Voir ce qui est inclus'}
                </LinkButton>
              </div>
            </div>

            {/* Price & Delivery Card (Prix de départ validé) */}
            <div
              style={{
                backgroundColor: '#F4F7FB',
                borderRadius: '16px',
                border: '1.5px solid #DAE3ED',
                padding: 'clamp(18px, 3.5vw, 36px) clamp(12px, 2.5vw, 32px)',
                boxShadow: '0 8px 24px -4px rgba(11, 23, 48, 0.06)',
              }}
            >
              <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#465670', display: 'block', marginBottom: '8px' }}>
                {isEn ? 'Baseline Pricing' : 'Tarification de départ'}
              </span>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#0B1730', fontFamily: "'Manrope', sans-serif", marginBottom: '16px' }}>
                {service.startingPrice}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '24px', borderBottom: '1px solid #DAE3ED', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#172A46' }}>
                  <Clock size={16} color="#19B8CD" />
                  <span>{isEn ? 'Average estimated delivery: ' : 'Délai moyen estimé : '}<strong>{service.estimatedDelivery}</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#172A46' }}>
                  <ShieldCheck size={16} color="#19B8CD" />
                  <span>{isEn ? '100% Codebase Ownership & Full Documentation' : 'Propriété intégrale du code & documentation fournie'}</span>
                </div>
              </div>

              <p style={{ fontSize: '13px', color: '#465670', lineHeight: 1.5, margin: 0 }}>
                💡 <em>{isEn
                  ? 'Baseline pricing for a clearly defined starter scope. Every engagement receives a formal quotation before kickoff.'
                  : "Tarif indicatif pour un périmètre initialement défini. Chaque projet fait l'objet d'un devis formel validé avant démarrage."}</em>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 1. À qui s'adresse ce service ? */}
      <section className="mt-section" style={{ backgroundColor: '#F4F7FB', borderBottom: '1px solid #DAE3ED' }}>
        <Container>
          <SectionHeading
            tag={isEn ? 'Target Profiles' : 'Profils Cibles'}
            title={isEn ? 'Who is this service designed for?' : "À qui s'adresse cette offre ?"}
            description={
              isEn
                ? 'Engineered to address the exact operational hurdles and goals of your organization.'
                : 'Nos solutions sont calibrées pour répondre aux problématiques spécifiques de votre structure.'
            }
            align="center"
          />

          <div className="mt-grid-3">
            {service.targetAudience.map((audience, idx) => (
              <div
                key={idx}
                className="mt-card"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #DAE3ED',
                  padding: '32px',
                  boxShadow: '0 4px 16px -2px rgba(11, 23, 48, 0.04)',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: '#E9F1F7',
                    color: '#0B1730',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '14px',
                    marginBottom: '16px',
                  }}
                >
                  {idx + 1}
                </div>
                <h3 className="mt-h3" style={{ fontSize: '18px', color: '#0B1730', marginBottom: '12px' }}>
                  {audience.category}
                </h3>
                <p className="mt-body mt-muted" style={{ fontSize: '15px' }}>
                  {audience.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 2. Problèmes résolus */}
      <section className="mt-section" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #DAE3ED' }}>
        <Container>
          <SectionHeading
            tag={isEn ? 'Problem Solving' : 'Résolution de Problèmes'}
            title={isEn ? 'Which operational bottlenecks do we eliminate?' : 'Quels blocages éliminons-nous ?'}
            description={
              isEn
                ? 'We transform points of friction into durable authority and commercial efficiency.'
                : "Nous transformons vos points de friction en leviers d'efficacité et de crédibilité."
            }
            align="center"
          />

          <div className="mt-grid-3">
            {service.problemsSolved.map((item, idx) => (
              <div
                key={idx}
                className="mt-card"
                style={{
                  backgroundColor: '#F4F7FB',
                  borderRadius: '16px',
                  border: '1px solid #DAE3ED',
                  padding: '30px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: '#D9383A', fontWeight: 600, fontSize: '14px' }}>
                    <AlertCircle size={18} />
                    <span>{isEn ? 'Identified Challenge' : 'Difficulté constatée'}</span>
                  </div>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0B1730', marginBottom: '16px', lineHeight: 1.4 }}>
                    {item.problem}
                  </h4>
                </div>

                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderLeft: '3px solid #19B8CD',
                    padding: '14px',
                    borderRadius: '0 8px 8px 0',
                    border: '1px solid #DAE3ED',
                    borderLeftWidth: '3px',
                  }}
                >
                  <strong style={{ color: '#0B1730', display: 'block', fontSize: '12px', textTransform: 'uppercase', marginBottom: '4px' }}>
                    {isEn ? 'MusaTech Solution:' : 'Solution MusaTech :'}
                  </strong>
                  <p style={{ fontSize: '14px', color: '#172A46', lineHeight: 1.5, margin: 0 }}>
                    {item.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Périmètre de départ (Inclus dans le prix) vs 5. Options Payantes */}
      <section id="perimetre" className="mt-section" style={{ backgroundColor: '#F4F7FB', borderBottom: '1px solid #DAE3ED' }}>
        <Container>
          <SectionHeading
            tag={isEn ? 'Scoping & Boundaries' : 'Cadrage & Périmètre'}
            title={isEn ? 'Included starter scope vs. paid add-ons' : 'Ce qui est inclus vs les options payantes'}
            description={
              isEn
                ? 'Total transparency: we clearly define what is included to avoid any unrealistic promises.'
                : "Transparence absolue : nous délimitons précisément ce qui est couvert par le prix d'appel pour éviter toute promesse irréaliste."
            }
            align="center"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))', gap: '32px' }}>
            {/* 4. Périmètre de départ */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '2px solid #19B8CD',
                padding: 'clamp(20px, 3.5vw, 36px) clamp(12px, 2.5vw, 32px)',
                boxShadow: '0 8px 24px -2px rgba(25, 184, 205, 0.1)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <CheckCircle2 size={22} color="#19B8CD" />
                <h3 className="mt-h3" style={{ fontSize: '20px', color: '#0B1730' }}>
                  {service.starterScope.title}
                </h3>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {service.starterScope.items.map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '15px', color: '#172A46', lineHeight: 1.5 }}>
                    <Check size={18} color="#19B8CD" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div style={{ backgroundColor: '#F4F7FB', padding: '14px 16px', borderRadius: '10px', border: '1px solid #DAE3ED', fontSize: '13px', color: '#465670', lineHeight: 1.5 }}>
                {service.starterScope.note}
              </div>
            </div>

            {/* 5. Options payantes additionnelles */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #DAE3ED',
                padding: 'clamp(20px, 3.5vw, 36px) clamp(12px, 2.5vw, 32px)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <PlusCircle size={22} color="#172A46" />
                <h3 className="mt-h3" style={{ fontSize: '20px', color: '#0B1730' }}>
                  {isEn ? 'Available Options & Upgrades' : 'Options & Évolutions Disponibles'}
                </h3>
              </div>

              <p className="mt-body mt-muted" style={{ fontSize: '14px', marginBottom: '20px' }}>
                {isEn
                  ? 'These modules can be included during initial development or integrated in subsequent phases:'
                  : 'Ces modules peuvent être intégrés dès la conception ou ajoutés ultérieurement selon vos priorités commerciales :'}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {service.paidOptions.map((opt, idx) => (
                  <div key={idx} style={{ padding: '14px 16px', borderRadius: '10px', backgroundColor: '#F4F7FB', border: '1px solid #DAE3ED' }}>
                    <strong style={{ display: 'block', fontSize: '15px', color: '#0B1730', marginBottom: '4px' }}>
                      {opt.name}
                    </strong>
                    <span style={{ fontSize: '14px', color: '#465670', lineHeight: 1.4 }}>
                      {opt.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Fonctionnalités possibles (Vision d'ensemble) */}
      <section className="mt-section" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #DAE3ED' }}>
        <Container>
          <SectionHeading
            tag={isEn ? 'Technical Capabilities' : 'Capacités Techniques'}
            title={isEn ? 'Feasible capabilities for this offering' : 'Fonctionnalités réalisables pour cette offre'}
            description={
              isEn
                ? 'Depending on your specifications, here is an overview of our engineering and integration capabilities.'
                : "Selon les besoins de votre cahier des charges, voici un aperçu de nos capacités d'intégration technique."
            }
            align="center"
          />

          <div
            style={{
              maxWidth: '900px',
              margin: '0 auto',
              backgroundColor: '#F4F7FB',
              borderRadius: '16px',
              border: '1px solid #DAE3ED',
              padding: 'clamp(18px, 3.5vw, 36px) clamp(12px, 2.5vw, 32px)',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: '16px' }}>
              {service.possibleFeatures.map((feat, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', color: '#172A46' }}>
                  <Sparkles size={16} color="#19B8CD" style={{ flexShrink: 0 }} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 7. Méthode de travail pour ce service */}
      <section className="mt-section" style={{ backgroundColor: '#F4F7FB', borderBottom: '1px solid #DAE3ED' }}>
        <Container>
          <SectionHeading
            tag={isEn ? 'Delivery Framework' : 'Démarche Projet'}
            title={
              isEn
                ? `How we engineer your ${service.title.toLowerCase()}`
                : `Comment nous réalisons votre ${service.title.toLowerCase()}`
            }
            description={
              isEn
                ? 'A disciplined 4-step process for transparent milestones and predictable delivery.'
                : 'Un processus rigoureux en 4 étapes pour avancer sereinement.'
            }
            align="center"
          />

          <div className="mt-grid-4">
            {service.methodSteps.map((step) => (
              <div
                key={step.step}
                className="mt-card"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #DAE3ED',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <span style={{ fontSize: '24px', fontWeight: 800, color: '#19B8CD', fontFamily: "'Manrope', sans-serif", display: 'block', marginBottom: '10px' }}>
                    {step.step}
                  </span>
                  <h4 style={{ fontSize: '17px', fontWeight: 700, color: '#0B1730', marginBottom: '10px' }}>
                    {step.title}
                  </h4>
                  <p style={{ fontSize: '14px', color: '#465670', lineHeight: 1.6 }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 8. Réalisations associées à cette offre */}
      {relatedProjects.length > 0 && (
        <section className="mt-section" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #DAE3ED' }}>
          <Container>
            <SectionHeading
              tag={isEn ? 'Production Proof' : 'Cas Réels'}
              title={isEn ? 'Related real-world case studies' : 'Exemples de réalisations associées'}
              description={
                isEn
                  ? 'Production-tested systems demonstrating technical capability on this category.'
                  : 'Projets déjà livrés et opérationnels illustrant notre maîtrise technique sur ce type de prestation.'
              }
              align="center"
            />

            <div className="mt-grid-2">
              {relatedProjects.map((project) => (
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
                  liveUrl={isEn ? `/en/case-studies/${project.id === 'edaktarii' ? 'edaktari' : project.id}` : `/fr/realisations/${project.id === 'edaktarii' ? 'edaktari' : project.id}`}
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 9. Questions fréquentes sur cette offre */}
      <section className="mt-section" style={{ backgroundColor: '#F4F7FB', borderBottom: '1px solid #DAE3ED' }}>
        <Container>
          <SectionHeading
            tag={isEn ? 'Dedicated FAQ' : 'FAQ Dédiée'}
            title={isEn ? `Questions about ${service.title}` : `Vos questions sur l'offre ${service.title}`}
            description={
              isEn
                ? 'Clear answers to address your technical, operational, and budget inquiries.'
                : 'Des clarifications précises pour lever tous vos doutes techniques ou budgétaires.'
            }
            align="center"
          />

          <FaqAccordion items={service.faq} idPrefix={`service-faq-${service.slug}`} />
        </Container>
      </section>

      {/* 10. CTA Final vers devis avec présélection */}
      <section className="mt-section" style={{ backgroundColor: '#0B1730', color: '#FFFFFF', textAlign: 'center' }}>
        <Container>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <h2 className="mt-h2" style={{ color: '#FFFFFF', marginBottom: '16px' }}>
              {isEn
                ? `Ready to launch your ${service.title.toLowerCase()}?`
                : `Prêt à lancer votre projet de ${service.title.toLowerCase()} ?`}
            </h2>
            <p className="mt-body" style={{ color: '#DAE3ED', fontSize: '17px', marginBottom: '32px' }}>
              {isEn
                ? 'Receive a comprehensive technical and financial scoping proposal within 24 to 48 business hours.'
                : 'Recevez sous 24h ouvrées une note de cadrage et un devis clair adapté à votre enveloppe budgétaire.'}
            </p>
            <LinkButton
              href={quoteUrl}
              variant="cyan"
              size="lg"
              icon={<ArrowUpRight size={18} />}
            >
              {isEn ? `Request a Proposal for ${service.title}` : `Demander un devis pour ${service.title}`}
            </LinkButton>
          </div>
        </Container>
      </section>
    </div>
  );
};
