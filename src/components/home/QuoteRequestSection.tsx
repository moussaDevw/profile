import React, { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle2, ShieldCheck, Clock, Phone } from 'lucide-react';
import { Container } from '../../design-system/Container';
import { SectionHeading } from '../../design-system/SectionHeading';
import { FormField } from '../../design-system/form/FormField';
import { Input } from '../../design-system/form/Input';
import { Select } from '../../design-system/form/Select';
import { Textarea } from '../../design-system/form/Textarea';
import { Button } from '../../design-system/Button';
import { useRouter } from '../../lib/router';
import { trackQuoteStarted, trackQuoteSubmitted } from '../../lib/analytics';

export const QuoteRequestSection: React.FC = () => {
  const { locale } = useRouter();
  const isEn = locale === 'en';

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const startedRef = useRef(false);

  const notifyStarted = () => {
    if (!startedRef.current) {
      startedRef.current = true;
      trackQuoteStarted({ service: formData.service, source: 'homepage_section', locale });
    }
  };

  const [formData, setFormData] = useState({
    service: 'sites-web',
    industry: isEn ? 'Real Estate' : 'Immobilier',
    budget: '500k_1m5',
    fullName: '',
    email: '',
    phone: '',
    description: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      let serviceParam = url.searchParams.get('service');
      if (!serviceParam && window.location.hash.includes('service=')) {
        serviceParam = window.location.hash.split('service=')[1]?.split('&')[0] || null;
      }
      if (
        serviceParam &&
        ['sites-web', 'e-commerce', 'logiciels-metier', 'applications-mobiles'].includes(
          serviceParam
        )
      ) {
        setFormData((prev) => ({ ...prev, service: serviceParam as string }));
      }

      let sectorParam = url.searchParams.get('sector');
      if (!sectorParam && window.location.hash.includes('sector=')) {
        sectorParam = window.location.hash.split('sector=')[1]?.split('&')[0] || null;
      }
      const sectorMapping: Record<string, string> = isEn
        ? {
          immobilier: 'Real Estate',
          'real-estate': 'Real Estate',
          education: 'Education',
          commerce: 'Retail',
          retail: 'Retail',
          logistique: 'Logistics',
          logistics: 'Logistics',
        }
        : {
          immobilier: 'Immobilier',
          'real-estate': 'Immobilier',
          education: 'Éducation',
          commerce: 'Commerce',
          retail: 'Commerce',
          logistique: 'Logistique',
          logistics: 'Logistique',
        };
      if (sectorParam && sectorMapping[sectorParam.toLowerCase()]) {
        setFormData((prev) => ({
          ...prev,
          industry: sectorMapping[sectorParam!.toLowerCase()],
        }));
      }
    }
  }, [isEn]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;

    const getDOMVal = (name: string, fallback: string): string => {
      const el = formEl.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
      if (el && typeof el.value === 'string' && el.value.trim().length > 0) {
        return el.value.trim();
      }
      return (fallback || '').trim();
    };

    const currentFullName = getDOMVal('fullName', formData.fullName);
    const currentEmail = getDOMVal('email', formData.email);
    const currentPhone = getDOMVal('phone', formData.phone);
    const currentDesc = getDOMVal('description', formData.description);

    setFormData((prev) => ({
      ...prev,
      fullName: currentFullName,
      email: currentEmail,
      phone: currentPhone,
      description: currentDesc,
    }));

    const newErrors: Record<string, string> = {};

    if (!currentFullName) {
      newErrors.fullName = isEn ? 'Please enter your full name.' : 'Veuillez renseigner votre nom complet.';
    }
    if (!currentEmail || !currentEmail.includes('@')) {
      newErrors.email = isEn ? 'Please enter a valid email address.' : 'Veuillez saisir une adresse email valide.';
    }
    if (!currentPhone) {
      newErrors.phone = isEn ? 'Please provide a valid phone or WhatsApp number.' : 'Veuillez indiquer un numéro WhatsApp ou téléphone joignable.';
    }
    if (!currentDesc || currentDesc.length < 10) {
      newErrors.description = isEn
        ? 'Please describe your project briefly (at least 10 characters).'
        : 'Veuillez décrire brièvement votre besoin (au moins 10 caractères).';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    trackQuoteSubmitted({
      service: formData.service,
      budget: formData.budget,
      currency: 'XOF',
      hasCompany: false,
      locale,
    });

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section
      id="devis"
      className="mt-section"
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #DAE3ED',
      }}
    >
      <Container>
        <SectionHeading
          tag={isEn ? 'Direct Quote Scoping' : 'Estimation Gratuite'}
          title={isEn ? 'Request a Tailored Proposal' : 'Demander un devis personnalisé'}
          description={
            isEn
              ? 'Fill in this brief overview to receive transparent technical advice and a custom proposal within 24 to 48 business hours.'
              : 'Remplissez ce formulaire pour recevoir une estimation transparente et adaptée à votre périmètre sous 24h ouvrées.'
          }
          align="center"
        />

        <div
          style={{
            maxWidth: '820px',
            margin: '0 auto',
            backgroundColor: '#F4F7FB',
            borderRadius: '16px',
            border: '1px solid #DAE3ED',
            padding: 'clamp(20px, 4vw, 44px) clamp(12px, 2.5vw, 36px)',
            boxShadow: '0 4px 20px -2px rgba(11, 23, 48, 0.05)',
          }}
        >
          {submitted ? (
            <div
              style={{
                textAlign: 'center',
                padding: '40px 20px',
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

              <h3 className="mt-h3" style={{ fontSize: '24px', color: '#0B1730', marginBottom: '12px' }}>
                {isEn ? 'Request Received Successfully!' : 'Demande bien reçue !'}
              </h3>

              <p className="mt-body mt-muted" style={{ maxWidth: '480px', margin: '0 auto 24px auto' }}>
                {isEn
                  ? 'Thank you for reaching out. Moussa Diagne will review your requirements and provide a tailored technical response within 24 to 48 business hours.'
                  : 'Merci pour votre confiance. Moussa Diagne étudiera votre projet et reviendra vers vous sous 24h ouvrées avec une proposition adaptée.'}
              </p>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#172A46', fontWeight: 600 }}>
                <Phone size={16} color="#19B8CD" />
                <span>
                  {isEn
                    ? 'Urgent matter? Contact me directly at +221 78 010 54 26'
                    : 'Urgence ? Échangez directement au +221 78 010 54 26'}
                </span>
              </div>
            </div>
          ) : (
              <form onSubmit={handleSubmit} onFocus={notifyStarted} onChange={notifyStarted} noValidate>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '20px' }}>
                  <FormField label={isEn ? 'Project Type' : 'Type de projet'} id="service" required>
                    <Select
                      id="service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      options={
                        isEn
                          ? [
                            { label: 'Corporate Website (From 250k XOF)', value: 'sites-web' },
                            { label: 'E-commerce Platform (From 600k XOF)', value: 'e-commerce' },
                            { label: 'Custom Business Software (From 1.5M XOF)', value: 'logiciels-metier' },
                            { label: 'Mobile App iOS/Android (From 1.8M XOF)', value: 'applications-mobiles' },
                            { label: 'Other Custom Solution', value: 'autre' },
                          ]
                          : [
                            { label: 'Site web professionnel (dès 250k FCFA)', value: 'sites-web' },
                            { label: 'Site e-commerce (dès 600k FCFA)', value: 'e-commerce' },
                            { label: 'Plateforme & Logiciel métier (dès 1.5M FCFA)', value: 'logiciels-metier' },
                            { label: 'Application mobile iOS/Android (dès 1.8M FCFA)', value: 'applications-mobiles' },
                            { label: 'Autre projet sur-mesure', value: 'autre' },
                          ]
                      }
                    />
                  </FormField>

                  <FormField label={isEn ? 'Industry' : "Secteur d'activité"} id="industry" required>
                    <Select
                      id="industry"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      options={
                        isEn
                          ? [
                            { label: 'Real Estate & Property', value: 'Real Estate' },
                            { label: 'Education & Training', value: 'Education' },
                            { label: 'Retail & Commerce', value: 'Retail' },
                            { label: 'Transport & Logistics', value: 'Logistics' },
                            { label: 'Healthcare & Medical', value: 'Healthcare' },
                            { label: 'Other Industry', value: 'Other' },
                          ]
                          : [
                            { label: 'Immobilier & Promotion', value: 'Immobilier' },
                            { label: 'Éducation & Formation', value: 'Éducation' },
                            { label: 'Commerce & Distribution', value: 'Commerce' },
                            { label: 'Transport & Logistique', value: 'Logistique' },
                            { label: 'Santé & Médical', value: 'Santé' },
                            { label: 'Autre secteur', value: 'Autre' },
                          ]
                      }
                    />
                  </FormField>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '20px' }}>
                  <FormField label={isEn ? 'Your Full Name' : 'Votre nom complet'} id="fullName" required error={errors.fullName}>
                    <Input
                      id="fullName"
                      name="fullName"
                      autoComplete="name"
                      placeholder={isEn ? 'e.g. David Miller' : 'Ex. Amadou Ndiaye'}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      onInput={(e) => setFormData((prev) => ({ ...prev, fullName: (e.target as HTMLInputElement).value }))}
                      error={!!errors.fullName}
                    />
                  </FormField>

                  <FormField label={isEn ? 'Email' : 'Adresse email'} id="email" required error={errors.email}>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder={isEn ? 'e.g. name@example.com' : 'Ex. amadou@gmail.com'}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onInput={(e) => setFormData((prev) => ({ ...prev, email: (e.target as HTMLInputElement).value }))}
                      error={!!errors.email}
                    />
                  </FormField>

                  <FormField label={isEn ? 'Phone / WhatsApp' : 'Téléphone / WhatsApp'} id="phone" required error={errors.phone}>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder={isEn ? '+1 555 123 4567' : '+221 77 000 00 00'}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      onInput={(e) => setFormData((prev) => ({ ...prev, phone: (e.target as HTMLInputElement).value }))}
                      error={!!errors.phone}
                    />
                  </FormField>
                </div>

                <FormField
                  label={isEn ? 'Brief Overview of Your Needs' : 'Description synthétique de votre besoin'}
                  id="description"
                  required
                  hint={
                    isEn
                      ? 'Outline your business objectives, expected features, and target timeframe.'
                      : 'Détaillez vos objectifs, fonctionnalités attendues et éventuelles échéances.'
                  }
                  error={errors.description}
                >
                  <Textarea
                    id="description"
                    name="description"
                    rows={4}
                    placeholder={
                      isEn
                        ? 'We are looking to develop a secure web application to streamline our customer orders...'
                        : 'Nous souhaitons moderniser notre plateforme pour...'
                    }
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    onInput={(e) => setFormData((prev) => ({ ...prev, description: (e.target as HTMLTextAreaElement).value }))}
                    error={!!errors.description}
                  />
                </FormField>

                <div
                  className="mt-quote-submit-row"
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    paddingTop: '16px',
                    borderTop: '1px solid #DAE3ED',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', color: '#465670' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Clock size={15} color="#19B8CD" />
                      <span>{isEn ? '24h response' : 'Réponse sous 24h'}</span>
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <ShieldCheck size={15} color="#19B8CD" />
                      <span>{isEn ? 'No commitment' : 'Sans engagement'}</span>
                    </span>
                  </div>

                  <Button
                    type="submit"
                    variant="cyan"
                    size="lg"
                    disabled={loading}
                    icon={<Send size={16} />}
                    className="mt-quote-submit-btn"
                  >
                    {loading
                      ? (isEn ? 'Submitting...' : 'Envoi en cours...')
                      : (isEn ? 'Submit My Inquiry' : 'Envoyer ma demande')}
                  </Button>
                </div>
              </form>
          )}
            </div>
      </Container>
    </section>
  );
};
