/**
 * Vercel Serverless Function : Traitement et persistance des devis B2B MusaTech
 * Route : POST /api/devis (et POST /api/quote)
 *
 * Fonctionnalités :
 * 1. Vérification CORS et méthode POST
 * 2. Limitation de débit (Rate limiting IP)
 * 3. Validation Zod stricte du payload
 * 4. Protection Anti-Spam invisible (Honeypot)
 * 5. Persistance PostgreSQL via Prisma (Statut initial : NEW)
 * 6. Notification par email Moussa Diagne (MusaTech) via Resend
 * 7. Accusé de réception automatique au prospect via Resend
 * 8. Respect absolu de la vie privée (Zéro PII dans les logs)
 */

import { Resend } from 'resend';
import { getPrismaClient } from './_lib/prisma.js';
import {
  buildInternalNotificationEmail,
  buildProspectAcknowledgmentEmail,
  LeadEmailData,
} from './_lib/emailTemplates.js';
import { quoteFormSchema } from './_lib/quoteSchema.js';

// Interface minimale pour compatibilité Vercel / Node.js
interface VercelLikeRequest {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body: unknown;
  url?: string;
}

interface VercelLikeResponse {
  status: (code: number) => VercelLikeResponse;
  json: (data: unknown) => VercelLikeResponse;
  setHeader: (name: string, value: string) => VercelLikeResponse;
}

// In-memory rate limiting pour Vercel warm instances
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5; // Max 5 devis par IP / 15 min

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count += 1;
  return true;
}

export default async function handler(req: VercelLikeRequest, res: VercelLikeResponse) {
  // 1. CORS headers pour autoriser le frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).json({ ok: true });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      status: 'METHOD_NOT_ALLOWED',
      message: 'Seule la méthode POST est autorisée.',
    });
  }

  try {
    // 2. Récupération de l'IP pour le rate limiting
    const forwarded = req.headers?.['x-forwarded-for'];
    const clientIp = typeof forwarded === 'string'
      ? forwarded.split(',')[0].trim()
      : Array.isArray(forwarded)
      ? forwarded[0]
      : '127.0.0.1';

    if (!checkRateLimit(clientIp)) {
      // eslint-disable-next-line no-console
      console.warn('[MusaTech Security] Rate limit dépassé pour une requête.');
      return res.status(429).json({
        success: false,
        status: 'RATE_LIMITED',
        message: 'Trop de requêtes soumises. Veuillez patienter quelques instants.',
      });
    }

    // 3. Protection Anti-Spam Honeypot (trappe silencieuse avant analyse poussée)
    let rawBody: unknown;
    try {
      rawBody = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    } catch {
      rawBody = req.body;
    }

    const rawHoneypot = (rawBody as { honeypot?: string })?.honeypot;
    if (rawHoneypot && typeof rawHoneypot === 'string' && rawHoneypot.trim().length > 0) {
      // eslint-disable-next-line no-console
      console.warn('[MusaTech Security] Tentative de spam bot interceptée par le honeypot.');
      // Retour silencieux pour induire le robot en erreur
      return res.status(200).json({
        success: true,
        status: 'SUCCESS',
        message: 'Demande reçue.',
      });
    }

    // 4. Validation des données avec Zod
    const validation = quoteFormSchema.safeParse(rawBody);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        status: 'VALIDATION_ERROR',
        message: 'Données de formulaire invalides.',
        errors: validation.error.flatten().fieldErrors,
      });
    }

    const data = validation.data;
    const locale = (rawBody as { locale?: string })?.locale === 'en' ? 'en' : 'fr';

    // 5. Vérification de la configuration base de données
    const prisma = getPrismaClient();
    if (!prisma) {
      // eslint-disable-next-line no-console
      console.warn('[MusaTech API] DATABASE_URL non configuré.');
      return res.status(503).json({
        success: false,
        status: 'BACKEND_NOT_READY',
        message: 'Le système de base de données est en cours d’initialisation.',
      });
    }

    // 6. Enregistrement en base de données PostgreSQL
    let leadId = `lead_${Date.now()}`;
    let leadCreatedAt = new Date();

    try {
      const createdLead = await prisma.quoteLead.create({
        data: {
          name: data.fullName,
          email: data.email,
          company: data.company || null,
          phone: data.phone || null,
          country: data.country,
          industry: data.industry || null,
          serviceRequested: data.projectType,
          budget: data.budget || 'to_define',
          currency: data.currencyMode || 'XOF',
          timeline: data.timeline || 'flexible',
          description: data.description,
          locale,
          status: 'NEW',
        },
      });
      leadId = createdLead.id;
      leadCreatedAt = createdLead.createdAt;

      // Log sobre et respectueux de la vie privée (aucune PII)
      // eslint-disable-next-line no-console
      console.info('[MusaTech API] Nouveau prospect enregistré avec succès :', {
        leadId: createdLead.id,
        service: createdLead.serviceRequested,
        country: createdLead.country,
        currency: createdLead.currency,
        timestamp: createdLead.createdAt.toISOString(),
      });
    } catch (dbErr) {
      // eslint-disable-next-line no-console
      console.error('[MusaTech API] Erreur BDD PostgreSQL (continuation vers notification email) :', dbErr);
    }

    // 7. Envoi des emails via Resend (si clé configurée)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const emailFrom = process.env.EMAIL_FROM || 'MusaTech <contact@musatech.tech>';
        const notifyTo = process.env.NOTIFICATION_EMAIL_TO || 'musadev27@gmail.com';

        const emailPayload: LeadEmailData = {
          id: leadId,
          name: data.fullName,
          email: data.email,
          company: data.company || null,
          phone: data.phone || null,
          country: data.country,
          industry: data.industry || null,
          serviceRequested: data.projectType,
          budget: data.budget || 'to_define',
          currency: data.currencyMode || 'XOF',
          timeline: data.timeline || 'flexible',
          description: data.description,
          locale,
          createdAt: leadCreatedAt,
        };

        const internalEmail = buildInternalNotificationEmail(emailPayload);
        const prospectEmail = buildProspectAcknowledgmentEmail(emailPayload);

        // Envoi parallèle de la notification interne et de l'accusé de réception
        await Promise.allSettled([
          resend.emails.send({
            from: emailFrom,
            to: notifyTo,
            subject: internalEmail.subject,
            text: internalEmail.text,
            html: internalEmail.html,
          }),
          resend.emails.send({
            from: emailFrom,
            to: data.email,
            subject: prospectEmail.subject,
            text: prospectEmail.text,
            html: prospectEmail.html,
          }),
        ]);
      } catch (emailErr) {
        // eslint-disable-next-line no-console
        console.error('[MusaTech API] Avertissement : échec partiel d’envoi d’email :', emailErr);
      }
    }

    // 8. Réponse réussie
    return res.status(200).json({
      success: true,
      status: 'SUCCESS',
      leadId,
      message: locale === 'en'
        ? 'Your quote request has been transmitted successfully to Moussa Diagne. You will receive an acknowledgment email shortly.'
        : 'Votre demande de devis a été enregistrée avec succès. Un email de confirmation vient de vous être envoyé.',
    });
  } catch (fatalErr: unknown) {
    // eslint-disable-next-line no-console
    console.error('[MusaTech API Fatal Handler Error]:', fatalErr);
    const errMessage = fatalErr instanceof Error ? fatalErr.message : 'Erreur interne de traitement.';
    return res.status(500).json({
      success: false,
      status: 'SERVER_ERROR',
      message: errMessage,
    });
  }
}

