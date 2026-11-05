import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import App from '../App';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { RouterProvider, useRouter } from '../lib/router';
import {
  resolveRoute,
  getEquivalentRoute,
  SERVICE_SLUG_MAP,
  SOLUTION_SLUG_MAP,
  PROJECT_SLUG_MAP,
} from '../lib/i18nRoutes';
import { updatePageMetadata } from '../lib/seoMetadata';
import { validateQuoteForm } from '../schemas/quoteSchema';
import { setBackendEndpointForTesting, resetSubmissionRateLimitForTesting } from '../lib/quoteService';
import i18n from '../i18n';

describe('MusaTech Internationalization (i18n) & Localized Routing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetSubmissionRateLimitForTesting();
    setBackendEndpointForTesting(null);
    window.history.pushState({}, '', '/');
    i18n.changeLanguage('fr');
    document.documentElement.lang = 'fr';
  });

  afterEach(() => {
    setBackendEndpointForTesting(null);
    resetSubmissionRateLimitForTesting();
  });

  // ==========================================
  // 1. ROUTE RESOLUTION & EQUIVALENCE
  // ==========================================
  describe('Route Resolution & Bidirectional Equivalence', () => {
    it('resolves root / and /fr to French home, and /en to English home', () => {
      const rootRes = resolveRoute('/');
      expect(rootRes.locale).toBe('fr');
      expect(rootRes.routeId).toBe('home');
      expect(rootRes.frPath).toBe('/fr');
      expect(rootRes.enPath).toBe('/en');

      const frRes = resolveRoute('/fr');
      expect(frRes.locale).toBe('fr');
      expect(frRes.routeId).toBe('home');

      const enRes = resolveRoute('/en');
      expect(enRes.locale).toBe('en');
      expect(enRes.routeId).toBe('home');
      expect(enRes.canonicalPath).toBe('/en');
    });

    it('resolves localized services routes and equivalent links', () => {
      const frServices = resolveRoute('/fr/services');
      expect(frServices.routeId).toBe('services');
      expect(frServices.locale).toBe('fr');
      expect(frServices.enPath).toBe('/en/services');

      const enServices = resolveRoute('/en/services');
      expect(enServices.routeId).toBe('services');
      expect(enServices.locale).toBe('en');
      expect(enServices.frPath).toBe('/fr/services');

      // Détail service
      const frDetail = resolveRoute('/fr/services/logiciels-metier');
      expect(frDetail.routeId).toBe('service-detail');
      expect(frDetail.slug).toBe('logiciels-metier');
      expect(frDetail.enPath).toBe('/en/services/business-software');

      const enDetail = resolveRoute('/en/services/business-software');
      expect(enDetail.routeId).toBe('service-detail');
      expect(enDetail.slug).toBe('logiciels-metier');
      expect(enDetail.frPath).toBe('/fr/services/logiciels-metier');
    });

    it('resolves localized solutions routes and equivalent links', () => {
      const frSol = resolveRoute('/fr/solutions/immobilier');
      expect(frSol.routeId).toBe('solution-detail');
      expect(frSol.slug).toBe('immobilier');
      expect(frSol.enPath).toBe('/en/solutions/real-estate');

      const enSol = resolveRoute('/en/solutions/real-estate');
      expect(enSol.routeId).toBe('solution-detail');
      expect(enSol.slug).toBe('immobilier');
      expect(enSol.frPath).toBe('/fr/solutions/immobilier');
    });

    it('resolves localized case studies routes and equivalent links', () => {
      const frProjects = resolveRoute('/fr/realisations');
      expect(frProjects.routeId).toBe('projects');
      expect(frProjects.enPath).toBe('/en/case-studies');

      const enProjects = resolveRoute('/en/case-studies');
      expect(enProjects.routeId).toBe('projects');
      expect(enProjects.frPath).toBe('/fr/realisations');

      const frDetail = resolveRoute('/fr/realisations/assure-express');
      expect(frDetail.routeId).toBe('project-detail');
      expect(frDetail.enPath).toBe('/en/case-studies/assure-express');

      const enDetail = resolveRoute('/en/case-studies/assure-express');
      expect(enDetail.routeId).toBe('project-detail');
      expect(enDetail.frPath).toBe('/fr/realisations/assure-express');
    });

    it('resolves quote routes (/fr/devis and /en/quote)', () => {
      const frQuote = resolveRoute('/fr/devis');
      expect(frQuote.routeId).toBe('quote');
      expect(frQuote.locale).toBe('fr');
      expect(frQuote.enPath).toBe('/en/quote');

      const enQuote = resolveRoute('/en/quote');
      expect(enQuote.routeId).toBe('quote');
      expect(enQuote.locale).toBe('en');
      expect(enQuote.frPath).toBe('/fr/devis');
    });

    it('preserves legacy portfolio routes with canonical redirects', () => {
      const workRedirect = resolveRoute('/work');
      expect(workRedirect.routeId).toBe('projects');
      expect(workRedirect.canonicalPath).toBe('/fr/realisations');

      const expertiseRedirect = resolveRoute('/expertise');
      expect(expertiseRedirect.routeId).toBe('services');
      expect(expertiseRedirect.canonicalPath).toBe('/fr/services');
    });

    it('calculates equivalent routes accurately via getEquivalentRoute', () => {
      expect(getEquivalentRoute('/fr/services/sites-web', 'en')).toBe('/en/services/websites');
      expect(getEquivalentRoute('/en/services/websites', 'fr')).toBe('/fr/services/sites-web');
      expect(getEquivalentRoute('/fr/solutions/commerce', 'en')).toBe('/en/solutions/retail');
      expect(getEquivalentRoute('/en/solutions/retail', 'fr')).toBe('/fr/solutions/commerce');
      expect(getEquivalentRoute('/fr/devis', 'en')).toBe('/en/quote');
      expect(getEquivalentRoute('/en/quote', 'fr')).toBe('/fr/devis');
    });
  });

  // ==========================================
  // 2. LANGUAGE SWITCHER COMPONENT
  // ==========================================
  describe('Accessible Language Switcher', () => {
    it('renders with accessible ARIA attributes and highlights current language', () => {
      render(
        <RouterProvider>
          <LanguageSwitcher />
        </RouterProvider>
      );

      const group = screen.getByRole('group', { name: /sélection de la langue/i });
      expect(group).toBeInTheDocument();

      const frBtn = screen.getByRole('button', { name: /passer le site en français/i });
      const enBtn = screen.getByRole('button', { name: /switch website to english/i });

      expect(frBtn).toHaveAttribute('aria-pressed', 'true');
      expect(enBtn).toHaveAttribute('aria-pressed', 'false');
    });

    it('switches language and URL when EN is clicked', () => {
      window.history.pushState({}, '', '/fr/devis');

      render(
        <RouterProvider>
          <LanguageSwitcher />
        </RouterProvider>
      );

      const enBtn = screen.getByRole('button', { name: /switch website to english/i });
      fireEvent.click(enBtn);

      expect(window.location.pathname).toBe('/en/quote');
      expect(i18n.language).toBe('en');
      expect(document.documentElement.lang).toBe('en');
    });
  });

  // ==========================================
  // 3. SEO METADATA, CANONICAL & HREFLANG
  // ==========================================
  describe('SEO Metadata & Hreflang Tags', () => {
    it('injects and updates title, description, canonical, and alternate hreflang tags', () => {
      updatePageMetadata({
        title: 'Custom Web & Mobile | MusaTech Dakar',
        description: 'MusaTech builds high-impact software platforms.',
        canonicalPath: '/en/services',
        frPath: '/fr/services',
        enPath: '/en/services',
        locale: 'en',
      });

      expect(document.title).toBe('Custom Web & Mobile | MusaTech Dakar');
      expect(document.documentElement.lang).toBe('en');

      const metaDesc = document.querySelector('meta[name="description"]');
      expect(metaDesc?.getAttribute('content')).toBe('MusaTech builds high-impact software platforms.');

      const canonicalLink = document.querySelector('link[rel="canonical"]');
      expect(canonicalLink?.getAttribute('href')).toBe('https://www.musatech.tech/en/services');

      const hreflangFr = document.querySelector('link[rel="alternate"][hreflang="fr"]');
      expect(hreflangFr?.getAttribute('href')).toBe('https://www.musatech.tech/fr/services');

      const hreflangEn = document.querySelector('link[rel="alternate"][hreflang="en"]');
      expect(hreflangEn?.getAttribute('href')).toBe('https://www.musatech.tech/en/services');

      const hreflangDefault = document.querySelector('link[rel="alternate"][hreflang="x-default"]');
      expect(hreflangDefault?.getAttribute('href')).toBe('https://www.musatech.tech/fr/services');
    });
  });

  // ==========================================
  // 4. QUOTE FORM BILINGUAL VALIDATION & SUBMISSION
  // ==========================================
  describe('Bilingual Quote Form (/en/quote)', () => {
    it('returns validation errors in English when locale is en', () => {
      const invalidData = {
        fullName: 'A', // Trop court
        email: 'invalid-email',
        country: '',
        projectType: '',
        description: 'short',
        consentPrivacy: false,
      };

      const result = validateQuoteForm(invalidData, 'en');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors.fullName).toBe('Full name is required (at least 2 characters).');
        expect(result.errors.email).toBe('Please enter a valid email address.');
        expect(result.errors.country).toBe('Country is required.');
        expect(result.errors.projectType).toBe('Please select a project type.');
        expect(result.errors.description).toBe(
          'Please describe your project in more detail (at least 20 characters).'
        );
        expect(result.errors.consentPrivacy).toBe(
          'You must accept the privacy policy to submit your request.'
        );
      }
    });

    it('renders /en/quote with English labels, USD/EUR currency selector, and submits successfully', async () => {
      setBackendEndpointForTesting('/api/quote');
      window.history.pushState({}, '', '/en/quote');

      render(<App />);

      // Vérifie les labels en anglais
      expect(screen.getByText(/1\. Contact Details/i)).toBeInTheDocument();
      expect(screen.getByText(/2\. Project Scope & Requirements/i)).toBeInTheDocument();
      expect(screen.getAllByText(/USD/i).length).toBeGreaterThanOrEqual(1);

      // Remplissage du formulaire en anglais
      const fullNameInput = screen.getByLabelText(/full name/i);
      const emailInput = screen.getByLabelText(/^email/i);
      const descInput = screen.getByLabelText(/detailed project overview & requirements/i);
      const consentCheckbox = screen.getByRole('checkbox');

      fireEvent.change(fullNameInput, { target: { value: 'John Smith' } });
      fireEvent.change(emailInput, { target: { value: 'john@smith-logistics.com' } });
      fireEvent.change(descInput, {
        target: {
          value:
            'We are looking to develop an enterprise logistics tracking dashboard with automated billing and live driver dispatching.',
        },
      });
      fireEvent.click(consentCheckbox);

      const submitBtn = screen.getByRole('button', { name: /submit quote request/i });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(
          screen.getByText(/Quote Request Successfully Submitted!/i)
        ).toBeInTheDocument();
      });
    });
  });

  // ==========================================
  // 5. COMMERCIAL HOMEPAGE RENDERING IN ENGLISH (/en)
  // ==========================================
  describe('Commercial Homepage in English (/en)', () => {
    it('renders English headings, navigation links, and value propositions', () => {
      window.history.pushState({}, '', '/en');

      render(<App />);

      // Vérifie le surtitre et le titre Hero en anglais
      expect(screen.getByText(/CUSTOM WEB, MOBILE & SOFTWARE ENGINEERING/i)).toBeInTheDocument();
      expect(
        screen.getByText(/High-impact digital solutions designed to grow your business\./i)
      ).toBeInTheDocument();

      // Vérifie les CTAs en anglais
      expect(screen.getAllByText(/Request a Quote/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText(/Explore Case Studies/i).length).toBeGreaterThanOrEqual(1);

      // Vérifie la section de diagnostic
      expect(
        screen.getByText(/Your business deserves software engineered for your ambition\./i)
      ).toBeInTheDocument();

      // Vérifie la barre de navigation
      expect(screen.getAllByText(/Case Studies/i).length).toBeGreaterThanOrEqual(1);
    });
  });
});
