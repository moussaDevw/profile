/**
 * Schéma de validation Zod bilingue (FR / EN) pour le formulaire de devis B2B MusaTech
 * Conforme au cahier des charges MusaTech & validation client/serveur
 */
import { z } from 'zod';

export type Locale = 'fr' | 'en';

export interface LocalizedOption {
  value: string;
  label: string;
}

export const PROJECT_TYPES_FR: LocalizedOption[] = [
  { value: 'sites-web', label: 'Site web professionnel' },
  { value: 'e-commerce', label: 'E-commerce' },
  { value: 'logiciels-metier', label: 'Plateforme métier' },
  { value: 'applications-mobiles', label: 'Application mobile' },
  { value: 'integration', label: 'Intégration / automatisation' },
  { value: 'autre', label: 'Autre projet sur mesure' },
];

export const PROJECT_TYPES_EN: LocalizedOption[] = [
  { value: 'sites-web', label: 'Professional Website' },
  { value: 'e-commerce', label: 'E-commerce Platform' },
  { value: 'logiciels-metier', label: 'Custom Business Software' },
  { value: 'applications-mobiles', label: 'Mobile Application (iOS/Android)' },
  { value: 'integration', label: 'System Integration / Automation' },
  { value: 'autre', label: 'Other Custom Engineering' },
];

export const PROJECT_TYPES = PROJECT_TYPES_FR;

export function getProjectTypes(locale: Locale = 'fr'): LocalizedOption[] {
  return locale === 'en' ? PROJECT_TYPES_EN : PROJECT_TYPES_FR;
}

export interface BudgetOption {
  value: string;
  labelXOF: string;
  labelEUR: string;
  labelUSD: string;
  labelEN?: {
    XOF: string;
    EUR: string;
    USD: string;
  };
}

export const BUDGET_RANGES: BudgetOption[] = [
  {
    value: 'less_500k',
    labelXOF: 'Moins de 500 000 FCFA',
    labelEUR: 'Moins de 750 €',
    labelUSD: 'Moins de 850 $',
    labelEN: {
      XOF: 'Under 500,000 XOF (~€750 / $850)',
      EUR: 'Under €750',
      USD: 'Under $850',
    },
  },
  {
    value: '500k_1m5',
    labelXOF: '500 000 à 1 500 000 FCFA',
    labelEUR: '750 € à 2 300 €',
    labelUSD: '850 $ à 2 500 $',
    labelEN: {
      XOF: '500,000 to 1,500,000 XOF (~€750 to €2,300)',
      EUR: '€750 to €2,300',
      USD: '$850 to $2,500',
    },
  },
  {
    value: '1m5_5m',
    labelXOF: '1 500 000 à 5 000 000 FCFA',
    labelEUR: '2 300 € à 7 600 €',
    labelUSD: '2 500 $ à 8 200 $',
    labelEN: {
      XOF: '1,500,000 to 5,000,000 XOF (~€2,300 to €7,600)',
      EUR: '€2,300 to €7,600',
      USD: '$2,500 to $8,200',
    },
  },
  {
    value: 'more_5m',
    labelXOF: 'Plus de 5 000 000 FCFA',
    labelEUR: 'Plus de 7 600 €',
    labelUSD: 'Plus de 8 200 $',
    labelEN: {
      XOF: 'Over 5,000,000 XOF (~€7,600 / $8,200+)',
      EUR: 'Over €7,600',
      USD: 'Over $8,200',
    },
  },
  {
    value: 'to_define',
    labelXOF: 'À définir / En cours de cadrage',
    labelEUR: 'À définir / En cours de cadrage',
    labelUSD: 'To be defined',
    labelEN: {
      XOF: 'To be defined / Custom scope',
      EUR: 'To be defined / Custom scope',
      USD: 'To be defined / Custom scope',
    },
  },
];

export function getBudgetLabel(
  budget: BudgetOption,
  currencyMode: 'XOF' | 'EUR' | 'USD',
  locale: Locale = 'fr'
): string {
  if (locale === 'en' && budget.labelEN) {
    return budget.labelEN[currencyMode];
  }
  if (currencyMode === 'EUR') return budget.labelEUR;
  if (currencyMode === 'USD') return budget.labelUSD;
  return budget.labelXOF;
}

export const TIMELINES_FR: LocalizedOption[] = [
  { value: 'urgent', label: 'Urgent (Moins de 1 mois)' },
  { value: '1_to_3_months', label: '1 à 3 mois' },
  { value: 'more_3_months', label: 'Plus de 3 mois' },
  { value: 'flexible', label: 'Flexible / À définir ensemble' },
];

export const TIMELINES_EN: LocalizedOption[] = [
  { value: 'urgent', label: 'Urgent (Under 1 month)' },
  { value: '1_to_3_months', label: '1 to 3 months' },
  { value: 'more_3_months', label: 'Over 3 months' },
  { value: 'flexible', label: 'Flexible / To be aligned' },
];

export const TIMELINES = TIMELINES_FR;

export function getTimelines(locale: Locale = 'fr'): LocalizedOption[] {
  return locale === 'en' ? TIMELINES_EN : TIMELINES_FR;
}

export const INDUSTRIES_FR = [
  'Immobilier & Promotion',
  'Éducation & Formation',
  'Commerce & Distribution',
  'Transport & Logistique',
  'Santé & Médical',
  'Services financiers & Fintech',
  'Hôtellerie & Restauration',
  'Autre secteur',
] as const;

export const INDUSTRIES_EN = [
  'Real Estate & Property',
  'Education & Training',
  'Retail & Commerce',
  'Transport & Logistics',
  'Healthcare & Medical',
  'Financial Services & Fintech',
  'Hospitality & Tourism',
  'Other Industry',
] as const;

export const INDUSTRIES = INDUSTRIES_FR;

export function getIndustries(locale: Locale = 'fr'): readonly string[] {
  return locale === 'en' ? INDUSTRIES_EN : INDUSTRIES_FR;
}

export const COUNTRIES = [
  { code: 'SN', nameFR: 'Sénégal', nameEN: 'Senegal' },
  { code: 'CI', nameFR: 'Côte d’Ivoire', nameEN: 'Ivory Coast' },
  { code: 'ML', nameFR: 'Mali', nameEN: 'Mali' },
  { code: 'FR', nameFR: 'France', nameEN: 'France' },
  { code: 'US', nameFR: 'États-Unis', nameEN: 'United States' },
  { code: 'CA', nameFR: 'Canada', nameEN: 'Canada' },
  { code: 'BE', nameFR: 'Belgique', nameEN: 'Belgium' },
  { code: 'CH', nameFR: 'Suisse', nameEN: 'Switzerland' },
  { code: 'UK', nameFR: 'Royaume-Uni', nameEN: 'United Kingdom' },
  { code: 'OTHER', nameFR: 'Autre pays', nameEN: 'Other country' },
] as const;

export function getCountries(locale: Locale = 'fr'): { code: string; name: string }[] {
  return COUNTRIES.map((c) => ({
    code: c.code,
    name: locale === 'en' ? c.nameEN : c.nameFR,
  }));
}

export const quoteFormSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Le nom complet est obligatoire (au moins 2 caractères).')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères.')
    .trim(),
  email: z
    .string()
    .min(1, 'L’adresse email est obligatoire.')
    .email('Veuillez saisir une adresse email valide.')
    .max(120, 'L’adresse email est trop longue.')
    .trim(),
  company: z.string().max(100).optional().or(z.literal('')),
  phone: z.string().max(30).optional().or(z.literal('')),
  country: z
    .string()
    .min(1, 'Le pays est obligatoire.')
    .max(80),
  industry: z.string().max(80).optional().or(z.literal('')),
  projectType: z
    .string()
    .min(1, 'Veuillez sélectionner un type de projet.'),
  budget: z
    .string()
    .optional()
    .default('to_define'),
  currencyMode: z
    .enum(['XOF', 'EUR', 'USD'])
    .default('XOF'),
  timeline: z
    .string()
    .optional()
    .default('flexible'),
  description: z
    .string()
    .min(20, 'Veuillez décrire votre projet plus en détail (au moins 20 caractères).')
    .max(3000, 'La description ne peut pas dépasser 3 000 caractères.')
    .trim(),
  consentPrivacy: z
    .boolean()
    .refine((val) => val === true, {
      message: 'Vous devez accepter la politique de confidentialité pour transmettre votre demande.',
    }),
  honeypot: z
    .string()
    .max(0, 'Spam détecté.')
    .optional()
    .or(z.literal('')),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;

export type QuoteValidationResult =
  | { success: true; data: QuoteFormData }
  | { success: false; errors: Record<string, string> };

// Messages d'erreurs traduits
const ERROR_MESSAGES_EN: Record<string, string> = {
  fullName: 'Full name is required (at least 2 characters).',
  email: 'Please enter a valid email address.',
  country: 'Country is required.',
  projectType: 'Please select a project type.',
  description: 'Please describe your project in more detail (at least 20 characters).',
  consentPrivacy: 'You must accept the privacy policy to submit your request.',
  honeypot: 'Spam detected.',
};

export function validateQuoteForm(data: unknown, locale: Locale = 'fr'): QuoteValidationResult {
  const result = quoteFormSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0]?.toString();
    if (field && !errors[field]) {
      if (locale === 'en' && ERROR_MESSAGES_EN[field]) {
        errors[field] = ERROR_MESSAGES_EN[field];
      } else {
        errors[field] = issue.message;
      }
    }
  }

  return { success: false, errors };
}
