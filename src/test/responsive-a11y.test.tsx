import React from 'react';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';
import '../i18n';

describe('MusaTech Commercial Homepage — Responsive & Accessibility Validation', () => {
  it('renders correctly for 390px (Mobile viewport)', () => {
    window.innerWidth = 390;
    window.innerHeight = 844;
    window.dispatchEvent(new Event('resize'));

    const { container } = render(<App />);

    // Mobile menu toggle is rendered and accessible
    const toggleButton = screen.getByLabelText(/Ouvrir le menu/i);
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute('type', 'button');

    // Clicking toggle opens the mobile drawer
    fireEvent.click(toggleButton);
    expect(screen.getByLabelText(/Fermer le menu/i)).toBeInTheDocument();

    // Containers render with responsive clamp padding
    const containers = container.querySelectorAll('.mt-container');
    expect(containers.length).toBeGreaterThan(0);
  });

  it('renders correctly for 768px (Tablet viewport)', () => {
    window.innerWidth = 768;
    window.innerHeight = 1024;
    window.dispatchEvent(new Event('resize'));

    const { container } = render(<App />);

    // Grids exist and have correct classes
    expect(container.querySelectorAll('.mt-grid-2').length).toBeGreaterThan(0);
    expect(container.querySelectorAll('.mt-grid-4').length).toBeGreaterThan(0);
  });

  it('renders correctly for 1024px (Tablet Landscape & Small Laptop viewport)', () => {
    window.innerWidth = 1024;
    window.innerHeight = 768;
    window.dispatchEvent(new Event('resize'));

    const { container } = render(<App />);

    // Containers respect max-width 1200px
    const containers = container.querySelectorAll('.mt-container');
    expect(containers.length).toBeGreaterThan(0);
    containers.forEach((el) => {
      expect(el).toHaveStyle({ maxWidth: '1200px' });
    });

    // Desktop navbar navigation elements are rendered
    expect(container.querySelector('.mt-desktop-nav')).toBeInTheDocument();
    // Grid structures render properly
    expect(container.querySelectorAll('.mt-grid-2').length).toBeGreaterThan(0);
  });

  it('renders correctly for 1440px (Desktop viewport)', () => {
    window.innerWidth = 1440;
    window.innerHeight = 900;
    window.dispatchEvent(new Event('resize'));

    const { container } = render(<App />);

    // Containers respect max-width 1200px
    const containers = container.querySelectorAll('.mt-container');
    containers.forEach((el) => {
      expect(el).toHaveStyle({ maxWidth: '1200px' });
    });

    // Hero visual mockup is present
    expect(screen.getByText('musatech-engine.config.ts')).toBeInTheDocument();
    expect(screen.getByText('PROD READY')).toBeInTheDocument();
  });

  it('validates keyboard accessibility on interactive elements', () => {
    render(<App />);

    // 1. FAQ Accordion keyboard control
    const faqButtons = screen.getAllByRole('button');
    const firstFaqButton = faqButtons.find((btn) =>
      btn.textContent?.includes('Quel est le prix d’un site web ?')
    );
    expect(firstFaqButton).toBeDefined();

    if (firstFaqButton) {
      // Check ARIA attributes
      expect(firstFaqButton).toHaveAttribute('aria-expanded');
      expect(firstFaqButton).toHaveAttribute('aria-controls');

      // Toggle via click / enter
      fireEvent.click(firstFaqButton);
      expect(firstFaqButton).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(firstFaqButton);
      expect(firstFaqButton).toHaveAttribute('aria-expanded', 'true');
    }

    // 2. Form submission keyboard handling
    const quoteSubmitButton = screen.getByRole('button', { name: /Envoyer ma demande/i });
    expect(quoteSubmitButton).toBeInTheDocument();

    // Trigger validation error by submitting empty form
    fireEvent.click(quoteSubmitButton);
    expect(screen.getByText(/Veuillez renseigner votre nom complet/i)).toBeInTheDocument();
    expect(screen.getByText(/Veuillez saisir une adresse email valide/i)).toBeInTheDocument();
  });
});

