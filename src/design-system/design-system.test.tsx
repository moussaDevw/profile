import React from 'react';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Layers, Rocket, Shield } from 'lucide-react';
import {
  Container,
  SectionHeading,
  Button,
  LinkButton,
  ServiceCard,
  SolutionCard,
  ProjectCard,
  FormField,
  Input,
  Select,
  Textarea,
} from './index';

describe('MusaTech Design System Components', () => {
  describe('Container', () => {
    it('renders children with max-width 1200px style by default', () => {
      const { container } = render(
        <Container data-testid="container">
          <p>Content</p>
        </Container>
      );
      const element = container.querySelector('.mt-container');
      expect(element).toBeInTheDocument();
      expect(element).toHaveStyle({ maxWidth: '1200px' });
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders as custom element when as prop is passed', () => {
      const { container } = render(
        <Container as="section">
          <p>Section Content</p>
        </Container>
      );
      expect(container.querySelector('section.mt-container')).toBeInTheDocument();
    });
  });

  describe('SectionHeading', () => {
    it('renders tag, title and description', () => {
      render(
        <SectionHeading
          tag="Services"
          title="Nos Offres Clés"
          description="Des solutions digitales sur-mesure."
          align="center"
        />
      );
      expect(screen.getByText('Services')).toBeInTheDocument();
      expect(screen.getByText('Nos Offres Clés')).toBeInTheDocument();
      expect(screen.getByText('Des solutions digitales sur-mesure.')).toBeInTheDocument();
    });

    it('applies dark theme styling when theme="dark"', () => {
      render(
        <SectionHeading
          title="Section Sombre"
          theme="dark"
        />
      );
      const title = screen.getByText('Section Sombre');
      expect(title).toHaveStyle({ color: '#FFFFFF' });
    });
  });

  describe('Button & LinkButton', () => {
    it('renders with 48px minimum height and radius 10px', () => {
      render(<Button variant="primary">Bouton Action</Button>);
      const btn = screen.getByRole('button', { name: /Bouton Action/i });
      expect(btn).toBeInTheDocument();
      expect(btn).toHaveStyle({ minHeight: '48px', borderRadius: '10px' });
    });

    it('renders Cyan variant with Navy high-contrast text', () => {
      render(<Button variant="cyan">Demander un devis</Button>);
      const btn = screen.getByRole('button', { name: /Demander un devis/i });
      expect(btn).toHaveStyle({
        backgroundColor: '#19B8CD',
        color: '#0B1730',
      });
    });

    it('disables button when disabled prop is provided', () => {
      render(<Button disabled>Action Désactivée</Button>);
      const btn = screen.getByRole('button', { name: /Action Désactivée/i });
      expect(btn).toBeDisabled();
      expect(btn).toHaveStyle({ cursor: 'not-allowed', opacity: '0.5' });
    });

    it('renders LinkButton with correct href', () => {
      render(<LinkButton href="/devis" variant="cyan">Obtenir une offre</LinkButton>);
      const link = screen.getByRole('link', { name: /Obtenir une offre/i });
      expect(link).toHaveAttribute('href', '/devis');
    });
  });

  describe('ServiceCard', () => {
    it('renders service information, price badge, and deliverables', () => {
      render(
        <ServiceCard
          icon={<Layers data-testid="service-icon" />}
          title="Sites Web Professionnels"
          description="Conception de vitrines modernes et rapides."
          startingPrice="À partir de 250 000 FCFA"
          deliverables={['Design responsive', 'Optimisation SEO', 'Sécurité SSL']}
          featured={true}
        />
      );
      expect(screen.getByText('Sites Web Professionnels')).toBeInTheDocument();
      expect(screen.getByText('À partir de 250 000 FCFA')).toBeInTheDocument();
      expect(screen.getByText('Design responsive')).toBeInTheDocument();
      expect(screen.getByText(/Recommandé/i)).toBeInTheDocument();
    });
  });

  describe('SolutionCard', () => {
    it('renders sector tag, problem and feature pills', () => {
      render(
        <SolutionCard
          sector="Immobilier"
          icon={<Shield data-testid="sol-icon" />}
          title="Catalogue & Gestion Immobilière"
          problem="Processus manuels dispersés sur WhatsApp."
          features={['Géolocalisation', 'Paiement Wave', 'Multi-agences']}
        />
      );
      expect(screen.getByText('Immobilier')).toBeInTheDocument();
      expect(screen.getByText('Catalogue & Gestion Immobilière')).toBeInTheDocument();
      expect(screen.getByText(/Processus manuels dispersés/i)).toBeInTheDocument();
      expect(screen.getByText('Géolocalisation')).toBeInTheDocument();
    });
  });

  describe('ProjectCard', () => {
    it('renders project metadata, impact metric and tech stack', () => {
      render(
        <ProjectCard
          name="Assure Express"
          client="Assurance automobile mobile"
          category="InsurTech"
          year="2025"
          impactMetric="Architecture NestJS & Redis"
          summary="Application mobile iOS & Android de souscription."
          stack={['NestJS', 'React Native', 'PostgreSQL']}
        />
      );
      expect(screen.getByText('Assure Express')).toBeInTheDocument();
      expect(screen.getByText('InsurTech')).toBeInTheDocument();
      expect(screen.getByText('Architecture NestJS & Redis')).toBeInTheDocument();
      expect(screen.getByText('NestJS')).toBeInTheDocument();
      expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
    });
  });

  describe('Form Components', () => {
    it('renders FormField with label, hint and error', () => {
      render(
        <FormField label="Email professionnel" id="email" required hint="Votre adresse pro" error="Email invalide">
          <Input id="email" error={true} defaultValue="invalid-email" />
        </FormField>
      );
      expect(screen.getByText(/Email professionnel/i)).toBeInTheDocument();
      expect(screen.getByText('Email invalide')).toBeInTheDocument();
      const input = screen.getByDisplayValue('invalid-email');
      expect(input).toHaveStyle({ border: '1.5px solid #D9383A' });
    });

    it('renders Select with options and placeholder', () => {
      render(
        <Select
          id="service"
          placeholder="Sélectionnez un service"
          options={[
            { label: 'Site web', value: 'web' },
            { label: 'Application mobile', value: 'mobile' },
          ]}
        />
      );
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.getByText('Site web')).toBeInTheDocument();
      expect(screen.getByText('Application mobile')).toBeInTheDocument();
    });

    it('renders Textarea with custom rows', () => {
      render(<Textarea id="description" rows={5} placeholder="Votre besoin..." />);
      const textarea = screen.getByPlaceholderText('Votre besoin...');
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveAttribute('rows', '5');
    });
  });
});
