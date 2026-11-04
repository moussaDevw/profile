import React, { useEffect } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Code2,
  Cpu,
  Globe2,
  Sparkles,
  MapPin,
  Award,
  Terminal,
} from 'lucide-react';
import { Container } from '../design-system/Container';
import { SectionHeading } from '../design-system/SectionHeading';
import { LinkButton } from '../design-system/Button';
import { NavLink, useRouter } from '../lib/router';
import { updatePageMetadata } from '../lib/seoMetadata';

export const AboutPage: React.FC = () => {
  const { locale } = useRouter();
  const isEn = locale === 'en';

  useEffect(() => {
    updatePageMetadata({
      title: isEn
        ? 'About Moussa Diagne & MusaTech | Full Stack Engineer Dakar'
        : 'À propos de Moussa Diagne & MusaTech | Développeur Full Stack Dakar',
      description: isEn
        ? 'Learn more about Moussa Diagne, founder of MusaTech: verified engineering background, tech philosophy, and client commitments.'
        : 'Découvrez le parcours de Moussa Diagne, fondateur de MusaTech : expertise technique vérifiée, méthode de collaboration et engagements qualité.',
      canonicalPath: isEn ? '/en/about' : '/fr/a-propos',
      frPath: '/fr/a-propos',
      enPath: '/en/about',
      locale,
      breadcrumbs: [
        { name: isEn ? 'Home' : 'Accueil', path: isEn ? '/en' : '/fr' },
        { name: isEn ? 'About' : 'À propos', path: isEn ? '/en/about' : '/fr/a-propos' },
      ],
      schemaType: 'about',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isEn, locale]);

  const experiences = isEn
    ? [
        {
          period: '2024 — 2026',
          role: 'Senior Frontend Developer — EdTech & AI',
          context: 'EdTech Platform (Yello)',
          description:
            'Engineering interactive learning interfaces under high concurrent traffic (+200,000 learners), microlearning tracks, AI model integration, and advanced state management with Zustand.',
          stack: ['React', 'Next.js', 'TypeScript', 'Zustand', 'TanStack Query', 'Tailwind CSS'],
        },
        {
          period: '2024 — 2026',
          role: 'Full Stack Consulting Developer — Operational CRM & Logistics',
          context: 'Istamco (International Transport & Freight Forwarding)',
          description:
            'Architecture of an operational CRM for international freight: sea/air cargo tracking, executive analytical dashboards, and automated PDF/Excel reports.',
          stack: ['React', 'Next.js', 'NestJS', 'PostgreSQL', 'Chart.js', 'TypeScript'],
        },
        {
          period: '2025',
          role: 'Consultant Software Engineer — HealthTech & WebRTC',
          context: 'eDaktari (Telemedicine Africa × Europe)',
          description:
            'Engineering Next.js 14 interfaces, low-latency WebRTC video integration with GetStream.io, escrow card payments, and WCAG AA accessibility compliance.',
          stack: ['Next.js 14', 'TypeScript', 'GetStream.io', 'Zustand', 'Stripe', 'WCAG AA'],
        },
        {
          period: '2022 — 2024',
          role: 'Freelance Frontend Developer — Real-Time Dashboards & Marketplaces',
          context: 'Casacloud & Medteck Consulting',
          description:
            'Development of real-time monitoring dashboards for call centers and P2P marketplaces with complex transactional flows.',
          stack: ['React', 'Redux', 'Chart.js', 'REST API', 'SCSS / BEM'],
        },
      ]
    : [
        {
          period: '2024 — 2026',
          role: 'Senior Frontend Developer — EdTech & IA',
          context: 'Plateforme EdTech (Yello)',
          description:
            'Conception des interfaces d’apprentissage interactif à forte charge (+200 000 apprenants), parcours microlearning, intégration de modèles IA et gestion d’état avancée avec Zustand.',
          stack: ['React', 'Next.js', 'TypeScript', 'Zustand', 'TanStack Query', 'Tailwind CSS'],
        },
        {
          period: '2024 — 2026',
          role: 'Consultant Développeur Full Stack — CRM Métier & Logistique',
          context: 'Istamco (Transport international & Freight Forwarding)',
          description:
            'Architecture d’un CRM métier dédié au transit international : suivi des expéditions maritimes/aériennes, tableaux de bord analytiques et exports automatisés PDF/Excel.',
          stack: ['React', 'Next.js', 'NestJS', 'PostgreSQL', 'Chart.js', 'TypeScript'],
        },
        {
          period: '2025',
          role: 'Consultant Software Engineer — HealthTech & WebRTC',
          context: 'eDaktari (Téléconsultation médicale Afrique × Europe)',
          description:
            'Développement des interfaces Next.js 14, intégration du flux vidéo temps réel WebRTC avec GetStream.io, paiements sécurisés et accessibilité WCAG AA.',
          stack: ['Next.js 14', 'TypeScript', 'GetStream.io', 'Zustand', 'Stripe', 'WCAG AA'],
        },
        {
          period: '2022 — 2024',
          role: 'Développeur Front-end Freelance — Dashboard & Supervisions',
          context: 'Casacloud & Medteck Consulting',
          description:
            'Développement de dashboards de supervision temps réel pour centres d’appels et marketplaces P2P avec flux transactionnels complexes.',
          stack: ['React', 'Redux', 'Chart.js', 'REST API', 'SCSS / BEM'],
        },
      ];

  const skillDomains = isEn
    ? [
        {
          title: 'Backend & Modular Architecture',
          icon: <Terminal size={22} color="#19B8CD" />,
          items: [
            'NestJS & Node.js (Clean Architecture & Domain-Driven Design)',
            'Secure RESTful APIs & Swagger / OpenAPI 3.0',
            'Relational PostgreSQL schemas & rigorous database modeling',
            'Redis cache & high-throughput query optimization',
            'JWT authentication, role-based access control (RBAC) & data encryption',
          ],
        },
        {
          title: 'Reactive Frontend & Modern Web',
          icon: <Code2 size={22} color="#172A46" />,
          items: [
            'React 18/19 & Next.js 14/15 (App Router, SSR, SSG)',
            'Strict TypeScript for maintainable, regression-free codebases',
            'Optimized client state management (Zustand, TanStack Query)',
            'Accessible design systems (Tailwind CSS, shadcn/ui, WCAG AA)',
            'Core Web Vitals performance & mobile-first responsiveness',
          ],
        },
        {
          title: 'Mobile & Specialized Integrations',
          icon: <Cpu size={22} color="#19B8CD" />,
          items: [
            'React Native (iOS & Android) for fluid cross-platform mobile apps',
            'Real-time video & messaging channels (WebRTC, GetStream.io)',
            'Regional mobile money gateways (Wave, Orange Money) & Stripe',
            'Automated unit/integration testing with Jest & CI/CD workflows',
            'Cloud deployment & production application monitoring',
          ],
        },
      ]
    : [
        {
          title: 'Back-End & Architecture Modulaire',
          icon: <Terminal size={22} color="#19B8CD" />,
          items: [
            'NestJS & Node.js (Clean Architecture & DDD)',
            'APIs RESTful sécurisées & Swagger / OpenAPI 3.0',
            'Bases relationnelles PostgreSQL & modélisation rigoureuse',
            'Cache Redis & optimisation des requêtes à haute fréquence',
            'Authentification JWT, rôles (RBAC) & chiffrement',
          ],
        },
        {
          title: 'Front-End Réactif & Web Moderne',
          icon: <Code2 size={22} color="#172A46" />,
          items: [
            'React 18/19 & Next.js 14/15 (App Router, SSR, SSG)',
            'TypeScript strict pour un code maintenable et sans régression',
            'Gestion d’état optimisée (Zustand, TanStack Query)',
            'Design systems accessibles (Tailwind CSS, shadcn/ui, WCAG AA)',
            'Performances Core Web Vitals & optimisation mobile-first',
          ],
        },
        {
          title: 'Mobile & Intégrations Spécialisées',
          icon: <Cpu size={22} color="#19B8CD" />,
          items: [
            'React Native (iOS & Android) pour des applications fluides',
            'Flux vidéo & messagerie temps réel (WebRTC, GetStream.io)',
            'Paiements mobiles locaux (Wave, Orange Money) & internationaux (Stripe)',
            'Tests automatisés avec Jest & intégration continue (CI/CD)',
            'Déploiement cloud & monitoring de production',
          ],
        },
      ];

  const qualityCommitments = isEn
    ? [
        {
          title: 'Direct Single Technical Point of Contact',
          description:
            'You collaborate directly with me from initial discovery to live production. Zero sales intermediaries, zero communication distortion.',
        },
        {
          title: 'Full Code & Intellectual Property Ownership',
          description:
            'All source code, database architectures, and deployment keys belong 100% to you. No proprietary vendor lock-in or surprise recurring fees.',
        },
        {
          title: 'Testing Rigor & Comprehensive Documentation',
          description:
            'Every feature is tested and documented. I deliver clear technical documentation enabling your in-house teams or future developers to maintain it easily.',
        },
        {
          title: 'Strict Delivery Timelines & Radical Transparency',
          description:
            'The project schedule is broken down into structured sprint milestones with live review demos. You follow progress in real time with zero surprises.',
        },
      ]
    : [
        {
          title: 'Un interlocuteur technique unique',
          description:
            'Vous échangez directement avec moi du premier appel de cadrage jusqu’à la mise en production. Zéro intermédiaire commercial, zéro déperdition d’information.',
        },
        {
          title: 'Pleine propriété du code et des données',
          description:
            'Tout le code produit, les schémas de base de données et les accès serveurs vous appartiennent intégralement. Aucun verrou technologique ni abonnement masqué.',
        },
        {
          title: 'Rigueur de test et documentation',
          description:
            'Chaque fonctionnalité est testée et documentée. Je fournis une documentation claire facilitant la prise en main par vos équipes ou de futurs développeurs.',
        },
        {
          title: 'Respect strict des délais et transparence',
          description:
            'Le calendrier convenu est découpé en jalons réguliers avec démonstrations intermédiaires. Vous suivez l’avancement en temps réel sans mauvaise surprise.',
        },
      ];

  return (
    <div className="mt-page-about">
      {/* 1. Hero & Présentation Fondateur */}
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
              {isEn ? 'About' : 'À propos'}
            </span>
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
                <span>{isEn ? 'Full Stack Software Engineer & Founder' : 'Développeur Full Stack & Fondateur'}</span>
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
                  ? 'Direct technical guidance from initial kickoff to live launch.'
                  : 'Un accompagnement direct, du premier échange à la mise en ligne.'}
              </h1>

              <p
                className="mt-body"
                style={{
                  fontSize: '18px',
                  lineHeight: 1.6,
                  color: '#172A46',
                  marginBottom: '16px',
                }}
              >
                {isEn ? (
                  <>
                    I am <strong>Moussa Diagne</strong>, a software engineer and Full Stack developer based in Dakar.
                    I established <strong>MusaTech</strong> as a freelance engineering brand to support businesses and
                    founders seeking reliable, robust, and impactful digital solutions.
                  </>
                ) : (
                  <>
                    Je suis <strong>Moussa Diagne</strong>, ingénieur logiciel et développeur Full Stack basé à Dakar.
                    J’ai fondé <strong>MusaTech</strong> comme marque freelance pour accompagner les entreprises et
                    porteurs de projets qui recherchent des solutions numériques fiables, robustes et réellement utiles.
                  </>
                )}
              </p>

              <p
                className="mt-body mt-muted"
                style={{
                  fontSize: '16px',
                  lineHeight: 1.6,
                  marginBottom: '32px',
                }}
              >
                {isEn
                  ? 'MusaTech is not an anonymous agency with layers of account managers: when you partner with MusaTech, you collaborate directly with me. I architect, develop, and deliver your websites, mobile apps, and business platforms built to your exact operational goals.'
                  : 'MusaTech n’est pas une grande agence anonyme avec des dizaines d’intermédiaires : lorsque vous travaillez avec MusaTech, vous collaborez directement avec moi. Je conçois, développe et livre vos sites web, applications mobiles et logiciels métier selon vos objectifs réels.'}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                <LinkButton href={isEn ? '/en/contact' : '/contact'} variant="primary" size="lg">
                  {isEn ? 'Contact Me Directly' : 'Me contacter directement'}
                </LinkButton>
                <LinkButton href={isEn ? '/en/quote' : '/#devis'} variant="secondary" size="lg">
                  {isEn ? 'Request a Custom Proposal' : 'Demander un devis personnalisé'}
                </LinkButton>
              </div>
            </div>

            {/* Carte Identité & Localisation */}
            <div
              style={{
                backgroundColor: '#F8FAFC',
                border: '1px solid #DAE3ED',
                borderRadius: '16px',
                padding: 'clamp(20px, 3.5vw, 32px) clamp(12px, 2.5vw, 32px)',
                boxShadow: '0 8px 24px rgba(11, 23, 48, 0.04)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '24px',
                  borderBottom: '1px solid #E2E8F0',
                  paddingBottom: '18px',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: '#0B1730',
                    color: '#19B8CD',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '20px',
                    fontFamily: 'Manrope, sans-serif',
                  }}
                >
                  MD
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0B1730', margin: 0 }}>
                    Moussa Diagne
                  </h3>
                  <span style={{ fontSize: '13px', color: '#64748B' }}>
                    {isEn ? 'Consultant & Senior Full Stack Engineer' : 'Consultant & Développeur Full Stack Senior'}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <MapPin size={18} color="#19B8CD" style={{ flexShrink: 0 }} />
                  <div>
                    <span style={{ color: '#64748B', display: 'block', fontSize: '11px', textTransform: 'uppercase' }}>
                      {isEn ? 'Location' : 'Localisation'}
                    </span>
                    <strong style={{ color: '#0B1730' }}>
                      {isEn ? 'Dakar, Senegal (GMT / UTC timezone)' : 'Dakar, Sénégal (Fuseau GMT / UTC)'}
                    </strong>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Globe2 size={18} color="#19B8CD" style={{ flexShrink: 0 }} />
                  <div>
                    <span style={{ color: '#64748B', display: 'block', fontSize: '11px', textTransform: 'uppercase' }}>
                      {isEn ? 'Client Coverage' : 'Marchés accompagnés'}
                    </span>
                    <strong style={{ color: '#0B1730' }}>
                      {isEn ? 'Senegal, West Africa & Global Remote' : 'Sénégal, Afrique de l’Ouest & International'}
                    </strong>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Award size={18} color="#19B8CD" style={{ flexShrink: 0 }} />
                  <div>
                    <span style={{ color: '#64748B', display: 'block', fontSize: '11px', textTransform: 'uppercase' }}>
                      {isEn ? 'Core Specializations' : 'Spécialités clés'}
                    </span>
                    <strong style={{ color: '#0B1730' }}>NestJS, React / Next.js, PostgreSQL, React Native</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShieldCheck size={18} color="#19B8CD" style={{ flexShrink: 0 }} />
                  <div>
                    <span style={{ color: '#64748B', display: 'block', fontSize: '11px', textTransform: 'uppercase' }}>
                      {isEn ? 'Engagement Structure' : "Statut d'intervention"}
                    </span>
                    <strong style={{ color: '#0B1730' }}>
                      {isEn
                        ? 'Independent Freelance Consultant under the MusaTech brand'
                        : 'Freelance indépendant sous la marque MusaTech'}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Expérience Professionnelle Validée */}
      <section
        style={{
          padding: 'clamp(56px, 8vw, 96px) 0',
          backgroundColor: '#F4F7FB',
          borderBottom: '1px solid #DAE3ED',
        }}
      >
        <Container>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <SectionHeading
              tag={isEn ? 'Professional Background' : 'Parcours Professionnel'}
              title={
                isEn
                  ? 'Engineering experience forged on high-demand production systems'
                  : 'Une expérience technique forgée sur des projets exigeants'
              }
              description={
                isEn
                  ? 'I have engineered digital solutions across mission-critical domains: high-traffic education, healthcare, logistics, and insurance.'
                  : 'J’ai participé à la conception et au développement de solutions numériques dans plusieurs domaines à forts enjeux : éducation de masse, santé, logistique et assurance.'
              }
              align="center"
            />

            <div style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {experiences.map((exp, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '14px',
                    border: '1px solid #DAE3ED',
                    padding: 'clamp(16px, 3.5vw, 24px) clamp(12px, 2.5vw, 24px)',
                    boxShadow: '0 2px 8px rgba(11, 23, 48, 0.02)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px',
                      marginBottom: '8px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#19B8CD',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {exp.period}
                    </span>
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#172A46',
                        backgroundColor: '#E9F1F7',
                        padding: '3px 8px',
                        borderRadius: '4px',
                      }}
                    >
                      {exp.context}
                    </span>
                  </div>

                  <h3 className="mt-h3" style={{ fontSize: '18px', color: '#0B1730', marginBottom: '8px' }}>
                    {exp.role}
                  </h3>

                  <p className="mt-body mt-muted" style={{ fontSize: '14px', lineHeight: 1.6, marginBottom: '14px' }}>
                    {exp.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {exp.stack.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontSize: '11px',
                          backgroundColor: '#F4F7FB',
                          color: '#1E293B',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          border: '1px solid #DAE3ED',
                          fontWeight: 500,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Domaines d'Expertise */}
      <section
        style={{
          padding: 'clamp(56px, 8vw, 96px) 0',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #DAE3ED',
        }}
      >
        <Container>
          <SectionHeading
            tag={isEn ? 'Core Competencies' : 'Compétences Clés'}
            title={isEn ? 'Technical Architecture & Stack Domains' : "Mes domaines d'expertise technique"}
            description={
              isEn
                ? 'I select modern, durable, and battle-tested technologies to guarantee speed, security, and long-term maintainability for your investment.'
                : 'Je sélectionne des technologies modernes, pérennes et éprouvées pour garantir la rapidité, la sécurité et la pérennité de votre investissement.'
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
            {skillDomains.map((dom, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#F4F7FB',
                  borderRadius: '16px',
                  border: '1px solid #DAE3ED',
                  padding: 'clamp(18px, 3.5vw, 28px) clamp(12px, 2.5vw, 28px)',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #DAE3ED',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                  }}
                >
                  {dom.icon}
                </div>

                <h3 className="mt-h3" style={{ fontSize: '18px', color: '#0B1730', marginBottom: '16px' }}>
                  {dom.title}
                </h3>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {dom.items.map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#172A46', lineHeight: 1.5 }}>
                      <CheckCircle2 size={16} color="#19B8CD" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Méthode de Collaboration & Engagement Qualité */}
      <section
        style={{
          padding: 'clamp(56px, 8vw, 96px) 0',
          backgroundColor: '#0B1730',
          color: '#FFFFFF',
        }}
      >
        <Container>
          <div style={{ maxWidth: '840px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#19B8CD',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  display: 'inline-block',
                  marginBottom: '12px',
                }}
              >
                {isEn ? 'Professional Standards' : 'Démarche Professionnelle'}
              </span>
              <h2 className="mt-h2" style={{ color: '#FFFFFF', marginBottom: '16px' }}>
                {isEn ? 'My Quality Commitments on Every Project' : 'Mon engagement qualité pour chaque projet'}
              </h2>
              <p style={{ color: '#A5B4C7', fontSize: '16px', lineHeight: 1.6 }}>
                {isEn
                  ? 'As your single point of technical contact, I commit to transparent principles that guarantee project success.'
                  : 'En tant qu’interlocuteur unique, je m’engage sur des principes clairs qui garantissent la réussite de nos collaborations.'}
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
                gap: '24px',
              }}
            >
              {qualityCommitments.map((com, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#172A46',
                    borderRadius: '14px',
                    padding: 'clamp(16px, 3.5vw, 24px) clamp(12px, 2.5vw, 24px)',
                    border: '1px solid rgba(218, 227, 237, 0.1)',
                  }}
                >
                  <h3 style={{ fontSize: '17px', color: '#FFFFFF', fontWeight: 700, marginBottom: '10px' }}>
                    {com.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#CBD5E1', lineHeight: 1.6, margin: 0 }}>
                    {com.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Collaboration à Distance */}
      <section
        style={{
          padding: 'clamp(56px, 8vw, 96px) 0',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #DAE3ED',
        }}
      >
        <Container>
          <div
            style={{
              maxWidth: '820px',
              margin: '0 auto',
              backgroundColor: '#F4F7FB',
              border: '1px solid #DAE3ED',
              borderRadius: '16px',
              padding: 'clamp(20px, 3.5vw, 44px) clamp(12px, 2.5vw, 36px)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Globe2 size={24} color="#19B8CD" />
              <h3 className="mt-h3" style={{ fontSize: '20px', color: '#0B1730', margin: 0 }}>
                {isEn ? 'How do we collaborate remotely?' : 'Comment collaborons-nous à distance ?'}
              </h3>
            </div>

            <p className="mt-body mt-muted" style={{ fontSize: '15px', lineHeight: 1.6, marginBottom: '16px' }}>
              {isEn
                ? 'Based in Dakar (GMT/UTC timezone), I support clients locally across West Africa as well as throughout France, Europe, and North America. Remote collaboration is structured and seamless:'
                : 'Basé à Dakar (fuseau GMT/UTC), j’accompagne des clients localement au Sénégal ainsi qu’en France, en Europe et en Amérique du Nord. La collaboration à distance est parfaitement rodée :'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#172A46' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <CheckCircle2 size={16} color="#19B8CD" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  <strong>{isEn ? 'Regular milestone check-ins:' : 'Points d’étape réguliers :'}</strong>{' '}
                  {isEn
                    ? 'structured video conferences via Google Meet or Zoom for scoping and sprint reviews.'
                    : 'réunions vidéo de cadrage et revues régulières via Google Meet ou Zoom.'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <CheckCircle2 size={16} color="#19B8CD" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  <strong>{isEn ? 'Continuous interactive previews:' : 'Démos interactives continues :'}</strong>{' '}
                  {isEn
                    ? 'regular access to testable staging environments directly on your smartphone or desktop.'
                    : 'accès régulier à un environnement de pré-production testable sur votre smartphone ou PC.'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <CheckCircle2 size={16} color="#19B8CD" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  <strong>{isEn ? 'Direct, responsive channels:' : 'Canal direct et réactif :'}</strong>{' '}
                  {isEn
                    ? 'daily communication via WhatsApp for fast responses and formal email summaries for key decisions.'
                    : 'échanges par WhatsApp pour les réponses rapides, et récapitulatifs formels par email.'}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. CTA Final */}
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
            <h2 className="mt-h2" style={{ color: '#FFFFFF', marginBottom: '16px' }}>
              {isEn ? 'Let’s discuss your upcoming project' : 'Faisons connaissance autour de votre projet'}
            </h2>
            <p style={{ color: '#A5B4C7', fontSize: '16px', lineHeight: 1.6, marginBottom: '32px' }}>
              {isEn
                ? 'Have an application idea, a platform redesign, or a business workflow to digitize? Let’s connect for an open, no-obligation technical conversation.'
                : 'Vous avez une idée d’application, un besoin de refonte ou un processus métier à digitaliser ? Discutons-en librement sans aucun engagement.'}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
              <LinkButton
                href={isEn ? '/en/contact' : '/contact'}
                variant="primary"
                size="lg"
                style={{ backgroundColor: '#19B8CD', color: '#0B1730', border: '1px solid #19B8CD' }}
              >
                {isEn ? 'Get in Touch' : 'Me contacter'}
              </LinkButton>
              <LinkButton href={isEn ? '/en/quote' : '/#devis'} variant="outline" size="lg">
                {isEn ? 'Request a Proposal' : 'Remplir une demande de devis'}
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
