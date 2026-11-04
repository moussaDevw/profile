/**
 * Données centralisées des solutions sectorielles MusaTech
 * Conforme à MUSATECH_MASTER_SPEC.md, REQUIREMENTS.md et directives B2B
 */

export interface SectorProblem {
  title: string;
  problem: string;
  impact: string;
  solutionBenefit: string;
}

export interface SectorFeature {
  title: string;
  description: string;
  category: 'Socle Essentiel' | 'Gestion & Opérations' | 'Option Avancée';
  isOption?: boolean;
}

export interface SectorBenefit {
  title: string;
  description: string;
  highlight: string;
}

export interface UserFlowStep {
  stepNumber: string;
  actor: string;
  action: string;
  outcome: string;
}

export interface SectorFaq {
  question: string;
  answer: string;
}

export interface SectorSolutionDetail {
  slug: string;
  sectorName: string;
  status: 'active' | 'draft_proposal';
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  hero: {
    badge: string;
    title: string;
    description: string;
    pitch: string;
  };
  problems: SectorProblem[];
  features: SectorFeature[];
  benefits: SectorBenefit[];
  userFlow: {
    title: string;
    subtitle: string;
    steps: UserFlowStep[];
  };
  relatedProject?: {
    id: string;
    name: string;
    context: string;
    founderRole: string;
    metric?: string;
    stack: string[];
  };
  faq: SectorFaq[];
  quoteSlug: string;
}

export const SOLUTIONS_DATA: Record<string, SectorSolutionDetail> = {
  immobilier: {
    slug: 'immobilier',
    sectorName: 'Immobilier',
    status: 'active',
    meta: {
      title: 'Solution Web & CRM Immobilier sur Mesure | MusaTech Dakar',
      description:
        'Digitalisez votre agence immobilière au Sénégal : catalogue de biens en ligne, recherche multicritère, demandes de visite, gestion des prospects et suivi locatif sur mesure.',
      keywords: [
        'logiciel immobilier dakar',
        'site web agence immobilière sénégal',
        'crm immobilier afrique',
        'catalogue immobilier en ligne',
        'gestion locative dakar',
      ],
    },
    hero: {
      badge: 'Expertise Métier — Agences Immobilières & Promoteurs',
      title: 'Digitalisez votre agence immobilière et simplifiez la gestion de vos biens.',
      description:
        'Offrez à vos clients un catalogue en ligne moderne et rapide, captez des demandes de visite qualifiées et centralisez vos prospects et mandats dans un portail sur mesure.',
      pitch:
        'Conçu pour les réalités du marché ouest-africain : fiches optimisées pour mobile, intégration WhatsApp directe et suivi rigoureux des acquéreurs et locataires.',
    },
    problems: [
      {
        title: 'Biens éparpillés sur les réseaux sociaux et WhatsApp',
        problem:
          'Vos annonces sont dispersées entre statuts WhatsApp, pages Facebook et discussions privées. Les photos sont compressées et les biens déjà vendus restent consultables.',
        impact: 'Confusion pour les prospects, image peu professionnelle et perte de temps à renvoyer les mêmes détails.',
        solutionBenefit:
          'Un catalogue centralisé, toujours à jour, accessible 24/7 sur votre propre nom de domaine avec photos haute résolution et caractéristiques claires.',
      },
      {
        title: 'Visites non qualifiées et temps perdu sur le terrain',
        problem:
          'Vos agents passent des heures à faire visiter des biens à des personnes dont le budget ou les critères ne correspondent pas à l’offre.',
        impact: 'Frais de déplacement inutiles, fatigue des équipes et baisse de productivité sur les dossiers prioritaires.',
        solutionBenefit:
          'Un formulaire de demande de visite filtrant avec validation des critères (budget, date d’emménagement, statut de financement).',
      },
      {
        title: 'Gestion locative et suivi des mandats sur tableur',
        problem:
          'L’historique des échanges avec les propriétaires, les baux et les relances de loyers sont consignés sur des fichiers Excel isolés.',
        impact: 'Risque d’oubli de relance, perte de contacts en cas de départ d’un collaborateur et suivi financier laborieux.',
        solutionBenefit:
          'Un CRM et module de gestion locative centralisé regroupant propriétaires, locataires, baux et alertes d’échéance.',
      },
    ],
    features: [
      {
        title: 'Catalogue immobilier dynamique',
        description:
          'Présentation soignée de vos biens (vente et location) avec galeries photos haute définition, vidéos, plans et fiches techniques complètes.',
        category: 'Socle Essentiel',
      },
      {
        title: 'Recherche multicritère performante',
        description:
          'Filtres instantanés par ville, quartier (ex. Almadies, Mermoz, Plateau), type de bien, fourchette de prix, nombre de pièces et surface.',
        category: 'Socle Essentiel',
      },
      {
        title: 'Fiches de biens interactives & claires',
        description:
          'Détail des commodités (gardiennage, groupe électrogène, piscine), géolocalisation approximative de sécurité et bouton d’échange direct via WhatsApp.',
        category: 'Socle Essentiel',
      },
      {
        title: 'Demandes de visite en ligne',
        description:
          'Formulaire ergonomique permettant aux clients de choisir un créneau souhaité et de soumettre leurs disponibilités en quelques clics.',
        category: 'Gestion & Opérations',
      },
      {
        title: 'Gestion centralisée des prospects',
        description:
          'Enregistrement automatique des leads avec leurs critères de recherche. Rapprochement automatique dès qu’un bien correspondant entre en catalogue.',
        category: 'Gestion & Opérations',
      },
      {
        title: 'Mini-CRM de suivi des négociations',
        description:
          'Tableau de bord de suivi du pipeline : biens sous offre, compromis, actes de vente, historique des contacts et relances programmées.',
        category: 'Gestion & Opérations',
      },
      {
        title: 'Suivi locatif (Module en option)',
        description:
          'Gestion des baux locatifs, suivi des encaissements mensuels, génération automatique de quittances PDF et alertes des retards de paiement.',
        category: 'Option Avancée',
        isOption: true,
      },
    ],
    benefits: [
      {
        title: 'Gain de réactivité commerciale',
        description:
          'Vos agents partagent instantanément des fiches soignées par lien web plutôt que des dizaines de photos non titrées.',
        highlight: 'Partage instantané & professionnel',
      },
      {
        title: 'Qualification accrue des acheteurs',
        description:
          'Moins de visites inutiles grâce à une transparence totale sur les critères, surfaces, prix et charges avant tout déplacement.',
        highlight: 'Visites plus ciblées',
      },
      {
        title: 'Centralisation et transmission du savoir',
        description:
          'Votre portefeuille de biens et vos contacts clients restent la propriété exclusive de votre entreprise, protégés dans votre base sécurisée.',
        highlight: 'Données protégées & pérennes',
      },
      {
        title: 'Image de marque premium',
        description:
          'Une présence digitale soignée inspire confiance aux propriétaires exigeants qui vous confient des mandats exclusifs.',
        highlight: 'Plus de mandats exclusifs',
      },
    ],
    userFlow: {
      title: 'Exemple de parcours : de la découverte à la signature',
      subtitle: 'Comment un acquéreur ou locataire interagit avec votre plateforme',
      steps: [
        {
          stepNumber: '01',
          actor: 'Prospect',
          action: 'Recherche multicritère',
          outcome: 'Filtre les villas à louer à Ngor avec 3 chambres et budget max, et accède aux annonces correspondantes en moins de 2 secondes.',
        },
        {
          stepNumber: '02',
          actor: 'Prospect',
          action: 'Consultation de la fiche',
          outcome: 'Explore les photos HD, visualise les commodités et les conditions de caution, puis clique sur « Demander une visite ».',
        },
        {
          stepNumber: '03',
          actor: 'Plateforme',
          action: 'Qualification & Notification',
          outcome: 'Le prospect précise ses disponibilités et son statut. Une alerte WhatsApp arrive immédiatement sur le téléphone de l’agent dédié.',
        },
        {
          stepNumber: '04',
          actor: 'Agent immobilier',
          action: 'Confirmation dans le CRM',
          outcome: 'L’agent confirme le rendez-vous en un clic. La fiche prospect est automatiquement créée et liée au bien visité.',
        },
        {
          stepNumber: '05',
          actor: 'Agence',
          action: 'Suivi et conclusion',
          outcome: 'Après la visite, l’agent note le compte-rendu dans le CRM et passe le statut à « Négociation » ou propose un bien alternatif.',
        },
      ],
    },
    faq: [
      {
        question: 'Peut-on masquer l’adresse exacte des biens pour protéger nos mandats ?',
        answer:
          'Absolument. Nous mettons en place une géolocalisation approximative par zone ou quartier (ex. « Fann Résidence » ou « Mamelles ») sans divulguer le numéro de rue ou l’immeuble précis.',
      },
      {
        question: 'Comment mes agents mettent-ils à jour les biens vendus ou loués ?',
        answer:
          'Une interface d’administration épurée et accessible sur smartphone permet de changer le statut d’un bien en un clic (« Disponible », « Sous offre », « Vendu », « Loué ») sans aucune compétence technique.',
      },
      {
        question: 'Le site peut-il être connecté directement à WhatsApp ?',
        answer:
          'Oui. Chaque fiche de bien intègre un bouton WhatsApp pré-rempli avec la référence du bien et le lien direct, facilitant l’échange instantané avec vos prospects.',
      },
      {
        question: 'Suis-je propriétaire de la plateforme et de ma base de données ?',
        answer:
          'Oui, à 100 %. Contrairement aux plateformes SaaS par abonnement fermé, votre solution MusaTech vous appartient intégralement : code source, base PostgreSQL et catalogue.',
      },
    ],
    quoteSlug: 'immobilier',
  },

  education: {
    slug: 'education',
    sectorName: 'Éducation',
    status: 'active',
    meta: {
      title: 'Plateforme de Gestion Scolaire & Formation sur Mesure | MusaTech Dakar',
      description:
        'Simplifiez la gestion de votre école ou centre de formation au Sénégal : inscriptions en ligne, gestion des apprenants, plannings, notes, paiements et espace parents.',
      keywords: [
        'plateforme scolaire dakar',
        'logiciel gestion école sénégal',
        'portail edtech afrique',
        'inscription scolaire en ligne',
        'espace parents école privée dakar',
      ],
    },
    hero: {
      badge: 'Expertise Métier — Écoles Privées & Centres de Formation',
      title: 'Simplifiez la gestion de votre établissement avec une plateforme adaptée.',
      description:
        'Dématérialisez les inscriptions, automatisez le suivi académique et facilitez les encaissements de scolarité grâce à un portail moderne et accessible sur mobile.',
      pitch:
        'Fini les dossiers papier perdus et les files d’attente : connectez administration, enseignants, élèves et parents dans un espace unique et sécurisé.',
    },
    problems: [
      {
        title: 'Inscriptions papier encombrantes et files d’attente',
        problem:
          'Pendant les périodes de rentrée, le secrétariat croule sous les formulaires manuscrits, pièces d’identité photocopiées et justificatifs dispersés.',
        impact: 'Erreurs de transcription des noms, perte de documents et mécontentement des familles contraintes de se déplacer plusieurs fois.',
        solutionBenefit:
          'Un portail de pré-inscription en ligne où les familles transmettent les pièces numériques et reçoivent une confirmation rapide.',
      },
      {
        title: 'Retards de scolarité et suivi financier laborieux',
        problem:
          'Le pointage manuel des versements en espèces ou chèques rend le suivi des impayés difficile et retarde les relances amiables.',
        impact: 'Tensions de trésorerie pour l’établissement et temps considérable passé à pointer des reçus papier manuellement.',
        solutionBenefit:
          'Intégration du paiement mobile (Wave, Orange Money) avec pointage automatique, reçu PDF instantané et tableau de bord des règlements.',
      },
      {
        title: 'Communication éclatée avec les familles',
        problem:
          'Cahiers de correspondance non consultés, bulletins envoyés par des canaux disparates et manque de visibilité des parents sur l’assiduité.',
        impact: 'Manque de confiance, réclamations tardives et difficultés à responsabiliser les apprenants.',
        solutionBenefit:
          'Un espace sécurisé parents/apprenants accessible sur smartphone pour consulter l’emploi du temps, les notes, absences et annonces.',
      },
    ],
    features: [
      {
        title: 'Inscriptions et réinscriptions en ligne',
        description:
          'Formulaire fluide de saisie, téléversement sécurisé des justificatifs (actes de naissance, bulletins) et validation par l’administration.',
        category: 'Socle Essentiel',
      },
      {
        title: 'Gestion des apprenants et classes',
        description:
          'Fiches apprenants complètes, gestion des effectifs par classe ou promotion, suivi des cursus et archivage des historiques.',
        category: 'Socle Essentiel',
      },
      {
        title: 'Emplois du temps dynamiques',
        description:
          'Création et publication des plannings de cours, gestion des salles et des intervenants, avec notification en cas de modification d’horaire.',
        category: 'Socle Essentiel',
      },
      {
        title: 'Suivi des notes et relevés d’absences',
        description:
          'Saisie simplifiée par les professeurs, calcul automatique des coefficients et moyennes, génération de bulletins officiels prêts à imprimer.',
        category: 'Gestion & Opérations',
      },
      {
        title: 'Paiements et suivi des frais de scolarité',
        description:
          'Encaissement des mensualités par mobile money (Wave, Orange Money) ou virement, reçu PDF automatique et relances automatiques.',
        category: 'Gestion & Opérations',
      },
      {
        title: 'Espace parents ou apprenants',
        description:
          'Portail personnel sécurisé pour consulter le calendrier, les devoirs, les notes périodiques, les absences et la situation comptable.',
        category: 'Gestion & Opérations',
      },
      {
        title: 'Attestations & Certificats numériques (En option)',
        description:
          'Génération en un clic de certificats de scolarité et relevés avec QR code de vérification d’authenticité.',
        category: 'Option Avancée',
        isOption: true,
      },
    ],
    benefits: [
      {
        title: 'Gain de temps administratif majeur',
        description:
          'Votre secrétariat économise des dizaines d’heures chaque mois sur la saisie, les impressions et la recherche d’archives papier.',
        highlight: 'Moins de paperasse',
      },
      {
        title: 'Amélioration du recouvrement des frais',
        description:
          'Offrir aux parents la possibilité de régler les mensualités à distance par Wave ou Orange Money réduit considérablement les retards.',
        highlight: 'Trésorerie fiabilisée',
      },
      {
        title: 'Engagement et sérénité des familles',
        description:
          'Les parents apprécient de suivre la progression et l’assiduité de leurs enfants directement sur leur téléphone sans attendre la fin du trimestre.',
        highlight: 'Transparence appréciée',
      },
      {
        title: 'Valorisation de l’établissement',
        description:
          'Une gestion moderne et numérisée renforce l’attractivité de votre école lors des campagnes de recrutement d’élèves.',
        highlight: 'Image d’excellence',
      },
    ],
    userFlow: {
      title: 'Exemple de parcours : de l’inscription au bulletin',
      subtitle: 'Comment un parent et l’administration interagissent tout au long de l’année',
      steps: [
        {
          stepNumber: '01',
          actor: 'Parent d’élève',
          action: 'Inscription en ligne',
          outcome: 'Renseigne les informations de son enfant sur le portail et joint le certificat médical et les photos depuis son smartphone.',
        },
        {
          stepNumber: '02',
          actor: 'Administration',
          action: 'Validation du dossier',
          outcome: 'Le secrétariat vérifie les pièces en un coup d’œil et valide l’admission. Le parent reçoit un SMS/email d’acceptation.',
        },
        {
          stepNumber: '03',
          actor: 'Parent d’élève',
          action: 'Paiement de la scolarité',
          outcome: 'Règle la première tranche directement via Wave sans faire la queue. Le reçu PDF horodaté est généré automatiquement.',
        },
        {
          stepNumber: '04',
          actor: 'Enseignant',
          action: 'Saisie des notes & absences',
          outcome: 'À la fin de chaque séance, le professeur enregistre les présences et notes de devoir depuis son compte dédié.',
        },
        {
          stepNumber: '05',
          actor: 'Famille & Direction',
          action: 'Génération du bulletin',
          outcome: 'En fin de période, les moyennes sont calculées automatiquement et les bulletins PDF sont consultables sur l’espace sécurisé.',
        },
      ],
    },
    relatedProject: {
      id: 'yello-edtech',
      name: 'Plateforme EdTech (Yello)',
      context:
        'Plateforme d’apprentissage interactif à grande échelle intégrant des modules de microlearning, génération automatique de quiz et assistant pédagogique.',
      founderRole:
        'Senior Frontend Developer (Moussa Diagne) : conception et développement des interfaces réactives, gestion d’état avancée avec Zustand et intégration d’APIs pédagogiques.',
      metric: 'Plateforme utilisée par plus de 200 000 apprenants',
      stack: ['React', 'Next.js', 'TypeScript', 'Zustand', 'TanStack Query', 'Tailwind CSS'],
    },
    faq: [
      {
        question: 'Nos données scolaires et informations d’élèves sont-elles protégées ?',
        answer:
          'Oui. La sécurité et la confidentialité sont au cœur de nos réalisations : bases de données chiffrées, gestion stricte des droits d’accès (rôles administrateur, professeur, parent) et conformité aux règles de protection des données personnelles.',
      },
      {
        question: 'Le système fonctionne-t-il sur les téléphones des parents ?',
        answer:
          'Absolument. La plateforme est développée selon les principes du responsive mobile-first : légère, rapide à charger même en 3G/4G et consultable sans installer d’application complexe.',
      },
      {
        question: 'Proposez-vous une formation pour notre personnel administratif et nos enseignants ?',
        answer:
          'Oui. Tout déploiement comprend des sessions pratiques de prise en main pour le personnel de secrétariat et les enseignants, accompagnées de guides pas-à-pas.',
      },
      {
        question: 'Peut-on démarrer avec les inscriptions d’abord, puis ajouter les notes et paiements plus tard ?',
        answer:
          'Tout à fait. L’architecture est modulaire : vous pouvez déployer la brique « Inscriptions & Gestion des élèves » pour la prochaine rentrée, puis activer les notes et paiements au rythme de votre établissement.',
      },
    ],
    quoteSlug: 'education',
  },

  commerce: {
    slug: 'commerce',
    sectorName: 'Commerce',
    status: 'draft_proposal',
    meta: {
      title: 'Plateforme de Vente & Gestion Commerciale sur Mesure | MusaTech Dakar',
      description:
        'Centralisez vos ventes et simplifiez la gestion de votre commerce : catalogue, commandes, stocks en temps réel, paiements Wave/OM, facturation et dashboard.',
      keywords: [
        'logiciel gestion commerce dakar',
        'site e-commerce dakar',
        'gestion de stock commerce sénégal',
        'facturation commerce dakar',
        'point de vente dakar',
      ],
    },
    hero: {
      badge: 'Expertise Métier — Commerces, Grossistes & Distributeurs',
      title: 'Centralisez vos ventes et simplifiez la gestion de votre commerce.',
      description:
        'Réunissez vos ventes en magasin et vos commandes en ligne dans un outil unique pour suivre vos stocks avec précision et encaisser rapidement vos clients.',
      pitch:
        'Une solution connectée à vos moyens de paiement locaux (Wave, Orange Money, Carte) pour éliminer les ruptures de stock et fidéliser votre clientèle.',
    },
    problems: [
      {
        title: 'Gestion des stocks manuelle et ruptures inattendues',
        problem:
          'Le suivi des entrées/sorties sur carnet ou tableur entraîne des erreurs de comptage et des ruptures au moment où les clients commandent.',
        impact: 'Ventes manquées, mécontentement des acheteurs et réapprovisionnements en urgence coûteux.',
        solutionBenefit:
          'Gestion des stocks synchronisée en temps réel avec seuils d’alerte automatiques avant épuisement.',
      },
      {
        title: 'Commandes dispersées sur WhatsApp et pertes de suivi',
        problem:
          'Les commandes arrivent par messages écrits, vocaux et appels, sans historique clair ni statut d’acheminement.',
        impact: 'Erreurs de préparation de commande, oublis de livraison et litiges sur les montants encaissés.',
        solutionBenefit:
          'Un panier en ligne et bon de commande clair récapitulant les articles, le montant exact et l’adresse de livraison.',
      },
      {
        title: 'Facturation et réconciliation des paiements chronophages',
        problem:
          'Pointer les paiements Wave et Orange Money par rapport aux tickets papier prend des heures chaque fin de semaine.',
        impact: 'Retards comptables, erreurs d’encaissement et absence de visibilité sur les marges réelles.',
        solutionBenefit:
          'Facturation automatique liée aux transactions avec tableau de bord des chiffres d’affaires consolidés.',
      },
    ],
    features: [
      {
        title: 'Catalogue produits centralisé',
        description:
          'Gestion des articles par catégories, variantes (tailles, couleurs, conditionnements), photos et descriptions tarifaires.',
        category: 'Socle Essentiel',
      },
      {
        title: 'Gestion des commandes fluide',
        description:
          'Prise de commande en ligne et en magasin, suivi du statut (en attente, préparée, expédiée, livrée) avec notifications clients.',
        category: 'Socle Essentiel',
      },
      {
        title: 'Suivi des stocks en temps réel',
        description:
          'Décrémentation automatique des stocks à chaque vente, inventaires simplifiés et alertes paramétrables sur stock minimum.',
        category: 'Socle Essentiel',
      },
      {
        title: 'Paiements mobiles intégrés (Wave, Orange Money)',
        description:
          'Encaissement sécurisé avec confirmation instantanée de règlement évitant les faux reçus de transfert.',
        category: 'Gestion & Opérations',
      },
      {
        title: 'Facturation & Reçus automatiques',
        description:
          'Édition instantanée de factures proforma, factures définitives et reçus de caisse aux normes comptables.',
        category: 'Gestion & Opérations',
      },
      {
        title: 'Dashboard de pilotage commercial',
        description:
          'Indicateurs clés en direct : chiffre d’affaires du jour, produits les plus vendus, panier moyen et suivi de rentabilité.',
        category: 'Gestion & Opérations',
      },
    ],
    benefits: [
      {
        title: 'Visibilité totale sur vos liquidités',
        description: 'Visualisez exactement ce qui a été encaissé, par quel canal et ce qui reste à livrer.',
        highlight: 'Zéro angle mort financier',
      },
      {
        title: 'Disponibilité 24h/24',
        description: 'Votre boutique enregistre des commandes même en dehors des heures d’ouverture de votre établissement physique.',
        highlight: 'Ventes en continu',
      },
      {
        title: 'Rapidité de préparation',
        description: 'Vos équipes reçoivent des bons clairs et préparent les commandes sans hésitation sur les références.',
        highlight: 'Gain de productivité',
      },
      {
        title: 'Fidélisation client',
        description: 'Vos clients bénéficient d’une expérience d’achat moderne et d’un historique clair de leurs commandes.',
        highlight: 'Clients satisfaits',
      },
    ],
    userFlow: {
      title: 'Exemple de parcours : de la commande au réassort',
      subtitle: 'Comment un client achète et comment votre équipe gère l’exécution',
      steps: [
        {
          stepNumber: '01',
          actor: 'Client',
          action: 'Sélection des produits',
          outcome: 'Consulte le catalogue en ligne, choisit les références disponibles et valide son panier.',
        },
        {
          stepNumber: '02',
          actor: 'Client',
          action: 'Paiement sécurisé Wave/OM',
          outcome: 'Règle instantanément via son portefeuille mobile avec confirmation immédiate.',
        },
        {
          stepNumber: '03',
          actor: 'Plateforme',
          action: 'Mise à jour du stock & Facture',
          outcome: 'Le stock est décompté, la facture PDF est générée et envoyée par email/SMS au client.',
        },
        {
          stepNumber: '04',
          actor: 'Équipe Magasin',
          action: 'Préparation de la commande',
          outcome: 'Reçoit le bon de préparation sur tablette et passe la commande en statut « Prête à expédier ».',
        },
        {
          stepNumber: '05',
          actor: 'Gérant',
          action: 'Suivi sur le tableau de bord',
          outcome: 'Consulte les indicateurs journaliers de vente et les alertes d’articles à recommander aux fournisseurs.',
        },
      ],
    },
    faq: [
      {
        question: 'Peut-on connecter la plateforme à une imprimante thermique pour les tickets de caisse ?',
        answer: 'Oui, nous pouvons intégrer l’impression de tickets thermiques et de bordereaux au format standard.',
      },
      {
        question: 'La solution gère-t-elle plusieurs boutiques ou points de vente ?',
        answer: 'Oui, l’architecture peut être configurée en multi-dépôts avec transfert de stock entre magasins.',
      },
      {
        question: 'Que se passe-t-il si la connexion internet est interrompue en magasin ?',
        answer: 'Nous prévoyons un mode hors-ligne pour la saisie des ventes qui se synchronise automatiquement dès le rétablissement de la connexion.',
      },
      {
        question: 'Quel est le modèle tarifaire pour cette solution ?',
        answer: 'Un développement sur mesure sans abonnement mensuel au chiffre d’affaires : vous possédez votre outil.',
      },
    ],
    quoteSlug: 'commerce',
  },

  logistique: {
    slug: 'logistique',
    sectorName: 'Logistique',
    status: 'draft_proposal',
    meta: {
      title: 'Plateforme de Transport, Flotte & Livraison sur Mesure | MusaTech Dakar',
      description:
        'Pilotez vos opérations de transport et de livraison depuis une plateforme centralisée : gestion de flotte, suivi des chauffeurs, statuts d’expédition et bordereaux.',
      keywords: [
        'logiciel transport logistique dakar',
        'suivi livraison sénégal',
        'gestion de flotte dakar',
        'plateforme expédition colis afrique',
        'bordereaux de livraison automatisés',
      ],
    },
    hero: {
      badge: 'Expertise Métier — Transporteurs, Coursiers & Gestionnaires de Flotte',
      title: 'Pilotez vos opérations de transport et de livraison depuis une plateforme centralisée.',
      description:
        'Coordonnez vos courses, suivez la progression de vos livraisons en temps réel et offrez à vos clients une traçabilité irréprochable de leurs expéditions.',
      pitch:
        'Automatisez l’attribution des courses, réduisez les temps d’attente et fiabilisez vos preuves de livraison avec un outil taillé pour vos opérations.',
    },
    problems: [
      {
        title: 'Absence de visibilité sur l’état réel des expéditions',
        problem:
          'Les clients appellent constamment pour savoir où se trouve leur colis, obligeant le dispatcheur à joindre chaque chauffeur au téléphone.',
        impact: 'Surcharge téléphonique, perte de temps et impression d’improvisation pour les clients réguliers.',
        solutionBenefit:
          'Un suivi de statut étape par étape (Collecté, En transit, En cours de livraison, Livré) accessible en temps réel.',
      },
      {
        title: 'Attribution manuelle des courses et retards',
        problem:
          'La répartition des colis aux chauffeurs se fait par échanges de messages non structurés, sans vision d’ensemble sur les trajets.',
        impact: 'Chauffeurs surchargés d’un côté, inactifs de l’autre, et détours inutiles augmentant la consommation de carburant.',
        solutionBenefit:
          'Tableau de bord de dispatch avec assignation rapide des courses selon la zone géographique et la disponibilité.',
      },
      {
        title: 'Preuves de livraison papier perdues et litiges',
        problem:
          'Les bordereaux de livraison émargés sur papier se perdent ou s’abîment, rendant difficile la contestation des réclamations.',
        impact: 'Paiements bloqués par les donneurs d’ordre et retards de facturation importants.',
        solutionBenefit:
          'Preuve de livraison numérique : signature électronique sur mobile du chauffeur ou photo du colis remis.',
      },
    ],
    features: [
      {
        title: 'Gestion des commandes de livraison',
        description:
          'Création rapide des ordres d’expédition avec adresses de collecte et de livraison, contacts et instructions spéciales.',
        category: 'Socle Essentiel',
      },
      {
        title: 'Suivi des chauffeurs et coursiers',
        description:
          'Visualisation des courses affectées, statut de disponibilité des livreurs et progression sur leur tournée.',
        category: 'Socle Essentiel',
      },
      {
        title: 'Statuts des expéditions en direct',
        description:
          'Mise à jour en temps réel des étapes logistiques avec horodatage certifié et historique complet.',
        category: 'Socle Essentiel',
      },
      {
        title: 'Gestion de flotte & Véhicules',
        description:
          'Suivi des véhicules affectés (motos, camionnettes, camions), kilométrages et rappels d’entretien périodique.',
        category: 'Gestion & Opérations',
      },
      {
        title: 'Notifications automatiques clients',
        description:
          'Alertes par SMS ou WhatsApp dès la prise en charge du colis et à l’approche du livreur.',
        category: 'Gestion & Opérations',
      },
      {
        title: 'Rapports opérationnels & Bordereaux',
        description:
          'Génération automatique des manifestes de chargement, bordereaux de livraison émargés et statistiques de ponctualité.',
        category: 'Gestion & Opérations',
      },
    ],
    benefits: [
      {
        title: 'Réduction des appels entrants de 70 %',
        description: 'Les clients consultent l’avancement de leur colis par un lien de suivi sans surcharger votre secrétariat.',
        highlight: 'Service client soulagé',
      },
      {
        title: 'Tournées rationalisées',
        description: 'Moins de kilomètres à vide grâce à une organisation claire par zone de ramassage et de livraison.',
        highlight: 'Économies de carburant',
      },
      {
        title: 'Règlement rapide des factures',
        description: 'Les preuves de livraison étant numériques et certifiées, les donneurs d’ordre règlent sans contester.',
        highlight: 'Trésorerie accélérée',
      },
      {
        title: 'Capacité de montée en charge',
        description: 'Gérez 50 ou 500 livraisons par jour avec la même rigueur et le même effectif de supervision.',
        highlight: 'Croissance sereine',
      },
    ],
    userFlow: {
      title: 'Exemple de parcours : de la collecte à la preuve de livraison',
      subtitle: 'Comment un ordre de transport est traité de bout en bout',
      steps: [
        {
          stepNumber: '01',
          actor: 'Expéditeur',
          action: 'Création de l’expédition',
          outcome: 'Enregistre les détails du colis et l’adresse de livraison. Le numéro de suivi est généré instantanément.',
        },
        {
          stepNumber: '02',
          actor: 'Dispatcheur',
          action: 'Assignation au chauffeur',
          outcome: 'Attribue la course au livreur le plus proche sur son interface de supervision.',
        },
        {
          stepNumber: '03',
          actor: 'Chauffeur / Livreur',
          action: 'Collecte et scan du colis',
          outcome: 'Prend en charge le colis et confirme le ramassage sur son interface mobile. Le statut passe à « En transit ».',
        },
        {
          stepNumber: '04',
          actor: 'Destinataire',
          action: 'Réception & Signature',
          outcome: 'Reçoit le colis et signe sur le smartphone du livreur. La preuve de livraison horodatée est enregistrée.',
        },
        {
          stepNumber: '05',
          actor: 'Administration',
          action: 'Clôture et facturation',
          outcome: 'La course est clôturée et le bordereau PDF avec signature est archivé pour la facturation fin de mois.',
        },
      ],
    },
    faq: [
      {
        question: 'Les chauffeurs ont-ils besoin d’installer une application lourde ?',
        answer: 'Non, nous concevons une application web progressive (PWA) légère qui fonctionne sur tout smartphone Android basique sans encombrer la mémoire.',
      },
      {
        question: 'Peut-on intégrer des scanners de code-barres ou QR codes ?',
        answer: 'Oui, l’appareil photo du smartphone des livreurs peut être utilisé comme lecteur de QR code ou code-barres pour valider les colis en un clin d’œil.',
      },
      {
        question: 'Comment les clients finaux suivent-ils leur colis ?',
        answer: 'Par un lien unique envoyé par SMS ou WhatsApp les menant vers une page épurée indiquant l’étape de livraison en cours.',
      },
      {
        question: 'La solution est-elle compatible avec des transporteurs sous-traitants ?',
        answer: 'Oui, des accès restreints peuvent être créés pour des flottes partenaires afin qu’elles ne voient que leurs courses assignées.',
      },
    ],
    quoteSlug: 'logistique',
  },
};

export const SOLUTIONS_DATA_FR = SOLUTIONS_DATA;

export const SOLUTIONS_DATA_EN: Record<string, SectorSolutionDetail> = {
  immobilier: {
    slug: 'immobilier',
    sectorName: 'Real Estate',
    status: 'active',
    meta: {
      title: 'Custom Real Estate Web & CRM Platforms | MusaTech Dakar',
      description:
        'Digitize your real estate agency in Senegal: online property catalog, multi-criteria search, viewing requests, prospect management, and custom lease tracking.',
      keywords: [
        'real estate software dakar',
        'real estate agency website senegal',
        'real estate crm west africa',
        'online property catalog',
        'lease management dakar',
      ],
    },
    hero: {
      badge: 'B2B Industry Expertise — Real Estate Agencies & Developers',
      title: 'Digitize your real estate agency and streamline property management.',
      description:
        'Provide clients with a modern, fast online catalog, capture qualified viewing inquiries, and centralize prospects and mandates in a custom portal.',
      pitch:
        'Engineered for the West African market: mobile-first property listings, direct WhatsApp integration, and rigorous tracking of buyers and tenants.',
    },
    problems: [
      {
        title: 'Listings scattered across social media & WhatsApp groups',
        problem:
          'Properties shared via WhatsApp stories and Facebook posts quickly get lost, forcing agents to repeatedly resend the same photos and details.',
        impact:
          'High time loss for agents, lack of brand credibility, and missed opportunities from serious international buyers and diaspora investors.',
        solutionBenefit:
          'A permanent, searchable web catalog where every property has an official link, complete description, and high-resolution photo gallery.',
      },
      {
        title: 'Manual paper tracking of leases and rental collections',
        problem:
          'Rents, lease renewals, and security deposits tracked on paper notebooks or scattered spreadsheets inevitably lead to oversight.',
        impact:
          'Delayed payments, accounting discrepancies, and strained landlord-tenant relations due to lack of transparent documentation.',
        solutionBenefit:
          'A dedicated lease management module tracking payment due dates, generating digital rent receipts, and sending automated reminders.',
      },
      {
        title: 'Sluggish photo loading on mobile 3G/4G connections',
        problem:
          'Heavy, uncompressed images shared by sellers make property pages load slowly, frustrating prospective buyers on mobile devices.',
        impact:
          'High bounce rates (over 60% of visitors leave before photos load) and wasted advertising budgets.',
        solutionBenefit:
          'Automated server-side image compression and WebP conversion for instant mobile display with zero bandwidth lag.',
      },
      {
        title: 'Untracked leads and forgotten viewing inquiries',
        problem:
          'Inquiries coming in via phone calls, SMS, and walk-ins are not centralized, making systematic client follow-up impossible.',
        impact:
          'Hot leads go cold, properties stay on the market longer, and agency commissions are lost to faster competitors.',
        solutionBenefit:
          'An integrated mini-CRM linking every inquiry to the specific property, assigning agents, and tracking negotiation status.',
      },
    ],
    features: [
      {
        title: 'Interactive Multi-Criteria Property Catalog',
        description:
          'Dynamic filtering by neighborhood (Almadies, Plateau, Mermoz, etc.), transaction type (sale, rental), budget range, and room count.',
        category: 'Socle Essentiel',
      },
      {
        title: 'Polished Property Sheets with Direct WhatsApp CTA',
        description:
          'Optimized gallery, neighborhood highlights, downloadables (PDF brochures), and direct WhatsApp messaging pre-filling the property ID.',
        category: 'Socle Essentiel',
      },
      {
        title: 'Online Viewing Request Booking',
        description:
          'Prospects select preferred days and time slots, instantly notifying the assigned agent by email and dashboard alert.',
        category: 'Socle Essentiel',
      },
      {
        title: 'Centralized Lead & Mandate Management CRM',
        description:
          'Track client requirements (budget, location, desired timeline), match them against incoming properties, and track deal stages.',
        category: 'Gestion & Opérations',
      },
      {
        title: 'Landlord & Property Owner Portal',
        description:
          'Provide owners with a secure dashboard showing viewing statistics, incoming offers, and tenant occupancy rates.',
        category: 'Gestion & Opérations',
      },
      {
        title: 'Automated Lease & Rent Collection Tracking',
        description:
          'Monitor rental payment statuses, issue branded rent receipts in PDF format, and track lease expiration dates.',
        category: 'Option Avancée',
        isOption: true,
      },
      {
        title: 'Integrated Mobile Money Payment for Deposits',
        description:
          'Enable tenants to pay deposits or reservation fees directly through Wave or Orange Money with instant receipt generation.',
        category: 'Option Avancée',
        isOption: true,
      },
    ],
    benefits: [
      {
        title: 'Established Brand Authority',
        description:
          'A premium, fast website positions your agency as a trusted leader for expatriates, diaspora investors, and institutional clients.',
        highlight: 'Immediate Trust Factor',
      },
      {
        title: 'Substantial Time Savings for Agents',
        description:
          'Agents stop re-typing property specs on WhatsApp. One shared link contains all verified photos, dimensions, and viewing availability.',
        highlight: 'Over 15 hrs saved / week',
      },
      {
        title: 'Full Property Data Ownership',
        description:
          'You build an enduring proprietary asset. Unlike portal classifieds, all client emails, phone numbers, and viewing records belong 100% to your agency.',
        highlight: 'Zero Platform Lock-in',
      },
    ],
    userFlow: {
      title: 'Typical Client Journey: From Discovery to Viewing',
      subtitle:
        'A streamlined 4-step workflow engineered to maximize qualified viewing appointments.',
      steps: [
        {
          stepNumber: '01',
          actor: 'Prospective Buyer / Tenant',
          action: 'Filters properties by neighborhood and budget, browsing verified photos on smartphone.',
          outcome: 'Discovers matching property in under 45 seconds without bandwidth lag.',
        },
        {
          stepNumber: '02',
          actor: 'Prospective Buyer / Tenant',
          action: 'Clicks "Book a Viewing" or "Chat on WhatsApp", selecting an available time slot.',
          outcome: 'Request is logged in the CRM with client contact details and property reference.',
        },
        {
          stepNumber: '03',
          actor: 'Real Estate Agent',
          action: 'Receives instant notification, reviews prospect profile, and confirms viewing with one tap.',
          outcome: 'Appointment is locked in both the agent calendar and the client WhatsApp.',
        },
        {
          stepNumber: '04',
          actor: 'Agency Director',
          action: 'Tracks viewing progress, feedback notes, and deal closure probabilities on the dashboard.',
          outcome: 'Full visibility over agent performance and revenue pipeline.',
        },
      ],
    },
    faq: [
      {
        question: 'Can agents add new property listings from their smartphone?',
        answer:
          'Yes. The administrative portal is completely mobile-responsive. An agent can take photos on site, enter key specs, and publish the listing in under 3 minutes.',
      },
      {
        question: 'Does the website integrate with WhatsApp?',
        answer:
          'Yes. Every property page includes a smart WhatsApp button that automatically pre-fills the property reference and neighborhood, allowing immediate client context.',
      },
      {
        question: 'Can we restrict access so agents only see their assigned properties?',
        answer:
          'Yes. We configure role-based permissions (Director, Senior Agent, Junior Agent, Accountant) ensuring each team member accesses only authorized records.',
      },
      {
        question: 'How are high-resolution photos handled for slow connections?',
        answer:
          'All images are automatically compressed, resized, and converted to modern WebP format on upload, ensuring crisp visuals without heavy data consumption.',
      },
    ],
    quoteSlug: 'immobilier',
  },
  education: {
    slug: 'education',
    sectorName: 'Education',
    status: 'active',
    meta: {
      title: 'Custom School Management & Student Portals | MusaTech Dakar',
      description:
        'Simplify school administration: online registrations, student records, schedules, grades, attendance, payments, and parent portals.',
      keywords: [
        'school management software dakar',
        'education platform senegal',
        'school administration portal',
        'grade and attendance tracking',
        'school tuition mobile money',
      ],
    },
    hero: {
      badge: 'B2B Industry Expertise — Private Schools, Academies & Training Centers',
      title: 'Streamline your school administration with a tailored education platform.',
      description:
        'Centralize student enrollments, attendance, report cards, and tuition tracking in an intuitive web portal accessible to staff, parents, and learners.',
      pitch:
        'Built for local realities: mobile tuition notifications, automated fee receipts, and secure parent communication.',
    },
    problems: [
      {
        title: 'Manual enrollment queues and paper records',
        problem:
          'Back-to-school registration periods cause heavy administrative bottlenecks, long physical queues, and lost documents.',
        impact:
          'Administrative burnout, transcription errors into Excel, and frustrated parents waiting in lines.',
        solutionBenefit:
          'A streamlined online registration portal allowing parents to upload documents and submit student applications remotely.',
      },
      {
        title: 'Tuition collection tracking and reconciliation delays',
        problem:
          'Tuition paid via bank transfers, cash, and mobile money without centralized reconciliation creates tracking blind spots.',
        impact:
          'Payment disputes, overdue balances discovered late in the term, and hours spent manual auditing receipts.',
        solutionBenefit:
          'Automated tuition tracking displaying real-time payment statuses per class, with instant SMS / WhatsApp payment confirmation.',
      },
      {
        title: 'Delayed distribution of report cards and grade tracking',
        problem:
          'Teachers calculating grades on individual spreadsheets results in formatting errors and delayed report card deliveries.',
        impact:
          'High printing costs, delayed parent feedback, and lack of visibility into student academic progress.',
        solutionBenefit:
          'A centralized gradebook where teachers input marks, generating standardized PDF report cards automatically.',
      },
      {
        title: 'Fragmented parent-school communication',
        problem:
          'Important circulars, homework notices, and event updates sent via paper slips are often misplaced or unread.',
        impact:
          'Poor parent engagement and repetitive phone inquiries to administrative staff.',
        solutionBenefit:
          'A dedicated parent portal and notice board providing instant access to announcements, attendance, and exam calendars.',
      },
    ],
    features: [
      {
        title: 'Online Student Registration & Application Portal',
        description:
          'Digital forms for new registrations and annual re-enrollments with document uploads (birth certificates, past transcripts).',
        category: 'Socle Essentiel',
      },
      {
        title: 'Student & Academic Roster Management',
        description:
          'Centralized student profiles: personal details, class assignment, emergency contacts, and attendance history.',
        category: 'Socle Essentiel',
      },
      {
        title: 'Class Schedules & Examination Calendar',
        description:
          'Interactive timetable module per classroom and teacher, with schedule updates viewable by students and parents.',
        category: 'Socle Essentiel',
      },
      {
        title: 'Digital Gradebook & Automated PDF Report Cards',
        description:
          'Teacher grade entry with automated coefficient weighting, class average calculations, and one-click PDF generation.',
        category: 'Gestion & Opérations',
      },
      {
        title: 'Daily Attendance & Absence Tracking',
        description:
          'Quick roll call interface for teachers, with immediate absence logging and automated notification to parents.',
        category: 'Gestion & Opérations',
      },
      {
        title: 'Tuition Fee Management & Mobile Money Integration',
        description:
          'Track payment schedules, integrate Wave / Orange Money tuition payments, and issue tamper-proof digital receipts.',
        category: 'Option Avancée',
        isOption: true,
      },
      {
        title: 'Secure Parent & Learner Portal',
        description:
          'Individual parent login providing 24/7 visibility over child attendance, term grades, and account balances.',
        category: 'Option Avancée',
        isOption: true,
      },
    ],
    benefits: [
      {
        title: 'Fluid Back-to-School Operations',
        description:
          'Eliminate registration lines and administrative chaos. 80%+ of enrollments can be processed digitally prior to day one.',
        highlight: 'Zero Enrollment Queues',
      },
      {
        title: 'Accelerated Fee Collection',
        description:
          'Automated reminders and mobile money integrations significantly reduce tuition arrears and late payments.',
        highlight: '-40% Payment Delays',
      },
      {
        title: 'Enhanced Institutional Reputation',
        description:
          'Modern digital portals demonstrate academic rigor and professional leadership, attracting selective families.',
        highlight: 'Modern Brand Authority',
      },
    ],
    userFlow: {
      title: 'Tuition Payment & Attendance Workflow',
      subtitle:
        'A transparent 4-step workflow connecting administrative staff, teachers, and parents.',
      steps: [
        {
          stepNumber: '01',
          actor: 'Parent',
          action: 'Logs into parent space or clicks SMS tuition reminder link, selecting Wave / Orange Money payment.',
          outcome: 'Tuition fee is settled instantly with zero bank queues.',
        },
        {
          stepNumber: '02',
          actor: 'School Accountant',
          action: 'Dashboard reconciles transaction automatically, updating student balance in real time.',
          outcome: 'Digital receipt is generated and emailed to the parent immediately.',
        },
        {
          stepNumber: '03',
          actor: 'Classroom Teacher',
          action: 'Conducts morning roll call on tablet or smartphone in under 60 seconds.',
          outcome: 'Absences are recorded in the central academic database.',
        },
        {
          stepNumber: '04',
          actor: 'School Principal',
          action: 'Reviews daily school-wide attendance, fee recovery rates, and teacher submissions on one screen.',
          outcome: 'Data-driven administrative oversight without chasing paper files.',
        },
      ],
    },
    relatedProject: {
      id: 'yello-edtech',
      name: 'EdTech Learning Platform (Yello)',
      context:
        'Large-scale interactive learning platform featuring microlearning modules, automated quiz generation, and AI pedagogy assistant.',
      founderRole:
        'Senior Frontend Developer (Moussa Diagne): designed and engineered responsive interfaces, advanced state management with Zustand, and educational API integration.',
      metric: 'Over 200,000 active learners on platform',
      stack: ['React', 'Next.js', 'TypeScript', 'Zustand', 'TanStack Query', 'Tailwind CSS'],
    },
    faq: [
      {
        question: 'Can the platform handle different grading scales and coefficients?',
        answer:
          'Yes. We configure your exact national curriculum grading rules, coefficient weighting, and trimester/semester schedules.',
      },
      {
        question: 'Is student personal data protected?',
        answer:
          'Yes. We enforce strict data protection adhering to Senegalese Law 2008-12 and GDPR standards. Student records and grades are encrypted and strictly partitioned.',
      },
      {
        question: 'Can parents without computers access the platform?',
        answer:
          'Yes. The parent portal is 100% mobile-friendly and accessible from any smartphone browser without requiring app downloads.',
      },
    ],
    quoteSlug: 'education',
  },
  commerce: {
    slug: 'commerce',
    sectorName: 'Retail & Commerce',
    status: 'active',
    meta: {
      title: 'Centralized Retail Management & Inventory Dashboards | MusaTech Dakar',
      description:
        'Centralize retail operations: sales tracking, multi-location stock, customer invoicing, Wave/Orange Money payments, and live KPI dashboards.',
      keywords: [
        'retail management software dakar',
        'pos and inventory senegal',
        'commercial management platform',
        'invoicing software dakar',
        'multi-store stock tracking',
      ],
    },
    hero: {
      badge: 'B2B Industry Expertise — Retailers, Boutiques & Wholesalers',
      title: 'Centralize your sales and simplify store and inventory management.',
      description:
        'Unify in-store sales, online orders, inventory levels, and customer invoices into one clear, automated dashboard.',
      pitch:
        'Tailored to local merchant realities: fast mobile checkout, dual cash/mobile money accounting, and multi-store visibility.',
    },
    problems: [
      {
        title: 'Inventory discrepancies between stores and warehouse',
        problem:
          'Tracking stock in separate notebooks leads to frequent stock-outs on top sellers and unsold surplus on slow movers.',
        impact:
          'Direct revenue loss, lost customer trust, and tied-up working capital in dead stock.',
        solutionBenefit:
          'Real-time multi-location inventory syncing every sale automatically against warehouse counts.',
      },
      {
        title: 'Manual paper invoices and receipt discrepancies',
        problem:
          'Writing paper order slips by hand takes time and invites calculation errors, especially with VAT and promotional discounts.',
        impact:
          'Slow checkout lines, accounting reconciliation headaches, and uncollected customer receivables.',
        solutionBenefit:
          'One-click digital invoice and receipt generation with automated VAT calculation and PDF export.',
      },
      {
        title: 'Mixed payment methods (Cash, Wave, Orange Money, Cards)',
        problem:
          'Daily register closures taking hours to cross-reference cash drawer amounts with multiple mobile money phones.',
        impact:
          'Unexplained register shortages, accounting stress, and vulnerability to theft.',
        solutionBenefit:
          'Unified payment logging recording exact payment method per sale with automated daily cash register reconciliation.',
      },
      {
        title: 'Lack of live sales metrics and best-seller visibility',
        problem:
          'Business owners discover monthly turnover only weeks after month-end, making agile purchasing decisions impossible.',
        impact:
          'Slow reaction to demand trends and missed bulk supplier discounts.',
        solutionBenefit:
          'Live executive KPI dashboards displaying daily turnover, top-selling items, and profit margins.',
      },
    ],
    features: [
      {
        title: 'Fast Point-of-Sale & Sales Checkout Interface',
        description:
          'Streamlined register screen for cashiers to scan or search items, apply discounts, and complete sales in seconds.',
        category: 'Socle Essentiel',
      },
      {
        title: 'Real-Time Multi-Location Inventory Tracking',
        description:
          'Live stock levels across physical shops and central warehouses, with automated low-stock threshold alerts.',
        category: 'Socle Essentiel',
      },
      {
        title: 'Instant Invoicing & Digital Receipt Printing',
        description:
          'Branded PDF invoices, cash register receipts (thermal printer compatible), and delivery slips.',
        category: 'Socle Essentiel',
      },
      {
        title: 'Customer Database & Credit Account Management',
        description:
          'Client purchase history, loyalty discounts, outstanding credit balance tracking, and payment reminders.',
        category: 'Gestion & Opérations',
      },
      {
        title: 'Supplier Orders & Restocking Workflows',
        description:
          'Purchase orders generation, supplier invoice tracking, and automated inventory receiving check-ins.',
        category: 'Gestion & Opérations',
      },
      {
        title: 'E-Commerce Website & Omnichannel Sync',
        description:
          'Synchronize your physical store inventory with an online shop, preventing double-selling.',
        category: 'Option Avancée',
        isOption: true,
      },
      {
        title: 'Executive Financial Analytics & Margin Reports',
        description:
          'Real-time gross margin calculations, sales breakdown by category, and accountant-ready Excel/CSV exports.',
        category: 'Option Avancée',
        isOption: true,
      },
    ],
    benefits: [
      {
        title: 'Zero Stock Outages on Top Sellers',
        description:
          'Automated reorder alerts ensure you replenish popular inventory before shelves run empty.',
        highlight: '+25% Product Availability',
      },
      {
        title: 'Fast Register Closures in 5 Minutes',
        description:
          'Daily sales and payment totals match automatically. Cashiers close registers with zero accounting discrepancies.',
        highlight: 'Instant Daily Balancing',
      },
      {
        title: 'Full Multi-Store Control from Anywhere',
        description:
          'Monitor sales and inventory across all your store locations in real time from your smartphone or laptop.',
        highlight: 'Remote Management 24/7',
      },
    ],
    userFlow: {
      title: 'Customer Checkout & Stock Sync Flow',
      subtitle:
        'A friction-free workflow from product scan to live accounting reconciliation.',
      steps: [
        {
          stepNumber: '01',
          actor: 'Cashier / Sales Rep',
          action: 'Scans product barcode or searches name on tablet POS, selecting Wave / Cash payment.',
          outcome: 'Transaction completes in under 10 seconds; digital receipt is generated.',
        },
        {
          stepNumber: '02',
          actor: 'System Engine',
          action: 'Deducts sold quantity from local store stock and updates master database.',
          outcome: 'Inventory counts reflect exact reality across all channels.',
        },
        {
          stepNumber: '03',
          actor: 'Store Manager',
          action: 'Receives alert if product inventory drops below pre-set minimum threshold.',
          outcome: 'Restocking order is prepared before store runs out.',
        },
        {
          stepNumber: '04',
          actor: 'Business Owner',
          action: 'Reviews daily revenue breakdown, gross profit margins, and payment totals on mobile dashboard.',
          outcome: 'Complete financial clarity at all times.',
        },
      ],
    },
    faq: [
      {
        question: 'Can the software work with barcode scanners and receipt printers?',
        answer:
          'Yes. Our point-of-sale interface connects seamlessly with standard USB and Bluetooth barcode scanners and thermal receipt printers.',
      },
      {
        question: 'Can employees access financial margin figures?',
        answer:
          'No. We configure granular permissions so cashiers can only view sales screens, while sensitive cost prices and margin reports are restricted to owners and managers.',
      },
      {
        question: 'What happens if the internet connection drops temporarily?',
        answer:
          'The POS interface incorporates local offline caching, allowing sales to continue smoothly and synchronizing automatically once network connection is restored.',
      },
    ],
    quoteSlug: 'commerce',
  },
  logistique: {
    slug: 'logistique',
    sectorName: 'Logistics',
    status: 'active',
    meta: {
      title: 'Custom Freight, Fleet & Logistics Tracking Software | MusaTech Dakar',
      description:
        'Optimize your transport operations: shipment tracking, delivery dispatch, fleet coordination, customs documentation, and carrier portals.',
      keywords: [
        'logistics software senegal',
        'fleet management dakar',
        'freight tracking platform',
        'customs clearance software',
        'delivery dispatch system',
      ],
    },
    hero: {
      badge: 'B2B Industry Expertise — Freight Forwarders, Couriers & Transport Fleets',
      title: 'Optimize your shipments, fleet tracking, and transport documentation.',
      description:
        'Gain end-to-end visibility over dispatch operations, driver manifests, customs documentation, and live delivery status.',
      pitch:
        'Engineered for regional transit and urban courier realities: mobile driver manifests, client parcel tracking, and proof-of-delivery.',
    },
    problems: [
      {
        title: 'Clients constantly calling for shipment status updates',
        problem:
          'Customer service teams spend hours daily answering phone calls and WhatsApp messages asking "Where is my container / parcel?".',
        impact:
          'Heavy operational distraction, client anxiety, and slow response times during transit delays.',
        solutionBenefit:
          'A self-service tracking portal where clients enter their tracking or container number to view live transit stages.',
      },
      {
        title: 'Lost delivery slips and disputed proof of delivery',
        problem:
          'Paper delivery notes get stained, lost, or signed illegibly, leading to disputes over whether cargo was received.',
        impact:
          'Delayed freight invoicing, client payment withholding, and unrecoverable cargo claims.',
        solutionBenefit:
          'Digital proof of delivery (e-POD) with smartphone signature capture, photos of delivered goods, and instant timestamping.',
      },
      {
        title: 'Customs and shipping documentation bottlenecks',
        problem:
          'Coordinating bills of lading, customs declarations, and release orders across field agents creates transit delays.',
        impact:
          'Heavy port demurrage fees, missed delivery windows, and supplier penalties.',
        solutionBenefit:
          'Centralized freight documentation repository attaching all shipping manifests to the master shipment file.',
      },
      {
        title: 'Inefficient route dispatching and driver idle time',
        problem:
          'Dispatchers assigning daily pickup and delivery runs manually over phone calls results in crisscrossed routes and wasted fuel.',
        impact:
          'High vehicle operating costs, delayed deliveries, and limited daily run capacity.',
        solutionBenefit:
          'A visual dispatch board organizing runs by geographic zone and delivering manifests straight to driver phones.',
      },
    ],
    features: [
      {
        title: 'Public & Client Shipment Tracking Portal',
        description:
          'Clean tracking page where clients enter their airway bill (AWB) or container number to view milestones and expected arrival dates.',
        category: 'Socle Essentiel',
      },
      {
        title: 'Shipment & Freight File Management',
        description:
          'Complete cargo files recording shipper, consignee, package count, weight, volume, and associated customs documents.',
        category: 'Socle Essentiel',
      },
      {
        title: 'Digital Delivery Dispatch & Driver Run Sheets',
        description:
          'Assign daily deliveries to drivers and courier teams, viewable on their mobile phones in sequential order.',
        category: 'Socle Essentiel',
      },
      {
        title: 'Mobile Proof of Delivery (e-POD)',
        description:
          'Driver smartphone app capturing recipient digital signature, photo of delivered package, and GPS coordinates.',
        category: 'Gestion & Opérations',
      },
      {
        title: 'Freight Invoicing & Automated Billing',
        description:
          'Generate transport invoices and freight debit notes based on tariff matrices, weight/volume formulas, and handling fees.',
        category: 'Gestion & Opérations',
      },
      {
        title: 'Automated SMS / WhatsApp Status Milestones',
        description:
          'Automatically send notifications to recipient when parcel arrives at hub, out for delivery, and completed.',
        category: 'Option Avancée',
        isOption: true,
      },
      {
        title: 'Live Vehicle Fleet & Driver GPS Integration',
        description:
          'Integrate telematics GPS tracking to view real-time fleet locations on an interactive operational map.',
        category: 'Option Avancée',
        isOption: true,
      },
    ],
    benefits: [
      {
        title: '-70% Status Inquiry Phone Calls',
        description:
          'Self-service tracking and automated milestone notifications free up customer service to focus on closing new shipments.',
        highlight: 'Dramatic Support Relief',
      },
      {
        title: 'Zero Delivery Disputes with e-POD',
        description:
          'Digital signatures, cargo photos, and timestamps provide undeniable proof of delivery, speeding up freight billing.',
        highlight: 'Immediate Dispute Elimination',
      },
      {
        title: 'Accelerated Cargo Transit Speed',
        description:
          'Centralized document files and mobile dispatch eliminate administrative waiting times at logistics terminals.',
        highlight: 'Faster Turnaround Times',
      },
    ],
    userFlow: {
      title: 'End-to-End Shipment Transit & Delivery Journey',
      subtitle:
        'A reliable 4-step workflow from cargo intake to validated proof of delivery.',
      steps: [
        {
          stepNumber: '01',
          actor: 'Logistics Operations Agent',
          action: 'Creates shipment file in portal, generating a unique tracking number and barcode label.',
          outcome: 'Shipper and recipient receive booking confirmation with live tracking link.',
        },
        {
          stepNumber: '02',
          actor: 'Dispatcher',
          action: 'Groups packages by geographic sector and assigns run manifest to delivery driver phone.',
          outcome: 'Driver reviews delivery route and optimal stop sequence.',
        },
        {
          stepNumber: '03',
          actor: 'Driver / Courier',
          action: 'Delivers cargo to recipient, captures electronic signature and photo on smartphone.',
          outcome: 'Proof of delivery (e-POD) syncs immediately to the central operations platform.',
        },
        {
          stepNumber: '04',
          actor: 'Billing Department',
          action: 'Reviews signed delivery slip and generates final commercial invoice automatically.',
          outcome: 'Invoicing cycle compressed from weeks to hours.',
        },
      ],
    },
    faq: [
      {
        question: 'Do delivery drivers need to install heavy native applications?',
        answer:
          'No. We build lightweight Progressive Web Apps (PWA) that run smoothly in any mobile browser on entry-level Android devices without consuming storage.',
      },
      {
        question: 'Can the system scan barcodes and QR codes?',
        answer:
          'Yes. Drivers can use their smartphone camera as a high-speed barcode and QR code scanner to validate package pickups and drops.',
      },
      {
        question: 'How do end-customers track their parcels?',
        answer:
          'Through a unique link sent via SMS or WhatsApp leading to a responsive tracking page displaying current milestone progress.',
      },
      {
        question: 'Can subcontractor transport fleets access the system?',
        answer:
          'Yes. Partner fleets can be assigned restricted logins showing only their specific dispatch runs and delivery quotas.',
      },
    ],
    quoteSlug: 'logistique',
  },
};

export function getSolutionBySlug(slug: string, locale: string = 'fr'): SectorSolutionDetail | undefined {
  const isEn = locale === 'en';
  const data = isEn ? SOLUTIONS_DATA_EN : SOLUTIONS_DATA_FR;
  
  // Normalisation des slugs bilingues
  const normalized =
    slug === 'real-estate'
      ? 'immobilier'
      : slug === 'retail'
        ? 'commerce'
        : slug === 'logistics'
          ? 'logistique'
          : slug;

  return data[normalized] || data[slug];
}

export function getAllSolutions(locale: string = 'fr'): SectorSolutionDetail[] {
  const isEn = locale === 'en';
  return Object.values(isEn ? SOLUTIONS_DATA_EN : SOLUTIONS_DATA_FR);
}


