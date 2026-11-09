import { z } from 'zod';

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
