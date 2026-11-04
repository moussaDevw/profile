import React from 'react';
import { Globe, ShoppingCart, Cpu, Smartphone, Info } from 'lucide-react';
import { Container } from '../../design-system/Container';
import { SectionHeading } from '../../design-system/SectionHeading';
import { ServiceCard } from '../../design-system/cards/ServiceCard';
import { getServicesData, getServicesDisclaimer } from '../../content/homeData';
import { useRouter } from '../../lib/router';

export const ServicesSection: React.FC = () => {
  const { locale } = useRouter();
  const services = getServicesData(locale);
  const disclaimer = getServicesDisclaimer(locale);
  const isEn = locale === 'en';

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'sites-web':
        return <Globe size={24} color="#172A46" />;
      case 'e-commerce':
        return <ShoppingCart size={24} color="#19B8CD" />;
      case 'logiciels-metier':
        return <Cpu size={24} color="#172A46" />;
      case 'applications-mobiles':
        return <Smartphone size={24} color="#172A46" />;
      default:
        return <Globe size={24} />;
    }
  };

  return (
    <section
      id="services"
      className="mt-section"
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #DAE3ED',
      }}
    >
      <Container>
        <SectionHeading
          tag={isEn ? 'Core Engineering Services' : 'Nos Services'}
          title={
            isEn
              ? 'Digital solutions tailored to your operational scale.'
              : 'Des solutions adaptées à vos besoins.'
          }
          description={
            isEn
              ? 'From fast corporate web portals to high-traffic e-commerce and mission-critical enterprise systems.'
              : 'Que vous ayez besoin d\'une vitrine moderne, d\'une boutique en ligne avec encaissement local ou d\'une plateforme complexe sur-mesure.'
          }
          align="center"
        />

        <div className="mt-grid-2">
          {services.map((service, idx) => (
            <ServiceCard
              key={service.id}
              index={`0${idx + 1}`}
              icon={getServiceIcon(service.id)}
              title={service.title}
              description={service.description}
              startingPrice={service.startingPrice}
              deliverables={service.deliverables}
              ctaText={service.ctaText}
              ctaHref={service.ctaHref}
              featured={service.featured}
            />
          ))}
        </div>

        {/* Disclaimer Note */}
        <div
          style={{
            marginTop: '40px',
            padding: '14px 20px',
            backgroundColor: '#F4F7FB',
            borderRadius: '10px',
            border: '1px solid #DAE3ED',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            maxWidth: '720px',
            margin: '40px auto 0 auto',
            fontSize: '13px',
            color: '#465670',
          }}
        >
          <Info size={16} color="#19B8CD" style={{ flexShrink: 0 }} />
          <span>{disclaimer}</span>
        </div>
      </Container>
    </section>
  );
};
