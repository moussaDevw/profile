import { describe, it, expect, beforeEach } from 'vitest';
import { updatePageMetadata, buildSchemaJsonLd, SITE_ORIGIN, DEFAULT_OG_IMAGE } from '../lib/seoMetadata';
import { resolveRoute } from '../lib/i18nRoutes';

describe('Technical & Commercial SEO Engine', () => {
  beforeEach(() => {
    document.title = '';
    document.head.innerHTML = '';
  });

  describe('Dynamic Metadata & Social Tags Injection', () => {
    it('injects Open Graph, Twitter Cards, Canonical, and Hreflang correctly into document.head', () => {
      updatePageMetadata({
        title: 'MusaTech | Développeur Web Freelance Dakar & Solutions Digitales Sénégal',
        description: 'MusaTech conçoit des sites web professionnels et des applications mobiles sur mesure.',
        canonicalPath: '/fr/services',
        frPath: '/fr/services',
        enPath: '/en/services',
        locale: 'fr',
        ogType: 'website',
        breadcrumbs: [
          { name: 'Accueil', path: '/fr' },
          { name: 'Services', path: '/fr/services' },
        ],
      });

      // 1. Title & lang
      expect(document.title).toBe('MusaTech | Développeur Web Freelance Dakar & Solutions Digitales Sénégal');
      expect(document.documentElement.lang).toBe('fr');

      // 2. Canonical
      const canonical = document.querySelector('link[rel="canonical"]');
      expect(canonical?.getAttribute('href')).toBe('https://www.musatech.tech/fr/services');

      // 3. Hreflang (FR, EN, x-default)
      const hreflangFr = document.querySelector('link[rel="alternate"][hreflang="fr"]');
      const hreflangEn = document.querySelector('link[rel="alternate"][hreflang="en"]');
      const hreflangDefault = document.querySelector('link[rel="alternate"][hreflang="x-default"]');
      expect(hreflangFr?.getAttribute('href')).toBe('https://www.musatech.tech/fr/services');
      expect(hreflangEn?.getAttribute('href')).toBe('https://www.musatech.tech/en/services');
      expect(hreflangDefault?.getAttribute('href')).toBe('https://www.musatech.tech/fr/services');

      // 4. Open Graph
      expect(document.querySelector('meta[property="og:site_name"]')?.getAttribute('content')).toBe('MusaTech');
      expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe(
        'MusaTech | Développeur Web Freelance Dakar & Solutions Digitales Sénégal'
      );
      expect(document.querySelector('meta[property="og:url"]')?.getAttribute('content')).toBe(
        'https://www.musatech.tech/fr/services'
      );
      expect(document.querySelector('meta[property="og:type"]')?.getAttribute('content')).toBe('website');
      expect(document.querySelector('meta[property="og:locale"]')?.getAttribute('content')).toBe('fr_SN');

      // 5. Twitter / X Cards
      expect(document.querySelector('meta[name="twitter:card"]')?.getAttribute('content')).toBe('summary_large_image');
      expect(document.querySelector('meta[name="twitter:title"]')?.getAttribute('content')).toBe(
        'MusaTech | Développeur Web Freelance Dakar & Solutions Digitales Sénégal'
      );
      expect(document.querySelector('meta[name="twitter:image"]')?.getAttribute('content')).toBe(DEFAULT_OG_IMAGE);
    });
  });

  describe('Truthful Schema.org JSON-LD Structured Data', () => {
    it('generates a valid Schema.org graph with ProfessionalService, WebSite, and WebPage', () => {
      const schema = buildSchemaJsonLd({
        title: 'MusaTech | Solutions Digitales Dakar',
        description: 'Solutions logicielles professionnelles.',
        canonicalPath: '/fr',
        frPath: '/fr',
        enPath: '/en',
        locale: 'fr',
      });

      expect(schema['@context']).toBe('https://schema.org');
      const graph = schema['@graph'] as Array<Record<string, unknown>>;
      expect(Array.isArray(graph)).toBe(true);

      const org = graph.find((item) => item['@type'] === 'ProfessionalService');
      expect(org).toBeDefined();
      expect(org?.name).toBe('MusaTech');
      expect((org?.founder as Record<string, unknown>)?.name).toBe('Moussa Diagne');
      expect((org?.address as Record<string, unknown>)?.addressLocality).toBe('Dakar');
      expect((org?.address as Record<string, unknown>)?.addressCountry).toBe('SN');

      const website = graph.find((item) => item['@type'] === 'WebSite');
      expect(website).toBeDefined();
      expect(website?.url).toBe(SITE_ORIGIN);
    });

    it('injects BreadcrumbList when breadcrumbs are provided', () => {
      const schema = buildSchemaJsonLd({
        title: 'Sites Web | MusaTech',
        description: 'Création de sites web professionnels.',
        canonicalPath: '/fr/services/sites-web',
        frPath: '/fr/services/sites-web',
        enPath: '/en/services/websites',
        locale: 'fr',
        breadcrumbs: [
          { name: 'Accueil', path: '/fr' },
          { name: 'Services', path: '/fr/services' },
          { name: 'Sites Web', path: '/fr/services/sites-web' },
        ],
      });

      const graph = schema['@graph'] as Array<Record<string, unknown>>;
      const breadcrumbList = graph.find((item) => item['@type'] === 'BreadcrumbList');
      expect(breadcrumbList).toBeDefined();

      const items = breadcrumbList?.itemListElement as Array<Record<string, unknown>>;
      expect(items).toHaveLength(3);
      expect(items[0].name).toBe('Accueil');
      expect(items[1].name).toBe('Services');
      expect(items[2].name).toBe('Sites Web');
    });

    it('embeds the JSON-LD script cleanly in document.head without syntax errors', () => {
      updatePageMetadata({
        title: 'Étude de cas Assure Express',
        description: 'Application mobile InsurTech.',
        canonicalPath: '/fr/realisations/assure-express',
        frPath: '/fr/realisations/assure-express',
        enPath: '/en/case-studies/assure-express',
        locale: 'fr',
        schemaType: 'case-study',
        schemaData: {
          name: 'Assure Express',
          summary: 'Application mobile de souscription d’assurance auto.',
          technologies: ['React Native', 'Node.js', 'PostgreSQL'],
        },
      });

      const script = document.getElementById('musatech-schema-jsonld') as HTMLScriptElement;
      expect(script).not.toBeNull();
      expect(script.type).toBe('application/ld+json');

      const parsed = JSON.parse(script.textContent || '{}');
      expect(parsed['@context']).toBe('https://schema.org');
      const article = parsed['@graph'].find((item: Record<string, unknown>) => item['@type'] === 'TechArticle');
      expect(article).toBeDefined();
      expect(article.headline).toBe('Assure Express');
    });
  });

  describe('Legacy Route Redirection Preservation', () => {
    it('maps legacy portfolio route /work to /fr/realisations with correct equivalent /en/case-studies', () => {
      const resolved = resolveRoute('/work');
      expect(resolved.canonicalPath).toBe('/fr/realisations');
      expect(resolved.enPath).toBe('/en/case-studies');
    });

    it('maps legacy expertise route /expertise to /fr/services', () => {
      const resolved = resolveRoute('/expertise');
      expect(resolved.canonicalPath).toBe('/fr/services');
      expect(resolved.enPath).toBe('/en/services');
    });
  });
});

