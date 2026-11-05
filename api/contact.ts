/**
 * Vercel Serverless Function : Réception des messages de contact direct
 * Route : POST /api/contact
 */
import { Resend } from 'resend';
import { getPrismaClient } from './_lib/prisma';

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

export default async function handler(req: VercelLikeRequest, res: VercelLikeResponse) {
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
    let rawBody: unknown;
    try {
      rawBody = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    } catch {
      rawBody = req.body;
    }

    const bodyObj = (rawBody || {}) as {
      fullName?: string;
      email?: string;
      phone?: string;
      subject?: string;
      message?: string;
      honeypot?: string;
      locale?: string;
    };

    // Protection anti-spam Honeypot
    if (bodyObj.honeypot && bodyObj.honeypot.trim().length > 0) {
      return res.status(200).json({ success: true, message: 'Message reçu.' });
    }

    const fullName = bodyObj.fullName?.trim() || '';
    const email = bodyObj.email?.trim() || '';
    const phone = bodyObj.phone?.trim() || '';
    const subject = bodyObj.subject?.trim() || '';
    const message = bodyObj.message?.trim() || '';
    const locale = bodyObj.locale === 'en' ? 'en' : 'fr';

    if (!fullName || !email || !message || message.length < 10) {
      return res.status(400).json({
        success: false,
        message: locale === 'en' ? 'Required fields missing or invalid.' : 'Informations obligatoires incomplètes.',
      });
    }

    // 1. Enregistrement en base de données PostgreSQL via Prisma
    const prisma = getPrismaClient();
    if (prisma) {
      try {
        await prisma.quoteLead.create({
          data: {
            name: fullName,
            email,
            phone: phone || null,
            country: 'Contact Direct',
            serviceRequested: subject ? `Contact: ${subject}` : 'Contact: Message direct',
            budget: 'Contact',
            description: message,
            locale,
            status: 'NEW',
          },
        });
      } catch (dbErr) {
        console.error('[MusaTech Contact API DB Error]:', dbErr);
      }
    }

    // 2. Envoi d'email de notification via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const emailFrom = process.env.EMAIL_FROM || 'MusaTech <contact@musatech.tech>';
        const notifyTo = process.env.NOTIFICATION_EMAIL_TO || 'musadev27@gmail.com';

        const digits = phone.replace(/\D/g, '');
        const waLink = digits.length >= 7 ? `https://wa.me/${digits}` : null;

        await resend.emails.send({
          from: emailFrom,
          to: notifyTo,
          subject: `[Message Contact] ${subject || 'Prise de contact'} — ${fullName}`,
          text: `
NOUVEAU MESSAGE DE CONTACT — MUSATECH
======================================
Nom : ${fullName}
Email : ${email}
Téléphone : ${phone || 'Non renseigné'}
Sujet : ${subject || 'Non spécifié'}
Langue : ${locale.toUpperCase()}

MESSAGE :
--------------------------------------
${message}
--------------------------------------

${waLink ? `WhatsApp direct : ${waLink}` : ''}
`.trim(),
          html: `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0b0f19; color: #f3f4f6; margin: 0; padding: 24px;">
  <div style="max-width: 600px; margin: 0 auto; background: #111827; border: 1px solid #1f2937; border-radius: 12px; overflow: hidden;">
    <div style="background: linear-gradient(135deg, #0d1527 0%, #1e1b4b 100%); padding: 20px 24px; border-bottom: 1px solid #374151;">
      <span style="display: inline-block; background: rgba(56, 189, 248, 0.15); color: #38bdf8; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 10px; border-radius: 9999px;">Message Contact • MusaTech</span>
      <h1 style="font-size: 18px; color: #ffffff; margin: 10px 0 0 0;">${subject || 'Prise de contact directe'}</h1>
    </div>
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 14px;">
        <tr><td style="color: #9ca3af; padding: 6px 0;">Nom complet :</td><td style="color: #f9fafb; font-weight: 600;">${fullName}</td></tr>
        <tr><td style="color: #9ca3af; padding: 6px 0;">Email :</td><td><a href="mailto:${email}" style="color: #38bdf8;">${email}</a></td></tr>
        <tr><td style="color: #9ca3af; padding: 6px 0;">Téléphone :</td><td style="color: #f9fafb;">${phone || 'Non renseigné'}</td></tr>
      </table>
      <h3 style="font-size: 13px; text-transform: uppercase; color: #9ca3af; margin: 16px 0 8px 0;">Message transmis :</h3>
      <div style="background: #0b0f19; border: 1px solid #374151; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #e5e7eb; white-space: pre-wrap;">${message}</div>
      <div style="margin-top: 24px; text-align: center;">
        <a href="mailto:${email}" style="display: inline-block; background: #2563eb; color: #ffffff; padding: 10px 18px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; margin: 4px;">✉ Répondre par Email</a>
        ${waLink ? `<a href="${waLink}" target="_blank" style="display: inline-block; background: #22c55e; color: #ffffff; padding: 10px 18px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; margin: 4px;">💬 Ouvrir sur WhatsApp</a>` : ''}
      </div>
    </div>
  </div>
</body>
</html>
`.trim(),
        });
      } catch (mailErr) {
        console.error('[MusaTech Contact API Email Error]:', mailErr);
      }
    }

    return res.status(200).json({
      success: true,
      message: locale === 'en'
        ? 'Thank you! Your message has been transmitted successfully.'
        : 'Merci ! Votre message a bien été transmis à Moussa Diagne.',
    });
  } catch (fatalErr) {
    console.error('[MusaTech Contact API Fatal Error]:', fatalErr);
    return res.status(500).json({
      success: false,
      message: 'Une erreur interne est survenue lors de l’envoi.',
    });
  }
}

