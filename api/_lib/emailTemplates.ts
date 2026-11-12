/**
 * Générateur de templates d'emails pour MusaTech (HTML & Plain Text)
 * - Notification interne destinée à Moussa Diagne (MusaTech)
 * - Accusé de réception bilingue (FR/EN) destiné au prospect
 */

export interface LeadEmailData {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  country: string;
  industry?: string | null;
  serviceRequested: string;
  budget: string;
  currency: string;
  timeline?: string | null;
  description: string;
  locale: string;
  createdAt: Date;
}

/**
 * Nettoie et formate un numéro de téléphone pour créer un lien wa.me sécurisé
 */
function formatWhatsAppUrl(rawPhone?: string | null): string | null {
  if (!rawPhone) return null;
  const digits = rawPhone.replace(/\D/g, '');
  if (digits.length < 7) return null;
  return `https://wa.me/${digits}`;
}

/**
 * 1. Template Interne : Notification pour Moussa Diagne (MusaTech)
 */
export function buildInternalNotificationEmail(lead: LeadEmailData): {
  subject: string;
  text: string;
  html: string;
} {
  const waUrl = formatWhatsAppUrl(lead.phone);
  const companyLabel = lead.company?.trim() ? lead.company.trim() : 'Non renseignée';
  const phoneLabel = lead.phone?.trim() ? lead.phone.trim() : 'Non renseigné';
  const industryLabel = lead.industry?.trim() ? lead.industry.trim() : 'Non spécifié';
  const timelineLabel = lead.timeline?.trim() ? lead.timeline.trim() : 'Non spécifiée';

  const subject = `[Nouveau Devis] ${lead.serviceRequested} — ${lead.name} (${lead.country})`;

  const text = `
NOUVELLE DEMANDE DE DEVIS QUALIFIÉE — MUSATECH
===============================================
ID : ${lead.id}
Date : ${lead.createdAt.toISOString()}
Langue : ${lead.locale.toUpperCase()}

PROSPECT :
- Nom : ${lead.name}
- Société : ${companyLabel}
- Email : ${lead.email}
- Téléphone : ${phoneLabel}
- Pays : ${lead.country}
- Secteur : ${industryLabel}

PROJET :
- Prestation demandée : ${lead.serviceRequested}
- Budget estimé : ${lead.budget} (${lead.currency})
- Échéance : ${timelineLabel}
- Statut initial : NEW

DESCRIPTION DU BESOIN :
-----------------------------------------------
${lead.description}
-----------------------------------------------

ACTIONS RAPIDES :
- Répondre par Email : mailto:${lead.email}
${waUrl ? `- Discuter sur WhatsApp : ${waUrl}` : ''}
`.trim();

  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; color: #f3f4f6; margin: 0; padding: 24px; }
    .card { max-width: 620px; margin: 0 auto; background: #111827; border: 1px solid #1f2937; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
    .header { background: linear-gradient(135deg, #0d1527 0%, #1e1b4b 100%); padding: 24px; border-bottom: 1px solid #374151; }
    .badge { display: inline-block; background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; padding: 4px 10px; border-radius: 9999px; }
    .title { font-size: 20px; font-weight: 700; color: #ffffff; margin: 12px 0 4px; }
    .subtitle { font-size: 13px; color: #9ca3af; }
    .content { padding: 24px; }
    .grid { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    .grid td { padding: 8px 12px; border-bottom: 1px solid #1f2937; font-size: 14px; }
    .grid td.label { width: 35%; color: #9ca3af; font-weight: 500; }
    .grid td.value { width: 65%; color: #f9fafb; font-weight: 600; }
    .desc-box { background: #0b0f19; border: 1px solid #374151; border-radius: 8px; padding: 16px; margin: 16px 0 24px; font-size: 14px; line-height: 1.6; color: #e5e7eb; white-space: pre-wrap; }
    .actions { text-align: center; padding-top: 8px; }
    .btn { display: inline-block; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; margin: 6px 4px; }
    .btn-primary { background: #2563eb; color: #ffffff; }
    .btn-whatsapp { background: #22c55e; color: #ffffff; }
    .footer { text-align: center; padding: 16px; font-size: 12px; color: #6b7280; border-top: 1px solid #1f2937; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <span class="badge">Nouveau Devis • MusaTech</span>
      <h1 class="title">${lead.serviceRequested}</h1>
      <p class="subtitle">Soumis par <strong>${lead.name}</strong> (${lead.country}) — Langue : ${lead.locale.toUpperCase()}</p>
    </div>
    <div class="content">
      <table class="grid">
        <tr><td class="label">Nom complet</td><td class="value">${lead.name}</td></tr>
        <tr><td class="label">Société</td><td class="value">${companyLabel}</td></tr>
        <tr><td class="label">Email</td><td class="value"><a href="mailto:${lead.email}" style="color: #38bdf8;">${lead.email}</a></td></tr>
        <tr><td class="label">Téléphone</td><td class="value">${phoneLabel}</td></tr>
        <tr><td class="label">Pays & Secteur</td><td class="value">${lead.country} • ${industryLabel}</td></tr>
        <tr><td class="label">Budget estimé</td><td class="value" style="color: #10b981;">${lead.budget} (${lead.currency})</td></tr>
        <tr><td class="label">Échéance souhaitée</td><td class="value">${timelineLabel}</td></tr>
        <tr><td class="label">Statut initial</td><td class="value"><span style="background: #1e3a5f; color: #60a5fa; padding: 2px 8px; border-radius: 4px; font-size: 12px;">NEW</span></td></tr>
      </table>

      <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #9ca3af; margin: 0;">Description détaillée du besoin :</h3>
      <div class="desc-box">${lead.description}</div>

      <div class="actions">
        <a href="mailto:${lead.email}" class="btn btn-primary">✉ Répondre par Email</a>
        ${waUrl ? `<a href="${waUrl}" target="_blank" class="btn btn-whatsapp">💬 Ouvrir sur WhatsApp</a>` : ''}
      </div>
    </div>
    <div class="footer">
      MusaTech Commercial Pipeline • ID : ${lead.id} • Enregistré dans PostgreSQL via Prisma
    </div>
  </div>
</body>
</html>
`.trim();

  return { subject, text, html };
}

/**
 * 2. Template Prospect : Accusé de réception bilingue (FR / EN)
 */
export function buildProspectAcknowledgmentEmail(lead: LeadEmailData): {
  subject: string;
  text: string;
  html: string;
} {
  const isEn = lead.locale === 'en';

  const subject = isEn
    ? `Confirmation of your quote request — MusaTech`
    : `Confirmation de votre demande de devis — MusaTech`;

  const text = isEn
    ? `
Hello ${lead.name},

I have received your quote request regarding your "${lead.serviceRequested}" project${lead.company ? ` for ${lead.company}` : ''}.

I am currently reviewing the technical and functional aspects of your requirements and will reach out with an initial review or a discovery meeting proposal within 24 to 48 business hours.

If you have additional materials (specifications, wireframes, RFP), feel free to reply directly to this email or reach me on WhatsApp at +221 78 282 41 75.

Best regards,

Moussa Diagne
Founder & Lead Full Stack Engineer — MusaTech
Dakar, Senegal & Remote
WhatsApp: +221 78 282 41 75
Portfolio: https://musatech.tech
`.trim()
    : `
Bonjour ${lead.name},

J'ai bien reçu votre demande de devis concernant votre projet de "${lead.serviceRequested}"${lead.company ? ` pour ${lead.company}` : ''}.

J'analyse actuellement les éléments techniques et fonctionnels de votre besoin et je reviendrai vers vous avec un premier retour ou une proposition d'échange sous 24 à 48 heures ouvrées.

Si vous disposez de documents complémentaires (cahier des charges, maquettes, expressions de besoins), vous pouvez simplement répondre à cet email ou me contacter directement sur WhatsApp au +221 78 282 41 75.

Bien cordialement,

Moussa Diagne
Fondateur & Développeur Full Stack — MusaTech
Dakar, Sénégal & International
WhatsApp : +221 78 282 41 75
Site : https://musatech.tech
`.trim();

  const html = `
<!DOCTYPE html>
<html lang="${isEn ? 'en' : 'fr'}">
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; color: #f3f4f6; margin: 0; padding: 24px; }
    .card { max-width: 600px; margin: 0 auto; background: #111827; border: 1px solid #1f2937; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
    .header { background: linear-gradient(135deg, #0d1527 0%, #1e1b4b 100%); padding: 24px; border-bottom: 1px solid #374151; }
    .brand { font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em; }
    .brand span { color: #38bdf8; }
    .content { padding: 24px; font-size: 15px; line-height: 1.7; color: #d1d5db; }
    .recap { background: #0b0f19; border-left: 3px solid #38bdf8; padding: 12px 16px; margin: 20px 0; border-radius: 4px; font-size: 13px; color: #9ca3af; }
    .recap strong { color: #f3f4f6; }
    .footer { text-align: center; padding: 20px; font-size: 12px; color: #6b7280; border-top: 1px solid #1f2937; }
    .btn { display: inline-block; padding: 10px 18px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 13px; background: #22c55e; color: #ffffff; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="brand">Musa<span>Tech</span></div>
    </div>
    <div class="content">
      <p style="font-size: 17px; font-weight: 600; color: #ffffff; margin-top: 0;">
        ${isEn ? `Hello ${lead.name},` : `Bonjour ${lead.name},`}
      </p>

      <p>
        ${isEn
      ? `Thank you for reaching out. I have successfully received your quote request regarding <strong>${lead.serviceRequested}</strong>${lead.company ? ` for <strong>${lead.company}</strong>` : ''}.`
      : `Merci pour votre confiance. J'ai bien reçu votre demande de devis concernant votre projet de <strong>${lead.serviceRequested}</strong>${lead.company ? ` pour <strong>${lead.company}</strong>` : ''}.`
    }
      </p>

      <div class="recap">
        <p style="margin: 0 0 6px;"><strong>${isEn ? 'Project Summary' : 'Récapitulatif de votre demande'} :</strong></p>
        <p style="margin: 0;">• ${isEn ? 'Service' : 'Prestation'} : ${lead.serviceRequested}</p>
        <p style="margin: 0;">• ${isEn ? 'Country' : 'Pays'} : ${lead.country}</p>
        <p style="margin: 0;">• ${isEn ? 'Budget Range' : 'Fourchette budgétaire'} : ${lead.budget} (${lead.currency})</p>
      </div>

      <p>
        ${isEn
      ? `I am personally reviewing the technical and functional details of your need. I will get back to you with an initial appraisal or a discovery call proposal <strong>within 24 to 48 business hours</strong>.`
      : `J'analyse personnellement les éléments de votre cahier des charges et je reviendrai vers vous avec un premier retour ou une proposition d'échange <strong>sous 24 à 48 heures ouvrées</strong>.`
    }
      </p>

      <p>
        ${isEn
      ? `If you have additional files or specifications to share, you can reply directly to this email or contact me on WhatsApp:`
      : `Si vous disposez de documents complémentaires, vous pouvez simplement répondre à cet email ou me contacter directement sur WhatsApp :`
    }
      </p>

      <p style="text-align: center; margin: 24px 0;">
        <a href="https://wa.me/221782824175" class="btn">💬 WhatsApp : +221 78 282 41 75</a>
      </p>

      <p style="margin-bottom: 0;">
        ${isEn ? 'Best regards,' : 'Bien cordialement,'}<br>
        <strong>Moussa Diagne</strong><br>
        <span style="font-size: 13px; color: #9ca3af;">${isEn ? 'Founder & Full Stack Engineer — MusaTech' : 'Fondateur & Développeur Full Stack — MusaTech'}</span>
      </p>
    </div>
    <div class="footer">
      MusaTech — Ingénierie Logicielle & Solutions Digitales B2B<br>
      Dakar, Sénégal & International • <a href="https://musatech.tech" style="color: #38bdf8; text-decoration: none;">musatech.tech</a>
    </div>
  </div>
</body>
</html>
`.trim();

  return { subject, text, html };
}
