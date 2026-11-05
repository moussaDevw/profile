import React from 'react';
import { Container } from '../../design-system/Container';
import { SectionHeading } from '../../design-system/SectionHeading';
import { FaqAccordion } from '../../design-system/FaqAccordion';
import { getHomeFaq } from '../../content/homeData';
import { useRouter } from '../../lib/router';

export const FaqSection: React.FC = () => {
  const { locale } = useRouter();
  const faqData = getHomeFaq(locale);
  const isEn = locale === 'en';

  return (
    <section
      id="faq"
      className="mt-section"
      style={{
        backgroundColor: '#F4F7FB',
        borderBottom: '1px solid #DAE3ED',
      }}
    >
      <Container>
        <SectionHeading
          tag="FAQ"
          title={isEn ? 'Frequently Asked Questions' : 'Questions Fréquentes'}
          description={
            isEn
              ? 'Transparent answers regarding our engineering process, pricing baseline, and engagement terms.'
              : "Des réponses claires et transparentes sur notre méthode, nos tarifs et nos modalités d'intervention."
          }
          align="center"
        />

        <FaqAccordion items={faqData} idPrefix="home-faq" />
      </Container>
    </section>
  );
};
