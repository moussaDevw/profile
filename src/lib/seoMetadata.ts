/**
 * Gestionnaire de métadonnées SEO, Open Graph, Twitter Cards, Canonical, Hreflang
 * et Données Structurées (Schema.org JSON-LD) pour MusaTech
 * Conforme aux exigences Google Search Central, WCAG et RGPD
 */

import { Locale } from './i18nRoutes';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface SeoMetadataOptions {
  title: string;
  description: string;
  canonicalPath: string;
  frPath: string;
  enPath: string;
  locale?: Locale;
  ogType?: 'website' | 'article' | 'profile';
  ogImage?: string;
  breadcrumbs?: BreadcrumbItem[];
  schemaType?: 'website' | 'service' | 'case-study' | 'about' | 'contact' | 'quote';
  schemaData?: Record<string, unknown>;
}

export const SITE_ORIGIN = 'https://www.musatech.tech';
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.png`;

function setMetaTag(attributeName: 'name' | 'property', attributeValue: string, content: string): void {
  if (typeof document === 'undefined') return;
  let el = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attributeName, attributeValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLinkTag(rel: string, href: string, extraAttrs?: Record<string, string>): void {
  if (typeof document === 'undefined') return;
  let selector = `link[rel="${rel}"]`;
  if (extraAttrs) {
    for (const [key, val] of Object.entries(extraAttrs)) {
      selector += `[${key}="${val}"]`;
    }
  }

  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (extraAttrs) {
      for (const [key, val] of Object.entries(extraAttrs)) {
        el.setAttribute(key, val);
      }
    }
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Construit le graphe Schema.org JSON-LD véridique et sans données fictives
 */
export function buildSchemaJsonLd(options: SeoMetadataOptions): Record<string, unknown> {
  const { title, description, canonicalPath, locale = 'fr', breadcrumbs, schemaType, schemaData } = options;
  const isEn = locale === 'en';
  const fullUrl = `${SITE_ORIGIN}${canonicalPath}`;

  const graph: Array<Record<string, unknown>> = [
    // 1. Organization / ProfessionalService
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_ORIGIN}/#organization`,
      name: 'MusaTech',
      legalName: 'MusaTech — Moussa Diagne',
      url: SITE_ORIGIN,
      logo: `${SITE_ORIGIN}/favicon.svg`,
      image: DEFAULT_OG_IMAGE,
      description: isEn
        ? 'MusaTech provides custom web development, mobile apps and business software platforms in Dakar, Senegal and internationally.'
        : 'MusaTech conçoit des sites web professionnels, des applications mobiles et des plateformes métier sur mesure à Dakar, au Sénégal et à l’international.',
      founder: {
        '@type': 'Person',
        name: 'Moussa Diagne',
        jobTitle: isEn ? 'Lead Full Stack Software Engineer' : 'Développeur Full Stack Senior & Fondateur',
        url: `${SITE_ORIGIN}/${isEn ? 'en/about' : 'fr/a-propos'}`,
        sameAs: [
          'https://github.com/musadiagne',
          'https://linkedin.com/in/moussa-diagne-dakar',
        ],
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dakar',
        addressCountry: 'SN',
      },
      priceRange: '250 000 XOF - 5 000 000+ XOF',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: isEn ? 'customer service' : 'commercial',
        email: 'contact@musatech.tech',
        availableLanguage: ['French', 'English', 'Wolof'],
      },
      areaServed: ['SN', 'FR', 'CI', 'Worldwide'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: isEn ? 'MusaTech Engineering Services' : 'Services d’Ingénierie MusaTech',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: isEn ? 'Professional Website Development' : 'Création de Sites Web Professionnels',
              description: isEn
                ? 'High-conversion, SEO-optimized showcase and corporate websites.'
                : 'Conception de sites vitrines et corporate optimisés pour le référencement et la conversion.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: isEn ? 'Custom E-Commerce Platforms' : 'Sites E-Commerce & Boutiques Connectées',
              description: isEn
                ? 'E-commerce with mobile money payments (Wave, Orange Money) and local delivery workflows.'
                : 'Boutiques en ligne sur mesure intégrant les moyens de paiement locaux (Wave, Orange Money).',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: isEn ? 'Custom Business Software' : 'Plateformes & Logiciels Métier sur Mesure',
              description: isEn
                ? 'Internal management platforms, CRMs, portals and automated operational dashboards.'
                : 'Outils de gestion internes, CRM, portails clients et tableaux de bord opérationnels automatisés.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: isEn ? 'Cross-Platform Mobile Apps' : 'Applications Mobiles iOS & Android',
              description: isEn
                ? 'Fast, offline-first mobile applications in React Native for businesses.'
                : 'Applications mobiles fluides développées en React Native adaptées au réseau sénégalais et international.',
            },
          },
        ],
      },
    },

    // 2. WebSite
    {
      '@type': 'WebSite',
      '@id': `${SITE_ORIGIN}/#website`,
      url: SITE_ORIGIN,
      name: 'MusaTech',
      inLanguage: ['fr', 'en'],
      publisher: {
        '@id': `${SITE_ORIGIN}/#organization`,
      },
    },

    // 3. WebPage courante
    {
      '@type': 'WebPage',
      '@id': `${fullUrl}#webpage`,
      url: fullUrl,
      name: title,
      description,
      inLanguage: locale,
      isPartOf: {
        '@id': `${SITE_ORIGIN}/#website`,
      },
    },
  ];

  // 4. Breadcrumbs si présents
  if (breadcrumbs && breadcrumbs.length > 0) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${fullUrl}#breadcrumb`,
      itemListElement: breadcrumbs.map((crumb, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: crumb.name,
        item: `${SITE_ORIGIN}${crumb.path}`,
      })),
    });
  }

  // 5. Spécifique Service
  if (schemaType === 'service' && schemaData) {
    graph.push({
      '@type': 'Service',
      '@id': `${fullUrl}#service`,
      name: (schemaData.name as string) || title,
      description: (schemaData.description as string) || description,
      provider: {
        '@id': `${SITE_ORIGIN}/#organization`,
      },
      offers: schemaData.startingPrice
        ? {
            '@type': 'Offer',
            price: schemaData.startingPrice,
            priceCurrency: 'XOF',
            availability: 'https://schema.org/InStock',
          }
        : undefined,
    });
  }

  // 6. Spécifique Case Study / Réalisation
  if (schemaType === 'case-study' && schemaData) {
    graph.push({
      '@type': 'TechArticle',
      '@id': `${fullUrl}#case-study`,
      headline: (schemaData.name as string) || title,
      description: (schemaData.summary as string) || description,
      author: {
        '@id': `${SITE_ORIGIN}/#organization`,
      },
      publisher: {
        '@id': `${SITE_ORIGIN}/#organization`,
      },
      about: schemaData.technologies,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

/**
 * Met à jour dynamiquement dans le DOM l'ensemble des balises SEO, OG, Twitter et JSON-LD
 */
export function updatePageMetadata(options: SeoMetadataOptions): void {
  if (typeof document === 'undefined') return;

  const {
    title,
    description,
    canonicalPath,
    frPath,
    enPath,
    locale = 'fr',
    ogType = 'website',
    ogImage = DEFAULT_OG_IMAGE,
  } = options;

  const fullCanonicalUrl = `${SITE_ORIGIN}${canonicalPath}`;

  // 1. Titre & Langue
  document.title = title;
  document.documentElement.lang = locale;

  // 2. Meta Description
  setMetaTag('name', 'description', description);

  // 3. Canonique
  setLinkTag('canonical', fullCanonicalUrl);

  // 4. Hreflang multilingues (fr, en, x-default)
  setLinkTag('alternate', `${SITE_ORIGIN}${frPath}`, { hreflang: 'fr' });
  setLinkTag('alternate', `${SITE_ORIGIN}${enPath}`, { hreflang: 'en' });
  setLinkTag('alternate', `${SITE_ORIGIN}${frPath}`, { hreflang: 'x-default' });

  // 5. Open Graph
  setMetaTag('property', 'og:site_name', 'MusaTech');
  setMetaTag('property', 'og:title', title);
  setMetaTag('property', 'og:description', description);
  setMetaTag('property', 'og:url', fullCanonicalUrl);
  setMetaTag('property', 'og:type', ogType);
  setMetaTag('property', 'og:image', ogImage);
  setMetaTag('property', 'og:locale', locale === 'en' ? 'en_US' : 'fr_SN');
  setMetaTag('property', 'og:locale:alternate', locale === 'en' ? 'fr_SN' : 'en_US');

  // 6. Twitter / X Cards
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', title);
  setMetaTag('name', 'twitter:description', description);
  setMetaTag('name', 'twitter:image', ogImage);

  // 7. Schema.org JSON-LD
  let scriptSchema = document.getElementById('musatech-schema-jsonld') as HTMLScriptElement | null;
  if (!scriptSchema) {
    scriptSchema = document.createElement('script');
    scriptSchema.id = 'musatech-schema-jsonld';
    scriptSchema.type = 'application/ld+json';
    document.head.appendChild(scriptSchema);
  }
  const schemaPayload = buildSchemaJsonLd(options);
  scriptSchema.textContent = JSON.stringify(schemaPayload, null, 2);
}
