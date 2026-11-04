import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Phone,
  Mail,
  Sparkles,
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
  isBackendConfigured,
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

  const backendReady = isBackendConfigured();

  const handleCurrencyChange = (newCurrency: 'XOF' | 'EUR' | 'USD') => {
    setCurrencyMode(newCurrency);
    setFormData((prev) => ({ ...prev, currencyMode: newCurrency }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setErrors({});
    setSubmissionResponse(null);

    try {
      const response = await submitQuoteRequest(formData, locale);
      setSubmissionResponse(response);

      if (response.success) {
        trackQuoteSubmitted({
          service: formData.projectType,
          budget: formData.budget,
          currency: formData.currencyMode,
          country: formData.country,
          hasCompany: Boolean(formData.company),
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
      {/* 1. Hero & Cadrage */}
      <section
        style={{
          paddingTop: 'clamp(56px, 8vw, 96px)',
          paddingBottom: 'clamp(48px, 6vw, 72px)',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #DAE3ED',
        }}
      >
        <Container>
          {/* Breadcrumb */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              color: '#465670',
              marginBottom: '20px',
            }}
          >
            <NavLink href={getLocalizedHref('home', locale)} style={{ color: '#172A46', textDecoration: 'none', fontWeight: 500 }}>
              {isEn ? 'Home' : 'Accueil'}
            </NavLink>
            <span>/</span>
            <span style={{ color: '#19B8CD', fontWeight: 600 }}>
              {isEn ? 'Quote Request' : 'Demande de devis'}
            </span>
          </div>

          <div style={{ maxWidth: '820px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                backgroundColor: 'rgba(25, 184, 205, 0.1)',
                border: '1px solid rgba(25, 184, 205, 0.25)',
                borderRadius: '100px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#172A46',
                marginBottom: '20px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              <Sparkles size={14} color="#19B8CD" />
              <span>{isEn ? 'Technical Scoping & Pricing' : 'Chiffrage & Cadrage Technique'}</span>
            </div>

            <h1
              className="mt-h1"
              style={{
                color: '#0B1730',
                marginBottom: '16px',
                lineHeight: 1.15,
              }}
            >
              {isEn
                ? 'Describe your project, receive a clear tailored proposal.'
                : 'Décrivez votre projet, obtenez une proposition claire.'}
            </h1>

            <p
              className="mt-body mt-muted"
              style={{
                fontSize: '17px',
                lineHeight: 1.6,
                marginBottom: '28px',
              }}
            >
              {isEn
                ? 'Fill in this form to qualify your technical and business requirements. Moussa Diagne will analyze your project scope and deliver a clear proposal within 24 to 48 business hours.'
                : 'Remplissez ce formulaire pour qualifier votre besoin. Moussa Diagne analysera votre cahier des charges et vous transmettra une proposition technique et tarifaire sur mesure sous 24 à 48 heures ouvrées.'}
            </p>

            {/* Garanties */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '13px', color: '#172A46' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={16} color="#19B8CD" />
                <span>{isEn ? 'Response within 24-48 business hours' : 'Réponse sous 24h ouvrées'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={16} color="#19B8CD" />
                <span>{isEn ? 'Strict data privacy & confidentiality' : 'Confidentialité et respect de vos données'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#19B8CD" />
                <span>{isEn ? 'Transparent proposal, no hidden fees' : 'Devis détaillé sans frais cachés'}</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Formulaire & Traitement */}
      <section
        style={{
          padding: 'clamp(48px, 6vw, 80px) 0',
          backgroundColor: '#F4F7FB',
        }}
      >
        <Container>
          <div style={{ maxWidth: '840px', margin: '0 auto' }}>
            {/* Information sur l'état du backend */}
            {!backendReady && (
              <div
                style={{
                  marginBottom: '28px',
                  padding: '16px 20px',
                  backgroundColor: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  fontSize: '13px',
                  color: '#1E40AF',
                  lineHeight: 1.5,
                }}
              >
                <AlertCircle size={20} color="#2563EB" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>{isEn ? 'Active Qualification Mode:' : 'Mode de qualification active :'}</strong>
                  <p style={{ margin: '4px 0 0 0' }}>
                    {isEn
                      ? 'The automated dispatch server is in final configuration. This form validates all your technical criteria and pre-fills your message for direct transmission via WhatsApp or Email without re-typing.'
                      : 'Le serveur de réception automatique est en cours de configuration finale. Ce formulaire valide l’intégralité de vos critères techniques et prépare automatiquement votre message pour une transmission directe par WhatsApp ou Email sans ressaisie.'}
                  </p>
                </div>
              </div>
            )}

            {/* Écran de confirmation SUCCESS */}
            {submissionResponse?.success ? (
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #DAE3ED',
                  padding: 'clamp(36px, 6vw, 56px) 24px',
                  textAlign: 'center',
                  boxShadow: '0 8px 24px rgba(11, 23, 48, 0.05)',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(25, 184, 205, 0.15)',
                    color: '#19B8CD',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px auto',
                  }}
                >
                  <CheckCircle2 size={36} />
                </div>

                <h2 className="mt-h2" style={{ color: '#0B1730', marginBottom: '12px', fontSize: '26px' }}>
                  {isEn ? 'Quote Request Successfully Submitted!' : 'Demande de devis bien reçue !'}
                </h2>

                <p className="mt-body mt-muted" style={{ maxWidth: '520px', margin: '0 auto 24px auto', fontSize: '15px' }}>
                  {submissionResponse.message}
                </p>

                <div
                  style={{
                    padding: '16px',
                    backgroundColor: '#F4F7FB',
                    borderRadius: '10px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '14px',
                    color: '#172A46',
                  }}
                >
                  <Phone size={16} color="#19B8CD" />
                  <span>
                    {isEn
                      ? 'Urgent inquiry? Reach Moussa Diagne directly at +221 78 010 54 26'
                      : 'Une question urgente ? Joignez directement Moussa Diagne au +221 78 010 54 26'}
                  </span>
                </div>
              </div>
            ) : (
              /* Formulaire actif */
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #DAE3ED',
                  padding: 'clamp(20px, 4vw, 44px) clamp(12px, 2.5vw, 36px)',
                  boxShadow: '0 8px 24px rgba(11, 23, 48, 0.04)',
                }}
              >
                {/* Alerte Erreur Globale / Statut Backend */}
                {submissionResponse && !submissionResponse.success && (
                  <div
                    style={{
                      marginBottom: '28px',
                      padding: '16px 20px',
                      borderRadius: '10px',
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
                            padding: '8px 16px',
                            borderRadius: '8px',
                            fontSize: '13px',
                            fontWeight: 600,
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
                            backgroundColor: '#172A46',
                            color: '#FFFFFF',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            fontSize: '13px',
                            fontWeight: 600,
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

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {/* SECTION 1 : Coordonnées du contact */}
                    <div>
                      <h2
                        style={{
                          fontSize: '16px',
                          fontWeight: 700,
                          color: '#0B1730',
                          marginBottom: '16px',
                          paddingBottom: '8px',
                          borderBottom: '1px solid #E2E8F0',
                        }}
                      >
                        {isEn ? '1. Contact Details' : '1. Vos Coordonnées'}
                      </h2>

                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                          gap: '20px',
                        }}
                      >
                        <FormField label={isEn ? 'Full Name' : 'Nom complet'} id="fullName" required error={errors.fullName}>
                          <Input
                            id="fullName"
                            placeholder={isEn ? 'e.g. David Miller' : 'Ex. Moussa Ndiaye'}
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            disabled={loading}
                          />
                        </FormField>

                        <FormField label={isEn ? 'Work Email' : 'Email professionnel'} id="email" required error={errors.email}>
                          <Input
                            id="email"
                            type="email"
                            placeholder={isEn ? 'david@company.com' : 'moussa@entreprise.sn'}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            disabled={loading}
                          />
                        </FormField>

                        <FormField label={isEn ? 'Company / Organization (Optional)' : "Nom de l'entreprise (facultatif)"} id="company">
                          <Input
                            id="company"
                            placeholder={isEn ? 'e.g. Miller Logistics Ltd' : 'Ex. Ndiaye Logistique SARL'}
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            disabled={loading}
                          />
                        </FormField>

                        <FormField label={isEn ? 'Phone / WhatsApp (Optional)' : 'Téléphone / WhatsApp (facultatif)'} id="phone">
                          <Input
                            id="phone"
                            type="tel"
                            placeholder={isEn ? '+1 555 123 4567' : '+221 XX XXX XX XX'}
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            disabled={loading}
                          />
                        </FormField>

                        <FormField label={isEn ? 'Country' : 'Pays'} id="country" required error={errors.country}>
                          <Select
                            id="country"
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            options={countriesList.map((c) => ({ label: c.name, value: c.name }))}
                            disabled={loading}
                          />
                        </FormField>

                        <FormField label={isEn ? 'Industry' : "Secteur d'activité"} id="industry">
                          <Select
                            id="industry"
                            value={formData.industry}
                            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                            options={industriesList.map((ind) => ({ label: ind, value: ind }))}
                            disabled={loading}
                          />
                        </FormField>
                      </div>
                    </div>

                    {/* SECTION 2 : Périmètre du projet */}
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px',
                          marginBottom: '16px',
                          paddingBottom: '8px',
                          borderBottom: '1px solid #E2E8F0',
                        }}
                      >
                        <h2
                          style={{
                            fontSize: '16px',
                            fontWeight: 700,
                            color: '#0B1730',
                            margin: 0,
                          }}
                        >
                          {isEn ? '2. Project Scope & Requirements' : '2. Le Projet & Vos Attentes'}
                        </h2>

                        {/* Sélecteur de Devise International */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                          <span style={{ color: '#64748B' }}>{isEn ? 'Currency:' : 'Devise :'}</span>
                          {(['XOF', 'EUR', 'USD'] as const).map((cur) => (
                            <button
                              key={cur}
                              type="button"
                              onClick={() => handleCurrencyChange(cur)}
                              style={{
                                padding: '6px 12px',
                                minHeight: '36px',
                                borderRadius: '6px',
                                border: currencyMode === cur ? '1.5px solid #0B1730' : '1px solid #DAE3ED',
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
                          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                          gap: '20px',
                          marginBottom: '20px',
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
                          rows={6}
                          placeholder={
                            isEn
                              ? 'Example: We are an international logistics company and need a web application with real-time container tracking, automated PDF invoice generation, and Stripe checkout...'
                              : 'Exemple : Nous sommes une agence de transport basée à Dakar et souhaitons développer une plateforme web avec suivi des expéditions en temps réel, génération des bordereaux PDF et encaissement des frais via Wave...'
                          }
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          disabled={loading}
                        />
                      </FormField>
                    </div>

                    {/* SECTION 3 : Consentement & Confidentialité */}
                    <div style={{ paddingTop: '8px' }}>
                      <label
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          fontSize: '13px',
                          color: '#465670',
                          lineHeight: 1.5,
                          cursor: 'pointer',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={formData.consentPrivacy}
                          onChange={(e) => setFormData({ ...formData, consentPrivacy: e.target.checked })}
                          style={{ marginTop: '3px', cursor: 'pointer' }}
                        />
                        <span>
                          {isEn ? (
                            <>
                              I agree that the submitted information will be processed by MusaTech exclusively to respond to my quote request, in accordance with the{' '}
                              <NavLink href={getLocalizedHref('privacy', 'en')} style={{ color: '#19B8CD', textDecoration: 'none', fontWeight: 600 }}>
                                privacy policy
                              </NavLink>
                              . No personal data is ever sold or shared with third parties. *
                            </>
                          ) : (
                            <>
                              J’accepte que les données saisies soient traitées par MusaTech dans le cadre de ma demande de devis, conformément à la{' '}
                              <NavLink href={getLocalizedHref('privacy', 'fr')} style={{ color: '#19B8CD', textDecoration: 'none', fontWeight: 600 }}>
                                politique de confidentialité
                              </NavLink>
                              . Aucune donnée n’est vendue ni cédée à des tiers. *
                            </>
                          )}
                        </span>
                      </label>
                      {errors.consentPrivacy && (
                        <div style={{ color: '#DC2626', fontSize: '12px', marginTop: '6px' }}>
                          {errors.consentPrivacy}
                        </div>
                      )}
                    </div>

                    {/* Bouton de soumission */}
                    <div>
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        fullWidth
                        disabled={loading}
                        icon={<Send size={18} />}
                      >
                        {loading
                          ? (isEn ? 'Validating and submitting...' : 'Traitement et validation en cours...')
                          : (isEn ? 'Submit Quote Request' : 'Transmettre ma demande de devis')}
                      </Button>
                      <div
                        style={{
                          marginTop: '12px',
                          textAlign: 'center',
                          fontSize: '12px',
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
            )}
          </div>
        </Container>
      </section>
    </div>
  );
};
