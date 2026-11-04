import React from 'react';
import { Container } from '../../design-system/Container';
import { SectionHeading } from '../../design-system/SectionHeading';
import { getMethodSteps } from '../../content/homeData';
import { useRouter } from '../../lib/router';

export const WorkMethod: React.FC = () => {
  const { locale } = useRouter();
  const methodSteps = getMethodSteps(locale);
  const isEn = locale === 'en';

  return (
    <section
      id="methode"
      className="mt-section"
      style={{
        backgroundColor: '#F4F7FB',
        borderBottom: '1px solid #DAE3ED',
      }}
    >
      <Container>
        <SectionHeading
          tag={isEn ? 'Work Methodology' : 'Notre Démarche'}
          title={
            isEn
              ? 'Transparent collaboration from concept to production.'
              : "Un accompagnement clair, de l'idée à la mise en ligne."
          }
          description={
            isEn
              ? 'A disciplined 4-stage engineering approach ensuring milestone clarity, fixed budgets, and uncompromised code quality.'
              : 'Une méthode de travail éprouvée pour garantir le respect des délais, la transparence budgétaire et une qualité de code irréprochable.'
          }
          align="center"
        />

        <div className="mt-grid-4">
          {methodSteps.map((step) => (
            <div
              key={step.number}
              className="mt-card"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #DAE3ED',
                padding: 'clamp(24px, 4vw, 32px)',
                boxShadow: '0 4px 16px -2px rgba(11, 23, 48, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '28px',
                    fontWeight: 800,
                    fontFamily: "'Manrope', sans-serif",
                    color: '#19B8CD',
                    lineHeight: 1,
                    marginBottom: '16px',
                  }}
                >
                  {step.number}
                </span>

                <h3
                  className="mt-h3"
                  style={{
                    fontSize: '18px',
                    marginBottom: '12px',
                    color: '#0B1730',
                  }}
                >
                  {step.title}
                </h3>

                <p
                  className="mt-body mt-muted"
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.6,
                    marginBottom: '20px',
                  }}
                >
                  {step.description}
                </p>
              </div>

              <div
                style={{
                  borderTop: '1px solid #DAE3ED',
                  paddingTop: '16px',
                }}
              >
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: '#19B8CD',
                    letterSpacing: '0.04em',
                    marginBottom: '4px',
                  }}
                >
                  {isEn ? 'Key Deliverable' : 'Livrable concret :'}
                </div>
                <div style={{ fontSize: '13px', color: '#172A46', fontWeight: 600 }}>
                  {step.deliverable}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
