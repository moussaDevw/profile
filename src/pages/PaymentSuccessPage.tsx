import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  Smartphone,
  ShieldCheck,
  Copy,
  CheckCircle2,
  ArrowLeft,
  Phone,
  ExternalLink,
} from 'lucide-react';
import { Container } from '../design-system/Container';
import { LinkButton } from '../design-system/Button';
import { useRouter } from '../lib/router';
import { updatePageMetadata } from '../lib/seoMetadata';
import { getLocalizedHref } from '../lib/i18nRoutes';

export const PaymentSuccessPage: React.FC = () => {
  const { locale } = useRouter();
  const isEn = locale === 'en';
  const [copied, setCopied] = useState(false);

  // Lecture des paramètres d'URL transmis par la passerelle de paiement ou l'app mobile
  const [paymentParams] = useState(() => {
    if (typeof window === 'undefined') {
      return {
        reference: '',
        amount: '',
        currency: 'FCFA',
        provider: '',
        deepLink: '',
        service: '',
      };
    }
    const params = new URLSearchParams(window.location.search);
    return {
      reference:
        params.get('ref') ||
        params.get('reference') ||
        params.get('transaction_id') ||
        params.get('tx') ||
        params.get('order_id') ||
        '',
      amount: params.get('amount') || params.get('montant') || '',
      currency: params.get('currency') || params.get('devise') || 'FCFA',
      provider: params.get('provider') || params.get('method') || params.get('gateway') || '',
      deepLink:
        params.get('redirect_uri') ||
        params.get('deeplink') ||
        params.get('app_scheme') ||
        params.get('return_url') ||
        '',
      service: params.get('service') || params.get('item') || '',
    };
  });

  useEffect(() => {
    updatePageMetadata({
      title: isEn
        ? 'Payment Confirmed | MusaTech Mobile Payment'
        : 'Paiement Confirmé | MusaTech Application Mobile',
      description: isEn
        ? 'Your payment has been successfully processed. You may now return to the mobile application.'
        : 'Votre paiement a été validé avec succès. Vous pouvez maintenant retourner sur votre application mobile.',
      canonicalPath: isEn ? '/en/success' : '/fr/success',
      frPath: '/fr/success',
      enPath: '/en/success',
      locale,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isEn, locale]);

  const handleCopyRef = () => {
    if (!paymentParams.reference || typeof navigator === 'undefined' || !navigator.clipboard) return;
    navigator.clipboard.writeText(paymentParams.reference).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleReturnToApp = () => {
    if (paymentParams.deepLink) {
      window.location.href = paymentParams.deepLink;
      return;
    }
    // Tentative de fermeture de la WebView / Custom Tab mobile
    try {
      window.close();
    } catch {
      // Ignorer si bloqué par le navigateur
    }
  };

  const formattedDate = new Intl.DateTimeFormat(isEn ? 'en-US' : 'fr-FR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date());

  return (
    <div className="mt-page-payment-success">
      {/* SCÈNE VERT MENTHE PASTEL 100% PLEINE LARGEUR (STYLE ALAN.COM) */}
      <section
        style={{
          width: '100%',
          minHeight: 'calc(100vh - 72px)',
          backgroundColor: '#D9F2EE',
          padding: 'clamp(44px, 7vw, 88px) 0',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container>
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            {/* En-tête de confirmation centré */}
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 22px',
                  boxShadow: '0 20px 40px rgba(16, 185, 129, 0.28)',
                  border: '6px solid #FFFFFF',
                }}
              >
                <Check size={42} strokeWidth={3.2} />
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
                  color: '#0E6049',
                  padding: '7px 18px',
                  borderRadius: '9999px',
                  fontSize: '12.5px',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  boxShadow: '0 4px 14px rgba(14, 96, 73, 0.06)',
                  marginBottom: '18px',
                }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                <span>{isEn ? 'PAYMENT CONFIRMED' : 'PAIEMENT CONFIRMÉ'}</span>
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
                {isEn ? 'Payment completed successfully!' : 'Paiement effectué avec succès !'}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.16 }}
                className="mt-body"
                style={{
                  color: '#1E3A36',
                  fontSize: 'clamp(16px, 2vw, 18px)',
                  lineHeight: 1.6,
                  maxWidth: '540px',
                  margin: '0 auto',
                }}
              >
                {isEn
                  ? 'Your transaction has been securely validated. Your account has been updated automatically in the mobile application.'
                  : 'Votre transaction a bien été enregistrée et sécurisée. Votre compte a été mis à jour automatiquement sur l’application mobile.'}
              </motion.p>
            </div>

            {/* Carte Flottante Blanche Reçu & Retour Application Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 85, damping: 18, delay: 0.18 }}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '36px',
                padding: 'clamp(24px, 4.5vw, 40px)',
                boxShadow: '0 26px 60px -12px rgba(14, 96, 73, 0.14)',
              }}
            >
              {/* Montant mis en avant s'il est fourni dans l'URL */}
              {paymentParams.amount && (
                <div
                  style={{
                    backgroundColor: '#FAF8F5',
                    borderRadius: '24px',
                    padding: '20px',
                    textAlign: 'center',
                    marginBottom: '22px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: '#64748B',
                      marginBottom: '4px',
                    }}
                  >
                    {isEn ? 'Amount Paid' : 'Montant réglé'}
                  </div>
                  <div
                    style={{
                      fontSize: 'clamp(28px, 4vw, 36px)',
                      fontWeight: 800,
                      color: '#0E6049',
                      fontFamily: "'Manrope', sans-serif",
                    }}
                  >
                    {paymentParams.amount} {paymentParams.currency}
                  </div>
                </div>
              )}

              {/* Détails de la transaction */}
              <div
                style={{
                  backgroundColor: '#FAF8F5',
                  borderRadius: '24px',
                  padding: '20px 22px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  marginBottom: '24px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                  <span style={{ fontSize: '13.5px', color: '#64748B', fontWeight: 600 }}>
                    {isEn ? 'Transaction Status' : 'Statut'}
                  </span>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '13px',
                      fontWeight: 800,
                      color: '#047857',
                      backgroundColor: '#ECFDF5',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                    }}
                  >
                    <CheckCircle2 size={14} color="#10B981" />
                    {isEn ? 'Confirmed' : 'Validé & Confirmé'}
                  </span>
                </div>

                {paymentParams.provider && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                    <span style={{ fontSize: '13.5px', color: '#64748B', fontWeight: 600 }}>
                      {isEn ? 'Payment Method' : 'Moyen de paiement'}
                    </span>
                    <strong style={{ fontSize: '14px', color: '#0B1730', fontWeight: 800 }}>
                      {paymentParams.provider}
                    </strong>
                  </div>
                )}

                {paymentParams.service && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                    <span style={{ fontSize: '13.5px', color: '#64748B', fontWeight: 600 }}>
                      {isEn ? 'Service / Order' : 'Service / Commande'}
                    </span>
                    <strong style={{ fontSize: '14px', color: '#0B1730', fontWeight: 800 }}>
                      {paymentParams.service}
                    </strong>
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                  <span style={{ fontSize: '13.5px', color: '#64748B', fontWeight: 600 }}>
                    {isEn ? 'Date & Time' : 'Date & Heure'}
                  </span>
                  <strong style={{ fontSize: '13.5px', color: '#0B1730', fontWeight: 700 }}>
                    {formattedDate}
                  </strong>
                </div>

                {paymentParams.reference && (
                  <div
                    style={{
                      paddingTop: '12px',
                      borderTop: '1px solid #EAE6DF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                      flexWrap: 'wrap',
                    }}
                  >
                    <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>
                      {isEn ? 'Reference' : 'Référence'}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <code
                        style={{
                          fontSize: '13px',
                          fontWeight: 800,
                          color: '#0B1730',
                          backgroundColor: '#FFFFFF',
                          padding: '4px 10px',
                          borderRadius: '8px',
                        }}
                      >
                        {paymentParams.reference}
                      </code>
                      <button
                        type="button"
                        onClick={handleCopyRef}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          border: 'none',
                          backgroundColor: '#D9F2EE',
                          color: '#0E6049',
                          padding: '5px 10px',
                          borderRadius: '9999px',
                          fontSize: '11.5px',
                          fontWeight: 800,
                          cursor: 'pointer',
                        }}
                      >
                        <Copy size={12} />
                        <span>{copied ? (isEn ? 'Copied!' : 'Copié !') : (isEn ? 'Copy' : 'Copier')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Instruction Mobile Rassurante */}
              <div
                style={{
                  backgroundColor: '#D9F2EE',
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
                    color: '#0E6049',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Smartphone size={22} />
                </div>
                <div style={{ fontSize: '13.5px', color: '#0A4B3E', lineHeight: 1.5, fontWeight: 600 }}>
                  {isEn
                    ? 'You can now close this page or tap the button below to return directly to your mobile application.'
                    : 'Vous pouvez maintenant fermer cette page ou appuyer sur le bouton ci-dessous pour revenir directement dans votre application mobile.'}
                </div>
              </div>

              {/* Boutons d'Action Pilules */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  type="button"
                  onClick={handleReturnToApp}
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
                  <Smartphone size={18} />
                  <span>
                    {isEn ? 'Return to Mobile Application' : 'Retourner sur l’application mobile'}
                  </span>
                </button>

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

              {/* Pied de carte : Sécurité & Support */}
              <div
                style={{
                  marginTop: '24px',
                  paddingTop: '18px',
                  borderTop: '1px solid #F1EFEA',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                  fontSize: '12.5px',
                  color: '#64748B',
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                  <ShieldCheck size={15} color="#0E6049" />
                  {isEn ? 'Encrypted & Verified Transaction' : 'Transaction chiffrée & sécurisée'}
                </span>

                <a
                  href="https://wa.me/221782824175"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#0E6049',
                    fontWeight: 800,
                    textDecoration: 'none',
                  }}
                >
                  <Phone size={13} />
                  <span>{isEn ? 'Need help? WhatsApp Support' : 'Besoin d’aide ? Support WhatsApp'}</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
};
