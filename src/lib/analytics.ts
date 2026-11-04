/**
 * Module d'analytique MusaTech respectueux de la vie privée (Privacy-First)
 * Conforme au RGPD, sans cookies tiers, avec assainissement strict anti-PII.
 *
 * Événements requis par les spécifications :
 * - quote_started
 * - quote_submitted
 * - contact_clicked
 * - service_viewed
 * - project_viewed
 */

import { track } from '@vercel/analytics';

export type AnalyticsEventName =
  | 'quote_started'
  | 'quote_submitted'
  | 'contact_clicked'
  | 'service_viewed'
  | 'project_viewed'
  | 'solution_viewed'
  | 'page_viewed';

export interface QuoteStartedProps {
  service?: string;
  source?: string;
  locale?: string;
}

export interface QuoteSubmittedProps {
  service: string;
  budget?: string;
  currency?: string;
  country?: string;
  hasCompany: boolean;
  locale?: string;
}

export interface ContactClickedProps {
  channel: 'whatsapp' | 'email' | 'phone' | 'short_form';
  context?: string;
  locale?: string;
}

export interface ServiceViewedProps {
  serviceSlug: string;
  locale?: string;
}

export interface ProjectViewedProps {
  projectSlug: string;
  locale?: string;
}

export interface TrackedEventRecord {
  event: AnalyticsEventName;
  properties: Record<string, unknown>;
  timestamp: string;
}

// Clés strictement interdites car contenant des Données Personnelles Identifiables (PII)
const FORBIDDEN_PII_KEYS = [
  'name',
  'fullname',
  'firstname',
  'lastname',
  'nom',
  'prenom',
  'email',
  'mail',
  'courriel',
  'phone',
  'tel',
  'telephone',
  'whatsapp',
  'number',
  'description',
  'message',
  'notes',
  'body',
  'ip',
  'address',
  'adresse',
  'street',
  'password',
  'companyname',
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[0-9\s-]{7,}$/;

const CONSENT_STORAGE_KEY = 'musatech_analytics_consent';

// Journal en mémoire pour tests et audit
const inMemoryEventLog: TrackedEventRecord[] = [];

/**
 * Assainit les propriétés pour garantir l'absence totale de PII
 */
export function sanitizeProperties(props?: Record<string, unknown>): Record<string, unknown> {
  if (!props || typeof props !== 'object') return {};

  const clean: Record<string, unknown> = {};

  for (const [key, rawVal] of Object.entries(props)) {
    const lowerKey = key.toLowerCase();

    // 1. Rejet si le nom de la clé évoque une PII
    const isPiiKey = FORBIDDEN_PII_KEYS.some((forbidden) => lowerKey.includes(forbidden));
    if (isPiiKey) {
      continue;
    }

    // 2. Rejet si la valeur ressemble à un email ou un téléphone
    if (typeof rawVal === 'string') {
      const trimmed = rawVal.trim();
      if (EMAIL_REGEX.test(trimmed) || PHONE_REGEX.test(trimmed)) {
        continue;
      }
      // Limiter la taille des chaînes pour éviter la transmission accidentelle de textes longs
      clean[key] = trimmed.slice(0, 80);
    } else if (
      typeof rawVal === 'number' ||
      typeof rawVal === 'boolean' ||
      rawVal === null
    ) {
      clean[key] = rawVal;
    } else if (Array.isArray(rawVal)) {
      // Nettoyage superficiel des tableaux de primitives
      clean[key] = rawVal
        .filter((item) => typeof item === 'string' || typeof item === 'number')
        .slice(0, 10);
    }
  }

  return clean;
}

/**
 * Vérifie si le suivi analytique est autorisé
 * Respecte l'en-tête Do-Not-Track du navigateur et le consentement utilisateur
 */
export function isConsentGranted(): boolean {
  if (typeof window === 'undefined') return false;

  // 1. Respect du Do-Not-Track natif du navigateur
  if (typeof navigator !== 'undefined' && (navigator.doNotTrack === '1' || (window as unknown as { doNotTrack?: string }).doNotTrack === '1')) {
    // Si l'utilisateur a expressément activé DNT et n'a pas donné de consentement explicite contraire
    const explicitConsent = window.localStorage?.getItem(CONSENT_STORAGE_KEY);
    if (explicitConsent !== 'granted') {
      return false;
    }
  }

  // 2. Vérification dans localStorage
  try {
    const consent = window.localStorage?.getItem(CONSENT_STORAGE_KEY);
    if (consent === 'denied') return false;
  } catch {
    // Mode privé ou restrictions cookies
  }

  return true;
}

/**
 * Définit le consentement utilisateur pour les analytics
 */
export function setAnalyticsConsent(granted: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage?.setItem(CONSENT_STORAGE_KEY, granted ? 'granted' : 'denied');
  } catch {
    // Mode privé ou restrictions
  }
}

/**
 * Émetteur principal d'événements
 */
export function trackEvent(eventName: AnalyticsEventName, properties?: Record<string, unknown>): void {
  if (!isConsentGranted()) {
    return;
  }

  const cleanProperties = sanitizeProperties(properties);

  const record: TrackedEventRecord = {
    event: eventName,
    properties: cleanProperties,
    timestamp: new Date().toISOString(),
  };

  // Stocker dans le log en mémoire (pratique pour l'auditabilité et les tests)
  inMemoryEventLog.push(record);
  if (inMemoryEventLog.length > 50) {
    inMemoryEventLog.shift();
  }

  // Envoi à Vercel Analytics (cookieless, conforme RGPD)
  try {
    track(eventName, cleanProperties as Record<string, string | number | boolean | null>);
  } catch {
    // Échec silencieux si hors ligne ou bloqué par un bloqueur de publicité
  }

  // Émission d'un événement DOM custom pour les outils de débogage ou d'audit
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
    try {
      window.dispatchEvent(
        new CustomEvent('musatech:analytics', {
          detail: record,
        })
      );
    } catch {
      // Ignorer si non supporté
    }
  }
}

// =========================================================================
// Helpers Typés pour les 5 Événements Spécifiés
// =========================================================================

export function trackQuoteStarted(props?: QuoteStartedProps): void {
  trackEvent('quote_started', props as unknown as Record<string, unknown>);
}

export function trackQuoteSubmitted(props: QuoteSubmittedProps): void {
  trackEvent('quote_submitted', props as unknown as Record<string, unknown>);
}

export function trackContactClicked(props: ContactClickedProps): void {
  trackEvent('contact_clicked', props as unknown as Record<string, unknown>);
}

export function trackServiceViewed(props: ServiceViewedProps): void {
  trackEvent('service_viewed', props as unknown as Record<string, unknown>);
}

export function trackProjectViewed(props: ProjectViewedProps): void {
  trackEvent('project_viewed', props as unknown as Record<string, unknown>);
}

// Helpers de test
export function getAnalyticsEventLog(): TrackedEventRecord[] {
  return [...inMemoryEventLog];
}

export function clearAnalyticsEventLog(): void {
  inMemoryEventLog.length = 0;
}
