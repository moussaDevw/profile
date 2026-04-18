export const PROJECTS = [
  {
    year: "2025—26",
    type: "EdTech · En cours",
    name: "Yello",
    client: "Plateforme d'apprentissage interactif",
    body: "Transformation de contenu brut en parcours d'apprentissage interactif et mesurable. Lecteur de contenu avec découpage en blocs, quiz intégrés à validation immédiate, tableau de bord apprenant/formateur, et lecteur multimédia natif HTML5 pour une solution légère et performante.",
    tags: ["React", "Zustand", "TanStack Query", "Tailwind", "shadcn/ui"]
  },
  {
    year: "2025—26",
    type: "Marketplace · Mentoring · Freelance",
    name: "Sapiow",
    client: "Chercheurs de savoir × experts",
    body: "Marketplace où chercheurs de savoir et experts se connectent pour des sessions de mentoring payantes. Recherche avancée avec filtres dynamiques, tunnel de réservation et paiement fluide, messagerie sécurisée GetStream.io pour les échanges pré/post-session et le partage de documents.",
    tags: ["Next.js", "TypeScript", "GetStream.io", "Stripe", "Zustand"]
  },
  {
    year: "2025",
    type: "HealthTech · Afrique × Europe · Freelance",
    name: "eDaktarii",
    client: "Téléconsultation médicale",
    body: "Plateforme de téléconsultation démocratisant l'accès aux soins spécialisés pour les patients en Afrique, en les connectant à un réseau de médecins basés en Europe. Visioconférence robuste à faible latence, messagerie sécurisée patient/médecin, optimisation Core Web Vitals et accessibilité WCAG.",
    tags: ["Next.js 14", "TypeScript", "GetStream.io", "Zustand", "Tailwind"]
  },
  {
    year: "2025—26",
    type: "Marketplace · Services locaux · Freelance",
    name: "Soveur",
    client: "Services à distance ou en présentiel",
    body: "Marketplace B2C pour trouver et réserver des services locaux (jardinage, électricité, cours). Système de réservation dual : à distance via Google Meet auto-généré, ou en présentiel avec gestion logistique. Recherche géolocalisée, calendrier de disponibilités, tunnel de paiement.",
    tags: ["Next.js", "TypeScript", "API Google Meet", "Stripe", "Zustand"]
  },
  {
    year: "2024",
    type: "Data · Recherche scientifique",
    name: "BeTech",
    client: "Plateforme d'exploration de données",
    body: "Interface permettant aux chercheurs d'explorer, filtrer et consulter une volumineuse base de données scientifiques. Moteur de recherche avec autocomplétion, filtres complexes combinables, visualisations interactives. Cache agressif et pagination virtuelle pour maintenir la réactivité sur de gros volumes.",
    tags: ["React", "TanStack Query", "GraphQL", "Apollo"]
  },
  {
    year: "2022—24",
    type: "Dashboard · Centre d'appels",
    name: "Casacloud",
    client: "Supervision temps réel",
    body: "Dashboard administratif centralisant les données clients et opérationnelles d'un centre d'appels. Tableaux de bord personnalisables, visualisations avec Chart.js/Recharts, centralisation temps réel des appels actifs, files d'attente, performances agents et KPIs.",
    tags: ["React", "Redux", "SCSS/BEM", "Chart.js", "REST API"]
  },
  {
    year: "2022—23",
    type: "Marketplace · P2P",
    name: "Medteck",
    client: "Troc, achat & négociation",
    body: "Marketplace P2P combinant trois modes transactionnels : échange d'articles (troc), achat classique, et achat avec négociation de prix en temps réel. Store Redux orchestrant catalogue, panier, sessions de négociation, messages et notifications. Interface CSS pur sans librairie de composants.",
    tags: ["Next.js", "Redux", "CSS/BEM", "SSR"]
  }
];

export const EXPERTISE = [
  {
    id: "A / 01",
    title: "Framework & Langage",
    skills: [
      { name: "React.js", level: "Expert" },
      { name: "Next.js (App Router)", level: "Expert" },
      { name: "TypeScript", level: "Expert" },
      { name: "Angular", level: "Solide" },
      { name: "NestJS", level: "Solide" },
      { name: "Node.js / Express", level: "Solide" }
    ]
  },
  {
    id: "B / 02",
    title: "État & Données",
    skills: [
      { name: "Zustand", level: "Expert" },
      { name: "Redux / Redux Toolkit", level: "Expert" },
      { name: "TanStack Query", level: "Expert" },
      { name: "GraphQL / Apollo", level: "Solide" },
      { name: "REST API", level: "Expert" },
      { name: "MongoDB", level: "Solide" }
    ]
  },
  {
    id: "C / 03",
    title: "UI, Temps réel & Intégrations",
    skills: [
      { name: "Tailwind CSS", level: "Expert" },
      { name: "shadcn/ui", level: "Expert" },
      { name: "GetStream.io (Chat/Video)", level: "Expert" },
      { name: "Stripe", level: "Solide" },
      { name: "Google Maps / Meet API", level: "Solide" },
      { name: "Core Web Vitals / WCAG", level: "Solide" }
    ]
  }
];

export const TIMELINE = [
  { year: "2024 — 2026", company: "Yello", role: "Développeur front-end", stack: "React · Zustand · TanStack" },
  { year: "2025 — 2026", company: "Sapiow", role: "Développeur front-end · Freelance", stack: "Next.js · GetStream · Stripe" },
  { year: "2025 — 2026", company: "Soveur", role: "Développeur front-end · Freelance", stack: "Next.js · Google Meet · Zustand" },
  { year: "2025", company: "eDaktarii", role: "Développeur front-end · Freelance", stack: "Next.js 14 · GetStream · WCAG" },
  { year: "2024", company: "BeTech", role: "Développeur front-end", stack: "React · GraphQL · Apollo" },
  { year: "2022 — 2024", company: "Casacloud", role: "Développeur web", stack: "React · Redux · Chart.js" },
  { year: "2023", company: "3W", role: "Développeur fullstack — secteur bancaire", stack: "Sécurité · WCAG · Refactoring" },
  { year: "2022 — 2023", company: "Medteck Consulting", role: "Développeur front-end", stack: "Next.js · Redux · CSS/BEM" },
  { year: "2021", company: "Senagriculture", role: "Développeur web/mobile", stack: "Fullstack · UI/UX · DevOps" },
  { year: "2020", company: "Société Africaine de Facilitation", role: "Développeur web — app covoiturage", stack: "MERN · Google Maps · Stripe" },
  { year: "2019", company: "Volkeno", role: "Développeur web (stage)", stack: "HTML/CSS · WordPress · Python" }
];
