import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';
import './i18n';

describe('MusaTech Commercial Homepage Smoke Tests', () => {
  it('renders without crashing and mounts all 10 commercial sections', () => {
    const { container } = render(<App />);

    // Brand and founder check
    expect(screen.getAllByText(/MusaTech/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Moussa Diagne/i).length).toBeGreaterThan(0);
    expect(screen.getByRole('main')).toBeInTheDocument();

    // H1 Unique check
    const h1Elements = container.querySelectorAll('h1');
    expect(h1Elements.length).toBe(1);
    expect(h1Elements[0]).toHaveTextContent(
      'Des solutions digitales qui font avancer votre entreprise.'
    );

    // Section IDs check
    expect(container.querySelector('#problemes')).toBeInTheDocument();
    expect(container.querySelector('#services')).toBeInTheDocument();
    expect(container.querySelector('#solutions')).toBeInTheDocument();
    expect(container.querySelector('#realisations')).toBeInTheDocument();
    expect(container.querySelector('#methode')).toBeInTheDocument();
    expect(container.querySelector('#a-propos')).toBeInTheDocument();
    expect(container.querySelector('#faq')).toBeInTheDocument();
    expect(container.querySelector('#devis')).toBeInTheDocument();

    // Key services check (can appear in section and footer)
    expect(screen.getAllByText('Sites web professionnels').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Sites e-commerce').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Plateformes & logiciels métier').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Applications mobiles').length).toBeGreaterThanOrEqual(1);

    // Realistic projects check
    expect(screen.getByText('Assure Express')).toBeInTheDocument();
    expect(screen.getByText('eDaktari')).toBeInTheDocument();
    expect(screen.getByText(/Plateforme EdTech/i)).toBeInTheDocument();

    // Pricing disclaimer check
    expect(
      screen.getByText(
        /Tarifs de départ pour un périmètre défini. Chaque projet fait l’objet d’un devis personnalisé./i
      )
    ).toBeInTheDocument();
  }, 15000);
});
