import React from 'react';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProjectsIndexPage } from '../pages/ProjectsIndexPage';
import { ProjectDetailPage } from '../pages/ProjectDetailPage';
import { RouterProvider } from '../lib/router';
import '../i18n';

describe('MusaTech Case Studies & Realisations Pages (/realisations & /realisations/[slug])', () => {
  describe('/realisations — Projects Index Page', () => {
    it('renders the projects listing with hero, cards, nature badges, and ethics statement', () => {
      render(
        <RouterProvider>
          <ProjectsIndexPage />
        </RouterProvider>
      );

      // Hero check
      expect(screen.getByText('Des projets concrets, des solutions utiles.')).toBeInTheDocument();

      // Ethics & attribution statement check
      expect(screen.getByText(/Transparence de paternité/i)).toBeInTheDocument();

      // 4 verified projects check
      expect(screen.getByText('Assure Express')).toBeInTheDocument();
      expect(screen.getByText('eDaktari')).toBeInTheDocument();
      expect(screen.getByText('Plateforme EdTech (Yello)')).toBeInTheDocument();
      expect(screen.getByText('Istamco')).toBeInTheDocument();

      // Sector and solution type check
      expect(screen.getByText(/InsurTech & Assurance/i)).toBeInTheDocument();
      expect(screen.getByText(/HealthTech & Santé/i)).toBeInTheDocument();

      // Filter tabs check
      expect(screen.getByRole('button', { name: 'Toutes les réalisations' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'InsurTech & Mobile' })).toBeInTheDocument();

      // CTAs check
      expect(screen.getByRole('link', { name: /Démarrer votre projet avec MusaTech/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Demander un devis pour votre projet/i })).toBeInTheDocument();
    });

    it('filters projects when a sector filter is clicked', () => {
      render(
        <RouterProvider>
          <ProjectsIndexPage />
        </RouterProvider>
      );

      // Filter to InsurTech
      const filterButton = screen.getByRole('button', { name: 'InsurTech & Mobile' });
      fireEvent.click(filterButton);

      expect(screen.getByText('Assure Express')).toBeInTheDocument();
      expect(screen.queryByText('eDaktari')).not.toBeInTheDocument();
    });
  });

  describe('Project Detailed Case Studies (/realisations/[slug])', () => {
    const testCases = [
      {
        slug: 'assure-express',
        name: 'Assure Express',
        natureLabel: 'Projet personnel',
        tech: 'NestJS',
        role: 'Développeur Full Stack & Architecte Logiciel',
        hasRepo: true,
      },
      {
        slug: 'edaktari',
        name: 'eDaktari',
        natureLabel: 'Projet réalisé en équipe (Mission Freelance)',
        tech: 'Next.js 14',
        role: 'Consultant Software Engineer — Interfaces & Intégration Flux',
        hasRepo: false,
      },
      {
        slug: 'yello-edtech',
        name: 'Plateforme EdTech (Yello)',
        natureLabel: 'Projet réalisé pour un employeur (En équipe)',
        tech: 'Zustand',
        role: 'Senior Frontend Developer',
        hasRepo: false,
      },
      {
        slug: 'istamco',
        name: 'Istamco',
        natureLabel: 'Projet freelance (Mission de consultance)',
        tech: 'PostgreSQL',
        role: 'Consultant Développeur Full Stack',
        hasRepo: false,
      },
    ];

    testCases.forEach(({ slug, name, natureLabel, tech, role, hasRepo }) => {
      it(`renders detailed case study for /realisations/${slug} with all 11 required sections`, () => {
        render(
          <RouterProvider>
            <ProjectDetailPage slug={slug} />
          </RouterProvider>
        );

        // 1. Présentation du projet & Titre H1
        expect(screen.getByRole('heading', { level: 1, name })).toBeInTheDocument();

        // Nature du projet & délimitation de paternité
        expect(screen.getAllByText(natureLabel).length).toBeGreaterThanOrEqual(1);
        expect(screen.getByText(/Déclaration de transparence MusaTech/i)).toBeInTheDocument();

        // 2. Contexte métier
        expect(screen.getByText(/02 · Contexte Métier/i)).toBeInTheDocument();

        // 3. Problème à résoudre
        expect(screen.getByText(/03 · Problématique Clé/i)).toBeInTheDocument();

        // 4. Solution développée
        expect(screen.getByText(/04 · Solution Développée/i)).toBeInTheDocument();

        // 5. Fonctionnalités principales
        expect(screen.getByText(/05 · Fonctionnalités Principales/i)).toBeInTheDocument();

        // 6. Contribution personnelle exacte de Moussa Diagne
        expect(screen.getByText(/06 · Rôle Exact du Fondateur MusaTech/i)).toBeInTheDocument();
        expect(screen.getByText(`Rôle officiel : ${role}`)).toBeInTheDocument();

        // 7. Technologies utilisées
        expect(screen.getByText(/07 · Technologies Utilisées/i)).toBeInTheDocument();
        expect(screen.getByText(tech)).toBeInTheDocument();

        // 8. Défis techniques
        expect(screen.getByText(/08 · Défis Techniques/i)).toBeInTheDocument();

        // 9. Résultats vérifiés
        expect(screen.getByText(/09 · Résultats Vérifiés/i)).toBeInTheDocument();

        // 10. Captures ou démo autorisées
        expect(screen.getByText(/10 · Captures & Démonstrations/i)).toBeInTheDocument();
        if (hasRepo) {
          expect(screen.getByRole('link', { name: /Explorer le code GitHub/i })).toHaveAttribute(
            'href',
            'https://github.com/moussaDevw/assure-express'
          );
        }

        // 11. CTA vers /devis
        const quoteLinks = screen.getAllByRole('link', {
          name: /Demander un devis pour votre projet/i,
        });
        expect(quoteLinks.length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  describe('Responsive & Viewport Checks for Realisations Pages', () => {
    it('renders correctly on mobile (390px) and desktop (1440px)', () => {
      // Mobile
      window.innerWidth = 390;
      window.innerHeight = 844;
      window.dispatchEvent(new Event('resize'));

      const { unmount } = render(
        <RouterProvider>
          <ProjectDetailPage slug="assure-express" />
        </RouterProvider>
      );
      expect(screen.getByRole('heading', { level: 1, name: 'Assure Express' })).toBeInTheDocument();
      unmount();

      // Desktop
      window.innerWidth = 1440;
      window.innerHeight = 900;
      window.dispatchEvent(new Event('resize'));

      render(
        <RouterProvider>
          <ProjectDetailPage slug="yello-edtech" />
        </RouterProvider>
      );
      expect(screen.getByRole('heading', { level: 1, name: 'Plateforme EdTech (Yello)' })).toBeInTheDocument();
    });
  });
});
