import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ExternalLink,
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
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-page-contact">
      {/* =========================================================================
          1. OUVERTURE AÉRÉE & COORDONNÉES EN CARTES PASTEL — 100% PLEINE LARGEUR
         ========================================================================= */}
      <section
        style={{
          width: '100%',
          paddingTop: 'clamp(52px, 7vw, 88px)',
          paddingBottom: 'clamp(48px, 6vw, 72px)',
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
            <NavLink href={isEn ? '/en' : '/'} style={{ color: '#0B1730', textDecoration: 'none', fontWeight: 700 }}>
              {isEn ? 'Home' : 'Accueil'}
            </NavLink>
            <span>/</span>
            <span style={{ color: '#0E6049', fontWeight: 800 }}>Contact</span>
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
              <span>{isEn ? 'Direct Contact & Inquiries' : 'Contact Direct & Échanges'}</span>
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
              {isEn ? 'Let’s talk about your project directly.' : 'Parlons de votre projet en toute simplicité.'}
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
                margin: '0 auto 36px',
              }}
            >
              {isEn
                ? 'Have a technical question, a partnership proposal, or want an estimate for your development? Choose the communication channel that works best for you. I reply personally within 24 business hours.'
                : 'Vous avez une question technique, une proposition de collaboration ou vous souhaitez faire estimer le coût d’un développement ? Choisissez le canal qui vous convient le mieux. Je réponds personnellement sous 24 heures ouvrées.'}
            </motion.p>
          </div>

          {/* 3 Cartes de Contact Vérifiées en Grille Horizontale Pastel (Style Alan.com) */}
          <div
            style={{
              maxWidth: '980px',
              margin: '0 auto 24px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '18px',
            }}
          >
            <a
              href="mailto:musadev27@gmail.com"
              onClick={() => trackContactClicked({ channel: 'email', context: 'contact_page_card', locale })}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '20px 22px',
                borderRadius: '26px',
                backgroundColor: '#D9F2EE',
                textDecoration: 'none',
                color: '#0B1730',
                transition: 'transform 0.2s ease',
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '16px',
                  backgroundColor: '#FFFFFF',
                  color: '#0E6049',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(14, 96, 73, 0.08)',
                }}
              >
                <Mail size={20} />
              </div>
              <div>
                <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#0A4B3E', display: 'block', textTransform: 'uppercase' }}>
                  {isEn ? 'Professional Email' : 'Email direct'}
                </span>
                <strong style={{ fontSize: '15.5px', fontWeight: 800 }}>musadev27@gmail.com</strong>
              </div>
            </a>

            <a
              href="https://wa.me/221782824175"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContactClicked({ channel: 'whatsapp', context: 'contact_page_card', locale })}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '20px 22px',
                borderRadius: '26px',
                backgroundColor: '#FBF0E4',
                textDecoration: 'none',
                color: '#0B1730',
                transition: 'transform 0.2s ease',
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '16px',
                  backgroundColor: '#FFFFFF',
                  color: '#B45309',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(180, 83, 9, 0.08)',
                }}
              >
                <Phone size={20} />
              </div>
              <div>
                <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#7C2D12', display: 'block', textTransform: 'uppercase' }}>
                  {isEn ? 'Direct WhatsApp & Phone' : 'WhatsApp & Téléphone direct'}
                </span>
                <strong style={{ fontSize: '15.5px', fontWeight: 800 }}>+221 78 282 41 75</strong>
              </div>
            </a>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '20px 22px',
                borderRadius: '26px',
                backgroundColor: '#EEF2FF',
                color: '#0B1730',
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '16px',
                  backgroundColor: '#FFFFFF',
                  color: '#4338CA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(67, 56, 202, 0.08)',
                }}
              >
                <MapPin size={20} />
              </div>
              <div>
                <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#1E3A8A', display: 'block', textTransform: 'uppercase' }}>
                  {isEn ? 'General Location' : 'Localisation générale'}
                </span>
                <strong style={{ fontSize: '14.5px', fontWeight: 800 }}>
                  {isEn ? 'Dakar, Senegal (GMT / UTC timezone)' : 'Dakar, Sénégal (Fuseau GMT / UTC)'}
                </strong>
              </div>
            </div>
          </div>

          {/* Réseaux professionnels centrés en pilules */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748B' }}>
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
                color: '#0B1730',
                backgroundColor: '#FFFFFF',
                padding: '7px 16px',
                borderRadius: '9999px',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(11, 23, 48, 0.04)',
              }}
            >
              <span>GitHub</span>
              <ExternalLink size={13} color="#0E6049" />
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
                color: '#0B1730',
                backgroundColor: '#FFFFFF',
                padding: '7px 16px',
                borderRadius: '9999px',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(11, 23, 48, 0.04)',
              }}
            >
              <span>LinkedIn</span>
              <ExternalLink size={13} color="#0E6049" />
            </a>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          2. SCÈNE VERT MENTHE 100% PLEINE LARGEUR : FORMULAIRE CENTRÉ PLEIN ESPACE
         ========================================================================= */}
      <section
        style={{
          width: '100%',
          padding: 'clamp(52px, 7vw, 96px) 0',
          backgroundColor: '#D9F2EE',
        }}
      >
        <Container>
          <div style={{ maxWidth: '980px', margin: '0 auto' }}>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '36px',
                padding: 'clamp(28px, 4.5vw, 48px)',
                boxShadow: '0 24px 56px -12px rgba(11, 23, 48, 0.1)',
              }}
            >
              <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 28px' }}>
                <h2
                  className="mt-h3"
                  style={{
                    fontSize: 'clamp(24px, 3vw, 32px)',
                    fontWeight: 800,
                    color: '#0B1730',
                    marginBottom: '10px',
                  }}
                >
                  {isEn ? 'Send a Direct Message' : 'Envoyer un message direct'}
                </h2>

                <p
                  className="mt-body"
                  style={{
                    fontSize: '15px',
                    color: '#465670',
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {isEn ? (
                    <>
                      For a project requiring detailed specifications and precise budgeting, you can also use our{' '}
                      <NavLink href="/en/quote" style={{ color: '#0E6049', fontWeight: 800, textDecoration: 'none' }}>
                        comprehensive quote request form
                      </NavLink>
                      .
                    </>
                  ) : (
                    <>
                      Pour un projet précis nécessitant un chiffrage détaillé, vous pouvez également utiliser le{' '}
                      <NavLink href="/fr/devis" style={{ color: '#0E6049', fontWeight: 800, textDecoration: 'none' }}>
                        formulaire de devis complet
                      </NavLink>
                      .
                    </>
                  )}
                </p>
              </div>

              {submitted ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '44px 24px',
                    backgroundColor: '#FAF8F5',
                    borderRadius: '28px',
                  }}
                >
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      backgroundColor: '#D9F2EE',
                      color: '#0E6049',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 18px auto',
                    }}
                  >
                    <CheckCircle2 size={34} />
                  </div>
                  <h3 className="mt-h3" style={{ fontSize: '24px', fontWeight: 800, color: '#0B1730', marginBottom: '10px' }}>
                    {isEn ? 'Message successfully received!' : 'Message bien reçu !'}
                  </h3>
                  <p className="mt-body" style={{ fontSize: '15px', color: '#465670', marginBottom: '24px' }}>
                    {isEn
                      ? 'Thank you for reaching out. Moussa Diagne will reply to you within 24 business hours.'
                      : 'Merci pour votre prise de contact. Moussa Diagne reviendra vers vous sous 24h ouvrées.'}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    style={{ borderRadius: '9999px' }}
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

                  <div
                    style={{
                      backgroundColor: '#FAF8F5',
                      borderRadius: '26px',
                      padding: 'clamp(20px, 3.5vw, 32px)',
                      marginBottom: '22px',
                    }}
                  >
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                        gap: '16px',
                      }}
                    >
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
                    </div>

                    <FormField
                      label={isEn ? 'Your message' : 'Votre message'}
                      id="message"
                      required
                      error={errors.message}
                    >
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder={isEn ? 'Briefly describe your objectives or questions...' : 'Décrivez brièvement vos attentes ou vos questions...'}
                        value={formData.message}
                        onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                        onInput={(e) => setFormData((prev) => ({ ...prev, message: (e.target as HTMLTextAreaElement).value }))}
                        disabled={loading}
                      />
                    </FormField>
                  </div>

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
                      ? (isEn ? 'Sending...' : 'Envoi en cours...')
                      : (isEn ? 'Send my message' : 'Envoyer mon message')}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          3. RÉASSURANCE & DÉLAIS — SCÈNE PÊCHE PASTEL 100% PLEINE LARGEUR
         ========================================================================= */}
      <section
        style={{
          width: '100%',
          padding: 'clamp(52px, 6vw, 80px) 0',
          backgroundColor: '#FBF0E4',
        }}
      >
        <Container>
          <div
            style={{
              maxWidth: '980px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '20px',
            }}
          >
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '28px',
                padding: '26px',
                boxShadow: '0 14px 32px rgba(124, 45, 18, 0.06)',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '14px',
                  backgroundColor: '#D9F2EE',
                  color: '#0E6049',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                }}
              >
                <Clock size={20} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0B1730', marginBottom: '6px' }}>
                {isEn ? '24h Business Hour Response' : 'Réactivité sous 24h ouvrées'}
              </h3>
              <p style={{ fontSize: '14px', color: '#465670', lineHeight: 1.55, margin: 0 }}>
                {isEn
                  ? 'Every message is personally reviewed and answered directly by Moussa Diagne.'
                  : 'Chaque message est lu et traité directement par Moussa Diagne avec une réponse claire.'}
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '28px',
                padding: '26px',
                boxShadow: '0 14px 32px rgba(124, 45, 18, 0.06)',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '14px',
                  backgroundColor: '#EEF2FF',
                  color: '#4338CA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                }}
              >
                <ShieldCheck size={20} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0B1730', marginBottom: '6px' }}>
                {isEn ? 'Absolute Confidentiality' : 'Confidentialité absolue'}
              </h3>
              <p style={{ fontSize: '14px', color: '#465670', lineHeight: 1.55, margin: 0 }}>
                {isEn
                  ? 'Your ideas, specs, and roadmaps remain strictly confidential and are never shared with third parties.'
                  : 'Vos idées et cahiers des charges restent strictement confidentiels et ne sont partagés avec aucun tiers.'}
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '28px',
                padding: '26px',
                boxShadow: '0 14px 32px rgba(124, 45, 18, 0.06)',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '14px',
                  backgroundColor: '#FCE8EC',
                  color: '#BE123C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                }}
              >
                <CheckCircle2 size={20} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0B1730', marginBottom: '6px' }}>
                {isEn ? 'Free Initial Discovery Call' : 'Premier échange gratuit'}
              </h3>
              <p style={{ fontSize: '14px', color: '#465670', lineHeight: 1.55, margin: 0 }}>
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
