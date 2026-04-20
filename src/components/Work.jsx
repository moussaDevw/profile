import { useTranslation, Trans } from 'react-i18next';
import { Reveal, SectionLabel } from './Reveal';
import { PROJECTS } from '../constants/data';

const Work = () => {
  const { t } = useTranslation();

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

      <div>
        {PROJECTS.map((project, index) => {
          const projectKey = project.name.toLowerCase();
          return (
            <Reveal key={index} delay={index * 0.05}>
              <article className="project">
                <div className="project-year">{project.year}</div>
                <div className="project-header">
                  <div className="project-type">
                    {project.type.replace('En cours', t('projects.in_progress'))
                                .replace('Marketplace', t('projects.marketplace'))
                                .replace('Freelance', t('projects.freelance'))
                                .replace('HealthTech', t('projects.healthtech'))
                                .replace('Data', t('projects.data'))
                                .replace('Recherche scientifique', t('projects.research'))
                                .replace('Dashboard', t('projects.dashboard'))
                                .replace('Centre d\'appels', t('projects.call_center'))
                                .replace('P2P', t('projects.p2p'))}
                  </div>
                  <h3 className="project-name">{project.name}</h3>
                  <div className="project-client">{t(`projects.client_labels.${projectKey}`, project.client)}</div>
                </div>
                <div className="project-body">
                  <p>{t(`projects.bodies.${projectKey}`, project.body)}</p>
                  <div className="project-tags">
                    {project.tags.map((tag, i) => (
                      <span key={i}>{tag}</span>
                    ))}
                  </div>
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
