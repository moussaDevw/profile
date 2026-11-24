import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  RotateCcw,
  Smartphone,
  Phone,
  ArrowLeft,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';
import { Container } from '../design-system/Container';
import { LinkButton } from '../design-system/Button';
import { useRouter } from '../lib/router';
import { updatePageMetadata } from '../lib/seoMetadata';
import { getLocalizedHref } from '../lib/i18nRoutes';

export const PaymentErrorPage: React.FC = () => {
  const { locale } = useRouter();
  const isEn = locale === 'en';

  // Lecture des paramètres d'erreur éventuels transmis par la passerelle ou l'app mobile
  const [errorParams] = useState(() => {
    if (typeof window === 'undefined') {
      return {
        reason: '',
        code: '',
        reference: '',
        deepLink: '',
        retryUrl: '',
      };
    }
    const params = new URLSearchParams(window.location.search);
    return {
      reason:
        params.get('reason') ||
        params.get('message') ||
        params.get('error_description') ||
        params.get('error') ||
        '',
      code: params.get('code') || params.get('error_code') || params.get('status') || '',
      reference:
        params.get('ref') ||
        params.get('reference') ||
        params.get('transaction_id') ||
        params.get('tx') ||
        '',
      deepLink:
        params.get('redirect_uri') ||
        params.get('deeplink') ||
        params.get('app_scheme') ||
        params.get('return_url') ||
        '',
      retryUrl: params.get('retry_url') || '',
    };
  });

  useEffect(() => {
    updatePageMetadata({
      title: isEn
        ? 'Payment Unsuccessful | MusaTech Mobile Payment'
        : 'Paiement Non Abouti | MusaTech Application Mobile',
      description: isEn
        ? 'Your payment could not be finalized or was cancelled. Return to the mobile app to try again.'
        : 'Votre paiement n’a pas pu être finalisé ou a été annulé. Retournez sur l’application mobile pour réessayer.',
      canonicalPath: isEn ? '/en/error' : '/fr/error',
      frPath: '/fr/error',
      enPath: '/en/error',
      locale,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isEn, locale]);

  const handleRetryOrReturn = () => {
    if (errorParams.retryUrl) {
      window.location.href = errorParams.retryUrl;
      return;
    }
    if (errorParams.deepLink) {
      window.location.href = errorParams.deepLink;
      return;
    }
    try {
      window.close();
    } catch {
      // Ignorer si bloqué par le navigateur
    }
  };

  const commonCauses = isEn
    ? [
        'Transaction cancelled or confirmation window expired on your phone.',
        'Insufficient balance or daily transaction limit reached (Wave, Orange Money, or Card).',
        'Temporary network interruption during mobile payment validation.',
      ]
    : [
        'La transaction a été annulée ou le délai de validation sur votre téléphone a expiré.',
        'Solde insuffisant ou plafond journalier atteint sur votre compte (Wave, Orange Money ou Carte).',
        'Coupure temporaire de connexion pendant la confirmation du paiement.',
      ];

  return (
    <div className="mt-page-payment-error">
      {/* SCÈNE ROSE PASTEL 100% PLEINE LARGEUR (STYLE ALAN.COM) */}
      <section
        style={{
          width: '100%',
          minHeight: 'calc(100vh - 72px)',
          backgroundColor: '#FCE8EC',
          padding: 'clamp(44px, 7vw, 88px) 0',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container>
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            {/* En-tête d'alerte centré */}
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  backgroundColor: '#E11D48',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 22px',
                  boxShadow: '0 20px 40px rgba(225, 29, 72, 0.25)',
                  border: '6px solid #FFFFFF',
                }}
              >
                <AlertCircle size={42} strokeWidth={2.6} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#FFFFFF',
                  color: '#831843',
                  padding: '7px 18px',
                  borderRadius: '9999px',
                  fontSize: '12.5px',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  boxShadow: '0 4px 14px rgba(131, 24, 67, 0.06)',
                  marginBottom: '18px',
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#E11D48' }} />
                <span>{isEn ? 'PAYMENT UNSUCCESSFUL' : 'PAIEMENT NON ABOUTI'}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.12 }}
                className="mt-h1"
                style={{
                  color: '#0B1730',
                  fontSize: 'clamp(30px, 5vw, 46px)',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  marginBottom: '14px',
                }}
              >
                {isEn
                  ? 'The payment could not be completed.'
                  : 'Le paiement n’a pas pu être finalisé.'}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.16 }}
                className="mt-body"
                style={{
                  color: '#4A1D2E',
                  fontSize: 'clamp(16px, 2vw, 18px)',
                  lineHeight: 1.6,
                  maxWidth: '540px',
                  margin: '0 auto',
                }}
              >
                {isEn
                  ? 'No amount is charged when a transaction is cancelled or interrupted. You can return to the mobile app to try again.'
                  : 'Aucun montant n’est débité lorsqu’une transaction est annulée ou interrompue. Vous pouvez retourner sur l’application mobile pour réessayer en toute sécurité.'}
              </motion.p>
            </div>

            {/* Carte Flottante Blanche Diagnostic & Actions */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 85, damping: 18, delay: 0.18 }}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '36px',
                padding: 'clamp(24px, 4.5vw, 40px)',
                boxShadow: '0 26px 60px -12px rgba(131, 24, 67, 0.12)',
              }}
            >
              {/* Détail de l'erreur si transmis dans l'URL */}
              {(errorParams.reason || errorParams.code || errorParams.reference) && (
                <div
                  style={{
                    backgroundColor: '#FEF2F2',
                    border: '1px solid #FECACA',
                    borderRadius: '22px',
                    padding: '16px 20px',
                    marginBottom: '22px',
                    fontSize: '13.5px',
                    color: '#991B1B',
                  }}
                >
                  {errorParams.reason && (
                    <div style={{ fontWeight: 700, marginBottom: errorParams.code || errorParams.reference ? '6px' : 0 }}>
                      {errorParams.reason}
                    </div>
                  )}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '12px', color: '#7F1D1D' }}>
                    {errorParams.code && (
                      <span>
                        <strong>{isEn ? 'Code:' : 'Code :'}</strong> {errorParams.code}
                      </span>
                    )}
                    {errorParams.reference && (
                      <span>
                        <strong>{isEn ? 'Reference:' : 'Référence :'}</strong> {errorParams.reference}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Causes fréquentes */}
              <div
                style={{
                  backgroundColor: '#FAF8F5',
                  borderRadius: '24px',
                  padding: '20px 22px',
                  marginBottom: '22px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '13px',
                    fontWeight: 800,
                    color: '#0B1730',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginBottom: '12px',
                  }}
                >
                  <HelpCircle size={16} color="#BE123C" />
                  <span>{isEn ? 'Common reasons for interruption' : 'Causes fréquentes'}</span>
                </div>

                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  {commonCauses.map((cause, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        fontSize: '13.5px',
                        color: '#334155',
                        lineHeight: 1.5,
                        fontWeight: 500,
                      }}
                    >
                      <span
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          backgroundColor: '#FCE8EC',
                          color: '#BE123C',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '11px',
                          fontWeight: 800,
                          flexShrink: 0,
                          marginTop: '1px',
                        }}
                      >
                        {idx + 1}
                      </span>
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instruction Mobile */}
              <div
                style={{
                  backgroundColor: '#FCE8EC',
                  borderRadius: '22px',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  marginBottom: '24px',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '14px',
                    backgroundColor: '#FFFFFF',
                    color: '#BE123C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Smartphone size={22} />
                </div>
                <div style={{ fontSize: '13.5px', color: '#4A1D2E', lineHeight: 1.5, fontWeight: 600 }}>
                  {isEn
                    ? 'Tap the button below to return to the mobile application and launch a new payment attempt.'
                    : 'Appuyez sur le bouton ci-dessous pour revenir dans votre application mobile et relancer le paiement.'}
                </div>
              </div>

              {/* Boutons d'Action Pilules */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  type="button"
                  onClick={handleRetryOrReturn}
                  style={{
                    width: '100%',
                    minHeight: '54px',
                    borderRadius: '9999px',
                    backgroundColor: '#0B1730',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '15.5px',
                    fontWeight: 800,
                    fontFamily: "'Manrope', sans-serif",
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    boxShadow: '0 12px 24px -6px rgba(11, 23, 48, 0.25)',
                  }}
                >
                  <RotateCcw size={18} />
                  <span>
                    {isEn
                      ? 'Return to App & Try Again'
                      : 'Retourner sur l’application et réessayer'}
                  </span>
                </button>

                <a
                  href="https://wa.me/221782824175"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '100%',
                    minHeight: '50px',
                    borderRadius: '9999px',
                    backgroundColor: '#D9F2EE',
                    color: '#0A4B3E',
                    textDecoration: 'none',
                    fontSize: '14.5px',
                    fontWeight: 800,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <Phone size={16} />
                  <span>
                    {isEn
                      ? 'Contact WhatsApp Support (+221 78 282 41 75)'
                      : 'Contacter l’assistance WhatsApp (+221 78 282 41 75)'}
                  </span>
                </a>

                <LinkButton
                  href={getLocalizedHref('home', locale)}
                  variant="outline"
                  size="lg"
                  fullWidth
                  icon={<ArrowLeft size={16} />}
                  style={{
                    borderRadius: '9999px',
                    backgroundColor: '#FAF8F5',
                    border: '1px solid #E2DDD5',
                  }}
                >
                  {isEn ? 'Back to Website Home' : 'Retour à l’accueil du site'}
                </LinkButton>
              </div>

              {/* Pied de carte */}
              <div
                style={{
                  marginTop: '22px',
                  paddingTop: '16px',
                  borderTop: '1px solid #F1EFEA',
                  textAlign: 'center',
                  fontSize: '12.5px',
                  color: '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  fontWeight: 600,
                }}
              >
                <ShieldCheck size={15} color="#0E6049" />
                <span>
                  {isEn
                    ? 'Secure mobile payment gateway · Zero unauthorized debit'
                    : 'Passerelle de paiement mobile sécurisée · Aucun débit non autorisé'}
                </span>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
};
