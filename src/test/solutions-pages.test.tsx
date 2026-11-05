import React from 'react';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SolutionsIndexPage } from '../pages/SolutionsIndexPage';
import { SolutionDetailPage } from '../pages/SolutionDetailPage';
import { RouterProvider } from '../lib/router';
import { QuoteRequestSection } from '../components/home/QuoteRequestSection';
import '../i18n';

describe('MusaTech Sector Solutions Pages (/solutions & /solutions/[sector])', () => {
  describe('/solutions — Sector Solutions Hub', () => {
    it('renders the solutions overview with 4 sectors, guarantees, and workflow', () => {
      render(
        <RouterProvider>
          <SolutionsIndexPage />
        </RouterProvider>
      );

      // Hero check
      expect(
        screen.getByText('Des outils pensés pour les réalités de votre secteur.')
      ).toBeInTheDocument();

      // Check sectors rendered
      expect(screen.getByText('Immobilier')).toBeInTheDocument();
      expect(screen.getByText('Éducation')).toBeInTheDocument();
      expect(screen.getByText('Commerce')).toBeInTheDocument();
      expect(screen.getByText('Logistique')).toBeInTheDocument();

      // Check CTA buttons
      expect(screen.getByRole('link', { name: /Demander un devis personnalisé/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Consulter nos offres de services/i })).toBeInTheDocument();

      // Guarantees
      expect(screen.getByText('Pleine propriété intellectuelle')).toBeInTheDocument();
      expect(screen.getByText('Intégration locale fluide')).toBeInTheDocument();
      expect(screen.getByText('Accompagnement direct par le fondateur')).toBeInTheDocument();
    });
  });

  describe('PAGE IMMOBILIER (/solutions/immobilier)', () => {
    it('renders with all 8 mandatory sections, required title, and specific features', () => {
      render(
        <RouterProvider>
          <SolutionDetailPage slug="immobilier" />
        </RouterProvider>
      );

      // 1. Hero spécifique & Titre exact imposé
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: 'Digitalisez votre agence immobilière et simplifiez la gestion de vos biens.',
        })
      ).toBeInTheDocument();

      // 2. Problèmes métier
      expect(
        screen.getByText('Quels blocages résolvons-nous dans votre activité ?')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Biens éparpillés sur les réseaux sociaux et WhatsApp')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Visites non qualifiées et temps perdu sur le terrain')
      ).toBeInTheDocument();

      // 3. Solutions et fonctionnalités possibles
      expect(
        screen.getByText('Ce que MusaTech peut développer pour votre organisation')
      ).toBeInTheDocument();
      expect(screen.getByText('Catalogue immobilier dynamique')).toBeInTheDocument();
      expect(screen.getByText('Recherche multicritère performante')).toBeInTheDocument();
      expect(screen.getByText('Fiches de biens interactives & claires')).toBeInTheDocument();
      expect(screen.getByText('Demandes de visite en ligne')).toBeInTheDocument();
      expect(screen.getByText('Gestion centralisée des prospects')).toBeInTheDocument();
      expect(screen.getByText('Mini-CRM de suivi des négociations')).toBeInTheDocument();
      expect(screen.getByText('Suivi locatif (Module en option)')).toBeInTheDocument();

      // 4. Bénéfices
      expect(
        screen.getByText('Les bénéfices concrets pour votre structure')
      ).toBeInTheDocument();
      expect(screen.getByText('Gain de réactivité commerciale')).toBeInTheDocument();
      expect(screen.getByText('Qualification accrue des acheteurs')).toBeInTheDocument();

      // 5. Exemple de parcours utilisateur
      expect(
        screen.getByText('Exemple de parcours : de la découverte à la signature')
      ).toBeInTheDocument();
      expect(screen.getByText('Recherche multicritère')).toBeInTheDocument();
      expect(screen.getByText('Confirmation dans le CRM')).toBeInTheDocument();

      // 6. Réalisations / Transparence
      expect(
        screen.getByText('Notre légitimité technique sur ce domaine')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Socle éprouvé & protection des données clients')
      ).toBeInTheDocument();

      // 7. FAQ
      expect(
        screen.getByText(/Questions fréquentes sur l'offre Immobilier/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Peut-on masquer l’adresse exacte des biens pour protéger nos mandats \?/)
      ).toBeInTheDocument();

      // 8. Demande de devis avec pré-sélection
      const ctaButtons = screen.getAllByRole('link', {
        name: /Demander un devis pour Immobilier/i,
      });
      expect(ctaButtons.length).toBeGreaterThanOrEqual(1);
      expect(ctaButtons[0]).toHaveAttribute('href', '/fr/devis?sector=immobilier');
    });
  });

  describe('PAGE ÉDUCATION (/solutions/education)', () => {
    it('renders with all 8 mandatory sections, required title, and specific features', () => {
      render(
        <RouterProvider>
          <SolutionDetailPage slug="education" />
        </RouterProvider>
      );

      // 1. Hero spécifique & Titre exact imposé
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: 'Simplifiez la gestion de votre établissement avec une plateforme adaptée.',
        })
      ).toBeInTheDocument();

      // 2. Problèmes métier
      expect(
        screen.getByText('Inscriptions papier encombrantes et files d’attente')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Retards de scolarité et suivi financier laborieux')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Communication éclatée avec les familles')
      ).toBeInTheDocument();

      // 3. Solutions et fonctionnalités possibles
      expect(screen.getByText('Inscriptions et réinscriptions en ligne')).toBeInTheDocument();
      expect(screen.getByText('Gestion des apprenants et classes')).toBeInTheDocument();
      expect(screen.getByText('Emplois du temps dynamiques')).toBeInTheDocument();
      expect(screen.getByText('Suivi des notes et relevés d’absences')).toBeInTheDocument();
      expect(screen.getByText('Paiements et suivi des frais de scolarité')).toBeInTheDocument();
      expect(screen.getByText('Espace parents ou apprenants')).toBeInTheDocument();

      // 4. Bénéfices
      expect(screen.getByText('Gain de temps administratif majeur')).toBeInTheDocument();
      expect(screen.getByText('Amélioration du recouvrement des frais')).toBeInTheDocument();

      // 5. Exemple de parcours utilisateur
      expect(
        screen.getByText('Exemple de parcours : de l’inscription au bulletin')
      ).toBeInTheDocument();

      // 6. Réalisations pertinentes réelles (Plateforme EdTech Yello)
      expect(screen.getByText('Plateforme EdTech (Yello)')).toBeInTheDocument();
      expect(
        screen.getByText('Plateforme utilisée par plus de 200 000 apprenants')
      ).toBeInTheDocument();

      // 7. FAQ
      expect(
        screen.getByText(/Questions fréquentes sur l'offre Éducation/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Nos données scolaires et informations d’élèves sont-elles protégées \?/)
      ).toBeInTheDocument();

      // 8. Demande de devis avec pré-sélection
      const ctaButtons = screen.getAllByRole('link', {
        name: /Demander un devis pour Éducation/i,
      });
      expect(ctaButtons.length).toBeGreaterThanOrEqual(1);
      expect(ctaButtons[0]).toHaveAttribute('href', '/fr/devis?sector=education');
    });
  });

  describe('Quote Form Sector Preselection & Viewport Checks', () => {
    it('pre-selects industry when hash has sector=immobilier', () => {
      window.location.hash = '#devis?sector=immobilier';
      render(
        <RouterProvider>
          <QuoteRequestSection />
        </RouterProvider>
      );

      const industrySelect = screen.getByLabelText(/Secteur d'activité/i) as HTMLSelectElement;
      expect(industrySelect.value).toBe('Immobilier');
    });

    it('pre-selects industry when hash has sector=education', () => {
      window.location.hash = '#devis?sector=education';
      render(
        <RouterProvider>
          <QuoteRequestSection />
        </RouterProvider>
      );

      const industrySelect = screen.getByLabelText(/Secteur d'activité/i) as HTMLSelectElement;
      expect(industrySelect.value).toBe('Éducation');
    });

    it('renders correctly on mobile (390px) and desktop (1440px)', () => {
      // Mobile
      window.innerWidth = 390;
      window.innerHeight = 844;
      window.dispatchEvent(new Event('resize'));

      const { unmount } = render(
        <RouterProvider>
          <SolutionDetailPage slug="immobilier" />
        </RouterProvider>
      );
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: 'Digitalisez votre agence immobilière et simplifiez la gestion de vos biens.',
        })
      ).toBeInTheDocument();
      unmount();

      // Desktop
      window.innerWidth = 1440;
      window.innerHeight = 900;
      window.dispatchEvent(new Event('resize'));

      render(
        <RouterProvider>
          <SolutionDetailPage slug="education" />
        </RouterProvider>
      );
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: 'Simplifiez la gestion de votre établissement avec une plateforme adaptée.',
        })
      ).toBeInTheDocument();
    });
  });
});

