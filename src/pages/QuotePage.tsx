import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Phone,
  Mail,
} from 'lucide-react';
import { Container } from '../design-system/Container';
import { FormField } from '../design-system/form/FormField';
import { Input } from '../design-system/form/Input';
import { Select } from '../design-system/form/Select';
import { Textarea } from '../design-system/form/Textarea';
import { Button } from '../design-system/Button';
import { NavLink, useRouter } from '../lib/router';
import {
  getProjectTypes,
  BUDGET_RANGES,
  getBudgetLabel,
  getTimelines,
  getIndustries,
  getCountries,
  QuoteFormData,
} from '../schemas/quoteSchema';
import {
  submitQuoteRequest,
  QuoteSubmissionResponse,
} from '../lib/quoteService';
import { updatePageMetadata } from '../lib/seoMetadata';
import { getLocalizedHref } from '../lib/i18nRoutes';
import { trackQuoteStarted, trackQuoteSubmitted, trackContactClicked } from '../lib/analytics';

export const QuotePage: React.FC = () => {
  const { path, locale } = useRouter();
  const isEn = locale === 'en';

  // Mode de devise pour l'international
  const [currencyMode, setCurrencyMode] = useState<'XOF' | 'EUR' | 'USD'>(isEn ? 'USD' : 'XOF');

  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    country: isEn ? 'Senegal' : 'Sénégal',
    industry: isEn ? 'Real Estate & Property' : 'Immobilier & Promotion',
    projectType: 'sites-web',
    budget: 'to_define',
    currencyMode: isEn ? 'USD' : 'XOF',
    timeline: 'flexible',
    description: '',
    consentPrivacy: false,
    honeypot: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submissionResponse, setSubmissionResponse] = useState<QuoteSubmissionResponse | null>(null);
  const quoteStartedRef = useRef(false);

  const notifyQuoteStarted = () => {
    if (!quoteStartedRef.current) {
      quoteStartedRef.current = true;
      trackQuoteStarted({ service: formData.projectType, source: 'quote_page', locale });
    }
  };

  // SEO & Métadonnées bilingues
  useEffect(() => {
    updatePageMetadata({
      title: isEn
        ? 'Request a Custom Quote | MusaTech Software Engineering'
        : 'Demande de Devis Développeur Web & Mobile | MusaTech Dakar',
      description: isEn
        ? 'Request a tailored proposal for your web, mobile or custom business software project. Transparent scoping and 24-48h response.'
        : 'Décrivez votre projet web, mobile ou plateforme métier et obtenez un retour personnalisé sous 24 à 48 heures ouvrées.',
      canonicalPath: isEn ? '/en/quote' : '/fr/devis',
      frPath: '/fr/devis',
      enPath: '/en/quote',
      locale,
      breadcrumbs: [
        { name: isEn ? 'Home' : 'Accueil', path: isEn ? '/en' : '/fr' },
        { name: isEn ? 'Quote' : 'Devis', path: isEn ? '/en/quote' : '/fr/devis' },
      ],
      schemaType: 'quote',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Pré-sélection depuis l'URL (service & sector)
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);

      let serviceParam = url.searchParams.get('service');
      if (!serviceParam && window.location.hash.includes('service=')) {
        serviceParam = window.location.hash.split('service=')[1]?.split('&')[0] || null;
      }
      if (
        serviceParam &&
        ['sites-web', 'e-commerce', 'logiciels-metier', 'applications-mobiles', 'integration', 'autre'].includes(
          serviceParam
        )
      ) {
        setFormData((prev) => ({ ...prev, projectType: serviceParam as string }));
      }

      let sectorParam = url.searchParams.get('sector');
      if (!sectorParam && window.location.hash.includes('sector=')) {
        sectorParam = window.location.hash.split('sector=')[1]?.split('&')[0] || null;
      }
      const sectorMap: Record<string, string> = isEn
        ? {
            immobilier: 'Real Estate & Property',
            'real-estate': 'Real Estate & Property',
            education: 'Education & Training',
            commerce: 'Retail & Commerce',
            retail: 'Retail & Commerce',
            logistique: 'Transport & Logistics',
            logistics: 'Transport & Logistics',
          }
        : {
            immobilier: 'Immobilier & Promotion',
            'real-estate': 'Immobilier & Promotion',
            education: 'Éducation & Formation',
            commerce: 'Commerce & Distribution',
            retail: 'Commerce & Distribution',
            logistique: 'Transport & Logistique',
            logistics: 'Transport & Logistique',
          };

      if (sectorParam && sectorMap[sectorParam.toLowerCase()]) {
        setFormData((prev) => ({ ...prev, industry: sectorMap[sectorParam!.toLowerCase()] }));
      }
    }
  }, [path, isEn, locale]);

  const handleCurrencyChange = (newCurrency: 'XOF' | 'EUR' | 'USD') => {
    setCurrencyMode(newCurrency);
    setFormData((prev) => ({ ...prev, currencyMode: newCurrency }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setErrors({});
    setSubmissionResponse(null);

    const formEl = e.currentTarget;
    const getDOMValue = (fieldName: string, fallback: string): string => {
      const el = (formEl.elements.namedItem(fieldName) || formEl.querySelector(`[name="${fieldName}"], #${fieldName}`)) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
      if (el && typeof el.value === 'string' && el.value.trim().length > 0) {
        return el.value.trim();
      }
      return (fallback || '').trim();
    };

    const payload: QuoteFormData = {
      ...formData,
      fullName: getDOMValue('fullName', formData.fullName),
      email: getDOMValue('email', formData.email),
      company: getDOMValue('company', formData.company || ''),
      phone: getDOMValue('phone', formData.phone || ''),
      country: getDOMValue('country', formData.country),
      industry: getDOMValue('industry', formData.industry || ''),
      projectType: getDOMValue('projectType', formData.projectType),
      budget: getDOMValue('budget', formData.budget || 'to_define'),
      timeline: getDOMValue('timeline', formData.timeline || 'flexible'),
      description: getDOMValue('description', formData.description),
    };

    setFormData(payload);

    try {
      const response = await submitQuoteRequest(payload, locale);
      setSubmissionResponse(response);

      if (response.success) {
        trackQuoteSubmitted({
          service: payload.projectType,
          budget: payload.budget,
          currency: payload.currencyMode,
          country: payload.country,
          hasCompany: Boolean(payload.company),
          locale,
        });
      } else if (response.errors) {
        setErrors(response.errors);
      }
    } catch {
      setSubmissionResponse({
        success: false,
        status: 'SERVER_ERROR',
        message: isEn ? 'An unexpected error occurred.' : 'Une erreur inattendue est survenue.',
      });
    } finally {
      setLoading(false);
    }
  };

  const projectTypesList = getProjectTypes(locale);
  const timelinesList = getTimelines(locale);
  const industriesList = getIndustries(locale);
  const countriesList = getCountries(locale);

  return (
    <div className="mt-page-quote">
      {/* 1. OUVERTURE AÉRÉE & CENTRÉE — STYLE ALAN.COM 100% PLEINE LARGEUR */}
      <section
        style={{
          width: '100%',
          paddingTop: 'clamp(52px, 7vw, 88px)',
          paddingBottom: 'clamp(44px, 6vw, 68px)',
          backgroundColor: '#FAF8F5',
          borderBottom: '1px solid #EAE6DF',
        }}
      >
        <Container>
          {/* Breadcrumb */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '13px',
              color: '#465670',
              marginBottom: '22px',
            }}
          >
            <NavLink href={getLocalizedHref('home', locale)} style={{ color: '#0B1730', textDecoration: 'none', fontWeight: 700 }}>
              {isEn ? 'Home' : 'Accueil'}
            </NavLink>
            <span>/</span>
            <span style={{ color: '#0E6049', fontWeight: 800 }}>
              {isEn ? 'Quote Request' : 'Demande de devis'}
            </span>
          </div>

          <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                backgroundColor: '#FFFFFF',
                borderRadius: '9999px',
                fontSize: '12.5px',
                fontWeight: 800,
                color: '#0B1730',
                boxShadow: '0 4px 14px rgba(11, 23, 48, 0.05)',
                marginBottom: '22px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0E6049' }} />
              <span>{isEn ? 'Technical Scoping & Pricing' : 'Chiffrage & Cadrage Technique'}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mt-h1"
              style={{
                color: '#0B1730',
                marginBottom: '18px',
                lineHeight: 1.08,
                fontSize: 'clamp(34px, 5vw, 56px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
              }}
            >
              {isEn
                ? 'Describe your project, receive a clear tailored proposal.'
                : 'Décrivez votre projet, obtenez une proposition claire.'}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-body"
              style={{
                color: '#3B4A5E',
                fontSize: 'clamp(16.5px, 2vw, 19px)',
                lineHeight: 1.62,
                maxWidth: '700px',
                margin: '0 auto 28px',
              }}
            >
              {isEn
                ? 'Fill in this form to qualify your technical and business requirements. Moussa Diagne will analyze your project scope and deliver a clear proposal within 24 to 48 business hours.'
                : 'Remplissez ce formulaire pour qualifier votre besoin. Moussa Diagne analysera votre cahier des charges et vous transmettra une proposition technique et tarifaire sur mesure sous 24 à 48 heures ouvrées.'}
            </motion.p>

            {/* 3 Pilules de Garantie */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#0B1730',
                  backgroundColor: '#FFFFFF',
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  boxShadow: '0 2px 8px rgba(11, 23, 48, 0.04)',
                }}
              >
                <Clock size={15} color="#0E6049" />
                <span>{isEn ? 'Response within 24-48 business hours' : 'Réponse sous 24h ouvrées'}</span>
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#0B1730',
                  backgroundColor: '#FFFFFF',
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  boxShadow: '0 2px 8px rgba(11, 23, 48, 0.04)',
                }}
              >
                <ShieldCheck size={15} color="#0E6049" />
                <span>{isEn ? 'Strict data privacy & confidentiality' : 'Confidentialité et respect de vos données'}</span>
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#0B1730',
                  backgroundColor: '#FFFFFF',
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  boxShadow: '0 2px 8px rgba(11, 23, 48, 0.04)',
                }}
              >
                <CheckCircle2 size={15} color="#0E6049" />
                <span>{isEn ? 'Transparent proposal, no hidden fees' : 'Devis détaillé sans frais cachés'}</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. SCÈNE VERT MENTHE PASTEL 100% PLEINE LARGEUR (BORD À BORD) : MOCKUP + FORMULAIRE FLOTTANT */}
      <section
        style={{
          width: '100%',
          padding: 'clamp(52px, 7vw, 96px) 0',
          backgroundColor: '#D9F2EE',
        }}
      >
        <Container>
          {/* Écran de confirmation SUCCESS */}
          {submissionResponse?.success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                maxWidth: '760px',
                margin: '0 auto',
                backgroundColor: '#FFFFFF',
                borderRadius: '36px',
                padding: 'clamp(40px, 6vw, 64px) 28px',
                textAlign: 'center',
                boxShadow: '0 28px 60px -12px rgba(14, 96, 73, 0.14)',
              }}
            >
              <div
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  backgroundColor: '#D9F2EE',
                  color: '#0E6049',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 22px auto',
                }}
              >
                <CheckCircle2 size={36} />
              </div>

              <h2 className="mt-h2" style={{ color: '#0B1730', marginBottom: '12px', fontSize: '28px', fontWeight: 800 }}>
                {isEn ? 'Quote Request Successfully Submitted!' : 'Demande de devis bien reçue !'}
              </h2>

              <p className="mt-body" style={{ maxWidth: '540px', margin: '0 auto 26px auto', fontSize: '16px', color: '#334155' }}>
                {submissionResponse.message}
              </p>

              <div
                style={{
                  padding: '16px 24px',
                  backgroundColor: '#FAF8F5',
                  borderRadius: '9999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#0B1730',
                }}
              >
                <Phone size={16} color="#0E6049" />
                <span>
                  {isEn
                    ? 'Urgent inquiry? Reach Moussa Diagne directly at +221 78 282 41 75'
                    : 'Une question urgente ? Joignez directement Moussa Diagne au +221 78 282 41 75'}
                </span>
              </div>
            </motion.div>
          ) : (
            <div
              style={{
                maxWidth: '980px',
                margin: '0 auto',
              }}
            >
              {/* Formulaire Actif en Grande Carte Flottante Blanche Alan Pleine Largeur */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '36px',
                  padding: 'clamp(28px, 4.5vw, 48px)',
                  boxShadow: '0 24px 56px -12px rgba(11, 23, 48, 0.1)',
                }}
              >
                {/* Alerte Erreur Globale / Statut Backend */}
                {submissionResponse && !submissionResponse.success && (
                  <div
                    style={{
                      marginBottom: '28px',
                      padding: '18px 22px',
                      borderRadius: '20px',
                      backgroundColor:
                        submissionResponse.status === 'BACKEND_NOT_READY' ? '#FFFBEB' : '#FEF2F2',
                      border:
                        submissionResponse.status === 'BACKEND_NOT_READY'
                          ? '1px solid #FDE68A'
                          : '1px solid #FECACA',
                      color:
                        submissionResponse.status === 'BACKEND_NOT_READY' ? '#92400E' : '#991B1B',
                      fontSize: '14px',
                      lineHeight: 1.5,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, marginBottom: '6px' }}>
                      <AlertCircle size={18} />
                      <span>{submissionResponse.message}</span>
                    </div>

                    {submissionResponse.directChannels && (
                      <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        <a
                          href={submissionResponse.directChannels.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackContactClicked({ channel: 'whatsapp', context: 'quote_fallback', locale })}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            backgroundColor: '#10B981',
                            color: '#FFFFFF',
                            padding: '8px 18px',
                            borderRadius: '9999px',
                            fontSize: '13px',
                            fontWeight: 700,
                            textDecoration: 'none',
                          }}
                        >
                          <Phone size={14} />
                          <span>{isEn ? 'Send via Direct WhatsApp' : 'Envoyer par WhatsApp direct'}</span>
                        </a>

                        <a
                          href={submissionResponse.directChannels.mailtoUrl}
                          onClick={() => trackContactClicked({ channel: 'email', context: 'quote_fallback', locale })}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            backgroundColor: '#0B1730',
                            color: '#FFFFFF',
                            padding: '8px 18px',
                            borderRadius: '9999px',
                            fontSize: '13px',
                            fontWeight: 700,
                            textDecoration: 'none',
                          }}
                        >
                          <Mail size={14} />
                          <span>{isEn ? 'Send via Email' : 'Envoyer par Email'}</span>
                        </a>
                      </div>
                    )}
                  </div>
                )}

                <form onSubmit={handleSubmit} onFocus={notifyQuoteStarted} onChange={notifyQuoteStarted} noValidate>
                  {/* Champ Honeypot (Piège anti-spam invisible) */}
                  <div style={{ display: 'none' }} aria-hidden="true">
                    <label htmlFor="website_url_hp">Do not fill this field</label>
                    <input
                      id="website_url_hp"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
                    {/* SECTION 1 : Coordonnées du contact */}
                    <div
                      style={{
                        backgroundColor: '#FAF8F5',
                        borderRadius: '26px',
                        padding: 'clamp(18px, 3vw, 28px)',
                      }}
                    >
                      <h2
                        style={{
                          fontSize: '17px',
                          fontWeight: 800,
                          color: '#0B1730',
                          marginBottom: '18px',
                          paddingBottom: '10px',
                          borderBottom: '1px solid #EAE6DF',
                        }}
                      >
                        {isEn ? '1. Contact Details' : '1. Vos Coordonnées'}
                      </h2>

                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
                          gap: '16px',
                        }}
                      >
                        <FormField label={isEn ? 'Full Name' : 'Nom complet'} id="fullName" required error={errors.fullName}>
                          <Input
                            id="fullName"
                            name="fullName"
                            autoComplete="name"
                            placeholder={isEn ? 'e.g. David Miller' : 'Ex. Moussa Ndiaye'}
                            value={formData.fullName}
                            onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                            onInput={(e) => setFormData((prev) => ({ ...prev, fullName: (e.target as HTMLInputElement).value }))}
                            disabled={loading}
                          />
                        </FormField>

                        <FormField label={isEn ? 'Email' : 'Adresse email'} id="email" required error={errors.email}>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder={isEn ? 'e.g. name@example.com' : 'Ex. moussa@gmail.com'}
                            value={formData.email}
                            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                            onInput={(e) => setFormData((prev) => ({ ...prev, email: (e.target as HTMLInputElement).value }))}
                            disabled={loading}
                          />
                        </FormField>

                        <FormField label={isEn ? 'Company / Organization (Optional)' : "Nom de l'entreprise (facultatif)"} id="company">
                          <Input
                            id="company"
                            name="company"
                            autoComplete="organization"
                            placeholder={isEn ? 'e.g. Miller Logistics Ltd' : 'Ex. Ndiaye Logistique SARL'}
                            value={formData.company}
                            onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                            onInput={(e) => setFormData((prev) => ({ ...prev, company: (e.target as HTMLInputElement).value }))}
                            disabled={loading}
                          />
                        </FormField>

                        <FormField label={isEn ? 'Phone / WhatsApp (Optional)' : 'Téléphone / WhatsApp (facultatif)'} id="phone">
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            placeholder={isEn ? '+1 555 123 4567' : '+221 XX XXX XX XX'}
                            value={formData.phone}
                            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                            onInput={(e) => setFormData((prev) => ({ ...prev, phone: (e.target as HTMLInputElement).value }))}
                            disabled={loading}
                          />
                        </FormField>

                        <FormField label={isEn ? 'Country' : 'Pays'} id="country" required error={errors.country}>
                          <Select
                            id="country"
                            name="country"
                            autoComplete="country-name"
                            value={formData.country}
                            onChange={(e) => setFormData((prev) => ({ ...prev, country: e.target.value }))}
                            options={countriesList.map((c) => ({ label: c.name, value: c.name }))}
                            disabled={loading}
                          />
                        </FormField>

                        <FormField label={isEn ? 'Industry' : "Secteur d'activité"} id="industry">
                          <Select
                            id="industry"
                            name="industry"
                            value={formData.industry}
                            onChange={(e) => setFormData((prev) => ({ ...prev, industry: e.target.value }))}
                            options={industriesList.map((ind) => ({ label: ind, value: ind }))}
                            disabled={loading}
                          />
                        </FormField>
                      </div>
                    </div>

                    {/* SECTION 2 : Périmètre du projet */}
                    <div
                      style={{
                        backgroundColor: '#FAF8F5',
                        borderRadius: '26px',
                        padding: 'clamp(18px, 3vw, 28px)',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px',
                          marginBottom: '18px',
                          paddingBottom: '10px',
                          borderBottom: '1px solid #EAE6DF',
                        }}
                      >
                        <h2
                          style={{
                            fontSize: '17px',
                            fontWeight: 800,
                            color: '#0B1730',
                            margin: 0,
                          }}
                        >
                          {isEn ? '2. Project Scope & Requirements' : '2. Le Projet & Vos Attentes'}
                        </h2>

                        {/* Sélecteur de Devise International en Pilules Alan */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                          <span style={{ color: '#64748B', fontWeight: 600 }}>{isEn ? 'Currency:' : 'Devise :'}</span>
                          {(['XOF', 'EUR', 'USD'] as const).map((cur) => (
                            <button
                              key={cur}
                              type="button"
                              onClick={() => handleCurrencyChange(cur)}
                              style={{
                                padding: '6px 14px',
                                minHeight: '34px',
                                borderRadius: '9999px',
                                border: currencyMode === cur ? '1.5px solid #0B1730' : '1px solid #E2DDD5',
                                backgroundColor: currencyMode === cur ? '#0B1730' : '#FFFFFF',
                                color: currencyMode === cur ? '#FFFFFF' : '#465670',
                                fontWeight: 700,
                                fontSize: '12px',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease',
                              }}
                            >
                              {cur === 'XOF' ? (isEn ? 'XOF' : 'FCFA') : cur === 'EUR' ? '€ (EUR)' : '$ (USD)'}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
                          gap: '16px',
                          marginBottom: '16px',
                        }}
                      >
                        <FormField label={isEn ? 'Project Type' : 'Type de projet'} id="projectType" required error={errors.projectType}>
                          <Select
                            id="projectType"
                            value={formData.projectType}
                            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                            options={projectTypesList.map((pt) => ({ label: pt.label, value: pt.value }))}
                            disabled={loading}
                          />
                        </FormField>

                        <FormField
                          label={
                            isEn
                              ? `Estimated Budget (${currencyMode})`
                              : `Budget estimé (${currencyMode === 'XOF' ? 'FCFA' : currencyMode})`
                          }
                          id="budget"
                        >
                          <Select
                            id="budget"
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            options={BUDGET_RANGES.map((b) => ({
                              label: getBudgetLabel(b, currencyMode, locale),
                              value: b.value,
                            }))}
                            disabled={loading}
                          />
                        </FormField>

                        <FormField label={isEn ? 'Target Timeline' : 'Délai envisagé'} id="timeline">
                          <Select
                            id="timeline"
                            value={formData.timeline}
                            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                            options={timelinesList.map((t) => ({ label: t.label, value: t.value }))}
                            disabled={loading}
                          />
                        </FormField>
                      </div>

                      <FormField
                        label={isEn ? 'Detailed Project Overview & Requirements' : 'Description détaillée de votre projet'}
                        id="description"
                        required
                        error={errors.description}
                        hint={
                          isEn
                            ? 'Describe your business goals, target users, core business rules, and required third-party integrations.'
                            : 'Décrivez vos objectifs commerciaux, les utilisateurs cibles, vos règles de gestion et les intégrations souhaitées.'
                        }
                      >
                        <Textarea
                          id="description"
                          name="description"
                          rows={5}
                          placeholder={
                            isEn
                              ? 'Example: We are an international logistics company and need a web application with real-time container tracking, automated PDF invoice generation, and Stripe checkout...'
                              : 'Exemple : Nous sommes une agence de transport basée à Dakar et souhaitons développer une plateforme web avec suivi des expéditions en temps réel, génération des bordereaux PDF et encaissement des frais via Wave...'
                          }
                          value={formData.description}
                          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                          onInput={(e) => setFormData((prev) => ({ ...prev, description: (e.target as HTMLTextAreaElement).value }))}
                          disabled={loading}
                        />
                      </FormField>
                    </div>

                    {/* SECTION 3 : Consentement & Confidentialité */}
                    <div
                      style={{
                        backgroundColor: '#FAF8F5',
                        padding: '16px 20px',
                        borderRadius: '20px',
                      }}
                    >
                      <label
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                          fontSize: '13.5px',
                          color: '#334155',
                          lineHeight: 1.55,
                          cursor: 'pointer',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={formData.consentPrivacy}
                          onChange={(e) => setFormData({ ...formData, consentPrivacy: e.target.checked })}
                          style={{ marginTop: '3px', cursor: 'pointer', width: '16px', height: '16px' }}
                        />
                        <span>
                          {isEn ? (
                            <>
                              I agree that the submitted information will be processed by MusaTech exclusively to respond to my quote request, in accordance with the{' '}
                              <NavLink href={getLocalizedHref('privacy', 'en')} style={{ color: '#0E6049', textDecoration: 'none', fontWeight: 700 }}>
                                privacy policy
                              </NavLink>
                              . No personal data is ever sold or shared with third parties. *
                            </>
                          ) : (
                            <>
                              J’accepte que les données saisies soient traitées par MusaTech dans le cadre de ma demande de devis, conformément à la{' '}
                              <NavLink href={getLocalizedHref('privacy', 'fr')} style={{ color: '#0E6049', textDecoration: 'none', fontWeight: 700 }}>
                                politique de confidentialité
                              </NavLink>
                              . Aucune donnée n’est vendue ni cédée à des tiers. *
                            </>
                          )}
                        </span>
                      </label>
                      {errors.consentPrivacy && (
                        <div style={{ color: '#DC2626', fontSize: '12.5px', fontWeight: 600, marginTop: '6px' }}>
                          {errors.consentPrivacy}
                        </div>
                      )}
                    </div>

                    {/* Bouton de soumission Pilule Alan */}
                    <div>
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        fullWidth
                        disabled={loading}
                        icon={<Send size={18} />}
                        style={{
                          borderRadius: '9999px',
                          backgroundColor: '#0B1730',
                          color: '#FFFFFF',
                        }}
                      >
                        {loading
                          ? (isEn ? 'Validating and submitting...' : 'Traitement et validation en cours...')
                          : (isEn ? 'Submit Quote Request' : 'Transmettre ma demande de devis')}
                      </Button>
                      <div
                        style={{
                          marginTop: '12px',
                          textAlign: 'center',
                          fontSize: '12.5px',
                          fontWeight: 600,
                          color: '#64748B',
                        }}
                      >
                        {isEn
                          ? 'Moussa Diagne commits to a prompt response within 24 to 48 business hours.'
                          : "Moussa Diagne s'engage à vous répondre sous 24 à 48 heures ouvrées."}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
};
