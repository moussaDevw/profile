/**
 * Données structurées pour la Homepage commerciale MusaTech
 * Conforme aux spécifications MUSATECH_MASTER_SPEC.md & REQUIREMENTS.md
 * Support multilingue bilingue FR et EN
 */

import { Locale } from '../lib/i18nRoutes';

export interface ProblemItem {
  id: string;
  difficulty: string;
  problemDescription: string;
  solutionBenefit: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  startingPrice: string;
  deliverables: string[];
  ctaText: string;
  ctaHref: string;
  featured?: boolean;
}

export interface SolutionItem {
  sector: string;
  title: string;
  problem: string;
  solution: string;
  features: string[];
  ctaHref: string;
}

export interface RealisationItem {
  id: string;
  name: string;
  client: string;
  category: string;
  year: string;
  impactMetric: string;
  summary: string;
  founderRole: string;
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface MethodStep {
  number: string;
  title: string;
  description: string;
  deliverable: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

// ==========================================
// 1. HERO DATA
// ==========================================
export const HERO_DATA_FR = {
  surtitle: 'DÉVELOPPEMENT WEB, MOBILE & LOGICIEL SUR MESURE',
  title: 'Des solutions digitales qui font avancer votre entreprise.',
  description:
    'MusaTech conçoit des sites web professionnels, des applications mobiles et des plateformes métier pour vous aider à gagner en visibilité, simplifier votre gestion et développer votre activité.',
  complementaryText:
    "Basé à Dakar, j'accompagne des entreprises et entrepreneurs au Sénégal et à l'international.",
  cta1: {
    label: 'Demander un devis',
    href: '/fr/devis',
  },
  cta2: {
    label: 'Découvrir mes réalisations',
    href: '/fr/realisations',
  },
  previewBadge: 'Architecture & Supervision Live',
  statusLive: 'Opérationnel',
};

export const HERO_DATA_EN = {
  surtitle: 'CUSTOM WEB, MOBILE & SOFTWARE ENGINEERING',
  title: 'High-impact digital solutions designed to grow your business.',
  description:
    'MusaTech designs high-performance websites, mobile applications, and custom business platforms to elevate your brand, streamline operations, and drive sustainable growth.',
  complementaryText:
    'Based in Dakar, Senegal, partnering with ambitious companies and startups worldwide.',
  cta1: {
    label: 'Request a Quote',
    href: '/en/quote',
  },
  cta2: {
    label: 'Explore Case Studies',
    href: '/en/case-studies',
  },
  previewBadge: 'Architecture & Live Operations',
  statusLive: 'Operational',
};

export const HERO_DATA = HERO_DATA_FR;

export function getHeroData(locale: Locale = 'fr') {
  return locale === 'en' ? HERO_DATA_EN : HERO_DATA_FR;
}

// ==========================================
// 2. PROBLEMS DATA
// ==========================================
export const PROBLEMS_DATA_FR: ProblemItem[] = [
  {
    id: 'visibilite',
    difficulty: 'Manque de visibilité en ligne',
    problemDescription:
      'Sans présence web soignée, vos prospects peinent à vous trouver et se tournent vers vos concurrents plus visibles.',
    solutionBenefit:
      'Un site vitrine ou e-commerce moderne, rapide et optimisé pour le référencement local et international afin de capter des contacts qualifiés.',
  },
  {
    id: 'gestion-manuelle',
    difficulty: 'Gestion manuelle des opérations',
    problemDescription:
      'Facturation sur tableur, suivi WhatsApp et doubles saisies mobilisent un temps précieux et augmentent les risques d’erreur.',
    solutionBenefit:
      'Un logiciel métier ou portail sur-mesure qui centralise vos données, fiabilise vos flux et vous libère du temps utile.',
  },
  {
    id: 'outils-deconnectes',
    difficulty: 'Outils déconnectés',
    problemDescription:
      'Des logiciels séparés qui ne communiquent pas entre eux créent des silos et ralentissent la prise de décision.',
    solutionBenefit:
      'Des intégrations techniques fluides (API, paiements mobiles Wave/Orange Money, exports automatisés) pour unifier votre écosystème.',
  },
  {
    id: 'idee-digitale',
    difficulty: 'Besoin de lancer une idée digitale',
    problemDescription:
      'Transformer un concept en application sans accompagnement technique solide mène souvent à des dépassements de budget.',
    solutionBenefit:
      'Un cadrage technique rigoureux et un développement étape par étape (MVP) pour valider votre produit avec vos premiers utilisateurs réels.',
  },
];

export const PROBLEMS_DATA_EN: ProblemItem[] = [
  {
    id: 'visibilite',
    difficulty: 'Low Online Visibility & Conversions',
    problemDescription:
      'Without a high-performance web presence, potential clients struggle to find your business and turn to visible competitors.',
    solutionBenefit:
      'A bespoke, fast, SEO-optimized business or e-commerce website designed to capture qualified leads and establish strong authority.',
  },
  {
    id: 'gestion-manuelle',
    difficulty: 'Manual Operations & Spreadsheet Bottlenecks',
    problemDescription:
      'Managing invoices, client communications, and operations manually on spreadsheets consumes valuable hours and invites errors.',
    solutionBenefit:
      'A custom business platform that centralizes critical data, automates repetitive tasks, and frees up your team for core growth.',
  },
  {
    id: 'outils-deconnectes',
    difficulty: 'Disconnected Systems & Data Silos',
    problemDescription:
      'Isolated tools that do not communicate create blind spots, double entries, and slow down strategic decisions.',
    solutionBenefit:
      'Robust API integrations, automated syncing, and secure payment workflows to unify your digital ecosystem into one coherent hub.',
  },
  {
    id: 'idee-digitale',
    difficulty: 'Translating Product Vision into Code',
    problemDescription:
      'Launching a new digital product without seasoned software architecture often results in scope creep and blown budgets.',
    solutionBenefit:
      'Disciplined MVP scoping and phased engineering to ship working software fast and validate product-market fit with real users.',
  },
];

export const PROBLEMS_DATA = PROBLEMS_DATA_FR;

export function getProblemsData(locale: Locale = 'fr'): ProblemItem[] {
  return locale === 'en' ? PROBLEMS_DATA_EN : PROBLEMS_DATA_FR;
}

// ==========================================
// 3. SERVICES DATA
// ==========================================
export const SERVICES_DATA_FR: ServiceItem[] = [
  {
    id: 'sites-web',
    title: 'Sites web professionnels',
    description:
      'Valorisez votre entreprise avec un site moderne, rapide et accessible sur tous les appareils.',
    startingPrice: 'À partir de 250 000 FCFA',
    deliverables: [
      'Design responsive sur-mesure',
      'Optimisation SEO de base & rapidité',
      'Formulaire de contact & bouton WhatsApp',
      'Hébergement & nom de domaine inclus',
    ],
    ctaText: "Découvrir l'offre",
    ctaHref: '/services/sites-web',
  },
  {
    id: 'e-commerce',
    title: 'Sites e-commerce',
    description:
      'Développez vos ventes en ligne avec une boutique adaptée à vos produits et à vos clients.',
    startingPrice: 'À partir de 600 000 FCFA',
    deliverables: [
      'Catalogue produits & gestion des stocks',
      'Paiement sécurisé (Wave, Orange Money, Carte)',
      'Tableau de bord des commandes',
      'Interface d’administration simplifiée',
    ],
    ctaText: "Découvrir l'offre",
    ctaHref: '/services/e-commerce',
    featured: true,
  },
  {
    id: 'logiciels-metier',
    title: 'Plateformes & logiciels métier',
    description:
      'Centralisez vos informations et automatisez vos processus grâce à une solution sur mesure.',
    startingPrice: 'À partir de 1 500 000 FCFA',
    deliverables: [
      'Architecture modulaire robuste',
      'Gestion des rôles & droits d’accès',
      'Rapports d’activité & exports Excel/PDF',
      'Documentation technique complète',
    ],
    ctaText: "Découvrir l'offre",
    ctaHref: '/services/logiciels-metier',
  },
  {
    id: 'applications-mobiles',
    title: 'Applications mobiles',
    description:
      'Offrez une expérience mobile adaptée à votre projet sur iOS et Android.',
    startingPrice: 'À partir de 1 800 000 FCFA',
    deliverables: [
      'Application cross-platform (React Native / Expo)',
      'Backend sécurisé connecté & notifications',
      'Mode hors-ligne ou temps réel',
      'Préparation au déploiement Stores',
    ],
    ctaText: "Découvrir l'offre",
    ctaHref: '/services/applications-mobiles',
  },
];

export const SERVICES_DATA_EN: ServiceItem[] = [
  {
    id: 'sites-web',
    title: 'Professional Websites',
    description:
      'Elevate your brand with a fast, responsive, and accessible web presence engineered for maximum engagement.',
    startingPrice: 'Starting from 250,000 XOF · Custom international quote upon request',
    deliverables: [
      'Bespoke responsive design',
      'Core SEO & ultra-fast loading',
      'Direct contact & WhatsApp integration',
      'Secure hosting & custom domain setup',
    ],
    ctaText: 'Explore Service',
    ctaHref: '/en/services/websites',
  },
  {
    id: 'e-commerce',
    title: 'Custom E-commerce',
    description:
      'Accelerate online sales with an intuitive store tailored to your catalog and smooth customer checkout journeys.',
    startingPrice: 'Starting from 600,000 XOF · Custom international quote upon request',
    deliverables: [
      'Product catalog & inventory management',
      'Secure multi-currency payments & mobile checkout',
      'Order fulfillment & sales dashboard',
      'Streamlined admin back-office',
    ],
    ctaText: 'Explore Service',
    ctaHref: '/en/services/e-commerce',
    featured: true,
  },
  {
    id: 'logiciels-metier',
    title: 'Custom Business Software',
    description:
      'Centralize mission-critical operations and automate complex workflows with a purpose-built system.',
    startingPrice: 'Starting from 1,500,000 XOF · Tailored scope upon request',
    deliverables: [
      'Resilient modular architecture (NestJS/Node)',
      'Role-based access control (RBAC)',
      'Operational analytics & Excel/PDF reporting',
      'Comprehensive OpenAPI / Swagger documentation',
    ],
    ctaText: 'Explore Service',
    ctaHref: '/en/services/business-software',
  },
  {
    id: 'applications-mobiles',
    title: 'Mobile Applications',
    description:
      'Deliver fluid, native-grade mobile experiences for your customers or field teams on iOS and Android.',
    startingPrice: 'Starting from 1,800,000 XOF · Tailored scope upon request',
    deliverables: [
      'Cross-platform mobile app (React Native / Expo)',
      'Secure connected backend & push notifications',
      'Offline resilience & real-time sync',
      'App Store & Google Play preparation',
    ],
    ctaText: 'Explore Service',
    ctaHref: '/en/services/mobile-apps',
  },
];

export const SERVICES_DATA = SERVICES_DATA_FR;

export function getServicesData(locale: Locale = 'fr'): ServiceItem[] {
  return locale === 'en' ? SERVICES_DATA_EN : SERVICES_DATA_FR;
}

export const SERVICES_DISCLAIMER_FR =
  'Tarifs de départ pour un périmètre défini. Chaque projet fait l’objet d’un devis personnalisé.';
export const SERVICES_DISCLAIMER_EN =
  'Starting baseline for defined scope. Every project receives a tailored technical and financial proposal.';
export const SERVICES_DISCLAIMER = SERVICES_DISCLAIMER_FR;

export function getServicesDisclaimer(locale: Locale = 'fr'): string {
  return locale === 'en' ? SERVICES_DISCLAIMER_EN : SERVICES_DISCLAIMER_FR;
}

// ==========================================
// 4. SOLUTIONS DATA
// ==========================================
export const SOLUTIONS_DATA_FR: SolutionItem[] = [
  {
    sector: 'Immobilier',
    title: 'Agences & Gestionnaires de biens',
    problem:
      'Catalogues dispersés sur les réseaux sociaux et suivi complexe des demandes de visite.',
    solution:
      'Plateforme web avec catalogue géolocalisé, filtres de recherche multicritères et mise en relation directe par WhatsApp.',
    features: ['Recherche avancée', 'Visite virtuelle / photos HD', 'Formulaire mandat'],
    ctaHref: '/solutions/immobilier',
  },
  {
    sector: 'Éducation',
    title: 'Écoles privées & Centres de formation',
    problem:
      'Inscriptions papier chronophages et absence d’espace centralisé pour les apprenants.',
    solution:
      'Portail de gestion des inscriptions, planning de cours, suivi des évaluations et partage sécurisé de ressources.',
    features: ['Espace apprenant', 'Paiement des mensualités', 'Génération d’attestations'],
    ctaHref: '/solutions/education',
  },
  {
    sector: 'Commerce',
    title: 'Boutiques, Grossistes & Distributeurs',
    problem:
      'Difficulté à suivre les stocks en temps réel et pertes de commandes hors horaires d’ouverture.',
    solution:
      'Boutique connectée avec synchronisation des stocks, notifications automatiques de commande et encaissement mobile.',
    features: ['Wave & OM intégrés', 'Calcul des frais de livraison', 'Alertes stock bas'],
    ctaHref: '/solutions/commerce',
  },
  {
    sector: 'Logistique',
    title: 'Transporteurs & Gestionnaires de fret',
    problem:
      'Visibilité insuffisante sur l’état d’acheminement des colis et lourdeurs de reporting.',
    solution:
      'Tableau de bord de supervision des expéditions, statuts d’étapes et génération automatique des bordereaux.',
    features: ['Suivi en temps réel', 'Bordereaux PDF automatisés', 'Statistiques de livraison'],
    ctaHref: '/solutions/logistique',
  },
];

export const SOLUTIONS_DATA_EN: SolutionItem[] = [
  {
    sector: 'Real Estate',
    title: 'Property Agencies & Asset Managers',
    problem:
      'Property listings scattered across chat groups and disorganized scheduling of viewing visits.',
    solution:
      'Geolocated property catalog with multicriteria search filters, lead management, and direct WhatsApp scheduling.',
    features: ['Advanced property search', 'HD galleries & virtual tours', 'Lead intake form'],
    ctaHref: '/en/solutions/real-estate',
  },
  {
    sector: 'Education',
    title: 'Schools & Training Academies',
    problem:
      'Time-consuming manual paper registrations and lack of a central online portal for students.',
    solution:
      'Unified portal handling admissions, course schedules, academic tracking, and automated tuition reminders.',
    features: ['Student portal', 'Tuition payments', 'Certificate generation'],
    ctaHref: '/en/solutions/education',
  },
  {
    sector: 'Retail',
    title: 'Retailers, Wholesalers & Distributors',
    problem:
      'Inability to track inventory levels across sales points and lost sales during off-hours.',
    solution:
      'Connected commerce portal with real-time stock sync, automatic order notifications, and digital checkout.',
    features: ['Integrated mobile checkout', 'Delivery fee calculator', 'Low-stock alerts'],
    ctaHref: '/en/solutions/retail',
  },
  {
    sector: 'Logistics',
    title: 'Freight Operators & Delivery Carriers',
    problem:
      'Lack of real-time shipment transparency and tedious manual paperwork generation.',
    solution:
      'Dispatch tracking dashboard with live milestone updates, automated waybills, and driver assignments.',
    features: ['Live parcel tracking', 'Automated PDF waybills', 'Delivery metrics'],
    ctaHref: '/en/solutions/logistics',
  },
];

export const SOLUTIONS_DATA = SOLUTIONS_DATA_FR;

export function getSolutionsData(locale: Locale = 'fr'): SolutionItem[] {
  return locale === 'en' ? SOLUTIONS_DATA_EN : SOLUTIONS_DATA_FR;
}

// ==========================================
// 5. REALISATIONS DATA
// ==========================================
export const REALISATIONS_DATA: RealisationItem[] = [
  {
    id: 'assure-express',
    name: 'Assure Express',
    client: "Application mobile d'assurance automobile",
    category: 'InsurTech & Mobile',
    year: '2025',
    impactMetric: 'Architecture NestJS & Cache Redis',
    summary:
      'Application mobile dédiée à la souscription et gestion d’assurances pour véhicules. Backend NestJS modulaire, base PostgreSQL, documentation Swagger et tests unitaires.',
    founderRole:
      'Développeur Full Stack : conception de l’architecture backend NestJS, modélisation de la base PostgreSQL et intégration des flux de souscription.',
    stack: ['NestJS', 'Node.js', 'React Native', 'PostgreSQL', 'Redis', 'Jest', 'Swagger'],
    githubUrl: 'https://github.com/moussaDevw/assure-express',
  },
  {
    id: 'edaktarii',
    name: 'eDaktari',
    client: 'Téléconsultation médicale Afrique × Europe',
    category: 'HealthTech & WebRTC',
    year: '2025',
    impactMetric: 'Consultation vidéo & Normes WCAG',
    summary:
      'Plateforme de mise en relation entre patients et praticiens de santé. Prise de rendez-vous en direct, visioconférence sécurisée, messagerie chiffrée et respect des normes d’accessibilité.',
    founderRole:
      'Consultant Software Engineer : développement des interfaces Next.js 14, intégration du flux vidéo temps réel et sécurisation des échanges.',
    stack: ['Next.js 14', 'TypeScript', 'GetStream.io', 'PostgreSQL', 'Zustand', 'Stripe'],
  },
  {
    id: 'yello-edtech',
    name: 'Yello Studio',
    client: 'Plateforme EdTech IA (+200 000 apprenants)',
    category: 'EdTech & IA',
    year: '2024-2025',
    impactMetric: 'Microlearning & Quiz IA',
    summary:
      'Plateforme d’apprentissage interactif transformant des supports pédagogiques en microlearning dynamique. Contribution reconnue aux fonctionnalités frontend clés.',
    founderRole:
      'Senior Frontend Developer : conception et implémentation des parcours d’apprentissage interactifs, du chatbot pédagogique et des tableaux de bord.',
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'IA générative'],
  },
  {
    id: 'istamco',
    name: 'Istamco',
    client: 'CRM métier transport & transit international',
    category: 'Logistique & CRM',
    year: '2024',
    impactMetric: 'Zéro ressaisie & Facturation',
    summary:
      'Système d’information sur mesure pour la gestion des dossiers de fret, la facturation des prestations maritimes et le suivi des déclarations douanières.',
    founderRole:
      'Lead Developer : modélisation des entités métier, développement des workflows de dossiers de transit et automatisation de l’édition des factures.',
    stack: ['Node.js', 'Express', 'React', 'PostgreSQL', 'PDFKit'],
  },
];

export const REALISATIONS_DATA_EN: RealisationItem[] = [
  {
    id: 'assure-express',
    name: 'Assure Express',
    client: 'Motor Vehicle Insurance Mobile App',
    category: 'InsurTech & Mobile',
    year: '2025',
    impactMetric: 'NestJS Architecture & Redis Cache',
    summary:
      'Mobile application designed for digital insurance subscription and policy management. Modular NestJS backend, PostgreSQL database, OpenAPI/Swagger docs, and automated Jest test suites.',
    founderRole:
      'Full Stack Developer: architectural design of the NestJS backend, relational modeling, and secure policy subscription APIs.',
    stack: ['NestJS', 'Node.js', 'React Native', 'PostgreSQL', 'Redis', 'Jest', 'Swagger'],
    githubUrl: 'https://github.com/moussaDevw/assure-express',
  },
  {
    id: 'edaktarii',
    name: 'eDaktari',
    client: 'Telemedicine Platform Africa × Europe',
    category: 'HealthTech & WebRTC',
    year: '2025',
    impactMetric: 'Real-time Video & WCAG Compliance',
    summary:
      'Healthcare platform connecting patients with certified medical specialists. Features instant appointment booking, secure WebRTC video consultations, and high accessibility standards.',
    founderRole:
      'Consultant Software Engineer: Next.js 14 frontend engineering, real-time video stream integration, and data exchange security.',
    stack: ['Next.js 14', 'TypeScript', 'GetStream.io', 'PostgreSQL', 'Zustand', 'Stripe'],
  },
  {
    id: 'yello-edtech',
    name: 'Yello Studio',
    client: 'AI-Powered EdTech Platform (200k+ learners)',
    category: 'EdTech & AI',
    year: '2024-2025',
    impactMetric: 'Adaptive Microlearning & AI Quizzes',
    summary:
      'Interactive learning platform transforming educational materials into engaging microlearning modules. Recognized contribution to key frontend product features.',
    founderRole:
      'Senior Frontend Developer: architected and engineered interactive learning flows, educational AI chatbot interfaces, and student progress dashboards.',
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Generative AI'],
  },
  {
    id: 'istamco',
    name: 'Istamco',
    client: 'International Freight Forwarding CRM',
    category: 'Logistics & CRM',
    year: '2024',
    impactMetric: 'Zero Data Entry Duplication',
    summary:
      'Custom enterprise system managing sea freight dossiers, customs clearance tracking, and automated multi-currency client billing.',
    founderRole:
      'Lead Developer: domain modeling, workflow implementation for shipment dossiers, and automated PDF invoice generation.',
    stack: ['Node.js', 'Express', 'React', 'PostgreSQL', 'PDFKit'],
  },
];

export function getFeaturedProjects(locale: Locale = 'fr'): RealisationItem[] {
  return locale === 'en' ? REALISATIONS_DATA_EN : REALISATIONS_DATA;
}

// ==========================================
// 6. METHOD DATA
// ==========================================
export const METHOD_STEPS_FR: MethodStep[] = [
  {
    number: '01',
    title: 'Échange & Cadrage précis',
    description:
      'Nous échangeons en visio ou par WhatsApp pour comprendre vos objectifs métier, vos contraintes et le périmètre exact.',
    deliverable: 'Cahier des charges synthétique & Devis clair sans coûts cachés',
  },
  {
    number: '02',
    title: 'Conception & Validation',
    description:
      'Création des maquettes de l’interface et validation du parcours utilisateur avant de lancer le développement technique.',
    deliverable: 'Maquettes visuelles & Architecture des données validées',
  },
  {
    number: '03',
    title: 'Développement & Tests',
    description:
      'Développement étape par étape avec des démonstrations intermédiaires. Tests sur plusieurs appareils et navigateurs.',
    deliverable: 'Lien de prévisualisation privé & Code testé et documenté',
  },
  {
    number: '04',
    title: 'Mise en ligne & Formation',
    description:
      'Déploiement sur votre nom de domaine sécurisé (HTTPS), configuration des sauvegardes et prise en main de l’interface.',
    deliverable: 'Site ou application en production & Guide d’utilisation',
  },
];

export const METHOD_STEPS_EN: MethodStep[] = [
  {
    number: '01',
    title: 'Discovery & Precise Scoping',
    description:
      'We meet via video call or WhatsApp to understand your business objectives, technical constraints, and define the exact scope.',
    deliverable: 'Detailed functional specifications & transparent fixed proposal',
  },
  {
    number: '02',
    title: 'UX Design & Prototyping',
    description:
      'Drafting user interface wireframes and validating customer journeys before writing production code.',
    deliverable: 'Interactive prototypes & validated database architecture',
  },
  {
    number: '03',
    title: 'Agile Engineering & Rigorous Testing',
    description:
      'Iterative development with regular progress demos. Cross-browser testing and performance optimization across devices.',
    deliverable: 'Private staging URL & documented, test-backed codebase',
  },
  {
    number: '04',
    title: 'Deployment & Knowledge Handover',
    description:
      'Smooth production rollout on your custom domain (HTTPS), automated backups, and administrator training session.',
    deliverable: 'Live production release & step-by-step user documentation',
  },
];

export const METHOD_STEPS = METHOD_STEPS_FR;

export function getMethodSteps(locale: Locale = 'fr'): MethodStep[] {
  return locale === 'en' ? METHOD_STEPS_EN : METHOD_STEPS_FR;
}

// ==========================================
// 7. FOUNDER DATA
// ==========================================
export const FOUNDER_DATA_FR = {
  name: 'Moussa Diagne',
  role: 'Fondateur de MusaTech — Développeur Full Stack',
  location: 'Dakar, Sénégal (Disponible en remote & présentiel)',
  bio: 'Passionné d’ingénierie logicielle et de solutions pratiques, j’ai développé des plateformes pour des startups à fort trafic et des entreprises en croissance. Avec MusaTech, je mets cette rigueur technique au service de vos projets en garantissant un contact direct, une réactivité exemplaire et un code pérenne.',
  credentials: [
    'Expérience confirmée sur des architectures NestJS, Node.js, React et Next.js',
    'Conception d’applications mobiles iOS & Android sous React Native',
    'Méthodes agiles, documentation technique complète (OpenAPI/Swagger) et tests automatisés',
  ],
  stats: [
    { label: "Années d'expérience", value: '4+' },
    { label: 'Projets livrés', value: '15+' },
    { label: 'Disponibilité', value: '2026' },
  ],
};

export const FOUNDER_DATA_EN = {
  name: 'Moussa Diagne',
  role: 'Founder of MusaTech — Full Stack Software Engineer',
  location: 'Dakar, Senegal (Available for remote and on-site contracts)',
  bio: 'Driven by rigorous software engineering and high-utility digital products, I have architected and built systems for fast-growing startups and established businesses. Through MusaTech, I offer direct senior technical leadership: no agency overhead, rapid turnaround, and clean, maintainable code.',
  credentials: [
    'Proven track record on high-availability NestJS, Node.js, React, and Next.js architectures',
    'Cross-platform iOS and Android engineering using React Native & Expo',
    'Disciplined engineering: comprehensive OpenAPI/Swagger documentation and automated test suites',
  ],
  stats: [
    { label: 'Years of Experience', value: '4+' },
    { label: 'Projects Delivered', value: '15+' },
    { label: 'Availability', value: '2026' },
  ],
};

export const FOUNDER_DATA = FOUNDER_DATA_FR;

export function getFounderData(locale: Locale = 'fr') {
  return locale === 'en' ? FOUNDER_DATA_EN : FOUNDER_DATA_FR;
}

// ==========================================
// 8. FAQ DATA
// ==========================================
export const HOME_FAQ_FR: FaqItem[] = [
  {
    question: 'Quel est le prix d’un site web ?',
    answer:
      'Nos tarifs démarrent à 250 000 FCFA pour un site web professionnel vitrine, 600 000 FCFA pour une boutique e-commerce et 1 500 000 FCFA pour un logiciel métier sur mesure. Chaque projet faisant l’objet d’un cahier des charges précis, nous vous transmettons un devis détaillé et transparent sous 24 à 48h ouvrées.',
  },
  {
    question: 'Quels sont les délais habituels de livraison ?',
    answer:
      'Un site web professionnel est généralement livré en 2 à 3 semaines. Un e-commerce complet nécessite 3 à 5 semaines, et une plateforme métier ou application mobile prend entre 6 et 10 semaines selon la complexité des règles de gestion.',
  },
  {
    question: 'Puis-je modifier le contenu de mon site moi-même après la livraison ?',
    answer:
      'Absolument. Nous mettons en place une interface d’administration ergonomique qui vous permet d’actualiser vos textes, produits, tarifs et images en toute autonomie, sans aucune compétence en programmation.',
  },
  {
    question: 'Travaillez-vous avec des clients en dehors du Sénégal ?',
    answer:
      'Oui, régulièrement. Grâce aux outils de visioconférence (Google Meet), aux messageries professionnelles et aux environnements de prévisualisation en ligne, nous collaborons efficacement avec des entreprises situées en Europe, en Amérique du Nord et dans toute la sous-région ouest-africaine.',
  },
  {
    question: 'Comment se passe le paiement ?',
    answer:
      'Les règlements s’effectuent de manière échelonnée : un acompte au démarrage du projet (généralement 40%), un versement intermédiaire à la validation des maquettes/développement (30%), et le solde lors de la livraison finale et de la mise en ligne (30%). Les paiements par virement bancaire, Wave et Orange Money sont acceptés.',
  },
];

export const HOME_FAQ_EN: FaqItem[] = [
  {
    question: 'How much does it cost to build a website or application?',
    answer:
      'Baseline fees start at 250,000 XOF (~€380) for a corporate website, 600,000 XOF (~€915) for an e-commerce platform, and 1,500,000 XOF (~€2,285) for bespoke business software. Because every business has unique requirements, we provide a detailed, fixed-price proposal within 24 to 48 business hours.',
  },
  {
    question: 'What are typical project turnaround times?',
    answer:
      'A corporate business website is typically delivered within 2 to 3 weeks. A full-featured e-commerce platform takes 3 to 5 weeks, while custom business software or mobile applications range from 6 to 10 weeks depending on architectural complexity.',
  },
  {
    question: 'Can I manage website content myself after delivery?',
    answer:
      'Yes, absolutely. We integrate user-friendly content management workflows allowing you to update text, products, pricing, and media independently without touching any code.',
  },
  {
    question: 'Do you work with international clients outside of Senegal?',
    answer:
      'Yes, frequently. Through modern collaboration tools (Google Meet, async demos, private staging deployments), we seamlessly partner with companies across Europe, North America, and West Africa.',
  },
  {
    question: 'What are your payment terms?',
    answer:
      'Payments follow milestone-based installments: 40% upfront deposit upon contract signing, 30% upon approval of intermediate functional milestones, and 30% upon final production launch. We accept international bank transfers, Stripe, and West African Mobile Money.',
  },
];

export const HOME_FAQ = HOME_FAQ_FR;

export function getHomeFaq(locale: Locale = 'fr'): FaqItem[] {
  return locale === 'en' ? HOME_FAQ_EN : HOME_FAQ_FR;
}

// ==========================================
// 9. FINAL CTA DATA
// ==========================================
export const FINAL_CTA_DATA_FR = {
  title: 'Prêt à donner un coup d’accélérateur à votre activité ?',
  description:
    'Discutons de votre projet sans engagement. Obtenez une estimation claire, des conseils techniques adaptés et une proposition de collaboration sur mesure.',
  cta1: {
    label: 'Demander un devis gratuit',
    href: '/fr/devis',
  },
  cta2: {
    label: 'Échanger par WhatsApp',
    href: 'https://wa.me/221780105426?text=Bonjour%20Moussa,%20je%20souhaite%20discuter%20d%27un%20projet%20digital.',
  },
};

export const FINAL_CTA_DATA_EN = {
  title: 'Ready to elevate your business operations?',
  description:
    'Let’s discuss your project goals with zero obligation. Receive transparent technical advice, clear milestones, and a tailored proposal.',
  cta1: {
    label: 'Request a Free Quote',
    href: '/en/quote',
  },
  cta2: {
    label: 'Chat on WhatsApp',
    href: 'https://wa.me/221780105426?text=Hello%20Moussa,%20I%20would%20like%20to%20discuss%20a%20digital%20project.',
  },
};

export const FINAL_CTA_DATA = FINAL_CTA_DATA_FR;

export function getFinalCtaData(locale: Locale = 'fr') {
  return locale === 'en' ? FINAL_CTA_DATA_EN : FINAL_CTA_DATA_FR;
}

export const FAQ_DATA = HOME_FAQ_FR;

// ==========================================
// 10. ABOUT FOUNDER SECTION DATA
// ==========================================
export const ABOUT_DATA_FR = {
  title: 'Un interlocuteur technique direct pour sécuriser vos projets.',
  p1: 'MusaTech a été fondée par Moussa Diagne avec une vision claire : apporter aux entreprises et startups l’excellence d’ingénierie des grandes plateformes sans la lourdeur d’une agence traditionnelle.',
  p2: 'Basé à Dakar, j’interviens comme développeur full stack et architecte sur l’ensemble du cycle de vie de votre application : cadrage des besoins, modélisation de base de données, développement backend NestJS/Node et interfaces web ou mobiles fluides.',
  p3: 'Chaque projet bénéficie d’un suivi transparent, de code source propre et documenté, et d’un accompagnement personnalisé pour garantir sa rentabilité dans la durée.',
  ctaText: 'Découvrir mon parcours complet',
  ctaHref: '/fr/a-propos',
};

export const ABOUT_DATA_EN = {
  title: 'A direct senior engineer to de-risk and accelerate your software.',
  p1: 'MusaTech was founded by Moussa Diagne with a clear mission: delivering top-tier software engineering to growing companies and startups without traditional agency overhead or diluted communication.',
  p2: 'Based in Dakar, Senegal, I work as a lead full-stack engineer and architect across the entire lifecycle: technical scoping, database schema design, high-throughput NestJS/Node backends, and responsive React/Next.js/React Native interfaces.',
  p3: 'Every engagement benefits from transparent progress demos, test-backed and documented codebases, and direct accountability from day one.',
  ctaText: 'Explore My Professional Background',
  ctaHref: '/en/about',
};

export const ABOUT_DATA = ABOUT_DATA_FR;

export function getAboutData(locale: Locale = 'fr') {
  return locale === 'en' ? ABOUT_DATA_EN : ABOUT_DATA_FR;
}
