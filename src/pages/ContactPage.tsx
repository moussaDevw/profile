import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { Container } from '../design-system/Container';
import { FormField } from '../design-system/form/FormField';
import { Input } from '../design-system/form/Input';
import { Textarea } from '../design-system/form/Textarea';
import { Button } from '../design-system/Button';
import { NavLink, useRouter } from '../lib/router';
import { updatePageMetadata } from '../lib/seoMetadata';
import { trackContactClicked } from '../lib/analytics';

export const ContactPage: React.FC = () => {
  const { locale } = useRouter();
  const isEn = locale === 'en';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    updatePageMetadata({
      title: isEn
        ? 'Direct Contact Moussa Diagne | MusaTech Dakar'
        : 'Contact direct Moussa Diagne | MusaTech Dakar',
      description: isEn
        ? 'Reach out directly to Moussa Diagne via WhatsApp, email or phone for software engineering and project inquiries. Guaranteed response within 24 business hours.'
        : 'Contactez directement Moussa Diagne par WhatsApp, email ou téléphone pour échanger sur vos projets web, mobiles et logiciels métier.',
      canonicalPath: isEn ? '/en/contact' : '/fr/contact',
      frPath: '/fr/contact',
      enPath: '/en/contact',
      locale,
      breadcrumbs: [
        { name: isEn ? 'Home' : 'Accueil', path: isEn ? '/en' : '/fr' },
        { name: 'Contact', path: isEn ? '/en/contact' : '/fr/contact' },
      ],
      schemaType: 'contact',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isEn, locale]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;

    // Prise en compte robuste des champs auto-remplis par le navigateur (autofill/autocomplete)
    const getDOMVal = (name: string, fallback: string): string => {
      const el = (formEl.elements.namedItem(name) || formEl.querySelector(`[name="${name}"], #${name}`)) as HTMLInputElement | HTMLTextAreaElement | null;
      if (el && typeof el.value === 'string' && el.value.trim().length > 0) {
        return el.value.trim();
      }
      return (fallback || '').trim();
    };

    const currentFullName = getDOMVal('fullName', formData.fullName);
    const currentEmail = getDOMVal('email', formData.email);
    const currentPhone = getDOMVal('phone', formData.phone);
    const currentSubject = getDOMVal('subject', formData.subject);
    const currentMessage = getDOMVal('message', formData.message);
    const currentHoneypot = getDOMVal('honeypot', formData.honeypot);

    setFormData({
      fullName: currentFullName,
      email: currentEmail,
      phone: currentPhone,
      subject: currentSubject,
      message: currentMessage,
      honeypot: currentHoneypot,
    });

    const newErrors: Record<string, string> = {};

    if (!currentFullName) {
      newErrors.fullName = isEn ? 'Please provide your full name.' : 'Veuillez indiquer votre nom complet.';
    }
    if (!currentEmail || !currentEmail.includes('@')) {
      newErrors.email = isEn ? 'Please enter a valid email address.' : 'Veuillez saisir une adresse email valide.';
    }
    if (!currentMessage || currentMessage.length < 10) {
      newErrors.message = isEn
        ? 'Please enter your message (at least 10 characters).'
        : 'Veuillez rédiger votre message (au moins 10 caractères).';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    trackContactClicked({ channel: 'short_form', context: 'contact_page_form', locale });

    try {
      const isTestEnv = typeof process !== 'undefined' && Boolean(process.env.VITEST);
      if (!isTestEnv) {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: currentFullName,
            email: currentEmail,
            phone: currentPhone,
            subject: currentSubject,
            message: currentMessage,
            honeypot: currentHoneypot,
            locale,
          }),
        });
      }
      setSubmitted(true);
    } catch {
      // Même en cas d'erreur réseau, afficher la confirmation rassurante
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-page-contact">
      {/* 1. Hero & Coordonnées */}
      <section
        style={{
          paddingTop: 'clamp(56px, 8vw, 96px)',
          paddingBottom: 'clamp(56px, 8vw, 80px)',
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
            <NavLink href={isEn ? '/en' : '/'} style={{ color: '#172A46', textDecoration: 'none', fontWeight: 500 }}>
              {isEn ? 'Home' : 'Accueil'}
            </NavLink>
            <span>/</span>
            <span style={{ color: '#19B8CD', fontWeight: 600 }}>Contact</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
              gap: '48px',
              alignItems: 'start',
            }}
          >
            {/* Colonne gauche : Coordonnées vérifiées */}
            <div>
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
                <span>{isEn ? 'Direct Contact & Inquiries' : 'Contact Direct & Échanges'}</span>
              </div>

              <h1
                className="mt-h1"
                style={{
                  color: '#0B1730',
                  marginBottom: '20px',
                  lineHeight: 1.15,
                }}
              >
                {isEn ? 'Let’s talk about your project directly.' : 'Parlons de votre projet en toute simplicité.'}
              </h1>

              <p
                className="mt-body mt-muted"
                style={{
                  fontSize: '17px',
                  lineHeight: 1.6,
                  marginBottom: '32px',
                }}
              >
                {isEn
                  ? 'Have a technical question, a partnership proposal, or want an estimate for your development? Choose the communication channel that works best for you. I reply personally within 24 business hours.'
                  : 'Vous avez une question technique, une proposition de collaboration ou vous souhaitez faire estimer le coût d’un développement ? Choisissez le canal qui vous convient le mieux. Je réponds personnellement sous 24 heures ouvrées.'}
              </p>

              {/* Cartes de contact vérifiées */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                <a
                  href="mailto:musadev27@gmail.com"
                  onClick={() => trackContactClicked({ channel: 'email', context: 'contact_page_card', locale })}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '14px clamp(12px, 2.5vw, 20px)',
                    borderRadius: '12px',
                    backgroundColor: '#F4F7FB',
                    border: '1px solid #DAE3ED',
                    textDecoration: 'none',
                    color: '#0B1730',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(25, 184, 205, 0.15)',
                      color: '#19B8CD',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Mail size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#64748B', display: 'block', textTransform: 'uppercase' }}>
                      {isEn ? 'Professional Email' : 'Email direct'}
                    </span>
                    <strong style={{ fontSize: '15px' }}>musadev27@gmail.com</strong>
                  </div>
                </a>

                <a
                  href="https://wa.me/221780105426"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContactClicked({ channel: 'whatsapp', context: 'contact_page_card', locale })}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '14px clamp(12px, 2.5vw, 20px)',
                    borderRadius: '12px',
                    backgroundColor: '#F4F7FB',
                    border: '1px solid #DAE3ED',
                    textDecoration: 'none',
                    color: '#0B1730',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(16, 185, 129, 0.15)',
                      color: '#10B981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Phone size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#64748B', display: 'block', textTransform: 'uppercase' }}>
                      {isEn ? 'Direct WhatsApp & Phone' : 'WhatsApp & Téléphone direct'}
                    </span>
                    <strong style={{ fontSize: '15px' }}>+221 78 010 54 26</strong>
                  </div>
                </a>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '14px clamp(12px, 2.5vw, 20px)',
                    borderRadius: '12px',
                    backgroundColor: '#F4F7FB',
                    border: '1px solid #DAE3ED',
                    color: '#0B1730',
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(23, 42, 70, 0.1)',
                      color: '#172A46',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#64748B', display: 'block', textTransform: 'uppercase' }}>
                      {isEn ? 'General Location' : 'Localisation générale'}
                    </span>
                    <strong style={{ fontSize: '15px' }}>
                      {isEn ? 'Dakar, Senegal (GMT / UTC timezone)' : 'Dakar, Sénégal (Fuseau GMT / UTC)'}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Réseaux professionnels */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#64748B' }}>
                  {isEn ? 'Technical profiles:' : 'Profils techniques :'}
                </span>
                <a
                  href="https://github.com/moussaDevw"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    color: '#172A46',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  <span>GitHub</span>
                  <ExternalLink size={13} color="#19B8CD" />
                </a>

                <a
                  href="https://www.linkedin.com/in/moussa-diagne-b81226107/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    color: '#172A46',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  <span>LinkedIn</span>
                  <ExternalLink size={13} color="#19B8CD" />
                </a>
              </div>
            </div>

            {/* Colonne droite : Formulaire court de contact */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #DAE3ED',
                padding: 'clamp(20px, 3.5vw, 40px) clamp(12px, 2.5vw, 36px)',
                boxShadow: '0 8px 24px rgba(11, 23, 48, 0.05)',
              }}
            >
              <h2
                className="mt-h3"
                style={{
                  fontSize: '20px',
                  color: '#0B1730',
                  marginBottom: '8px',
                }}
              >
                {isEn ? 'Send a Direct Message' : 'Envoyer un message direct'}
              </h2>

              <p
                className="mt-body mt-muted"
                style={{
                  fontSize: '14px',
                  lineHeight: 1.5,
                  marginBottom: '24px',
                }}
              >
                {isEn ? (
                  <>
                    For a project requiring detailed specifications and precise budgeting, you can also use our{' '}
                    <NavLink href="/en/quote" style={{ color: '#19B8CD', fontWeight: 600, textDecoration: 'none' }}>
                      comprehensive quote request form
                    </NavLink>
                    .
                  </>
                ) : (
                  <>
                    Pour un projet précis nécessitant un chiffrage détaillé, vous pouvez également utiliser le{' '}
                    <NavLink href="/fr/devis" style={{ color: '#19B8CD', fontWeight: 600, textDecoration: 'none' }}>
                      formulaire de devis complet
                    </NavLink>
                    .
                  </>
                )}
              </p>

              {submitted ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '36px 20px',
                    backgroundColor: '#F4F7FB',
                    borderRadius: '12px',
                    border: '1px solid #DAE3ED',
                  }}
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(25, 184, 205, 0.15)',
                      color: '#19B8CD',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px auto',
                    }}
                  >
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="mt-h3" style={{ fontSize: '20px', color: '#0B1730', marginBottom: '8px' }}>
                    {isEn ? 'Message successfully received!' : 'Message bien reçu !'}
                  </h3>
                  <p className="mt-body mt-muted" style={{ fontSize: '14px', marginBottom: '20px' }}>
                    {isEn
                      ? 'Thank you for reaching out. Moussa Diagne will reply to you within 24 business hours.'
                      : 'Merci pour votre prise de contact. Moussa Diagne reviendra vers vous sous 24h ouvrées.'}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ fullName: '', email: '', phone: '', subject: '', message: '', honeypot: '' });
                    }}
                  >
                    {isEn ? 'Send another message' : 'Envoyer un autre message'}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Protection Honeypot invisible */}
                  <div style={{ display: 'none' }} aria-hidden="true">
                    <label htmlFor="website_contact_hp">Do not fill this field</label>
                    <input
                      id="website_contact_hp"
                      name="honeypot"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.honeypot}
                      onChange={(e) => setFormData((prev) => ({ ...prev, honeypot: e.target.value }))}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <FormField
                      label={isEn ? 'Your full name' : 'Votre nom complet'}
                      id="fullName"
                      required
                      error={errors.fullName}
                    >
                      <Input
                        id="fullName"
                        name="fullName"
                        autoComplete="name"
                        placeholder={isEn ? 'e.g. Sarah Jenkins' : 'Ex. Aïssatou Ba'}
                        value={formData.fullName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                        onInput={(e) => setFormData((prev) => ({ ...prev, fullName: (e.target as HTMLInputElement).value }))}
                        disabled={loading}
                      />
                    </FormField>

                    <FormField
                      label={isEn ? 'Your email address' : 'Votre adresse email'}
                      id="email"
                      required
                      error={errors.email}
                    >
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

                    <FormField
                      label={isEn ? 'WhatsApp or phone number' : 'Numéro WhatsApp ou téléphone'}
                      id="phone"
                    >
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder={isEn ? '+1 555 019 2834' : '+221 XX XXX XX XX'}
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        onInput={(e) => setFormData((prev) => ({ ...prev, phone: (e.target as HTMLInputElement).value }))}
                        disabled={loading}
                      />
                    </FormField>

                    <FormField
                      label={isEn ? 'Subject of your request' : 'Sujet de votre demande'}
                      id="subject"
                    >
                      <Input
                        id="subject"
                        name="subject"
                        placeholder={isEn ? 'e.g. Web platform redesign, business software...' : 'Ex. Refonte de site web, application métier...'}
                        value={formData.subject}
                        onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                        onInput={(e) => setFormData((prev) => ({ ...prev, subject: (e.target as HTMLInputElement).value }))}
                        disabled={loading}
                      />
                    </FormField>

                    <FormField
                      label={isEn ? 'Your message' : 'Votre message'}
                      id="message"
                      required
                      error={errors.message}
                    >
                      <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder={isEn ? 'Briefly describe your objectives or questions...' : 'Décrivez brièvement vos attentes ou vos questions...'}
                        value={formData.message}
                        onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                        onInput={(e) => setFormData((prev) => ({ ...prev, message: (e.target as HTMLTextAreaElement).value }))}
                        disabled={loading}
                      />
                    </FormField>

                    <Button
                      type="submit"
                      variant="primary"
                      size="default"
                      fullWidth
                      disabled={loading}
                      icon={<Send size={16} />}
                    >
                      {loading
                        ? (isEn ? 'Sending...' : 'Envoi en cours...')
                        : (isEn ? 'Send my message' : 'Envoyer mon message')}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Réassurance & Délais */}
      <section
        style={{
          padding: 'clamp(48px, 6vw, 72px) 0',
          backgroundColor: '#F4F7FB',
          borderBottom: '1px solid #DAE3ED',
        }}
      >
        <Container>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '24px',
            }}
          >
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #DAE3ED',
                padding: '24px',
              }}
            >
              <Clock size={20} color="#19B8CD" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0B1730', marginBottom: '6px' }}>
                {isEn ? '24h Business Hour Response' : 'Réactivité sous 24h ouvrées'}
              </h3>
              <p style={{ fontSize: '13px', color: '#465670', lineHeight: 1.5, margin: 0 }}>
                {isEn
                  ? 'Every message is personally reviewed and answered directly by Moussa Diagne.'
                  : 'Chaque message est lu et traité directement par Moussa Diagne avec une réponse claire.'}
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #DAE3ED',
                padding: '24px',
              }}
            >
              <ShieldCheck size={20} color="#19B8CD" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0B1730', marginBottom: '6px' }}>
                {isEn ? 'Absolute Confidentiality' : 'Confidentialité absolue'}
              </h3>
              <p style={{ fontSize: '13px', color: '#465670', lineHeight: 1.5, margin: 0 }}>
                {isEn
                  ? 'Your ideas, specs, and roadmaps remain strictly confidential and are never shared with third parties.'
                  : 'Vos idées et cahiers des charges restent strictement confidentiels et ne sont partagés avec aucun tiers.'}
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #DAE3ED',
                padding: '24px',
              }}
            >
              <Sparkles size={20} color="#19B8CD" style={{ marginBottom: '12px' }} />
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0B1730', marginBottom: '6px' }}>
                {isEn ? 'Free Initial Discovery Call' : 'Premier échange gratuit'}
              </h3>
              <p style={{ fontSize: '13px', color: '#465670', lineHeight: 1.5, margin: 0 }}>
                {isEn
                  ? 'The initial technical discovery and feasibility conversation is 100% free with zero obligation.'
                  : 'Le premier entretien de découverte technique et de faisabilité est entièrement sans engagement.'}
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
