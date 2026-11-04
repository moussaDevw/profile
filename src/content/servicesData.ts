/**
 * Données centralisées des offres de services MusaTech
 * Conforme à MUSATECH_MASTER_SPEC.md & REQUIREMENTS.md
 */

export interface ServiceDetail {
  slug: string;
  title: string;
  shortDescription: string;
  heroTagline: string;
  startingPrice: string;
  isPriceValidated: boolean;
  estimatedDelivery: string;
  
  // 1. À qui s'adresse le service
  targetAudience: {
    category: string;
    description: string;
  }[];

  // 2. Quels problèmes il résout
  problemsSolved: {
    problem: string;
    solution: string;
  }[];

  // 3. Fonctionnalités possibles (vision globale)
  possibleFeatures: string[];

  // 4. Périmètre de départ (inclus strictement dans le prix affiché)
  starterScope: {
    title: string;
    items: string[];
    note: string;
  };

  // 5. Options payantes (extensions hors périmètre de base)
  paidOptions: {
    name: string;
    description: string;
  }[];

  // 7. Méthode de travail spécifique
  methodSteps: {
    step: string;
    title: string;
    description: string;
  }[];

  // 8. Réalisations associées
  relatedProjectIds: string[];

  // 9. Questions fréquentes
  faq: {
    question: string;
    answer: string;
  }[];

  // SEO & Métadonnées
  meta: {
    title: string;
    description: string;
  };
}

export const SERVICES_DETAILED_DATA: Record<string, ServiceDetail> = {
  'sites-web': {
    slug: 'sites-web',
    title: 'Sites Web Professionnels',
    shortDescription:
      'Valorisez votre entreprise avec un site moderne, rapide et accessible sur tous les appareils.',
    heroTagline:
      'Une vitrine digitale soignée et crédible pour valoriser votre expertise, inspirer confiance et capter des prospects qualifiés à Dakar et à l’international.',
    startingPrice: 'À partir de 250 000 FCFA',
    isPriceValidated: true,
    estimatedDelivery: '2 à 3 semaines',
    targetAudience: [
      {
        category: 'PME & Sociétés de services',
        description:
          'Entreprises souhaitant crédibiliser leur image et présenter leurs prestations de manière claire et professionnelle.',
      },
      {
        category: 'Cabinets de conseil, avocats & consultants',
        description:
          'Experts indépendants et cabinets libéraux cherchant à valoriser leurs références et faciliter la prise de contact directe.',
      },
      {
        category: 'Établissements de santé & structures d’accueil',
        description:
          'Cliniques, cabinets et centres nécessitant la présentation de leurs équipes, horaires et accès.',
      },
    ],
    problemsSolved: [
      {
        problem: 'Invisibilité sur les moteurs de recherche',
        solution:
          'Architecture technique sémantique respectant les normes SEO locales et internationales de Google.',
      },
      {
        problem: 'Site vitrine lent ou non adapté aux mobiles',
        solution:
          'Conception responsive mobile-first ultra-rapide (score Core Web Vitals > 90) garantissant un affichage instantané.',
      },
      {
        problem: 'Difficulté des visiteurs à entrer en relation',
        solution:
          'Boutons d’action stratégiques, intégration WhatsApp directe et formulaires de contact ergonomiques.',
      },
    ],
    possibleFeatures: [
      'De 1 à 10+ pages sur mesure',
      'Intégration d’un blog ou d’actualités d’entreprise',
      'Formulaire de contact sécurisé avec alertes email/WhatsApp',
      'Carte interactive d’accès et géolocalisation',
      'Prise de rendez-vous en ligne',
      'Version multilingue (Français / Anglais)',
      'Optimisation de vitesse et hébergement performant',
    ],
    starterScope: {
      title: 'Inclus dans le tarif de départ (250 000 FCFA)',
      items: [
        'Site vitrine de 1 à 4 pages (Accueil, Services, À propos, Contact)',
        'Design responsive soigné adapté aux mobiles et ordinateurs',
        'Optimisation SEO technique de base (balises méta, sitemap, balises Open Graph)',
        'Formulaire de contact avec protection anti-spam',
        'Bouton d’échange direct WhatsApp',
        'Aide à la configuration du nom de domaine et déploiement inclus',
      ],
      note: 'Ce périmètre est calibré pour une présence professionnelle initiale. Toute page additionnelle ou intégration spécifique (ex. multilingue complet, système de réservation avancé) fait l’objet d’une option chiffrée.',
    },
    paidOptions: [
      {
        name: 'Pack multilingue Français / Anglais',
        description: 'Miroir complet du contenu avec sélecteur de langue et balises hreflang.',
      },
      {
        name: 'Module de prise de rendez-vous en ligne',
        description: 'Calendrier interactif synchronisé avec vos disponibilités professionnelles.',
      },
      {
        name: 'Rédaction & structuration de contenu SEO',
        description: 'Accompagnement éditorial pour optimiser vos textes sur vos mots-clés stratégiques.',
      },
    ],
    methodSteps: [
      {
        step: '01',
        title: 'Cadrage & Arborescence',
        description: 'Échange sur vos objectifs, définition des pages et validation de la structure du site.',
      },
      {
        step: '02',
        title: 'Conception UI & Intégration',
        description: 'Mise en page épurée selon la charte MusaTech et développement réactif.',
      },
      {
        step: '03',
        title: 'Tests & Recette',
        description: 'Vérification sur mobile (iOS/Android), tablette, ordinateur et tests de rapidité.',
      },
      {
        step: '04',
        title: 'Mise en ligne & Formation',
        description: 'Déploiement sur votre domaine et guide de prise en main pour actualiser vos informations.',
      },
    ],
    relatedProjectIds: ['yello-edtech', 'edaktarii'],
    faq: [
      {
        question: 'Le nom de domaine et l’hébergement sont-ils compris ?',
        answer:
          'L’assistance au choix, à l’achat et à la configuration DNS est incluse. Les frais annuels d’hébergement et de nom de domaine (généralement 15 000 à 35 000 FCFA/an) restent au nom du client pour garantir votre totale propriété.',
      },
      {
        question: 'Puis-je modifier moi-même les textes plus tard ?',
        answer:
          'Oui. Les architectures prévues permettent des modifications simples de vos contenus ou l’intégration d’un gestionnaire de contenu adapté selon vos préférences.',
      },
      {
        question: 'Combien de temps faut-il pour créer le site ?',
        answer:
          'Pour un site vitrine dans le périmètre de départ, comptez 2 à 3 semaines à compter de la réception de vos éléments textuels et visuels.',
      },
    ],
    meta: {
      title: 'Création de Sites Web Professionnels à Dakar | MusaTech',
      description:
        'Conception de sites vitrines modernes, rapides et optimisés pour le référencement. Tarifs de départ dès 250 000 FCFA avec interlocuteur unique senior.',
    },
  },

  'e-commerce': {
    slug: 'e-commerce',
    title: 'Sites E-Commerce & Boutiques Connectées',
    shortDescription:
      'Développez vos ventes en ligne avec une boutique adaptée à vos produits et à vos clients.',
    heroTagline:
      'Une plateforme de vente en ligne fluide, sécurisée et connectée aux moyens de paiement plébiscités par vos clients (Wave, Orange Money, Carte bancaire).',
    startingPrice: 'À partir de 600 000 FCFA',
    isPriceValidated: true,
    estimatedDelivery: '4 à 6 semaines',
    targetAudience: [
      {
        category: 'Commerces physiques & Marques locales',
        description:
          'Boutiques de mode, cosmétique, artisanat et décoration souhaitant élargir leur zone de chalandise au-delà de leur point de vente physique.',
      },
      {
        category: 'Distributeurs & Grossistes',
        description:
          'Fournisseurs ayant besoin de digitaliser leur catalogue et de recevoir les commandes de leurs revendeurs 24h/24.',
      },
      {
        category: 'Créateurs & Entrepreneurs digitaux',
        description:
          'Lancement de nouvelles gammes de produits avec une expérience d’achat moderne et rassurante.',
      },
    ],
    problemsSolved: [
      {
        problem: 'Gestion laborieuse des commandes par messages WhatsApp',
        solution:
          'Panier d’achat automatisé générant un récapitulatif clair de commande et un bordereau immédiat.',
      },
      {
        problem: 'Friction lors de l’encaissement à distance',
        solution:
          'Intégration directe des passerelles de paiement mobile locales (Wave, Orange Money) pour des règlements instantanés et sécurisés.',
      },
      {
        problem: 'Manque de visibilité sur l’état des stocks',
        solution:
          'Tableau de bord d’administration avec décompte automatique des stocks et alertes de réapprovisionnement.',
      },
    ],
    possibleFeatures: [
      'Catalogue de produits avec filtres et variantes (tailles, couleurs)',
      'Tunnel d’achat en 1 ou 2 étapes sans friction',
      'Passerelles de paiement Wave, Orange Money et Carte bancaire',
      'Calcul automatique des frais de livraison selon la zone géographique',
      'Notifications de commande par email et SMS/WhatsApp',
      'Historique des commandes et gestion des statuts d’expédition',
      'Génération de factures et bons de livraison en PDF',
    ],
    starterScope: {
      title: 'Inclus dans le tarif de départ (600 000 FCFA)',
      items: [
        'Boutique e-commerce complète jusqu’à 30 produits initiaux configurés',
        'Intégration d’un moyen de paiement mobile principal (Wave ou Orange Money)',
        'Gestion des stocks et variantes simples (taille, couleur)',
        'Module de calcul de livraison pour Dakar et régions',
        'Tableau de bord d’administration pour gérer les commandes',
        'Formation personnalisée à l’ajout de produits et au suivi des ventes',
      ],
      note: 'Ce périmètre est dimensionné pour lancer sereinement votre activité de vente en ligne. Une marketplace multi-vendeurs ou des connexions complexes avec un ERP physique nécessitent un devis sur mesure.',
    },
    paidOptions: [
      {
        name: 'Paiement multi-devises & Cartes internationales (Stripe)',
        description: 'Pour vendre à la diaspora et aux clients situés en Europe ou aux États-Unis.',
      },
      {
        name: 'Programme de fidélité & Codes promotionnels avancés',
        description: 'Création de coupons de réduction à durée limitée et réductions automatiques au panier.',
      },
      {
        name: 'Synchronisation automatique avec un stock physique',
        description: 'Connecteur spécifique avec logiciel de caisse existant.',
      },
    ],
    methodSteps: [
      {
        step: '01',
        title: 'Structure du catalogue & Paiement',
        description: 'Définition des catégories de produits, des variantes et choix des opérateurs de paiement.',
      },
      {
        step: '02',
        title: 'Design de la boutique & Panier',
        description: 'Mise en page mettant en valeur les visuels produits avec parcours d’achat épuré.',
      },
      {
        step: '03',
        title: 'Configuration technique & Tests réels',
        description: 'Vérification complète de la chaîne d’achat en conditions réelles avec paiements tests.',
      },
      {
        step: '04',
        title: 'Lancement & Prise en main',
        description: 'Mise en production, accompagnement aux premières commandes et formation à la gestion.',
      },
    ],
    relatedProjectIds: ['sapiow', 'medteck'],
    faq: [
      {
        question: 'Comment mes clients vont-ils payer ?',
        answer:
          'Vos clients peuvent régler directement par Wave, Orange Money ou carte bancaire selon les passerelles choisies. Les fonds sont versés directement sur votre compte marchand.',
      },
      {
        question: 'Suis-je limité en nombre de produits ?',
        answer:
          'Non. Le périmètre de départ inclut la configuration des 30 premiers produits pour le lancement, mais la plateforme est conçue pour accueillir des centaines de références supplémentaires que vous pourrez ajouter vous-même facilement.',
      },
      {
        question: 'La boutique est-elle sécurisée ?',
        answer:
          'Oui. Les transactions sont chiffrées de bout en bout via protocole HTTPS/SSL et gérées par des prestataires de paiement agréés.',
      },
    ],
    meta: {
      title: 'Création de Sites E-Commerce au Sénégal | Wave & Orange Money | MusaTech',
      description:
        'Boutiques en ligne optimisées pour la vente à Dakar et à l’international. Paiements Wave, Orange Money et cartes. Devis à partir de 600 000 FCFA.',
    },
  },

  'logiciels-metier': {
    slug: 'logiciels-metier',
    title: 'Plateformes & Logiciels Métier',
    shortDescription:
      'Centralisez vos informations et automatisez vos processus grâce à une solution sur mesure.',
    heroTagline:
      'Des plateformes SaaS, CRM et outils de gestion d’opérations développés sur mesure pour éliminer les goulots d’étranglement de votre entreprise.',
    startingPrice: 'À partir de 1 500 000 FCFA',
    isPriceValidated: true,
    estimatedDelivery: '6 à 10 semaines',
    targetAudience: [
      {
        category: 'Entreprises de logistique & transport',
        description:
          'Gestionnaires de fret, transitaires et transporteurs ayant besoin d’un suivi rigoureux des expéditions et d’éditions automatisées.',
      },
      {
        category: 'Établissements d’enseignement & Instituts',
        description:
          'Gestion des apprenants, suivi des parcours pédagogiques, émargement et délivrance d’attestations.',
      },
      {
        category: 'Startups & Entreprises à processus spécifique',
        description:
          'Fondateurs ayant besoin d’un produit minimum viable (MVP) robuste ou d’un logiciel dont les règles métiers ne rentrent pas dans les logiciels standards du marché.',
      },
    ],
    problemsSolved: [
      {
        problem: 'Multiplication des feuilles Excel sources d’erreurs',
        solution:
          'Base de données relationnelle sécurisée (PostgreSQL) avec intégrité des données garantie et zéro perte d’information.',
      },
      {
        problem: 'Perte de temps dans les tâches administratives répétitives',
        solution:
          'Automatisation des calculs, de la génération de documents PDF (factures, bordereaux) et des exports Excel.',
      },
      {
        problem: 'Absence de contrôle sur les autorisations d’accès',
        solution:
          'Gestion granulaire des rôles (administrateur, gestionnaire, opérateur, client) avec traçabilité complète des actions.',
      },
    ],
    possibleFeatures: [
      'Authentification sécurisée avec gestion des rôles et permissions',
      'Tableaux de bord d’activité avec indicateurs de performance (KPI)',
      'Moteur de recherche multicritère et filtres avancés',
      'Génération dynamique de documents PDF et exports Excel/CSV',
      'Workflows de validation par étapes (ex. devis > commande > facturation)',
      'Journal d’audit et historique des modifications',
      'API REST documentée sous Swagger pour communiquer avec des tiers',
    ],
    starterScope: {
      title: 'Inclus dans le tarif de départ (1 500 000 FCFA)',
      items: [
        'Développement d’un module métier clé complet (ex. gestion des commandes ou suivi logistique)',
        'Architecture moderne NestJS / Node.js et base de données PostgreSQL',
        'Interface web réactive (React / Next.js) avec tableau de bord opérationnel',
        'Gestion de 2 à 3 rôles utilisateurs distincts avec permissions adaptées',
        'Module de génération d’exports (PDF ou Excel) personnalisé',
        'Tests automatisés (Jest) et documentation d’API OpenAPI/Swagger',
      ],
      note: 'Ce périmètre correspond à un socle applicatif métier fonctionnel (MVP robuste). Les architectures complexes multi-filiales ou les intégrations d’intelligence artificielle avancées font l’objet d’un chiffrage par jalons.',
    },
    paidOptions: [
      {
        name: 'Module de notifications temps réel (WebSockets / Push)',
        description: 'Alertes instantanées à chaque mise à jour opérationnelle sans recharger la page.',
      },
      {
        name: 'Intégration d’outils tiers (ERP externe, WhatsApp Business API)',
        description: 'Synchronisation bidirectionnelle de données avec vos outils existants.',
      },
      {
        name: 'Tableaux de bord analytiques complexes (Chart.js / ECharts)',
        description: 'Rapports graphiques interactifs avec projections et filtres périodiques avancés.',
      },
    ],
    methodSteps: [
      {
        step: '01',
        title: 'Spécifications & Modélisation',
        description: 'Analyse détaillée des règles métier, schématisation de la base de données et validation des flux.',
      },
      {
        step: '02',
        title: 'Architecture Backend & API',
        description: 'Conception de l’API modulaire avec NestJS, sécurité JWT et modélisation PostgreSQL.',
      },
      {
        step: '03',
        title: 'Développement de l’Interface & Démos',
        description: 'Création des tableaux de bord et tests réguliers avec vos équipes opérationnelles.',
      },
      {
        step: '04',
        title: 'Déploiement, Recette & Documentation',
        description: 'Mise en production sécurisée, documentation technique et passation complète du code source.',
      },
    ],
    relatedProjectIds: ['istamco', 'yello-edtech', 'assure-express'],
    faq: [
      {
        question: 'Sommes-nous propriétaires du logiciel développé ?',
        answer:
          'Oui, à 100%. Vous disposez de la pleine propriété intellectuelle et de l’accès intégral au code source à la livraison.',
      },
      {
        question: 'Le logiciel peut-il fonctionner en réseau ou en interne ?',
        answer:
          'Oui. Nous pouvons déployer votre solution dans le cloud (Vercel, AWS, serveurs dédiés) ou sur un réseau privé interne selon vos contraintes de sécurité et de confidentialité.',
      },
      {
        question: 'Comment garantissez-vous la sécurité de nos données ?',
        answer:
          'Les accès sont protégés par chiffrement des mots de passe, jetons JWT sécurisés, politiques strictes de droits d’accès et sauvegardes automatisées.',
      },
    ],
    meta: {
      title: 'Développement de Logiciels Métier & Plateformes sur Mesure | MusaTech',
      description:
        'Conception d’outils de gestion, CRM et plateformes SaaS avec NestJS, PostgreSQL et React. Devis à partir de 1 500 000 FCFA avec rigueur d’ingénierie.',
    },
  },

  'applications-mobiles': {
    slug: 'applications-mobiles',
    title: 'Applications Mobiles iOS & Android',
    shortDescription:
      'Offrez une expérience mobile adaptée à votre projet sur les smartphones de vos utilisateurs.',
    heroTagline:
      'Des applications mobiles natives fluides, robustes et intuitives construites avec React Native pour conquérir vos utilisateurs sur iPhone et Android.',
    startingPrice: 'À partir de 2 000 000 FCFA',
    isPriceValidated: true,
    estimatedDelivery: '8 à 12 semaines',
    targetAudience: [
      {
        category: 'Services à la personne & Marketplaces',
        description:
          'Mise en relation, réservation de prestations et commandes nécessitant une disponibilité permanente dans la poche du client.',
      },
      {
        category: 'InsurTech & Fintech',
        description:
          'Souscription d’assurance en quelques clics, déclaration de sinistres, paiements et gestion de portefeuille mobile.',
      },
      {
        category: 'Équipes de terrain & Agents opérationnels',
        description:
          'Collecte de données, inventaires mobiles, géolocalisation et signatures électroniques sur smartphone.',
      },
    ],
    problemsSolved: [
      {
        problem: 'Coût exorbitant d’un double développement iOS et Android séparé',
        solution:
          'Utilisation de React Native permettant une base de code unifiée haute performance pour iOS et Android simultanément.',
      },
      {
        problem: 'Expérience lente ou dégradée en situation de mauvaise connexion',
        solution:
          'Gestion de cache local (AsyncStorage/SQLite) et optimisation des requêtes réseau pour fonctionner même à faible débit.',
      },
      {
        problem: 'Rejet lors de la publication sur les Stores',
        solution:
          'Respect strict des directives de validation imposées par l’App Store d’Apple et le Google Play Store.',
      },
    ],
    possibleFeatures: [
      'Compatibilité intégrale iOS (iPhone) et Android',
      'Authentification par numéro de téléphone, OTP ou biométrie (FaceID / Empreinte)',
      'Notifications push ciblées',
      'Paiement in-app (Wave, Orange Money, Cartes)',
      'Prise de photos et téléversement de pièces justificatives',
      'Géolocalisation et calcul d’itinéraires en direct',
      'Backend sécurisé connecté avec documentation Swagger',
    ],
    starterScope: {
      title: 'Inclus dans le tarif de départ (2 000 000 FCFA)',
      items: [
        'Application mobile cross-platform (iOS et Android) comprenant 4 à 6 écrans principaux',
        'Backend modulaire (NestJS / Node.js) gérant les utilisateurs et les données',
        'Système d’authentification sécurisé et gestion de profil',
        'Intégration d’un module de paiement mobile local ou d’une fonctionnalité métier centrale',
        'Notifications push de base',
        'Préparation technique des fichiers de build pour publication sur les Stores',
      ],
      note: 'Ce tarif de départ couvre un MVP mobile abouti et testé. Les algorithmes de mise en relation en temps réel à très haute fréquence (ex. type VTC à grande échelle) ou les fonctionnalités de streaming vidéo font l’objet d’une architecture dédiée.',
    },
    paidOptions: [
      {
        name: 'Visioconférence & streaming vidéo temps réel',
        description: 'Intégration de flux vidéo à faible latence (ex. eDaktari téléconsultation).',
      },
      {
        name: 'Suivi cartographique et géolocalisation en arrière-plan',
        description: 'Tracking continu de positions pour flottes de livraison ou chauffeurs.',
      },
      {
        name: 'Accompagnement complet à la publication App Store & Google Play',
        description: 'Gestion des comptes développeurs, captures d’écran normées et démarches de soumission.',
      },
    ],
    methodSteps: [
      {
        step: '01',
        title: 'Design UI/UX & Parcours Écran par Écran',
        description: 'Maquettage des écrans mobiles respectant les conventions d’usage tactiles (Human Interface & Material).',
      },
      {
        step: '02',
        title: 'Développement Backend & Logique Mobile',
        description: 'Programmation des interfaces React Native et de l’API NestJS connectée.',
      },
      {
        step: '03',
        title: 'Tests sur Appareils Réels',
        description: 'Tests rigoureux sur modèles physiques iPhone et terminaux Android récents et d’entrée de gamme.',
      },
      {
        step: '04',
        title: 'Génération des Builds & Livraison',
        description: 'Production des bundles signés (IPA et AAB) prêts pour déploiement sur les Stores.',
      },
    ],
    relatedProjectIds: ['assure-express', 'edaktarii'],
    faq: [
      {
        question: 'L’application fonctionnera-t-elle sur iPhone et Android ?',
        answer:
          'Oui. Grâce à la technologie React Native, nous développons une application unique qui se compile nativement pour iOS et Android avec une expérience utilisateur optimale.',
      },
      {
        question: 'Prenez-vous en charge la publication sur les Stores ?',
        answer:
          'Nous préparons tous les fichiers requis (icônes aux formats obligatoires, builds signés, métadonnées). Nous pouvons également vous accompagner pas-à-pas lors de la soumission sur vos comptes développeurs Apple et Google.',
      },
      {
        question: 'L’application peut-elle fonctionner sans connexion Internet ?',
        answer:
          'Oui, selon les besoins définis lors du cadrage, nous pouvons mettre en place un cache local permettant de consulter des informations ou d’enregistrer des données qui se synchroniseront dès le retour du réseau.',
      },
    ],
    meta: {
      title: 'Création d’Applications Mobiles iOS & Android à Dakar | MusaTech',
      description:
        'Développement d’applications mobiles React Native avec backend NestJS robuste. À partir de 2 000 000 FCFA pour un MVP commercial prêt pour les Stores.',
    },
  },
};

export const SERVICES_DETAILED_DATA_FR = SERVICES_DETAILED_DATA;

export const SERVICES_DETAILED_DATA_EN: Record<string, ServiceDetail> = {
  'sites-web': {
    slug: 'sites-web',
    title: 'Professional Websites',
    shortDescription:
      'Elevate your brand with a fast, modern, and accessible showcase website designed to convert visitors into inquiries.',
    heroTagline:
      'A credible, polished digital storefront to showcase your expertise, build trust, and attract qualified B2B clients locally and internationally.',
    startingPrice: 'Starting from 250,000 XOF',
    isPriceValidated: true,
    estimatedDelivery: '2 to 3 weeks',
    targetAudience: [
      {
        category: 'SMEs & Professional Service Firms',
        description:
          'Companies seeking to solidify their brand image and present core services with clarity and authority.',
      },
      {
        category: 'Consulting Agencies, Law Firms & Advisors',
        description:
          'Independent practitioners and boutique firms highlighting verified case studies and facilitating direct inquiries.',
      },
      {
        category: 'Healthcare Centers & Institutional Organizations',
        description:
          'Cliniques, private centers, and organizations presenting practitioners, schedules, and location access.',
      },
    ],
    problemsSolved: [
      {
        problem: 'Invisibility on Search Engines',
        solution:
          'Semantic technical architecture adhering to Google local and international SEO standards.',
      },
      {
        problem: 'Unresponsive or Mobile-Broken Layouts',
        solution:
          'Fluid responsive interfaces thoroughly verified across all modern smartphone viewports.',
      },
      {
        problem: 'Sluggish Load Times & High Bounce Rates',
        solution:
          'High Core Web Vitals optimization, asset compression, and clean code for instant rendering.',
      },
      {
        problem: 'Outdated or Unprofessional Branding',
        solution:
          'Refined typography and clean corporate design system to establish immediate credibility.',
      },
    ],
    possibleFeatures: [
      'Tailored responsive layout (Mobile, Tablet, Desktop)',
      'Direct WhatsApp inquiry integration and smart contact forms',
      'Interactive service catalog and portfolio presentations',
      'Technical SEO with Schema.org JSON-LD and Open Graph protocols',
      'Google Maps and local presence integration',
      'Bilingual capability (French / English)',
      'Fast client-side navigation with zero layout shift',
    ],
    starterScope: {
      title: 'Included in Starting Baseline',
      items: [
        'Custom responsive design tailored to your visual identity',
        'Up to 5 structured pages (Home, Services, About, References, Contact)',
        'Spam-protected contact form with direct email/WhatsApp alerts',
        'On-page technical SEO & Schema.org rich snippets',
        'Domain mapping, SSL certificate, and high-performance hosting setup',
        '30-day post-launch technical warranty',
      ],
      note: 'Ideal for establishing authority and generating direct inquiries without operational complexity.',
    },
    paidOptions: [
      {
        name: 'Bilingual International Pack (EN / FR)',
        description: 'Complete translation, localized routing, and hreflang tag management.',
      },
      {
        name: 'Integrated Editorial Blog & Resources',
        description: 'Articles hub optimized for organic inbound content marketing.',
      },
      {
        name: 'Advanced Analytics & Privacy Dashboard',
        description: 'Cookieless telemetry tracking conversions and lead sources.',
      },
      {
        name: 'Custom Domain & Professional Workspace Setup',
        description: 'DNS configuration and Google Workspace business email integration.',
      },
    ],
    methodSteps: [
      {
        step: '01',
        title: 'Discovery & Strategic Scoping',
        description: 'Clarifying brand goals, audience pain points, and core messaging structure.',
      },
      {
        step: '02',
        title: 'UI/UX Wireframing & Prototyping',
        description: 'Validating layout hierarchies and responsive flows before code implementation.',
      },
      {
        step: '03',
        title: 'Frontend Engineering & SEO Integration',
        description: 'Modern component development with strict TypeScript and accessibility checks.',
      },
      {
        step: '04',
        title: 'Quality Assurance & Production Launch',
        description: 'Cross-browser testing, Core Web Vitals auditing, and live domain deployment.',
      },
    ],
    relatedProjectIds: ['yello-edtech', 'istamco'],
    faq: [
      {
        question: 'Do I own the website and source code?',
        answer:
          'Yes, absolutely. You retain 100% full ownership of your source code, assets, domain name, and hosting accounts.',
      },
      {
        question: 'How long does a website project take from start to finish?',
        answer:
          'A standard 5-page showcase website is typically delivered and launched within 2 to 3 weeks once all content is provided.',
      },
      {
        question: 'Can I easily update the content later?',
        answer:
          'Yes. We build clean, modular components and provide clear documentation so updating text or contact details is straightforward.',
      },
      {
        question: 'Is hosting included in the starting price?',
        answer:
          'We configure deployment on high-availability cloud platforms (such as Vercel). Operating costs are fully transparent and minimal.',
      },
    ],
    meta: {
      title: 'Professional Website Development Dakar & Senegal | MusaTech',
      description:
        'Fast, high-conversion, SEO-optimized business websites for companies and professionals in Senegal and internationally. Starting from 250,000 XOF.',
    },
  },
  'e-commerce': {
    slug: 'e-commerce',
    title: 'Custom E-Commerce & Connected Stores',
    shortDescription:
      'High-performance online shops tailored to West African and global buyers with seamless mobile money integration.',
    heroTagline:
      'Sell products online without technical friction. Native mobile money (Wave, Orange Money), card processing, and live stock tracking.',
    startingPrice: 'Starting from 600,000 XOF',
    isPriceValidated: true,
    estimatedDelivery: '3 to 5 weeks',
    targetAudience: [
      {
        category: 'Physical Retailers & Local Brands',
        description:
          'Boutiques, fashion brands, and merchants expanding sales beyond physical storefronts.',
      },
      {
        category: 'Food, Cosmetics & Specialty Distributors',
        description:
          'Wholesalers and direct-to-consumer brands managing catalog orders and deliveries.',
      },
      {
        category: 'Digital Product Creators',
        description:
          'Publishers, trainers, and service businesses selling downloadable assets or digital access.',
      },
    ],
    problemsSolved: [
      {
        problem: 'Payment Friction & Abandoned Carts',
        solution:
          'Native integration with Wave and Orange Money for instant, friction-free mobile checkout.',
      },
      {
        problem: 'Disorganized WhatsApp Order Tracking',
        solution:
          'Centralized dashboard tracking order states, delivery addresses, and customer history.',
      },
      {
        problem: 'Slow Catalog Navigation on Mobile Data',
        solution:
          'Lightweight product pages optimized for quick browsing on 3G/4G connections.',
      },
      {
        problem: 'Manual Inventory Discrepancies',
        solution:
          'Automated stock reservation on payment confirmation to avoid overselling.',
      },
    ],
    possibleFeatures: [
      'Interactive product catalog with category and price filters',
      'Streamlined mobile-first shopping cart and checkout flow',
      'Direct mobile money integration (Wave, Orange Money) and international cards',
      'Automated email and WhatsApp order confirmations',
      'Merchant management dashboard for products, inventory, and orders',
      'Promo codes, discount vouchers, and campaign management',
      'Exportable financial receipts and delivery slips',
    ],
    starterScope: {
      title: 'Included in Starting Baseline',
      items: [
        'E-commerce store setup with custom branding',
        'Product catalog supporting up to 50 active items',
        'One primary local mobile money integration (Wave or Orange Money)',
        'Merchant administrative dashboard for order and stock tracking',
        'Automated order confirmation notifications to merchant and client',
        'Staff training session on catalog and order management',
      ],
      note: 'The starting baseline is designed for direct retail. Multi-vendor marketplaces or cross-border logistics integrations require a dedicated custom scope.',
    },
    paidOptions: [
      {
        name: 'Dual Wave + Orange Money Gateways',
        description: 'Simultaneous integration of both leading West African mobile money providers.',
      },
      {
        name: 'International Credit Card Processing',
        description: 'Stripe or regional card checkout for diaspora and international customers.',
      },
      {
        name: 'Delivery Logistics & Rider Dispatch Integration',
        description: 'Automated delivery fee calculation and live dispatch status notifications.',
      },
      {
        name: 'Accounting & ERP Sync API',
        description: 'Automated synchronisation with external accounting software.',
      },
    ],
    methodSteps: [
      {
        step: '01',
        title: 'Catalog Structuring & Payment Scoping',
        description: 'Defining product attributes, shipping methods, and gateway credentials.',
      },
      {
        step: '02',
        title: 'E-Commerce UX & Checkout Design',
        description: 'Designing intuitive, high-converting product pages and frictionless checkout steps.',
      },
      {
        step: '03',
        title: 'Gateway Integration & Security Testing',
        description: 'Implementing webhooks, payment validation callbacks, and encrypted transactions.',
      },
      {
        step: '04',
        title: 'Live Transactions Verification & Launch',
        description: 'Processing live end-to-end sandbox and production payments before opening.',
      },
    ],
    relatedProjectIds: ['istamco', 'assure-express'],
    faq: [
      {
        question: 'Are transaction fees included in the starting price?',
        answer:
          'MusaTech does not charge per-transaction commissions. Standard operator gateway fees (e.g. Wave 1%) apply directly to your account.',
      },
      {
        question: 'Can customers order directly through WhatsApp?',
        answer:
          'Yes. We can configure automated WhatsApp order summaries alongside or complementary to online checkout.',
      },
      {
        question: 'How do I add or update products after launch?',
        answer:
          'You receive a secure, easy-to-use administrative interface to manage photos, prices, descriptions, and stock levels.',
      },
    ],
    meta: {
      title: 'Custom E-Commerce Development Dakar | Wave & Orange Money | MusaTech',
      description:
        'Launch a secure, high-conversion online store in Senegal with native mobile money and card processing. Starting from 600,000 XOF.',
    },
  },
  'logiciels-metier': {
    slug: 'logiciels-metier',
    title: 'Custom Business Software & Platforms',
    shortDescription:
      'Internal operations platforms, bespoke CRMs, client portals, and workflow automation to eliminate spreadsheet errors.',
    heroTagline:
      'Centralize your company data, automate repetitive tasks, and empower your team with tailored web applications engineered for productivity.',
    startingPrice: 'Starting from 1,500,000 XOF',
    isPriceValidated: true,
    estimatedDelivery: '4 to 8 weeks',
    targetAudience: [
      {
        category: 'Real Estate Agencies & Property Managers',
        description:
          'Portals for tracking tenants, leases, property visits, and maintenance requests.',
      },
      {
        category: 'Private Schools, Institutes & Academies',
        description:
          'Student registration systems, grade tracking, scheduling, and parent portals.',
      },
      {
        category: 'Logistics, Transport & Freight Forwarders',
        description:
          'Shipment tracking, customs documentation management, and fleet coordination.',
      },
      {
        category: 'B2B Service Companies & Wholesalers',
        description:
          'Custom CRMs, quote generation engines, invoice automation, and KPI dashboards.',
      },
    ],
    problemsSolved: [
      {
        problem: 'Fragile Spreadsheet Tracking (Excel / Sheets)',
        solution:
          'Centralized relational database with access controls, historical logs, and data integrity.',
      },
      {
        problem: 'Repetitive Manual Data Re-entry',
        solution:
          'Automated data workflows generating quotes, invoices, and PDF reports in one click.',
      },
      {
        problem: 'Disconnected Tools & Information Silos',
        solution:
          'A unified web workspace connecting management, field agents, and customers.',
      },
      {
        problem: 'Lack of Real-Time Operational Visibility',
        solution:
          'Executive dashboards with real-time performance indicators and operational alerts.',
      },
    ],
    possibleFeatures: [
      'Role-based access control (Admin, Manager, Field Agent, Client)',
      'Custom customer and prospect CRM pipelines',
      'Automated quote, invoice, and receipt generation (PDF / Excel)',
      'Real-time analytics and management dashboards',
      'REST APIs connecting third-party systems and payment gateways',
      'Audit logs, security tracking, and automated backups',
    ],
    starterScope: {
      title: 'Included in Starting Baseline',
      items: [
        'Dedicated relational database architecture (PostgreSQL)',
        'Robust, modular REST API backend (NestJS / Node.js)',
        'Responsive web management dashboard (React / Next.js)',
        'Authentication system with 2 to 3 user privilege levels',
        'Core business module tailored to your primary operational bottleneck',
        'Data export features (Excel / CSV / PDF)',
        'Deployment on secure production server infrastructure',
      ],
      note: 'The starting baseline solves one primary operational workflow. Complex multi-branch ERP systems are scoped in transparent iterative milestones.',
    },
    paidOptions: [
      {
        name: 'Client / External Partner Portal',
        description: 'Dedicated login space for your clients to view invoices and project statuses.',
      },
      {
        name: 'Automated SMS / WhatsApp Notification Gateway',
        description: 'Instant status alerts sent directly to clients or team members.',
      },
      {
        name: 'Multi-Branch & Inventory Synchronization',
        description: 'Centralized management across multiple physical offices or warehouses.',
      },
      {
        name: 'Existing Legacy Database Migration',
        description: 'Sanitizing, mapping, and migrating data from old spreadsheets or legacy tools.',
      },
    ],
    methodSteps: [
      {
        step: '01',
        title: 'Business Process Mapping',
        description: 'Detailed analysis of your existing forms, calculations, and operational bottlenecks.',
      },
      {
        step: '02',
        title: 'Relational Database & Architecture Scoping',
        description: 'Modeling PostgreSQL schemas and defining access control matrices.',
      },
      {
        step: '03',
        title: 'Iterative Sprints & Milestone Demos',
        description: 'Two-week development sprints with live functional staging demonstrations.',
      },
      {
        step: '04',
        title: 'Team Onboarding & Production Rollout',
        description: 'Staff training, documentation handover, and supervised live deployment.',
      },
    ],
    relatedProjectIds: ['istamco', 'yello-edtech', 'edaktarii'],
    faq: [
      {
        question: 'Why choose custom software over off-the-shelf SaaS?',
        answer:
          'Off-the-shelf software charges recurring monthly fees per user and forces you to adapt your workflow. Custom software adapts to your exact business rules, has zero monthly license fees, and remains your proprietary asset.',
      },
      {
        question: 'Is our corporate data secure?',
        answer:
          'Yes. We apply strict security standards: JWT session controls, encrypted database connections, daily backups, and role-based permissions.',
      },
      {
        question: 'Can the software evolve as our business grows?',
        answer:
          'Absolutely. We build with modular Clean Architecture (NestJS / PostgreSQL / React), allowing new modules and integrations to be added seamlessly.',
      },
    ],
    meta: {
      title: 'Custom Business Software & Management Platforms Dakar | MusaTech',
      description:
        'Automate your business operations with bespoke management software, CRMs, and operational portals in Dakar. Starting from 1,500,000 XOF.',
    },
  },
  'applications-mobiles': {
    slug: 'applications-mobiles',
    title: 'Mobile Applications iOS & Android',
    shortDescription:
      'Fluid, offline-ready React Native mobile applications connected to robust, secure backends.',
    heroTagline:
      'Deliver a smooth mobile experience directly to your customers’ smartphones on both Google Play and Apple App Store.',
    startingPrice: 'Starting from 2,000,000 XOF',
    isPriceValidated: true,
    estimatedDelivery: '6 to 10 weeks',
    targetAudience: [
      {
        category: 'FinTech, InsurTech & Mobile Money Startups',
        description:
          'Digital subscription, instant quote, and transaction processing directly from smartphones.',
      },
      {
        category: 'HealthTech & Telemedicine Ventures',
        description:
          'Appointment booking, secure patient charts, and real-time video consultations.',
      },
      {
        category: 'On-Demand Service & Logistics Platforms',
        description:
          'Customer booking apps and dedicated field agent / delivery rider interfaces.',
      },
      {
        category: 'Established Brands Building Customer Loyalty',
        description:
          'Mobile loyalty programs, push notifications, and VIP shopping experiences.',
      },
    ],
    problemsSolved: [
      {
        problem: 'Prohibitive Costs of Maintaining Two Codebases',
        solution:
          'Cross-platform React Native architecture sharing 90%+ code between iOS and Android.',
      },
      {
        problem: 'App Crashes & Sluggish Performance',
        solution:
          'Strict performance optimization and native bridge efficiency for 60fps responsiveness.',
      },
      {
        problem: 'Offline Failures in Weak Network Conditions',
        solution:
          'Offline-first caching storing actions locally and synchronizing seamlessly upon reconnect.',
      },
      {
        problem: 'App Store / Play Store Rejections',
        solution:
          'Strict compliance with Apple Human Interface Guidelines and Google Play privacy policies.',
      },
    ],
    possibleFeatures: [
      'Cross-platform iOS and Android compilation from single clean codebase',
      'Secure biometrics authentication (FaceID, TouchID, Fingerprint)',
      'Push notification engine for alerts and promotional campaigns',
      'Offline data caching and background sync',
      'Integrated mobile money and card payment workflows',
      'Real-time WebSockets / WebRTC for live chat and video',
    ],
    starterScope: {
      title: 'Included in Starting Baseline',
      items: [
        'Cross-platform mobile application (iOS & Android) with 4 to 6 core screens',
        'Modular backend API (NestJS / Node.js) managing users and data',
        'Secure authentication system and user profile management',
        'One primary local mobile money or core business workflow integration',
        'Basic push notification integration',
        'Production build files prepared and signed for App Store / Google Play submission',
      ],
      note: 'The starting baseline covers a tested commercial MVP. Ultra-high-frequency dispatching algorithms (e.g. large-scale ride-hailing) or live video streaming require custom architectural scoping.',
    },
    paidOptions: [
      {
        name: 'Live Video Consultation & Streaming',
        description: 'Low-latency WebRTC integration for telemedicine or virtual events.',
      },
      {
        name: 'Background Geolocation & Route Tracking',
        description: 'Continuous driver and parcel tracking on interactive maps.',
      },
      {
        name: 'Full App Store & Google Play Submission Management',
        description: 'Developer account guidance, store screenshot assets, and submission review handling.',
      },
    ],
    methodSteps: [
      {
        step: '01',
        title: 'Mobile UI/UX Screen-by-Screen Flow',
        description: 'Prototyping responsive touch interfaces following Apple & Android guidelines.',
      },
      {
        step: '02',
        title: 'Backend API & Mobile Architecture',
        description: 'Engineering the React Native client and connected NestJS backend.',
      },
      {
        step: '03',
        title: 'Physical Device Testing',
        description: 'Rigorous testing on real physical iPhones and diverse Android devices.',
      },
      {
        step: '04',
        title: 'Signed Builds & Production Delivery',
        description: 'Generating production signed bundles (IPA and AAB) ready for Store rollout.',
      },
    ],
    relatedProjectIds: ['assure-express', 'edaktarii'],
    faq: [
      {
        question: 'Will the mobile app work on both iPhone and Android?',
        answer:
          'Yes. With React Native, we engineer a unified codebase that compiles natively for iOS and Android with premium native performance.',
      },
      {
        question: 'Do you manage Store publication?',
        answer:
          'We prepare all required assets, signed builds, and privacy disclosures. We can also assist you step-by-step during the Apple and Google developer account submissions.',
      },
      {
        question: 'Can the app function without an active internet connection?',
        answer:
          'Yes, based on requirements defined during scoping, we can build local offline caching that syncs data automatically when connection resumes.',
      },
    ],
    meta: {
      title: 'Mobile App Development Dakar | iOS & Android React Native | MusaTech',
      description:
        'Cross-platform mobile applications in React Native with robust NestJS backends in Dakar. Starting from 2,000,000 XOF for a commercial MVP.',
    },
  },
};

export const getAllServices = (locale: string = 'fr'): ServiceDetail[] => {
  const isEn = locale === 'en';
  return Object.values(isEn ? SERVICES_DETAILED_DATA_EN : SERVICES_DETAILED_DATA_FR);
};

export const getServiceBySlug = (slug: string, locale: string = 'fr'): ServiceDetail | undefined => {
  const isEn = locale === 'en';
  const data = isEn ? SERVICES_DETAILED_DATA_EN : SERVICES_DETAILED_DATA_FR;
  
  // Normalisation des slugs bilingues
  const normalized =
    slug === 'websites'
      ? 'sites-web'
      : slug === 'business-software'
        ? 'logiciels-metier'
        : slug === 'mobile-apps'
          ? 'applications-mobiles'
          : slug;

  return data[normalized] || data[slug];
};


