/**
 * Schéma de données typé et centralisé des réalisations MusaTech
 * Conforme à MUSATECH_MASTER_SPEC.md, REQUIREMENTS.md et directives déontologiques
 */

export type ProjectNature =
  | 'personal_project'   // Projet personnel (démonstrateur technique open-source)
  | 'freelance_mission'  // Projet freelance (prestation de services pour un client)
  | 'team_project'       // Projet réalisé en équipe (contribution à un produit collaboratif)
  | 'employee_project';  // Projet réalisé pour un employeur (salarié d'une entreprise)

export interface ProjectTechnology {
  name: string;
  category?: 'Frontend' | 'Backend' | 'Base de données' | 'DevOps / Infra' | 'Outils';
}

export interface TechnicalChallenge {
  title: string;
  description: string;
  resolution: string;
}

export interface VerifiedResults {
  metricHighlight?: string;
  description: string;
  sourceOrEvidence: string;
}

export interface DemoAndMedia {
  hasAuthorizedScreenshots: boolean;
  screenshotsNote: string;
  githubRepoUrl?: string;
  liveDemoUrl?: string;
  ndaProtected: boolean;
}

export interface ProjectDetail {
  slug: string;
  name: string;
  year: string;
  sector: string;
  solutionType: string;
  clientOrContext: string;
  
  // Nature & distinction de propriété
  nature: ProjectNature;
  natureLabel: string;
  attributionDisclaimer: string;
  
  // Résumé pour les cartes listing
  shortSummary: string;
  
  // 11 points obligatoires pour l'étude de cas
  presentation: string;
  businessContext: string;
  problemToSolve: string;
  solutionDeveloped: string;
  mainFeatures: string[];
  personalContribution: {
    roleTitle: string;
    description: string;
    keyDeliverables: string[];
  };
  technologies: ProjectTechnology[];
  technicalChallenges: TechnicalChallenge[];
  verifiedResults?: VerifiedResults;
  demoAndMedia: DemoAndMedia;
  
  // SEO
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  
  relatedServiceSlug?: string;
}

export const PROJECTS_DATA_FR: Record<string, ProjectDetail> = {
  'assure-express': {
    slug: 'assure-express',
    name: 'Assure Express',
    year: '2025',
    sector: 'InsurTech & Assurance',
    solutionType: 'Application Mobile & Backend Modulaire',
    clientOrContext: 'Projet Démonstrateur Open-Source (Référence Technique)',
    nature: 'personal_project',
    natureLabel: 'Projet personnel',
    attributionDisclaimer:
      'Ce projet a été entièrement conçu, modélisé et développé par Moussa Diagne à titre de projet démonstrateur technique. Il est disponible publiquement sur GitHub comme référence d’architecture logicielle.',
    shortSummary:
      'Architecture backend complète NestJS/PostgreSQL avec cache Redis et application mobile React Native pour la souscription dématérialisée d’assurances véhicules.',
    
    // 1. Présentation
    presentation:
      'Assure Express est une application mobile cross-platform accompagnée d’un backend d’entreprise modulaire, conçue pour dématérialiser l’intégralité du parcours de souscription et de déclaration d’assurance pour véhicules particuliers et professionnels.',
    
    // 2. Contexte métier
    businessContext:
      'Dans le secteur de l’assurance automobile, les démarches d’adhésion et de renouvellement nécessitent traditionnellement des formulaires papier, des photocopies de pièces justificatives et des délais de traitement administratifs manuels allant de 48h à plusieurs jours.',
    
    // 3. Problème à résoudre
    problemToSolve:
      'Comment permettre à un conducteur de calculer sa prime en temps réel, de soumettre ses documents et de générer son attestation provisoire depuis son smartphone, tout en offrant aux gestionnaires une API sécurisée et auditable ?',
    
    // 4. Solution développée
    solutionDeveloped:
      'Un système modulaire fondé sur une API REST NestJS haute performance, une base relationnelle PostgreSQL strictement typée, un cache Redis pour accélérer le calcul des devis et une documentation interactive Swagger/OpenAPI permettant des intégrations externes simplifiées.',
    
    // 5. Fonctionnalités principales
    mainFeatures: [
      'Simulateur tarifaire instantané par type de véhicule et niveau de garantie',
      'Collecte et validation numérique des pièces justificatives (permis, carte grise)',
      'Génération automatique de police d’assurance et attestations provisoires en PDF',
      'Documentation complète de l’API via Swagger/OpenAPI interactive',
      'Gestion des rôles (Assuré, Gestionnaire de sinistre, Administrateur)',
      'Historique complet des transactions et notifications par email',
    ],
    
    // 6. Contribution personnelle exacte
    personalContribution: {
      roleTitle: 'Développeur Full Stack & Architecte Logiciel',
      description:
        'Conception intégrale de l’architecture système, implémentation des modules NestJS, modélisation de la base de données relationnelle et écriture des tests unitaires et d’intégration.',
      keyDeliverables: [
        'Architecture logicielle modulaire NestJS (Clean Architecture / DDD léger)',
        'Schéma de base de données PostgreSQL avec migrations versionnées',
        'Suite de tests automatisés avec Jest couvrant les flux critiques',
        'Mise en place du cache Redis pour la tarification dynamique',
        'Documentation d’API conforme à la spécification OpenAPI 3.0',
      ],
    },
    
    // 7. Technologies utilisées
    technologies: [
      { name: 'NestJS', category: 'Backend' },
      { name: 'TypeScript', category: 'Backend' },
      { name: 'PostgreSQL', category: 'Base de données' },
      { name: 'Redis', category: 'Base de données' },
      { name: 'React Native', category: 'Frontend' },
      { name: 'Jest', category: 'DevOps / Infra' },
      { name: 'Swagger / OpenAPI', category: 'Outils' },
      { name: 'Docker', category: 'DevOps / Infra' },
    ],
    
    // 8. Défis techniques
    technicalChallenges: [
      {
        title: 'Optimisation du moteur de calcul des primes d’assurance',
        description:
          'Les barèmes de calcul intègrent de multiples variables (âge du véhicule, bonus/malus, puissance fiscale, zones géographiques), créant une charge de requêtes répétitives.',
        resolution:
          'Mise en œuvre d’un cache Redis stratégique invalidé uniquement lors de la mise à jour des barèmes, réduisant le temps de réponse moyen à moins de 25 ms.',
      },
      {
        title: 'Traçabilité et auditabilité des transactions',
        description:
          'Chaque modification de statut de contrat ou d’attestation doit être inviolable et consultable par les auditeurs.',
        resolution:
          'Mise en place d’un journal d’audit automatique (Audit Trail) enregistrant l’auteur, l’horodatage et le delta de chaque opération critique.',
      },
    ],
    
    // 9. Résultats vérifiés
    verifiedResults: {
      metricHighlight: 'Projet Open-Source Auditable',
      description:
        'Code source entièrement testé et documenté avec tests unitaires Jest et documentation Swagger interactive directement accessible.',
      sourceOrEvidence: 'Dépôt GitHub public vérifiable : moussaDevw/assure-express',
    },
    
    // 10. Captures ou démo
    demoAndMedia: {
      hasAuthorizedScreenshots: false,
      screenshotsNote:
        'Le code source et la documentation de l’architecture sont intégralement consultables sur le dépôt public GitHub. Les captures d’écrans de simulation mobile sont disponibles sur demande lors d’une démonstration technique.',
      githubRepoUrl: 'https://github.com/moussaDevw/assure-express',
      ndaProtected: false,
    },
    
    seo: {
      metaTitle: 'Étude de Cas Assure Express | Backend NestJS & Mobile | MusaTech',
      metaDescription:
        'Architecture NestJS, base PostgreSQL et application mobile React Native pour l’assurance automobile. Étude de cas technique et code source open-source.',
      keywords: ['nestjs assurance', 'architecture postgresql redis', 'react native dakar', 'api insurtech', 'mussatech etude de cas'],
    },
    relatedServiceSlug: 'applications-mobiles',
  },

  'edaktari': {
    slug: 'edaktari',
    name: 'eDaktari',
    year: '2025',
    sector: 'HealthTech & Santé',
    solutionType: 'Plateforme de Téléconsultation & Vidéo Temps Réel',
    clientOrContext: 'Plateforme de télémédecine reliant l’Afrique et l’Europe',
    nature: 'team_project',
    natureLabel: 'Projet réalisé en équipe (Mission Freelance)',
    attributionDisclaimer:
      'Ce produit est la propriété exclusive de l’entité éditrice eDaktari. Moussa Diagne est intervenu en tant que Consultant Software Engineer / Frontend Developer sur l’architecture des interfaces et les flux vidéo WebRTC, sans s’attribuer la création de l’entreprise ni la propriété globale de la plateforme.',
    shortSummary:
      'Plateforme de téléconsultation médicale haute fluidité reliant patients et praticiens de santé entre l’Afrique et la diaspora avec visioconférence sécurisée et conformité WCAG.',
    
    // 1. Présentation
    presentation:
      'eDaktari est une solution de télémédecine visant à faciliter l’accès aux soins de santé spécialisés en connectant des patients en Afrique avec des médecins praticiens en Afrique et en Europe, au moyen de consultations vidéo chiffrées et de prises de rendez-vous en ligne.',
    
    // 2. Contexte métier
    businessContext:
      'L’éloignement géographique, les déserts médicaux et les délais d’obtention d’un rendez-vous chez un médecin spécialiste incitent les patients à rechercher des consultations fiables à distance, nécessitant une solution opérationnelle même sur des connexions réseau hétérogènes.',
    
    // 3. Problème à résoudre
    problemToSolve:
      'Garantir une qualité vidéo fluide et stable même avec une bande passante mobile réduite (3G/4G), tout en offrant un parcours de rendez-vous ergonomique et accessible aux personnes en situation de handicap (normes WCAG).',
    
    // 4. Solution développée
    solutionDeveloped:
      'Une application web moderne bâtie sur Next.js 14 (App Router), couplée aux protocoles WebRTC via GetStream.io pour la vidéo temps réel, une gestion d’état fluide avec Zustand et des flux de paiement sécurisés par carte et solutions internationales.',
    
    // 5. Fonctionnalités principales
    mainFeatures: [
      'Prise de rendez-vous avec calendrier des disponibilités médicales en temps réel',
      'Salle de consultation virtuelle sécurisée en vidéo haute définition avec WebRTC',
      'Messagerie instantanée chiffrée de bout en bout pour le partage d’ordonnances',
      'Paiement sécurisé préalable à la consultation pour éviter les impayés',
      'Conformité stricte aux critères d’accessibilité numérique WCAG AA',
      'Interfaces responsives optimisées pour smartphone, tablette et ordinateur',
    ],
    
    // 6. Contribution personnelle exacte
    personalContribution: {
      roleTitle: 'Consultant Software Engineer — Interfaces & Intégration Flux',
      description:
        'Développement des interfaces utilisateur avec Next.js 14, intégration du SDK vidéo GetStream, gestion des états transactionnels et optimisation de l’accessibilité.',
      keyDeliverables: [
        'Composants de consultation vidéo temps réel avec gestion adaptative de la qualité de flux',
        'Parcours de réservation de créneaux avec synchronisation des disponibilités',
        'Intégration du module de paiement sécurisé pour les actes médicaux',
        'Optimisation globale des contrastes et de la navigation clavier selon les standards WCAG',
      ],
    },
    
    // 7. Technologies utilisées
    technologies: [
      { name: 'Next.js 14', category: 'Frontend' },
      { name: 'TypeScript', category: 'Frontend' },
      { name: 'WebRTC / GetStream.io', category: 'Outils' },
      { name: 'Zustand', category: 'Frontend' },
      { name: 'PostgreSQL', category: 'Base de données' },
      { name: 'Stripe', category: 'Outils' },
      { name: 'WCAG AA', category: 'Frontend' },
    ],
    
    // 8. Défis techniques
    technicalChallenges: [
      {
        title: 'Maintien de la connexion vidéo en conditions réseau dégradées',
        description:
          'Les variations de bande passante en mobilité peuvent entraîner des coupures brutales de communication lors d’une consultation médicale critique.',
        resolution:
          'Mise en place d’une adaptation dynamique du bitrate vidéo (Simulcast) privilégiant la clarté du flux audio en cas de baisse soudaine de débit.',
      },
      {
        title: 'Confidentialité et conformité des données médicales',
        description:
          'Les échanges entre médecin et patient exigent une stricte étanchéité des flux et l’absence de stockage persistant non autorisé de flux vidéo.',
        resolution:
          'Utilisation de salles de réunion éphémères chiffrées avec clés de session uniques invalidées immédiatement à la fin de la consultation.',
      },
    ],
    
    // 9. Résultats vérifiés
    verifiedResults: {
      metricHighlight: 'Consultation Vidéo & Normes WCAG',
      description:
        'Déploiement d’une plateforme opérationnelle 24/7 permettant des consultations transcontinentales fluides entre patients et spécialistes.',
      sourceOrEvidence: 'Projet vérifié dans l’historique professionnel du fondateur MusaTech',
    },
    
    // 10. Captures ou démo
    demoAndMedia: {
      hasAuthorizedScreenshots: false,
      screenshotsNote:
        'Les données patients et les interfaces médicales internes sont couvertes par le secret médical et des accords de confidentialité stricts. Aucune capture comportant des données de santé réelles n’est exposée publiquement.',
      ndaProtected: true,
    },
    
    seo: {
      metaTitle: 'Étude de Cas eDaktari | Télémédecine & WebRTC | MusaTech',
      metaDescription:
        'Développement d’interfaces Next.js 14 et intégration WebRTC GetStream pour la téléconsultation médicale transfrontalière Afrique-Europe.',
      keywords: ['telemedecine afrique', 'webrtc nextjs', 'getstream consultation', 'wcag sante', 'musatech edaktari'],
    },
    relatedServiceSlug: 'logiciels-metier',
  },

  'yello-edtech': {
    slug: 'yello-edtech',
    name: 'Plateforme EdTech (Yello)',
    year: '2024 — 2026',
    sector: 'EdTech & Pédagogie IA',
    solutionType: 'Plateforme SaaS d’Apprentissage Interactif à Grande Échelle',
    clientOrContext: 'Startup EdTech en pleine expansion en Afrique de l’Ouest',
    nature: 'employee_project',
    natureLabel: 'Projet réalisé pour un employeur (En équipe)',
    attributionDisclaimer:
      'La marque et la propriété intellectuelle de Yello appartiennent intégralement à l’entreprise éditrice Yello. Moussa Diagne est intervenu en tant que Senior Frontend Developer au sein de l’équipe d’ingénierie produit.',
    shortSummary:
      'Plateforme d’apprentissage interactif par intelligence artificielle utilisée par plus de 200 000 apprenants, intégrant microlearning, quiz automatiques et assistant pédagogique.',
    
    // 1. Présentation
    presentation:
      'Yello est une solution EdTech innovante qui transforme des contenus éducatifs (documents PDF, cours vidéos, enregistrements audio) en modules d’apprentissage interactifs, ludiques et adaptés au rythme de chaque apprenant.',
    
    // 2. Contexte métier
    businessContext:
      'Les apprenants et étudiants sont fréquemment confrontés à des supports de cours volumineux et statiques, provoquant une baisse d’engagement et un faible taux de rétention des connaissances sur la durée.',
    
    // 3. Problème à résoudre
    problemToSolve:
      'Concevoir des interfaces ultra-rapides et réactives capables de supporter des centaines de milliers d’utilisateurs simultanés tout en restituant des contenus pédagogiques générés dynamiquement par l’IA.',
    
    // 4. Solution développée
    solutionDeveloped:
      'Architecture frontend modulaire en React et Next.js orchestrée avec Zustand pour la gestion d’état locale et TanStack Query pour la synchronisation asynchrone des données, couplée à un design system Tailwind CSS accessible.',
    
    // 5. Fonctionnalités principales
    mainFeatures: [
      'Conversion assistée par IA de contenus éducatifs en modules de microlearning',
      'Génération automatique de quiz adaptatifs, de flashcards et de résumés de synthèse',
      'Chatbot pédagogique conversationnel d’aide à la révision contextualisé au cours',
      'Tableaux de bord de suivi de progression et métriques d’assiduité pour les apprenants',
      'Mode révision express pour la préparation aux examens et concours',
      'Expérience mobile optimisée avec temps de chargement réduits pour connexions variables',
    ],
    
    // 6. Contribution personnelle exacte
    personalContribution: {
      roleTitle: 'Senior Frontend Developer',
      description:
        'Responsabilité de l’architecture des interfaces utilisateur, de l’intégration des modèles de données IA et de l’optimisation des performances front-end sous forte charge.',
      keyDeliverables: [
        'Architecture des écrans de parcours pédagogique interactif et microlearning',
        'Intégration des APIs d’inférence IA pour la génération de quiz et flashcards',
        'Développement du module de chat conversationnel pédagogique en temps réel',
        'Mise en place de la gestion d’état globale avec Zustand et mise en cache TanStack Query',
      ],
    },
    
    // 7. Technologies utilisées
    technologies: [
      { name: 'React', category: 'Frontend' },
      { name: 'Next.js', category: 'Frontend' },
      { name: 'TypeScript', category: 'Frontend' },
      { name: 'Zustand', category: 'Frontend' },
      { name: 'TanStack Query', category: 'Frontend' },
      { name: 'Tailwind CSS', category: 'Frontend' },
      { name: 'APIs IA / LLM', category: 'Backend' },
    ],
    
    // 8. Défis techniques
    technicalChallenges: [
      {
        title: 'Restitution en streaming des contenus générés par IA',
        description:
          'L’affichage progressif des synthèses et réponses du tuteur virtuel ne devait causer aucun blocage du thread principal de rendu.',
        resolution:
          'Utilisation de Server-Sent Events (SSE) et de parsers légers pour afficher le texte au fur et à mesure sans saccades d’interface.',
      },
      {
        title: 'Maintien des performances à plus de 200 000 utilisateurs',
        description:
          'La volumétrie importante d’étudiants actifs nécessitait une stratégie drastique de mise en cache côté client pour éviter la saturation des serveurs API.',
        resolution:
          'Optimisation de la politique de cache TanStack Query (staleTime calibré, déduplication des requêtes de quiz et préchargement des écrans suivants).',
      },
    ],
    
    // 9. Résultats vérifiés
    verifiedResults: {
      metricHighlight: '+200 000 Apprenants Actifs',
      description:
        'Plateforme adoptée à grande échelle et classée parmi les solutions éducatives majeures au Sénégal, avec un taux d’engagement utilisateur mesurable.',
      sourceOrEvidence: 'Métrique vérifiée dans l’historique professionnel et les réalisations documentées du fondateur',
    },
    
    // 10. Captures ou démo
    demoAndMedia: {
      hasAuthorizedScreenshots: false,
      screenshotsNote:
        'Les droits de marque et captures commerciales appartiennent à Yello. La présentation détaillée de l’architecture et des choix techniques est effectuée dans le respect du savoir-faire propriétaire de l’éditeur.',
      ndaProtected: true,
    },
    
    seo: {
      metaTitle: 'Étude de Cas Plateforme EdTech (Yello) | React, Next.js & IA | MusaTech',
      metaDescription:
        'Développement frontend Senior pour une plateforme EdTech IA utilisée par plus de 200 000 apprenants. Architecture React, Next.js et Zustand.',
      keywords: ['edtech senegal', 'react nextjs zutand', 'ia apprentissage', 'senior frontend developer', 'musatech yello'],
    },
    relatedServiceSlug: 'sites-web',
  },

  'istamco': {
    slug: 'istamco',
    name: 'Istamco',
    year: '2024 — 2026',
    sector: 'Logistique & Transport International',
    solutionType: 'CRM Métier & Plateforme de Freight Forwarding',
    clientOrContext: 'Société spécialisée dans le transport international de fret',
    nature: 'freelance_mission',
    natureLabel: 'Projet freelance (Mission de consultance)',
    attributionDisclaimer:
      'Ce logiciel métier est la propriété de l’entreprise cliente Istamco. Moussa Diagne est intervenu en tant que Consultant Développeur Full Stack pour la conception de l’architecture logicielle et des outils de reporting opérationnels.',
    shortSummary:
      'CRM métier sur mesure dédié à la logistique internationale et au transit : gestion des dossiers d’expédition, suivi des conteneurs, reporting analytique et exports PDF/Excel automatisés.',
    
    // 1. Présentation
    presentation:
      'Istamco est une plateforme logicielle métier dédiée à la gestion des opérations de transport international et de transit (freight forwarding), regroupant dans un portail unifié le suivi des expéditions maritimes et aériennes, les relations clients et la conformité documentaire.',
    
    // 2. Contexte métier
    businessContext:
      'Dans le transit international, chaque dossier implique des dizaines de documents douaniers, des interactions entre compagnies maritimes, transporteurs routiers et transitaires, traditionnellement gérés par emails et tableurs dispersés.',
    
    // 3. Problème à résoudre
    problemToSolve:
      'Comment éliminer les ressaisies manuelles, fiabiliser le suivi du statut des conteneurs et générer en quelques secondes des manifestes d’expédition et des rapports financiers d’activité certifiés ?',
    
    // 4. Solution développée
    solutionDeveloped:
      'Un CRM métier complet conçu avec React, Next.js et TypeScript en frontend, un backend d’entreprise NestJS adossé à PostgreSQL, des visualisations graphiques avancées (Chart.js, ECharts) et des générateurs d’exports PDF et Excel automatisés.',
    
    // 5. Fonctionnalités principales
    mainFeatures: [
      'Gestion centralisée des dossiers de fret (maritime, aérien, terrestre)',
      'Suivi des étapes d’expédition en temps réel avec jalons douaniers et portuaires',
      'Génération automatisée de bordereaux, manifestes et rapports d’activité aux formats PDF et Excel',
      'Tableaux de bord analytiques interactifs avec graphiques d’évolution des volumes et marges',
      'Annuaire clients et transporteurs avec historique complet des expéditions passées',
      'Gestion des droits d’accès stricts par département (Opérations, Facturation, Direction)',
    ],
    
    // 6. Contribution personnelle exacte
    personalContribution: {
      roleTitle: 'Consultant Développeur Full Stack',
      description:
        'Conception de l’architecture des interfaces utilisateur, modélisation des workflows métiers complexes de transport et développement des modules d’exportation documentaire.',
      keyDeliverables: [
        'Architecture des écrans de gestion des expéditions et des formulaires métier complexes',
        'Intégration des tableaux de bord analytiques de suivi opérationnel (Chart.js / ECharts)',
        'Moteur d’export automatisé générant des rapports consolidés Excel et des factures/bordereaux PDF',
        'Optimisation des temps de réponse sur les tables de données à forte volumétrie',
      ],
    },
    
    // 7. Technologies utilisées
    technologies: [
      { name: 'React', category: 'Frontend' },
      { name: 'Next.js', category: 'Frontend' },
      { name: 'TypeScript', category: 'Frontend' },
      { name: 'NestJS', category: 'Backend' },
      { name: 'PostgreSQL', category: 'Base de données' },
      { name: 'Chart.js / ECharts', category: 'Frontend' },
      { name: 'Exports PDF & Excel', category: 'Outils' },
    ],
    
    // 8. Défis techniques
    technicalChallenges: [
      {
        title: 'Modélisation de processus logistiques multi-acteurs complexes',
        description:
          'Chaque expédition comporte des états intermédiaires multiples (empotage, dédouanement, embarquement, transit, livraison finale) avec des contraintes réglementaires strictes.',
        resolution:
          'Conception d’une machine à états finis (State Machine) dans l’architecture applicative garantissant qu’aucune étape douanière ne peut être sautée accidentellement.',
      },
      {
        title: 'Génération performante de rapports volumineux en PDF et Excel',
        description:
          'L’extraction et la mise en page de bilans mensuels regroupant des milliers de lignes de fret pouvaient ralentir le serveur applicatif.',
        resolution:
          'Mise en place de générateurs asynchrones avec streaming de données, permettant aux utilisateurs de télécharger des fichiers volumineux sans bloquer l’interface.',
      },
    ],
    
    // 9. Résultats vérifiés
    verifiedResults: {
      metricHighlight: 'Digitalisation des Processus de Transit',
      description:
        'Centralisation réussie des dossiers d’expédition au sein d’un outil unique, remplaçant les chaînes de tableurs manuels et accélérant la génération des rapports.',
      sourceOrEvidence: 'Mission de consultance attestée dans le parcours professionnel du fondateur',
    },
    
    // 10. Captures ou démo
    demoAndMedia: {
      hasAuthorizedScreenshots: false,
      screenshotsNote:
        'Outil métier interne et stratégique protégé par clause de confidentialité stricte (NDA). Les données opérationnelles, clients et flux financiers ne sont pas divulgués publiquement.',
      ndaProtected: true,
    },
    
    seo: {
      metaTitle: 'Étude de Cas Istamco | CRM Logistique & Freight Forwarding | MusaTech',
      metaDescription:
        'Conception d’un CRM métier dédié au transport international et au transit de fret. Architecture React, Next.js, NestJS et reporting avancé.',
      keywords: ['crm logistique dakar', 'freight forwarding software', 'nestjs react crm', 'transit international senegal', 'musatech istamco'],
    },
    relatedServiceSlug: 'logiciels-metier',
  },
};

export const PROJECTS_DATA_EN: Record<string, ProjectDetail> = {
  'assure-express': {
    slug: 'assure-express',
    name: 'Assure Express',
    year: '2025',
    sector: 'InsurTech & Insurance',
    solutionType: 'Cross-Platform Mobile App & Modular Backend',
    clientOrContext: 'Open-Source Architecture Blueprint (Technical Reference)',
    nature: 'personal_project',
    natureLabel: 'Personal Project',
    attributionDisclaimer:
      'This project was independently modeled, architected, and built by Moussa Diagne as an open-source technical demonstrator. The source code is publicly accessible on GitHub as an architecture blueprint.',
    shortSummary:
      'Full-stack NestJS/PostgreSQL backend with Redis caching and React Native mobile app for paperless vehicle insurance underwriting.',
    
    presentation:
      'Assure Express is a cross-platform mobile application backed by an enterprise modular backend, engineered to fully digitize the quote calculation, policy issuance, and claims submission workflow for vehicle insurance.',
    
    businessContext:
      'In traditional auto insurance, onboarding and policy renewals require paper forms, physical proof-of-identity photocopies, and manual administrative delays ranging from 48 hours to several business days.',
    
    problemToSolve:
      'How to allow drivers to calculate instant insurance quotes, upload compliance documents, and receive temporary coverage certificates directly on their smartphone, while providing brokers with a secure, auditable management API?',
    
    solutionDeveloped:
      'A high-performance modular system built on a NestJS REST API, strictly typed PostgreSQL relational database, Redis cache for instant rating calculations, and interactive Swagger/OpenAPI documentation enabling third-party integrations.',
    
    mainFeatures: [
      'Instant pricing engine by vehicle category, usage, and coverage tiers',
      'Digital document upload and verification pipeline (driver license, registration card)',
      'Automated policy PDF generation and verifiable digital insurance certificates',
      'Comprehensive interactive API documentation via Swagger/OpenAPI 3.0',
      'Role-based access control (Policyholder, Claims Adjuster, Administrator)',
      'Immutable transaction audit trail and automated email notifications',
    ],
    
    personalContribution: {
      roleTitle: 'Full Stack Engineer & Software Architect',
      description:
        'End-to-end system architecture design, NestJS module implementation, relational database modeling, and automated test suite creation.',
      keyDeliverables: [
        'Modular NestJS software architecture (Clean Architecture / lightweight DDD)',
        'PostgreSQL database schema with versioned database migrations',
        'Jest automated test suite covering critical financial flows',
        'Redis cache strategy for dynamic, low-latency quote calculations',
        'OpenAPI 3.0 compliant API documentation',
      ],
    },
    
    technologies: [
      { name: 'NestJS', category: 'Backend' },
      { name: 'TypeScript', category: 'Backend' },
      { name: 'PostgreSQL', category: 'Base de données' },
      { name: 'Redis', category: 'Base de données' },
      { name: 'React Native', category: 'Frontend' },
      { name: 'Jest', category: 'DevOps / Infra' },
      { name: 'Swagger / OpenAPI', category: 'Outils' },
      { name: 'Docker', category: 'DevOps / Infra' },
    ],
    
    technicalChallenges: [
      {
        title: 'Optimizing the multi-criteria insurance rating engine',
        description:
          'Underwriting calculations combine vehicle age, claims history, fiscal horsepower, and geographic zones, leading to repetitive compute-heavy requests.',
        resolution:
          'Implemented an invalidation-safe Redis cache triggered only upon actuarial rate changes, reducing average response latency to under 25 ms.',
      },
      {
        title: 'Auditability and compliance of policy modifications',
        description:
          'Every contract state transition and temporary certificate issuance must be tamper-proof and verifiable by insurance auditors.',
        resolution:
          'Engineered an automatic audit trail tracking the exact user ID, timestamp, and payload diff of every critical operation.',
      },
    ],
    
    verifiedResults: {
      metricHighlight: 'Auditable Open-Source Architecture',
      description:
        'Clean, fully documented production-grade codebase with Jest unit tests and interactive Swagger endpoints ready for inspection.',
      sourceOrEvidence: 'Publicly verifiable GitHub repository: moussaDevw/assure-express',
    },
    
    demoAndMedia: {
      hasAuthorizedScreenshots: false,
      screenshotsNote:
        'The source code and architecture documentation are publicly available on GitHub. Mobile simulation screenshots are available upon request during a live technical briefing.',
      githubRepoUrl: 'https://github.com/moussaDevw/assure-express',
      ndaProtected: false,
    },
    
    seo: {
      metaTitle: 'Assure Express Case Study | NestJS Backend & Mobile | MusaTech',
      metaDescription:
        'NestJS architecture, PostgreSQL database, and React Native mobile application for digital vehicle insurance. Technical case study and open-source codebase.',
      keywords: ['nestjs insurance', 'postgresql redis architecture', 'react native dakar', 'insurtech api', 'musatech case study'],
    },
    relatedServiceSlug: 'applications-mobiles',
  },

  'edaktari': {
    slug: 'edaktari',
    name: 'eDaktari',
    year: '2025',
    sector: 'HealthTech & Telemedicine',
    solutionType: 'Teleconsultation Web Platform & Real-Time Video',
    clientOrContext: 'Telemedicine platform connecting patients in Africa with practitioners across Africa and Europe',
    nature: 'team_project',
    natureLabel: 'Team Project (Freelance Engagement)',
    attributionDisclaimer:
      'This platform is the exclusive property of eDaktari. Moussa Diagne contributed as a Consultant Software Engineer / Frontend Developer focusing on user interfaces, state management, and WebRTC video integration without claiming platform ownership.',
    shortSummary:
      'Low-latency medical teleconsultation platform connecting patients and healthcare providers between Africa and the diaspora with encrypted video calls and WCAG AA compliance.',
    
    presentation:
      'eDaktari is a specialized telemedicine platform facilitating direct access to medical experts by connecting patients across Africa with physicians in Africa and Europe via encrypted video consultations and online booking.',
    
    businessContext:
      'Geographical distance, specialist shortages, and extended appointment wait times push patients toward remote consultations, requiring an operational platform capable of performing seamlessly even on unstable mobile connections.',
    
    problemToSolve:
      'Ensure fluid, uninterrupted video calls over constrained 3G/4G networks while delivering an ergonomic scheduling flow fully accessible to individuals with disabilities (WCAG standards).',
    
    solutionDeveloped:
      'A modern web platform engineered with Next.js 14 (App Router), integrated with WebRTC protocols via GetStream.io for low-latency video, streamlined state management with Zustand, and secure international card payments.',
    
    mainFeatures: [
      'Real-time appointment scheduling with dynamic physician availability slots',
      'Encrypted virtual consultation rooms with HD video powered by WebRTC',
      'End-to-end secure messaging for digital prescription and document sharing',
      'Pre-consultation automated escrow payment preventing default risk',
      'Strict adherence to WCAG AA digital accessibility standards',
      'Mobile-first responsive interfaces optimized for smartphones, tablets, and desktops',
    ],
    
    personalContribution: {
      roleTitle: 'Consultant Software Engineer — Frontend Architecture & Video Stream Integration',
      description:
        'Development of core user interfaces using Next.js 14, integration of GetStream video SDK, transactional state handling, and accessibility compliance.',
      keyDeliverables: [
        'Real-time video consultation UI with adaptive stream quality management',
        'Appointment booking workflow synchronized with doctor schedules',
        'Secure multi-currency payment checkout integration',
        'Global keyboard navigation and contrast optimization meeting WCAG AA requirements',
      ],
    },
    
    technologies: [
      { name: 'Next.js 14', category: 'Frontend' },
      { name: 'TypeScript', category: 'Frontend' },
      { name: 'WebRTC / GetStream.io', category: 'Outils' },
      { name: 'Zustand', category: 'Frontend' },
      { name: 'PostgreSQL', category: 'Base de données' },
      { name: 'Stripe', category: 'Outils' },
      { name: 'WCAG AA', category: 'Frontend' },
    ],
    
    technicalChallenges: [
      {
        title: 'Preserving video call stability in degraded network conditions',
        description:
          'Fluctuating mobile bandwidth can trigger sudden connection drops during critical doctor-patient discussions.',
        resolution:
          'Engineered dynamic video bitrate adaptation (Simulcast) prioritizing audio clarity and packet recovery whenever bandwidth drops.',
      },
      {
        title: 'Patient confidentiality and healthcare data protection',
        description:
          'Medical consultations demand strict stream isolation without unauthorized persistent cloud video storage.',
        resolution:
          'Implemented ephemeral encrypted meeting rooms with single-session security tokens revoked immediately upon call completion.',
      },
    ],
    
    verifiedResults: {
      metricHighlight: 'HD Video Streaming & WCAG AA Compliance',
      description:
        'Deployed 24/7 operational telemedicine platform facilitating transcontinental consultations between remote patients and medical specialists.',
      sourceOrEvidence: "Verified client engagement in MusaTech founder's professional track record",
    },
    
    demoAndMedia: {
      hasAuthorizedScreenshots: false,
      screenshotsNote:
        'Patient records and internal medical consultation interfaces are protected by medical secrecy and strict non-disclosure agreements (NDA). No live patient data or private screens are publicly displayed.',
      ndaProtected: true,
    },
    
    seo: {
      metaTitle: 'eDaktari Case Study | Telemedicine & WebRTC | MusaTech',
      metaDescription:
        'Next.js 14 frontend engineering and GetStream WebRTC video integration for international telemedicine. Technical case study by MusaTech.',
      keywords: ['telemedicine africa', 'webrtc nextjs', 'getstream video', 'wcag healthtech', 'musatech edaktari'],
    },
    relatedServiceSlug: 'logiciels-metier',
  },

  'yello-edtech': {
    slug: 'yello-edtech',
    name: 'EdTech Platform (Yello)',
    year: '2024 — 2026',
    sector: 'EdTech & AI Pedagogy',
    solutionType: 'High-Volume Interactive Learning SaaS Platform',
    clientOrContext: 'Fast-growing EdTech startup in West Africa',
    nature: 'employee_project',
    natureLabel: 'Employee Project (Core Engineering Team)',
    attributionDisclaimer:
      'All brand rights, intellectual property, and proprietary algorithms of Yello belong entirely to the publishing company Yello. Moussa Diagne served as Senior Frontend Developer within the core engineering team.',
    shortSummary:
      'AI-assisted interactive learning platform serving over 200,000 active learners, featuring microlearning tracks, automated quizzes, and contextual tutoring.',
    
    presentation:
      'Yello is an innovative EdTech solution that converts educational material (PDF lecture notes, video recordings, audio tracks) into bite-sized, gamified learning modules tailored to each student’s pace.',
    
    businessContext:
      'Students and exam candidates frequently struggle with bulky, static syllabus documents, resulting in diminished study motivation and lower long-term knowledge retention.',
    
    problemToSolve:
      'Build ultra-fast, responsive web interfaces capable of sustaining hundreds of thousands of concurrent learners while streaming dynamically generated AI pedagogical content without UI freezing.',
    
    solutionDeveloped:
      'A modular React and Next.js frontend architecture managed with Zustand for client-side state and TanStack Query for asynchronous data caching, backed by an accessible Tailwind CSS design system.',
    
    mainFeatures: [
      'AI-powered syllabus ingestion converting documents into microlearning units',
      'Automated generation of adaptive quizzes, flashcards, and summary briefs',
      'Context-aware conversational pedagogical chatbot assisting exam preparation',
      'Granular student progress dashboards and study consistency analytics',
      'Exam sprint mode for rapid revision before university entry exams',
      'Mobile-optimized lightweight bundle sizes for variable mobile networks',
    ],
    
    personalContribution: {
      roleTitle: 'Senior Frontend Developer',
      description:
        'Led user interface architecture, integration of AI inference APIs, and client-side performance tuning under heavy concurrent traffic.',
      keyDeliverables: [
        'Architecture of interactive microlearning pathways and quiz screens',
        'Integration of streaming AI endpoints for dynamic flashcard and quiz creation',
        'Real-time conversational tutor chat interface with markdown rendering',
        'Global state management with Zustand and TanStack Query query-deduplication',
      ],
    },
    
    technologies: [
      { name: 'React', category: 'Frontend' },
      { name: 'Next.js', category: 'Frontend' },
      { name: 'TypeScript', category: 'Frontend' },
      { name: 'Zustand', category: 'Frontend' },
      { name: 'TanStack Query', category: 'Frontend' },
      { name: 'Tailwind CSS', category: 'Frontend' },
      { name: 'APIs IA / LLM', category: 'Backend' },
    ],
    
    technicalChallenges: [
      {
        title: 'Smooth streaming of AI-generated study content',
        description:
          'Progressive token delivery from AI tutoring endpoints could not stutter or freeze main thread DOM rendering.',
        resolution:
          'Utilized Server-Sent Events (SSE) with lightweight incremental parsers to render educational summaries in real time without UI hiccups.',
      },
      {
        title: 'Maintaining sub-second response times across 200,000+ users',
        description:
          'Massive simultaneous traffic peaks during exam periods risked overwhelming backend API endpoints with redundant query calls.',
        resolution:
          'Tuned TanStack Query cache policies (aggressive stale times, deduplicated quiz requests, and route prefetching for subsequent questions).',
      },
    ],
    
    verifiedResults: {
      metricHighlight: '+200,000 Active Learners',
      description:
        'Widely adopted educational platform recognized among top digital learning systems in Senegal with proven daily user retention.',
      sourceOrEvidence: "Verified metric in founder's documented career milestones",
    },
    
    demoAndMedia: {
      hasAuthorizedScreenshots: false,
      screenshotsNote:
        'Brand assets and proprietary commercial mockups belong to Yello. Architecture design and technical decisions are shared in strict compliance with non-disclosure obligations.',
      ndaProtected: true,
    },
    
    seo: {
      metaTitle: 'Yello EdTech Case Study | React, Next.js & AI | MusaTech',
      metaDescription:
        'Senior frontend engineering for an AI-powered EdTech platform with 200,000+ active learners. React, Next.js, and Zustand architecture.',
      keywords: ['edtech senegal', 'react nextjs zutand', 'ai learning platform', 'senior frontend developer', 'musatech yello'],
    },
    relatedServiceSlug: 'sites-web',
  },

  'istamco': {
    slug: 'istamco',
    name: 'Istamco',
    year: '2024 — 2026',
    sector: 'Logistics & International Freight Forwarding',
    solutionType: 'Custom Operations CRM & Freight Forwarding Portal',
    clientOrContext: 'Enterprise specialized in maritime and air freight transport',
    nature: 'freelance_mission',
    natureLabel: 'Freelance Engagement (Consulting Mission)',
    attributionDisclaimer:
      'This business software is the proprietary property of Istamco. Moussa Diagne served as Full Stack Consulting Developer responsible for system architecture and automated operational reporting.',
    shortSummary:
      'Tailored enterprise CRM engineered for international logistics and transit: container tracking, shipment workflow validation, interactive dashboards, and automated PDF/Excel reports.',
    
    presentation:
      'Istamco is an enterprise logistics and freight forwarding CRM centralizing air, sea, and land cargo tracking, customer relations, customs documentation, and billing into a single operational cockpit.',
    
    businessContext:
      'In international transit, every shipment involves dozens of customs forms, manifests, and coordination between shipping lines, customs brokers, and hauliers, historically scattered across emails and spreadsheets.',
    
    problemToSolve:
      'Eliminate manual data re-entry, ensure real-time status tracking for maritime containers, and generate certified shipment manifests and financial activity reports in seconds.',
    
    solutionDeveloped:
      'A full-featured operational CRM engineered with React, Next.js, and TypeScript frontend, robust NestJS backend backed by PostgreSQL, rich data visualizations (Chart.js / ECharts), and automated PDF/Excel export engines.',
    
    mainFeatures: [
      'Centralized freight dossier management (Sea, Air, Inland transit)',
      'Real-time cargo milestone tracking across port and customs checkpoints',
      'Automated generation of shipping manifests, bills of lading, and Excel summaries',
      'Interactive executive dashboards showing monthly volume trends and operational margins',
      'Verified customer and transporter directory with historical shipment logs',
      'Strict department-level role permissions (Operations, Billing, Executive Management)',
    ],
    
    personalContribution: {
      roleTitle: 'Full Stack Consulting Developer',
      description:
        'Architected user interfaces, modeled complex transport workflow state machines, and developed high-volume document generation engines.',
      keyDeliverables: [
        'Shipment tracking UI architecture and complex operational data entry forms',
        'Executive reporting dashboards with interactive charting (Chart.js / ECharts)',
        'Server-side export engine generating multi-sheet Excel reports and certified PDF invoices',
        'Query optimization on heavy shipment tables maintaining fast response times',
      ],
    },
    
    technologies: [
      { name: 'React', category: 'Frontend' },
      { name: 'Next.js', category: 'Frontend' },
      { name: 'TypeScript', category: 'Frontend' },
      { name: 'NestJS', category: 'Backend' },
      { name: 'PostgreSQL', category: 'Base de données' },
      { name: 'Chart.js / ECharts', category: 'Frontend' },
      { name: 'Exports PDF & Excel', category: 'Outils' },
    ],
    
    technicalChallenges: [
      {
        title: 'Modeling complex multi-party transit workflows',
        description:
          'Each freight shipment involves numerous dependent stages (stuffing, customs clearance, vessel loading, transit, final delivery) with rigid regulatory requirements.',
        resolution:
          'Implemented a formal Finite State Machine (FSM) in application architecture guaranteeing no customs or billing milestone can be accidentally bypassed.',
      },
      {
        title: 'High-performance generation of large PDF manifests and Excel logs',
        description:
          'Extracting monthly performance summaries covering thousands of shipment lines previously caused noticeable server memory spikes.',
        resolution:
          'Engineered asynchronous stream-based document generators allowing dispatchers to download large analytical files without interface freezing.',
      },
    ],
    
    verifiedResults: {
      metricHighlight: 'End-to-End Transit Digitalization',
      description:
        'Successfully unified disparate shipment logs into a centralized system, replacing manual spreadsheets and reducing report generation time.',
      sourceOrEvidence: "Verified consulting engagement in founder's professional background",
    },
    
    demoAndMedia: {
      hasAuthorizedScreenshots: false,
      screenshotsNote:
        'Strategic proprietary internal business tool governed by strict non-disclosure terms (NDA). Operational data, client lists, and financial figures are not publicly disclosed.',
      ndaProtected: true,
    },
    
    seo: {
      metaTitle: 'Istamco Case Study | Logistics CRM & Freight Forwarding | MusaTech',
      metaDescription:
        'Engineering a dedicated operations CRM for international freight and transit. React, Next.js, NestJS, and advanced reporting by MusaTech.',
      keywords: ['logistics crm dakar', 'freight forwarding software', 'nestjs react crm', 'international transit senegal', 'musatech istamco'],
    },
    relatedServiceSlug: 'logiciels-metier',
  },
};

export const PROJECTS_DATA = PROJECTS_DATA_FR;

export function getAllProjects(locale: string = 'fr'): ProjectDetail[] {
  const dataset = locale === 'en' ? PROJECTS_DATA_EN : PROJECTS_DATA_FR;
  return Object.values(dataset);
}

export function getProjectBySlug(slug: string, locale: string = 'fr'): ProjectDetail | undefined {
  const dataset = locale === 'en' ? PROJECTS_DATA_EN : PROJECTS_DATA_FR;
  
  if (dataset[slug]) return dataset[slug];
  
  // Normalisation des variantes et alias
  if (slug === 'edaktarii') return dataset['edaktari'];
  if (slug === 'yello' || slug === 'experience-edtech' || slug === 'yello-studio') {
    return dataset['yello-edtech'];
  }
  
  // Fallback réciproque si slug demandé dans l'autre langue
  const fallbackDataset = locale === 'en' ? PROJECTS_DATA_FR : PROJECTS_DATA_EN;
  return fallbackDataset[slug];
}
