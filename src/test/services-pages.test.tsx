import React from 'react';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';
import { ServicesIndexPage } from '../pages/ServicesIndexPage';
import { ServiceDetailPage } from '../pages/ServiceDetailPage';
import { RouterProvider } from '../lib/router';
import '../i18n';

describe('MusaTech Services & Detailed Service Pages', () => {
  describe('/services — Services Index Page', () => {
    it('renders the services overview with all 4 offers, prices, benefits, and method', () => {
      render(
        <RouterProvider>
          <ServicesIndexPage />
        </RouterProvider>
      );

      // Hero check
      expect(
        screen.getByText('Des solutions logicielles pensées pour votre rentabilité.')
      ).toBeInTheDocument();

      // 4 offers check
      expect(screen.getByText('Sites Web Professionnels')).toBeInTheDocument();
      expect(screen.getByText('Sites E-Commerce & Boutiques Connectées')).toBeInTheDocument();
      expect(screen.getByText('Plateformes & Logiciels Métier')).toBeInTheDocument();
      expect(screen.getByText('Applications Mobiles iOS & Android')).toBeInTheDocument();

      // Starting prices check
      expect(screen.getByText('À partir de 250 000 FCFA')).toBeInTheDocument();
      expect(screen.getByText('À partir de 600 000 FCFA')).toBeInTheDocument();
      expect(screen.getByText('À partir de 1 500 000 FCFA')).toBeInTheDocument();
      expect(screen.getByText('À partir de 2 000 000 FCFA')).toBeInTheDocument();

      // Business benefits check
      expect(screen.getByText('Gains de productivité réels')).toBeInTheDocument();
      expect(screen.getByText('Pleine propriété du code')).toBeInTheDocument();
      expect(screen.getByText('Technologies modernes & pérennes')).toBeInTheDocument();

      // Transparency disclaimer
      expect(
        screen.getByText(
          /Tarifs de départ pour un périmètre défini. Chaque projet fait l’objet d’un devis personnalisé./i
        )
      ).toBeInTheDocument();
    });
  });

  describe('Individual Service Pages (/services/[slug])', () => {
    const slugs = [
      {
        slug: 'sites-web',
        title: 'Sites Web Professionnels',
        price: 'À partir de 250 000 FCFA',
        sampleAudience: 'PME & Sociétés de services',
      },
      {
        slug: 'e-commerce',
        title: 'Sites E-Commerce & Boutiques Connectées',
        price: 'À partir de 600 000 FCFA',
        sampleAudience: 'Commerces physiques & Marques locales',
      },
      {
        slug: 'logiciels-metier',
        title: 'Plateformes & Logiciels Métier',
        price: 'À partir de 1 500 000 FCFA',
        sampleAudience: 'Entreprises de logistique & transport',
      },
      {
        slug: 'applications-mobiles',
        title: 'Applications Mobiles iOS & Android',
        price: 'À partir de 2 000 000 FCFA',
        sampleAudience: 'InsurTech & Fintech',
      },
    ];

    slugs.forEach(({ slug, title, price, sampleAudience }) => {
      it(`renders detailed page for /services/${slug} with all 10 required sections`, () => {
        render(
          <RouterProvider>
            <ServiceDetailPage slug={slug} />
          </RouterProvider>
        );

        // 1. Title & starting price
        expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument();
        expect(screen.getByText(price)).toBeInTheDocument();

        // 2. À qui s'adresse le service (targetAudience)
        expect(screen.getByText("À qui s'adresse cette offre ?")).toBeInTheDocument();
        expect(screen.getByText(sampleAudience)).toBeInTheDocument();

        // 3. Problèmes résolus (problemsSolved)
        expect(screen.getByText('Quels blocages éliminons-nous ?')).toBeInTheDocument();

        // 4. Périmètre de départ (starterScope)
        expect(screen.getByText(/Inclus dans le tarif de départ/i)).toBeInTheDocument();

        // 5. Options payantes (paidOptions)
        expect(screen.getByText('Options & Évolutions Disponibles')).toBeInTheDocument();

        // 6. Fonctionnalités possibles (possibleFeatures)
        expect(screen.getByText('Fonctionnalités réalisables pour cette offre')).toBeInTheDocument();

        // 7. Méthode de travail
        expect(screen.getByText(new RegExp(`Comment nous réalisons votre ${title.toLowerCase()}`, 'i'))).toBeInTheDocument();

        // 8. Questions fréquentes
        expect(screen.getByText(new RegExp(`Vos questions sur l'offre ${title}`, 'i'))).toBeInTheDocument();

        // 9. CTA avec pré-sélection
        const ctaButtons = screen.getAllByRole('link', {
          name: new RegExp(`Demander un devis pour`, 'i'),
        });
        expect(ctaButtons.length).toBeGreaterThanOrEqual(1);
        expect(ctaButtons[0]).toHaveAttribute('href', `/#devis?service=${slug}`);
      });
    });
  });

  describe('Responsive & Viewport Checks for Service Pages', () => {
    it('verifies mobile (390px) and desktop (1440px) rendering without crashing', () => {
      // Mobile
      window.innerWidth = 390;
      window.innerHeight = 844;
      window.dispatchEvent(new Event('resize'));

      const { unmount } = render(
        <RouterProvider>
          <ServiceDetailPage slug="sites-web" />
        </RouterProvider>
      );
      expect(screen.getByRole('heading', { level: 1, name: 'Sites Web Professionnels' })).toBeInTheDocument();
      unmount();

      // Desktop
      window.innerWidth = 1440;
      window.innerHeight = 900;
      window.dispatchEvent(new Event('resize'));

      render(
        <RouterProvider>
          <ServiceDetailPage slug="applications-mobiles" />
        </RouterProvider>
      );
      expect(screen.getByRole('heading', { level: 1, name: 'Applications Mobiles iOS & Android' })).toBeInTheDocument();
    });
  });
});
