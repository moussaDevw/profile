/**
 * Gestion centralisée du routage internationalisé (i18n) MusaTech
 * Correspondance bidirectionnelle des routes FR et EN avec préservation SEO
 */

export type Locale = 'fr' | 'en';

export interface RouteResolution {
  locale: Locale;
  routeId: string;
  slug?: string;
  canonicalPath: string;
  frPath: string;
  enPath: string;
}

// Slugs de services équivalents
export const SERVICE_SLUG_MAP: Record<string, { fr: string; en: string }> = {
  'sites-web': { fr: 'sites-web', en: 'websites' },
  'websites': { fr: 'sites-web', en: 'websites' },
  'e-commerce': { fr: 'e-commerce', en: 'e-commerce' },
  'logiciels-metier': { fr: 'logiciels-metier', en: 'business-software' },
  'business-software': { fr: 'logiciels-metier', en: 'business-software' },
  'applications-mobiles': { fr: 'applications-mobiles', en: 'mobile-apps' },
  'mobile-apps': { fr: 'applications-mobiles', en: 'mobile-apps' },
};

// Slugs de solutions sectorielles équivalents
export const SOLUTION_SLUG_MAP: Record<string, { fr: string; en: string }> = {
  'immobilier': { fr: 'immobilier', en: 'real-estate' },
  'real-estate': { fr: 'immobilier', en: 'real-estate' },
  'education': { fr: 'education', en: 'education' },
  'commerce': { fr: 'commerce', en: 'retail' },
  'retail': { fr: 'commerce', en: 'retail' },
  'logistique': { fr: 'logistique', en: 'logistics' },
  'logistics': { fr: 'logistique', en: 'logistics' },
};

// Slugs d'études de cas / réalisations (identiques pour garantir la traçabilité des projets réels)
export const PROJECT_SLUG_MAP: Record<string, { fr: string; en: string }> = {
  'assure-express': { fr: 'assure-express', en: 'assure-express' },
  'edaktari': { fr: 'edaktari', en: 'edaktari' },
  'yello-edtech': { fr: 'yello-edtech', en: 'yello-edtech' },
  'istamco': { fr: 'istamco', en: 'istamco' },
};

// Normalisation des slugs internes vers la clé canonique
export function normalizeServiceSlug(rawSlug: string): string {
  const mapping = SERVICE_SLUG_MAP[rawSlug];
  return mapping ? mapping.fr : rawSlug;
}

export function normalizeSolutionSlug(rawSlug: string): string {
  const mapping = SOLUTION_SLUG_MAP[rawSlug];
  return mapping ? mapping.fr : rawSlug;
}

export function normalizeProjectSlug(rawSlug: string): string {
  const mapping = PROJECT_SLUG_MAP[rawSlug];
  return mapping ? mapping.fr : rawSlug;
}

/**
 * Analyse une URL et résout sa langue, son identifiant de route, et les URL équivalentes
 */
export function resolveRoute(rawPath: string): RouteResolution {
  // Nettoyage de l'URL
  let cleanPath = (rawPath || '/').split('?')[0].split('#')[0];
  if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1);
  }

  // 1. Gestion des redirections historiques (Préservation du référencement naturel)
  if (cleanPath === '/work') {
    return {
      locale: 'fr',
      routeId: 'projects',
      canonicalPath: '/fr/realisations',
      frPath: '/fr/realisations',
      enPath: '/en/case-studies',
    };
  }
  if (cleanPath === '/expertise') {
    return {
      locale: 'fr',
      routeId: 'services',
      canonicalPath: '/fr/services',
      frPath: '/fr/services',
      enPath: '/en/services',
    };
  }

  // 2. Détection de la locale
  const isEn = cleanPath.startsWith('/en');
  const locale: Locale = isEn ? 'en' : 'fr';

  // Retirer le préfixe de langue pour l'analyse
  let subPath = cleanPath;
  if (cleanPath.startsWith('/en')) {
    subPath = cleanPath.slice(3) || '/';
  } else if (cleanPath.startsWith('/fr')) {
    subPath = cleanPath.slice(3) || '/';
  }

  // Normaliser subPath pour commencer par /
  if (!subPath.startsWith('/')) {
    subPath = '/' + subPath;
  }

  // 3. Correspondance des routes
  // Homepage
  if (subPath === '/' || subPath === '') {
    return {
      locale,
      routeId: 'home',
      canonicalPath: locale === 'en' ? '/en' : '/fr',
      frPath: '/fr',
      enPath: '/en',
    };
  }

  // Services Hub
  if (subPath === '/services') {
    return {
      locale,
      routeId: 'services',
      canonicalPath: locale === 'en' ? '/en/services' : '/fr/services',
      frPath: '/fr/services',
      enPath: '/en/services',
    };
  }

  // Service Detail
  if (subPath.startsWith('/services/')) {
    const rawSlug = subPath.replace('/services/', '');
    const canonicalKey = normalizeServiceSlug(rawSlug);
    const slugMap = SERVICE_SLUG_MAP[canonicalKey] || { fr: canonicalKey, en: canonicalKey };

    return {
      locale,
      routeId: 'service-detail',
      slug: canonicalKey,
      canonicalPath: locale === 'en' ? `/en/services/${slugMap.en}` : `/fr/services/${slugMap.fr}`,
      frPath: `/fr/services/${slugMap.fr}`,
      enPath: `/en/services/${slugMap.en}`,
    };
  }

  // Solutions Hub
  if (subPath === '/solutions') {
    return {
      locale,
      routeId: 'solutions',
      canonicalPath: locale === 'en' ? '/en/solutions' : '/fr/solutions',
      frPath: '/fr/solutions',
      enPath: '/en/solutions',
    };
  }

  // Solution Detail
  if (subPath.startsWith('/solutions/')) {
    const rawSlug = subPath.replace('/solutions/', '');
    const canonicalKey = normalizeSolutionSlug(rawSlug);
    const slugMap = SOLUTION_SLUG_MAP[canonicalKey] || { fr: canonicalKey, en: canonicalKey };

    return {
      locale,
      routeId: 'solution-detail',
      slug: canonicalKey,
      canonicalPath: locale === 'en' ? `/en/solutions/${slugMap.en}` : `/fr/solutions/${slugMap.fr}`,
      frPath: `/fr/solutions/${slugMap.fr}`,
      enPath: `/en/solutions/${slugMap.en}`,
    };
  }

  // Réalisations / Case Studies Hub
  if (
    subPath === '/realisations' ||
    subPath === '/case-studies' ||
    subPath === '/projects'
  ) {
    return {
      locale,
      routeId: 'projects',
      canonicalPath: locale === 'en' ? '/en/case-studies' : '/fr/realisations',
      frPath: '/fr/realisations',
      enPath: '/en/case-studies',
    };
  }

  // Réalisations / Case Studies Detail
  if (
    subPath.startsWith('/realisations/') ||
    subPath.startsWith('/case-studies/') ||
    subPath.startsWith('/projects/')
  ) {
    const rawSlug = subPath
      .replace('/realisations/', '')
      .replace('/case-studies/', '')
      .replace('/projects/', '');
    const canonicalKey = normalizeProjectSlug(rawSlug);

    return {
      locale,
      routeId: 'project-detail',
      slug: canonicalKey,
      canonicalPath: locale === 'en' ? `/en/case-studies/${canonicalKey}` : `/fr/realisations/${canonicalKey}`,
      frPath: `/fr/realisations/${canonicalKey}`,
      enPath: `/en/case-studies/${canonicalKey}`,
    };
  }

  // À propos / About
  if (subPath === '/a-propos' || subPath === '/about') {
    return {
      locale,
      routeId: 'about',
      canonicalPath: locale === 'en' ? '/en/about' : '/fr/a-propos',
      frPath: '/fr/a-propos',
      enPath: '/en/about',
    };
  }

  // Contact
  if (subPath === '/contact') {
    return {
      locale,
      routeId: 'contact',
      canonicalPath: locale === 'en' ? '/en/contact' : '/fr/contact',
      frPath: '/fr/contact',
      enPath: '/en/contact',
    };
  }

  // Devis / Quote
  if (subPath === '/devis' || subPath === '/quote') {
    return {
      locale,
      routeId: 'quote',
      canonicalPath: locale === 'en' ? '/en/quote' : '/fr/devis',
      frPath: '/fr/devis',
      enPath: '/en/quote',
    };
  }

  // Mentions Légales / Legal Notice
  if (subPath === '/mentions-legales' || subPath === '/legal-notice' || subPath === '/legal') {
    return {
      locale,
      routeId: 'legal',
      canonicalPath: locale === 'en' ? '/en/legal-notice' : '/fr/mentions-legales',
      frPath: '/fr/mentions-legales',
      enPath: '/en/legal-notice',
    };
  }

  // Confidentialité / Privacy Policy
  if (subPath === '/confidentialite' || subPath === '/privacy-policy' || subPath === '/privacy') {
    return {
      locale,
      routeId: 'privacy',
      canonicalPath: locale === 'en' ? '/en/privacy-policy' : '/fr/confidentialite',
      frPath: '/fr/confidentialite',
      enPath: '/en/privacy-policy',
    };
  }

  // Par défaut : Homepage
  return {
    locale,
    routeId: 'home',
    canonicalPath: locale === 'en' ? '/en' : '/fr',
    frPath: '/fr',
    enPath: '/en',
  };
}

/**
 * Calcule l'URL équivalente dans la langue cible
 */
export function getEquivalentRoute(currentPath: string, targetLocale: Locale): string {
  const resolved = resolveRoute(currentPath);
  return targetLocale === 'en' ? resolved.enPath : resolved.frPath;
}

/**
 * Construit un lien localisé à partir d'un identifiant de route
 */
export function getLocalizedHref(
  routeId: 'home' | 'services' | 'solutions' | 'projects' | 'about' | 'contact' | 'quote' | 'legal' | 'privacy',
  locale: Locale,
  slug?: string
): string {
  if (routeId === 'home') return locale === 'en' ? '/en' : '/fr';
  if (routeId === 'services') return locale === 'en' ? '/en/services' : '/fr/services';
  if (routeId === 'solutions') return locale === 'en' ? '/en/solutions' : '/fr/solutions';
  if (routeId === 'projects') return locale === 'en' ? '/en/case-studies' : '/fr/realisations';
  if (routeId === 'about') return locale === 'en' ? '/en/about' : '/fr/a-propos';
  if (routeId === 'contact') return locale === 'en' ? '/en/contact' : '/fr/contact';
  if (routeId === 'quote') return locale === 'en' ? '/en/quote' : '/fr/devis';
  if (routeId === 'legal') return locale === 'en' ? '/en/legal-notice' : '/fr/mentions-legales';
  if (routeId === 'privacy') return locale === 'en' ? '/en/privacy-policy' : '/fr/confidentialite';

  return locale === 'en' ? '/en' : '/fr';
}

