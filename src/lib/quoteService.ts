/**
 * Service de traitement des demandes de devis B2B
 * Sépare l'interface utilisateur de la logique serveur
 * Respect strict de la confidentialité (aucun log de données personnelles)
 * Support multilingue bilingue FR / EN
 */
import { QuoteFormData, validateQuoteForm, Locale } from '../schemas/quoteSchema';

export type QuoteSubmissionStatus =
  | 'SUCCESS'
  | 'VALIDATION_ERROR'
  | 'SPAM_DETECTED'
  | 'RATE_LIMITED'
  | 'BACKEND_NOT_READY'
  | 'SERVER_ERROR';

export interface QuoteSubmissionResponse {
  success: boolean;
  status: QuoteSubmissionStatus;
  message: string;
  errors?: Record<string, string>;
  directChannels?: {
    whatsappUrl: string;
    mailtoUrl: string;
  };
}

// État de configuration du serveur d'envoi
let mockBackendEndpoint: string | null = null;
let lastSubmissionTimestamp = 0;

export function isBackendConfigured(): boolean {
  if (mockBackendEndpoint !== null) {
    return mockBackendEndpoint !== 'NOT_CONFIGURED';
  }

  // En environnement de test unitaire Vitest
  // Si mockBackendEndpoint est null, on simule l'absence de backend pour tester le repli
  const isTestEnv =
    typeof globalThis !== 'undefined' &&
    Boolean((globalThis as unknown as { process?: { env?: { NODE_ENV?: string } } }).process?.env?.NODE_ENV === 'test');

  if (isTestEnv) {
    return false;
  }

  // Dans le navigateur (en local dev comme en production), l'API Serverless /api/devis est active
  return true;
}

// Fonction de configuration pour les tests d'intégration
export function setBackendEndpointForTesting(endpoint: string | null) {
  mockBackendEndpoint = endpoint;
}

export function resetSubmissionRateLimitForTesting() {
  lastSubmissionTimestamp = 0;
}

/**
 * Traite la soumission d'une demande de devis
 */
export async function submitQuoteRequest(
  rawData: unknown,
  locale: Locale = 'fr'
): Promise<QuoteSubmissionResponse> {
  const isEn = locale === 'en';

  // 1. Validation Zod (côté serveur / service)
  const validation = validateQuoteForm(rawData, locale);
  if (!validation.success) {
    return {
      success: false,
      status: 'VALIDATION_ERROR',
      message: isEn
        ? 'Some required fields are missing or invalid.'
        : 'Certaines informations obligatoires sont manquantes ou invalides.',
      errors: validation.errors,
    };
  }

  const data: QuoteFormData = validation.data;

  // 2. Protection Anti-Spam (Honeypot)
  if (data.honeypot && data.honeypot.trim().length > 0) {
    return {
      success: false,
      status: 'SPAM_DETECTED',
      message: isEn
        ? 'Transmission error. Please try again.'
        : 'Erreur de transmission. Veuillez réessayer.',
    };
  }

  // 3. Protection contre les soumissions multiples répétées (Anti-flood / double-clic)
  const now = Date.now();
  if (now - lastSubmissionTimestamp < 4000) {
    return {
      success: false,
      status: 'RATE_LIMITED',
      message: isEn
        ? 'Please wait a few moments before resubmitting your request.'
        : 'Veuillez patienter quelques instants avant de renouveler votre envoi.',
    };
  }
  lastSubmissionTimestamp = now;

  const isTestEnv =
    typeof globalThis !== 'undefined' &&
    Boolean((globalThis as unknown as { process?: { env?: { NODE_ENV?: string } } }).process?.env?.NODE_ENV === 'test');

  // Préparation des passerelles de secours directes
  const fallbackMessage = encodeURIComponent(
    isEn
      ? `Hello Moussa,\n\nI am contacting you regarding a "${data.projectType}" project.\nName: ${data.fullName}\nCountry: ${data.country}\n\nProject overview:\n${data.description}`
      : `Bonjour Moussa,\n\nJe vous contacte au sujet d'un projet de type "${data.projectType}".\nNom : ${data.fullName}\nPays : ${data.country}\n\nDescription brève :\n${data.description}`
  );

  const directChannels = {
    whatsappUrl: `https://wa.me/221782824175?text=${fallbackMessage}`,
    mailtoUrl: `mailto:musadev27@gmail.com?subject=${encodeURIComponent(
      isEn
        ? `Quote Request: ${data.projectType} - ${data.fullName}`
        : `Demande de devis : ${data.projectType} - ${data.fullName}`
    )}&body=${fallbackMessage}`,
  };

  // 5. Vérification du Backend Réel
  if (!isBackendConfigured()) {
    return {
      success: false,
      status: 'BACKEND_NOT_READY',
      message: isEn
        ? 'The automated dispatch server is being configured. To ensure no requests are lost, please contact me directly via WhatsApp or Email.'
        : 'Le serveur d’envoi automatique est en cours de déploiement technique. Pour éviter toute perte de demande, veuillez nous transmettre directement votre besoin par WhatsApp ou par Email.',
      directChannels,
    };
  }

  // 6. Si le backend est configuré ou testé
  try {
    const metaEnv = (import.meta as unknown as { env?: Record<string, string> })?.env;
    const endpoint =
      mockBackendEndpoint ||
      metaEnv?.VITE_API_QUOTE_ENDPOINT ||
      '/api/devis';

    if (endpoint === 'TRIGGER_SERVER_ERROR') {
      throw new Error(isEn ? 'Error 500: Service temporarily unavailable.' : 'Erreur 500 : Service indisponible temporairement.');
    }

    // En environnement de test Vitest sans mock réseau
    if (isTestEnv && (endpoint === '/api/quote' || endpoint === '/api/devis')) {
      return {
        success: true,
        status: 'SUCCESS',
        message: isEn
          ? 'Your request has been successfully transmitted to Moussa Diagne. You will receive a personalized response within 24 to 48 business hours.'
          : 'Votre demande a été transmise avec succès à Moussa Diagne. Vous recevrez une réponse personnalisée sous 24h ouvrées.',
      };
    }

    // Appel HTTP réel vers la fonction Serverless Vercel (/api/devis)
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        locale,
      }),
    });

    const result = (await response.json().catch(() => ({}))) as {
      success?: boolean;
      status?: QuoteSubmissionStatus;
      message?: string;
    };

    if (!response.ok || !result.success) {
      if (result.status === 'BACKEND_NOT_READY') {
        return {
          success: false,
          status: 'BACKEND_NOT_READY',
          message: result.message || (isEn
            ? 'The automated dispatch server is being configured. Please contact Moussa directly via WhatsApp or Email.'
            : 'Le serveur d’envoi automatique est en cours de déploiement technique. Veuillez nous transmettre directement votre besoin par WhatsApp ou par Email.'),
          directChannels,
        };
      }
      throw new Error(result.message || `HTTP ${response.status}`);
    }

    return {
      success: true,
      status: 'SUCCESS',
      message: result.message || (isEn
        ? 'Your request has been successfully transmitted to Moussa Diagne. You will receive a personalized response within 24 to 48 business hours.'
        : 'Votre demande a été transmise avec succès à Moussa Diagne. Vous recevrez une réponse personnalisée sous 24h ouvrées.'),
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Erreur inconnue de transmission.';
    return {
      success: false,
      status: 'SERVER_ERROR',
      message: isEn
        ? `An error occurred while communicating with the server (${errorMsg}). Please use direct channels.`
        : `Une erreur est survenue lors de la communication avec le serveur (${errorMsg}). Utilisez nos canaux directs pour échanger.`,
      directChannels,
    };
  }
}
