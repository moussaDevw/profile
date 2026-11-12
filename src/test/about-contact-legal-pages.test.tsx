import React from 'react';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AboutPage } from '../pages/AboutPage';
import { ContactPage } from '../pages/ContactPage';
import { LegalNoticePage } from '../pages/LegalNoticePage';
import { PrivacyPolicyPage } from '../pages/PrivacyPolicyPage';
import { RouterProvider } from '../lib/router';
import '../i18n';

describe('MusaTech About, Contact & Trust/Legal Pages', () => {
  describe('PAGE À PROPOS (/a-propos)', () => {
    it('renders founder presentation, verified experiences, expertise, and commitments with proper tone', () => {
      render(
        <RouterProvider>
          <AboutPage />
        </RouterProvider>
      );

      // Hero check
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: 'Un accompagnement direct, du premier échange à la mise en ligne.',
        })
      ).toBeInTheDocument();

      // Founder & Freelance identity check
      expect(screen.getAllByText(/Moussa Diagne/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText(/MusaTech/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText(/Freelance indépendant sous la marque MusaTech/i)).toBeInTheDocument();
      expect(screen.getByText(/Dakar, Sénégal \(Fuseau GMT \/ UTC\)/i)).toBeInTheDocument();

      // Non-agency disclaimer check
      expect(screen.getByText(/MusaTech n’est pas une grande agence anonyme/i)).toBeInTheDocument();

      // Verified experiences check
      expect(screen.getByText(/Senior Frontend Developer — EdTech & IA/i)).toBeInTheDocument();
      expect(screen.getByText(/Plateforme EdTech \(Yello\)/i)).toBeInTheDocument();
      expect(screen.getByText(/Istamco \(Transport international & Freight Forwarding\)/i)).toBeInTheDocument();
      expect(screen.getByText(/eDaktari \(Téléconsultation médicale Afrique × Europe\)/i)).toBeInTheDocument();

      // Skill domains check
      expect(screen.getByText('Back-End & Architecture Modulaire')).toBeInTheDocument();
      expect(screen.getByText('Front-End Réactif & Web Moderne')).toBeInTheDocument();
      expect(screen.getByText('Mobile & Intégrations Spécialisées')).toBeInTheDocument();

      // Quality commitments check
      expect(screen.getByText('Un interlocuteur technique unique')).toBeInTheDocument();
      expect(screen.getByText('Pleine propriété du code et des données')).toBeInTheDocument();

      // Remote collaboration check
      expect(screen.getByText(/Comment collaborons-nous à distance \?/i)).toBeInTheDocument();

      // CTAs check
      expect(screen.getByRole('link', { name: /Me contacter directement/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Demander un devis personnalisé/i })).toBeInTheDocument();
    });
  });

  describe('PAGE CONTACT (/contact)', () => {
    it('displays verified coordinates, channels, response guarantee, and handles short form submission', async () => {
      render(
        <RouterProvider>
          <ContactPage />
        </RouterProvider>
      );

      // Hero check
      expect(screen.getByText('Parlons de votre projet en toute simplicité.')).toBeInTheDocument();

      // Verified coordinates check
      expect(screen.getByText('musadev27@gmail.com')).toBeInTheDocument();
      expect(screen.getByText('+221 78 282 41 75')).toBeInTheDocument();
      expect(screen.getByText(/Dakar, Sénégal/i)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /GitHub/i })).toHaveAttribute(
        'href',
        'https://github.com/moussaDevw'
      );
      expect(screen.getByRole('link', { name: /LinkedIn/i })).toHaveAttribute(
        'href',
        'https://www.linkedin.com/in/moussa-diagne-b81226107/'
      );

      // Trust guarantees
      expect(screen.getByText('Réactivité sous 24h ouvrées')).toBeInTheDocument();
      expect(screen.getByText('Confidentialité absolue')).toBeInTheDocument();
      expect(screen.getByText('Premier échange gratuit')).toBeInTheDocument();

      // Short form submission
      fireEvent.change(screen.getByLabelText(/Votre nom complet/i), {
        target: { value: 'Amadou Fall' },
      });
      fireEvent.change(screen.getByLabelText(/Votre adresse email/i), {
        target: { value: 'amadou@entreprise.sn' },
      });
      fireEvent.change(screen.getByLabelText(/Votre message/i), {
        target: { value: 'Bonjour Moussa, je souhaite échanger pour un projet de plateforme.' },
      });

      fireEvent.click(screen.getByRole('button', { name: /Envoyer mon message/i }));

      await waitFor(() => {
        expect(screen.getByText('Message bien reçu !')).toBeInTheDocument();
      });
    });
  });

  describe('PAGES LÉGALES (/mentions-legales & /confidentialite)', () => {
    it('renders legal notice with editor, publication director, host, and compliance notice', () => {
      render(
        <RouterProvider>
          <LegalNoticePage />
        </RouterProvider>
      );

      expect(screen.getByRole('heading', { level: 1, name: 'Mentions Légales' })).toBeInTheDocument();
      expect(screen.getByText(/Information de conformité réglementaire/i)).toBeInTheDocument();
      expect(screen.getByText(/Moussa Diagne \(Développeur Full Stack indépendant\)/i)).toBeInTheDocument();
      expect(screen.getByText(/Vercel Inc./i)).toBeInTheDocument();
    });

    it('renders privacy policy with controller, collected data, retention, and rights', () => {
      render(
        <RouterProvider>
          <PrivacyPolicyPage />
        </RouterProvider>
      );

      expect(screen.getByRole('heading', { level: 1, name: 'Politique de Confidentialité' })).toBeInTheDocument();
      expect(screen.getAllByText(/Responsable du traitement/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText(/3 ans/i)).toBeInTheDocument();
      expect(screen.getByText(/Vercel Analytics/i)).toBeInTheDocument();
    });
  });

  describe('Responsive Viewport Checks for About & Contact', () => {
    it('renders properly on mobile (390px) and desktop (1440px)', () => {
      // Mobile
      window.innerWidth = 390;
      window.innerHeight = 844;
      window.dispatchEvent(new Event('resize'));

      const { unmount } = render(
        <RouterProvider>
          <AboutPage />
        </RouterProvider>
      );
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: 'Un accompagnement direct, du premier échange à la mise en ligne.',
        })
      ).toBeInTheDocument();
      unmount();

      // Desktop
      window.innerWidth = 1440;
      window.innerHeight = 900;
      window.dispatchEvent(new Event('resize'));

      render(
        <RouterProvider>
          <ContactPage />
        </RouterProvider>
      );
      expect(screen.getByText('Parlons de votre projet en toute simplicité.')).toBeInTheDocument();
    });
  });
});
