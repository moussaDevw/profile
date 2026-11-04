import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Container } from '../../design-system/Container';
import { SectionHeading } from '../../design-system/SectionHeading';
import { getHomeFaq } from '../../content/homeData';
import { useRouter } from '../../lib/router';

export const FaqSection: React.FC = () => {
  const { locale } = useRouter();
  const faqData = getHomeFaq(locale);
  const isEn = locale === 'en';
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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

        <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            const contentId = `faq-content-${index}`;
            const headerId = `faq-header-${index}`;

            return (
              <div
                key={index}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '14px',
                  border: isOpen ? '1.5px solid #19B8CD' : '1px solid #DAE3ED',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  boxShadow: isOpen ? '0 4px 16px -2px rgba(25, 184, 205, 0.12)' : 'none',
                }}
              >
                <button
                  id={headerId}
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  style={{
                    width: '100%',
                    padding: 'clamp(14px, 3.5vw, 20px) clamp(12px, 2.5vw, 24px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '14px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: 'clamp(15px, 3.5vw, 17px)',
                      fontWeight: 700,
                      color: isOpen ? '#0B1730' : '#172A46',
                      lineHeight: 1.4,
                    }}
                  >
                    {item.question}
                  </span>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: isOpen ? '#E9F1F7' : '#F4F7FB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'transform 0.2s ease',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    <ChevronDown size={18} color={isOpen ? '#19B8CD' : '#465670'} />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={headerId}
                    style={{
                      padding: '0 clamp(12px, 2.5vw, 24px) clamp(16px, 4vw, 24px) clamp(12px, 2.5vw, 24px)',
                      borderTop: '1px solid #F1F5F9',
                    }}
                  >
                    <p
                      className="mt-body mt-muted"
                      style={{
                        margin: 0,
                        paddingTop: '16px',
                        lineHeight: 1.6,
                        fontSize: '15px',
                        color: '#465670',
                      }}
                    >
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
