import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import handler from '../../api/devis';
import {
  buildInternalNotificationEmail,
  buildProspectAcknowledgmentEmail,
  LeadEmailData,
} from '../../api/_lib/emailTemplates';

describe('MusaTech Serverless Backend Pipeline (/api/devis)', () => {
  const sampleLead: LeadEmailData = {
    id: 'lead-test-123',
    name: 'Moussa Test',
    email: 'moussa@example.com',
    company: 'Test SARL',
    phone: '+221 77 123 45 67',
    country: 'Sénégal',
    industry: 'Services financiers & Fintech',
    serviceRequested: 'Plateforme métier',
    budget: '1 500 000 à 5 000 000 FCFA',
    currency: 'XOF',
    timeline: '1 à 3 mois',
    description: 'Développement d’une application de microfinance avec intégration Wave et Orange Money.',
    locale: 'fr',
    createdAt: new Date('2026-11-05T10:00:00Z'),
  };

  describe('Email Templates Generation', () => {
    it('generates internal notification email with WhatsApp link and full details', () => {
      const { subject, text, html } = buildInternalNotificationEmail(sampleLead);

      expect(subject).toContain('[Nouveau Devis]');
      expect(subject).toContain(sampleLead.name);
      expect(subject).toContain(sampleLead.country);

      expect(text).toContain('NOUVELLE DEMANDE DE DEVIS QUALIFIÉE');
      expect(text).toContain('https://wa.me/221771234567');
      expect(text).toContain(sampleLead.email);

      expect(html).toContain('MusaTech');
      expect(html).toContain('lead-test-123');
      expect(html).toContain('NEW');
    });

    it('generates prospect acknowledgment email in French', () => {
      const { subject, text, html } = buildProspectAcknowledgmentEmail(sampleLead);

      expect(subject).toBe('Confirmation de votre demande de devis — MusaTech');
      expect(text).toContain('Bonjour Moussa Test');
      expect(text).toContain('24 à 48 heures ouvrées');
      expect(html).toContain('+221 78 010 54 26');
    });

    it('generates prospect acknowledgment email in English when locale is en', () => {
      const englishLead: LeadEmailData = {
        ...sampleLead,
        name: 'John Doe',
        locale: 'en',
      };

      const { subject, text, html } = buildProspectAcknowledgmentEmail(englishLead);

      expect(subject).toBe('Confirmation of your quote request — MusaTech');
      expect(text).toContain('Hello John Doe');
      expect(text).toContain('24 to 48 business hours');
      expect(html).toContain('Project Summary');
    });
  });

  describe('Serverless Handler (/api/devis)', () => {
    const originalEnv = process.env.DATABASE_URL;

    beforeEach(() => {
      delete process.env.DATABASE_URL;
    });

    afterEach(() => {
      if (originalEnv) {
        process.env.DATABASE_URL = originalEnv;
      }
    });

    function createMockRes() {
      const res: {
        statusCode: number;
        data: unknown;
        headers: Record<string, string>;
        status: (code: number) => typeof res;
        json: (data: unknown) => typeof res;
        setHeader: (name: string, value: string) => typeof res;
      } = {
        statusCode: 200,
        data: null,
        headers: {},
        status(code: number) {
          this.statusCode = code;
          return this;
        },
        json(data: unknown) {
          this.data = data;
          return this;
        },
        setHeader(name: string, value: string) {
          this.headers[name] = value;
          return this;
        },
      };
      return res;
    }

    it('responds with 200 to CORS OPTIONS preflight', async () => {
      const req = {
        method: 'OPTIONS',
        headers: {},
        body: null,
      };
      const res = createMockRes();

      await handler(req, res);

      expect(res.statusCode).toBe(200);
      expect(res.headers['Access-Control-Allow-Origin']).toBe('*');
    });

    it('rejects non-POST HTTP methods with 405 Method Not Allowed', async () => {
      const req = {
        method: 'GET',
        headers: {},
        body: null,
      };
      const res = createMockRes();

      await handler(req, res);

      expect(res.statusCode).toBe(405);
      expect((res.data as { status: string }).status).toBe('METHOD_NOT_ALLOWED');
    });

    it('rejects invalid payloads with 400 Validation Error', async () => {
      const req = {
        method: 'POST',
        headers: {},
        body: {
          fullName: 'A', // too short (< 2)
          email: 'invalid-email',
        },
      };
      const res = createMockRes();

      await handler(req, res);

      expect(res.statusCode).toBe(400);
      expect((res.data as { status: string }).status).toBe('VALIDATION_ERROR');
    });

    it('silently traps bot spam when honeypot is filled', async () => {
      const req = {
        method: 'POST',
        headers: {},
        body: {
          fullName: 'Spam Bot',
          email: 'bot@spam.com',
          country: 'SN',
          projectType: 'sites-web',
          description: 'This is a valid length description with more than 20 characters.',
          consentPrivacy: true,
          honeypot: 'http://spam-link.com',
        },
      };
      const res = createMockRes();

      await handler(req, res);

      // Trappe silencieuse : statut 200 renvoyé au bot sans enregistrement
      expect(res.statusCode).toBe(200);
      expect((res.data as { success: boolean }).success).toBe(true);
    });

    it('returns 503 BACKEND_NOT_READY when DATABASE_URL is not configured', async () => {
      const req = {
        method: 'POST',
        headers: {},
        body: {
          fullName: 'Amadou Fall',
          email: 'amadou.fall@example.sn',
          country: 'Sénégal',
          projectType: 'logiciels-metier',
          budget: '1m5_5m',
          currencyMode: 'XOF',
          description: 'Besoin d’un logiciel de gestion de stock et de facturation pour notre entrepôt.',
          consentPrivacy: true,
          honeypot: '',
        },
      };
      const res = createMockRes();

      await handler(req, res);

      expect(res.statusCode).toBe(503);
      expect((res.data as { status: string }).status).toBe('BACKEND_NOT_READY');
    });
  });
});

