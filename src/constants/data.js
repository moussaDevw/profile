export const PROJECTS = [
  {
    year: "2025",
    type: "InsurTech · Backend NestJS & Mobile",
    name: "Assure Express",
    client: "Application mobile d'assurance automobile",
    body: "Application mobile iOS & Android dédiée à la souscription et à la gestion d'assurances pour véhicules (voitures, motos, utilitaires). Backend complet développé avec NestJS, modélisation PostgreSQL, documentation Swagger/OpenAPI, tests automatisés avec Jest et cache Redis.",
    tags: ["Fullstack", "NestJS", "Node.js", "React Native", "PostgreSQL", "Swagger/OpenAPI", "Jest", "Redis"],
    github: "https://github.com/moussaDevw/assure-express"
  },
  {
    year: "2024 — Avr. 2026",
    type: "EdTech",
    name: "Yello",
    client: "Plateforme d'apprentissage interactif",
    body: "Plateforme EdTech basée sur l'intelligence artificielle utilisée par plus de 200 000 apprenants. Architecture d'interfaces pour des parcours interactifs (microlearning, validation progressive), génération automatique de quiz, flashcards, synthèses et chatbot pédagogique.",
    tags: ["React", "Next.js", "Zustand", "TanStack Query", "Tailwind", "IA"]
  },
  {
    year: "2024—26",
    type: "CRM · Logistique · Consultant",
    name: "Istamco",
    client: "CRM métier dédié au transport international",
    body: "Développement d’un CRM métier dédié au transport international et freight forwarding. Conception d'architecture gérant des processus métier et données opérationnelles complexes, reporting analytique, exports PDF/Excel automatisés et gestion des expéditions.",
    tags: ["Fullstack", "NestJS", "PostgreSQL", "React", "Next.js", "TypeScript", "Chart.js", "ECharts", "Reporting"]
  },
  {
    year: "2025—26",
    type: "Marketplace · Services · Consultant",
    name: "Sapiow",
    client: "Mise en relation clients × prestataires",
    body: "Marketplace de mise en relation entre clients et professionnels de services avec calendrier et disponibilités en temps réel, système de géolocalisation des prestataires, gestion des transactions et paiement sécurisé Stripe.",
    tags: ["Fullstack", "NestJS", "PostgreSQL", "Next.js", "TypeScript", "GetStream.io", "Stripe", "Zustand", "Maps"]
  },
  {
    year: "2025",
    type: "HealthTech · Afrique × Europe · Consultant",
    name: "eDaktarii",
    client: "Téléconsultation médicale",
    body: "Plateforme de téléconsultation connectant patients et médecins entre l'Afrique et l'Europe. Prise de rendez-vous en temps réel, téléconsultation vidéo à faible latence, messagerie chiffrée, paiement sécurisé et conformité WCAG.",
    tags: ["Fullstack", "NestJS", "PostgreSQL", "Next.js 14", "TypeScript", "GetStream.io", "Zustand", "Stripe", "WCAG"]
  },
  {
    year: "2022—24",
    type: "Dashboard · Centre d'appels",
    name: "Casacloud",
    client: "Supervision opérationnelle temps réel",
    body: "Dashboard administratif centralisant les données opérationnelles d’un centre d’appels : suivi en temps réel des appels actifs, files d’attente, performances des agents, tableaux configurables et graphiques avec Chart.js / Recharts.",
    tags: ["React", "Redux", "SCSS", "Chart.js", "REST API"]
  },
  {
    year: "2022—23",
    type: "Marketplace · P2P",
    name: "Medteck Consulting",
    client: "Troc, achat & négociation",
    body: "Marketplace P2P combinant trois modes transactionnels : échange d'articles (troc), achat classique et négociation de prix en direct avec chat intégré. Store Redux centralisé, SSR/SSG pour le référencement naturel et optimisation des performances.",
    tags: ["Next.js", "Redux", "CSS/BEM", "SSR", "WebSocket"]
  }
];

export const EXPERTISE = [
  {
    id: "A / 01",
    title: "Back-End & Architecture NestJS",
    skills: [
      { name: "NestJS (Architecture Modulaire)", level: "Expert", highlight: true },
      { name: "Node.js & Express", level: "Expert" },
      { name: "APIs REST, GraphQL & Swagger/OpenAPI", level: "Expert" },
      { name: "PostgreSQL & MongoDB", level: "Solide" },
      { name: "Redis (Cache & Données temporaires)", level: "Solide" },
      { name: "Auth (JWT / OAuth) & Sécurité", level: "Solide" }
    ]
  },
  {
    id: "B / 02",
    title: "Front-End & Mobile",
    skills: [
      { name: "React 19 / Next.js 15 (App Router)", level: "Expert" },
      { name: "TypeScript / JavaScript", level: "Expert" },
      { name: "React Native (iOS & Android)", level: "Solide" },
      { name: "Zustand & TanStack Query", level: "Expert" },
      { name: "Tailwind CSS & shadcn/ui", level: "Expert" }
    ]
  },
  {
    id: "C / 03",
    title: "DevOps, Tests & Cloud",
    skills: [
      { name: "Jest (Tests unitaires & intégration)", level: "Expert" },
      { name: "Docker & Pratiques CI/CD", level: "Solide" },
      { name: "AWS (EC2, S3, IAM, CodePipeline)", level: "Solide" },
      { name: "Stripe & GetStream.io", level: "Expert" },
      { name: "WebSockets & Microservices", level: "Solide" }
    ]
  }
];

export const TIMELINE = [
  { year: "Nov. 2024 — Avr. 2026", company: "Yello", role: "Senior Frontend Developer — EdTech", stack: "React · Next.js · Zustand · IA · TanStack" },
  { year: "Août 2025 — Jan. 2026", company: "Sapiow", role: "Consultant Développeur Full Stack", stack: "Next.js · Stripe · Géolocalisation · Calendrier" },
  { year: "Nov. 2024 — Jan. 2026", company: "Istamco", role: "Consultant Développeur Full Stack", stack: "React · Next.js · TypeScript · Reporting Métier" },
  { year: "Avr. 2025 — Août 2025", company: "eDaktarii", role: "Consultant Software Engineer — HealthTech", stack: "Next.js 14 · WebRTC / GetStream · Stripe · WCAG" },
  { year: "Nov. 2022 — Mars 2024", company: "Casacloud", role: "Freelance Développeur Front-end", stack: "React · Redux · Chart.js · REST API · SCSS" },
  { year: "Fév. 2022 — Jan. 2023", company: "Medteck Consulting", role: "Développeur Front-end — Marketplace P2P", stack: "Next.js · Redux · CSS/BEM · SSR" },
  { year: "2021", company: "Senagriculture", role: "Développeur web/mobile", stack: "Fullstack · UI/UX · DevOps" },
  { year: "2020", company: "Société Africaine de Facilitation", role: "Développeur web — app covoiturage", stack: "MERN · Google Maps · Stripe" },
  { year: "2019", company: "Volkeno", role: "Développeur web (stage)", stack: "HTML/CSS · WordPress · Python" }
];
