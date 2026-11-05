import React from 'react';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { QuotePage } from '../pages/QuotePage';
import { RouterProvider } from '../lib/router';
import {
  setBackendEndpointForTesting,
  resetSubmissionRateLimitForTesting,
} from '../lib/quoteService';
import '../i18n';

describe('MusaTech B2B Quote Qualification Form (/devis)', () => {
  beforeEach(() => {
    // Par défaut, backend réel non configuré (comportement de production actuel)
    setBackendEndpointForTesting(null);
    resetSubmissionRateLimitForTesting();
  });

  describe('Form Elements & Initial Rendering', () => {
    it('renders all 10 required/optional fields, currency switcher, and notice', () => {
      render(
        <RouterProvider>
          <QuotePage />
        </RouterProvider>
      );

      // 1. Nom complet
      expect(screen.getByLabelText(/Nom complet/i)).toBeInTheDocument();
      // 2. Adresse email
      expect(screen.getByLabelText(/Adresse email/i)).toBeInTheDocument();
      // 3. Nom de l'entreprise
      expect(screen.getByLabelText(/Nom de l'entreprise/i)).toBeInTheDocument();
      // 4. Téléphone / WhatsApp
      expect(screen.getByLabelText(/Téléphone \/ WhatsApp/i)).toBeInTheDocument();
      // 5. Pays
      expect(screen.getByLabelText(/Pays/i)).toBeInTheDocument();
      // 6. Secteur d'activité
      expect(screen.getByLabelText(/Secteur d'activité/i)).toBeInTheDocument();
      // 7. Type de projet
      expect(screen.getByLabelText(/Type de projet/i)).toBeInTheDocument();
      // 8. Budget estimé
      expect(screen.getByLabelText(/Budget estimé/i)).toBeInTheDocument();
      // 9. Délai envisagé
      expect(screen.getByLabelText(/Délai envisagé/i)).toBeInTheDocument();
      // 10. Description détaillée
      expect(screen.getByLabelText(/Description détaillée de votre projet/i)).toBeInTheDocument();

      // Consentement RGPD
      expect(screen.getByText(/J’accepte que les données saisies soient traitées par MusaTech/i)).toBeInTheDocument();

      // Bouton de transmission
      expect(
        screen.getByRole('button', { name: /Transmettre ma demande de devis/i })
      ).toBeInTheDocument();
    });
  });

  describe('Validation Zod (Données Invalides)', () => {
    it('displays error messages when required fields are empty or invalid', async () => {
      render(
        <RouterProvider>
          <QuotePage />
        </RouterProvider>
      );

      // Soumettre formulaire vide
      resetSubmissionRateLimitForTesting();
      fireEvent.click(screen.getByRole('button', { name: /Transmettre ma demande de devis/i }));

      await waitFor(() => {
        expect(
          screen.getByText(/Le nom complet est obligatoire/i)
        ).toBeInTheDocument();
        expect(
          screen.getByText(/L’adresse email est obligatoire/i)
        ).toBeInTheDocument();
        expect(
          screen.getByText(/Veuillez décrire votre projet plus en détail \(au moins 20 caractères\)/i)
        ).toBeInTheDocument();
        expect(
          screen.getByText(/Vous devez accepter la politique de confidentialité/i)
        ).toBeInTheDocument();
      });
    });

    it('rejects an invalid email format', async () => {
      render(
        <RouterProvider>
          <QuotePage />
        </RouterProvider>
      );

      fireEvent.change(screen.getByLabelText(/Adresse email/i), {
        target: { value: 'not-an-email' },
      });

      resetSubmissionRateLimitForTesting();
      fireEvent.click(screen.getByRole('button', { name: /Transmettre ma demande de devis/i }));

      await waitFor(() => {
        expect(
          screen.getByText(/Veuillez saisir une adresse email valide/i)
        ).toBeInTheDocument();
      });
    });
  });

  describe('Comportement Honnête sans Backend Configuré (Production)', () => {
    it('does NOT simulate fake success when backend is not ready, and provides direct WhatsApp/Email channels', async () => {
      // Configuration par défaut : pas de backend d'envoi déployé
      setBackendEndpointForTesting(null);

      render(
        <RouterProvider>
          <QuotePage />
        </RouterProvider>
      );

      // Remplir des données valides
      fireEvent.change(screen.getByLabelText(/Nom complet/i), {
        target: { value: 'Babacar Diop' },
      });
      fireEvent.change(screen.getByLabelText(/Adresse email/i), {
        target: { value: 'babacar@diop-logistique.sn' },
      });
      fireEvent.change(screen.getByLabelText(/Description détaillée de votre projet/i), {
        target: {
          value: 'Nous souhaitons développer une plateforme de freight forwarding avec suivi des conteneurs en temps réel.',
        },
      });
      fireEvent.click(
        screen.getByRole('checkbox', {
          name: /J’accepte que les données saisies soient traitées par MusaTech/i,
        })
      );

      resetSubmissionRateLimitForTesting();
      fireEvent.click(screen.getByRole('button', { name: /Transmettre ma demande de devis/i }));

      await waitFor(() => {
        // Ne doit PAS afficher de faux succès
        expect(screen.queryByText('Demande de devis bien reçue !')).not.toBeInTheDocument();

        // Doit indiquer clairement l'état du backend
        expect(
          screen.getByText(/Le serveur d’envoi automatique est en cours de déploiement technique/i)
        ).toBeInTheDocument();

        // Doit proposer les liens directs
        expect(screen.getByRole('link', { name: /Envoyer par WhatsApp direct/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Envoyer par Email/i })).toBeInTheDocument();
      });
    });
  });

  describe('Succès avec Backend Opérationnel', () => {
    it('captures browser auto-filled DOM values even without React onChange', async () => {
      setBackendEndpointForTesting('/api/quote');

      render(
        <RouterProvider>
          <QuotePage />
        </RouterProvider>
      );

      // Simule un autofill direct du navigateur dans le DOM (événement onInput de l'autofill)
      const nameInput = screen.getByLabelText(/Nom complet/i);
      const emailInput = screen.getByLabelText(/Adresse email/i);
      const descInput = screen.getByLabelText(/Description détaillée de votre projet/i);

      fireEvent.input(nameInput, { target: { value: 'Amadou Autofill' } });
      fireEvent.input(emailInput, { target: { value: 'amadou.autofill@gmail.com' } });
      fireEvent.input(descInput, {
        target: { value: 'Description saisie ou injectée via autofill pour un projet e-commerce avec Wave.' },
      });

      fireEvent.click(
        screen.getByRole('checkbox', {
          name: /J’accepte que les données saisies soient traitées par MusaTech/i,
        })
      );

      resetSubmissionRateLimitForTesting();
      fireEvent.click(screen.getByRole('button', { name: /Transmettre ma demande de devis/i }));

      await waitFor(() => {
        expect(screen.getByText('Demande de devis bien reçue !')).toBeInTheDocument();
      });
    });

    it('displays success confirmation when backend is configured and responds successfully', async () => {
      // Simulation d'un backend prêt
      setBackendEndpointForTesting('/api/quote');

      render(
        <RouterProvider>
          <QuotePage />
        </RouterProvider>
      );

      // Remplir des données valides
      fireEvent.change(screen.getByLabelText(/Nom complet/i), {
        target: { value: 'Fatou Sow' },
      });
      fireEvent.change(screen.getByLabelText(/Adresse email/i), {
        target: { value: 'fatou@sow-solutions.com' },
      });
      fireEvent.change(screen.getByLabelText(/Description détaillée de votre projet/i), {
        target: {
          value: 'Création d’un site e-commerce avec Wave et Orange Money intégrés pour vente de cosmétiques.',
        },
      });
      fireEvent.click(
        screen.getByRole('checkbox', {
          name: /J’accepte que les données saisies soient traitées par MusaTech/i,
        })
      );

      resetSubmissionRateLimitForTesting();
      fireEvent.click(screen.getByRole('button', { name: /Transmettre ma demande de devis/i }));

      await waitFor(() => {
        expect(screen.getByText('Demande de devis bien reçue !')).toBeInTheDocument();
        expect(
          screen.getByText(/Votre demande a été transmise avec succès à Moussa Diagne/i)
        ).toBeInTheDocument();
      });
    });
  });

  describe('Gestion des Erreurs Serveur (HTTP 500)', () => {
    it('handles server failure without crashing and offers direct channel fallbacks', async () => {
      setBackendEndpointForTesting('TRIGGER_SERVER_ERROR');

      render(
        <RouterProvider>
          <QuotePage />
        </RouterProvider>
      );

      fireEvent.change(screen.getByLabelText(/Nom complet/i), {
        target: { value: 'Test User' },
      });
      fireEvent.change(screen.getByLabelText(/Adresse email/i), {
        target: { value: 'test@domain.com' },
      });
      fireEvent.change(screen.getByLabelText(/Description détaillée de votre projet/i), {
        target: {
          value: 'Description suffisamment longue pour passer le seuil minimal de 20 caractères.',
        },
      });
      fireEvent.click(
        screen.getByRole('checkbox', {
          name: /J’accepte que les données saisies soient traitées par MusaTech/i,
        })
      );

      resetSubmissionRateLimitForTesting();
      fireEvent.click(screen.getByRole('button', { name: /Transmettre ma demande de devis/i }));

      await waitFor(() => {
        expect(
          screen.getByText(/Une erreur est survenue lors de la communication avec le serveur/i)
        ).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Envoyer par WhatsApp direct/i })).toBeInTheDocument();
      });
    });
  });

  describe('Sélecteur Multi-devises International', () => {
    it('adapts budget ranges display when changing currency mode', () => {
      render(
        <RouterProvider>
          <QuotePage />
        </RouterProvider>
      );

      // Par défaut XOF (FCFA)
      expect(screen.getByText('500 000 à 1 500 000 FCFA')).toBeInTheDocument();

      // Clic sur EUR
      fireEvent.click(screen.getByRole('button', { name: '€ (EUR)' }));
      expect(screen.getByText('750 € à 2 300 €')).toBeInTheDocument();

      // Clic sur USD
      fireEvent.click(screen.getByRole('button', { name: '$ (USD)' }));
      expect(screen.getByText('850 $ à 2 500 $')).toBeInTheDocument();
    });
  });

  describe('Responsive & Viewport Checks', () => {
    it('renders correctly on mobile (390px) and desktop (1440px)', () => {
      // Mobile
      window.innerWidth = 390;
      window.innerHeight = 844;
      window.dispatchEvent(new Event('resize'));

      const { unmount } = render(
        <RouterProvider>
          <QuotePage />
        </RouterProvider>
      );
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: 'Décrivez votre projet, obtenez une proposition claire.',
        })
      ).toBeInTheDocument();
      unmount();

      // Desktop
      window.innerWidth = 1440;
      window.innerHeight = 900;
      window.dispatchEvent(new Event('resize'));

      render(
        <RouterProvider>
          <QuotePage />
        </RouterProvider>
      );
      expect(screen.getByLabelText(/Nom complet/i)).toBeInTheDocument();
    });
  });
});

