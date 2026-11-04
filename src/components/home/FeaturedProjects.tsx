import React from 'react';
import { Container } from '../../design-system/Container';
import { SectionHeading } from '../../design-system/SectionHeading';
import { ProjectCard } from '../../design-system/cards/ProjectCard';
import { LinkButton } from '../../design-system/Button';
import { getFeaturedProjects } from '../../content/homeData';
import { useRouter } from '../../lib/router';
import { getLocalizedHref } from '../../lib/i18nRoutes';

export const FeaturedProjects: React.FC = () => {
  const { locale } = useRouter();
  const projects = getFeaturedProjects(locale);
  const isEn = locale === 'en';

  return (
    <section
      id="realisations"
      className="mt-section"
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #DAE3ED',
      }}
    >
      <Container>
        <SectionHeading
          tag={isEn ? 'Selected Case Studies' : 'Réalisations Sélectionnées'}
          title={
            isEn
              ? 'Proven systems, high-utility engineering.'
              : 'Des projets concrets, des solutions utiles.'
          }
          description={
            isEn
              ? 'A curated selection of real-world production platforms built with strict requirements for resilience, performance, and user adoption.'
              : "Aperçu de réalisations réelles conçues avec des exigences strictes de robustesse, de performance et d'expérience utilisateur."
          }
          align="center"
        />

        <div className="mt-grid-3">
          {projects.map((project) => {
            const projectSlug = project.id === 'edaktarii' ? 'edaktari' : project.id;
            const liveUrl = isEn
              ? `/en/case-studies/${projectSlug}`
              : `/fr/realisations/${projectSlug}`;

            return (
              <div key={project.id} style={{ display: 'flex', flexDirection: 'column' }}>
                <ProjectCard
                  name={project.name}
                  client={project.client}
                  category={project.category}
                  year={project.year}
                  impactMetric={project.impactMetric}
                  summary={project.summary}
                  stack={project.stack}
                  githubUrl={project.githubUrl}
                  liveUrl={liveUrl}
                />
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <LinkButton href={getLocalizedHref('projects', locale)} variant="secondary" size="default">
            {isEn ? 'Explore All Technical Case Studies' : 'Voir toutes les études de cas techniques'}
          </LinkButton>
        </div>
      </Container>
    </section>
  );
};
