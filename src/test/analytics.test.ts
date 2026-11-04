import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  trackEvent,
  trackQuoteStarted,
  trackQuoteSubmitted,
  trackContactClicked,
  trackServiceViewed,
  trackProjectViewed,
  sanitizeProperties,
  isConsentGranted,
  setAnalyticsConsent,
  getAnalyticsEventLog,
  clearAnalyticsEventLog,
} from '../lib/analytics';

describe('MusaTech Privacy-First Analytics Module', () => {
  beforeEach(() => {
    clearAnalyticsEventLog();
    localStorage.clear();
  });

  describe('Strict PII Sanitization (Zero Personal Data Guarantee)', () => {
    it('strips all personal data fields: names, emails, phones, descriptions, and messages', () => {
      const maliciousPayload = {
        fullName: 'Moussa Diagne',
        name: 'John Doe',
        email: 'client@example.com',
        phone: '+221 77 123 45 67',
        whatsapp: '+221771234567',
        description: 'Projet confidentiel pour une banque',
        message: 'Mon budget est secret',
        notes: 'Détails personnels',
        // Données anonymes autorisées
        service: 'sites-web',
        budget: '500k_1m5',
        currency: 'XOF',
        country: 'Sénégal',
        hasCompany: true,
      };

      const sanitized = sanitizeProperties(maliciousPayload);

      // Vérifier que tous les champs PII ont été éliminés
      expect(sanitized).not.toHaveProperty('fullName');
      expect(sanitized).not.toHaveProperty('name');
      expect(sanitized).not.toHaveProperty('email');
      expect(sanitized).not.toHaveProperty('phone');
      expect(sanitized).not.toHaveProperty('whatsapp');
      expect(sanitized).not.toHaveProperty('description');
      expect(sanitized).not.toHaveProperty('message');
      expect(sanitized).not.toHaveProperty('notes');

      // Vérifier que les métriques commerciales anonymes sont conservées
      expect(sanitized).toEqual({
        service: 'sites-web',
        budget: '500k_1m5',
        currency: 'XOF',
        country: 'Sénégal',
        hasCompany: true,
      });
    });

    it('rejects values that match email or phone patterns even under arbitrary keys', () => {
      const sneakyPayload = {
        custom_field_1: 'secret-email@domain.com',
        custom_field_2: '+221770000000',
        allowed_category: 'real-estate',
      };

      const sanitized = sanitizeProperties(sneakyPayload);
      expect(sanitized).not.toHaveProperty('custom_field_1');
      expect(sanitized).not.toHaveProperty('custom_field_2');
      expect(sanitized).toHaveProperty('allowed_category', 'real-estate');
    });
  });

  describe('Required Conversion Events Dispatch', () => {
    it('tracks quote_started without sensitive data', () => {
      trackQuoteStarted({ service: 'logiciels-metier', source: 'homepage_hero' });

      const log = getAnalyticsEventLog();
      expect(log).toHaveLength(1);
      expect(log[0].event).toBe('quote_started');
      expect(log[0].properties).toEqual({
        service: 'logiciels-metier',
        source: 'homepage_hero',
      });
    });

    it('tracks quote_submitted with only anonymous business attributes', () => {
      trackQuoteSubmitted({
        service: 'applications-mobiles',
        budget: '1m5_5m',
        currency: 'XOF',
        country: 'Sénégal',
        hasCompany: true,
        locale: 'fr',
      });

      const log = getAnalyticsEventLog();
      expect(log).toHaveLength(1);
      expect(log[0].event).toBe('quote_submitted');
      expect(log[0].properties).toEqual({
        service: 'applications-mobiles',
        budget: '1m5_5m',
        currency: 'XOF',
        country: 'Sénégal',
        hasCompany: true,
        locale: 'fr',
      });
    });

    it('tracks contact_clicked for whatsapp and direct communication channels', () => {
      trackContactClicked({ channel: 'whatsapp', context: 'header_cta', locale: 'fr' });
      trackContactClicked({ channel: 'email', context: 'contact_page', locale: 'fr' });

      const log = getAnalyticsEventLog();
      expect(log).toHaveLength(2);
      expect(log[0].event).toBe('contact_clicked');
      expect(log[0].properties).toEqual({ channel: 'whatsapp', context: 'header_cta', locale: 'fr' });
      expect(log[1].event).toBe('contact_clicked');
      expect(log[1].properties).toEqual({ channel: 'email', context: 'contact_page', locale: 'fr' });
    });

    it('tracks service_viewed and project_viewed', () => {
      trackServiceViewed({ serviceSlug: 'sites-web', locale: 'fr' });
      trackProjectViewed({ projectSlug: 'assure-express', locale: 'fr' });

      const log = getAnalyticsEventLog();
      expect(log).toHaveLength(2);
      expect(log[0].event).toBe('service_viewed');
      expect(log[0].properties).toEqual({ serviceSlug: 'sites-web', locale: 'fr' });
      expect(log[1].event).toBe('project_viewed');
      expect(log[1].properties).toEqual({ projectSlug: 'assure-express', locale: 'fr' });
    });
  });

  describe('User Consent & Do-Not-Track Compliance', () => {
    it('respects denied consent from user settings', () => {
      setAnalyticsConsent(false);
      expect(isConsentGranted()).toBe(false);

      trackEvent('service_viewed', { serviceSlug: 'e-commerce' });
      expect(getAnalyticsEventLog()).toHaveLength(0);
    });

    it('allows tracking when explicit consent is granted', () => {
      setAnalyticsConsent(true);
      expect(isConsentGranted()).toBe(true);

      trackEvent('service_viewed', { serviceSlug: 'e-commerce' });
      expect(getAnalyticsEventLog()).toHaveLength(1);
    });
  });
});

