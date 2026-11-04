import React from 'react';
import { Building2, GraduationCap, Store, Truck } from 'lucide-react';
import { Container } from '../../design-system/Container';
import { SectionHeading } from '../../design-system/SectionHeading';
import { SolutionCard } from '../../design-system/cards/SolutionCard';
import { getSolutionsData } from '../../content/homeData';
import { useRouter } from '../../lib/router';

export const SolutionsSection: React.FC = () => {
  const { locale } = useRouter();
  const solutions = getSolutionsData(locale);
  const isEn = locale === 'en';

  const getSectorIcon = (sector: string) => {
    const s = sector.toLowerCase();
    if (s.includes('immobilier') || s.includes('estate')) {
      return <Building2 size={24} color="#19B8CD" />;
    }
    if (s.includes('éducation') || s.includes('education')) {
      return <GraduationCap size={24} color="#172A46" />;
    }
    if (s.includes('commerce') || s.includes('retail')) {
      return <Store size={24} color="#19B8CD" />;
    }
    if (s.includes('logistique') || s.includes('logistics')) {
      return <Truck size={24} color="#172A46" />;
    }
    return <Building2 size={24} />;
  };

  return (
    <section
      id="solutions"
      className="mt-section"
      style={{
        backgroundColor: '#F4F7FB',
        borderBottom: '1px solid #DAE3ED',
      }}
    >
      <Container>
        <SectionHeading
          tag={isEn ? 'Industry Specialization' : 'Expertises Métier'}
          title={
            isEn
              ? 'Software engineered for your industry requirements.'
              : 'Des outils pensés pour votre métier.'
          }
          description={
            isEn
              ? 'Every business sector has specific operational workflows and constraints. MusaTech delivers domain-focused capabilities that integrate seamlessly with your daily operations.'
              : "Chaque secteur d'activité comporte des contraintes et des habitudes d'usage spécifiques. MusaTech conçoit des fonctionnalités alignées avec votre quotidien opérationnel."
          }
          align="center"
        />

        <div className="mt-grid-2">
          {solutions.map((sol, index) => (
            <SolutionCard
              key={index}
              sector={sol.sector}
              icon={getSectorIcon(sol.sector)}
              title={sol.title}
              problem={sol.problem}
              features={sol.features}
              ctaHref={sol.ctaHref}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
