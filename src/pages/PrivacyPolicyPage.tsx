import React, { useEffect } from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Container } from '../design-system/Container';
import { NavLink, useRouter } from '../lib/router';
import { updatePageMetadata } from '../lib/seoMetadata';

export const PrivacyPolicyPage: React.FC = () => {
  const { locale } = useRouter();
  const isEn = locale === 'en';

  useEffect(() => {
    updatePageMetadata({
      title: isEn
        ? 'Privacy Policy & Data Protection | MusaTech'
        : 'Politique de Confidentialité | Protection des Données | MusaTech',
      description: isEn
        ? 'Privacy policy, data protection, and GDPR compliance standards applied by MusaTech.'
        : 'Politique de confidentialité et protection des données personnelles traitées par MusaTech dans le cadre de ses prestations.',
      canonicalPath: isEn ? '/en/privacy-policy' : '/fr/confidentialite',
      frPath: '/fr/confidentialite',
      enPath: '/en/privacy-policy',
      locale,
      breadcrumbs: [
        { name: isEn ? 'Home' : 'Accueil', path: isEn ? '/en' : '/fr' },
        { name: isEn ? 'Privacy' : 'Confidentialité', path: isEn ? '/en/privacy-policy' : '/fr/confidentialite' },
      ],
      ogType: 'article',
      schemaType: 'website',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isEn, locale]);

  return (
    <div className="mt-page-privacy">
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
            <span style={{ color: '#19B8CD', fontWeight: 600 }}>
              {isEn ? 'Privacy' : 'Confidentialité'}
            </span>
          </div>

          <div style={{ maxWidth: '820px' }}>
            <h1 className="mt-h1" style={{ color: '#0B1730', marginBottom: '16px' }}>
              {isEn ? 'Privacy Policy' : 'Politique de Confidentialité'}
            </h1>
            <p className="mt-body mt-muted" style={{ fontSize: '16px', lineHeight: 1.6 }}>
              {isEn
                ? 'MusaTech is committed to protecting user privacy and ensuring the confidentiality of all information submitted via our inquiry and quote forms.'
                : 'MusaTech s’engage à protéger la vie privée de ses utilisateurs et à assurer la confidentialité des informations transmises lors de vos demandes d’échange et de devis.'}
            </p>
          </div>
        </Container>
      </section>

      {/* Contenu */}
      <section style={{ padding: 'clamp(48px, 6vw, 72px) 0', backgroundColor: '#F4F7FB' }}>
        <Container>
          <div
            style={{
              maxWidth: '820px',
              margin: '0 auto',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #DAE3ED',
              padding: 'clamp(20px, 3.5vw, 48px) clamp(12px, 2.5vw, 40px)',
              boxShadow: '0 4px 16px rgba(11, 23, 48, 0.04)',
            }}
          >
            {/* Note de conformité */}
            <div
              style={{
                marginBottom: '32px',
                padding: '14px clamp(12px, 2.5vw, 20px)',
                backgroundColor: '#EFF6FF',
                border: '1px solid #BFDBFE',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                fontSize: '13px',
                color: '#1E40AF',
                lineHeight: 1.5,
              }}
            >
              <ShieldCheck size={20} color="#2563EB" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>
                  {isEn ? 'Data Protection Commitment:' : 'Engagement de protection des données :'}
                </strong>
                <p style={{ margin: '4px 0 0 0' }}>
                  {isEn
                    ? 'This document outlines how personal data is handled in compliance with international data privacy standards and recommendations of the Commission for the Protection of Personal Data (CDP) in Senegal.'
                    : 'Ce document explicite les finalités du traitement des données personnelles conformément aux standards internationaux et aux recommandations de la Commission de Protection des Données Personnelles (CDP) du Sénégal.'}
                </p>
              </div>
            </div>

            {/* 1. Responsable du traitement */}
            <section style={{ marginBottom: '32px' }}>
              <h2 className="mt-h3" style={{ fontSize: '20px', color: '#0B1730', marginBottom: '12px' }}>
                {isEn ? '1. Data Controller' : '1. Responsable du traitement'}
              </h2>
              <p style={{ fontSize: '15px', color: '#465670', lineHeight: 1.6, margin: 0 }}>
                {isEn ? (
                  <>
                    The controller for personal data collected on this site is <strong>Moussa Diagne</strong>, founder
                    of the freelance brand MusaTech, domiciled in Dakar, Senegal (contact:{' '}
                    <a href="mailto:musadev27@gmail.com" style={{ color: '#19B8CD', textDecoration: 'none' }}>
                      musadev27@gmail.com
                    </a>).
                  </>
                ) : (
                  <>
                    Le responsable du traitement des données personnelles collectées sur le site est{' '}
                    <strong>Moussa Diagne</strong>, fondateur de la marque freelance MusaTech, domicilié à Dakar, Sénégal
                    (contact :{' '}
                    <a href="mailto:musadev27@gmail.com" style={{ color: '#19B8CD', textDecoration: 'none' }}>
                      musadev27@gmail.com
                    </a>).
                  </>
                )}
              </p>
            </section>

            {/* 2. Données collectées */}
            <section style={{ marginBottom: '32px' }}>
              <h2 className="mt-h3" style={{ fontSize: '20px', color: '#0B1730', marginBottom: '12px' }}>
                {isEn ? '2. Personal Data Collected' : '2. Données personnelles collectées'}
              </h2>
              <p style={{ fontSize: '15px', color: '#465670', lineHeight: 1.6, marginBottom: '12px' }}>
                {isEn
                  ? 'We only collect information voluntarily transmitted through our contact and quote forms:'
                  : 'Nous collectons uniquement les informations que vous nous transmettez volontairement via nos formulaires :'}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#172A46' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#19B8CD" />
                  <span>
                    <strong>{isEn ? 'Quote request form:' : 'Formulaire de devis :'}</strong>{' '}
                    {isEn
                      ? 'Full name, email address, phone/WhatsApp number, service type, industry sector, estimated budget range, and project description.'
                      : 'Nom complet, adresse email, téléphone/WhatsApp, type de service, secteur d’activité, budget estimé, description du besoin.'}
                  </span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#19B8CD" />
                  <span>
                    <strong>{isEn ? 'Direct contact form:' : 'Formulaire de contact :'}</strong>{' '}
                    {isEn
                      ? 'Full name, email address, phone number, subject, and message content.'
                      : 'Nom complet, adresse email, téléphone, objet et contenu de votre message.'}
                  </span>
                </li>
              </ul>
            </section>

            {/* 3. Finalités et base légale */}
            <section style={{ marginBottom: '32px' }}>
              <h2 className="mt-h3" style={{ fontSize: '20px', color: '#0B1730', marginBottom: '12px' }}>
                {isEn ? '3. Purposes of Processing & Legal Basis' : '3. Finalités de la collecte et base légale'}
              </h2>
              <p style={{ fontSize: '15px', color: '#465670', lineHeight: 1.6, marginBottom: '8px' }}>
                {isEn ? 'This data is collected exclusively to:' : 'Ces données sont collectées pour :'}
              </p>
              <ul style={{ margin: '0 0 12px 20px', padding: 0, fontSize: '14px', color: '#465670', lineHeight: 1.6 }}>
                <li>
                  {isEn
                    ? 'Respond to informational requests and direct messages.'
                    : 'Répondre à vos demandes d’informations et messages de contact.'}
                </li>
                <li>
                  {isEn
                    ? 'Evaluate technical feasibility and formulate detailed proposals.'
                    : 'Étudier la faisabilité technique de votre projet et élaborer une proposition tarifaire détaillée.'}
                </li>
                <li>
                  {isEn
                    ? 'Manage pre-contractual commercial communications.'
                    : 'Gérer la relation commerciale précontractuelle.'}
                </li>
              </ul>
              <p style={{ fontSize: '15px', color: '#465670', lineHeight: 1.6, margin: 0 }}>
                {isEn
                  ? 'Processing is legally grounded on your explicit consent when submitting the form and on necessary pre-contractual steps taken at your request.'
                  : 'La base légale du traitement repose sur votre consentement explicite lors de l’envoi du formulaire ainsi que sur l’exécution de démarches précontractuelles à votre demande.'}
              </p>
            </section>

            {/* 4. Durée de conservation */}
            <section style={{ marginBottom: '32px' }}>
              <h2 className="mt-h3" style={{ fontSize: '20px', color: '#0B1730', marginBottom: '12px' }}>
                {isEn ? '4. Data Retention Period' : '4. Durée de conservation des données'}
              </h2>
              <p style={{ fontSize: '15px', color: '#465670', lineHeight: 1.6, margin: 0 }}>
                {isEn ? (
                  <>
                    Data concerning prospects where projects are not engaged is retained for a maximum of{' '}
                    <strong>3 years</strong> following the last active contact. For executed development contracts,
                    invoicing data is archived in compliance with statutory accounting retention laws.
                  </>
                ) : (
                  <>
                    Les données relatives à un prospect non concrétisé sont conservées pour une durée maximale de{' '}
                    <strong>3 ans</strong> à compter du dernier contact actif. En cas de contractualisation d’une prestation
                    de développement, les données de facturation sont archivées conformément aux délais légaux comptables.
                  </>
                )}
              </p>
            </section>

            {/* 5. Destinataires et non-cession */}
            <section style={{ marginBottom: '32px' }}>
              <h2 className="mt-h3" style={{ fontSize: '20px', color: '#0B1730', marginBottom: '12px' }}>
                {isEn ? '5. Data Recipients & Non-Sale Guarantee' : '5. Destinataires des données & Non-cession'}
              </h2>
              <p style={{ fontSize: '15px', color: '#465670', lineHeight: 1.6, margin: 0 }}>
                {isEn ? (
                  <>
                    All submitted data is intended strictly for the exclusive use of{' '}
                    <strong>Moussa Diagne (MusaTech)</strong>. No personal data is ever leased, sold, or shared with third
                    parties for commercial prospecting or advertising.
                  </>
                ) : (
                  <>
                    Les données sont destinées à l’usage exclusif de <strong>Moussa Diagne (MusaTech)</strong>. Aucune
                    donnée personnelle n’est cédée, louée, vendue ou transmise à des tiers à des fins de prospection publicitaire.
                  </>
                )}
              </p>
            </section>

            {/* 6. Sécurité */}
            <section style={{ marginBottom: '32px' }}>
              <h2 className="mt-h3" style={{ fontSize: '20px', color: '#0B1730', marginBottom: '12px' }}>
                {isEn ? '6. Communication Security' : '6. Sécurité des échanges'}
              </h2>
              <p style={{ fontSize: '15px', color: '#465670', lineHeight: 1.6, margin: 0 }}>
                {isEn
                  ? 'All website communications are secured using modern encryption protocols (HTTPS / TLS). Cloud hosting servers comply with strict logical and physical security benchmarks.'
                  : 'Toutes les communications sur le site bénéficient d’un protocole de chiffrement moderne (HTTPS / TLS). Les serveurs d’hébergement répondent à des normes strictes de sécurité physique et logique.'}
              </p>
            </section>

            {/* 7. Vos droits */}
            <section style={{ marginBottom: '32px' }}>
              <h2 className="mt-h3" style={{ fontSize: '20px', color: '#0B1730', marginBottom: '12px' }}>
                {isEn ? '7. Your Rights Over Your Data' : '7. Vos droits sur vos données'}
              </h2>
              <p style={{ fontSize: '15px', color: '#465670', lineHeight: 1.6, marginBottom: '8px' }}>
                {isEn
                  ? 'You retain the right to access, rectify, port, restrict, or request the deletion of your personal data at any time.'
                  : 'Vous disposez à tout moment d’un droit d’accès, de rectification, de portabilité, de limitation et d’effacement de vos données personnelles.'}
              </p>
              <p style={{ fontSize: '15px', color: '#465670', lineHeight: 1.6, margin: 0 }}>
                {isEn ? (
                  <>
                    To exercise these rights, email{' '}
                    <a href="mailto:musadev27@gmail.com" style={{ color: '#19B8CD', fontWeight: 600, textDecoration: 'none' }}>
                      musadev27@gmail.com
                    </a>. We respond within a maximum of 30 days.
                  </>
                ) : (
                  <>
                    Pour exercer ces droits, il vous suffit d’adresser une demande par email à :{' '}
                    <a href="mailto:musadev27@gmail.com" style={{ color: '#19B8CD', fontWeight: 600, textDecoration: 'none' }}>
                      musadev27@gmail.com
                    </a>. Une réponse vous sera apportée sous 30 jours maximum.
                  </>
                )}
              </p>
            </section>

            {/* 8. Cookies et mesure d'audience */}
            <section>
              <h2 className="mt-h3" style={{ fontSize: '20px', color: '#0B1730', marginBottom: '12px' }}>
                {isEn ? '8. Analytics & Cookie Policy' : '8. Traceurs et mesure d\'audience'}
              </h2>
              <p style={{ fontSize: '15px', color: '#465670', lineHeight: 1.6, margin: 0 }}>
                {isEn ? (
                  <>
                    This website uses lightweight, privacy-focused <em>Vercel Analytics</em>. It does not collect
                    personally identifiable visitor information and installs no cross-site advertising trackers.
                  </>
                ) : (
                  <>
                    Ce site utilise la solution analytique légère et respectueuse de la vie privée <em>Vercel Analytics</em>.
                    Elle ne collecte aucune donnée permettant d’identifier individuellement les visiteurs et n’installe aucun
                    cookie de suivi publicitaire intersites.
                  </>
                )}
              </p>
            </section>
          </div>
        </Container>
      </section>
    </div>
  );
};
