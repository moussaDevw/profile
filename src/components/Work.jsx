import { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Reveal, SectionLabel } from './Reveal';
import { PROJECTS } from '../constants/data';

const Work = () => {
  const { t } = useTranslation();
  const [expandedProject, setExpandedProject] = useState(null);

  const toggleProject = (index) => {
    setExpandedProject(expandedProject === index ? null : index);
  };

  return (
    <section id="work">
      <SectionLabel number="02" label={t('sections.work')} />

      <div className="work-intro">
        <Reveal>
          <h2 className="work-title">
            <Trans i18nKey="sections.work_title">
              Projets <em>récents</em> &amp; <em>en cours</em>
            </Trans>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="work-desc">{t('sections.work_desc')}</p>
        </Reveal>
      </div>

      <div className="projects-container">
        {PROJECTS.map((project, index) => {
          const projectKey = project.name.toLowerCase();
          const isExpanded = expandedProject === index;
          const projectBody = t(`projects.bodies.${projectKey}`, { returnObjects: true });
          const hasDetails = typeof projectBody === 'object';

          return (
            <Reveal key={index} delay={index * 0.05}>
              <article 
                className={`project ${isExpanded ? 'expanded' : ''} ${hasDetails ? 'has-details' : ''}`}
                onClick={() => hasDetails && toggleProject(index)}
              >
                <div className="project-year">{project.year}</div>
                <div className="project-header">
                  <div className="project-type">
                    {project.type.split(' · ').map((part, i) => (
                      <span key={i}>
                        {part.replace('En cours', t('projects.in_progress'))
                            .replace('Marketplace', t('projects.marketplace'))
                            .replace('Consultant', t('projects.consultant'))
                            .replace('HealthTech', t('projects.healthtech'))
                            .replace('Data', t('projects.data'))
                            .replace('Recherche scientifique', t('projects.research'))
                            .replace('Dashboard', t('projects.dashboard'))
                            .replace('Centre d\'appels', t('projects.call_center'))
                            .replace('P2P', t('projects.p2p'))}
                        {i < project.type.split(' · ').length - 1 && ' · '}
                      </span>
                    ))}
                  </div>
                  <h3 className="project-name">{project.name}</h3>
                  <div className="project-client">{t(`projects.client_labels.${projectKey}`, project.client)}</div>
                </div>
                
                <div className="project-content">
                  <div className="project-summary">
                    <p>{hasDetails ? projectBody.context : projectBody}</p>
                    <div className="project-tags">
                      {project.tags.map((tag, i) => (
                        <span key={i}>{tag}</span>
                      ))}
                    </div>
                    {hasDetails && (
                      <button className="expand-trigger">
                        {isExpanded ? t('common.show_less', 'Voir moins') : t('common.show_more', 'Détails du projet →')}
                      </button>
                    )}
                  </div>

                  {hasDetails && (
                    <div className="project-details">
                      <div className="details-grid">
                        {[
                          { key: 'goal', icon: '🎯' },
                          { key: 'role', icon: '👤' },
                          { key: 'achievements', icon: '✨' },
                          { key: 'challenges', icon: '🛠️' },
                          { key: 'impact', icon: '🚀' }
                        ].map(({ key, icon }) => (
                          <div className="detail-item" key={key}>
                            <h4 className="detail-label">
                              <span className="detail-icon">{icon}</span>
                              {t(`projects.detail_labels.${key}`)}
                            </h4>
                            <div className="detail-content">
                              {projectBody[key].split('\n').map((line, i) => {
                                if (line.trim().startsWith('•')) {
                                  return (
                                    <div key={i} className="list-item">
                                      <span className="bullet"></span>
                                      {line.trim().substring(1).trim()}
                                    </div>
                                  );
                                }
                                return <p key={i}>{line}</p>;
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};

export default Work;
