import React, { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Container } from '../design-system/Container';
import { NavLink, useRouter } from '../lib/router';
import { updatePageMetadata } from '../lib/seoMetadata';

export const LegalNoticePage: React.FC = () => {
  const { locale } = useRouter();
  const isEn = locale === 'en';

  useEffect(() => {
    updatePageMetadata({
      title: isEn ? 'Legal Notice | MusaTech Dakar' : 'Mentions Légales | MusaTech Dakar',
      description: isEn
        ? 'Legal notice, publisher identification, and terms of service for MusaTech by Moussa Diagne.'
        : 'Mentions légales, cadre juridique et responsabilités éditoriales du site MusaTech par Moussa Diagne.',
      canonicalPath: isEn ? '/en/legal-notice' : '/fr/mentions-legales',
      frPath: '/fr/mentions-legales',
      enPath: '/en/legal-notice',
      locale,
      breadcrumbs: [
        { name: isEn ? 'Home' : 'Accueil', path: isEn ? '/en' : '/fr' },
        { name: isEn ? 'Legal Notice' : 'Mentions Légales', path: isEn ? '/en/legal-notice' : '/fr/mentions-legales' },
      ],
      ogType: 'article',
      schemaType: 'website',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isEn, locale]);

  return (
    <div className="mt-page-legal">
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
              {isEn ? 'Legal Notice' : 'Mentions Légales'}
            </span>
          </div>

          <div style={{ maxWidth: '820px' }}>
            <h1 className="mt-h1" style={{ color: '#0B1730', marginBottom: '16px' }}>
              {isEn ? 'Legal Notice' : 'Mentions Légales'}
            </h1>
            <p className="mt-body mt-muted" style={{ fontSize: '16px', lineHeight: 1.6 }}>
              {isEn
                ? 'In accordance with digital communication standards and information society regulations, this page provides legal and publisher identification for MusaTech.'
                : 'Conformément aux dispositions régissant la communication en ligne et les services numériques, cette page présente les informations d’identification de l’éditeur du site MusaTech.'}
            </p>
          </div>
        </Container>
      </section>

      {/* Contenu principal */}
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
            {/* Note d'information pour le propriétaire du site */}
            <div
              style={{
                marginBottom: '32px',
                padding: '14px clamp(12px, 2.5vw, 20px)',
                backgroundColor: '#FFFBEB',
                border: '1px solid #FDE68A',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                fontSize: '13px',
                color: '#92400E',
                lineHeight: 1.5,
              }}
            >
              <AlertCircle size={20} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>
                  {isEn ? 'Regulatory Compliance Notice:' : 'Information de conformité réglementaire :'}
                </strong>
                <p style={{ margin: '4px 0 0 0' }}>
                  {isEn
                    ? 'This template is structured without fabricating corporate registration numbers. Fields in brackets (such as national tax or commercial registry IDs under sole proprietorship in Senegal) are to be finalized upon administrative registration completion.'
                    : 'Ce modèle a été structuré sans inventer d’identifiants administratifs. Les mentions entre crochets (telles que le NINEA ou le RCCM si immatriculé sous statut d’entreprise individuelle au Sénégal) sont à compléter lors de la formalisation administrative définitive.'}
                </p>
              </div>
            </div>

            {/* 1. Éditeur */}
            <section style={{ marginBottom: '32px' }}>
              <h2 className="mt-h3" style={{ fontSize: '20px', color: '#0B1730', marginBottom: '12px' }}>
                {isEn ? '1. Platform Publisher' : '1. Éditeur de la plateforme'}
              </h2>
              <div style={{ fontSize: '15px', color: '#465670', lineHeight: 1.6 }}>
                <p style={{ margin: '0 0 8px 0' }}>
                  {isEn ? 'The website' : 'Le site web'} <strong>https://www.musatech.tech/</strong> {isEn ? 'is published by:' : 'est édité par :'}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li>
                    <strong>{isEn ? 'Trade Name:' : 'Nom commercial :'}</strong> MusaTech
                  </li>
                  <li>
                    <strong>{isEn ? 'Founder & Operator:' : 'Fondateur & Exploitant :'}</strong>{' '}
                    {isEn
                      ? 'Moussa Diagne (Independent Full Stack Software Engineer)'
                      : 'Moussa Diagne (Développeur Full Stack indépendant)'}
                  </li>
                  <li>
                    <strong>{isEn ? 'Location:' : 'Localisation :'}</strong> Dakar, Sénégal
                  </li>
                  <li>
                    <strong>{isEn ? 'Contact Email:' : 'Email de contact :'}</strong>{' '}
                    <a href="mailto:musadev27@gmail.com" style={{ color: '#19B8CD', textDecoration: 'none' }}>
                      musadev27@gmail.com
                    </a>
                  </li>
                  <li>
                    <strong>{isEn ? 'Direct Phone / WhatsApp:' : 'Téléphone / WhatsApp :'}</strong> +221 78 010 54 26
                  </li>
                  <li>
                    <strong>{isEn ? 'Business Registration:' : 'Identifiants d\'entreprise :'}</strong>{' '}
                    {isEn
                      ? '[National Tax ID / Commercial Registry in formalization under applicable legal status]'
                      : '[Numéro NINEA / RCCM en cours de formalisation selon le statut légal applicable]'}
                  </li>
                </ul>
              </div>
            </section>

            {/* 2. Directeur de la publication */}
            <section style={{ marginBottom: '32px' }}>
              <h2 className="mt-h3" style={{ fontSize: '20px', color: '#0B1730', marginBottom: '12px' }}>
                {isEn ? '2. Publication Director' : '2. Directeur de la publication'}
              </h2>
              <p style={{ fontSize: '15px', color: '#465670', lineHeight: 1.6, margin: 0 }}>
                {isEn
                  ? 'The director of publication and editorial manager is Moussa Diagne, in his capacity as founder of MusaTech.'
                  : 'Le directeur de la publication et responsable éditorial des contenus est Moussa Diagne, en qualité de fondateur de MusaTech.'}
              </p>
            </section>

            {/* 3. Hébergement */}
            <section style={{ marginBottom: '32px' }}>
              <h2 className="mt-h3" style={{ fontSize: '20px', color: '#0B1730', marginBottom: '12px' }}>
                {isEn ? '3. Website Hosting' : '3. Hébergement du site'}
              </h2>
              <div style={{ fontSize: '15px', color: '#465670', lineHeight: 1.6 }}>
                <p style={{ margin: '0 0 8px 0' }}>
                  {isEn
                    ? 'The website is hosted on the secure global cloud infrastructure of:'
                    : 'Le site est hébergé sur les infrastructures cloud sécurisées de :'}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li>
                    <strong>{isEn ? 'Host:' : 'Hébergeur :'}</strong> Vercel Inc.
                  </li>
                  <li>
                    <strong>{isEn ? 'Address:' : 'Adresse :'}</strong> 440 N Barranca Ave #4133, Covina, CA 91723, USA
                  </li>
                  <li>
                    <strong>{isEn ? 'Website:' : 'Site web :'}</strong>{' '}
                    <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{ color: '#19B8CD', textDecoration: 'none' }}>
                      https://vercel.com
                    </a>
                  </li>
                </ul>
              </div>
            </section>

            {/* 4. Propriété intellectuelle */}
            <section style={{ marginBottom: '32px' }}>
              <h2 className="mt-h3" style={{ fontSize: '20px', color: '#0B1730', marginBottom: '12px' }}>
                {isEn ? '4. Intellectual Property & Trademarks' : '4. Propriété intellectuelle et marques'}
              </h2>
              <p style={{ fontSize: '15px', color: '#465670', lineHeight: 1.6, marginBottom: '12px' }}>
                {isEn
                  ? 'All content on this website (text, graphic elements, design system, software architecture, and the MusaTech logo) is protected by international copyright and intellectual property legislation.'
                  : 'L’ensemble des contenus présents sur ce site (textes, graphismes, design system, architecture logicielle, logo MusaTech) est protégé par les lois internationales relatives aux droits d’auteur et à la propriété intellectuelle.'}
              </p>
              <p style={{ fontSize: '15px', color: '#465670', lineHeight: 1.6, margin: 0 }}>
                {isEn
                  ? 'Any unauthorized reproduction or distribution is strictly prohibited without the express written permission of Moussa Diagne. Third-party brand names mentioned as technical references (e.g. Next.js, NestJS, GetStream.io, Stripe, Yello) remain the exclusive property of their respective owners.'
                  : 'Toute reproduction, distribution ou représentation partielle ou totale, par quelque procédé que ce soit, sans l’autorisation expresse écrite de Moussa Diagne est strictement interdite. Les marques de tiers citées à titre de référence technique (ex. Next.js, NestJS, GetStream.io, Stripe, Yello) restent la propriété exclusive de leurs détenteurs respectifs.'}
              </p>
            </section>

            {/* 5. Limitation de responsabilité */}
            <section style={{ marginBottom: '32px' }}>
              <h2 className="mt-h3" style={{ fontSize: '20px', color: '#0B1730', marginBottom: '12px' }}>
                {isEn ? '5. Limitation of Liability' : '5. Limitation de responsabilité'}
              </h2>
              <p style={{ fontSize: '15px', color: '#465670', lineHeight: 1.6, margin: 0 }}>
                {isEn
                  ? 'MusaTech strives to provide accurate and up-to-date information. However, pricing estimates and service descriptions are indicative and do not constitute a binding contract without a prior formal quote agreed and signed by both parties.'
                  : 'MusaTech met tout en œuvre pour fournir des informations exactes et à jour. Toutefois, les estimations tarifaires et descriptions de services sont indicatives et ne sauraient constituer un engagement contractuel sans l’établissement préalable d’un devis formel validé et signé par les deux parties.'}
              </p>
            </section>

            {/* 6. Droit applicable */}
            <section>
              <h2 className="mt-h3" style={{ fontSize: '20px', color: '#0B1730', marginBottom: '12px' }}>
                {isEn ? '6. Applicable Law & Jurisdiction' : '6. Droit applicable et juridiction'}
              </h2>
              <p style={{ fontSize: '15px', color: '#465670', lineHeight: 1.6, margin: 0 }}>
                {isEn
                  ? 'This legal notice is governed by the laws of Senegal. In the event of a dispute relating to the use of this website and in the absence of an amicable settlement, competent courts of Dakar hold exclusive jurisdiction.'
                  : 'Les présentes mentions légales sont soumises au droit sénégalais. En cas de litige relatif à l’utilisation du site et à défaut d’accord amiable, compétence expresse est attribuée aux tribunaux compétents de Dakar.'}
              </p>
            </section>
          </div>
        </Container>
      </section>
    </div>
  );
};
