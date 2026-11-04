# PLAN D'IMPLÉMENTATION PAR TÂCHES GIT — MUSATECH

> **Projet** : MusaTech ([https://www.musatech.tech/](https://www.musatech.tech/))  
> **Documents associés** : `docs/MUSATECH_MASTER_SPEC.md`, `docs/AUDIT.md`, `docs/REQUIREMENTS.md`, `docs/ARCHITECTURE.md`  
> **Règle fondamentale** : Chaque tâche correspond à une branche Git dédiée, testable et isolée. Aucune tâche ne commence sans validation préalable.

---

## 1. Vue d'ensemble des priorités

- **Priorité 0 (P0) — Cœur de la refonte commerciale B2B** :
  - Socle technique & Design System (Tailwind, TypeScript, polices Manrope & Inter).
  - Homepage commerciale B2B (Hero, Problèmes résolus, Méthode, Fondateur, FAQ, CTA).
  - Pages Services et tarification indicative.
  - Pages Réalisations (mise en valeur des projets réels).
  - Page Contact & Tunnel de demande de devis qualifié.
- **Priorité 1 (P1) — Expansion sectorielle & Internationalisation** :
  - Pages Solutions par secteur (Immobilier, Éducation, Commerce, Logistique).
  - Déploiement complet de la version anglaise (`/en/...`).
  - Optimisations SEO avancées (Schema.org JSON-LD, Sitemap dynamique, Open Graph).
- **Priorité 2 (P2) — Évolutions ultérieures (Hors périmètre initial)** :
  - Module de Blog d'ingénierie logicielle.
  - Espace client / suivi de projet.
  - Connecteurs CRM avancés (HubSpot, Notion API).

---

## 2. Découpage détaillé des tâches (Priorité P0)

---

### Tâche P0-01 : Initialisation du socle Next.js, TypeScript & Tailwind CSS
- **Objectif** : Configurer le framework Next.js 15 avec App Router, le typage strict TypeScript et le moteur Tailwind CSS calé sur la charte exacte MusaTech.
- **Branche Git suggérée** : `feat/setup-next-tailwind`
- **Fichiers concernés** :
  - `package.json`
  - `tsconfig.json`
  - `next.config.ts`
  - `tailwind.config.ts`
  - `src/app/globals.css`
  - `src/lib/utils.ts`
- **Dépendances à installer** : `next`, `typescript`, `@types/react`, `@types/node`, `tailwindcss`, `postcss`, `autoprefixer`, `clsx`, `tailwind-merge`.
- **Critères d'acceptation** :
  - `npm run dev` démarre sans avertissement.
  - `npm run build` et `npx tsc --noEmit` s'exécutent avec zéro erreur.
  - Les couleurs de la charte MusaTech (Navy `#0B1730`, Slate `#172A46`, Cyan `#19B8CD`, Surface `#F4F7FB`, Border `#DAE3ED`) sont définies dans Tailwind.
  - Les polices Google **Manrope** et **Inter** sont injectées via `next/font/google`.
- **Tests nécessaires** :
  - Test de compilation statique (`next build`).
  - Test unitaire vérifiant l'utilitaire de classes `cn()`.

---

### Tâche P0-02 : Composants d'interface atomiques & Layout transversal (Header / Footer)
- **Objectif** : Créer les composants réutilisables de base (Button, Card, Badge, Input) et intégrer le Header et Footer institutionnels.
- **Branche Git suggérée** : `feat/ui-components-layout`
- **Fichiers concernés** :
  - `src/components/ui/button.tsx`
  - `src/components/ui/card.tsx`
  - `src/components/ui/badge.tsx`
  - `src/components/layout/header.tsx`
  - `src/components/layout/footer.tsx`
  - `src/components/layout/mobile-nav.tsx`
  - `src/app/[locale]/layout.tsx`
- **Dépendances éventuelles** : `lucide-react` (déjà présent).
- **Critères d'acceptation** :
  - Le Header est responsive avec menu mobile hamburger accessible au clavier.
  - Le logo MusaTech respecte la charte (typographie Manrope).
  - Le Footer affiche les mentions obligatoires, les coordonnées et la signature locale "Dakar 🇸🇳".
  - Les boutons ont des états de focus visibles (`:focus-visible` avec halo Cyan).
- **Tests nécessaires** :
  - Test de rendu Testing Library pour `Button` (variantes primary, secondary, outline).
  - Test de bascule du menu mobile (ouverture/fermeture et verrouillage du focus).

---

### Tâche P0-03 : Structuration des données métier (Projets & Services)
- **Objectif** : Migrer et typer rigoureusement les données existantes de `src/constants/data.js` vers des modules TypeScript fortement typés.
- **Branche Git suggérée** : `feat/content-models-data`
- **Fichiers concernés** :
  - `src/types/content.ts`
  - `src/content/projects.ts`
  - `src/content/services.ts`
  - `src/content/faq.ts`
- **Dépendances éventuelles** : Aucune.
- **Critères d'acceptation** :
  - Toutes les données réelles (Assure Express, Yello, Istamco, Sapiow, eDaktarii) sont conservées et enrichies des sections : contexte, défi, solution, rôle de Moussa Diagne, métriques.
  - Les 4 services majeurs sont configurés avec leurs tarifs d'appel indicatifs configurables (250 000, 600 000, 1 500 000, 2 000 000 FCFA).
  - Zéro type `any`.
- **Tests nécessaires** :
  - Test de conformité TypeScript des tableaux de données via script de validation.

---

### Tâche P0-04 : Développement de la Homepage commerciale B2B
- **Objectif** : Assembler la page d'accueil complète orientée conversion selon la structure ordonnée de la spécification.
- **Branche Git suggérée** : `feat/homepage-commercial`
- **Fichiers concernés** :
  - `src/app/[locale]/page.tsx`
  - `src/components/sections/hero-commercial.tsx`
  - `src/components/sections/problems-solved.tsx`
  - `src/components/sections/services-grid.tsx`
  - `src/components/sections/featured-projects.tsx`
  - `src/components/sections/work-method.tsx`
  - `src/components/sections/founder-section.tsx`
  - `src/components/sections/faq-section.tsx`
  - `src/components/sections/final-cta.tsx`
- **Dépendances éventuelles** : Aucune dépendance externe lourde (transitions CSS légères).
- **Critères d'acceptation** :
  - Les 10 sections obligatoires sont présentes dans l'ordre défini.
  - Le Hero commercial présente la promesse forte : *"Des solutions digitales qui font avancer votre entreprise."*
  - La méthode de travail est détaillée en 4 étapes claires.
  - Les boutons CTA pointent vers `/devis` ou `/contact`.
  - Responsive fluide sur mobile, tablette et desktop.
- **Tests nécessaires** :
  - Smoke test du rendu de la Homepage.
  - Test d'accessibilité des accordéons FAQ au clavier (espace/entrée).

---

### Tâche P0-05 : Pages Services dédiées & Tarification indicative
- **Objectif** : Développer la vue d'ensemble des offres et les 4 pages de détail des services avec contenu exhaustif et livrables.
- **Branche Git suggérée** : `feat/services-pages`
- **Fichiers concernés** :
  - `src/app/[locale]/services/page.tsx`
  - `src/app/[locale]/services/[slug]/page.tsx`
  - `src/components/sections/service-detail-view.tsx`
- **Dépendances éventuelles** : Aucune.
- **Critères d'acceptation** :
  - Routes dynamiques générées statiquement (`generateStaticParams`).
  - Chaque page service détaille : livrables, délai estimé, pour qui c'est idéal, cas client associé.
  - Présence d'un CTA contextuel d'estimation.
- **Tests nécessaires** :
  - Test unitaire vérifiant la génération des 4 routes de service (`sites-web`, `e-commerce`, `logiciels-metier`, `applications-mobiles`).

---

### Tâche P0-06 : Galerie et fiches détaillées des Réalisations
- **Objectif** : Remplacer l'ancien accordéon par une galerie moderne de réalisations avec fiches détaillées par projet (`/realisations/[slug]`).
- **Branche Git suggérée** : `feat/case-studies-pages`
- **Fichiers concernés** :
  - `src/app/[locale]/realisations/page.tsx`
  - `src/app/[locale]/realisations/[slug]/page.tsx`
  - `src/components/sections/project-card.tsx`
  - `src/components/sections/project-filter-tabs.tsx`
- **Dépendances éventuelles** : Aucune.
- **Critères d'acceptation** :
  - Filtre par catégorie opérationnel (Mobile, EdTech, Logistique, etc.).
  - Chaque fiche détaille l'impact réel, le rôle exact de Moussa Diagne et les technologies.
  - Liens vers GitHub ou sites opérationnels visibles lorsqu'ils existent.
- **Tests nécessaires** :
  - Test de rendu des fiches projets statiques.
  - Test du composant de filtrage des projets.

---

### Tâche P0-07 : Formulaire de demande de devis qualifié & Traitement API
- **Objectif** : Créer le formulaire de demande de devis en 3 étapes avec validation Zod et endpoint de réception sécurisé.
- **Branche Git suggérée** : `feat/quote-form-api`
- **Fichiers concernés** :
  - `src/schemas/quote-schema.ts`
  - `src/components/forms/quote-form.tsx`
  - `src/app/[locale]/devis/page.tsx`
  - `src/app/api/devis/route.ts`
  - `src/lib/email.ts`
- **Dépendances à installer** : `react-hook-form`, `zod`, `@hookform/resolvers`.
- **Critères d'acceptation** :
  - Validation client et serveur identique via le schéma Zod partagé.
  - Champs obligatoires : service, budget indicatif, email, téléphone/WhatsApp, description du besoin.
  - Protection contre les robots via champ honeypot invisible.
  - Affichage d'un état de chargement puis de confirmation après soumission réussie.
- **Tests nécessaires** :
  - Tests unitaires du schéma Zod (rejets des emails invalides, acceptation des bons formats).
  - Test d'intégration de l'API Route `/api/devis` avec mock d'envoi email.

---

### Tâche P0-08 : Pages À propos, Contact direct & Mentions légales
- **Objectif** : Développer les pages institutionnelles de réassurance et de contact direct.
- **Branche Git suggérée** : `feat/static-pages-contact`
- **Fichiers concernés** :
  - `src/app/[locale]/a-propos/page.tsx`
  - `src/app/[locale]/contact/page.tsx`
  - `src/app/[locale]/mentions-legales/page.tsx`
  - `src/app/[locale]/politique-confidentialite/page.tsx`
- **Critères d'acceptation** :
  - Page À propos valorisant le parcours et l'exigence technique de Moussa Diagne.
  - Page Contact avec lien direct WhatsApp, téléphone, email et coordonnées Dakar.
  - Pages légales conformes aux exigences de transparence.
- **Tests nécessaires** :
  - Smoke tests sur le rendu des 4 pages statiques.

---

## 3. Découpage des tâches Priorité 1 (P1)

---

### Tâche P1-01 : Pages Solutions par secteur d'activité
- **Objectif** : Développer les 4 pages dédiées aux secteurs clés (Immobilier, Éducation, Commerce, Logistique).
- **Branche Git suggérée** : `feat/industry-solutions`
- **Fichiers concernés** :
  - `src/content/solutions.ts`
  - `src/app/[locale]/solutions/page.tsx`
  - `src/app/[locale]/solutions/[slug]/page.tsx`
- **Critères d'acceptation** :
  - Analyse des problématiques spécifiques à chaque secteur.
  - Recommandation d'architectures sur-mesure pour chaque cas.

---

### Tâche P1-02 : Déploiement complet de la version anglaise (i18n)
- **Objectif** : Finaliser le routage bilingue complet avec détection automatique de langue et dictionnaires exhaustifs.
- **Branche Git suggérée** : `feat/internationalization-en`
- **Fichiers concernés** :
  - `messages/fr.json`
  - `messages/en.json`
  - `src/middleware.ts`
  - `src/components/layout/language-switcher.tsx`
- **Critères d'acceptation** :
  - Bascule fluide entre `/fr/...` et `/en/...`.
  - Zéro chaîne de caractères non traduite dans la version anglaise.
  - Balises `hreflang` présentes dans le `<head>` de chaque page.

---

### Tâche P1-03 : SEO technique avancé, Open Graph & Performance
- **Objectif** : Configurer la génération de `sitemap.xml`, `robots.txt`, les images de prévisualisation Open Graph dynamiques et les balises Schema.org JSON-LD.
- **Branche Git suggérée** : `feat/advanced-seo-meta`
- **Fichiers concernés** :
  - `src/app/sitemap.ts`
  - `src/app/robots.ts`
  - `src/lib/seo.ts`
  - `src/app/[locale]/layout.tsx`
- **Critères d'acceptation** :
  - Balises JSON-LD `ProfessionalService` et `BreadcrumbList` valides sur le validateur Schema.org de Google.
  - Score Lighthouse SEO = 100, Accessibilité = 100, Performance ≥ 90.

---

## 4. Priorité 2 (P2) — Évolutions ultérieures documentées

- **P2-01 : Blog technique & vulgarisation B2B** (articles d'architecture logicielle, cas d'usage réels).
- **P2-02 : Espace client & suivi de projet en temps réel**.
- **P2-03 : Connexion automatique du formulaire de devis à un CRM (HubSpot / Notion)**.

---

## 5. Décisions nécessitant la validation formelle de l'utilisateur

Avant de créer la première branche Git (`feat/setup-next-tailwind`) :

1. **Validation de la stratégie de migration de framework** :
   - Confirmez-vous la transition de la SPA Vite existante vers une application **Next.js 15 (App Router)** pour satisfaire aux exigences SEO et B2B ?
2. **Validation des tarifs d'appel configurables** :
   - Validez-vous les montants de départ indiqués dans la spécification :
     - Sites web : à partir de **250 000 FCFA**
     - Sites e-commerce : à partir de **600 000 FCFA**
     - Logiciels métier : à partir de **1 500 000 FCFA**
     - Applications mobiles : à partir de **2 000 000 FCFA**
3. **Fournisseur de messagerie pour les notifications de devis** :
   - Avez-vous une préférence entre **Resend** (recommandé pour Next.js), **Brevo** ou **SendGrid** ?
4. **Coordonnées publiques** :
   - Validez-vous l'affichage du numéro WhatsApp professionnel : `+221 78 010 54 26` ?

