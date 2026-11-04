import React from 'react';
import { EyeOff, AlertCircle, Unlink, Lightbulb, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Container } from '../../design-system/Container';
import { SectionHeading } from '../../design-system/SectionHeading';
import { getProblemsData } from '../../content/homeData';
import { useRouter } from '../../lib/router';

export const ProblemsSolved: React.FC = () => {
  const { locale } = useRouter();
  const problemsData = getProblemsData(locale);
  const isEn = locale === 'en';

  const getProblemIcon = (id: string) => {
    switch (id) {
      case 'visibilite':
        return <EyeOff size={22} color="#D9383A" />;
      case 'gestion-manuelle':
        return <AlertCircle size={22} color="#E0A838" />;
      case 'outils-deconnectes':
        return <Unlink size={22} color="#172A46" />;
      default:
        return <Lightbulb size={22} color="#19B8CD" />;
    }
  };

  return (
    <section
      id="problemes"
      className="mt-section"
      style={{
        backgroundColor: '#F4F7FB',
        borderBottom: '1px solid #DAE3ED',
      }}
    >
      <Container>
        <SectionHeading
          tag={isEn ? 'Diagnosis & Challenges' : 'Diagnostic & Enjeux'}
          title={
            isEn
              ? 'Your business deserves software engineered for your ambition.'
              : 'Votre activité mérite des outils à la hauteur de vos ambitions.'
          }
          description={
            isEn
              ? 'Identifying operational bottlenecks is the foundational step toward building high-ROI, sustainable digital platforms.'
              : 'Identifier les freins opérationnels de votre entreprise est la première étape pour concevoir des outils digitaux rentables et durables.'
          }
          align="center"
        />

        <div className="mt-grid-2">
          {problemsData.map((item) => (
            <div
              key={item.id}
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
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      backgroundColor: '#F4F7FB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid #DAE3ED',
                    }}
                  >
                    {getProblemIcon(item.id)}
                  </div>
                  <h3
                    className="mt-h3"
                    style={{
                      color: '#0B1730',
                      margin: 0,
                    }}
                  >
                    {item.difficulty}
                  </h3>
                </div>

                <div
                  style={{
                    backgroundColor: '#FEF2F2',
                    border: '1px solid #FEE2E2',
                    borderRadius: '10px',
                    padding: '12px 16px',
                    marginBottom: '16px',
                  }}
                >
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#991B1B', textTransform: 'uppercase', marginBottom: '4px' }}>
                    {isEn ? 'Core Bottleneck' : 'Problème constaté :'}
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', color: '#7F1D1D', lineHeight: 1.5 }}>
                    {item.problemDescription}
                  </p>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: '#F0FDFA',
                  border: '1px solid #CCFBF1',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                }}
              >
                <CheckCircle2 size={18} color="#0D9488" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F766E', textTransform: 'uppercase', marginBottom: '4px' }}>
                    {isEn ? 'MusaTech Solution' : 'Solution MusaTech :'}
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', color: '#115E59', lineHeight: 1.5 }}>
                    {item.solutionBenefit}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
